interface WinRateBarProps {
  wr: number;
  color: string;
}

export default function WinRateBar({ wr, color }: WinRateBarProps) {
  return (
    <div className="mt-3">
      <div className="flex justify-between mb-1">
        <span className="section-label">WIN RATE</span>
        <span className="font-condensed font-700 text-xs" style={{ color }}>
          {wr}%
        </span>
      </div>
      <div className="h-1.5 rounded-full bg-[#161C28] overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-700"
          style={{ width: `${wr}%`, background: color }}
        />
      </div>
    </div>
  );
}
