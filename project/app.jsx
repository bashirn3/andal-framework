/* global React, ReactDOM,
   DesignCanvas, DCSection, DCArtboard,
   useTweaks, TweaksPanel, TweakSection, TweakRadio, TweakColor,
   LoginScreen, SignupScreen, PendingScreen, OnboardingScreen, WelcomeScreen,
   KnowledgeScreen, CodingScreen, DialectScreen, DialectResultScreen,
   ForensicsScreen, ForensicsResultScreen, ActiveChatScreen, ClearSessionModal,
   FilesScreen, DeleteFileModal, AccountScreen,
   AdminUsersScreen, ApproveUserModal, DisableUserModal, AccessPoliciesScreen, AuditLogScreen,
   GlobalStatesScreen, ROLES
*/

const W = 1440, H = 900;

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "role": "rd",
  "accent": "verdant",
  "density": "comfortable"
}/*EDITMODE-END*/;

const ACCENT_SWATCHES = [
  ['verdant', '#008751'],
  ['ink',     '#2a4d96'],
  ['dusk',    '#a64a3e'],
  ['sage',    '#5a7b50'],
];

const ROLE_LABELS = {
  general: 'General staff',
  rd: 'R&D',
  dli: 'DLI',
  forensics: 'Forensics',
  admin: 'Admin',
};

const App = () => {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);

  React.useEffect(() => {
    document.documentElement.setAttribute('data-andal-accent', t.accent);
    document.documentElement.setAttribute('data-andal-density', t.density);
    document.body.setAttribute('data-andal-accent', t.accent);
    document.body.setAttribute('data-andal-density', t.density);
  }, [t.accent, t.density]);

  const role = t.role;
  const r = ROLES[role];

  // Which sections are relevant for the picked role
  const has = (m) => r.modules.includes(m);
  const isAdmin = r.admin;

  return (
    <>
      <DesignCanvas>

        <DCSection id="cover"
          title={`Andal · viewing as ${r.name} (${ROLE_LABELS[role]})`}
          subtitle="Switch role, accent, and density in the Tweaks panel. 1440 × 900 · light + dark variants.">
          <DCArtboard id="cover-login" label="Sign in · Light" width={W} height={H}>
            <LoginScreen theme="light" />
          </DCArtboard>
          <DCArtboard id="cover-login-d" label="Sign in · Dark" width={W} height={H}>
            <LoginScreen theme="dark" />
          </DCArtboard>
        </DCSection>

        <DCSection id="auth" title="1 · Authentication" subtitle="Local account model. Admins approve and assign department before access is granted.">
          <DCArtboard id="login-l" label="Sign in · Default" width={W} height={H}><LoginScreen theme="light" /></DCArtboard>
          <DCArtboard id="login-d" label="Sign in · Dark" width={W} height={H}><LoginScreen theme="dark" /></DCArtboard>
          <DCArtboard id="login-invalid" label="Sign in · Invalid credentials" width={W} height={H}><LoginScreen theme="light" variant="invalid" /></DCArtboard>
          <DCArtboard id="login-pending" label="Sign in · Pending approval" width={W} height={H}><LoginScreen theme="light" variant="pending" /></DCArtboard>
          <DCArtboard id="login-disabled" label="Sign in · Disabled account" width={W} height={H}><LoginScreen theme="dark" variant="disabled" /></DCArtboard>

          <DCArtboard id="signup-l" label="Create account · Light" width={W} height={H}><SignupScreen theme="light" /></DCArtboard>
          <DCArtboard id="signup-d" label="Create account · Dark" width={W} height={H}><SignupScreen theme="dark" /></DCArtboard>
          <DCArtboard id="signup-mismatch" label="Create account · Password mismatch" width={W} height={H}><SignupScreen theme="light" variant="mismatch" /></DCArtboard>
          <DCArtboard id="signup-exists" label="Create account · Email exists" width={W} height={H}><SignupScreen theme="dark" variant="exists" /></DCArtboard>

          <DCArtboard id="pending-l" label="Pending approval · Light" width={W} height={H}><PendingScreen theme="light" /></DCArtboard>
          <DCArtboard id="pending-d" label="Pending approval · Dark" width={W} height={H}><PendingScreen theme="dark" /></DCArtboard>

          <DCArtboard id="onb-l" label="First-approved onboarding · Light" width={W} height={H}><OnboardingScreen theme="light" /></DCArtboard>
          <DCArtboard id="onb-d" label="First-approved onboarding · Dark" width={W} height={H}><OnboardingScreen theme="dark" /></DCArtboard>
        </DCSection>

        <DCSection
          id="welcome"
          title={`2 · Welcome · ${ROLE_LABELS[role]}`}
          subtitle={role === 'general'
            ? 'General staff have only Knowledge — they skip the welcome screen and land directly in Knowledge.'
            : 'Users with more than one workspace pick where to start. Recent threads are listed for each.'}
        >
          {role === 'general' ? (
            <>
              <DCArtboard id="wel-skip-l" label="Skipped → Knowledge · Light" width={W} height={H}><KnowledgeScreen theme="light" roleId="general" /></DCArtboard>
              <DCArtboard id="wel-skip-d" label="Skipped → Knowledge · Dark" width={W} height={H}><KnowledgeScreen theme="dark" roleId="general" /></DCArtboard>
            </>
          ) : (
            <>
              <DCArtboard id="wel-l" label={`Welcome · ${ROLE_LABELS[role]} · Light`} width={W} height={H}><WelcomeScreen theme="light" roleId={role} /></DCArtboard>
              <DCArtboard id="wel-d" label={`Welcome · ${ROLE_LABELS[role]} · Dark`} width={W} height={H}><WelcomeScreen theme="dark" roleId={role} /></DCArtboard>
            </>
          )}
          {/* Reference: every role's welcome view, side by side */}
          <DCArtboard id="wel-ref-rd" label="Reference · R&D" width={W} height={H}><WelcomeScreen theme="light" roleId="rd" /></DCArtboard>
          <DCArtboard id="wel-ref-dli" label="Reference · DLI" width={W} height={H}><WelcomeScreen theme="light" roleId="dli" /></DCArtboard>
          <DCArtboard id="wel-ref-fx" label="Reference · Forensics" width={W} height={H}><WelcomeScreen theme="light" roleId="forensics" /></DCArtboard>
          <DCArtboard id="wel-ref-ad" label="Reference · Admin" width={W} height={H}><WelcomeScreen theme="light" roleId="admin" /></DCArtboard>
        </DCSection>

        <DCSection id="knowledge" title="3 · Knowledge" subtitle="Available to all approved staff. Document-grounded drafting, summarization, comparison, translation.">
          <DCArtboard id="kn-home-l" label="Home · Light" width={W} height={H}><KnowledgeScreen theme="light" roleId={role} /></DCArtboard>
          <DCArtboard id="kn-home-d" label="Home · Dark" width={W} height={H}><KnowledgeScreen theme="dark" roleId={role} /></DCArtboard>
          <DCArtboard id="kn-chat-l" label="Active conversation · Light" width={W} height={H}><ActiveChatScreen theme="light" roleId={role} /></DCArtboard>
          <DCArtboard id="kn-chat-d" label="Active conversation · Dark" width={W} height={H}><ActiveChatScreen theme="dark" roleId={role} /></DCArtboard>
          <DCArtboard id="kn-clear-l" label="Clear session" width={W} height={H}><ClearSessionModal theme="light" roleId={role} /></DCArtboard>
        </DCSection>

        {has('coding') && (
          <DCSection id="coding" title="4 · Coding" subtitle="R&D access. Review, refactor, generate tests, explain stacks. Code files only.">
            <DCArtboard id="cd-l" label="Active conversation · Light" width={W} height={H}><CodingScreen theme="light" roleId={role} /></DCArtboard>
            <DCArtboard id="cd-d" label="Active conversation · Dark" width={W} height={H}><CodingScreen theme="dark" roleId={role} /></DCArtboard>
          </DCSection>
        )}

        {has('dialect') && (
          <DCSection id="dialect" title="5 · Dialect" subtitle="DLI and Forensics. Hausa, Kanuri, Fulfulde — transcribed and translated. Upload-first, async.">
            <DCArtboard id="di-home-l" label="Upload home · Light" width={W} height={H}><DialectScreen theme="light" roleId={role} /></DCArtboard>
            <DCArtboard id="di-home-d" label="Upload home · Dark" width={W} height={H}><DialectScreen theme="dark" roleId={role} /></DCArtboard>
            <DCArtboard id="di-res-l" label="Completed result · Light" width={W} height={H}><DialectResultScreen theme="light" roleId={role} /></DCArtboard>
            <DCArtboard id="di-res-d" label="Completed result · Dark" width={W} height={H}><DialectResultScreen theme="dark" roleId={role} /></DCArtboard>
          </DCSection>
        )}

        {has('forensics') && (
          <DCSection id="forensics" title="6 · Forensics Intelligence" subtitle="Forensics only. Logs, reports, archives, artifacts — structured into findings.">
            <DCArtboard id="fx-home-l" label="Upload home · Light" width={W} height={H}><ForensicsScreen theme="light" roleId={role} /></DCArtboard>
            <DCArtboard id="fx-home-d" label="Upload home · Dark" width={W} height={H}><ForensicsScreen theme="dark" roleId={role} /></DCArtboard>
            <DCArtboard id="fx-res-l" label="Completed result · Light" width={W} height={H}><ForensicsResultScreen theme="light" roleId={role} /></DCArtboard>
            <DCArtboard id="fx-res-d" label="Completed result · Dark" width={W} height={H}><ForensicsResultScreen theme="dark" roleId={role} /></DCArtboard>
          </DCSection>
        )}

        <DCSection id="account" title="7 · Files & account" subtitle="Shared 500 MB quota across all workspaces. Profile is admin-managed for v1.">
          <DCArtboard id="files-l" label="Files & storage · Light" width={W} height={H}><FilesScreen theme="light" roleId={role} /></DCArtboard>
          <DCArtboard id="files-d" label="Files & storage · Dark" width={W} height={H}><FilesScreen theme="dark" roleId={role} /></DCArtboard>
          <DCArtboard id="files-near" label="Storage near limit" width={W} height={H}><FilesScreen theme="light" roleId={role} variant="near" /></DCArtboard>
          <DCArtboard id="files-full" label="Storage full" width={W} height={H}><FilesScreen theme="light" roleId={role} variant="full" /></DCArtboard>
          <DCArtboard id="files-empty" label="Empty state" width={W} height={H}><FilesScreen theme="dark" roleId={role} variant="empty" /></DCArtboard>
          <DCArtboard id="files-del" label="Delete file confirmation" width={W} height={H}><DeleteFileModal theme="light" roleId={role} /></DCArtboard>

          <DCArtboard id="acc-l" label="Account & settings · Light" width={W} height={H}><AccountScreen theme="light" roleId={role} /></DCArtboard>
          <DCArtboard id="acc-d" label="Account & settings · Dark" width={W} height={H}><AccountScreen theme="dark" roleId={role} /></DCArtboard>
        </DCSection>

        {isAdmin && (
          <DCSection id="admin" title="8 · Admin" subtitle="Visible only to platform admins. Switch role to Admin to see it.">
            <DCArtboard id="ad-users-l" label="Users · Light" width={W} height={H}><AdminUsersScreen theme="light" /></DCArtboard>
            <DCArtboard id="ad-users-d" label="Users · Dark" width={W} height={H}><AdminUsersScreen theme="dark" /></DCArtboard>
            <DCArtboard id="ad-approve" label="Approve user modal" width={W} height={H}><ApproveUserModal theme="light" /></DCArtboard>
            <DCArtboard id="ad-disable" label="Disable account modal" width={W} height={H}><DisableUserModal theme="light" /></DCArtboard>
            <DCArtboard id="ad-policy-l" label="Access policies · Light" width={W} height={H}><AccessPoliciesScreen theme="light" /></DCArtboard>
            <DCArtboard id="ad-policy-d" label="Access policies · Dark" width={W} height={H}><AccessPoliciesScreen theme="dark" /></DCArtboard>
            <DCArtboard id="ad-audit-l" label="Audit log · Light" width={W} height={H}><AuditLogScreen theme="light" /></DCArtboard>
            <DCArtboard id="ad-audit-d" label="Audit log · Dark" width={W} height={H}><AuditLogScreen theme="dark" /></DCArtboard>
          </DCSection>
        )}

        <DCSection id="states" title="9 · System states" subtitle="Loading, empty, error, offline, quota, account, forbidden, upload rejection, job lifecycle.">
          <DCArtboard id="st-l" label="States · Light" width={W} height={H}><GlobalStatesScreen theme="light" /></DCArtboard>
          <DCArtboard id="st-d" label="States · Dark" width={W} height={H}><GlobalStatesScreen theme="dark" /></DCArtboard>
        </DCSection>

      </DesignCanvas>

      <TweaksPanel title="Andal · Tweaks">
        <TweakSection label="Viewing as" />
        <TweakRadio
          label="Role"
          value={t.role}
          options={['general','rd','dli','forensics','admin']}
          onChange={(v) => setTweak('role', v)}
        />
        <div style={{
          fontSize: 10.5,
          color: 'rgba(41,38,27,.55)',
          padding: '2px 2px 0',
          lineHeight: 1.45,
        }}>
          {role === 'general' && 'Knowledge only · skips the welcome picker'}
          {role === 'rd'      && 'Knowledge + Coding'}
          {role === 'dli'     && 'Knowledge + Dialect'}
          {role === 'forensics' && 'Knowledge + Dialect + Forensics'}
          {role === 'admin'   && 'All workspaces + admin tools'}
        </div>

        <TweakSection label="Feel" />
        <TweakColor
          label="Accent palette"
          value={t.accent}
          options={ACCENT_SWATCHES.map(([, hex]) => hex)}
          onChange={(hex) => {
            const found = ACCENT_SWATCHES.find(([, h]) => h === hex);
            if (found) setTweak('accent', found[0]);
          }}
        />
        <TweakRadio
          label="Density"
          value={t.density}
          options={['compact', 'comfortable', 'spacious']}
          onChange={(v) => setTweak('density', v)}
        />
      </TweaksPanel>
    </>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
