'use client';

import { useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import {
  removeNotification
} from '@/redux/slices/NotificationSlice';
import { Notification } from '@/redux/slices/types';

/* ─── Per-type config ────────────────────────────────── */
const CONFIG = {
  success: {
    icon: 'https://cdn.jsdelivr.net/npm/lucide-static@0.441.0/icons/circle-check.svg',
    accent: '#00E676',
    bg: 'rgba(0,230,118,0.07)',
    border: 'rgba(0,230,118,0.2)',
    glow: '0 0 24px rgba(0,230,118,0.12)',
    filter:
      'invert(0.55) sepia(1) hue-rotate(100deg) saturate(5) brightness(1.1)',
  },
  error: {
    icon: 'https://cdn.jsdelivr.net/npm/lucide-static@0.441.0/icons/circle-x.svg',
    accent: '#FF3B5C',
    bg: 'rgba(255,59,92,0.07)',
    border: 'rgba(255,59,92,0.22)',
    glow: '0 0 24px rgba(255,59,92,0.12)',
    filter:
      'invert(0.4) sepia(1) hue-rotate(-20deg) saturate(6) brightness(1.1)',
  },
  warning: {
    icon: 'https://cdn.jsdelivr.net/npm/lucide-static@0.441.0/icons/triangle-alert.svg',
    accent: '#FFB300',
    bg: 'rgba(255,179,0,0.07)',
    border: 'rgba(255,179,0,0.22)',
    glow: '0 0 24px rgba(255,179,0,0.12)',
    filter:
      'invert(0.5) sepia(1) hue-rotate(10deg) saturate(8) brightness(1.1)',
  },
  info: {
    icon: 'https://cdn.jsdelivr.net/npm/lucide-static@0.441.0/icons/info.svg',
    accent: '#00E5FF',
    bg: 'rgba(0,229,255,0.07)',
    border: 'rgba(0,229,255,0.22)',
    glow: '0 0 24px rgba(0,229,255,0.12)',
    filter:
      'invert(0.7) sepia(1) hue-rotate(170deg) saturate(8) brightness(1.2)',
  },
} as const;

/* ─── Progress bar ───────────────────────────────────── */
function ProgressBar({
  duration,
  accent,
  onComplete,
}: {
  duration: number;
  accent: string;
  onComplete: () => void;
}) {
  return (
    <motion.div
      className="absolute bottom-0 left-0 h-[2px] rounded-full"
      style={{ background: accent }}
      initial={{ width: '100%' }}
      animate={{ width: '0%' }}
      transition={{ duration: duration / 1000, ease: 'linear' }}
      onAnimationComplete={onComplete}
    />
  );
}

/* ─── Single Toast ───────────────────────────────────── */
function Toast({ notification }: { notification: Notification }) {
  const dispatch = useAppDispatch();
  const cfg = CONFIG[notification.type];
  const duration = notification.duration ?? 4000;

  const dismiss = () => dispatch(removeNotification(notification.id));

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: 80, scale: 0.92 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 80, scale: 0.92, transition: { duration: 0.2 } }}
      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
      className="relative w-[360px] max-w-[calc(100vw-2rem)] overflow-hidden rounded-2xl"
      style={{
        background: `linear-gradient(135deg, #0D1017 0%, #111520 100%)`,
        border: `1px solid ${cfg.border}`,
        boxShadow: `${cfg.glow}, 0 8px 32px rgba(0,0,0,0.5)`,
      }}
    >
      {/* Top accent line */}
      <div
        className="absolute top-0 left-0 right-0 h-[1px]"
        style={{
          background: `linear-gradient(90deg, transparent, ${cfg.accent}, transparent)`,
        }}
      />

      <div className="flex items-start gap-3 p-4">
        {/* Icon */}
        <div
          className="mt-0.5 w-8 h-8 rounded-xl flex items-center justify-center shrink-0"
          style={{ background: cfg.bg, border: `1px solid ${cfg.border}` }}
        >
          <img
            src={cfg.icon}
            className="w-4 h-4"
            alt={notification.type}
            style={{ filter: cfg.filter }}
          />
        </div>

        {/* Text */}
        <div className="flex-1 min-w-0 pt-0.5">
          <p
            className="font-condensed font-700 text-sm tracking-wide"
            style={{ color: cfg.accent }}
          >
            {notification.title}
          </p>
          {notification.message && (
            <p className="text-[#8A94A8] text-xs mt-0.5 leading-relaxed">
              {notification.message}
            </p>
          )}
        </div>

        {/* Close */}
        <button
          onClick={dismiss}
          className="shrink-0 opacity-30 hover:opacity-70 transition-opacity cursor-pointer mt-0.5"
        >
          <img
            src="https://cdn.jsdelivr.net/npm/lucide-static@0.441.0/icons/x.svg"
            className="w-4 h-4"
            alt="close"
            style={{ filter: 'invert(1)' }}
          />
        </button>
      </div>

      {/* Progress bar — only for timed toasts */}
      {duration > 0 && (
        <ProgressBar
          duration={duration}
          accent={cfg.accent}
          onComplete={dismiss}
        />
      )}
    </motion.div>
  );
}

/* ─── Container / Portal ─────────────────────────────── */
export default function NotificationContainer() {
  const notifications = useAppSelector((s) => s.notifications.notifications);

  return (
    <div
      className="fixed top-5 right-5 z-[9999] flex flex-col gap-3 items-end"
      aria-live="polite"
      aria-label="Notifications"
    >
      <AnimatePresence mode="popLayout">
        {notifications.map((n) => (
          <Toast key={n.id} notification={n} />
        ))}
      </AnimatePresence>
    </div>
  );
}
