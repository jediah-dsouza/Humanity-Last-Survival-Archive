import React, { useState } from 'react';
import { RESOURCE_TELEMETRY } from '../../data/archiveData';
import { audioSynth } from '../../utils/audioSynth';
import { BatteryCharging, Droplets, Wind, Dna, ShieldAlert, Sliders, RefreshCw } from 'lucide-react';

export const ResourcesSection: React.FC = () => {
  // Interactive Life-Support Power Distribution Simulator
  // 100% total power distributed between 3 critical sectors:
  // 1. Planetary Air & Water Scrubbers (default 45%)
  // 2. Outbound Shuttle Fuel & Catapults (default 35%)
  // 3. Cryo-Genetic Seed Vault Preservation (default 20%)
  const [scrubberPower, setScrubberPower] = useState<number>(45);
  const [shuttlePower, setShuttlePower] = useState<number>(35);
  const [cryoPower, setCryoPower] = useState<number>(20);

  // Derived survival horizon calculation based on power
  const calculatedDaysRemaining = Math.round(75 * (scrubberPower / 45) + 26 * (shuttlePower / 35));
  const geneticViabilityEstimate = (80 + (cryoPower / 20) * 12).toFixed(1);

  const handleScrubberChange = (val: number) => {
    setScrubberPower(val);
    audioSynth.playHover();
  };

  const resetPower = () => {
    audioSynth.playClick(600);
    setScrubberPower(45);
    setShuttlePower(35);
    setCryoPower(20);
  };

  return (
    <section 
      id="resources" 
      className="relative py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-cyan-950/60"
      aria-label="Global Planetary Resources Telemetry"
    >
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-cyan-950 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 uppercase tracking-widest mb-1.5">
            <span>02. VITAL TELEMETRY</span>
            <span aria-hidden="true">·</span>
            <span>LIFE SUSTENANCE RESERVES</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-white">
            Planetary Resources & Sustenance Reserves
          </h2>
          <p className="mt-2 text-sm text-slate-300 max-w-2xl">
            Real-time accounting of mankind's remaining chemical, energetic, and biological stockpiles across all deep shelters before orbital departure.
          </p>
        </div>

        <div className="text-right">
          <span className="text-[10px] font-mono uppercase text-slate-500 block">GLOBAL GRID STABILITY</span>
          <span className="text-emerald-400 font-mono text-sm font-semibold flex items-center justify-end gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            94.6% THERMAL COUPLING
          </span>
        </div>
      </div>

      {/* Primary Telemetry Cards Grid */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {RESOURCE_TELEMETRY.map((res) => {
          const isCritical = res.status === 'CRITICAL';
          const isCaution = res.status === 'CAUTION';

          return (
            <div
              key={res.key}
              className={`p-5 rounded-lg border transition-all ${
                isCritical
                  ? 'bg-[#150a0f] border-rose-900/60 shadow-[0_0_15px_rgba(244,63,94,0.15)]'
                  : isCaution
                  ? 'bg-[#120e06] border-amber-900/60'
                  : 'bg-[#060b18] border-cyan-950/80 hover:border-cyan-800'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                  {res.label}
                </span>
                <span
                  className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded border flex items-center gap-1"
                  style={{
                    borderColor: isCritical ? '#f43f5e' : isCaution ? '#f59e0b' : '#10b981',
                    color: isCritical ? '#fb7185' : isCaution ? '#fcd34d' : '#6ee7b7',
                    backgroundColor: 'rgba(4,7,17,0.7)',
                  }}
                >
                  <span className={`w-1.5 h-1.5 rounded-full ${isCritical ? 'bg-rose-500 animate-ping' : isCaution ? 'bg-amber-400' : 'bg-emerald-400'}`} />
                  {res.status}
                </span>
              </div>

              {/* Metric display strictly following science spec */}
              <div className="mt-4 flex items-baseline">
                <span className="text-3xl font-mono font-bold text-white tabular-nums">
                  {typeof res.currentValue === 'number' && res.currentValue > 1000
                    ? res.currentValue.toLocaleString()
                    : res.currentValue}
                </span>
                <span className="text-xs uppercase font-mono text-cyan-400 ml-2">
                  {res.unit}
                </span>
              </div>

              {/* Sub-telemetry strip */}
              <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono">
                <div>
                  <span className="text-slate-500 text-[10px] block uppercase">Daily Burn</span>
                  <span className="text-slate-300 tabular-nums">-{res.dailyConsumption.toLocaleString()}</span>
                </div>
                <div className="text-right">
                  <span className="text-slate-500 text-[10px] block uppercase">Days Margin</span>
                  <span className={`font-bold tabular-nums ${isCritical ? 'text-rose-400' : isCaution ? 'text-amber-400' : 'text-cyan-400'}`}>
                    ~{res.daysRemaining} Days
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Interactive Resource Allocation Simulator Console */}
      <div className="mt-10 bg-[#070d1e] border border-cyan-900/60 rounded-lg p-6 shadow-xl backdrop-blur-md">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-cyan-950 pb-4">
          <div className="flex items-center gap-2">
            <Sliders className="w-4 h-4 text-cyan-400" />
            <h3 className="font-display text-lg font-bold text-white">
              Interactive Power Grid Allocation Simulator
            </h3>
          </div>
          <button
            type="button"
            onClick={resetPower}
            className="flex items-center gap-1.5 text-xs font-mono text-slate-400 hover:text-cyan-300 transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Reset Baseline Grid</span>
          </button>
        </div>

        <p className="mt-3 text-xs sm:text-sm text-slate-300">
          Geothermal taps supply a finite 100,000 MW continuous feed. Adjust priority throttle to see real-time impact on biological life-support vs outbound orbital launch capacity.
        </p>

        {/* 3 Slider Rails */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6 font-mono text-xs">
          {/* Slider 1: Scrubbers */}
          <div className="space-y-2 bg-[#040711] p-4 rounded border border-slate-800">
            <div className="flex justify-between">
              <span className="text-slate-300 flex items-center gap-1">
                <Wind className="w-3.5 h-3.5 text-cyan-400" />
                Air/Water Filtration
              </span>
              <span className="text-cyan-400 font-bold tabular-nums">{scrubberPower}%</span>
            </div>
            <input
              type="range"
              min={10}
              max={80}
              value={scrubberPower}
              onChange={(e) => handleScrubberChange(parseInt(e.target.value, 10))}
              aria-label="Air and water filtration power allocation slider"
              className="w-full h-1.5 bg-slate-800 rounded appearance-none accent-cyan-400 cursor-pointer"
            />
            <span className="text-[10px] text-slate-500 block">Sustains redoubt pressurized lung chambers</span>
          </div>

          {/* Slider 2: Shuttles */}
          <div className="space-y-2 bg-[#040711] p-4 rounded border border-slate-800">
            <div className="flex justify-between">
              <span className="text-slate-300 flex items-center gap-1">
                <BatteryCharging className="w-3.5 h-3.5 text-blue-400" />
                Orbital Catapults
              </span>
              <span className="text-blue-400 font-bold tabular-nums">{shuttlePower}%</span>
            </div>
            <input
              type="range"
              min={10}
              max={80}
              value={shuttlePower}
              onChange={(e) => {
                setShuttlePower(parseInt(e.target.value, 10));
                audioSynth.playHover();
              }}
              aria-label="Orbital catapult power allocation slider"
              className="w-full h-1.5 bg-slate-800 rounded appearance-none accent-blue-400 cursor-pointer"
            />
            <span className="text-[10px] text-slate-500 block">Powers electromagnetic escape launch rails</span>
          </div>

          {/* Slider 3: Cryo Vaults */}
          <div className="space-y-2 bg-[#040711] p-4 rounded border border-slate-800">
            <div className="flex justify-between">
              <span className="text-slate-300 flex items-center gap-1">
                <Dna className="w-3.5 h-3.5 text-emerald-400" />
                Svalbard Cryo-Chambers
              </span>
              <span className="text-emerald-400 font-bold tabular-nums">{cryoPower}%</span>
            </div>
            <input
              type="range"
              min={5}
              max={50}
              value={cryoPower}
              onChange={(e) => {
                setCryoPower(parseInt(e.target.value, 10));
                audioSynth.playHover();
              }}
              aria-label="Svalbard cryo chambers power allocation slider"
              className="w-full h-1.5 bg-slate-800 rounded appearance-none accent-emerald-400 cursor-pointer"
            />
            <span className="text-[10px] text-slate-500 block">Preserves 3.2M Earth plant & animal genomes</span>
          </div>
        </div>

        {/* Dynamic Simulation Outcome Readout */}
        <div className="mt-5 p-4 rounded bg-[#03060f] border border-cyan-900/60 flex flex-wrap items-center justify-between gap-4 font-mono text-xs">
          <div>
            <span className="text-slate-500 block text-[10px] uppercase">Simulated Habitation Window</span>
            <span className="text-cyan-300 text-lg font-bold tabular-nums">
              {calculatedDaysRemaining} Earth Days
            </span>
          </div>
          <div>
            <span className="text-slate-500 block text-[10px] uppercase">Estimated Genetic Viability</span>
            <span className="text-emerald-400 text-lg font-bold tabular-nums">
              {geneticViabilityEstimate}% Retention
            </span>
          </div>
          <div>
            <span className="text-slate-500 block text-[10px] uppercase">Shuttle Frequency</span>
            <span className="text-white text-lg font-bold tabular-nums">
              {Math.max(1, Math.round((shuttlePower / 35) * 4))} Launches / 24h
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
