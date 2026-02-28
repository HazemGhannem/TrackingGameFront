'use client';

import StatCard from '@/components/StatCard';
import { useAppSelector } from '@/redux/hook';

const STATS = [
  {
    label: 'Active Players',
    value: '18.4K',
    sub: 'Across all regions',
    icon: 'https://cdn.jsdelivr.net/npm/lucide-static@0.441.0/icons/users.svg',
    accent: '#00E676',
  },
  {
    label: 'Tournaments',
    value: '9',
    sub: '3 finals today',
    icon: 'https://cdn.jsdelivr.net/npm/lucide-static@0.441.0/icons/trophy.svg',
    accent: '#FFB300',
  },
  {
    label: 'Prize Pool',
    value: '$2.1M',
    sub: 'This week total',
    icon: 'https://cdn.jsdelivr.net/npm/lucide-static@0.441.0/icons/circle-dollar-sign.svg',
    accent: '#FF3B5C',
  },
];

export default function HeroStats() {
  const { pagination } = useAppSelector((s) => s.liveGame);

  return (
    <div className="pt-10 pb-2 animate-slide-up">
      <div className="mb-8">
        <p className="section-label mb-2">Dashboard</p>
        <h1 className="font-condensed font-800 text-4xl tracking-tight text-white">
          Live <span className="text-[#00E5FF] text-glow-cyan">Esports</span>{' '}
          Tracker
        </h1>
        <p className="text-[#5A6478] text-sm mt-1">
          Real-time match data • Updated every 30 seconds
        </p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          key="live-matches"
          label="Live Matches"
          value={String(pagination.total)}
          sub={`${pagination.total} tracked games`}
          icon="https://cdn.jsdelivr.net/npm/lucide-static@0.441.0/icons/radio.svg"
          accent="#00E5FF"
          delay={0}
        />

        {STATS.map((stat, i) => (
          <StatCard key={stat.label} {...stat} delay={(i + 1) * 0.07} />
        ))}
      </div>
    </div>
  );
}
