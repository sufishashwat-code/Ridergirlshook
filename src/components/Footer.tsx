import type { ScreenId } from '../types';

interface FooterProps {
  onNavigate: (screen: ScreenId) => void;
}

export function Footer({ onNavigate }: FooterProps) {
  return (
    <footer className="border-t border-[#262626] bg-[#0e0e0e] mt-20">
      <div className="max-w-[1280px] mx-auto px-5 md:px-10 py-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
        <div>
          <span className="font-display text-lg font-bold tracking-tight text-white">
            Valkyrie Moto
          </span>
          <p className="mt-2 text-sm text-[#a3a3a3] max-w-md">
            Women&apos;s motorcycling collective and shared wrenching garages across San Francisco, Los Angeles, Seattle, and Denver.
          </p>
        </div>

        <nav className="flex flex-wrap items-center gap-6 text-sm text-[#a3a3a3]" aria-label="Footer Navigation">
          <button
            type="button"
            onClick={() => onNavigate('collective')}
            className="hover:text-[#00ff66] transition-colors whitespace-nowrap cursor-pointer"
          >
            Collective
          </button>
          <button
            type="button"
            onClick={() => onNavigate('calendar')}
            className="hover:text-[#00ff66] transition-colors whitespace-nowrap cursor-pointer"
          >
            Event Calendar
          </button>
          <button
            type="button"
            onClick={() => onNavigate('garage')}
            className="hover:text-[#00ff66] transition-colors whitespace-nowrap cursor-pointer"
          >
            Garage Showcase
          </button>
          <button
            type="button"
            onClick={() => onNavigate('membership')}
            className="hover:text-[#00ff66] transition-colors whitespace-nowrap cursor-pointer"
          >
            Membership
          </button>
        </nav>

        <div className="text-xs text-[#525252] font-mono">
          © 2026 Valkyrie Moto Collective
        </div>
      </div>
    </footer>
  );
}
