import { useEffect } from 'react';
import { Bookmark, Wrench, X } from 'lucide-react';
import type { GarageBuild } from '../types';
import { ImageWithFallback } from './ImageWithFallback';

interface BuildSpecModalProps {
  build: GarageBuild | null;
  isSaved: boolean;
  onToggleSave: (buildId: string) => void;
  onClose: () => void;
}

export function BuildSpecModal({
  build,
  isSaved,
  onToggleSave,
  onClose,
}: BuildSpecModalProps) {
  useEffect(() => {
    if (!build) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [build, onClose]);

  if (!build) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-black/80 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="build-spec-title"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-[#131313] border border-[#333333] grid grid-cols-1 lg:grid-cols-12"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close build spec sheet"
          className="absolute top-4 right-4 z-10 inline-flex items-center justify-center w-10 h-10 rounded-full border border-[#333333] bg-[#131313]/90 text-white hover:border-[#00ff66] hover:text-[#00ff66] transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Left Media Column */}
        <div className="lg:col-span-6 bg-[#0e0e0e] flex flex-col border-b lg:border-b-0 lg:border-r border-[#262626]">
          <div className="aspect-4/3 w-full">
            <ImageWithFallback
              src={build.imageUrl}
              alt={`${build.year} ${build.bikeModel}`}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="p-6 flex-1 flex flex-col justify-between gap-4 border-t border-[#262626]">
            <div>
              <div className="font-display text-[10px] font-bold uppercase tracking-widest text-[#a3a3a3]">
                Builder Story
              </div>
              <p className="mt-2 text-sm leading-relaxed text-[#e5e2e1]">{build.story}</p>
            </div>
            <div className="pt-4 border-t border-[#262626] flex items-center justify-between gap-4">
              <div>
                <div className="text-sm font-semibold text-white">{build.riderName}</div>
                <div className="text-xs text-[#a3a3a3]">
                  {build.riderHandle} · {build.riderTier} · {build.chapter}
                </div>
              </div>
              <button
                type="button"
                onClick={() => onToggleSave(build.id)}
                className={`inline-flex items-center gap-2 rounded-full px-4 py-2 min-h-[40px] font-display text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                  isSaved
                    ? 'bg-[#00ff66] text-[#121212]'
                    : 'border border-[#333333] bg-[#1e1e1e] text-white hover:border-[#00ff66] hover:text-[#00ff66]'
                }`}
              >
                <Bookmark className="w-3.5 h-3.5" aria-hidden="true" />
                {isSaved ? 'Saved' : 'Save Build'}
              </button>
            </div>
          </div>
        </div>

        {/* Right Telemetry & Mods Column */}
        <div className="lg:col-span-6 p-6 md:p-8 space-y-6">
          <div>
            <div className="text-xs text-[#a3a3a3]">
              {build.year} · {build.category} · {build.engineCc} cc
            </div>
            <h2
              id="build-spec-title"
              className="mt-1 font-display text-2xl md:text-3xl font-bold text-white tracking-tight pr-10"
            >
              {build.bikeModel}
            </h2>
          </div>

          {/* Performance Metrics */}
          <div className="grid grid-cols-3 border border-[#262626] bg-[#181818]">
            <div className="p-3.5 border-r border-[#262626]">
              <div className="font-display text-[10px] font-bold uppercase tracking-widest text-[#a3a3a3]">
                Output
              </div>
              <div className="mt-1 font-mono text-base font-semibold tabular-nums text-[#00ff66]">
                {build.horsepower} hp
              </div>
            </div>
            <div className="p-3.5 border-r border-[#262626]">
              <div className="font-display text-[10px] font-bold uppercase tracking-widest text-[#a3a3a3]">
                Torque
              </div>
              <div className="mt-1 font-mono text-base font-semibold tabular-nums text-white">
                {build.torqueLbFt} lb-ft
              </div>
            </div>
            <div className="p-3.5">
              <div className="font-display text-[10px] font-bold uppercase tracking-widest text-[#a3a3a3]">
                Wet Weight
              </div>
              <div className="mt-1 font-mono text-base font-semibold tabular-nums text-[#00e5ff]">
                {build.wetWeightLbs} lbs
              </div>
            </div>
          </div>

          {/* Core Hardware */}
          <div className="space-y-3 pt-2 border-t border-[#262626]">
            <div>
              <div className="font-display text-[10px] font-bold uppercase tracking-widest text-[#a3a3a3]">
                Tires
              </div>
              <div className="mt-0.5 text-sm text-white">{build.tires}</div>
            </div>
            <div>
              <div className="font-display text-[10px] font-bold uppercase tracking-widest text-[#a3a3a3]">
                Suspension
              </div>
              <div className="mt-0.5 text-sm text-white">{build.suspension}</div>
            </div>
            <div>
              <div className="font-display text-[10px] font-bold uppercase tracking-widest text-[#a3a3a3]">
                Exhaust
              </div>
              <div className="mt-0.5 text-sm text-white">{build.exhaust}</div>
            </div>
          </div>

          {/* Custom Modifications */}
          <div className="pt-2 border-t border-[#262626]">
            <h3 className="font-display text-xs font-bold uppercase tracking-widest text-white mb-3">
              Workshop Modifications
            </h3>
            <ul className="space-y-2.5">
              {build.mods.map((mod) => (
                <li key={mod} className="flex items-start gap-2.5 text-sm text-[#e5e2e1]">
                  <Wrench className="w-4 h-4 text-[#00ff66] shrink-0 mt-0.5" aria-hidden="true" />
                  <span>{mod}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
