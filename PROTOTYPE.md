# Andal — Frontend Prototype

A clean, reviewable reimplementation of `Andal Prototype.html` from the Claude Design
handoff bundle, built as a **Vite + React + TypeScript** app.

> **Prototype only.** There is no backend. Auth, uploads, jobs, and AI responses are all
> mock data + local React state. Nothing here calls a real API. See the architecture rules
> baked into the UI (local signup/login, admin-assigned departments, hidden unauthorized
> modules, one global storage quota).

## Run it

```bash
npm install
npm run dev      # http://localhost:5173
```

Other scripts:

```bash
npm run build      # type-check (tsc -b) + production build to dist/
npm run preview    # serve the production build
npm run typecheck  # types only, no emit
```

The design is a fixed **1440 × 900** artboard that scales to fit any viewport (letterboxed),
mirroring the original prototype's `Stage`.

## The Tweaks panel (dev/demo control, bottom-right)

Not part of the product — a harness for reviewing every state quickly:

- **Role** — `General` / `R&D` / `DLI` / `Forensics` / `Admin`. Reshapes the whole session:
  which workspaces appear in the sidebar, the user identity, storage breakdown, files,
  and whether the Administration section is present. Switching to a role that lacks the
  current workspace bounces you out (the direct-URL / 403 guard).
- **Accent** — Verdant (Nigerian green, default) / Ink / Dusk / Sage.
- **Density** — Compact / Comfortable / Spacious.
- **Jump to** — quick links to auth screens, welcome, files, settings, the states board,
  and (admins only) the admin screens.

The top-bar sun/moon icon toggles light ↔ dark on any in-app screen.

## Screens & states implemented

**Auth** — Login (default; `invalid` / `pending` / `disabled` notice variants supported),
Signup (with `mismatch` / `exists` variants), Pending approval, First-approved onboarding.
Departments are never user-selectable.

**Welcome** — role-aware module picker (only the workspaces you actually have). General
staff skip it and land directly in Knowledge.

**Workspaces** — Knowledge home + active document-grounded chat; Coding active conversation
(attached code chip, syntax-highlighted block, copy/regenerate); Dialect upload home +
completed result (Hausa transcript ‖ English translation, confidence, ambiguity notes);
Forensics upload home + completed result (summary, severity-tagged findings, indicators
table, outstanding questions). Composer has a categorized attach popover.

**Account** — Files & storage (role-filtered list, global quota bar, `near` / `full` /
`empty` variants) and Account settings (read-only profile, workspaces, theme).

**Admin** — Users table (pending rows highlighted), Approve-user modal (approve button
disabled until a department is assigned), Disable-user modal, Access-policies matrix,
Audit log.

**Modals** — Clear session, Delete file, Approve user, Disable user.

**Reference** — Global states board (loading, empty, error, offline, storage near/full,
account pending/disabled, forbidden, upload quota/filetype rejection, job
queued/processing/completed/failed). Reachable via Tweaks → Jump to → **States**.

## Structure

```
src/
  main.tsx, App.tsx        # entry + root state (route, role, theme, accent, density, modal)
  Router.tsx               # route → screen, with module-access guards
  styles.css               # design tokens + component CSS (ported from the bundle)
  types.ts                 # domain types
  data/roles.ts            # mock roles, modules, conversations, storage
  nav/                     # NavContext + letterboxed Stage
  components/              # icons, Shell, Sidebar, TopBar, Composer, Forbidden, modals/
  screens/                 # auth/, workspace/, account/, admin/, Welcome, GlobalStates
  tweaks/                  # the dev/demo Tweaks panel
```

The original design files remain under `project/` and `chats/` for reference.
