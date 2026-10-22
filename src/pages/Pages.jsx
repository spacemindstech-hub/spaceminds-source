import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Stepper, { Step } from '../rb/Stepper';
import LightRays from '../rb/LightRays';
import Orb from '../rb/Orb';
import FuzzyText from '../rb/FuzzyText';
import SpotlightCard from '../rb/SpotlightCard';
import GradientText from '../rb/GradientText';
import CircularText from '../rb/CircularText';
import NambiCard from '../components/NambiCard';
import CountUp from '../rb/CountUp';
import mark from '../assets/mark_white.png';
import Icon, { IconBadge } from '../components/Icon';
import { Meteors, Nebula, ToolArt, OrbitSystem, CycleDiagram, Globe } from '../components/fx';
import { Plane, Rocket, Satellite, Drone, Cog, Orbit, Atom, BookOpen, GraduationCap, School, Users } from 'lucide-react';
import { AgeFinder, BuildSelector, Certificate, DayTimeline, EnquiryForm, Faq, SchoolCalculator, VerifyCertificate, useProgram } from '../components/widgets';
import { Button, H2, Kicker, Lead, PageHero, Rule, Section, Tick, cx } from '../components/ui';
import {
  contact, curriculumDesign, ecosystem, faqByAudience, gallery, labs, learningModel, missionWall, missions, nambi, parentFaq, parentTraits,
  problemCards, programs, questionLadder, resources, safety, schoolBenefits, schoolProcess, schoolProvides, smProvides, team, tools, trainerTraits, takeHome
} from '../data/content';

const Block = ({ children, className = '', id }) => <Section id={id} className={cx('py-20 lg:py-28', className)}>{children}</Section>;

function ProgramCard({ p }) {
  return (
    <Link to={`/programs/${p.slug}`} className="group block h-full">
      <SpotlightCard spotlightColor="rgba(123, 44, 191, 0.16)" className="flex h-full flex-col !p-7 transition-colors group-hover:!border-white/25">
        <div className="flex items-center justify-between text-sm text-mist">
          <span>Mission {p.n}</span>
          <span>Ages {p.ages}</span>
        </div>
        <IconBadge name={p.icon} className="mt-6" />
        <p className="mt-5 font-display text-xl font-light leading-tight text-hull">{p.name}</p>
        <p className="mt-1 text-sm text-mist/80">{p.alt}</p>
        <p className="mt-4 leading-relaxed text-mist">{p.tagline}</p>
        <p className="mt-auto pt-6 text-hull/90 group-hover:text-ember">View the mission</p>
      </SpotlightCard>
    </Link>
  );
}

/* ================= WHY ================= */
export function Why() {
  return (
    <>
      <PageHero kicker="Why SpaceMinds" title="Curiosity to creation, by building." intro="SpaceMinds exists to make aerospace accessible to students through hands-on, joyful and rigorous learning." visual={<OrbitSystem domains={['Aeronautics', 'Aerospace', 'Rocketry', 'Drones', 'Satellites', 'Engineering']} />} />
      <Block>
        <div className="grid gap-6 md:grid-cols-2">
          <SpotlightCard className="!p-9"><p className="text-sm text-ember">Our mission</p><p className="mt-3 font-display text-2xl font-light leading-snug text-hull">Make aerospace accessible to students through hands-on, joyful and rigorous learning.</p></SpotlightCard>
          <SpotlightCard className="!p-9"><p className="text-sm text-ember">Our vision</p><p className="mt-3 font-display text-2xl font-light leading-snug text-hull">Build a generation of students who don’t merely consume technology — they understand, question and create it.</p></SpotlightCard>
        </div>
      </Block>
      <Rule />
      <Block>
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <Kicker>The learning model</Kicker>
            <H2>Learn. Build. Test. Think.</H2>
            <Lead>Every SpaceMinds programme moves through the same six stages. Step through them.</Lead>
          </div>
          <div className="rounded-[28px] border border-white/10 bg-navy/80">
            <Stepper initialStep={1} backButtonText="Previous" nextButtonText="Next" stepCircleContainerClassName="!max-w-none !border-0 !bg-transparent !shadow-none" contentClassName="text-hull" nextButtonProps={{ className: '!bg-flame !text-white' }}>
              {learningModel.map((s, i) => (
                <Step key={s.k}>
                  <p className="text-sm text-ember">Stage {i + 1} of 6</p>
                  <p className="mt-2 font-display text-3xl font-light text-hull">{s.k}</p>
                  <p className="mt-3 text-lg text-mist">{s.d}</p>
                </Step>
              ))}
            </Stepper>
          </div>
        </div>
      </Block>
      <Rule />
      <Block>
        <Kicker>Why hands-on</Kicker>
        <H2 className="max-w-[20ch]">The future of aerospace cannot be learned from a textbook alone.</H2>
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {problemCards.map(c => (
            <SpotlightCard key={c.t} className="!p-7"><Meteors number={6} /><IconBadge name={c.icon} /><p className="mt-4 font-display text-xl font-light text-hull">{c.t}</p><p className="mt-2 text-mist">{c.d}</p></SpotlightCard>
          ))}
        </div>
      </Block>
      <Rule />
      <Block>
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <Kicker>Curriculum design</Kicker>
            <H2>Designed around how students learn.</H2>
          </div>
          <ol className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
            {curriculumDesign.map((c, i) => (
              <li key={c.k} className="border-t border-white/10 pt-4">
                <p className="text-[13px] text-ember tabular-nums">{String(i + 1).padStart(2, '0')}</p>
                <p className="mt-1 text-lg text-hull">{c.k}</p>
                <p className="text-mist">{c.d}</p>
              </li>
            ))}
          </ol>
        </div>
      </Block>
      <Rule />
      <Block>
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <Kicker>Trainers</Kicker>
            <H2>The person in the room matters.</H2>
            <Lead>A great aerospace programme needs more than good content. It needs someone who can:</Lead>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">{trainerTraits.map(t => <Tick key={t}>{t}</Tick>)}</ul>
          </div>
          <div id="safety">
            <Kicker>Safety</Kicker>
            <H2>Safety is part of the curriculum.</H2>
            <ul className="mt-8 grid gap-3 sm:grid-cols-2">{safety.map(t => <Tick key={t} color="text-print">{t}</Tick>)}</ul>
          </div>
        </div>
      </Block>
    </>
  );
}

/* ================= PROGRAMS ================= */
export function ProgramsPage() {
  const rows = [['Age', p => p.ages], ['Duration', p => p.compare.duration], ['Build', p => p.compare.build], ['Simulation', p => p.compare.simulation], ['Coding', p => p.compare.coding], ['Flight', p => p.compare.flight], ['Certification', p => p.compare.cert]];
  return (
    <>
      <PageHero kicker="Programs" title="Choose your mission." intro="Seven 10-day hands-on missions for ages 5 to 18. Practical, project-based, experiential — with a maximum of 15 students per batch." visual={<OrbitSystem domains={['Young Explorer', 'Flight & Space', 'Drone Lab', 'Rocket Lab', 'Mission Orbit', "Engineer's Lab", 'Aerospace Lab']} icons={[Atom, Plane, Drone, Rocket, Satellite, Cog, Orbit]} />}>
        <p className="mt-6 text-mist">{nambi.curated}. Curriculum designed by Mr. Kiran Koushik.</p>
      </PageHero>
      <Block className="!pt-0">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{programs.map(p => <ProgramCard key={p.slug} p={p} />)}</div>
      </Block>
      <Rule />
      <Block>
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <Kicker>Age finder</Kicker>
            <H2>What’s your age? Start here.</H2>
            <Lead>Move the slider, or pick an age band, to see the missions made for that age.</Lead>
          </div>
          <AgeFinder />
        </div>
      </Block>
      <Rule />
      <Block>
        <Kicker>Compare</Kicker>
        <H2>Course comparison.</H2>
        <div className="mt-10 overflow-x-auto rounded-[24px] border border-white/10 bg-navy/75">
          <table className="w-full min-w-[900px] text-left text-[15px]">
            <thead>
              <tr className="border-b border-white/10">
                <th className="p-4 font-normal text-mist" scope="col"><span className="sr-only">Attribute</span></th>
                {programs.map(p => <th key={p.slug} scope="col" className="p-4 align-bottom font-normal text-hull"><Icon name={p.icon} size={16} className="mb-2 block text-ember" />{p.alt}</th>)}
              </tr>
            </thead>
            <tbody>
              {rows.map(([k, f]) => (
                <tr key={k} className="border-b border-white/5 last:border-0">
                  <th scope="row" className="p-4 font-normal text-mist">{k}</th>
                  {programs.map(p => <td key={p.slug} className="p-4 text-hull/90">{f(p)}</td>)}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Block>
      <Rule />
      <Block>
        <Kicker>What will I build?</Kicker>
        <H2 className="mb-10">Learn, build, test, then fly the mission.</H2>
        <BuildSelector />
      </Block>
    </>
  );
}

export function ProgramDetail() {
  const { slug } = useParams();
  const p = useProgram(slug);
  if (!p) return <NotFound />;
  const idx = programs.indexOf(p);
  const next = programs[(idx + 1) % programs.length];
  return (
    <>
      <Section className="pb-12 pt-40 md:pt-48">
        <Link to="/programs" className="text-sm text-mist hover:text-hull">All programs</Link>
        <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-mist">
          <IconBadge name={p.icon} size={24} />
          <span>Mission {p.n}</span>
          <span>Ages {p.ages}</span>
          <span>10 days</span>
          <span>{p.format}</span>
        </div>
        <h1 className="mt-6 max-w-[18ch] font-display text-[clamp(2.4rem,6vw,5rem)] font-light leading-[1.02] tracking-[-0.03em] text-hull">{p.name}</h1>
        <p className="mt-3 text-lg text-mist">{p.alt}</p>
        <p className="mt-8 max-w-[26ch] font-display text-[clamp(1.4rem,2.6vw,2.1rem)] font-light leading-snug">
          <GradientText colors={['#C9A0F5', '#9D4EDD', '#8ED8FF', '#C9A0F5']} animationSpeed={7}>{p.tagline}</GradientText>
        </p>
        <Lead>{p.summary}</Lead>
        <div className="mt-9 flex flex-wrap gap-3">
          <Button to="/contact">Enquire about this mission</Button>
          <Button to="/schools" variant="ghost">Run it at your school</Button>
        </div>
      </Section>
      <Rule />
      <Block>
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4"><Kicker>Curriculum</Kicker><H2>What students {p.focus ? 'focus on' : 'learn'}.</H2></div>
          <div className="lg:col-span-8">
            {p.modules ? (
              <ol className="divide-y divide-white/10 border-y border-white/10">
                {p.modules.map(([t, items], i) => (
                  <li key={t} className="grid gap-3 py-5 sm:grid-cols-[4rem_1fr]">
                    <span className="text-ember tabular-nums">{String(i + 1).padStart(2, '0')}</span>
                    <div>
                      <p className="text-lg text-hull">{t}</p>
                      <p className="mt-1 text-mist">{items.join(', ')}</p>
                    </div>
                  </li>
                ))}
              </ol>
            ) : (
              <ul className="grid gap-3 sm:grid-cols-2">{(p.learn || p.focus).map(x => <Tick key={x}>{x}</Tick>)}</ul>
            )}
            {p.note && <p className="mt-6 text-sm text-mist/80">{p.note}</p>}
          </div>
        </div>
      </Block>
      {p.challenge && (
        <>
          <Rule />
          <Block>
            <div className="grid gap-12 lg:grid-cols-2">
              <div>
                <Kicker>The reverse engineering challenge</Kicker>
                <H2>For each product, students learn to:</H2>
                <ol className="mt-8 space-y-3">{p.challenge.map((c, i) => <li key={c} className="flex gap-4 text-hull/90"><span className="w-6 text-ember tabular-nums">{i + 1}</span>{c}</li>)}</ol>
              </div>
              <div>
                <Kicker>Engineering thinking</Kicker>
                <H2>Students learn to ask:</H2>
                <ul className="mt-8 space-y-4">{p.questions.map(q => <li key={q} className="font-display text-xl font-light text-hull">{q}</li>)}</ul>
              </div>
            </div>
          </Block>
        </>
      )}
      <Rule />
      <Block>
        <div className="grid gap-12 lg:grid-cols-3">
          {p.handsOn && (
            <div><Kicker>Hands-on experiences</Kicker><ul className="space-y-3">{p.handsOn.map(x => <Tick key={x}>{x}</Tick>)}</ul></div>
          )}
          <div><Kicker>Students develop</Kicker><p className="flex flex-wrap gap-2">{p.develop.map(x => <span key={x} className="rounded-full border border-white/12 px-3 py-1.5 text-hull/90">{x}</span>)}</p></div>
          <div>
            <Kicker>Takeaway</Kicker>
            <p className="font-display text-2xl font-light leading-snug text-hull">{p.takeaway}</p>
          </div>
        </div>
      </Block>
      <Rule />
      <Block>
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <p className="text-mist">Next mission</p>
          <Link to={`/programs/${next.slug}`} className="font-display text-[clamp(1.6rem,3.4vw,2.8rem)] font-light text-hull hover:text-ember">
            <span className="inline-flex items-center gap-4"><Icon name={next.icon} size={34} strokeWidth={1.2} className="text-ember" />{next.name}</span>
          </Link>
        </div>
      </Block>
    </>
  );
}

/* ================= LEARNING ================= */
export function Learning() {
  const [wall, setWall] = useState(null);
  return (
    <>
      <PageHero kicker="Learning experience" title="Learn, build, test, repeat." intro="Students learn a concept and immediately connect it with experiments, models, simulations, construction, testing and problem-solving." visual={<CycleDiagram items={learningModel.map(l => l.k)} center="Learning model" sub="Every programme, every day" />} />
      <Block className="!pt-0">
        <ol className="grid gap-px overflow-hidden rounded-[26px] border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-6">
          {learningModel.map((s, i) => (
            <li key={s.k} className="bg-void/88 p-6">
              <p className="text-[13px] text-ember tabular-nums">{String(i + 1).padStart(2, '0')}</p>
              <p className="mt-2 text-lg text-hull">{s.k}</p>
              <p className="mt-1 text-sm text-mist">{s.d}</p>
            </li>
          ))}
        </ol>
      </Block>
      <Rule />
      <Block>
        <Kicker>Tools and technology</Kicker>
        <H2>Real tools. Real systems. Real thinking.</H2>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {tools.map(t => <SpotlightCard key={t.name} spotlightColor="rgba(142,216,255,0.16)" className="!p-7"><div className="sm-grid -mx-7 -mt-7 mb-5 border-b border-white/10 px-5 py-3"><ToolArt name={t.name} /></div><p className="font-display text-xl font-light text-hull">{t.name}</p><p className="mt-2 text-mist">{t.d}</p></SpotlightCard>)}
        </div>
      </Block>
      <Rule />
      <Block>
        <Kicker>The 10-day journey</Kicker>
        <H2 className="mb-12">10 days. One aerospace journey.</H2>
        <DayTimeline />
      </Block>
      <Rule />
      <Block>
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <Kicker>Mission wall</Kicker>
            <H2>What would you build?</H2>
            <Lead>Pick a mission to see where you’d learn to do it.</Lead>
          </div>
          <ul className="space-y-3">
            {missionWall.map((m, i) => {
              const prog = programs.find(p => p.slug === m.p);
              return (
                <li key={m.q}>
                  <button onClick={() => setWall(wall === i ? null : i)} aria-expanded={wall === i} className={cx('w-full rounded-2xl border px-5 py-4 text-left transition-colors', wall === i ? 'border-ember bg-ember/10' : 'border-white/10 bg-navy/75 hover:border-white/30')}>
                    <span className="text-lg text-hull">{m.q}</span>
                    {wall === i && (
                      <span className="mt-2 block text-mist">
                        Your mission starts in <Link className="text-ember underline underline-offset-4" to={`/programs/${prog.slug}`}>{prog.name}</Link>.
                      </span>
                    )}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </Block>
      <Rule />
      <Block>
        <Kicker>Student missions</Kicker>
        <H2>Not just classes. Missions.</H2>
        <ul className="mt-10 grid gap-x-8 gap-y-4 sm:grid-cols-2 lg:grid-cols-3">
          {missions.map(([i, t]) => <li key={t} className="flex items-center gap-4 border-b border-white/8 pb-4 text-hull/90"><IconBadge name={i} size={15} />{t}</li>)}
        </ul>
      </Block>
    </>
  );
}

/* ================= SCHOOLS ================= */
export function Schools() {
  return (
    <>
      <PageHero kicker="For schools" title="Bring aerospace education to your school." intro="SpaceMinds provides the programme, trainers, kits, books, software and certification. Your school provides the platform." visual={<div className="relative"><div className="absolute inset-[14%] rounded-full bg-print/10 blur-3xl" /><Globe className="relative mx-auto max-w-[440px]" /></div>}>
        <div className="mt-9 flex flex-wrap gap-3"><Button href="#enquire">Request a school demo</Button><Button href="#colleges" variant="ghost">For colleges</Button></div>
      </PageHero>
      <Block className="!pt-0">
        <Kicker>School partnership model</Kicker>
        <div className="grid gap-6 md:grid-cols-2">
          <SpotlightCard className="!p-8"><p className="font-display text-2xl font-light text-hull">School provides</p><ul className="mt-6 space-y-3">{schoolProvides.map(x => <Tick key={x} color="text-print">{x}</Tick>)}</ul></SpotlightCard>
          <SpotlightCard spotlightColor="rgba(123,44,191,0.18)" className="!p-8"><p className="font-display text-2xl font-light text-hull">SpaceMinds provides</p><ul className="mt-6 space-y-3">{smProvides.map(x => <Tick key={x}>{x}</Tick>)}</ul></SpotlightCard>
        </div>
      </Block>
      <Rule />
      <Block>
        <Kicker>School benefits</Kicker>
        <H2>Why schools partner with SpaceMinds.</H2>
        <dl className="mt-12 grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {schoolBenefits.map(b => <div key={b.t} className="border-t border-white/10 pt-5"><dt className="text-lg text-hull">{b.t}</dt><dd className="mt-2 text-mist">{b.d}</dd></div>)}
        </dl>
      </Block>
      <Rule />
      <Block>
        <Kicker>How it works</Kicker>
        <H2>From first conversation to launch day.</H2>
        <ol className="mt-12 grid gap-px overflow-hidden rounded-[26px] border border-white/10 bg-white/10 sm:grid-cols-3">
          {schoolProcess.map((s, i) => (
            <li key={s.k} className="bg-void/88 p-6">
              <p className="text-[13px] text-ember tabular-nums">{String(i + 1).padStart(2, '0')}</p>
              <p className="mt-2 text-lg text-hull">{s.k}</p>
              <p className="mt-1 text-mist">{s.d}</p>
            </li>
          ))}
        </ol>
      </Block>
      <Rule />
      <Block>
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <Kicker>Partnership calculator</Kicker>
            <H2>Estimate your programme.</H2>
            <Lead>Enter your expected enrolment and fee to see the gross programme revenue and your school’s share.</Lead>
          </div>
          <SchoolCalculator />
        </div>
      </Block>
      <Rule />
      <Block id="colleges">
        <Kicker>For colleges and institutions</Kicker>
        <H2 className="max-w-[22ch]">A Centre of Excellence: a space lab for every branch of engineering.</H2>
        <Lead>SpaceMinds establishes a fully equipped space and aerospace laboratory inside your institution, trains your faculty to run it, and provides the curriculum, hardware, certification and student portfolio system. The institution owns all equipment outright.</Lead>
        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {labs.map((l, i) => (
            <SpotlightCard key={l.name} spotlightColor={i === 2 ? 'rgba(123,44,191,0.2)' : 'rgba(142,216,255,0.14)'} className={cx('flex flex-col !p-8', i === 2 && '!border-ember/40')}>
              <p className="font-display text-xl font-light text-hull">{l.name}</p>
              <p className="mt-3 font-display text-3xl font-extralight text-hull">{l.price}</p>
              <p className="mt-2 text-mist">{l.size}, {l.seats} students at a time</p>
              <ul className="mt-6 space-y-2.5 text-[15px]">{l.items.map(x => <Tick key={x}>{x}</Tick>)}</ul>
              <p className="mt-auto pt-6 text-sm text-mist">{l.comp} complimentary memberships in year one. Minimum {l.min} paying members a year.</p>
            </SpotlightCard>
          ))}
        </div>
        <div className="mt-10 grid gap-6 text-mist md:grid-cols-4">
          <p><span className="block text-hull">₹2,500</span>per student per year membership, open to all branches</p>
          <p><span className="block text-hull">30%</span>of all student fees returned to the institution</p>
          <p><span className="block text-hull">₹50,000</span>one-time faculty development programme</p>
          <p><span className="block text-hull">3 years</span>minimum term; all figures exclusive of 18% GST</p>
        </div>
      </Block>
      <Rule />
      <Block id="enquire">
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <Kicker>School enquiry</Kicker>
            <H2>Request a school demo.</H2>
            <Lead>Tell us about your school and we’ll schedule a programme discussion.</Lead>
            <p className="mt-8 text-mist">Institutions: <a className="text-hull hover:text-ember" href="tel:+918122211194">{contact.institutionsPhone}</a></p>
          </div>
          <EnquiryForm kind="school" />
        </div>
      </Block>
    </>
  );
}

/* ================= PARENTS ================= */
export function Parents() {
  return (
    <>
      <PageHero kicker="For parents" title="For parents who want more than marks." intro="Your child’s future will not be built only through examinations. SpaceMinds gives students an environment where they can ask questions, build things, test ideas and discover how science becomes technology." visual={<CycleDiagram items={parentTraits.map(t => t.replace('.', ''))} center="Beyond marks" sub="What hands-on learning builds" />}>
        <p className="mt-8 flex flex-wrap gap-2">{parentTraits.map(t => <span key={t} className="rounded-full border border-white/12 px-4 py-1.5 text-hull/90">{t}</span>)}</p>
      </PageHero>
      <Block className="!pt-0">
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <Kicker>Age finder</Kicker>
            <H2>Find the right programme.</H2>
            <Lead>Programmes are structured by age and learning level, so beginners are welcome.</Lead>
          </div>
          <AgeFinder />
        </div>
      </Block>
      <Rule />
      <Block>
        <Kicker>What your child takes home</Kicker>
        <H2>They don’t leave with just a certificate.</H2>
        <dl className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {takeHome.map(t => <div key={t.t} className="border-t border-white/10 pt-5"><dt className="text-lg text-hull">{t.t}</dt><dd className="mt-2 text-mist">{t.d}</dd></div>)}
        </dl>
      </Block>
      <Rule />
      <Block>
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4"><Kicker>Parent FAQ</Kicker><H2>Questions parents ask.</H2></div>
          <div className="lg:col-span-8"><Faq items={parentFaq} /></div>
        </div>
      </Block>
      <Rule />
      <Block id="enrol">
        <div className="grid gap-12 lg:grid-cols-2">
          <div><Kicker>Parent enquiry</Kicker><H2>Find my programme.</H2><Lead>Share a few details and our team will recommend the right mission.</Lead></div>
          <EnquiryForm kind="parent" />
        </div>
      </Block>
    </>
  );
}

/* ================= JOURNEY ================= */
export function Journey() {
  return (
    <>
      <PageHero kicker="Student journey" title="From curious student to aerospace thinker." intro="Aerospace learning is a journey, not a one-time camp." visual={<CycleDiagram items={ecosystem.map(e => e.k)} center="SpaceMinds ecosystem" sub="Explore to mission" />} />
      <Block className="!pt-0">
        <ol className="relative ml-3 border-l border-white/15">
          {questionLadder.map((q, i) => (
            <li key={q} className="relative pb-8 pl-8 last:pb-0">
              <span className={cx('absolute -left-[7px] top-2 h-3 w-3 rounded-full border', i === questionLadder.length - 1 ? 'border-ember bg-ember' : 'border-white/40 bg-void')} />
              <p className="font-display text-[clamp(1.4rem,3vw,2.3rem)] font-light text-hull" style={{ opacity: 0.55 + (i / questionLadder.length) * 0.45 }}>{q}</p>
            </li>
          ))}
        </ol>
      </Block>
      <Rule />
      <Block>
        <Kicker>The SpaceMinds ecosystem</Kicker>
        <H2>Explore, foundation, build, engineer, advanced, mission.</H2>
        <ol className="mt-12 grid gap-px overflow-hidden rounded-[26px] border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-3">
          {ecosystem.map((e, i) => (
            <li key={e.k} className="bg-void/88 p-7">
              <p className="text-[13px] text-ember tabular-nums">{String(i + 1).padStart(2, '0')}</p>
              <p className="mt-2 font-display text-xl font-light text-hull">SpaceMinds {e.k}</p>
              <p className="mt-1 text-mist">{e.d}</p>
            </li>
          ))}
        </ol>
      </Block>
      <Rule />
      <Block id="projects">
        <Kicker>Student projects</Kicker>
        <H2>Built by students.</H2>
        <Lead>Each build is shown with what students made, what they learned and the age group. Photos from upcoming batches will appear here.</Lead>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {gallery.map(g => (
            <figure key={g.t} className="overflow-hidden rounded-[22px] border border-white/10 bg-navy/80">
              <div className="sm-grid relative flex aspect-[4/3] items-center justify-center overflow-hidden bg-[radial-gradient(circle_at_50%_40%,#0b2a52,#02060F_70%)]">
                <div className="sm-scan absolute inset-x-0 top-0 h-full" />
                <Icon name={g.icon} size={54} strokeWidth={1} className="relative text-hull/85 drop-shadow-[0_0_18px_rgba(142,216,255,0.45)]" />
                <span className="absolute bottom-3 right-3 rounded-full bg-void/85 px-2.5 py-1 text-[11px] text-mist">{g.age}</span>
              </div>
              <figcaption className="p-5"><p className="text-hull">{g.t}</p><p className="mt-1 text-sm text-mist">{g.learned}</p></figcaption>
            </figure>
          ))}
        </div>
      </Block>
      <Rule />
      <Block id="portfolio">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <Kicker>Portfolio</Kicker>
            <H2>My SpaceMinds portfolio.</H2>
            <Lead>Every student gets a SpaceMinds Student ID and a portfolio that collects projects, photos, videos, mission reports, certificates, badges, skills and completed programmes.</Lead>
            <p className="mt-4 text-sm text-mist/80">Sample profile shown. Student portfolios are coming soon.</p>
          </div>
          <div className="relative rounded-[28px] border border-white/10 bg-navy/85 p-8">
            <div className="absolute -right-6 -top-10 hidden md:block"><CircularText text="SPACEMINDS*STUDENT*ID*" spinDuration={24} className="!h-[120px] !w-[120px] text-print" /></div>
            <p className="text-sm text-mist">SpaceMinds Student ID</p>
            <p className="mt-1 font-display text-3xl font-light text-hull">Sample student</p>
            <dl className="mt-8 grid grid-cols-2 gap-6">
              {[['Missions completed', 6], ['Rockets built', 2], ['Drone missions', 3], ['Satellite projects', 1], ['Engineering challenges', 4]].map(([k, v]) => (
                <div key={k}><dt className="text-sm text-mist">{k}</dt><dd className="font-display text-3xl font-extralight text-hull"><CountUp to={v} duration={1.4} /></dd></div>
              ))}
            </dl>
          </div>
        </div>
      </Block>
      <Rule />
      <Block id="certificates">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <Kicker>Certificates</Kicker>
            <H2>Recognise the work. Celebrate the achievement.</H2>
            <Lead>Students who complete a programme receive a SpaceMinds Certificate of Achievement with programme, course, school, batch and completion details, along with the stated endorsement and registration references.</Lead>
            <div className="mt-8"><VerifyCertificate /></div>
          </div>
          <Certificate />
        </div>
      </Block>
    </>
  );
}

/* ================= ABOUT ================= */
export function About() {
  return (
    <>
      <div className="relative">
        <div className="pointer-events-none absolute inset-0 h-[90vh] opacity-70">
          <LightRays raysOrigin="top-center" raysColor="#D9C4FF" raysSpeed={0.6} lightSpread={0.9} rayLength={1.6} followMouse mouseInfluence={0.06} noiseAmount={0.05} distortion={0.03} />
        </div>
        <PageHero kicker="About SpaceMinds" title="Inspiring India’s next generation of space scientists." intro="SpaceMinds is an experiential space education and innovation ecosystem helping the next generation move from curiosity to creation. Imagine. Build. Explore." />
      </div>
      <Block className="!pt-0">
        <div className="grid items-center gap-14 lg:grid-cols-2">
          <div className="flex justify-center">
            <NambiCard photo="portrait" />
          </div>
          <div>
            <Kicker>Guidance and endorsement</Kicker>
            <H2>{nambi.honorific} {nambi.name}</H2>
            <Lead>{nambi.guidance}</Lead>
            <Lead className="mt-4">{nambi.curriculum}</Lead>
          </div>
        </div>
      </Block>
      <Rule />
      <Block>
        <div className="grid items-center gap-14 lg:grid-cols-2">
          <div>
            <Kicker>Curriculum</Kicker>
            <H2>Curriculum built with aerospace expertise.</H2>
            <div className="mt-8 space-y-6">
              <div className="border-l border-ember/60 pl-5"><p className="text-sm text-mist">Curriculum curated by</p><p className="text-lg text-hull">Mr. Nambi Narayanan, Padma Bhushan Scientist</p></div>
              <div className="border-l border-print/60 pl-5"><p className="text-sm text-mist">Curriculum designed by</p><p className="text-lg text-hull">Mr. Kiran Koushik</p></div>
            </div>
          </div>
          <div className="flex justify-center">
            <NambiCard photo="think" />
          </div>
        </div>
      </Block>
      <Rule />
      <Block>
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <Kicker>Team</Kicker>
            <H2>The people behind SpaceMinds.</H2>
            <Lead>Supported by a team of trainers and technical partners, based in Chennai.</Lead>
          </div>
          <ul className="divide-y divide-white/10 border-y border-white/10">
            {team.map(t => <li key={t.name} className="flex items-baseline justify-between gap-4 py-5"><span className="font-display text-xl font-light text-hull">{t.name}</span><span className="text-right text-mist">{t.role}</span></li>)}
          </ul>
        </div>
      </Block>
      <Rule />
      <Block>
        <div className="grid gap-6 md:grid-cols-2">
          <SpotlightCard className="!p-9"><p className="text-sm text-ember">Our mission</p><p className="mt-3 font-display text-2xl font-light text-hull">Make aerospace accessible to students through hands-on, joyful and rigorous learning.</p></SpotlightCard>
          <SpotlightCard className="!p-9"><p className="text-sm text-ember">Our vision</p><p className="mt-3 font-display text-2xl font-light text-hull">A generation of students who don’t merely consume technology. They understand, question and create it.</p></SpotlightCard>
        </div>
        <div className="mt-10"><Kicker>Partners and credentials</Kicker><p className="text-lg text-hull/90">ISRO Space Tutor  |  AASSC  |  Endorsed by Shri Nambi Narayanan</p></div>
      </Block>
    </>
  );
}

/* ================= RESOURCES ================= */
export function Resources() {
  const [tab, setTab] = useState('Parents');
  return (
    <>
      <PageHero kicker="Resources" title="Guides, material and answers." intro="Resources for students, parents and schools. Documents are shared on request while the resource library is being built." visual={<OrbitSystem domains={['Students', 'Parents', 'Schools', 'Stories', 'FAQ', 'Guides']} icons={[GraduationCap, Users, School, BookOpen, Atom, Orbit]} />} />
      <Block className="!pt-0">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {Object.entries(resources).map(([k, items]) => (
            <SpotlightCard key={k} className="!p-7">
              <p className="font-display text-xl font-light text-hull">{k}</p>
              <ul className="mt-5 space-y-2.5">{items.map(i => <Tick key={i}>{i}</Tick>)}</ul>
            </SpotlightCard>
          ))}
        </div>
        <p className="mt-8 text-mist">Need the programme brochure or school proposal now? <a className="text-hull underline decoration-white/30 underline-offset-4 hover:decoration-ember" href={`mailto:${contact.email}?subject=Resource%20request`}>Request it by email</a>.</p>
      </Block>
      <Rule />
      <Block id="faq">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Kicker>FAQ</Kicker>
            <H2>Frequently asked.</H2>
            <div className="mt-8 flex flex-wrap gap-2" role="tablist">
              {Object.keys(faqByAudience).map(k => (
                <button key={k} role="tab" aria-selected={tab === k} onClick={() => setTab(k)} className={cx('rounded-full border px-4 py-2', tab === k ? 'border-ember bg-flame text-white' : 'border-white/15 text-hull hover:border-white/40')}>{k}</button>
              ))}
            </div>
          </div>
          <div className="lg:col-span-8"><Faq key={tab} items={faqByAudience[tab]} /></div>
        </div>
      </Block>
    </>
  );
}

/* ================= CONTACT ================= */
export function Contact() {
  const [kind, setKind] = useState('parent');
  return (
    <>
      <Section className="grid items-center gap-10 pb-10 pt-40 md:pt-48 lg:grid-cols-2">
        <div>
          <Kicker>Contact</Kicker>
          <h1 className="font-display text-[clamp(2.4rem,6vw,5rem)] font-light leading-[1.02] tracking-[-0.03em] text-hull">Ready to launch?</h1>
          <Lead>Parents: find the right programme for your child. Schools: bring SpaceMinds to your students.</Lead>
          <div className="mt-8 space-y-2 text-lg">
            <p><a className="text-hull hover:text-ember" href={`mailto:${contact.email}`}>{contact.email}</a></p>
            <p><a className="text-hull hover:text-ember" href={contact.phoneHref}>{contact.phone}</a></p>
            <p className="text-mist">{contact.address}</p>
          </div>
        </div>
        <div className="relative mx-auto aspect-square w-full max-w-[420px]">
          <Orb hue={0} hoverIntensity={0.35} rotateOnHover forceHoverState={false} backgroundColor="#02060F" />
          <img src={mark} alt="" className="pointer-events-none absolute left-1/2 top-1/2 w-[28%] -translate-x-1/2 -translate-y-1/2 opacity-90" />
        </div>
      </Section>
      <Block className="!pt-6">
        <div className="mb-8 flex flex-wrap gap-2" role="tablist">
          {[['parent', 'Parent enquiry'], ['school', 'School partnership']].map(([k, l]) => (
            <button key={k} role="tab" aria-selected={kind === k} onClick={() => setKind(k)} className={cx('rounded-full border px-5 py-2.5', kind === k ? 'border-ember bg-flame text-white' : 'border-white/15 text-hull hover:border-white/40')}>{l}</button>
          ))}
        </div>
        <EnquiryForm key={kind} kind={kind} />
      </Block>
    </>
  );
}

/* ================= POLICIES ================= */
export function Policies() {
  const docs = [
    ['privacy', 'Privacy Policy', 'How SpaceMinds collects, uses and protects student, parent and school information. The full policy is available on request.'],
    ['terms', 'Terms', 'Programme terms, enrolment, fees and cancellation. Shared with every enrolment and school agreement.'],
    ['consent', 'Parent Consent', 'A signed parent consent is collected for every student before the programme begins, including consent for supervised hands-on activities such as rocket launches and drone flying.']
  ];
  return (
    <>
      <PageHero kicker="Policies" title="Policies and safety." intro={`Questions about any policy? Write to ${contact.email}.`} />
      <Block className="!pt-0">
        <div className="grid gap-5 md:grid-cols-3">
          {docs.map(([id, t, d]) => <div key={id} id={id} className="rounded-[24px] border border-white/10 bg-navy/80 p-7"><p className="font-display text-xl font-light text-hull">{t}</p><p className="mt-3 text-mist">{d}</p></div>)}
        </div>
      </Block>
      <Block id="safety">
        <Kicker>Safety</Kicker>
        <H2>Safety is part of the curriculum.</H2>
        <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">{safety.map(s => <Tick key={s} color="text-print">{s}</Tick>)}</ul>
      </Block>
    </>
  );
}

export function NotFound() {
  return (
    <Section className="flex min-h-[80vh] flex-col items-start justify-center pt-32">
      <FuzzyText baseIntensity={0.18} hoverIntensity={0.45} enableHover fontSize="clamp(4rem, 14vw, 10rem)" fontWeight={300} fontFamily="Unbounded, sans-serif" color="#EEF3FA">404</FuzzyText>
      <p className="mt-6 text-lg text-mist">This page drifted out of orbit.</p>
      <div className="mt-8"><Button to="/">Back to home</Button></div>
    </Section>
  );
}
