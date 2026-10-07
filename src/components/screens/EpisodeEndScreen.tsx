import React, { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';
import {
  Sparkles,
  PhoneCall,
  Flame,
  Heart,
  DollarSign,
  Share2,
  RotateCcw,
  CheckCircle,
  Award,
  ChevronRight,
  ShieldAlert
} from 'lucide-react';
import { PlayerProfile, GameStats } from '../../types/game';
import { formatNaira } from '../../utils/storage';
import { sounds } from '../../utils/audio';

interface EpisodeEndScreenProps {
  player: PlayerProfile;
  stats: GameStats;
  cashNaira: number;
  history: Array<{
    sceneId: string;
    choiceId: string;
    choiceText: string;
    consequence: string;
  }>;
  onRestartEpisode: () => void;
  onStartNewLife: () => void;
}

export const EpisodeEndScreen: React.FC<EpisodeEndScreenProps> = ({
  player,
  stats,
  cashNaira,
  history,
  onRestartEpisode,
  onStartNewLife,
}) => {
  const [callAnswered, setCallAnswered] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

  const handleAnswerCall = () => {
    sounds.playDramaticChime();
    setCallAnswered(true);

    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#f59e0b', '#f43f5e', '#10b981', '#38bdf8'],
      });
    } catch {
      // ignore
    }
  };

  const getVerdict = () => {
    if (stats.drama >= 65) {
      return {
        title: 'LAGOS DRAMA MONARCH 👑🔥',
        desc: 'You walked straight into the flames with your chest out. Nollywood directors are taking notes.',
      };
    }
    if (stats.money >= 60) {
      return {
        title: 'THE BAG SECURED 💼💰',
        desc: 'Romance came and went, but your bank alert never wavered. Practical Lagos survivor.',
      };
    }
    if (stats.love >= 60) {
      return {
        title: 'HOPELESS ROMANTIC ❤️✨',
        desc: 'Even in the heart of Lagos wahala, you believed in genuine connection.',
      };
    }
    return {
      title: 'CALCULATED MASTERMIND 😎♟️',
      desc: 'You navigated the chaos, kept your secrets close, and left everyone guessing your next move.',
    };
  };

  const verdict = getVerdict();

  const handleShareScore = async () => {
    sounds.playTap();
    const shareText = `🎭 I survived Episode 1 of "Your Life. Your Choices. Your Wahala."!\n\nCharacter: ${player.name} (${player.archetypeName})\nMy Verdict: ${verdict.title}\nStats: ❤️ Love ${stats.love}% | 💰 Money ${stats.money}% | 🔥 Wahala ${stats.drama}%\nNet Worth: ${formatNaira(cashNaira)}\n\nCan you handle Lagos dating better than me? Play now!`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: 'My Lagos Wahala Scorecard',
          text: shareText,
          url: window.location.href,
        });
        return;
      } catch {
        // fallback
      }
    }

    try {
      await navigator.clipboard.writeText(shareText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // ignore
    }
  };

  return (
    <div className="max-w-xl mx-auto px-4 py-8 min-h-[90vh] flex flex-col justify-between animate-fade-in space-y-6">
      {!callAnswered ? (
        /* The Cliffhanger Phone Call Screen */
        <div className="space-y-6 text-center my-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-950/80 border border-rose-500/40 text-rose-300 text-xs font-bold uppercase tracking-wider animate-pulse">
            <PhoneCall className="w-3.5 h-3.5" />
            <span>Incoming Call • 11:47 PM</span>
          </div>

          <div className="py-6 space-y-3">
            <h2 className="text-4xl sm:text-5xl font-black uppercase text-neutral-100 tracking-tight">
              DANIEL IS CALLING...
            </h2>
            <p className="text-base text-neutral-300 max-w-sm mx-auto font-medium leading-relaxed">
              His car headlights are shining outside your gate. He left you one final voice text:
            </p>
            <div className="p-4 rounded-2xl bg-neutral-900 border border-amber-500/30 text-amber-300 font-semibold italic text-sm max-w-md mx-auto">
              "Please. You need to know the truth about what happened."
            </div>
          </div>

          <div className="pt-4 max-w-sm mx-auto space-y-3">
            <button
              onClick={handleAnswerCall}
              className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-500 hover:from-emerald-400 hover:to-teal-400 text-neutral-950 font-black text-base uppercase tracking-wider flex items-center justify-center gap-3 shadow-xl shadow-emerald-500/30 active:scale-[0.98] transition-all"
            >
              <PhoneCall className="w-5 h-5 fill-neutral-950 animate-bounce" />
              <span>ANSWER THE CALL</span>
            </button>
            <p className="text-xs text-neutral-500">
              Unlock the truth and complete Episode 1.
            </p>
          </div>
        </div>
      ) : (
        /* The Episode Unlock & Scorecard Screen */
        <div className="space-y-6">
          <div className="text-center space-y-3">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs font-black tracking-widest uppercase shadow-lg shadow-amber-500/10">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>EPISODE 2 UNLOCKED</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-black uppercase text-neutral-100 tracking-tight">
              COME BACK FOR THE NEXT CHAPTER
            </h2>

            <p className="text-sm text-neutral-400 max-w-md mx-auto leading-relaxed">
              Episode 1 of your Lagos journey has concluded. Daniel’s secret syndicate, Zainab’s revenge plot, and your pending career move await in Episode 2.
            </p>
          </div>

          {/* Player Dossier Recap Card */}
          <div className="p-5 rounded-3xl bg-gradient-to-b from-neutral-900 to-neutral-950 border border-amber-500/40 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
              <div>
                <span className="text-[10px] uppercase font-bold text-neutral-500 tracking-wider">
                  Player Recap
                </span>
                <h3 className="text-2xl font-black uppercase text-neutral-100">
                  {player.name}
                </h3>
                <span className="text-xs font-bold text-amber-400 uppercase">
                  {player.archetypeName} • {player.status}
                </span>
              </div>
              <div className="text-right">
                <span className="text-[10px] uppercase font-bold text-neutral-500 tracking-wider">
                  Net Worth
                </span>
                <div className="text-base font-black text-emerald-400">
                  {formatNaira(cashNaira)}
                </div>
              </div>
            </div>

            {/* Verdict Box */}
            <div className="p-4 rounded-2xl bg-neutral-950/80 border border-neutral-800 space-y-1">
              <div className="text-xs font-extrabold uppercase tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-rose-400">
                {verdict.title}
              </div>
              <p className="text-xs text-neutral-300 leading-relaxed font-medium">
                {verdict.desc}
              </p>
            </div>

            {/* Final Stats Grid */}
            <div className="grid grid-cols-4 gap-2 pt-1">
              <div className="p-2.5 rounded-xl bg-neutral-950 text-center border border-neutral-800">
                <div className="text-rose-400 text-xs font-bold flex items-center justify-center gap-1 mb-1">
                  <Heart className="w-3 h-3 fill-rose-500/20" /> Love
                </div>
                <div className="text-base font-black text-white">{stats.love}%</div>
              </div>
              <div className="p-2.5 rounded-xl bg-neutral-950 text-center border border-neutral-800">
                <div className="text-emerald-400 text-xs font-bold flex items-center justify-center gap-1 mb-1">
                  <DollarSign className="w-3 h-3" /> Money
                </div>
                <div className="text-base font-black text-white">{stats.money}%</div>
              </div>
              <div className="p-2.5 rounded-xl bg-neutral-950 text-center border border-neutral-800">
                <div className="text-cyan-400 text-xs font-bold flex items-center justify-center gap-1 mb-1">
                  <Sparkles className="w-3 h-3" /> Status
                </div>
                <div className="text-base font-black text-white">{stats.status}%</div>
              </div>
              <div className="p-2.5 rounded-xl bg-neutral-950 text-center border border-neutral-800">
                <div className="text-amber-400 text-xs font-bold flex items-center justify-center gap-1 mb-1">
                  <Flame className="w-3 h-3 fill-amber-500/20" /> Wahala
                </div>
                <div className="text-base font-black text-white">{stats.drama}%</div>
              </div>
            </div>

            {/* Decisions Recap Count */}
            {history.length > 0 && (
              <div className="text-xs text-neutral-400 flex items-center justify-between pt-2 border-t border-neutral-800/80">
                <span>Total Pivotal Choices Made:</span>
                <span className="font-bold text-amber-300">{history.length} Decisions</span>
              </div>
            )}
          </div>

          {/* Share Scorecard Button */}
          <div className="space-y-3 pt-2">
            <button
              onClick={handleShareScore}
              className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-amber-500 to-rose-500 hover:from-amber-400 hover:to-rose-400 text-neutral-950 font-black text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-xl shadow-amber-500/25 active:scale-[0.98] transition-all"
            >
              <Share2 className="w-4 h-4" />
              <span>{copied ? 'SCORECARD COPIED TO CLIPBOARD!' : 'SHARE YOUR WAHALA SCORECARD'}</span>
            </button>

            <div className="grid grid-cols-2 gap-3 pt-1">
              <button
                onClick={() => {
                  sounds.playTap();
                  onRestartEpisode();
                }}
                className="py-3 px-4 rounded-xl bg-neutral-900 border border-neutral-800 hover:bg-neutral-850 text-neutral-300 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5 text-amber-400" />
                <span>RETRY EPISODE 1</span>
              </button>

              <button
                onClick={() => {
                  sounds.playTap();
                  onStartNewLife();
                }}
                className="py-3 px-4 rounded-xl bg-neutral-900 border border-neutral-800 hover:bg-neutral-850 text-neutral-300 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-colors"
              >
                <Sparkles className="w-3.5 h-3.5 text-rose-400" />
                <span>NEW CHARACTER</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
