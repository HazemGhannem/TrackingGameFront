import { addFavorite, fetchFavorites, removeFavorite } from '@/api/favorite';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import { clearError } from '@/redux/slices/favoriteSlice';
import { useEffect } from 'react';

export function useFavorites(userId: string) {
  const dispatch = useAppDispatch();
  const { items, loading, error } = useAppSelector((s) => s.favorite);
  useEffect(() => {
    if (userId) {
      dispatch(fetchFavorites(userId));
    }
  }, [userId, dispatch]);

  function add(playerId: string) {
    dispatch(addFavorite({ userId, playerId }));
  }

  function remove(favId: string) {
    console.log('remove');
    dispatch(removeFavorite({ favoriteId: favId }));
  }

  function isFavorited(playerId: string) {
    return items.some((fav) => String(fav.playerId._id) === playerId);
  }

  const toggleTrack = async (playerId: string) => {
    if (!userId) return;

    try {
      if (isFavorited(playerId)) {
        await remove(playerId);
      } else {
        await add(playerId);
      }
    } catch (err: any) {
      console.error('Error toggling favorite:', err.message);
    }
  };
  function dismissError() {
    dispatch(clearError());
  }
  return {
    toggleTrack,
    favorites: items,
    loading,
    error,
    add,
    remove,
    isFavorited,
    dismissError,
  };
}
