import PlayerSearch from '@/components/playerSearch/PlayerSearch';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#080A0F] text-white font-['Barlow',sans-serif] ">
      <section className="relative flex flex-col items-center justify-center px-6 pt-20 pb-40 ">
        <div
          className="absolute inset-0 pointer-events-none "
          style={{
            background:
              'radial-gradient(ellipse 80% 50% at 50% 0%, rgba(0,229,255,0.07) 0%, transparent 70%)',
          }}
        />
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.025] "
          style={{
            backgroundImage:
              'linear-gradient(#00E5FF 1px,transparent 1px),linear-gradient(90deg,#00E5FF 1px,transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />

        <div className="relative text-center mb-8 ">
          <p className="section-label mb-3">Esports Tracker</p>
          <h1 className="font-condensed font-800 text-5xl md:text-6xl tracking-tight text-white leading-none">
            Find any
            <span
              className="text-[#00E5FF]"
              style={{ textShadow: '0 0 40px rgba(0,229,255,0.4)' }}
            >
              Player
            </span>
          </h1>
          <p className="text-[#5A6478] text-sm mt-3 max-w-sm mx-auto">
            Search across all regions and games. Track your favourites in real
            time.
          </p>
        </div>

        <div className="relative w-full max-w-2xl">
          <PlayerSearch />
        </div>
      </section>
    </main>
  );
}
