import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';
import { World } from './World';
import { rig, CAMZ, FOV } from './store';

// Keeps the frame rate smooth: lowers canvas resolution when frames are slow, restores it when there's headroom.
const MAX_DPR = Math.min(typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1, 2);
function useAdaptiveDpr() {
  const setDpr = useThree(s => s.setDpr);
  // Changing DPR reallocates the canvas buffers (a visible hitch), so it only reacts to *sustained* slowness,
  // ignores the start-up seconds (shader compile / model upload), and never flips back and forth quickly.
  const acc = useRef({ t: 0, n: 0, dpr: Math.min(MAX_DPR, 1.5), cool: 4, slow: 0 });
  useFrame((_, dt) => {
    const a = acc.current;
    if (a.cool > 0) {
      a.cool -= dt;
      return;
    }
    a.t += dt;
    a.n++;
    if (a.n < 90) return;
    const avg = a.t / a.n;
    a.t = 0;
    a.n = 0;
    a.slow = avg > 1 / 42 ? a.slow + 1 : 0;
    let next = a.dpr;
    if (a.slow >= 2) next = Math.max(1, a.dpr - 0.25);
    else if (avg < 1 / 58 && a.dpr < MAX_DPR) next = Math.min(MAX_DPR, a.dpr + 0.125);
    if (Math.abs(next - a.dpr) > 0.01) {
      a.dpr = next;
      a.slow = 0;
      a.cool = 3;
      setDpr(next);
    }
  });
}

function WorldDriver() {
  useAdaptiveDpr();
  const { gl, scene, camera } = useThree();
  // canvas size changes only on real resizes (not per frame); the world maps DOM pixels with it
  const size = useThree(s => s.size);
  useEffect(() => {
    rig.viewW = size.width;
    rig.viewH = size.height;
  }, [size.width, size.height]);
  const world = useRef(null);
  const pointer = useRef(new THREE.Vector2());

  useEffect(() => {
    world.current = new World(gl, scene, camera);
    const onMove = e => {
      pointer.current.set((e.clientX / window.innerWidth) * 2 - 1, -(e.clientY / window.innerHeight) * 2 + 1);
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    // the rocket's entrance plays once both the intro is gone and the model is ready, in whichever order they happen
    let introDone = !!window.__smDone;
    let modelReady = rig.ready;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const fly = () => {
      if (!introDone || !modelReady) return;
      if (reduced) rig.intro = 1; // no descent animation when the visitor asks for reduced motion
      else gsap.to(rig, { intro: 1, duration: 2.6, ease: 'power3.out', delay: 0.05 });
    };
    const onReady = () => { modelReady = true; fly(); };
    const onLoaded = () => { introDone = true; fly(); };
    window.addEventListener('rocket-ready', onReady);
    window.addEventListener('sm-loaded', onLoaded);
    fly();
    return () => {
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('rocket-ready', onReady);
      window.removeEventListener('sm-loaded', onLoaded);
    };
  }, [gl, scene, camera]);

  useFrame((state, dt) => {
    world.current?.update(Math.min(dt, 0.05), pointer.current, state.viewport.dpr);
  });
  return null;
}

export default function Experience() {
  return (
    <div className="sm-canvas pointer-events-none fixed inset-x-0 top-0 z-0" aria-hidden="true">
      <Canvas
        dpr={Math.min(MAX_DPR, 1.5)}
        resize={{ scroll: false, debounce: { scroll: 0, resize: 120 } }}
        gl={{ antialias: true, alpha: false, powerPreference: 'high-performance', stencil: false, toneMapping: THREE.ACESFilmicToneMapping, toneMappingExposure: 1.05 }}
        camera={{ fov: FOV, near: 0.5, far: 3000, position: [0, 0, CAMZ] }}
        onCreated={({ gl }) => gl.setClearColor('#02060F')}
      >
        <WorldDriver />
      </Canvas>
    </div>
  );
}
