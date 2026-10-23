// Resizes picked portfolio images into public/img/work/<slug>.webp (720 px wide, plus a 480 px copy)
// and writes a contact sheet to tools/contact.jpg for review.
import sharp from 'sharp';
import { mkdirSync, writeFileSync } from 'node:fs';
const R = 'D:/Code/_ref/NabilPervez_portfolio/web/public/images/portfolio/';
// T-Mobile is kept off the site (Nabil, 2026-10-23, v7), so no T-Mobile booth or watch-party shots.
export const PICKS = [
  ['redbull-run', 'redbull/redbull-run.jpg'],
  ['c9-luffy', 'one-piece-x-cloud9/6_luffy.webp'],
  ['c9-tees', 'one-piece-x-cloud9/3_tees.webp'],
  ['c9-hats', 'one-piece-x-cloud9/7_hats.webp'],
  ['lego-1', 'lego_27/406806126553707.615376f58f116.png'],
  ['lego-2', 'lego_27/df5548126553707.614b7baabf837.png'],
  ['lego-3', 'lego_27/fdb310126553707.615376f58e9ef.png'],
  ['ow-houston', 'overwatch-league-in-game-sprays/overwatch-league-in-game-sprays-Houston.png'],
  ['ow-paris', 'overwatch-league-in-game-sprays/overwatch-league-in-game-sprays-Paris.png'],
  ['outlaws-tour', 'outlaws/outlaws-desktop_outlaws_promotional_items-scaled.jpg'],
  ['akon-pass', 'a-kon/a-kon-AKON_DailyPass.jpg'],
  ['akon-badge', 'a-kon/a-kon-AKON_Badge-Day.png'],
  ['freshcut-m1', 'freshcut/freshcut-m1.jpg'],
  ['freshcut-access', 'freshcut/freshcut-access.jpg'],
  ['nsg-card', 'nerd-street-gamers-brand/nerd-street-gamers-brand-Business_Card_Mockup_2-scaled.jpg'],
  ['nsg-social', 'nerd-street-gamers-brand/nerd-street-gamers-brand-NSG_FacebookLocalGaming-JO.png'],
  ['metaview-bill', 'metaview/064b55113184055.6022c64e93662.jpg'],
  ['metaview-2', 'metaview/3394e9113184055.6022c7698113e.jpg'],
  ['mu-1', 'metal-umbrella/345c2b124334787.610b281638be3.png'],
  ['mu-2', 'metal-umbrella/83550d124334787.610b28163a7ef.png'],
  ['igp-ui', 'immortal-gates-of-pyre-ui-producing/immortal-gates-of-pyre-ui-producing-CharacterSelect.jpg'],
  ['igp-logo', 'immortal-gates-of-pyre-logo-icons/immortal-gates-of-pyre-logo-icons-Logo_Final.png'],
  ['igp-ks', 'immortal-gates-of-pyre-kickstarter/immortal-gates-of-pyre-kickstarter-4_Launch.jpg'],
  ['igp-web', 'immortal-gates-of-pyre-web-development/immortal-gates-of-pyre-web-development-Immortals_Desktop.png'],
  ['evo', 'evolution-championship-series/evolution-championship-series-hero.png'],
  ['nacon-skaters', 'session/02_skaters.png'],
  ['mce-collage', 'mccown-evans/05_mce-collage.jpg'],
  ['mce-intro', 'mccown-evans/03_mce_behance_v2_screen-intro.jpg'],
  ['alloy', 'alloy/38f94e145873245.62a6aa34cf74a.jpg'],
  ['fancurve', 'fancurve/1d27b2148098559.633c6618f0a00.jpg'],
  ['spi', 'stay-plugged-in/abe4e0132316687.63e17a7e90add.png'],
  ['geekletes', 'geekletes/geekletes-geekletes.png'],
  ['igda', 'igda-dallas/igda-dallas-IDGA_Poster_9-16.png'],
  ['fugitive', 'team-fugitive/cde8d7131606503.62accc5186b73.png'],
];
if (process.argv[1].endsWith('work-images.mjs')) {
  mkdirSync('public/img/work', { recursive: true });
  const meta = {};
  const thumbs = [];
  for (const [slug, src] of PICKS) {
    const img = sharp(R + src).rotate();
    const m = await img.metadata();
    // Tall page captures are cropped to their top so tiles show the hero, not a sliver
    const h = Math.min(m.height, Math.round(m.width * 1.5));
    const base = sharp(R + src).rotate().extract({ left: 0, top: 0, width: m.width, height: h });
    await base.clone().resize({ width: 720, withoutEnlargement: true }).webp({ quality: 74 }).toFile(`public/img/work/${slug}.webp`);
    const small = await base.clone().resize({ width: 480, withoutEnlargement: true }).webp({ quality: 70 }).toFile(`public/img/work/${slug}-480.webp`);
    meta[slug] = { w: m.width, h };
    thumbs.push(await base.clone().resize(200, 150, { fit: 'cover' }).jpeg().toBuffer());
  }
  writeFileSync('tools/work-meta.json', JSON.stringify(meta, null, 1));
  const cols = 8, rows = Math.ceil(thumbs.length / cols);
  await sharp({ create: { width: cols * 200, height: rows * 150, channels: 3, background: '#000' } })
    .composite(thumbs.map((b, i) => ({ input: b, left: (i % cols) * 200, top: Math.floor(i / cols) * 150 })))
    .jpeg({ quality: 70 }).toFile('tools/contact.jpg');
  console.log('done', thumbs.length);
}
