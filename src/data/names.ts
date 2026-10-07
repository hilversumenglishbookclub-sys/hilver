export const FEMALE_NAMES = [
  'Amaka',
  'Chioma',
  'Tiwa',
  'Zainab',
  'Folake',
  'Damilola',
  'Ifeoma',
  'Kemi',
  'Simi',
  'Eniola',
  'Blessing',
  'Ngozi',
];

export const MALE_NAMES = [
  'Tobi',
  'Daniel',
  'Emeka',
  'Femi',
  'Chidi',
  'Farouk',
  'Bolu',
  'Ebuka',
  'Kola',
  'Jimi',
  'Olamide',
  'Seyifunmi',
];

export const NIGERIAN_LOCATIONS = [
  'Lekki Phase 1, Lagos',
  'Victoria Island, Lagos',
  'Ikeja GRA, Lagos',
  'Yaba Tech Corridor, Lagos',
  'Banana Island, Lagos',
  'Surulere, Lagos',
  'Maitama, Abuja',
];

export function getRandomName(gender: 'woman' | 'man'): string {
  const list = gender === 'woman' ? FEMALE_NAMES : MALE_NAMES;
  return list[Math.floor(Math.random() * list.length)];
}
