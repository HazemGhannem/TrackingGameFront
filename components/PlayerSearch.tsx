'use client';

import { ChevronDown } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

const REGIONS = [
  { id: 'na', label: 'NA', flag: '🇺🇸' },
  { id: 'euw', label: 'EUW', flag: '🇪🇺' },
  { id: 'eune', label: 'EUNE', flag: '🇵🇱' },
  { id: 'kr', label: 'KR', flag: '🇰🇷' },
  { id: 'cn', label: 'CN', flag: '🇨🇳' },
  { id: 'br', label: 'BR', flag: '🇧🇷' },
  { id: 'oce', label: 'OCE', flag: '🇦🇺' },
  { id: 'lan', label: 'LAN', flag: '🇲🇽' },
  { id: 'las', label: 'LAS', flag: '🇦🇷' },
  { id: 'ru', label: 'RU', flag: '🇷🇺' },
  { id: 'tr', label: 'TR', flag: '🇹🇷' },
];

const MOCK_PLAYERS = [
  {
    id: '1',
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
    id: '2',
    name: 'ZywOo',
    tag: 'ZYWOO',
    game: 'CS2',
    team: 'Vitality',
    rank: 2,
    region: 'euw',
    gameIcon:
      'https://cdn.jsdelivr.net/npm/simple-icons@11.14.0/icons/counterstrike.svg',
  },
  {
    id: '3',
    name: 'Faker',
    tag: 'FAKER',
    game: 'League of Legends',
    team: 'T1',
    rank: 1,
    region: 'kr',
    gameIcon:
      'https://cdn.jsdelivr.net/npm/simple-icons@11.14.0/icons/leagueoflegends.svg',
  },
  {
    id: '4',
    name: 'TenZ',
    tag: 'TENZ',
    game: 'Valorant',
    team: 'Sentinels',
    rank: 3,
    region: 'na',
    gameIcon:
      'https://cdn.jsdelivr.net/npm/simple-icons@11.14.0/icons/valorant.svg',
  },
  {
    id: '5',
    name: 'Yay',
    tag: 'YAY',
    game: 'Valorant',
    team: 'NRG',
    rank: 5,
    region: 'na',
    gameIcon:
      'https://cdn.jsdelivr.net/npm/simple-icons@11.14.0/icons/valorant.svg',
  },
  {
    id: '6',
    name: 'Miracle-',
    tag: 'MIRACLE',
    game: 'Dota 2',
    team: 'Liquid',
    rank: 2,
    region: 'euw',
    gameIcon:
      'https://cdn.jsdelivr.net/npm/simple-icons@11.14.0/icons/dota2.svg',
  },
  {
    id: '7',
    name: 'NiKo',
    tag: 'NIKO',
    game: 'CS2',
    team: 'G2',
    rank: 4,
    region: 'euw',
    gameIcon:
      'https://cdn.jsdelivr.net/npm/simple-icons@11.14.0/icons/counterstrike.svg',
  },
  {
    id: '8',
    name: 'Aspas',
    tag: 'ASPAS',
    game: 'Valorant',
    team: 'LOUD',
    rank: 2,
    region: 'br',
    gameIcon:
      'https://cdn.jsdelivr.net/npm/simple-icons@11.14.0/icons/valorant.svg',
  },
];

const RANK_COLORS = ['#FFD700', '#C0C0C0', '#CD7F32', '#00E5FF', '#8A94A8'];

export default function PlayerSearch() {
  const [query, setQuery] = useState('');
  const [focused, setFocused] = useState(false);
  const [tracked, setTracked] = useState<string[]>([]);
  const [region, setRegion] = useState('na');
  const [regionOpen, setRegionOpen] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const regionRef = useRef<HTMLDivElement>(null);

  const activeRegion = REGIONS.find((r) => r.id === region) ?? REGIONS[0];

  // filter by query + region
  const results =
    query.trim().length > 0
      ? MOCK_PLAYERS.filter((p) => {
          const matchesQuery =
            p.name.toLowerCase().includes(query.toLowerCase()) ||
            p.tag.toLowerCase().includes(query.toLowerCase()) ||
            p.team.toLowerCase().includes(query.toLowerCase()) ||
            p.game.toLowerCase().includes(query.toLowerCase());
          const matchesRegion = region === 'all' || p.region === region;
          return matchesQuery && matchesRegion;
        })
      : [];

  const showDropdown = focused && query.trim().length > 0;

  // Close search dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(e.target as Node)
      ) {
        setFocused(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  // Close region dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (regionRef.current && !regionRef.current.contains(e.target as Node)) {
        setRegionOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  // ⌘K / Ctrl+K
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        inputRef.current?.focus();
        setFocused(true);
      }
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, []);

  const toggleTrack = (id: string) =>
    setTracked((prev) =>
      prev.includes(id) ? prev.filter((t) => t !== id) : [...prev, id],
    );

  return (
    <section className="mt-8 mb-2">
      {/* Label */}
      <div className="flex items-center gap-2 mb-3">
        <img
          src="https://cdn.jsdelivr.net/npm/lucide-static@0.441.0/icons/search.svg"
          className="w-4 h-4"
          alt="search"
          style={{ filter: 'invert(0.4)' }}
        />
        <h2 className="font-condensed font-700 text-lg text-white tracking-wide">
          TRACK A PLAYER
        </h2>
      </div>

      {/* Row: region picker + search input */}
      <div className="flex items-stretch gap-2">
        {/* ── Region picker ── */}
        <div ref={regionRef} className="relative shrink-0">
          <button
            onClick={() => setRegionOpen((v) => !v)}
            className={`flex items-center gap-2 h-12 w-24 px-3 rounded-xl border font-condensed font-600 text-sm transition-all duration-200 cursor-pointer ${
              regionOpen
                ? 'border-[rgba(0,229,255,0.4)] bg-[#0D1017] text-[#00E5FF]'
                : region !== 'all'
                  ? 'border-[rgba(0,229,255,0.25)] bg-[rgba(0,229,255,0.06)] text-[#00E5FF]'
                  : 'border-[#1A2030] bg-[#0D1017] text-[#5A6478] hover:border-[#2A3040] hover:text-white'
            }`}
          >
            <div className="flex justify-between w-full">
              <span className="text-base leading-none">
                {activeRegion.flag}
              </span>
              <span className="tracking-wider">{activeRegion.label}</span>
              <ChevronDown className="w-3.5 h-3.5" />
            </div>
          </button>

          {/* Dropdown */}
          {regionOpen && (
            <div className="absolute top-[calc(100%+6px)] left-0 z-50 w-36 card border-[#1E2535] overflow-hidden shadow-2xl animate-slide-up">
              {REGIONS.map((r) => (
                <button
                  key={r.id}
                  onClick={() => {
                    setRegion(r.id);
                    setRegionOpen(false);
                  }}
                  className={`w-full flex items-center gap-2.5 px-3 py-2.5 text-sm font-condensed font-600 transition-colors cursor-pointer border-b border-[#0D1017] last:border-0 ${
                    region === r.id
                      ? 'bg-[rgba(0,229,255,0.08)] text-[#00E5FF]'
                      : 'text-[#5A6478] hover:bg-[#111520] hover:text-white'
                  }`}
                >
                  <span className="text-base">{r.flag}</span>
                  <span className="tracking-wider">{r.label}</span>
                  {region === r.id && (
                    <img
                      src="https://cdn.jsdelivr.net/npm/lucide-static@0.441.0/icons/check.svg"
                      className="w-3 h-3 ml-auto"
                      alt="selected"
                      style={{
                        filter:
                          'invert(0.7) sepia(1) hue-rotate(170deg) saturate(8)',
                      }}
                    />
                  )}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* ── Search input ── */}
        <div className="relative flex-1" ref={wrapperRef}>
          <div
            className={`flex items-center gap-3 px-4 h-12 rounded-xl border transition-all duration-200 ${
              focused
                ? 'border-[rgba(0,229,255,0.4)] bg-[#0D1017] glow-cyan'
                : 'border-[#1A2030] bg-[#0D1017] hover:border-[#2A3040]'
            }`}
          >
            <img
              src="https://cdn.jsdelivr.net/npm/lucide-static@0.441.0/icons/search.svg"
              className="w-4 h-4 shrink-0 transition-all duration-200"
              alt="search"
              style={{
                filter: focused
                  ? 'invert(0.7) sepia(1) hue-rotate(170deg) saturate(8) brightness(1.3)'
                  : 'invert(0.35)',
              }}
            />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => setFocused(true)}
              placeholder={`Search player name #${region.toUpperCase()}`}
              className="flex-1 bg-transparent text-white text-sm placeholder-[#3A4155] outline-none font-['Barlow',sans-serif]"
            />
            {query ? (
              <button
                onClick={() => {
                  setQuery('');
                  inputRef.current?.focus();
                }}
                className="shrink-0 cursor-pointer opacity-40 hover:opacity-80 transition-opacity"
              >
                <img
                  src="https://cdn.jsdelivr.net/npm/lucide-static@0.441.0/icons/x.svg"
                  className="w-4 h-4"
                  alt="clear"
                  style={{ filter: 'invert(1)' }}
                />
              </button>
            ) : (
              <div className="hidden sm:flex items-center gap-1 shrink-0 px-2 py-1 rounded-md border border-[#1A2030] bg-[#080A0F]">
                <span className="text-[#3A4155] text-[11px] font-condensed">
                  ⌘K
                </span>
              </div>
            )}
          </div>

          {/* Results Dropdown */}
          {showDropdown && (
            <div className="absolute top-[calc(100%+6px)] left-0 right-0 z-50 card border-[#1E2535] overflow-hidden shadow-2xl animate-slide-up">
              {results.length === 0 ? (
                <div className="px-5 py-8 text-center">
                  <img
                    src="https://cdn.jsdelivr.net/npm/lucide-static@0.441.0/icons/search-x.svg"
                    className="w-8 h-8 mx-auto mb-3 opacity-20"
                    alt="no results"
                    style={{ filter: 'invert(1)' }}
                  />
                  <p className="text-[#3A4155] font-condensed text-sm">
                    No players found for &ldquo;{query}&rdquo;
                    {region !== 'all' && (
                      <span>
                        {' '}
                        in{' '}
                        <span className="text-[#5A6478]">
                          {activeRegion.label}
                        </span>
                      </span>
                    )}
                  </p>
                </div>
              ) : (
                <>
                  <div className="px-4 py-2 border-b border-[#1A2030] flex items-center justify-between">
                    <span className="section-label">
                      {results.length} result{results.length !== 1 ? 's' : ''}
                    </span>
                    {region !== 'all' && (
                      <span className="flex items-center gap-1 text-[10px] font-condensed text-[#5A6478]">
                        <span>{activeRegion.flag}</span>
                        {activeRegion.label}
                      </span>
                    )}
                  </div>
                  {results.map((player, i) => {
                    const isTracked = tracked.includes(player.id);
                    const regionMeta = REGIONS.find(
                      (r) => r.id === player.region,
                    );
                    return (
                      <div
                        key={player.id}
                        className="flex items-center gap-4 px-4 py-3 border-b border-[#0D1017] hover:bg-[#111520] transition-colors"
                      >
                        {/* Avatar */}
                        <div className="w-9 h-9 rounded-lg bg-[#161C28] border border-[#1E2535] flex items-center justify-center shrink-0">
                          <span
                            className="font-condensed font-800 text-sm"
                            style={{ color: RANK_COLORS[Math.min(i, 4)] }}
                          >
                            {player.name[0]}
                          </span>
                        </div>

                        {/* Info */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="font-condensed font-700 text-white text-sm">
                              {player.name}
                            </span>
                            <span className="text-[#3A4155] text-xs font-condensed">
                              #{player.rank}
                            </span>
                            {regionMeta && (
                              <span
                                className="text-xs leading-none"
                                title={regionMeta.label}
                              >
                                {regionMeta.flag}
                              </span>
                            )}
                          </div>
                          <div className="flex items-center gap-2 mt-0.5">
                            <img
                              src={player.gameIcon}
                              className="w-3 h-3"
                              alt={player.game}
                              style={{ filter: 'invert(0.4)' }}
                            />
                            <span className="text-[#5A6478] text-xs">
                              {player.team} · {player.game}
                            </span>
                          </div>
                        </div>

                        {/* Track button */}
                        <button
                          onClick={() => toggleTrack(player.id)}
                          className={`shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-condensed font-600 border transition-all duration-200 cursor-pointer ${
                            isTracked
                              ? 'bg-[rgba(0,229,255,0.1)] text-[#00E5FF] border-[rgba(0,229,255,0.3)]'
                              : 'bg-transparent text-[#5A6478] border-[#1E2535] hover:border-[#2A3040] hover:text-white'
                          }`}
                        >
                          <img
                            src={
                              isTracked
                                ? 'https://cdn.jsdelivr.net/npm/lucide-static@0.441.0/icons/check.svg'
                                : 'https://cdn.jsdelivr.net/npm/lucide-static@0.441.0/icons/plus.svg'
                            }
                            className="w-3 h-3"
                            alt={isTracked ? 'tracked' : 'track'}
                            style={{
                              filter: isTracked
                                ? 'invert(0.7) sepia(1) hue-rotate(170deg) saturate(8)'
                                : 'invert(0.5)',
                            }}
                          />
                          {isTracked ? 'Tracked' : 'Track'}
                        </button>
                      </div>
                    );
                  })}
                </>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Tracked pills */}
      {tracked.length > 0 && (
        <div className="flex flex-wrap items-center gap-2 mt-3">
          <span className="section-label">Tracking:</span>
          {tracked.map((id) => {
            const p = MOCK_PLAYERS.find((pl) => pl.id === id);
            if (!p) return null;
            const regionMeta = REGIONS.find((r) => r.id === p.region);
            return (
              <span
                key={id}
                className="flex items-center gap-1.5 px-3 py-1 bg-[rgba(0,229,255,0.08)] border border-[rgba(0,229,255,0.2)] rounded-full text-[#00E5FF] text-xs font-condensed font-600"
              >
                {regionMeta && (
                  <span className="text-xs">{regionMeta.flag}</span>
                )}
                {p.name}
                <button
                  onClick={() => toggleTrack(id)}
                  className="opacity-50 hover:opacity-100 cursor-pointer transition-opacity"
                >
                  <img
                    src="https://cdn.jsdelivr.net/npm/lucide-static@0.441.0/icons/x.svg"
                    className="w-3 h-3"
                    alt="remove"
                    style={{
                      filter:
                        'invert(0.7) sepia(1) hue-rotate(170deg) saturate(8)',
                    }}
                  />
                </button>
              </span>
            );
          })}
        </div>
      )}
    </section>
  );
}
