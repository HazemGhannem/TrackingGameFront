'use client';

import Image from 'next/image';

const MATCHES = [
  {
    id: 1,
    game: 'CS2',
    gameIcon:
      'https://cdn.jsdelivr.net/npm/simple-icons@11.14.0/icons/counterstrike.svg',
    tournament: 'ESL Pro League S20',
    team1: { name: 'Natus Vincere', tag: 'NAVI', score: 13, logo: 'N' },
    team2: { name: 'Team Vitality', tag: 'VIT', score: 9, logo: 'V' },
    map: 'Mirage',
    round: 'Round 22 / 30',
    status: 'live',
    time: 'LIVE',
    color1: '#F5A623',
    color2: '#FFD700',
  },
  {
    id: 2,
    game: 'Valorant',
    gameIcon:
      'https://cdn.jsdelivr.net/npm/simple-icons@11.14.0/icons/valorant.svg',
    tournament: 'VCT Americas 2025',
    team1: { name: 'Sentinels', tag: 'SEN', score: 1, logo: 'S' },
    team2: { name: 'NRG Esports', tag: 'NRG', score: 1, logo: 'N' },
    map: 'Haven',
    round: 'Map 3 — OT',
    status: 'live',
    time: 'LIVE',
    color1: '#FF4655',
    color2: '#00B4D8',
  },
  {
    id: 3,
    game: 'League of Legends',
    gameIcon:
      'https://cdn.jsdelivr.net/npm/simple-icons@11.14.0/icons/leagueoflegends.svg',
    tournament: 'LCK Spring 2025',
    team1: { name: 'T1', tag: 'T1', score: 2, logo: 'T' },
    team2: { name: 'Gen.G', tag: 'GEN', score: 0, logo: 'G' },
    map: "Summoner's Rift",
    round: 'Game 3 — 34:12',
    status: 'live',
    time: 'LIVE',
    color1: '#C89B3C',
    color2: '#00C8C8',
  },
  {
    id: 4,
    game: 'Dota 2',
    gameIcon: 'https://simpleicons.org/icons/dota2.svg',
    tournament: 'The International 2025',
    team1: { name: 'Team Spirit', tag: 'TSP', score: 1, logo: 'S' },
    team2: { name: 'OG Esports', tag: 'OG', score: 0, logo: 'O' },
    map: 'The Radiant',
    round: 'Game 2 — 22:08',
    status: 'live',
    time: 'LIVE',
    color1: '#E74C3C',
    color2: '#3498DB',
  },
];

function TeamBlock({
  team,
  color,
  isWinning,
}: {
  team: (typeof MATCHES)[0]['team1'];
  color: string;
  isWinning: boolean;
}) {
  return (
    <div
      className={`flex items-center gap-3 min-w-0 flex-1 ${isWinning ? '' : 'opacity-60'}`}
    >
      <div
        className="w-9 h-9 rounded-lg flex items-center justify-center font-condensed font-800 text-sm shrink-0 text-black"
        style={{ background: color }}
      >
        {team.logo}
      </div>
      <div className="min-w-0">
        <p className="font-condensed font-700 text-white text-base leading-none truncate">
          {team.tag}
        </p>
        <p className="text-[#5A6478] text-xs truncate mt-0.5">{team.name}</p>
      </div>
    </div>
  );
}

export default function LiveMatches({ activeGame }: { activeGame: string }) {
  const filtered =
    activeGame === 'all'
      ? MATCHES
      : MATCHES.filter((m) =>
          m.game.toLowerCase().includes(activeGame.replace('csgo', 'cs2')),
        );

  return (
    <section>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <span className="w-2 h-2 rounded-full bg-[#FF3B5C] live-dot" />
          <h2 className="font-condensed font-700 text-lg text-white tracking-wide">
            LIVE MATCHES
          </h2>
          <span className="px-2 py-0.5 bg-[rgba(255,59,92,0.15)] text-[#FF3B5C] text-xs font-condensed font-700 rounded-md border border-[rgba(255,59,92,0.2)]">
            {filtered.length}
          </span>
        </div>
        <button className="text-[#5A6478] text-xs hover:text-[#00E5FF] transition-colors cursor-pointer flex items-center gap-1">
          See all
          <Image
            src="https://cdn.jsdelivr.net/npm/lucide-static@0.441.0/icons/arrow-right.svg"
            className="w-3 h-3"
            alt="arrow"
            style={{ filter: 'invert(0.4)' }}
            width={12}
            height={12}
          />
        </button>
      </div>

      <div className="flex flex-col gap-3">
        {filtered.map((match, i) => (
          <div
            key={match.id}
            className="card card-hover p-4 cursor-pointer animate-slide-up"
            style={{ animationDelay: `${i * 0.08}s` }}
          >
            {/* Top row */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Image
                  src={match.gameIcon}
                  className="w-4 h-4"
                  alt={match.game}
                  style={{ filter: 'invert(0.5)' }}
                  width={16}
                  height={16}
                />
                <span className="section-label">{match.tournament}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[#5A6478] text-xs">{match.round}</span>
                <span className="px-2 py-0.5 bg-[rgba(255,59,92,0.15)] border border-[rgba(255,59,92,0.3)] text-[#FF3B5C] text-xs font-condensed font-700 rounded tracking-widest">
                  LIVE
                </span>
              </div>
            </div>

            {/* Teams + Score */}
            <div className="flex items-center gap-4">
              <TeamBlock
                team={match.team1}
                color={match.color1}
                isWinning={match.team1.score >= match.team2.score}
              />
              {/* Score */}
              <div className="flex items-center gap-3 shrink-0">
                <span
                  className="score-chip text-2xl"
                  style={{
                    color:
                      match.team1.score > match.team2.score
                        ? '#E8ECF4'
                        : '#3A4155',
                  }}
                >
                  {match.team1.score}
                </span>
                <span className="text-[#2A3040] text-lg font-condensed">:</span>
                <span
                  className="score-chip text-2xl"
                  style={{
                    color:
                      match.team2.score > match.team1.score
                        ? '#E8ECF4'
                        : '#3A4155',
                  }}
                >
                  {match.team2.score}
                </span>
              </div>
              <TeamBlock
                team={match.team2}
                color={match.color2}
                isWinning={match.team2.score >= match.team1.score}
              />
            </div>

            {/* Map */}
            <div className="mt-3 pt-3 border-t border-[#1A2030] flex items-center gap-2">
              <img
                src="https://cdn.jsdelivr.net/npm/lucide-static@0.441.0/icons/map-pin.svg"
                className="w-3 h-3"
                alt="map"
                style={{ filter: 'invert(0.3)' }}
              />
              <span className="text-[#5A6478] text-xs">{match.map}</span>
            </div>
          </div>
        ))}

        {filtered.length === 0 && (
          <div className="card p-10 text-center">
            <p className="text-[#3A4155] font-condensed text-lg">
              No live matches for this game
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
