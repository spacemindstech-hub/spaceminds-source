// Move the (large) inlined module script to the end of <body> so the loader paints while the page streams in.
import fs from 'fs';
const f = 'dist/index.html';
let s = fs.readFileSync(f, 'utf8');
const m = s.match(/<script type="module" crossorigin>[\s\S]*?<\/script>/);
if (m) {
  s = s.replace(m[0], () => '');
  s = s.replace('</body>', () => m[0] + '\n</body>');
  fs.writeFileSync(f, s);
  console.log('moved module script to body end');
} else console.log('script not found');
