'use client';

import Image from "next/image";

const TEAMS = [
  {
    rank: 1,
    name: 'T1',
    tag: 'T1',
    game: 'LoL',
    wins: 22,
    losses: 4,
    pts: 2840,
    color: '#C89B3C',
    change: 'up',
  },
  {
    rank: 2,
    name: 'Natus Vincere',
    tag: 'NAVI',
    game: 'CS2',
    wins: 19,
    losses: 7,
    pts: 2710,
    color: '#F5A623',
    change: 'up',
  },
  {
    rank: 3,
    name: 'Team Vitality',
    tag: 'VIT',
    game: 'CS2',
    wins: 18,
    losses: 8,
    pts: 2640,
    color: '#FFD700',
    change: 'down',
  },
  {
    rank: 4,
    name: 'Sentinels',
    tag: 'SEN',
    game: 'VALO',
    wins: 17,
    losses: 9,
    pts: 2510,
    color: '#FF4655',
    change: 'up',
  },
  {
    rank: 5,
    name: 'OG Esports',
    tag: 'OG',
    game: 'Dota2',
    wins: 16,
    losses: 10,
    pts: 2420,
    color: '#3498DB',
    change: 'same',
  },
  {
    rank: 6,
    name: 'NRG Esports',
    tag: 'NRG',
    game: 'VALO',
    wins: 15,
    losses: 11,
    pts: 2380,
    color: '#00B4D8',
    change: 'down',
  },
  {
    rank: 7,
    name: 'Team Spirit',
    tag: 'TSP',
    game: 'Dota2',
    wins: 14,
    losses: 12,
    pts: 2290,
    color: '#E74C3C',
    change: 'up',
  },
  {
    rank: 8,
    name: 'Gen.G',
    tag: 'GEN',
    game: 'LoL',
    wins: 13,
    losses: 13,
    pts: 2180,
    color: '#00C8C8',
    change: 'same',
  },
];

const changeIcon = {
  up: {
    icon: 'https://cdn.jsdelivr.net/npm/lucide-static@0.441.0/icons/trending-up.svg',
    color: '#00E676',
  },
  down: {
    icon: 'https://cdn.jsdelivr.net/npm/lucide-static@0.441.0/icons/trending-down.svg',
    color: '#FF3B5C',
  },
  same: {
    icon: 'https://cdn.jsdelivr.net/npm/lucide-static@0.441.0/icons/minus.svg',
    color: '#5A6478',
  },
};

export default function Leaderboard() {
  return (
    <section className="card overflow-hidden h-fit">
      {/* Header */}
      <div className="px-5 py-4 border-b border-[#1A2030] flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Image
            src="https://cdn.jsdelivr.net/npm/lucide-static@0.441.0/icons/trophy.svg"
            className="w-4 h-4"
            alt="leaderboard"
            style={{
              filter:
                'invert(0.7) sepia(1) hue-rotate(10deg) saturate(5) brightness(0.9)',
            }}
            width={16}
            height={16}
          />
          <h2 className="font-condensed font-700 text-lg text-white tracking-wide">
            LEADERBOARD
          </h2>
        </div>
        <button className="section-label hover:text-[#00E5FF] transition-colors cursor-pointer">
          Global ↓
        </button>
      </div>

      {/* Col headers */}
      <div className="px-5 py-2 grid grid-cols-[28px_1fr_56px_48px] gap-2 border-b border-[#1A2030]">
        <span className="section-label text-center">#</span>
        <span className="section-label">Team</span>
        <span className="section-label text-right">W–L</span>
        <span className="section-label text-right">PTS</span>
      </div>

      {/* Rows */}
      <div>
        {TEAMS.map((team, i) => {
          const change = changeIcon[team.change as keyof typeof changeIcon];
          const isTop3 = team.rank <= 3;

          return (
            <div
              key={team.rank}
              className={`px-5 py-3 grid grid-cols-[28px_1fr_56px_48px] gap-2 items-center border-b border-[#0D1017] hover:bg-[#111520] transition-colors cursor-pointer ${
                isTop3 ? 'bg-[rgba(0,229,255,0.02)]' : ''
              }`}
            >
              {/* Rank */}
              <span
                className={`font-condensed font-700 text-sm text-center ${
                  team.rank === 1
                    ? 'text-[#FFD700]'
                    : team.rank === 2
                      ? 'text-[#C0C0C0]'
                      : team.rank === 3
                        ? 'text-[#CD7F32]'
                        : 'text-[#3A4155]'
                }`}
              >
                {team.rank}
              </span>

              {/* Team */}
              <div className="flex items-center gap-2.5 min-w-0">
                <div
                  className="w-7 h-7 rounded-md flex items-center justify-center font-condensed font-800 text-xs shrink-0 text-black"
                  style={{ background: team.color }}
                >
                  {team.tag[0]}
                </div>
                <div className="min-w-0">
                  <p className="font-condensed font-700 text-sm text-white leading-none truncate">
                    {team.tag}
                  </p>
                  <p className="text-[#3A4155] text-[10px] truncate">
                    {team.game}
                  </p>
                </div>
              </div>

              {/* W-L */}
              <span className="text-[#5A6478] text-xs text-right font-condensed">
                {team.wins}–{team.losses}
              </span>

              {/* PTS */}
              <div className="flex items-center justify-end gap-1">
                <span className="font-condensed font-700 text-sm text-white">
                  {team.pts.toLocaleString()}
                </span>
                <img
                  src={change.icon}
                  className="w-3 h-3 shrink-0"
                  alt={team.change}
                  style={{
                    filter: `invert(1)`,
                    opacity: team.change === 'same' ? 0.3 : 0.9,
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>

      <div className="px-5 py-3 text-center">
        <button className="text-[#5A6478] text-xs hover:text-[#00E5FF] transition-colors cursor-pointer">
          View full rankings →
        </button>
      </div>
    </section>
  );
}
