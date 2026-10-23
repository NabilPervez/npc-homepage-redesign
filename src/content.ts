// All copy and data in one place, so the components stay layout only.
export const BOOKING_URL = 'https://calendar.app.google/VbQNoKnwrgNyx6kRA';
export const EMAIL = 'nabilpervezconsulting@gmail.com';

export const links = [
  { href: '#offer', label: 'What we do' },
  { href: '#award', label: 'Work' },
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
  'PVP Live', 'IGDA Dallas',
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

export const work = [
  { src: '/img/red-bull.jpg', alt: 'Red Bull', w: 1000, h: 563, size: 'wide' },
  { src: '/img/outlaws.jpg', alt: 'Houston Outlaws', w: 1000, h: 563, size: 'tall' },
  { src: '/img/cloud9.jpg', alt: 'Cloud9 × One Piece', w: 1000, h: 500, size: '' },
  { src: '/img/warzone.jpg', alt: 'World Series of Warzone', w: 1000, h: 1000, size: '' },
  { src: '/img/optic.jpg', alt: 'OpTic Gaming', w: 1000, h: 1000, size: '' },
  { src: '/img/boston-breach.jpg', alt: 'Boston Breach', w: 1000, h: 558, size: 'wide' },
  { src: '/img/a-kon.jpg', alt: 'A-KON', w: 1000, h: 563, size: '' },
  { src: '/img/nsg.jpg', alt: 'Nerd Street Gamers', w: 1000, h: 561, size: '' },
  { src: '/img/pvp-live.jpg', alt: 'PVP Live', w: 1000, h: 563, size: '' },
  { src: '/img/evo.jpg', alt: 'EVO', w: 1000, h: 484, size: '' },
];

export const steps = [
  { n: '01', title: 'Talk.', text: "One call to find what's actually holding you back." },
  { n: '02', title: 'Plan.', text: 'One scope, one price. Half to start.' },
  { n: '03', title: 'Launch.', text: 'We build it, you review it, it goes live.' },
];

export const voices = [
  { quote: "He's an X-Factor. He immediately improves the team he's working with.", name: 'Dustin Steiner', role: 'Senior Associate, GALE' },
  { quote: 'Organized, fast, clear communicator.', name: 'Colter Hochstetler', role: 'Founder, SunSpear' },
  { quote: 'I can always rely on him, no matter the issue.', name: 'Jason Gures', role: 'CEO, Broad.IO' },
];
