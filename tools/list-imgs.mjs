import sharp from 'sharp';
import { readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';
const root = 'D:/Code/_ref/NabilPervez_portfolio/web/public/images/portfolio';
for (const d of readdirSync(root)) {
  const p = join(root, d);
  if (!statSync(p).isDirectory()) continue;
  const rows = [];
  for (const f of readdirSync(p)) {
    if (!/\.(jpe?g|png|webp)$/i.test(f)) continue;
    try { const m = await sharp(join(p, f)).metadata(); if (m.width >= 700) rows.push(`${f} ${m.width}x${m.height} ${(statSync(join(p,f)).size/1024|0)}k`); } catch {}
  }
  console.log('##', d, rows.length); rows.slice(0, 8).forEach((r) => console.log('  ', r));
}
