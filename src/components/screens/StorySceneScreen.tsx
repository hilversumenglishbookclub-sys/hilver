import React, { useState, useEffect } from 'react';
import {
  MessageSquare,
  Clock,
  MapPin,
  ChevronRight,
  TrendingUp,
  TrendingDown,
  Sparkles,
  Heart,
  DollarSign,
  Flame,
  AlertCircle,
  PhoneCall,
  CheckCircle2,
  Share2
} from 'lucide-react';
import { StoryScene, Choice, StatDelta, PlayerProfile } from '../../types/game';
import { DilemmaShareCard } from '../DilemmaShareCard';
import { formatNaira } from '../../utils/storage';
import { sounds } from '../../utils/audio';

interface StorySceneScreenProps {
  scene: StoryScene;
  player: PlayerProfile;
  onMakeChoice: (choice: Choice) => void;
}

export const StorySceneScreen: React.FC<StorySceneScreenProps> = ({
  scene,
  player,
  onMakeChoice,
}) => {
  const [selectedChoice, setSelectedChoice] = useState<Choice | null>(null);
  const [showConsequence, setShowConsequence] = useState<boolean>(false);
  const [showShareModal, setShowShareModal] = useState<boolean>(false);

  // Play ambient audio when entering scene
  useEffect(() => {
    setSelectedChoice(null);
    setShowConsequence(false);
    setShowShareModal(false);

    if (scene.dialogue && scene.dialogue.length > 0) {
      sounds.playNotification();
    }
  }, [scene.id]);

  const handleSelectChoice = (choice: Choice) => {
    sounds.playTap();
    setSelectedChoice(choice);

    // Audio cue based on consequence
    if (choice.statDeltas.drama && choice.statDeltas.drama > 15) {
      sounds.playWahala();
    } else if (choice.statDeltas.cashNaira && choice.statDeltas.cashNaira > 0) {
      sounds.playAlertCredit();
    } else if (choice.statDeltas.love && choice.statDeltas.love > 0) {
      sounds.playNotification();
    }

    setShowConsequence(true);
  };

  const handleProceedAfterConsequence = () => {
    if (selectedChoice) {
      sounds.playTap();
      onMakeChoice(selectedChoice);
    }
  };

  // Render sender bubble styling
  const getSenderBadge = (role?: string) => {
    switch (role) {
      case 'mum':
        return 'bg-purple-950/80 text-purple-300 border-purple-800';
      case 'daniel':
        return 'bg-amber-950/80 text-amber-300 border-amber-800';
      case 'friend':
        return 'bg-rose-950/80 text-rose-300 border-rose-800';
      case 'boss':
        return 'bg-emerald-950/80 text-emerald-300 border-emerald-800';
      case 'tobi':
        return 'bg-cyan-950/80 text-cyan-300 border-cyan-800';
      default:
        return 'bg-neutral-800 text-neutral-300 border-neutral-700';
    }
  };

  return (
    <div className="max-w-xl mx-auto px-4 py-6 min-h-[85vh] flex flex-col justify-between animate-fade-in space-y-6">
      {/* Scene Header */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-neutral-400">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-md bg-amber-500/10 text-amber-400 border border-amber-500/20">
              {scene.day}
            </span>
            <span className="flex items-center gap-1 text-neutral-300">
              <Clock className="w-3.5 h-3.5 text-neutral-500" /> {scene.time}
            </span>
          </div>
          <div className="flex items-center gap-1 text-[11px] text-neutral-400">
            <MapPin className="w-3.5 h-3.5 text-rose-400" />
            <span className="truncate max-w-[170px]">{scene.location}</span>
          </div>
        </div>

        {scene.chapterTitle && (
          <div className="text-xs font-black uppercase tracking-widest text-emerald-400/90 pt-1">
            {scene.chapterTitle}
          </div>
        )}
      </div>

      {/* Main Narrative Card */}
      <div className="p-5 rounded-2xl bg-neutral-900/90 border border-neutral-800 shadow-xl space-y-4">
        <p className="text-base sm:text-lg leading-relaxed text-neutral-200 font-medium">
          {scene.narrativeText}
        </p>

        {/* Incoming Dialogue / Phone Messages */}
        {scene.dialogue && scene.dialogue.length > 0 && (
          <div className="pt-2 space-y-2.5">
            <div className="flex items-center gap-1.5 text-[11px] font-extrabold uppercase tracking-wider text-neutral-400 pb-1 border-b border-neutral-800">
              <MessageSquare className="w-3 h-3 text-amber-400" />
              <span>Incoming Messages ({scene.dialogue.length})</span>
            </div>

            <div className="space-y-2 pt-1">
              {scene.dialogue.map((chat, idx) => (
                <div
                  key={idx}
                  className={`p-3.5 rounded-2xl border text-left transition-all ${
                    chat.isUrgent
                      ? 'bg-gradient-to-r from-rose-950/40 to-neutral-950 border-rose-500/50 shadow-md shadow-rose-950/30'
                      : 'bg-neutral-950/80 border-neutral-800/80'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span
                      className={`text-[11px] font-black uppercase px-2 py-0.5 rounded-md border tracking-wider ${getSenderBadge(
                        chat.role
                      )}`}
                    >
                      {chat.sender}
                    </span>
                    {chat.time && (
                      <span className="text-[10px] text-neutral-500 font-mono">
                        {chat.time}
                      </span>
                    )}
                  </div>
                  <p className="text-xs sm:text-sm text-neutral-100 font-medium leading-relaxed pl-0.5">
                    "{chat.text}"
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Dilemma Share Card Trigger if current scene features a dilemma */}
      {selectedChoice?.isDilemmaShareable && (
        <div className="animate-fade-in">
          <DilemmaShareCard
            situationText={selectedChoice.dilemmaPrompt || scene.narrativeText}
            question="What would you choose in this situation?"
            options={selectedChoice.dilemmaOptions || ['❤️ LOVE', '💰 MONEY']}
          />
        </div>
      )}

      {/* Choice Buttons or Consequence Reveal */}
      {!showConsequence ? (
        <div className="space-y-3 pt-2">
          <div className="text-xs font-extrabold uppercase tracking-wider text-amber-400 flex items-center justify-between">
            <span>WHAT DO YOU DO?</span>
            <span className="text-[10px] text-neutral-500 font-normal">Choose your move</span>
          </div>

          <div className="space-y-2.5">
            {scene.choices.map((choice) => (
              <button
                key={choice.id}
                onClick={() => handleSelectChoice(choice)}
                className="w-full text-left p-4 rounded-2xl bg-neutral-900 hover:bg-neutral-850 border border-neutral-800 hover:border-amber-500/60 transition-all duration-200 group active:scale-[0.98] shadow-md flex items-center justify-between"
              >
                <div className="space-y-1 pr-3">
                  <div className="font-black text-sm uppercase tracking-wide text-neutral-100 group-hover:text-amber-300 transition-colors">
                    {choice.text}
                  </div>
                  {choice.subtext && (
                    <div className="text-xs text-neutral-400 font-medium">
                      {choice.subtext}
                    </div>
                  )}
                </div>
                <div className="w-8 h-8 rounded-full bg-neutral-800 group-hover:bg-amber-400 group-hover:text-neutral-950 text-neutral-400 flex items-center justify-center shrink-0 transition-colors">
                  <ChevronRight className="w-4 h-4 stroke-[2.5]" />
                </div>
              </button>
            ))}
          </div>
        </div>
      ) : (
        /* Consequence Modal / Card */
        <div className="animate-slide-up p-5 rounded-2xl bg-gradient-to-b from-neutral-900 to-neutral-950 border border-amber-500/40 shadow-2xl space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <h3 className="font-extrabold text-sm uppercase tracking-wider text-amber-300">
                {selectedChoice?.consequenceTitle || 'The Outcome'}
              </h3>
            </div>
            <span className="text-[11px] text-neutral-500 uppercase font-semibold">
              Choice Consequence
            </span>
          </div>

          <p className="text-sm sm:text-base text-neutral-200 leading-relaxed font-medium">
            {selectedChoice?.consequenceNarrative}
          </p>

          {/* Stat Deltas Visualizer */}
          {selectedChoice && (
            <div className="p-3 rounded-xl bg-neutral-950/80 border border-neutral-800/80 space-y-2">
              <div className="text-[11px] font-bold uppercase tracking-wider text-neutral-400">
                Stat Impact:
              </div>
              <div className="flex flex-wrap gap-2 text-xs font-bold">
                {selectedChoice.statDeltas.love !== undefined && (
                  <span
                    className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg border ${
                      selectedChoice.statDeltas.love >= 0
                        ? 'bg-rose-950/40 text-rose-300 border-rose-800/60'
                        : 'bg-neutral-900 text-neutral-400 border-neutral-800'
                    }`}
                  >
                    <Heart className="w-3.5 h-3.5 fill-rose-500/20" />
                    Love {selectedChoice.statDeltas.love > 0 ? `+${selectedChoice.statDeltas.love}` : selectedChoice.statDeltas.love}
                  </span>
                )}

                {selectedChoice.statDeltas.money !== undefined && (
                  <span
                    className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg border ${
                      selectedChoice.statDeltas.money >= 0
                        ? 'bg-emerald-950/40 text-emerald-300 border-emerald-800/60'
                        : 'bg-neutral-900 text-neutral-400 border-neutral-800'
                    }`}
                  >
                    <DollarSign className="w-3.5 h-3.5" />
                    Money {selectedChoice.statDeltas.money > 0 ? `+${selectedChoice.statDeltas.money}` : selectedChoice.statDeltas.money}
                  </span>
                )}

                {selectedChoice.statDeltas.cashNaira !== undefined && (
                  <span
                    className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg border ${
                      selectedChoice.statDeltas.cashNaira >= 0
                        ? 'bg-emerald-950/60 text-emerald-300 border-emerald-600/50'
                        : 'bg-rose-950/60 text-rose-300 border-rose-600/50'
                    }`}
                  >
                    Bank: {selectedChoice.statDeltas.cashNaira > 0 ? `+${formatNaira(selectedChoice.statDeltas.cashNaira)}` : formatNaira(selectedChoice.statDeltas.cashNaira)}
                  </span>
                )}

                {selectedChoice.statDeltas.status !== undefined && (
                  <span
                    className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg border ${
                      selectedChoice.statDeltas.status >= 0
                        ? 'bg-cyan-950/40 text-cyan-300 border-cyan-800/60'
                        : 'bg-neutral-900 text-neutral-400 border-neutral-800'
                    }`}
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    Status {selectedChoice.statDeltas.status > 0 ? `+${selectedChoice.statDeltas.status}` : selectedChoice.statDeltas.status}
                  </span>
                )}

                {selectedChoice.statDeltas.drama !== undefined && (
                  <span
                    className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg border ${
                      selectedChoice.statDeltas.drama > 0
                        ? 'bg-amber-950/50 text-amber-300 border-amber-800/70'
                        : 'bg-emerald-950/40 text-emerald-400 border-emerald-800/50'
                    }`}
                  >
                    <Flame className="w-3.5 h-3.5 fill-amber-500/20" />
                    Wahala {selectedChoice.statDeltas.drama > 0 ? `+${selectedChoice.statDeltas.drama}` : selectedChoice.statDeltas.drama}
                  </span>
                )}
              </div>
            </div>
          )}

          {/* Continue Next Scene Button */}
          <button
            onClick={handleProceedAfterConsequence}
            className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-amber-500 to-rose-500 hover:from-amber-400 hover:to-rose-400 text-neutral-950 font-black text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-xl shadow-amber-500/20 active:scale-[0.98] transition-all"
          >
            <span>CONTINUE TO NEXT MOMENT</span>
            <ChevronRight className="w-4 h-4 stroke-[3]" />
          </button>
        </div>
      )}
    </div>
  );
};
