/* ═══════════════════════════════════════════════════════════
   FAB619 — L'USINE CINÉMATIQUE
   A scroll-driven dolly ride through a dark factory hall.
   Zones: video wall → who-we-are triptych → service line →
   machine gallery → archive arch → partner tunnel → press → office.
   ═══════════════════════════════════════════════════════════ */
import * as THREE from 'three';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js';

const A = '/assets';
const YELLOW = 0xfdf81a;
const RED = 0xbf2626;
const isMobile = matchMedia('(max-width: 860px)').matches;
const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ── renderer ── */
const canvas = document.getElementById('scene');
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, powerPreference: 'high-performance' });
renderer.setPixelRatio(Math.min(devicePixelRatio, isMobile ? 1.5 : 1.75));
renderer.setSize(innerWidth, innerHeight);
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.12;

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x070708);
scene.fog = new THREE.FogExp2(0x070708, 0.016);

const camera = new THREE.PerspectiveCamera(58, innerWidth / innerHeight, 0.1, 260);

/* ── composer / bloom ── */
const composer = new EffectComposer(renderer);
composer.addPass(new RenderPass(scene, camera));
const bloom = new UnrealBloomPass(
  new THREE.Vector2(innerWidth, innerHeight),
  isMobile ? 0.3 : 0.4, 0.5, 0.86
);
composer.addPass(bloom);
composer.addPass(new OutputPass());

/* ── loading manager → loader UI ── */
const manager = new THREE.LoadingManager();
const loaderFill = document.getElementById('loaderFill');
const loaderPct = document.getElementById('loaderPct');
manager.onProgress = (_u, done, total) => {
  const p = Math.round((done / total) * 100);
  loaderFill.style.width = p + '%';
  loaderPct.textContent = p + '%';
};
manager.onLoad = () => setTimeout(beginExperience, 350);
setTimeout(beginExperience, 14000); // failsafe: never trap the user on the loader
const TL = new THREE.TextureLoader(manager);

function tex(path, srgb = true) {
  const t = TL.load(path);
  if (srgb) t.colorSpace = THREE.SRGBColorSpace;
  t.anisotropy = 4;
  return t;
}

/* ═══ MATERIALS ═══ */
const matFloor = new THREE.MeshStandardMaterial({ color: 0x101013, roughness: 0.32, metalness: 0.42 });
const matSteel = new THREE.MeshStandardMaterial({ color: 0x1b1b20, roughness: 0.5, metalness: 0.72 });
const matSteelDark = new THREE.MeshStandardMaterial({ color: 0x121216, roughness: 0.62, metalness: 0.55 });
const matYellowPaint = new THREE.MeshStandardMaterial({ color: 0x8f8c17, roughness: 0.45, metalness: 0.3 });

/* ═══ FLOOR + CENTER GUIDE STRIP ═══ */
scene.add(new THREE.Mesh(new THREE.PlaneGeometry(64, 300).rotateX(-Math.PI / 2).translate(0, 0, -110), matFloor));

const guides = []; // pulsing runway lights
{
  const g = new THREE.BoxGeometry(0.16, 0.02, 1.6);
  for (let z = 10; z > -212; z -= 4) {
    const m = new THREE.MeshBasicMaterial({ color: YELLOW });
    const seg = new THREE.Mesh(g, m);
    seg.position.set(0, 0.012, z);
    scene.add(seg);
    guides.push({ m, z });
  }
}

/* ═══ PORTAL GANTRIES (factory ribs that ignite as you pass) ═══ */
const igniters = []; // { mat, cone?, z, on }
function portal(z, tint = YELLOW) {
  const grp = new THREE.Group();
  const colGeo = new THREE.BoxGeometry(0.5, 7.4, 0.5);
  const beamGeo = new THREE.BoxGeometry(13.4, 0.55, 0.5);
  const colL = new THREE.Mesh(colGeo, matSteel); colL.position.set(-6.45, 3.7, 0);
  const colR = new THREE.Mesh(colGeo, matSteel); colR.position.set(6.45, 3.7, 0);
  const beam = new THREE.Mesh(beamGeo, matSteel); beam.position.set(0, 7.15, 0);
  // hazard chevrons on columns
  const hzGeo = new THREE.BoxGeometry(0.54, 1.1, 0.54);
  const hzL = new THREE.Mesh(hzGeo, matYellowPaint); hzL.position.set(-6.45, 1.2, 0);
  const hzR = new THREE.Mesh(hzGeo, matYellowPaint); hzR.position.set(6.45, 1.2, 0);
  // under-beam light strip (ignites)
  const stripMat = new THREE.MeshBasicMaterial({ color: 0x141410 });
  const strip = new THREE.Mesh(new THREE.BoxGeometry(9.5, 0.09, 0.16), stripMat);
  strip.position.set(0, 6.85, 0);
  // faux volumetric cone
  const coneMat = new THREE.MeshBasicMaterial({
    color: tint, transparent: true, opacity: 0,
    blending: THREE.AdditiveBlending, depthWrite: false, side: THREE.DoubleSide,
  });
  const cone = new THREE.Mesh(new THREE.ConeGeometry(2.5, 6.8, 4, 1, true), coneMat);
  cone.position.set(0, 3.45, 0);
  cone.rotation.y = Math.PI / 4;
  grp.add(colL, colR, beam, hzL, hzR, strip, cone);
  grp.position.z = z;
  scene.add(grp);
  igniters.push({ mat: stripMat, cone: coneMat, z, tint: new THREE.Color(tint), maxCone: 0.03 });
}
for (let z = 4; z > -210; z -= 14) portal(z, z < -142 && z > -175 ? RED : YELLOW);

/* far wall light tubes — parallax depth */
{
  const g = new THREE.BoxGeometry(0.08, 5.2, 0.08);
  for (let z = 0; z > -205; z -= 11) {
    for (const x of [-14, 14]) {
      const m = new THREE.Mesh(g, new THREE.MeshBasicMaterial({ color: 0x2a2a20 }));
      m.position.set(x + (Math.sin(z) * 1.4), 2.8, z - 4);
      scene.add(m);
    }
  }
}

/* ═══ IMAGE PANEL FACTORY (framed lightbox that brightens on approach) ═══ */
const litPanels = []; // { mat, z }
function panel(url, w, h, pos, rotY = 0, opts = {}) {
  const grp = new THREE.Group();
  const backing = new THREE.Mesh(new THREE.BoxGeometry(w + 0.34, h + 0.34, 0.12), matSteelDark);
  backing.position.z = -0.08;
  const mat = new THREE.MeshBasicMaterial({ map: tex(url), color: 0x0d0d0d });
  const img = new THREE.Mesh(new THREE.PlaneGeometry(w, h), mat);
  // top light bar
  const barMat = new THREE.MeshBasicMaterial({ color: opts.barColor ?? YELLOW });
  const bar = new THREE.Mesh(new THREE.BoxGeometry(w * 0.72, 0.06, 0.06), barMat);
  bar.position.set(0, h / 2 + 0.28, 0.06);
  grp.add(backing, img, bar);
  grp.position.copy(pos);
  grp.rotation.y = rotY;
  scene.add(grp);
  litPanels.push({ mat, barMat, z: pos.z, holdBright: !!opts.holdBright, barColor: new THREE.Color(opts.barColor ?? YELLOW) });
  return grp;
}

/* ═══ Z0 · HERO — THE VIDEO WALL ═══ */
const video = document.getElementById('heroVideo');
const videoTex = new THREE.VideoTexture(video);
videoTex.colorSpace = THREE.SRGBColorSpace;
{
  const wallGrp = new THREE.Group();
  const frame = new THREE.Mesh(new THREE.BoxGeometry(16.2, 9.4, 0.5), matSteel);
  frame.position.z = -0.3;
  const screen = new THREE.Mesh(
    new THREE.PlaneGeometry(15.4, 8.66),
    new THREE.MeshBasicMaterial({ map: videoTex })
  );
  const topBar = new THREE.Mesh(new THREE.BoxGeometry(12, 0.1, 0.1), new THREE.MeshBasicMaterial({ color: YELLOW }));
  topBar.position.set(0, 5.05, 0.1);
  wallGrp.add(frame, screen, topBar);
  wallGrp.position.set(0, 4.6, -12);
  scene.add(wallGrp);

  // approach corridor — the four original slideshow frames, angled inward
  panel(`${A}/images/slideshow/slide-1.webp`, 4.6, 2.6, new THREE.Vector3(-5.9, 2.9, 6), Math.PI / 5.4);
  panel(`${A}/images/slideshow/slide-2.webp`, 4.6, 2.6, new THREE.Vector3(5.9, 2.9, 6), -Math.PI / 5.4);
  panel(`${A}/images/slideshow/slide-3.webp`, 4.6, 2.6, new THREE.Vector3(-5.9, 2.9, 0.5), Math.PI / 5.4);
  panel(`${A}/images/slideshow/slide-4.webp`, 4.6, 2.6, new THREE.Vector3(5.9, 2.9, 0.5), -Math.PI / 5.4);
}

/* ═══ Z1 · ABOUT — WHO-WE-ARE TRIPTYCH (left wall) ═══ */
{
  const face = Math.PI / 2; // face +x, toward the lane
  panel(`${A}/images/whoarewe/left.webp`, 2.7, 4.9, new THREE.Vector3(-6.1, 3.0, -26.4), face);
  panel(`${A}/images/whoarewe/right-top.webp`, 4.3, 2.35, new THREE.Vector3(-6.1, 4.25, -30.6), face);
  panel(`${A}/images/whoarewe/right-bottom.webp`, 4.3, 2.35, new THREE.Vector3(-6.1, 1.55, -30.6), face);
}

/* ═══ Z2 · SERVICES — SIX STATIONS ALONG THE LINE ═══ */
const SERVICES = [
  'custom-machine', 'printing', 'electronics', 'design', 'machine-software', 'workshop',
];
SERVICES.forEach((name, i) => {
  const left = i % 2 === 0;
  const x = left ? -5.2 : 5.2;
  const z = -48 - i * 7.5;
  const rotY = left ? Math.PI / 2.6 : -Math.PI / 2.6;
  panel(`${A}/images/services/${name}.webp`, 4.5, 2.9, new THREE.Vector3(x, 2.65, z), rotY);
  // pedestal
  const ped = new THREE.Mesh(new THREE.BoxGeometry(1.6, 1.0, 1.6), matSteel);
  ped.position.set(x * 0.99, 0.5, z);
  scene.add(ped);
});
/* services backdrop banner, high above the line */
{
  const m = new THREE.Mesh(
    new THREE.PlaneGeometry(17, 6.4),
    new THREE.MeshBasicMaterial({ map: tex(`${A}/images/services/services-bg.webp`), color: 0x2c2c2c, transparent: true, opacity: 0.82 })
  );
  m.position.set(0, 7.6, -70);
  m.rotation.x = 0.28;
  scene.add(m);
}

/* ═══ Z3 · PROJECTS — GALLERY OF MACHINES (right wall) ═══ */
const PROJECTS = [
  'baa5df419ca3a2bcf2ce3d3d6b478ab42be46025-1684x1042.webp',   // SCPDS
  '006a87db783aad06dd8868ad9f75a5d6f0ea42f2-1170x723.webp',     // JELLY DOSER
  'e4e94d580eb49fcde099df410871400c377d17d1-879x553.png',       // JELLYEDGE 4.00
  '6eac568e6cbd8498b060e9d0f1924a8864d80def-4000x2472.webp',    // ADM IDEX V2
  '445483b4a542ceb6f6f5f563cdf93e035fbade8a-1980x1224.webp',    // JELLYEDGE I4.0
];
PROJECTS.forEach((file, i) => {
  const z = -104 - i * 7.5;
  panel(`${A}/projects/${file}`, 5.4, 3.35, new THREE.Vector3(6.1, 2.85, z), -Math.PI / 2, { barColor: i % 2 ? RED : YELLOW });
});

/* ═══ ARCHIVE ARCH — remaining workshop shots forming a gate ═══ */
const ARCHIVE = [
  '14d53df181f781f910d4e3c395bc55c823d5e9ab-1170x723.webp',
  '24bd82afb18a3b269e904fdfbac49b71b8ede0dc-1754x1084.webp',
  '4ef545b1a46639b039773948012685062595ab1c-4000x2472.webp',
  '5456fd20b9cdb721a2973a2e09a862c114953ebf-1080x667.webp',
  '61e4a173a50e5a79058b911ba75acda0e443cd04-2340x1446.webp',
  '64776a1da103719d7b848bd82929293397b0fed0-1754x1084.webp',
  '8ecdf4bad53a6c3acb796cdb4c3409a5efa1289b-1754x1084.webp',
  '8f1db9ab2795425217acc54ea21c77cbb3ba9fca-1080x1080.jpg',
  '9a0340d2615f81ab0cf706d63088c21088fa83d5-3312x3000.webp',
  'b54be78e565a7ca42f61e0b8a44108e36127d346-1200x900.webp',
  'b814b03e802b8317c5c86e56f3afa316a4f0eefb-2480x1697.jpg',
  'b944c96b0dde885b29bb8c1659e395ff8726886a-4928x3046.webp',
  'c30beed20c1be34d08ae6ea2007ba9462e5c58f3-2563x1222.jpg',
  'ccb1d8169d84c5072cbe3e1c406b7e655ec78bca-3780x1618.webp',
  'f9ebed2dcac91d5089d312ca89558e6b2c7b754b-1080x707.webp',
];
ARCHIVE.forEach((file, i) => {
  const side = i % 3; // 0 left, 1 right, 2 overhead
  const k = Math.floor(i / 3);
  if (side < 2) {
    const x = side === 0 ? -4.4 : 4.4;
    panel(`${A}/projects/${file}`, 1.9, 1.25, new THREE.Vector3(x, 1.9 + (k % 2) * 1.65, -138.5 - k * 1.55), side === 0 ? Math.PI / 2 : -Math.PI / 2);
  } else {
    const m = new THREE.Mesh(
      new THREE.PlaneGeometry(2.1, 1.35),
      new THREE.MeshBasicMaterial({ map: tex(`${A}/projects/${file}`), color: 0x0d0d0d })
    );
    m.position.set((k - 2) * 2.4, 6.7, -140.5);
    m.rotation.x = Math.PI / 2.35;
    scene.add(m);
    litPanels.push({ mat: m.material, z: -140.5 });
  }
});

/* ═══ Z4 · PARTNER TUNNEL — 23 plaques + entrance banner ═══ */
const MARQUEES = [
  'association-tunisienne-de-mecanique', 'bako', 'calotex',
  'deutsche-gesellschaft-für-internationale-zusammenarbeit', 'deutsche-zusammenarbeit',
  'employment4youth', 'enim', 'eniso', 'enixads', 'helmut-schmidt-universitat',
  'hutchinson', 'inmachines', 'invest-for-jobs', 'iset-ksar-hellal', 'lasoie',
  'meditec', 'ministère-de-l-industrie-tunisien', 'neotex', 'openlab-hamburg',
  'pole-de-competitivite-monastir', 'seamtech', 'trimakus', 'unido',
];
{
  // entrance banner — original clients-and-partners strip
  const banner = new THREE.Mesh(
    new THREE.PlaneGeometry(9.5, 1.75),
    new THREE.MeshBasicMaterial({ map: tex(`${A}/images/clients-and-partners.webp`), color: 0x0d0d0d })
  );
  banner.position.set(0, 5.6, -145.5);
  scene.add(banner);
  litPanels.push({ mat: banner.material, z: -145.5 });

  const plaqueGeo = new THREE.PlaneGeometry(1.85, 1.05);
  const backGeo = new THREE.BoxGeometry(2.05, 1.25, 0.08);
  MARQUEES.forEach((name, i) => {
    const left = i % 2 === 0;
    const row = Math.floor(i / 2) % 2;
    const seg = Math.floor(i / 4);
    const z = -149.5 - seg * 3.7 - (row ? 1.85 : 0);
    const x = left ? -3.75 : 3.75;
    const grp = new THREE.Group();
    const back = new THREE.Mesh(backGeo, matSteelDark);
    back.position.z = -0.06;
    const mat = new THREE.MeshBasicMaterial({ map: tex(`${A}/marquees/${name}.webp`), color: 0x151515 });
    grp.add(back, new THREE.Mesh(plaqueGeo, mat));
    grp.position.set(x, row ? 3.25 : 1.75, z);
    grp.rotation.y = left ? Math.PI / 2 : -Math.PI / 2;
    scene.add(grp);
    litPanels.push({ mat, z, whitePlaque: true });
  });
}

/* ═══ Z5 · PRESS — THREE LIGHTBOXES ═══ */
const PRESS = [
  { f: 'a31235291b1a7ce1cb5492d5f7a95b9b1bbdc73d-928x634.webp', x: 2.7, z: -181 },
  { f: 'ad03852f168ab82e2511d70d3f8184bc8d06ccc0-1366x768.jpg', x: -2.7, z: -186 },
  { f: '9ad09fa11d0af9946fadd3455bd633cea6c59810-3496x2161.webp', x: 0.4, z: -191 },
];
PRESS.forEach((p, i) => {
  panel(`${A}/projects/${p.f}`, 4.7, 3.0, new THREE.Vector3(p.x, 2.7, p.z), (i - 1) * -0.14, { barColor: RED });
});
/* press backdrop — the site's og-home visual, dim */
{
  const m = new THREE.Mesh(
    new THREE.PlaneGeometry(15, 8.4),
    new THREE.MeshBasicMaterial({ map: tex(`${A}/images/og-home.webp`), color: 0x1f1f1f })
  );
  m.position.set(0, 4.1, -196.5);
  scene.add(m);
}

/* ═══ Z6 · CONTACT — THE OFFICE CHAMBER ═══ */
{
  const wall = panel(`${A}/images/contact-background.webp`, 15.4, 8.7, new THREE.Vector3(0, 4.5, -215), 0, { holdBright: true });
  wall.children[2].visible = false; // no top bar on the big wall
  panel(`${A}/images/workshop-background.webp`, 9, 5.1, new THREE.Vector3(-7.6, 3.4, -207), Math.PI / 2.15);
  panel(`${A}/images/corporate-background.webp`, 9, 5.1, new THREE.Vector3(7.6, 3.4, -207), -Math.PI / 2.15);

  // glowing FAB619 logo — site SVG inverted to white on a canvas
  const img = new Image();
  img.onload = () => {
    const c = document.createElement('canvas');
    c.width = 1024; c.height = 388;
    const ctx = c.getContext('2d');
    ctx.filter = 'invert(1) brightness(1.7)';
    ctx.drawImage(img, 0, 0, 1024, 388);
    const t = new THREE.CanvasTexture(c);
    t.colorSpace = THREE.SRGBColorSpace;
    const logo = new THREE.Mesh(
      new THREE.PlaneGeometry(7.4, 2.8),
      new THREE.MeshBasicMaterial({ map: t, transparent: true, blending: THREE.AdditiveBlending, depthWrite: false, opacity: 0.9 })
    );
    logo.position.set(0, 5.2, -214.4);
    scene.add(logo);
  };
  img.src = `${A}/logo/fab-619-logo.svg`;

  // yellow halo ring on the office floor
  const ring = new THREE.Mesh(
    new THREE.RingGeometry(2.6, 2.72, 64).rotateX(-Math.PI / 2),
    new THREE.MeshBasicMaterial({ color: YELLOW, transparent: true, opacity: 0.5, blending: THREE.AdditiveBlending, depthWrite: false })
  );
  ring.position.set(0, 0.02, -207);
  scene.add(ring);
}

/* ═══ REAL LIGHTS (floor pools only — panels are self-lit) ═══ */
scene.add(new THREE.AmbientLight(0xffffff, 0.32));
scene.add(new THREE.HemisphereLight(0x3a3a30, 0x0a0a0c, 0.4));
[[0, -8], [-3, -30], [0, -55], [0, -80], [0, -112], [0, -158], [0, -186], [0, -208]].forEach(([x, z]) => {
  const l = new THREE.PointLight(0xfff6d8, 26, 30, 2);
  l.position.set(x, 6.4, z);
  scene.add(l);
});

/* ═══ DUST MOTES ═══ */
let dust;
{
  const n = isMobile ? 500 : 1300;
  const pos = new Float32Array(n * 3);
  for (let i = 0; i < n; i++) {
    pos[i * 3] = (Math.random() - 0.5) * 22;
    pos[i * 3 + 1] = Math.random() * 7;
    pos[i * 3 + 2] = 12 - Math.random() * 226;
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  dust = new THREE.Points(geo, new THREE.PointsMaterial({
    color: 0xfff9b0, size: 0.05, transparent: true, opacity: 0.42,
    blending: THREE.AdditiveBlending, depthWrite: false,
  }));
  scene.add(dust);
}

/* ═══ CAMERA RAIL ═══ */
const camCurve = new THREE.CatmullRomCurve3([
  new THREE.Vector3(0, 2.2, 13.5),
  new THREE.Vector3(0, 2.15, 5),
  new THREE.Vector3(0.9, 2.2, -4),
  new THREE.Vector3(2.3, 2.3, -16),
  new THREE.Vector3(2.7, 2.35, -27),
  new THREE.Vector3(2.2, 2.3, -37),
  new THREE.Vector3(0, 2.25, -44),
  new THREE.Vector3(2.3, 2.3, -50),
  new THREE.Vector3(-2.3, 2.3, -57.5),
  new THREE.Vector3(2.3, 2.3, -65),
  new THREE.Vector3(-2.3, 2.3, -72.5),
  new THREE.Vector3(2.3, 2.3, -80),
  new THREE.Vector3(-2.3, 2.3, -87.5),
  new THREE.Vector3(-2.5, 2.4, -97),
  new THREE.Vector3(-2.5, 2.45, -108),
  new THREE.Vector3(-2.5, 2.5, -121),
  new THREE.Vector3(-2.4, 2.5, -133),
  new THREE.Vector3(0, 2.3, -142),
  new THREE.Vector3(0, 2.35, -152),
  new THREE.Vector3(0, 2.4, -163),
  new THREE.Vector3(0, 2.45, -172),
  new THREE.Vector3(0.4, 2.5, -178),
  new THREE.Vector3(-0.5, 2.55, -185),
  new THREE.Vector3(0, 2.6, -193),
  new THREE.Vector3(0, 2.7, -201),
  new THREE.Vector3(0, 2.75, -205.5),
]);
const lookCurve = new THREE.CatmullRomCurve3([
  new THREE.Vector3(0, 3.6, -11),
  new THREE.Vector3(0, 3.2, -11.5),
  new THREE.Vector3(-0.8, 2.9, -18),
  new THREE.Vector3(-4.6, 2.8, -26.5),
  new THREE.Vector3(-5.6, 2.7, -30.5),
  new THREE.Vector3(-1.5, 2.5, -40),
  new THREE.Vector3(-3.2, 2.6, -48),
  new THREE.Vector3(3.2, 2.6, -55.5),
  new THREE.Vector3(-3.2, 2.6, -63),
  new THREE.Vector3(3.2, 2.6, -70.5),
  new THREE.Vector3(-3.2, 2.6, -78),
  new THREE.Vector3(3.2, 2.6, -85.5),
  new THREE.Vector3(1.4, 2.7, -95),
  new THREE.Vector3(5.6, 2.8, -105),
  new THREE.Vector3(5.8, 2.85, -118),
  new THREE.Vector3(5.6, 2.85, -132),
  new THREE.Vector3(0.4, 2.7, -141),
  new THREE.Vector3(0, 2.6, -150),
  new THREE.Vector3(0, 2.6, -164),
  new THREE.Vector3(0, 2.7, -176),
  new THREE.Vector3(2.5, 2.7, -181),
  new THREE.Vector3(-2.6, 2.7, -186.5),
  new THREE.Vector3(0.3, 2.75, -192),
  new THREE.Vector3(0, 3.1, -206),
  new THREE.Vector3(0, 3.6, -215),
  new THREE.Vector3(0, 3.8, -215),
]);

/* Progress is defined on hall depth (z). Camera and gaze control points pair
   by INDEX (point i of camCurve was authored against point i of lookCurve),
   so both curves must be sampled at the same segment parameter u. */
const camZs = camCurve.points.map((pt) => pt.z);
const camZStart = camZs[0], camZEnd = camZs[camZs.length - 1];
function zToU(z) {
  const n = camZs.length;
  if (z >= camZs[0]) return 0;
  for (let i = 1; i < n; i++) {
    if (z >= camZs[i]) {
      const f = (camZs[i - 1] - z) / (camZs[i - 1] - camZs[i]);
      return (i - 1 + f) / (n - 1);
    }
  }
  return 1;
}

/* ═══ SCROLL DRIVER ═══ */
let target = 0, smooth = 0;
const LERP = reduced ? 1 : 0.055;
function readScroll() {
  const max = document.documentElement.scrollHeight - innerHeight;
  target = max > 0 ? Math.min(scrollY / max, 1) : 0;
}
addEventListener('scroll', readScroll, { passive: true });

window.__jump = (p) => { // debug: jump straight to progress p ∈ [0,1]
  if (window.gsap) { const t = gsap.getById('navScroll'); if (t) t.kill(); }
  const max = document.documentElement.scrollHeight - innerHeight;
  scrollTo(0, p * max);
  smooth = target = p;
};

/* nav / cta jumps */
document.querySelectorAll('[data-goto]').forEach((el) => {
  el.addEventListener('click', (e) => {
    e.preventDefault();
    const p = parseFloat(el.dataset.goto);
    const max = document.documentElement.scrollHeight - innerHeight;
    if (reduced) { scrollTo(0, p * max); return; }
    const prev = gsap.getById('navScroll');
    if (prev) prev.kill();
    gsap.to({ v: scrollY }, {
      id: 'navScroll',
      v: p * max, duration: 2.4, ease: 'power3.inOut',
      onUpdate() { scrollTo(0, this.targets()[0].v); },
    });
  });
});

/* ═══ OVERLAY SECTION WINDOWS (progress-space) ═══ */
const SECTIONS = [
  ['p-hero', 0.0, 0.062],
  ['p-about', 0.155, 0.245],
  ['p-serv-head', 0.244, 0.262],
  ['p-serv-0', 0.267, 0.294], ['p-serv-1', 0.301, 0.328], ['p-serv-2', 0.335, 0.362],
  ['p-serv-3', 0.369, 0.396], ['p-serv-4', 0.403, 0.430], ['p-serv-5', 0.437, 0.466],
  ['p-proj-head', 0.487, 0.517],
  ['p-proj-0', 0.524, 0.552], ['p-proj-1', 0.559, 0.586], ['p-proj-2', 0.593, 0.620],
  ['p-proj-3', 0.627, 0.654], ['p-proj-4', 0.661, 0.694],
  ['p-partners', 0.715, 0.805],
  ['p-press-head', 0.856, 0.884],
  ['p-press-0', 0.890, 0.907], ['p-press-1', 0.913, 0.930], ['p-press-2', 0.936, 0.958],
  ['p-contact', 0.972, 1.01],
].map(([id, a, b]) => ({ el: document.getElementById(id), a, b }));

const ZONES = [0, 0.12, 0.25, 0.48, 0.71, 0.855, 0.965]; // chip switch points
const navLinks = [...document.querySelectorAll('.nav-links a')];
const NAV_ZONE = [0, 1, 2, 3, 5, 6]; // nav item → zone index
const zoneNumEl = document.getElementById('zoneNum');
const zoneNameEl = document.getElementById('zoneName');
const progressFill = document.getElementById('progressFill');
const scrollHint = document.getElementById('scrollHint');
let currentZone = -1;

function updateOverlay(p) {
  for (const s of SECTIONS) {
    const on = p >= s.a && p <= s.b;
    if (on !== s.on) { s.on = on; s.el.classList.toggle('on', on); }
  }
  let z = 0;
  for (let i = 0; i < ZONES.length; i++) if (p >= ZONES[i]) z = i;
  if (z !== currentZone) {
    currentZone = z;
    const d = window.FAB_I18N.dicts[window.FAB_LANG || 'fr'];
    zoneNumEl.textContent = d.zoneNums[z];
    zoneNameEl.textContent = d.zones[z];
    navLinks.forEach((a, i) => a.classList.toggle('active', NAV_ZONE[i] === z));
  }
  progressFill.style.height = (p * 100).toFixed(2) + '%';
  scrollHint.classList.toggle('show', p < 0.03);
}
addEventListener('fab:lang', () => { currentZone = -1; }); // re-render chip in new language

/* ═══ LANGUAGE WHIP — camera flourish fired mid-shutter ═══ */
let whip = 0, whipDir = 1;
window.FAB_onLangWhip = (lang) => {
  whip = 1;
  whipDir = lang === 'ar' ? -1 : 1;
};

/* ═══ IGNITION + BRIGHTNESS ═══ */
const tmpColor = new THREE.Color();
function updateWorld(camZ, t) {
  // portal strips — cones also duck when the camera passes through them
  for (const ig of igniters) {
    const lit = camZ < ig.z + 7 && camZ > ig.z - 34;
    const kTarget = lit ? 1 : 0.04;
    ig.k = ig.k === undefined ? 0.04 : ig.k + (kTarget - ig.k) * 0.08;
    ig.mat.color.copy(tmpColor.copy(ig.tint).multiplyScalar(ig.k));
    const prox = Math.min(1, Math.abs(camZ - ig.z) / 5.5); // 0 inside → 1 clear
    ig.cone.opacity = ig.maxCone * ig.k * prox * prox;
  }
  // panels brighten as the camera closes in, stay lit behind
  for (const p of litPanels) {
    const d = camZ - p.z; // >0 → panel ahead
    const base = p.whitePlaque ? 0.13 : 0.055;
    const full = 0.92; // headroom below bloom threshold so white imagery never blows out
    const bTarget = p.holdBright || d < 5 ? full : Math.max(base, Math.min(full, full * (1 - (d - 5) / 17)));
    p.b = p.b === undefined ? base : p.b + (bTarget - p.b) * 0.09;
    p.mat.color.setScalar(p.b);
    if (p.barMat) p.barMat.color.copy(tmpColor.copy(p.barColor).multiplyScalar(Math.max(0.06, p.b)));
  }
  // runway pulse — a light chase running ahead of the camera
  for (const g of guides) {
    const d = camZ - g.z;
    const chase = Math.max(0, 1 - Math.abs(d - 6 - Math.sin(t * 2.2) * 2) / 9);
    const k = 0.05 + chase * 0.85;
    g.m.color.setRGB(0.99 * k, 0.97 * k, 0.1 * k);
  }
}

/* ═══ POINTER PARALLAX ═══ */
const pointer = { x: 0, y: 0 };
addEventListener('pointermove', (e) => {
  pointer.x = (e.clientX / innerWidth - 0.5) * 2;
  pointer.y = (e.clientY / innerHeight - 0.5) * 2;
}, { passive: true });

/* ═══ RENDER LOOP ═══ */
const camPos = new THREE.Vector3(), lookPos = new THREE.Vector3();
const clock = new THREE.Clock();

function render() {
  const t = clock.getElapsedTime();
  smooth += (target - smooth) * LERP;
  const p = THREE.MathUtils.clamp(smooth, 0, 1);

  const u = zToU(THREE.MathUtils.lerp(camZStart, camZEnd, p));
  camCurve.getPoint(u, camPos);
  lookCurve.getPoint(u, lookPos);

  if (!reduced) {
    const sway = Math.sin(t * 0.5) * 0.06;
    camPos.x += sway + pointer.x * 0.22;
    camPos.y += Math.cos(t * 0.7) * 0.03 - pointer.y * 0.12;
    lookPos.x += pointer.x * 0.5;
    lookPos.y -= pointer.y * 0.3;
  }
  camera.position.copy(camPos);
  camera.lookAt(lookPos);

  // language whip: fov punch + roll that settles as the shutter opens
  if (whip > 0.001) {
    whip *= 0.94;
    camera.rotation.z += whipDir * whip * 0.22 * Math.sin(whip * Math.PI);
    camera.fov = 58 + whip * 9;
    camera.updateProjectionMatrix();
  } else if (camera.fov !== 58) {
    camera.fov = 58;
    camera.updateProjectionMatrix();
  }

  updateWorld(camPos.z, t);
  updateOverlay(p);

  if (dust && !reduced) dust.rotation.y = Math.sin(t * 0.03) * 0.02;

  composer.render();
  requestAnimationFrame(render);
}

/* ═══ BOOT ═══ */
let began = false;
function beginExperience() {
  if (began) return;
  began = true;
  document.getElementById('loader').classList.add('done');
  document.body.classList.add('ready');
  video.play().catch(() => {
    const kick = () => { video.play().catch(() => {}); removeEventListener('pointerdown', kick); removeEventListener('scroll', kick); };
    addEventListener('pointerdown', kick, { once: true });
    addEventListener('scroll', kick, { once: true });
  });
  readScroll();
}

addEventListener('resize', () => {
  camera.aspect = innerWidth / innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(innerWidth, innerHeight);
  composer.setSize(innerWidth, innerHeight);
});

scrollTo(0, 0);
readScroll();
render();
