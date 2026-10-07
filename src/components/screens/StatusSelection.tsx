import React from 'react';
import { Heart, Gem, ArrowLeft } from 'lucide-react';
import { RelationshipStatus } from '../../types/game';
import { sounds } from '../../utils/audio';

interface StatusSelectionProps {
  onSelectStatus: (status: RelationshipStatus) => void;
  onBack: () => void;
}

export const StatusSelection: React.FC<StatusSelectionProps> = ({ onSelectStatus, onBack }) => {
  return (
    <div className="max-w-xl mx-auto px-4 py-8 min-h-[85vh] flex flex-col justify-between animate-fade-in">
      <div className="space-y-6">
        <button
          onClick={() => {
            sounds.playTap();
            onBack();
          }}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-neutral-400 hover:text-neutral-100 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> BACK
        </button>

        <div className="space-y-2">
          <div className="text-xs font-bold uppercase tracking-widest text-amber-400">
            Step 1 of 4 • Status
          </div>
          <h2 className="text-3xl sm:text-4xl font-black uppercase text-neutral-100 tracking-tight">
            WHAT’S YOUR STATUS?
          </h2>
          <p className="text-sm sm:text-base text-neutral-400">
            Your marital framework dictates how Lagos society treats your business and your baggage.
          </p>
        </div>

        {/* The Two Large Choices */}
        <div className="grid grid-cols-1 gap-4 pt-4">
          {/* SINGLE */}
          <button
            onClick={() => {
              sounds.playTap();
              onSelectStatus('single');
            }}
            className="group relative overflow-hidden text-left p-6 rounded-2xl bg-gradient-to-r from-neutral-900 via-neutral-900 to-rose-950/30 border border-neutral-800 hover:border-rose-500/60 transition-all duration-300 shadow-xl hover:shadow-rose-500/10 active:scale-[0.98]"
          >
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-2xl bg-rose-500/15 border border-rose-500/30 flex items-center justify-center text-2xl shrink-0 group-hover:scale-110 transition-transform">
                ❤️
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h3 className="text-xl font-black uppercase tracking-wide text-neutral-100 group-hover:text-rose-400 transition-colors">
                    SINGLE
                  </h3>
                  <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30">
                    Open Season
                  </span>
                </div>
                <p className="text-sm font-medium text-neutral-300">
                  "No ring. No commitment. Plenty possibilities."
                </p>
                <p className="text-xs text-neutral-500 pt-1">
                  Full romantic autonomy. Free to flirt, ghost, take risks, and navigate Lagos nightlife without explanations.
                </p>
              </div>
            </div>
          </button>

          {/* MARRIED */}
          <button
            onClick={() => {
              sounds.playTap();
              onSelectStatus('married');
            }}
            className="group relative overflow-hidden text-left p-6 rounded-2xl bg-gradient-to-r from-neutral-900 via-neutral-900 to-amber-950/30 border border-neutral-800 hover:border-amber-500/60 transition-all duration-300 shadow-xl hover:shadow-amber-500/10 active:scale-[0.98]"
          >
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-2xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-2xl shrink-0 group-hover:scale-110 transition-transform">
                💍
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h3 className="text-xl font-black uppercase tracking-wide text-neutral-100 group-hover:text-amber-400 transition-colors">
                    MARRIED
                  </h3>
                  <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                    High Stakes
                  </span>
                </div>
                <p className="text-sm font-medium text-neutral-300">
                  "You said 'I do.' Now let’s see what happens."
                </p>
                <p className="text-xs text-neutral-500 pt-1">
                  Higher social respect, in-laws in your business, secret temptations, and tenfold the drama if secrets spill.
                </p>
              </div>
            </div>
          </button>
        </div>
      </div>

      <div className="pt-6 text-center text-xs text-neutral-500">
        Choose your starting foundation. You can restart anytime.
      </div>
    </div>
  );
};
