'use client';

import { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check } from 'lucide-react';
import { REGIONS, Region } from '../constants/searchConstants';

interface RegionPickerProps {
  region: string;
  activeRegion: Region;
  onSelect: (id: string) => void;
}

export default function RegionPicker({
  region,
  activeRegion,
  onSelect,
}: RegionPickerProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const h = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node))
        setOpen(false);
    };
    document.addEventListener('mousedown', h);
    return () => document.removeEventListener('mousedown', h);
  }, []);

  return (
    <div ref={ref} className="relative shrink-0">
      <button
        onClick={() => setOpen((v) => !v)}
        className={`flex items-center gap-2 h-12 w-24 px-3 rounded-xl border font-condensed font-600 text-sm transition-all duration-200 cursor-pointer ${
          open
            ? 'border-[rgba(0,229,255,0.4)] bg-[#0D1017] text-[#00E5FF]'
            : 'border-[rgba(0,229,255,0.25)] bg-[rgba(0,229,255,0.06)] text-[#00E5FF]'
        }`}
      >
        <div className="flex justify-between w-full items-center">
          <span className="text-base leading-none">{activeRegion.flag}</span>
          <span className="tracking-wider">{activeRegion.label}</span>
          <ChevronDown
            size={14}
            className={`transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
          />
        </div>
      </button>

      {open && (
        <div className="absolute top-[calc(100%+6px)] left-0 z-50 w-36 card border-[#1E2535] overflow-hidden shadow-2xl animate-slide-up">
          {REGIONS.map((r) => (
            <button
              key={r.id}
              onClick={() => {
                onSelect(r.id);
                setOpen(false);
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
                <Check size={12} className="text-[#00E5FF] ml-auto" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
