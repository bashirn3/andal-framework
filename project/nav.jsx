/* global React */

// Shared navigation context for the interactive prototype.
// In canvas mode (no provider), useNav() returns null and components no-op clicks.
const NavContext = React.createContext(null);
const useNav = () => React.useContext(NavContext);

// Letterboxed 1440 × 900 stage. Scales to fit any viewport.
function Stage({ children, bg = '#0a0b09' }) {
  const [scale, setScale] = React.useState(1);
  React.useEffect(() => {
    const update = () => {
      const s = Math.min(window.innerWidth / 1440, window.innerHeight / 900);
      setScale(s);
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);
  return (
    <div style={{
      position: 'fixed', inset: 0, background: bg, overflow: 'hidden',
    }}>
      <div style={{
        position: 'absolute', top: '50%', left: '50%',
        width: 1440, height: 900,
        transform: `translate(-50%, -50%) scale(${scale})`,
        transformOrigin: 'center center',
        boxShadow: '0 30px 80px rgba(0,0,0,.5)',
      }}>
        {children}
      </div>
    </div>
  );
}

Object.assign(window, { NavContext, useNav, Stage });
