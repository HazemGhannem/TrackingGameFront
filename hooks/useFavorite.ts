import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import { clearError } from '@/redux/slices/favoriteSlice';
import {
  addFavorite,
  fetchFavoriteIds,
  fetchFavorites,
  removeFavorite,
} from '@/api/favorite';

export function useFavorites() {
  const dispatch = useAppDispatch();
  const { items, loading, error, pagination, hasFetched, favoriteIds } =
    useAppSelector((s) => s.favorite);

  useEffect(() => {
    if (!hasFetched) {
      Promise.all([
        dispatch(fetchFavoriteIds()),
        dispatch(fetchFavorites({ page: 1, limit: 4 })),
      ]);
    }
  }, [hasFetched]);

  function goToPage(page: number) {
    dispatch(fetchFavorites({ page, limit: 4 }));
  }
  function add(playerId: string) {
    dispatch(addFavorite({ playerId }));
  }

  function remove(favoriteId: string, playerId: string) {
    dispatch(removeFavorite({ favoriteId, playerId }));
  }

   function isFavorited(playerId: string) {
     return favoriteIds.includes(playerId);  
   }

  function toggleTrack(playerId: string) {
    if (isFavorited(playerId)) {
      const favoriteId = items.find(
        (fav) => String(fav.playerId._id) === playerId,
      )?._id;
      if (favoriteId) remove(String(favoriteId), String(playerId));
    } else {
      add(playerId);
    }
  }

  function dismissError() {
    dispatch(clearError());
  }

  return {
    favorites: items,
    loading,
    error,
    add,
    remove,
    isFavorited,
    toggleTrack,
    dismissError,
    pagination,
    goToPage,
  };
}
