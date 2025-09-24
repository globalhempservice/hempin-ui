export type NavChild = {
  label: string;
  href: string;
  external?: boolean;
};

export type NavItem = {
  key: string;            // e.g. 'market'
  label: string;          // 'Market'
  abbr: string;           // 'MK'
  href: string;
  external?: boolean;
  color?: string;         // legacy solid bg class (still supported)
  gradient?: string;      // new gradient bg class
  children?: NavChild[];
};