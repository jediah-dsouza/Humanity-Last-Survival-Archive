import React, { useState, useEffect, useRef } from 'react';
import { HERO_IMAGE } from '../../data/archiveData';
import { audioSynth } from '../../utils/audioSynth';
import { Play, Pause, RotateCcw, AlertTriangle, Eye } from 'lucide-react';

interface DyingEarthCanvasProps {
  onYearChange?: (year: number) => void;
}

export const DyingEarthCanvas: React.FC<DyingEarthCanvasProps> = ({ onYearChange }) => {
  // Timeline: from 2100 (100% light) down to 2188 (0% light / complete darkness)
  // Default is 2187 (14% light remaining)
  const [decayYear, setDecayYear] = useState<number>(2187);
  const [isAutoDecaying, setIsAutoDecaying] = useState<boolean>(true);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Calculate darkness percentage (0 = bright living earth, 100 = total extinction darkness)
  const darknessPercent = Math.min(100, Math.max(0, ((decayYear - 2100) / 88) * 100));
  const lightPercent = Math.max(0, 100 - darknessPercent);

  // Auto animation of decay
  useEffect(() => {
    if (!isAutoDecaying) return;

    const interval = setInterval(() => {
      setDecayYear((prev) => {
        if (prev >= 2188) {
          // Loop gently
          return 2140;
        }
        return prev + 1;
      });
    }, 1800);

    return () => clearInterval(interval);
  }, [isAutoDecaying]);

  useEffect(() => {
    onYearChange?.(decayYear);
  }, [decayYear, onYearChange]);

  // Canvas starfield & orbital dust particle animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    const width = (canvas.width = canvas.offsetWidth);
    const height = (canvas.height = canvas.offsetHeight);

    interface Star {
      x: number;
      y: number;
      size: number;
      alpha: number;
      speed: number;
    }

    const stars: Star[] = Array.from({ length: 90 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 1.8 + 0.4,
      alpha: Math.random() * 0.8 + 0.2,
      speed: Math.random() * 0.3 + 0.05,
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw faint stars
      stars.forEach((star) => {
        ctx.fillStyle = `rgba(186, 230, 253, ${star.alpha})`;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();

        star.y += star.speed;
        if (star.y > height) {
          star.y = 0;
          star.x = Math.random() * width;
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsAutoDecaying(false);
    const val = parseInt(e.target.value, 10);
    setDecayYear(val);
    audioSynth.playHover();
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto flex flex-col items-center">
      {/* Background Star Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none w-full h-full opacity-60"
        aria-hidden="true"
      />

      {/* Earth Sphere Wrapper with Holographic Rings */}
      <div className="relative w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 rounded-full flex items-center justify-center p-2">
        {/* Outer Holographic Orbital Ring */}
        <div 
          className="absolute inset-0 rounded-full border border-cyan-500/20 border-dashed animate-[spin_60s_linear_infinite]"
          aria-hidden="true"
        />
        
        {/* Middle Telemetry Ring with Degree Ticks */}
        <div 
          className="absolute -inset-4 rounded-full border border-blue-500/15 pointer-events-none"
          aria-hidden="true"
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-2 text-[9px] font-mono text-cyan-400/80 bg-[#040711] px-1">
            000° NOR
          </div>
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1 text-[9px] font-mono text-cyan-400/80 bg-[#040711] px-1">
            180° SOU
          </div>
          <div className="absolute left-0 top-1/2 -translate-x-3 -translate-y-1/2 text-[9px] font-mono text-cyan-400/80 bg-[#040711] px-1">
            270° W
          </div>
          <div className="absolute right-0 top-1/2 translate-x-2 -translate-y-1/2 text-[9px] font-mono text-cyan-400/80 bg-[#040711] px-1">
            090° E
          </div>
        </div>

        {/* Inner Earth Sphere Container */}
        <div className="relative w-full h-full rounded-full overflow-hidden shadow-[0_0_50px_rgba(2,132,199,0.25)] border border-cyan-500/40">
          {/* Earth Photographic Texture Base */}
          <img
            src={HERO_IMAGE}
            alt="Planet Earth seen from high orbit in year 2187, entering terminal darkness"
            className="w-full h-full object-cover object-center filter transition-all duration-700 select-none pointer-events-none scale-105"
            referrerPolicy="no-referrer"
            style={{
              filter: `brightness(${Math.max(0.08, lightPercent / 100)}) contrast(${1 + (darknessPercent / 150)}) saturate(${Math.max(0.1, lightPercent / 100)})`,
            }}
          />

          {/* Dynamic Terminator Darkness Mask */}
          <div
            className="absolute inset-0 pointer-events-none transition-all duration-700"
            style={{
              background: `radial-gradient(circle at ${20 + (lightPercent * 0.4)}% 30%, transparent 0%, rgba(2, 6, 23, 0.4) 40%, rgba(4, 7, 17, ${0.4 + (darknessPercent / 100) * 0.58}) 75%, rgba(2, 4, 10, 0.98) 100%)`,
            }}
            aria-hidden="true"
          />

          {/* Atmospheric Glow Rim */}
          <div 
            className="absolute inset-0 rounded-full pointer-events-none transition-opacity duration-700 shadow-[inset_0_0_40px_rgba(56,189,248,0.4)]"
            style={{ opacity: Math.max(0.1, (lightPercent / 100) * 0.8) }}
            aria-hidden="true"
          />

          {/* Holographic Scanline Overlay on the Sphere */}
          <div className="absolute inset-0 holo-scanlines pointer-events-none opacity-40" aria-hidden="true" />

          {/* Extinction Horizon Indicator Badge inside Earth */}
          <div className="absolute bottom-4 inset-x-0 flex justify-center pointer-events-none">
            <div className="bg-[#040711]/85 backdrop-blur-md border border-cyan-800/60 px-3 py-1 rounded text-center">
              <span className="text-[10px] font-mono tracking-widest text-cyan-300 uppercase block">
                TERRESTRIAL RETENTION
              </span>
              <span className="text-sm font-mono font-bold text-white tabular-nums">
                {lightPercent.toFixed(1)}% LUMINESCENCE
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Decay Controller Bar */}
      <div className="mt-8 w-full max-w-lg bg-[#070b19]/90 border border-cyan-900/60 rounded-lg p-4 shadow-xl backdrop-blur-md">
        <div className="flex items-center justify-between gap-3 text-xs mb-2">
          <div className="flex items-center gap-1.5 text-cyan-400 font-mono">
            <Eye className="w-3.5 h-3.5 text-cyan-400" />
            <span className="tracking-wide">PLANETARY DECAY TIMELINE</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => {
                setIsAutoDecaying(!isAutoDecaying);
                audioSynth.playClick(isAutoDecaying ? 500 : 800);
              }}
              className="flex items-center gap-1 text-[11px] font-mono px-2 py-0.5 rounded border border-cyan-800 text-slate-300 hover:text-cyan-300 hover:border-cyan-600 transition-colors"
              title={isAutoDecaying ? 'Pause simulation' : 'Auto-simulate decay'}
            >
              {isAutoDecaying ? (
                <>
                  <Pause className="w-3 h-3 text-amber-400" />
                  <span>PAUSE</span>
                </>
              ) : (
                <>
                  <Play className="w-3 h-3 text-cyan-400" />
                  <span>SIMULATE</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={() => {
                setDecayYear(2187);
                setIsAutoDecaying(false);
                audioSynth.playClick(600);
              }}
              className="p-1 text-slate-400 hover:text-cyan-300 transition-colors"
              title="Reset to 2187"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Range Slider for the Year */}
        <div className="space-y-1.5">
          <div className="flex justify-between items-center text-[11px] font-mono text-slate-400">
            <span>2100 (Temperate)</span>
            <span className="text-cyan-300 font-bold text-sm bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-800/80">
              YEAR {decayYear}
            </span>
            <span>2188 (Total Dark)</span>
          </div>

          <input
            type="range"
            min={2100}
            max={2188}
            value={decayYear}
            onChange={handleSliderChange}
            aria-label="Simulation year slider"
            className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400 hover:accent-cyan-300 transition-all"
          />
        </div>

        {/* Live Status Description */}
        <div className="mt-3 pt-2 border-t border-cyan-950/80 flex items-center justify-between text-[11px] font-mono">
          <div className="flex items-center gap-1.5 text-slate-300">
            <span className={`w-2 h-2 rounded-full ${decayYear >= 2187 ? 'bg-rose-500 animate-pulse' : decayYear > 2150 ? 'bg-amber-400' : 'bg-emerald-400'}`} />
            <span>
              {decayYear >= 2187 
                ? 'CRITICAL: Terminal Atmospheric Collapse' 
                : decayYear > 2150 
                ? 'WARNING: Ocean Acidification & Dust Storms' 
                : 'STABLE: Pre-Crisis Biosphere'}
            </span>
          </div>
          <span className="text-cyan-400 font-semibold">
            {decayYear >= 2187 ? 'EVACUATING' : decayYear > 2150 ? 'DEGRADING' : 'HABITABLE'}
          </span>
        </div>
      </div>
    </div>
  );
};
