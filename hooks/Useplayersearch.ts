'use client';

import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import { playerSearch } from '@/api/riot';
import { PlayerProfile } from '@/api/types';

interface UsePlayerSearchReturn {
  profile: PlayerProfile | null;
  loading: boolean;
  error: string | null;
  search: (name: string, tag: string) => void;
  reset: () => void;
}

export function usePlayerSearch(): UsePlayerSearchReturn {
  const dispatch = useAppDispatch();
  const { profile, loading, error } = useAppSelector((state) => state.riot);

  const search = useCallback(
    (name: string, tag: string) => {
      dispatch(playerSearch({ name, tag }));
    },
    [dispatch],
  );

  const reset = useCallback(() => {
    dispatch({ type: 'riot/reset' });  
  }, [dispatch]);

  return { profile, loading, error, search, reset };
}
