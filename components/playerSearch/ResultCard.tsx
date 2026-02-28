import { Trophy } from 'lucide-react';
import { PlayerProfile } from '@/types/api/types';
import {
  TIER_COLORS,
  profileIconUrl,
  winRate,
  wrColor,
} from '../constants/searchConstants';
import TierBadge from './TierBadge';
import WinRateBar from './WinRateBar';
import RankedStats from './RankedStats';
import StatusBadges from './StatusBadges';
import TrackButton from './TrackButton';
import { useAuth } from '@/hooks/useAuth';

interface ResultCardProps {
  profile: PlayerProfile;
}

export default function ResultCard({ profile }: ResultCardProps) {
  const ranked = profile?.ranked[0];
  const summoner = profile.summoner;
  const { currentUser } = useAuth();
  const tierColor = ranked
    ? (TIER_COLORS[ranked.tier] ?? '#8A94A8')
    : '#3A4155';
  const wr = ranked ? winRate(ranked.wins, ranked.losses) : 0;
  const color = wrColor(wr);
   return (
    <>
      {/* Header */}
      <div className="px-4 py-2 border-b border-[#1A2030] flex items-center justify-between">
        <span className="section-label">1 result</span>
      </div>

      {/* Player row */}
      <div className="flex items-center gap-4 px-4 py-3 hover:bg-[#111520] transition-colors border-b border-[#0D1017]">
        {/* Profile icon */}
        <div
          className="w-9 h-9 rounded-lg border overflow-hidden shrink-0 flex items-center justify-center bg-[#161C28]"
          style={{ borderColor: `${tierColor}50` }}
        >
          <img
            src={profileIconUrl(summoner.profileIconId)}
            className="w-full h-full object-cover"
            alt="icon"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = 'none';
            }}
          />
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="font-condensed font-700 text-white text-sm">
              {profile.gameName}
            </span>
            <span className="text-[#3A4155] text-xs font-condensed">
              #{profile.tagLine}
            </span>
          </div>

          <div className="flex items-center gap-2 mt-0.5 flex-wrap">
            <Trophy size={12} className="text-[#3A4155]" />

            {ranked ? (
              <>
                <TierBadge tier={ranked.tier} rank={ranked.rank} />
                <span className="text-[#3A4155] text-xs">·</span>
                <span className="text-[#5A6478] text-xs font-condensed">
                  {ranked.leaguePoints} LP
                </span>
                <span className="text-[#3A4155] text-xs">·</span>
                <span className="text-xs font-condensed">
                  <span className="text-[#00E676]">{ranked.wins}W</span>
                  <span className="text-[#3A4155] mx-0.5">/</span>
                  <span className="text-[#FF3B5C]">{ranked.losses}L</span>
                </span>
                <span className="text-[#3A4155] text-xs">·</span>
                <span
                  className="text-xs font-condensed font-700"
                  style={{ color }}
                >
                  {wr}% WR
                </span>
                <StatusBadges
                  hotStreak={ranked.hotStreak}
                  veteran={ranked.veteran}
                />
              </>
            ) : (
              <span className="text-[#3A4155] text-xs font-condensed">
                Unranked
              </span>
            )}

            <span className="text-[#3A4155] text-xs">·</span>
            <span className="text-[#3A4155] text-xs font-condensed">
              Lv.{summoner.summonerLevel}
            </span>
          </div>
        </div>

        {currentUser && <TrackButton playerId={profile._id} />}
      </div>

      {/* Ranked detail */}
      {ranked && (
        <div className="px-4 py-3">
          <p className="section-label mb-2.5">
            RANKED
            {ranked.queueType === 'RANKED_SOLO_5x5' ? 'SOLO/DUO' : 'FLEX'}
          </p>
          <RankedStats
            lp={ranked.leaguePoints}
            wins={ranked.wins}
            losses={ranked.losses}
          />
          <WinRateBar wr={wr} color={color} />
        </div>
      )}
    </>
  );
}
