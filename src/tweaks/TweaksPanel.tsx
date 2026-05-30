import { useState } from 'react';
import type { Accent, Density, RoleId } from '../types';
import type { Route } from '../nav/NavContext';
import './tweaks.css';

const ROLE_OPTIONS: Array<[RoleId, string]> = [
  ['general', 'General'],
  ['rd', 'R&D'],
  ['dli', 'DLI'],
  ['forensics', 'Forensics'],
  ['admin', 'Admin'],
];

const ROLE_BLURB: Record<RoleId, string> = {
  general: 'Knowledge only · skips the welcome picker',
  rd: 'Knowledge + Coding',
  dli: 'Knowledge + Dialect',
  forensics: 'Knowledge + Dialect + Forensics',
  admin: 'All workspaces + admin tools',
};

const ACCENT_OPTIONS: Array<[Accent, string]> = [
  ['verdant', '#008751'],
  ['ink', '#2a4d96'],
  ['dusk', '#a64a3e'],
  ['sage', '#5a7b50'],
];

const DENSITY_OPTIONS: Density[] = ['compact', 'comfortable', 'spacious'];

const JUMP_TARGETS: Array<[string, Route]> = [
  ['Sign in', '/login'],
  ['Sign up', '/signup'],
  ['Pending', '/pending'],
  ['Onboarding', '/onboarding'],
  ['Welcome', '/welcome'],
  ['Knowledge', '/knowledge'],
  ['Files', '/files'],
  ['Settings', '/settings'],
  ['States', '/states'],
  ['Admin · Users', '/admin/users'],
];

// Relative-luminance pick so the checkmark reads on light or dark swatches.
const isLight = (hex: string) => {
  const h = hex.replace('#', '');
  const n = parseInt(h.length === 3 ? h.replace(/./g, (c) => c + c) : h, 16);
  const r = (n >> 16) & 255,
    g = (n >> 8) & 255,
    b = n & 255;
  return r * 299 + g * 587 + b * 114 > 148000;
};

const Check = ({ light }: { light: boolean }) => (
  <svg viewBox="0 0 14 14" aria-hidden="true">
    <path
      d="M3 7.2 5.8 10 11 4.2"
      fill="none"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      stroke={light ? 'rgba(0,0,0,.78)' : '#fff'}
    />
  </svg>
);

interface TweaksPanelProps {
  role: RoleId;
  accent: Accent;
  density: Density;
  route: Route;
  isAdmin: boolean;
  onRole: (r: RoleId) => void;
  onAccent: (a: Accent) => void;
  onDensity: (d: Density) => void;
  onJump: (to: Route) => void;
}

// Clean in-app dev/demo control. Lets a reviewer switch the active role,
// recolor the accent, change density, and jump to any screen. Not part of
// the product UI — purely a harness for reviewing the prototype.
export function TweaksPanel({
  role,
  accent,
  density,
  route,
  isAdmin,
  onRole,
  onAccent,
  onDensity,
  onJump,
}: TweaksPanelProps) {
  const [open, setOpen] = useState(true);

  if (!open) {
    return (
      <button className="twk-fab" onClick={() => setOpen(true)}>
        Tweaks
      </button>
    );
  }

  return (
    <div className="twk-panel">
      <div className="twk-hd">
        <b>Andal · Tweaks</b>
        <button className="twk-x" aria-label="Close tweaks" onClick={() => setOpen(false)}>
          ✕
        </button>
      </div>
      <div className="twk-body">
        <div className="twk-sect">Viewing as</div>
        <div className="twk-row">
          <div className="twk-lbl">
            <span>Role</span>
          </div>
          <div className="twk-seg" role="radiogroup">
            {ROLE_OPTIONS.map(([id, label]) => (
              <button key={id} role="radio" aria-checked={role === id} data-on={role === id ? '1' : '0'} onClick={() => onRole(id)}>
                {label}
              </button>
            ))}
          </div>
          <div className="twk-blurb">{ROLE_BLURB[role]}</div>
        </div>

        <div className="twk-sect">Feel</div>
        <div className="twk-row">
          <div className="twk-lbl">
            <span>Accent</span>
          </div>
          <div className="twk-chips" role="radiogroup">
            {ACCENT_OPTIONS.map(([id, hex]) => (
              <button
                key={id}
                className="twk-chip"
                role="radio"
                aria-checked={accent === id}
                data-on={accent === id ? '1' : '0'}
                title={id}
                style={{ background: hex }}
                onClick={() => onAccent(id)}
              >
                {accent === id && <Check light={isLight(hex)} />}
              </button>
            ))}
          </div>
        </div>
        <div className="twk-row">
          <div className="twk-lbl">
            <span>Density</span>
          </div>
          <div className="twk-seg" role="radiogroup">
            {DENSITY_OPTIONS.map((d) => (
              <button key={d} role="radio" aria-checked={density === d} data-on={density === d ? '1' : '0'} onClick={() => onDensity(d)}>
                {d.charAt(0).toUpperCase() + d.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <div className="twk-sect">Jump to</div>
        <div className="twk-jump">
          {JUMP_TARGETS.map(([label, to]) => {
            if (to.startsWith('/admin') && !isAdmin) return null;
            const active = route === to || (to !== '/login' && route.startsWith(to));
            return (
              <button key={to} data-on={active ? '1' : '0'} onClick={() => onJump(to)}>
                {label}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
