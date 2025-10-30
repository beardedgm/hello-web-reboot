import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { ROLES } from '@/data/gameData';
import { Composition } from '@/lib/encounterCalculations';

interface MonsterCompositionProps {
  composition: Composition;
  onCompositionChange: (composition: Composition) => void;
}

export function MonsterComposition({ composition, onCompositionChange }: MonsterCompositionProps) {
  const updateRole = (role: keyof Composition, value: number) => {
    onCompositionChange({
      ...composition,
      [role]: Math.max(0, Math.min(20, value)),
    });
  };

  const clearComposition = () => {
    onCompositionChange({
      minion: 0,
      lieutenant: 0,
      boss: 0,
      eliteBoss: 0,
      apexBoss: 0,
    });
  };

  return (
    <div className="sketchy-card space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-primary">⚔️ Monster Composition</h2>
        <Button
          variant="outline"
          size="sm"
          className="sketchy-btn"
          onClick={clearComposition}
        >
          <Trash2 className="h-4 w-4 mr-2" />
          Clear
        </Button>
      </div>

      <div className="space-y-4">
        {Object.entries(ROLES).map(([roleKey, role]) => (
          <div key={roleKey} className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="text-2xl">{role.emoji}</span>
              <div>
                <div className="font-semibold">{role.name}</div>
                <div className="text-xs text-muted-foreground">
                  Level {role.levelMod >= 0 ? '+' : ''}{role.levelMod} • {role.xp} XP
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="icon"
                className="sketchy-btn h-8 w-8"
                onClick={() => updateRole(roleKey as keyof Composition, composition[roleKey as keyof Composition] - 1)}
              >
                <Minus className="h-3 w-3" />
              </Button>
              <Input
                type="number"
                value={composition[roleKey as keyof Composition]}
                onChange={(e) => updateRole(roleKey as keyof Composition, parseInt(e.target.value) || 0)}
                className="sketchy-input w-16 h-8"
                min={0}
                max={20}
              />
              <Button
                variant="outline"
                size="icon"
                className="sketchy-btn h-8 w-8"
                onClick={() => updateRole(roleKey as keyof Composition, composition[roleKey as keyof Composition] + 1)}
              >
                <Plus className="h-3 w-3" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
