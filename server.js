// FAB619 — static server + trilingual articles API (FR/EN/AR auto-translation)
const http = require('http');
const https = require('https');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const PORT = process.env.PORT || 9105;
const ROOT = path.join(__dirname, 'public');
const DATA_FILE = path.join(__dirname, 'data', 'articles.json');
const UPLOAD_DIR = path.join(ROOT, 'assets', 'uploads');
// Demo gate — set a strong ADMIN_TOKEN env var before hosting publicly.
const ADMIN_TOKEN = process.env.ADMIN_TOKEN || 'fab619';
const LANGS = ['fr', 'en', 'ar'];

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.json': 'application/json',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.ico': 'image/x-icon',
  '.woff2': 'font/woff2',
  '.woff': 'font/woff',
  '.mp4': 'video/mp4',
  '.webm': 'video/webm',
};

/* ── articles store (JSON file) ── */
function loadArticles() {
  try { return JSON.parse(fs.readFileSync(DATA_FILE, 'utf8')); }
  catch { return []; }
}
function saveArticles(list) {
  fs.mkdirSync(path.dirname(DATA_FILE), { recursive: true });
  fs.writeFileSync(DATA_FILE, JSON.stringify(list, null, 2), 'utf8');
}

/* ── translation chain: Google gtx → MyMemory → source text ── */
function httpsGetJson(url, timeout = 9000) {
  return new Promise((resolve, reject) => {
    const req = https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' }, timeout }, (res) => {
      let body = '';
      res.on('data', (c) => (body += c));
      res.on('end', () => {
        try { resolve(JSON.parse(body)); } catch (e) { reject(e); }
      });
    });
    req.on('timeout', () => req.destroy(new Error('timeout')));
    req.on('error', reject);
  });
}

async function translateChunk(text, from, to) {
  if (!text.trim()) return text;
  try { // 1. Google translate (unofficial gtx endpoint)
    const u = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${from}&tl=${to}&dt=t&q=${encodeURIComponent(text)}`;
    const j = await httpsGetJson(u);
    const out = (j[0] || []).map((seg) => seg[0]).join('');
    if (out.trim()) return out;
  } catch {}
  try { // 2. MyMemory (free, ~500 chars/request)
    const part = text.slice(0, 480);
    const u = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(part)}&langpair=${from}|${to}`;
    const j = await httpsGetJson(u);
    const out = j?.responseData?.translatedText;
    if (out && out.trim() && !/QUERY LENGTH LIMIT|INVALID/i.test(out)) return out;
  } catch {}
  return text; // 3. graceful fallback — editor can fix manually in the admin
}

async function translateText(text, from, to) {
  if (from === to || !text) return text;
  const paragraphs = String(text).split(/\n{2,}/);
  const out = [];
  for (const p of paragraphs) out.push(await translateChunk(p, from, to));
  return out.join('\n\n');
}

async function fillTranslations(article) {
  const src = article.source;
  const base = article.i18n[src];
  for (const lang of LANGS) {
    if (lang === src) continue;
    const cur = article.i18n[lang] || {};
    article.i18n[lang] = {
      title: cur.title || await translateText(base.title, src, lang),
      excerpt: cur.excerpt || await translateText(base.excerpt, src, lang),
      body: cur.body || await translateText(base.body, src, lang),
      alt: cur.alt || await translateText(base.alt || base.title, src, lang),
    };
  }
  if (!base.alt) base.alt = base.title;
  return article;
}

function slugify(s) {
  return String(s).normalize('NFKD').replace(/[̀-ͯ]/g, '')
    .toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')
    .slice(0, 80) || 'article-' + Date.now();
}

/* ── request helpers ── */
function readBody(req, limit = 8 * 1024 * 1024) {
  return new Promise((resolve, reject) => {
    let size = 0; const chunks = [];
    req.on('data', (c) => {
      size += c.length;
      if (size > limit) { req.destroy(); reject(new Error('payload too large')); return; }
      chunks.push(c);
    });
    req.on('end', () => resolve(Buffer.concat(chunks)));
    req.on('error', reject);
  });
}
function sendJson(res, code, obj) {
  const body = JSON.stringify(obj);
  res.writeHead(code, { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' });
  res.end(body);
}
function authorized(req) {
  return (req.headers['x-admin-token'] || '') === ADMIN_TOKEN;
}

/* ── API router ── */
async function handleApi(req, res, urlPath) {
  const parts = urlPath.split('/').filter(Boolean); // ['api', ...]
  const method = req.method;

  // public: list published articles
  if (method === 'GET' && urlPath === '/api/articles') {
    const list = loadArticles().sort((a, b) => b.date.localeCompare(a.date));
    return sendJson(res, 200, list);
  }
  // public: single by slug
  if (method === 'GET' && parts[1] === 'articles' && parts[2]) {
    const art = loadArticles().find((a) => a.slug === parts[2] || a.id === parts[2]);
    return art ? sendJson(res, 200, art) : sendJson(res, 404, { error: 'not found' });
  }

  // everything below mutates → token required
  if (!authorized(req)) return sendJson(res, 401, { error: 'invalid admin token' });

  if (method === 'POST' && urlPath === '/api/translate') {
    const { text, from, to } = JSON.parse((await readBody(req)).toString('utf8') || '{}');
    if (!LANGS.includes(from) || !LANGS.includes(to)) return sendJson(res, 400, { error: 'bad langs' });
    return sendJson(res, 200, { text: await translateText(String(text || ''), from, to) });
  }

  if (method === 'POST' && urlPath === '/api/upload') {
    const { dataUrl, name } = JSON.parse((await readBody(req)).toString('utf8') || '{}');
    const m = /^data:(image\/(?:webp|png|jpe?g|gif));base64,(.+)$/.exec(dataUrl || '');
    if (!m) return sendJson(res, 400, { error: 'expected base64 image dataUrl (webp/png/jpg/gif)' });
    const ext = m[1] === 'image/webp' ? '.webp' : m[1] === 'image/png' ? '.png' : m[1] === 'image/gif' ? '.gif' : '.jpg';
    const file = slugify((name || 'upload').replace(/\.[a-z0-9]+$/i, '')) + '-' + Date.now() + ext;
    fs.mkdirSync(UPLOAD_DIR, { recursive: true });
    fs.writeFileSync(path.join(UPLOAD_DIR, file), Buffer.from(m[2], 'base64'));
    return sendJson(res, 200, { url: '/assets/uploads/' + file });
  }

  if (method === 'POST' && urlPath === '/api/articles') {
    const b = JSON.parse((await readBody(req)).toString('utf8') || '{}');
    const source = LANGS.includes(b.source) ? b.source : 'fr';
    const srcContent = b.i18n && b.i18n[source];
    if (!srcContent || !srcContent.title || !srcContent.body) {
      return sendJson(res, 400, { error: 'i18n[source].title and .body are required' });
    }
    let article = {
      id: crypto.randomUUID(),
      slug: '',
      date: /^\d{4}-\d{2}-\d{2}$/.test(b.date || '') ? b.date : new Date().toISOString().slice(0, 10),
      image: typeof b.image === 'string' ? b.image : '',
      externalUrl: typeof b.externalUrl === 'string' ? b.externalUrl : '',
      source,
      i18n: { [source]: { title: String(srcContent.title), excerpt: String(srcContent.excerpt || ''), body: String(srcContent.body), alt: String(srcContent.alt || '') } },
    };
    // keep any pre-edited translations sent by the admin UI
    for (const lang of LANGS) {
      if (lang !== source && b.i18n[lang] && b.i18n[lang].title) article.i18n[lang] = b.i18n[lang];
    }
    article = await fillTranslations(article);
    article.slug = slugify(article.i18n.en.title || article.i18n.fr.title);
    const list = loadArticles();
    while (list.some((a) => a.slug === article.slug)) article.slug += '-2';
    list.push(article);
    saveArticles(list);
    return sendJson(res, 201, article);
  }

  if ((method === 'PUT' || method === 'DELETE') && parts[1] === 'articles' && parts[2]) {
    const list = loadArticles();
    const idx = list.findIndex((a) => a.id === parts[2] || a.slug === parts[2]);
    if (idx === -1) return sendJson(res, 404, { error: 'not found' });
    if (method === 'DELETE') {
      const [gone] = list.splice(idx, 1);
      saveArticles(list);
      return sendJson(res, 200, { deleted: gone.id });
    }
    const b = JSON.parse((await readBody(req)).toString('utf8') || '{}');
    const art = list[idx];
    if (b.date && /^\d{4}-\d{2}-\d{2}$/.test(b.date)) art.date = b.date;
    if (typeof b.image === 'string') art.image = b.image;
    if (typeof b.externalUrl === 'string') art.externalUrl = b.externalUrl;
    if (LANGS.includes(b.source)) art.source = b.source;
    if (b.i18n) for (const lang of LANGS) if (b.i18n[lang]) art.i18n[lang] = b.i18n[lang];
    if (b.retranslate) { // wipe non-source langs and refill from source
      for (const lang of LANGS) if (lang !== art.source) delete art.i18n[lang];
      await fillTranslations(art);
    }
    saveArticles(list);
    return sendJson(res, 200, art);
  }

  return sendJson(res, 404, { error: 'unknown api route' });
}

/* ── server ── */
http.createServer(async (req, res) => {
  let urlPath = decodeURIComponent(req.url.split('?')[0]);

  if (urlPath.startsWith('/api/')) {
    try { await handleApi(req, res, urlPath); }
    catch (e) { sendJson(res, 500, { error: String(e.message || e) }); }
    return;
  }

  if (urlPath === '/') urlPath = '/index.html';
  const filePath = path.normalize(path.join(ROOT, urlPath));
  if (!filePath.startsWith(ROOT)) { res.writeHead(403); res.end('Forbidden'); return; }

  fs.stat(filePath, (err, stat) => {
    if (err || !stat.isFile()) {
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end('Not found: ' + urlPath);
      return;
    }
    const ext = path.extname(filePath).toLowerCase();
    const type = MIME[ext] || 'application/octet-stream';
    const range = req.headers.range;
    if (range) {
      const m = /bytes=(\d*)-(\d*)/.exec(range);
      let start = m[1] ? parseInt(m[1], 10) : 0;
      let end = m[2] ? parseInt(m[2], 10) : stat.size - 1;
      if (isNaN(start) || start >= stat.size) start = 0;
      if (isNaN(end) || end >= stat.size) end = stat.size - 1;
      res.writeHead(206, {
        'Content-Type': type,
        'Content-Range': `bytes ${start}-${end}/${stat.size}`,
        'Accept-Ranges': 'bytes',
        'Content-Length': end - start + 1,
        'Cache-Control': 'no-cache',
      });
      fs.createReadStream(filePath, { start, end }).pipe(res);
    } else {
      res.writeHead(200, {
        'Content-Type': type,
        'Content-Length': stat.size,
        'Accept-Ranges': 'bytes',
        'Cache-Control': 'no-cache',
      });
      fs.createReadStream(filePath).pipe(res);
    }
  });
}).listen(PORT, () => {
  console.log(`FAB619 → http://localhost:${PORT}  (admin: /admin.html)`);
});
