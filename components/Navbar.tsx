'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import {
  Bell,
  LogOut,
  Menu,
  Settings,
  User as UserIcon,
  X,
  Zap,
} from 'lucide-react';

const NAV_LINKS = [
  { name: 'Overview', href: '/dashboard' },
  { name: 'Matches', href: '/matches' },
  { name: 'Players', href: '/players' },
  { name: 'Tournaments', href: '/tournaments' },
];

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { currentUser, handleLogout } = useAuth();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const initials = currentUser?.username
    ? currentUser.username.substring(0, 2).toUpperCase()
    : '??';

  if (!mounted) {
    return (
      <div className="w-full h-16 bg-[#080A0F] border-b border-[#1A2030]" />
    );
  }

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-[#1A2030] backdrop-blur-md bg-[rgba(8,10,15,0.92)]">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 shrink-0">
            <div className="w-8 h-8 rounded-lg bg-[#00E5FF] flex items-center justify-center shadow-[0_0_12px_rgba(0,229,255,0.5)]">
              <Zap className="h-4 w-4 text-black" />
            </div>
            <span className="font-black text-xl tracking-wider text-white uppercase">
              ES<span className="text-[#00E5FF]">PORTS</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {currentUser &&
              NAV_LINKS.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`relative px-4 py-2 text-sm font-medium transition-colors duration-200 rounded-lg ${
                      isActive
                        ? 'text-[#00E5FF]'
                        : 'text-[#8A94A8] hover:text-white hover:bg-[#111520]'
                    }`}
                  >
                    <span className="relative z-10">{link.name}</span>
                    {isActive && (
                      <motion.div
                        layoutId="activeNav"
                        className="absolute inset-0 bg-[rgba(0,229,255,0.1)] border border-[rgba(0,229,255,0.2)] rounded-lg"
                        transition={{
                          type: 'spring',
                          bounce: 0.2,
                          duration: 0.5,
                        }}
                      />
                    )}
                  </Link>
                );
              })}
          </nav>

          {/* Right Side */}
          <div className="flex items-center gap-2">
            {currentUser ? (
              <>
                {/* Notification Bell */}
                <button className="relative w-9 h-9 rounded-lg bg-[#111520] border border-[#1A2030] flex items-center justify-center hover:border-[#2A3040] transition-colors group">
                  <Bell className="w-4 h-4 text-[#8A94A8] group-hover:text-white transition-colors" />
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#FF3B5C] rounded-full border border-[#080A0F]" />
                </button>

                {/* User Menu */}
                <div className="relative" id="user-menu">
                  <button
                    onClick={() => setMenuOpen(!menuOpen)}
                    className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#00E5FF] to-[#0066FF] flex items-center justify-center hover:brightness-110 transition-all shadow-[0_0_15px_rgba(0,229,255,0.3)]"
                    aria-label="User menu"
                  >
                    <span className="font-black text-sm text-black">
                      {initials}
                    </span>
                  </button>

                  <AnimatePresence>
                    {menuOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -8, scale: 0.96 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -8, scale: 0.96 }}
                        transition={{ duration: 0.15 }}
                        className="absolute top-[calc(100%+10px)] right-0 w-56 bg-[#0D111A] border border-[#1E2535] rounded-xl overflow-hidden shadow-2xl z-50"
                      >
                        <div className="px-4 py-3 bg-[#111520] border-b border-[#1A2030]">
                          <p className="font-bold text-sm text-white truncate">
                            {currentUser.username}
                          </p>
                          <p className="text-[#5A6478] text-xs truncate">
                            {currentUser.email}
                          </p>
                        </div>
                        <div className="p-1">
                          <Link
                            href="/profile"
                            className="flex items-center gap-3 px-3 py-2 text-sm text-[#8A94A8] hover:text-white hover:bg-[#1A2030] rounded-lg transition-colors"
                          >
                            <UserIcon size={15} /> Profile
                          </Link>
                          <Link
                            href="/settings"
                            className="flex items-center gap-3 px-3 py-2 text-sm text-[#8A94A8] hover:text-white hover:bg-[#1A2030] rounded-lg transition-colors"
                          >
                            <Settings size={15} /> Settings
                          </Link>
                        </div>
                        <div className="border-t border-[#1A2030] p-1">
                          <button
                            onClick={() => {
                              setMenuOpen(false);
                              handleLogout();
                            }}
                            className="w-full flex items-center gap-3 px-3 py-2 text-sm text-[#FF3B5C] hover:bg-[rgba(255,59,92,0.1)] rounded-lg transition-colors"
                          >
                            <LogOut size={15} /> Sign out
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Mobile Hamburger */}
                <button
                  onClick={() => setMobileOpen(!mobileOpen)}
                  className="md:hidden w-9 h-9 rounded-lg bg-[#111520] border border-[#1A2030] flex items-center justify-center hover:border-[#2A3040] transition-colors"
                  aria-label="Toggle mobile menu"
                >
                  {mobileOpen ? (
                    <X className="w-4 h-4 text-white" />
                  ) : (
                    <Menu className="w-4 h-4 text-[#8A94A8]" />
                  )}
                </button>
              </>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  href="/login"
                  className="px-4 py-2 text-sm font-semibold text-[#8A94A8] hover:text-white transition-colors"
                >
                  Login
                </Link>
                <Link
                  href="/signup"
                  className="px-4 py-2 bg-[#00E5FF] hover:bg-[#00B8CC] text-black text-sm font-bold rounded-lg transition-all shadow-[0_0_12px_rgba(0,229,255,0.2)]"
                >
                  Join Now
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Nav Drawer */}
        <AnimatePresence>
          {mobileOpen && currentUser && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="md:hidden overflow-hidden border-t border-[#1A2030] bg-[#080A0F]"
            >
              <nav className="px-4 py-3 flex flex-col gap-1">
                {NAV_LINKS.map((link) => {
                  const isActive = pathname === link.href;
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={`px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                        isActive
                          ? 'bg-[rgba(0,229,255,0.1)] text-[#00E5FF] border border-[rgba(0,229,255,0.2)]'
                          : 'text-[#8A94A8] hover:text-white hover:bg-[#111520]'
                      }`}
                    >
                      {link.name}
                    </Link>
                  );
                })}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
