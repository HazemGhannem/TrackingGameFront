'use client';

import Image from "next/image";

const GAMES = [
  {
    id: 'all',
    label: 'All Games',
    icon: 'https://cdn.jsdelivr.net/npm/lucide-static@0.441.0/icons/layout-grid.svg',
  },
  {
    id: 'csgo',
    label: 'CS2',
    icon: 'https://cdn.jsdelivr.net/npm/simple-icons@11.14.0/icons/counterstrike.svg',
  },
  {
    id: 'lol',
    label: 'League of Legends',
    icon: 'https://cdn.jsdelivr.net/npm/simple-icons@11.14.0/icons/leagueoflegends.svg',
  },
  {
    id: 'valorant',
    label: 'Valorant',
    icon: 'https://cdn.jsdelivr.net/npm/simple-icons@11.14.0/icons/valorant.svg',
  },
  {
    id: 'dota2',
    label: 'Dota 2',
    icon: 'https://simpleicons.org/icons/dota2.svg',
  },
  {
    id: 'fortnite',
    label: 'Fortnite',
    icon: 'https://simpleicons.org/icons/fortnite.svg',
  },
];

interface Props {
  active: string;
  onChange: (id: string) => void;
}

export default function GameFilter({ active, onChange }: Props) {
  return (
    <div className="mt-8 flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
      {GAMES.map((game) => {
        const isActive = active === game.id;
        return (
          <button
            key={game.id}
            onClick={() => onChange(game.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all duration-200 border cursor-pointer ${
              isActive
                ? 'bg-[rgba(0,229,255,0.1)] text-[#00E5FF] border-[rgba(0,229,255,0.3)] glow-cyan'
                : 'bg-[#0D1017] text-[#5A6478] border-[#1A2030] hover:text-white hover:border-[#2A3040]'
            }`}
          >
            <Image
              src={game.icon}
              className="w-4 h-4"
              alt={game.label}
              style={{
                filter: isActive
                  ? 'invert(0.8) sepia(1) hue-rotate(170deg) saturate(8) brightness(1.3)'
                  : 'invert(0.35) brightness(1)',
              }}
              width={16}
              height={16}
            />
            <span className="font-condensed font-600 tracking-wide">
              {game.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
