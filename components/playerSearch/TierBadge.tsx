import { TIER_COLORS } from '../constants/searchConstants';

interface TierBadgeProps {
  tier: string;
  rank: string;
}

export default function TierBadge({ tier, rank }: TierBadgeProps) {
  const color = TIER_COLORS[tier] ?? '#8A94A8';
  return (
    <span className="font-condensed font-700 text-xs" style={{ color }}>
      {tier} {rank}
    </span>
  );
}
