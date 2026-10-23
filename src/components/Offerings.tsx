import { useEffect, useRef, useState } from 'react';
import { offerings, type Offering } from '../content';
import Reveal, { useInView } from './Reveal';
import './Offerings.css';

// One quadrant of the circle lattice: the NPC card pattern, recoloured per offering.
// Circles of radius S/2 centred on the corners and middle, drawn as thick arcs.
const S = 240;
const CIRCLES: [number, number][] = [[0, 0], [S, 0], [0, S], [S, S], [S / 2, S / 2]];

function Lattice({ id }: { id: Offering['id'] }) {
  const outline = id === 'product';
  return (
    <svg viewBox={`0 0 ${S} ${S}`} className={`lat lat-${id}`} aria-hidden="true" preserveAspectRatio="xMidYMid slice">
      <rect width={S} height={S} className="bg" />
      {outline ? (
        // Product is the wireframe: the same lattice, drawn as double hairlines
        CIRCLES.map(([cx, cy], i) => (
          <g key={i} className="arc" style={{ ['--i' as string]: i }}>
            <circle cx={cx} cy={cy} r={S / 2 - 12} pathLength={100} />
            <circle cx={cx} cy={cy} r={S / 2 + 12} pathLength={100} />
          </g>
        ))
      ) : (
        CIRCLES.map(([cx, cy], i) => (
          <circle key={i} cx={cx} cy={cy} r={S / 2} pathLength={100} className={`arc c${i % 3}`} style={{ ['--i' as string]: i }} />
        ))
      )}
    </svg>
  );
}

function Copy({ o, side }: { o: Offering; side: 'l' | 'r' }) {
  return (
    <Reveal className={`oc oc-${o.id} oc-${side}`} delay={1}>
      <h3><span>{o.name}.</span> <span className="line">{o.line}</span></h3>
      <p>{o.blurb}</p>
      <ul>
        {o.items.map((it) => <li key={it}>{it}</li>)}
      </ul>
    </Reveal>
  );
}

// Phones: the four offerings sit in one swipe rail under the tile instead of a long stack.
// Tapping a quadrant jumps the rail to that offering; the rail's position lights the matching quadrant.
function Rail({ active, setActive, rail }: { active: number; setActive: (i: number) => void; rail: React.RefObject<HTMLDivElement> }) {
  useEffect(() => {
    const el = rail.current;
    if (!el) return;
    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => setActive(Math.round(el.scrollLeft / el.clientWidth)));
    };
    el.addEventListener('scroll', onScroll, { passive: true });
    return () => { el.removeEventListener('scroll', onScroll); cancelAnimationFrame(frame); };
  }, [rail, setActive]);
  return (
    <div className="oc-rail-wrap">
      <div className="oc-rail" ref={rail} tabIndex={0} role="group" aria-label="What we do, swipe for more">
        {offerings.map((o) => <Copy key={o.id} o={o} side="r" />)}
      </div>
      <div className="oc-dots" aria-hidden="true">
        {offerings.map((o, i) => <span key={o.id} className={`oc-${o.id}${i === active ? ' on' : ''}`} />)}
      </div>
    </div>
  );
}

export default function Offerings() {
  const tile = useInView<HTMLDivElement>(0.35);
  const rail = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [brand, web, ai, product] = offerings;
  const go = (id: Offering['id']) => {
    const el = rail.current;
    const i = offerings.findIndex((o) => o.id === id);
    if (el && el.offsetParent) el.scrollTo({ left: i * el.clientWidth, behavior: 'smooth' });
  };
  const quad = (id: Offering['id'], name: string) => (
    <button type="button" className={`q q-${id}${offerings[active].id === id ? ' on' : ''}`} onClick={() => go(id)} aria-label={`Show ${name}`}>
      <Lattice id={id} /><b>{name}</b>
    </button>
  );
  return (
    <section className="section offerings" id="offer" aria-labelledby="offer-title">
      <div className="wrap">
        <Reveal className="head">
          <h2 id="offer-title">One NPC. <span className="gold">Four ways in.</span></h2>
          <p>Start with one. Most clients end up with all four, run by one team.</p>
        </Reveal>

        <div className="ways">
          <div className="side side-l">
            <Copy o={brand} side="l" />
            <Copy o={web} side="l" />
          </div>
          <div className="tile" ref={tile}>
            {/* Order matches the copy: Brand top left, AI top right, Web bottom left, Product bottom right */}
            {quad('brand', 'Brand')}
            {quad('ai', 'AI')}
            {quad('web', 'Web')}
            {quad('product', 'Product')}
          </div>
          <div className="side side-r">
            <Copy o={ai} side="r" />
            <Copy o={product} side="r" />
          </div>
          <Rail active={active} setActive={setActive} rail={rail} />
        </div>

        <Reveal className="how-buy">
          <p><b>Start with one project.</b> Fixed price, fixed scope, one document.</p>
          <p><b>Stay on retainer.</b> Your fractional brand, web, AI and product team, monthly.</p>
        </Reveal>
      </div>
    </section>
  );
}
