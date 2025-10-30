import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Save, Trash2, Download, FileJson } from 'lucide-react';
import {
  getSavedEncounters,
  deleteEncounter,
  clearAllEncounters,
  exportEncounterText,
  exportEncounterJSON,
  SavedEncounter,
} from '@/lib/storage';
import { useToast } from '@/hooks/use-toast';

interface SavedEncountersProps {
  onLoadEncounter: (encounter: SavedEncounter) => void;
}

export function SavedEncounters({ onLoadEncounter }: SavedEncountersProps) {
  const [encounters, setEncounters] = useState<SavedEncounter[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    loadEncounters();
  }, []);

  const loadEncounters = () => {
    setEncounters(getSavedEncounters());
  };

  const handleDelete = (id: number) => {
    if (deleteEncounter(id)) {
      loadEncounters();
      toast({ title: 'Encounter deleted' });
    }
  };

  const handleClearAll = () => {
    if (confirm('Delete all saved encounters?')) {
      if (clearAllEncounters()) {
        loadEncounters();
        toast({ title: 'All encounters cleared' });
      }
    }
  };

  const handleExportText = (encounter: SavedEncounter) => {
    const text = exportEncounterText(encounter);
    navigator.clipboard.writeText(text);
    toast({ title: 'Copied to clipboard!' });
  };

  const handleExportJSON = (encounter: SavedEncounter) => {
    const json = exportEncounterJSON(encounter);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `encounter-${encounter.id}.json`;
    a.click();
    URL.revokeObjectURL(url);
    toast({ title: 'JSON downloaded!' });
  };

  return (
    <div className="sketchy-card space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-primary">💾 Saved Encounters</h2>
        {encounters.length > 0 && (
          <Button
            variant="destructive"
            size="sm"
            className="sketchy-btn"
            onClick={handleClearAll}
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Clear All
          </Button>
        )}
      </div>

      {encounters.length === 0 ? (
        <p className="text-center text-muted-foreground py-4">No saved encounters</p>
      ) : (
        <div className="space-y-3 max-h-96 overflow-y-auto">
          {encounters.map((encounter) => (
            <div key={encounter.id} className="sketchy-card bg-muted/50 space-y-2">
              <div className="flex justify-between items-start">
                <div>
                  <div className="font-semibold">
                    Party: {encounter.partySize} × Level {encounter.partyLevel}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {encounter.threatLevel} • {encounter.totalXP}/{encounter.targetXP} XP
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {encounter.timestamp}
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="icon"
                  className="sketchy-btn h-8 w-8"
                  onClick={() => handleDelete(encounter.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex gap-2 flex-wrap">
                <Button
                  variant="outline"
                  size="sm"
                  className="sketchy-btn flex-1"
                  onClick={() => onLoadEncounter(encounter)}
                >
                  <Save className="h-3 w-3 mr-1" />
                  Load
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="sketchy-btn"
                  onClick={() => handleExportText(encounter)}
                >
                  <Download className="h-3 w-3" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="sketchy-btn"
                  onClick={() => handleExportJSON(encounter)}
                >
                  <FileJson className="h-3 w-3" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
