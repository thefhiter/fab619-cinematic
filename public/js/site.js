/* ═══ FAB619 site — slideshow, dynamic press, counters, tilt, reveals ═══ */
(function () {
  'use strict';
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const touch = matchMedia('(hover: none)').matches;
  const lang = () => window.FAB_LANG || 'fr';
  const dict = () => window.FAB_I18N.dicts[lang()];

  /* ── burger menu ── */
  const burger = document.getElementById('burger');
  const navLinks = document.getElementById('navLinks');
  burger.addEventListener('click', () => {
    const open = navLinks.classList.toggle('open');
    burger.setAttribute('aria-expanded', String(open));
  });
  navLinks.addEventListener('click', (e) => {
    if (e.target.matches('a')) {
      navLinks.classList.remove('open');
      burger.setAttribute('aria-expanded', 'false');
    }
  });

  /* ── scroll progress bar ── */
  const bar = document.createElement('div');
  bar.id = 'scrollProgress';
  bar.setAttribute('aria-hidden', 'true');
  document.body.appendChild(bar);
  let ticking = false;
  addEventListener('scroll', () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      const max = document.documentElement.scrollHeight - innerHeight;
      bar.style.transform = `scaleX(${max > 0 ? scrollY / max : 0})`;
      ticking = false;
    });
  }, { passive: true });

  /* ── hero slideshow ── */
  const slides = [...document.querySelectorAll('.hero .slide')];
  const dotsWrap = document.getElementById('slideDots');
  const video = document.getElementById('heroVideo');
  let cur = 0, timer = null;

  slides.forEach((_, i) => {
    const b = document.createElement('button');
    b.setAttribute('role', 'tab');
    b.setAttribute('aria-label', dict().slideLabel + ' ' + (i + 1));
    b.addEventListener('click', () => go(i, true));
    dotsWrap.appendChild(b);
  });
  const dots = [...dotsWrap.children];
  addEventListener('fab:lang', () => {
    dots.forEach((b, i) => b.setAttribute('aria-label', dict().slideLabel + ' ' + (i + 1)));
  });

  function go(i, manual) {
    slides[cur].classList.remove('is-active');
    dots[cur].classList.remove('on');
    cur = (i + slides.length) % slides.length;
    slides[cur].classList.add('is-active');
    dots[cur].classList.add('on');
    if (cur === 0) video.play().catch(() => {});
    else video.pause();
    if (manual) restart();
  }
  function restart() {
    if (reduced) return;
    clearInterval(timer);
    timer = setInterval(() => go(cur + 1), 6000);
  }
  dots[0].classList.add('on');
  restart();
  const hero = document.querySelector('.hero');
  hero.addEventListener('pointerenter', () => clearInterval(timer));
  hero.addEventListener('pointerleave', restart);
  document.getElementById('slidePrev').addEventListener('click', () => go(cur - 1, true));
  document.getElementById('slideNext').addEventListener('click', () => go(cur + 1, true));
  video.play().catch(() => {
    addEventListener('pointerdown', () => video.play().catch(() => {}), { once: true });
  });

  /* ── hero headline word-rise — always rebuilt from the canonical dict text ── */
  const h1 = document.getElementById('heroH1');
  function riseHeadline() {
    if (!h1) return;
    const html = dict().heroTitle;
    if (reduced) { h1.innerHTML = html; h1.removeAttribute('aria-label'); return; }
    const plain = html.replace(/<br\s*\/?>/gi, ' ').replace(/<[^>]+>/g, '').trim();
    h1.setAttribute('aria-label', plain);
    h1.innerHTML = html.split(/<br\s*\/?>/i).map((line) =>
      '<span class="h1-line" aria-hidden="true">' +
      line.trim().split(/\s+/).map((w) => `<span class="h1-word">${w}</span>`).join(' ') +
      '</span>'
    ).join('<br>');
    h1.querySelectorAll('.h1-word').forEach((w, i) => {
      w.style.transitionDelay = 80 + i * 70 + 'ms';
      requestAnimationFrame(() => requestAnimationFrame(() => w.classList.add('up')));
    });
  }
  addEventListener('fab:lang', () => setTimeout(riseHeadline, 30));

  /* ── partner marquee ── */
  const MARQUEES = [
    'association-tunisienne-de-mecanique', 'bako', 'calotex',
    'deutsche-gesellschaft-für-internationale-zusammenarbeit', 'deutsche-zusammenarbeit',
    'employment4youth', 'enim', 'eniso', 'enixads', 'helmut-schmidt-universitat',
    'hutchinson', 'inmachines', 'invest-for-jobs', 'iset-ksar-hellal', 'lasoie',
    'meditec', 'ministère-de-l-industrie-tunisien', 'neotex', 'openlab-hamburg',
    'pole-de-competitivite-monastir', 'seamtech', 'trimakus', 'unido',
  ];
  const track = document.getElementById('marqueeTrack');
  const half = document.createDocumentFragment();
  MARQUEES.forEach((n) => {
    const img = document.createElement('img');
    img.src = '/assets/marquees/' + encodeURIComponent(n) + '.webp';
    img.alt = '';
    img.loading = 'lazy';
    half.appendChild(img);
  });
  track.appendChild(half.cloneNode(true));
  track.appendChild(half);

  /* ── scroll reveals ── */
  const cards = document.querySelectorAll('.cards-grid .card');
  cards.forEach((c, i) => c.style.setProperty('--stagger', i % 3));
  const io = new IntersectionObserver((entries) => {
    for (const e of entries) {
      if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
    }
  }, { threshold: 0.14 });
  document.querySelectorAll('.reveal').forEach((el) => io.observe(el));

  /* ── stats counters ── */
  const stats = [...document.querySelectorAll('.stat-num')];
  const statsIO = new IntersectionObserver((entries) => {
    for (const e of entries) {
      if (!e.isIntersecting) continue;
      statsIO.unobserve(e.target);
      const end = parseInt(e.target.dataset.count, 10);
      if (reduced) { e.target.textContent = end; continue; }
      const t0 = performance.now();
      const dur = 1400;
      (function tick(now) {
        const k = Math.min(1, (now - t0) / dur);
        e.target.textContent = Math.round(end * (1 - Math.pow(1 - k, 3)));
        if (k < 1) requestAnimationFrame(tick);
      })(t0);
    }
  }, { threshold: 0.5 });
  stats.forEach((s) => statsIO.observe(s));

  /* ── scrollspy ── */
  const sections = [...document.querySelectorAll('main section[id]')];
  const navAs = [...document.querySelectorAll('.nav-links a')];
  const spy = new IntersectionObserver((entries) => {
    for (const e of entries) {
      if (e.isIntersecting) {
        navAs.forEach((a) => a.classList.toggle('active', a.getAttribute('href') === '#' + e.target.id));
      }
    }
  }, { rootMargin: '-42% 0px -52% 0px' });
  sections.forEach((s) => spy.observe(s));

  /* ── projects carousel (RTL-aware) ── */
  const car = document.getElementById('projCarousel');
  const step = () => Math.min(car.clientWidth * 0.85, 440);
  const dir = () => (document.documentElement.dir === 'rtl' ? -1 : 1);
  document.getElementById('projPrev').addEventListener('click', () =>
    car.scrollBy({ left: -dir() * step(), behavior: reduced ? 'auto' : 'smooth' }));
  document.getElementById('projNext').addEventListener('click', () =>
    car.scrollBy({ left: dir() * step(), behavior: reduced ? 'auto' : 'smooth' }));

  /* ── card tilt (desktop pointers only) ── */
  function addTilt(el) {
    if (reduced || touch) return;
    el.classList.add('tiltable');
    el.addEventListener('pointermove', (e) => {
      const r = el.getBoundingClientRect();
      const rx = ((e.clientY - r.top) / r.height - 0.5) * -5;
      const ry = ((e.clientX - r.left) / r.width - 0.5) * 5;
      el.style.transform = `perspective(800px) rotateX(${rx.toFixed(2)}deg) rotateY(${ry.toFixed(2)}deg) translateY(-6px)`;
    });
    el.addEventListener('pointerleave', () => { el.style.transform = ''; });
  }

  /* ── magnetic primary buttons ── */
  if (!reduced && !touch && window.gsap) {
    document.querySelectorAll('.btn-solid').forEach((el) => {
      const xTo = gsap.quickTo(el, 'x', { duration: 0.4, ease: 'elastic.out(1,0.4)' });
      const yTo = gsap.quickTo(el, 'y', { duration: 0.4, ease: 'elastic.out(1,0.4)' });
      el.addEventListener('pointermove', (e) => {
        const r = el.getBoundingClientRect();
        xTo((e.clientX - r.left - r.width / 2) * 0.25);
        yTo((e.clientY - r.top - r.height / 2) * 0.35);
      });
      el.addEventListener('pointerleave', () => { xTo(0); yTo(0); });
    });
  }

  /* ── dynamic press grid (articles API) ── */
  const grid = document.getElementById('pressGrid');
  let articles = [];

  function fmtDate(iso) {
    try {
      const locale = lang() === 'ar' ? 'ar-TN-u-nu-arab' : lang() === 'en' ? 'en-GB' : 'fr-FR';
      return new Intl.DateTimeFormat(locale, { day: '2-digit', month: 'long', year: 'numeric' }).format(new Date(iso + 'T12:00:00'));
    } catch { return iso; }
  }

  function renderPress() {
    if (!grid) return;
    const d = dict();
    grid.textContent = '';
    if (!articles.length) {
      const p = document.createElement('p');
      p.className = 'press-status';
      p.textContent = d.pressEmpty;
      grid.appendChild(p);
      return;
    }
    for (const art of articles.slice(0, 6)) {
      const t = art.i18n[lang()] || art.i18n[art.source];
      const card = document.createElement('article');
      card.className = 'press-card in';
      const a = document.createElement('a');
      a.href = '/article.html?slug=' + encodeURIComponent(art.slug);
      if (art.image) {
        const img = document.createElement('img');
        img.src = art.image; img.alt = t.alt || t.title; img.loading = 'lazy';
        a.appendChild(img);
      }
      const time = document.createElement('time');
      time.dateTime = art.date; time.textContent = fmtDate(art.date);
      const h3 = document.createElement('h3');
      h3.textContent = t.title;
      const p = document.createElement('p');
      p.textContent = t.excerpt;
      const more = document.createElement('span');
      more.className = 'proj-more'; more.textContent = d.readMore;
      a.append(time, h3, p, more);
      card.appendChild(a);
      grid.appendChild(card);
      addTilt(a);
    }
  }

  fetch('/api/articles')
    .then((r) => (r.ok ? r.json() : []))
    .then((list) => { articles = list; renderPress(); })
    .catch(() => { articles = []; renderPress(); });
  addEventListener('fab:lang', renderPress);

  /* tilt on project cards too */
  document.querySelectorAll('.proj-card > a').forEach(addTilt);
})();
