import { getThreatAssessment } from '@/lib/encounterCalculations';

interface XPTrackerProps {
  currentXP: number;
  targetXP: number;
}

export function XPTracker({ currentXP, targetXP }: XPTrackerProps) {
  const assessment = getThreatAssessment(currentXP, targetXP);
  const percentage = targetXP > 0 ? Math.min((currentXP / targetXP) * 100, 100) : 0;

  const getThreatColor = () => {
    if (assessment.class.includes('trivial')) return 'bg-threat-trivial';
    if (assessment.class.includes('low')) return 'bg-threat-low';
    if (assessment.class.includes('moderate')) return 'bg-threat-moderate';
    if (assessment.class.includes('severe')) return 'bg-threat-severe';
    return 'bg-threat-extreme';
  };

  return (
    <div className="sketchy-card space-y-4">
      <h2 className="text-2xl font-bold text-primary">📊 Experience Points</h2>

      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <span className="font-semibold">Current XP:</span>
          <span className="text-2xl font-bold">{currentXP}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="font-semibold">Target XP:</span>
          <span className="text-2xl font-bold">{targetXP}</span>
        </div>
      </div>

      <div className="relative w-full h-8 bg-muted rounded-lg overflow-hidden border-2 border-border">
        <div
          className={`h-full ${getThreatColor()} transition-all duration-300`}
          style={{ width: `${percentage}%` }}
        />
        <div className="absolute inset-0 flex items-center justify-center font-bold text-sm">
          {percentage.toFixed(0)}%
        </div>
      </div>

      <div className={`p-3 rounded-lg text-center font-bold ${getThreatColor()}`}>
        {assessment.status}
      </div>
    </div>
  );
}
