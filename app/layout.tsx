import type { Metadata } from 'next';
import './globals.css';
import ReduxProvider from '@/app/ReduxProvider';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'Esports — Live Tracker',
  description: 'Track live esports matches, scores & leaderboards',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Barlow:wght@400;500;600;700&family=Barlow+Condensed:wght@500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">
        <ReduxProvider>
          <Suspense fallback={null}>{children}</Suspense>
        </ReduxProvider>
      </body>
    </html>
  );
}
