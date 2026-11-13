import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import type { ScreenId } from '../types';

interface TopBarProps {
  activeScreen: ScreenId;
  onNavigate: (screen: ScreenId) => void;
  rsvpCount: number;
}

const NAV_ITEMS: { id: ScreenId; label: string }[] = [
  { id: 'collective', label: 'Collective' },
  { id: 'calendar', label: 'Calendar' },
  { id: 'garage', label: 'Garage' },
  { id: 'membership', label: 'Membership' },
];

export function TopBar({ activeScreen, onNavigate, rsvpCount }: TopBarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSelect = (screen: ScreenId) => {
    onNavigate(screen);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#131313]/95 backdrop-blur-md border-b border-[#262626]">
      <div className="max-w-[1280px] mx-auto px-5 md:px-10 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Single-element Brand Wordmark */}
        <button
          type="button"
          onClick={() => handleSelect('collective')}
          className="font-display text-lg md:text-xl font-bold tracking-tight text-white hover:text-[#00ff66] transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-[#00ff66] focus-visible:outline-offset-4"
        >
          Valkyrie Moto
        </button>

        {/* Zone 2: 4 Single-line Text Navigation Links */}
        <nav className="hidden md:flex items-center gap-8" aria-label="Primary Navigation">
          {NAV_ITEMS.map((item) => {
            const isActive = activeScreen === item.id;
            const showCount = item.id === 'calendar' && rsvpCount > 0;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleSelect(item.id)}
                className={`relative py-1 text-sm font-medium transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-[#00ff66] focus-visible:outline-offset-4 ${
                  isActive ? 'text-white' : 'text-[#a3a3a3] hover:text-white'
                }`}
              >
                {item.label}
                {showCount && (
                  <span className="ml-1.5 font-mono text-[11px] tabular-nums text-[#00ff66]">
                    ({rsvpCount})
                  </span>
                )}
                <span
                  aria-hidden="true"
                  className={`absolute left-0 right-0 -bottom-[2px] h-[2px] bg-[#00ff66] transition-opacity duration-150 ${
                    isActive ? 'opacity-100' : 'opacity-0'
                  }`}
                />
              </button>
            );
          })}
        </nav>

        {/* Zone 3: 1 Primary CTA Action + Mobile Menu Trigger */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={() => handleSelect('membership')}
            className="hidden sm:inline-flex items-center justify-center rounded-full bg-[#00ff66] text-[#121212] font-display text-xs font-bold uppercase tracking-wider px-5 py-2.5 min-h-[40px] hover:bg-[#3bff88] volt-glow transition-all duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2"
          >
            Join Collective
          </button>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileMenuOpen}
            className="md:hidden inline-flex items-center justify-center w-11 h-11 rounded-full border border-[#333333] bg-[#1e1e1e] text-white hover:border-[#00ff66] transition-colors cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#181818] border-b border-[#262626] px-5 py-4 space-y-2">
          {NAV_ITEMS.map((item) => {
            const isActive = activeScreen === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleSelect(item.id)}
                className={`w-full text-left px-3 py-3 text-base font-medium border-b border-[#262626] last:border-b-0 transition-colors cursor-pointer ${
                  isActive ? 'text-[#00ff66]' : 'text-[#e5e2e1]'
                }`}
              >
                {item.label}
                {item.id === 'calendar' && rsvpCount > 0 ? ` (${rsvpCount})` : ''}
              </button>
            );
          })}
          <div className="pt-2">
            <button
              type="button"
              onClick={() => handleSelect('membership')}
              className="w-full rounded-full bg-[#00ff66] text-[#121212] font-display text-xs font-bold uppercase tracking-wider px-5 py-3 min-h-[44px] cursor-pointer"
            >
              Join Collective
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
