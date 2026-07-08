/* ═══ FAB619 — i18n FR ⇄ AR with cinematic shutter transition ═══ */
(function () {
  'use strict';

  const FR = {
    loaderText: "INITIALISATION DE L'ATELIER",
    navHome: 'Accueil', navAbout: 'À propos', navServices: 'Services',
    navProjects: 'Projets', navPartners: 'Partenaires', navPress: 'Presse', navContact: 'Contact',
    scrollHint: 'DÉFILER POUR ENTRER',
    skipLink: 'Aller au contenu',
    heroBodyShort: "Machines avancées, systèmes d'automatisation et fabrication numérique — du concept au prototype.",
    altAbout1: "Banc d'assemblage électronique dans l'atelier FAB619",
    altAbout2: "Machines en cours d'assemblage dans l'atelier",
    altAbout3: "Détail d'un système de dosage FAB619",
    viewProject: 'Voir le projet', readMore: "Lire l'article",
    atelierTitle: "L'atelier en images",
    menuLabel: 'Menu', prevLabel: 'Précédent', nextLabel: 'Suivant', slideLabel: 'Diapositive',
    cineLink: 'Expérience 3D cinématique',

    heroKicker: 'BIENVENUE CHEZ FAB619',
    heroTitle: 'Fabrication<br>à la demande',
    heroBody: "Un bureau d'études spécialisé dans les machines avancées, les systèmes d'automatisation et la fabrication numérique. Du concept au prototype — des solutions efficaces, testées, optimisées pour la productivité, la qualité et l'évolutivité industrielle.",
    heroCta: 'DÉCOUVRIR', heroCta2: 'DEVIS PROJET',

    aboutKicker: 'QUI SOMMES-NOUS ?',
    aboutTitle: "L'innovation, du concept à l'intégration",
    aboutBody1: "Nous concevons et développons des machines sur mesure, des systèmes d'automatisation et des produits intelligents qui comblent le fossé entre l'innovation et la performance industrielle.",
    aboutBody2: "Machines CNC personnalisées, appareils IoT, cartes PCB, fabrication numérique ou formations en atelier — des technologies pratiques et évolutives, pour un impact réel et des résultats mesurables.",
    aboutBody3: "Notre équipe multidisciplinaire réunit mécanique, électronique, logiciel machine et fabrication numérique — du prototypage à la production.",

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

    partKicker: 'CLIENTS & PARTENAIRES',
    partTitle: "Collaborer pour construire l'avenir de la fabrication",
    partBody: "L'innovation prospère grâce à la collaboration — industries, institutions et organisations qui partagent notre passion pour la fabrication de pointe et le matériel open source.",

    pressKicker: 'PRESSE & ACTUALITÉS',
    pressTitle: 'Actualités, mises à jour et histoires',
    pressBody: 'Nos derniers événements, projets et solutions innovantes.',
    press1date: '22.10.2025', press1t: 'JellyDoser — Doser avec précision',
    press1d: 'Parfums, huiles, cosmétiques ou jus artisanaux : des solutions de dosage et de remplissage sur mesure, pensées pour les petites structures.',
    press2date: '22.08.2025', press2t: "La fabrication numérique face aux défis de l'automobile",
    press2d: "Pompage, dosage et dépose d'adhésifs : précision, répétabilité et automatisation dans les procédés modernes d'assemblage — ADM IDEX, SCPDS, JELLY DOSER.",
    press3date: '20.05.2025', press3t: 'Machine Building Workshop — Round 2',
    press3d: '4 machines CNC construites pour CETTEX · CETIME · CETIBA — la formation par la fabrication.',

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

    zones: ['L’ATELIER', 'QUI SOMMES-NOUS', 'LA CHAÎNE DE PRODUCTION', 'LA GALERIE DES MACHINES', 'LE TUNNEL DES PARTENAIRES', 'LA PRESSE', 'LE BUREAU'],
    zoneNums: ['01', '02', '03', '04', '05', '06', '07'],
    docTitle: 'FAB619 — Fabrication à la demande | Machines personnalisées, automatisation et fabrication numérique',
  };

  const AR = {
    loaderText: 'جارٍ تشغيل الورشة',
    navHome: 'الرئيسية', navAbout: 'من نحن', navServices: 'الخدمات',
    navProjects: 'المشاريع', navPartners: 'الشركاء', navPress: 'الصحافة', navContact: 'اتصل بنا',
    scrollHint: 'مرّر للدخول',
    skipLink: 'الانتقال إلى المحتوى',
    heroBodyShort: 'آلات متقدّمة وأنظمة أتمتة وتصنيع رقمي — من الفكرة إلى النموذج الأوّلي.',
    altAbout1: 'طاولة تجميع إلكتروني في ورشة فاب ٦١٩',
    altAbout2: 'آلات قيد التجميع في الورشة',
    altAbout3: 'تفاصيل نظام جرعات من فاب ٦١٩',
    viewProject: 'شاهد المشروع', readMore: 'اقرأ المقال',
    atelierTitle: 'الورشة في صور',
    menuLabel: 'القائمة', prevLabel: 'السابق', nextLabel: 'التالي', slideLabel: 'شريحة',
    cineLink: 'التجربة السينمائية ثلاثية الأبعاد',

    heroKicker: 'مرحبًا بكم في فاب ٦١٩',
    heroTitle: 'التصنيع<br>عند الطلب',
    heroBody: 'مكتب دراسات متخصّص في الآلات المتقدّمة وأنظمة الأتمتة والتصنيع الرقمي. من الفكرة إلى النموذج الأوّلي — حلول فعّالة ومُختبَرة، محسَّنة للإنتاجية والجودة وقابلية التوسّع الصناعي.',
    heroCta: 'اكتشِف', heroCta2: 'عرض سعر لمشروعك',

    aboutKicker: 'من نحن؟',
    aboutTitle: 'الابتكار، من الفكرة إلى التكامل',
    aboutBody1: 'نصمّم ونطوّر آلات حسب الطلب وأنظمة أتمتة ومنتجات ذكية تسدّ الفجوة بين الابتكار والأداء الصناعي.',
    aboutBody2: 'آلات CNC مخصّصة، أجهزة إنترنت الأشياء، لوحات إلكترونية، تصنيع رقمي وتكوين في الورشات — تقنيات عملية وقابلة للتطوير، لأثر حقيقي ونتائج ملموسة.',
    aboutBody3: 'فريقنا متعدّد الاختصاصات يجمع الهندسة الميكانيكية والإلكترونيات وبرمجيات الآلات والتصنيع الرقمي — من النمذجة الأوّلية إلى الإنتاج.',

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

    partKicker: 'حرفاؤنا وشركاؤنا',
    partTitle: 'نتعاون لبناء مستقبل التصنيع',
    partBody: 'الابتكار يزدهر بالتعاون — صناعات ومؤسّسات ومنظّمات تشاركنا الشغف بالتصنيع المتطوّر والعتاد مفتوح المصدر.',

    pressKicker: 'الصحافة والأخبار',
    pressTitle: 'أخبار ومستجدّات وقصص',
    pressBody: 'آخر فعالياتنا ومشاريعنا وحلولنا المبتكرة.',
    press1date: '٢٢.١٠.٢٠٢٥', press1t: 'جيلي دوزر — جرعات بدقّة متناهية',
    press1d: 'عطور، زيوت، مستحضرات تجميل أو عصائر حرفية: حلول جرعات وتعبئة حسب الطلب، مصمّمة للمؤسّسات الصغيرة.',
    press2date: '٢٢.٠٨.٢٠٢٥', press2t: 'التصنيع الرقمي في مواجهة تحدّيات صناعة السيّارات',
    press2d: 'ضخّ اللواصق وجرعاتها ودفقها: الدقّة والتكرار والأتمتة في عمليات التجميع الحديثة — ADM IDEX وSCPDS وJELLY DOSER.',
    press3date: '٢٠.٠٥.٢٠٢٥', press3t: 'ورشة بناء الآلات — الجولة الثانية',
    press3d: 'أربع آلات CNC صُنعت لفائدة CETTEX · CETIME · CETIBA — التكوين عن طريق التصنيع.',

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

    zones: ['الورشة', 'من نحن', 'خطّ الإنتاج', 'معرض الآلات', 'نفق الشركاء', 'الصحافة', 'المكتب'],
    zoneNums: ['٠١', '٠٢', '٠٣', '٠٤', '٠٥', '٠٦', '٠٧'],
    docTitle: 'فاب ٦١٩ — التصنيع عند الطلب | آلات مخصّصة وأتمتة وتصنيع رقمي',
  };

  const DICTS = { fr: FR, ar: AR };
  let current = localStorage.getItem('fab619-lang') || 'fr';
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
    document.body.classList.toggle('lang-fr', lang === 'fr');
    document.title = d.docTitle;
    const btnText = document.getElementById('langBtnText');
    const btn = document.getElementById('langBtn');
    if (btnText) btnText.textContent = lang === 'fr' ? 'عربي' : 'FR';
    if (btn) btn.setAttribute('aria-label', lang === 'fr' ? 'التبديل إلى العربية' : 'Passer au français');
    window.FAB_LANG = lang;
    window.dispatchEvent(new CustomEvent('fab:lang', { detail: { lang } }));
  }

  /* factory roller-door shutter: close → swap language (+3D whip) → open */
  function cinematicSwitch() {
    if (transitioning) return;
    transitioning = true;
    const target = current === 'fr' ? 'ar' : 'fr';
    const shutter = document.getElementById('shutter');
    const brand = document.getElementById('shutterBrand');
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
    brand.textContent = target === 'ar' ? 'فاب ٦١٩' : 'FAB619';
    brand.style.fontFamily = target === 'ar'
      ? "'IBM Plex Sans Arabic', sans-serif" : "'Space Grotesk', sans-serif";
    shutter.classList.add('active');

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced || !window.gsap) {
      applyDict(target);
      current = target;
      localStorage.setItem('fab619-lang', target);
      shutter.classList.remove('active');
      transitioning = false;
      return;
    }

    const cleanup = () => {
      shutter.classList.remove('active');
      gsap.set(slats, { scaleY: 0 });
      gsap.set([brand, laser], { opacity: 0 });
      transitioning = false;
    };
    const tl = gsap.timeline({ onComplete: cleanup, onInterrupt: cleanup });

    // CLOSE — slats drop like a roller door
    tl.set(slats, { transformOrigin: 'top center' })
      .to(slats, { scaleY: 1.02, duration: 0.42, stagger: 0.035, ease: 'power3.in' })
      .to(laser, { opacity: 1, scaleX: 1, duration: 0.3, ease: 'power2.out' }, '-=0.15')
      .to(brand, { opacity: 1, scale: 1.06, duration: 0.4, ease: 'power2.out' }, '-=0.2')
      .add(() => {
        applyDict(target);
        current = target;
        localStorage.setItem('fab619-lang', target);
        if (window.FAB_onLangWhip) window.FAB_onLangWhip(target); // 3D camera whip hook
      })
      .to(brand, { opacity: 0, scale: 0.96, duration: 0.34, ease: 'power2.in' }, '+=0.62')
      .to(laser, { opacity: 0, scaleX: 0, duration: 0.26 }, '<')
      // OPEN — slats lift bottom-up
      .set(slats, { transformOrigin: 'bottom center' })
      .to(slats, { scaleY: 0, duration: 0.5, stagger: { each: 0.035, from: 'end' }, ease: 'power3.out' });
  }

  document.addEventListener('DOMContentLoaded', () => {
    applyDict(current);
    document.getElementById('langBtn').addEventListener('click', cinematicSwitch);
  });

  window.FAB_I18N = { get lang() { return current; }, dicts: DICTS, switch: cinematicSwitch };
})();
