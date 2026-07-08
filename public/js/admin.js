/* ═══ FAB619 admin — write once, auto-translate FR/EN/AR, review, publish ═══ */
(function () {
  'use strict';
  const LANGS = ['fr', 'en', 'ar'];
  const $ = (id) => document.getElementById(id);
  let token = sessionStorage.getItem('fab619-admin-token') || '';
  let editingId = null; // null → creating

  /* preset images from the site's own library */
  const PRESETS = [
    ['(aucune image)', ''],
    ['Atelier — dosage automobile', '/assets/projects/9ad09fa11d0af9946fadd3455bd633cea6c59810-3496x2161.webp'],
    ['Livraison ADM IDEX', '/assets/projects/ad03852f168ab82e2511d70d3f8184bc8d06ccc0-1366x768.jpg'],
    ['Workshop CNC', '/assets/projects/a31235291b1a7ce1cb5492d5f7a95b9b1bbdc73d-928x634.webp'],
    ['Machine SCPDS', '/assets/projects/baa5df419ca3a2bcf2ce3d3d6b478ab42be46025-1684x1042.webp'],
    ['Jelly Doser', '/assets/projects/006a87db783aad06dd8868ad9f75a5d6f0ea42f2-1170x723.webp'],
    ['ADM IDEX V2', '/assets/projects/6eac568e6cbd8498b060e9d0f1924a8864d80def-4000x2472.webp'],
    ['JellyEdge', '/assets/projects/445483b4a542ceb6f6f5f563cdf93e035fbade8a-1980x1224.webp'],
    ['Électronique', '/assets/images/services/electronics.webp'],
    ['Impression 3D', '/assets/images/services/printing.webp'],
    ['Formation', '/assets/images/services/workshop.webp'],
  ];

  function toast(msg, isError) {
    const t = $('toast');
    t.textContent = msg;
    t.classList.toggle('error', !!isError);
    t.classList.add('show');
    clearTimeout(toast._h);
    toast._h = setTimeout(() => t.classList.remove('show'), 4200);
  }

  async function api(method, url, body) {
    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json', 'X-Admin-Token': token },
      body: body ? JSON.stringify(body) : undefined,
    });
    const json = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(json.error || res.status);
    return json;
  }

  /* ── gate ── */
  $('gateForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    token = $('token').value.trim();
    try {
      await api('POST', '/api/translate', { text: 'ok', from: 'fr', to: 'en' });
      sessionStorage.setItem('fab619-admin-token', token);
      $('gate').hidden = true;
      $('editor').hidden = false;
      $('listSection').hidden = false;
      $('title').focus();
      loadList();
    } catch {
      $('gateError').hidden = false;
      $('token').setAttribute('aria-invalid', 'true');
      $('token').focus();
    }
  });

  /* ── image pickers ── */
  const sel = $('imageSel');
  PRESETS.forEach(([label, url]) => {
    const o = document.createElement('option');
    o.value = url; o.textContent = label;
    sel.appendChild(o);
  });
  let imageUrl = '';
  function setImage(url) {
    imageUrl = url || '';
    const prev = $('imagePreview');
    if (imageUrl) { prev.src = imageUrl; prev.hidden = false; }
    else { prev.hidden = true; prev.removeAttribute('src'); }
  }
  sel.addEventListener('change', () => setImage(sel.value));
  $('imageFile').addEventListener('change', () => {
    const f = $('imageFile').files[0];
    if (!f) return;
    if (f.size > 3 * 1024 * 1024) { toast('Image trop lourde (max 3 Mo).', true); $('imageFile').value = ''; return; }
    const rd = new FileReader();
    rd.onload = async () => {
      try {
        const { url } = await api('POST', '/api/upload', { dataUrl: rd.result, name: f.name });
        setImage(url);
        toast('Image téléversée ✓');
      } catch (err) { toast('Téléversement impossible : ' + err.message, true); }
    };
    rd.readAsDataURL(f);
  });

  /* ── translate & review ── */
  const draft = { source: 'fr', i18n: {} };

  $('artForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const title = $('title').value.trim();
    const body = $('body').value.trim();
    $('titleErr').hidden = !!title;
    $('bodyErr').hidden = !!body;
    if (!title) { $('title').focus(); return; }
    if (!body) { $('body').focus(); return; }

    const src = $('srcLang').value;
    draft.source = src;
    draft.date = $('date').value || new Date().toISOString().slice(0, 10);
    draft.image = imageUrl;
    draft.i18n = { [src]: {
      title, body,
      excerpt: $('excerpt').value.trim(),
      alt: $('alt').value.trim() || title,
    } };

    const btn = $('translateBtn');
    btn.disabled = true;
    btn.textContent = 'Traduction en cours…';
    try {
      const filled = {};
      for (const lang of LANGS) {
        if (lang === src) { filled[lang] = draft.i18n[src]; continue; }
        const [tt, te, tb, ta] = await Promise.all([
          api('POST', '/api/translate', { text: draft.i18n[src].title, from: src, to: lang }),
          api('POST', '/api/translate', { text: draft.i18n[src].excerpt, from: src, to: lang }),
          api('POST', '/api/translate', { text: draft.i18n[src].body, from: src, to: lang }),
          api('POST', '/api/translate', { text: draft.i18n[src].alt, from: src, to: lang }),
        ]);
        filled[lang] = { title: tt.text, excerpt: te.text, body: tb.text, alt: ta.text };
      }
      draft.i18n = filled;
      for (const lang of LANGS) {
        $(lang + '-title').value = filled[lang].title;
        $(lang + '-excerpt').value = filled[lang].excerpt;
        $(lang + '-body').value = filled[lang].body;
        $(lang + '-alt').value = filled[lang].alt;
      }
      $('review').hidden = false;
      $('review').scrollIntoView({ behavior: 'smooth', block: 'start' });
      $('tab-' + src).focus();
      toast('Traductions prêtes — relisez puis publiez ✓');
    } catch (err) {
      toast('Traduction impossible : ' + err.message, true);
    } finally {
      btn.disabled = false;
      btn.textContent = 'Traduire en FR + EN + AR';
    }
  });

  /* tabs */
  document.querySelectorAll('.tab').forEach((tab) => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.tab').forEach((t) => {
        const on = t === tab;
        t.classList.toggle('on', on);
        t.setAttribute('aria-selected', String(on));
      });
      document.querySelectorAll('.pane').forEach((p) => { p.hidden = p.id !== 'pane-' + tab.dataset.tab; });
    });
  });

  /* ── publish ── */
  $('publishBtn').addEventListener('click', async () => {
    for (const lang of LANGS) {
      draft.i18n[lang] = {
        title: $(lang + '-title').value.trim(),
        excerpt: $(lang + '-excerpt').value.trim(),
        body: $(lang + '-body').value.trim(),
        alt: $(lang + '-alt').value.trim(),
      };
    }
    const btn = $('publishBtn');
    btn.disabled = true;
    try {
      if (editingId) {
        await api('PUT', '/api/articles/' + editingId, draft);
        toast('Article mis à jour ✓ — visible sur le site en FR, EN et AR');
      } else {
        await api('POST', '/api/articles', draft);
        toast('Article publié ✓ — visible sur le site en FR, EN et AR');
      }
      resetForm();
      loadList();
    } catch (err) {
      toast('Publication impossible : ' + err.message, true);
    } finally {
      btn.disabled = false;
    }
  });
  $('cancelReviewBtn').addEventListener('click', () => { $('review').hidden = true; });

  function resetForm() {
    editingId = null;
    $('editorTitle').textContent = 'Nouvel article';
    $('artForm').reset();
    $('review').hidden = true;
    setImage('');
    $('date').value = new Date().toISOString().slice(0, 10);
  }
  $('resetBtn').addEventListener('click', resetForm);

  /* ── list / edit / delete ── */
  async function loadList() {
    const list = await fetch('/api/articles').then((r) => r.json()).catch(() => []);
    const ul = $('artList');
    ul.textContent = '';
    for (const a of list) {
      const li = document.createElement('li');
      const info = document.createElement('div');
      info.className = 'art-info';
      const strong = document.createElement('strong');
      strong.textContent = a.i18n.fr?.title || a.i18n[a.source].title;
      const small = document.createElement('small');
      small.textContent = a.date + ' · ' + a.slug;
      info.append(strong, small);

      const actions = document.createElement('div');
      actions.className = 'art-actions';
      const view = document.createElement('a');
      view.className = 'mini-btn';
      view.href = '/article.html?slug=' + encodeURIComponent(a.slug);
      view.target = '_blank'; view.rel = 'noopener';
      view.textContent = 'Voir';
      const edit = document.createElement('button');
      edit.className = 'mini-btn';
      edit.textContent = 'Modifier';
      edit.addEventListener('click', () => startEdit(a));
      const del = document.createElement('button');
      del.className = 'mini-btn danger';
      del.textContent = 'Supprimer';
      del.addEventListener('click', async () => {
        if (!confirm('Supprimer définitivement « ' + strong.textContent + ' » ?')) return;
        try {
          await api('DELETE', '/api/articles/' + a.id);
          toast('Article supprimé.');
          loadList();
        } catch (err) { toast('Suppression impossible : ' + err.message, true); }
      });
      actions.append(view, edit, del);
      li.append(info, actions);
      ul.appendChild(li);
    }
    if (!list.length) {
      const li = document.createElement('li');
      li.textContent = 'Aucun article.';
      ul.appendChild(li);
    }
  }

  function startEdit(a) {
    editingId = a.id;
    $('editorTitle').textContent = 'Modifier : ' + (a.i18n.fr?.title || a.slug);
    $('srcLang').value = a.source;
    $('date').value = a.date;
    const src = a.i18n[a.source];
    $('title').value = src.title;
    $('excerpt').value = src.excerpt || '';
    $('body').value = src.body;
    $('alt').value = src.alt || '';
    setImage(a.image);
    draft.source = a.source;
    draft.date = a.date;
    draft.image = a.image;
    draft.externalUrl = a.externalUrl || '';
    draft.i18n = JSON.parse(JSON.stringify(a.i18n));
    for (const lang of LANGS) {
      const t = a.i18n[lang] || { title: '', excerpt: '', body: '', alt: '' };
      $(lang + '-title').value = t.title;
      $(lang + '-excerpt').value = t.excerpt || '';
      $(lang + '-body').value = t.body;
      $(lang + '-alt').value = t.alt || '';
    }
    $('review').hidden = false;
    $('editor').scrollIntoView({ behavior: 'smooth' });
    $('title').focus();
    toast('Mode édition — modifiez puis « Publier ».');
  }

  $('date').value = new Date().toISOString().slice(0, 10);
})();
