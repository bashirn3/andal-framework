// Shared domain types for the Andal prototype.
// Everything here is mock/static — there is no backend, auth, or API.

import type { ReactNode } from 'react';

export type Theme = 'light' | 'dark';

export type ModuleId = 'knowledge' | 'coding' | 'dialect' | 'forensics';

export type RoleId = 'general' | 'rd' | 'dli' | 'forensics' | 'admin';

export type Accent = 'verdant' | 'ink' | 'dusk' | 'sage';

export type Density = 'compact' | 'comfortable' | 'spacious';

export interface Role {
  id: RoleId;
  name: string;
  initials: string;
  /** Human-readable access level, e.g. "R&D engineer". */
  role: string;
  dept: string;
  modules: ModuleId[];
  admin: boolean;
}

export interface ModuleDef {
  id: ModuleId;
  label: string;
  icon: ReactNode;
}

export interface Conversation {
  title: string;
  time?: string;
  active?: boolean;
}

export interface StorageUsage {
  used: number;
  total: number;
  by: Partial<Record<ModuleId, number>>;
}
