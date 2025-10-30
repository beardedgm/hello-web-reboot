import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Save } from 'lucide-react';
import { PartyConfig } from '@/components/PartyConfig';
import { MonsterComposition } from '@/components/MonsterComposition';
import { XPTracker } from '@/components/XPTracker';
import { MonsterStats } from '@/components/MonsterStats';
import { SavedEncounters } from '@/components/SavedEncounters';
import { calculateTargetXP, calculateTotalXP, Composition } from '@/lib/encounterCalculations';
import { saveEncounter, SavedEncounter } from '@/lib/storage';
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  const [partySize, setPartySize] = useState(4);
  const [partyLevel, setPartyLevel] = useState(1);
  const [threatLevel, setThreatLevel] = useState('moderate');
  const [composition, setComposition] = useState<Composition>({
    minion: 0,
    lieutenant: 0,
    boss: 0,
    eliteBoss: 0,
    apexBoss: 0,
  });
  const { toast } = useToast();

  const targetXP = calculateTargetXP(partySize, threatLevel);
  const currentXP = calculateTotalXP(composition);

  const handleSave = () => {
    const success = saveEncounter({
      partySize,
      partyLevel,
      threatLevel,
      composition,
      totalXP: currentXP,
      targetXP,
    });

    if (success) {
      toast({
        title: 'Encounter saved!',
        description: 'Your encounter has been saved successfully.',
      });
      // Trigger refresh of saved encounters
      window.dispatchEvent(new Event('encounterSaved'));
    }
  };

  const handleLoadEncounter = (encounter: SavedEncounter) => {
    setPartySize(encounter.partySize);
    setPartyLevel(encounter.partyLevel);
    setThreatLevel(encounter.threatLevel);
    setComposition(encounter.composition);
    toast({
      title: 'Encounter loaded!',
      description: 'The saved encounter has been loaded.',
    });
  };

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <header className="text-center mb-8">
          <h1 className="text-5xl font-bold text-primary mb-3">
            ⚔️ Pathfinder 2e Encounter Builder
          </h1>
          <p className="text-lg text-foreground/80">
            Create balanced encounters with real-time statistics
          </p>
        </header>

        {/* Main Grid */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Column - Configuration */}
          <div className="lg:col-span-1 space-y-6">
            <PartyConfig
              partySize={partySize}
              partyLevel={partyLevel}
              threatLevel={threatLevel}
              onPartySizeChange={setPartySize}
              onPartyLevelChange={setPartyLevel}
              onThreatLevelChange={setThreatLevel}
            />

            <MonsterComposition
              composition={composition}
              onCompositionChange={setComposition}
            />

            <XPTracker currentXP={currentXP} targetXP={targetXP} />

            <Button
              className="sketchy-btn w-full bg-primary text-primary-foreground hover:bg-primary/90"
              onClick={handleSave}
            >
              <Save className="h-4 w-4 mr-2" />
              Save Encounter
            </Button>
          </div>

          {/* Middle Column - Monster Stats */}
          <div className="lg:col-span-1">
            <div className="sketchy-card mb-4">
              <h2 className="text-2xl font-bold text-primary mb-4">📜 Monster Statistics</h2>
            </div>
            <MonsterStats composition={composition} partyLevel={partyLevel} />
          </div>

          {/* Right Column - Saved Encounters */}
          <div className="lg:col-span-1">
            <SavedEncounters onLoadEncounter={handleLoadEncounter} />
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-12 text-center text-sm text-muted-foreground">
          <p>Built with ❤️ for Pathfinder 2e Game Masters</p>
          <p className="mt-1">
            Using official Pathfinder 2e design standards for monster creation
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
