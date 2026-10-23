import { useEffect, useRef, useState } from 'react';
import { workColumns, type Column } from '../content';
import Reveal from './Reveal';
import './WorkReel.css';

// Recent work: an endless bento reel (khyzr "work collage" pattern). Columns of unequal tiles drift
// left on their own; hover, focus, a touch or a drag pauses the drift, and it resumes after a moment.
// It is a real scroller, so swipe and trackpad work natively. Reduced motion: no drift, one set.

function Set({ hidden }: { hidden?: boolean }) {
  return (
    <div className="rc-set" aria-hidden={hidden || undefined} {...(hidden ? { inert: '' } : {})}>
      {workColumns.map((col: Column, i) => (
        <div key={i} className={`rc-col rc-${col.kind}`}>
          {col.tiles.map((t) => (
            <figure key={t.slug} className="rc-tile" data-pillar={t.pillar}>
              <img
                src={`/img/work/${t.slug}.webp`}
                srcSet={`/img/work/${t.slug}-480.webp 480w, /img/work/${t.slug}.webp 720w`}
                sizes="(max-width: 760px) 260px, 420px"
                alt={t.alt}
                width={720}
                height={Math.round(720 / t.ratio)}
                loading="lazy"
                decoding="async"
                draggable={false}
              />
              <figcaption><span className="rc-pill">{t.pillar}</span><span className="rc-brand">{t.client}</span></figcaption>
            </figure>
          ))}
        </div>
      ))}
    </div>
  );
}

export default function WorkReel() {
  const scroller = useRef<HTMLDivElement>(null);
  const [still] = useState(() => matchMedia('(prefers-reduced-motion:reduce)').matches);
  const [playing, setPlaying] = useState(!still);
  // The loop reads the play state through a ref so toggling it doesn't restart the loop
  const playingRef = useRef(playing);
  playingRef.current = playing;

  useEffect(() => {
    const el = scroller.current;
    if (!el || still) return;
    let frame = 0;
    let last = 0;
    let held = false;          // pointer over it, focus inside, or a finger down
    let resumeAt = 0;          // a pause after a touch or wheel
    let onScreen = false;
    let pos = el.scrollLeft;   // sub-pixel position; scrollLeft rounds
    const SPEED = 28;          // px per second: slow enough to read the tags

    const tick = (now: number) => {
      const dt = last ? Math.min(0.05, (now - last) / 1000) : 0;
      last = now;
      const set = (el.firstElementChild as HTMLElement | null)?.offsetWidth ?? 0;
      if (!held && now > resumeAt && playingRef.current) {
        pos += SPEED * dt;
        if (set && pos >= set) pos -= set;
        el.scrollLeft = pos;
      } else {
        pos = el.scrollLeft;
        if (set && pos >= set) { pos -= set; el.scrollLeft = pos; }
      }
      frame = onScreen ? requestAnimationFrame(tick) : 0;
    };
    const run = () => { if (!frame && onScreen) { last = 0; frame = requestAnimationFrame(tick); } };
    const hold = () => { held = true; };
    const release = () => { held = false; resumeAt = performance.now() + 1600; };
    const nudge = () => { resumeAt = performance.now() + 2400; };

    const io = new IntersectionObserver(([e]) => { onScreen = e.isIntersecting; run(); });
    io.observe(el);
    el.addEventListener('pointerenter', hold);
    el.addEventListener('pointerleave', release);
    el.addEventListener('focusin', hold);
    el.addEventListener('focusout', release);
    el.addEventListener('touchstart', hold, { passive: true });
    el.addEventListener('touchend', release);
    el.addEventListener('wheel', nudge, { passive: true });
    return () => {
      io.disconnect();
      cancelAnimationFrame(frame);
      el.removeEventListener('pointerenter', hold);
      el.removeEventListener('pointerleave', release);
      el.removeEventListener('focusin', hold);
      el.removeEventListener('focusout', release);
      el.removeEventListener('touchstart', hold);
      el.removeEventListener('touchend', release);
      el.removeEventListener('wheel', nudge);
    };
  }, [still]);

  return (
    <section className="section reel-sec" id="work" aria-labelledby="work-title">
      <div className="wrap">
        <Reveal className="head center">
          <h2 id="work-title">Our work.<br /><span className="muted">Award winning, made for brands of every size.</span></h2>
        </Reveal>
      </div>
      <Reveal className="rc-wrap">
        <div className="rc" ref={scroller} tabIndex={0} role="group" aria-label="Recent work. Scroll sideways to explore.">
          <Set />
          {!still && <Set hidden />}
        </div>
      </Reveal>
      <div className="wrap rc-foot">
        <span className="rc-count">
            {!still && (
          <button type="button" className="rc-toggle" onClick={() => setPlaying((p) => !p)} aria-pressed={!playing}
            aria-label={playing ? 'Pause the work reel' : 'Play the work reel'}>{playing ? '❚❚' : '▶'}</button>
        )}
          {workColumns.reduce((n, c) => n + c.tiles.length, 0)} projects · swipe or scroll
        </span>
        <a href="https://nabilpervez.com/portfolio" target="_blank" rel="noopener">Full portfolio →</a>
      </div>
    </section>
  );
}
