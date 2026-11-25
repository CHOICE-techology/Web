// Identity Studio V4.1a. Reconstructed from the V4 build, then extended.
// Changes from V4: profile material modes A/B/C, behind-case pass (ribbon and
// bust seen through the case), edge mask vs Fresnel, Cycles hero camera,
// idle and off-screen pause, exact frame capture, consistent benchmark.
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { MeshoptDecoder } from 'three/examples/jsm/libs/meshopt_decoder.module.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { Reflector } from 'three/examples/jsm/objects/Reflector.js';
import { gsap } from 'gsap';

const $ = (id) => document.getElementById(id);
const HASH = location.hash;
const flag = (re) => re.test(HASH);
const hashVal = (name, def) => { const m = HASH.match(new RegExp(name + '-([\\w.]+)')); return m ? m[1] : def; };

const CYAN = new THREE.Color('#34FAFB');
const CAPTURE = flag(/capture|frame-/);
const BENCH = flag(/bench/);
const REDUCED = matchMedia('(prefers-reduced-motion: reduce)').matches && !CAPTURE;
const MOBILE = matchMedia('(max-width: 760px), (pointer: coarse)').matches;

// Options (all selectable from the URL hash so comparisons are reproducible)
const OPT = {
  mat: hashVal('mat', 'a'),                 // a | b | c
  bTrans: Number(hashVal('btrans', '0.72')),// transmission for mode B
  proxy: hashVal('proxy', MOBILE ? '0' : '1') === '1', // behind-case pass
  edge: hashVal('edge', 'both'),            // fresnel | mask | both
  cam: hashVal('cam', 'cycles'),            // cycles | v4
  ribbon: hashVal('ribbon', 'thin'),        // thin | v4
};

const t0 = performance.now();
const canvas = $('c');
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, powerPreference: 'high-performance', preserveDrawingBuffer: CAPTURE });
renderer.setPixelRatio(Math.min(devicePixelRatio, MOBILE ? 1.5 : 2));
renderer.toneMapping = THREE.AgXToneMapping;
renderer.toneMappingExposure = Math.pow(2, 0.55);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.shadowMap.autoUpdate = false;
renderer.localClippingEnabled = true;
renderer.info.autoReset = false; // reset once per frame so nested passes are counted consistently
if ('transmissionResolutionScale' in renderer) renderer.transmissionResolutionScale = MOBILE ? 0.6 : 1;
renderer.setClearColor('#F7F8F9', 1);

const scene = new THREE.Scene();
// Tone-mapped cove sphere, so glass does not read grey (see V4 lessons)
scene.add(new THREE.Mesh(new THREE.SphereGeometry(60, 48, 24),
  new THREE.MeshBasicMaterial({ color: new THREE.Color('#ffffff').multiplyScalar(3.2), side: THREE.BackSide })));

const camera = new THREE.PerspectiveCamera(32, 1, 0.05, 200);

// ---------- Studio environment (PMREM rebuild of the Blender rig) ----------
function buildEnvironment() {
  const env = new THREE.Scene();
  env.background = new THREE.Color('#EEF0F2');
  const centre = new THREE.Vector3(0, 1.6, 0);
  const card = (w, h, col, k, pos, look = centre) => {
    const m = new THREE.Mesh(new THREE.PlaneGeometry(w, h),
      new THREE.MeshBasicMaterial({ color: new THREE.Color(col).multiplyScalar(k), side: THREE.DoubleSide, toneMapped: false }));
    m.position.set(...pos); m.lookAt(look); env.add(m); return m;
  };
  card(7, 4, '#ffffff', 7, [0, 7.5, 1]);
  card(3.6, 3.6, '#ffffff', 6, [-6.5, 4.2, 3.5]);
  card(3.6, 3.6, '#ffffff', 6, [6.5, 4.2, 3]);
  card(0.35, 4.6, '#ffffff', 16, [-6.8, 3.6, 0.8]);
  card(0.35, 4.6, '#ffffff', 16, [6.8, 3.6, 0.4]);
  card(0.4, 3.6, '#ffffff', 12, [-3.2, 3.8, -4.5]);
  card(0.4, 3.6, '#ffffff', 12, [3.2, 3.8, -4.5]);
  card(3.2, 5, '#0E1012', 1, [-5.5, 3, -1.5]);
  card(3.2, 5, '#0E1012', 1, [5.5, 3, -1.5]);
  card(2, 5, '#16181A', 1, [-4.5, 2.5, 5.5]);
  card(2, 5, '#16181A', 1, [4.5, 2.5, 5.5]);
  card(14, 4, '#1E2124', 1, [0, 3, 15]);
  card(3, 0.16, '#3A3D40', 1, [0, 3.05, -3.2]);
  card(0.22, 3.6, '#2A2D30', 1, [-0.55, 1.9, -3.2]);
  card(0.22, 3.6, '#2A2D30', 1, [0.6, 1.9, -3.2]);
  card(9, 0.06, '#34FAFB', 3, [0, 0.35, 9]);
  card(0.05, 3, '#34FAFB', 2.5, [-7.5, 2, -3]);
  const floor = new THREE.Mesh(new THREE.PlaneGeometry(80, 80), new THREE.MeshBasicMaterial({ color: '#F2F4F6' }));
  floor.rotation.x = -Math.PI / 2; env.add(floor);
  const pm = new THREE.PMREMGenerator(renderer);
  const rt = pm.fromScene(env, 0.035, 0.1, 100, { size: 512 });
  pm.dispose();
  return rt.texture;
}
scene.environment = buildEnvironment();

const sun = new THREE.DirectionalLight('#ffffff', 1.1);
sun.position.set(-1.5, 8, 2.5);
sun.castShadow = true;
sun.shadow.mapSize.set(MOBILE ? 1024 : 2048, MOBILE ? 1024 : 2048);
sun.shadow.radius = 12;
sun.shadow.blurSamples = 16;
sun.shadow.bias = -4e-4;
Object.assign(sun.shadow.camera, { left: -5, right: 5, top: 5, bottom: -5, near: 1, far: 20 });
scene.add(sun);
scene.add(new THREE.HemisphereLight('#ffffff', '#e8ebee', 0.35));

const floorMat = new THREE.MeshPhysicalMaterial({ color: '#FAFBFC', emissive: new THREE.Color('#ffffff'), emissiveIntensity: 1.1,
  roughness: 0.35, clearcoat: 0.5, clearcoatRoughness: 0.15, transparent: !MOBILE, opacity: 0.9 });
const floor = new THREE.Mesh(new THREE.CircleGeometry(40, 96), floorMat);
floor.rotation.x = -Math.PI / 2; floor.receiveShadow = true; scene.add(floor);
let reflector = null;
if (!MOBILE) {
  reflector = new Reflector(new THREE.CircleGeometry(40, 96), { textureWidth: 1024, textureHeight: 1024, color: 0xE9EAEE });
  reflector.rotation.x = -Math.PI / 2; reflector.position.y = -0.002; scene.add(reflector);
}

const cyanMat = (o = 1) => new THREE.MeshBasicMaterial({ color: CYAN, transparent: true, opacity: o, toneMapped: false });
const horizon = new THREE.Mesh(new THREE.PlaneGeometry(30, 0.05), cyanMat(0.9));
horizon.rotation.x = -Math.PI / 2; horizon.position.set(0, 0.004, -2.6); horizon.scale.x = 1e-4; scene.add(horizon);

// Discard fragments beyond the reveal value along the u coordinate (ribbon growth, traces)
function addReveal(mat, uniform) {
  mat.onBeforeCompile = (sh) => {
    sh.uniforms.uReveal = uniform;
    sh.vertexShader = sh.vertexShader
      .replace('#include <common>', '#include <common>\nvarying vec2 vRevealUv;')
      .replace('#include <uv_vertex>', '#include <uv_vertex>\nvRevealUv = uv;');
    sh.fragmentShader = sh.fragmentShader
      .replace('#include <common>', '#include <common>\nvarying vec2 vRevealUv;\nuniform float uReveal;')
      .replace('void main() {', 'void main() {\nif (vRevealUv.x > uReveal) discard;');
  };
  mat.customProgramCacheKey = () => 'reveal';
}

// ---------- Model ----------
const loader = new GLTFLoader().setMeshoptDecoder(MeshoptDecoder);
const bin = atob(window.STUDIO_GLB);
const bytes = new Uint8Array(bin.length);
for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
const tParse = performance.now();
const gltf = await new Promise((res, rej) => loader.parse(bytes.buffer, '', res, rej));
const parseMs = performance.now() - tParse;
const model = gltf.scene;
scene.add(model);
const byName = (n) => model.getObjectByName(n);

const opticalGlass = (thickness, extra = {}) => new THREE.MeshPhysicalMaterial({
  color: '#ffffff', metalness: 0, roughness: 0, transmission: 1, ior: 1.5, thickness,
  attenuationColor: new THREE.Color('#DDE6E6'), attenuationDistance: 2.9, specularIntensity: 1, envMapIntensity: 2, ...extra });

// Fresnel edge overlay (V4)
function fresnelOverlay(strength = 0.9, reveal = null, tint = '#5D676C') {
  const m = new THREE.ShaderMaterial({
    transparent: true, depthWrite: false, side: THREE.DoubleSide, toneMapped: false,
    uniforms: { uTint: { value: new THREE.Color(tint) }, uStrength: { value: strength }, uReveal: reveal || { value: 2 } },
    vertexShader: `varying vec3 vN; varying vec3 vV; varying vec2 vUv2;
      #include <clipping_planes_pars_vertex>
      void main(){ vec4 mvPosition = modelViewMatrix * vec4(position,1.0); vN = normalize(normalMatrix*normal); vV = normalize(-mvPosition.xyz);
      #ifdef USE_UV2R
      vUv2 = uv;
      #else
      vUv2 = vec2(0.0);
      #endif
      #include <clipping_planes_vertex>
      gl_Position = projectionMatrix * mvPosition; }`,
    fragmentShader: `uniform vec3 uTint; uniform float uStrength; uniform float uReveal; varying vec3 vN; varying vec3 vV; varying vec2 vUv2;
      #include <clipping_planes_pars_fragment>
      void main(){
      #include <clipping_planes_fragment>
      if (vUv2.x > uReveal) discard;
      float f = pow(1.0 - abs(dot(normalize(vN), normalize(vV))), 2.6);
      gl_FragColor = vec4(uTint, clamp(f * uStrength, 0.0, uStrength)); }`,
  });
  if (reveal) m.defines = { USE_UV2R: '' };
  m.clipping = true;
  return m;
}

// Edge mask: a geometric edge mask (computed from the case's own bounds, the
// equivalent of a baked curvature mask) that gates a mirror-like reflection of
// the live environment. The mask is fixed to the geometry; the reflection
// stays view-dependent, so the case still reads correctly when it rotates.
function edgeMaskMaterial(geo, width = 0.045, strength = 0.9) {
  geo.computeBoundingBox();
  const half = geo.boundingBox.getSize(new THREE.Vector3()).multiplyScalar(0.5);
  const centre = geo.boundingBox.getCenter(new THREE.Vector3());
  const m = new THREE.MeshStandardMaterial({ color: '#ffffff', metalness: 1, roughness: 0.04, envMapIntensity: 1.25,
    transparent: true, depthWrite: false, side: THREE.FrontSide });
  m.onBeforeCompile = (sh) => {
    sh.uniforms.uHalf = { value: half }; sh.uniforms.uCentre = { value: centre };
    sh.uniforms.uW = { value: width }; sh.uniforms.uS = { value: strength };
    sh.vertexShader = sh.vertexShader.replace('#include <common>', '#include <common>\nvarying vec3 vLocal;')
      .replace('#include <begin_vertex>', '#include <begin_vertex>\nvLocal = position;');
    sh.fragmentShader = sh.fragmentShader
      .replace('#include <common>', '#include <common>\nvarying vec3 vLocal; uniform vec3 uHalf; uniform vec3 uCentre; uniform float uW; uniform float uS;')
      .replace('#include <dithering_fragment>', `#include <dithering_fragment>
        vec3 d = uHalf - abs(vLocal - uCentre);           // distance to each pair of faces
        float lo = min(d.x, min(d.y, d.z));
        float hi = max(d.x, max(d.y, d.z));
        float mid = d.x + d.y + d.z - lo - hi;            // second-nearest face = distance to the nearest edge
        float mask = 1.0 - smoothstep(0.0, uW, mid);
        gl_FragColor.a = mask * uS;`);
  };
  m.customProgramCacheKey = () => 'edgemask';
  return m;
}

const caseEdgeFresnel = fresnelOverlay(1, null, '#4A5257');
const ribbonReveal = { value: 0 };
const traceReveal = { value: 0 };

// ---------- Profile materials ----------
// A: opaque satin (V4), with reflections tightened toward the spec roughness
const satinA = new THREE.MeshPhysicalMaterial({ color: '#D9DFE3', roughness: 0.24, metalness: 0.05, clearcoat: 1, clearcoatRoughness: 0.03,
  sheen: 0.35, sheenColor: new THREE.Color('#ffffff'), envMapIntensity: 1.35 });
// B: transmissive satin glass with the approved values (IOR 1.45, roughness 0.24, clear coat 1)
const satinB = new THREE.MeshPhysicalMaterial({ color: '#ffffff', roughness: 0.24, metalness: 0, transmission: OPT.bTrans, ior: 1.45,
  thickness: 0.33, attenuationColor: new THREE.Color('#7C8790'), attenuationDistance: 0.33, clearcoat: 1, clearcoatRoughness: 0.03,
  specularIntensity: 1, envMapIntensity: 1.4 });
// C: solid satin core with a separate thin clear glass skin
const satinCore = new THREE.MeshPhysicalMaterial({ color: '#CDD4D9', roughness: 0.34, metalness: 0.02, clearcoat: 0,
  sheen: 0.3, sheenColor: new THREE.Color('#ffffff'), envMapIntensity: 1.1 });
const skinGlass = new THREE.MeshPhysicalMaterial({ color: '#ffffff', roughness: 0.03, metalness: 0, transmission: 1, ior: 1.45,
  thickness: 0.012, specularIntensity: 1, envMapIntensity: 1.5 });

function offsetAlongNormals(geo, d) {
  const g = geo.clone();
  const p = g.attributes.position, n = g.attributes.normal;
  for (let i = 0; i < p.count; i++) p.setXYZ(i, p.getX(i) + n.getX(i) * d, p.getY(i) + n.getY(i) * d, p.getZ(i) + n.getZ(i) * d);
  p.needsUpdate = true; g.computeBoundingSphere();
  return g;
}

let caseMesh = null, caseEdgeMask = null, caseEdgeF = null;

model.traverse((o) => {
  if (!o.isMesh || o.userData.added) return;
  o.castShadow = false; o.receiveShadow = false;
  const n = o.name, parent = o.parent?.name || '';
  if (n === 'GlassCase') {
    caseMesh = o;
    o.material = opticalGlass(0.085, { envMapIntensity: 1.2 });
    caseEdgeF = new THREE.Mesh(o.geometry, caseEdgeFresnel); caseEdgeF.renderOrder = 11; caseEdgeF.userData.added = true; o.add(caseEdgeF);
    caseEdgeMask = new THREE.Mesh(o.geometry, edgeMaskMaterial(o.geometry)); caseEdgeMask.renderOrder = 12; caseEdgeMask.userData.added = true; o.add(caseEdgeMask);
  } else if (n === 'Ribbon') {
    if (OPT.ribbon === 'v4') { o.material = opticalGlass(0.45, { side: THREE.DoubleSide }); addReveal(o.material, ribbonReveal); }
    else {
      // Front faces refract (band is 0.12 m thick); back faces are drawn as a thin
      // reflective skin first, so the far side of each loop keeps an edge.
      o.material = opticalGlass(0.12, { side: THREE.FrontSide, envMapIntensity: Number(hashVal('renv', '1')), specularIntensity: Number(hashVal('rspec', '0.7')) }); addReveal(o.material, ribbonReveal);
      const backMat = new THREE.MeshPhysicalMaterial({ color: '#ffffff', metalness: 0, roughness: 0.02, transmission: 1, thickness: 0.02, ior: 1.5,
        side: THREE.BackSide, envMapIntensity: 1.6, specularIntensity: 1 });
      addReveal(backMat, ribbonReveal);
      const back = new THREE.Mesh(o.geometry, backMat); back.userData.added = true; back.renderOrder = -1; o.add(back);
    }
    const e = new THREE.Mesh(o.geometry, fresnelOverlay(0.75, ribbonReveal)); e.renderOrder = 12; e.userData.added = true; o.add(e);
  } else if (n === 'ProfileBust') {
    o.castShadow = true;
    if (OPT.mat === 'b') o.material = satinB;
    else if (OPT.mat === 'c') {
      o.material = satinCore;
      const skin = new THREE.Mesh(offsetAlongNormals(o.geometry, 0.007), skinGlass); skin.userData.added = true; o.add(skin);
    } else o.material = satinA;
  } else if (parent.startsWith('Tile_') && !n.startsWith('Icon_')) {
    o.material = opticalGlass(0.6);
    const e = new THREE.Mesh(o.geometry, fresnelOverlay(0.6)); e.renderOrder = 12; e.userData.added = true; o.add(e);
  } else if (['GlassBlock', 'GlassBead', 'Orbit0', 'FloorHalo'].includes(n)) {
    o.material = opticalGlass(n === 'GlassBlock' ? 0.5 : 0.08);
    const e = new THREE.Mesh(o.geometry, fresnelOverlay(0.85)); e.renderOrder = 12; e.userData.added = true; o.add(e);
  } else if (n.startsWith('Cyan')) o.material = cyanMat(1);
  else if (n.startsWith('Icon_')) o.material = new THREE.MeshPhysicalMaterial({ color: '#2A2D30', roughness: 0.3, clearcoat: 0.6, clearcoatRoughness: 0.05 });
  else if (n === 'Plinth') o.castShadow = true;
});
['GlassCase', 'Plinth', 'ProfileBust'].forEach((n) => { const o = byName(n); if (o) o.castShadow = true; });

// Edge treatment options
if (OPT.edge === 'mask') caseEdgeF.visible = false;
if (OPT.edge === 'fresnel') caseEdgeMask.visible = false;
if (OPT.edge === 'both') caseEdgeFresnel.uniforms.uStrength.value = 0.7;

// ---------- Behind-case pass ----------
// Three.js fills the transmission buffer with opaque objects only, so the
// ribbon's back loops (and a transmissive profile) vanish behind the case.
// Here the scene is first rendered without the case, and the case refracts
// that image instead.
const behindRT = new THREE.WebGLRenderTarget(1, 1, { type: THREE.HalfFloatType, generateMipmaps: true,
  minFilter: THREE.LinearMipmapLinearFilter, samples: 4, colorSpace: THREE.LinearSRGBColorSpace });
if (OPT.proxy) {
  const m = caseMesh.material;
  m.onBeforeCompile = (sh) => {
    sh.uniforms.uBehind = { value: behindRT.texture };
    sh.fragmentShader = sh.fragmentShader.replace('#include <transmission_pars_fragment>',
      THREE.ShaderChunk.transmission_pars_fragment.replace(/transmissionSamplerMap/g, 'uBehind'));
  };
  m.customProgramCacheKey = () => 'case-behind';
}

// ---------- Refraction-only strips (as in the Cycles rig) ----------
// Dark cards behind the sculpture. They are drawn only into the refraction
// buffers (never to the screen and never into the floor reflection), so the
// glass shows the same distorted dark lines as the Cycles master.
const stripMat = new THREE.MeshBasicMaterial({ color: '#7A7F84', side: THREE.DoubleSide });
stripMat.onBeforeCompile = (sh) => {
  sh.uniforms.uShow = stripShow;
  sh.fragmentShader = sh.fragmentShader.replace('void main() {', 'uniform float uShow;\nvoid main() {\nif (uShow < 0.5) discard;');
};
const stripShow = { value: 0 };
const strips = new THREE.Group();
if (!flag(/nostrips/)) scene.add(strips);
[[3, 0.16, [0, 3.05, -3.2], '#8A8F94'], [0.22, 3.6, [-0.55, 1.9, -3.2]], [0.22, 3.6, [0.6, 1.9, -3.2]]].forEach(([w, h, pos, col]) => {
  const m = new THREE.Mesh(new THREE.PlaneGeometry(w, h), col ? stripMat.clone() : stripMat);
  if (col) { m.material.color.set(col); m.material.onBeforeCompile = stripMat.onBeforeCompile; }
  m.position.set(...pos);
  m.onBeforeRender = (r) => { const rt = r.getRenderTarget(); stripShow.value = rt && (!reflector || rt !== reflector.getRenderTarget()) ? 1 : 0; };
  strips.add(m);
});

// ---------- Traces from tiles to the core ----------
const tiles = ['graduation-cap', 'briefcase', 'certificate', 'folder', 'globe'].map((n) => byName(`Tile_${n}`));
const traceMat = cyanMat(0.75); addReveal(traceMat, traceReveal);
tiles.forEach((t) => {
  const a = new THREE.Vector3(t.position.x, 0.006, t.position.z);
  const b = a.clone().setLength(2.1); b.y = 0.006;
  const mid = a.clone().lerp(b, 0.5); mid.y = 0.006;
  const curve = new THREE.CatmullRomCurve3([a, mid.add(new THREE.Vector3(0, 0, 0.25)), b]);
  scene.add(new THREE.Mesh(new THREE.TubeGeometry(curve, 48, 0.006, 6, false), traceMat));
});

const monolithParts = ['GlassCase', 'Plinth', 'CyanSeam', 'ProfileBust', 'GlassBlock'].map(byName).filter(Boolean);
const revealPlane = new THREE.Plane(new THREE.Vector3(0, -1, 0), 0);
monolithParts.forEach((o) => o.traverse((m) => { if (m.isMesh) m.material.clippingPlanes = [revealPlane]; }));

const rings = ['Orbit0', 'Orbit1', 'GlassBead', 'FloorHalo', 'CyanOrbitLine'].map(byName).filter(Boolean);
const ribbon = byName('Ribbon');
const orbit0 = byName('Orbit0');
const bead = byName('GlassBead');
orbit0.geometry.computeBoundingBox();
const oSize = orbit0.geometry.boundingBox.getSize(new THREE.Vector3()).toArray();
const orbitAxis = new THREE.Vector3().setComponent(oSize.indexOf(Math.min(...oSize)), 1);
const beadPivot = new THREE.Group(); orbit0.add(beadPivot); beadPivot.attach(bead);
const baseScale = new Map([ribbon, ...rings].map((o) => [o, o.scale.clone()]));
const tileRest = new Map(tiles.map((t) => [t, { p: t.position.clone(), q: t.quaternion.clone(), s: t.scale.clone() }]));

// ---------- Camera ----------
// Cycles hero: solved from the Cycles master (35 mm, five tile centres and the
// case's top edge; reprojection error under 6 px at 1920 x 1080).
const HERO_CYCLES = { ang: Math.atan2(-0.936, 10.643), rad: Math.hypot(0.936, 10.643), y: 1.478, ty: 1.774 };
const HERO_V4 = { ang: Math.atan2(-1.1, 10.6), rad: Math.hypot(1.1, 10.6), y: 2, ty: 1.72 };
const HERO_PORTRAIT = { ang: Math.atan2(-0.4, 15.5), rad: 15.6, y: 2.6, ty: 1.9 };
const heroPose = () => (innerWidth / innerHeight < 0.9 ? HERO_PORTRAIT : OPT.cam === 'v4' ? HERO_V4 : HERO_CYCLES);
const cam = { ang: 0.05, rad: 12.6, y: 0.32, ty: 0.6 };
// V4.1a2 (opt-in, #cam-r): pull the intro camera back on narrow windows so the ribbon never leaves the frame.
// The factor eases back to 1 during the final move, so the hero pose and the live camera are unchanged.
const CAMR = flag(/cam-r/);
const fitK = () => 1 + 0.5 * Math.max(0, 1.45 - innerWidth / innerHeight); // recomputed on every frame, so rotating a phone mid-intro stays correct
const camK = { w: CAMR ? 1 : 0 };                                             // weight 1 during the intro, eased to 0 by the final move
const target = new THREE.Vector3();
function applyCam() {
  const k = 1 + (fitK() - 1) * camK.w;
  camera.position.set(cam.rad * k * Math.sin(cam.ang), cam.y, cam.rad * k * Math.cos(cam.ang));
  target.set(0, cam.ty, 0); camera.lookAt(target);
}

const controls = new OrbitControls(camera, canvas);
Object.assign(controls, { enabled: false, enableDamping: true, dampingFactor: 0.06, minDistance: 6, maxDistance: 18,
  maxPolarAngle: Math.PI * 0.49, minPolarAngle: Math.PI * 0.2, enablePan: false });

// ---------- Intro timeline (7 s, unchanged from V4) ----------
const st = { horizon: 0, monolith: 0, ribbonScale: 1.12, ringIn: 0 };
tiles.forEach((t) => (t.visible = false));
rings.forEach((r) => (r.visible = false));
ribbon.visible = false;

const tl = gsap.timeline({ paused: true, defaults: { ease: 'power2.inOut' }, onUpdate: applyCam });
tl.to(st, { horizon: 1, duration: 1, ease: 'power3.out' }, 0.1)
  .to(cam, { rad: 10.6, y: 0.7, ty: 1, ang: 0.08, duration: 1.2, ease: 'power1.in' }, 0)
  .call(() => { ribbon.visible = true; }, null, 1.2)
  .fromTo(ribbonReveal, { value: 0 }, { value: 1.001, duration: 1.4, ease: 'power2.inOut' }, 1.2)
  .fromTo(ribbon.rotation, { y: -1.1 }, { y: 0, duration: 1.4, ease: 'power3.out' }, 1.2)
  .to(cam, { rad: 9.4, y: 1.25, ty: 1.35, ang: 0.24, duration: 1.4 }, 1.2)
  .call(() => rings.forEach((r) => (r.visible = true)), null, 2.6)
  .fromTo(st, { ringIn: 0 }, { ringIn: 1, duration: 1.2, ease: 'power3.out' }, 2.6)
  .to(cam, { rad: 10.6, y: 1.6, ty: 1.5, ang: 0.34, duration: 1.6 }, 2.6);
const tileIn = (name, at, o) => {
  const t = byName(`Tile_${name}`), r = tileRest.get(t);
  tl.call(() => { t.visible = true; }, null, at);
  if (o.p) tl.fromTo(t.position, { x: r.p.x + o.p[0], y: r.p.y + o.p[1], z: r.p.z + o.p[2] }, { x: r.p.x, y: r.p.y, z: r.p.z, duration: o.d || 1, ease: 'power3.out' }, at);
  if (o.r) tl.fromTo(t.rotation, { y: t.rotation.y + o.r }, { y: t.rotation.y, duration: o.d || 1, ease: 'power3.out' }, at);
  if (o.s) tl.fromTo(t.scale, { x: o.s, y: o.s, z: o.s }, { x: r.s.x, y: r.s.y, z: r.s.z, duration: o.d || 1, ease: 'power3.out' }, at);
};
tileIn('folder', 2.6, { p: [-1.2, 0.6, -7.5], s: 0.6, d: 1.1 });
tileIn('certificate', 2.85, { r: -Math.PI / 2, p: [0, 0.4, 0], d: 1 });
tileIn('briefcase', 3.05, { p: [0, 4.5, 0], d: 1 });
tileIn('globe', 3.2, { p: [0, -2.2, 0], d: 1 });
tileIn('graduation-cap', 3.35, { p: [-2.5, 0.3, 0], s: 0.8, d: 0.85 });
tl.fromTo(st, { monolith: 0 }, { monolith: 1, duration: 1.3, ease: 'power2.inOut' }, 4.2)
  .to(st, { ribbonScale: 1, duration: 1.3, ease: 'power2.inOut' }, 4.25)
  .fromTo(traceReveal, { value: 0 }, { value: 1.001, duration: 1.1, ease: 'power2.out' }, 4.45)
  .to(cam, { rad: 10.3, y: 1.9, ty: 1.65, ang: 0.3, duration: 1.4 }, 4.2)
  .to(cam, { ang: () => heroPose().ang, rad: () => heroPose().rad, y: () => heroPose().y, ty: () => heroPose().ty,
    duration: 1.4, ease: 'power2.inOut' }, 5.6)
  .to(camK, { w: 0, duration: 1.4, ease: 'power2.inOut' }, 5.6)
  .call(goLive, null, 7);

// V4.1a2 (opt-in, #strips-late): the dark strips fade in with the monolith, so they do not show through the bare ribbon.
const STRIPS_LATE = flag(/strips-late/);
const STRIP_BG = new THREE.Color('#F7F8F9');
strips.children.forEach((m) => { m.userData.c0 = m.material.color.clone(); });
function applyState() {
  if (STRIPS_LATE) { const f = Math.min(1, Math.max(0, (st.monolith - 0.05) / 0.5)); strips.visible = f > 0.002; strips.children.forEach((m) => m.material.color.copy(STRIP_BG).lerp(m.userData.c0, f)); }
  horizon.scale.x = Math.max(st.horizon, 1e-4);
  horizon.material.opacity = 0.9 * st.horizon * (1 - 0.55 * st.monolith);
  revealPlane.constant = -0.05 + st.monolith * 3.3;
  ribbon.scale.copy(baseScale.get(ribbon)).multiplyScalar(st.ribbonScale);
  rings.forEach((r) => { if (r !== bead) r.scale.copy(baseScale.get(r)).multiplyScalar(0.85 + 0.15 * st.ringIn); });
  rings.forEach((r) => r.traverse((m) => { if (m.isMesh && m.material.transparent && m.material.toneMapped === false) m.material.opacity = st.ringIn; }));
}

let live = false;
function goLive() {
  if (live) return;
  live = true; applyCam(); controls.target.copy(target); controls.update(); controls.enabled = !CAPTURE;
  $('skip').hidden = true; $('replay').hidden = false; folderBtn.hidden = false;
  document.body.classList.add('live'); wake();
}
const skipIntro = () => { if (live) return; tl.progress(1); applyState(); goLive(); };
$('skip').addEventListener('click', skipIntro);
// Skipping also works from the keyboard (Enter, Space, Escape, arrows) and from scrolling
addEventListener('keydown', (e) => { if (!live && ['Enter', ' ', 'Escape', 'ArrowDown', 'PageDown'].includes(e.key) && document.activeElement?.id !== 'replay') skipIntro(); });
addEventListener('wheel', () => { if (!live && tl.time() > 0.6) skipIntro(); }, { passive: true });
$('replay').addEventListener('click', () => {
  closeFolder(true); live = false; controls.enabled = false; document.body.classList.remove('live');
  folderBtn.hidden = true; $('replay').hidden = true; $('skip').hidden = false; tl.restart(); wake();
});

// ---------- Folder interaction (unchanged behaviour) ----------
const folder = byName('Tile_folder');
const folderBtn = $('folderBtn');
const ray = new THREE.Raycaster(), ndc = new THREE.Vector2();
let hovered = false, open = false, moving = false;
const hoverRing = new THREE.Mesh(new THREE.RingGeometry(0.42, 0.435, 64), cyanMat(0)); hoverRing.rotation.x = -Math.PI / 2; scene.add(hoverRing);
const lift = { v: 0 };
function setHover(h) {
  if (h === hovered || open) return;
  hovered = h; canvas.style.cursor = h ? 'pointer' : '';
  gsap.to(hoverRing.material, { opacity: h ? 0.85 : 0, duration: REDUCED ? 0 : 0.25 });
  gsap.to(lift, { v: h ? 1 : 0, duration: REDUCED ? 0 : 0.35, ease: 'power2.out' });
  wake();
}
const pick = (e) => { ndc.set((e.clientX / innerWidth) * 2 - 1, -(e.clientY / innerHeight) * 2 + 1); ray.setFromCamera(ndc, camera); return ray.intersectObject(folder, true).length > 0; };
canvas.addEventListener('pointermove', (e) => { wake(); if (live && !moving) setHover(pick(e)); });
let down = null;
canvas.addEventListener('pointerdown', (e) => { wake(); down = [e.clientX, e.clientY]; });
canvas.addEventListener('pointerup', (e) => {
  if (!live || !down) return;
  const d = Math.hypot(e.clientX - down[0], e.clientY - down[1]); down = null;
  if (d > 6) return;
  if (pick(e)) openFolder(); else if (open) closeFolder();
});
folderBtn.addEventListener('click', openFolder);
$('close').addEventListener('click', () => closeFolder());
addEventListener('keydown', (e) => { wake(); if (e.key === 'Escape' && open) closeFolder(); });

const tw = { t: 0 }, q0 = new THREE.Quaternion(), q1 = new THREE.Quaternion(), p0 = new THREE.Vector3(), p1 = new THREE.Vector3();
function openFolder() {
  if (open || moving || !live) return;
  open = true; moving = true; controls.enabled = false; setHover(false); hovered = false; canvas.style.cursor = '';
  gsap.to(hoverRing.material, { opacity: 0, duration: 0.2 });
  const fwd = camera.getWorldDirection(new THREE.Vector3()), right = new THREE.Vector3().crossVectors(fwd, camera.up).normalize(), narrow = innerWidth < 760;
  p1.copy(camera.position).addScaledVector(fwd, narrow ? 3.6 : 3).addScaledVector(right, narrow ? 0 : -0.62).addScaledVector(camera.up, narrow ? 0.55 : 0.05);
  q1.copy(camera.quaternion); p0.copy(folder.position); q0.copy(folder.quaternion);
  keepAwake(1.3);
  gsap.fromTo(tw, { t: 0 }, { t: 1, duration: REDUCED ? 0.01 : 1.1, ease: 'power3.inOut',
    onUpdate: () => { folder.position.lerpVectors(p0, p1, tw.t); folder.position.y += Math.sin(tw.t * Math.PI) * 0.35; folder.quaternion.slerpQuaternions(q0, q1, tw.t); },
    onComplete: () => { moving = false; const p = $('panel'); p.hidden = false; requestAnimationFrame(() => p.classList.add('in')); $('close').focus(); } });
}
function closeFolder(instant) {
  if (!open) return;
  const p = $('panel'); p.classList.remove('in'); setTimeout(() => { p.hidden = true; }, instant || REDUCED ? 0 : 250);
  moving = true; const r = tileRest.get(folder);
  p0.copy(folder.position); q0.copy(folder.quaternion); keepAwake(1.2);
  gsap.fromTo(tw, { t: 0 }, { t: 1, duration: instant || REDUCED ? 0.01 : 1, ease: 'power3.inOut',
    onUpdate: () => { folder.position.lerpVectors(p0, r.p, tw.t); folder.position.y += Math.sin(tw.t * Math.PI) * 0.3; folder.quaternion.slerpQuaternions(q0, r.q, tw.t); },
    onComplete: () => { moving = false; open = false; controls.enabled = live; folderBtn.focus({ preventScroll: true }); } });
}

// ---------- Resize ----------
function resize() {
  const w = innerWidth, h = innerHeight;
  renderer.setSize(w, h, false); camera.aspect = w / h;
  const hfov = 2 * Math.atan(18 / 35); // 35 mm lens on a 36 mm sensor, as in Cycles
  camera.fov = THREE.MathUtils.radToDeg(2 * Math.atan(Math.tan(hfov / 2) / Math.max(camera.aspect, 1.2)));
  camera.updateProjectionMatrix();
  if (reflector) reflector.getRenderTarget().setSize(Math.min(w, 1280), Math.min(h, 1280));
  const db = renderer.getDrawingBufferSize(new THREE.Vector2()).multiplyScalar(renderer.transmissionResolutionScale ?? 1);
  behindRT.setSize(Math.max(1, Math.floor(db.x)), Math.max(1, Math.floor(db.y)));
  wake();
}
addEventListener('resize', resize);

// ---------- Render ----------
function renderFrame() {
  renderer.info.reset();
  renderer.shadowMap.needsUpdate = true;
  if (OPT.proxy && caseMesh.visible) {
    caseMesh.visible = false; hoverRing.visible = false; if (reflector) reflector.visible = false;
    renderer.setRenderTarget(behindRT); renderer.render(scene, camera); renderer.setRenderTarget(null);
    caseMesh.visible = true; hoverRing.visible = true; if (reflector) reflector.visible = true;
  }
  renderer.render(scene, camera);
}

// Static scene triangle count: the same number on every device and frame
function sceneTriangles() {
  let n = 0;
  scene.traverseVisible((o) => { if (o.isMesh && o !== reflector) { const g = o.geometry; n += (g.index ? g.index.count : g.attributes.position.count) / 3; } });
  return Math.round(n);
}

// ---------- Loop with idle and off-screen pause ----------
const IDLE_MS = 8000;
let lastInput = performance.now(), awakeUntil = 0, running = false, onScreen = true, ambientT = 0;
function keepAwake(s) { awakeUntil = Math.max(awakeUntil, performance.now() + s * 1000); wake(); }
function wake() { lastInput = performance.now(); if (!running && onScreen && !document.hidden && !CAPTURE) { running = true; clock.getDelta(); renderer.setAnimationLoop(loop); } }
function sleep() { if (running) { running = false; renderer.setAnimationLoop(null); fpsEl.textContent = 'paused (idle). Move the pointer to resume'; } }
new IntersectionObserver(([e]) => { onScreen = e.isIntersecting; onScreen ? wake() : sleep(); }).observe(canvas);
document.addEventListener('visibilitychange', () => (document.hidden ? sleep() : wake()));
controls.addEventListener('change', () => { lastInput = performance.now(); });

const clock = new THREE.Clock();
const fpsEl = $('fps');
let frames = 0, winStart = performance.now(), worst = 0, prev = performance.now(), firstFrameMs = null;
const fpsLog = [];
function loop() {
  const now = performance.now(), dt = clock.getDelta();
  if (firstFrameMs === null) firstFrameMs = now - t0;
  worst = Math.max(worst, now - prev); prev = now;
  applyState();
  if (live && !REDUCED) {
    ambientT += dt;
    beadPivot.rotateOnAxis(orbitAxis, dt * 0.25);
    tiles.forEach((t, i) => {
      if (t === folder && (open || moving)) return;
      const r = tileRest.get(t);
      t.position.y = r.p.y + Math.sin(ambientT * 0.8 + i * 1.3) * 0.035 + (t === folder ? lift.v * 0.12 : 0);
    });
  }
  if (live) controls.update();
  if (!open && !moving) {
    const w = folder.getWorldPosition(new THREE.Vector3());
    hoverRing.position.set(w.x, 0.008, w.z);
    const s = w.clone().project(camera);
    folderBtn.style.transform = `translate(${(s.x * 0.5 + 0.5) * innerWidth - 40}px, ${(-s.y * 0.5 + 0.5) * innerHeight - 40}px)`;
  }
  renderFrame();
  frames++;
  if (now - winStart > 1000) {
    const fps = Math.round((frames * 1000) / (now - winStart)); fpsLog.push(fps);
    fpsEl.textContent = `${fps} fps · slowest frame ${worst.toFixed(0)} ms · ${renderer.info.render.calls} draw calls per frame · ${(sceneTriangles() / 1000).toFixed(0)}k scene triangles`;
    frames = 0; winStart = now; worst = 0;
  }
  // Pause when the intro is over and nothing has moved for a while
  const busy = !live || tl.isActive() || moving || open || now < awakeUntil || BENCH;
  if (!busy && now - lastInput > IDLE_MS) sleep();
}

// ---------- Benchmark: fixed 12 s camera sweep, same on every device ----------
async function runBench() {
  skipIntro(); controls.enabled = false;
  const hero = heroPose(), times = [];
  const t = performance.now();
  await new Promise((done) => {
    const step = () => {
      const e = (performance.now() - t) / 1000;
      cam.ang = hero.ang + Math.sin(e * 0.6) * 0.35; cam.rad = hero.rad; cam.y = hero.y; cam.ty = hero.ty; applyCam();
      times.push(performance.now());
      if (e < 12) requestAnimationFrame(step); else done();
    };
    requestAnimationFrame(step);
  });
  const dts = []; for (let i = 1; i < times.length; i++) if (times[i] - t > 2000) dts.push(times[i] - times[i - 1]);
  dts.sort((a, b) => a - b);
  const q = (p) => dts[Math.min(dts.length - 1, Math.floor(p * dts.length))];
  const gl = renderer.getContext(), ext = gl.getExtension('WEBGL_debug_renderer_info');
  const res = {
    medianFps: Math.round(1000 / q(0.5)), lowFps_p95frame: Math.round(1000 / q(0.95)), p95FrameMs: +q(0.95).toFixed(1), worstFrameMs: +dts[dts.length - 1].toFixed(1),
    drawCallsPerFrame: renderer.info.render.calls, sceneTriangles: sceneTriangles(), trianglesDrawnPerFrame: renderer.info.render.triangles,
    pixelRatio: renderer.getPixelRatio(), viewport: [innerWidth, innerHeight], material: OPT.mat, behindCasePass: OPT.proxy, mobileProfile: MOBILE,
    gpu: ext ? gl.getParameter(ext.UNMASKED_RENDERER_WEBGL) : 'n/a',
  };
  window.benchResult = res;
  const box = $('bench'); box.hidden = false;
  box.innerHTML = `<b>${res.medianFps} fps median</b><br>${res.lowFps_p95frame} fps at the slowest 5% · worst frame ${res.worstFrameMs} ms<br>`
    + `${res.drawCallsPerFrame} draw calls · ${(res.sceneTriangles / 1000).toFixed(0)}k scene triangles · ${(res.trianglesDrawnPerFrame / 1000).toFixed(0)}k drawn<br>`
    + `${res.viewport.join(' × ')} at ${res.pixelRatio}x · material ${res.material.toUpperCase()} · behind-case pass ${res.behindCasePass ? 'on' : 'off'}<br><small>${res.gpu}</small>`;
}

// ---------- Exact frame capture: frame N is the timeline at N / 30 s ----------
window.studioFrame = (n, fps = 30) => {
  const s = n / fps;
  if (s >= 7) { tl.progress(1); applyState(); goLive(); }
  else { live = false; tl.pause(); tl.seek(s, false); }
  applyState(); applyCam(); renderFrame();
  return canvas.toDataURL('image/png');
};
window.studioStats = () => ({ modelBytes: Math.round((window.STUDIO_GLB.length * 3) / 4), parseMs: Math.round(parseMs), firstFrameMs: Math.round(firstFrameMs ?? -1),
  fpsLog: fpsLog.slice(-30), pixelRatio: renderer.getPixelRatio(), size: [innerWidth, innerHeight], mobile: MOBILE, reduced: REDUCED, opt: OPT,
  sceneTriangles: sceneTriangles(), drawCalls: renderer.info.render.calls });

// ---------- Start ----------
resize();
$('loading').remove();
if (flag(/clean/)) document.body.classList.add('clean');
if (flag(/nocase/)) caseMesh.visible = false;
const fm = HASH.match(/frame-(\d+)/), fOld = HASH.match(/f-(\d+)/);
if (fm) window.studioFrame(Number(fm[1]));
else if (CAPTURE) { window.studioFrame(0); }
else if (fOld) { const s = Number(fOld[1]) / 10; if (s >= 7) { tl.progress(1); applyState(); goLive(); } else { tl.pause(); tl.seek(s); applyState(); applyCam(); } wake(); }
else if (BENCH) { wake(); runBench(); }
else if (REDUCED) { tl.progress(1); applyState(); goLive(); }
else { applyCam(); tl.play(0); wake(); }
