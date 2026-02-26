import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import { clearError } from '@/redux/slices/favoriteSlice';
import { addFavorite, fetchFavorites, removeFavorite } from '@/api/favorite';

export function useFavorites() {
  const dispatch = useAppDispatch();
  const { items, loading, error } = useAppSelector((s) => s.favorite);

   useEffect(() => {
    dispatch(fetchFavorites());
  }, [dispatch]);

  function add(playerId: string) {
    dispatch(addFavorite({ playerId }));
  }

  function remove(favoriteId: string) {
    dispatch(removeFavorite({ favoriteId }));
  }

  function isFavorited(favId: string) {
    return items.some((fav) => String(fav.playerId._id) === favId);
  }

   function toggleTrack(playerId: string) {
     if (isFavorited(playerId)) {
       const favoriteId = items.find(
         (fav) => String(fav.playerId._id) === playerId,
       )?._id;
       if (favoriteId) remove(String(favoriteId));
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
  };
}
