# NPC homepage redesign: sprint plan

**Goal:** Replace the static page with a React (Vite) site for Nabil Pervez Consulting. It must
work properly on phones and desktops, stay on the NPC brand (ink + gold, circle lattice, Outfit),
follow Quiet Precision layout discipline, and sell four offerings: **Brand. Web. AI. Product.**

**Positioning:** a big-studio creative exec on your team, at a small-studio price.

**Team:** Claude (build) + Nabil (review, sign-off). One sprint per working session.
**Repo:** github.com/NabilPervez/npc-homepage-redesign. Push `main` at the end of every sprint.
**Deploy:** Netlify, build command `npm run build`, publish directory `dist`.

## Global Definition of Done (applies to every sprint)
- [ ] `npm run build` passes with no errors or warnings that block the build
- [ ] No horizontal scroll at 375px, 768px and 1280px; tap targets are at least 44px
- [ ] Every animation is a fade or reveal, respects `prefers-reduced-motion`, and content is visible without JS motion
- [ ] Only the closed type scale (62/32/24/22/18/16/14/13) and one font family
- [ ] No console errors in the browser
- [ ] Committed and pushed to `main`

---

## Sprint 1: Foundation
**Sprint goal:** A React site that builds, deploys and shows the nav and hero correctly on a phone.

| Priority | Item |
|---|---|
| P0 | Vite + React + TypeScript scaffold, `netlify.toml`, README |
| P0 | Design tokens in `:root` (ink, gold ramp, hairlines, type scale, motion) |
| P0 | Shared `Reveal` component (IntersectionObserver fade/rise, reduced-motion safe) |
| P0 | Nav with a working mobile menu (sheet with focus handling, Esc to close) |
| P0 | Hero: the NPC card, gold N, "Brand. Web. AI. Product." |

**DoD:** Global DoD, plus the mobile menu opens/closes by tap and keyboard and the hero fits one phone screen.

## Sprint 2: Story and offer
**Sprint goal:** A visitor understands who NPC is and what it sells within two scrolls.

| Priority | Item |
|---|---|
| P0 | Statement: big text that fills with colour on scroll ("studio exec, studio price") |
| P0 | Proof strip: stats (40+ brands, 10+ years, award) + two rows of client names |
| P0 | "One NPC. Four ways in." Four-quadrant lattice tile, one colour per offering, with the service list |
| P1 | Real NPC mark (from the Khyzr ecosystem marks) |

**DoD:** Global DoD, plus the four tiles stack cleanly on phones and every offering lists its services.

## Sprint 3: Award-winning creative
**Sprint goal:** Show the work and the award with a showpiece that still loads fast.

| Priority | Item |
|---|---|
| P0 | "Award-winning creative": crafted isometric gold trophy (anatomy style) that assembles on reveal |
| P0 | Real award copy only: Tempest Award, Best Social Experience (Houston Outlaws #BandTogether) |
| P0 | Work gallery from the portfolio images, swipe on phones, grid on desktop |
| P2 | Product-reveal video of the trophy (deferred: needs a render pipeline) |

**DoD:** Global DoD, plus trophy is SVG (no WebGL), static under reduced motion, images lazy-loaded with width/height.

## Sprint 4: Close and polish
**Sprint goal:** Ship-ready page: trust, process, contact and a full mobile QA pass.

| Priority | Item |
|---|---|
| P0 | How it works (3 steps), testimonials, about Nabil |
| P0 | Closing band with booking link and copy-email, colophon footer |
| P0 | SEO meta, OG image, favicon |
| P0 | Mobile QA at 375px across every section |

**DoD:** Global DoD, plus Lighthouse-style checks: single h1, ordered headings, alt text on every image.

## Risks
| Risk | Impact | Mitigation |
|---|---|---|
| Client logos are third-party trademarks and none exist as clean files in the repos | Logo strip can't be real logos | Use typeset name rows; drop real logo files into `src/assets/logos` later |
| Award claims | Credibility | Only use the award stated in the portfolio text |
| Portfolio images are large | Slow mobile load | Copy a curated set, resize, lazy-load |
