// Builds the isometric gold trophy for the "Award-winning creative" section.
// Run: node tools/trophy/build.mjs  ->  writes src/components/trophyArt.ts (a static SVG string).
// Geometry is computed once here with the anatomy kit; the page only fades and lifts the groups.
import { writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import * as k from "../anatomy-kit/iso-kit.mjs";
import * as G from "../anatomy-kit/lathe.mjs";
import * as T from "../anatomy-kit/tube.mjs";

const HERE = dirname(fileURLToPath(import.meta.url));
const OUT = join(HERE, "../../src/components/trophyArt.ts");

const WIDTH = 520;
const HEIGHT = 560;

// World: x, y on the floor, z up. About 1 unit = 1 px of a 30 cm trophy.
const PLINTH = { x: -54, y: -54, w: 108, d: 108, r: 4 };
const FOOT_H = 3;
const BASE_H = 30;
const TIER = k.insetPlan(PLINTH, 12);
const TIER_H = 8;
const Z0 = FOOT_H + BASE_H + TIER_H; // where the gold begins

// The turned body, bottom to top: [s, r] from Z0 up the vertical axis. Third value 1 = smooth knot.
const FOOT = [[0, 0], [0, 32], [2.4, 32], [3.4, 30.6], [5, 28, 1], [8, 23, 1], [11, 18, 1], [14, 15]];
const COLLAR = [[14, 0], [14, 17], [17, 17], [17, 0]];
const STEM = [[17, 0], [17, 7], [24, 5.8, 1], [31, 5.6], [33, 7.4], [33, 0]];
const KNOP = [[33, 0], [33, 6.4], [35, 9.4, 1], [39, 11.2, 1], [43, 9.4, 1], [45, 6.4], [45, 0]];
const NECK = [[45, 0], [45, 6], [53, 6.6, 1], [58, 9], [60, 12], [60, 0]];
// The bowl: a classic loving cup. Analytic flare so the shading runs in one clean curve.
const BOWL_FROM = 60;
const BOWL_TO = 152;
const bowlR = (s) => {
  const t = (s - BOWL_FROM) / (BOWL_TO - BOWL_FROM);
  return 12 + 38 * Math.sin(Math.min(1, t * 1.25) * Math.PI / 2) ** 0.8 + 4 * t * t;
};
const BOWL = [[BOWL_FROM, 0], ...Array.from({ length: 26 }, (_, i) => {
  const s = BOWL_FROM + (i / 25) * (BOWL_TO - BOWL_FROM);
  return [s, bowlR(s), 1];
}), [BOWL_TO, 0]];
const RIM_R = bowlR(BOWL_TO);
const LIP = [[BOWL_TO - 1, 0], [BOWL_TO - 1, RIM_R + 0.6], [BOWL_TO + 0.6, RIM_R + 2.2, 1], [BOWL_TO + 2.4, RIM_R + 1.2], [BOWL_TO + 2.4, 0]];
const TOP = Z0 + BOWL_TO + 2.4;

const P = k.fitProjection(
  [...k.boxCorners(PLINTH, 0, 0), [0, 0, TOP + 8], [64, 64, Z0 + 120], [-64, -64, Z0 + 120]],
  WIDTH,
  HEIGHT,
  { pad: 36, azimuth: 45 },
);
const at = (p) => k.iso(p, P);
const S = (paths, style) => k.solidSvg(paths, style);
const L = (d, style) => k.lineSvg(d, style);
const D = (points, style) => k.dotsSvg(points, style);
const axis = (s) => G.frameOf([0, 0, Z0 + s], [0, 0, 1], [1, 0, 0], [0, 1, 0]);
const turned = (profile, opts = {}) => S(G.lathe(profile, axis(0), P, { steps: 56, ...opts }), { tone: "hi", crease: "none" });

// Which way the viewer looks: the near corner of the plinth, and the screen-sideways direction for the handles.
const depth = (p) => k.depthOf(p, P);
const gx = depth([1, 0, 0]) - depth([0, 0, 0]);
const gy = depth([0, 1, 0]) - depth([0, 0, 0]);
const sx = Math.sign(gx) || 1;
const sy = Math.sign(gy) || 1;
const side = (() => { const l = Math.hypot(gx, gy); return [-gy / l, gx / l]; })();

function plinth() {
  const out = [`<path class="iso-halo" d="${k.haloOf(PLINTH, 0, FOOT_H + BASE_H, P)}"/>`];
  const feet = k.corners(PLINTH, 12).sort((a, b) => depth([a[0], a[1], 0]) - depth([b[0], b[1], 0]));
  for (const [x, y] of feet) {
    out.push(S(k.cylinder(x, y, 6, 0, 1.2, P, 28), { tone: "lo" }));
    out.push(S(k.cylinder(x, y, 4.8, 1.2, FOOT_H - 1.2, P, 28), { tone: "mid" }));
  }
  out.push(S(k.slabOf(PLINTH, FOOT_H, BASE_H, P, 6, 1.4), { tone: "mid" }));
  // A shadow groove a third of the way up every face, wrapping the corners
  out.push(L(k.planOutline(PLINTH, FOOT_H + BASE_H * 0.32, P), { tone: "faint" }));
  out.push(L(k.planOutline(k.insetPlan(PLINTH, 5), FOOT_H + BASE_H, P), { tone: "lo" }));
  out.push(S(k.slabOf(TIER, FOOT_H + BASE_H, TIER_H, P, 4, 1), { tone: "mid" }));
  out.push(L(k.planOutline(k.insetPlan(TIER, 4), Z0, P), { tone: "faint" }));
  // Screws on the ledge corners
  const screws = k.corners(PLINTH, 6);
  out.push(L(screws.map(([x, y]) => k.ring(x, y, 2, FOOT_H + BASE_H, P, 16)).join(""), { tone: "lo" }));
  out.push(D(screws.map(([x, y]) => at([x, y, FOOT_H + BASE_H])), { size: 0.5 }));
  return out.join("");
}

// Brass plate on the near ledge, engraved, with three rule lines under the title
function plate() {
  const near = sy > 0;
  const y0 = near ? TIER.y + TIER.d + 1.5 : PLINTH.y + 1.5;
  const p = { x: -32, y: y0, w: 64, d: 9, r: 1 };
  const z = FOOT_H + BASE_H;
  const out = [S(k.slabOf(p, z, 0.8, P, 2, 0.3), { tone: "hi", crease: "none" })];
  out.push(L(k.planOutline(k.insetPlan(p, 1), z + 0.8, P), { tone: "lo" }));
  out.push(k.faceTextSvg(k.topMatrix([0, p.y + 3.6], z + 0.8, P, "x"), "TEMPEST AWARD", { size: 3.4, tone: "lo", anchor: "middle" }));
  out.push(D([at([p.x + 2.6, p.y + 4.5, z + 0.8]), at([p.x + p.w - 2.6, p.y + 4.5, z + 0.8])], { size: 0.45 }));
  return out.join("");
}

function body() {
  const out = [];
  out.push(`<path class="iso-halo" d="${k.haloOf({ x: -30, y: -30, w: 60, d: 60, r: 30 }, Z0, 0.2, P)}" style="filter:blur(5px)"/>`);
  out.push(turned(FOOT));
  // Turned grooves on the foot's dome
  out.push(L([4.2, 9.5].map((s) => k.sideArc(0, 0, s < 5 ? 29 : 21.6, Z0 + s, P, 48)).join(""), { tone: "lo" }));
  out.push(turned(COLLAR));
  out.push(L(k.sideArc(0, 0, 17, Z0 + 15.5, P, 40), { tone: "lo" }));
  out.push(turned(STEM));
  out.push(turned(KNOP));
  out.push(L(k.sideArc(0, 0, 11.2, Z0 + 39, P, 40), { tone: "lo" }));
  out.push(turned(NECK));
  return out.join("");
}

function handle(dir) {
  // A C-shaped scroll handle: leaves the bowl high, loops out, returns low. Ends sit on the bowl wall.
  const route = [[118, 0], [124, 8], [130, 18], [124, 28], [112, 32], [98, 30], [86, 22], [80, 10], [80, 0]]
    .map(([s, out]) => [s, bowlR(s) + out - 1.2]);
  const raw = route.map(([s, r]) => [dir[0] * r, dir[1] * r, Z0 + s]);
  // Catmull-Rom through the control points so the scroll bends in one continuous curve
  const pts = [];
  for (let i = 0; i < raw.length - 1; i++) {
    const p0 = raw[Math.max(0, i - 1)], p1 = raw[i], p2 = raw[i + 1], p3 = raw[Math.min(raw.length - 1, i + 2)];
    for (let t = 0; t < 1; t += 0.25) {
      const t2 = t * t, t3 = t2 * t;
      pts.push([0, 1, 2].map((c) => 0.5 * (2 * p1[c] + (-p0[c] + p2[c]) * t + (2 * p0[c] - 5 * p1[c] + 4 * p2[c] - p3[c]) * t2 + (-p0[c] + 3 * p1[c] - 3 * p2[c] + p3[c]) * t3)));
    }
  }
  pts.push(raw[raw.length - 1]);
  return T.tubePieces(pts, 3.4, P, { spacing: 3.2, maxLength: 40 }).map((piece) => T.tubeSvg(piece, { tone: "hi" })).join("");
}

function bowl() {
  const out = [turned(BOWL, { smooth: true })];
  // Two engraved bands and a cartouche line around the bowl
  out.push(L([BOWL_FROM + 22, BOWL_FROM + 70].map((s) => k.sideArc(0, 0, bowlR(s) + 0.2, Z0 + s, P, 64)).join(""), { tone: "lo" }));
  out.push(L(k.sideArc(0, 0, bowlR(BOWL_FROM + 74) + 0.2, Z0 + BOWL_FROM + 74, P, 64), { tone: "faint" }));
  out.push(turned(LIP, { smooth: true }));
  // The open mouth: the far inside wall, darker, then the rim lines
  out.push(`<path class="au-inside" d="${k.ring(0, 0, RIM_R - 0.6, TOP, P, 96)}"/>`);
  out.push(L(k.ring(0, 0, RIM_R - 0.6, TOP, P, 96), { tone: "mid" }));
  out.push(L(k.ring(0, 0, RIM_R + 1.2, TOP, P, 96), { tone: "hi" }));
  return out.join("");
}

// The turn. The cup, stem and foot are turned parts, so they look the same at every angle; only the
// handles move. FRAMES poses cover half a turn (the pair maps onto itself every 180°). In each pose the
// handle farther from the viewer is drawn behind the bowl and the nearer one in front of it.
const FRAMES = 24;
const poses = Array.from({ length: FRAMES }, (_, f) => {
  const a = Math.atan2(side[1], side[0]) + (f / FRAMES) * Math.PI;
  const dA = [Math.cos(a), Math.sin(a)], dB = [-dA[0], -dA[1]];
  const backFirst = depth([dA[0] * 60, dA[1] * 60, Z0 + 110]) < depth([dB[0] * 60, dB[1] * 60, Z0 + 110]);
  return backFirst ? { back: handle(dA), front: handle(dB) } : { back: handle(dB), front: handle(dA) };
});
const frameGroups = (key) => poses.map((p, f) => `<g class="hf${f === 0 ? " on" : ""}" data-f="${f}">${p[key]}</g>`).join("");

// The one lit accent: a glint on the bowl where the key light lands
const glint = `<g class="glint">${D([at([side[0] * 22 - sx * 18, side[1] * 22 - sy * 18, Z0 + 112])], { size: 1.6, tone: "hi" })}</g>`;

const svg = k.figureSvg({
  width: WIDTH,
  height: HEIGHT,
  label: "A classic gold loving cup turning slowly on a two-tier plinth with a brass plate engraved Tempest Award.",
  className: "trophy-svg",
  body: [
    `<g class="part p-plinth ink">${plinth()}<g class="au">${plate()}</g></g>`,
    `<g class="part p-stem au">${body()}</g>`,
    `<g class="part p-handle au">${frameGroups("back")}</g>`,
    `<g class="part p-bowl au">${bowl()}${glint}</g>`,
    `<g class="part p-handle2 au">${frameGroups("front")}</g>`,
  ],
});

writeFileSync(OUT, `// Generated by tools/trophy/build.mjs. Do not edit by hand.\nexport const TROPHY_SVG = ${JSON.stringify(svg)};\nexport const TROPHY_FRAMES = ${FRAMES};\n`);
console.log("wrote", OUT, (svg.length / 1024).toFixed(1) + " KB");
