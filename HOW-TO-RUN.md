# Running the prototype

1. Put `main.js` in `src/main.js`. Run `npm install` then `npm run build` (produces `bundle.js`).
2. The page expects `studio.glb.js`: the GLB as base64 in `window.STUDIO_GLB="..."`. Make it from `models/identity_studio_v3_web_v41a.glb` (this wrapper exists only because the artifact host cannot serve .glb; a normal site loads the .glb directly).
3. Serve the folder with any static server and open `index.html`.

URL hash switches (combine with dashes): `#mat-a|b|c`, `#btrans-0.72`, `#proxy-0|1`, `#edge-fresnel|mask|both`, `#ribbon-v4`, `#cam-v4`, `#frame-N` (timeline at N/30 s), `#capture`, `#clean`, `#bench`, `#nocase`, `#nostrips`.

Known: the head scan is by Lee Perry-Smith, CC BY 3.0. Credit is required.
