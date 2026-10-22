import { useEffect, useMemo, useRef, useState } from 'react';
import createGlobe from 'cobe';
import { Drone, Orbit, Plane, Rocket, Satellite, Cog } from 'lucide-react';
import mark from '../assets/mark_white.png';

/* ---------- Meteors: short streaks crossing a card (Aceternity-style) ---------- */
export function Meteors({ number = 10, className = '' }) {
  const meteors = useMemo(
    () =>
      Array.from({ length: number }, () => ({
        left: Math.floor(Math.random() * 110) - 10 + '%',
        delay: (Math.random() * 6).toFixed(2) + 's',
        dur: (Math.random() * 4 + 3).toFixed(2) + 's'
      })),
    [number]
  );
  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden rounded-[inherit] ${className}`} aria-hidden>
      {meteors.map((m, i) => (
        <span key={i} className="sm-meteor" style={{ left: m.left, animationDelay: m.delay, animationDuration: m.dur }} />
      ))}
    </div>
  );
}

/* ---------- Glow backdrop: soft nebula light behind a section ---------- */
export function Nebula({ className = '', tone = 'mix' }) {
  const bg =
    tone === 'flame'
      ? 'radial-gradient(40% 50% at 50% 50%, rgba(123,44,191,0.16), transparent 70%)'
      : tone === 'print'
        ? 'radial-gradient(40% 50% at 50% 50%, rgba(142,216,255,0.13), transparent 70%)'
        : 'radial-gradient(35% 45% at 35% 45%, rgba(142,216,255,0.10), transparent 70%), radial-gradient(30% 40% at 70% 60%, rgba(123,44,191,0.10), transparent 70%)';
  return <div aria-hidden className={`pointer-events-none absolute -z-[1] blur-2xl ${className}`} style={{ background: bg }} />;
}

/* ---------- Orbit system: domains circling the SpaceMinds planet ---------- */
const DOMAIN_ICONS = [Plane, Orbit, Rocket, Drone, Satellite, Cog];
export function OrbitSystem({ domains, icons = DOMAIN_ICONS }) {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[520px] overflow-x-clip p-[clamp(40px,13%,72px)] [perspective:1200px]" aria-hidden>
      <div className="relative h-full w-full [transform-style:preserve-3d]">
      <div className="absolute inset-[31%] rounded-full bg-[radial-gradient(circle_at_35%_30%,#123a6b,#041A33_55%,#02060F)] shadow-[0_0_120px_rgba(142,216,255,0.25),inset_-20px_-30px_60px_rgba(0,0,0,0.6)]" />
      <div className="absolute inset-[30%] flex items-center justify-center">
        <img src={mark} alt="" className="w-[58%] opacity-95" />
      </div>
      {[0, 1].map(k => (
        <div key={k} className="absolute inset-0 [transform-style:preserve-3d]" style={{ transform: `rotateX(64deg) rotateY(${k ? -14 : 8}deg)` }}>
          <div className={`absolute rounded-full border ${k ? 'border-white/10' : 'border-print/25'} [transform-style:preserve-3d] ${k ? 'animate-[sm-spin_60s_linear_infinite_reverse]' : 'animate-[sm-spin_36s_linear_infinite]'}`} style={{ inset: k ? '0%' : '6%' }}>
            {!k &&
              domains.map((d, i) => {
                const a = (i / domains.length) * Math.PI * 2;
                const I = icons[i % icons.length];
                return (
                  <div
                    key={d}
                    className="absolute left-1/2 top-1/2 [transform-style:preserve-3d]"
                    style={{ transform: 'translate(-50%,-50%)', left: `${50 + Math.cos(a) * 50}%`, top: `${50 + Math.sin(a) * 50}%` }}
                  >
                    <div className="animate-[sm-spin_36s_linear_infinite_reverse] [transform-style:preserve-3d]">
                      <div className="flex items-center gap-1.5 whitespace-nowrap rounded-full border border-white/15 bg-void/90 px-2.5 py-1 text-[clamp(11px,2.8vw,13px)] text-hull shadow-[0_0_24px_rgba(142,216,255,0.15)] [transform:rotateX(-64deg)]">
                        <I size={15} strokeWidth={1.6} className="text-ember" />
                        {d}
                      </div>
                    </div>
                  </div>
                );
              })}
            {k === 1 && <span className="absolute left-1/2 top-0 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-ember shadow-[0_0_14px_#9D4EDD]" />}
          </div>
        </div>
      ))}
      </div>
    </div>
  );
}

/* ---------- Mission HUD: live telemetry panel beside the hero rocket ---------- */
export function MissionHUD({ className = '' }) {
  const ref = useRef(null);
  const [t, setT] = useState(0);
  const [alt, setAlt] = useState(0);
  useEffect(() => {
    // 8 updates a second is plenty for readouts, and it pauses when the hero is off screen
    const t0 = performance.now();
    let id = 0;
    let a = 0;
    const start = () => {
      if (id) return;
      id = setInterval(() => {
        const s = (performance.now() - t0) / 1000;
        a += (Math.min(1, s / 3) * 0.9 + window.scrollY * 0.0004) * 4.5;
        setT(s);
        setAlt(a / 60);
      }, 125);
    };
    const stop = () => { clearInterval(id); id = 0; };
    const io = new IntersectionObserver(([e]) => (e.isIntersecting ? start() : stop()));
    if (ref.current) io.observe(ref.current);
    return () => { stop(); io.disconnect(); };
  }, []);
  const mm = String(Math.floor(t / 60)).padStart(2, '0');
  const ss = String(Math.floor(t % 60)).padStart(2, '0');
  const vel = (1.2 + Math.sin(t * 0.7) * 0.05 + Math.min(1, t / 4) * 6.4).toFixed(2);
  return (
    <div ref={ref} className={`w-[220px] rounded-2xl border border-white/10 bg-void/80 p-4 ${className}`} aria-hidden>
      <div className="flex items-center justify-between text-[11px] text-mist">
        <span className="flex items-center gap-1.5"><span className="h-1.5 w-1.5 animate-pulse rounded-full bg-ember" />Live telemetry</span>
        <span className="tabular-nums text-hull">T+{mm}:{ss}</span>
      </div>
      <dl className="mt-3 grid grid-cols-2 gap-3">
        <div><dt className="text-[11px] text-mist">Altitude</dt><dd className="font-display text-lg font-light tabular-nums text-hull">{alt.toFixed(1)}<span className="ml-1 text-[11px] text-mist">km</span></dd></div>
        <div><dt className="text-[11px] text-mist">Velocity</dt><dd className="font-display text-lg font-light tabular-nums text-hull">{vel}<span className="ml-1 text-[11px] text-mist">km/s</span></dd></div>
      </dl>
      <svg viewBox="0 0 200 36" className="mt-3 h-9 w-full">
        <polyline fill="none" stroke="#8ED8FF" strokeOpacity=".7" strokeWidth="1.2" points={Array.from({ length: 41 }, (_, i) => `${i * 5},${18 - Math.sin(i * 0.5 + t * 3) * 7 * Math.exp(-((i - 20) ** 2) / 300)}`).join(' ')} />
      </svg>
      <p className="mt-1 text-[11px] text-mist">Vehicle: PSLV. Scroll to follow the mission.</p>
    </div>
  );
}

/* ---------- Tool schematics: small animated SVG drawings ---------- */
export function ToolArt({ name }) {
  const c = 'stroke-print/70';
  if (name === 'NASA FoilSim')
    return (
      <svg viewBox="0 0 200 80" className="h-20 w-full">
        {[18, 30, 42, 54, 66].map((y, i) => (
          <path key={y} d={`M0 ${y} C 60 ${y} 70 ${y - (i < 2 ? 14 : i === 2 ? 4 : -6)} 110 ${y - (i < 2 ? 12 : i === 2 ? 2 : -4)} S 170 ${y} 200 ${y}`} fill="none" className="sm-flow stroke-print/60" strokeWidth="1" />
        ))}
        <path d="M58 44 C 70 30, 120 30, 150 44 C 120 48, 80 48, 58 44Z" fill="#041A33" className="stroke-hull/80" strokeWidth="1.2" />
      </svg>
    );
  if (name === 'OpenRocket')
    return (
      <svg viewBox="0 0 200 80" className="h-20 w-full">
        <path d="M30 40 L150 30 Q175 40 150 50 Z" fill="#041A33" className="stroke-hull/80" strokeWidth="1.2" />
        <path d="M40 39 L28 22 L52 32 M40 41 L28 58 L52 48" fill="none" className="stroke-hull/60" strokeWidth="1" />
        <g className="sm-bob"><circle cx="96" cy="40" r="5" fill="none" stroke="#C9A0F5" strokeWidth="1.2" /><path d="M96 35v10M91 40h10" stroke="#C9A0F5" strokeWidth="1" /><text x="96" y="66" textAnchor="middle" className="fill-ember text-[9px]">CG</text></g>
        <g><circle cx="72" cy="40" r="5" fill="#8ED8FF" fillOpacity=".25" stroke="#8ED8FF" /><text x="72" y="66" textAnchor="middle" className="fill-print text-[9px]">CP</text></g>
      </svg>
    );
  if (name === 'CEA')
    return (
      <svg viewBox="0 0 200 80" className="h-20 w-full">
        <path d="M20 22 H110 L130 34 L140 20 H160 L140 40 L160 60 H140 L130 46 L110 58 H20 Z" fill="#041A33" className="stroke-hull/70" strokeWidth="1.1" />
        {Array.from({ length: 12 }, (_, i) => (
          <circle key={i} cx={30 + (i % 6) * 14} cy={32 + Math.floor(i / 6) * 16} r="2" className="sm-particle fill-ember" style={{ animationDelay: `${i * 0.15}s` }} />
        ))}
        <path d="M162 40 h34" className="sm-flow stroke-ember" strokeWidth="2" />
      </svg>
    );
  if (name === 'Arduino')
    return (
      <svg viewBox="0 0 200 80" className="h-20 w-full">
        <rect x="70" y="22" width="60" height="36" rx="4" fill="#041A33" className="stroke-hull/70" />
        {[0, 1, 2, 3, 4, 5].map(i => <rect key={i} x={76 + i * 9} y="16" width="4" height="6" className="fill-hull/50" />)}
        {['M10 30 H70', 'M10 50 H70', 'M130 30 H190', 'M130 50 H160 V70'].map((d, i) => (
          <g key={d}><path d={d} fill="none" className={c} strokeWidth="1" /><path d={d} fill="none" className="sm-pulse stroke-ember" strokeWidth="2" style={{ animationDelay: `${i * 0.4}s` }} /></g>
        ))}
        <text x="100" y="45" textAnchor="middle" className="fill-mist text-[9px]">MCU</text>
      </svg>
    );
  if (name === 'Sensors')
    return (
      <svg viewBox="0 0 200 80" className="h-20 w-full">
        <path d="M0 40 H200" className="stroke-white/10" />
        <path className="sm-wave stroke-print" fill="none" strokeWidth="1.5" d={'M0 40 ' + Array.from({ length: 81 }, (_, i) => `L${i * 5} ${40 - Math.sin(i * 0.35) * 16 * (0.6 + 0.4 * Math.sin(i * 0.07))}`).join(' ')} />
      </svg>
    );
  return (
    <svg viewBox="0 0 200 80" className="h-20 w-full">
      <path d="M40 70 V36 M34 36 h12 M40 36 l-8 -10 M40 36 l8 -10" className="stroke-hull/80" strokeWidth="1.2" fill="none" />
      {[0, 1, 2].map(i => <circle key={i} cx="40" cy="30" r="10" fill="none" className="sm-ring stroke-print" style={{ animationDelay: `${i * 0.8}s` }} />)}
      <path d="M160 70 V36 M154 36 h12" className="stroke-hull/60" strokeWidth="1.2" />
      <path d="M52 30 Q100 6 150 30" fill="none" strokeDasharray="3 4" className="sm-flow stroke-ember/80" />
    </svg>
  );
}

/* ---------- Globe (cobe) ---------- */
export function Globe({ className = '' }) {
  const ref = useRef(null);
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    let phi = 4.35;
    let width = 0;
    let globe = null;
    const measure = () => (width = canvas.offsetWidth);
    // Created once, the first time it scrolls into view; afterwards it is only paused/resumed.
    const create = () => {
      measure();
      if (!width) return;
      try {
        globe = createGlobe(canvas, {
          devicePixelRatio: Math.min(2, window.devicePixelRatio || 1),
          width: width * 2,
          height: width * 2,
          phi,
          theta: 0.28,
          dark: 1,
          diffuse: 1.3,
          mapSamples: window.innerWidth < 768 ? 9000 : 14000,
          mapBrightness: 4.5,
          baseColor: [0.09, 0.18, 0.32],
          markerColor: [0.79, 0.63, 0.96],
          glowColor: [0.25, 0.42, 0.7],
          markers: [
            { location: [13.0827, 80.2707], size: 0.07 },
            { location: [13.7199, 80.2304], size: 0.045 }
          ],
          onRender: state => {
            phi += 0.0022;
            state.phi = phi;
            state.width = width * 2;
            state.height = width * 2;
          }
        });
        canvas.style.opacity = '1';
      } catch {
        globe = null; // no WebGL: the section reads fine without the globe
      }
    };
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting && !globe) create();
        else globe?.toggle(e.isIntersecting);
      },
      { rootMargin: '150px 0px' }
    );
    io.observe(canvas);
    window.addEventListener('resize', measure);
    return () => {
      io.disconnect();
      window.removeEventListener('resize', measure);
      globe?.destroy();
    };
  }, []);
  return (
    <div className={`relative aspect-square w-full ${className}`}>
      <canvas ref={ref} className="h-full w-full opacity-0 transition-opacity duration-1000" style={{ contain: 'layout paint size' }} />
    </div>
  );
}

/* ---------- Day ring: progress through the 10 days ---------- */
export function DayRing({ day, total = 10, label }) {
  const r = 70;
  const C = 2 * Math.PI * r;
  return (
    <div className="relative h-[180px] w-[180px] shrink-0">
      <svg viewBox="0 0 180 180" className="h-full w-full -rotate-90">
        <circle cx="90" cy="90" r={r} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="2" />
        {Array.from({ length: total }, (_, i) => {
          const a = (i / total) * Math.PI * 2;
          return <circle key={i} cx={90 + Math.cos(a) * r} cy={90 + Math.sin(a) * r} r={i < day ? 3 : 2} fill={i < day ? '#9D4EDD' : 'rgba(255,255,255,0.25)'} />;
        })}
        <circle cx="90" cy="90" r={r} fill="none" stroke="url(#sm-ring)" strokeWidth="2" strokeLinecap="round" strokeDasharray={C} strokeDashoffset={C * (1 - day / total)} style={{ transition: 'stroke-dashoffset .8s cubic-bezier(.2,.7,.2,1)' }} />
        <defs><linearGradient id="sm-ring"><stop offset="0" stopColor="#8ED8FF" /><stop offset="1" stopColor="#9D4EDD" /></linearGradient></defs>
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-[12px] text-mist">Day</span>
        <span className="font-display text-4xl font-extralight tabular-nums text-hull">{day}</span>
        <span className="text-[12px] text-mist">{label}</span>
      </div>
    </div>
  );
}

/* ---------- Word rotator (CSS-driven, no animation library timing) ---------- */
export function WordRotator({ words, interval = 2200, className = '' }) {
  const [i, setI] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setI(v => (v + 1) % words.length), interval);
    return () => clearInterval(id);
  }, [words.length, interval]);
  return (
    <span className={`relative inline-flex overflow-hidden rounded-xl bg-flame px-3 py-1 text-white ${className}`} aria-live="polite">
      <span key={i} className="inline-flex">
        {words[i].split('').map((ch, k) => (
          <span key={k} className="sm-rot-in inline-block" style={{ animationDelay: `${k * 22}ms` }}>{ch}</span>
        ))}
      </span>
    </span>
  );
}

/* ---------- Cycle diagram: stages on a ring with a travelling comet ---------- */
export function CycleDiagram({ items, center = 'SpaceMinds', sub = '' }) {
  const n = items.length;
  const R = 150;
  const [active, setActive] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setActive(a => (a + 1) % n), 1800);
    return () => clearInterval(id);
  }, [n]);
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[460px]" aria-hidden>
      <svg viewBox="-230 -230 460 460" className="absolute inset-0 h-full w-full overflow-visible">
        <defs>
          <radialGradient id="cy-core"><stop offset="0" stopColor="#123a6b" /><stop offset="1" stopColor="#02060F" stopOpacity="0" /></radialGradient>
        </defs>
        <circle r="120" fill="url(#cy-core)" />
        <circle r={R} fill="none" stroke="rgba(255,255,255,0.08)" />
        <circle r={R + 34} fill="none" stroke="rgba(142,216,255,0.10)" strokeDasharray="2 6" className="origin-center animate-[sm-spin_80s_linear_infinite]" />
        {items.map((it, i) => {
          const a = (i / n) * Math.PI * 2 - Math.PI / 2;
          const x = Math.cos(a) * R, y = Math.sin(a) * R;
          const on = i === active;
          return (
            <g key={it} style={{ transition: 'all .5s' }}>
              <circle cx={x} cy={y} r={on ? 9 : 5} fill={on ? '#9D4EDD' : '#041A33'} stroke={on ? '#C9A0F5' : 'rgba(255,255,255,0.35)'} style={{ transition: 'all .5s', filter: on ? 'drop-shadow(0 0 10px #9D4EDD)' : 'none' }} />
              <text x={Math.cos(a) * (R + 30)} y={Math.sin(a) * (R + 30) + 4} textAnchor={Math.abs(Math.cos(a)) < 0.2 ? 'middle' : Math.cos(a) > 0 ? 'start' : 'end'} className={on ? 'fill-hull' : 'fill-mist'} style={{ fontSize: 13, transition: 'fill .5s' }}>{it}</text>
            </g>
          );
        })}
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
        <img src={mark} alt="" className="w-[18%] opacity-90" />
        <p className="mt-3 font-display text-lg font-light text-hull">{center}</p>
        {sub && <p className="text-[12px] text-mist">{sub}</p>}
      </div>
    </div>
  );
}
