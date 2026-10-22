# SpaceMinds website

React 18 + Vite 5 + Tailwind CSS 3 + three.js (react-three-fiber), GSAP and Lenis.

## Getting started
    npm install          # install dependencies
    npm run dev          # local development at http://localhost:5173
    npm run build        # production build into dist/ (deploy this folder)
    npm run preview      # serve the production build locally
    npm run build:artifact  # optional: everything inlined into one dist/index.html

## Deploy
- **Vercel:** import the repo; `vercel.json` sets the build, clean URLs and caching.
- **Hostinger:** run `npm run build` and upload the contents of `dist/` (including the hidden
  `.htaccess`) into `public_html/`.

## Project map
- `src/pages/Home.jsx` – homepage section order
- `src/sections/` – homepage sections (`HomeA`, `HomeB`, `Teardown`)
- `src/pages/Pages.jsx` – all inner pages
- `src/three/` – WebGL scene: `World` (scroll director), `Rocket`, `Pad`, `Sky`, `Experience`
- `src/components/` – shared UI, widgets and visual effects
- `src/data/content.js` – all copy, programmes, pricing and contact details
- `src/rb/` – React Bits components (MIT + Commons Clause, © David Haz), some patched
- `public/models/` – rocket.glb and pad.glb (streamed at runtime)
- `index.html` – logo intro screen and favicon

## Notes
- Favicon: generated from the SpaceMinds mark (`public/favicon*.png`, `apple-touch-icon.png`).
- The 3D scene adapts its resolution to the device and pauses off-screen work; models load
  progressively (rocket first, launch pad only near the footer).
