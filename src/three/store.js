// Shared mutable state between DOM (scroll/docks) and the WebGL scene. No React re-renders.
export const rig = {
  ready: false,
  intro: 0,
  explode: 0,
  draw: 0,
  ghost: 0,
  interior: 0,
  labels: 0,
  fairingOpen: 0,
  flame: 1,
  landing: 0,
  padVisible: 0,
  scrollY: 0,
  velocity: 0,
  home: false,
  viewW: typeof window !== 'undefined' ? window.innerWidth : 1280,
  viewH: typeof window !== 'undefined' ? window.innerHeight : 800
};
export const labelEls = new Map(); // part id -> HTMLElement
export const CAMZ = 40;
export const FOV = 30;
export const ROCKET_H = 30.93; // model units, nose to nozzle
export const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
export const smooth = t => t * t * (3 - 2 * t);
export const smoother = t => t * t * t * (t * (t * 6 - 15) + 10);
export const range = (v, a, b) => clamp((v - a) / (b - a));
export const lerp = (a, b, t) => a + (b - a) * t;
// world units per CSS pixel at the rocket's depth, based on the canvas height (not the live viewport)
export const worldPerPx = () => (2 * CAMZ * Math.tan((FOV * Math.PI) / 360)) / rig.viewH;
