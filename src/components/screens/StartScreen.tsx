import React from 'react';
import { Play, Sparkles, Flame, Heart, Compass, Shield } from 'lucide-react';
import { sounds } from '../../utils/audio';
import { PlayerProfile } from '../../types/game';

interface StartScreenProps {
  existingPlayer: PlayerProfile | null;
  onStartNewLife: () => void;
  onContinueLife: () => void;
}

export const StartScreen: React.FC<StartScreenProps> = ({
  existingPlayer,
  onStartNewLife,
  onContinueLife,
}) => {
  return (
    <div className="relative min-h-[92vh] flex flex-col justify-between items-center text-center px-4 py-8 overflow-hidden">
      {/* Background Cinematic Atmosphere */}
      <div className="absolute inset-0 pointer-events-none -z-10">
        {/* Deep emerald and amber gradients */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] sm:w-[540px] h-[340px] sm:h-[540px] bg-gradient-to-tr from-amber-600/20 via-rose-600/15 to-emerald-600/20 rounded-full blur-3xl opacity-75" />
        <div className="absolute bottom-10 right-10 w-72 h-72 bg-amber-500/10 rounded-full blur-2xl" />
        {/* Subtle grid pattern overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.15),rgba(255,255,255,0))]" />
      </div>

      {/* Top Banner Tag */}
      <div className="pt-2 animate-fade-in">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-neutral-900/90 border border-amber-500/30 text-amber-400 text-xs font-bold tracking-widest uppercase shadow-lg shadow-amber-500/10">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>Interactive Lagos Drama Series • Episode 1</span>
        </div>
      </div>

      {/* Main Title & Headline */}
      <div className="my-auto max-w-xl space-y-6 py-6 animate-slide-up">
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight uppercase leading-[0.95] text-neutral-100 font-sans">
          YOUR LIFE.
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-rose-400 to-amber-200">
            YOUR CHOICES.
          </span>
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 via-amber-500 to-rose-600">
            YOUR WAHALA.
          </span>
        </h1>

        <p className="text-base sm:text-xl font-medium text-neutral-300 max-w-md mx-auto leading-relaxed">
          Everybody thinks they know how relationships work. Let’s see how you handle yours.
        </p>

        {/* Cinematic Tags */}
        <div className="flex flex-wrap justify-center items-center gap-3 pt-2 text-xs font-semibold text-neutral-400">
          <span className="flex items-center gap-1.5">
            <Heart className="w-3.5 h-3.5 text-rose-500" /> Romance
          </span>
          <span className="text-neutral-700">•</span>
          <span className="flex items-center gap-1.5">
            <Flame className="w-3.5 h-3.5 text-amber-500" /> Drama
          </span>
          <span className="text-neutral-700">•</span>
          <span className="flex items-center gap-1.5">
            <Compass className="w-3.5 h-3.5 text-emerald-400" /> Career & Money
          </span>
          <span className="text-neutral-700">•</span>
          <span className="text-neutral-400">Lagos High Life</span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="w-full max-w-sm space-y-3.5 pb-4">
        {existingPlayer && (
          <button
            onClick={() => {
              sounds.playTap();
              onContinueLife();
            }}
            className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-neutral-950 font-black text-base uppercase tracking-wider flex items-center justify-center gap-3 shadow-xl shadow-emerald-500/25 transition-all transform active:scale-[0.98]"
          >
            <Play className="w-5 h-5 fill-neutral-950" />
            <span>CONTINUE: {existingPlayer.name.toUpperCase()} ({existingPlayer.archetypeName})</span>
          </button>
        )}

        <button
          onClick={() => {
            sounds.playTap();
            onStartNewLife();
          }}
          className={`w-full py-4 px-6 rounded-2xl font-black text-base uppercase tracking-wider flex items-center justify-center gap-3 shadow-xl transition-all transform active:scale-[0.98] ${
            existingPlayer
              ? 'bg-neutral-900 border border-neutral-700 text-neutral-200 hover:bg-neutral-800'
              : 'bg-gradient-to-r from-amber-500 via-rose-500 to-amber-500 hover:from-amber-400 hover:via-rose-400 hover:to-amber-400 text-neutral-950 shadow-amber-500/25'
          }`}
        >
          <Play className="w-5 h-5 fill-current" />
          <span>{existingPlayer ? 'START A NEW LIFE' : 'START MY LIFE'}</span>
        </button>

        <p className="text-[11px] text-neutral-500 flex items-center justify-center gap-1.5 pt-1">
          <Shield className="w-3 h-3 text-neutral-500" /> Single-player interactive simulation • Autosaved locally
        </p>
      </div>
    </div>
  );
};
