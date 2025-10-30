import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Minus, Plus } from 'lucide-react';
import { THREATS } from '@/data/gameData';

interface PartyConfigProps {
  partySize: number;
  partyLevel: number;
  threatLevel: string;
  onPartySizeChange: (size: number) => void;
  onPartyLevelChange: (level: number) => void;
  onThreatLevelChange: (threat: string) => void;
}

export function PartyConfig({
  partySize,
  partyLevel,
  threatLevel,
  onPartySizeChange,
  onPartyLevelChange,
  onThreatLevelChange,
}: PartyConfigProps) {
  return (
    <div className="sketchy-card space-y-6">
      <h2 className="text-2xl font-bold text-primary">🎲 Party Configuration</h2>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-semibold mb-2">Party Size</label>
          <div className="flex items-center justify-between">
            <span className="text-sm">Members:</span>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="icon"
                className="sketchy-btn h-10 w-10"
                onClick={() => onPartySizeChange(Math.max(1, partySize - 1))}
              >
                <Minus className="h-4 w-4" />
              </Button>
              <Input
                type="number"
                value={partySize}
                onChange={(e) => onPartySizeChange(Math.max(1, Math.min(8, parseInt(e.target.value) || 1)))}
                className="sketchy-input w-16 h-10"
                min={1}
                max={8}
              />
              <Button
                variant="outline"
                size="icon"
                className="sketchy-btn h-10 w-10"
                onClick={() => onPartySizeChange(Math.min(8, partySize + 1))}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2">Party Level</label>
          <div className="flex items-center justify-between">
            <span className="text-sm">Level:</span>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="icon"
                className="sketchy-btn h-10 w-10"
                onClick={() => onPartyLevelChange(Math.max(1, partyLevel - 1))}
              >
                <Minus className="h-4 w-4" />
              </Button>
              <Input
                type="number"
                value={partyLevel}
                onChange={(e) => onPartyLevelChange(Math.max(1, Math.min(20, parseInt(e.target.value) || 1)))}
                className="sketchy-input w-16 h-10"
                min={1}
                max={20}
              />
              <Button
                variant="outline"
                size="icon"
                className="sketchy-btn h-10 w-10"
                onClick={() => onPartyLevelChange(Math.min(20, partyLevel + 1))}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2">Threat Level</label>
          <Select value={threatLevel} onValueChange={onThreatLevelChange}>
            <SelectTrigger className="sketchy-input h-10">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-card">
              {Object.entries(THREATS).map(([key, threat]) => (
                <SelectItem key={key} value={key}>
                  {threat.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}
