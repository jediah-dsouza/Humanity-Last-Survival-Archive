import React from 'react';
import { CityOutpost } from '../../types/archive';
import { audioSynth } from '../../utils/audioSynth';
import { X, Shield, Wind, Users, Activity, CheckCircle2 } from 'lucide-react';

interface CityDetailModalProps {
  city: CityOutpost | null;
  onClose: () => void;
}

export const CityDetailModal: React.FC<CityDetailModalProps> = ({ city, onClose }) => {
  if (!city) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="city-modal-title"
    >
      <div className="relative w-full max-w-2xl bg-[#060b18] border border-cyan-500/80 rounded-2xl p-6 sm:p-8 shadow-[0_0_50px_rgba(6,182,212,0.3)] text-left">
        <button
          type="button"
          onClick={() => {
            audioSynth.playClick(500);
            onClose();
          }}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 uppercase tracking-widest mb-1">
          <Activity className="w-4 h-4 text-cyan-400" />
          <span>OFFICIAL OUTPOST TELEMETRY DOSSIER</span>
        </div>

        <h2 id="city-modal-title" className="font-display text-2xl font-bold text-white">
          {city.name}
        </h2>
        <p className="text-xs font-mono text-cyan-300 mt-1">
          {city.location} · {city.depthOrAltitude}
        </p>

        <p className="mt-4 text-sm text-slate-300 leading-relaxed">
          {city.description}
        </p>

        <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono text-xs">
          <div className="p-3 rounded bg-[#040711] border border-slate-800">
            <span className="text-[10px] uppercase text-slate-500 block">POPULATION</span>
            <span className="text-white text-base font-bold tabular-nums block mt-0.5">{city.population.toLocaleString()}</span>
          </div>
          <div className="p-3 rounded bg-[#040711] border border-slate-800">
            <span className="text-[10px] uppercase text-slate-500 block">AIR PURITY</span>
            <span className="text-cyan-400 text-base font-bold tabular-nums block mt-0.5">{city.airQuality}%</span>
          </div>
          <div className="p-3 rounded bg-[#040711] border border-slate-800">
            <span className="text-[10px] uppercase text-slate-500 block">RADIATION</span>
            <span className="text-emerald-400 text-base font-bold tabular-nums block mt-0.5">{city.radiationLevel}</span>
          </div>
          <div className="p-3 rounded bg-[#040711] border border-slate-800">
            <span className="text-[10px] uppercase text-slate-500 block">BUFFER HORIZON</span>
            <span className="text-amber-400 text-base font-bold tabular-nums block mt-0.5">{city.lifespanDays} Days</span>
          </div>
        </div>

        <div className="mt-6 p-4 rounded-lg bg-[#040711] border border-cyan-950 font-mono text-xs">
          <span className="text-[10px] uppercase text-slate-500 block">PRIMARY SCIENTIFIC MANDATE</span>
          <span className="text-cyan-300 font-semibold text-sm mt-0.5 block">{city.specialty}</span>
          <span className="text-slate-400 block mt-2">
            Supervised by Archivist {city.leadArchivist}. Sealed under high-density structural titanium dampeners.
          </span>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 rounded bg-cyan-400 hover:bg-cyan-300 text-[#040711] text-xs font-mono font-bold uppercase transition-colors"
          >
            Acknowledge Dossier
          </button>
        </div>
      </div>
    </div>
  );
};
