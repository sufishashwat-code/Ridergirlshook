import { ArrowRight, Check } from 'lucide-react';
import { GARAGE_BUILDS, HERO_IMAGE, RIDE_EVENTS, WRENCH_BAY_IMAGE } from '../data/mockData';
import type { GarageBuild, RideEvent, ScreenId } from '../types';
import { ImageWithFallback } from './ImageWithFallback';

interface CollectiveScreenProps {
  onNavigate: (screen: ScreenId) => void;
  onInspectRide: (ride: RideEvent) => void;
  onInspectBuild: (build: GarageBuild) => void;
  rsvpEventIds: string[];
  onToggleRsvp: (rideId: string) => void;
}

export function CollectiveScreen({
  onNavigate,
  onInspectRide,
  onInspectBuild,
  rsvpEventIds,
  onToggleRsvp,
}: CollectiveScreenProps) {
  const featuredRide = RIDE_EVENTS[0];
  const isFeaturedRsvped = rsvpEventIds.includes(featuredRide.id);
  const featuredAttendeeCount = featuredRide.baseAttendeeCount + (isFeaturedRsvped ? 1 : 0);
  const featuredBuilds = GARAGE_BUILDS.slice(0, 3);

  return (
    <div className="max-w-[1280px] mx-auto px-5 md:px-10 pt-8 md:pt-12 space-y-16 md:space-y-24">
      {/* Hero Split */}
      <section className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
          <div className="lg:col-span-5 flex flex-col justify-between bg-[#181818] border border-[#262626] p-7 md:p-10">
            <div>
              <p className="font-display text-xs font-semibold uppercase tracking-[0.1em] text-[#00ff66]">
                San Francisco · Los Angeles · Seattle · Denver
              </p>
              <h1
                className="mt-4 font-display font-bold text-white tracking-[-0.03em] leading-[1.08]"
                style={{
                  fontSize: 'clamp(2.25rem, 4vw, 3.35rem)',
                  textWrap: 'balance',
                }}
              >
                Built for Women Who Ride Hard and Wrench Together.
              </h1>
              <p className="mt-5 text-[15px] md:text-base leading-relaxed text-[#a3a3a3] max-w-md">
                Valkyrie Moto unites dawn canyon sweeps, desert dual-sport traverses, and shared late-night garage bays under one disciplined riding code.
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-[#262626] flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={() => onNavigate('calendar')}
                className="inline-flex items-center justify-center rounded-full bg-[#00ff66] text-[#121212] font-display text-xs font-bold uppercase tracking-wider px-6 py-3.5 min-h-[44px] hover:bg-[#3bff88] volt-glow transition-all duration-150 cursor-pointer whitespace-nowrap shrink-0"
              >
                Explore Event Calendar
              </button>
              <button
                type="button"
                onClick={() => onNavigate('garage')}
                className="inline-flex items-center gap-2 text-sm font-medium text-white hover:text-[#00ff66] transition-colors px-2 py-2 min-h-[44px] cursor-pointer whitespace-nowrap shrink-0"
              >
                <span>Browse Member Garage</span>
                <ArrowRight className="w-4 h-4 text-[#00ff66]" aria-hidden="true" />
              </button>
            </div>
          </div>

          <div className="lg:col-span-7 relative min-h-[320px] lg:min-h-[480px] border border-[#262626] bg-[#0e0e0e] overflow-hidden">
            <ImageWithFallback
              src={HERO_IMAGE}
              alt="Three Valkyrie Moto riders beside matte sport motorcycles on a coastal mountain overlook at twilight"
              className="w-full h-full lg:h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#131313]/90 via-transparent to-transparent" />
            <div className="absolute bottom-5 left-5 right-5 flex flex-wrap items-center justify-between gap-4 text-xs text-[#e5e2e1]">
              <span>Highway 1 Coastal Staging · Dawn Patrol</span>
              <span className="font-mono tabular-nums text-[#00e5ff]">
                37.89° N / 122.63° W
              </span>
            </div>
          </div>
        </div>

        {/* Full-Width 4-Column Collective KPI Strip */}
        <div className="grid grid-cols-2 lg:grid-cols-4 border border-[#262626] bg-[#181818]">
          <div className="p-5 md:p-6 border-b lg:border-b-0 border-r border-[#262626]">
            <div className="font-mono text-2xl md:text-3xl font-semibold tabular-nums text-white">
              420+
            </div>
            <div className="mt-1 text-xs font-display uppercase tracking-wider text-[#a3a3a3]">
              Active Collective Riders
            </div>
          </div>
          <div className="p-5 md:p-6 border-b lg:border-b-0 lg:border-r border-[#262626]">
            <div className="font-mono text-2xl md:text-3xl font-semibold tabular-nums text-[#00ff66]">
              38
            </div>
            <div className="mt-1 text-xs font-display uppercase tracking-wider text-[#a3a3a3]">
              Monthly Chapter Rides
            </div>
          </div>
          <div className="p-5 md:p-6 border-r border-[#262626]">
            <div className="font-mono text-2xl md:text-3xl font-semibold tabular-nums text-[#00e5ff]">
              4
            </div>
            <div className="mt-1 text-xs font-display uppercase tracking-wider text-[#a3a3a3]">
              24/7 Shared Wrench Bays
            </div>
          </div>
          <div className="p-5 md:p-6">
            <div className="font-mono text-2xl md:text-3xl font-semibold tabular-nums text-white">
              100%
            </div>
            <div className="mt-1 text-xs font-display uppercase tracking-wider text-[#a3a3a3]">
              Road-Captain Led Routes
            </div>
          </div>
        </div>
      </section>

      {/* Section 01: Featured Next Departure */}
      <section className="space-y-6">
        <div className="flex flex-wrap items-end justify-between gap-4 border-b border-[#262626] pb-4">
          <div>
            <p className="text-xs font-display font-semibold uppercase tracking-[0.08em] text-[#a3a3a3]">
              01. Featured Departure
            </p>
            <h2 className="mt-1 font-display text-2xl md:text-3xl font-bold text-white tracking-tight">
              Next Chapter Rollout
            </h2>
          </div>
          <button
            type="button"
            onClick={() => onNavigate('calendar')}
            className="inline-flex items-center gap-2 text-sm font-medium text-[#e5e2e1] hover:text-[#00ff66] transition-colors cursor-pointer whitespace-nowrap"
          >
            <span>Full Ride Schedule</span>
            <ArrowRight className="w-4 h-4 text-[#00ff66]" aria-hidden="true" />
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 border border-[#262626] bg-[#181818] items-stretch">
          <div className="lg:col-span-7 relative min-h-[260px] bg-[#0e0e0e] border-b lg:border-b-0 lg:border-r border-[#262626]">
            <ImageWithFallback
              src={featuredRide.imageUrl}
              alt={featuredRide.title}
              className="w-full h-full lg:h-full object-cover"
            />
          </div>

          <div className="lg:col-span-5 p-6 md:p-8 flex flex-col justify-between gap-6">
            <div>
              <div className="text-xs text-[#a3a3a3]">
                {featuredRide.dateLabel} · {featuredRide.timeLabel} · {featuredRide.chapter}
              </div>
              <h3 className="mt-2 font-display text-2xl font-bold text-white tracking-tight">
                {featuredRide.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-[#a3a3a3]">
                {featuredRide.summary}
              </p>

              {/* Telemetry Grid */}
              <div className="mt-6 grid grid-cols-3 border border-[#262626] bg-[#131313]">
                <div className="p-3 border-r border-[#262626]">
                  <div className="font-display text-[10px] font-bold uppercase tracking-widest text-[#a3a3a3]">
                    Distance
                  </div>
                  <div className="mt-1 font-mono text-sm font-semibold tabular-nums text-[#00e5ff]">
                    {featuredRide.distanceMiles} mi
                  </div>
                </div>
                <div className="p-3 border-r border-[#262626]">
                  <div className="font-display text-[10px] font-bold uppercase tracking-widest text-[#a3a3a3]">
                    Climb
                  </div>
                  <div className="mt-1 font-mono text-sm font-semibold tabular-nums text-white">
                    {featuredRide.elevationGainFt.toLocaleString()} ft
                  </div>
                </div>
                <div className="p-3">
                  <div className="font-display text-[10px] font-bold uppercase tracking-widest text-[#a3a3a3]">
                    Roster
                  </div>
                  <div className="mt-1 font-mono text-sm font-semibold tabular-nums text-[#00ff66]">
                    {featuredAttendeeCount}/{featuredRide.capacity}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-[#262626]">
              <button
                type="button"
                onClick={() => onToggleRsvp(featuredRide.id)}
                className={`inline-flex items-center justify-center gap-2 rounded-full font-display text-xs font-bold uppercase tracking-wider px-5 py-2.5 min-h-[40px] transition-all cursor-pointer whitespace-nowrap ${
                  isFeaturedRsvped
                    ? 'border border-[#00ff66] bg-[#1e1e1e] text-[#00ff66]'
                    : 'bg-[#00ff66] text-[#121212] hover:bg-[#3bff88]'
                }`}
              >
                {isFeaturedRsvped && <Check className="w-3.5 h-3.5" aria-hidden="true" />}
                {isFeaturedRsvped ? 'Spot Reserved' : 'Reserve Spot'}
              </button>
              <button
                type="button"
                onClick={() => onInspectRide(featuredRide)}
                className="inline-flex items-center justify-center rounded-full border border-[#333333] bg-[#1e1e1e] text-white font-display text-xs font-semibold uppercase tracking-wider px-5 py-2.5 min-h-[40px] hover:border-[#00ff66] hover:text-[#00ff66] transition-colors cursor-pointer whitespace-nowrap"
              >
                Inspect Route Brief
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Section 02: Garage Highlights */}
      <section className="space-y-6">
        <div className="flex flex-wrap items-end justify-between gap-4 border-b border-[#262626] pb-4">
          <div>
            <p className="text-xs font-display font-semibold uppercase tracking-[0.08em] text-[#a3a3a3]">
              02. Garage Showcase
            </p>
            <h2 className="mt-1 font-display text-2xl md:text-3xl font-bold text-white tracking-tight">
              Member Machines & Custom Builds
            </h2>
          </div>
          <button
            type="button"
            onClick={() => onNavigate('garage')}
            className="inline-flex items-center gap-2 text-sm font-medium text-[#e5e2e1] hover:text-[#00ff66] transition-colors cursor-pointer whitespace-nowrap"
          >
            <span>Open Full Garage</span>
            <ArrowRight className="w-4 h-4 text-[#00ff66]" aria-hidden="true" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredBuilds.map((build) => (
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
                  <h3 className="mt-1.5 font-display text-lg font-bold text-white">
                    {build.bikeModel}
                  </h3>
                  <p className="mt-1 text-xs text-[#a3a3a3]">
                    {build.riderName} · {build.riderTier} · {build.chapter}
                  </p>
                </div>
              </div>

              <div className="px-5 pb-5 pt-3 border-t border-[#262626] flex items-center justify-between gap-3">
                <span className="font-mono text-xs tabular-nums text-[#00e5ff]">
                  {build.horsepower} hp · {build.wetWeightLbs} lbs
                </span>
                <button
                  type="button"
                  onClick={() => onInspectBuild(build)}
                  className="text-xs font-display font-semibold uppercase tracking-wider text-white hover:text-[#00ff66] transition-colors cursor-pointer whitespace-nowrap"
                >
                  View Build Sheet →
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Section 03: Shared Bays & Membership Pathway */}
      <section className="grid grid-cols-1 lg:grid-cols-12 border border-[#262626] bg-[#181818] items-stretch">
        <div className="lg:col-span-6 p-7 md:p-10 flex flex-col justify-between gap-6">
          <div>
            <p className="text-xs font-display font-semibold uppercase tracking-[0.08em] text-[#00ff66]">
              03. Club Membership
            </p>
            <h2
              className="mt-2 font-display text-2xl md:text-3xl font-bold text-white tracking-tight"
              style={{ textWrap: 'balance' }}
            >
              Shared Lifts, Safety Mentorship, and Zero-Ego Wrenching.
            </h2>
            <p className="mt-4 text-sm md:text-[15px] leading-relaxed text-[#a3a3a3]">
              Start as a Prospect on open-level chapter rides for zero dues. Earn your Full Patch after three formation rides to unlock 24/7 bay access, tire changers, and track-day coaching stipends.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-[#262626]">
            <button
              type="button"
              onClick={() => onNavigate('membership')}
              className="inline-flex items-center justify-center rounded-full bg-[#00ff66] text-[#121212] font-display text-xs font-bold uppercase tracking-wider px-6 py-3 min-h-[44px] hover:bg-[#3bff88] volt-glow transition-all cursor-pointer whitespace-nowrap"
            >
              View Tiers &amp; Apply
            </button>
            <span className="text-xs text-[#a3a3a3]">
              3 trial rides included · 4 regional chapters
            </span>
          </div>
        </div>

        <div className="lg:col-span-6 min-h-[280px] border-t lg:border-t-0 lg:border-l border-[#262626] bg-[#0e0e0e]">
          <ImageWithFallback
            src={WRENCH_BAY_IMAGE}
            alt="Two Valkyrie Moto members inspecting a sportbike front brake assembly on a shop lift"
            className="w-full h-full lg:h-full object-cover"
          />
        </div>
      </section>
    </div>
  );
}
