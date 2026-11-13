export type ScreenId = 'collective' | 'calendar' | 'garage' | 'membership';

export type RideDiscipline = 'Canyon' | 'Dual-Sport' | 'Night Run' | 'Wrench Night';
export type RideDifficulty = 'All Levels' | 'Intermediate' | 'Spirited';
export type ChapterName = 'San Francisco' | 'Los Angeles' | 'Seattle' | 'Denver';

export interface RouteWaypoint {
  mile: number;
  label: string;
  elevationFt: number;
  notes: string;
}

export interface RideEvent {
  id: string;
  title: string;
  dateLabel: string;
  timeLabel: string;
  chapter: ChapterName;
  discipline: RideDiscipline;
  difficulty: RideDifficulty;
  distanceMiles: number;
  elevationGainFt: number;
  surfaceSplit: string;
  pace: string;
  roadCaptain: string;
  roadCaptainTier: string;
  meetingPoint: string;
  summary: string;
  waypoints: RouteWaypoint[];
  gearChecklist: string[];
  capacity: number;
  baseAttendeeCount: number;
  imageUrl: string;
}

export type BikeCategory = 'Sport' | 'Dual-Sport' | 'Custom' | 'Touring';

export interface GarageBuild {
  id: string;
  riderName: string;
  riderHandle: string;
  riderTier: 'Road Captain' | 'Iron Butt' | 'Lead Mechanic' | 'Solo Adventurer';
  chapter: ChapterName;
  bikeModel: string;
  year: number;
  category: BikeCategory;
  engineCc: number;
  horsepower: number;
  torqueLbFt: number;
  wetWeightLbs: number;
  tires: string;
  exhaust: string;
  suspension: string;
  mods: string[];
  story: string;
  imageUrl: string;
}

export interface MembershipTier {
  id: 'prospect' | 'full-patch' | 'road-captain';
  name: string;
  annualDues: string;
  cadence: string;
  summary: string;
  requirements: string[];
  perks: string[];
  highlighted?: boolean;
}

export interface MemberApplication {
  fullName: string;
  email: string;
  chapter: ChapterName;
  primaryBike: string;
  experienceLevel: '1-2 Years' | '3-5 Years' | '5+ Years / Track';
  tierId: MembershipTier['id'];
  agreedToCode: boolean;
}

export interface RiderPass extends MemberApplication {
  passCode: string;
  issuedDate: string;
}
