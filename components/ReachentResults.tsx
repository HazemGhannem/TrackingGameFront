'use client';

const RESULTS = [
  {
    id: 1,
    game: 'CS2',
    gameIcon:
      'https://cdn.jsdelivr.net/npm/simple-icons@11.14.0/icons/counterstrike.svg',
    tournament: 'BLAST Premier',
    team1: {
      name: 'FaZe Clan',
      tag: 'FAZE',
      score: 2,
      logo: 'F',
      color: '#E74C3C',
    },
    team2: {
      name: 'Astralis',
      tag: 'AST',
      score: 0,
      logo: 'A',
      color: '#3498DB',
    },
    winner: 'team1',
    duration: '38 min',
    date: '2h ago',
  },
  {
    id: 2,
    game: 'Valorant',
    gameIcon:
      'https://cdn.jsdelivr.net/npm/simple-icons@11.14.0/icons/valorant.svg',
    tournament: 'VCT EMEA',
    team1: {
      name: 'Fnatic',
      tag: 'FNC',
      score: 2,
      logo: 'F',
      color: '#FF6600',
    },
    team2: { name: 'LOUD', tag: 'LOUD', score: 1, logo: 'L', color: '#00CC44' },
    winner: 'team1',
    duration: '1h 12min',
    date: '4h ago',
  },
  {
    id: 3,
    game: 'Dota 2',
    gameIcon: 'https://simpleicons.org/icons/dota2.svg',
    tournament: 'The International',
    team1: { name: 'Liquid', tag: 'TL', score: 1, logo: 'L', color: '#009EFF' },
    team2: { name: 'EG', tag: 'EG', score: 2, logo: 'E', color: '#0066CC' },
    winner: 'team2',
    duration: '2h 04min',
    date: '6h ago',
  },
];

export default function RecentResults({ activeGame }: { activeGame: string }) {
  return (
    <section>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <img
            src="https://cdn.jsdelivr.net/npm/lucide-static@0.441.0/icons/clock.svg"
            className="w-4 h-4"
            alt="recent"
            style={{ filter: 'invert(0.4)' }}
          />
          <h2 className="font-condensed font-700 text-lg text-white tracking-wide">
            RECENT RESULTS
          </h2>
        </div>
        <button className="text-[#5A6478] text-xs hover:text-[#00E5FF] transition-colors cursor-pointer flex items-center gap-1">
          Full history
          <img
            src="https://cdn.jsdelivr.net/npm/lucide-static@0.441.0/icons/arrow-right.svg"
            className="w-3 h-3"
            alt="arrow"
            style={{ filter: 'invert(0.4)' }}
          />
        </button>
      </div>

      <div className="flex flex-col gap-3">
        {RESULTS.map((match, i) => (
          <div
            key={match.id}
            className="card card-hover p-4 cursor-pointer animate-slide-up"
            style={{ animationDelay: `${i * 0.06}s` }}
          >
            <div className="flex items-center gap-4">
              {/* Game icon + info */}
              <div className="flex flex-col items-center gap-1 shrink-0 w-10">
                <img
                  src={match.gameIcon}
                  className="w-5 h-5"
                  alt={match.game}
                  style={{ filter: 'invert(0.45)' }}
                />
                <span className="text-[#3A4155] text-[10px] font-condensed font-600 leading-none">
                  {match.game}
                </span>
              </div>

              {/* Team 1 */}
              <div
                className={`flex items-center gap-2 flex-1 min-w-0 ${match.winner !== 'team1' ? 'opacity-40' : ''}`}
              >
                <div
                  className="w-8 h-8 rounded-md flex items-center justify-center font-condensed font-800 text-xs text-black shrink-0"
                  style={{ background: match.team1.color }}
                >
                  {match.team1.logo}
                </div>
                <span className="font-condensed font-700 text-white truncate">
                  {match.team1.tag}
                </span>
              </div>

              {/* Score */}
              <div className="flex items-center gap-2 shrink-0">
                <span
                  className={`score-chip text-xl ${match.winner === 'team1' ? 'text-white' : 'text-[#3A4155]'}`}
                >
                  {match.team1.score}
                </span>
                <span className="text-[#1E2535] font-condensed">:</span>
                <span
                  className={`score-chip text-xl ${match.winner === 'team2' ? 'text-white' : 'text-[#3A4155]'}`}
                >
                  {match.team2.score}
                </span>
              </div>

              {/* Team 2 */}
              <div
                className={`flex items-center gap-2 flex-1 min-w-0 justify-end ${match.winner !== 'team2' ? 'opacity-40' : ''}`}
              >
                <span className="font-condensed font-700 text-white truncate text-right">
                  {match.team2.tag}
                </span>
                <div
                  className="w-8 h-8 rounded-md flex items-center justify-center font-condensed font-800 text-xs text-black shrink-0"
                  style={{ background: match.team2.color }}
                >
                  {match.team2.logo}
                </div>
              </div>

              {/* Meta */}
              <div className="flex flex-col items-end shrink-0 text-right">
                <span className="text-[#5A6478] text-xs">{match.date}</span>
                <span className="text-[#3A4155] text-[10px] mt-0.5">
                  {match.duration}
                </span>
              </div>
            </div>

            <div className="mt-3 pt-3 border-t border-[#1A2030]">
              <span className="section-label">{match.tournament}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
