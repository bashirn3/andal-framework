/* global React, I */

const AuthLeft = ({ minimal = false }) => {
  // Minimal mode (login screen): just ONSA + NCCC logos, centered, no marketing copy.
  if (minimal) {
    return (
      <div className="a-auth__left a-auth__left--minimal">
        <div className="a-auth__logos">
          <div className="a-auth__logo-block">
            <div className="a-logo-stamp-lg mono">ONSA<br/>LOGO</div>
            <div className="mono-meta">ONSA</div>
          </div>
          <div className="a-auth__logo-divider" />
          <div className="a-auth__logo-block">
            <div className="a-logo-stamp-lg mono">NCCC<br/>LOGO</div>
            <div className="mono-meta">NCCC</div>
          </div>
        </div>
        <div style={{marginTop: 'auto'}}>
          <div className="a-auth__meta">
            <span>BUILT BY R&amp;D AND NCCC</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="a-auth__left">
      <div className="a-auth__brandrow">
        <div className="a-logo">A</div>
        <div className="col" style={{lineHeight:1.1}}>
          <div className="a-brand-text">Andal</div>
          <div className="a-brand-sub mono">NCCC · v1.0</div>
        </div>
        <div className="row" style={{marginLeft: 'auto', gap: 6}}>
          <span className="a-logo-stamp mono">ONSA LOGO</span>
          <span className="a-logo-stamp mono">NCCC LOGO</span>
        </div>
      </div>

      <div className="a-auth__quote">
        <h2>Andal.</h2>
        <p>The NCCC internal AI workspace.</p>
      </div>

      <div className="col" style={{gap: 10, marginTop: 32}}>
        <div className="row" style={{gap: 12, alignItems: 'flex-start'}}>
          <span style={{color: 'var(--fg-3)', marginTop: 2}}>{I.book}</span>
          <div className="col" style={{lineHeight: 1.35}}>
            <span style={{fontSize: 14}}>Knowledge</span>
            <span style={{fontSize: 12.5, color: 'var(--fg-3)'}}>Draft, summarize, compare, translate.</span>
          </div>
        </div>
        <div className="row" style={{gap: 12, alignItems: 'flex-start'}}>
          <span style={{color: 'var(--fg-3)', marginTop: 2}}>{I.code}</span>
          <div className="col" style={{lineHeight: 1.35}}>
            <span style={{fontSize: 14}}>Coding</span>
            <span style={{fontSize: 12.5, color: 'var(--fg-3)'}}>Review, refactor, generate tests.</span>
          </div>
        </div>
        <div className="row" style={{gap: 12, alignItems: 'flex-start'}}>
          <span style={{color: 'var(--fg-3)', marginTop: 2}}>{I.voice}</span>
          <div className="col" style={{lineHeight: 1.35}}>
            <span style={{fontSize: 14}}>Dialect</span>
            <span style={{fontSize: 12.5, color: 'var(--fg-3)'}}>Hausa, Kanuri, Fulfulde — transcribed and translated.</span>
          </div>
        </div>
        <div className="row" style={{gap: 12, alignItems: 'flex-start'}}>
          <span style={{color: 'var(--fg-3)', marginTop: 2}}>{I.shield}</span>
          <div className="col" style={{lineHeight: 1.35}}>
            <span style={{fontSize: 14}}>Forensics Intelligence</span>
            <span style={{fontSize: 12.5, color: 'var(--fg-3)'}}>Logs, reports, artifacts — structured into findings.</span>
          </div>
        </div>
      </div>

      <div style={{marginTop: 'auto'}}>
        <div className="a-auth__meta">
          <span>BUILT BY R&amp;D AND NCCC</span>
        </div>
      </div>
    </div>
  );
};

// ===== 1. Login =====
const LoginScreen = ({ theme = 'light', variant = 'default' }) => {
  const nav = useNav();
  const onSignIn = () => {
    if (!nav) return;
    const r = ROLES[nav.role];
    // General staff (single workspace) skip the picker
    if (r.modules.length === 1) nav.navigate('/knowledge');
    else nav.navigate('/welcome');
  };
  const showInvalid = variant === 'invalid';
  const showPending = variant === 'pending';
  const showDisabled = variant === 'disabled';
  return (
    <Shell theme={theme}>
      <div className="a-auth">
        <AuthLeft minimal />
        <div className="a-auth__right">
          <div className="a-auth__form">
            <div className="col" style={{gap: 6}}>
              <h1 className="a-auth__title">Sign in to Andal</h1>
              <p className="a-auth__sub">Use your Andal account credentials.</p>
            </div>

            {showInvalid && (
              <div className="a-auth__notice" style={{borderColor: 'var(--danger)', color: 'var(--danger)', background: 'var(--danger-soft)'}}>
                The email or password you entered is incorrect.
              </div>
            )}
            {showPending && (
              <div className="a-auth__notice" style={{borderColor: 'var(--warn)', color: 'var(--warn)', background: 'var(--warn-soft)'}}>
                <strong style={{display:'block', marginBottom: 2, color:'var(--fg)'}}>Account pending approval</strong>
                Your account is awaiting administrator review. You'll receive an email once it is approved.
              </div>
            )}
            {showDisabled && (
              <div className="a-auth__notice" style={{borderColor: 'var(--danger)', background: 'var(--danger-soft)'}}>
                <strong style={{display:'block', marginBottom: 2, color:'var(--fg)'}}>Account disabled</strong>
                Contact a platform administrator to restore access.
              </div>
            )}

            <div className="col" style={{gap: 14}}>
              <div className="a-field">
                <label className="a-label">Work email</label>
                <input className={`a-input ${showInvalid ? 'error' : ''}`} defaultValue="a.bashir@nccc.gov.ng" />
              </div>
              <div className="a-field">
                <div className="row" style={{justifyContent: 'space-between'}}>
                  <label className="a-label">Password</label>
                  <span className="a-link" style={{fontSize: 12}}>Forgot password?</span>
                </div>
                <input type="password" className={`a-input ${showInvalid ? 'error' : ''}`} defaultValue="••••••••••••" />
              </div>
            </div>

            <button className="a-btn primary lg" style={{width: '100%'}} onClick={onSignIn}>Sign in</button>

            <div className="a-auth__divider">or</div>
            <div className="row" style={{justifyContent: 'center', fontSize: 13, color: 'var(--fg-2)'}}>
              New to Andal?&nbsp;<span className="a-link" onClick={nav ? () => nav.navigate('/signup') : undefined}>Create account</span>
            </div>

            <div className="a-auth__foot">FOR NCCC INTERNAL USE ONLY.</div>
          </div>
        </div>
      </div>
    </Shell>
  );
};

// ===== 2. Signup =====
const SignupScreen = ({ theme = 'light', variant = 'default' }) => {
  const nav = useNav();
  const showMismatch = variant === 'mismatch';
  const showExists = variant === 'exists';
  return (
    <Shell theme={theme}>
      <div className="a-auth">
        <AuthLeft minimal />
        <div className="a-auth__right">
          <div className="a-auth__form" style={{maxWidth: 400}}>
            <div className="col" style={{gap: 6}}>
              <h1 className="a-auth__title">Create an Andal account</h1>
              <p className="a-auth__sub">Your account will require admin approval before you can access Andal.</p>
            </div>

            {showExists && (
              <div className="a-auth__notice" style={{borderColor: 'var(--danger)', background: 'var(--danger-soft)'}}>
                An account with this email already exists. <span className="a-link">Sign in instead</span>.
              </div>
            )}

            <div className="col" style={{gap: 12}}>
              <div className="a-field">
                <label className="a-label">Full name</label>
                <input className="a-input" defaultValue="Adamu Bashir" />
              </div>
              <div className="a-field">
                <label className="a-label">Work email</label>
                <input className={`a-input ${showExists ? 'error' : ''}`} defaultValue="a.bashir@nccc.gov.ng" />
              </div>
              <div className="a-field">
                <label className="a-label">Staff ID <span style={{color: 'var(--fg-4)'}}>· optional</span></label>
                <input className="a-input mono" placeholder="e.g. NCCC-04217" />
              </div>
              <div className="row" style={{gap: 10}}>
                <div className="a-field" style={{flex: 1}}>
                  <label className="a-label">Password</label>
                  <input type="password" className={`a-input ${showMismatch ? 'error' : ''}`} defaultValue="••••••••••" />
                </div>
                <div className="a-field" style={{flex: 1}}>
                  <label className="a-label">Confirm</label>
                  <input type="password" className={`a-input ${showMismatch ? 'error' : ''}`} defaultValue="••••••••" />
                </div>
              </div>
              {showMismatch && <div className="a-help error">Passwords do not match.</div>}
            </div>

            <div className="a-auth__notice">
              An administrator will assign your department and module access. You won't be asked to choose those here.
            </div>

            <button className="a-btn primary lg" style={{width: '100%'}}
              onClick={nav ? () => nav.navigate('/pending') : undefined}>Create account</button>

            <div className="row" style={{justifyContent: 'center', fontSize: 13, color: 'var(--fg-2)'}}>
              Already have an account?&nbsp;<span className="a-link" onClick={nav ? () => nav.navigate('/login') : undefined}>Sign in</span>
            </div>
          </div>
        </div>
      </div>
    </Shell>
  );
};

// ===== 3. Pending approval =====
const PendingScreen = ({ theme = 'light' }) => {
  const nav = useNav();
  return (
  <Shell theme={theme}>
    <div className="a-auth">
      <AuthLeft minimal />
      <div className="a-auth__right">
        <div className="a-auth__form">
          <div className="row" style={{gap: 8}}>
            <span className="a-pill warn"><span className="dot" />PENDING</span>
            <span className="mono-meta">ACCOUNT · #NEW-04217</span>
          </div>

          <div className="col" style={{gap: 10}}>
            <h1 className="a-auth__title">Account pending approval</h1>
            <p className="a-auth__sub" style={{fontSize: 14, lineHeight: 1.55}}>
              Your account has been created. An administrator must approve your account and assign your department before you can access Andal.
            </p>
          </div>

          <div className="a-card" style={{padding: 14}}>
            <div className="mono-meta" style={{marginBottom: 10}}>NEXT STEPS</div>
            <ol style={{margin: 0, paddingLeft: 18, color: 'var(--fg-2)', fontSize: 13, lineHeight: 1.7}}>
              <li>An administrator reviews your profile.</li>
              <li>Your department and module access are assigned.</li>
              <li>You'll receive a confirmation email at <span className="mono" style={{color: 'var(--fg)'}}>a.bashir@nccc.gov.ng</span>.</li>
            </ol>
          </div>

          <div className="row" style={{gap: 8}}>
            <button className="a-btn" onClick={nav ? () => nav.navigate('/login') : undefined}>Return to sign in</button>
            <button className="a-btn ghost">Check status</button>
          </div>

          <div className="a-auth__foot">TYPICAL REVIEW · 1 BUSINESS DAY</div>
        </div>
      </div>
    </div>
  </Shell>
  );
};

// ===== 4. First approved onboarding =====
const OnboardingScreen = ({ theme = 'light' }) => {
  const nav = useNav();
  const onEnter = () => {
    if (!nav) return;
    const r = ROLES[nav.role];
    if (r.modules.length === 1) nav.navigate('/knowledge');
    else nav.navigate('/welcome');
  };
  return (
  <Shell theme={theme}>
    <div className="a-auth">
      <AuthLeft minimal />
      <div className="a-auth__right">
        <div className="a-auth__form" style={{maxWidth: 420}}>
          <div className="row" style={{gap: 8}}>
            <span className="a-pill ok"><span className="dot" />APPROVED</span>
            <span className="mono-meta">ACCOUNT · ACTIVE</span>
          </div>

          <div className="col" style={{gap: 8}}>
            <h1 className="a-auth__title">Welcome to Andal, Adamu.</h1>
            <p className="a-auth__sub" style={{fontSize: 14}}>
              Your Andal account has been approved. You have access to the following Andal modules.
            </p>
          </div>

          <div className="a-card" style={{padding: 0, overflow: 'hidden'}}>
            <div style={{padding: '12px 14px', display:'grid', gridTemplateColumns: '90px 1fr', gap: '8px 14px', fontSize: 13}}>
              <div className="mono-meta">NAME</div><div>Adamu Bashir</div>
              <div className="mono-meta">EMAIL</div><div className="mono" style={{fontSize: 12}}>a.bashir@nccc.gov.ng</div>
              <div className="mono-meta">DEPARTMENT</div><div>Research & Development</div>
              <div className="mono-meta">ACCESS</div><div>Standard staff</div>
            </div>
            <div style={{borderTop: '1px solid var(--border-soft)', padding: '12px 14px'}}>
              <div className="mono-meta" style={{marginBottom: 8}}>MODULES AVAILABLE</div>
              <div className="col" style={{gap: 6}}>
                <div className="row" style={{gap: 8}}>{I.book}<span style={{flex:1}}>Andal Knowledge</span><span className="a-pill ok mono"><span className="dot"/>READY</span></div>
                <div className="row" style={{gap: 8}}>{I.code}<span style={{flex:1}}>Andal Coding</span><span className="a-pill ok mono"><span className="dot"/>READY</span></div>
              </div>
            </div>
          </div>

          <button className="a-btn primary lg" style={{width: '100%'}} onClick={onEnter}>
            Enter Andal {I.arrow}
          </button>

          <div className="a-auth__foot">PROFILE &amp; ACCESS MANAGED BY ANDAL ADMINISTRATORS · V1</div>
        </div>
      </div>
    </div>
  </Shell>
  );
};

Object.assign(window, { LoginScreen, SignupScreen, PendingScreen, OnboardingScreen });
