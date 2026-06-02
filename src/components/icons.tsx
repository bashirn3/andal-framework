// Line-icon set, ported verbatim from the design bundle (project/shell.jsx).
import type { ReactNode } from 'react';

type IconProps = { d: string | string[]; size?: number } & Omit<React.SVGProps<SVGSVGElement>, 'd'>;

export const Icon = ({ d, size = 16, ...rest }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...rest}
  >
    {Array.isArray(d) ? d.map((p, i) => <path key={i} d={p} />) : <path d={d} />}
  </svg>
);

export const I: Record<string, ReactNode> = {
  book: <Icon d="M4 5a2 2 0 0 1 2-2h12v18H6a2 2 0 0 1-2-2zM20 17H6" />,
  code: <Icon d={['M8 8 4 12l4 4', 'M16 8l4 4-4 4', 'M14 4l-4 16']} />,
  voice: <Icon d={['M12 3v12', 'M9 6v6', 'M15 6v6', 'M6 9v3', 'M18 9v3', 'M5 18h14', 'M12 18v3']} />,
  shield: <Icon d={['M12 3l8 3v6c0 4.5-3.4 8.4-8 9-4.6-.6-8-4.5-8-9V6z', 'M9 12l2 2 4-4']} />,
  plus: <Icon d={['M12 5v14', 'M5 12h14']} />,
  send: <Icon d="M5 12l14-7-5 16-3-7-6-2z" />,
  attach: <Icon d="M21 12.5l-9 9a5 5 0 0 1-7-7l9-9a3.5 3.5 0 0 1 5 5l-9 9a2 2 0 1 1-3-3l8-8" />,
  search: <Icon d={['M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16z', 'M21 21l-4.3-4.3']} />,
  sun: <Icon d={['M16 12a4 4 0 1 1-8 0 4 4 0 0 1 8 0', 'M12 2v2', 'M12 20v2', 'M2 12h2', 'M20 12h2', 'M4.93 4.93l1.41 1.41', 'M17.66 17.66l1.41 1.41', 'M6.34 17.66l-1.41 1.41', 'M19.07 4.93l-1.41 1.41']} />,
  moon: <Icon d="M20 14.5A8.5 8.5 0 0 1 9.5 4a8.5 8.5 0 1 0 10.5 10.5z" />,
  chev: <Icon d="M7 9l5 5 5-5" />,
  chevR: <Icon d="M9 7l5 5-5 5" />,
  users: <Icon d={['M16 14a4 4 0 1 0-8 0', 'M12 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6z', 'M20 21v-2a4 4 0 0 0-3-3.87', 'M4 21v-2a4 4 0 0 1 3-3.87']} />,
  policy: <Icon d={['M4 6h16', 'M4 12h10', 'M4 18h16', 'M18 12l2 2 4-4']} />,
  log: <Icon d={['M9 6h11', 'M9 12h11', 'M9 18h11', 'M5 6h.01', 'M5 12h.01', 'M5 18h.01']} />,
  file: <Icon d={['M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z', 'M14 3v6h6']} />,
  folder: <Icon d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />,
  trash: <Icon d={['M4 7h16', 'M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2', 'M6 7l1 13a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2l1-13']} />,
  more: <Icon d={['M12 5h.01', 'M12 12h.01', 'M12 19h.01']} />,
  menu: <Icon d={['M4 7h16', 'M4 12h16', 'M4 17h16']} />,
  home: <Icon d={['M3 11l9-7 9 7', 'M5 9.5V20h14V9.5']} />,
  check: <Icon d="M5 12l5 5L20 7" />,
  x: <Icon d={['M6 6l12 12', 'M18 6L6 18']} />,
  arrow: <Icon d={['M5 12h14', 'M13 5l7 7-7 7']} />,
  arrowUp: <Icon d={['M12 19V5', 'M5 12l7-7 7 7']} />,
  copy: <Icon d={['M9 9h10v10H9z', 'M5 15V5h10']} />,
  refresh: <Icon d={['M3 12a9 9 0 0 1 15-6.7L21 8', 'M21 3v5h-5', 'M21 12a9 9 0 0 1-15 6.7L3 16', 'M3 21v-5h5']} />,
  bolt: <Icon d="M13 3L4 14h7l-1 7 9-11h-7l1-7z" />,
  upload: <Icon d={['M12 4v12', 'M7 9l5-5 5 5', 'M4 20h16']} />,
  download: <Icon d={['M12 4v12', 'M17 11l-5 5-5-5', 'M4 20h16']} />,
  warn: <Icon d={['M12 3l10 17H2z', 'M12 10v4', 'M12 18h.01']} />,
  info: <Icon d={['M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18z', 'M12 11v6', 'M12 8h.01']} />,
  wifi: <Icon d={['M2 9a16 16 0 0 1 20 0', 'M5 13a11 11 0 0 1 14 0', 'M8.5 16.5a6 6 0 0 1 7 0', 'M12 20h.01']} />,
  clock: <Icon d={['M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18z', 'M12 7v5l3 2']} />,
  cog: <Icon d={['M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z', 'M19.4 15a1.6 1.6 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.6 1.6 0 0 0-1.8-.3 1.6 1.6 0 0 0-1 1.5V21a2 2 0 0 1-4 0v-.1a1.6 1.6 0 0 0-1-1.5 1.6 1.6 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.6 1.6 0 0 0 .3-1.8 1.6 1.6 0 0 0-1.5-1H3a2 2 0 0 1 0-4h.1a1.6 1.6 0 0 0 1.5-1 1.6 1.6 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.6 1.6 0 0 0 1.8.3H9a1.6 1.6 0 0 0 1-1.5V3a2 2 0 0 1 4 0v.1a1.6 1.6 0 0 0 1 1.5 1.6 1.6 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.6 1.6 0 0 0-.3 1.8V9a1.6 1.6 0 0 0 1.5 1H21a2 2 0 0 1 0 4h-.1a1.6 1.6 0 0 0-1.5 1z']} />,
  signout: <Icon d={['M9 4H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h4', 'M16 17l5-5-5-5', 'M21 12H9']} />,
};
