'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Input } from '@/components/Input';
import { SuccessCard } from '@/components/SuccessCard';
import { AlertCircle, Zap } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
function strengthLabel(p: string): {
  label: string;
  color: string;
  width: string;
} {
  if (!p) return { label: '', color: '#1A2030', width: '0%' };
  if (p.length < 6)
    return { label: 'Too short', color: '#FF3B5C', width: '20%' };
  if (p.length < 8) return { label: 'Weak', color: '#FF8C00', width: '40%' };
  const hasUpper = /[A-Z]/.test(p);
  const hasNum = /\d/.test(p);
  const hasSymbol = /[^A-Za-z0-9]/.test(p);
  const score = [hasUpper, hasNum, hasSymbol].filter(Boolean).length;
  if (score === 0) return { label: 'Fair', color: '#FFB300', width: '55%' };
  if (score === 1) return { label: 'Good', color: '#00B4D8', width: '70%' };
  if (score === 2) return { label: 'Strong', color: '#00C8A0', width: '85%' };
  return { label: 'Very strong', color: '#00E676', width: '100%' };
}

export default function SignupPage() {
  const {
    form,
    fieldErrors,
    showPassword,
    showConfirm,
    loading,
    success,
    serverError,
    handleChange,
    handleSubmit,
    togglePassword,
    toggleConfirm,
  } = useAuth();

  const strength = strengthLabel(form.password);

  if (success) {
    return <SuccessCard />;
  }

  return (
    <div className="min-h-screen bg-[#080A0F] flex items-center justify-center px-4 py-12 font-['Barlow',sans-serif]">
      {/* Grid bg */}
      <div
        className="fixed inset-0 pointer-events-none opacity-[0.025]"
        style={{
          backgroundImage:
            'linear-gradient(#00E5FF 1px,transparent 1px),linear-gradient(90deg,#00E5FF 1px,transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />
      <div
        className="fixed top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[350px] pointer-events-none rounded-full"
        style={{
          background:
            'radial-gradient(ellipse,rgba(0,229,255,0.07) 0%,transparent 70%)',
        }}
      />

      <div className="relative w-full max-w-[420px] animate-slide-up">
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
              Create account
            </h1>
            <p className="text-[#5A6478] text-sm mt-1">
              Join thousands of esports fans worldwide
            </p>
          </div>

          <div className="flex flex-col gap-5">
            {/* Username */}
            <Input
              label="Username"
              name="username"
              type="text"
              placeholder="your_tag"
              icon="https://cdn.jsdelivr.net/npm/lucide-static@0.441.0/icons/at-sign.svg"
              form={form}
              handleChange={handleChange}
              error={fieldErrors.username}
              rightElement={
                form.username.length >= 4 &&
                !fieldErrors.username && (
                  <Image
                    src="https://cdn.jsdelivr.net/npm/lucide-static@0.441.0/icons/badge-check.svg"
                    className="shrink-0"
                    height={16}
                    width={16}
                    alt="ok"
                    style={{
                      filter:
                        'invert(0.6) sepia(1) hue-rotate(100deg) saturate(5)',
                    }}
                  />
                )
              }
            />

            {/* Email */}
            <Input
              label="Email"
              name="email"
              type="email"
              placeholder="you@email.com"
              icon="https://cdn.jsdelivr.net/npm/lucide-static@0.441.0/icons/mail.svg"
              form={form}
              handleChange={handleChange}
              error={fieldErrors.email}
            />

            {/* Password */}
            <Input
              label="Password"
              name="password"
              type="password"
              placeholder="Min. 8 characters"
              icon="https://cdn.jsdelivr.net/npm/lucide-static@0.441.0/icons/lock.svg"
              form={form}
              handleChange={handleChange}
              error={fieldErrors.password}
              showPassword={showPassword}
              togglePassword={togglePassword}
            >
              {/* Password strength bar */}
              {form.password && (
                <div className="flex items-center gap-3 mt-1">
                  <div className="flex-1 h-1 rounded-full bg-[#1A2030] overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-400"
                      style={{
                        width: strength.width,
                        background: strength.color,
                      }}
                    />
                  </div>
                  <span
                    className="text-[11px] font-condensed font-600 shrink-0"
                    style={{ color: strength.color }}
                  >
                    {strength.label}
                  </span>
                </div>
              )}
            </Input>

            {/* Confirm Password */}
            <Input
              label="Confirm Password"
              name="confirmPassword"
              type="password"
              placeholder="Repeat password"
              icon="https://cdn.jsdelivr.net/npm/lucide-static@0.441.0/icons/shield-check.svg"
              form={form}
              handleChange={handleChange}
              error={fieldErrors.confirmPassword}
              showPassword={showConfirm}
              togglePassword={toggleConfirm}
            />

            {/* Server error */}
            {serverError && (
              <div className="flex items-center gap-2 px-4 py-3 bg-[rgba(255,59,92,0.08)] border border-[rgba(255,59,92,0.2)] rounded-xl">
                <AlertCircle className="w-4 h-4 text-red-500" />
                <span className="text-[#FF3B5C] text-sm">{serverError}</span>
              </div>
            )}

            {/* Submit */}
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="mt-1 h-11 rounded-xl bg-[#00E5FF] text-black font-condensed font-700 text-sm tracking-wider transition-all duration-200 hover:brightness-110 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer glow-cyan flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Image
                    src="https://cdn.jsdelivr.net/npm/lucide-static@0.441.0/icons/loader.svg"
                    height={16}
                    width={16}
                    alt="loading"
                    style={{
                      filter: 'invert(1) brightness(0)',
                      animation: 'spin 1s linear infinite',
                    }}
                  />
                  Creating account...
                </>
              ) : (
                'CREATE ACCOUNT'
              )}
            </button>

            <div className="flex items-center gap-3">
              <div className="flex-1 h-px bg-[#1A2030]" />
              <span className="text-[#3A4155] text-xs font-condensed">OR</span>
              <div className="flex-1 h-px bg-[#1A2030]" />
            </div>

            <p className="text-center text-[#5A6478] text-sm">
              Already have an account?
              <Link
                href="/login"
                className="text-[#00E5FF] hover:underline font-medium ml-2"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>

        <p className="text-center text-[#3A4155] text-xs mt-6">
          By signing up you agree to our
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
