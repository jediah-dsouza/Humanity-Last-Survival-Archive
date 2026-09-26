import React, { useState } from 'react';
import { COLONY_OPTIONS } from '../../data/archiveData';
import { ColonyOption } from '../../types/archive';
import { audioSynth } from '../../utils/audioSynth';
import { Rocket, ShieldCheck, Users, Orbit, Sparkles, Check, ArrowRight, AlertTriangle } from 'lucide-react';

interface ChooseColonySectionProps {
  onSelectColonyForBerth: (colony: ColonyOption) => void;
}

export const ChooseColonySection: React.FC<ChooseColonySectionProps> = ({
  onSelectColonyForBerth,
}) => {
  const [selectedColonyId, setSelectedColonyId] = useState<string>(COLONY_OPTIONS[0].id);
  const [compareMode, setCompareMode] = useState<boolean>(false);

  const activeColony = COLONY_OPTIONS.find((c) => c.id === selectedColonyId) || COLONY_OPTIONS[0];

  return (
    <section 
      id="colonies" 
      className="relative py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-cyan-950/60"
      aria-label="Choose a Colony Survival Selection"
    >
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-cyan-950 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 uppercase tracking-widest mb-1.5">
            <span>05. EMBARKATION PROTOCOL</span>
            <span aria-hidden="true">·</span>
            <span>CHOOSE YOUR DESTINATION</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-white">
            Choose Your Colony Destination
          </h2>
          <p className="mt-2 text-sm text-slate-300 max-w-2xl">
            Humanity's survival is not centralized in one vessel. Choose between interstellar generation travel, impenetrable subterranean bedrock, or the high lunar vantage point.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => {
              setCompareMode(!compareMode);
              audioSynth.playClick(750);
            }}
            className="px-3.5 py-2 text-xs font-mono rounded border border-cyan-800 text-cyan-300 hover:bg-cyan-950/60 transition-colors"
          >
            {compareMode ? 'Standard View' : 'Compare Specifications'}
          </button>
        </div>
      </div>

      {/* Interactive Colony Cards Grid */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        {COLONY_OPTIONS.map((colony) => {
          const isSelected = colony.id === activeColony.id;

          return (
            <div
              key={colony.id}
              role="button"
              tabIndex={0}
              onClick={() => {
                setSelectedColonyId(colony.id);
                audioSynth.playClick(900);
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  setSelectedColonyId(colony.id);
                  audioSynth.playClick(900);
                }
              }}
              className={`flex flex-col justify-between rounded-xl border transition-all duration-300 overflow-hidden cursor-pointer group text-left ${
                isSelected
                  ? 'bg-[#09152b] border-cyan-400 shadow-[0_0_30px_rgba(6,182,212,0.25)] ring-1 ring-cyan-400'
                  : 'bg-[#060b18] border-cyan-950/80 hover:border-cyan-700 hover:bg-[#070e20]'
              }`}
            >
              <div>
                {/* Visual Asset Slot */}
                <div className="relative h-48 w-full overflow-hidden bg-slate-950">
                  <img
                    src={colony.image}
                    alt={colony.name}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#060b18] via-transparent to-black/30 pointer-events-none" />

                  {/* Remaining Berths Badge */}
                  <div className="absolute top-3 right-3 bg-[#040711]/90 backdrop-blur border border-cyan-500/50 px-2.5 py-1 rounded text-[11px] font-mono font-bold text-cyan-300 tabular-nums">
                    {colony.remainingBerths.toLocaleString()} Berths Open
                  </div>

                  {/* Destination Tag */}
                  <div className="absolute bottom-2 left-3 text-[11px] font-mono text-cyan-300 flex items-center gap-1.5">
                    <Orbit className="w-3.5 h-3.5 text-cyan-400" />
                    <span>{colony.destination}</span>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-5">
                  <div className="flex items-center justify-between">
                    <h3 className="font-display text-xl font-bold text-white group-hover:text-cyan-300 transition-colors">
                      {colony.name}
                    </h3>
                    {isSelected && (
                      <span className="p-1 rounded-full bg-cyan-400 text-[#040711]" title="Active selection">
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                      </span>
                    )}
                  </div>

                  <p className="mt-1 text-xs font-mono text-cyan-400/90 italic">
                    "{colony.tagline}"
                  </p>

                  <p className="mt-3 text-xs sm:text-sm text-slate-300 line-clamp-3 leading-relaxed">
                    {colony.description}
                  </p>

                  {/* Key Specifications (Unboxed metadata) */}
                  <div className="mt-4 pt-3 border-t border-slate-800/80 space-y-2 font-mono text-xs">
                    <div className="flex justify-between">
                      <span className="text-slate-500">Survival Probability</span>
                      <span className="text-emerald-400 font-bold tabular-nums">
                        {colony.survivalProbability}%
                      </span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-slate-500">Transit Duration</span>
                      <span className="text-slate-300 text-[11px] text-right max-w-[170px] truncate">
                        {colony.transitDuration}
                      </span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-slate-500">Gravity Constant</span>
                      <span className="text-cyan-300 tabular-nums">
                        {colony.gravityStandard}
                      </span>
                    </div>
                  </div>

                  {/* Highlights Bullet List */}
                  <div className="mt-4 space-y-1.5 font-mono text-[11px] text-slate-400">
                    {colony.highlights.map((h, i) => (
                      <div key={i} className="flex items-start gap-1.5">
                        <span className="text-cyan-400 mt-0.5">›</span>
                        <span className="line-clamp-1">{h}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="p-5 pt-0">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    audioSynth.playClick(1100);
                    onSelectColonyForBerth(colony);
                  }}
                  className={`w-full py-2.5 px-4 text-xs font-mono font-bold uppercase tracking-wider rounded transition-all flex items-center justify-center gap-2 active:scale-95 ${
                    isSelected
                      ? 'bg-cyan-400 hover:bg-cyan-300 text-[#040711] shadow-[0_0_15px_rgba(34,211,238,0.4)]'
                      : 'bg-cyan-950/40 hover:bg-cyan-900/50 text-cyan-300 border border-cyan-800/70'
                  }`}
                >
                  <Rocket className="w-3.5 h-3.5" />
                  <span>Request Berth on {colony.name.split(' ')[0]}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Comparison Drawer / Matrix when toggled */}
      {compareMode && (
        <div className="mt-8 p-5 bg-[#060b18] border border-cyan-900/80 rounded-xl shadow-2xl overflow-x-auto">
          <h3 className="font-display text-lg font-bold text-white mb-4 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span>Colony Cross-Comparison Specifications</span>
          </h3>

          <table className="w-full text-left font-mono text-xs">
            <thead>
              <tr className="border-b border-slate-800 text-slate-500 uppercase text-[10px]">
                <th className="py-2 px-3">Metric</th>
                {COLONY_OPTIONS.map((c) => (
                  <th key={c.id} className="py-2 px-3 text-cyan-400 font-bold">{c.name}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              <tr>
                <td className="py-2.5 px-3 text-slate-400 font-semibold">Survival Index</td>
                {COLONY_OPTIONS.map((c) => (
                  <td key={c.id} className="py-2.5 px-3 text-emerald-400 font-bold tabular-nums">
                    {c.survivalProbability}%
                  </td>
                ))}
              </tr>
              <tr>
                <td className="py-2.5 px-3 text-slate-400 font-semibold">Total Capacity</td>
                {COLONY_OPTIONS.map((c) => (
                  <td key={c.id} className="py-2.5 px-3 text-white tabular-nums">
                    {c.totalCapacity.toLocaleString()} souls
                  </td>
                ))}
              </tr>
              <tr>
                <td className="py-2.5 px-3 text-slate-400 font-semibold">Remaining Berths</td>
                {COLONY_OPTIONS.map((c) => (
                  <td key={c.id} className="py-2.5 px-3 text-cyan-300 tabular-nums">
                    {c.remainingBerths.toLocaleString()}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="py-2.5 px-3 text-slate-400 font-semibold">Gravity Environment</td>
                {COLONY_OPTIONS.map((c) => (
                  <td key={c.id} className="py-2.5 px-3 text-slate-300">
                    {c.gravityStandard}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="py-2.5 px-3 text-slate-400 font-semibold">Known Hazard Risk</td>
                {COLONY_OPTIONS.map((c) => (
                  <td key={c.id} className="py-2.5 px-3 text-amber-400 text-[11px]">
                    {c.riskFactor}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
};
