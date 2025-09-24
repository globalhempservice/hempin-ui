export type UniverseKey = 'market' | 'knowledge' | 'directory' | 'place' | 'fund' | 'event';

export type NavChild = {
  label: string;
  href: string;       // can be internal or external
  external?: boolean;
};

export type NavItem = {
  key: UniverseKey;
  label: string;      // full label e.g. "Market"
  abbr: string;       // initials e.g. "MK"
  href: string;       // default landing URL
  external?: boolean;
  color: string;      // tailwind bg-* token, e.g. 'bg-amber-500'
  children?: NavChild[];
};