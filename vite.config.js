import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { viteSingleFile } from 'vite-plugin-singlefile';
import fs from 'fs';

// import foo from './x.glb?b64' -> base64 string (only used by the single-file "artifact" build)
const b64 = () => ({
  name: 'b64-loader',
  enforce: 'pre',
  load(id) {
    if (!id.endsWith('?b64')) return null;
    const file = id.slice(0, -4);
    this.addWatchFile(file);
    return `export default ${JSON.stringify(fs.readFileSync(file).toString('base64'))};`;
  }
});

// Starts the rocket model download from the HTML itself, before any JavaScript runs.
const preloadModels = () => ({
  name: 'preload-models',
  transformIndexHtml: () => [
    { tag: 'link', attrs: { rel: 'preload', href: '/models/rocket.glb', as: 'fetch', type: 'model/gltf-binary', crossorigin: 'anonymous' }, injectTo: 'head' }
  ]
});

export default defineConfig(({ mode }) => {
  const artifact = mode === 'artifact';
  return {
    plugins: [b64(), react(), ...(artifact ? [viteSingleFile()] : [preloadModels()])],
    // In the artifact build everything is inlined, so the public/ copy is not needed.
    publicDir: artifact ? false : 'public',
    build: artifact
      ? { assetsInlineLimit: 100000000, chunkSizeWarningLimit: 100000, cssCodeSplit: false, target: 'es2020' }
      : {
          target: 'es2020',
          chunkSizeWarningLimit: 1200,
          assetsInlineLimit: 4096,
          rollupOptions: {
            output: {
              // Long-lived, separately cacheable vendor chunks
              manualChunks: {
                react: ['react', 'react-dom', 'react-router-dom'],
                three: ['three', '@react-three/fiber'],
                anim: ['gsap', 'motion', 'lenis'],
                ogl: ['ogl', 'cobe']
              }
            }
          }
        }
  };
});
