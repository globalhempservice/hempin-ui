export type LifeTheme = {
    accent: string;
    heroTitle: string;
    heroKicker: string;
    heroSub: string;
    ctas: {
      market: { href: string; label: string };
      fund: { href: string; label: string };
    };
    bullets: { title: string; sub: string }[];
  };
  
  export const LIFE: LifeTheme = {
    accent: '#10B981',
    heroTitle: 'HEMP in your LIFE',
    heroKicker: 'Discover • Play • Learn',
    heroSub:
      "Shop hemp products, learn real facts, play mini-games, and support projects that grow the hemp economy.",
    ctas: {
      market: {
        href: 'https://market.hempin.org',
        label: 'Explore Market',
      },
      fund: {
        href: 'https://fund.hempin.org/campaigns/hempin-launch',
        label: 'Back this vision',
      },
    },
    bullets: [
      { title: 'Shop smarter', sub: 'A curated marketplace of hemp goods.' },
      { title: 'Learn fast', sub: 'Bite-size facts that bust myths.' },
      { title: 'Play & earn', sub: 'Mini-games to win Leaf XP soon.' },
      { title: 'Fund change', sub: 'Kickstart bold hemp projects.' },
    ],
  };