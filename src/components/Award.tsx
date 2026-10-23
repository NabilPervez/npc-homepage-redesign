import { useEffect, useState } from 'react';
import { work } from '../content';
import Reveal, { useInView } from './Reveal';
import './iso.css';
import './Award.css';

export default function Award() {
  const fig = useInView<HTMLDivElement>(0.35);
  // The trophy is ~150 KB of precomputed SVG paths, so it loads as its own chunk after first paint
  const [art, setArt] = useState('');
  useEffect(() => {
    import('./trophyArt').then((m) => setArt(m.TROPHY_SVG));
  }, []);
  return (
    <section className="section award" id="award" aria-labelledby="award-title">
      <div className="wrap award-grid">
        <div className="award-copy">
          <Reveal as="span" className="label">Award-winning creative</Reveal>
          <Reveal as="h2" id="award-title" delay={1}>
            Studio-grade work. <span className="muted">Proven on the biggest stages in gaming and entertainment.</span>
          </Reveal>
          <Reveal className="case" delay={2}>
            <p className="case-k">Houston Outlaws · #BandTogether</p>
            <dl>
              <div><dt>The reality</dt><dd>A team in a brand-new city-based league had to win local fans from scratch.</dd></div>
              <div><dt>Our move</dt><dd>The world's first esports player tour, pop-up shops, block parties and collectible regional merch.</dd></div>
              <div><dt>The payoff</dt><dd>Tempest Award for Best Social Experience, and the most tweeted-about team in the league in Season 1.</dd></div>
            </dl>
          </Reveal>
        </div>

        {/* Fig 1 card: the trophy assembles from the plinth up when it scrolls into view */}
        <figure className="iso plate" ref={fig}>
          <div className="plate-top"><span>Fig 1</span><span>Tempest Award</span></div>
          <div className="stage" dangerouslySetInnerHTML={{ __html: art }} />
          <figcaption className="plate-bot"><span>Best Social Experience</span><span className="ro">Houston Outlaws · S1</span></figcaption>
        </figure>
      </div>

      {/* Work gallery: swipe on phones, a bento grid on desktop */}
      <div className="wrap">
        <Reveal className="gallery-head"><h3>Recent work</h3><a href="https://nabilpervez.com/portfolio" target="_blank" rel="noopener">Full portfolio →</a></Reveal>
      </div>
      <ul className="gallery" aria-label="Recent work">
        {work.map((w, i) => (
          <Reveal as="li" key={w.src} className={`g g-${w.size || 'n'}`} delay={i % 4}>
            <img src={w.src} alt={w.alt} width={w.w} height={w.h} loading="lazy" decoding="async" />
            <span>{w.alt}</span>
          </Reveal>
        ))}
      </ul>
    </section>
  );
}
