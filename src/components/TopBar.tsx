import type { ReactNode } from 'react';
import { I } from './icons';
import { useNav } from '../nav/NavContext';
import type { Theme } from '../types';

interface TopBarProps {
  module?: string;
  title?: string;
  actions?: ReactNode;
  themeName?: Theme;
}

export const TopBar = ({
  module = 'Knowledge',
  title = 'New conversation',
  actions = null,
  themeName = 'light',
}: TopBarProps) => {
  const nav = useNav();
  return (
    <div className="a-topbar">
      <div className="a-crumb">
        <span className="a-crumb__module mono">{module}</span>
        <span className="a-crumb__sep">/</span>
        <span className="a-crumb__title">{title}</span>
      </div>
      <div className="a-topbar__actions">
        {actions}
        <button className="a-btn ghost icon" title="Search">
          {I.search}
        </button>
        <button
          className="a-btn ghost icon"
          title="Toggle theme"
          onClick={nav ? () => nav.toggleTheme() : undefined}
        >
          <span className="a-theme-ico" key={themeName}>
            {themeName === 'dark' ? I.sun : I.moon}
          </span>
        </button>
      </div>
    </div>
  );
};
