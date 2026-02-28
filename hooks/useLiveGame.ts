import { useEffect, useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import { getLiveGames } from '@/api/liveGame';
 
export function useLiveGames() {
  const dispatch = useAppDispatch();
  const { activeGames, loading, error, pagination, hasFetched } =
    useAppSelector((s) => s.liveGame);

  useEffect(() => {
    if (!hasFetched) {
      dispatch(getLiveGames({ page: 1, limit: 1 }));
    }
  }, [hasFetched]);
  const refresh = useCallback(() => {
    dispatch(getLiveGames({ page: 1, limit: 1 }));
  }, [dispatch]);
  function goToPage(page: number) {
    dispatch(getLiveGames({ page, limit: 1 }));
  }
  const liveGamesList = Object.values(activeGames);
  const hasLiveGames = liveGamesList.length > 0;

  return {
    liveGamesList,
    hasLiveGames,
    loading,
    error,
    refresh,
    pagination,
    goToPage,
  };
}
