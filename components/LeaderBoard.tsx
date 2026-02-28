'use client';

import Image from 'next/image';
import { useEffect } from 'react';
import { PlatformRegion } from '@/types/api/types';
import { profileIconUrl } from './constants/searchConstants';
import { Trophy } from 'lucide-react';
import { usePlayerSearch } from '@/hooks/usePlayerSearch';

const PLATFORMS: { label: string; value: PlatformRegion }[] = [
  { label: 'EUW', value: 'euw1' },
  { label: 'NA', value: 'na1' },
  { label: 'KR', value: 'kr' },
  { label: 'EUNE', value: 'eun1' },
];

export default function Leaderboard() {
  const {
    challengers,
    challengerPlatform,
    challengerLoading,
    challengerError,
    challangerTop10,
    changePlatform,
  } = usePlayerSearch();

  useEffect(() => {
    challangerTop10(challengerPlatform);
  }, [challengerPlatform]);

  return (
    <section className="card overflow-hidden h-fit">
      {/* Header */}
      <div className="px-5 py-4 border-b border-[#1A2030] flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Trophy className="w-4 h-4" />
          <h2 className="font-condensed font-700 text-lg text-white tracking-wide">
            LEADERBOARD
          </h2>
        </div>

        {/* Platform toggle */}
        <div className="flex items-center gap-1">
          {PLATFORMS.map((p) => (
            <button
              key={p.value}
              onClick={() => changePlatform(p.value)}
              className={`px-2 py-1 rounded-md text-[11px] font-condensed font-700 tracking-wider transition-all duration-150 cursor-pointer ${
                challengerPlatform === p.value
                  ? 'bg-[rgba(0,229,255,0.12)] text-[#00E5FF] border border-[rgba(0,229,255,0.3)]'
                  : 'text-[#3A4155] hover:text-[#5A6478] border border-transparent'
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      {/* Col headers */}
      <div className="px-5 py-2 grid grid-cols-[28px_1fr_56px_52px] gap-2 border-b border-[#1A2030]">
        <span className="section-label text-center">#</span>
        <span className="section-label">Player</span>
        <span className="section-label text-right">W–L</span>
        <span className="section-label text-right">LP</span>
      </div>

      {/* Loading */}
      {challengerLoading && (
        <div className="px-5 py-8 flex items-center justify-center">
          <div className="w-5 h-5 border-2 border-[#00E5FF] border-t-transparent rounded-full animate-spin" />
        </div>
      )}

      {/* Error */}
      {challengerError && !challengerLoading && (
        <div className="px-5 py-6 text-center text-[#FF3B5C] text-sm font-condensed">
          {challengerError}
        </div>
      )}

      {/* Rows */}
      {!challengerLoading && !challengerError && (
        <div>
          {challengers.map((player) => (
            <div
              key={player.puuid}
              className={`px-5 py-3 grid grid-cols-[28px_1fr_56px_52px] gap-2 items-center border-b border-[#0D1017] hover:bg-[#111520] transition-colors cursor-pointer ${
                player.rank <= 3 ? 'bg-[rgba(0,229,255,0.02)]' : ''
              }`}
            >
              {/* Rank */}
              <span
                className={`font-condensed font-700 text-sm text-center ${
                  player.rank === 1
                    ? 'text-[#FFD700]'
                    : player.rank === 2
                      ? 'text-[#C0C0C0]'
                      : player.rank === 3
                        ? 'text-[#CD7F32]'
                        : 'text-[#3A4155]'
                }`}
              >
                {player.rank}
              </span>

              {/* Player */}
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="relative w-7 h-7 rounded-md overflow-hidden shrink-0 border border-[#1A2030]">
                  <Image
                    src={profileIconUrl(player.profileIconId)}
                    alt={player.gameName}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-1">
                    <p className="font-condensed font-700 text-sm text-white leading-none truncate">
                      {player.gameName}
                    </p>
                    <span className="text-[#3A4155] text-[10px] leading-none">
                      #{player.tagLine}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    {player.hotStreak && (
                      <span className="text-[#FF6B35] text-[9px] font-condensed font-700 tracking-wide">
                        🔥 HOT
                      </span>
                    )}
                    {player.freshBlood && (
                      <span className="text-[#00E5FF] text-[9px] font-condensed font-700 tracking-wide">
                        NEW
                      </span>
                    )}
                    {player.veteran && !player.hotStreak && (
                      <span className="text-[#5A6478] text-[9px] font-condensed tracking-wide">
                        VET
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* W-L + winrate */}
              <div className="text-right">
                <span className="text-[#5A6478] text-xs font-condensed block">
                  {player.wins}–{player.losses}
                </span>
                <span className="text-[#3A4155] text-[10px] font-condensed">
                  {player.winRate}%
                </span>
              </div>

              {/* LP */}
              <div className="text-right">
                <span className="font-condensed font-700 text-sm text-white">
                  {player.leaguePoints.toLocaleString()}
                </span>
                <span className="text-[#3A4155] text-[10px] font-condensed block">
                  LP
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
