export const REGIONS = [
  { id: 'NA', label: 'americas' },
  { id: 'EUW', label: 'europe' },
  { id: 'EUNE', label: 'asia' },
];

export const TIER_COLORS: Record<string, string> = {
  CHALLENGER: '#F4C542',
  GRANDMASTER: '#E8543A',
  MASTER: '#9B59B6',
  DIAMOND: '#57AEFF',
  EMERALD: '#00E676',
  PLATINUM: '#00C8A0',
  GOLD: '#FFB300',
  SILVER: '#C0C0C0',
  BRONZE: '#CD7F32',
  IRON: '#8A94A8',
};

export type Region = (typeof REGIONS)[0];
export const profileIconUrl = (id: number) =>
  `https://ddragon.leagueoflegends.com/cdn/14.10.1/img/profileicon/${id}.png`;
export function parseRiotId(raw: string): { name: string; tag: string } | null {
  const idx = raw.lastIndexOf('#');
  if (idx < 1 || idx === raw.length - 1) return null;
  return { name: raw.slice(0, idx).trim(), tag: raw.slice(idx + 1).trim() };
}

export function winRate(wins: number, losses: number) {
  const total = wins + losses;
  return total === 0 ? 0 : Math.round((wins / total) * 100);
}

export function wrColor(wr: number) {
  return wr >= 55 ? '#00E676' : wr >= 50 ? '#FFB300' : '#FF3B5C';
}
