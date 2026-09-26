import React from 'react';
import { audioSynth } from '../../utils/audioSynth';
import { Radio, Heart, ArrowUp, Shield } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    audioSynth.playClick(600);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer 
      className="relative border-t border-cyan-950/80 bg-[#03050c] pt-16 pb-12 px-4 sm:px-6 lg:px-8 text-slate-400"
      aria-label="Humanity Survival Archive Footer"
    >
      <div className="mx-auto max-w-7xl">
        {/* Prominent Emotional Anchor Quote as requested */}
        <div className="text-center py-10 px-4 rounded-xl border border-cyan-900/40 bg-gradient-to-b from-[#060c1d] to-[#03050c] shadow-[0_0_40px_rgba(2,132,199,0.12)]">
          <p className="text-xs font-mono uppercase tracking-widest text-cyan-400 mb-2">
            TRANSMISSION RECORD // TIMESTAMP: 2187.319
          </p>
          <blockquote className="font-display text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight holo-glow">
            “If you're reading this, humanity survived.”
          </blockquote>
          <p className="mt-3 text-xs font-mono text-slate-400 max-w-lg mx-auto">
            Carried across the cosmic void by the Kepler-9 Arks, the Zion Core Keepers, and the Lunar Watch. We were born of Earth; we remain children of the stars.
          </p>
        </div>

        {/* Footer Navigation & Signals */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-4 gap-8 pb-8 border-b border-slate-900 text-xs font-mono">
          {/* Col 1 */}
          <div className="space-y-3">
            <span className="font-display text-base font-bold text-white tracking-wider text-cyan-400 block">
              LAST ARCHIVE 2187
            </span>
            <p className="text-slate-400 leading-relaxed">
              Official planetary memorial and evacuation registry for the final terrestrial generation.
            </p>
            <div className="flex items-center gap-2 text-cyan-400">
              <Radio className="w-3.5 h-3.5 animate-pulse" />
              <span>BEACON FREQ: 1420.405 MHZ</span>
            </div>
          </div>

          {/* Col 2 */}
          <div className="space-y-2">
            <span className="text-white font-semibold uppercase tracking-wider block mb-2">
              Sanctuary Outposts
            </span>
            <ul className="space-y-1.5 text-slate-400">
              <li><a href="#surviving-cities" className="hover:text-cyan-300 transition-colors">New Geneva Redoubt (-1.4km)</a></li>
              <li><a href="#surviving-cities" className="hover:text-cyan-300 transition-colors">Neo-Kyoto Deep Dome (-4.8km)</a></li>
              <li><a href="#surviving-cities" className="hover:text-cyan-300 transition-colors">Atacama Sky Array (+5.1km)</a></li>
              <li><a href="#surviving-cities" className="hover:text-cyan-300 transition-colors">Svalbard Gen-Fortress</a></li>
            </ul>
          </div>

          {/* Col 3 */}
          <div className="space-y-2">
            <span className="text-white font-semibold uppercase tracking-wider block mb-2">
              Evacuation Vessels
            </span>
            <ul className="space-y-1.5 text-slate-400">
              <li><a href="#colonies" className="hover:text-cyan-300 transition-colors">Kepler-9 Haven Ark</a></li>
              <li><a href="#colonies" className="hover:text-cyan-300 transition-colors">Subterranean Zion Core</a></li>
              <li><a href="#colonies" className="hover:text-cyan-300 transition-colors">Lunar Bastion Citadel</a></li>
              <li><a href="#evacuation-window" className="hover:text-cyan-300 transition-colors">Emergency Window Schedule</a></li>
            </ul>
          </div>

          {/* Col 4 */}
          <div className="space-y-2">
            <span className="text-white font-semibold uppercase tracking-wider block mb-2">
              Heritage Archive
            </span>
            <ul className="space-y-1.5 text-slate-400">
              <li><a href="#archived-memories" className="hover:text-cyan-300 transition-colors">Listen to Terrestrial Audio</a></li>
              <li><a href="#population" className="hover:text-cyan-300 transition-colors">Search Civilization Manifest</a></li>
              <li><a href="#resources" className="hover:text-cyan-300 transition-colors">Life-Support Telemetry</a></li>
              <li><a href="#earth-status" className="hover:text-cyan-300 transition-colors">Planetary Decay Visualizer</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] font-mono text-slate-500">
          <div>
            <span>Interplanetary Protocol Article 18 · Preserved in Deep Cryo-Sapphire</span>
          </div>

          <div className="flex items-center gap-4">
            <span>Terminal Earth Orbit: Sol-3</span>
            <button
              type="button"
              onClick={scrollToTop}
              className="flex items-center gap-1 text-cyan-400 hover:text-cyan-300 transition-colors"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
