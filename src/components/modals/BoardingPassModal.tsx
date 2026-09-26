import React, { useState } from 'react';
import { ColonyOption } from '../../types/archive';
import { audioSynth } from '../../utils/audioSynth';
import { X, Check, Rocket, QrCode, Shield, Download, Printer, Sparkles } from 'lucide-react';

interface BoardingPassModalProps {
  colony: ColonyOption | null;
  onClose: () => void;
}

export const BoardingPassModal: React.FC<BoardingPassModalProps> = ({ colony, onClose }) => {
  const [passengerName, setPassengerName] = useState('');
  const [specialty, setSpecialty] = useState('Biosphere Engineering');
  const [isGenerated, setIsGenerated] = useState(false);
  const [berthNumber, setBerthNumber] = useState('');
  const [assignedGate, setAssignedGate] = useState('CATAPULT-03 / ATACAMA ARRAY');

  if (!colony) return null;

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!passengerName.trim()) return;

    audioSynth.playClick(1000);
    const randomSeat = `${colony.id.toUpperCase().slice(0, 3)}-${Math.floor(100 + Math.random() * 900)}-${['ALPHA', 'BETA', 'GAMMA', 'DELTA'][Math.floor(Math.random() * 4)]}`;
    setBerthNumber(randomSeat);
    setIsGenerated(true);
  };

  const handlePrint = () => {
    audioSynth.playClick(700);
    window.print();
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="boarding-pass-title"
    >
      <div className="relative w-full max-w-2xl bg-[#060b18] border border-cyan-500/80 rounded-2xl p-6 sm:p-8 shadow-[0_0_50px_rgba(6,182,212,0.3)] text-left">
        {/* Close Button */}
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

        {!isGenerated ? (
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 uppercase tracking-widest mb-1">
              <Rocket className="w-4 h-4 text-cyan-400" />
              <span>YEAR 2187 EVACUATION CORRIDOR</span>
            </div>
            <h2 id="boarding-pass-title" className="font-display text-2xl font-bold text-white">
              Reserve Berth on {colony.name}
            </h2>
            <p className="mt-1 text-xs text-slate-300">
              Destination: {colony.destination} · Survival Probability: {colony.survivalProbability}%
            </p>

            <form onSubmit={handleGenerate} className="mt-6 space-y-4">
              <div>
                <label htmlFor="passenger-name" className="block text-xs font-mono text-slate-300 mb-1">
                  Citizen / Passenger Full Name
                </label>
                <input
                  id="passenger-name"
                  type="text"
                  required
                  placeholder="e.g. Commander Julian Drake"
                  value={passengerName}
                  onChange={(e) => setPassengerName(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-[#040711] border border-cyan-900 rounded-lg text-sm text-white font-mono placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition-colors"
                />
              </div>

              <div>
                <label htmlFor="passenger-spec" className="block text-xs font-mono text-slate-300 mb-1">
                  Skill Designation for Colony Survival
                </label>
                <select
                  id="passenger-spec"
                  value={specialty}
                  onChange={(e) => setSpecialty(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-[#040711] border border-cyan-900 rounded-lg text-sm text-white font-mono focus:outline-none focus:border-cyan-400 transition-colors cursor-pointer"
                >
                  <option value="Biosphere Engineering">Biosphere Engineering & Hydroponics</option>
                  <option value="Antimatter Propulsion Technician">Antimatter Propulsion Technician</option>
                  <option value="Medical & Neural Preservation">Medical & Neural Preservation</option>
                  <option value="Terrestrial Heritage Archivist">Terrestrial Heritage Archivist</option>
                  <option value="Structural Tectonic Mechanics">Structural Tectonic Mechanics</option>
                  <option value="Cryogenic Sleep Specialist">Cryogenic Sleep Specialist</option>
                </select>
              </div>

              <div className="p-3.5 rounded-lg bg-cyan-950/30 border border-cyan-900/60 text-xs font-mono text-slate-300 flex items-start gap-2.5">
                <Shield className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <span>
                  By issuing this evacuation credential, your biological and digital records will be permanently mirrored into the Svalbard Master Vault and transmitted to the outbound Ark quantum core.
                </span>
              </div>

              <div className="pt-2 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-xs font-mono text-slate-400 hover:text-white transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 text-xs font-mono font-bold uppercase tracking-wider text-[#040711] bg-cyan-400 hover:bg-cyan-300 rounded transition-all shadow-[0_0_20px_rgba(34,211,238,0.4)]"
                >
                  Generate Evacuation Pass
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div>
            <div className="flex items-center justify-between border-b border-cyan-950 pb-3 mb-4">
              <div className="flex items-center gap-2 text-xs font-mono text-emerald-400">
                <Check className="w-4 h-4 text-emerald-400" />
                <span>BIOMETRIC CLEARANCE APPROVED · BERTH ASSIGNED</span>
              </div>
              <span className="text-xs font-mono text-cyan-400">HASH: SHA-512 VERIFIED</span>
            </div>

            {/* Official Holographic Boarding Pass */}
            <div className="relative border-2 border-cyan-400 rounded-xl bg-gradient-to-br from-[#071329] via-[#050b18] to-[#040711] p-6 shadow-[0_0_30px_rgba(6,182,212,0.3)] overflow-hidden">
              {/* Background watermark */}
              <div className="absolute right-2 bottom-2 opacity-5 pointer-events-none text-9xl font-display font-extrabold text-cyan-400">
                2187
              </div>

              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-cyan-800/80 pb-4 gap-2">
                <div>
                  <span className="text-[10px] font-mono tracking-widest text-cyan-400 uppercase block">
                    INTERSTELLAR SURVIVAL CREDENTIAL
                  </span>
                  <h3 className="font-display text-xl font-bold text-white">
                    {colony.name}
                  </h3>
                </div>
                <div className="text-right">
                  <span className="text-[10px] font-mono text-slate-400 block uppercase">EMBARKATION CORRIDOR</span>
                  <span className="text-xs font-mono font-bold text-amber-400">{assignedGate}</span>
                </div>
              </div>

              {/* Pass details */}
              <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-4 font-mono text-xs">
                <div>
                  <span className="text-slate-500 uppercase text-[10px] block">PASSENGER</span>
                  <span className="text-white font-bold text-sm block mt-0.5">{passengerName}</span>
                </div>
                <div>
                  <span className="text-slate-500 uppercase text-[10px] block">ASSIGNED BERTH</span>
                  <span className="text-cyan-300 font-bold text-sm block mt-0.5">{berthNumber}</span>
                </div>
                <div>
                  <span className="text-slate-500 uppercase text-[10px] block">SPECIALTY</span>
                  <span className="text-slate-300 block mt-0.5 truncate">{specialty}</span>
                </div>
                <div>
                  <span className="text-slate-500 uppercase text-[10px] block">GRAVITY RATING</span>
                  <span className="text-emerald-400 font-bold block mt-0.5">{colony.gravityStandard}</span>
                </div>
              </div>

              {/* Barcode & Security Hologram */}
              <div className="mt-6 pt-4 border-t border-cyan-800/60 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-white rounded">
                    <QrCode className="w-10 h-10 text-[#040711]" />
                  </div>
                  <div className="text-[10px] font-mono text-slate-400">
                    <span className="block text-white font-semibold">TOKEN: SEC-2187-EVAC-CORP</span>
                    <span>Transponder Link: 1420.405 MHz Active</span>
                  </div>
                </div>

                <div className="text-right font-mono text-[10px] text-slate-400">
                  <span className="text-cyan-400 font-bold block">STATUS: FLIGHT READY</span>
                  <span>Present at Launch Tube</span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
              <span className="text-xs font-mono text-slate-400 italic">
                "Carry the memories of Earth with honor."
              </span>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handlePrint}
                  className="px-4 py-2 rounded border border-slate-700 text-xs font-mono text-slate-300 hover:text-white hover:border-cyan-500 flex items-center gap-1.5 transition-colors"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print Pass</span>
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="px-5 py-2 rounded bg-cyan-400 hover:bg-cyan-300 text-[#040711] text-xs font-mono font-bold uppercase transition-colors"
                >
                  Confirm Registration
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
