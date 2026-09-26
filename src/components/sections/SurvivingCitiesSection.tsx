import React, { useState } from 'react';
import { SURVIVING_CITIES } from '../../data/archiveData';
import { CityOutpost } from '../../types/archive';
import { audioSynth } from '../../utils/audioSynth';
import { Shield, Wind, Users, Activity, Layers, ExternalLink, Filter } from 'lucide-react';

interface SurvivingCitiesSectionProps {
  onSelectCity: (city: CityOutpost) => void;
}

export const SurvivingCitiesSection: React.FC<SurvivingCitiesSectionProps> = ({ onSelectCity }) => {
  const [filterType, setFilterType] = useState<string>('all');
  const [selectedOutpostId, setSelectedOutpostId] = useState<string>(SURVIVING_CITIES[0].id);

  const categories = [
    { id: 'all', label: 'All Sanctuaries (5)' },
    { id: 'subterranean', label: 'Subterranean' },
    { id: 'oceanic', label: 'Deep Abyssal' },
    { id: 'high_altitude', label: 'High Altitude' },
    { id: 'cryo_vault', label: 'Cryo-Vault' },
  ];

  const filteredCities = filterType === 'all' 
    ? SURVIVING_CITIES 
    : SURVIVING_CITIES.filter((c) => c.type === filterType);

  const activeCity = SURVIVING_CITIES.find((c) => c.id === selectedOutpostId) || SURVIVING_CITIES[0];

  return (
    <section 
      id="surviving-cities" 
      className="relative py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
      aria-label="Surviving Cities and Outposts"
    >
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-cyan-950 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 uppercase tracking-widest mb-1.5">
            <span>01. SANCTUARY GRID</span>
            <span aria-hidden="true">·</span>
            <span>HABITATION TELEMETRY</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-white">
            Surviving Outposts & Underground Cities
          </h2>
          <p className="mt-2 text-sm text-slate-300 max-w-2xl">
            When terrestrial surface temperatures exceeded biological limits, surviving communities retreated into sub-glacial trenches, abyssal ocean depths, and high mountain observatories.
          </p>
        </div>

        {/* Filter controls */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full">
          {categories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => {
                setFilterType(cat.id);
                audioSynth.playClick(720);
              }}
              className={`px-3 py-1.5 text-xs font-mono rounded transition-colors whitespace-nowrap ${
                filterType === cat.id
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/50 font-semibold'
                  : 'text-slate-400 hover:text-slate-200 border border-transparent hover:border-slate-800'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid: Interactive Master-Detail Console */}
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Outposts Roster (Left 7 Cols) */}
        <div className="lg:col-span-7 space-y-3">
          {filteredCities.map((city) => {
            const isSelected = city.id === activeCity.id;
            return (
              <div
                key={city.id}
                role="button"
                tabIndex={0}
                onClick={() => {
                  setSelectedOutpostId(city.id);
                  audioSynth.playClick(840);
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    setSelectedOutpostId(city.id);
                    audioSynth.playClick(840);
                  }
                }}
                className={`w-full text-left p-4 rounded-lg border transition-all cursor-pointer relative overflow-hidden group ${
                  isSelected
                    ? 'bg-[#091124] border-cyan-500 shadow-[0_0_20px_rgba(6,182,212,0.18)]'
                    : 'bg-[#060b18]/70 border-cyan-950/70 hover:border-cyan-800/80 hover:bg-[#070e20]'
                }`}
              >
                {/* Active indicator bar */}
                {isSelected && (
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-cyan-400 shadow-[0_0_10px_#22d3ee]" />
                )}

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-display text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">
                        {city.name}
                      </h3>
                      {/* Status indicator non-hue-only */}
                      <span className="text-[11px] font-mono font-medium px-2 py-0.5 rounded border flex items-center gap-1.5"
                        style={{
                          borderColor: city.status === 'OPTIMAL' ? 'rgba(16,185,129,0.4)' : city.status === 'EVACUATING' ? 'rgba(245,158,11,0.4)' : 'rgba(239,68,68,0.4)',
                          color: city.status === 'OPTIMAL' ? '#34d399' : city.status === 'EVACUATING' ? '#fbbf24' : '#f87171',
                          backgroundColor: 'rgba(4,7,17,0.7)'
                        }}
                      >
                        <span className={`w-1.5 h-1.5 rounded-full ${city.status === 'OPTIMAL' ? 'bg-emerald-400' : city.status === 'EVACUATING' ? 'bg-amber-400 animate-pulse' : 'bg-rose-400'}`} />
                        {city.status}
                      </span>
                    </div>

                    <div className="mt-1 text-xs text-slate-400 flex items-center gap-2 font-mono">
                      <span>{city.location}</span>
                      <span aria-hidden="true">·</span>
                      <span className="text-cyan-400">{city.depthOrAltitude}</span>
                    </div>
                  </div>

                  {/* Population metric */}
                  <div className="text-right sm:border-l sm:border-slate-800 sm:pl-4">
                    <span className="text-[10px] font-mono uppercase text-slate-500 block">POPULATION</span>
                    <span className="font-mono text-base font-bold text-white tabular-nums">
                      {city.population.toLocaleString()}
                    </span>
                  </div>
                </div>

                {/* Quick Telemetry Strip */}
                <div className="mt-3 pt-3 border-t border-slate-800/80 grid grid-cols-3 gap-2 text-xs font-mono">
                  <div>
                    <span className="text-slate-500 text-[10px] block uppercase">Air Quality</span>
                    <span className="text-slate-300 font-semibold tabular-nums">{city.airQuality}% Purity</span>
                  </div>
                  <div>
                    <span className="text-slate-500 text-[10px] block uppercase">Radiation</span>
                    <span className="text-slate-300 font-semibold tabular-nums">{city.radiationLevel}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 text-[10px] block uppercase">Days Resilient</span>
                    <span className="text-cyan-400 font-semibold tabular-nums">{city.lifespanDays} Days</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected Outpost Telemetry Inspector (Right 5 Cols) */}
        <div className="lg:col-span-5 bg-[#060b18] border border-cyan-900/60 rounded-lg p-5 flex flex-col justify-between shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
            <Layers className="w-32 h-32 text-cyan-400" />
          </div>

          <div>
            <div className="flex items-center justify-between border-b border-cyan-950 pb-3">
              <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest flex items-center gap-1.5">
                <Activity className="w-3.5 h-3.5 text-cyan-400" />
                TELEMETRY INSPECTION
              </span>
              <span className="text-xs font-mono text-slate-500">ID: {activeCity.id.toUpperCase()}</span>
            </div>

            <div className="mt-4">
              <h3 className="font-display text-2xl font-bold text-white">
                {activeCity.name}
              </h3>
              <p className="text-xs font-mono text-cyan-300 mt-0.5">
                Primary Mandate: {activeCity.specialty}
              </p>
            </div>

            <p className="mt-3 text-sm text-slate-300 leading-relaxed">
              {activeCity.description}
            </p>

            {/* Vital Diagnostics Gauge Bars */}
            <div className="mt-6 space-y-3 font-mono text-xs">
              <div>
                <div className="flex justify-between text-slate-400 mb-1">
                  <span>Air Scrubbing Filtration</span>
                  <span className="text-white tabular-nums">{activeCity.airQuality}%</span>
                </div>
                <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                  <div 
                    className="bg-cyan-400 h-1.5 rounded-full transition-all duration-500" 
                    style={{ width: `${activeCity.airQuality}%` }} 
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-slate-400 mb-1">
                  <span>Structural Hull Integrity</span>
                  <span className="text-white tabular-nums">{activeCity.structuralIntegrity}%</span>
                </div>
                <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                  <div 
                    className="bg-blue-500 h-1.5 rounded-full transition-all duration-500" 
                    style={{ width: `${activeCity.structuralIntegrity}%` }} 
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-slate-400 mb-1">
                  <span>Atmospheric Buffer Horizon</span>
                  <span className="text-amber-400 tabular-nums">{activeCity.lifespanDays} Days</span>
                </div>
                <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                  <div 
                    className="bg-amber-400 h-1.5 rounded-full transition-all duration-500" 
                    style={{ width: `${Math.min(100, (activeCity.lifespanDays / 600) * 100)}%` }} 
                  />
                </div>
              </div>
            </div>

            {/* Station Commander Lead */}
            <div className="mt-6 p-3 rounded bg-[#040711] border border-slate-800 text-xs font-mono">
              <span className="text-slate-500 block uppercase text-[10px]">Lead Archivist & Commander</span>
              <span className="text-white font-semibold text-sm">{activeCity.leadArchivist}</span>
              <span className="text-slate-400 block text-[11px] mt-0.5">Encrypted Transmission Node #814-Alpha</span>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-cyan-950">
            <button
              type="button"
              onClick={() => {
                audioSynth.playClick(940);
                onSelectCity(activeCity);
              }}
              className="w-full py-2.5 px-4 text-xs font-mono font-bold uppercase tracking-wider text-cyan-300 bg-cyan-950/60 hover:bg-cyan-900/60 border border-cyan-700/80 rounded transition-all flex items-center justify-center gap-2 hover:border-cyan-400"
            >
              <span>Examine Full Outpost Dossier</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
