import PlayerCardSkeleton from '@/components/PlayerCardSkeleton';

export default function FavouritesLoading() {
  return (
    <section className="m-10">
      <div className="flex items-center gap-3 mb-5">
        <div className="w-1 h-5 rounded-full bg-[#1A2030]" />
        <div className="h-4 w-40 rounded-md bg-[#161C28] animate-pulse" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
        {[...Array(4)].map((_, i) => (
          <PlayerCardSkeleton key={i} />
        ))}
      </div>
    </section>
  );
}
