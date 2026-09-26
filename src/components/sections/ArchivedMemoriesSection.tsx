import React, { useState } from 'react';
import { ARCHIVED_MEMORIES, MEMORY_CAPSULE_IMAGE } from '../../data/archiveData';
import { ArchiveMemory } from '../../types/archive';
import { audioSynth } from '../../utils/audioSynth';
import { Volume2, VolumeX, Play, Square, Heart, PlusCircle, BookOpen, Sparkles, Radio } from 'lucide-react';

interface ArchivedMemoriesSectionProps {
  onOpenSubmitMemory: () => void;
}

export const ArchivedMemoriesSection: React.FC<ArchivedMemoriesSectionProps> = ({
  onOpenSubmitMemory,
}) => {
  const [memories, setMemories] = useState<ArchiveMemory[]>(ARCHIVED_MEMORIES);
  const [activePlayingId, setActivePlayingId] = useState<string | null>(null);
  const [expandedMemoryId, setExpandedMemoryId] = useState<string | null>(ARCHIVED_MEMORIES[0].id);

  const togglePlayMemory = (mem: ArchiveMemory) => {
    if (activePlayingId === mem.id) {
      audioSynth.stopNoise();
      setActivePlayingId(null);
    } else {
      setActivePlayingId(mem.id);
      if (mem.soundType) {
        audioSynth.playMemoryAudio(mem.soundType, 12);
      } else {
        audioSynth.playMemoryAudio('chime', 8);
      }
    }
  };

  const handleLike = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    audioSynth.playClick(1050);
    setMemories((prev) =>
      prev.map((m) => (m.id === id ? { ...m, likesCount: m.likesCount + 1 } : m))
    );
  };

  return (
    <section 
      id="archived-memories" 
      className="relative py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-cyan-950/60"
      aria-label="Humanity's Archived Memories Vault"
    >
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-cyan-950 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 uppercase tracking-widest mb-1.5">
            <span>04. HERITAGE REPOSITORY</span>
            <span aria-hidden="true">·</span>
            <span>NEURAL & SENSORY ARCHIVE</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-white">
            Archived Memories of the Living World
          </h2>
          <p className="mt-2 text-sm text-slate-300 max-w-2xl">
            Recorded impressions of rain, ocean swells, birdsong, and human laughter preserved for future generations who will awaken under foreign suns.
          </p>
        </div>

        <div>
          <button
            type="button"
            onClick={() => {
              audioSynth.playClick(880);
              onOpenSubmitMemory();
            }}
            className="px-4 py-2.5 text-xs font-mono font-bold uppercase tracking-wider text-[#040711] bg-cyan-400 hover:bg-cyan-300 rounded transition-all shadow-[0_0_15px_rgba(34,211,238,0.3)] flex items-center gap-2 active:scale-95 cursor-pointer"
          >
            <PlusCircle className="w-4 h-4 text-[#040711]" />
            <span>Engrave Your Memory</span>
          </button>
        </div>
      </div>

      {/* Featured Holographic Memory Capsule Banner */}
      <div className="mt-8 relative rounded-xl border border-cyan-900/60 bg-[#060b18] overflow-hidden shadow-2xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
          <div className="lg:col-span-5 h-64 lg:h-80 relative overflow-hidden">
            <img
              src={MEMORY_CAPSULE_IMAGE}
              alt="Holographic memory cylinder projecting historical terrestrial memories"
              className="w-full h-full object-cover object-center filter saturate-110"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-transparent via-[#060b18]/40 to-[#060b18] pointer-events-none" />
            <div className="absolute top-3 left-3 bg-[#040711]/90 backdrop-blur border border-cyan-800/80 px-2.5 py-1 rounded text-[10px] font-mono text-cyan-300">
              VAULT CHAMBER #04-GAMMA
            </div>
          </div>

          <div className="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-center">
            <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 mb-2">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>PERMANENT QUANTUM SAPPHIRE DISK</span>
              <span aria-hidden="true">·</span>
              <span className="text-slate-400">RATED FOR 100,000 YEARS</span>
            </div>

            <h3 className="font-display text-2xl font-bold text-white">
              The Sensory Vault of Pre-Extinction Earth
            </h3>
            <p className="mt-2 text-sm text-slate-300 leading-relaxed">
              Before the oceans boiled and the atmosphere turned caustic, hundreds of thousands of individuals encoded their most precious sensory moments. These audio transmissions are broadcast continuously across the solar system hydrogen line.
            </p>

            <div className="mt-5 flex items-center gap-3 font-mono text-xs text-slate-400">
              <span>Transmissions Archived: <strong className="text-white">1,420,891</strong></span>
              <span aria-hidden="true">·</span>
              <span>Audio Purity: <strong className="text-cyan-400">192 kHz Lossless</strong></span>
            </div>
          </div>
        </div>
      </div>

      {/* Memory Logs Grid */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-5">
        {memories.map((mem) => {
          const isPlaying = activePlayingId === mem.id;
          const isExpanded = expandedMemoryId === mem.id;

          return (
            <div
              key={mem.id}
              className={`p-5 rounded-lg border transition-all ${
                isPlaying
                  ? 'bg-[#09152b] border-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.2)]'
                  : 'bg-[#060b18] border-cyan-950/70 hover:border-cyan-800/80'
              }`}
            >
              {/* Unboxed Metadata Header */}
              <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                <div className="flex items-center gap-2">
                  <span className="text-cyan-400 font-semibold">YEAR {mem.year}</span>
                  <span aria-hidden="true">·</span>
                  <span>{mem.category}</span>
                  <span aria-hidden="true">·</span>
                  <span className="text-slate-500">{mem.originLocation}</span>
                </div>

                <button
                  type="button"
                  onClick={(e) => handleLike(mem.id, e)}
                  className="flex items-center gap-1 text-slate-400 hover:text-rose-400 transition-colors text-[11px]"
                  title="Preserve this memory"
                >
                  <Heart className="w-3.5 h-3.5 hover:fill-rose-400" />
                  <span className="tabular-nums">{mem.likesCount.toLocaleString()}</span>
                </button>
              </div>

              {/* Title & Author */}
              <h3 className="font-display text-lg font-bold text-white mt-2">
                {mem.title}
              </h3>
              <p className="text-xs font-mono text-cyan-300/80 mt-0.5">
                Archived by {mem.author}
              </p>

              {/* Excerpt / Full Text */}
              <p className="mt-3 text-sm text-slate-300 leading-relaxed italic">
                "{isExpanded ? mem.fullText : mem.excerpt}"
              </p>

              {/* Interactive Audio Player Bar */}
              <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between gap-4 font-mono text-xs">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => togglePlayMemory(mem)}
                    className={`p-2 rounded-full transition-all flex items-center justify-center ${
                      isPlaying
                        ? 'bg-rose-500 text-white animate-pulse'
                        : 'bg-cyan-500/20 text-cyan-300 hover:bg-cyan-400 hover:text-[#040711]'
                    }`}
                    title={isPlaying ? 'Stop playback' : 'Synthesize recorded atmosphere'}
                  >
                    {isPlaying ? <Square className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                  </button>

                  <div className="flex flex-col">
                    <span className="text-slate-300 text-[11px]">
                      {isPlaying ? 'TRANSMITTING SENSORY CARRIER' : 'Synthesized Audio Track'}
                    </span>
                    {mem.duration && (
                      <span className="text-[10px] text-slate-500">{mem.duration} duration</span>
                    )}
                  </div>
                </div>

                {/* Animated waveform visualizer when playing */}
                {isPlaying && (
                  <div className="flex items-end gap-0.5 h-4" aria-hidden="true">
                    <span className="w-1 bg-cyan-400 animate-[pulse_0.4s_ease-in-out_infinite] h-3" />
                    <span className="w-1 bg-cyan-300 animate-[pulse_0.6s_ease-in-out_infinite] h-4" />
                    <span className="w-1 bg-blue-400 animate-[pulse_0.3s_ease-in-out_infinite] h-2" />
                    <span className="w-1 bg-cyan-400 animate-[pulse_0.5s_ease-in-out_infinite] h-3.5" />
                    <span className="w-1 bg-cyan-200 animate-[pulse_0.4s_ease-in-out_infinite] h-2.5" />
                  </div>
                )}

                {/* Expand / Collapse Full Memory */}
                <button
                  type="button"
                  onClick={() => {
                    setExpandedMemoryId(isExpanded ? null : mem.id);
                    audioSynth.playClick(700);
                  }}
                  className="text-[11px] text-cyan-400 hover:text-cyan-300 underline underline-offset-2"
                >
                  {isExpanded ? 'Less' : 'Read Full Log'}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
