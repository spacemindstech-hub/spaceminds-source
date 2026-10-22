import ScrollVelocity from '../rb/ScrollVelocity';
import SpotlightCard from '../rb/SpotlightCard';
import DecryptedText from '../rb/DecryptedText';
import { IconBadge } from '../components/Icon';
import Icon from '../components/Icon';
import { Globe, Meteors, Nebula, ToolArt } from '../components/fx';
import NambiCard from '../components/NambiCard';
import { Stat } from '../components/widgets';
import { Link } from 'react-router-dom';
import { Bay, H2, Kicker, Section } from '../components/ui';
import { curriculumDesign, impact, nambi, tools } from '../data/content';

export function Tools() {
  return (
    <div className="py-28 lg:py-40">
      <ScrollVelocity
        texts={['NASA FoilSim   OpenRocket   CEA   ', 'Arduino   Sensors   LoRa telemetry   ']}
        velocity={40}
        className="px-6 text-hull/[0.14]"
        scrollerClassName="!font-display !font-extralight !text-[clamp(3rem,8vw,7rem)] !leading-[1.1] !drop-shadow-none"
      />
      <Section className="mt-16 grid gap-12 lg:grid-cols-12">
        <Bay id="tools" lean="-0.05" className="mx-auto h-[40vh] w-[30vw] max-w-[220px] lg:col-span-4 lg:h-[64vh] lg:w-full lg:max-w-none" />
        <div className="lg:col-span-7 lg:col-start-6">
          <Kicker>Real tools. Real systems. Real thinking.</Kicker>
          <H2>Students get their hands on technology.</H2>
          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {tools.map(t => (
              <SpotlightCard key={t.name} spotlightColor="rgba(142, 216, 255, 0.16)" className="!rounded-2xl !p-6">
                <div className="sm-grid -mx-6 -mt-6 mb-5 border-b border-white/10 px-4 py-3"><ToolArt name={t.name} /></div>
                <p className="font-display text-lg font-light text-hull">
                  <DecryptedText text={t.name} animateOn="view" speed={45} maxIterations={14} sequential revealDirection="start" encryptedClassName="text-print/60" />
                </p>
                <p className="mt-2 leading-relaxed text-mist">{t.d}</p>
              </SpotlightCard>
            ))}
          </div>
        </div>
      </Section>
    </div>
  );
}

export function Curriculum() {
  return (
    <Section className="py-28 lg:py-40">
      <div className="grid items-center gap-12 lg:grid-cols-12">
        <Bay id="curriculum" lean="0.04" className="hidden h-[62vh] lg:col-span-2 lg:block" />
        <div className="flex justify-center lg:col-span-4">
          <NambiCard photo="think" />
        </div>
        <div className="lg:col-span-6">
          <Kicker>Curriculum design</Kicker>
          <H2>Curriculum built with aerospace expertise.</H2>
          <div className="mt-9 grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-navy/80 p-5">
              <p className="text-sm text-mist">Curriculum curated by</p>
              <p className="mt-1 text-lg text-hull">Mr. Nambi Narayanan</p>
              <p className="text-mist">Padma Bhushan Scientist</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-navy/80 p-5">
              <p className="text-sm text-mist">Curriculum designed by</p>
              <p className="mt-1 text-lg text-hull">Mr. Kiran Koushik</p>
              <p className="text-mist">Founder, SpaceMinds</p>
            </div>
          </div>
          <p className="mt-10 text-mist">Designed around how students learn:</p>
          <ol className="mt-4 grid grid-cols-[repeat(auto-fit,minmax(9.5rem,1fr))] gap-x-6 gap-y-3">
            {curriculumDesign.map((c, i) => (
              <li key={c.k} title={c.d} className="text-hull/90">
                <span className="mr-2 text-[12px] text-ember tabular-nums">{String(i + 1).padStart(2, '0')}</span>{c.k}
              </li>
            ))}
          </ol>
          <p className="mt-6 max-w-prose text-sm text-mist/80">{nambi.guidance}</p>
        </div>
      </div>
    </Section>
  );
}

export function Impact() {
  return (
    <Section className="relative py-28 lg:py-40">
      <Nebula tone="print" className="left-0 top-[25%] h-[60%] w-[60%]" />
      <div className="grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-8">
          <Kicker>Results</Kicker>
          <H2>Already taking off.</H2>
          <div className="mt-12 grid grid-cols-2 gap-10 md:grid-cols-4">
            {impact.map(s => <Stat key={s.label} {...s} />)}
          </div>
          <p className="mt-8 text-sm text-mist/80">Summer Aerospace Bootcamp 2025 figures.</p>
        </div>
        <Bay id="impact" lean="-0.05" className="mx-auto h-[36vh] w-[28vw] max-w-[200px] lg:col-span-3 lg:col-start-10 lg:h-[56vh] lg:w-full lg:max-w-none" />
      </div>
      <div className="mt-16 grid items-center gap-10 md:grid-cols-[minmax(0,420px)_1fr]">
        <div className="relative">
          <div className="absolute inset-[12%] rounded-full bg-print/10 blur-3xl" />
          <Globe className="relative mx-auto max-w-[420px]" />
        </div>
        <div>
          <p className="font-display text-[clamp(1.4rem,2.6vw,2.1rem)] font-light leading-snug text-hull">Launching from Chennai, a short drive from India’s spaceport at Sriharikota.</p>
          <p className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-mist">
            <span className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-ember" />SpaceMinds, Chennai</span>
            <span className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-ember" />Sriharikota</span>
          </p>
        </div>
      </div>
    </Section>
  );
}

export function ReadyToLaunch() {
  const items = [
    ['For parents', 'Find the right programme for your child.', '/programs', 'Explore programmes', 'atom'],
    ['For schools', 'Bring SpaceMinds to your students.', '/schools#enquire', 'Partner with SpaceMinds', 'present'],
    ['For students', 'Ready for your next mission?', '/learning', 'Explore learning', 'rocket']
  ];
  return (
    <Section className="grid items-center gap-12 py-28 lg:grid-cols-12 lg:py-36">
      <div className="lg:col-span-8">
        <H2 className="!text-[clamp(2.4rem,6vw,5rem)]">Ready to launch?</H2>
        <div className="mt-12 grid gap-px overflow-hidden rounded-[26px] border border-white/10 bg-white/10 md:grid-cols-3">
          {items.map(([h, d, to, cta, ic]) => (
            <Link key={h} to={to} className="group relative overflow-hidden bg-void/88 p-7 transition-colors hover:bg-navy/80">
              <Meteors number={4} />
              <IconBadge name={ic} size={18} className="mb-5" />
              <p className="text-sm text-ember">{h}</p>
              <p className="mt-3 text-lg text-hull">{d}</p>
              <p className="mt-8 flex items-center gap-2 text-mist group-hover:text-ember">{cta}<Icon name="rocket" size={15} className="transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" /></p>
            </Link>
          ))}
        </div>
      </div>
      <Bay id="cta" className="mx-auto h-[36vh] w-[28vw] max-w-[200px] lg:col-span-3 lg:col-start-10 lg:h-[58vh] lg:w-full lg:max-w-none" />
    </Section>
  );
}
