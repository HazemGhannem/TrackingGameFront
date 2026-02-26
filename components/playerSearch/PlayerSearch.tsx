'use client';

import { useState, useRef, useEffect } from 'react';
import { Search, Loader2, X } from 'lucide-react';
import { usePlayerSearch } from '@/hooks/Useplayersearch';
import { REGIONS, parseRiotId } from '../constants/searchConstants';
import RegionPicker from './RegionPicker';
import SearchDropdown from './SearchDropdown';
import TrackedPills from './TrackedPills';

export default function PlayerSearch() {
  const [query, setQuery] = useState('');
  const [focused, setFocused] = useState(false);
  const [region, setRegion] = useState('na');

  const inputRef = useRef<HTMLInputElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const { profile, loading, error, search, reset } = usePlayerSearch();
  const activeRegion = REGIONS.find((r) => r.id === region) ?? REGIONS[0];
  const parsed = parseRiotId(query);
  // Show dropdown whenever there's a valid parsed query and the input is focused
  const showDropdown = focused && !!parsed;

  // Auto-search as the user types (debounced)
  useEffect(() => {
    if (!parsed) {
      reset();
      return;
    }
    const timer = setTimeout(() => {
      search(parsed.name, parsed.tag);
    }, 500);
    return () => clearTimeout(timer);
  }, [query]);

  function clearSearch() {
    setQuery('');
    reset();
    inputRef.current?.focus();
  }

  // Close dropdown on outside click
  useEffect(() => {
    const h = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node))
        setFocused(false);
    };
    document.addEventListener('mousedown', h);
    return () => document.removeEventListener('mousedown', h);
  }, []);

  return (
    <section className="mt-8 mb-2">
      <div className="flex items-center gap-2 mb-3">
        <Search size={16} className="text-[#5A6478]" />
        <h2 className="font-condensed font-700 text-lg text-white tracking-wide">
          TRACK A PLAYER
        </h2>
      </div>

      <div className="flex items-stretch gap-2">
        <RegionPicker
          region={region}
          activeRegion={activeRegion}
          onSelect={setRegion}
        />

        <div className="relative flex-1" ref={wrapperRef}>
          <div
            className={`flex items-center gap-3 px-4 h-12 rounded-xl border transition-all duration-200 ${
              focused
                ? 'border-[rgba(0,229,255,0.4)] bg-[#0D1017] glow-cyan'
                : 'border-[#1A2030] bg-[#0D1017] hover:border-[#2A3040]'
            }`}
          >
            {loading ? (
              <Loader2
                size={16}
                className="shrink-0 text-[#00E5FF] animate-spin"
              />
            ) : (
              <Search
                size={16}
                className={`shrink-0 transition-colors duration-200 ${
                  focused ? 'text-[#00E5FF]' : 'text-[#3A4155]'
                }`}
              />
            )}

            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => setFocused(true)}
              placeholder={`Search player name #${activeRegion.label}  (e.g. Faker#KR1)`}
              className="flex-1 bg-transparent text-white text-sm placeholder-[#3A4155] outline-none font-['Barlow',sans-serif]"
            />

            {query ? (
              <button
                onClick={clearSearch}
                className="shrink-0 cursor-pointer text-[#5A6478] opacity-40 hover:opacity-80 transition-opacity"
              >
                <X size={16} />
              </button>
            ) : (
              <div className="hidden sm:flex items-center gap-1 shrink-0 px-2 py-1 rounded-md border border-[#1A2030] bg-[#080A0F]">
                <span className="text-[#3A4155] text-[11px] font-condensed">
                  ⌘K
                </span>
              </div>
            )}
          </div>

          {showDropdown && (
            <SearchDropdown
              loading={loading}
              error={error}
              profile={profile}
              parsed={parsed}
              activeRegion={activeRegion}
            />
          )}
        </div>
      </div>

      <TrackedPills activeRegion={activeRegion} />
    </section>
  );
}
