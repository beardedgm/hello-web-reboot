import { Composition } from './encounterCalculations';

export interface SavedEncounter {
  id: number;
  timestamp: string;
  partySize: number;
  partyLevel: number;
  threatLevel: string;
  composition: Composition;
  totalXP: number;
  targetXP: number;
}

const STORAGE_KEY = 'pf2e_savedEncounters';
const MAX_SAVED = 20;

export function saveEncounter(encounter: Omit<SavedEncounter, 'id' | 'timestamp'>): boolean {
  try {
    const saved = getSavedEncounters();
    const newEncounter: SavedEncounter = {
      ...encounter,
      id: Date.now(),
      timestamp: new Date().toLocaleString(),
    };

    saved.unshift(newEncounter);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(saved.slice(0, MAX_SAVED)));
    return true;
  } catch (error) {
    console.error('Failed to save encounter:', error);
    return false;
  }
}

export function getSavedEncounters(): SavedEncounter[] {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch (error) {
    console.error('Failed to load saved encounters:', error);
    return [];
  }
}

export function deleteEncounter(id: number): boolean {
  try {
    const saved = getSavedEncounters();
    const filtered = saved.filter(encounter => encounter.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
    return true;
  } catch (error) {
    console.error('Failed to delete encounter:', error);
    return false;
  }
}

export function clearAllEncounters(): boolean {
  try {
    localStorage.removeItem(STORAGE_KEY);
    return true;
  } catch (error) {
    console.error('Failed to clear encounters:', error);
    return false;
  }
}

export function exportEncounterText(encounter: SavedEncounter): string {
  const lines = [
    '=== PATHFINDER 2E ENCOUNTER ===',
    '',
    `Party: ${encounter.partySize} members (Level ${encounter.partyLevel})`,
    `Threat Level: ${encounter.threatLevel}`,
    `XP: ${encounter.totalXP}/${encounter.targetXP}`,
    '',
    'Composition:',
  ];

  for (const [role, count] of Object.entries(encounter.composition)) {
    if (count > 0) {
      lines.push(`  ${role}: ${count}`);
    }
  }

  lines.push('', `Saved: ${encounter.timestamp}`);
  return lines.join('\n');
}

export function exportEncounterJSON(encounter: SavedEncounter): string {
  return JSON.stringify(encounter, null, 2);
}
