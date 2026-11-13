import { useMemo, useState } from 'react';
import { Check, Search } from 'lucide-react';
import { RIDE_EVENTS } from '../data/mockData';
import type { ChapterName, RideDifficulty, RideDiscipline, RideEvent } from '../types';
import { ImageWithFallback } from './ImageWithFallback';

interface CalendarScreenProps {
  rsvpEventIds: string[];
  onToggleRsvp: (rideId: string) => void;
  onInspectRide: (ride: RideEvent) => void;
}

const DISCIPLINES: ('All' | RideDiscipline)[] = [
  'All',
  'Canyon',
  'Dual-Sport',
  'Night Run',
  'Wrench Night',
];

const DIFFICULTIES: ('All' | RideDifficulty)[] = ['All', 'All Levels', 'Intermediate', 'Spirited'];

const CHAPTERS: ('All' | ChapterName)[] = [
  'All',
  'San Francisco',
  'Los Angeles',
  'Seattle',
  'Denver',
];

export function CalendarScreen({
  rsvpEventIds,
  onToggleRsvp,
  onInspectRide,
}: CalendarScreenProps) {
  const [selectedDiscipline, setSelectedDiscipline] = useState<'All' | RideDiscipline>('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState<'All' | RideDifficulty>('All');
  const [selectedChapter, setSelectedChapter] = useState<'All' | ChapterName>('All');
  const [onlyMyRsvps, setOnlyMyRsvps] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredRides = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    return RIDE_EVENTS.filter((ride) => {
      if (selectedDiscipline !== 'All' && ride.discipline !== selectedDiscipline) return false;
      if (selectedDifficulty !== 'All' && ride.difficulty !== selectedDifficulty) return false;
      if (selectedChapter !== 'All' && ride.chapter !== selectedChapter) return false;
      if (onlyMyRsvps && !rsvpEventIds.includes(ride.id)) return false;
      if (query) {
        const haystack =
          `${ride.title} ${ride.chapter} ${ride.roadCaptain} ${ride.summary} ${ride.meetingPoint}`.toLowerCase();
        if (!haystack.includes(query)) return false;
      }
      return true;
    });
  }, [selectedDiscipline, selectedDifficulty, selectedChapter, onlyMyRsvps, searchQuery, rsvpEventIds]);

  const resetFilters = () => {
    setSelectedDiscipline('All');
    setSelectedDifficulty('All');
    setSelectedChapter('All');
    setOnlyMyRsvps(false);
    setSearchQuery('');
  };

  return (
    <div className="max-w-[1280px] mx-auto px-5 md:px-10 pt-8 md:pt-12 space-y-10">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#262626] pb-6">
        <div>
          <p className="text-xs font-display font-semibold uppercase tracking-[0.08em] text-[#00ff66]">
            Chapter Dispatch
          </p>
          <h1
            className="mt-2 font-display text-3xl md:text-4xl font-bold text-white tracking-tight"
            style={{ textWrap: 'balance' }}
          >
            Event Calendar &amp; Route Briefs
          </h1>
          <p className="mt-2 text-sm md:text-[15px] text-[#a3a3a3] max-w-2xl">
            Filter upcoming chapter rides and wrench nights by discipline, pace, or city. Open any route brief to review waypoints, gear standards, and reserve your spot.
          </p>
        </div>

        <div className="font-mono text-xs tabular-nums text-[#a3a3a3] shrink-0">
          Showing <span className="text-white font-semibold">{filteredRides.length}</span> of{' '}
          {RIDE_EVENTS.length} scheduled events ·{' '}
          <span className="text-[#00ff66] font-semibold">{rsvpEventIds.length}</span> reserved
        </div>
      </div>

      {/* Filter Toolbar */}
      <section
        aria-label="Filter Event Schedule"
        className="border border-[#262626] bg-[#181818] p-5 md:p-6 space-y-5"
      >
        <div className="flex flex-wrap items-center justify-between gap-4">
          {/* Discipline Pill Filters */}
          <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Discipline filter">
            {DISCIPLINES.map((disc) => {
              const active = selectedDiscipline === disc;
              return (
                <button
                  key={disc}
                  type="button"
                  onClick={() => setSelectedDiscipline(disc)}
                  className={`rounded-full px-4 py-2 min-h-[38px] font-display text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer whitespace-nowrap ${
                    active
                      ? 'bg-[#00ff66] text-[#121212]'
                      : 'bg-[#1e1e1e] border border-[#333333] text-[#a3a3a3] hover:text-white hover:border-[#525252]'
                  }`}
                >
                  {disc === 'All' ? 'All Disciplines' : disc}
                </button>
              );
            })}
          </div>

          {/* My RSVPs Toggle */}
          <button
            type="button"
            onClick={() => setOnlyMyRsvps((prev) => !prev)}
            className={`rounded-full px-4 py-2 min-h-[38px] font-display text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer whitespace-nowrap ${
              onlyMyRsvps
                ? 'bg-[#00e5ff] text-[#001f24]'
                : 'bg-[#1e1e1e] border border-[#333333] text-[#e5e2e1] hover:border-[#00e5ff]'
            }`}
          >
            My RSVPs ({rsvpEventIds.length})
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 pt-4 border-t border-[#262626] items-end">
          {/* Search Input */}
          <div className="md:col-span-5">
            <label
              htmlFor="ride-search"
              className="block font-display text-[10px] font-bold uppercase tracking-[0.1em] text-[#a3a3a3] mb-1.5"
            >
              Search Routes or Captains
            </label>
            <div className="relative">
              <Search
                className="w-4 h-4 text-[#a3a3a3] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
                aria-hidden="true"
              />
              <input
                id="ride-search"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Marin, Angeles Crest, Maya..."
                className="w-full bg-[#1e1e1e] border-b-2 border-[#333333] focus:border-[#00ff66] focus:outline-none text-sm text-white placeholder-[#525252] pl-9 pr-3 py-2.5 transition-colors"
              />
            </div>
          </div>

          {/* Chapter Filter */}
          <div className="md:col-span-3">
            <label
              htmlFor="chapter-select"
              className="block font-display text-[10px] font-bold uppercase tracking-[0.1em] text-[#a3a3a3] mb-1.5"
            >
              Chapter
            </label>
            <select
              id="chapter-select"
              value={selectedChapter}
              onChange={(e) => setSelectedChapter(e.target.value as 'All' | ChapterName)}
              className="w-full bg-[#1e1e1e] border-b-2 border-[#333333] focus:border-[#00ff66] focus:outline-none text-sm text-white px-3 py-2.5 cursor-pointer"
            >
              {CHAPTERS.map((chap) => (
                <option key={chap} value={chap}>
                  {chap === 'All' ? 'All Chapters' : chap}
                </option>
              ))}
            </select>
          </div>

          {/* Difficulty Filter */}
          <div className="md:col-span-4">
            <span className="block font-display text-[10px] font-bold uppercase tracking-[0.1em] text-[#a3a3a3] mb-1.5">
              Skill &amp; Pace Level
            </span>
            <div className="flex flex-wrap gap-1.5">
              {DIFFICULTIES.map((diff) => {
                const active = selectedDifficulty === diff;
                return (
                  <button
                    key={diff}
                    type="button"
                    onClick={() => setSelectedDifficulty(diff)}
                    className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors cursor-pointer whitespace-nowrap ${
                      active
                        ? 'bg-[#e5e2e1] text-[#131313]'
                        : 'bg-[#131313] border border-[#262626] text-[#a3a3a3] hover:text-white'
                    }`}
                  >
                    {diff === 'All' ? 'Any Level' : diff}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Event Grid or Empty State */}
      {filteredRides.length === 0 ? (
        <div className="border border-[#262626] bg-[#181818] p-12 text-center space-y-4">
          <h2 className="font-display text-xl font-bold text-white">
            No scheduled rides match your filters
          </h2>
          <p className="text-sm text-[#a3a3a3] max-w-md mx-auto">
            Try clearing your chapter, skill level, or RSVP filters to view all upcoming Valkyrie Moto runs.
          </p>
          <button
            type="button"
            onClick={resetFilters}
            className="inline-flex items-center justify-center rounded-full bg-[#00ff66] text-[#121212] font-display text-xs font-bold uppercase tracking-wider px-6 py-3 min-h-[40px] cursor-pointer"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredRides.map((ride) => {
            const isRsvped = rsvpEventIds.includes(ride.id);
            const attendeeCount = ride.baseAttendeeCount + (isRsvped ? 1 : 0);

            return (
              <article
                key={ride.id}
                className="card-interactive border border-[#262626] border-t-2 bg-[#181818] flex flex-col justify-between"
              >
                <div>
                  <div className="aspect-16/9 w-full bg-[#0e0e0e] border-b border-[#262626] overflow-hidden">
                    <ImageWithFallback
                      src={ride.imageUrl}
                      alt={ride.title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="p-6">
                    {/* Clean unboxed metadata row */}
                    <div className="text-xs text-[#a3a3a3]">
                      {ride.dateLabel} · {ride.timeLabel} · {ride.chapter} · {ride.discipline}
                    </div>

                    <h2 className="mt-2 font-display text-xl md:text-2xl font-bold text-white tracking-tight">
                      {ride.title}
                    </h2>

                    <p className="mt-2.5 text-sm leading-relaxed text-[#a3a3a3]">
                      {ride.summary}
                    </p>

                    {/* Telemetry Readout */}
                    <div className="mt-5 grid grid-cols-3 border border-[#262626] bg-[#131313]">
                      <div className="p-3 border-r border-[#262626]">
                        <div className="font-display text-[10px] font-bold uppercase tracking-widest text-[#a3a3a3]">
                          Distance
                        </div>
                        <div className="mt-0.5 font-mono text-sm font-semibold tabular-nums text-[#00e5ff]">
                          {ride.distanceMiles > 0 ? `${ride.distanceMiles} mi` : 'Bay 4'}
                        </div>
                      </div>
                      <div className="p-3 border-r border-[#262626]">
                        <div className="font-display text-[10px] font-bold uppercase tracking-widest text-[#a3a3a3]">
                          Difficulty
                        </div>
                        <div className="mt-0.5 font-display text-xs font-semibold text-white">
                          {ride.difficulty}
                        </div>
                      </div>
                      <div className="p-3">
                        <div className="font-display text-[10px] font-bold uppercase tracking-widest text-[#a3a3a3]">
                          Roster
                        </div>
                        <div className="mt-0.5 font-mono text-sm font-semibold tabular-nums text-[#00ff66]">
                          {attendeeCount}/{ride.capacity}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="px-6 pb-6 pt-4 border-t border-[#262626] flex flex-wrap items-center justify-between gap-3">
                  <div className="text-xs text-[#a3a3a3]">
                    Lead: <span className="text-white font-medium">{ride.roadCaptain}</span>
                  </div>

                  <div className="flex items-center gap-2.5">
                    <button
                      type="button"
                      onClick={() => onInspectRide(ride)}
                      className="inline-flex items-center justify-center rounded-full border border-[#333333] bg-[#1e1e1e] text-white font-display text-xs font-semibold uppercase tracking-wider px-4 py-2 min-h-[40px] hover:border-[#00ff66] hover:text-[#00ff66] transition-colors cursor-pointer whitespace-nowrap"
                    >
                      Route Brief
                    </button>

                    <button
                      type="button"
                      onClick={() => onToggleRsvp(ride.id)}
                      className={`inline-flex items-center justify-center gap-1.5 rounded-full font-display text-xs font-bold uppercase tracking-wider px-4 py-2 min-h-[40px] transition-all cursor-pointer whitespace-nowrap ${
                        isRsvped
                          ? 'border border-[#00ff66] bg-[#1e1e1e] text-[#00ff66]'
                          : 'bg-[#00ff66] text-[#121212] hover:bg-[#3bff88]'
                      }`}
                    >
                      {isRsvped && <Check className="w-3.5 h-3.5" aria-hidden="true" />}
                      {isRsvped ? 'Reserved' : 'Reserve Spot'}
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}
