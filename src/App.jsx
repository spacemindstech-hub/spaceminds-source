import { Component, lazy, Suspense, useEffect, useLayoutEffect } from 'react';
import { BrowserRouter, HashRouter, Route, Routes, useLocation } from 'react-router-dom';

// Hash URLs for the single-file preview; clean URLs (/programs) on Vercel/Hostinger.
const Router = import.meta.env.MODE === 'artifact' ? HashRouter : BrowserRouter;
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { rig } from './three/store';
import Nav from './components/Nav';
import Footer from './components/Footer';
import ClickSpark from './rb/ClickSpark';
import Home from './pages/Home';
// Route code is split: the home page loads first, inner pages load on demand.
const pages = () => import('./pages/Pages');
const L = name => lazy(() => pages().then(m => ({ default: m[name] })));
const Why = L('Why'), ProgramsPage = L('ProgramsPage'), ProgramDetail = L('ProgramDetail'), Learning = L('Learning'), Schools = L('Schools'),
  Parents = L('Parents'), Journey = L('Journey'), About = L('About'), Resources = L('Resources'), Contact = L('Contact'), Policies = L('Policies'), NotFound = L('NotFound');
// three.js is its own chunk so text and layout paint before the 3D engine finishes loading
// start downloading the 3D engine immediately, in parallel with the page (not after it mounts)
const experienceChunk = import('./three/Experience');
const Experience = lazy(() => experienceChunk);

gsap.registerPlugin(ScrollTrigger);

function useLenis() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const lenis = new Lenis({ duration: 1.15, smoothWheel: true, easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
    window.__lenis = lenis;
    lenis.on('scroll', ScrollTrigger.update);
    const tick = time => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
    };
  }, []);
}

// If WebGL is unavailable or the 3D layer fails, the site keeps working without it.
class SceneBoundary extends Component {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  componentDidCatch(err) {
    console.warn('3D scene disabled:', err?.message || err);
    window.__sceneWarm = true;
    window.dispatchEvent(new Event('scene-warm'));
  }
  render() {
    return this.state.failed ? null : this.props.children;
  }
}

function RouteEffects() {
  const { pathname, hash } = useLocation();
  rig.home = pathname === '/';
  // Jump to the top on every navigation, before the browser paints the new page.
  useLayoutEffect(() => {
    if (hash) return;
    window.__lenis?.stop();
    window.scrollTo(0, 0);
    window.__lenis?.scrollTo(0, { immediate: true, force: true });
    window.__lenis?.start();
  }, [pathname, hash]);
  // Anchor links (e.g. /schools#enquire) resolve once the page has rendered.
  useEffect(() => {
    const t = setTimeout(() => {
      if (hash) {
        const el = document.getElementById(hash.slice(1));
        if (el) window.__lenis ? window.__lenis.scrollTo(el, { offset: -90 }) : el.scrollIntoView();
      }
      ScrollTrigger.refresh();
    }, 60);
    return () => clearTimeout(t);
  }, [pathname, hash]);
  return null;
}

// Reveal the site only when it can animate smoothly: the logo effect has played, fonts are in, and the 3D scene
// is warm (sky built, rocket compiled and uploaded). Everything heavy happens behind the logo screen.
const LOGO_MIN_MS = 1000;
const REVEAL_CAP_MS = 4500;
function useIntroDone() {
  useEffect(() => {
    const wait = ms => new Promise(r => setTimeout(r, ms));
    const fonts = document.fonts ? Promise.race([document.fonts.ready, wait(800)]) : Promise.resolve();
    const warm = new Promise(r => (window.__sceneWarm ? r() : window.addEventListener('scene-warm', r, { once: true })));
    const cap = wait(Math.max(0, REVEAL_CAP_MS - performance.now()));
    Promise.all([fonts, wait(Math.max(0, LOGO_MIN_MS - performance.now()))])
      .then(() => Promise.race([warm, cap]))
      .then(() => {
        // one more frame so the first revealed frame is already painted
        requestAnimationFrame(() => (window.__smFinish ? window.__smFinish() : window.dispatchEvent(new Event('sm-loaded'))));
        // inner-page code downloads later, never during the entrance
        setTimeout(() => (window.requestIdleCallback || (f => f()))(() => pages()), 4500);
      });
  }, []);
}

export default function App() {
  useLenis();
  useIntroDone();
  return (
    <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <RouteEffects />
      <SceneBoundary>
        <Suspense fallback={null}>
          <Experience />
        </Suspense>
      </SceneBoundary>
      <ClickSpark sparkColor="#C9A0F5" sparkSize={9} sparkRadius={18} sparkCount={8} duration={420}>
        <Nav />
        <main className="relative z-10">
          <Suspense fallback={<div className="min-h-screen" />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/why" element={<Why />} />
            <Route path="/programs" element={<ProgramsPage />} />
            <Route path="/programs/:slug" element={<ProgramDetail />} />
            <Route path="/learning" element={<Learning />} />
            <Route path="/schools" element={<Schools />} />
            <Route path="/parents" element={<Parents />} />
            <Route path="/journey" element={<Journey />} />
            <Route path="/about" element={<About />} />
            <Route path="/resources" element={<Resources />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/policies" element={<Policies />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          </Suspense>
        </main>
        <Footer />
      </ClickSpark>
    </Router>
  );
}
