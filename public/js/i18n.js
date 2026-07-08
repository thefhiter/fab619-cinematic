/* ═══ FAB619 — i18n FR / EN / AR with industrial shutter transition ═══ */
(function () {
  'use strict';

  const FR = {
    skipLink: 'Aller au contenu',
    navHome: 'Accueil', navAbout: 'À propos', navServices: 'Services',
    navProjects: 'Projets', navPartners: 'Partenaires', navPress: 'Presse', navContact: 'Contact',
    menuLabel: 'Menu', prevLabel: 'Précédent', nextLabel: 'Suivant', slideLabel: 'Diapositive',
    langGroupLabel: 'Choix de la langue',

    heroKicker: 'BIENVENUE CHEZ FAB619',
    heroTitle: 'Fabrication<br>à la demande',
    heroBodyShort: "Machines avancées, systèmes d'automatisation et fabrication numérique — du concept au prototype.",
    heroCta: 'DÉCOUVRIR', heroCta2: 'DEVIS PROJET',

    aboutKicker: 'QUI SOMMES-NOUS ?',
    aboutTitle: "L'innovation, du concept à l'intégration",
    aboutBody1: "Nous concevons et développons des machines sur mesure, des systèmes d'automatisation et des produits intelligents qui comblent le fossé entre l'innovation et la performance industrielle.",
    aboutBody2: "Machines CNC personnalisées, appareils IoT, cartes PCB, fabrication numérique ou formations en atelier — des technologies pratiques et évolutives, pour un impact réel et des résultats mesurables.",
    aboutBody3: "Notre équipe multidisciplinaire réunit mécanique, électronique, logiciel machine et fabrication numérique — du prototypage à la production.",
    altAbout1: "Banc d'assemblage électronique dans l'atelier FAB619",
    altAbout2: "Machines en cours d'assemblage dans l'atelier",
    altAbout3: "Détail d'un système de dosage FAB619",

    statPartners: 'Clients & partenaires', statServices: 'Services intégrés',
    statProjects: 'Projets en vitrine', statSites: 'Sites — Monastir & Tunis',

    servKicker: 'NOS SERVICES',
    servTitle: 'Du concept au produit final',
    servBody: "Une large gamme de services de fabrication innovants, le long d'une seule chaîne de production.",
    s1t: 'Machines personnalisées', s1d: "Développement de machines · Systèmes d'automatisation · Robotique avancée",
    s2t: 'Impression 3D & Usinage CNC', s2d: 'Fabrication à la demande · Prototypage rapide · Production personnalisée',
    s3t: 'IoT & Électronique', s3d: 'Circuits électroniques · Conception PCB & intégration IoT · Logiciel embarqué',
    s4t: 'Conception matérielle', s4d: 'Conception de produits · Ingénierie matérielle · Prototypage · Intégration électronique',
    s5t: 'Logiciel de machine', s5d: 'Algorithmes de contrôle · Surveillance temps réel · Logiciel personnalisé',
    s6t: 'Ateliers & Formation', s6d: 'Documentation technique · Ateliers pratiques · Sessions de formation',

    projKicker: 'NOS PROJETS',
    projTitle: 'La galerie des machines',
    projBody: 'Nos solutions sur mesure en action — des machines intelligentes aux innovations industrielles.',
    proj1tag: 'PODS · PNEUMATIQUE',
    proj1d: "Station de pompage pneumatique pour l'alimentation continue d'adhésifs liquides et de matériaux à faible viscosité — pompe à membrane de haute précision.",
    proj2tag: 'DOSAGE · PRÉCISION',
    proj2d: 'Système de dépose et dosage intelligent pour les applications exigeant grande précision, cadence élevée et parfaite répétabilité.',
    proj3tag: 'EDUTECH · INDUSTRIE 4.0',
    proj3d: "Quatre modèles de formation couvrant les piliers de l'industrie intelligente : automatisation, IoT, communication et production.",
    proj4tag: 'CNC · INOX',
    proj4d: 'Machine CNC de dépose nouvelle génération — châssis inox, double tête IDEX indépendante, optimisée pour les matériaux visqueux.',
    proj5tag: 'PLATEFORME · FORMATION',
    proj5d: "Plateforme Edutech dédiée à l'apprentissage pratique des technologies Industrie 4.0 — pour universités et centres de formation.",
    viewProject: 'Voir le projet',
    atelierTitle: "L'atelier en images",

    partKicker: 'CLIENTS & PARTENAIRES',
    partTitle: "Collaborer pour construire l'avenir de la fabrication",
    partBody: "L'innovation prospère grâce à la collaboration — industries, institutions et organisations qui partagent notre passion pour la fabrication de pointe et le matériel open source.",

    pressKicker: 'PRESSE & ACTUALITÉS',
    pressTitle: 'Actualités, mises à jour et histoires',
    pressBody: 'Nos derniers événements, projets et solutions innovantes.',
    readMore: "Lire l'article", pressEmpty: 'Aucun article pour le moment — revenez bientôt.',
    backLabel: 'Retour aux actualités', originalArticle: 'Article original sur fab619.tn',
    loadingLabel: 'Chargement…', notFound: 'Article introuvable.',

    ctKicker: 'NOUS CONTACTER',
    ctTitle: 'Prêt à démarrer votre projet ?',
    ctBody: 'Pour découvrir ce que FAB619 peut faire pour votre entreprise ou recevoir un devis, contactez-nous.',
    ctPhones: 'TÉLÉPHONE', ctNew: 'NOUVEAUX PROJETS', ct3d: 'IMPRESSION 3D',
    ctSupport: 'QUESTIONS & SUPPORT',
    ctWorkshop: "ADRESSE DE L'ATELIER", ctCorp: "ADRESSE DE L'ENTREPRISE",
    ctAddr1: 'FE/AR 03, Neotex, Fabrique entreprenariale, Monastir, Tunisie',
    ctAddr2: 'A8-8, Golden Towers, Centre Urbain Nord, Tunis, Tunisie',
    ctCta: 'NOUS ÉCRIRE',
    footRights: 'Tous droits réservés 2025 © FAB619 — Fabrication à la demande',
    docTitle: 'FAB619 — Fabrication à la demande | Machines personnalisées, automatisation et fabrication numérique',
  };

  const EN = {
    skipLink: 'Skip to content',
    navHome: 'Home', navAbout: 'About', navServices: 'Services',
    navProjects: 'Projects', navPartners: 'Partners', navPress: 'Press', navContact: 'Contact',
    menuLabel: 'Menu', prevLabel: 'Previous', nextLabel: 'Next', slideLabel: 'Slide',
    langGroupLabel: 'Language selection',

    heroKicker: 'WELCOME TO FAB619',
    heroTitle: 'Fabrication<br>on demand',
    heroBodyShort: 'Advanced machines, automation systems and digital fabrication — from concept to prototype.',
    heroCta: 'DISCOVER', heroCta2: 'PROJECT QUOTE',

    aboutKicker: 'WHO WE ARE',
    aboutTitle: 'Innovation, from concept to integration',
    aboutBody1: 'We design and develop custom machines, automation systems and smart products that bridge the gap between innovation and industrial performance.',
    aboutBody2: 'Custom CNC machines, IoT devices, PCBs, digital fabrication or hands-on workshop training — practical, scalable technologies for real impact and measurable results.',
    aboutBody3: 'Our multidisciplinary team combines mechanics, electronics, machine software and digital fabrication — from prototyping to production.',
    altAbout1: 'Electronics assembly bench in the FAB619 workshop',
    altAbout2: 'Machines being assembled in the workshop',
    altAbout3: 'Detail of a FAB619 dosing system',

    statPartners: 'Clients & partners', statServices: 'Integrated services',
    statProjects: 'Showcase projects', statSites: 'Sites — Monastir & Tunis',

    servKicker: 'OUR SERVICES',
    servTitle: 'From concept to final product',
    servBody: 'A wide range of innovative fabrication services, along a single production line.',
    s1t: 'Custom machines', s1d: 'Machine development · Automation systems · Advanced robotics',
    s2t: '3D printing & CNC machining', s2d: 'On-demand fabrication · Rapid prototyping · Custom production',
    s3t: 'IoT & Electronics', s3d: 'Electronic circuits · PCB design & IoT integration · Embedded software',
    s4t: 'Hardware design', s4d: 'Product design · Hardware engineering · Prototyping · Electronics integration',
    s5t: 'Machine software', s5d: 'Control algorithms · Real-time monitoring · Custom software',
    s6t: 'Workshops & Training', s6d: 'Technical documentation · Hands-on workshops · Training sessions',

    projKicker: 'OUR PROJECTS',
    projTitle: 'The machine gallery',
    projBody: 'Our custom solutions in action — from smart machines to industrial innovations.',
    proj1tag: 'PUMPING · PNEUMATIC',
    proj1d: 'Pneumatic pumping station for the continuous feeding of liquid adhesives and low-viscosity materials — high-precision diaphragm pump.',
    proj2tag: 'DOSING · PRECISION',
    proj2d: 'Smart dispensing and dosing system for applications demanding high precision, high throughput and perfect repeatability.',
    proj3tag: 'EDUTECH · INDUSTRY 4.0',
    proj3d: 'Four training models covering the pillars of smart industry: automation, IoT, communication and production.',
    proj4tag: 'CNC · STAINLESS',
    proj4d: 'New-generation CNC dispensing machine — stainless-steel chassis, independent IDEX dual head, optimised for viscous materials.',
    proj5tag: 'PLATFORM · TRAINING',
    proj5d: 'Edutech platform dedicated to hands-on learning of Industry 4.0 technologies — for universities and training centres.',
    viewProject: 'View project',
    atelierTitle: 'The workshop in pictures',

    partKicker: 'CLIENTS & PARTNERS',
    partTitle: 'Collaborating to build the future of manufacturing',
    partBody: 'Innovation thrives on collaboration — industries, institutions and organisations that share our passion for cutting-edge fabrication and open-source hardware.',

    pressKicker: 'PRESS & NEWS',
    pressTitle: 'News, updates and stories',
    pressBody: 'Our latest events, projects and innovative solutions.',
    readMore: 'Read the article', pressEmpty: 'No articles yet — check back soon.',
    backLabel: 'Back to news', originalArticle: 'Original article on fab619.tn',
    loadingLabel: 'Loading…', notFound: 'Article not found.',

    ctKicker: 'CONTACT US',
    ctTitle: 'Ready to start your project?',
    ctBody: 'To find out what FAB619 can do for your business, or to get a quote, get in touch.',
    ctPhones: 'PHONE', ctNew: 'NEW PROJECTS', ct3d: '3D PRINTING',
    ctSupport: 'QUESTIONS & SUPPORT',
    ctWorkshop: 'WORKSHOP ADDRESS', ctCorp: 'COMPANY ADDRESS',
    ctAddr1: 'FE/AR 03, Neotex, Entrepreneurial factory, Monastir, Tunisia',
    ctAddr2: 'A8-8, Golden Towers, Centre Urbain Nord, Tunis, Tunisia',
    ctCta: 'WRITE TO US',
    footRights: 'All rights reserved 2025 © FAB619 — Fabrication on demand',
    docTitle: 'FAB619 — Fabrication on demand | Custom machines, automation and digital fabrication',
  };

  const AR = {
    skipLink: 'الانتقال إلى المحتوى',
    navHome: 'الرئيسية', navAbout: 'من نحن', navServices: 'الخدمات',
    navProjects: 'المشاريع', navPartners: 'الشركاء', navPress: 'الصحافة', navContact: 'اتصل بنا',
    menuLabel: 'القائمة', prevLabel: 'السابق', nextLabel: 'التالي', slideLabel: 'شريحة',
    langGroupLabel: 'اختيار اللغة',

    heroKicker: 'مرحبًا بكم في فاب ٦١٩',
    heroTitle: 'التصنيع<br>عند الطلب',
    heroBodyShort: 'آلات متقدّمة وأنظمة أتمتة وتصنيع رقمي — من الفكرة إلى النموذج الأوّلي.',
    heroCta: 'اكتشِف', heroCta2: 'عرض سعر لمشروعك',

    aboutKicker: 'من نحن؟',
    aboutTitle: 'الابتكار، من الفكرة إلى التكامل',
    aboutBody1: 'نصمّم ونطوّر آلات حسب الطلب وأنظمة أتمتة ومنتجات ذكية تسدّ الفجوة بين الابتكار والأداء الصناعي.',
    aboutBody2: 'آلات CNC مخصّصة، أجهزة إنترنت الأشياء، لوحات إلكترونية، تصنيع رقمي وتكوين في الورشات — تقنيات عملية وقابلة للتطوير، لأثر حقيقي ونتائج ملموسة.',
    aboutBody3: 'فريقنا متعدّد الاختصاصات يجمع الهندسة الميكانيكية والإلكترونيات وبرمجيات الآلات والتصنيع الرقمي — من النمذجة الأوّلية إلى الإنتاج.',
    altAbout1: 'طاولة تجميع إلكتروني في ورشة فاب ٦١٩',
    altAbout2: 'آلات قيد التجميع في الورشة',
    altAbout3: 'تفاصيل نظام جرعات من فاب ٦١٩',

    statPartners: 'حرفاء وشركاء', statServices: 'خدمات متكاملة',
    statProjects: 'مشاريع في الواجهة', statSites: 'موقعان — المنستير وتونس',

    servKicker: 'خدماتنا',
    servTitle: 'من الفكرة إلى المنتج النهائي',
    servBody: 'مجموعة واسعة من خدمات التصنيع المبتكرة، على امتداد خطّ إنتاج واحد.',
    s1t: 'آلات مخصّصة', s1d: 'تطوير الآلات · أنظمة الأتمتة · روبوتات متقدّمة',
    s2t: 'طباعة ثلاثية الأبعاد وتشغيل CNC', s2d: 'تصنيع عند الطلب · نمذجة سريعة · إنتاج مخصّص',
    s3t: 'إنترنت الأشياء والإلكترونيات', s3d: 'دارات إلكترونية · تصميم لوحات PCB وتكامل إنترنت الأشياء · برمجيات مدمجة',
    s4t: 'تصميم العتاد', s4d: 'تصميم المنتجات · هندسة العتاد · النمذجة الأوّلية · التكامل الإلكتروني',
    s5t: 'برمجيات الآلات', s5d: 'خوارزميات التحكّم · مراقبة في الزمن الحقيقي · برمجيات مخصّصة',
    s6t: 'ورشات وتكوين', s6d: 'توثيق تقني · ورشات تطبيقية · دورات تدريبية',

    projKicker: 'مشاريعنا',
    projTitle: 'معرض الآلات',
    projBody: 'حلولنا المصمّمة خصّيصًا وهي تعمل — من الآلات الذكية إلى الابتكارات الصناعية.',
    proj1tag: 'ضخّ · هوائي',
    proj1d: 'محطة ضخّ هوائية للتغذية المتواصلة باللواصق السائلة والموادّ منخفضة اللزوجة — بمضخّة غشائية عالية الدقّة.',
    proj2tag: 'جرعات · دقّة',
    proj2d: 'نظام ذكي للدفق والجرعات، صُمّم للتطبيقات التي تتطلّب دقّة عالية ووتيرة سريعة وتكرارًا مثاليًا.',
    proj3tag: 'تعليم تقني · صناعة 4.0',
    proj3d: 'أربعة نماذج تدريبية تغطّي ركائز الصناعة الذكية: الأتمتة، إنترنت الأشياء، الاتصالات والإنتاج.',
    proj4tag: 'CNC · فولاذ مقاوم',
    proj4d: 'آلة CNC للدفق من الجيل الجديد — هيكل من الفولاذ المقاوم للصدأ، رأسان مستقلّان IDEX، محسَّنة للموادّ اللزجة.',
    proj5tag: 'منصّة · تكوين',
    proj5d: 'منصّة تعليمية تقنية مخصّصة للتعلّم التطبيقي لتقنيات الصناعة 4.0 — للجامعات ومراكز التكوين.',
    viewProject: 'شاهد المشروع',
    atelierTitle: 'الورشة في صور',

    partKicker: 'حرفاؤنا وشركاؤنا',
    partTitle: 'نتعاون لبناء مستقبل التصنيع',
    partBody: 'الابتكار يزدهر بالتعاون — صناعات ومؤسّسات ومنظّمات تشاركنا الشغف بالتصنيع المتطوّر والعتاد مفتوح المصدر.',

    pressKicker: 'الصحافة والأخبار',
    pressTitle: 'أخبار ومستجدّات وقصص',
    pressBody: 'آخر فعالياتنا ومشاريعنا وحلولنا المبتكرة.',
    readMore: 'اقرأ المقال', pressEmpty: 'لا توجد مقالات بعد — عودوا قريبًا.',
    backLabel: 'العودة إلى الأخبار', originalArticle: 'المقال الأصلي على fab619.tn',
    loadingLabel: 'جارٍ التحميل…', notFound: 'المقال غير موجود.',

    ctKicker: 'اتصلوا بنا',
    ctTitle: 'مستعدّون لإطلاق مشروعكم؟',
    ctBody: 'لاكتشاف ما يمكن لفاب ٦١٩ أن يقدّمه لمؤسّستكم، أو للحصول على عرض سعر، تواصلوا معنا.',
    ctPhones: 'الهاتف', ctNew: 'للمشاريع الجديدة', ct3d: 'خدمات الطباعة ثلاثية الأبعاد',
    ctSupport: 'الأسئلة والدعم',
    ctWorkshop: 'عنوان الورشة', ctCorp: 'عنوان الشركة',
    ctAddr1: 'FE/AR 03، نيوتكس، المصنع الريادي، المنستير، تونس',
    ctAddr2: 'A8-8، الأبراج الذهبية، المركز العمراني الشمالي، تونس العاصمة',
    ctCta: 'راسلونا',
    footRights: 'جميع الحقوق محفوظة ٢٠٢٥ © فاب ٦١٩ — التصنيع عند الطلب',
    docTitle: 'فاب ٦١٩ — التصنيع عند الطلب | آلات مخصّصة وأتمتة وتصنيع رقمي',
  };

  const DICTS = { fr: FR, en: EN, ar: AR };
  const saved = localStorage.getItem('fab619-lang');
  let current = DICTS[saved] ? saved : 'fr';
  let transitioning = false;

  function applyDict(lang) {
    const d = DICTS[lang];
    document.querySelectorAll('[data-i18n]').forEach((el) => {
      const key = el.getAttribute('data-i18n');
      if (d[key] !== undefined) {
        if (key === 'heroTitle') el.innerHTML = d[key];
        else el.textContent = d[key];
      }
    });
    document.querySelectorAll('[data-i18n-alt]').forEach((el) => {
      const key = el.getAttribute('data-i18n-alt');
      if (d[key] !== undefined) el.alt = d[key];
    });
    document.querySelectorAll('[data-i18n-aria]').forEach((el) => {
      const key = el.getAttribute('data-i18n-aria');
      if (d[key] !== undefined) el.setAttribute('aria-label', d[key]);
    });
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.body.classList.toggle('lang-ar', lang === 'ar');
    if (d.docTitle && !document.body.dataset.keepTitle) document.title = d.docTitle;
    document.querySelectorAll('.lang-switch button').forEach((b) => {
      b.setAttribute('aria-pressed', String(b.dataset.lang === lang));
    });
    window.FAB_LANG = lang;
    window.dispatchEvent(new CustomEvent('fab:lang', { detail: { lang } }));
  }

  /* factory roller-door wipe between languages */
  function cinematicSwitch(target) {
    if (transitioning || target === current || !DICTS[target]) return;
    const shutter = document.getElementById('shutter');
    const commit = () => {
      applyDict(target);
      current = target;
      localStorage.setItem('fab619-lang', target);
    };
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!shutter || reduced || !window.gsap) { commit(); return; }

    transitioning = true;
    const slatsWrap = shutter.querySelector('.shutter-slats');
    if (!slatsWrap.children.length) {
      for (let i = 0; i < 10; i++) {
        const s = document.createElement('div');
        s.className = 'shutter-slat';
        slatsWrap.appendChild(s);
      }
    }
    const slats = shutter.querySelectorAll('.shutter-slat');
    const laser = shutter.querySelector('.shutter-laser');
    const brand = document.getElementById('shutterBrand');
    brand.textContent = target === 'ar' ? 'فاب ٦١٩' : 'FAB619';
    brand.style.fontFamily = target === 'ar' ? "'IBM Plex Sans Arabic', sans-serif" : "'Space Grotesk', sans-serif";
    shutter.classList.add('active');

    const cleanup = () => {
      shutter.classList.remove('active');
      gsap.set(slats, { scaleY: 0 });
      gsap.set([brand, laser], { opacity: 0 });
      transitioning = false;
    };
    gsap.timeline({ onComplete: cleanup, onInterrupt: cleanup })
      .set(slats, { transformOrigin: 'top center' })
      .to(slats, { scaleY: 1.02, duration: 0.28, stagger: 0.02, ease: 'power3.in' })
      .to(laser, { opacity: 1, scaleX: 1, duration: 0.18, ease: 'power2.out' }, '-=0.1')
      .to(brand, { opacity: 1, scale: 1.05, duration: 0.24, ease: 'power2.out' }, '-=0.12')
      .add(commit)
      .to(brand, { opacity: 0, scale: 0.97, duration: 0.2, ease: 'power2.in' }, '+=0.3')
      .to(laser, { opacity: 0, scaleX: 0, duration: 0.16 }, '<')
      .set(slats, { transformOrigin: 'bottom center' })
      .to(slats, { scaleY: 0, duration: 0.32, stagger: { each: 0.02, from: 'end' }, ease: 'power3.out' });
  }

  document.addEventListener('DOMContentLoaded', () => {
    applyDict(current);
    document.querySelectorAll('.lang-switch button').forEach((b) => {
      b.addEventListener('click', () => cinematicSwitch(b.dataset.lang));
    });
  });

  window.FAB_I18N = { get lang() { return current; }, dicts: DICTS, switch: cinematicSwitch };
})();
