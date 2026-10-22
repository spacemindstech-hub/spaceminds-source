import { Hero, TrustStrip, NambiSection, WhatIs } from '../sections/HomeA';
import Teardown from '../sections/Teardown';
import { Tools, Curriculum, Impact, ReadyToLaunch } from '../sections/HomeB';
import { LaunchComplex } from '../components/Footer';

export default function Home() {
  return (
    <>
      <Hero />
      <TrustStrip />
      <NambiSection />
      <WhatIs />
      <Teardown />
      <Tools />
      <Curriculum />
      <Impact />
      <ReadyToLaunch />
      <LaunchComplex />
    </>
  );
}
