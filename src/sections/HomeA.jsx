import { Link } from 'react-router-dom';
import SplitText from '../rb/SplitText';
import ShinyText from '../rb/ShinyText';
import LogoLoop from '../rb/LogoLoop';
import NambiCard from '../components/NambiCard';
import mark from '../assets/mark_white.png';
import { Bay, Button, H2, Lead, Section, Kicker, useLoaded } from '../components/ui';
import { MissionHUD, Nebula, OrbitSystem, WordRotator } from '../components/fx';
import { domains, nambi, trust } from '../data/content';

const PATH = ['Student', 'Experiment', 'Build', 'Test', 'Fly', 'Launch', 'Mission'];

export function Hero() {
  const loaded = useLoaded();
  // Mobile-first type scale: phones size by width, desktop (lg) also respects viewport height so the hero fits above the fold.
  const h1 =
    'mt-[clamp(0.75rem,2.2vh,1.25rem)] max-w-[15ch] font-display font-light leading-[1.02] tracking-[-0.035em] text-hull ' +
    'text-[clamp(2.1rem,9.2vw,3.6rem)] sm:text-[clamp(2.6rem,7vw,4.4rem)] lg:max-w-[14ch] lg:leading-[0.98] lg:text-[clamp(2.3rem,min(6.2vw,10.2vh),5.8rem)]';
  const lead =
    'mt-[clamp(1rem,3vh,1.75rem)] max-w-[52ch] leading-[1.62] text-mist text-[clamp(1rem,4.1vw,1.1rem)] lg:text-[clamp(1rem,2.1vh,1.15rem)]';
  const copy = 'SpaceMinds brings hands-on aeronautics, rocketry, drones, satellites and engineering to K–12 students through structured, age-appropriate learning experiences.';
  return (
    <Section className="relative grid pb-[clamp(2.5rem,6vh,4rem)] pt-[72px] lg:h-[100svh] lg:min-h-[560px] lg:grid-cols-12 lg:items-center lg:gap-8 lg:pb-6 lg:pt-[84px]">
      <Nebula className="right-0 top-[10%] h-[70%] w-[60%]" />
      <div className="order-2 min-w-0 lg:order-1 lg:col-span-7">
        <ShinyText text="K–12 aerospace and engineering education" speed={3} color="#93A6C2" shineColor="#F1E6FF" className="text-[clamp(13px,3.4vw,15px)]" />
        {loaded ? (
          <SplitText text="Don't just learn about aerospace. Build it." tag="h1" textAlign="left" splitType="words" delay={70} duration={1.1} from={{ opacity: 0, y: 48 }} to={{ opacity: 1, y: 0 }} rootMargin="0px" className={h1} />
        ) : (
          <h1 className={h1 + ' invisible'}>Don't just learn about aerospace. Build it.</h1>
        )}
        {/* one composited fade (opacity/transform) instead of animating blur() on every word */}
        <p className={lead + (loaded ? ' sm-fade-up' : ' opacity-0')}>{copy}</p>
        {/* stacked, full-width touch targets on phones; side by side from sm */}
        <div className="mt-[clamp(1.5rem,4vh,2.25rem)] flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <Button to="/programs" className="w-full min-h-[48px] sm:w-auto">Explore programs</Button>
          <Button to="/schools" variant="ghost" className="w-full min-h-[48px] sm:w-auto">Bring SpaceMinds to your school</Button>
        </div>
        <ol className="mt-[clamp(1.75rem,5vh,3rem)] flex max-w-[40rem] flex-wrap items-center gap-y-2 text-[12px] text-mist sm:text-[13px] [@media(max-height:700px)_and_(min-width:1024px)]:hidden" aria-label="The SpaceMinds progression">
          {PATH.map((s, i) => (
            <li key={s} className="flex items-center">
              <span className={i === PATH.length - 1 ? 'text-ember' : ''}>{s}</span>
              {i < PATH.length - 1 && <span className="mx-2 h-px w-3 bg-gradient-to-r from-white/30 to-white/5 sm:mx-3 sm:w-6" aria-hidden />}
            </li>
          ))}
        </ol>
      </div>
      {/* Rocket bay. On phones/tablets it sits above the copy, with room reserved underneath for the exhaust flame. */}
      <div className="relative order-1 pb-[clamp(44px,8svh,100px)] lg:order-2 lg:col-span-5 lg:self-start lg:pb-0 lg:pt-[max(12px,3vh)]">
        <Bay id="hero" className="mx-auto h-[clamp(136px,24svh,300px)] w-[clamp(96px,30vw,200px)] lg:ml-auto lg:mr-0 lg:h-[calc((100svh-150px)/1.34)] lg:w-[58%]" />
        <MissionHUD className="absolute bottom-[6vh] left-0 hidden xl:block" />
      </div>
    </Section>
  );
}

export function TrustStrip() {
  const logos = trust.map(t => ({
    node: (
      <span className="flex items-center gap-4 whitespace-nowrap font-display text-[clamp(1rem,1.6vw,1.3rem)] font-light text-hull/80">
        <img src={mark} alt="" className="h-4 w-auto opacity-60" />
        {t}
      </span>
    ),
    title: t
  }));
  return (
    <div className="relative border-y border-white/10 bg-void/60 py-7">
      <p className="sr-only">Built for the next generation of aerospace thinkers</p>
      <LogoLoop logos={logos} speed={45} direction="left" logoHeight={28} gap={56} pauseOnHover fadeOut fadeOutColor="#02060F" ariaLabel="Credentials" />
    </div>
  );
}

export function NambiSection() {
  return (
    <Section className="grid items-center gap-12 py-28 lg:grid-cols-12 lg:py-40">
      <Bay id="nambi" label="Guided by experience" className="hidden h-[62vh] lg:col-span-2 lg:block" />
      <div className="flex justify-center lg:col-span-5">
        <NambiCard photo="portrait" />
      </div>
      <div className="lg:col-span-5">
        <Kicker>Guidance and endorsement</Kicker>
        <H2>Guided by one of the architects of India’s cryogenic engine programme.</H2>
        <Lead>{nambi.guidance}</Lead>
        <Lead className="mt-4">{nambi.curriculum}</Lead>
        <p className="mt-8 border-l border-ember/60 pl-5 text-hull/90">{nambi.curated}</p>
        <div className="mt-8">
          <Button to="/about" variant="ghost">About our curriculum</Button>
        </div>
      </div>
    </Section>
  );
}

export function WhatIs() {
  return (
    <Section className="relative grid items-center gap-12 py-28 lg:grid-cols-12 lg:py-40">
      <Nebula tone="print" className="right-0 top-[10%] h-[80%] w-[55%]" />
      <Bay id="whatis" lean="-0.04" className="mx-auto h-[40vh] w-[30vw] max-w-[220px] lg:col-span-3 lg:h-[72vh] lg:w-full lg:max-w-none" />
      <div className="lg:col-span-5">
        <Kicker>What is SpaceMinds?</Kicker>
        <H2>Aerospace education. Reimagined for K–12.</H2>
        <div className="mt-8 flex flex-wrap items-center gap-3 font-display text-[clamp(1.4rem,2.6vw,2.1rem)] font-light text-mist">
          <span>Students learn</span>
          <WordRotator words={domains} />
        </div>
        <Lead>
          SpaceMinds is a hands-on aerospace and space technology education initiative. Through structured programmes, students learn concepts and immediately connect them with experiments, models, simulations, construction, testing and problem-solving.
        </Lead>
        <div className="mt-9 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 sm:grid-cols-3">
          {['School programmes', 'Student programmes', 'Aerospace missions', 'Camps', 'Advanced learning', 'College labs'].map(x => (
            <div key={x} className="bg-void/85 px-4 py-4 text-[15px] text-hull/90">{x}</div>
          ))}
        </div>
        <p className="mt-6 text-sm text-mist">The Summer Aerospace Bootcamp is one product inside the larger SpaceMinds ecosystem. <Link className="text-hull underline decoration-white/30 underline-offset-4 hover:decoration-ember" to="/journey">See the pathway</Link></p>
      </div>
      <div className="lg:col-span-4">
        <OrbitSystem domains={domains} />
      </div>
    </Section>
  );
}
