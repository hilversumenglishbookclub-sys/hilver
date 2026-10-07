import React, { useState } from 'react';
import { ArrowLeft, Sparkles, MapPin, Heart, DollarSign, Flame, Shuffle, User, ShieldCheck } from 'lucide-react';
import { PlayerProfile, Gender, ArchetypeId, RelationshipStatus, RelationshipGoal } from '../../types/game';
import { ARCHETYPES, RELATIONSHIP_GOALS } from '../../data/archetypes';
import { FEMALE_NAMES, MALE_NAMES, NIGERIAN_LOCATIONS } from '../../data/names';
import { formatNaira } from '../../utils/storage';
import { sounds } from '../../utils/audio';

interface PlayerProfileScreenProps {
  gender: Gender;
  archetypeId: ArchetypeId;
  status: RelationshipStatus;
  goal: RelationshipGoal;
  onConfirmProfile: (profile: PlayerProfile) => void;
  onBack: () => void;
}

export const PlayerProfileScreen: React.FC<PlayerProfileScreenProps> = ({
  gender,
  archetypeId,
  status,
  goal,
  onConfirmProfile,
  onBack,
}) => {
  const archetype = ARCHETYPES[archetypeId];
  const nameList = gender === 'woman' ? FEMALE_NAMES : MALE_NAMES;

  const [name, setName] = useState<string>(nameList[0]);
  const [isCustomName, setIsCustomName] = useState<boolean>(false);
  const [customInput, setCustomInput] = useState<string>('');
  const [location, setLocation] = useState<string>(NIGERIAN_LOCATIONS[0]);

  const handleRandomizeName = () => {
    sounds.playTap();
    const random = nameList[Math.floor(Math.random() * nameList.length)];
    setName(random);
    setIsCustomName(false);
  };

  const handleNameSelect = (n: string) => {
    sounds.playTap();
    setName(n);
    setIsCustomName(false);
  };

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (customInput.trim()) {
      setName(customInput.trim());
      setIsCustomName(false);
    }
  };

  const handleStartGame = () => {
    sounds.playDramaticChime();
    const finalProfile: PlayerProfile = {
      name: name || (gender === 'woman' ? 'Amaka' : 'Tobi'),
      gender,
      status,
      archetypeId,
      archetypeName: archetype.title,
      archetypeTagline: archetype.tagline,
      goal,
      age: archetype.defaultAge,
      location,
      stats: { ...archetype.initialStats },
      cashNaira: archetype.initialCash,
      avatarSeed: `${name}-${gender}-${archetypeId}`,
    };
    onConfirmProfile(finalProfile);
  };

  const goalObj = RELATIONSHIP_GOALS.find((g) => g.id === goal);

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
            Final Step • Character Dossier
          </div>
          <h2 className="text-3xl sm:text-4xl font-black uppercase text-neutral-100 tracking-tight">
            YOUR PLAYER PROFILE
          </h2>
          <p className="text-sm text-neutral-400">
            Confirm your Nigerian identity. Pick your name and get ready to face Day 1 in Lagos.
          </p>
        </div>

        {/* Name Selector */}
        <div className="p-4 rounded-2xl bg-neutral-900/90 border border-neutral-800 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-neutral-300 flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-amber-400" /> Choose Name
            </span>
            <button
              onClick={handleRandomizeName}
              className="text-xs text-amber-400 hover:text-amber-300 font-semibold flex items-center gap-1"
            >
              <Shuffle className="w-3 h-3" /> Randomize
            </button>
          </div>

          <div className="flex flex-wrap gap-2">
            {nameList.slice(0, 8).map((n) => (
              <button
                key={n}
                onClick={() => handleNameSelect(n)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  name === n && !isCustomName
                    ? 'bg-amber-400 text-neutral-950 shadow-md shadow-amber-400/20'
                    : 'bg-neutral-950/80 text-neutral-300 border border-neutral-800 hover:border-neutral-700'
                }`}
              >
                {n}
              </button>
            ))}
          </div>

          {/* Custom Name Accordion / Input */}
          <div className="pt-1">
            {isCustomName ? (
              <form onSubmit={handleCustomSubmit} className="flex gap-2">
                <input
                  type="text"
                  maxLength={20}
                  value={customInput}
                  onChange={(e) => setCustomInput(e.target.value)}
                  placeholder="Enter custom Nigerian name..."
                  className="flex-1 bg-neutral-950 border border-amber-500/50 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:ring-1 focus:ring-amber-400"
                  autoFocus
                />
                <button
                  type="submit"
                  className="px-3 py-2 bg-amber-400 text-neutral-950 font-bold text-xs rounded-xl"
                >
                  SET
                </button>
              </form>
            ) : (
              <button
                onClick={() => setIsCustomName(true)}
                className="text-[11px] text-neutral-400 hover:text-amber-400 underline decoration-neutral-700"
              >
                Or enter a custom name
              </button>
            )}
          </div>
        </div>

        {/* Fictional VIP Profile Card */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-neutral-900 via-neutral-900 to-amber-950/40 border border-amber-500/30 p-6 shadow-2xl space-y-5">
          {/* Decorative Corner Watermark */}
          <div className="absolute top-0 right-0 -mt-4 -mr-4 w-28 h-28 bg-amber-500/10 rounded-full blur-xl pointer-events-none" />

          {/* Header */}
          <div className="flex items-start justify-between border-b border-neutral-800/80 pb-4">
            <div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5 mb-1">
                <span>LAGOS CITIZEN DOSSIER</span>
                <span className="text-neutral-500">•</span>
                <span className="text-neutral-400">{status.toUpperCase()}</span>
              </div>
              <h3 className="text-3xl font-black uppercase tracking-tight text-white">
                {name}
              </h3>
              <p className="text-xs font-extrabold uppercase tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-rose-400 pt-0.5">
                {archetype.title}
              </p>
            </div>
            <div className="w-14 h-14 rounded-2xl bg-neutral-950/90 border border-amber-500/40 flex items-center justify-center text-3xl shadow-inner">
              {archetype.badge}
            </div>
          </div>

          {/* Details Row */}
          <div className="grid grid-cols-2 gap-3 text-xs bg-neutral-950/60 p-3.5 rounded-2xl border border-neutral-800/70">
            <div>
              <span className="text-neutral-500 block text-[10px] uppercase font-semibold">Location</span>
              <span className="font-bold text-neutral-200 flex items-center gap-1 mt-0.5">
                <MapPin className="w-3 h-3 text-rose-400 shrink-0" />
                {location}
              </span>
            </div>
            <div>
              <span className="text-neutral-500 block text-[10px] uppercase font-semibold">Goal</span>
              <span className="font-bold text-neutral-200 flex items-center gap-1 mt-0.5">
                {goalObj?.icon} {goalObj?.label}
              </span>
            </div>
            <div>
              <span className="text-neutral-500 block text-[10px] uppercase font-semibold">Age</span>
              <span className="font-bold text-neutral-200 mt-0.5 block">{archetype.defaultAge} Years</span>
            </div>
            <div>
              <span className="text-neutral-500 block text-[10px] uppercase font-semibold">Bank Balance</span>
              <span className="font-bold text-emerald-400 mt-0.5 block">{formatNaira(archetype.initialCash)}</span>
            </div>
          </div>

          {/* Stats Bar Breakdown */}
          <div className="space-y-2.5 pt-1">
            <div className="text-[11px] font-bold uppercase tracking-wider text-neutral-400">
              Initial Character Attributes:
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="bg-neutral-950/80 p-2 rounded-xl border border-neutral-800/80 flex items-center justify-between">
                <span className="flex items-center gap-1.5 font-bold text-rose-400">
                  <Heart className="w-3.5 h-3.5 fill-rose-500/20" /> Love
                </span>
                <span className="font-black text-white">{archetype.initialStats.love}%</span>
              </div>
              <div className="bg-neutral-950/80 p-2 rounded-xl border border-neutral-800/80 flex items-center justify-between">
                <span className="flex items-center gap-1.5 font-bold text-emerald-400">
                  <DollarSign className="w-3.5 h-3.5" /> Money
                </span>
                <span className="font-black text-white">{archetype.initialStats.money}%</span>
              </div>
              <div className="bg-neutral-950/80 p-2 rounded-xl border border-neutral-800/80 flex items-center justify-between">
                <span className="flex items-center gap-1.5 font-bold text-cyan-400">
                  <Sparkles className="w-3.5 h-3.5" /> Status
                </span>
                <span className="font-black text-white">{archetype.initialStats.status}%</span>
              </div>
              <div className="bg-neutral-950/80 p-2 rounded-xl border border-neutral-800/80 flex items-center justify-between">
                <span className="flex items-center gap-1.5 font-bold text-amber-400">
                  <Flame className="w-3.5 h-3.5 fill-amber-500/20" /> Drama
                </span>
                <span className="font-black text-white">{archetype.initialStats.drama}%</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enter My Life Button */}
      <div className="pt-6">
        <button
          onClick={handleStartGame}
          className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-amber-500 via-rose-500 to-amber-500 hover:from-amber-400 hover:to-rose-400 text-neutral-950 font-black text-base uppercase tracking-wider flex items-center justify-center gap-2 shadow-xl shadow-amber-500/25 active:scale-[0.98] transition-all"
        >
          <span>ENTER MY LIFE</span>
        </button>
      </div>
    </div>
  );
};
