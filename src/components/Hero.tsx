import { useEffect, useRef } from 'react';
import { BOOKING_URL } from '../content';
import './Hero.css';

export default function Hero() {
  const ref = useRef<HTMLElement>(null);

  // Sheen follows the pointer on desktop only (card motion); phones keep the ripple rings
  useEffect(() => {
    const el = ref.current;
    if (!el || !matchMedia('(pointer:fine) and (prefers-reduced-motion:no-preference)').matches) return;
    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      el.style.setProperty('--tx', ((e.clientX - r.left) / r.width - 0.5).toFixed(3));
      el.style.setProperty('--ty', ((e.clientY - r.top) / r.height - 0.5).toFixed(3));
    };
    el.addEventListener('pointermove', move);
    return () => el.removeEventListener('pointermove', move);
  }, []);

  return (
    <section className="hero" ref={ref} aria-labelledby="hero-title">
      <div className="pattern dim" aria-hidden="true" />
      <div className="ring" aria-hidden="true"><div className="pattern" /></div>
      <div className="ring" aria-hidden="true"><div className="pattern" /></div>
      <div className="clear" aria-hidden="true" />
      <div className="wrap lockup">
        <img className="nmark enter" src="/img/nmark.png" alt="" width="160" height="160" fetchPriority="high" />
        <p className="consult enter d1">Nabil Pervez Consulting</p>
        <h1 id="hero-title" className="enter d1">
          <span className="nw">Brand. Web.</span> <span className="nw">AI. Product.</span>
          <br /><span className="shine">Done right.</span>
        </h1>
        <p className="lede enter d2">A big-studio creative exec on your team. At a small-studio price.</p>
        <div className="ctas enter d2">
          <a className="btn btn-gold" href={BOOKING_URL} target="_blank" rel="noopener">Book a call</a>
          <a className="btn btn-line" href="#offer">See what we do</a>
        </div>
      </div>
      <div className="sheen" aria-hidden="true" />
    </section>
  );
}
