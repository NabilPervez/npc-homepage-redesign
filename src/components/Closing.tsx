import { useState } from 'react';
import { BOOKING_URL, EMAIL, links, steps, voices } from '../content';
import Reveal from './Reveal';
import './Closing.css';

export function Process() {
  return (
    <section className="section" id="how" aria-labelledby="how-title">
      <div className="wrap">
        <Reveal className="head"><h2 id="how-title">How it works.</h2><p>Three steps. You always know what's next.</p></Reveal>
        <ol className="steps">
          {steps.map((s, i) => (
            <Reveal as="li" key={s.n} className="step" delay={i}>
              <span className="n">{s.n}</span>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function About() {
  return (
    <section className="section" id="about" aria-labelledby="about-title">
      <div className="wrap about">
        <Reveal className="photo">
          <img src="/img/nabil.jpg" alt="Nabil Pervez" width="240" height="360" loading="lazy" decoding="async" />
        </Reveal>
        <div className="about-copy">
          <Reveal as="span" className="label">Who you work with</Reveal>
          <Reveal as="h2" id="about-title" delay={1} className="say">
            I'm Nabil. I co-founded an award-winning agency and built for LEGO, Riot and Coca-Cola.{' '}
            <span className="muted">Now I build yours, with the same rigor and none of the overhead.</span>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export function Voices() {
  return (
    <section className="section" id="voices" aria-labelledby="voices-title">
      <div className="wrap">
        <Reveal className="head"><h2 id="voices-title">In their words.</h2><p>Founders and leaders who have worked with Nabil.</p></Reveal>
        <ul className="voices">
          {voices.map((v, i) => (
            <Reveal as="li" key={v.name} className="v" delay={i}>
              <figure>
                <blockquote><p>{v.quote}</p></blockquote>
                <figcaption><b>{v.name}</b>{v.role}</figcaption>
              </figure>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function Close() {
  const [copied, setCopied] = useState('Copy');
  const copy = () =>
    navigator.clipboard.writeText(EMAIL).then(
      () => setCopied('Copied'),
      () => setCopied('Copy failed')
    );
  return (
    <section className="section close" id="contact" aria-labelledby="close-title">
      <div className="wrap close-in">
        <Reveal as="span" className="label">Next step</Reveal>
        <Reveal as="h2" id="close-title" delay={1}>Everything starts <span className="gold">with a call.</span></Reveal>
        <Reveal as="p" delay={2}>Tell us what you need. You'll get a straight answer on scope and price.</Reveal>
        <Reveal className="close-ctas" delay={2}>
          <a className="btn btn-gold" href={BOOKING_URL} target="_blank" rel="noopener">Book a 20-minute call</a>
          <span className="mail">or email <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
            <button type="button" onClick={copy} aria-live="polite">{copied}</button>
          </span>
        </Reveal>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="foot">
      <div className="wrap">
        <div className="colo">
          <div>
            <a className="mark" href="#top"><img src="/img/nmark.png" alt="" width="32" height="32" /><span>NPC</span></a>
            <p>Built on honesty. Driven by excellence.</p>
          </div>
          <div><h2>Navigate</h2>{links.map((l) => <a key={l.href} href={l.href}>{l.label}</a>)}</div>
          <div><h2>Offer</h2><a href="#offer">Brand</a><a href="#offer">Web</a><a href="#offer">AI</a><a href="#offer">Product</a></div>
          <div><h2>Contact</h2><a href={BOOKING_URL} target="_blank" rel="noopener">Book a call</a><a href={`mailto:${EMAIL}`}>Email</a><p>Dallas–Fort Worth</p></div>
        </div>
        <div className="base"><span>© {new Date().getFullYear()} Nabil Pervez Consulting</span><span>Brand · Web · AI · Product</span></div>
      </div>
    </footer>
  );
}
