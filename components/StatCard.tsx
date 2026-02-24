'use client';
import Image from 'next/image';

interface StatCardProps {
  label: string;
  value: string;
  sub: string;
  icon: string;
  accent: string;
  delay?: number;
}

export default function StatCard({
  label,
  value,
  sub,
  icon,
  accent,
  delay = 0,
}: StatCardProps) {
  return (
    <div
      className="card card-hover p-5 flex flex-col gap-4 animate-slide-up"
      style={{ animationDelay: `${delay}s` }}
    >
      <div className="flex items-center justify-between">
        <span className="section-label">{label}</span>

        <div
          className="w-8 h-8 rounded-lg flex items-center justify-center"
          style={{ background: `${accent}18` }}
        >
          <Image
            src={icon}
            alt={label}
            width={16}
            height={16}
            className="w-4 h-4"
            style={{
              filter:
                'invert(1) sepia(1) hue-rotate(180deg) saturate(5) brightness(1.5)',
              opacity: 0.9,
            }}
          />
        </div>
      </div>

      <div>
        <div
          className="font-condensed font-800 text-3xl"
          style={{ color: accent }}
        >
          {value}
        </div>

        <p className="text-[#5A6478] text-xs mt-1">{sub}</p>
      </div>
    </div>
  );
}
