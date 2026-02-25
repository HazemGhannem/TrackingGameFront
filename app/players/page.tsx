'use client';

import { useEffect, useState, useCallback } from 'react';
import { RefreshCw, X } from 'lucide-react';
import PlayerCardSkeleton from '@/components/PlayerCardSkeleton';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const REGIONS: Record<string, string> = {
  na: '🇺🇸',
  euw: '🇪🇺',
  eune: '🇵🇱',
  kr: '🇰🇷',
  cn: '🇨🇳',
  br: '🇧🇷',
  oce: '🇦🇺',
  lan: '🇲🇽',
  las: '🇦🇷',
  ru: '🇷🇺',
  tr: '🇹🇷',
};

export interface Player {
  id: string;
  name: string;
  tag: string;
  game: string;
  team: string;
  rank: number;
  region: string;
  gameIcon: string;
}

const FALLBACK: Player[] = [
  {
    id: 'fallback-1',
    name: 's1mple',
    tag: 'S1MPLE',
    game: 'CS2',
    team: 'NAVI',
    rank: 1,
    region: 'eune',
    gameIcon:
      'https://cdn.jsdelivr.net/npm/simple-icons@11.14.0/icons/counterstrike.svg',
  },
  {
    id: 'fallback-2',
    name: 'Faker',
    tag: 'FAKER',
    game: 'League of Legends',
    team: 'T1',
    rank: 1,
    region: 'kr',
    gameIcon:
      'https://cdn.jsdelivr.net/npm/simple-icons@11.14.0/icons/leagueoflegends.svg',
  },
];

function rankMeta(rank: number) {
  if (rank === 1) return { color: '#FFD700', label: 'S+' };
  if (rank === 2) return { color: '#C0C0C0', label: 'S' };
  if (rank === 3) return { color: '#CD7F32', label: 'A+' };
  if (rank <= 5) return { color: '#00E5FF', label: 'A' };
  return { color: '#8A94A8', label: 'B' };
}

export default function TrackedPlayers() {
  const [players, setPlayers] = useState<Player[]>([]);
  const [loading, setLoading] = useState(true);
  const [removing, setRemoving] = useState<string | null>(null);
  const [isFallback, setIsFallback] = useState(false);
  const [spinning, setSpinning] = useState(false);

  /* ── Fetch ─────────────────────────────────────────── */
  const fetchFavourites = useCallback(async () => {
    setLoading(true);
    setSpinning(true);
    try {
      const res = await fetch(`${API_URL}/api/favorites`, {
        credentials: 'include',
      });
      const data = await res.json();
      const list: Player[] = data.players ?? data;

      if (!res.ok || list.length === 0) {
        setPlayers(FALLBACK);
        setIsFallback(true);
      } else {
        setPlayers(list);
        setIsFallback(false);
      }
    } catch {
      setPlayers(FALLBACK);
      setIsFallback(true);
    } finally {
      setLoading(false);
      setTimeout(() => setSpinning(false), 500);
    }
  }, []);

  useEffect(() => {
    fetchFavourites();
  }, [fetchFavourites]);

  /* ── Delete ────────────────────────────────────────── */
  const handleUntrack = useCallback(
    async (id: string) => {
      if (isFallback) {
        setPlayers((prev) => prev.filter((p) => p.id !== id));
        return;
      }
      setRemoving(id);
      await new Promise((r) => setTimeout(r, 280));
      try {
        await fetch(`${API_URL}/api/favorites/${id}`, {
          method: 'DELETE',
          credentials: 'include',
        });
        setPlayers((prev) => prev.filter((p) => p.id !== id));
      } catch {
        setRemoving(null);
      }
    },
    [isFallback],
  );

  if (loading) {
    return (
      <section className="mt-10">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-1 h-5 rounded-full bg-[#1A2030]" />
          <div className="h-4 w-40 rounded-md bg-[#161C28] animate-pulse" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
          {[...Array(4)].map((_, i) => (
            <PlayerCardSkeleton key={i} />
          ))}
        </div>
      </section>
    );
  }

  if (players.length === 0) return null;

  return (
    <section className="m-10">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          <div
            className="w-1 h-5 rounded-full bg-[#00E5FF]"
            style={{ boxShadow: '0 0 8px #00E5FF' }}
          />
          <h2 className="font-condensed font-700 text-base text-white tracking-widest uppercase">
            Favourite Players
          </h2>
          {isFallback && (
            <span className="px-2 py-0.5 rounded-full bg-[rgba(255,179,0,0.1)] border border-[rgba(255,179,0,0.2)] text-[#FFB300] text-[10px] font-condensed font-700 tracking-wider">
              DEMO
            </span>
          )}
          <span className="flex items-center justify-center w-5 h-5 rounded-full bg-[rgba(0,229,255,0.1)] border border-[rgba(0,229,255,0.2)] text-[#00E5FF] font-condensed font-700 text-[10px]">
            {players.length}
          </span>
        </div>

        <button
          onClick={fetchFavourites}
          className="flex items-center gap-1.5 text-[#3A4155] hover:text-[#00E5FF] text-xs font-condensed font-600 transition-colors cursor-pointer"
        >
          <RefreshCw
            size={14}
            className={`transition-transform duration-500 ${spinning ? 'rotate-180' : ''}`}
          />
          Refresh
        </button>
      </div>

      {/* ── Cards ─────────────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
        {players.map((player) => {
          const { color, label } = rankMeta(player.rank);
          const flag = REGIONS[player.region] ?? '';
          const isRemoving = removing === player.id;

          return (
            <div
              key={player.id}
              className="group relative rounded-2xl border border-[#1A2030] bg-[#0D1017] overflow-hidden transition-all duration-300 hover:border-[rgba(0,229,255,0.15)] hover:-translate-y-0.5"
              style={{
                opacity: isRemoving ? 0 : 1,
                transform: isRemoving ? 'scale(0.94)' : undefined,
              }}
            >
              {/* Colored left bar */}
              <div
                className="absolute left-0 top-4 bottom-4 w-[3px] rounded-r-full"
                style={{ background: color, boxShadow: `0 0 8px ${color}80` }}
              />

              {/* Rank badge */}
              <div
                className="absolute top-3.5 right-10 px-2 py-0.5 rounded-md text-[10px] font-condensed font-700 tracking-wider"
                style={{
                  background: `${color}15`,
                  border: `1px solid ${color}30`,
                  color,
                }}
              >
                {label}
              </div>

              {/* Remove button */}
              <button
                onClick={() => handleUntrack(player.id)}
                disabled={isRemoving}
                className="absolute top-3 right-3 w-6 h-6 rounded-lg border border-transparent flex items-center justify-center opacity-0 group-hover:opacity-100 hover:!border-[rgba(255,59,92,0.35)] hover:bg-[rgba(255,59,92,0.08)] transition-all duration-200 cursor-pointer"
              >
                <X size={12} className="text-[#FF3B5C]" />
              </button>

              {/* Card body */}
              <div className="pl-5 pr-4 pt-4 pb-4 flex flex-col gap-3.5">
                {/* Avatar + name */}
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 font-condensed font-800 text-lg"
                    style={{
                      background: `linear-gradient(135deg, ${color}20, ${color}08)`,
                      border: `1px solid ${color}25`,
                      color,
                    }}
                  >
                    {player.name[0]}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5 leading-none">
                      <span className="font-condensed font-700 text-white text-[15px] truncate">
                        {player.name}
                      </span>
                      {flag && <span className="text-sm shrink-0">{flag}</span>}
                    </div>
                    <span className="text-[#3A4155] text-[11px] font-condensed tracking-wider mt-0.5 block">
                      #{player.tag}
                    </span>
                  </div>
                </div>

                {/* Divider */}
                <div className="h-px bg-[#1A2030]" />

                {/* Game + team */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <div className="w-5 h-5 rounded-md bg-[#161C28] border border-[#1E2535] flex items-center justify-center">
                      <img
                        src={player.gameIcon}
                        className="w-3 h-3"
                        alt={player.game}
                        style={{ filter: 'invert(0.5)' }}
                      />
                    </div>
                    <span className="text-[#5A6478] text-[11px] font-condensed truncate max-w-[80px]">
                      {player.game}
                    </span>
                  </div>
                  <span
                    className="text-[11px] font-condensed font-700 tracking-wider"
                    style={{ color }}
                  >
                    {player.team}
                  </span>
                </div>

                {/* Rank bar */}
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-[3px] rounded-full bg-[#161C28] overflow-hidden">
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: `${Math.max(12, 100 - (player.rank - 1) * 10)}%`,
                        background: `linear-gradient(90deg, ${color}, ${color}88)`,
                      }}
                    />
                  </div>
                  <span
                    className="text-[11px] font-condensed font-700 shrink-0"
                    style={{ color }}
                  >
                    #{player.rank}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
