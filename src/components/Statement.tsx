import { useEffect, useRef } from 'react';
import './Statement.css';

// The statement fills with ink word by word as it scrolls through the screen (khyzr manifesto idea).
const TEXT =
  'The creative exec big studios pay a fortune for. Brand, web, AI and product, run by someone who built for LEGO, Riot and Coca-Cola, working inside your team at a price a growing company can actually afford.';

export default function Statement() {
  const ref = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const words = [...el.querySelectorAll<HTMLSpanElement>('.w')];
    if (matchMedia('(prefers-reduced-motion:reduce)').matches) {
      words.forEach((w) => w.classList.add('lit'));
      return;
    }
    let frame = 0;
    const update = () => {
      frame = 0;
      const r = el.getBoundingClientRect();
      // 0 when the top reaches 85% of the screen, 1 when the bottom reaches 45%
      const start = innerHeight * 0.85;
      const end = innerHeight * 0.45;
      const p = Math.min(1, Math.max(0, (start - r.top) / (start - end + r.height)));
      const lit = Math.round(p * words.length);
      words.forEach((w, i) => w.classList.toggle('lit', i < lit));
    };
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(update); };
    update();
    addEventListener('scroll', onScroll, { passive: true });
    addEventListener('resize', onScroll);
    return () => {
      removeEventListener('scroll', onScroll);
      removeEventListener('resize', onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <section className="section statement" aria-label="What NPC is">
      <div className="wrap">
        <span className="label">Why NPC</span>
        <p ref={ref} className="say">
          {TEXT.split(' ').map((w, i) => (
            <span key={i}><span className="w">{w}</span>{' '}</span>
          ))}
        </p>
      </div>
    </section>
  );
}
