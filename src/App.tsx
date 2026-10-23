import Nav from './components/Nav';
import Hero from './components/Hero';
import Proof from './components/Proof';
import Statement from './components/Statement';
import Offerings from './components/Offerings';

export default function App() {
  return (
    <>
      <a className="skip" href="#main">Skip to content</a>
      <Nav />
      <main id="main">
        <div id="top" />
        <Hero />
        <Proof />
        <Statement />
        <Offerings />
      </main>
    </>
  );
}
