/* global React */

// ===== Icons (subset, mobile-tuned) =====
const MI_Icon = ({ d, size = 22, ...rest }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" {...rest}>
    {Array.isArray(d) ? d.map((p, i) => <path key={i} d={p} />) : <path d={d} />}
  </svg>
);

const MI = {
  book:     <MI_Icon d="M4 5a2 2 0 0 1 2-2h12v18H6a2 2 0 0 1-2-2zM20 17H6" />,
  code:     <MI_Icon d={["M8 8 4 12l4 4", "M16 8l4 4-4 4", "M14 4l-4 16"]} />,
  voice:    <MI_Icon d={["M12 3v12", "M9 6v6", "M15 6v6", "M6 9v3", "M18 9v3", "M5 18h14", "M12 18v3"]} />,
  shield:   <MI_Icon d={["M12 3l8 3v6c0 4.5-3.4 8.4-8 9-4.6-.6-8-4.5-8-9V6z", "M9 12l2 2 4-4"]} />,
  back:     <MI_Icon d={["M15 6l-6 6 6 6"]} />,
  chevR:    <MI_Icon d="M9 7l5 5-5 5" size={18} />,
  chev:     <MI_Icon d="M7 9l5 5 5-5" size={18} />,
  plus:     <MI_Icon d={["M12 5v14", "M5 12h14"]} />,
  send:     <MI_Icon d={["M12 19V5", "M5 12l7-7 7 7"]} size={18} />,
  attach:   <MI_Icon d="M21 12.5l-9 9a5 5 0 0 1-7-7l9-9a3.5 3.5 0 0 1 5 5l-9 9a2 2 0 1 1-3-3l8-8" size={20} />,
  mic:      <MI_Icon d={["M12 14a3 3 0 0 0 3-3V6a3 3 0 0 0-6 0v5a3 3 0 0 0 3 3z", "M19 11a7 7 0 0 1-14 0", "M12 18v3"]} />,
  upload:   <MI_Icon d={["M12 4v12", "M7 9l5-5 5 5", "M4 20h16"]} />,
  folder:   <MI_Icon d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />,
  user:     <MI_Icon d={["M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8z", "M4 21a8 8 0 0 1 16 0"]} />,
  home:     <MI_Icon d={["M3 12l9-8 9 8", "M5 10v10h14V10"]} />,
  cog:      <MI_Icon d={["M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z", "M19.4 15a1.6 1.6 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.6 1.6 0 0 0-1.8-.3 1.6 1.6 0 0 0-1 1.5V21a2 2 0 0 1-4 0v-.1a1.6 1.6 0 0 0-1-1.5 1.6 1.6 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.6 1.6 0 0 0 .3-1.8 1.6 1.6 0 0 0-1.5-1H3a2 2 0 0 1 0-4h.1a1.6 1.6 0 0 0 1.5-1 1.6 1.6 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.6 1.6 0 0 0 1.8.3H9a1.6 1.6 0 0 0 1-1.5V3a2 2 0 0 1 4 0v.1a1.6 1.6 0 0 0 1 1.5 1.6 1.6 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.6 1.6 0 0 0-.3 1.8V9a1.6 1.6 0 0 0 1.5 1H21a2 2 0 0 1 0 4h-.1a1.6 1.6 0 0 0-1.5 1z"]} />,
  signout:  <MI_Icon d={["M9 4H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h4", "M16 17l5-5-5-5", "M21 12H9"]} />,
  search:   <MI_Icon d={["M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16z", "M21 21l-4.3-4.3"]} />,
  more:     <MI_Icon d={["M12 5h.01", "M12 12h.01", "M12 19h.01"]} />,
  trash:    <MI_Icon d={["M4 7h16", "M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2", "M6 7l1 13a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2l1-13"]} />,
  copy:     <MI_Icon d={["M9 9h10v10H9z", "M5 15V5h10"]} />,
  download: <MI_Icon d={["M12 4v12", "M17 11l-5 5-5-5", "M4 20h16"]} />,
  check:    <MI_Icon d="M5 12l5 5L20 7" />,
  bell:     <MI_Icon d={["M6 8a6 6 0 0 1 12 0c0 7 3 8 3 8H3s3-1 3-8", "M10 21a2 2 0 0 0 4 0"]} />,
  globe:    <MI_Icon d={["M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18z", "M3 12h18", "M12 3a14 14 0 0 1 0 18", "M12 3a14 14 0 0 0 0 18"]} />,
  clock:    <MI_Icon d={["M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18z", "M12 7v5l3 2"]} size={16} />,
  file:     <MI_Icon d={["M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z", "M14 3v6h6"]} size={18} />,
};

// ===== Roles (mirror desktop) =====
const M_ROLES = {
  general: { id: 'general', name: 'Tunde Lawal', initials: 'TL', role: 'General staff', dept: 'Office of the SA', modules: ['knowledge'] },
  rd:      { id: 'rd',      name: 'Adamu Bashir', initials: 'AB', role: 'R&D engineer', dept: 'Research & Development', modules: ['knowledge', 'coding'] },
  dli:     { id: 'dli',     name: 'Folake Okeke', initials: 'FO', role: 'DLI analyst', dept: 'Dialect & Language Intelligence', modules: ['knowledge', 'dialect'] },
  forensics:{id: 'forensics',name: 'Mahmoud Tanko',initials: 'MT', role: 'Forensics lead', dept: 'Digital Forensics', modules: ['knowledge', 'dialect', 'forensics'] },
};

const M_MODULES = [
  { id: 'knowledge', name: 'Knowledge',             icon: MI.book,   desc: 'Draft, summarize, compare, translate.' },
  { id: 'coding',    name: 'Coding',                icon: MI.code,   desc: 'Review code, refactor, generate tests.' },
  { id: 'dialect',   name: 'Dialect',               icon: MI.voice,  desc: 'Transcribe & translate Hausa, Kanuri, Fulfulde.' },
  { id: 'forensics', name: 'Forensics Intelligence',icon: MI.shield, desc: 'Logs, reports, artifacts → structured findings.' },
];

const M_CONVOS = {
  knowledge: [
    { title: 'Procurement clause comparison', time: '2h' },
    { title: 'Q1 status memo · draft', time: '1d' },
    { title: 'Standards translation', time: '3d' },
  ],
  coding: [
    { title: 'Loader refactor · pipeline.py', time: '12m' },
    { title: 'k8s manifest review', time: '2h' },
  ],
  dialect: [
    { title: 'Field interview · Maiduguri 02', time: '20m' },
    { title: 'Press conference · Kano', time: '3h' },
  ],
  forensics: [
    { title: 'auth-failures · gateway-01', time: '3h' },
    { title: 'NTP-incident · 18 May', time: '1d' },
  ],
};

// ===== Phone frame & screen =====
// Outer wrapper centers + scales the fixed-size phone to fit any viewport
// (mirrors the desktop Stage pattern).
const PhoneFrame = ({ children }) => {
  const W = 414;   // phone outer (frame chrome included)
  const H = 868;
  const [scale, setScale] = React.useState(1);
  React.useEffect(() => {
    const update = () => {
      const margin = 24;
      const s = Math.min(
        (window.innerWidth - margin) / W,
        (window.innerHeight - margin) / H,
        1
      );
      setScale(s > 0 ? s : 1);
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);
  return (
    <div className="m-stage">
      <div style={{
        width: W, height: H,
        transform: `scale(${scale})`,
        transformOrigin: 'center center',
        display: 'flex',
      }}>
        <div className="m-phone">
          <div className="m-screen andal-m">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

// ===== Status bar =====
const StatusBar = () => (
  <div className="m-status">
    <span>9:41</span>
    <div className="m-status__right">
      <span className="m-status__bars">
        <i style={{height: 3}} /><i style={{height: 5}} /><i style={{height: 7}} /><i style={{height: 9}} />
      </span>
      <svg width="14" height="10" viewBox="0 0 14 10" style={{display:'block'}}>
        <path d="M7 2.5a4 4 0 0 1 2.8 1.15L7 7 4.2 3.65A4 4 0 0 1 7 2.5z" fill="currentColor"/>
      </svg>
      <span className="m-status__battery"><i /></span>
    </div>
  </div>
);

// ===== App bar =====
const AppBar = ({ title, onBack, actions }) => (
  <div className="m-appbar">
    {onBack && (
      <button className="m-iconbtn m-iconbtn--back" onClick={onBack} aria-label="Back">{MI.back}</button>
    )}
    <div className="m-appbar__title">{title}</div>
    {actions}
  </div>
);

// ===== Bottom tabs =====
const BottomTabs = ({ tab, onTab }) => (
  <div className="m-tabs">
    {[
      ['home',    'Home',    MI.home],
      ['files',   'Files',   MI.folder],
      ['account', 'Account', MI.user],
    ].map(([id, label, icon]) => (
      <button key={id} className={tab === id ? 'active' : ''} onClick={() => onTab(id)}>
        {icon}
        <span className="m-tabs__label">{label}</span>
      </button>
    ))}
  </div>
);

// ===== Brand row =====
const Brand = ({ sub }) => (
  <div style={{display:'flex', alignItems:'center', gap:10}}>
    <div className="m-logo">A</div>
    <div style={{display:'flex', flexDirection:'column', lineHeight:1.15}}>
      <div style={{fontSize:15, fontWeight:500}}>Andal</div>
      {sub && <div className="mono" style={{fontSize:10, color:'var(--fg-3)'}}>{sub}</div>}
    </div>
  </div>
);

Object.assign(window, {
  MI, M_ROLES, M_MODULES, M_CONVOS,
  PhoneFrame, StatusBar, AppBar, BottomTabs, Brand,
});
