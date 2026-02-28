'use client';

 import Pagination from '@/components/Pagination';
import FavouritesHeader from '@/components/playerView/FavouritesHeader';
import FavouritesLoading from '@/components/playerView/FavouritesLoading';
import PlayerCard from '@/components/playerView/PlayerCard';
import { useFavorites } from '@/hooks/useFavorite';
 

export default function TrackedPlayers() {
  const { favorites, loading, remove, pagination, goToPage } = useFavorites();
 
   if (loading) return <FavouritesLoading />;
  if (!loading && favorites.length === 0) return null;
  return (
    <section className="m-10">
      <FavouritesHeader count={pagination.total} />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
        {favorites.map((fav: any) => (
          <PlayerCard
            key={String(fav._id)}
            favId={String(fav._id)}
            playerId={String(fav.playerId._id)}
            gameName={fav.playerId.gameName}
            tagLine={fav.playerId.tagLine}
            profileIconId={fav.playerId.profileIconId!}
            ranked={fav.playerId.ranked[0]}
            onRemove={remove}
          />
        ))}
      </div>
      <Pagination
        page={pagination.page}
        pages={pagination.pages}
        total={pagination.total}
        onPageChange={goToPage}
      />
    </section>
  );
}
