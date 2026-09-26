import React, { useState } from 'react';
import { POPULATION_SAMPLE_RECORDS } from '../../data/archiveData';
import { PopulationRecord } from '../../types/archive';
import { audioSynth } from '../../utils/audioSynth';
import { Users, Search, UserCheck, Heart, Sparkles, Filter, ChevronRight } from 'lucide-react';

export const PopulationTrackerSection: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterColony, setFilterColony] = useState('ALL');
  const [records, setRecords] = useState<PopulationRecord[]>(POPULATION_SAMPLE_RECORDS);
  const [showAddCitizen, setShowAddCitizen] = useState(false);
  const [newCitizenName, setNewCitizenName] = useState('');
  const [newCitizenSpec, setNewCitizenSpec] = useState('');
  const [newCitizenColony, setNewCitizenColony] = useState('Kepler-9 Haven Ark');

  const filteredRecords = records.filter((rec) => {
    const matchesQuery = 
      rec.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      rec.origin.toLowerCase().includes(searchQuery.toLowerCase()) ||
      rec.specialization.toLowerCase().includes(searchQuery.toLowerCase()) ||
      rec.id.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesColony = filterColony === 'ALL' || rec.assignedColony.includes(filterColony);

    return matchesQuery && matchesColony;
  });

  const handleRegisterCitizen = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCitizenName.trim()) return;

    const newRecord: PopulationRecord = {
      id: `HUM-2187-${Math.floor(1000 + Math.random() * 9000)}`,
      name: newCitizenName.trim(),
      age: 26,
      origin: 'Global Redoubt Registry',
      specialization: newCitizenSpec.trim() || 'Biosphere Preservation Trainee',
      assignedColony: newCitizenColony,
      status: 'CLEARED'
    };

    setRecords([newRecord, ...records]);
    setNewCitizenName('');
    setNewCitizenSpec('');
    setShowAddCitizen(false);
    audioSynth.playClick(1000);
  };

  return (
    <section 
      id="population" 
      className="relative py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-cyan-950/60"
      aria-label="Last Human Population Tracker and Registry"
    >
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-cyan-950 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 uppercase tracking-widest mb-1.5">
            <span>03. GLOBAL CENSUS</span>
            <span aria-hidden="true">·</span>
            <span>CIVILIZATION MANIFEST</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-white">
            Global Population Census & Registry
          </h2>
          <p className="mt-2 text-sm text-slate-300 max-w-2xl">
            From 8.2 billion in the 21st century to 348,920 registered souls today. Every single living human has been cataloged, assigned a survival berth, and linked to our planetary genome archive.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="bg-[#070d1e] border border-cyan-900/80 px-4 py-2 rounded-lg text-right">
            <span className="text-[10px] font-mono uppercase text-slate-500 block">TOTAL LIVING SOULS</span>
            <span className="font-mono text-2xl font-bold text-cyan-300 tabular-nums flex items-center justify-end gap-2">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-rose-500" />
              </span>
              348,920
            </span>
          </div>
        </div>
      </div>

      {/* Demographic Breakdown Overview */}
      <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-mono">
        <div className="bg-[#060b18] border border-cyan-950 p-3.5 rounded-lg">
          <span className="text-slate-500 uppercase text-[10px] block">Youth & Genetic Next-Gen</span>
          <span className="text-white text-lg font-bold tabular-nums block mt-1">68,400</span>
          <span className="text-cyan-400 text-[11px]">19.6% Priority Ark Allocation</span>
        </div>
        <div className="bg-[#060b18] border border-cyan-950 p-3.5 rounded-lg">
          <span className="text-slate-500 uppercase text-[10px] block">Closed-Loop Engineers</span>
          <span className="text-white text-lg font-bold tabular-nums block mt-1">112,800</span>
          <span className="text-cyan-400 text-[11px]">32.3% Life-Support Operations</span>
        </div>
        <div className="bg-[#060b18] border border-cyan-950 p-3.5 rounded-lg">
          <span className="text-slate-500 uppercase text-[10px] block">Agronomists & Biologists</span>
          <span className="text-white text-lg font-bold tabular-nums block mt-1">84,120</span>
          <span className="text-cyan-400 text-[11px]">24.1% Terraforming Task Force</span>
        </div>
        <div className="bg-[#060b18] border border-cyan-950 p-3.5 rounded-lg">
          <span className="text-slate-500 uppercase text-[10px] block">Archivists & Medical</span>
          <span className="text-white text-lg font-bold tabular-nums block mt-1">83,600</span>
          <span className="text-cyan-400 text-[11px]">24.0% Heritage & Health</span>
        </div>
      </div>

      {/* Interactive Manifest Search & Table */}
      <div className="mt-8 bg-[#060b18] border border-cyan-900/60 rounded-lg p-5 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-cyan-950">
          {/* Search bar */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search manifest by citizen name, origin, or specialty..."
              aria-label="Search manifest by citizen name, origin, or specialty"
              className="w-full pl-9 pr-4 py-2 bg-[#040711] border border-slate-800 rounded text-xs font-mono text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
            />
          </div>

          {/* Colony Filter & Add Citizen action */}
          <div className="flex items-center gap-2">
            <select
              value={filterColony}
              onChange={(e) => setFilterColony(e.target.value)}
              aria-label="Filter by assigned colony"
              className="px-3 py-2 bg-[#040711] border border-slate-800 rounded text-xs font-mono text-slate-300 focus:outline-none focus:border-cyan-500 cursor-pointer"
            >
              <option value="ALL">All Colonies</option>
              <option value="Kepler">Kepler-9 Haven</option>
              <option value="Zion">Subterranean Zion</option>
              <option value="Lunar">Lunar Bastion</option>
            </select>

            <button
              type="button"
              onClick={() => setShowAddCitizen(!showAddCitizen)}
              className="px-3 py-2 text-xs font-mono font-medium text-cyan-300 bg-cyan-950/60 border border-cyan-800 rounded hover:bg-cyan-900 transition-colors"
            >
              {showAddCitizen ? 'Close' : '+ Register Name'}
            </button>
          </div>
        </div>

        {/* Add Citizen Form Dropdown */}
        {showAddCitizen && (
          <form onSubmit={handleRegisterCitizen} className="my-4 p-4 rounded bg-[#040711] border border-cyan-900/80 grid grid-cols-1 sm:grid-cols-4 gap-3">
            <div>
              <label htmlFor="reg-name" className="text-[10px] font-mono text-slate-400 block mb-1">Full Name</label>
              <input
                id="reg-name"
                type="text"
                required
                value={newCitizenName}
                onChange={(e) => setNewCitizenName(e.target.value)}
                placeholder="e.g. Marcus Vance"
                className="w-full px-2.5 py-1.5 bg-[#060b18] border border-slate-800 rounded text-xs font-mono text-white"
              />
            </div>
            <div>
              <label htmlFor="reg-spec" className="text-[10px] font-mono text-slate-400 block mb-1">Specialization</label>
              <input
                id="reg-spec"
                type="text"
                value={newCitizenSpec}
                onChange={(e) => setNewCitizenSpec(e.target.value)}
                placeholder="e.g. Atmospheric Chemistry"
                className="w-full px-2.5 py-1.5 bg-[#060b18] border border-slate-800 rounded text-xs font-mono text-white"
              />
            </div>
            <div>
              <label htmlFor="reg-colony" className="text-[10px] font-mono text-slate-400 block mb-1">Assigned Colony</label>
              <select
                id="reg-colony"
                value={newCitizenColony}
                onChange={(e) => setNewCitizenColony(e.target.value)}
                className="w-full px-2.5 py-1.5 bg-[#060b18] border border-slate-800 rounded text-xs font-mono text-slate-300"
              >
                <option value="Kepler-9 Haven Ark">Kepler-9 Haven Ark</option>
                <option value="Subterranean Zion Core">Subterranean Zion Core</option>
                <option value="Lunar Bastion Citadel">Lunar Bastion Citadel</option>
              </select>
            </div>
            <div className="flex items-end">
              <button
                type="submit"
                className="w-full py-1.5 px-3 bg-cyan-400 hover:bg-cyan-300 text-[#040711] font-mono text-xs font-bold rounded uppercase transition-colors"
              >
                Commit to Manifest
              </button>
            </div>
          </form>
        )}

        {/* Results count */}
        <div className="my-3 text-[11px] font-mono text-slate-400 flex justify-between items-center">
          <span>Displaying {filteredRecords.length} registered survivors</span>
          <span className="text-cyan-400">STATUS: QUANTUM ENCRYPTED SHA-512</span>
        </div>

        {/* Table layout (responsive) */}
        <div className="overflow-x-auto">
          <table className="w-full text-left font-mono text-xs">
            <thead>
              <tr className="border-b border-slate-800 text-slate-500 uppercase text-[10px]">
                <th className="py-2.5 px-3">Citizen ID</th>
                <th className="py-2.5 px-3">Name & Age</th>
                <th className="py-2.5 px-3">Terran Origin</th>
                <th className="py-2.5 px-3">Specialization</th>
                <th className="py-2.5 px-3">Assigned Ark</th>
                <th className="py-2.5 px-3 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filteredRecords.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-slate-500">
                    No matching registry records found for query "{searchQuery}".
                  </td>
                </tr>
              ) : (
                filteredRecords.map((person) => (
                  <tr key={person.id} className="hover:bg-cyan-950/20 transition-colors">
                    <td className="py-3 px-3 text-cyan-400 font-semibold">{person.id}</td>
                    <td className="py-3 px-3">
                      <span className="text-white font-medium block">{person.name}</span>
                      <span className="text-[10px] text-slate-500">Age {person.age}</span>
                    </td>
                    <td className="py-3 px-3 text-slate-300">{person.origin}</td>
                    <td className="py-3 px-3 text-slate-400">{person.specialization}</td>
                    <td className="py-3 px-3 text-cyan-300">{person.assignedColony}</td>
                    <td className="py-3 px-3 text-right">
                      <span 
                        className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-semibold border"
                        style={{
                          borderColor: person.status === 'CLEARED' ? 'rgba(16,185,129,0.4)' : person.status === 'IN_TRANSIT' ? 'rgba(56,189,248,0.4)' : 'rgba(245,158,11,0.4)',
                          color: person.status === 'CLEARED' ? '#34d399' : person.status === 'IN_TRANSIT' ? '#38bdf8' : '#fbbf24',
                          backgroundColor: 'rgba(4,7,17,0.7)'
                        }}
                      >
                        <span className={`w-1 h-1 rounded-full ${person.status === 'CLEARED' ? 'bg-emerald-400' : person.status === 'IN_TRANSIT' ? 'bg-cyan-400 animate-pulse' : 'bg-amber-400'}`} />
                        {person.status}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};
