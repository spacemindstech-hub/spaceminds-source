import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { MeshoptDecoder } from 'three/examples/jsm/libs/meshopt_decoder.module.js';

const loader = new GLTFLoader();
loader.setMeshoptDecoder(MeshoptDecoder);
const cache = {};
const ARTIFACT = import.meta.env.MODE === 'artifact';

const toBuffer = b64 => {
  const bin = atob(b64);
  const out = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i);
  return out.buffer;
};
const parse = buf => new Promise((res, rej) => loader.parse(buf, '', res, rej));


export const loadRocket = () =>
  (cache.rocket ||= ARTIFACT
    ? import('../assets/rocket.glb?b64').then(m => parse(toBuffer(m.default)))
    : loader.loadAsync(`${import.meta.env.BASE_URL}models/rocket.glb`));

export const loadPad = () =>
  (cache.pad ||= ARTIFACT
    ? import('../assets/pad.glb?b64').then(m => parse(toBuffer(m.default)))
    : loader.loadAsync(`${import.meta.env.BASE_URL}models/pad.glb`));
