export type Gender = 'woman' | 'man';
export type RelationshipStatus = 'single' | 'married';

export type ArchetypeId =
  | 'baddie'
  | 'hustler_f'
  | 'soft_girl'
  | 'wildcard'
  | 'chief'
  | 'playboy'
  | 'hustler_m'
  | 'soft_guy';

export type RelationshipGoal =
  | 'true_love'
  | 'money_status'
  | 'fun_adventure'
  | 'marriage'
  | 'nothing_serious';

export interface GameStats {
  love: number;    // 0-100
  money: number;   // 0-100 (also displayed with Naira equivalents)
  status: number;  // 0-100
  drama: number;   // 0-100 (Wahala meter)
}

export interface PlayerProfile {
  name: string;
  gender: Gender;
  status: RelationshipStatus;
  archetypeId: ArchetypeId;
  archetypeName: string;
  archetypeTagline: string;
  goal: RelationshipGoal;
  age: number;
  location: string;
  stats: GameStats;
  cashNaira: number;
  avatarSeed: string;
}

export interface StatDelta {
  love?: number;
  money?: number;
  status?: number;
  drama?: number;
  cashNaira?: number;
}

export interface Choice {
  id: string;
  text: string;
  subtext?: string;
  statDeltas: StatDelta;
  nextSceneId: string;
  consequenceTitle: string;
  consequenceNarrative: string;
  flagToSet?: string;
  isDilemmaShareable?: boolean;
  dilemmaPrompt?: string;
  dilemmaOptions?: [string, string];
}

export interface ChatMessage {
  sender: string;
  role?: 'mum' | 'friend' | 'tobi' | 'daniel' | 'unknown' | 'boss' | 'player';
  text: string;
  time?: string;
  isUrgent?: boolean;
}

export interface StoryScene {
  id: string;
  day: string;
  time: string;
  location: string;
  chapterTitle?: string;
  narrativeText: string;
  dialogue?: ChatMessage[];
  choices: Choice[];
  bgStyle?: 'morning' | 'street' | 'restaurant' | 'office' | 'nightclub' | 'bedroom' | 'car';
  ambientMood?: 'calm' | 'tense' | 'romantic' | 'dramatic' | 'chaotic';
  isCliffhanger?: boolean;
}

export type GameScreen =
  | 'start'
  | 'status'
  | 'gender'
  | 'archetype'
  | 'goal'
  | 'profile'
  | 'story'
  | 'episode_end';

export interface SavedGameState {
  version: number;
  screen: GameScreen;
  player: PlayerProfile | null;
  currentSceneId: string;
  visitedSceneIds: string[];
  storyFlags: Record<string, boolean | string | number>;
  unlockedContacts: string[];
  history: Array<{
    sceneId: string;
    choiceId: string;
    choiceText: string;
    consequence: string;
  }>;
  soundEnabled: boolean;
}
