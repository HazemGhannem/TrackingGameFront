import { DDragon } from "../constants/liveGameConstant";

export function SpellIcon({ spellKey }: { spellKey: string }) {
  return (
    <div className="w-5 h-5 rounded-md overflow-hidden border border-[#1A2030]">
      <img
        src={DDragon.spellIcon(spellKey)}
        alt={spellKey}
        className="w-full h-full object-cover"
        onError={(e) => {
          (e.target as HTMLImageElement).style.display = 'none';
        }}
      />
    </div>
  );
}