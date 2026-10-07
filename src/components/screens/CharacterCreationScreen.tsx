import React, { useState } from 'react';
import { ArrowLeft, Check, Sparkles, Heart, DollarSign, Flame, Award } from 'lucide-react';
import { Gender, ArchetypeId } from '../../types/game';
import { ARCHETYPES } from '../../data/archetypes';
import { sounds } from '../../utils/audio';

interface CharacterCreationProps {
  onSelectArchetype: (gender: Gender, archetypeId: ArchetypeId) => void;
  onBack: () => void;
}

export const CharacterCreationScreen: React.FC<CharacterCreationProps> = ({
  onSelectArchetype,
  onBack,
}) => {
  const [selectedGender, setSelectedGender] = useState<Gender>('woman');
  const [selectedArchetypeId, setSelectedArchetypeId] = useState<ArchetypeId>('baddie');

  const filteredArchetypes = Object.values(ARCHETYPES).filter(
    (a) => a.gender === selectedGender
  );

  const handleGenderChange = (gender: Gender) => {
    sounds.playTap();
    setSelectedGender(gender);
    const firstMatch = Object.values(ARCHETYPES).find((a) => a.gender === gender);
    if (firstMatch) {
      setSelectedArchetypeId(firstMatch.id);
    }
  };

  const currentArchetype = ARCHETYPES[selectedArchetypeId];

  return (
    <div className="max-w-2xl mx-auto px-4 py-8 min-h-[85vh] flex flex-col justify-between animate-fade-in">
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
            Step 2 of 4 • Identity
          </div>
          <h2 className="text-3xl sm:text-4xl font-black uppercase text-neutral-100 tracking-tight">
            WHO ARE YOU?
          </h2>
          <p className="text-sm sm:text-base text-neutral-400">
            Select your adult persona. Your archetype determines your initial stats, social leverage, and default instincts.
          </p>
        </div>

        {/* Gender Toggle: Large Buttons */}
        <div className="grid grid-cols-2 gap-3 pt-1">
          <button
            onClick={() => handleGenderChange('woman')}
            className={`p-4 rounded-2xl border text-center font-black text-sm uppercase tracking-wider flex items-center justify-center gap-2 transition-all ${
              selectedGender === 'woman'
                ? 'bg-gradient-to-r from-rose-950/80 to-purple-950/80 border-rose-500 text-rose-300 ring-2 ring-rose-500/30 shadow-lg shadow-rose-950/40'
                : 'bg-neutral-900 border-neutral-800 text-neutral-400 hover:text-neutral-200'
            }`}
          >
            <span className="text-xl">👩</span>
            <span>WOMAN</span>
          </button>

          <button
            onClick={() => handleGenderChange('man')}
            className={`p-4 rounded-2xl border text-center font-black text-sm uppercase tracking-wider flex items-center justify-center gap-2 transition-all ${
              selectedGender === 'man'
                ? 'bg-gradient-to-r from-emerald-950/80 to-cyan-950/80 border-emerald-500 text-emerald-300 ring-2 ring-emerald-500/30 shadow-lg shadow-emerald-950/40'
                : 'bg-neutral-900 border-neutral-800 text-neutral-400 hover:text-neutral-200'
            }`}
          >
            <span className="text-xl">👨</span>
            <span>MAN</span>
          </button>
        </div>

        {/* Archetype Cards Grid */}
        <div className="space-y-3 pt-2">
          <div className="text-xs font-bold uppercase tracking-wider text-neutral-400">
            Choose Archetype:
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {filteredArchetypes.map((archetype) => {
              const isSelected = selectedArchetypeId === archetype.id;

              return (
                <button
                  key={archetype.id}
                  onClick={() => {
                    sounds.playTap();
                    setSelectedArchetypeId(archetype.id);
                  }}
                  className={`group relative text-left p-4 rounded-2xl border transition-all duration-200 flex flex-col justify-between ${
                    isSelected
                      ? 'bg-gradient-to-br from-neutral-900 via-neutral-900 to-amber-950/40 border-amber-400 shadow-xl ring-2 ring-amber-500/20'
                      : 'bg-neutral-900/70 border-neutral-800/80 hover:border-neutral-700 hover:bg-neutral-900'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-2xl">{archetype.badge}</span>
                      {isSelected ? (
                        <div className="w-5 h-5 rounded-full bg-amber-400 text-neutral-950 flex items-center justify-center">
                          <Check className="w-3.5 h-3.5 stroke-[3]" />
                        </div>
                      ) : (
                        <span className="text-[10px] text-neutral-500 uppercase font-semibold">Select</span>
                      )}
                    </div>

                    <h4 className="font-black text-base uppercase tracking-tight text-neutral-100 group-hover:text-amber-300 transition-colors">
                      {archetype.title}
                    </h4>
                    <p className="text-xs font-semibold text-amber-400/90 pt-0.5">
                      {archetype.tagline}
                    </p>
                    <p className="text-xs text-neutral-400 pt-2 line-clamp-2 leading-relaxed">
                      {archetype.description}
                    </p>
                  </div>

                  {/* Initial Stats Preview */}
                  <div className="mt-3 pt-2.5 border-t border-neutral-800/60 flex items-center justify-between text-[11px] text-neutral-400 font-bold">
                    <span className="flex items-center gap-1 text-rose-400">
                      <Heart className="w-3 h-3" /> {archetype.initialStats.love}
                    </span>
                    <span className="flex items-center gap-1 text-emerald-400">
                      <DollarSign className="w-3 h-3" /> {archetype.initialStats.money}
                    </span>
                    <span className="flex items-center gap-1 text-cyan-400">
                      <Sparkles className="w-3 h-3" /> {archetype.initialStats.status}
                    </span>
                    <span className="flex items-center gap-1 text-amber-400">
                      <Flame className="w-3 h-3" /> {archetype.initialStats.drama}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected Quote Banner */}
        {currentArchetype && (
          <div className="p-4 rounded-xl bg-neutral-950/80 border border-neutral-800 italic text-xs text-amber-300/90 text-center font-medium">
            {currentArchetype.quote}
          </div>
        )}
      </div>

        {/* Continue Button */}
        <div className="pt-6">
          <button
            onClick={() => {
              sounds.playTap();
              onSelectArchetype(selectedGender, selectedArchetypeId);
            }}
            className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-amber-500 via-rose-500 to-amber-500 hover:from-amber-400 hover:to-rose-400 text-neutral-950 font-black text-base uppercase tracking-wider flex items-center justify-center gap-2 shadow-xl shadow-amber-500/20 active:scale-[0.98] transition-all"
          >
            <span>CONTINUE WITH {currentArchetype.title}</span>
          </button>
        </div>
    </div>
  );
};
