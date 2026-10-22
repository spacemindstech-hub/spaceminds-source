import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import SplitText from '../rb/SplitText';

export const cx = (...a) => a.filter(Boolean).join(' ');

// A rocket "bay": the rocket docks here while its section is on screen.
export function Bay({ id, className = '', orient, lean, label, framed = true }) {
  return (
    <div data-dock={id} data-orient={orient} data-lean={lean} className={cx(/\b(absolute|fixed)\b/.test(className) ? '' : 'relative', 'pointer-events-none', className)} aria-hidden="true">
      {framed && (
        <>
          <span className="absolute left-0 top-0 h-5 w-5 border-l border-t border-white/25" />
          <span className="absolute right-0 top-0 h-5 w-5 border-r border-t border-white/25" />
          <span className="absolute bottom-0 left-0 h-5 w-5 border-b border-l border-white/25" />
          <span className="absolute bottom-0 right-0 h-5 w-5 border-b border-r border-white/25" />
          {label && <span className="absolute -bottom-7 left-0 text-[11px] tracking-wide text-mist/70">{label}</span>}
        </>
      )}
    </div>
  );
}

export function Button({ to, href, children, variant = 'primary', className = '', ...rest }) {
  const base = 'inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-[15px] font-semibold transition-colors duration-200';
  const styles = {
    primary: 'bg-flame text-white hover:bg-flame-hover',
    ghost: 'border border-white/20 text-hull hover:border-white/60 hover:bg-white/5',
    quiet: 'text-hull underline decoration-white/30 underline-offset-4 hover:decoration-ember px-0 py-0 rounded-none'
  };
  const cls = cx(base, styles[variant], className);
  if (to) return <Link to={to} className={cls} {...rest}>{children}</Link>;
  if (href) return <a href={href} className={cls} {...rest}>{children}</a>;
  return <button className={cls} {...rest}>{children}</button>;
}

export function H2({ children, className = '' }) {
  return <h2 className={cx('font-display text-[clamp(1.9rem,4.2vw,3.4rem)] font-light leading-[1.08] tracking-[-0.02em] text-hull', className)}>{children}</h2>;
}
export function Lead({ children, className = '' }) {
  return <p className={cx('mt-5 max-w-prose text-[1.12rem] leading-[1.7] text-mist', className)}>{children}</p>;
}
export function Kicker({ children }) {
  return <p className="mb-5 text-[15px] font-medium text-ember">{children}</p>;
}

export function Section({ children, className = '', id, ...rest }) {
  return (
    <section id={id} className={cx('relative mx-auto w-full max-w-[1320px] px-5 sm:px-8 lg:px-12', className)} {...rest}>
      {children}
    </section>
  );
}

export function PageHero({ kicker, title, intro, children, visual }) {
  const body = (
    <div>
      {kicker && <Kicker>{kicker}</Kicker>}
      <SplitText
        text={title}
        tag="h1"
        textAlign="left"
        splitType="words"
        delay={60}
        duration={1}
        from={{ opacity: 0, y: 30 }}
        to={{ opacity: 1, y: 0 }}
        rootMargin="0px"
        className="max-w-[18ch] font-display text-[clamp(2.4rem,6vw,5.2rem)] font-light leading-[1.02] tracking-[-0.03em] text-hull"
      />
      {intro && <Lead className="text-[1.2rem]">{intro}</Lead>}
      {children}
    </div>
  );
  return (
    <Section className="pb-16 pt-40 md:pt-48">
      {visual ? (
        <div className="grid items-center gap-12 lg:grid-cols-[1.2fr_1fr]">
          {body}
          <div>{visual}</div>
        </div>
      ) : (
        body
      )}
    </Section>
  );
}

export function Rule() {
  return <div className="mx-auto h-px w-full max-w-[1320px] bg-gradient-to-r from-transparent via-white/12 to-transparent" />;
}

export function Tick({ children, color = 'text-ember' }) {
  return (
    <li className="flex gap-3 leading-relaxed text-hull/90">
      <span className={cx('mt-[0.55em] h-1.5 w-1.5 shrink-0 rounded-full bg-current', color)} />
      <span>{children}</span>
    </li>
  );
}

// true once the SpaceMinds loader has finished (or immediately if there is none)
export function useLoaded() {
  const [ok, setOk] = useState(() => typeof document === 'undefined' || !document.getElementById('sm-loader') || !!window.__smDone);
  useEffect(() => {
    if (ok) return;
    const on = () => setOk(true);
    window.addEventListener('sm-loaded', on);
    return () => window.removeEventListener('sm-loaded', on);
  }, [ok]);
  return ok;
}

// viewport width, updated on resize (used where a component needs pixel sizes)
export function useViewportWidth() {
  const [w, setW] = useState(() => (typeof window === 'undefined' ? 1280 : window.innerWidth));
  useEffect(() => {
    let t;
    const on = () => { clearTimeout(t); t = setTimeout(() => setW(window.innerWidth), 120); };
    window.addEventListener('resize', on);
    return () => { window.removeEventListener('resize', on); clearTimeout(t); };
  }, []);
  return w;
}
