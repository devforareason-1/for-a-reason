// Renders the site's original placeholder artwork. Run with `npm run art`.
//
// Output is written to /public and /app. Nothing here depicts a real client or
// real work: these are abstract compositions built from the brand's palette, to
// be replaced by project imagery as it becomes available.
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const W = 1920;
const H = 1200;

const c = { ink: "#0B0B0B", graphite: "#202020", ivory: "#F5F2EC", ember: "#FF6A00", coral: "#FF4D2E", amber: "#FFB56B" };

// Deterministic randomness, so regenerating does not churn every binary.
function rng(seed) {
  let s = seed;
  return () => {
    s = (s * 1664525 + 1013904223) % 4294967296;
    return s / 4294967296;
  };
}

const defs = `
  <filter id="soft" x="-100%" y="-150%" width="300%" height="400%"><feGaussianBlur stdDeviation="90"/></filter>
  <filter id="softer" x="-60%" y="-100%" width="220%" height="300%"><feGaussianBlur stdDeviation="28"/></filter>
  <filter id="noise" x="0" y="0" width="100%" height="100%">
    <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="7"/>
    <feColorMatrix values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 0.55 0"/>
  </filter>
  <linearGradient id="sun" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0" stop-color="${c.amber}"/><stop offset="0.38" stop-color="${c.ember}"/>
    <stop offset="0.72" stop-color="${c.coral}" stop-opacity="0.75"/><stop offset="1" stop-color="${c.coral}" stop-opacity="0"/>
  </linearGradient>
  <linearGradient id="shade" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0" stop-color="${c.ink}" stop-opacity="0"/><stop offset="1" stop-color="${c.ink}"/>
  </linearGradient>
  <filter id="concrete" x="0" y="0" width="100%" height="100%">
    <feTurbulence type="fractalNoise" baseFrequency="0.02 0.16" numOctaves="4" seed="4"/>
    <feColorMatrix values="0 0 0 0 0.04  0 0 0 0 0.04  0 0 0 0 0.04  1.6 1.6 0 0 -1.05"/>
    <feComposite in2="SourceAlpha" operator="in"/>
  </filter>
  <radialGradient id="glassFill" gradientUnits="userSpaceOnUse" cx="1040" cy="800" r="980">
    <stop offset="0" stop-color="${c.amber}"/><stop offset="0.22" stop-color="${c.ember}"/>
    <stop offset="0.55" stop-color="#c8400f"/><stop offset="0.85" stop-color="#4a1605"/><stop offset="1" stop-color="#1c0a04"/>
  </radialGradient>
  <linearGradient id="slabShade" x1="0" y1="0" x2="1" y2="0">
    <stop offset="0" stop-color="${c.ink}" stop-opacity="0.92"/><stop offset="0.55" stop-color="${c.ink}" stop-opacity="0.45"/><stop offset="1" stop-color="${c.ink}" stop-opacity="0.1"/>
  </linearGradient>
  <linearGradient id="wall" x1="0" y1="0" x2="1" y2="0">
    <stop offset="0" stop-color="#2b2118"/><stop offset="1" stop-color="#0d0c0b"/>
  </linearGradient>
`;

const frame = (body) => `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>${defs}</defs>
  <rect width="${W}" height="${H}" fill="${c.ink}"/>
  ${body}
  <rect width="${W}" height="${H}" filter="url(#noise)" opacity="0.07"/>
</svg>`;

// Rain: hundreds of hairlines falling through a low band of light.
function rain({ seed = 1, horizon = 0.62, cx = 0.62 } = {}) {
  const r = rng(seed);
  let lines = "";
  for (let i = 0; i < 420; i += 1) {
    const x = r() * W;
    const y = r() * H * 0.9;
    const len = 80 + r() * 420;
    lines += `<line x1="${x.toFixed(1)}" y1="${y.toFixed(1)}" x2="${(x - len * 0.05).toFixed(1)}" y2="${(y + len).toFixed(1)}" stroke="${c.ivory}" stroke-opacity="${(0.03 + r() * 0.16).toFixed(3)}" stroke-width="${(0.6 + r() * 1.2).toFixed(2)}"/>`;
  }
  return frame(`
    <ellipse cx="${W * cx}" cy="${H * horizon}" rx="${W * 0.5}" ry="${H * 0.2}" fill="${c.ember}" filter="url(#soft)" opacity="0.9"/>
    <ellipse cx="${W * cx}" cy="${H * horizon + 30}" rx="${W * 0.2}" ry="${H * 0.05}" fill="${c.amber}" filter="url(#softer)" opacity="0.85"/>
    ${lines}
    <rect y="${H * (horizon + 0.08)}" width="${W}" height="${H}" fill="${c.ink}" opacity="0.92"/>
    <rect y="${H * (horizon + 0.08)}" width="${W}" height="2" fill="${c.amber}" opacity="0.35"/>
  `);
}

// Kiln: nested brick arches, lit from the fire inside.
function kiln({ cx = 0.5, cy = 1.02, tilt = 0 } = {}) {
  let arches = "";
  const n = 9;
  for (let i = n; i >= 1; i -= 1) {
    const rx = 90 + i * 118;
    const t = 1 - i / n;
    const shade = Math.round(10 + t * 18);
    arches += `<path d="M ${W * cx - rx} ${H} L ${W * cx - rx} ${H * cy - rx * 0.9} A ${rx} ${rx} 0 0 1 ${W * cx + rx} ${H * cy - rx * 0.9} L ${W * cx + rx} ${H} Z" fill="rgb(${shade + 6},${shade},${shade - 2})" stroke="${c.ember}" stroke-opacity="${(0.08 + t * 0.5).toFixed(2)}" stroke-width="2"/>`;
  }
  return frame(`
    <g transform="rotate(${tilt} ${W / 2} ${H / 2})">
      ${arches}
      <path d="M ${W * cx - 180} ${H} L ${W * cx - 180} ${H * cy - 160} A 180 180 0 0 1 ${W * cx + 180} ${H * cy - 160} L ${W * cx + 180} ${H} Z" fill="url(#sun)"/>
      <ellipse cx="${W * cx}" cy="${H * 0.82}" rx="430" ry="340" fill="${c.ember}" filter="url(#soft)" opacity="0.55"/>
    </g>
  `);
}

// Columns: a concrete colonnade with the light coming through its gaps.
function columns({ count = 7, lightX = 0.72 } = {}) {
  const colW = W / count;
  let shafts = "";
  for (let i = 0; i < count; i += 1) {
    const x = i * colW;
    const dist = Math.abs((x + colW / 2) / W - lightX);
    const glow = Math.max(0, 1 - dist * 2.2);
    shafts += `<rect x="${x + colW * 0.32}" y="0" width="${colW * 0.68}" height="${H}" fill="url(#wall)"/>`;
    shafts += `<path d="M ${x} ${H * 0.12} L ${x + colW * 0.32} ${H * 0.12} L ${x + colW * 0.32} ${H} L ${x - colW * 0.9} ${H} Z" fill="${c.ember}" opacity="${(glow * 0.75).toFixed(3)}" filter="url(#softer)"/>`;
    shafts += `<rect x="${x + colW * 0.3}" y="${H * 0.12}" width="3" height="${H}" fill="${c.amber}" opacity="${(glow * 0.9).toFixed(3)}"/>`;
  }
  return frame(`
    <rect width="${W}" height="${H}" fill="#0f0e0d"/>
    <ellipse cx="${W * lightX}" cy="${H * 0.5}" rx="${W * 0.4}" ry="${H * 0.45}" fill="${c.ember}" filter="url(#soft)" opacity="0.5"/>
    ${shafts}
    <rect width="${W}" height="${H * 0.13}" fill="#0a0a0a"/>
    <rect y="${H * 0.78}" width="${W}" height="${H * 0.22}" fill="url(#shade)"/>
  `);
}

// Arc: the brand board's rim light. A dark circle, lit from behind.
const arcMarkup = (x, y, r) => `
  <circle cx="${x}" cy="${y}" r="${r}" fill="none" stroke="${c.coral}" stroke-width="180" filter="url(#soft)" opacity="0.8"/>
  <circle cx="${x}" cy="${y}" r="${r}" fill="none" stroke="${c.ember}" stroke-width="30" filter="url(#softer)"/>
  <circle cx="${x}" cy="${y}" r="${r}" fill="${c.ink}"/>
  <circle cx="${x}" cy="${y}" r="${r}" fill="none" stroke="${c.amber}" stroke-width="3"/>`;

function arc({ cx = 0.1, cy = 0.2, r = 1100 } = {}) {
  return frame(arcMarkup(W * cx, H * cy, r));
}

// Architecture: a concrete slab over a glass wall lit from inside, receding to the left.
function architecture({ vpX = -300, vpY = 620, near = 1960, far = 430, flip = false } = {}) {
  const yAt = (x, yNear) => vpY + ((yNear - vpY) * (x - vpX)) / (near - vpX);
  const quad = (x1, x2, y1, y2) =>
    `M${x1} ${yAt(x1, y1)}L${x2} ${yAt(x2, y1)}L${x2} ${yAt(x2, y2)}L${x1} ${yAt(x1, y2)}Z`;
  const slabStart = far - 170;

  // Each pane catches the light a little differently, which is what stops it reading flat.
  const r = rng(vpX + 1000);
  const rows = [345, 700, 1060, 1420, 1700];
  let panes = "";
  for (let x = near, gap = 300; x > far; x -= gap, gap *= 0.84) {
    for (let row = 0; row < rows.length - 1; row += 1) {
      const tone = r();
      panes += `<path d="${quad(Math.max(x - gap, far), x, rows[row], rows[row + 1])}" fill="${tone > 0.72 ? c.amber : "#050201"}" opacity="${(tone > 0.72 ? 0.1 + r() * 0.14 : r() * 0.42).toFixed(2)}"/>`;
    }
  }

  let frames = "";
  for (let x = near, gap = 300; x > far; x -= gap, gap *= 0.84) {
    const width = (24 * (x - vpX)) / (near - vpX);
    frames += `<path d="M${x} ${yAt(x, 345)}L${x} ${yAt(x, 1700)}" stroke="#070605" stroke-width="${width}"/>`;
  }
  for (const yNear of [700, 1060, 1420]) {
    frames += `<path d="${quad(far, near, yNear, yNear + 26)}" fill="#070605"/>`;
  }

  const body = `
    <rect width="${W}" height="${H}" fill="#090807"/>
    <path d="${quad(far, near, 345, 1700)}" fill="url(#glassFill)"/>
    <ellipse cx="1000" cy="900" rx="300" ry="190" fill="${c.amber}" opacity="0.28" filter="url(#soft)"/>
    <path d="M${far + 420} 1250 L${far + 1050} 470 L${far + 1130} 470 L${far + 520} 1250Z" fill="#120603" opacity="0.82"/>
    ${panes}
    ${frames}
    <path d="${quad(far, far + 16, 345, 1700)}" fill="#070605"/>
    <path d="${quad(slabStart, near, 300, 345)}" fill="#3a1407"/>
    <path d="${quad(slabStart, near, 20, 300)}" fill="#6c6a66"/>
    <path d="${quad(slabStart, near, 20, 300)}" fill="#6c6a66" filter="url(#concrete)"/>
    <path d="${quad(slabStart, near, 20, 300)}" fill="url(#slabShade)"/>
    <path d="${quad(slabStart, near, 292, 300)}" fill="${c.ember}" opacity="0.5"/>
    <rect x="0" y="0" width="${slabStart}" height="${H}" fill="#090807"/>`;
  return frame(flip ? `<g transform="translate(${W} 0) scale(-1 1)">${body}</g>` : body);
}

const art = {
  "work/monsoon-archive-cover": rain({ seed: 11, horizon: 0.6, cx: 0.66 }),
  "work/monsoon-archive-detail-a": rain({ seed: 23, horizon: 0.34, cx: 0.24 }),
  "work/monsoon-archive-detail-b": rain({ seed: 37, horizon: 0.72, cx: 0.5 }),
  "work/kiln-house-cover": kiln({ cx: 0.5 }),
  "work/kiln-house-detail-a": kiln({ cx: 0.2, cy: 0.86 }),
  "work/kiln-house-detail-b": kiln({ cx: 0.86, cy: 1.2 }),
  "work/groundwork-cover": columns({ count: 7, lightX: 0.72 }),
  "work/groundwork-detail-a": columns({ count: 4, lightX: 0.3 }),
  "work/groundwork-detail-b": columns({ count: 11, lightX: 0.55 }),
  "work/the-full-stop-cover": arc({ cx: 0.02, cy: 0.05, r: 1250 }),
  "work/the-full-stop-detail-a": arc({ cx: 0.75, cy: 1.1, r: 900 }),
  "work/the-full-stop-detail-b": arc({ cx: 0.5, cy: -0.55, r: 1400 }),
  "studio/architecture": architecture(),
  "studio/architecture-c": architecture({ vpX: 300, vpY: 760, far: 320 }),
  "studio/architecture-b": architecture({ vpX: -80, vpY: 480, far: 620, flip: true }),
};

// Social images use the official wordmark. Icons come straight from the kit: see sync-logo.mjs.
async function brandAssets() {
  const { wordmark } = JSON.parse(await readFile(join(root, "components/brand/logo-paths.json"), "utf8"));

  const ogScale = 620 / wordmark.width;
  const og = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
    <defs>${defs}</defs>
    <rect width="1200" height="630" fill="${c.ink}"/>
    ${arcMarkup(120, -260, 1010)}
    <g transform="translate(72 300) scale(${ogScale})"><path d="${wordmark.letters}" fill="${c.ivory}"/><path d="${wordmark.period}" fill="${c.ember}"/></g>
    <rect width="1200" height="630" filter="url(#noise)" opacity="0.06"/>
  </svg>`;
  const ogPng = await sharp(Buffer.from(og)).png({ compressionLevel: 9, palette: true }).toBuffer();
  await writeFile(join(root, "app/opengraph-image.png"), ogPng);
  await writeFile(join(root, "app/twitter-image.png"), ogPng);
}

async function grain() {
  const size = 240;
  const r = rng(99);
  const px = Buffer.alloc(size * size * 2);
  for (let i = 0; i < size * size; i += 1) {
    px[i * 2] = r() > 0.5 ? 255 : 0;
    px[i * 2 + 1] = Math.floor(r() * 90);
  }
  const out = join(root, "public/textures/grain.png");
  await mkdir(dirname(out), { recursive: true });
  await sharp(px, { raw: { width: size, height: size, channels: 2 } }).png({ compressionLevel: 9 }).toFile(out);
}

for (const [name, svg] of Object.entries(art)) {
  const out = join(root, "public/images", `${name}.jpg`);
  await mkdir(dirname(out), { recursive: true });
  await sharp(Buffer.from(svg)).jpeg({ quality: 82, mozjpeg: true }).toFile(out);
  console.log("art", name);
}
await grain();
await brandAssets();
console.log("done");
