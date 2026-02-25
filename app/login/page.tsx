'use client';

import Link from 'next/link';
import { Input } from '@/components/Input';
import Image from 'next/image';
import { AlertCircle, Zap } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

export default function LoginPage() {
  const {
    loginForm,
    showPassword,
    loading,
    serverError,
    handleLoginChange,
    handleLoginSubmit,
    togglePassword,
    currentUser,
  } = useAuth();
  return (
    <div className="min-h-screen bg-[#080A0F] flex items-center justify-center px-4 font-['Barlow',sans-serif]">
      {/* Grid bg */}
      <div
        className="fixed inset-0 pointer-events-none opacity-[0.025]"
        style={{
          backgroundImage:
            'linear-gradient(#00E5FF 1px,transparent 1px),linear-gradient(90deg,#00E5FF 1px,transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />
      {/* Glow blob */}
      <div
        className="fixed top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[350px] pointer-events-none rounded-full"
        style={{
          background:
            'radial-gradient(ellipse,rgba(0,229,255,0.07) 0%,transparent 70%)',
        }}
      />

      <div className="relative w-full max-w-[420px]">
        {/* Logo */}
        <Link href="/" className="flex items-center justify-center gap-3 mb-10">
          <div className="w-9 h-9 rounded-xl bg-[#00E5FF] flex items-center justify-center glow-cyan">
            <Zap
              className="w-5 h-5"
              style={{ filter: 'invert(1) brightness(0)' }}
            />
          </div>
          <span className="font-condensed font-800 text-2xl tracking-wider text-white">
            ES<span className="text-[#00E5FF]">PORTS</span>
          </span>
        </Link>

        {/* Card */}
        <div className="card p-8 border-[#1E2535]">
          <div className="mb-8">
            <h1 className="font-condensed font-700 text-3xl text-white tracking-wide">
              Welcome back
            </h1>
            <p className="text-[#5A6478] text-sm mt-1">
              Sign in to track your favourite players
            </p>
          </div>

          <div className="flex flex-col gap-5">
            {/* Email */}
            <Input
              label="Email"
              name="email"
              type="email"
              placeholder="you@email.com"
              icon="https://cdn.jsdelivr.net/npm/lucide-static@0.441.0/icons/mail.svg"
              form={loginForm}
              handleChange={handleLoginChange}
            />

            {/* Password */}
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between">
                <span className="section-label">Password</span>

                <Link
                  href="/forgot-password"
                  className="text-[#5A6478] text-xs hover:text-[#00E5FF] transition-colors"
                >
                  Forgot password?
                </Link>
              </div>

              <Input
                label=""
                name="password"
                type="password"
                placeholder="••••••••"
                icon="https://cdn.jsdelivr.net/npm/lucide-static@0.441.0/icons/lock.svg"
                form={loginForm}
                handleChange={handleLoginChange}
                showPassword={showPassword}
                togglePassword={togglePassword}
              />
            </div>

            {/* Error */}
            {serverError && (
              <div className="flex items-center gap-2 px-4 py-3 bg-[rgba(255,59,92,0.08)] border border-[rgba(255,59,92,0.2)] rounded-xl">
                <AlertCircle className="w-4 h-4 text-red-500" />
                <span className="text-[#FF3B5C] text-sm">{serverError}</span>
              </div>
            )}

            {/* Submit */}
            <button
              onClick={handleLoginSubmit}
              disabled={loading}
              className="mt-1 h-11 rounded-xl bg-[#00E5FF] text-black font-condensed font-700 text-sm tracking-wider transition-all duration-200 hover:brightness-110 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer glow-cyan flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Image
                    src="https://cdn.jsdelivr.net/npm/lucide-static@0.441.0/icons/loader.svg"
                    width={16}
                    height={16}
                    alt="loading"
                    style={{
                      filter: 'invert(1) brightness(0)',
                      animation: 'spin 1s linear infinite',
                    }}
                  />
                  Signing in...
                </>
              ) : (
                'SIGN IN'
              )}
            </button>

            {/* Divider */}
            <div className="flex items-center gap-3">
              <div className="flex-1 h-px bg-[#1A2030]" />
              <span className="text-[#3A4155] text-xs font-condensed">OR</span>
              <div className="flex-1 h-px bg-[#1A2030]" />
            </div>

            <p className="text-center text-[#5A6478] text-sm ">
              Don&apos;t have an account?
              <Link
                href="/signup"
                className="text-[#00E5FF] hover:underline font-medium ml-2"
              >
                Create one
              </Link>
            </p>
          </div>
        </div>

        <p className="text-center text-[#3A4155] text-xs mt-6">
          By signing in you agree to our
          <span className="hover:text-[#5A6478] cursor-pointer transition-colors">
            Terms
          </span>
          &amp;
          <span className="hover:text-[#5A6478] cursor-pointer transition-colors">
            Privacy Policy
          </span>
        </p>
      </div>
    </div>
  );
}
