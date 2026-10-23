# npc-homepage-redesign

Homepage for **Nabil Pervez Consulting**: Brand. Web. AI. Product.
React 18 + TypeScript + Vite. No UI framework; plain CSS with design tokens.

## Run it

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # outputs dist/
```

## Deploy (Netlify)

Connect this repo in Netlify. `netlify.toml` sets the build command (`npm run build`)
and publish directory (`dist`), so there is nothing to configure by hand.

## Where things live

| Path | What |
|---|---|
| `src/content.ts` | All copy: offerings, clients, stats, work, steps, testimonials |
| `src/styles/tokens.css` | Colours, type scale, spacing, motion |
| `src/components/` | One component (plus its CSS) per section |
| `public/img/` | Images served as-is |
| `SPRINTS.md` | Sprint plan with Definition of Done |
| `legacy/` | The previous single-file static page, for reference |

## Design rules

NPC identity (ink `#07101F`, gold ramp, circle lattice, Outfit) with Quiet Precision layout:
one font, a closed type scale (62/32/24/22/18/16/14/13), hairlines instead of shadows,
fades and reveals only, and every animation off under `prefers-reduced-motion`.
