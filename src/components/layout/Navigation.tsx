import React, { useState } from 'react';
import { Volume2, VolumeX, Menu, X, Radio } from 'lucide-react';
import { audioSynth } from '../../utils/audioSynth';

interface NavigationProps {
  onOpenColonySelector: () => void;
  audioActive: boolean;
  onToggleAudio: () => void;
}

export const Navigation: React.FC<NavigationProps> = ({
  onOpenColonySelector,
  audioActive,
  onToggleAudio,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Earth Status', href: '#earth-status' },
    { label: 'Evacuation Clock', href: '#evacuation-window' },
    { label: 'Surviving Cities', href: '#surviving-cities' },
    { label: 'Resources', href: '#resources' },
    { label: 'Population', href: '#population' },
    { label: 'Archived Memories', href: '#archived-memories' },
  ];

  const handleLinkClick = (href: string) => {
    audioSynth.playClick(660);
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-cyan-950/60 bg-[#040711]/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Zone 1: Single text element wordmark */}
        <a 
          href="#" 
          onClick={() => audioSynth.playClick(880)}
          className="font-display text-xl font-bold tracking-wider text-cyan-400 hover:text-cyan-300 transition-colors flex items-center gap-2 group"
        >
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-500"></span>
          </span>
          <span>LAST ARCHIVE 2187</span>
        </a>

        {/* Zone 2: 4-6 clean text navigation links */}
        <nav className="hidden xl:flex items-center gap-6 text-sm font-medium text-slate-300">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => {
                e.preventDefault();
                handleLinkClick(link.href);
              }}
              onMouseEnter={() => audioSynth.playHover()}
              className="hover:text-cyan-400 transition-colors py-1 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-cyan-400 hover:after:w-full after:transition-all after:duration-200"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: 1-2 primary actions */}
        <div className="flex items-center gap-3">
          {/* Audio toggle button */}
          <button
            type="button"
            onClick={onToggleAudio}
            aria-label={audioActive ? 'Mute atmosphere audio' : 'Unmute atmosphere audio'}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded border border-cyan-900/60 bg-cyan-950/30 text-cyan-400 hover:bg-cyan-900/40 text-xs font-mono transition-colors"
            title="Toggle Synthesizer Atmosphere"
          >
            {audioActive ? <Volume2 className="h-4 w-4 text-cyan-400" /> : <VolumeX className="h-4 w-4 text-slate-500" />}
            <span className="hidden sm:inline">{audioActive ? 'AUDIO ON' : 'MUTED'}</span>
          </button>

          {/* Primary CTA */}
          <button
            type="button"
            onClick={() => {
              audioSynth.playClick(990);
              onOpenColonySelector();
            }}
            className="whitespace-nowrap px-4 py-2 text-xs font-semibold uppercase tracking-wider text-[#040711] bg-gradient-to-r from-cyan-400 to-blue-400 rounded hover:from-cyan-300 hover:to-blue-300 transition-all shadow-[0_0_15px_rgba(34,211,238,0.35)] flex items-center gap-1.5 active:scale-95"
          >
            <Radio className="h-3.5 w-3.5" />
            <span>Choose Colony</span>
          </button>

          {/* Mobile hamburger button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle navigation menu"
            className="xl:hidden p-2 text-slate-400 hover:text-cyan-400 hover:bg-slate-900 rounded"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden border-b border-cyan-950/80 bg-[#040711]/98 px-4 py-5 shadow-2xl backdrop-blur-xl animate-in slide-in-from-top-2 duration-150">
          <nav className="flex flex-col space-y-3 font-mono text-sm">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkClick(link.href);
                }}
                className="block px-3 py-2 text-slate-300 hover:text-cyan-300 hover:bg-cyan-950/40 rounded transition-colors"
              >
                {link.label}
              </a>
            ))}
            <div className="pt-2 border-t border-slate-800">
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenColonySelector();
                }}
                className="w-full py-2.5 text-xs font-semibold uppercase tracking-wider text-[#040711] bg-cyan-400 rounded hover:bg-cyan-300 transition-colors text-center"
              >
                Choose Colony Berth
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
