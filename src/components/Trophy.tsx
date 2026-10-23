import { useEffect, useState } from 'react';
import './iso.css';
import './Trophy.css';

// The isometric gold trophy (built by tools/trophy/build.mjs), shown still in its resting pose.
// ~100 KB gzipped of precomputed paths, so it loads as its own chunk after first paint.
export default function Trophy() {
  const [svg, setSvg] = useState('');
  useEffect(() => {
    import('./trophyArt').then((m) => setSvg(m.TROPHY_SVG));
  }, []);
  return <div className="iso stage" dangerouslySetInnerHTML={{ __html: svg }} />;
}
