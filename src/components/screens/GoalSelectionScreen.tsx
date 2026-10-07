import React, { useState } from 'react';
import { ArrowLeft, Check, Compass } from 'lucide-react';
import { RelationshipGoal } from '../../types/game';
import { RELATIONSHIP_GOALS } from '../../data/archetypes';
import { sounds } from '../../utils/audio';

interface GoalSelectionScreenProps {
  onSelectGoal: (goal: RelationshipGoal) => void;
  onBack: () => void;
}

export const GoalSelectionScreen: React.FC<GoalSelectionScreenProps> = ({
  onSelectGoal,
  onBack,
}) => {
  const [selectedGoal, setSelectedGoal] = useState<RelationshipGoal>('true_love');

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
            Step 3 of 4 • Objective
          </div>
          <h2 className="text-3xl sm:text-4xl font-black uppercase text-neutral-100 tracking-tight">
            WHAT ARE YOU LOOKING FOR?
          </h2>
          <p className="text-sm sm:text-base text-neutral-400">
            Your true priority in the jungle of Lagos dating. There are no wrong answers, only consequences.
          </p>
        </div>

        {/* Goals List */}
        <div className="space-y-3 pt-2">
          {RELATIONSHIP_GOALS.map((g) => {
            const isSelected = selectedGoal === g.id;

            return (
              <button
                key={g.id}
                onClick={() => {
                  sounds.playTap();
                  setSelectedGoal(g.id as RelationshipGoal);
                }}
                className={`w-full group text-left p-4 rounded-2xl border transition-all duration-200 flex items-center justify-between ${
                  isSelected
                    ? 'bg-gradient-to-r from-neutral-900 via-neutral-900 to-amber-950/40 border-amber-400 shadow-xl ring-2 ring-amber-500/20'
                    : 'bg-neutral-900/70 border-neutral-800/80 hover:border-neutral-700 hover:bg-neutral-900'
                }`}
              >
                <div className="flex items-center gap-4">
                  <span className="text-2xl p-2 rounded-xl bg-neutral-950/80 border border-neutral-800 shrink-0">
                    {g.icon}
                  </span>
                  <div>
                    <h4 className="font-black text-sm uppercase tracking-wide text-neutral-100 group-hover:text-amber-300 transition-colors">
                      {g.label}
                    </h4>
                    <p className="text-xs text-neutral-400 pt-0.5">
                      {g.description}
                    </p>
                  </div>
                </div>

                <div className="shrink-0 pl-3">
                  {isSelected ? (
                    <div className="w-6 h-6 rounded-full bg-amber-400 text-neutral-950 flex items-center justify-center">
                      <Check className="w-4 h-4 stroke-[3]" />
                    </div>
                  ) : (
                    <div className="w-5 h-5 rounded-full border border-neutral-700" />
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <div className="pt-6">
        <button
          onClick={() => {
            sounds.playTap();
            onSelectGoal(selectedGoal);
          }}
          className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-amber-500 via-rose-500 to-amber-500 hover:from-amber-400 hover:to-rose-400 text-neutral-950 font-black text-base uppercase tracking-wider flex items-center justify-center gap-2 shadow-xl shadow-amber-500/20 active:scale-[0.98] transition-all"
        >
          <span>CONFIRM GOAL & PROCEED</span>
        </button>
      </div>
    </div>
  );
};
