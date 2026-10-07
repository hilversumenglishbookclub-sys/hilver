import React, { useState } from 'react';
import { Share2, Check, Copy, Sparkles, Flame, Users } from 'lucide-react';
import { sounds } from '../utils/audio';

interface DilemmaShareCardProps {
  situationText: string;
  question: string;
  options: [string, string];
  onClose?: () => void;
}

export const DilemmaShareCard: React.FC<DilemmaShareCardProps> = ({
  situationText,
  question,
  options,
  onClose,
}) => {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [copied, setCopied] = useState(false);
  const [pollVotes, setPollVotes] = useState({ opt1: 64, opt2: 36 });

  const handleVote = (idx: number) => {
    sounds.playTap();
    setSelectedOption(idx);
    // slight realistic variation
    if (idx === 0) {
      setPollVotes({ opt1: 68, opt2: 32 });
    } else {
      setPollVotes({ opt1: 59, opt2: 41 });
    }
  };

  const handleShare = async () => {
    sounds.playTap();
    const shareUrl = typeof window !== 'undefined' ? window.location.href : 'https://your-wahala-sim.vercel.app';
    const shareText = `🇳🇬 NIGERIAN DILEMMA:\n"${situationText}"\n\n${question}\n\nWhat would you do? Play "Your Life. Your Choices. Your Wahala." now: ${shareUrl}`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Your Wahala Dilemma: What would you do?',
          text: shareText,
          url: shareUrl,
        });
        return;
      } catch (err) {
        // Fallback to clipboard if share was canceled or failed
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
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-b from-neutral-900 via-neutral-900 to-neutral-950 border border-amber-500/40 p-5 shadow-2xl">
      {/* Decorative top badge */}
      <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
        <div className="flex items-center gap-1.5 text-xs font-bold text-amber-400 tracking-wider uppercase">
          <Flame className="w-4 h-4 text-amber-400 fill-amber-500/30" />
          <span>Lagos Moral Dilemma</span>
        </div>
        <div className="text-[11px] text-neutral-400 flex items-center gap-1 font-medium">
          <Users className="w-3.5 h-3.5 text-emerald-400" />
          <span>12.4k Nigerians answered</span>
        </div>
      </div>

      {/* Main Situation Body */}
      <div className="py-4 space-y-3">
        <div className="text-[11px] font-semibold tracking-wider uppercase text-neutral-400">
          YOUR CURRENT SITUATION:
        </div>
        <div className="text-sm sm:text-base font-medium text-neutral-200 leading-relaxed bg-neutral-950/70 p-3.5 rounded-xl border border-neutral-800">
          {situationText}
        </div>
        <div className="text-base sm:text-lg font-black tracking-tight text-amber-300 pt-1">
          {question}
        </div>
      </div>

      {/* Interactive Dilemma Choices */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1 pb-3">
        {options.map((opt, idx) => {
          const isSelected = selectedOption === idx;
          const votePercentage = idx === 0 ? pollVotes.opt1 : pollVotes.opt2;

          return (
            <button
              key={idx}
              onClick={() => handleVote(idx)}
              className={`relative overflow-hidden p-3.5 rounded-xl border text-left font-bold text-sm transition-all duration-200 flex flex-col justify-between min-h-[70px] ${
                isSelected
                  ? 'border-amber-400 bg-amber-500/15 text-white ring-2 ring-amber-500/30'
                  : 'border-neutral-800 bg-neutral-950/80 hover:bg-neutral-800/60 text-neutral-200'
              }`}
            >
              <div className="flex items-center justify-between w-full">
                <span className="tracking-wide">{opt}</span>
                {isSelected && <Check className="w-4 h-4 text-amber-400 ml-2 shrink-0" />}
              </div>

              {selectedOption !== null && (
                <div className="mt-2 w-full">
                  <div className="flex items-center justify-between text-xs text-neutral-400 mb-1">
                    <span>Community vote</span>
                    <span className="font-bold text-amber-300">{votePercentage}%</span>
                  </div>
                  <div className="w-full bg-neutral-800 h-1.5 rounded-full overflow-hidden">
                    <div
                      className="bg-amber-400 h-1.5 rounded-full transition-all duration-700"
                      style={{ width: `${votePercentage}%` }}
                    />
                  </div>
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Share CTA */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-neutral-800/80">
        <p className="text-xs text-neutral-400 text-center sm:text-left">
          Challenge your friends to see what they would do.
        </p>
        <button
          onClick={handleShare}
          className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-rose-500 text-neutral-950 font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 hover:scale-[1.02] active:scale-[0.98] transition-transform"
        >
          {copied ? (
            <>
              <Check className="w-4 h-4" /> Link Copied!
            </>
          ) : (
            <>
              <Share2 className="w-4 h-4" /> SHARE THIS DILEMMA
            </>
          )}
        </button>
      </div>
    </div>
  );
};
