import { useEffect, useRef } from 'react';
import { links, BOOKING_URL } from '../content';
import './Nav.css';

export default function Nav() {
  const menu = useRef<HTMLDialogElement>(null);

  // Close the sheet when the viewport grows past the phone layout
  useEffect(() => {
    const mq = matchMedia('(min-width:860px)');
    const onChange = () => mq.matches && menu.current?.close();
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  const open = () => menu.current?.showModal();
  const close = () => menu.current?.close();

  return (
    <header className="nav-bar">
      <div className="wrap nav">
        <a className="mark" href="#top" aria-label="Nabil Pervez Consulting, home">
          <img src="/img/nmark.png" alt="" width="32" height="32" />
          <span>NPC</span>
        </a>
        <nav aria-label="Main" className="links">
          {links.map((l) => (
            <a key={l.href} href={l.href}>{l.label}</a>
          ))}
        </nav>
        <a className="btn btn-gold nav-cta" href={BOOKING_URL} target="_blank" rel="noopener">Book now</a>
        <button type="button" className="menu-btn" aria-label="Open menu" aria-haspopup="dialog" onClick={open}>
          <span /><span />
        </button>
      </div>

      {/* Native modal dialog: focus trap, Esc to close and inert background for free */}
      <dialog ref={menu} className="sheet" aria-label="Menu" onClick={(e) => e.target === menu.current && close()}>
        <div className="sheet-in">
          <button type="button" className="sheet-close" aria-label="Close menu" onClick={close}>✕</button>
          <nav aria-label="Mobile">
            {links.map((l) => (
              <a key={l.href} href={l.href} onClick={close}>{l.label}</a>
            ))}
          </nav>
          <a className="btn btn-gold" href={BOOKING_URL} target="_blank" rel="noopener">Book a 20-minute call</a>
        </div>
      </dialog>
    </header>
  );
}
