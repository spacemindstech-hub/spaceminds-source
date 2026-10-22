import * as THREE from 'three';

// A full-sphere sky that follows the camera: deep-space gradient, procedural Milky Way with dust lanes,
// dense micro-stars, and a dusk horizon that fades in when the launch complex comes into view.
const skyVert = /* glsl */ `
varying vec3 vDir;
void main(){
  vec4 wp = modelMatrix * vec4(position,1.0);
  vDir = normalize(wp.xyz - cameraPosition);
  gl_Position = projectionMatrix * viewMatrix * wp;
  gl_Position.z = gl_Position.w; // push to far plane
}`;

const bakeFrag = /* glsl */ `
precision highp float;
varying vec3 vDir;
uniform float uTime;
uniform mat3 uRot;
uniform vec3 uUp;
uniform float uGround;
uniform vec3 uFog;

float hash(vec3 p){ p = fract(p*0.3183099+.1); p*=17.0; return fract(p.x*p.y*p.z*(p.x+p.y+p.z)); }
float noise(vec3 x){
  vec3 i=floor(x); vec3 f=fract(x); f=f*f*(3.0-2.0*f);
  return mix(mix(mix(hash(i+vec3(0,0,0)),hash(i+vec3(1,0,0)),f.x),mix(hash(i+vec3(0,1,0)),hash(i+vec3(1,1,0)),f.x),f.y),
             mix(mix(hash(i+vec3(0,0,1)),hash(i+vec3(1,0,1)),f.x),mix(hash(i+vec3(0,1,1)),hash(i+vec3(1,1,1)),f.x),f.y),f.z);
}
float fbm(vec3 p){ float v=0.0; float a=0.5; for(int i=0;i<5;i++){ v+=a*noise(p); p*=2.03; a*=0.5; } return v; }

vec3 microStars(vec3 d, float scale, float thresh){
  vec3 p = d*scale; vec3 c = floor(p); vec3 f = fract(p)-0.5;
  float h = hash(c);
  if(h < thresh) return vec3(0.0);
  vec3 off = vec3(hash(c+1.3),hash(c+2.7),hash(c+4.1))-0.5;
  float dist = length(f - off*0.6);
  float b = smoothstep(0.12, 0.0, dist) * (h-thresh)/(1.0-thresh);
  float tw = 1.0;
  vec3 tint = mix(vec3(0.75,0.85,1.0), vec3(1.0,0.86,0.7), hash(c+9.0));
  return tint*b*tw;
}

void main(){
  vec3 d = normalize(vDir);
  float up = d.y*0.5+0.5;
  vec3 col = mix(vec3(0.006,0.014,0.034), vec3(0.016,0.036,0.078), up);

  // Milky Way band
  vec3 G = normalize(vec3(0.32, 0.78, -0.52));
  float b = dot(d, G);
  float band = exp(-b*b*14.0);
  float core = exp(-b*b*60.0);
  float n = fbm(d*3.2 + vec3(4.0,1.0,2.0));
  float n2 = fbm(d*7.5 + vec3(9.0,3.0,1.0));
  float dust = smoothstep(0.42, 0.72, fbm(d*5.0 + vec3(2.0,7.0,5.0)));
  float mw = band*(0.35 + n*0.9) + core*n2*0.8;
  mw *= 1.0 - dust*0.85*band;
  vec3 mwCol = mix(vec3(0.42,0.52,0.80), vec3(0.95,0.82,0.66), clamp(n2*1.3 - 0.2 + core*0.4, 0.0, 1.0));
  col += mwCol * mw * 0.13;

  // faint emission nebulae
  float neb = smoothstep(0.55, 0.9, fbm(d*2.2 + vec3(11.0,5.0,3.0)));
  col += vec3(0.30,0.10,0.28) * neb * 0.05 * (0.4+band);
  float neb2 = smoothstep(0.58, 0.92, fbm(d*2.6 + vec3(1.0,15.0,8.0)));
  col += vec3(0.05,0.20,0.26) * neb2 * 0.05;

  // micro stars (denser along the band)
  col += microStars(d, 300.0, 0.985 - band*0.012) * 0.9;
  col += microStars(d, 210.0, 0.992) * 0.8;

  gl_FragColor = vec4(col, 1.0);
}`;


const skyFrag = /* glsl */ `
precision highp float;
varying vec3 vDir;
uniform samplerCube uSky;
uniform mat3 uRot;
uniform vec3 uUp;
uniform float uGround;
uniform vec3 uFog;
float dither(vec2 p){ return fract(sin(dot(p, vec2(12.9898,78.233))) * 43758.5453) - 0.5; }
void main(){
  vec3 d = normalize(uRot * vDir);
  vec3 col = textureCube(uSky, vec3(-d.x, d.y, d.z)).rgb;
  float h = dot(normalize(vDir), uUp);
  col *= mix(1.0, smoothstep(-0.02, 0.35, h), uGround);
  float g1 = exp(-max(h,0.0)*18.0);
  float g2 = exp(-max(h,0.0)*4.5);
  col += uGround * (vec3(1.0,0.52,0.26)*g1*0.28 + vec3(0.10,0.20,0.40)*g2*0.22);
  col = mix(col, uFog, smoothstep(0.01, -0.06, h) * uGround);
  col += dither(gl_FragCoord.xy) / 255.0;
  gl_FragColor = vec4(col, 1.0);
}`;

const starVert = /* glsl */ `
attribute float aSize;
attribute vec3 aColor;
attribute float aPhase;
uniform float uTime;
uniform float uPx;
uniform vec3 uUp;
uniform float uGround;
varying vec3 vColor;
varying float vAlpha;
void main(){
  vec4 wp = modelMatrix*vec4(position,1.0);
  vec3 dir = normalize(wp.xyz - cameraPosition);
  float h = dot(dir, uUp);
  float fade = mix(1.0, smoothstep(0.0, 0.3, h), uGround);
  float tw = 0.7 + 0.3*sin(uTime*(0.6+aPhase*2.5) + aPhase*50.0);
  vColor = aColor;
  vAlpha = tw*fade;
  gl_Position = projectionMatrix*viewMatrix*wp;
  gl_Position.z = gl_Position.w*0.9999;
  gl_PointSize = aSize*uPx;
}`;
const starFrag = /* glsl */ `
varying vec3 vColor;
varying float vAlpha;
void main(){
  vec2 c = gl_PointCoord-0.5;
  float r = length(c);
  float core = smoothstep(0.5, 0.0, r);
  float glow = pow(core, 3.0);
  // subtle diffraction spikes on bright stars
  float spike = max(0.0, 1.0 - abs(c.x)*28.0) * smoothstep(0.5,0.0,abs(c.y)) + max(0.0, 1.0 - abs(c.y)*28.0) * smoothstep(0.5,0.0,abs(c.x));
  float a = (glow + spike*0.18) * vAlpha;
  if(a < 0.004) discard;
  gl_FragColor = vec4(vColor*a, a);
}`;

function starColor(t) {
  // t 0..1 cool -> warm (approximate black-body tints)
  const stops = [
    [0.62, 0.72, 1.0],
    [0.82, 0.88, 1.0],
    [1.0, 1.0, 1.0],
    [1.0, 0.93, 0.8],
    [1.0, 0.78, 0.55]
  ];
  const x = t * (stops.length - 1);
  const i = Math.min(stops.length - 2, Math.floor(x));
  const f = x - i;
  return stops[i].map((v, k) => v + (stops[i + 1][k] - v) * f);
}

export class Sky {
  constructor(renderer, faceSize = 1024) {
    this.group = new THREE.Group();

    // --- Milky Way / nebula / micro-stars baked into a cube map, one face per frame (see bakeStep) ---
    const rt = new THREE.WebGLCubeRenderTarget(faceSize, { type: THREE.HalfFloatType, generateMipmaps: false, minFilter: THREE.LinearFilter });
    this.bakeScene = new THREE.Scene();
    this.bakeDome = new THREE.Mesh(
      new THREE.SphereGeometry(10, 64, 32),
      new THREE.ShaderMaterial({ vertexShader: skyVert, fragmentShader: bakeFrag, side: THREE.BackSide, depthWrite: false, uniforms: {} })
    );
    this.bakeScene.add(this.bakeDome);
    this.cubeCam = new THREE.CubeCamera(0.1, 100, rt);
    this.cubeCam.coordinateSystem = renderer.coordinateSystem;
    this.cubeCam.updateCoordinateSystem();
    this.bakeFace = 0;
    this.baked = false;
    this.cube = rt;

    this.uniforms = {
      uTime: { value: 0 },
      uSky: { value: rt.texture },
      uRot: { value: new THREE.Matrix3() },
      uUp: { value: new THREE.Vector3(0, 1, 0) },
      uGround: { value: 0 },
      uFog: { value: new THREE.Color('#081a33') }
    };
    const dome = new THREE.Mesh(
      new THREE.SphereGeometry(900, 48, 24),
      new THREE.ShaderMaterial({
        vertexShader: skyVert,
        fragmentShader: skyFrag,
        uniforms: this.uniforms,
        side: THREE.BackSide,
        depthWrite: false,
        fog: false
      })
    );
    dome.renderOrder = -20;
    dome.frustumCulled = false;
    this.group.add(dome);

    // resolved stars
    const N = window.innerWidth < 768 ? 3200 : 5200;
    const pos = new Float32Array(N * 3);
    const size = new Float32Array(N);
    const color = new Float32Array(N * 3);
    const phase = new Float32Array(N);
    const G = new THREE.Vector3(0.32, 0.78, -0.52).normalize();
    const v = new THREE.Vector3();
    for (let i = 0; i < N; i++) {
      // bias a fraction towards the galactic band
      do {
        v.set(Math.random() * 2 - 1, Math.random() * 2 - 1, Math.random() * 2 - 1);
      } while (v.lengthSq() > 1 || v.lengthSq() < 0.01);
      v.normalize();
      if (Math.random() < 0.35) {
        const b = v.dot(G);
        v.addScaledVector(G, -b * 0.8).normalize();
      }
      v.multiplyScalar(800);
      pos.set([v.x, v.y, v.z], i * 3);
      const m = Math.pow(Math.random(), 7.0); // power law brightness
      size[i] = 1.4 + m * 9.0;
      const c = starColor(Math.pow(Math.random(), 1.3));
      const lum = 0.35 + m * 0.65 + Math.random() * 0.2;
      color.set([c[0] * lum, c[1] * lum, c[2] * lum], i * 3);
      phase[i] = Math.random();
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    g.setAttribute('aSize', new THREE.BufferAttribute(size, 1));
    g.setAttribute('aColor', new THREE.BufferAttribute(color, 3));
    g.setAttribute('aPhase', new THREE.BufferAttribute(phase, 1));
    this.starUniforms = {
      uTime: this.uniforms.uTime,
      uPx: { value: 1 },
      uUp: this.uniforms.uUp,
      uGround: this.uniforms.uGround
    };
    const stars = new THREE.Points(
      g,
      new THREE.ShaderMaterial({
        vertexShader: starVert,
        fragmentShader: starFrag,
        uniforms: this.starUniforms,
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        fog: false
      })
    );
    stars.renderOrder = -19;
    stars.frustumCulled = false;
    this.stars = stars;
    this.group.add(stars);
    this._m4 = new THREE.Matrix4();
    this._e = new THREE.Euler();
  }

  // Spreads the expensive procedural sky over six frames instead of one long GPU stall.
  bakeStep(renderer) {
    if (this.baked) return;
    const cams = this.cubeCam.children;
    const prevTarget = renderer.getRenderTarget();
    const prevTM = renderer.toneMapping;
    renderer.toneMapping = THREE.NoToneMapping;
    renderer.setRenderTarget(this.cube, this.bakeFace);
    renderer.render(this.bakeScene, cams[this.bakeFace]);
    renderer.setRenderTarget(prevTarget);
    renderer.toneMapping = prevTM;
    if (++this.bakeFace === 6) {
      this.baked = true;
      this.bakeDome.geometry.dispose();
      this.bakeDome.material.dispose();
      this.bakeScene = this.bakeDome = null;
    }
  }

  update(dt, camera, scrollY, dpr, ground, up) {
    this.uniforms.uTime.value += dt;
    this.group.position.copy(camera.position);
    // slow drift + scroll parallax on the celestial sphere
    const a = scrollY * 0.00011 + this.uniforms.uTime.value * 0.004;
    this._e.set(0.18 + scrollY * 0.00003, a, 0.1);
    this.stars.rotation.copy(this._e);
    this._m4.makeRotationFromEuler(this._e).invert();
    this.uniforms.uRot.value.setFromMatrix4(this._m4);
    this.starUniforms.uPx.value = dpr;
    this.uniforms.uGround.value = ground;
    if (up) this.uniforms.uUp.value.copy(up);
  }
}
