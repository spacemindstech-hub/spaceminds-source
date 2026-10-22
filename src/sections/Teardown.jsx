import { useEffect, useRef, useState } from 'react';
import { labelEls, rig } from '../three/store';
import { learningModel } from '../data/content';
import { Bay, cx } from '../components/ui';

const LABELS = [
  ['fairing', 'Heat shield', 'Opens to reveal the satellite it protects'],
  ['ps4', 'PS4', 'Liquid upper stage with its own engines'],
  ['ps3', 'PS3', 'Solid-fuel third stage'],
  ['ps2', 'PS2', 'Liquid second stage, powered by the Vikas engine'],
  ['ps1', 'PS1', 'Solid-fuel core first stage'],
  ['boosters', 'Strap-on motors', 'Six solid boosters for extra thrust at lift-off']
];

const PHASES = [
  { at: 0.0, t: 'Every machine is a system of parts.', d: 'Scroll to take a PSLV apart, the way students take apart rockets, drones and satellites in our labs.' },
  { at: 0.28, t: 'Look inside.', d: 'Each stage is drawn out: tanks, motors, nozzles, and the satellite waiting under the heat shield.' },
  { at: 0.62, t: 'Put it back together.', d: 'Understanding how the parts fit is what lets an engineer improve the whole.' }
];

export default function Teardown() {
  const ref = useRef(null);
  const fills = useRef([]);
  // Only re-render when the caption or the active step changes; the progress bars are driven directly.
  const [phaseIdx, setPhaseIdx] = useState(0);
  const [step, setStep] = useState(0);
  useEffect(() => {
    let raf = 0;
    let running = false;
    const n = learningModel.length;
    const tick = () => {
      const el = ref.current;
      if (el) {
        const r = el.getBoundingClientRect();
        const p = Math.min(1, Math.max(0, -r.top / Math.max(1, r.height - window.innerHeight)));
        let ph = 0;
        PHASES.forEach((x, i) => { if (p >= x.at) ph = i; });
        const st = Math.min(n - 1, Math.floor(p * n));
        setPhaseIdx(v => (v === ph ? v : ph));
        setStep(v => (v === st ? v : st));
        fills.current.forEach((f, i) => {
          if (f) f.style.transform = `scaleX(${i < st ? 1 : i === st ? (p * n) % 1 : 0})`;
        });
      }
      if (running) raf = requestAnimationFrame(tick);
    };
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !running) { running = true; raf = requestAnimationFrame(tick); }
      else if (!e.isIntersecting) { running = false; cancelAnimationFrame(raf); }
    }, { rootMargin: '20% 0px' });
    if (ref.current) io.observe(ref.current);
    const onScroll = () => { if (running) { const r = running; running = false; tick(); running = r; } };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => { running = false; cancelAnimationFrame(raf); io.disconnect(); window.removeEventListener('scroll', onScroll); };
  }, []);
  const phase = PHASES[phaseIdx];

  return (
    <section ref={ref} data-teardown className="relative h-[460vh]" aria-label="Inside the rocket">
      <div className="sticky top-0 flex h-screen flex-col overflow-hidden">
        <div className="mx-auto w-full max-w-[1320px] px-5 pt-24 sm:px-8 lg:px-12">
          <p className="text-[15px] text-print">How students learn</p>
          <div className="relative mt-3 min-h-[8.5rem] max-w-[40rem]">
            {PHASES.map(x => (
              <div key={x.t} className={cx('absolute inset-0 transition-all duration-700', x === phase ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-3 opacity-0')}>
                <h2 className="font-display text-[clamp(1.8rem,3.6vw,3rem)] font-light leading-[1.08] tracking-[-0.02em] text-hull">{x.t}</h2>
                <p className="mt-3 max-w-[52ch] leading-relaxed text-mist">{x.d}</p>
              </div>
            ))}
          </div>
        </div>

        <Bay id="teardown" orient="h" framed={false} className="absolute left-[6%] right-[6%] top-[43%] h-[30%]" />

        {LABELS.map(([id, name, desc], li) => (
          <div
            key={id}
            ref={el => (el ? labelEls.set(id, el) : labelEls.delete(id))}
            className="pointer-events-none fixed left-0 top-0 z-20 hidden opacity-0 md:block"
            style={{ willChange: 'transform, opacity' }}
          >
            {li % 2 === 0 ? (
              <div className="flex -translate-x-1/2 -translate-y-[calc(100%-4px)] flex-col items-center">
                <div className="w-max max-w-[12.5rem] rounded-xl border border-print/30 bg-void/88 px-3 py-2">
                  <p className="text-[13px] font-semibold text-print">{name}</p>
                  <p className="mt-0.5 text-[12px] leading-snug text-hull/80">{desc}</p>
                </div>
                <div className="h-[70px] w-px bg-gradient-to-b from-print/70 to-print/10" />
                <div className="-mt-1 h-2 w-2 rounded-full border border-print bg-void" />
              </div>
            ) : (
              <div className="flex -translate-x-1/2 -translate-y-[4px] flex-col items-center">
                <div className="-mb-1 h-2 w-2 rounded-full border border-print bg-void" />
                <div className="h-[70px] w-px bg-gradient-to-t from-print/70 to-print/10" />
                <div className="w-max max-w-[12.5rem] rounded-xl border border-print/30 bg-void/88 px-3 py-2">
                  <p className="text-[13px] font-semibold text-print">{name}</p>
                  <p className="mt-0.5 text-[12px] leading-snug text-hull/80">{desc}</p>
                </div>
              </div>
            )}
          </div>
        ))}

        <div className="absolute inset-x-0 bottom-0 pb-8">
          <ol className="mx-auto grid w-full max-w-[1320px] grid-cols-3 gap-x-4 gap-y-3 px-5 sm:grid-cols-6 sm:px-8 lg:px-12">
            {learningModel.map((s, i) => (
              <li key={s.k} className="relative">
                <div className="h-px w-full bg-white/10">
                  <div ref={el => (fills.current[i] = el)} className="h-px origin-left scale-x-0 bg-ember" />
                </div>
                <p className={cx('mt-3 text-[13px] transition-colors', i <= step ? 'text-hull' : 'text-mist/60')}>{String(i + 1).padStart(2, '0')} {s.k}</p>
                <p className={cx('hidden text-[12px] leading-snug lg:block', i === step ? 'text-mist' : 'text-mist/40')}>{s.d}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
