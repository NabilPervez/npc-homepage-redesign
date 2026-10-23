import { useEffect, useRef, useState } from 'react';
import { clientsA, clientsB, stats } from '../content';
import './Proof.css';

// Counts up once when visible; shows the final number straight away under reduced motion
function Count({ to }: { to: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [n, setN] = useState(to);
  useEffect(() => {
    const el = ref.current;
    if (!el || matchMedia('(prefers-reduced-motion:reduce)').matches || !('IntersectionObserver' in window)) return;
    setN(0);
    const o = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      o.disconnect();
      const t0 = performance.now();
      const tick = (t: number) => {
        const p = Math.min(1, (t - t0) / 1600);
        setN(Math.round(to * (1 - Math.pow(1 - p, 3))));
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }, { threshold: 0.6 });
    o.observe(el);
    return () => o.disconnect();
  }, [to]);
  return <span ref={ref}>{n}</span>;
}

function Row({ names, reverse }: { names: string[]; reverse?: boolean }) {
  return (
    <div className={`row${reverse ? ' rev' : ''}`}>
      <ul className="track">
        {names.map((n) => <li key={n}>{n}</li>)}
      </ul>
      {/* Duplicate for a seamless loop; hidden from screen readers */}
      <ul className="track" aria-hidden="true">
        {names.map((n) => <li key={n}>{n}</li>)}
      </ul>
    </div>
  );
}

export default function Proof() {
  const [paused, setPaused] = useState(false);
  return (
    <section className="proof" aria-label="Brands Nabil has worked with">
      <div className="wrap proof-in">
        <dl className="stats">
          {stats.map((s) => (
            <div key={s.label}>
              <dt className="sr-only">{s.label}</dt>
              <dd>
                <b><Count to={s.value} /><i>{s.suffix}</i></b>
                <span aria-hidden="true">{s.label}</span>
              </dd>
            </div>
          ))}
        </dl>
        <div className={`names${paused ? ' paused' : ''}`}>
          <Row names={clientsA} />
          <Row names={clientsB} reverse />
        </div>
        <button type="button" className="pause" onClick={() => setPaused((p) => !p)} aria-pressed={paused}
          aria-label={paused ? 'Play client names' : 'Pause client names'}>
          {paused ? '▶' : '❚❚'}
        </button>
      </div>
    </section>
  );
}
