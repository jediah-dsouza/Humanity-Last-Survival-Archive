import React, { useState } from 'react';
import { DyingEarthCanvas } from './DyingEarthCanvas';
import { audioSynth } from '../../utils/audioSynth';
import { Radio, Database, ShieldCheck, ChevronDown, Compass, Sparkles } from 'lucide-react';

interface HeroSectionProps {
  onSelectColony: () => void;
  onExploreCities: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onSelectColony,
  onExploreCities,
}) => {
  const [currentSimYear, setCurrentSimYear] = useState<number>(2187);

  const scrollToNext = () => {
    audioSynth.playClick(600);
    const elem = document.getElementById('evacuation-window');
    elem?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section 
      id="earth-status" 
      className="relative min-h-[90vh] flex flex-col justify-center items-center pt-8 pb-16 px-4 sm:px-6 lg:px-8 holo-grid overflow-hidden"
      aria-label="Humanity's Last Archive Hero"
    >
      {/* Ambient background light gradients */}
      <div 
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-gradient-to-b from-cyan-600/10 via-blue-900/10 to-transparent blur-3xl pointer-events-none -z-10"
        aria-hidden="true" 
      />

      <div className="mx-auto max-w-7xl w-full flex flex-col items-center text-center">
        {/* Unboxed Metadata Kicker (Anti-Pill discipline compliant) */}
        <div className="flex flex-wrap items-center justify-center gap-2 text-xs font-mono text-cyan-400/90 mb-4 tracking-wider uppercase">
          <span className="flex items-center gap-1.5">
            <Radio className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
            GLOBAL BEACON: 1420.405 MHZ
          </span>
          <span aria-hidden="true" className="text-slate-600">·</span>
          <span>SOLAR SYSTEM ARCHIVE NETWORK</span>
          <span aria-hidden="true" className="text-slate-600">·</span>
          <span className="text-amber-400">STAGE 4 PLANETARY DISPERSAL</span>
        </div>

        {/* Hero Title */}
        <h1 className="font-display text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white max-w-5xl leading-none text-balance holo-glow">
          YEAR 2187 <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-300 to-indigo-300">— HUMANITY'S LAST ARCHIVE</span>
        </h1>

        {/* Narrative Description */}
        <p className="mt-5 text-base sm:text-lg md:text-xl text-slate-300 max-w-3xl leading-relaxed font-light text-balance">
          Documenting our final hours upon the ancestral cradle. With terrestrial atmosphere degraded beyond biological regeneration, five subterranean redoubts preserve our species while outbound generation arks prepare for deep space embarkation.
        </p>

        {/* Key Planetary Telemetry Overview (Clean unboxed statistics) */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs font-mono text-slate-400">
          <div>
            <span className="text-slate-500 uppercase">Surface State:</span>{' '}
            <span className="text-rose-400 font-semibold">Toxified (O2 &lt; 14%)</span>
          </div>
          <span aria-hidden="true" className="text-slate-700">·</span>
          <div>
            <span className="text-slate-500 uppercase">Remaining Population:</span>{' '}
            <span className="text-cyan-300 font-semibold tabular-nums">348,920 Souls</span>
          </div>
          <span aria-hidden="true" className="text-slate-700">·</span>
          <div>
            <span className="text-slate-500 uppercase">Operational Sanctuaries:</span>{' '}
            <span className="text-emerald-400 font-semibold tabular-nums">5 Outposts</span>
          </div>
          <span aria-hidden="true" className="text-slate-700">·</span>
          <div>
            <span className="text-slate-500 uppercase">Simulation Year:</span>{' '}
            <span className="text-cyan-400 font-semibold tabular-nums">{currentSimYear}</span>
          </div>
        </div>

        {/* Animated Earth slowly disappearing into darkness with interactive decay timeline */}
        <div className="mt-8 w-full">
          <DyingEarthCanvas onYearChange={setCurrentSimYear} />
        </div>

        {/* Dual Primary Call-to-Actions */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <button
            type="button"
            onClick={() => {
              audioSynth.playClick(900);
              onSelectColony();
            }}
            className="px-6 py-3 text-xs sm:text-sm font-mono font-bold uppercase tracking-wider text-[#040711] bg-gradient-to-r from-cyan-400 via-sky-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 rounded transition-all shadow-[0_0_25px_rgba(56,189,248,0.4)] flex items-center gap-2 active:scale-95 cursor-pointer"
          >
            <Compass className="w-4 h-4 text-[#040711]" />
            <span>Select Evacuation Colony</span>
          </button>

          <button
            type="button"
            onClick={() => {
              audioSynth.playClick(650);
              onExploreCities();
            }}
            className="px-6 py-3 text-xs sm:text-sm font-mono uppercase tracking-wider text-cyan-300 bg-cyan-950/40 hover:bg-cyan-900/50 border border-cyan-800/80 rounded transition-all flex items-center gap-2 hover:border-cyan-500 active:scale-95 cursor-pointer"
          >
            <Database className="w-4 h-4 text-cyan-400" />
            <span>Survey Surviving Outposts</span>
          </button>
        </div>

        {/* Scroll affordance */}
        <button
          type="button"
          onClick={scrollToNext}
          className="mt-12 text-slate-500 hover:text-cyan-400 transition-colors flex flex-col items-center gap-1 text-xs font-mono group cursor-pointer"
          aria-label="Scroll to Evacuation Window Countdown"
        >
          <span>MISSION TELEMETRY</span>
          <ChevronDown className="w-4 h-4 group-hover:translate-y-1 transition-transform animate-bounce" />
        </button>
      </div>
    </section>
  );
};
