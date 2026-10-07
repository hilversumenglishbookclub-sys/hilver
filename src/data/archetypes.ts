import { ArchetypeId, Gender, GameStats } from '../types/game';

export interface ArchetypeDetail {
  id: ArchetypeId;
  gender: Gender;
  title: string;
  tagline: string;
  description: string;
  quote: string;
  defaultAge: number;
  initialStats: GameStats;
  initialCash: number;
  badge: string;
  themeColor: string; // Tailwind color class or hex
}

export const ARCHETYPES: Record<ArchetypeId, ArchetypeDetail> = {
  baddie: {
    id: 'baddie',
    gender: 'woman',
    title: 'THE BADDIE',
    tagline: 'Looks expensive. Standards higher.',
    description: 'Fresh manicure, sleek bone straight hair, and an unapologetic expectation of luxury. You know your worth plus tax.',
    quote: '"If you cannot afford my peace of mind, don\'t disturb my soft life."',
    defaultAge: 24,
    initialStats: {
      love: 50,
      money: 45,
      status: 70,
      drama: 20,
    },
    initialCash: 1250000,
    badge: '👑',
    themeColor: 'from-amber-500/20 via-rose-500/20 to-neutral-900',
  },
  hustler_f: {
    id: 'hustler_f',
    gender: 'woman',
    title: 'THE HUSTLER',
    tagline: 'Love is important. But bills are also important.',
    description: 'Corporate powerhouse by day, business visionary by night. You have three active side ventures and no time for broke energy.',
    quote: '"Love is sweet, but have you tried receiving credit alerts?"',
    defaultAge: 26,
    initialStats: {
      love: 40,
      money: 65,
      status: 55,
      drama: 10,
    },
    initialCash: 1800000,
    badge: '💼',
    themeColor: 'from-emerald-500/20 via-teal-500/20 to-neutral-900',
  },
  soft_girl: {
    id: 'soft_girl',
    gender: 'woman',
    title: 'THE SOFT GIRL',
    tagline: 'Wants genuine love and peace.',
    description: 'Allergic to stress, yelling, and unnecessary Lagos wahala. You crave thoughtful surprises, intentional romance, and emotional safety.',
    quote: '"My only prayer point this year is soft life and genuine affection."',
    defaultAge: 23,
    initialStats: {
      love: 70,
      money: 35,
      status: 45,
      drama: 5,
    },
    initialCash: 600000,
    badge: '🌸',
    themeColor: 'from-pink-500/20 via-rose-400/20 to-neutral-900',
  },
  wildcard: {
    id: 'wildcard',
    gender: 'woman',
    title: 'THE WILDCARD',
    tagline: 'Nobody knows what you\'ll do next.',
    description: 'Spontaneous, unpredictable, and exciting. You might book a weekend flight to Ghana on a Friday morning just because you\'re bored.',
    quote: '"Expect the unexpected. Even I surprise myself sometimes."',
    defaultAge: 25,
    initialStats: {
      love: 50,
      money: 40,
      status: 60,
      drama: 35,
    },
    initialCash: 950000,
    badge: '⚡',
    themeColor: 'from-purple-500/20 via-fuchsia-500/20 to-neutral-900',
  },
  chief: {
    id: 'chief',
    gender: 'man',
    title: 'THE CHIEF',
    tagline: 'Money, confidence and plenty attention.',
    description: 'Agbada ironed to razor precision. You enter any restaurant or lounge and the manager greets you by name. People know the pedigree.',
    quote: '"Table reservations and confidence are born from preparation."',
    defaultAge: 31,
    initialStats: {
      love: 45,
      money: 80,
      status: 85,
      drama: 15,
    },
    initialCash: 3500000,
    badge: '🦅',
    themeColor: 'from-amber-600/20 via-yellow-600/20 to-neutral-900',
  },
  playboy: {
    id: 'playboy',
    gender: 'man',
    title: 'THE PLAYBOY',
    tagline: 'One relationship? You wish.',
    description: 'Charm on 100%, WhatsApp archived chats on lock. You swear you want peace, but excitement always seems to find you.',
    quote: '"Why break one heart when you can just make everyone feel special?"',
    defaultAge: 26,
    initialStats: {
      love: 35,
      money: 55,
      status: 65,
      drama: 45,
    },
    initialCash: 1400000,
    badge: '🍸',
    themeColor: 'from-red-500/20 via-orange-500/20 to-neutral-900',
  },
  hustler_m: {
    id: 'hustler_m',
    gender: 'man',
    title: 'THE HUSTLER',
    tagline: 'Building the bag before building a home.',
    description: 'Laptop in backpack, pitch deck ready, grinding through Lagos traffic from Ikeja to Lekki. You want love, but success cannot wait.',
    quote: '"Let me secure the future first, then we can talk about forever."',
    defaultAge: 27,
    initialStats: {
      love: 40,
      money: 60,
      status: 50,
      drama: 10,
    },
    initialCash: 1100000,
    badge: '🚀',
    themeColor: 'from-cyan-500/20 via-blue-500/20 to-neutral-900',
  },
  soft_guy: {
    id: 'soft_guy',
    gender: 'man',
    title: 'THE SOFT GUY',
    tagline: 'Actually wants something serious.',
    description: 'Emotionally available, cooks good pasta, sends flowers on random Tuesdays, and communicates feelings without shouting.',
    quote: '"I just want real partnership, mutual respect, and zero games."',
    defaultAge: 28,
    initialStats: {
      love: 75,
      money: 45,
      status: 45,
      drama: 5,
    },
    initialCash: 850000,
    badge: '☕',
    themeColor: 'from-emerald-600/20 via-teal-600/20 to-neutral-900',
  },
};

export const RELATIONSHIP_GOALS = [
  {
    id: 'true_love',
    label: 'TRUE LOVE',
    icon: '❤️',
    description: 'Deep emotional connection, loyalty, and someone who feels like home.',
  },
  {
    id: 'money_status',
    label: 'MONEY & STATUS',
    icon: '💰',
    description: 'Access, high tables, influence, and financial elevation.',
  },
  {
    id: 'fun_adventure',
    label: 'FUN & ADVENTURE',
    icon: '🔥',
    description: 'No pressure, great memories, trips, and spontaneous Lagos nights.',
  },
  {
    id: 'marriage',
    label: 'MARRIAGE',
    icon: '💍',
    description: 'Ready for forever. Ring on finger, family introductions, building a dynasty.',
  },
  {
    id: 'nothing_serious',
    label: 'NOTHING SERIOUS',
    icon: '😈',
    description: 'Good vibes only. If it complicates life, you are walking away.',
  },
];
