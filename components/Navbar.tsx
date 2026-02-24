"use client";

import { useState } from "react";
import { motion } from 'framer-motion';
import Image from "next/image";

const NAV_LINKS = ["Overview", "Matches", "Teams", "Players", "Tournaments"];

export default function Navbar() {
  const [active, setActive] = useState("Overview");

  return (
    <header className="sticky top-0 z-50 border-b border-[#1A2030] backdrop-blur-md bg-[rgba(8,10,15,0.9)]">
      <div className="max-w-[1400px] mx-auto px-6 h-16 flex items-center justify-between gap-8">
        {/* Logo */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="w-8 h-8 rounded-lg bg-[#00E5FF] flex items-center justify-center glow-cyan">
            <img
              src="https://cdn.jsdelivr.net/npm/lucide-static@0.441.0/icons/zap.svg"
              className="w-4 h-4"
              alt="logo"
              style={{ filter: 'invert(1) brightness(0)' }}
            />
          </div>
          <span className="font-condensed font-800 text-xl tracking-wider text-white">
            ES<span className="text-[#00E5FF]">PORTS</span>
          </span>
        </div>

        {/* Nav */}
        <nav className="hidden md:flex items-center gap-1 relative">
          {NAV_LINKS.map((link) => (
            <button
              key={link}
              onClick={() => setActive(link)}
              className={`relative px-4 py-2 text-sm font-medium transition-colors duration-300 cursor-pointer ${
                active === link
                  ? 'text-[#00E5FF]'
                  : 'text-[#8A94A8] hover:text-white'
              }`}
            >
              {/* The text label */}
              <span className="relative z-10">{link}</span>

              {/* The Animated Background Pill */}
              {active === link && (
                <motion.div
                  layoutId="activeNav"
                  className="absolute inset-0 bg-[rgba(0,229,255,0.1)] border border-[rgba(0,229,255,0.2)] rounded-lg"
                  transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                />
              )}
            </button>
          ))}
        </nav>

        {/* Right */}
        <div className="flex items-center gap-3">
          {/* Notification */}
          <button className="relative w-9 h-9 rounded-lg bg-[#111520] border border-[#1A2030] flex items-center justify-center hover:border-[#2A3040] transition-colors cursor-pointer">
            <Image
              src="https://cdn.jsdelivr.net/npm/lucide-static@0.441.0/icons/bell.svg"
              className="w-4 h-4"
              alt="notifications"
              style={{ filter: 'invert(0.6) sepia(0) brightness(1.2)' }}
              width={36}
              height={36}
            />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#FF3B5C] rounded-full border border-[#080A0F]" />
          </button>

          {/* Avatar */}
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#00E5FF] to-[#0066FF] flex items-center justify-center cursor-pointer">
            <span className="font-condensed font-700 text-sm text-black">
              KD
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}