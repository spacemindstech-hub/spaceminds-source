import * as THREE from 'three';

// ---------- shaders ----------
const lineVert = /* glsl */ `
attribute float aDraw;
varying float vD;
void main(){
  vD = aDraw;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);
}`;
const lineFrag = /* glsl */ `
uniform float uDraw;
uniform float uOpacity;
uniform vec3 uColor;
uniform vec3 uTip;
varying float vD;
void main(){
  float shown = smoothstep(uDraw, uDraw - 0.035, vD);
  float tip = smoothstep(0.05, 0.0, abs(vD - (uDraw - 0.015))) * step(0.002, uDraw) * step(uDraw, 0.995);
  float a = (shown*0.85 + tip*1.2) * uOpacity;
  if (a < 0.003) discard;
  gl_FragColor = vec4(mix(uColor, uTip, tip) * a, a);
}`;

const flameVert = /* glsl */ `
varying vec2 vUv;
varying vec3 vN;
varying vec3 vV;
void main(){
  vUv = uv;
  vec4 mv = modelViewMatrix * vec4(position,1.0);
  vN = normalize(normalMatrix * normal);
  vV = normalize(-mv.xyz);
  gl_Position = projectionMatrix * mv;
}`;
const flameFrag = /* glsl */ `
uniform float uTime;
uniform float uIntensity;
uniform float uSeed;
uniform float uCore;
varying vec2 vUv;
varying vec3 vN;
varying vec3 vV;
float h(vec2 p){ return fract(sin(dot(p, vec2(127.1,311.7)))*43758.5453); }
float n2(vec2 p){ vec2 i=floor(p), f=fract(p); f=f*f*(3.0-2.0*f);
  return mix(mix(h(i),h(i+vec2(1,0)),f.x), mix(h(i+vec2(0,1)),h(i+vec2(1,1)),f.x), f.y); }
float fbm(vec2 p){ float v=0.0, a=0.5; for(int i=0;i<4;i++){ v+=a*n2(p); p*=2.1; a*=0.5; } return v; }
void main(){
  float t = 1.0 - vUv.y;                 // 0 at nozzle, 1 at the tail
  float rim = abs(dot(normalize(vN), normalize(vV)));
  float body = pow(rim, 1.6);
  float n = fbm(vec2(vUv.x*7.0 + uSeed, t*3.2 - uTime*7.0));
  float shock = 0.5 + 0.5*sin(t*38.0 - uTime*30.0);   // mach-diamond banding
  float fall = pow(1.0 - t, 1.3);
  float a = fall * body * (0.55 + 0.75*n) * uIntensity;
  a *= mix(1.0, 0.8 + 0.4*shock, uCore);
  vec3 hot = vec3(1.0, 0.97, 0.88);
  vec3 mid = vec3(1.0, 0.62, 0.20);
  vec3 cool = vec3(0.85, 0.22, 0.06);
  vec3 c = mix(hot, mid, smoothstep(0.0, 0.35, t));
  c = mix(c, cool, smoothstep(0.35, 0.95, t));
  c = mix(c, vec3(0.75,0.85,1.0), uCore * (1.0 - smoothstep(0.0, 0.25, t)) * 0.6);
  if (a < 0.003) discard;
  gl_FragColor = vec4(c * a * 1.6, a);
}`;

const glowFrag = /* glsl */ `
uniform float uIntensity;
varying vec2 vUv;
void main(){
  float d = length(vUv - 0.5) * 2.0;
  float a = pow(max(0.0, 1.0 - d), 2.4) * uIntensity;
  if (a < 0.003) discard;
  gl_FragColor = vec4(vec3(1.0, 0.62, 0.28) * a, a);
}`;
const glowVert = /* glsl */ `
varying vec2 vUv;
void main(){
  vUv = uv;
  vec4 mv = modelViewMatrix * vec4(0.0,0.0,0.0,1.0);
  vec2 scale = vec2(length(modelMatrix[0].xyz), length(modelMatrix[1].xyz));
  mv.xy += position.xy * scale;
  gl_Position = projectionMatrix * mv;
}`;

// ---------- helpers ----------
const BANG = [-135, -45, 0, 40, 141, 180];

function lineMaterial(color, tip) {
  return new THREE.ShaderMaterial({
    vertexShader: lineVert,
    fragmentShader: lineFrag,
    uniforms: {
      uDraw: { value: 0 },
      uOpacity: { value: 0 },
      uColor: { value: new THREE.Color(color) },
      uTip: { value: new THREE.Color(tip) }
    },
    transparent: true,
    depthWrite: false,
    depthTest: true,
    blending: THREE.AdditiveBlending,
    fog: false
  });
}

// Builds LineSegments geometry from polylines; aDraw drives the "being drawn" reveal.
function segmentsFromPolylines(polys) {
  const P = [];
  const D = [];
  for (const { pts, draw } of polys) {
    for (let i = 0; i < pts.length - 1; i++) {
      P.push(pts[i].x, pts[i].y, pts[i].z, pts[i + 1].x, pts[i + 1].y, pts[i + 1].z);
      D.push(draw[i], draw[i + 1]);
    }
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.Float32BufferAttribute(P, 3));
  g.setAttribute('aDraw', new THREE.Float32BufferAttribute(D, 1));
  return g;
}

// Radial profile r(y) of a part around its own axis, sampled from real geometry.
function profileOf(points, axis, bins) {
  let y0 = Infinity,
    y1 = -Infinity;
  for (const p of points) {
    y0 = Math.min(y0, p.y);
    y1 = Math.max(y1, p.y);
  }
  const r = new Array(bins).fill(0);
  for (const p of points) {
    const b = Math.min(bins - 1, Math.floor(((p.y - y0) / (y1 - y0 || 1)) * bins));
    r[b] = Math.max(r[b], Math.hypot(p.x - axis.x, p.z - axis.z));
  }
  // fill gaps
  for (let i = 0; i < bins; i++)
    if (r[i] === 0) {
      let a = i - 1,
        b = i + 1;
      while (a >= 0 && r[a] === 0) a--;
      while (b < bins && r[b] === 0) b++;
      const ra = a >= 0 ? r[a] : r[b] || 0,
        rb = b < bins ? r[b] : ra;
      r[i] = (ra + rb) / 2;
    }
  return { y0, y1, r };
}

function wireFromProfile({ y0, y1, r }, axis, { longs = 14, rings = 5, half = 0, phase = 0 }) {
  const polys = [];
  const bins = r.length;
  const H = y1 - y0 || 1;
  const yAt = i => y0 + (i + 0.5) * (H / bins);
  const drawAt = y => (y1 - y) / H; // top-down drawing
  for (let k = 0; k < longs; k++) {
    let a = phase + (k / longs) * Math.PI * 2;
    if (half) {
      a = -Math.PI / 2 + (k / (longs - 1)) * Math.PI;
      if (half < 0) a += Math.PI;
    }
    const pts = [],
      draw = [];
    for (let i = 0; i < bins; i++) {
      const y = yAt(i);
      pts.push(new THREE.Vector3(axis.x + Math.cos(a) * r[i], y, axis.z + Math.sin(a) * r[i]));
      draw.push(drawAt(y) * 0.85 + (k / longs) * 0.08);
    }
    polys.push({ pts, draw });
  }
  const ringIdx = new Set([0, bins - 1]);
  for (let j = 1; j < rings - 1; j++) ringIdx.add(Math.round((j / (rings - 1)) * (bins - 1)));
  for (const i of ringIdx) {
    const pts = [],
      draw = [];
    const segs = 56;
    const span = half ? Math.PI : Math.PI * 2;
    const start = half ? (half > 0 ? -Math.PI / 2 : Math.PI / 2) : 0;
    for (let s = 0; s <= segs; s++) {
      const a = start + (s / segs) * span;
      pts.push(new THREE.Vector3(axis.x + Math.cos(a) * r[i], yAt(i), axis.z + Math.sin(a) * r[i]));
      draw.push(drawAt(yAt(i)) * 0.85 + (s / segs) * 0.12);
    }
    polys.push({ pts, draw });
  }
  return polys;
}

// capsule tank outline
function tankLines(cx, cz, r, ya, yb, longs = 8) {
  const polys = [];
  const H = yb - ya;
  const seg = 14;
  for (let k = 0; k < longs; k++) {
    const a = (k / longs) * Math.PI * 2;
    const pts = [],
      draw = [];
    // bottom dome -> cylinder -> top dome
    for (let s = 0; s <= seg; s++) {
      const th = -Math.PI / 2 + (s / seg) * (Math.PI / 2);
      pts.push(new THREE.Vector3(cx + Math.cos(a) * r * Math.cos(th), ya + r + Math.sin(th) * r, cz + Math.sin(a) * r * Math.cos(th)));
    }
    for (let s = 0; s <= seg; s++) {
      const th = (s / seg) * (Math.PI / 2);
      pts.push(new THREE.Vector3(cx + Math.cos(a) * r * Math.cos(th), yb - r + Math.sin(th) * r, cz + Math.sin(a) * r * Math.cos(th)));
    }
    pts.forEach(p => draw.push((yb - p.y) / (H || 1)));
    polys.push({ pts, draw });
  }
  for (const y of [ya + r, (ya + yb) / 2, yb - r]) {
    const pts = [],
      draw = [];
    for (let s = 0; s <= 40; s++) {
      const a = (s / 40) * Math.PI * 2;
      pts.push(new THREE.Vector3(cx + Math.cos(a) * r, y, cz + Math.sin(a) * r));
      draw.push((yb - y) / (H || 1) + (s / 40) * 0.1);
    }
    polys.push({ pts, draw });
  }
  return polys;
}

function nozzleLines(cx, cz, yThroat, yExit, rThroat, rExit, longs = 10) {
  const polys = [];
  const seg = 10;
  for (let k = 0; k < longs; k++) {
    const a = (k / longs) * Math.PI * 2;
    const pts = [],
      draw = [];
    for (let s = 0; s <= seg; s++) {
      const t = s / seg;
      const r = rThroat + (rExit - rThroat) * Math.pow(t, 0.7);
      const y = yThroat + (yExit - yThroat) * t;
      pts.push(new THREE.Vector3(cx + Math.cos(a) * r, y, cz + Math.sin(a) * r));
      draw.push(0.55 + t * 0.4);
    }
    polys.push({ pts, draw });
  }
  const pts = [],
    draw = [];
  for (let s = 0; s <= 40; s++) {
    const a = (s / 40) * Math.PI * 2;
    pts.push(new THREE.Vector3(cx + Math.cos(a) * rExit, yExit, cz + Math.sin(a) * rExit));
    draw.push(0.95);
  }
  polys.push({ pts, draw });
  return polys;
}

// A satellite drawn in lines: bus, folded solar wings, dish antenna.
function satelliteLines(cy) {
  const polys = [];
  const box = (w, h, d, oy) => {
    const x = w / 2,
      y = h / 2,
      z = d / 2;
    const c = [
      [-x, -y, -z], [x, -y, -z], [x, y, -z], [-x, y, -z],
      [-x, -y, z], [x, -y, z], [x, y, z], [-x, y, z]
    ].map(([a, b, e]) => new THREE.Vector3(a, b + oy, e));
    const E = [[0, 1], [1, 2], [2, 3], [3, 0], [4, 5], [5, 6], [6, 7], [7, 4], [0, 4], [1, 5], [2, 6], [3, 7]];
    E.forEach(([a, b], i) => polys.push({ pts: [c[a], c[b]], draw: [0.2 + i * 0.02, 0.24 + i * 0.02] }));
  };
  box(1.0, 1.5, 1.0, cy);
  // folded solar wings along the bus
  for (const s of [-1, 1]) {
    for (let p = 0; p < 3; p++) {
      const x = s * (0.58 + p * 0.05);
      const r = [
        new THREE.Vector3(x, cy - 0.7, -0.45),
        new THREE.Vector3(x, cy + 0.7, -0.45),
        new THREE.Vector3(x, cy + 0.7, 0.45),
        new THREE.Vector3(x, cy - 0.7, 0.45),
        new THREE.Vector3(x, cy - 0.7, -0.45)
      ];
      polys.push({ pts: r, draw: r.map((_, i) => 0.45 + p * 0.05 + i * 0.02) });
      // cell grid
      for (let g = 1; g < 4; g++) {
        const yy = cy - 0.7 + (g / 4) * 1.4;
        polys.push({ pts: [new THREE.Vector3(x, yy, -0.45), new THREE.Vector3(x, yy, 0.45)], draw: [0.6 + g * 0.03, 0.66 + g * 0.03] });
      }
    }
  }
  // dish
  const dish = [],
    dd = [];
  for (let s = 0; s <= 36; s++) {
    const a = (s / 36) * Math.PI * 2;
    dish.push(new THREE.Vector3(Math.cos(a) * 0.45, cy + 1.2, Math.sin(a) * 0.45));
    dd.push(0.75 + (s / 36) * 0.1);
  }
  polys.push({ pts: dish, draw: dd });
  for (let k = 0; k < 6; k++) {
    const a = (k / 6) * Math.PI * 2;
    polys.push({
      pts: [new THREE.Vector3(0, cy + 0.9, 0), new THREE.Vector3(Math.cos(a) * 0.45, cy + 1.2, Math.sin(a) * 0.45)],
      draw: [0.82, 0.9]
    });
  }
  polys.push({ pts: [new THREE.Vector3(0, cy + 0.75, 0), new THREE.Vector3(0, cy + 1.55, 0)], draw: [0.85, 0.95] });
  return polys;
}

export const PART_INFO = {
  fairing: { order: 4 },
  ps4: { order: 3 },
  ps3: { order: 2 },
  ps2: { order: 1 },
  ps1: { order: 0 }
};

export class Rocket {
  constructor(gltf, envMap) {
    this.root = new THREE.Group(); // position / scale / tilt
    this.orient = new THREE.Group(); // vertical <-> horizontal
    this.spinner = new THREE.Group(); // spin about long axis
    this.root.add(this.orient);
    this.orient.add(this.spinner);

    const src = gltf.scene.getObjectByName('PSLV') || gltf.scene;
    src.updateMatrixWorld(true);
    const inv = new THREE.Matrix4().copy(src.matrixWorld).invert();

    this.materials = new Set();
    this.parts = {};
    const children = [...src.children];
    for (const node of children) {
      const id = node.name;
      const g = new THREE.Group();
      g.name = id;
      // keep node's own (dequantization) transform, parent to our part group
      const m = new THREE.Matrix4().multiplyMatrices(inv, node.matrixWorld);
      node.parent.remove(node);
      node.matrix.copy(m);
      node.matrix.decompose(node.position, node.quaternion, node.scale);
      g.add(node);
      // collect points in rocket space for profiling
      const pts = [];
      node.updateMatrixWorld(true);
      const nodeToRocket = new THREE.Matrix4();
      const v = new THREE.Vector3();
      node.traverse(o => {
        if (!o.isMesh) return;
        o.castShadow = false;
        o.frustumCulled = false;
        this.materials.add(o.material);
        nodeToRocket.multiplyMatrices(m, new THREE.Matrix4().copy(node.matrixWorld).invert()).multiply(o.matrixWorld);
        const pa = o.geometry.attributes.position;
        const step = Math.max(1, Math.floor(pa.count / 6000));
        for (let i = 0; i < pa.count; i += step) pts.push(v.fromBufferAttribute(pa, i).clone().applyMatrix4(nodeToRocket));
      });
      const box = new THREE.Box3().setFromPoints(pts);
      const center = box.getCenter(new THREE.Vector3());
      this.parts[id] = { id, group: g, pts, box, center };
      this.spinner.add(g);
    }

    for (const mat of this.materials) {
      mat.transparent = false;
      mat.envMap = envMap || null;
      mat.envMapIntensity = 0.55;
      if (mat.name === 'material') mat.roughness = 0.45;
      mat.needsUpdate = true;
    }

    // --- blueprint lines per part ---
    this.lineMats = [];
    this.interiorMats = [];
    const outlineMat = lineMaterial('#8ED8FF', '#FFFFFF');
    const interiorMat = lineMaterial('#C9A0F5', '#F3E8FF');
    this.outlineMat = outlineMat;
    this.interiorMat = interiorMat;

    for (const [id, p] of Object.entries(this.parts)) {
      const isBooster = id.startsWith('booster');
      const axis = isBooster ? new THREE.Vector3(p.center.x, 0, p.center.z) : new THREE.Vector3(0, 0, 0);
      const prof = profileOf(p.pts, axis, isBooster ? 18 : 26);
      p.profile = prof;
      p.axis = axis;
      const half = id === 'fairing_R' ? 1 : id === 'fairing_L' ? -1 : 0;
      const polys = wireFromProfile(prof, axis, {
        longs: isBooster ? 8 : half ? 9 : 16,
        rings: isBooster ? 4 : 6,
        half
      });
      const lines = new THREE.LineSegments(segmentsFromPolylines(polys), outlineMat);
      lines.frustumCulled = false;
      lines.renderOrder = 5;
      p.group.add(lines);

      // interiors
      let ipolys = [];
      const rmax = Math.max(...prof.r);
      const H = prof.y1 - prof.y0;
      if (id === 'ps1') {
        // solid motor: star-bore grain + nozzle
        ipolys = ipolys.concat(tankLines(0, 0, rmax * 0.72, prof.y0 + H * 0.12, prof.y1 - H * 0.06, 10));
        for (let k = 0; k < 6; k++) {
          const a = (k / 6) * Math.PI * 2;
          const r = rmax * (k % 2 ? 0.18 : 0.3);
          ipolys.push({
            pts: [new THREE.Vector3(Math.cos(a) * r, prof.y0 + H * 0.15, Math.sin(a) * r), new THREE.Vector3(Math.cos(a) * r, prof.y1 - H * 0.1, Math.sin(a) * r)],
            draw: [0.9, 0.1]
          });
        }
        ipolys = ipolys.concat(nozzleLines(0, 0, prof.y0 + H * 0.1, prof.y0 - H * 0.04, rmax * 0.16, rmax * 0.55));
      } else if (id === 'ps2' || id === 'ps4') {
        // liquid stage: two propellant tanks + engine
        const mid = prof.y0 + H * 0.55;
        ipolys = ipolys.concat(tankLines(0, 0, rmax * 0.68, mid + 0.05, prof.y1 - H * 0.05, 8));
        ipolys = ipolys.concat(tankLines(0, 0, rmax * 0.68, prof.y0 + H * 0.22, mid - 0.05, 8));
        ipolys = ipolys.concat(nozzleLines(0, 0, prof.y0 + H * 0.2, prof.y0 - H * 0.02, rmax * 0.14, rmax * 0.48));
      } else if (id === 'ps3') {
        ipolys = ipolys.concat(tankLines(0, 0, rmax * 0.7, prof.y0 + H * 0.18, prof.y1 - H * 0.06, 8));
        ipolys = ipolys.concat(nozzleLines(0, 0, prof.y0 + H * 0.16, prof.y0 - H * 0.03, rmax * 0.14, rmax * 0.5));
      } else if (isBooster) {
        const r = rmax * 0.55;
        ipolys = ipolys.concat(tankLines(axis.x, axis.z, r, prof.y0 + H * 0.1, prof.y1 - H * 0.04, 6));
      }
      if (ipolys.length) {
        const il = new THREE.LineSegments(segmentsFromPolylines(ipolys), interiorMat);
        il.frustumCulled = false;
        il.renderOrder = 6;
        p.group.add(il);
      }
    }

    // payload satellite lives between the fairing halves
    const fairY = this.parts.fairing_R ? (this.parts.fairing_R.profile.y0 + this.parts.fairing_R.profile.y1) / 2 : 11.5;
    this.payload = new THREE.Group();
    const sat = new THREE.LineSegments(segmentsFromPolylines(satelliteLines(fairY - 0.4)), interiorMat);
    sat.frustumCulled = false;
    this.payload.add(sat);
    this.spinner.add(this.payload);

    // --- explode layout (rocket-local offsets) ---
    const gap = 3.0;
    const layout = {
      fairing_R: new THREE.Vector3(0, gap * 2.2, 0),
      fairing_L: new THREE.Vector3(0, gap * 2.2, 0),
      ps4: new THREE.Vector3(0, gap * 1.2, 0),
      ps3: new THREE.Vector3(0, gap * 0.3, 0),
      ps2: new THREE.Vector3(0, -gap * 0.7, 0),
      ps1: new THREE.Vector3(0, -gap * 1.8, 0)
    };
    for (const [id, p] of Object.entries(this.parts)) {
      if (id.startsWith('booster')) {
        const dir = new THREE.Vector3(p.center.x, 0, p.center.z).normalize();
        p.explode = new THREE.Vector3(dir.x * 2.2, -gap * 1.8 - 0.6, dir.z * 2.2);
      } else p.explode = layout[id] || new THREE.Vector3();
    }
    this.payloadExplode = layout.fairing_R.clone();

    // --- flames ---
    this.flames = new THREE.Group();
    this.flameMats = [];
    const makeFlame = (x, z, y, r, len, core) => {
      const g = new THREE.Group();
      g.position.set(x, y, z);
      const layers = core
        ? [
            [r * 0.55, r * 0.2, len * 0.35, 1],
            [r * 0.95, r * 0.45, len * 0.75, 0],
            [r * 1.25, r * 1.9, len, 0]
          ]
        : [
            [r * 0.6, r * 0.2, len * 0.4, 1],
            [r * 1.0, r * 1.5, len, 0]
          ];
      for (const [rt, rb, L, isCore] of layers) {
        const geo = new THREE.CylinderGeometry(rt, rb, L, 40, 30, true);
        geo.translate(0, -L / 2, 0);
        const mat = new THREE.ShaderMaterial({
          vertexShader: flameVert,
          fragmentShader: flameFrag,
          uniforms: { uTime: { value: 0 }, uIntensity: { value: 1 }, uSeed: { value: Math.random() * 10 }, uCore: { value: isCore } },
          transparent: true,
          depthWrite: false,
          blending: THREE.AdditiveBlending,
          side: THREE.DoubleSide,
          fog: false
        });
        this.flameMats.push(mat);
        const m = new THREE.Mesh(geo, mat);
        m.frustumCulled = false;
        m.renderOrder = 8;
        g.add(m);
      }
      const glow = new THREE.Mesh(
        new THREE.PlaneGeometry(1, 1),
        new THREE.ShaderMaterial({
          vertexShader: glowVert,
          fragmentShader: glowFrag,
          uniforms: { uIntensity: { value: 1 } },
          transparent: true,
          depthWrite: false,
          blending: THREE.AdditiveBlending,
          fog: false
        })
      );
      glow.scale.setScalar(r * 7);
      glow.position.y = -r * 0.8;
      glow.renderOrder = 9;
      glow.frustumCulled = false;
      this.flameMats.push(glow.material);
      g.add(glow);
      g.userData.len = len;
      this.flames.add(g);
    };
    const bottom = this.parts.ps1 ? this.parts.ps1.profile.y0 : -15.45;
    makeFlame(0, 0, bottom + 0.05, 0.55, 9, true);
    for (const [id, p] of Object.entries(this.parts)) {
      if (!id.startsWith('booster')) continue;
      makeFlame(p.center.x, p.center.z, p.profile.y0 + 0.02, 0.26, 5.5, false);
    }
    this.spinner.add(this.flames);

    this.light = new THREE.PointLight('#ff9a4a', 0, 0, 1.6);
    this.light.position.set(0, bottom - 2.5, 0);
    this.spinner.add(this.light);

    // label anchors (rocket-local)
    this.anchors = {};
    const a = (id, part, dy = 0) => {
      const p = this.parts[part];
      if (!p) return;
      this.anchors[id] = { part, local: new THREE.Vector3(0, (p.box.min.y + p.box.max.y) / 2 + dy, 0) };
    };
    a('fairing', 'fairing_R', 0);
    a('ps4', 'ps4');
    a('ps3', 'ps3');
    a('ps2', 'ps2');
    a('ps1', 'ps1', 2.5);
    if (this.parts.booster_2) this.anchors.boosters = { part: 'booster_2', local: new THREE.Vector3(this.parts.booster_2.center.x, -11.5, this.parts.booster_2.center.z) };

    this._v = new THREE.Vector3();
    this.time = 0;
  }

  apply(dt, s) {
    this.time += dt;
    // explode
    const e = s.explode;
    for (const p of Object.values(this.parts)) {
      p.group.position.copy(p.explode).multiplyScalar(e);
    }
    const open = s.fairingOpen;
    if (this.parts.fairing_R) this.parts.fairing_R.group.position.x += open * 1.9;
    if (this.parts.fairing_L) this.parts.fairing_L.group.position.x -= open * 1.9;
    if (this.parts.fairing_R) this.parts.fairing_R.group.rotation.z = -open * 0.16;
    if (this.parts.fairing_L) this.parts.fairing_L.group.rotation.z = open * 0.16;
    this.payload.position.copy(this.payloadExplode).multiplyScalar(e);

    // solids fade to ghost; lines draw in
    const solid = 1 - s.ghost * 0.93;
    const see = solid < 0.999;
    for (const m of this.materials) {
      m.opacity = solid;
      m.transparent = see; // opaque (cheaper, no sorting) except during the teardown
      m.depthWrite = solid > 0.6;
    }
    // skip drawing line layers entirely while they are invisible
    this.outlineMat.visible = s.draw > 0.001;
    this.interiorMat.visible = s.interior > 0.001;
    this.outlineMat.uniforms.uDraw.value = s.draw * 1.08;
    this.outlineMat.uniforms.uOpacity.value = Math.min(1, s.draw * 3) * 0.95;
    this.interiorMat.uniforms.uDraw.value = s.interior * 1.08;
    this.interiorMat.uniforms.uOpacity.value = Math.min(1, s.interior * 3);

    // flames
    const f = s.flame;
    for (const m of this.flameMats) {
      if (m.uniforms.uTime) m.uniforms.uTime.value = this.time;
      m.uniforms.uIntensity.value = f * (0.92 + Math.sin(this.time * 31.0) * 0.04 + Math.sin(this.time * 17.0) * 0.04);
    }
    this.flames.visible = f > 0.002;
    for (const g of this.flames.children) {
      const L = 0.25 + 0.75 * f;
      g.scale.set(0.6 + 0.4 * f, L * (0.96 + Math.sin(this.time * 23 + g.position.x) * 0.04), 0.6 + 0.4 * f);
    }
    this.light.intensity = f * 60;
  }
}
