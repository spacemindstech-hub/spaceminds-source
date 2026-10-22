import TiltedCard from '../rb/TiltedCard';
import nambiThink from '../assets/nambi_think.webp';
import nambiPortrait from '../assets/nambi_portrait.webp';

// Both photos share one treatment: full photo (never cropped), navy glow backdrop, 3D tilt.
// Size follows each photo's real aspect ratio and shrinks to fit any screen width/height.
const PHOTOS = {
  think: { src: nambiThink, ratio: 819 / 1233, maxW: 320 },
  portrait: { src: nambiPortrait, ratio: 900 / 961, maxW: 400 }
};

export default function NambiCard({ photo = 'think', caption = 'Padma Bhushan Shri Nambi Narayanan' }) {
  const p = PHOTOS[photo];
  // width is capped by the card's max width, 86% of the screen width, and 70% of the screen height
  const w = `min(${p.maxW}px, 86vw, calc(70svh * ${p.ratio.toFixed(4)}))`;
  const h = `calc(${w} / ${p.ratio.toFixed(4)})`;
  return (
    <div className="relative flex justify-center">
      <div aria-hidden className="absolute left-1/2 top-1/2 h-[80%] w-[80%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-ember/15 blur-[80px]" />
      <TiltedCard
        imageSrc={p.src}
        altText="Padma Bhushan Shri Nambi Narayanan"
        captionText={caption}
        containerWidth={w}
        containerHeight={h}
        imageWidth={w}
        imageHeight={h}
        rotateAmplitude={10}
        scaleOnHover={1.04}
        showMobileWarning={false}
        showTooltip
      />
    </div>
  );
}
