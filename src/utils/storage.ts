import { SavedGameState, GameScreen } from '../types/game';

const STORAGE_KEY = 'wahala_life_simulator_save_v1';

export const INITIAL_STATE: SavedGameState = {
  version: 1,
  screen: 'start',
  player: null,
  currentSceneId: 'scene_day1_morning',
  visitedSceneIds: [],
  storyFlags: {},
  unlockedContacts: ['Mum', 'Tobi'],
  history: [],
  soundEnabled: true,
};

export function loadGame(): SavedGameState {
  if (typeof window === 'undefined') return INITIAL_STATE;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return INITIAL_STATE;
    const parsed = JSON.parse(raw);
    if (parsed && parsed.version === 1) {
      return parsed;
    }
    return INITIAL_STATE;
  } catch (e) {
    console.error('Failed to load saved game:', e);
    return INITIAL_STATE;
  }
}

export function saveGame(state: SavedGameState): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (e) {
    console.error('Failed to save game state:', e);
  }
}

export function clearGameSave(): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (e) {
    console.error('Failed to clear game save:', e);
  }
}

export function formatNaira(amount: number): string {
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    maximumFractionDigits: 0,
  }).format(amount);
}
