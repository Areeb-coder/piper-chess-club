export type EventCategory = 'flagship' | 'womens' | 'freestyle' | 'rivalry' | 'freshers' | 'department';
export type EventStatus = 'upcoming' | 'ongoing' | 'completed';

export interface Event {
  slug: string;
  name: string;
  short_tagline: string;
  event_category: EventCategory;
  visibility_rank: number;
  icon?: string;
  primary_color: string;
  secondary_color?: string;
  hero_image?: string;
  overview_richtext: string;
  format_summary: string;
  typical_time_control: string;
  is_active: boolean;
}

export interface EventResult {
  rank: string;
  names: string[];
  department?: string;
}

export interface EventEdition {
  slug: string;
  eventSlug: string;
  year: number;
  title: string;
  start_date: string;
  end_date: string;
  location: string;
  status: EventStatus;
  hero_image?: string;
  edition_intro: string;
  format_notes?: string;
  heroIntro?: string;
  overview?: string;
  highlights?: string[];
  results?: EventResult[];
  posterUrl?: string;
  galleryUrls?: string[];
}

export interface Team {
  id: string;
  name: string;
  code?: string;
  department?: string;
  is_piper_team: boolean;
  description?: string;
}

export interface GroupStanding {
  teamId: string;
  played: number;
  wins: number;
  draws: number;
  losses: number;
  points: number;
  tiebreak_score?: number;
  position: number;
}

export interface GroupStage {
  id: string;
  editionSlug: string;
  name: string;
  description?: string;
  rounds?: number;
  standings: GroupStanding[];
}

export interface KnockoutRound {
  id: string;
  name: string;
  order: number;
  matches: Match[];
}

export interface KnockoutBracket {
  id: string;
  editionSlug: string;
  name: string;
  round_order: number;
  rounds: KnockoutRound[];
}

export interface Match {
  id: string;
  board_label?: string;
  result_type: 'normal' | 'sudden_death' | 'tiebreak';
  score_home: number;
  score_away: number;
  notes?: string;
  home_team_id?: string;
  away_team_id?: string;
}

export interface WinnerRecord {
  id: string;
  editionSlug: string;
  title: string;
  category: 'overall' | 'category' | 'board' | 'special';
  description?: string;
  teamId?: string;
  playerId?: string;
}

export interface LegacyEntry {
  id: string;
  year: number;
  title: string;
  description: string;
  type: 'milestone' | 'office_bearers' | 'memorable_event';
}
