// Mock identity / access data. Static only — no real auth or directory.
// Ported from the design bundle (project/shell.jsx).
import { I } from '../components/icons';
import type { Conversation, ModuleDef, ModuleId, Role, RoleId, StorageUsage } from '../types';

export const ROLES: Record<RoleId, Role> = {
  general: {
    id: 'general',
    name: 'Tunde Lawal',
    initials: 'TL',
    role: 'General staff',
    dept: 'Office of the SA',
    modules: ['knowledge'],
    admin: false,
  },
  rd: {
    id: 'rd',
    name: 'Adamu Bashir',
    initials: 'AB',
    role: 'R&D engineer',
    dept: 'Research & Development',
    modules: ['knowledge', 'coding'],
    admin: false,
  },
  dli: {
    id: 'dli',
    name: 'Folake Okeke',
    initials: 'FO',
    role: 'DLI analyst',
    dept: 'Dialect & Language Intelligence',
    modules: ['knowledge', 'dialect'],
    admin: false,
  },
  forensics: {
    id: 'forensics',
    name: 'Mahmoud Tanko',
    initials: 'MT',
    role: 'Forensics lead',
    dept: 'Digital Forensics',
    modules: ['knowledge', 'dialect', 'forensics'],
    admin: false,
  },
  admin: {
    id: 'admin',
    name: 'Patrick Obi',
    initials: 'PO',
    role: 'Platform admin',
    dept: 'Platform',
    modules: ['knowledge', 'coding', 'dialect', 'forensics'],
    admin: true,
  },
};

export const MODULES: ModuleDef[] = [
  { id: 'knowledge', label: 'Knowledge', icon: I.book },
  { id: 'coding', label: 'Coding', icon: I.code },
  { id: 'dialect', label: 'Dialect', icon: I.voice },
  { id: 'forensics', label: 'Forensics Intelligence', icon: I.shield },
];

// Per-module conversation history shown in the sidebar accordion.
export const CONVOS: Record<ModuleId, Conversation[]> = {
  knowledge: [
    { title: 'Procurement clause comparison', time: '2h' },
    { title: 'Q1 status memo · draft', time: '1d' },
    { title: 'Standards translation', time: '3d' },
    { title: 'Vendor agreement summary', time: '6d' },
  ],
  coding: [
    { title: 'Loader refactor · pipeline.py', time: '12m' },
    { title: 'k8s manifest review', time: '2h' },
    { title: 'Edge cases · normalize()', time: '1d' },
  ],
  dialect: [
    { title: 'Field interview · Maiduguri 02', time: '20m' },
    { title: 'Press conference · Kano', time: '3h' },
    { title: 'Radio bulletin · Yobe', time: '2d' },
  ],
  forensics: [
    { title: 'auth-failures · gateway-01', time: '3h' },
    { title: 'NTP-incident · 18 May', time: '1d' },
    { title: 'Archive triage · evidence-04', time: '4d' },
  ],
};

// Global storage usage per role (one shared quota across all modules).
export const STORAGE: Record<RoleId, StorageUsage> = {
  general: { used: 32, total: 500, by: { knowledge: 32 } },
  rd: { used: 110, total: 500, by: { knowledge: 84, coding: 26 } },
  dli: { used: 218, total: 500, by: { knowledge: 38, dialect: 180 } },
  forensics: { used: 380, total: 500, by: { knowledge: 22, dialect: 78, forensics: 280 } },
  admin: { used: 92, total: 500, by: { knowledge: 40, coding: 12, dialect: 24, forensics: 16 } },
};
