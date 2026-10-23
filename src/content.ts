// All copy and data in one place, so the components stay layout only.
export const BOOKING_URL = 'https://calendar.app.google/VbQNoKnwrgNyx6kRA';
export const EMAIL = 'nabilpervezconsulting@gmail.com';

export const links = [
  { href: '#offer', label: 'What we do' },
  { href: '#work', label: 'Work' },
  { href: '#how', label: 'How it works' },
  { href: '#about', label: 'About' },
];

export const stats = [
  { value: 40, suffix: '+', label: 'Brands' },
  { value: 10, suffix: '+', label: 'Years' },
  { value: 4, suffix: '', label: 'Disciplines' },
];

export const clientsA = [
  'Red Bull', 'Paramount Pictures', 'LEGO', 'Coca-Cola', 'Riot Games', 'Activision Blizzard', 'Call of Duty',
  'Overwatch League', 'Cloud9', 'Toei Animation', 'OpTic Gaming', 'EVO', 'Funny Or Die', 'The Kraft Group',
];
export const clientsB = [
  'Boston Breach', 'Houston Outlaws', 'Nerd Street Gamers', 'World Series of Warzone', 'Twitch Rivals',
  'SunSpear Games', 'AOE Creative', 'Blast Radius', 'Metal Umbrella', 'A-KON', 'Freshcut', 'Metaview',
  'PVP Live', 'IGDA Dallas', 'NACON', 'Ellevens', 'Fancurve', 'Alloy', 'Geekletes', 'Team Fugitive',
  'The Story Mob', 'McCown Evans', 'Immortal: Gates of Pyre', 'Stay Plugged In', 'FCFL',
];

export type Offering = {
  id: 'brand' | 'web' | 'ai' | 'product';
  name: string;
  line: string;
  blurb: string;
  items: string[];
};

export const offerings: Offering[] = [
  { id: 'brand', name: 'Brand', line: 'Look the part.', blurb: 'Identity, strategy and the decks that win the room.',
    items: ['Logos', 'Brand strategy', 'Guidelines', 'Pitch decks'] },
  { id: 'web', name: 'Web', line: 'Be found.', blurb: 'Fast, mobile-first sites that show up and convert.',
    items: ['Web design', 'Design systems', 'SEO & analytics', 'Mobile-first builds'] },
  { id: 'ai', name: 'AI', line: 'Work less.', blurb: 'Agents and automations that take the busywork off your team.',
    items: ['Automations', 'Assistants', 'Knowledge bases', 'Team training'] },
  { id: 'product', name: 'Product', line: 'Ship it.', blurb: 'From idea to launched app, run like a studio product team.',
    items: ['Product strategy', 'UX & prototypes', 'Roadmaps', 'Launch'] },
];

// Recent work bento: columns of tiles from the portfolio. Pillar = which offering it shows.
// Ratios are width / height of the stored image (public/img/work, 720 px and 480 px WebP).
export type Pillar = 'Brand' | 'Web' | 'AI' | 'Product';
export type Tile = { slug: string; client: string; pillar: Pillar; alt: string; ratio: number };
export type Column = { kind: 'tall' | 'stack' | 'wide' | 'sq'; tiles: Tile[] };

const t = (slug: string, client: string, pillar: Pillar, alt: string, ratio: number): Tile => ({ slug, client, pillar, alt, ratio });
export const workColumns: Column[] = [
  { kind: 'tall', tiles: [t('akon-pass', 'A-KON', 'Brand', 'A-KON daily pass with the anime mascot', 0.71)] },
  { kind: 'stack', tiles: [t('c9-tees', 'Cloud9 × One Piece', 'Brand', 'Cloud9 × One Piece tees and merch', 2), t('outlaws-tour', 'Houston Outlaws', 'Brand', 'Houston Outlaws merch and promo items', 1.33)] },
  { kind: 'wide', tiles: [t('redbull-run', 'Red Bull', 'Product', 'Red Bull arcade cabinet activation', 1.78)] },
  { kind: 'stack', tiles: [t('lego-2', 'LEGO Games', 'Brand', 'LEGO Games branded backpack', 2), t('ow-houston', 'Overwatch League', 'Brand', 'Overwatch League Houston in-game spray', 1)] },
  { kind: 'tall', tiles: [t('lego-1', 'LEGO Games', 'Brand', 'LEGO Batman on a LEGO Games brand layout', 0.79)] },
  { kind: 'sq', tiles: [t('nsg-social', 'Nerd Street Gamers', 'Brand', 'Nerd Street Gamers Local Gaming social post', 1)] },
  { kind: 'stack', tiles: [t('metaview-2', 'Metaview', 'Brand', 'Metaview billboard campaign on a brick wall', 1.83), t('igp-logo', 'Immortal: Gates of Pyre', 'Brand', 'Immortal: Gates of Pyre logo', 1.67)] },
  { kind: 'wide', tiles: [t('evo', 'EVO', 'Web', 'Evolution Championship Series event website', 2.07)] },
  { kind: 'tall', tiles: [t('igda', 'IGDA Dallas', 'Brand', 'IGDA Dallas event poster', 0.75)] },
  { kind: 'stack', tiles: [t('freshcut-m1', 'Freshcut', 'Brand', 'Freshcut billboard mockup', 1.78), t('mce-collage', 'McCown Evans', 'Web', 'McCown Evans website on laptop and devices', 1.5)] },
  { kind: 'sq', tiles: [t('ow-paris', 'Overwatch League', 'Brand', 'Overwatch League Paris in-game spray', 1)] },
  { kind: 'stack', tiles: [t('igp-ui', 'Immortal: Gates of Pyre', 'Product', 'Immortal: Gates of Pyre character select screen', 1.78), t('nacon-skaters', 'NACON', 'Product', 'NACON Session skateboarding game shots', 1.49)] },
  { kind: 'tall', tiles: [t('alloy', 'Alloy', 'Web', 'Alloy mobile site on a phone', 0.81)] },
  { kind: 'stack', tiles: [t('c9-hats', 'Cloud9 × One Piece', 'Brand', 'Cloud9 × One Piece hats and apparel on models', 1.6), t('mu-1', 'Metal Umbrella', 'Brand', 'Metal Umbrella apparel and identity', 1.31)] },
  { kind: 'tall', tiles: [t('metaview-bill', 'Metaview', 'Brand', 'Metaview anime campaign artwork', 0.81)] },
  { kind: 'stack', tiles: [t('nsg-card', 'Nerd Street Gamers', 'Brand', 'Nerd Street Gamers business cards', 1.5), t('spi', 'Stay Plugged In', 'Web', 'Stay Plugged In platform on desktop', 1.41)] },
  { kind: 'sq', tiles: [t('akon-badge', 'A-KON', 'Brand', 'A-KON event badge on a lanyard', 1)] },
  { kind: 'stack', tiles: [t('igp-ks', 'Immortal: Gates of Pyre', 'Brand', 'Immortal Kickstarter launch countdown', 1.78), t('geekletes', 'Geekletes', 'Brand', 'Geekletes event identity', 1.78)] },
  { kind: 'sq', tiles: [t('mu-2', 'Metal Umbrella', 'Brand', 'Metal Umbrella logo sketches', 0.9)] },
  { kind: 'stack', tiles: [t('fancurve', 'Fancurve', 'Product', 'Fancurve collectible rarity tiers', 1.47), t('freshcut-access', 'Freshcut', 'Brand', 'Freshcut accessories brand layout', 1.78)] },
  { kind: 'sq', tiles: [t('fugitive', 'Team Fugitive', 'Brand', 'Team Fugitive jerseys and apparel', 1.07)] },
  { kind: 'wide', tiles: [t('c9-luffy', 'Cloud9 × One Piece', 'Brand', 'Cloud9 × One Piece Luffy line-art key visual', 1.6)] },
  { kind: 'stack', tiles: [t('igp-web', 'Immortal: Gates of Pyre', 'Web', 'Immortal: Gates of Pyre website', 0.95), t('mce-intro', 'McCown Evans', 'Web', 'McCown Evans site on a desktop monitor', 1.15)] },
  { kind: 'sq', tiles: [t('lego-3', 'LEGO Games', 'Brand', 'LEGO Games branded sneakers', 1.39)] },
];

export const steps = [
  { n: '01', id: 'talk', title: 'Talk.', text: "One 20-minute call to find what's actually holding you back." },
  { n: '02', id: 'plan', title: 'Plan.', text: 'One scope, one fixed price, one document. Half to start.' },
  { n: '03', id: 'launch', title: 'Launch.', text: 'We build it, you review it within 48 hours, it goes live.' },
] as const;

// Testimonials, verbatim from the portfolio site (Colter's with the asterisk the original site uses)
export const voices = [
  { quote: "If there's one thing I can say about Nabil and his presence in a company, it's that he's an X-Factor. He immediately improves the team he's working with.", name: 'Dustin Steiner', role: 'Senior Associate, Public Relations' },
  { quote: "The question is not 'Is Mr. Pervez good enough to work with us?' Rather, the question is 'Is my organization and project worthy of Mr. Pervez's attention?' Think carefully.", name: 'Dylan Kahn', role: 'Founder, SunSpear Games' },
  { quote: "Organized, fast, clear communicator. I always look forward to meetings Nabil leads because I know we're going to get sh*t done.", name: 'Colter Hochstetler', role: 'Director of Game, SunSpear Games' },
  { quote: 'I highly recommend Nabil for any company that values consistent execution, clear communication, and a strong culture.', name: 'Kevin Wagner', role: 'CEO, SunSpear Games' },
  { quote: 'Nabil is an incredible technologist, with a particular gift for identifying business opportunities within a shifting digital landscape.', name: 'Eric Swayne', role: 'Analytics Leader & Solution Architect' },
  { quote: 'I have been consistently impressed by his remarkable skills, dedication, and management abilities. He has consistently demonstrated an ability to manage complex projects.', name: 'Markel Lee', role: 'Creative Director, AOE Creative' },
  { quote: "Nabil's strategic marketing approach consistently achieved impressive results aligned with business objectives. His leadership played a pivotal role in many project successes.", name: 'Christopher Dykes', role: 'Freelance Motion Designer' },
  { quote: 'Nabil seamlessly blends professionalism with an informal style, making collaboration both efficient and enjoyable. Being managed by Nabil was a pleasure.', name: 'Dávid Dolyák', role: 'UX/UI & Software Development' },
  { quote: 'Hustle might be his middle name. I would add Nabil into my leadership structure without a second thought.', name: 'Trenton Pierson', role: 'Therapeutic Counselor' },
  { quote: "Nabil is a well-connected and eloquent speaker... He's a joy to talk with and is an asset to any team.", name: 'Godswill Ugwa Jr.', role: 'Community Manager, VIZ Media' },
  { quote: 'I can always rely on him, no matter the issue.', name: 'Jason Gures', role: 'CEO, Broad.IO' },
];
