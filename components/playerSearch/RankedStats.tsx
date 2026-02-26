interface RankedStatsProps {
  lp: number;
  wins: number;
  losses: number;
}

export default function RankedStats({ lp, wins, losses }: RankedStatsProps) {
  const stats = [
    { label: 'LP', value: lp, color: undefined },
    { label: 'WINS', value: wins, color: '#00E676' },
    { label: 'LOSSES', value: losses, color: '#FF3B5C' },
  ];

  return (
    <div className="grid grid-cols-3 gap-2">
      {stats.map(({ label, value, color }) => (
        <div
          key={label}
          className="rounded-lg bg-[#111520] border border-[#1A2030] px-3 py-2 text-center"
        >
          <p className="section-label">{label}</p>
          <p
            className="font-condensed font-700 text-lg mt-0.5"
            style={{ color: color ?? '#fff' }}
          >
            {value}
          </p>
        </div>
      ))}
    </div>
  );
}
