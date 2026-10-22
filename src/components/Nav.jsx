import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import wordmark from '../assets/wordmark_white.png';
import StarBorder from '../rb/StarBorder';
import { nav } from '../data/content';
import { cx } from './ui';

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const loc = useLocation();
  useEffect(() => setOpen(false), [loc.pathname]);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 40);
    on();
    window.addEventListener('scroll', on, { passive: true });
    return () => window.removeEventListener('scroll', on);
  }, []);
  useEffect(() => {
    document.documentElement.style.overflow = open ? 'hidden' : '';
  }, [open]);

  return (
    <header className={cx('fixed inset-x-0 top-0 z-50 transition-[background,backdrop-filter] duration-500', scrolled || open ? 'bg-void/70 backdrop-blur-xl' : 'bg-transparent')}>
      <div className="mx-auto flex h-[72px] max-w-[1320px] items-center justify-between gap-6 px-5 sm:px-8 lg:px-12">
        <Link to="/" className="shrink-0" aria-label="SpaceMinds home">
          <img src={wordmark} alt="spaceminds" className="h-[22px] w-auto" />
        </Link>
        <nav className="hidden items-center gap-1 xl:flex" aria-label="Main">
          {[{ to: '/', label: 'Home', end: true }, ...nav.filter(n => ['/programs', '/learning', '/schools', '/parents', '/about'].includes(n.to))].map(n => (
            <NavLink key={n.to} to={n.to} end={n.end} className={({ isActive }) => cx('whitespace-nowrap rounded-full px-3 py-2 text-[14px] transition-colors', isActive ? 'text-hull' : 'text-mist hover:text-hull')}>
              {n.label.replace(' Experience', '')}
            </NavLink>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <div className="hidden sm:block">
            <StarBorder as={Link} to="/schools#enquire" color="#ffffff" speed="5s" backgroundColor="#4B0082" textColor="#FFFFFF" borderColor="transparent" className="font-semibold">
                <span className="whitespace-nowrap text-[14px] font-semibold">Launch your school</span>
              </StarBorder>
          </div>
          <button
            onClick={() => setOpen(o => !o)}
            className="flex h-11 items-center gap-2 rounded-full border border-white/15 px-4 text-[14px] text-hull"
            aria-expanded={open}
            aria-controls="mobile-menu"
          >
            {open ? 'Close' : 'Menu'}
          </button>
        </div>
      </div>
      <div id="mobile-menu" className={cx('overflow-y-auto transition-[max-height,opacity] duration-500', open ? 'max-h-[calc(100vh-72px)] opacity-100' : 'max-h-0 opacity-0')}>
        <nav className="mx-auto grid max-w-[1320px] gap-1 px-5 pb-10 pt-4 sm:grid-cols-2 sm:px-8 lg:grid-cols-3 lg:px-12" aria-label="Site">
          <NavLink to="/" end className={({ isActive }) => cx('py-3 font-display text-2xl font-light', isActive ? 'text-ember' : 'text-hull')}>Home</NavLink>
          {nav.map(n => (
            <NavLink key={n.to} to={n.to} end={n.end} className={({ isActive }) => cx('py-3 font-display text-2xl font-light', isActive ? 'text-ember' : 'text-hull')}>
              {n.label}
            </NavLink>
          ))}
          <Link to="/contact" className="mt-6 inline-flex w-fit rounded-full bg-flame px-6 py-3 font-semibold text-white">Enquire now</Link>
        </nav>
      </div>
    </header>
  );
}
