import { useEffect } from 'react';
import { Check, MapPin, ShieldCheck, X } from 'lucide-react';
import type { RideEvent } from '../types';
import { ImageWithFallback } from './ImageWithFallback';

interface RouteBriefDrawerProps {
  ride: RideEvent | null;
  isRsvped: boolean;
  onToggleRsvp: (rideId: string) => void;
  onClose: () => void;
}

export function RouteBriefDrawer({
  ride,
  isRsvped,
  onToggleRsvp,
  onClose,
}: RouteBriefDrawerProps) {
  useEffect(() => {
    if (!ride) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [ride, onClose]);

  if (!ride) return null;

  const attendeeCount = ride.baseAttendeeCount + (isRsvped ? 1 : 0);
  const spotsRemaining = Math.max(0, ride.capacity - attendeeCount);

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end bg-black/75 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="route-brief-title"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl bg-[#131313] border-l border-[#262626] h-full overflow-y-auto flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Sticky Drawer Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between gap-4 px-6 py-4 bg-[#131313]/95 backdrop-blur-md border-b border-[#262626]">
          <div className="text-xs font-display font-semibold uppercase tracking-widest text-[#00e5ff]">
            Route Brief · {ride.chapter} Chapter
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close route brief"
            className="inline-flex items-center justify-center w-10 h-10 rounded-full border border-[#333333] bg-[#1e1e1e] text-white hover:border-[#00ff66] hover:text-[#00ff66] transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Hero Image */}
        <div className="relative aspect-16/9 w-full bg-[#181818] border-b border-[#262626] shrink-0">
          <ImageWithFallback
            src={ride.imageUrl}
            alt={ride.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#131313] via-[#131313]/30 to-transparent" />
          <div className="absolute bottom-4 left-6 right-6">
            <p className="text-xs text-[#e5e2e1]/80 mb-1">
              {ride.dateLabel} · {ride.timeLabel} · {ride.discipline} · {ride.difficulty}
            </p>
            <h2
              id="route-brief-title"
              className="font-display text-2xl md:text-3xl font-bold text-white tracking-tight"
            >
              {ride.title}
            </h2>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-8 flex-1">
          {/* Ride Telemetry HUD */}
          <section aria-label="Route Telemetry">
            <div className="grid grid-cols-2 sm:grid-cols-4 border border-[#262626] bg-[#181818]">
              <div className="p-4 border-b sm:border-b-0 border-r border-[#262626]">
                <div className="font-display text-[10px] font-bold uppercase tracking-widest text-[#a3a3a3]">
                  Distance
                </div>
                <div className="mt-1 font-mono text-lg font-semibold tabular-nums text-[#00e5ff]">
                  {ride.distanceMiles > 0 ? `${ride.distanceMiles} mi` : 'Bay 4'}
                </div>
              </div>
              <div className="p-4 border-b sm:border-b-0 sm:border-r border-[#262626]">
                <div className="font-display text-[10px] font-bold uppercase tracking-widest text-[#a3a3a3]">
                  Elevation
                </div>
                <div className="mt-1 font-mono text-lg font-semibold tabular-nums text-white">
                  {ride.elevationGainFt > 0 ? `+${ride.elevationGainFt.toLocaleString()} ft` : 'Shop Lift'}
                </div>
              </div>
              <div className="p-4 border-r border-[#262626]">
                <div className="font-display text-[10px] font-bold uppercase tracking-widest text-[#a3a3a3]">
                  Pace Group
                </div>
                <div className="mt-1 font-display text-sm font-semibold text-white">
                  {ride.pace}
                </div>
              </div>
              <div className="p-4">
                <div className="font-display text-[10px] font-bold uppercase tracking-widest text-[#a3a3a3]">
                  Roster
                </div>
                <div className="mt-1 font-mono text-lg font-semibold tabular-nums text-[#00ff66]">
                  {attendeeCount}/{ride.capacity}
                </div>
              </div>
            </div>
          </section>

          {/* Route Summary & Staging */}
          <section className="space-y-4">
            <p className="text-[15px] leading-relaxed text-[#e5e2e1]">{ride.summary}</p>
            <div className="grid sm:grid-cols-2 gap-4 pt-2 border-t border-[#262626]">
              <div>
                <div className="font-display text-[10px] font-bold uppercase tracking-widest text-[#a3a3a3] mb-1">
                  Staging Location
                </div>
                <div className="flex items-start gap-2 text-sm text-white">
                  <MapPin className="w-4 h-4 text-[#00ff66] shrink-0 mt-0.5" aria-hidden="true" />
                  <span>{ride.meetingPoint}</span>
                </div>
              </div>
              <div>
                <div className="font-display text-[10px] font-bold uppercase tracking-widest text-[#a3a3a3] mb-1">
                  Lead Road Captain
                </div>
                <div className="text-sm text-white font-medium">
                  {ride.roadCaptain} <span className="text-[#a3a3a3]">· {ride.roadCaptainTier}</span>
                </div>
                <div className="text-xs text-[#a3a3a3] mt-0.5">{ride.surfaceSplit}</div>
              </div>
            </div>
          </section>

          {/* Waypoint Timeline */}
          <section>
            <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-white mb-4">
              Route Waypoints
            </h3>
            <div className="border border-[#262626] bg-[#181818] divide-y divide-[#262626]">
              {ride.waypoints.map((wp, idx) => (
                <div key={`${wp.label}-${idx}`} className="p-4 flex items-start gap-4">
                  <span className="font-mono text-xs font-semibold tabular-nums text-[#00ff66] pt-0.5 w-14 shrink-0">
                    {wp.mile > 0 ? `MI ${wp.mile}` : `0${idx + 1}.`}
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-baseline justify-between gap-2">
                      <span className="font-display text-sm font-semibold text-white">
                        {wp.label}
                      </span>
                      <span className="font-mono text-xs tabular-nums text-[#a3a3a3] shrink-0">
                        {wp.elevationFt.toLocaleString()} ft
                      </span>
                    </div>
                    <p className="mt-1 text-xs text-[#a3a3a3] leading-relaxed">{wp.notes}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Mandatory Gear & Safety Checks */}
          <section>
            <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-white mb-3">
              Required Gear & Readiness
            </h3>
            <ul className="space-y-2.5">
              {ride.gearChecklist.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm text-[#e5e2e1]">
                  <ShieldCheck className="w-4 h-4 text-[#00e5ff] shrink-0 mt-0.5" aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>
        </div>

        {/* Sticky Footer Action */}
        <div className="sticky bottom-0 z-10 px-6 py-4 bg-[#181818] border-t border-[#262626] flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="text-xs font-medium text-white">
              {isRsvped ? 'Your slot is confirmed for this session.' : `${spotsRemaining} spots remaining`}
            </div>
            <div className="text-xs text-[#a3a3a3]">
              {isRsvped
                ? 'GPX pack & staging alerts unlocked in session.'
                : 'Kickstands up strictly at scheduled rollout time.'}
            </div>
          </div>

          <button
            type="button"
            onClick={() => onToggleRsvp(ride.id)}
            className={`inline-flex items-center justify-center gap-2 rounded-full font-display text-xs font-bold uppercase tracking-wider px-6 py-3 min-h-[44px] transition-all duration-150 cursor-pointer whitespace-nowrap shrink-0 ${
              isRsvped
                ? 'bg-[#1e1e1e] border border-[#00ff66] text-[#00ff66] hover:bg-[#2a2a2a]'
                : 'bg-[#00ff66] text-[#121212] hover:bg-[#3bff88] volt-glow'
            }`}
          >
            {isRsvped ? (
              <>
                <Check className="w-4 h-4" aria-hidden="true" />
                Spot Reserved (Cancel)
              </>
            ) : (
              'Reserve Spot'
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
