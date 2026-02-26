'use client';

import FavouritesHeader from '@/components/playerView/FavouritesHeader';
import FavouritesLoading from '@/components/playerView/FavouritesLoading';
import PlayerCard from '@/components/playerView/PlayerCard';
import { useFavorites } from '@/hooks/useFavorite';

export default function TrackedPlayers() {
  const { favorites, loading, remove } = useFavorites();

  if (loading) return <FavouritesLoading />;
  if (favorites.length === 0) return null;

  return (
    <section className="m-10">
      <FavouritesHeader count={favorites.length} />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
        {favorites.map((fav) => (
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
    </section>
  );
}
