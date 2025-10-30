import { THREATS, ROLES, STATS_STANDARDS, MonsterStats } from '@/data/gameData';

export interface Composition {
  minion: number;
  lieutenant: number;
  boss: number;
  eliteBoss: number;
  apexBoss: number;
}

export function calculateTargetXP(partySize: number, threatLevel: string): number {
  const threat = THREATS[threatLevel];
  if (!threat) return 0;

  const baseXP = threat.xp;
  let adjustedXP = baseXP;

  if (partySize !== 4) {
    const sizeAdjustment = threat.adjustment * (partySize - 4);
    adjustedXP = baseXP + sizeAdjustment;
  }

  return Math.max(adjustedXP, 10);
}

export function calculateTotalXP(composition: Composition): number {
  let totalXP = 0;
  for (const [role, count] of Object.entries(composition)) {
    if (ROLES[role] && typeof count === 'number') {
      totalXP += ROLES[role].xp * count;
    }
  }
  return totalXP;
}

export function getThreatAssessment(currentXP: number, targetXP: number) {
  if (targetXP === 0) {
    return { status: 'No Target', class: 'threat-trivial' };
  }

  const ratio = currentXP / targetXP;

  if (ratio < 0.6) {
    return { status: 'Too Easy', class: 'threat-trivial' };
  } else if (ratio < 0.8) {
    return { status: 'Below Target', class: 'threat-low' };
  } else if (ratio <= 1.2) {
    return { status: 'Balanced', class: 'threat-moderate' };
  } else if (ratio <= 1.5) {
    return { status: 'Above Target', class: 'threat-severe' };
  } else {
    return { status: 'Too Hard', class: 'threat-extreme' };
  }
}

export function getMonsterLevel(role: string, partyLevel: number): number {
  const roleData = ROLES[role];
  if (!roleData) return partyLevel;

  const baseLevelMod = roleData.levelMod;
  return Math.max(-1, Math.min(20, partyLevel + baseLevelMod));
}

export function getMonsterStats(level: number): MonsterStats | null {
  const levelKey = level.toString();
  return STATS_STANDARDS[levelKey] || null;
}

export function generateMonsterSummary(composition: Composition, partyLevel: number) {
  const monsters = [];
  
  for (const [roleKey, count] of Object.entries(composition)) {
    if (count > 0 && ROLES[roleKey]) {
      const role = ROLES[roleKey];
      const level = getMonsterLevel(roleKey, partyLevel);
      const stats = getMonsterStats(level);
      
      monsters.push({
        role: role.name,
        emoji: role.emoji,
        count,
        level,
        stats,
      });
    }
  }
  
  return monsters;
}
