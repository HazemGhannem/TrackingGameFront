'use client';

import { useRef } from 'react';
import { Provider } from 'react-redux';
import { store, AppStore } from '@/redux/store';
import NotificationContainer from '@/components/NotificationContainer';
import Navbar from '@/components/Navbar';
import GameNotificationProvider from '@/components/GameNotificationProvider';

export default function ReduxProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const storeRef = useRef<AppStore | null>(null);
  if (!storeRef.current) {
    storeRef.current = store();
  }

  return (
    <Provider store={storeRef.current}>
      <Navbar />
      <GameNotificationProvider>{children}</GameNotificationProvider>
      <NotificationContainer />
    </Provider>
  );
}
