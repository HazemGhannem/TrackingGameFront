
import { useCallback } from 'react';
import { useAppDispatch } from '@/redux/hook';
import {
  addNotification,
  removeNotification,
  clearAll,
} from '@/redux/slices/NotificationSlice';
import { NotificationType } from '@/redux/slices/types';

interface NotifyOptions {
  title: string;
  message?: string;
  duration?: number;
}

export function useNotification() {
  const dispatch = useAppDispatch();

  const notify = useCallback(
    (type: NotificationType, options: NotifyOptions) => {
      dispatch(addNotification({ type, ...options }));
    },
    [dispatch],
  );

  const dismiss = useCallback(
    (id: string) => dispatch(removeNotification(id)),
    [dispatch],
  );

  const dismissAll = useCallback(() => dispatch(clearAll()), [dispatch]);

  return {
    /** Show a success toast */
    success: (opts: NotifyOptions) => notify('success', opts),
    /** Show an error toast */
    error: (opts: NotifyOptions) => notify('error', opts),
    /** Show an info toast */
    info: (opts: NotifyOptions) => notify('info', opts),
    /** Show a warning toast */
    warning: (opts: NotifyOptions) => notify('warning', opts),
    /** Dismiss a single notification by id */
    dismiss,
    /** Dismiss all notifications */
    dismissAll,
  };
}
