import { generateMonsterSummary, Composition } from '@/lib/encounterCalculations';

interface MonsterStatsProps {
  composition: Composition;
  partyLevel: number;
}

export function MonsterStats({ composition, partyLevel }: MonsterStatsProps) {
  const monsters = generateMonsterSummary(composition, partyLevel);

  if (monsters.length === 0) {
    return (
      <div className="sketchy-card text-center text-muted-foreground py-8">
        Add monsters to see their statistics
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {monsters.map((monster, index) => (
        <div key={index} className="sketchy-card space-y-3">
          <div className="flex items-center justify-between border-b-2 border-border pb-2">
            <div className="flex items-center space-x-2">
              <span className="text-3xl">{monster.emoji}</span>
              <div>
                <h3 className="text-xl font-bold">{monster.role}</h3>
                <p className="text-sm text-muted-foreground">
                  {monster.count}× Level {monster.level}
                </p>
              </div>
            </div>
          </div>

          {monster.stats && (
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <span className="font-semibold">HP:</span> {monster.stats.hp}
              </div>
              <div>
                <span className="font-semibold">AC:</span> {monster.stats.ac}
              </div>
              <div>
                <span className="font-semibold">Attack:</span> +{monster.stats.attackBonus}
              </div>
              <div>
                <span className="font-semibold">Spell DC:</span> {monster.stats.spellDC}
              </div>
              <div>
                <span className="font-semibold">Fort:</span> +{monster.stats.fortitude}
              </div>
              <div>
                <span className="font-semibold">Ref:</span> +{monster.stats.reflex}
              </div>
              <div>
                <span className="font-semibold">Will:</span> +{monster.stats.will}
              </div>
              <div>
                <span className="font-semibold">Perc:</span> +{monster.stats.perception}
              </div>
              <div className="col-span-2">
                <span className="font-semibold">Damage:</span>
                <div className="text-xs space-y-1 mt-1">
                  <div>Low: {monster.stats.lowDamage}</div>
                  <div>Moderate: {monster.stats.moderateDamage}</div>
                  <div>Severe: {monster.stats.severeDamage}</div>
                  <div>Extreme: {monster.stats.extremeDamage}</div>
                </div>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
