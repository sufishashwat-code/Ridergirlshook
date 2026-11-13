import { useMemo, useState } from 'react';
import { Bookmark } from 'lucide-react';
import { GARAGE_BUILDS } from '../data/mockData';
import type { BikeCategory, GarageBuild } from '../types';
import { ImageWithFallback } from './ImageWithFallback';

interface GarageScreenProps {
  savedBikeIds: string[];
  onToggleSaveBike: (buildId: string) => void;
  onInspectBuild: (build: GarageBuild) => void;
}

const CATEGORIES: ('All' | BikeCategory)[] = ['All', 'Sport', 'Dual-Sport', 'Custom', 'Touring'];

export function GarageScreen({
  savedBikeIds,
  onToggleSaveBike,
  onInspectBuild,
}: GarageScreenProps) {
  const [selectedCategory, setSelectedCategory] = useState<'All' | BikeCategory>('All');
  const [savedOnly, setSavedOnly] = useState(false);

  const filteredBuilds = useMemo(() => {
    return GARAGE_BUILDS.filter((build) => {
      if (selectedCategory !== 'All' && build.category !== selectedCategory) return false;
      if (savedOnly && !savedBikeIds.includes(build.id)) return false;
      return true;
    });
  }, [selectedCategory, savedOnly, savedBikeIds]);

  const resetFilters = () => {
    setSelectedCategory('All');
    setSavedOnly(false);
  };

  return (
    <div className="max-w-[1280px] mx-auto px-5 md:px-10 pt-8 md:pt-12 space-y-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#262626] pb-6">
        <div>
          <p className="text-xs font-display font-semibold uppercase tracking-[0.08em] text-[#00ff66]">
            Member Machines
          </p>
          <h1
            className="mt-2 font-display text-3xl md:text-4xl font-bold text-white tracking-tight"
            style={{ textWrap: 'balance' }}
          >
            Garage Showcase
          </h1>
          <p className="mt-2 text-sm md:text-[15px] text-[#a3a3a3] max-w-2xl">
            Every motorcycle in the collective is dialed by its rider—from re-valved track forks and custom titanium exhausts to high-altitude ECU maps and desert rally towers.
          </p>
        </div>

        <div className="font-mono text-xs tabular-nums text-[#a3a3a3] shrink-0">
          <span className="text-white font-semibold">{filteredBuilds.length}</span> machines displayed ·{' '}
          <span className="text-[#00ff66] font-semibold">{savedBikeIds.length}</span> saved
        </div>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 border border-[#262626] bg-[#181818] p-4 md:p-5">
        <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Bike category filter">
          {CATEGORIES.map((cat) => {
            const active = selectedCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`rounded-full px-4 py-2 min-h-[38px] font-display text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer whitespace-nowrap ${
                  active
                    ? 'bg-[#00ff66] text-[#121212]'
                    : 'bg-[#1e1e1e] border border-[#333333] text-[#a3a3a3] hover:text-white hover:border-[#525252]'
                }`}
              >
                {cat === 'All' ? 'All Machines' : cat}
              </button>
            );
          })}
        </div>

        <button
          type="button"
          onClick={() => setSavedOnly((prev) => !prev)}
          className={`inline-flex items-center gap-2 rounded-full px-4 py-2 min-h-[38px] font-display text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer whitespace-nowrap ${
            savedOnly
              ? 'bg-[#00e5ff] text-[#001f24]'
              : 'bg-[#1e1e1e] border border-[#333333] text-[#e5e2e1] hover:border-[#00e5ff]'
          }`}
        >
          <Bookmark className="w-3.5 h-3.5" aria-hidden="true" />
          Saved Builds ({savedBikeIds.length})
        </button>
      </div>

      {/* Build Grid or Empty State */}
      {filteredBuilds.length === 0 ? (
        <div className="border border-[#262626] bg-[#181818] p-12 text-center space-y-4">
          <h2 className="font-display text-xl font-bold text-white">
            No saved builds in this category yet
          </h2>
          <p className="text-sm text-[#a3a3a3] max-w-md mx-auto">
            Bookmark machines while browsing the garage to keep a shortlist of suspension and hardware setups.
          </p>
          <button
            type="button"
            onClick={resetFilters}
            className="inline-flex items-center justify-center rounded-full bg-[#00ff66] text-[#121212] font-display text-xs font-bold uppercase tracking-wider px-6 py-3 min-h-[40px] cursor-pointer"
          >
            Show All Machines
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBuilds.map((build) => {
            const isSaved = savedBikeIds.includes(build.id);

            return (
              <article
                key={build.id}
                className="card-interactive border border-[#262626] border-t-2 bg-[#181818] flex flex-col justify-between"
              >
                <div>
                  <div className="aspect-4/3 w-full bg-[#0e0e0e] border-b border-[#262626] overflow-hidden">
                    <ImageWithFallback
                      src={build.imageUrl}
                      alt={`${build.year} ${build.bikeModel}`}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="p-5">
                    <div className="text-xs text-[#a3a3a3]">
                      {build.year} · {build.category} · {build.engineCc} cc
                    </div>
                    <h2 className="mt-1.5 font-display text-xl font-bold text-white tracking-tight">
                      {build.bikeModel}
                    </h2>
                    <div className="mt-1 text-xs text-[#a3a3a3]">
                      {build.riderName} · {build.riderTier} · {build.chapter}
                    </div>

                    <div className="mt-4 grid grid-cols-3 border border-[#262626] bg-[#131313]">
                      <div className="p-2.5 border-r border-[#262626]">
                        <div className="font-display text-[10px] font-bold uppercase tracking-widest text-[#a3a3a3]">
                          Power
                        </div>
                        <div className="mt-0.5 font-mono text-xs font-semibold tabular-nums text-[#00ff66]">
                          {build.horsepower} hp
                        </div>
                      </div>
                      <div className="p-2.5 border-r border-[#262626]">
                        <div className="font-display text-[10px] font-bold uppercase tracking-widest text-[#a3a3a3]">
                          Torque
                        </div>
                        <div className="mt-0.5 font-mono text-xs font-semibold tabular-nums text-white">
                          {build.torqueLbFt} lb-ft
                        </div>
                      </div>
                      <div className="p-2.5">
                        <div className="font-display text-[10px] font-bold uppercase tracking-widest text-[#a3a3a3]">
                          Wet Wt
                        </div>
                        <div className="mt-0.5 font-mono text-xs font-semibold tabular-nums text-[#00e5ff]">
                          {build.wetWeightLbs} lb
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="px-5 pb-5 pt-3 border-t border-[#262626] flex items-center justify-between gap-3">
                  <button
                    type="button"
                    onClick={() => onInspectBuild(build)}
                    className="inline-flex items-center justify-center rounded-full border border-[#333333] bg-[#1e1e1e] text-white font-display text-xs font-semibold uppercase tracking-wider px-4 py-2 min-h-[38px] hover:border-[#00ff66] hover:text-[#00ff66] transition-colors cursor-pointer whitespace-nowrap"
                  >
                    Build Sheet
                  </button>

                  <button
                    type="button"
                    onClick={() => onToggleSaveBike(build.id)}
                    aria-label={isSaved ? `Remove ${build.bikeModel} from saved builds` : `Save ${build.bikeModel}`}
                    className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-2 min-h-[38px] font-display text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer whitespace-nowrap ${
                      isSaved
                        ? 'bg-[#00ff66] text-[#121212]'
                        : 'text-[#a3a3a3] hover:text-white'
                    }`}
                  >
                    <Bookmark className="w-3.5 h-3.5" aria-hidden="true" />
                    {isSaved ? 'Saved' : 'Save'}
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}
