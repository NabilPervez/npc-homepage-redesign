import Nav from './components/Nav';
import Hero from './components/Hero';
import Proof from './components/Proof';
import Statement from './components/Statement';
import Offerings from './components/Offerings';
import Award from './components/Award';
import WorkReel from './components/WorkReel';
import { About, Close, Footer, Process, Voices } from './components/Closing';

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
        <Award />
        <WorkReel />
        <Process />
        <Voices />
        <About />
        <Close />
      </main>
      <Footer />
    </>
  );
}
