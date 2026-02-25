import { useAuth } from '@/hooks/useAuth';
import Link from 'next/link';

export const SuccessCard = () => {
  const { reset } = useAuth();
  return (
    <div className="min-h-screen bg-[#080A0F] flex items-center justify-center px-4 font-['Barlow',sans-serif]">
      <div className="card p-10 max-w-sm w-full text-center border-[#1E2535] animate-slide-up">
        <div className="w-14 h-14 rounded-2xl bg-[rgba(0,230,118,0.12)] border border-[rgba(0,230,118,0.25)] flex items-center justify-center mx-auto mb-5">
          <img
            src="https://cdn.jsdelivr.net/npm/lucide-static@0.441.0/icons/check.svg"
            className="w-7 h-7"
            alt="success"
            style={{
              filter:
                'invert(0.6) sepia(1) hue-rotate(100deg) saturate(5) brightness(1.2)',
            }}
          />
        </div>

        <h2 className="font-condensed font-700 text-2xl text-white mb-2">
          Account created!
        </h2>

        <p className="text-[#5A6478] text-sm mb-7">
          You&apos;re all set. Sign in to start tracking your players.
        </p>

        <Link
          onClick={reset}
          href="/login"
          className="block h-11 rounded-xl bg-[#00E5FF] text-black font-condensed font-700 text-sm tracking-wider glow-cyan flex items-center justify-center hover:brightness-110 transition-all"
        >
          GO TO SIGN IN
        </Link>
      </div>
    </div>
  );
};
