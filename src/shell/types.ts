export type NavItem = {
  href: string;
  label: string;
  /** 2–3 chars shown in the badge (e.g. "MK", "EV") */
  code?: string;
  /** Tailwind color class for the badge background (e.g. "bg-emerald-500") */
  colorClass?: string;
};