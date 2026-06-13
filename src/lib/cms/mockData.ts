import { Event, EventEdition, Team, GroupStage, KnockoutBracket, WinnerRecord, LegacyEntry } from './types';

export const events: Event[] = [
  {
    slug: 'olympiad',
    name: 'Chess Olympiad',
    short_tagline: 'The World Cup of Piper',
    event_category: 'flagship',
    visibility_rank: 1,
    primary_color: 'var(--accent-gold)',
    overview_richtext: '<p>The ultimate test of chess mastery. Teams from across the university battle for the ultimate crown.</p>',
    format_summary: '16 teams, 4 boards per match',
    typical_time_control: '10+2',
    is_active: true
  },
  {
    slug: 'womens-olympiad',
    name: 'Women\'s Chess Olympiad',
    short_tagline: 'Absolute dominance.',
    event_category: 'womens',
    visibility_rank: 2,
    primary_color: 'var(--accent-womens)',
    overview_richtext: '<p>Our flagship women’s tournament showcasing the strongest female players in the grid.</p>',
    format_summary: '8 teams, 2 boards per match',
    typical_time_control: '10+2',
    is_active: true
  },
  {
    slug: 'freestyle',
    name: 'Freestyle Chess',
    short_tagline: 'No memorised lines. Just chess.',
    event_category: 'freestyle',
    visibility_rank: 3,
    primary_color: 'var(--accent-freestyle)',
    overview_richtext: '<p>Chess960 format. Pure calculation and raw intuition.</p>',
    format_summary: '32 players, Swiss + Knockout',
    typical_time_control: '15+10',
    is_active: true
  },
  {
    slug: 'freshers',
    name: 'Freshers Championship',
    short_tagline: 'The First Blood.',
    event_category: 'freshers',
    visibility_rank: 4,
    primary_color: '#3498db',
    overview_richtext: '<p>The ultimate proving ground for the newest batch of students. Unrated, chaotic, and completely unpredictable.</p>',
    format_summary: 'Swiss System, 7 Rounds',
    typical_time_control: '10+0',
    is_active: true
  },
  {
    slug: 'candidates',
    name: 'Candidates Tournament',
    short_tagline: 'For the Right to Challenge.',
    event_category: 'rivalry',
    visibility_rank: 5,
    primary_color: '#9b59b6',
    overview_richtext: '<p>The most exclusive individual tournament of the year. Only the top 8 players are invited.</p>',
    format_summary: 'Double Round-Robin',
    typical_time_control: '15+10',
    is_active: true
  },
  {
    slug: 'junior-vs-senior',
    name: 'Junior vs Senior Pool',
    short_tagline: 'Experience meets Ambition.',
    event_category: 'rivalry',
    visibility_rank: 6,
    primary_color: '#e74c3c',
    overview_richtext: '<p>A multi-board team match pitting the experienced seniors against the hungry juniors.</p>',
    format_summary: '20-Board Team Match',
    typical_time_control: '15+5',
    is_active: true
  },
  {
    slug: 'inter-department',
    name: 'Inter-Department Championship',
    short_tagline: 'Settle the Score.',
    event_category: 'department',
    visibility_rank: 7,
    primary_color: '#2ecc71',
    overview_richtext: '<p>A brutal knockout tournament where university departments fight for ultimate bragging rights.</p>',
    format_summary: 'Knockout Bracket',
    typical_time_control: '10+2',
    is_active: true
  }
];

export const editions: EventEdition[] = [
  {
    slug: 'olympiad-2026',
    eventSlug: 'olympiad',
    year: 2026,
    title: 'Piper Chess Olympiad 2026',
    start_date: '2026-03-01',
    end_date: '2026-03-15',
    location: 'Main Hall',
    status: 'completed',
    edition_intro: '<p>The most brutal Olympiad yet, with upsets in every round.</p>'
  },
  {
    slug: 'womens-olympiad-2026',
    eventSlug: 'womens-olympiad',
    year: 2026,
    title: 'Women\'s Olympiad 2026',
    start_date: '2026-04-01',
    end_date: '2026-04-10',
    location: 'Main Hall',
    status: 'completed',
    edition_intro: '<p>A masterclass in positional play.</p>'
  },
  {
    slug: 'freestyle-2026',
    eventSlug: 'freestyle',
    year: 2026,
    title: 'Freestyle Chaos 2026',
    start_date: '2026-05-01',
    end_date: '2026-05-05',
    location: 'Underground Studio',
    status: 'ongoing',
    edition_intro: '<p>Who needs opening prep?</p>'
  }
];

export const teams: Team[] = [
  { id: 't1', name: 'Knights of CS', code: 'CS', is_piper_team: true },
  { id: 't2', name: 'Law Rooks', code: 'LAW', is_piper_team: true },
  { id: 't3', name: 'Med Bishops', code: 'MED', is_piper_team: true },
  { id: 't4', name: 'Arts Kings', code: 'ARTS', is_piper_team: true },
];

export const mockGroups: GroupStage[] = [
  {
    id: 'g1',
    editionSlug: 'olympiad-2026',
    name: 'Group A',
    standings: [
      { teamId: 'Knights of CS', played: 3, wins: 3, draws: 0, losses: 0, points: 9, position: 1 },
      { teamId: 'Law Rooks', played: 3, wins: 1, draws: 1, losses: 1, points: 4, position: 2 },
      { teamId: 'Med Bishops', played: 3, wins: 1, draws: 0, losses: 2, points: 3, position: 3 },
      { teamId: 'Arts Kings', played: 3, wins: 0, draws: 1, losses: 2, points: 1, position: 4 },
    ]
  }
];

export const mockBrackets: KnockoutBracket[] = [
  {
    id: 'b1',
    editionSlug: 'olympiad-2026',
    name: 'Championship Bracket',
    round_order: 1,
    rounds: [
      {
        id: 'r1',
        name: 'Semifinals',
        order: 1,
        matches: [
          { id: 'm1', result_type: 'normal', score_home: 2.5, score_away: 1.5, home_team_id: 'Knights of CS', away_team_id: 'Med Bishops' },
          { id: 'm2', result_type: 'tiebreak', score_home: 2, score_away: 2, home_team_id: 'Law Rooks', away_team_id: 'Arts Kings', notes: 'Law won on blitz tiebreaks' }
        ]
      },
      {
        id: 'r2',
        name: 'Final',
        order: 2,
        matches: [
          { id: 'm3', result_type: 'normal', score_home: 3, score_away: 1, home_team_id: 'Knights of CS', away_team_id: 'Law Rooks' }
        ]
      }
    ]
  }
];

export const legacyEntries: LegacyEntry[] = [
  {
    id: 'l1',
    year: 2024,
    title: 'The Great Resurgence',
    description: 'Piper Chess Club transitions from a casual meetup to a competitive powerhouse.',
    type: 'milestone'
  },
  {
    id: 'l2',
    year: 2025,
    title: 'First Freestyle Tournament',
    description: 'Introducing Chess960 to the competitive ecosystem, breaking opening prep dependency.',
    type: 'memorable_event'
  }
];
