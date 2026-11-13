import { useEffect, useState } from 'react';
import { BuildSpecModal } from './components/BuildSpecModal';
import { CalendarScreen } from './components/CalendarScreen';
import { CollectiveScreen } from './components/CollectiveScreen';
import { Footer } from './components/Footer';
import { GarageScreen } from './components/GarageScreen';
import { MembershipScreen } from './components/MembershipScreen';
import { RouteBriefDrawer } from './components/RouteBriefDrawer';
import { TopBar } from './components/TopBar';
import { GARAGE_BUILDS, RIDE_EVENTS } from './data/mockData';
import type { GarageBuild, MemberApplication, RideEvent, RiderPass, ScreenId } from './types';

export default function App() {
  const [activeScreen, setActiveScreen] = useState<ScreenId>('collective');
  const [rsvpEventIds, setRsvpEventIds] = useState<string[]>(['marin-ridge-dawn']);
  const [savedBikeIds, setSavedBikeIds] = useState<string[]>(['streetfighter-v2-obsidian']);
  const [inspectedRideId, setInspectedRideId] = useState<string | null>(null);
  const [inspectedBuildId, setInspectedBuildId] = useState<string | null>(null);
  const [riderPass, setRiderPass] = useState<RiderPass | null>(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [activeScreen]);

  const handleToggleRsvp = (rideId: string) => {
    setRsvpEventIds((prev) =>
      prev.includes(rideId) ? prev.filter((id) => id !== rideId) : [...prev, rideId]
    );
  };

  const handleToggleSaveBike = (buildId: string) => {
    setSavedBikeIds((prev) =>
      prev.includes(buildId) ? prev.filter((id) => id !== buildId) : [...prev, buildId]
    );
  };

  const handleSubmitApplication = (application: MemberApplication) => {
    const chapterCode = application.chapter.slice(0, 2).toUpperCase();
    const serial = Math.floor(1000 + Math.random() * 9000);
    setRiderPass({
      ...application,
      passCode: `VM-${chapterCode}-${serial}`,
      issuedDate: 'Nov 2026',
    });
  };

  const inspectedRide: RideEvent | null =
    RIDE_EVENTS.find((r) => r.id === inspectedRideId) ?? null;
  const inspectedBuild: GarageBuild | null =
    GARAGE_BUILDS.find((b) => b.id === inspectedBuildId) ?? null;

  return (
    <div className="min-h-screen flex flex-col bg-[#131313] text-[#e5e2e1]">
      <TopBar
        activeScreen={activeScreen}
        onNavigate={setActiveScreen}
        rsvpCount={rsvpEventIds.length}
      />

      <main className="flex-1">
        {activeScreen === 'collective' && (
          <CollectiveScreen
            onNavigate={setActiveScreen}
            onInspectRide={(ride) => setInspectedRideId(ride.id)}
            onInspectBuild={(build) => setInspectedBuildId(build.id)}
            rsvpEventIds={rsvpEventIds}
            onToggleRsvp={handleToggleRsvp}
          />
        )}

        {activeScreen === 'calendar' && (
          <CalendarScreen
            rsvpEventIds={rsvpEventIds}
            onToggleRsvp={handleToggleRsvp}
            onInspectRide={(ride) => setInspectedRideId(ride.id)}
          />
        )}

        {activeScreen === 'garage' && (
          <GarageScreen
            savedBikeIds={savedBikeIds}
            onToggleSaveBike={handleToggleSaveBike}
            onInspectBuild={(build) => setInspectedBuildId(build.id)}
          />
        )}

        {activeScreen === 'membership' && (
          <MembershipScreen
            riderPass={riderPass}
            onSubmitApplication={handleSubmitApplication}
            onResetPass={() => setRiderPass(null)}
            onNavigate={setActiveScreen}
          />
        )}
      </main>

      <Footer onNavigate={setActiveScreen} />

      <RouteBriefDrawer
        ride={inspectedRide}
        isRsvped={inspectedRide ? rsvpEventIds.includes(inspectedRide.id) : false}
        onToggleRsvp={handleToggleRsvp}
        onClose={() => setInspectedRideId(null)}
      />

      <BuildSpecModal
        build={inspectedBuild}
        isSaved={inspectedBuild ? savedBikeIds.includes(inspectedBuild.id) : false}
        onToggleSave={handleToggleSaveBike}
        onClose={() => setInspectedBuildId(null)}
      />
    </div>
  );
}
