import * as THREE from 'three';

// Launch complex from the supplied GLB (its own rocket removed at build time).
// Pad deck sits at the origin of the model; PAD_LOCAL is where the PSLV nozzles touch down.
export const PAD_LOCAL = new THREE.Vector3(0, 7.6, 0.2);
export const PAD_TILT = 0.2; // radians, looks down onto the complex

export class Pad {
  constructor(gltf) {
    this.root = new THREE.Group();
    this.model = gltf.scene;
    this.model.traverse(o => {
      if (!o.isMesh) return;
      o.frustumCulled = true;
      const m = o.material;
      if (m) m.flatShading = true; // normals are derived per-face in the shader (they were stripped at build time)
      if (m && !m.map) {
        // untextured structures: painted steel & concrete
        m.color = new THREE.Color('#c9d2dc');
        m.roughness = 0.78;
        m.metalness = 0.15;
      } else if (m) {
        m.roughness = 1;
        m.metalness = 0;
      }
    });
    this.root.add(this.model);

    // pad floodlights: warm pools that remain after engine shutdown
    this.flood = new THREE.PointLight('#ffd3a1', 0, 0, 1.2);
    this.flood.position.set(-18, 40, 26);
    this.root.add(this.flood);
    this.flood2 = new THREE.PointLight('#bcd4ff', 0, 0, 1.2);
    this.flood2.position.set(24, 36, -10);
    this.root.add(this.flood2);

    // exhaust dust ring that billows when the engines are near the deck
    const N = 90;
    const g = new THREE.BufferGeometry();
    const pos = new Float32Array(N * 3);
    const seed = new Float32Array(N);
    for (let i = 0; i < N; i++) {
      const a = Math.random() * Math.PI * 2;
      pos.set([Math.cos(a), 0, Math.sin(a)], i * 3);
      seed[i] = Math.random();
    }
    g.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    g.setAttribute('aSeed', new THREE.BufferAttribute(seed, 1));
    this.smokeUniforms = { uT: { value: 0 }, uAmt: { value: 0 }, uPx: { value: 1 }, uScale: { value: 1 } };
    this.smoke = new THREE.Points(
      g,
      new THREE.ShaderMaterial({
        uniforms: this.smokeUniforms,
        vertexShader: `
          attribute float aSeed; uniform float uT; uniform float uAmt; uniform float uPx; uniform float uScale;
          varying float vA;
          void main(){
            float life = fract(uT*0.35 + aSeed);
            vec3 p = position * (4.0 + life*26.0*(0.6+aSeed*0.6));
            p.y = 7.8 + life*3.0*aSeed;
            vA = (1.0-life) * smoothstep(0.0,0.15,life) * uAmt;
            vec4 mv = modelViewMatrix*vec4(p,1.0);
            gl_Position = projectionMatrix*mv;
            gl_PointSize = (40.0 + life*160.0) * uPx * uScale / max(1.0, -mv.z*0.05);
          }`,
        fragmentShader: `
          varying float vA;
          void main(){ float d=length(gl_PointCoord-0.5); float a=smoothstep(0.5,0.0,d)*vA*0.22; if(a<0.004) discard;
            gl_FragColor=vec4(vec3(0.78,0.74,0.70)*a, a); }`,
        transparent: true,
        depthWrite: false
      })
    );
    this.smoke.frustumCulled = false;
    this.root.add(this.smoke);
  }

  place(point, scale, tilt) {
    // put PAD_LOCAL exactly at `point`
    this.root.scale.setScalar(scale);
    this.root.rotation.set(tilt, 2.0, 0, 'XYZ');
    this.root.updateMatrix();
    const off = PAD_LOCAL.clone().applyMatrix4(new THREE.Matrix4().makeRotationFromEuler(this.root.rotation)).multiplyScalar(scale);
    this.root.position.copy(point).sub(off);
  }

  update(dt, visible, landing, flame, dpr, scale) {
    this.root.visible = visible > 0.001;
    this.smokeUniforms.uT.value += dt;
    this.smokeUniforms.uPx.value = dpr;
    this.smokeUniforms.uScale.value = scale * 40;
    this.smokeUniforms.uAmt.value = flame * THREE.MathUtils.smoothstep(landing, 0.35, 0.8);
    const lit = THREE.MathUtils.smoothstep(landing, 0.85, 1.0);
    this.flood.intensity = lit * 2600 * scale * scale;
    this.flood2.intensity = lit * 1400 * scale * scale;
  }
}
