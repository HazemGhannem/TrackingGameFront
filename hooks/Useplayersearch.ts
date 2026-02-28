'use client';

import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import { fetchChallengers, playerSearch } from '@/api/riot';
import {
  ChallengerPlayer,
  PlatformRegion,
  PlayerProfile,
} from '@/types/api/types';
import { resetPlayer, setPlatform } from '@/redux/slices/riotSlice';

interface UsePlayerSearchReturn {
  profile: PlayerProfile | null;
  loading: boolean;
  error: string | null;
  search: (name: string, tag: string, region: string) => void;
  reset: () => void;

  challengers: ChallengerPlayer[];
  challengerPlatform: PlatformRegion;
  challengerLoading: boolean;
  challengerError: string | null;
  challangerTop10: (platform: PlatformRegion) => void;
  changePlatform: (platform: PlatformRegion) => void;
}

export function usePlayerSearch(): UsePlayerSearchReturn {
  const dispatch = useAppDispatch();
  const { profile, loading, error } = useAppSelector((state) => state.riot);
  const {
    players: challengers,
    platform: challengerPlatform,
    loading: challengerLoading,
    error: challengerError,
  } = useAppSelector((state) => state.riot.challenger);
  const search = useCallback(
    (name: string, tag: string, region: string) => {
      dispatch(playerSearch({ name, tag, region }));
    },
    [dispatch],
  );

  const reset = useCallback(() => {
    dispatch(resetPlayer());
  }, [dispatch]);

  const challangerTop10 = useCallback(
    (platform: PlatformRegion) => {
      dispatch(fetchChallengers(platform));
    },
    [dispatch],
  );
  const changePlatform = useCallback(
    (platform: PlatformRegion) => {
      dispatch(setPlatform(platform));
    },
    [dispatch],
  );
  return {
    profile,
    loading,
    error,
    search,
    reset,
    challengers,
    challengerPlatform,
    challengerLoading,
    challengerError,
    challangerTop10,
    changePlatform,
  };
}
