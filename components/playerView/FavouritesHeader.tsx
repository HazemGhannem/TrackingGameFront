interface FavouritesHeaderProps {
  count: number;
}

export default function FavouritesHeader({ count }: FavouritesHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-5">
      <div className="flex items-center gap-3">
        <div
          className="w-1 h-5 rounded-full bg-[#00E5FF]"
          style={{ boxShadow: '0 0 8px #00E5FF' }}
        />
        <h2 className="font-condensed font-700 text-base text-white tracking-widest uppercase">
          Favourite Players
        </h2>
        <span className="flex items-center justify-center w-5 h-5 rounded-full bg-[rgba(0,229,255,0.1)] border border-[rgba(0,229,255,0.2)] text-[#00E5FF] font-condensed font-700 text-[10px]">
          {count}
        </span>
      </div>
    </div>
  );
}
