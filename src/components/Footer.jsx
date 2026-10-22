import { Link } from 'react-router-dom';
import wordmark from '../assets/wordmark_white.png';
import { contact, trust } from '../data/content';
import { Bay } from './ui';

const cols = [
  ['Explore', [['/programs', 'Programs'], ['/learning', 'Learning Experience'], ['/journey', 'Student Journey'], ['/resources', 'Resources']]],
  ['For you', [['/schools', 'Schools'], ['/parents', 'Parents'], ['/schools#colleges', 'Colleges'], ['/contact', 'Contact']]],
  ['SpaceMinds', [['/about', 'About'], ['/why', 'Why SpaceMinds'], ['/policies#safety', 'Safety'], ['/policies#consent', 'Parent consent']]]
];

export function LaunchComplex() {
  // The rocket's final bay. The WebGL launch complex is anchored to the bottom edge of this bay.
  return (
    <section className="relative h-[112vh] overflow-hidden" aria-label="Launch complex">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-void/0 to-transparent" />
      <div className="relative mx-auto max-w-[1320px] px-5 pt-24 sm:px-8 lg:px-12">
        <p className="max-w-[26ch] font-display text-[clamp(1.4rem,2.6vw,2rem)] font-light leading-snug text-hull/90">
          Every mission ends back on the pad, ready for the next one.
        </p>
      </div>
      <Bay id="pad" framed={false} className="absolute bottom-[7vh] left-1/2 h-[42vh] w-[10vw] -translate-x-1/2" />
    </section>
  );
}

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-white/10 bg-gradient-to-b from-void/40 via-void/85 to-void">
      <div className="mx-auto grid max-w-[1320px] gap-12 px-5 py-16 sm:px-8 lg:grid-cols-[1.3fr_2fr] lg:px-12">
        <div>
          <img src={wordmark} alt="spaceminds" className="h-7 w-auto" />
          <p className="mt-5 max-w-[34ch] text-mist">Hands-on aerospace education for the next generation.</p>
          <p className="mt-6 text-sm leading-relaxed text-mist/80">
            <a className="text-hull hover:text-ember" href={`mailto:${contact.email}`}>{contact.email}</a>
            <br />
            <a className="hover:text-hull" href={contact.phoneHref}>{contact.phone}</a>
            <br />
            {contact.address}
          </p>
        </div>
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
          {cols.map(([h, links]) => (
            <div key={h}>
              <p className="text-sm text-mist/70">{h}</p>
              <ul className="mt-4 space-y-2.5">
                {links.map(([to, l]) => (
                  <li key={to}><Link to={to} className="text-hull/90 hover:text-ember">{l}</Link></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <div className="mx-auto max-w-[1320px] border-t border-white/10 px-5 py-6 text-[13px] text-mist/70 sm:px-8 lg:px-12">
        <p className="mb-4 text-mist/60">{trust.slice(0, 3).join('  |  ')}</p>
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <p className="order-2 md:order-1">
          © {new Date().getFullYear()} SpaceMinds. All rights reserved.
          <span className="mx-2 hidden opacity-40 sm:inline">|</span>
          <span className="block sm:inline">Designed &amp; Developed by INNEST.</span>
        </p>
        <p className="order-1 flex flex-wrap gap-x-5 gap-y-2 md:order-2">
          <Link to="/policies#privacy" className="hover:text-hull">Privacy Policy</Link>
          <Link to="/policies#terms" className="hover:text-hull">Terms</Link>
          <Link to="/policies#consent" className="hover:text-hull">Parent Consent</Link>
          <Link to="/schools" className="hover:text-hull">School Partnership</Link>
          <Link to="/policies#safety" className="hover:text-hull">Safety</Link>
        </p>
        </div>
      </div>
    </footer>
  );
}
