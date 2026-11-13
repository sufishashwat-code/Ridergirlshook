import { useState, type FormEvent } from 'react';
import { Check, ShieldCheck } from 'lucide-react';
import { MEMBERSHIP_TIERS, WRENCH_BAY_IMAGE } from '../data/mockData';
import type { ChapterName, MemberApplication, MembershipTier, RiderPass, ScreenId } from '../types';
import { ImageWithFallback } from './ImageWithFallback';

interface MembershipScreenProps {
  riderPass: RiderPass | null;
  onSubmitApplication: (application: MemberApplication) => void;
  onResetPass: () => void;
  onNavigate: (screen: ScreenId) => void;
}

const CHAPTERS: ChapterName[] = ['San Francisco', 'Los Angeles', 'Seattle', 'Denver'];
const EXPERIENCE_LEVELS: MemberApplication['experienceLevel'][] = [
  '1-2 Years',
  '3-5 Years',
  '5+ Years / Track',
];

const RIDING_STANDARDS = [
  {
    index: '01.',
    title: 'Drop-System Group Discipline',
    detail:
      'Every turn on multi-bike runs is marked by the rider behind the Road Captain until the sweep arrives—ensuring zero pressure to ride above your sightline.',
  },
  {
    index: '02.',
    title: 'Full Armored Gear Standard',
    detail:
      'ECE/Snell full-face helmet, CE-rated jacket, armored riding pants or Kevlar denim, gauntlets, and over-the-ankle boots are mandatory at rollout.',
  },
  {
    index: '03.',
    title: 'Zero-Ego Wrench Clinics',
    detail:
      'Monthly Bay 4 sessions teach torque-spec verification, chain tensioning, tire plugging, and suspension sag without gatekeeping.',
  },
  {
    index: '04.',
    title: 'No Rider Left Behind',
    detail:
      'Every chapter departure rolls with a dedicated sweep rider equipped with plug kits, jump packs, and satellite comms.',
  },
];

export function MembershipScreen({
  riderPass,
  onSubmitApplication,
  onResetPass,
  onNavigate,
}: MembershipScreenProps) {
  const [selectedTier, setSelectedTier] = useState<MembershipTier['id']>('full-patch');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [chapter, setChapter] = useState<ChapterName>('San Francisco');
  const [primaryBike, setPrimaryBike] = useState('');
  const [experienceLevel, setExperienceLevel] =
    useState<MemberApplication['experienceLevel']>('3-5 Years');
  const [agreedToCode, setAgreedToCode] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSelectTier = (tierId: MembershipTier['id']) => {
    setSelectedTier(tierId);
    const formEl = document.getElementById('membership-application');
    if (formEl) {
      formEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const nextErrors: Record<string, string> = {};

    if (!fullName.trim()) {
      nextErrors.fullName = 'Please enter your full name.';
    }
    const emailTrimmed = email.trim();
    if (!emailTrimmed || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailTrimmed)) {
      nextErrors.email = 'Please enter a valid email address.';
    }
    if (!primaryBike.trim()) {
      nextErrors.primaryBike = 'Please list your primary motorcycle make and model.';
    }
    if (!agreedToCode) {
      nextErrors.agreedToCode = 'You must agree to the Valkyrie Moto riding and gear code.';
    }

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    onSubmitApplication({
      fullName: fullName.trim(),
      email: emailTrimmed,
      chapter,
      primaryBike: primaryBike.trim(),
      experienceLevel,
      tierId: selectedTier,
      agreedToCode,
    });
  };

  return (
    <div className="max-w-[1280px] mx-auto px-5 md:px-10 pt-8 md:pt-12 space-y-16 md:space-y-20">
      {/* Header */}
      <div className="border-b border-[#262626] pb-6">
        <p className="text-xs font-display font-semibold uppercase tracking-[0.08em] text-[#00ff66]">
          Collective Onboarding
        </p>
        <h1
          className="mt-2 font-display text-3xl md:text-4xl font-bold text-white tracking-tight"
          style={{ textWrap: 'balance' }}
        >
          Club Membership &amp; Workshop Access
        </h1>
        <p className="mt-2 text-sm md:text-[15px] text-[#a3a3a3] max-w-2xl">
          Choose the membership level that matches how you ride. Start free on Prospect trial runs or unlock full 24/7 wrench bay access across all four regional garages.
        </p>
      </div>

      {/* Membership Tiers */}
      <section aria-label="Membership Tiers" className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {MEMBERSHIP_TIERS.map((tier) => {
          const isSelected = selectedTier === tier.id;
          return (
            <article
              key={tier.id}
              className={`border bg-[#181818] p-6 md:p-7 flex flex-col justify-between transition-colors ${
                isSelected || tier.highlighted
                  ? 'border-[#00ff66]'
                  : 'border-[#262626] hover:border-[#333333]'
              }`}
            >
              <div>
                <div className="flex items-baseline justify-between gap-4">
                  <h2 className="font-display text-xl font-bold text-white">{tier.name}</h2>
                  <span className="font-mono text-2xl font-semibold tabular-nums text-[#00ff66]">
                    {tier.annualDues}
                  </span>
                </div>
                <div className="mt-1 text-xs text-[#a3a3a3]">{tier.cadence}</div>
                <p className="mt-4 text-sm leading-relaxed text-[#e5e2e1]">{tier.summary}</p>

                <div className="mt-6 pt-5 border-t border-[#262626] space-y-4">
                  <div>
                    <div className="font-display text-[10px] font-bold uppercase tracking-widest text-[#a3a3a3] mb-2">
                      Requirements
                    </div>
                    <ul className="space-y-2">
                      {tier.requirements.map((req) => (
                        <li key={req} className="text-xs text-[#a3a3a3] leading-relaxed">
                          • {req}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <div className="font-display text-[10px] font-bold uppercase tracking-widest text-[#a3a3a3] mb-2">
                      Included Privileges
                    </div>
                    <ul className="space-y-2">
                      {tier.perks.map((perk) => (
                        <li key={perk} className="flex items-start gap-2 text-xs text-white leading-relaxed">
                          <Check className="w-3.5 h-3.5 text-[#00ff66] shrink-0 mt-0.5" aria-hidden="true" />
                          <span>{perk}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-[#262626]">
                <button
                  type="button"
                  onClick={() => handleSelectTier(tier.id)}
                  className={`w-full rounded-full font-display text-xs font-bold uppercase tracking-wider px-5 py-3 min-h-[44px] transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[#00ff66] text-[#121212] volt-glow'
                      : 'border border-[#333333] bg-[#1e1e1e] text-white hover:border-[#00ff66] hover:text-[#00ff66]'
                  }`}
                >
                  {isSelected ? `Selected: ${tier.name}` : `Select ${tier.name}`}
                </button>
              </div>
            </article>
          );
        })}
      </section>

      {/* Collective Code & Bay Split */}
      <section className="grid grid-cols-1 lg:grid-cols-12 border border-[#262626] bg-[#181818] items-stretch">
        <div className="lg:col-span-5 min-h-[280px] border-b lg:border-b-0 lg:border-r border-[#262626] bg-[#0e0e0e]">
          <ImageWithFallback
            src={WRENCH_BAY_IMAGE}
            alt="Valkyrie Moto members performing brake maintenance in shared Bay 4 workshop"
            className="w-full h-full lg:h-full object-cover"
          />
        </div>
        <div className="lg:col-span-7 p-6 md:p-10 space-y-6">
          <div>
            <p className="text-xs font-display font-semibold uppercase tracking-[0.08em] text-[#00e5ff]">
              Collective Standards
            </p>
            <h2 className="mt-1 font-display text-2xl font-bold text-white tracking-tight">
              Our Non-Negotiable Riding Code
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2 border-t border-[#262626]">
            {RIDING_STANDARDS.map((item) => (
              <div key={item.index}>
                <div className="font-mono text-xs font-semibold text-[#00ff66]">{item.index}</div>
                <h3 className="mt-1 font-display text-base font-semibold text-white">
                  {item.title}
                </h3>
                <p className="mt-1.5 text-xs leading-relaxed text-[#a3a3a3]">{item.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Application Form OR Issued Session Pass */}
      <section id="membership-application" className="scroll-mt-24">
        {riderPass ? (
          <div className="border border-[#00ff66] bg-[#181818] p-7 md:p-10 space-y-6">
            <div className="flex flex-wrap items-start justify-between gap-4 border-b border-[#262626] pb-6">
              <div>
                <div className="inline-flex items-center gap-2 text-xs font-display font-semibold uppercase tracking-widest text-[#00ff66]">
                  <ShieldCheck className="w-4 h-4" aria-hidden="true" />
                  Session Rider Pass Issued
                </div>
                <h2 className="mt-2 font-display text-2xl md:text-3xl font-bold text-white">
                  Welcome to Valkyrie Moto, {riderPass.fullName}
                </h2>
                <p className="mt-1 text-sm text-[#a3a3a3]">
                  Your session credential is active for {riderPass.chapter} Chapter rollouts and Wrench Night check-ins.
                </p>
              </div>
              <div className="font-mono text-right">
                <div className="text-[10px] uppercase tracking-widest text-[#a3a3a3]">Pass ID</div>
                <div className="text-lg font-semibold tabular-nums text-[#00e5ff]">
                  {riderPass.passCode}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
              <div>
                <div className="font-display text-[10px] font-bold uppercase tracking-widest text-[#a3a3a3]">
                  Chapter
                </div>
                <div className="mt-1 text-sm font-medium text-white">{riderPass.chapter}</div>
              </div>
              <div>
                <div className="font-display text-[10px] font-bold uppercase tracking-widest text-[#a3a3a3]">
                  Membership Tier
                </div>
                <div className="mt-1 text-sm font-medium text-[#00ff66]">
                  {MEMBERSHIP_TIERS.find((t) => t.id === riderPass.tierId)?.name}
                </div>
              </div>
              <div>
                <div className="font-display text-[10px] font-bold uppercase tracking-widest text-[#a3a3a3]">
                  Primary Machine
                </div>
                <div className="mt-1 text-sm font-medium text-white">{riderPass.primaryBike}</div>
              </div>
              <div>
                <div className="font-display text-[10px] font-bold uppercase tracking-widest text-[#a3a3a3]">
                  Experience
                </div>
                <div className="mt-1 text-sm font-medium text-white">{riderPass.experienceLevel}</div>
              </div>
            </div>

            <div className="pt-6 border-t border-[#262626] flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={() => onNavigate('calendar')}
                className="inline-flex items-center justify-center rounded-full bg-[#00ff66] text-[#121212] font-display text-xs font-bold uppercase tracking-wider px-6 py-3 min-h-[44px] hover:bg-[#3bff88] cursor-pointer"
              >
                RSVP to Your First Ride
              </button>
              <button
                type="button"
                onClick={onResetPass}
                className="inline-flex items-center justify-center rounded-full border border-[#333333] bg-[#1e1e1e] text-white font-display text-xs font-semibold uppercase tracking-wider px-5 py-3 min-h-[44px] hover:border-[#00ff66] hover:text-[#00ff66] transition-colors cursor-pointer"
              >
                Edit Application
              </button>
            </div>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            noValidate
            className="border border-[#262626] bg-[#181818] p-7 md:p-10 space-y-6"
          >
            <div className="border-b border-[#262626] pb-5">
              <p className="text-xs font-display font-semibold uppercase tracking-[0.08em] text-[#00ff66]">
                Application Intake
              </p>
              <h2 className="mt-1 font-display text-2xl font-bold text-white">
                Request Chapter Membership
              </h2>
              <p className="mt-1 text-sm text-[#a3a3a3]">
                Selected Tier:{' '}
                <span className="text-white font-medium">
                  {MEMBERSHIP_TIERS.find((t) => t.id === selectedTier)?.name}
                </span>
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="member-full-name"
                  className="block font-display text-[10px] font-bold uppercase tracking-[0.1em] text-[#a3a3a3] mb-1.5"
                >
                  Full Name
                </label>
                <input
                  id="member-full-name"
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Alex Rivera"
                  className="w-full bg-[#1e1e1e] border-b-2 border-[#333333] focus:border-[#00ff66] focus:outline-none text-sm text-white placeholder-[#525252] px-3 py-3"
                />
                {errors.fullName && (
                  <p className="mt-1.5 text-xs text-[#ffb4ab]" role="alert">
                    {errors.fullName}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="member-email"
                  className="block font-display text-[10px] font-bold uppercase tracking-[0.1em] text-[#a3a3a3] mb-1.5"
                >
                  Email Address
                </label>
                <input
                  id="member-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="alex@valkyrierider.org"
                  className="w-full bg-[#1e1e1e] border-b-2 border-[#333333] focus:border-[#00ff66] focus:outline-none text-sm text-white placeholder-[#525252] px-3 py-3"
                />
                {errors.email && (
                  <p className="mt-1.5 text-xs text-[#ffb4ab]" role="alert">
                    {errors.email}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="member-chapter"
                  className="block font-display text-[10px] font-bold uppercase tracking-[0.1em] text-[#a3a3a3] mb-1.5"
                >
                  Home Chapter
                </label>
                <select
                  id="member-chapter"
                  value={chapter}
                  onChange={(e) => setChapter(e.target.value as ChapterName)}
                  className="w-full bg-[#1e1e1e] border-b-2 border-[#333333] focus:border-[#00ff66] focus:outline-none text-sm text-white px-3 py-3 cursor-pointer"
                >
                  {CHAPTERS.map((chap) => (
                    <option key={chap} value={chap}>
                      {chap}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  htmlFor="member-bike"
                  className="block font-display text-[10px] font-bold uppercase tracking-[0.1em] text-[#a3a3a3] mb-1.5"
                >
                  Primary Motorcycle
                </label>
                <input
                  id="member-bike"
                  type="text"
                  value={primaryBike}
                  onChange={(e) => setPrimaryBike(e.target.value)}
                  placeholder="e.g., 2023 Triumph Street Triple RS"
                  className="w-full bg-[#1e1e1e] border-b-2 border-[#333333] focus:border-[#00ff66] focus:outline-none text-sm text-white placeholder-[#525252] px-3 py-3"
                />
                {errors.primaryBike && (
                  <p className="mt-1.5 text-xs text-[#ffb4ab]" role="alert">
                    {errors.primaryBike}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="member-experience"
                  className="block font-display text-[10px] font-bold uppercase tracking-[0.1em] text-[#a3a3a3] mb-1.5"
                >
                  Street / Dirt Experience
                </label>
                <select
                  id="member-experience"
                  value={experienceLevel}
                  onChange={(e) =>
                    setExperienceLevel(e.target.value as MemberApplication['experienceLevel'])
                  }
                  className="w-full bg-[#1e1e1e] border-b-2 border-[#333333] focus:border-[#00ff66] focus:outline-none text-sm text-white px-3 py-3 cursor-pointer"
                >
                  {EXPERIENCE_LEVELS.map((lvl) => (
                    <option key={lvl} value={lvl}>
                      {lvl}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  htmlFor="member-tier"
                  className="block font-display text-[10px] font-bold uppercase tracking-[0.1em] text-[#a3a3a3] mb-1.5"
                >
                  Membership Tier
                </label>
                <select
                  id="member-tier"
                  value={selectedTier}
                  onChange={(e) => setSelectedTier(e.target.value as MembershipTier['id'])}
                  className="w-full bg-[#1e1e1e] border-b-2 border-[#333333] focus:border-[#00ff66] focus:outline-none text-sm text-white px-3 py-3 cursor-pointer"
                >
                  {MEMBERSHIP_TIERS.map((tier) => (
                    <option key={tier.id} value={tier.id}>
                      {tier.name} ({tier.annualDues})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="pt-2">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={agreedToCode}
                  onChange={(e) => setAgreedToCode(e.target.checked)}
                  className="mt-0.5 w-4 h-4 accent-[#00ff66] rounded-none border border-[#333333] bg-[#1e1e1e] cursor-pointer"
                />
                <span className="text-sm text-[#e5e2e1]">
                  I hold a valid motorcycle endorsement and agree to follow Valkyrie Moto&apos;s full-armor gear standard and drop-system formation protocol.
                </span>
              </label>
              {errors.agreedToCode && (
                <p className="mt-1.5 text-xs text-[#ffb4ab]" role="alert">
                  {errors.agreedToCode}
                </p>
              )}
            </div>

            <div className="pt-4 border-t border-[#262626] flex flex-wrap items-center justify-between gap-4">
              <span className="text-xs text-[#a3a3a3]">
                Generates an instant demo Rider Pass for this session.
              </span>
              <button
                type="submit"
                className="inline-flex items-center justify-center rounded-full bg-[#00ff66] text-[#121212] font-display text-xs font-bold uppercase tracking-wider px-7 py-3.5 min-h-[44px] hover:bg-[#3bff88] volt-glow transition-all cursor-pointer whitespace-nowrap"
              >
                Submit Application
              </button>
            </div>
          </form>
        )}
      </section>
    </div>
  );
}
