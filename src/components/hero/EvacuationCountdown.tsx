import React, { useState, useEffect } from 'react';
import { audioSynth } from '../../utils/audioSynth';
import { AlertCircle, Clock, ShieldAlert, Rocket, ArrowUpRight } from 'lucide-react';

interface EvacuationCountdownProps {
  onExploreColonies: () => void;
}

export const EvacuationCountdown: React.FC<EvacuationCountdownProps> = ({ onExploreColonies }) => {
  // Evacuation deadline: Exactly 18 days, 14 hours, 22 minutes from arbitrary reference in 2187
  // We'll calculate a live ticking countdown relative to the user's session so it always ticks dynamically!
  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
    millis: number;
  }>({
    days: 18,
    hours: 14,
    minutes: 36,
    seconds: 42,
    millis: 940,
  });

  useEffect(() => {
    // Reference countdown target: 18 days from current epoch
    const targetEpoch = Date.now() + (18 * 24 * 3600 + 14 * 3600 + 36 * 60 + 42) * 1000;

    const interval = setInterval(() => {
      const now = Date.now();
      const diff = Math.max(0, targetEpoch - now);

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);
      const millis = Math.floor((diff % 1000) / 10);

      setTimeLeft({ days, hours, minutes, seconds, millis });
    }, 53);

    return () => clearInterval(interval);
  }, []);

  const handleBeep = () => {
    audioSynth.playPulse(true);
  };

  return (
    <section 
      id="evacuation-window" 
      className="relative w-full border-y border-cyan-950/80 bg-gradient-to-b from-[#040711] via-[#060b18] to-[#040711] py-12 px-4 sm:px-6 lg:px-8"
      aria-label="Evacuation Window Countdown"
    >
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
          {/* Left: Section Context & Urgency */}
          <div className="max-w-xl text-center lg:text-left">
            <div className="inline-flex items-center gap-2 text-xs font-mono text-cyan-400 mb-2">
              <span className="h-2 w-2 rounded-full bg-cyan-400 animate-ping" />
              <span>TERMINAL ATMOSPHERIC DISSOLUTION</span>
              <span aria-hidden="true">·</span>
              <span className="text-slate-400">STAGE 4 ESCAPE CORRIDOR</span>
            </div>

            <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white text-balance">
              The Evacuation Window Closes Soon
            </h2>

            <p className="mt-2 text-sm sm:text-base text-slate-300 leading-relaxed">
              Planetary ionosphere decay has reached the irreversible threshold. After this window concludes, atmospheric turbulence will prevent all orbital transits. Every remaining soul must be aboard an ark or sealed beneath the Mariana crust.
            </p>

            <div className="mt-4 flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs font-mono text-slate-400">
              <span className="flex items-center gap-1.5 text-rose-400 font-semibold">
                <ShieldAlert className="w-4 h-4 text-rose-500" />
                SHUTTLE LAUNCHES: HOURLY (ATACAMA ARRAY)
              </span>
              <span aria-hidden="true">·</span>
              <span className="text-cyan-300">
                ACTIVE ORBITAL SLOTS: 25,830 REMAINING
              </span>
            </div>
          </div>

          {/* Right: The High-Precision Ticker Cards */}
          <div className="flex flex-col items-center">
            <div className="grid grid-cols-5 gap-2 sm:gap-3 text-center">
              {/* Days */}
              <div className="flex flex-col bg-[#070d1e] border border-cyan-900/60 p-2 sm:p-4 rounded-lg shadow-[0_0_15px_rgba(6,182,212,0.15)] min-w-[55px] sm:min-w-[85px]">
                <span className="font-mono text-2xl sm:text-4xl md:text-5xl font-bold text-cyan-300 tabular-nums">
                  {String(timeLeft.days).padStart(2, '0')}
                </span>
                <span className="text-[10px] sm:text-xs font-mono uppercase tracking-wider text-slate-400 mt-1">
                  DAYS
                </span>
              </div>

              {/* Hours */}
              <div className="flex flex-col bg-[#070d1e] border border-cyan-900/60 p-2 sm:p-4 rounded-lg shadow-[0_0_15px_rgba(6,182,212,0.15)] min-w-[55px] sm:min-w-[85px]">
                <span className="font-mono text-2xl sm:text-4xl md:text-5xl font-bold text-white tabular-nums">
                  {String(timeLeft.hours).padStart(2, '0')}
                </span>
                <span className="text-[10px] sm:text-xs font-mono uppercase tracking-wider text-slate-400 mt-1">
                  HOURS
                </span>
              </div>

              {/* Minutes */}
              <div className="flex flex-col bg-[#070d1e] border border-cyan-900/60 p-2 sm:p-4 rounded-lg shadow-[0_0_15px_rgba(6,182,212,0.15)] min-w-[55px] sm:min-w-[85px]">
                <span className="font-mono text-2xl sm:text-4xl md:text-5xl font-bold text-white tabular-nums">
                  {String(timeLeft.minutes).padStart(2, '0')}
                </span>
                <span className="text-[10px] sm:text-xs font-mono uppercase tracking-wider text-slate-400 mt-1">
                  MINUTES
                </span>
              </div>

              {/* Seconds */}
              <div className="flex flex-col bg-[#070d1e] border border-cyan-900/60 p-2 sm:p-4 rounded-lg shadow-[0_0_15px_rgba(6,182,212,0.15)] min-w-[55px] sm:min-w-[85px]">
                <span className="font-mono text-2xl sm:text-4xl md:text-5xl font-bold text-cyan-400 tabular-nums">
                  {String(timeLeft.seconds).padStart(2, '0')}
                </span>
                <span className="text-[10px] sm:text-xs font-mono uppercase tracking-wider text-slate-400 mt-1">
                  SECONDS
                </span>
              </div>

              {/* Millis */}
              <div className="flex flex-col bg-[#070d1e] border border-cyan-900/60 p-2 sm:p-4 rounded-lg shadow-[0_0_15px_rgba(6,182,212,0.15)] min-w-[55px] sm:min-w-[85px]">
                <span className="font-mono text-2xl sm:text-4xl md:text-5xl font-bold text-amber-400 tabular-nums">
                  {String(timeLeft.millis).padStart(2, '0')}
                </span>
                <span className="text-[10px] sm:text-xs font-mono uppercase tracking-wider text-slate-400 mt-1">
                  MS
                </span>
              </div>
            </div>

            {/* Countdown Action bar */}
            <div className="mt-4 flex items-center gap-3">
              <button
                type="button"
                onClick={() => {
                  handleBeep();
                  onExploreColonies();
                }}
                className="px-5 py-2.5 text-xs font-mono font-bold uppercase tracking-wider text-[#040711] bg-cyan-400 hover:bg-cyan-300 rounded transition-all shadow-[0_0_20px_rgba(34,211,238,0.4)] flex items-center gap-2 active:scale-95"
              >
                <Rocket className="w-4 h-4 text-[#040711]" />
                <span>Reserve Colony Passage</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>

              <button
                type="button"
                onClick={handleBeep}
                className="px-3 py-2 text-xs font-mono text-slate-400 hover:text-cyan-300 rounded border border-slate-800 hover:border-cyan-800 transition-colors"
                title="Verify Orbital Telemetry Link"
              >
                PULSE LINK
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
