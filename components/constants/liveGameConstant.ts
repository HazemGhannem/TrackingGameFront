 const VERSION = '14.24.1';
const BASE = `https://ddragon.leagueoflegends.com/cdn/${VERSION}`;

export const DDragon = {
  championIcon: (name: string) => `${BASE}/img/champion/${name}.png`,
  profileIcon: (id: number) => `${BASE}/img/profileicon/${id}.png`,
  spellIcon: (spellKey: string) => `${BASE}/img/spell/${spellKey}.png`,
  itemIcon: (id: number) => `${BASE}/img/item/${id}.png`,

  // Summoner spell id → key mapping (most common)
  spellIdToKey: (id: number): string => {
    const map: Record<number, string> = {
      1: 'SummonerBoost', // Cleanse
      3: 'SummonerExhaust',
      4: 'SummonerFlash',
      6: 'SummonerHaste', // Ghost
      7: 'SummonerHeal',
      11: 'SummonerSmite',
      12: 'SummonerTeleport',
      13: 'SummonerMana', // Clarity
      14: 'SummonerDot', // Ignite
      21: 'SummonerBarrier',
      32: 'SummonerSnowball', // ARAM
      39: 'SummonerSnowURFSnowball_Mark', // URF
    };
    return map[id] ?? 'SummonerFlash';
  },
};
