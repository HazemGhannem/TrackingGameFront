import { Loader2, SearchX } from 'lucide-react';
import { PlayerProfile } from '@/api/types';
import { Region } from '../constants/searchConstants';
import ResultCard from './ResultCard';

interface SearchDropdownProps {
  loading: boolean;
  error: string | null;
  profile: PlayerProfile | null;
  parsed: { name: string; tag: string } | null;
  
  activeRegion: Region;
}

export default function SearchDropdown({
  loading,
  error,
  profile,
  parsed,
  
  activeRegion,
}: SearchDropdownProps) {
  return (
    <div className="absolute top-[calc(100%+6px)] left-0 right-0 z-50 card border-[#1E2535] overflow-hidden shadow-2xl animate-slide-up">
      {loading && (
        <div className="flex items-center justify-center gap-3 px-5 py-8">
          <Loader2 size={18} className="text-[#00E5FF] animate-spin" />
          <span className="text-[#5A6478] font-condensed text-sm">
            Looking up {parsed?.name}#{parsed?.tag}…
          </span>
        </div>
      )}

      {!loading && error && (
        <div className="px-5 py-8 text-center">
          <SearchX
            size={32}
            className="mx-auto mb-3 text-[#FF3B5C] opacity-40"
          />
          <p className="text-[#3A4155] font-condensed text-sm">{error}</p>
          <p className="text-[#2A3040] text-xs mt-1">
            Format: <span className="text-[#3A4155]">PlayerName#TAG</span>
          </p>
        </div>
      )}

      {!loading && profile && (
        <ResultCard
          profile={profile}
          
          activeRegion={activeRegion}
        />
      )}
    </div>
  );
}
