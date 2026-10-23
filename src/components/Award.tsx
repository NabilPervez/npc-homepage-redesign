import { useEffect, useRef, useState } from 'react';
import Reveal from './Reveal';
import './iso.css';
import './Award.css';

// Award-winning creative: just the trophy, turning on its plinth with a sheen running over the gold.
// Nabil, 2026-10-23: "don't explain all the details, just show the trophy".
export default function Award() {
  const stage = useRef<HTMLDivElement>(null);
  const [art, setArt] = useState<{ svg: string; frames: number } | null>(null);

  // ~100 KB gzipped of precomputed paths, so it loads as its own chunk after first paint
  useEffect(() => {
    import('./trophyArt').then((m) => setArt({ svg: m.TROPHY_SVG, frames: m.TROPHY_FRAMES }));
  }, []);

  // Turn: step through the handle poses while the figure is on screen. Still under reduced motion.
  useEffect(() => {
    const el = stage.current;
    if (!el || !art || matchMedia('(prefers-reduced-motion:reduce)').matches) return;
    const back = [...el.querySelectorAll<SVGGElement>('.p-handle .hf')];
    const front = [...el.querySelectorAll<SVGGElement>('.p-handle2 .hf')];
    const FPS = 12;
    let frame = 0, last = 0, f = 0, onScreen = false;
    const tick = (now: number) => {
      if (now - last >= 1000 / FPS) {
        last = now;
        back[f].classList.remove('on');
        front[f].classList.remove('on');
        f = (f + 1) % art.frames;
        back[f].classList.add('on');
        front[f].classList.add('on');
      }
      frame = onScreen ? requestAnimationFrame(tick) : 0;
    };
    const io = new IntersectionObserver(([e]) => {
      onScreen = e.isIntersecting;
      if (onScreen && !frame) frame = requestAnimationFrame(tick);
    });
    io.observe(el);
    return () => { io.disconnect(); cancelAnimationFrame(frame); };
  }, [art]);

  return (
    <section className="section award" id="award" aria-labelledby="award-title">
      <div className="wrap award-in">
        <Reveal className="head center">
          <span className="label">Award-winning creative</span>
          <h2 id="award-title">Work that wins. <span className="muted">Tempest Award, Best Social Experience.</span></h2>
        </Reveal>
        <Reveal className="trophy" delay={1}>
          <div className="iso stage" ref={stage} dangerouslySetInnerHTML={{ __html: art?.svg ?? '' }} />
          <div className="sheen" aria-hidden="true" />
        </Reveal>
      </div>
    </section>
  );
}
