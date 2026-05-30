import { createContext, useContext } from 'react';
import type { ModuleId, RoleId, Theme } from '../types';

export type Route = string;

export type ModalId = 'clear-session' | 'delete-file' | 'approve-user' | 'disable-user' | null;

export interface NavValue {
  route: Route;
  navigate: (to: Route) => void;
  role: RoleId;
  expanded: Set<ModuleId>;
  toggleExpand: (id: ModuleId) => void;
  theme: Theme;
  setTheme: (t: Theme) => void;
  toggleTheme: () => void;
  modal: ModalId;
  openModal: (m: ModalId) => void;
  closeModal: () => void;
  /** Mobile: whether the off-canvas sidebar drawer is open. */
  sidebarOpen: boolean;
  setSidebarOpen: (b: boolean) => void;
}

// Null when rendered outside a provider (e.g. static reference views).
export const NavContext = createContext<NavValue | null>(null);

export const useNav = (): NavValue | null => useContext(NavContext);
