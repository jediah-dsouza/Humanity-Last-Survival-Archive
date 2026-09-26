import React, { useState } from 'react';
import { audioSynth } from '../../utils/audioSynth';
import { X, Sparkles, Send, CheckCircle2 } from 'lucide-react';

interface SubmitMemoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitMemory: (mem: { title: string; author: string; text: string; location: string }) => void;
}

export const SubmitMemoryModal: React.FC<SubmitMemoryModalProps> = ({
  isOpen,
  onClose,
  onSubmitMemory,
}) => {
  const [author, setAuthor] = useState('');
  const [location, setLocation] = useState('');
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !text.trim()) return;

    audioSynth.playClick(960);
    onSubmitMemory({
      title: title.trim(),
      author: author.trim() || 'Anonymous Earth Voyager',
      location: location.trim() || 'Terran Surface',
      text: text.trim(),
    });

    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      onClose();
    }, 1800);
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="submit-memory-title"
    >
      <div className="relative w-full max-w-xl bg-[#060b18] border border-cyan-500/80 rounded-2xl p-6 sm:p-8 shadow-[0_0_50px_rgba(6,182,212,0.3)] text-left">
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

        {isSuccess ? (
          <div className="py-8 text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-emerald-500/20 border border-emerald-400 text-emerald-400 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h3 className="font-display text-xl font-bold text-white">Memory Inscribed into the Sapphire Disk</h3>
            <p className="text-xs font-mono text-slate-300">
              Your transmission has been assigned permanent coordinate timestamp 2187-QNT-09 and broadcast across the hydrogen line.
            </p>
          </div>
        ) : (
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 uppercase tracking-widest mb-1">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <span>TRANSMISSION ENCODING</span>
            </div>

            <h2 id="submit-memory-title" className="font-display text-2xl font-bold text-white">
              Engrave a Terrestrial Memory
            </h2>
            <p className="mt-1 text-xs text-slate-300">
              What do you want the humans born among the stars to remember about Earth?
            </p>

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label htmlFor="mem-author" className="block text-xs font-mono text-slate-300 mb-1">
                    Your Name or Handle
                  </label>
                  <input
                    id="mem-author"
                    type="text"
                    required
                    placeholder="e.g. Maya Chen"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    className="w-full px-3 py-2 bg-[#040711] border border-cyan-900 rounded-lg text-xs text-white font-mono placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                  />
                </div>
                <div>
                  <label htmlFor="mem-location" className="block text-xs font-mono text-slate-300 mb-1">
                    Ancestral City / Origin
                  </label>
                  <input
                    id="mem-location"
                    type="text"
                    required
                    placeholder="e.g. Kyoto, Japan or Mumbai"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full px-3 py-2 bg-[#040711] border border-cyan-900 rounded-lg text-xs text-white font-mono placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="mem-title" className="block text-xs font-mono text-slate-300 mb-1">
                  Title of the Memory
                </label>
                <input
                  id="mem-title"
                  type="text"
                  required
                  placeholder="e.g. The Taste of Ripe Peaches in July"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3 py-2 bg-[#040711] border border-cyan-900 rounded-lg text-xs text-white font-mono placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div>
                <label htmlFor="mem-text" className="block text-xs font-mono text-slate-300 mb-1">
                  Memory Transcription
                </label>
                <textarea
                  id="mem-text"
                  required
                  rows={4}
                  placeholder="Describe the smell, the light, the people, or the world as it was..."
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  className="w-full px-3 py-2 bg-[#040711] border border-cyan-900 rounded-lg text-xs text-white font-mono placeholder-slate-500 focus:outline-none focus:border-cyan-400 resize-none"
                />
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
                  className="px-6 py-2 text-xs font-mono font-bold uppercase tracking-wider text-[#040711] bg-cyan-400 hover:bg-cyan-300 rounded transition-all flex items-center gap-1.5 shadow-[0_0_15px_rgba(34,211,238,0.4)]"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Transmit into Vault</span>
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
