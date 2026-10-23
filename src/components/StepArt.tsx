// Line illustrations for How it works, drawn in the card's own language: hairlines, one gold accent.
// Every stroke uses pathLength=1 so CSS can draw it in when the step is revealed.

const P = { pathLength: 1 } as const;

function Talk() {
  return (
    <>
      {/* phone */}
      <rect x="34" y="26" width="58" height="104" rx="10" className="l" {...P} />
      <path d="M54 34h18M56 118h14" className="l" {...P} />
      <circle cx="63" cy="70" r="13" className="a" {...P} />
      <path d="M57 70l4 4 8-8" className="ac" {...P} />
      {/* sound waves */}
      <path d="M100 58c6 7 6 17 0 24M108 50c11 12 11 28 0 40" className="l" {...P} />
      {/* two speech bubbles: the conversation */}
      <path d="M128 34h70a8 8 0 0 1 8 8v22a8 8 0 0 1-8 8h-48l-12 10v-10h-10a8 8 0 0 1-8-8v-22a8 8 0 0 1 8-8z" className="l" {...P} />
      <path d="M134 46h52M134 56h34" className="f" {...P} />
      <path d="M146 92h52a8 8 0 0 1 8 8v16a8 8 0 0 1-8 8h-6v10l-12-10h-34a8 8 0 0 1-8-8v-16a8 8 0 0 1 8-8z" className="g" {...P} />
      <path d="M152 104h40M152 112h22" className="gf" {...P} />
      {/* 20-minute clock */}
      <circle cx="116" cy="124" r="12" className="l" {...P} />
      <path d="M116 116v8l6 4" className="ac" {...P} />
    </>
  );
}

function Plan() {
  return (
    <>
      {/* the one scope document */}
      <path d="M50 22h78l22 22v94a6 6 0 0 1-6 6H50a6 6 0 0 1-6-6V28a6 6 0 0 1 6-6z" className="l" {...P} />
      <path d="M128 22v22h22" className="l" {...P} />
      <path d="M60 46h50M60 58h70" className="f" {...P} />
      {/* checklist: scope items ticked off */}
      {[76, 92, 108].map((y, i) => (
        <g key={y}>
          <rect x="60" y={y - 6} width="10" height="10" rx="2" className="l" {...P} />
          <path d={`M62 ${y - 1}l3 3 5-6`} className={i < 2 ? 'ac' : 'l'} {...P} />
          <path d={`M78 ${y}h${52 - i * 10}`} className="f" {...P} />
        </g>
      ))}
      {/* fixed price tag, hanging off the page */}
      <path d="M150 92l30-2 22 22-28 28-22-22z" className="g" {...P} />
      <circle cx="162" cy="100" r="4" className="ac" {...P} />
      <path d="M176 112c-6-2-10 2-6 6s0 8-6 6M173 108v2M170 124v2" className="ac" {...P} />
      {/* half to start: a split bar */}
      <rect x="60" y="124" width="70" height="8" rx="4" className="l" {...P} />
      <rect x="60" y="124" width="35" height="8" rx="4" className="gfill" />
    </>
  );
}

function Launch() {
  return (
    <>
      {/* the live site in a browser */}
      <rect x="28" y="30" width="150" height="104" rx="8" className="l" {...P} />
      <path d="M28 46h150" className="l" {...P} />
      <circle cx="40" cy="38" r="2.5" className="dot" />
      <circle cx="49" cy="38" r="2.5" className="dot" />
      <circle cx="58" cy="38" r="2.5" className="dot" />
      <rect x="40" y="58" width="56" height="10" rx="5" className="g" {...P} />
      <path d="M40 80h72M40 90h52" className="f" {...P} />
      <rect x="120" y="58" width="46" height="46" rx="6" className="l" {...P} />
      <path d="M128 96l10-12 8 8 6-6 8 10" className="f" {...P} />
      <rect x="40" y="108" width="40" height="12" rx="6" className="gfill" />
      {/* launch: the arrow leaving the frame, review tick beside it */}
      <path d="M170 116l40-46M210 70h-18M210 70v18" className="ac" {...P} />
      <circle cx="206" cy="124" r="12" className="a" {...P} />
      <path d="M200 124l4 4 8-8" className="ac" {...P} />
    </>
  );
}

const ART = { talk: Talk, plan: Plan, launch: Launch };

export default function StepArt({ id }: { id: keyof typeof ART }) {
  const Art = ART[id];
  return (
    <svg className="step-art" viewBox="0 0 240 160" aria-hidden="true">
      <Art />
    </svg>
  );
}
