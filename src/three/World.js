import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { Sky } from './Sky';
import { Rocket } from './Rocket';
import { Pad, PAD_TILT } from './Pad';
import { loadRocket, loadPad } from './assets';
import { rig, labelEls, clamp, smoother, range, lerp, worldPerPx, ROCKET_H } from './store';

const V = () => new THREE.Vector3();
const wrapPi = a => Math.atan2(Math.sin(a), Math.cos(a));

export class World {
  constructor(gl, scene, camera) {
    this.gl = gl;
    this.scene = scene;
    this.camera = camera;
    this.sky = new Sky(gl, window.innerWidth < 768 ? 512 : 1024);
    scene.add(this.sky.group);
    this.fog = new THREE.FogExp2('#081a33', 0);
    scene.fog = this.fog;

    const pmrem = new THREE.PMREMGenerator(gl);
    this.env = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;

    // lights: warm key (sun), cool rim, soft fill
    this.hemi = new THREE.HemisphereLight('#9fb8e6', '#0a1222', 0.35);
    this.key = new THREE.DirectionalLight('#fff1dc', 1.7);
    this.key.position.set(-18, 14, 22);
    this.rim = new THREE.DirectionalLight('#7fb2ff', 2.4);
    this.rim.position.set(20, 6, -18);
    scene.add(this.hemi, this.key, this.rim);

    this.state = { pos: V(), len: 10, rotZ: 0, tilt: 0 };
    this.spin = 0.4;
    this.smoothPos = null;
    this.pointer = new THREE.Vector2();
    this.upVec = new THREE.Vector3(0, 1, 0);
    this._tmp = V();
    this.lastScroll = window.scrollY;

    this.padRequested = false;
    this.warm = false;
    this.warmFrames = 0;
    // Parallel (non-blocking) shader compile where the browser supports it; plain compile otherwise (e.g. Safari).
    const parallel = !!gl.getContext().getExtension('KHR_parallel_shader_compile');
    this.compile = () => (parallel ? gl.compileAsync(scene, camera) : Promise.resolve(gl.compile(scene, camera)));
    loadRocket()
      .then(async g => {
        this.rocket = new Rocket(g, this.env);
        this.rocket.root.visible = false;
        scene.add(this.rocket.root);
        // Compile shaders and upload textures without blocking, BEFORE the entrance animation starts.
        const aniso = Math.min(8, gl.capabilities.getMaxAnisotropy());
        this.rocket.root.traverse(o => {
          if (!o.material) return;
          ['map', 'metalnessMap', 'roughnessMap', 'normalMap', 'emissiveMap'].forEach(k => {
            const t = o.material[k];
            if (!t) return;
            t.anisotropy = aniso; // keeps decals and panel lines crisp at glancing angles
            t.needsUpdate = true;
            gl.initTexture(t);
          });
        });
        this.rocket.root.visible = true;
        await this.compile();
        rig.ready = true;
        window.dispatchEvent(new Event('rocket-ready'));
      })
      .catch(err => console.warn('Rocket model failed to load:', err));
  }

  // The launch complex is only seen at the bottom of the home page: load it when the visitor gets close.
  loadPadWhenNear() {
    if (this.padRequested) return;
    this.padRequested = true;
    loadPad()
      .then(async p => {
        const pad = new Pad(p);
        const aniso = Math.min(8, this.gl.capabilities.getMaxAnisotropy());
        pad.root.traverse(o => {
          if (o.material?.map) {
            o.material.map.anisotropy = aniso; // the ground plane is viewed almost edge-on
            o.material.map.needsUpdate = true;
          }
        });
        pad.root.visible = false;
        this.scene.add(pad.root);
        pad.root.visible = true;
        await this.compile();
        pad.root.visible = false;
        this.pad = pad;
      })
      .catch(err => console.warn('Launch complex failed to load:', err));
  }

  dockTargets() {
    const vw = rig.viewW,
      k = worldPerPx(),
      mid = rig.viewH / 2; // canvas centre (camera axis), in CSS px from the top
    const els = document.querySelectorAll('[data-dock]');
    const out = [];
    for (const el of els) {
      const r = el.getBoundingClientRect();
      if (r.width === 0 && r.height === 0) continue;
      const orient = el.dataset.orient || 'v';
      const type = el.dataset.dock;
      const lenPx = orient === 'h' ? r.width * (vw < 768 ? 0.66 : 0.5) : r.height;
      const cx = r.left + r.width / 2,
        cy = r.top + r.height / 2;
      const t = {
        type,
        cy,
        len: lenPx * k,
        pos: new THREE.Vector3((cx - vw / 2) * k, (mid - cy) * k, 0),
        rotZ: orient === 'h' ? -Math.PI / 2 : +(el.dataset.lean || 0),
        tilt: 0
      };
      if (type === 'pad') {
        const P = new THREE.Vector3((cx - vw / 2) * k, (mid - r.bottom) * k, 0);
        const up = new THREE.Vector3(0, Math.cos(PAD_TILT), Math.sin(PAD_TILT));
        t.padPoint = P;
        t.pos = P.clone().addScaledVector(up, t.len / 2);
        t.tilt = PAD_TILT;
        t.padScale = t.len / 44; // PSLV is ~44 m tall; complex is modelled in metres
        this.upVec.copy(up);
        this.padTarget = t;
      }
      out.push(t);
    }
    return out;
  }

  teardownProgress() {
    const el = document.querySelector('[data-teardown]');
    if (!el) return 0;
    const r = el.getBoundingClientRect();
    const vh = window.innerHeight;
    return clamp(-r.top / Math.max(1, r.height - vh));
  }

  update(dt, pointer, dpr) {
    const cam = this.camera;
    this.sky.bakeStep(this.gl);
    // First frames after the rocket is ready upload its buffers to the GPU; once a few have been drawn
    // (still behind the logo screen) the scene is warm and the page can be revealed without hitches.
    if (!this.warm && this.sky.baked && rig.ready && ++this.warmFrames >= 4) {
      this.warm = true;
      window.__sceneWarm = true;
      window.dispatchEvent(new Event('scene-warm'));
    }
    const sy = window.scrollY;
    rig.velocity = lerp(rig.velocity, (sy - this.lastScroll) / Math.max(dt, 1e-3), 0.1);
    this.lastScroll = sy;
    rig.scrollY = sy;

    // camera sway with pointer
    this.pointer.lerp(pointer, 0.04);
    cam.position.x = this.pointer.x * 0.6;
    cam.position.y = this.pointer.y * 0.4;
    cam.lookAt(0, 0, 0);

    this.padTarget = null;
    const T = rig.home ? this.dockTargets() : [];
    const vc = window.innerHeight / 2;

    // ---- teardown timeline ----
    const p = rig.home ? this.teardownProgress() : 0;
    const up = (a, b) => smoother(range(p, a, b));
    rig.explode = up(0.06, 0.26) - up(0.8, 0.95);
    rig.fairingOpen = up(0.2, 0.34) - up(0.74, 0.86);
    rig.ghost = up(0.22, 0.38) - up(0.68, 0.82);
    rig.draw = up(0.24, 0.46) - up(0.66, 0.8);
    rig.interior = up(0.38, 0.54) - up(0.62, 0.74);
    rig.labels = range(p, 0.3, 0.4) - range(p, 0.62, 0.7);

    let landing = 0;
    const s = this.state;
    if (T.length) {
      let a = T[0],
        b = T[0],
        t = 0;
      if (vc <= T[0].cy) {
        a = b = T[0];
      } else if (vc >= T[T.length - 1].cy) {
        a = b = T[T.length - 1];
      } else {
        for (let i = 0; i < T.length - 1; i++) {
          if (vc >= T[i].cy && vc < T[i + 1].cy) {
            a = T[i];
            b = T[i + 1];
            t = (vc - a.cy) / Math.max(1, b.cy - a.cy);
            break;
          }
        }
      }
      const e = smoother(range(t, 0.14, 0.86));
      s.pos.lerpVectors(a.pos, b.pos, e);
      s.len = lerp(a.len, b.len, e);
      s.rotZ = lerp(a.rotZ, b.rotZ, e);
      s.tilt = lerp(a.tilt, b.tilt, e);
      // a gentle swoop toward the viewer while travelling between bays
      const arc = Math.sin(Math.PI * e);
      s.pos.z += arc * 3.2 * (a === b ? 0 : 1);
      s.bank = (b.pos.x - a.pos.x) * arc * -0.035;
      if (b.type === 'pad') landing = e;
      if (a.type === 'pad') landing = 1;
    }
    rig.landing = landing;

    // ---- pad placement ----
    const pt = this.padTarget;
    if (pt && !this.padRequested && pt.cy < window.innerHeight * 5) this.loadPadWhenNear();
    const padVis = pt ? clamp(1 - (pt.cy - window.innerHeight * 1.9) / (window.innerHeight * 0.8)) : 0;
    rig.padVisible = padVis;
    this.fog.density = 0.0 + padVis * 0.0085;
    if (this.pad) {
      if (pt) this.pad.place(pt.padPoint, pt.padScale, PAD_TILT);
      this.pad.update(dt, padVis, landing, rig.flame, dpr, pt ? pt.padScale : 1);
    }
    this.sky.update(dt, cam, sy, dpr, padVis, this.upVec);

    // ---- rocket ----
    const R = this.rocket;
    if (!R) return;
    R.root.visible = rig.home;
    if (!rig.home) return;

    const hold = Math.max(rig.explode, rig.ghost);
    const speed = 0.22 + Math.min(Math.abs(rig.velocity), 3000) * 0.00045;
    this.spin += dt * speed * (1 - hold) * (1 - landing);
    const spinTarget = 0.5;
    const spin = this.spin + hold * wrapPi(spinTarget - this.spin) + landing * wrapPi(0.2 - this.spin);

    // intro: descend into the hero bay with the engines lit
    const intro = smoother(rig.intro);
    const bob = Math.sin(performance.now() * 0.0011) * 0.012 * s.len * (1 - landing) * (1 - hold);

    const target = this._tmp.copy(s.pos);
    target.y += (1 - intro) * 26 + bob;
    if (!this.smoothPos) this.smoothPos = target.clone();
    this.smoothPos.lerp(target, 1 - Math.pow(0.0001, dt)); // critically damped-ish follow
    if (landing > 0.98 || window.__snap) this.smoothPos.copy(target);

    R.root.position.copy(this.smoothPos);
    R.root.scale.setScalar(s.len / ROCKET_H);
    R.root.rotation.set(s.tilt + this.pointer.y * -0.05 * (1 - landing), this.pointer.x * 0.08 * (1 - landing), (s.bank || 0) * (1 - hold));
    R.orient.rotation.z = s.rotZ;
    R.spinner.rotation.y = spin;

    // engines: full through flight, off while dismantled, throttle down and cut after touchdown
    const flame = clamp((0.35 + 0.65 * intro) * (1 - hold) * (1 - smoother(range(landing, 0.62, 0.97))));
    rig.flame = flame;
    R.apply(dt, rig);

    // ---- labels (teardown) ----
    if (labelEls.size) {
      R.root.updateMatrixWorld(true);
      const vw = rig.viewW,
        vh = rig.viewH;
      for (const [id, el] of labelEls) {
        const an = R.anchors[id];
        if (!an) continue;
        const part = R.parts[an.part];
        const v = this._tmp.copy(an.local).applyMatrix4(part.group.matrixWorld).project(cam);
        const x = (v.x * 0.5 + 0.5) * vw,
          y = (-v.y * 0.5 + 0.5) * vh;
        el.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0)`;
        el.style.opacity = String(clamp(rig.labels));
      }
    }
  }
}
