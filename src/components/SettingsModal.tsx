import React from 'react';
import { X, RotateCcw, Volume2, VolumeX, Sparkles, BookOpen, ShieldCheck } from 'lucide-react';
import { sounds } from '../utils/audio';

interface SettingsModalProps {
  isOpen: boolean;
  soundEnabled: boolean;
  unlockedContacts: string[];
  onToggleSound: () => void;
  onResetGame: () => void;
  onClose: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  soundEnabled,
  unlockedContacts,
  onToggleSound,
  onResetGame,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-md rounded-2xl bg-neutral-900 border border-neutral-800 p-6 shadow-2xl space-y-5">
        <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-amber-400" />
            <h3 className="font-extrabold text-base text-neutral-100 tracking-wide uppercase">
              Game Controls & Settings
            </h3>
          </div>
          <button
            onClick={() => {
              sounds.playTap();
              onClose();
            }}
            className="p-1 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Audio Setting */}
        <div className="flex items-center justify-between p-3.5 rounded-xl bg-neutral-950/70 border border-neutral-800">
          <div className="flex items-center gap-3">
            {soundEnabled ? (
              <Volume2 className="w-5 h-5 text-emerald-400" />
            ) : (
              <VolumeX className="w-5 h-5 text-neutral-500" />
            )}
            <div>
              <p className="font-bold text-sm text-neutral-200">Sound Effects & Haptics</p>
              <p className="text-xs text-neutral-400">Audio cues for alerts, drama and choices</p>
            </div>
          </div>
          <button
            onClick={() => {
              sounds.playTap();
              onToggleSound();
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
              soundEnabled
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                : 'bg-neutral-800 text-neutral-400'
            }`}
          >
            {soundEnabled ? 'ENABLED' : 'MUTED'}
          </button>
        </div>

        {/* Unlocked Contacts Roster */}
        <div className="p-3.5 rounded-xl bg-neutral-950/70 border border-neutral-800">
          <div className="flex items-center gap-2 mb-2 text-xs font-bold text-amber-400 uppercase tracking-wider">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Unlocked Lagos Contacts</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {unlockedContacts.map((contact, idx) => (
              <span
                key={idx}
                className="text-xs bg-neutral-800/80 border border-neutral-700/60 text-neutral-300 px-2.5 py-1 rounded-md"
              >
                {contact}
              </span>
            ))}
          </div>
        </div>

        {/* Reset / New Life */}
        <div className="p-3.5 rounded-xl bg-rose-950/20 border border-rose-900/40 space-y-2">
          <div className="flex items-center gap-2 text-xs font-bold text-rose-400 uppercase tracking-wide">
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Start A Fresh Life</span>
          </div>
          <p className="text-xs text-neutral-400">
            Clear all current decisions, stats, and storyline progress to create a completely new character.
          </p>
          <button
            onClick={() => {
              sounds.playTap();
              if (window.confirm('Are you sure you want to start a brand new life? Current game progress will be reset.')) {
                onResetGame();
              }
            }}
            className="w-full py-2.5 px-4 rounded-xl bg-rose-600/30 hover:bg-rose-600/40 border border-rose-500/50 text-rose-200 font-bold text-xs uppercase tracking-wider transition-colors"
          >
            Reset Progress & Start New Life
          </button>
        </div>

        {/* Safe Single-Player simulation disclaimer */}
        <div className="text-[11px] text-neutral-500 text-center leading-relaxed">
          <span className="inline-flex items-center gap-1 font-semibold text-neutral-400">
            <ShieldCheck className="w-3.5 h-3.5 text-amber-500" /> Fictional Single-Player Simulation
          </span>
          <br />
          All characters, institutions and situations depicted are entirely fictional.
        </div>
      </div>
    </div>
  );
};
