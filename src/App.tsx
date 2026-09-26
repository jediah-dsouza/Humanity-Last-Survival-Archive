import React, { useState } from 'react';
import { Navigation } from './components/layout/Navigation';
import { Footer } from './components/layout/Footer';
import { HeroSection } from './components/hero/HeroSection';
import { EvacuationCountdown } from './components/hero/EvacuationCountdown';
import { SurvivingCitiesSection } from './components/sections/SurvivingCitiesSection';
import { ResourcesSection } from './components/sections/ResourcesSection';
import { PopulationTrackerSection } from './components/sections/PopulationTrackerSection';
import { ArchivedMemoriesSection } from './components/sections/ArchivedMemoriesSection';
import { ChooseColonySection } from './components/sections/ChooseColonySection';
import { BoardingPassModal } from './components/modals/BoardingPassModal';
import { CityDetailModal } from './components/modals/CityDetailModal';
import { SubmitMemoryModal } from './components/modals/SubmitMemoryModal';
import { ColonyOption, CityOutpost } from './types/archive';
import { COLONY_OPTIONS, ARCHIVED_MEMORIES } from './data/archiveData';
import { audioSynth } from './utils/audioSynth';

export default function App() {
  const [audioActive, setAudioActive] = useState<boolean>(false);
  const [selectedColonyForBerth, setSelectedColonyForBerth] = useState<ColonyOption | null>(null);
  const [inspectedCity, setInspectedCity] = useState<CityOutpost | null>(null);
  const [isSubmitMemoryOpen, setIsSubmitMemoryOpen] = useState<boolean>(false);

  const handleToggleAudio = () => {
    const isMuted = audioSynth.toggleMute();
    setAudioActive(!isMuted);
  };

  const handleOpenColonySelector = () => {
    const elem = document.getElementById('colonies');
    elem?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleExploreCities = () => {
    const elem = document.getElementById('surviving-cities');
    elem?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSubmitMemory = (newMem: { title: string; author: string; text: string; location: string }) => {
    // Add memory to list
    ARCHIVED_MEMORIES.unshift({
      id: `mem-${Date.now()}`,
      year: 2187,
      title: newMem.title,
      author: newMem.author,
      originLocation: newMem.location,
      category: 'Sensory',
      excerpt: newMem.text.slice(0, 120) + (newMem.text.length > 120 ? '...' : ''),
      fullText: newMem.text,
      likesCount: 1,
      verifiedTimestamp: new Date().toISOString(),
      soundType: 'pulse'
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#040711] text-slate-100 selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Skip to Main Content Link for accessibility */}
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 z-50 px-4 py-2 bg-cyan-400 text-slate-900 font-mono text-xs font-bold rounded"
      >
        Skip to main content
      </a>

      {/* Primary Top Bar Contract */}
      <Navigation
        onOpenColonySelector={handleOpenColonySelector}
        audioActive={audioActive}
        onToggleAudio={handleToggleAudio}
      />

      {/* Main Content Area */}
      <main id="main-content" className="flex-1">
        {/* 1. Hero: YEAR 2187 — HUMANITY'S LAST ARCHIVE with Animated Dying Earth */}
        <HeroSection
          onSelectColony={handleOpenColonySelector}
          onExploreCities={handleExploreCities}
        />

        {/* 2. Countdown to Evacuation Window */}
        <EvacuationCountdown
          onExploreColonies={handleOpenColonySelector}
        />

        {/* 3. Surviving Cities & Underground Redoubts */}
        <SurvivingCitiesSection
          onSelectCity={(city) => setInspectedCity(city)}
        />

        {/* 4. Planetary Resources & Life Sustenance Telemetry */}
        <ResourcesSection />

        {/* 5. Last Human Population Tracker & Manifest */}
        <PopulationTrackerSection />

        {/* 6. Archived Memories of Earth */}
        <ArchivedMemoriesSection
          onOpenSubmitMemory={() => setIsSubmitMemoryOpen(true)}
        />

        {/* 7. Interactive “Choose a Colony” Cards */}
        <ChooseColonySection
          onSelectColonyForBerth={(colony) => setSelectedColonyForBerth(colony)}
        />
      </main>

      {/* Footer: "If you're reading this, humanity survived." */}
      <Footer />

      {/* Interactive Modals */}
      {selectedColonyForBerth && (
        <BoardingPassModal
          colony={selectedColonyForBerth}
          onClose={() => setSelectedColonyForBerth(null)}
        />
      )}

      {inspectedCity && (
        <CityDetailModal
          city={inspectedCity}
          onClose={() => setInspectedCity(null)}
        />
      )}

      <SubmitMemoryModal
        isOpen={isSubmitMemoryOpen}
        onClose={() => setIsSubmitMemoryOpen(false)}
        onSubmitMemory={handleSubmitMemory}
      />
    </div>
  );
}
