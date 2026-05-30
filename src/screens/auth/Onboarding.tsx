import { Shell } from '../../components/Shell';
import { I } from '../../components/icons';
import { useNav } from '../../nav/NavContext';
import { ROLES } from '../../data/roles';
import type { Theme } from '../../types';
import { AuthLeft } from './AuthLeft';

export const OnboardingScreen = ({ theme = 'light' }: { theme?: Theme }) => {
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
          <div className="a-auth__form" style={{ maxWidth: 420 }}>
            <div className="row" style={{ gap: 8 }}>
              <span className="a-pill ok">
                <span className="dot" />
                APPROVED
              </span>
              <span className="mono-meta">ACCOUNT · ACTIVE</span>
            </div>

            <div className="col" style={{ gap: 8 }}>
              <h1 className="a-auth__title">Welcome to Andal, Adamu.</h1>
              <p className="a-auth__sub" style={{ fontSize: 14 }}>
                Your Andal account has been approved. You have access to the following Andal modules.
              </p>
            </div>

            <div className="a-card" style={{ padding: 0, overflow: 'hidden' }}>
              <div
                style={{
                  padding: '12px 14px',
                  display: 'grid',
                  gridTemplateColumns: '90px 1fr',
                  gap: '8px 14px',
                  fontSize: 13,
                }}
              >
                <div className="mono-meta">NAME</div>
                <div>Adamu Bashir</div>
                <div className="mono-meta">EMAIL</div>
                <div className="mono" style={{ fontSize: 12 }}>
                  a.bashir@nccc.gov.ng
                </div>
                <div className="mono-meta">DEPARTMENT</div>
                <div>Research &amp; Development</div>
                <div className="mono-meta">ACCESS</div>
                <div>Standard staff</div>
              </div>
              <div style={{ borderTop: '1px solid var(--border-soft)', padding: '12px 14px' }}>
                <div className="mono-meta" style={{ marginBottom: 8 }}>
                  MODULES AVAILABLE
                </div>
                <div className="col" style={{ gap: 6 }}>
                  <div className="row" style={{ gap: 8 }}>
                    {I.book}
                    <span style={{ flex: 1 }}>Andal Knowledge</span>
                    <span className="a-pill ok mono">
                      <span className="dot" />
                      READY
                    </span>
                  </div>
                  <div className="row" style={{ gap: 8 }}>
                    {I.code}
                    <span style={{ flex: 1 }}>Andal Coding</span>
                    <span className="a-pill ok mono">
                      <span className="dot" />
                      READY
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <button className="a-btn primary lg" style={{ width: '100%' }} onClick={onEnter}>
              Enter Andal {I.arrow}
            </button>

            <div className="a-auth__foot">
              PROFILE &amp; ACCESS MANAGED BY ANDAL ADMINISTRATORS · V1
            </div>
          </div>
        </div>
      </div>
    </Shell>
  );
};
