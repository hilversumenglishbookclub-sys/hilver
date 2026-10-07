/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import {
  GameScreen,
  Gender,
  ArchetypeId,
  RelationshipStatus,
  RelationshipGoal,
  PlayerProfile,
  Choice,
  SavedGameState,
} from './types/game';
import { STORY_SCENES } from './data/scenarios';
import { loadGame, saveGame, clearGameSave } from './utils/storage';
import { sounds } from './utils/audio';

import { Navbar } from './components/Navbar';
import { SettingsModal } from './components/SettingsModal';
import { StartScreen } from './components/screens/StartScreen';
import { StatusSelection } from './components/screens/StatusSelection';
import { CharacterCreationScreen } from './components/screens/CharacterCreationScreen';
import { GoalSelectionScreen } from './components/screens/GoalSelectionScreen';
import { PlayerProfileScreen } from './components/screens/PlayerProfileScreen';
import { StorySceneScreen } from './components/screens/StorySceneScreen';
import { EpisodeEndScreen } from './components/screens/EpisodeEndScreen';

export default function App() {
  // Load initial game state from localStorage
  const [gameState, setGameState] = useState<SavedGameState>(() => loadGame());
  const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);

  // Temporary staging state for character creation
  const [tempGender, setTempGender] = useState<Gender>('woman');
  const [tempArchetypeId, setTempArchetypeId] = useState<ArchetypeId>('baddie');
  const [tempStatus, setTempStatus] = useState<RelationshipStatus>('single');
  const [tempGoal, setTempGoal] = useState<RelationshipGoal>('true_love');

  // Autosave game state whenever relevant fields change
  useEffect(() => {
    saveGame(gameState);
  }, [gameState]);

  // Sync sound settings with audio engine
  useEffect(() => {
    sounds.setEnabled(gameState.soundEnabled);
  }, [gameState.soundEnabled]);

  const handleToggleSound = () => {
    const nextVal = !gameState.soundEnabled;
    sounds.setEnabled(nextVal);
    setGameState((prev) => ({
      ...prev,
      soundEnabled: nextVal,
    }));
  };

  const handleStartNewLife = () => {
    sounds.playTap();
    setGameState((prev) => ({
      ...prev,
      screen: 'status',
      currentSceneId: 'scene_day1_morning',
      visitedSceneIds: [],
      storyFlags: {},
      history: [],
    }));
  };

  const handleContinueLife = () => {
    sounds.playTap();
    if (gameState.player) {
      setGameState((prev) => ({
        ...prev,
        screen: prev.currentSceneId === 'scene_episode_end' ? 'episode_end' : 'story',
      }));
    }
  };

  // Screen 2 -> Screen 3
  const handleSelectStatus = (status: RelationshipStatus) => {
    setTempStatus(status);
    setGameState((prev) => ({ ...prev, screen: 'gender' }));
  };

  // Screen 3 -> Screen 4
  const handleSelectArchetype = (gender: Gender, archetypeId: ArchetypeId) => {
    setTempGender(gender);
    setTempArchetypeId(archetypeId);
    setGameState((prev) => ({ ...prev, screen: 'goal' }));
  };

  // Screen 4 -> Screen 5
  const handleSelectGoal = (goal: RelationshipGoal) => {
    setTempGoal(goal);
    setGameState((prev) => ({ ...prev, screen: 'profile' }));
  };

  // Screen 5 -> Story (Day 1)
  const handleConfirmProfile = (profile: PlayerProfile) => {
    setGameState((prev) => ({
      ...prev,
      player: profile,
      screen: 'story',
      currentSceneId: 'scene_day1_morning',
      visitedSceneIds: ['scene_day1_morning'],
      history: [],
      unlockedContacts: ['Mum', 'Tobi'],
    }));
  };

  // Handle player making a choice in a scenario
  const handleMakeChoice = (choice: Choice) => {
    if (!gameState.player) return;

    // Calculate updated stats
    const currentStats = gameState.player.stats;
    const deltas = choice.statDeltas;

    const clamp = (val: number) => Math.min(100, Math.max(0, val));

    const newStats = {
      love: clamp(currentStats.love + (deltas.love || 0)),
      money: clamp(currentStats.money + (deltas.money || 0)),
      status: clamp(currentStats.status + (deltas.status || 0)),
      drama: clamp(currentStats.drama + (deltas.drama || 0)),
    };

    const newCash = Math.max(0, gameState.player.cashNaira + (deltas.cashNaira || 0));

    // Update story flags
    const updatedFlags = { ...gameState.storyFlags };
    if (choice.flagToSet) {
      updatedFlags[choice.flagToSet] = true;
    }

    // Check if new contacts are unlocked
    const newContacts = [...gameState.unlockedContacts];
    if (choice.nextSceneId.includes('daniel') && !newContacts.includes('Daniel (Ikoyi)')) {
      newContacts.push('Daniel (Ikoyi)');
    }
    if (choice.nextSceneId.includes('friend') && !newContacts.includes('Shalewa')) {
      newContacts.push('Shalewa');
    }
    if (choice.nextSceneId.includes('career') && !newContacts.includes('Zenith HR')) {
      newContacts.push('Zenith HR');
    }

    const updatedHistory = [
      ...gameState.history,
      {
        sceneId: gameState.currentSceneId,
        choiceId: choice.id,
        choiceText: choice.text,
        consequence: choice.consequenceNarrative,
      },
    ];

    const nextSceneId = choice.nextSceneId;
    const isEnding = nextSceneId === 'scene_episode_end';

    setGameState((prev) => ({
      ...prev,
      player: prev.player
        ? {
            ...prev.player,
            stats: newStats,
            cashNaira: newCash,
          }
        : null,
      currentSceneId: nextSceneId,
      visitedSceneIds: [...prev.visitedSceneIds, nextSceneId],
      storyFlags: updatedFlags,
      unlockedContacts: newContacts,
      history: updatedHistory,
      screen: isEnding ? 'episode_end' : 'story',
    }));
  };

  const handleRestartEpisode = () => {
    sounds.playTap();
    setGameState((prev) => ({
      ...prev,
      currentSceneId: 'scene_day1_morning',
      visitedSceneIds: ['scene_day1_morning'],
      history: [],
      screen: 'story',
    }));
  };

  const handleResetGame = () => {
    clearGameSave();
    setGameState({
      version: 1,
      screen: 'start',
      player: null,
      currentSceneId: 'scene_day1_morning',
      visitedSceneIds: [],
      storyFlags: {},
      unlockedContacts: ['Mum', 'Tobi'],
      history: [],
      soundEnabled: true,
    });
    setIsSettingsOpen(false);
  };

  const currentScene = STORY_SCENES[gameState.currentSceneId] || STORY_SCENES['scene_day1_morning'];

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col font-sans selection:bg-amber-500 selection:text-neutral-950">
      {/* Top Navbar */}
      <Navbar
        player={gameState.player}
        stats={gameState.player?.stats}
        day={gameState.screen === 'story' ? currentScene.day : undefined}
        time={gameState.screen === 'story' ? currentScene.time : undefined}
        soundEnabled={gameState.soundEnabled}
        onToggleSound={handleToggleSound}
        onOpenSettings={() => setIsSettingsOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 w-full max-w-3xl mx-auto px-2 sm:px-4 flex flex-col justify-center">
        {gameState.screen === 'start' && (
          <StartScreen
            existingPlayer={gameState.player}
            onStartNewLife={handleStartNewLife}
            onContinueLife={handleContinueLife}
          />
        )}

        {gameState.screen === 'status' && (
          <StatusSelection
            onSelectStatus={handleSelectStatus}
            onBack={() => setGameState((prev) => ({ ...prev, screen: 'start' }))}
          />
        )}

        {gameState.screen === 'gender' && (
          <CharacterCreationScreen
            onSelectArchetype={handleSelectArchetype}
            onBack={() => setGameState((prev) => ({ ...prev, screen: 'status' }))}
          />
        )}

        {gameState.screen === 'goal' && (
          <GoalSelectionScreen
            onSelectGoal={handleSelectGoal}
            onBack={() => setGameState((prev) => ({ ...prev, screen: 'gender' }))}
          />
        )}

        {gameState.screen === 'profile' && (
          <PlayerProfileScreen
            gender={tempGender}
            archetypeId={tempArchetypeId}
            status={tempStatus}
            goal={tempGoal}
            onConfirmProfile={handleConfirmProfile}
            onBack={() => setGameState((prev) => ({ ...prev, screen: 'goal' }))}
          />
        )}

        {gameState.screen === 'story' && gameState.player && (
          <StorySceneScreen
            scene={currentScene}
            player={gameState.player}
            onMakeChoice={handleMakeChoice}
          />
        )}

        {gameState.screen === 'episode_end' && gameState.player && (
          <EpisodeEndScreen
            player={gameState.player}
            stats={gameState.player.stats}
            cashNaira={gameState.player.cashNaira}
            history={gameState.history}
            onRestartEpisode={handleRestartEpisode}
            onStartNewLife={handleResetGame}
          />
        )}
      </main>

      {/* Global Settings & Reset Modal */}
      <SettingsModal
        isOpen={isSettingsOpen}
        soundEnabled={gameState.soundEnabled}
        unlockedContacts={gameState.unlockedContacts}
        onToggleSound={handleToggleSound}
        onResetGame={handleResetGame}
        onClose={() => setIsSettingsOpen(false)}
      />
    </div>
  );
}
