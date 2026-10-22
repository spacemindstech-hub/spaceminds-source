import { Atom, BookOpen, ChartColumn, Cog, Drone, Flame, FlaskConical, Monitor, Orbit, Plane, PlaneTakeoff, Presentation, Rocket, Satellite, SatelliteDish, Telescope, Trophy, Wind, Wrench } from 'lucide-react';

const MAP = { atom: Atom, book: BookOpen, chart: ChartColumn, cog: Cog, drone: Drone, flame: Flame, flask: FlaskConical, monitor: Monitor, orbit: Orbit, plane: Plane, takeoff: PlaneTakeoff, present: Presentation, rocket: Rocket, satellite: Satellite, dish: SatelliteDish, telescope: Telescope, trophy: Trophy, wind: Wind, wrench: Wrench };

export default function Icon({ name, size = 22, className = '', strokeWidth = 1.5 }) {
  const C = MAP[name] || Orbit;
  return <C size={size} strokeWidth={strokeWidth} className={className} aria-hidden="true" />;
}

// Icon inside a softly lit orbital badge
export function IconBadge({ name, size = 22, className = '', tone = 'flame' }) {
  const ring = tone === 'print' ? 'from-print/30 to-print/0 text-print' : 'from-ember/25 to-ember/0 text-ember';
  return (
    <span className={`relative inline-flex items-center justify-center rounded-2xl border border-white/10 bg-gradient-to-br ${ring} ${className}`} style={{ width: size * 2.3, height: size * 2.3 }}>
      <span className="absolute inset-0 rounded-2xl bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.14),transparent_60%)]" />
      <Icon name={name} size={size} className="relative" />
    </span>
  );
}
