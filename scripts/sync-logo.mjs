// Generates the site's logo data and icons from the official kit in
// public/brand/FAR_Brand_Logos. Run with `npm run logo` whenever the kit changes.
//
// The kit's SVGs carry per-glyph transforms; these are baked into absolute paths, so the
// marks can be drawn inline in currentColor. The kit's viewBox is kept as `clearSpace`:
// it is the clear space the brand guidelines ask for.
import { copyFile, readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const kit = join(root, "public/brand/FAR_Brand_Logos");
const round = (value) => +value.toFixed(2);

function bakePath(d, { sx, sy, tx, ty }) {
  const points = [];
  const tokens = d.match(/[MLHVCQZ]|-?\d*\.?\d+/g) ?? [];
  let out = "";
  let i = 0;
  while (i < tokens.length) {
    const cmd = tokens[i++];
    if (cmd === "Z") {
      out += "Z";
      continue;
    }
    if (!"MLHVCQ".includes(cmd)) throw new Error(`Unexpected path token: ${cmd}`);
    const args = [];
    while (i < tokens.length && !/[A-Z]/.test(tokens[i])) args.push(Number(tokens[i++]));
    const mapped = args.map((value, index) => {
      const isY = cmd === "V" || (cmd !== "H" && index % 2 === 1);
      return isY ? ty + sy * value : tx + sx * value;
    });
    if (cmd === "H" || cmd === "V") points.push({ [cmd === "H" ? "x" : "y"]: mapped[0] });
    else for (let p = 0; p < mapped.length; p += 2) points.push({ x: mapped[p], y: mapped[p + 1] });
    out += `${cmd}\u0000${mapped.join("\u0001")}`;
  }
  return { out, points };
}

async function readMark(file) {
  const svg = await readFile(join(kit, "svg", file), "utf8");
  const [, viewWidth, viewHeight] = svg.match(/viewBox="0 0 (\d+) (\d+)"/) ?? [];
  const group = Number(svg.match(/<g transform="scale\(([\d.]+)\)"/)?.[1] ?? 1);
  const paths = [...svg.matchAll(/<path d="([^"]+)" transform="translate\(([-\d.]+) ([-\d.]+)\) scale\(([-\d.]+) ([-\d.]+)\)"/g)];
  if (paths.length === 0) throw new Error(`No paths found in ${file}`);

  const baked = paths.map(([, d, tx, ty, sx, sy]) =>
    bakePath(d, { sx: Number(sx) * group, sy: Number(sy) * group, tx: Number(tx) * group, ty: Number(ty) * group }),
  );
  const all = baked.flatMap((path) => path.points);
  const xs = all.flatMap((point) => (point.x === undefined ? [] : [point.x]));
  const ys = all.flatMap((point) => (point.y === undefined ? [] : [point.y]));
  const [left, right, top, bottom] = [Math.min(...xs), Math.max(...xs), Math.min(...ys), Math.max(...ys)];

  // Re-origin on the artwork's own bounds. Offsets are applied last, to baked coordinates.
  const finish = ({ out }) =>
    out.replace(/([MLHVCQ])\u0000([^MLHVCQZ]*)/g, (_, cmd, args) => {
      const values = args.split("\u0001").map(Number);
      const shifted = values.map((value, index) => {
        const isY = cmd === "V" || (cmd !== "H" && index % 2 === 1);
        return round(value - (isY ? top : left));
      });
      return `${cmd}${shifted.join(" ")}`;
    });

  // The kit always draws the period last.
  return {
    width: round(right - left),
    height: round(bottom - top),
    letters: baked.slice(0, -1).map(finish).join(""),
    period: finish(baked[baked.length - 1]),
    clearSpace: {
      left: round(left),
      top: round(top),
      right: round(Number(viewWidth) - right),
      bottom: round(Number(viewHeight) - bottom),
    },
  };
}

const paths = {
  wordmark: await readMark("wordmark_transparent_light.svg"),
  monogram: await readMark("monogram_dark.svg"),
};
await writeFile(join(root, "components/brand/logo-paths.json"), `${JSON.stringify(paths, null, 2)}\n`);

await copyFile(join(kit, "web/favicon.svg"), join(root, "app/icon.svg"));
await copyFile(join(kit, "web/favicon.ico"), join(root, "app/favicon.ico"));
await copyFile(join(kit, "web/icon-180.png"), join(root, "app/apple-icon.png"));

console.log("logo synced from kit");
