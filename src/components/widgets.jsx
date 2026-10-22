import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'motion/react';
import { ageBands, builds, contact, journey10, programs, programsForAge } from '../data/content';
import ElectricBorder from '../rb/ElectricBorder';
import GlareHover from '../rb/GlareHover';
import CountUp from '../rb/CountUp';
import mark from '../assets/mark_white.png';
import { cx } from './ui';
import Icon from './Icon';
import { DayRing, Meteors } from './fx';

/* ---------------- Age → program finder ---------------- */
export function AgeFinder({ compact = false }) {
  const [age, setAge] = useState(12);
  const recs = programsForAge(age);
  return (
    <div className={cx('rounded-[28px] border border-white/10 bg-navy/80', compact ? 'p-6' : 'p-7 md:p-9')}>
      <label htmlFor="age" className="block font-display text-xl font-light text-hull">What's your age? Start here.</label>
      <div className="mt-5 flex flex-wrap gap-2">
        {ageBands.map(b => (
          <button
            key={b.label}
            onClick={() => setAge(b.age)}
            className={cx('rounded-full border px-4 py-2 text-sm transition-colors', recs.length && age >= +b.label.split('–')[0] && age <= +b.label.split('–')[1] ? 'border-ember bg-ember/10 text-hull' : 'border-white/15 text-mist hover:border-white/40')}
          >
            {b.label} <span className="ml-1 text-mist/80">{b.name}</span>
          </button>
        ))}
      </div>
      <div className="mt-6 flex items-center gap-4">
        <input id="age" type="range" min={5} max={18} value={age} onChange={e => setAge(+e.target.value)} className="w-full accent-[#7B2CBF]" />
        <output className="w-16 shrink-0 text-right font-display text-3xl font-light tabular-nums text-hull">{age}</output>
      </div>
      <p className="mt-6 text-sm text-mist">Recommended for age {age}</p>
      <ul className="mt-3 grid gap-2">
        <AnimatePresence mode="popLayout" initial={false}>
          {recs.map(p => (
            <motion.li key={p.slug} layout initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.25 }}>
              <Link to={`/programs/${p.slug}`} className="group flex items-center justify-between gap-4 rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-3 hover:border-white/25">
                <span className="flex items-center gap-3">
                  <Icon name={p.icon} size={18} className="text-ember" />
                  <span className="text-hull">{p.name}</span>
                </span>
                <span className="text-sm text-mist group-hover:text-ember">Ages {p.ages}</span>
              </Link>
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>
    </div>
  );
}

/* ---------------- What will I build? ---------------- */
export function BuildSelector() {
  const [sel, setSel] = useState(builds[1].id);
  const b = builds.find(x => x.id === sel);
  const prog = programs.find(p => p.slug === b.program);
  return (
    <div>
      <div role="tablist" aria-label="What will I build?" className="flex flex-wrap gap-2">
        {builds.map(x => (
          <button
            key={x.id}
            role="tab"
            aria-selected={sel === x.id}
            onClick={() => setSel(x.id)}
            className={cx('flex items-center gap-2 rounded-full border px-4 py-2.5 text-[15px] transition-colors', sel === x.id ? 'border-ember bg-flame text-white' : 'border-white/15 text-hull hover:border-white/40')}
          >
            <Icon name={x.icon} size={17} /> {x.label}
          </button>
        ))}
      </div>
      <div className="mt-6">
        <ElectricBorder color="#8ED8FF" speed={0.7} chaos={0.08} borderRadius={26}>
          <div className="rounded-[26px] bg-navy/90 p-6 md:p-8">
            <AnimatePresence mode="wait">
              <motion.ol key={sel} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }} className="grid gap-5 sm:grid-cols-2">
                {[
                  ['Learn', b.learn],
                  ['Build', b.make],
                  ['Test', b.test],
                  ['Mission', b.mission]
                ].map(([k, v], i) => (
                  <li key={k} className="relative pl-10">
                    <span className="absolute left-0 top-0 flex h-7 w-7 items-center justify-center rounded-full border border-print/40 text-[13px] text-print">{i + 1}</span>
                    <p className="font-display text-lg font-light text-hull">{k}</p>
                    <p className="mt-1 leading-relaxed text-mist">{v}</p>
                  </li>
                ))}
              </motion.ol>
            </AnimatePresence>
            <Link to={`/programs/${prog.slug}`} className="mt-7 inline-block text-hull underline decoration-white/30 underline-offset-4 hover:decoration-ember">
              Happens in {prog.name}
            </Link>
          </div>
        </ElectricBorder>
      </div>
    </div>
  );
}

/* ---------------- 10-day interactive timeline ---------------- */
export function DayTimeline() {
  const [i, setI] = useState(2);
  const d = journey10[i];
  return (
    <div>
      <div className="relative">
        <div className="absolute left-0 right-0 top-[15px] h-px bg-white/10" />
        <motion.div className="absolute left-0 top-[15px] h-px bg-ember" animate={{ width: `${(i / (journey10.length - 1)) * 100}%` }} transition={{ type: 'spring', stiffness: 120, damping: 20 }} />
        <ol className="relative grid grid-cols-6 gap-1">
          {journey10.map((s, k) => (
            <li key={s.k}>
              <button onClick={() => setI(k)} className="group flex w-full flex-col items-start text-left" aria-current={i === k ? 'step' : undefined}>
                <span className={cx('flex h-[30px] w-[30px] items-center justify-center rounded-full border text-[12px] transition-colors', k <= i ? 'border-ember bg-flame text-white' : 'border-white/20 bg-void text-mist group-hover:border-white/50')}>{k + 1}</span>
                <span className={cx('mt-3 hidden text-[13px] sm:block', i === k ? 'text-hull' : 'text-mist')}>{s.days}</span>
                <span className={cx('hidden text-[15px] md:block', i === k ? 'text-hull' : 'text-mist/80')}>{s.k}</span>
              </button>
            </li>
          ))}
        </ol>
      </div>
      <AnimatePresence mode="wait">
        <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.25 }} className="relative mt-8 overflow-hidden rounded-[26px] border border-white/10 bg-navy/85 p-6 md:p-8">
          <Meteors number={5} />
          <div className="flex flex-col gap-8 sm:flex-row sm:items-center">
            <DayRing day={[1, 3, 5, 7, 9, 10][i]} label={d.k} />
            <div className="min-w-0">
              <p className="text-sm text-ember">{d.days}</p>
              <p className="mt-1 font-display text-2xl font-light text-hull">{d.k}</p>
              <p className="mt-2 text-mist">{d.d}</p>
              <ul className="mt-5 grid gap-2 sm:grid-cols-2">
                {d.detail.map(x => (
                  <li key={x} className="flex gap-3 text-hull/90"><span className="mt-[0.6em] h-1.5 w-1.5 shrink-0 rounded-full bg-print" />{x}</li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

/* ---------------- School partnership calculator ---------------- */
const inr = n => '₹' + Math.round(n).toLocaleString('en-IN');
export function SchoolCalculator() {
  const [students, setStudents] = useState(100);
  const [fee, setFee] = useState(5999);
  const gross = students * fee;
  const share = gross * 0.15;
  const batches = Math.ceil(students / 15);
  return (
    <div className="rounded-[28px] border border-white/10 bg-navy/85 p-7 md:p-9">
      <div className="grid gap-6 sm:grid-cols-2">
        <label className="block">
          <span className="text-sm text-mist">Number of students</span>
          <input type="number" min={15} step={5} value={students} onChange={e => setStudents(Math.max(0, +e.target.value))} className="mt-2 w-full rounded-xl border border-white/15 bg-void/85 px-4 py-3 text-lg text-hull tabular-nums" />
        </label>
        <label className="block">
          <span className="text-sm text-mist">Average programme fee (₹)</span>
          <input type="number" min={0} step={100} value={fee} onChange={e => setFee(Math.max(0, +e.target.value))} className="mt-2 w-full rounded-xl border border-white/15 bg-void/85 px-4 py-3 text-lg text-hull tabular-nums" />
        </label>
      </div>
      <dl className="mt-8 grid gap-6 sm:grid-cols-3">
        <div>
          <dt className="text-sm text-mist">Gross programme revenue</dt>
          <dd className="mt-1 font-display text-2xl font-light text-hull tabular-nums">{inr(gross)}</dd>
        </div>
        <div>
          <dt className="text-sm text-mist">School revenue share (15%)</dt>
          <dd className="mt-1 font-display text-2xl font-light text-ember tabular-nums">{inr(share)}</dd>
        </div>
        <div>
          <dt className="text-sm text-mist">Estimated scale</dt>
          <dd className="mt-1 font-display text-2xl font-light text-hull tabular-nums">{batches} batch{batches === 1 ? '' : 'es'}</dd>
        </div>
      </dl>
      <p className="mt-6 text-sm text-mist/80">Estimate only, based on the 15% school share in the SpaceMinds school proposal and a maximum of 15 students per batch. Final figures are confirmed in the school agreement.</p>
    </div>
  );
}

/* ---------------- Enquiry forms (compose an email) ---------------- */
const field = 'mt-2 w-full rounded-xl border border-white/15 bg-void/85 px-4 py-3 text-hull placeholder:text-mist/50';
export function EnquiryForm({ kind = 'school' }) {
  const [sent, setSent] = useState(null);
  const fields =
    kind === 'school'
      ? [
          ['School name', 'text', true], ['Principal / coordinator', 'text', true], ['City', 'text', true], ['Number of students', 'number', false],
          ['Age groups', 'text', false], ['Preferred programme', 'select', false], ['Preferred dates', 'text', false], ['Phone', 'tel', true], ['Email', 'email', true]
        ]
      : [
          ["Child's age", 'number', true], ['School', 'text', false], ['City', 'text', true], ['Programme interested in', 'select', false],
          ['Parent name', 'text', true], ['Phone', 'tel', true], ['Email', 'email', true]
        ];
  const cta = kind === 'school' ? 'Request a school demo' : 'Find my programme';
  const onSubmit = e => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget).entries());
    setSent(data);
  };
  if (sent) {
    const subject = kind === 'school' ? `School demo request: ${sent['School name'] || ''}` : `Programme enquiry: age ${sent["Child's age"] || ''}`;
    const body = Object.entries(sent).map(([k, v]) => `${k}: ${v}`).join('\n');
    return (
      <div className="rounded-[28px] border border-ember/40 bg-navy/90 p-8">
        <p className="font-display text-2xl font-light text-hull">Your enquiry is ready to send</p>
        <p className="mt-3 text-mist">Send it to our team and we’ll reply within two working days.</p>
        <pre className="mt-5 whitespace-pre-wrap rounded-2xl bg-void/85 p-4 text-sm text-hull/90">{body}</pre>
        <div className="mt-6 flex flex-wrap gap-3">
          <a href={`mailto:${contact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`} className="rounded-full bg-flame px-6 py-3 font-semibold text-white">Send by email</a>
          <button onClick={() => setSent(null)} className="rounded-full border border-white/20 px-6 py-3 text-hull">Edit details</button>
        </div>
      </div>
    );
  }
  return (
    <form onSubmit={onSubmit} className="grid gap-5 rounded-[28px] border border-white/10 bg-navy/85 p-7 sm:grid-cols-2 md:p-9">
      {fields.map(([label, type, req]) => (
        <label key={label} className={cx('block', type === 'select' && 'sm:col-span-2')}>
          <span className="text-sm text-mist">{label}{req && <span className="text-ember"> *</span>}</span>
          {type === 'select' ? (
            <select name={label} className={field} defaultValue="">
              <option value="">Not sure yet</option>
              {programs.map(p => <option key={p.slug} value={p.name}>{p.name} (ages {p.ages})</option>)}
            </select>
          ) : (
            <input name={label} type={type} required={req} className={field} />
          )}
        </label>
      ))}
      <div className="sm:col-span-2">
        <button className="rounded-full bg-flame px-7 py-3.5 font-semibold text-white hover:bg-flame-hover">{cta}</button>
      </div>
    </form>
  );
}

/* ---------------- FAQ accordion ---------------- */
export function Faq({ items }) {
  const [open, setOpen] = useState(0);
  return (
    <div className="divide-y divide-white/10 border-y border-white/10">
      {items.map(([q, a], i) => (
        <div key={q}>
          <button onClick={() => setOpen(open === i ? -1 : i)} aria-expanded={open === i} className="flex w-full items-center justify-between gap-6 py-5 text-left">
            <span className="text-[1.08rem] text-hull">{q}</span>
            <span className={cx('text-2xl leading-none text-mist transition-transform', open === i && 'rotate-45 text-ember')}>+</span>
          </button>
          <AnimatePresence initial={false}>
            {open === i && (
              <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                <p className="max-w-prose pb-6 leading-relaxed text-mist">{a}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}

/* ---------------- Certificate (illustrative layout) ---------------- */
export function Certificate() {
  return (
    <GlareHover width="100%" height="auto" background="#F4F1E8" borderRadius="18px" borderColor="#d8cfb8" glareColor="#ffffff" glareOpacity={0.55} glareSize={220} className="!block">
      <div className="relative w-full p-7 text-[#0b1f3a] md:p-10">
        <div className="absolute inset-3 rounded-[12px] border border-[#0b1f3a]/20" />
        <div className="relative">
          <div className="flex items-center justify-between">
            <img src={mark} alt="" className="h-8 w-auto invert" />
            <span className="text-xs text-[#0b1f3a]/60">Certificate No. SM-2026-XXXX</span>
          </div>
          <p className="mt-8 font-display text-[clamp(1.2rem,2.4vw,1.8rem)] font-light">Certificate of Achievement</p>
          <p className="mt-4 text-sm text-[#0b1f3a]/70">This certifies that</p>
          <p className="mt-1 font-display text-[clamp(1.4rem,3vw,2.2rem)]">Student name</p>
          <p className="mt-3 max-w-[46ch] text-sm leading-relaxed text-[#0b1f3a]/75">has successfully completed a SpaceMinds 10-day hands-on aerospace programme.</p>
          <div className="mt-6 grid grid-cols-2 gap-3 text-[12px] text-[#0b1f3a]/70 sm:grid-cols-4">
            {['Programme', 'Course', 'School', 'Batch'].map(k => (
              <div key={k}><div className="text-[#0b1f3a]/45">{k}</div><div className="mt-1 h-px bg-[#0b1f3a]/25" /></div>
            ))}
          </div>
          <div className="mt-6 flex flex-wrap gap-x-6 gap-y-1 text-[11px] text-[#0b1f3a]/55">
            <span>Date of issue</span><span>ISRO Reg No.</span><span>AASSC Reg No.</span>
          </div>
        </div>
      </div>
    </GlareHover>
  );
}

export function VerifyCertificate() {
  const [v, setV] = useState('');
  const [res, setRes] = useState(null);
  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        setRes(/^SM-\d{4}-[A-Z0-9]{4}$/i.test(v.trim()) ? 'format' : 'bad');
      }}
      className="rounded-[26px] border border-white/10 bg-navy/85 p-6"
    >
      <label htmlFor="cert" className="text-sm text-mist">Certificate number</label>
      <div className="mt-2 flex gap-2">
        <input id="cert" value={v} onChange={e => setV(e.target.value)} placeholder="SM-2026-XXXX" className="w-full rounded-xl border border-white/15 bg-void/85 px-4 py-3 uppercase text-hull placeholder:normal-case placeholder:text-mist/50" />
        <button className="shrink-0 rounded-full bg-flame px-5 font-semibold text-white">Verify</button>
      </div>
      {res === 'format' && <p className="mt-3 text-sm text-mist">Online verification opens with the next batch. Until then, email the number to {contact.email} and we’ll confirm it.</p>}
      {res === 'bad' && <p className="mt-3 text-sm text-ember">Certificate numbers look like SM-2026-XXXX. Check the number printed at the top right of the certificate.</p>}
    </form>
  );
}

export function Stat({ to, suffix, label }) {
  return (
    <div>
      <p className="whitespace-nowrap font-display text-[clamp(2.4rem,4.4vw,4rem)] font-extralight leading-none text-hull tabular-nums">
        <CountUp to={to} duration={2.2} separator="," />
        <span className={suffix.length > 1 ? "ml-1 text-[0.45em] text-ember" : "text-ember"}>{suffix}</span>
      </p>
      <p className="mt-3 text-mist">{label}</p>
    </div>
  );
}

export function useProgram(slug) {
  return useMemo(() => programs.find(p => p.slug === slug), [slug]);
}
