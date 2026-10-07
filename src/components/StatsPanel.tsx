import React from 'react';
import { Heart, DollarSign, Sparkles, Flame, Shield, Wallet } from 'lucide-react';
import { GameStats } from '../types/game';
import { formatNaira } from '../utils/storage';

interface StatsPanelProps {
  stats: GameStats;
  cashNaira: number;
  className?: string;
}

export const StatsPanel: React.FC<StatsPanelProps> = ({ stats, cashNaira, className = '' }) => {
  const getWahalaLevel = (val: number) => {
    if (val < 20) return { text: 'Low Calm', color: 'text-emerald-400', bg: 'bg-emerald-500' };
    if (val < 50) return { text: 'Simmering', color: 'text-yellow-400', bg: 'bg-yellow-500' };
    if (val < 75) return { text: 'Dangerous', color: 'text-orange-400', bg: 'bg-orange-500' };
    return { text: 'Pure Wahala 🔥', color: 'text-rose-400 font-extrabold', bg: 'bg-rose-500 animate-pulse' };
  };

  const wahala = getWahalaLevel(stats.drama);

  return (
    <div className={`bg-neutral-900/80 border border-neutral-800 rounded-2xl p-4 shadow-xl ${className}`}>
      <div className="flex items-center justify-between pb-3 border-b border-neutral-800 mb-3">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-neutral-400">
          <Shield className="w-3.5 h-3.5 text-amber-400" />
          <span>Live Character Metrics</span>
        </div>
        <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-400 bg-emerald-950/40 border border-emerald-800/40 px-2.5 py-1 rounded-full">
          <Wallet className="w-3.5 h-3.5" />
          <span>{formatNaira(cashNaira)}</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 text-xs">
        {/* Love */}
        <div className="bg-neutral-950/60 p-2.5 rounded-xl border border-neutral-800/60">
          <div className="flex items-center justify-between mb-1.5">
            <span className="flex items-center gap-1 font-semibold text-rose-300">
              <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500/20" /> Love
            </span>
            <span className="font-bold text-neutral-100">{stats.love}%</span>
          </div>
          <div className="w-full bg-neutral-800 rounded-full h-1.5 overflow-hidden">
            <div
              className="bg-rose-500 h-1.5 rounded-full transition-all duration-500"
              style={{ width: `${Math.min(100, Math.max(0, stats.love))}%` }}
            />
          </div>
        </div>

        {/* Money */}
        <div className="bg-neutral-950/60 p-2.5 rounded-xl border border-neutral-800/60">
          <div className="flex items-center justify-between mb-1.5">
            <span className="flex items-center gap-1 font-semibold text-emerald-300">
              <DollarSign className="w-3.5 h-3.5 text-emerald-500" /> Money & Bag
            </span>
            <span className="font-bold text-neutral-100">{stats.money}%</span>
          </div>
          <div className="w-full bg-neutral-800 rounded-full h-1.5 overflow-hidden">
            <div
              className="bg-emerald-500 h-1.5 rounded-full transition-all duration-500"
              style={{ width: `${Math.min(100, Math.max(0, stats.money))}%` }}
            />
          </div>
        </div>

        {/* Status */}
        <div className="bg-neutral-950/60 p-2.5 rounded-xl border border-neutral-800/60">
          <div className="flex items-center justify-between mb-1.5">
            <span className="flex items-center gap-1 font-semibold text-cyan-300">
              <Sparkles className="w-3.5 h-3.5 text-cyan-500" /> Lagos Status
            </span>
            <span className="font-bold text-neutral-100">{stats.status}%</span>
          </div>
          <div className="w-full bg-neutral-800 rounded-full h-1.5 overflow-hidden">
            <div
              className="bg-cyan-500 h-1.5 rounded-full transition-all duration-500"
              style={{ width: `${Math.min(100, Math.max(0, stats.status))}%` }}
            />
          </div>
        </div>

        {/* Drama / Wahala */}
        <div className="bg-neutral-950/60 p-2.5 rounded-xl border border-neutral-800/60">
          <div className="flex items-center justify-between mb-1.5">
            <span className="flex items-center gap-1 font-semibold text-amber-300">
              <Flame className="w-3.5 h-3.5 text-amber-500 fill-amber-500/20" /> Wahala
            </span>
            <span className={`font-bold text-[11px] ${wahala.color}`}>{wahala.text}</span>
          </div>
          <div className="w-full bg-neutral-800 rounded-full h-1.5 overflow-hidden">
            <div
              className={`${wahala.bg} h-1.5 rounded-full transition-all duration-500`}
              style={{ width: `${Math.min(100, Math.max(0, stats.drama))}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
