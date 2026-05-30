import { ROLES } from './data/roles';
import type { ModuleId, RoleId, Theme } from './types';
import type { Route } from './nav/NavContext';
import { ForbiddenInline } from './components/Forbidden';

// Screens
import { LoginScreen } from './screens/auth/Login';
import { SignupScreen } from './screens/auth/Signup';
import { PendingScreen } from './screens/auth/Pending';
import { OnboardingScreen } from './screens/auth/Onboarding';
import { WelcomeScreen } from './screens/Welcome';
import { KnowledgeScreen } from './screens/workspace/Knowledge';
import { CodingScreen } from './screens/workspace/Coding';
import { DialectScreen, DialectResultScreen } from './screens/workspace/Dialect';
import { ForensicsScreen, ForensicsResultScreen } from './screens/workspace/Forensics';
import { ActiveChatScreen } from './screens/workspace/ActiveChat';
import { FilesScreen } from './screens/account/Files';
import { AccountScreen } from './screens/account/Account';
import { AdminUsersScreen } from './screens/admin/Users';
import { AccessPoliciesScreen } from './screens/admin/AccessPolicies';
import { AuditLogScreen } from './screens/admin/AuditLog';
import { GlobalStatesScreen } from './screens/GlobalStates';

export function Router({ route, role, theme }: { route: Route; role: RoleId; theme: Theme }) {
  const r = ROLES[role];
  const has = (m: ModuleId) => r.modules.includes(m);

  // Auth
  if (route === '/login') return <LoginScreen theme={theme} />;
  if (route === '/signup') return <SignupScreen theme={theme} />;
  if (route === '/pending') return <PendingScreen theme={theme} />;
  if (route === '/onboarding') return <OnboardingScreen theme={theme} />;

  // Welcome — general staff (single workspace) skip the picker.
  if (route === '/welcome') {
    if (r.modules.length === 1) return <KnowledgeScreen theme={theme} roleId={role} />;
    return <WelcomeScreen theme={theme} roleId={role} />;
  }

  // Workspaces (Knowledge is available to every approved user).
  if (route === '/knowledge') return <KnowledgeScreen theme={theme} roleId={role} />;
  if (route === '/knowledge/chat') return <ActiveChatScreen theme={theme} roleId={role} />;

  if (route === '/coding' || route === '/coding/chat')
    return has('coding') ? <CodingScreen theme={theme} roleId={role} /> : <ForbiddenInline theme={theme} module="coding" />;

  if (route === '/dialect')
    return has('dialect') ? <DialectScreen theme={theme} roleId={role} /> : <ForbiddenInline theme={theme} module="dialect" />;
  if (route === '/dialect/chat')
    return has('dialect') ? <DialectResultScreen theme={theme} roleId={role} /> : <ForbiddenInline theme={theme} module="dialect" />;

  if (route === '/forensics')
    return has('forensics') ? <ForensicsScreen theme={theme} roleId={role} /> : <ForbiddenInline theme={theme} module="forensics" />;
  if (route === '/forensics/chat')
    return has('forensics') ? <ForensicsResultScreen theme={theme} roleId={role} /> : <ForbiddenInline theme={theme} module="forensics" />;

  // Account
  if (route === '/files') return <FilesScreen theme={theme} roleId={role} />;
  if (route === '/settings') return <AccountScreen theme={theme} roleId={role} />;

  // Reference board
  if (route === '/states') return <GlobalStatesScreen theme={theme} />;

  // Admin (admins only)
  if (route.startsWith('/admin')) {
    if (!r.admin) return <ForbiddenInline theme={theme} module="admin" />;
    if (route === '/admin/users') return <AdminUsersScreen theme={theme} />;
    if (route === '/admin/policy') return <AccessPoliciesScreen theme={theme} />;
    if (route === '/admin/audit') return <AuditLogScreen theme={theme} />;
  }

  return <LoginScreen theme={theme} />;
}
