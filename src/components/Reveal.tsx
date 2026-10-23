import { createElement, useEffect, useRef, type CSSProperties, type ReactNode } from 'react';

// One shared observer: each element fades and rises once when it enters the viewport.
let io: IntersectionObserver | null = null;
function observer() {
  if (!io) {
    io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('in');
            io!.unobserve(e.target);
          }
        }),
      { rootMargin: '0px 0px -8% 0px', threshold: 0.12 }
    );
  }
  return io;
}

type Props = {
  as?: keyof JSX.IntrinsicElements;
  delay?: number;
  className?: string;
  children?: ReactNode;
  [key: string]: unknown;
};

export default function Reveal({ as = 'div', delay = 0, className = '', children, ...rest }: Props) {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!('IntersectionObserver' in window)) {
      el.classList.add('in');
      return;
    }
    const o = observer();
    o.observe(el);
    return () => o.unobserve(el);
  }, []);
  return createElement(
    as,
    { ref, className: `reveal ${className}`.trim(), style: { '--d': delay } as CSSProperties, ...rest },
    children
  );
}

// Lets callers know an element has come into view (used by the statement and trophy)
export function useInView<T extends HTMLElement>(threshold = 0.3) {
  const ref = useRef<T>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!('IntersectionObserver' in window)) {
      el.classList.add('in');
      return;
    }
    const o = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          el.classList.add('in');
          o.disconnect();
        }
      },
      { threshold }
    );
    o.observe(el);
    return () => o.disconnect();
  }, [threshold]);
  return ref;
}
