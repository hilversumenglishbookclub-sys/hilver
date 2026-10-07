import React from 'react';
import { Volume2, VolumeX, RotateCcw, Heart, DollarSign, Sparkles, Flame, ShieldAlert } from 'lucide-react';
import { GameStats, PlayerProfile } from '../types/game';
import { formatNaira } from '../utils/storage';

interface NavbarProps {
  stats?: GameStats;
  player?: PlayerProfile | null;
  day?: string;
  time?: string;
  soundEnabled: boolean;
  onToggleSound: () => void;
  onOpenSettings: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  stats,
  player,
  day,
  time,
  soundEnabled,
  onToggleSound,
  onOpenSettings,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full bg-neutral-950/85 backdrop-blur-md border-b border-neutral-800/80 px-4 py-2.5 transition-all">
      <div className="max-w-2xl mx-auto flex items-center justify-between gap-3">
        {/* Brand & Chapter Info */}
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-amber-500 via-rose-500 to-emerald-500 p-0.5 flex items-center justify-center shadow-lg shadow-amber-500/10">
            <div className="w-full h-full bg-neutral-950 rounded-[7px] flex items-center justify-center font-bold text-xs tracking-tighter text-amber-400">
              WA
            </div>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-xs tracking-wider uppercase text-neutral-200 font-sans">
                {player ? player.name : 'WAHALA SIM'}
              </span>
              {player && (
                <span className="text-[10px] text-amber-400/90 font-medium">
                  • {player.archetypeName}
                </span>
              )}
            </div>
            {day && (
              <div className="text-[11px] text-neutral-400 flex items-center gap-1.5">
                <span className="font-semibold text-emerald-400">{day}</span>
                {time && <span className="text-neutral-500">| {time}</span>}
              </div>
            )}
          </div>
        </div>

        {/* Live Mini Stats Bar (if in gameplay) */}
        {stats && (
          <div className="hidden sm:flex items-center gap-3 bg-neutral-900/90 border border-neutral-800 rounded-full px-3 py-1 text-xs">
            <div className="flex items-center gap-1 text-rose-400" title="Love">
              <Heart className="w-3.5 h-3.5 fill-rose-500/20" />
              <span className="font-bold">{stats.love}%</span>
            </div>
            <div className="flex items-center gap-1 text-emerald-400" title="Money">
              <DollarSign className="w-3.5 h-3.5" />
              <span className="font-bold">{stats.money}%</span>
            </div>
            <div className="flex items-center gap-1 text-cyan-400" title="Status">
              <Sparkles className="w-3.5 h-3.5" />
              <span className="font-bold">{stats.status}%</span>
            </div>
            <div className="flex items-center gap-1 text-amber-400" title="Wahala Level">
              <Flame className="w-3.5 h-3.5 fill-amber-500/20 text-amber-400" />
              <span className="font-bold">{stats.drama}%</span>
            </div>
          </div>
        )}

        {/* Action Controls */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={onToggleSound}
            aria-label={soundEnabled ? 'Mute Audio' : 'Enable Audio'}
            className="p-2 rounded-lg text-neutral-400 hover:text-neutral-100 hover:bg-neutral-900 transition-colors"
          >
            {soundEnabled ? <Volume2 className="w-4 h-4 text-emerald-400" /> : <VolumeX className="w-4 h-4 text-neutral-500" />}
          </button>
          <button
            onClick={onOpenSettings}
            aria-label="Game Settings & Reset"
            className="p-2 rounded-lg text-neutral-400 hover:text-neutral-100 hover:bg-neutral-900 transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Mobile Stats Bar on small viewports */}
      {stats && (
        <div className="sm:hidden grid grid-cols-4 gap-2 pt-2 pb-0.5 border-t border-neutral-800/50 mt-2 max-w-2xl mx-auto">
          <div className="flex items-center justify-center gap-1 text-[11px] text-rose-400 font-semibold bg-rose-950/20 py-0.5 rounded border border-rose-900/30">
            <Heart className="w-3 h-3 fill-rose-500/20" /> {stats.love}%
          </div>
          <div className="flex items-center justify-center gap-1 text-[11px] text-emerald-400 font-semibold bg-emerald-950/20 py-0.5 rounded border border-emerald-900/30">
            <DollarSign className="w-3 h-3" /> {stats.money}%
          </div>
          <div className="flex items-center justify-center gap-1 text-[11px] text-cyan-400 font-semibold bg-cyan-950/20 py-0.5 rounded border border-cyan-900/30">
            <Sparkles className="w-3 h-3" /> {stats.status}%
          </div>
          <div className="flex items-center justify-center gap-1 text-[11px] text-amber-400 font-semibold bg-amber-950/20 py-0.5 rounded border border-amber-900/30">
            <Flame className="w-3 h-3 text-amber-400 fill-amber-500/20" /> {stats.drama}%
          </div>
        </div>
      )}
    </header>
  );
};
