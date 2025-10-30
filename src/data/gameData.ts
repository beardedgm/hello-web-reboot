// Pathfinder 2e Encounter Builder - Game Data

export interface ThreatLevel {
  xp: number;
  adjustment: number;
  name: string;
}

export interface MonsterRole {
  levelMod: number;
  xp: number;
  name: string;
  emoji: string;
}

export interface MonsterStats {
  hp: number;
  ac: number;
  spellDC: number;
  fortitude: number;
  reflex: number;
  will: number;
  perception: number;
  attackBonus: number;
  lowDamage: string;
  moderateDamage: string;
  severeDamage: string;
  extremeDamage: string;
}

export const THREATS: Record<string, ThreatLevel> = {
  trivial: { xp: 40, adjustment: 10, name: 'Trivial' },
  low: { xp: 60, adjustment: 20, name: 'Low' },
  moderate: { xp: 80, adjustment: 20, name: 'Moderate' },
  severe: { xp: 120, adjustment: 30, name: 'Severe' },
  extreme: { xp: 160, adjustment: 40, name: 'Extreme' },
};

export const ROLES: Record<string, MonsterRole> = {
  minion: { levelMod: -4, xp: 10, name: 'Minion', emoji: '🗡️' },
  lieutenant: { levelMod: 0, xp: 40, name: 'Lieutenant', emoji: '⚔️' },
  boss: { levelMod: 2, xp: 80, name: 'Boss', emoji: '👑' },
  eliteBoss: { levelMod: 3, xp: 120, name: 'Elite Boss', emoji: '🏆' },
  apexBoss: { levelMod: 4, xp: 160, name: 'Apex Boss', emoji: '💀' },
};

export const STATS_STANDARDS: Record<string, MonsterStats> = {
  "-1": { hp: 8, ac: 14, spellDC: 13, fortitude: 4, reflex: 6, will: 4, perception: 5, attackBonus: 6, lowDamage: "1d4 (2)", moderateDamage: "1d4 (3)", severeDamage: "1d4+1 (3)", extremeDamage: "1d6+1 (4)" },
  "0": { hp: 16, ac: 15, spellDC: 13, fortitude: 6, reflex: 6, will: 5, perception: 5, attackBonus: 8, lowDamage: "1d4+1 (3)", moderateDamage: "1d4+2 (4)", severeDamage: "1d6+2 (5)", extremeDamage: "1d6+3 (6)" },
  "1": { hp: 20, ac: 16, spellDC: 14, fortitude: 6, reflex: 7, will: 6, perception: 6, attackBonus: 9, lowDamage: "1d4+2 (4)", moderateDamage: "1d6+2 (5)", severeDamage: "1d6+3 (6)", extremeDamage: "1d8+4 (8)" },
  "2": { hp: 31, ac: 17, spellDC: 15, fortitude: 8, reflex: 8, will: 7, perception: 8, attackBonus: 10, lowDamage: "1d6+3 (6)", moderateDamage: "1d8+4 (8)", severeDamage: "1d10+4 (9)", extremeDamage: "1d12+4 (11)" },
  "3": { hp: 46, ac: 18, spellDC: 17, fortitude: 9, reflex: 9, will: 8, perception: 9, attackBonus: 11, lowDamage: "1d6+5 (8)", moderateDamage: "1d8+6 (10)", severeDamage: "1d10+6 (12)", extremeDamage: "1d12+8 (15)" },
  "4": { hp: 62, ac: 20, spellDC: 18, fortitude: 11, reflex: 11, will: 10, perception: 11, attackBonus: 12, lowDamage: "2d4+4 (9)", moderateDamage: "2d6+5 (12)", severeDamage: "2d8+5 (14)", extremeDamage: "2d10+7 (18)" },
  "5": { hp: 77, ac: 21, spellDC: 19, fortitude: 12, reflex: 12, will: 11, perception: 12, attackBonus: 13, lowDamage: "2d4+6 (11)", moderateDamage: "2d6+6 (13)", severeDamage: "2d8+7 (16)", extremeDamage: "2d12+7 (20)" },
  "6": { hp: 100, ac: 24, spellDC: 21, fortitude: 14, reflex: 14, will: 13, perception: 14, attackBonus: 15, lowDamage: "2d4+7 (12)", moderateDamage: "2d6+8 (15)", severeDamage: "2d8+9 (18)", extremeDamage: "2d12+10 (23)" },
  "7": { hp: 115, ac: 25, spellDC: 22, fortitude: 15, reflex: 15, will: 14, perception: 15, attackBonus: 16, lowDamage: "2d6+7 (14)", moderateDamage: "2d8+8 (17)", severeDamage: "2d10+9 (20)", extremeDamage: "3d10+9 (25)" },
  "8": { hp: 130, ac: 27, spellDC: 24, fortitude: 17, reflex: 17, will: 16, perception: 17, attackBonus: 18, lowDamage: "2d6+9 (16)", moderateDamage: "2d8+10 (19)", severeDamage: "2d12+10 (23)", extremeDamage: "3d10+11 (27)" },
  "9": { hp: 145, ac: 28, spellDC: 25, fortitude: 18, reflex: 18, will: 17, perception: 18, attackBonus: 19, lowDamage: "2d8+9 (18)", moderateDamage: "2d10+10 (21)", severeDamage: "2d12+12 (25)", extremeDamage: "3d12+11 (30)" },
  "10": { hp: 160, ac: 30, spellDC: 27, fortitude: 20, reflex: 20, will: 19, perception: 20, attackBonus: 21, lowDamage: "2d8+11 (20)", moderateDamage: "2d12+11 (24)", severeDamage: "3d10+12 (28)", extremeDamage: "4d10+12 (34)" },
  "11": { hp: 180, ac: 31, spellDC: 28, fortitude: 21, reflex: 21, will: 20, perception: 21, attackBonus: 22, lowDamage: "2d10+11 (22)", moderateDamage: "2d12+13 (26)", severeDamage: "3d10+14 (30)", extremeDamage: "4d10+14 (36)" },
  "12": { hp: 200, ac: 33, spellDC: 30, fortitude: 23, reflex: 23, will: 22, perception: 23, attackBonus: 24, lowDamage: "2d10+13 (24)", moderateDamage: "3d10+13 (29)", severeDamage: "3d12+14 (33)", extremeDamage: "4d12+14 (40)" },
  "13": { hp: 220, ac: 34, spellDC: 31, fortitude: 24, reflex: 24, will: 23, perception: 24, attackBonus: 25, lowDamage: "2d12+13 (26)", moderateDamage: "3d10+15 (31)", severeDamage: "3d12+16 (35)", extremeDamage: "4d12+16 (42)" },
  "14": { hp: 245, ac: 36, spellDC: 33, fortitude: 26, reflex: 26, will: 25, perception: 26, attackBonus: 27, lowDamage: "2d12+15 (28)", moderateDamage: "3d12+15 (34)", severeDamage: "4d10+17 (39)", extremeDamage: "5d12+16 (48)" },
  "15": { hp: 270, ac: 37, spellDC: 34, fortitude: 27, reflex: 27, will: 26, perception: 27, attackBonus: 28, lowDamage: "3d10+15 (31)", moderateDamage: "3d12+17 (36)", severeDamage: "4d12+17 (43)", extremeDamage: "5d12+18 (50)" },
  "16": { hp: 295, ac: 39, spellDC: 36, fortitude: 29, reflex: 29, will: 28, perception: 29, attackBonus: 30, lowDamage: "3d10+17 (33)", moderateDamage: "4d10+17 (39)", severeDamage: "4d12+19 (45)", extremeDamage: "6d12+18 (57)" },
  "17": { hp: 325, ac: 40, spellDC: 37, fortitude: 30, reflex: 30, will: 29, perception: 30, attackBonus: 31, lowDamage: "3d12+17 (36)", moderateDamage: "4d10+19 (41)", severeDamage: "5d10+20 (47)", extremeDamage: "6d12+20 (59)" },
  "18": { hp: 355, ac: 42, spellDC: 39, fortitude: 32, reflex: 32, will: 31, perception: 32, attackBonus: 33, lowDamage: "3d12+19 (38)", moderateDamage: "4d12+19 (45)", severeDamage: "5d12+20 (52)", extremeDamage: "7d12+20 (65)" },
  "19": { hp: 390, ac: 43, spellDC: 40, fortitude: 33, reflex: 33, will: 32, perception: 33, attackBonus: 34, lowDamage: "4d10+19 (41)", moderateDamage: "4d12+21 (47)", severeDamage: "5d12+22 (54)", extremeDamage: "7d12+22 (67)" },
  "20": { hp: 425, ac: 45, spellDC: 42, fortitude: 35, reflex: 35, will: 34, perception: 35, attackBonus: 36, lowDamage: "4d10+21 (43)", moderateDamage: "5d10+21 (48)", severeDamage: "6d10+22 (55)", extremeDamage: "8d12+22 (74)" },
};
