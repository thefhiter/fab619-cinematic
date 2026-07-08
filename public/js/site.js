/* ═══ FAB619 simple site — slideshow, reveals, marquee, nav ═══ */
(function () {
  'use strict';
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

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

  /* ── hero slideshow (video + 4 original slides) ── */
  const slides = [...document.querySelectorAll('.hero .slide')];
  const dotsWrap = document.getElementById('slideDots');
  const video = document.getElementById('heroVideo');
  let cur = 0, timer = null;

  slides.forEach((_, i) => {
    const b = document.createElement('button');
    b.setAttribute('role', 'tab');
    b.setAttribute('aria-label', (window.FAB_I18N?.dicts[window.FAB_LANG || 'fr'].slideLabel || 'Diapositive') + ' ' + (i + 1));
    b.addEventListener('click', () => go(i, true));
    dotsWrap.appendChild(b);
  });
  const dots = [...dotsWrap.children];
  addEventListener('fab:lang', (e) => {
    const d = window.FAB_I18N.dicts[e.detail.lang];
    dots.forEach((b, i) => b.setAttribute('aria-label', d.slideLabel + ' ' + (i + 1)));
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

  /* ── partner marquee (23 logos, duplicated track) ── */
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
  track.appendChild(half); // duplicate for seamless loop

  /* ── scroll reveals ── */
  const cards = document.querySelectorAll('.cards-grid .card');
  cards.forEach((c, i) => c.style.setProperty('--stagger', i % 3));
  const io = new IntersectionObserver((entries) => {
    for (const e of entries) {
      if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
    }
  }, { threshold: 0.14 });
  document.querySelectorAll('.reveal').forEach((el) => io.observe(el));

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

  /* ── projects carousel buttons (RTL-aware) ── */
  const car = document.getElementById('projCarousel');
  const step = () => Math.min(car.clientWidth * 0.85, 440);
  const dir = () => (document.documentElement.dir === 'rtl' ? -1 : 1);
  document.getElementById('projPrev').addEventListener('click', () =>
    car.scrollBy({ left: -dir() * step(), behavior: reduced ? 'auto' : 'smooth' }));
  document.getElementById('projNext').addEventListener('click', () =>
    car.scrollBy({ left: dir() * step(), behavior: reduced ? 'auto' : 'smooth' }));
})();
