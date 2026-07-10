import { Event, EventEdition, Team, GroupStage, KnockoutBracket, WinnerRecord, LegacyEntry } from './types';

export const events: Event[] = [
  {
    "slug": "olympiad",
    "name": "Chess Olympiad",
    "short_tagline": "The World Cup of Piper",
    "event_category": "flagship",
    "visibility_rank": 1,
    "primary_color": "var(--accent-gold)",
    "overview_richtext": "<p>The ultimate test of chess mastery. Teams from across the university battle for the ultimate crown.</p>",
    "format_summary": "16 teams, 3 boards per match",
    "typical_time_control": "10+2",
    "is_active": true
  },
  {
    "slug": "womens",
    "name": "Women's Chess Olympiad",
    "short_tagline": "Absolute dominance.",
    "event_category": "womens",
    "visibility_rank": 2,
    "primary_color": "var(--accent-womens)",
    "overview_richtext": "<p>Our flagship women’s tournament showcasing the strongest female players in the grid.</p>",
    "format_summary": "8 teams, 3 boards per match",
    "typical_time_control": "10+2",
    "is_active": true
  },
  {
    "slug": "inter-department",
    "name": "Inter Department Chess League",
    "short_tagline": "Settle the Score.",
    "event_category": "department",
    "visibility_rank": 3,
    "primary_color": "#2ecc71",
    "overview_richtext": "<p>A brutal knockout tournament where university departments fight for ultimate bragging rights.</p>",
    "format_summary": "Knockout Bracket",
    "typical_time_control": "10+2",
    "is_active": true
  },
  {
    "slug": "piper-championship",
    "name": "Piper Chess Championship",
    "short_tagline": "The Pinnacle.",
    "event_category": "flagship",
    "visibility_rank": 4,
    "primary_color": "#e67e22",
    "overview_richtext": "<p>The pinnacle of individual achievement.</p>",
    "format_summary": "Individual",
    "typical_time_control": "15+10",
    "is_active": true
  },
  {
    "slug": "candidates",
    "name": "Candidates Tournament",
    "short_tagline": "For the Right to Challenge.",
    "event_category": "rivalry",
    "visibility_rank": 5,
    "primary_color": "#9b59b6",
    "overview_richtext": "<p>The most exclusive individual tournament of the year. Only the top 8 players are invited.</p>",
    "format_summary": "Double Round-Robin",
    "typical_time_control": "15+10",
    "is_active": true
  },
  {
    "slug": "freshers",
    "name": "Freshers Chess",
    "short_tagline": "The First Blood.",
    "event_category": "freshers",
    "visibility_rank": 6,
    "primary_color": "#3498db",
    "overview_richtext": "<p>The ultimate proving ground for the newest batch of students. Unrated, chaotic, and completely unpredictable.</p>",
    "format_summary": "Swiss System, 7 Rounds",
    "typical_time_control": "10+0",
    "is_active": true
  },
  {
    "slug": "bullet-championship",
    "name": "Bullet Championship",
    "short_tagline": "Instinct and Speed.",
    "event_category": "freestyle",
    "visibility_rank": 7,
    "primary_color": "#e74c3c",
    "overview_richtext": "<p>Instinct, speed, and ruthless precision.</p>",
    "format_summary": "Arena",
    "typical_time_control": "1+0",
    "is_active": true
  },
  {
    "slug": "freestyle",
    "name": "Freestyle Chess",
    "short_tagline": "No memorised lines. Just chess.",
    "event_category": "freestyle",
    "visibility_rank": 8,
    "primary_color": "var(--accent-freestyle)",
    "overview_richtext": "<p>Chess960 format. Pure calculation and raw intuition.</p>",
    "format_summary": "32 players, Swiss + Knockout",
    "typical_time_control": "15+10",
    "is_active": true
  },
  {
    "slug": "senior-and-junior-pool",
    "name": "Senior and junior pool",
    "short_tagline": "An exciting chess event.",
    "event_category": "freestyle",
    "visibility_rank": 10,
    "primary_color": "#3498db",
    "overview_richtext": "<p>Welcome to Senior and junior pool.</p>",
    "format_summary": "Standard",
    "typical_time_control": "10+0",
    "is_active": true
  }
];

export const editions: EventEdition[] = [
  {
    "slug": "olympiad-2025",
    "eventSlug": "olympiad",
    "year": 2025,
    "title": "Chess Olympiad 2025",
    "start_date": "2025-09-26",
    "end_date": "2025-09-27",
    "location": "Main Hall",
    "status": "completed",
    "edition_intro": "",
    "heroIntro": "The title was earned over the board, not handed out. The 2025 Chess Olympiad stood as a testament to competitive resilience, demanding nothing less than absolute precision.",
    "overview": "Across two days of competition, teams battled for more than points—they played for standing. The 2025 Olympiad brought together established veterans and rising challengers in an atmosphere defined by intense calculation and strategic depth. In a field where a single inaccuracy could shatter championship aspirations, the eventual victors proved their mastery through unwavering focus.",
    "highlights": [
      "High-stakes encounters dictated the shifting balance of power.",
      "A relentless pace that tested stamina and tactical vision over two decisive days.",
      "Unyielding defense and surgical offense characterized the leading boards."
    ],
    "results": [
      {
        "rank": "Winner Team",
        "names": [
          "Sayyed Abdul Hannan",
          "Ghulam Sarwar",
          "Feriha Akhtar"
        ]
      },
      {
        "rank": "Runner Up",
        "names": [
          "Sagnik Mittra",
          "Ali Israr",
          "Zavaibah"
        ]
      },
      {
        "rank": "Third Place",
        "names": [
          "Paras Sharma",
          "Arshad Ali",
          "Aqsa Tanzim"
        ]
      },
      {
        "rank": "Fourth Place",
        "names": [
          "Abdul Mughni",
          "Md Anas",
          "Inara"
        ]
      }
    ],
    "posterUrl": "/media/events/olympiad/2025/poster/F.E.T. CANTEEN, JAMIA MILLIA ISLAMIA, September 26_ - 4000 × 5000px.pdf",
    "galleryUrls": [
      "/media/events/olympiad/2025/photos/1st.jpeg"
    ]
  },
  {
    "slug": "olympiad-2024",
    "eventSlug": "olympiad",
    "year": 2024,
    "title": "Chess Olympiad 2024",
    "start_date": "2024-09-20",
    "end_date": "2024-09-22",
    "location": "Main Hall",
    "status": "completed",
    "edition_intro": "",
    "heroIntro": "The 2024 Chess Olympiad gathered the finest minds of Piper Chess Club to determine who would secure the ultimate standard of supremacy. Every move mattered. Every board carried weight as legacies were forged.",
    "overview": "Spanning three rigorous days of competition, the 2024 Olympiad stood as the proving ground for Piper's elite. The tournament format pushed endurance and calculation to their absolute limits, leaving no room for complacency. It was not merely about winning individual games; it was about demonstrating unrelenting consistency on the grandest stage. Some tournaments fill calendars. This one builds reputations.",
    "highlights": [
      "Three days of unforgiving competition separated the contenders from the champions.",
      "Matches defined by immense pressure and narrow margins.",
      "A definitive display of mastery by the titleholders."
    ],
    "results": [
      {
        "rank": "Winners",
        "names": [
          "Syed Mohammad Rayyan",
          "Md Aabid Hussain",
          "Shazia Fatima"
        ]
      }
    ]
  },
  {
    "slug": "womens-olympiad-2025",
    "eventSlug": "womens",
    "year": 2025,
    "title": "Women's Chess Olympiad 2025",
    "start_date": "2025-11-14",
    "end_date": "2025-11-15",
    "location": "Main Hall",
    "status": "completed",
    "edition_intro": "",
    "heroIntro": "A definitive showcase of brilliance and tactical superiority. The 2025 Women's Chess Olympiad demanded unparalleled focus and delivered a masterclass in positional dominance.",
    "overview": "Played over a grueling two-day schedule, the 2025 Women's Olympiad served as the ultimate test of competitive caliber. The format required players to navigate immense pressure while maintaining strategic clarity. Every encounter reshaped the standings, culminating in a definitive victory that cemented the champions' place among Piper's finest.",
    "highlights": [
      "Elite pairings that showcased deep theoretical preparation.",
      "Critical moments where composure under pressure decided the ultimate outcome.",
      "A commanding performance from the champions to secure the prestigious title."
    ],
    "results": [
      {
        "rank": "Winner",
        "names": [
          "Sabeela Khan",
          "Bushra Akram",
          "Aaliya Shoeb"
        ]
      },
      {
        "rank": "Runner Up",
        "names": [
          "Feriha Akhtar",
          "Tehseen",
          "Iqra Akhtar"
        ]
      }
    ],
    "posterUrl": "/media/events/womens/2025/poster/Poster 2025.jpeg"
  },
  {
    "slug": "inter-department-2026",
    "eventSlug": "inter-department",
    "year": 2026,
    "title": "Inter Department Chess League 2026",
    "start_date": "2026-02-06",
    "end_date": "2026-02-07",
    "location": "Main Hall",
    "status": "completed",
    "edition_intro": "",
    "heroIntro": "A fierce struggle for departmental supremacy. The 2026 Inter Department Chess League demanded strategic excellence from every board to claim the ultimate bragging rights.",
    "overview": "Returning with even higher stakes, the 2026 League tested the depth and resilience of every department. A single weakness on any board could be mercilessly exploited. Teams had to balance aggressive pursuit of points with rock-solid defense. In a field characterized by razor-thin margins, CSE emerged to reclaim the throne, while Electrical proved their formidable strength with two podium finishes.",
    "highlights": [
      "Tactical masterclasses delivered under immense pressure.",
      "CSE reclaimed the title in a display of calculated dominance.",
      "Electrical demonstrated deep talent pools, securing both runner-up and third place."
    ],
    "results": [
      {
        "rank": "Winner",
        "department": "CSE",
        "names": [
          "Sayyed Abdul Hannan",
          "Ghulam Sarwar",
          "Mohd Aarish Anwar"
        ]
      },
      {
        "rank": "Runner Up",
        "department": "Electrical",
        "names": [
          "Md Ali Hasan",
          "Samad Raza",
          "Ali Israr"
        ]
      },
      {
        "rank": "Third Place",
        "department": "Electrical",
        "names": [
          "Md Hamza Akhtar",
          "Samar Arquam",
          "Syed Abdullah"
        ]
      }
    ],
    "galleryUrls": [
      "/media/events/inter-department/2026/photos/photo1.jpg",
      "/media/events/inter-department/2026/photos/photo2.jpg"
    ]
  },
  {
    "slug": "inter-department-2025",
    "eventSlug": "inter-department",
    "year": 2025,
    "title": "Inter Department Chess League 2025",
    "start_date": "2025-02-07",
    "end_date": "2025-02-08",
    "location": "Main Hall",
    "status": "completed",
    "edition_intro": "",
    "heroIntro": "Departmental pride on the line, settled across the 64 squares. The 2025 Inter Department Chess League was a battlefield of intellectual rigor and collective ambition.",
    "overview": "The Inter Department Chess League transformed individual excellence into a collective mandate. Across two days of intense rivalry, teams representing different departments clashed to establish institutional dominance. The competition required not just individual brilliance, but cohesive team strategy to secure vital points. It was an arena where reputations were tested and departmental legacy was cemented.",
    "highlights": [
      "Intense inter-departmental rivalries elevated the stakes of every match.",
      "Electronics secured the championship through consistent, high-level execution.",
      "CSE fielded multiple strong lineups, commanding two spots on the podium."
    ],
    "results": [
      {
        "rank": "Winner",
        "department": "Electronics",
        "names": [
          "Md Affan Hussain",
          "Md Aabid Hussain",
          "Md Hamiz"
        ]
      },
      {
        "rank": "Runner Up",
        "department": "CSE",
        "names": [
          "Md Arif Jamil",
          "Md Hamza",
          "Harsh Dahiya"
        ]
      },
      {
        "rank": "Third Place",
        "department": "CSE",
        "names": [
          "Syed Muntuqua Karim",
          "Mohd Noman Khan",
          "Firoz Uddin Gauhar"
        ]
      }
    ],
    "galleryUrls": [
      "/media/events/inter-department/2025/photos/photo1.jpg",
      "/media/events/inter-department/2025/photos/photo2.jpg",
      "/media/events/inter-department/2025/photos/photo3.jpg",
      "/media/events/inter-department/2025/photos/photo4.jpg",
      "/media/events/inter-department/2025/photos/photo5.jpg"
    ]
  },
  {
    "slug": "piper-championship-2025",
    "eventSlug": "piper-championship",
    "year": 2025,
    "title": "Piper Chess Championship 2025",
    "start_date": "2025-10-10",
    "end_date": "2025-10-11",
    "location": "Main Hall",
    "status": "completed",
    "edition_intro": "",
    "heroIntro": "Where legends are minted and challengers fall. The 2025 Piper Chess Championship delivered a masterclass in competitive resilience and tactical brilliance.",
    "overview": "The 2025 edition of the Piper Chess Championship raised the standard of individual competition to new heights. Against a field of seasoned veterans and hungry challengers, survival required deep positional understanding and lethal attacking instincts. The championship matches were defined by tension and profound strategy, culminating in a shift of power at the highest echelons of Piper Chess Club.",
    "highlights": [
      "A shift in the hierarchy as new champions emerged from a grueling field.",
      "Md Affan Hussain claimed the overall victory with consistent brilliance.",
      "Md Hamza Akhtar delivered a clutch performance to secure the Championship Match."
    ],
    "results": [
      {
        "rank": "Winner",
        "names": [
          "Md Affan Hussain"
        ]
      },
      {
        "rank": "Runner Up",
        "names": [
          "Md Arif Jamil"
        ]
      },
      {
        "rank": "Championship Match Winner",
        "names": [
          "Md Hamza Akhtar"
        ]
      }
    ]
  },
  {
    "slug": "piper-championship-2024",
    "eventSlug": "piper-championship",
    "year": 2024,
    "title": "Piper Chess Championship 2024",
    "start_date": "2024-10-26",
    "end_date": "2024-10-27",
    "location": "Main Hall",
    "status": "completed",
    "edition_intro": "",
    "heroIntro": "The pinnacle of individual achievement. The 2024 Piper Chess Championship was an unforgiving crucible that crowned the undisputed master of the board.",
    "overview": "Reserved for the most ambitious contenders, the 2024 Piper Chess Championship was an exercise in pure individual excellence. With no team to fall back on, every player bore the full weight of their decisions. The grueling two-day format separated the contenders from the elite, demanding both flawless calculation and psychological resilience. It was a true test of who possessed the championship pedigree.",
    "highlights": [
      "A punishing gauntlet that demanded absolute precision.",
      "High-level opening preparation met with fierce middle-game complexities.",
      "Hedayatullah Munib secured the title through unyielding focus and tactical superiority."
    ],
    "results": [
      {
        "rank": "Winner",
        "names": [
          "Hedayatullah Munib"
        ]
      },
      {
        "rank": "Runner Up",
        "names": [
          "Md Affan Hussain"
        ]
      },
      {
        "rank": "Championship Match Winner",
        "names": [
          "Hedayatullah Munib"
        ]
      }
    ]
  },
  {
    "slug": "candidates-2026",
    "eventSlug": "candidates",
    "year": 2026,
    "title": "Candidates Tournament 2026",
    "start_date": "2026-01-01",
    "end_date": "2026-01-01",
    "location": "Main Hall",
    "status": "completed",
    "edition_intro": "",
    "heroIntro": "A clash of tactical titans. The 2026 Candidates Tournament stripped away all margin for error, leaving only the most relentless competitors standing.",
    "overview": "The 2026 Candidates Tournament intensified the pressure, fielding a roster of players unwilling to yield a single inch of the board. The tournament was characterized by complex struggles and brilliant defensive stands. Paras Sharma navigated this minefield with surgical precision, claiming the title and proving his status among the club's absolute elite.",
    "highlights": [
      "Brutal, protracted struggles that tested the limits of endurance.",
      "Paras Sharma navigated the complex field to emerge victorious.",
      "Narrow margins defined the difference between advancement and elimination."
    ],
    "results": [
      {
        "rank": "Winner",
        "names": [
          "Paras Sharma"
        ]
      },
      {
        "rank": "Runner Up",
        "names": [
          "Md Hamza Akhtar"
        ]
      }
    ],
    "galleryUrls": [
      "/media/events/candidates/2026/photos/WhatsApp Image 2026-06-15 at 5.33.28 AM (1).jpeg"
    ]
  },
  {
    "slug": "candidates-2025",
    "eventSlug": "candidates",
    "year": 2025,
    "title": "Candidates Tournament 2025",
    "start_date": "2025-01-01",
    "end_date": "2025-01-01",
    "location": "Main Hall",
    "status": "completed",
    "edition_intro": "",
    "heroIntro": "The ultimate proving ground for the elite. The 2025 Candidates Tournament was a high-stakes battle to earn the right to challenge for supremacy.",
    "overview": "Designed to identify the absolute best among the elite, the 2025 Candidates Tournament was a tournament of pure attrition. Only those with unbreakable focus and profound theoretical knowledge could survive this gauntlet. Every match carried the weight of championship aspirations, demanding aggressive yet calculated play to secure the coveted top position.",
    "highlights": [
      "A masterclass in high-stakes, uncompromising chess.",
      "Md Affan Hussain demonstrated exceptional resilience to secure the victory.",
      "A definitive display of strength that silenced any doubters."
    ],
    "results": [
      {
        "rank": "Winner",
        "names": [
          "Md Affan Hussain"
        ]
      },
      {
        "rank": "Runner Up",
        "names": [
          "Ahmadullah Khan"
        ]
      }
    ]
  },
  {
    "slug": "freshers-2025",
    "eventSlug": "freshers",
    "year": 2025,
    "title": "Freshers Chess 2025",
    "start_date": "2025-01-01",
    "end_date": "2025-01-01",
    "location": "Main Hall",
    "status": "completed",
    "edition_intro": "",
    "heroIntro": "New challengers, same unforgiving standard. The 2025 Freshers Chess tournament demanded immediate excellence from the newest additions to the club.",
    "overview": "The 2025 edition of Freshers Chess showcased a deep pool of emerging talent, hungry to prove their worth on the board. The level of play demonstrated sophisticated preparation and a refusal to back down from complex positions. Paras Sharma rose above the competition, signaling his arrival as a serious force within Piper Chess Club.",
    "highlights": [
      "A high standard of play that challenged established club veterans to take notice.",
      "Paras Sharma claimed victory through decisive, uncompromising play.",
      "The tournament cemented the competitive pedigree of the new generation."
    ],
    "results": [
      {
        "rank": "Winner",
        "names": [
          "Paras Sharma"
        ]
      },
      {
        "rank": "Runner Up",
        "names": [
          "Sagnik Mittra"
        ]
      }
    ]
  },
  {
    "slug": "freshers-2024",
    "eventSlug": "freshers",
    "year": 2024,
    "title": "Freshers Chess 2024",
    "start_date": "2024-01-01",
    "end_date": "2024-01-01",
    "location": "Main Hall",
    "status": "completed",
    "edition_intro": "",
    "heroIntro": "The arrival of a new generation. The 2024 Freshers Chess tournament was the first battleground for new talent to stake their claim and build a reputation.",
    "overview": "Serving as the definitive introduction to Piper's competitive landscape, the 2024 Freshers Chess tournament was a display of raw talent and fearless ambition. Unburdened by past expectations, the competitors played with aggressive intent, seeking to establish themselves immediately as formidable opponents. It was the genesis of future rivalries and the first step toward long-term legacy.",
    "highlights": [
      "Unpredictable, dynamic chess characterized by aggressive tactics.",
      "Shameel Khan delivered a commanding performance to secure the inaugural title.",
      "A powerful statement of intent from the incoming class of players."
    ],
    "results": [
      {
        "rank": "Winner",
        "names": [
          "Shameel Khan"
        ]
      },
      {
        "rank": "Runner Up",
        "names": [
          "Fahad Manzoor"
        ]
      }
    ]
  },
  {
    "slug": "bullet-championship-2025",
    "eventSlug": "bullet-championship",
    "year": 2025,
    "title": "Bullet Championship 2025",
    "start_date": "2025-01-01",
    "end_date": "2025-01-01",
    "location": "Online",
    "status": "completed",
    "edition_intro": "",
    "heroIntro": "A crucible of milliseconds. The 2025 Bullet Championship demanded unparalleled reflexes and absolute mental clarity.",
    "overview": "The 2025 Bullet Championship continued the tradition of relentless, high-speed combat. Competitors faced a barrage of rapid-fire decisions, where flagging was just as lethal as a blunder. Md Hamza Akhtar thrived in the chaos, combining lightning-fast execution with deadly accuracy to secure the championship.",
    "highlights": [
      "Unforgiving time scrambles that tested nerves and tactical vision.",
      "Md Hamza Akhtar claimed the title with lethal speed and precision.",
      "A masterclass in maintaining composure while racing the clock."
    ],
    "results": [
      {
        "rank": "Winner",
        "names": [
          "Md Hamza Akhtar"
        ]
      }
    ]
  },
  {
    "slug": "bullet-championship-2024",
    "eventSlug": "bullet-championship",
    "year": 2024,
    "title": "Bullet Championship 2024",
    "start_date": "2024-01-01",
    "end_date": "2024-01-01",
    "location": "Online",
    "status": "completed",
    "edition_intro": "",
    "heroIntro": "Instinct, speed, and ruthless precision. The 2024 Bullet Championship was an adrenaline-fueled arena where hesitation meant instant defeat.",
    "overview": "Stripping away the luxury of time, the 2024 Bullet Championship tested pure intuition and reflexive calculation. In a format where every fraction of a second dictated the outcome, players had to rely on ingrained patterns and sheer nerve. It was a chaotic yet brilliant display of tactical awareness under the most extreme time pressure possible.",
    "highlights": [
      "Blistering pace that punished even the slightest moment of indecision.",
      "Syed Mohammad Rayyan dominated the field with unmatched speed and tactical sharpness.",
      "A true test of instinctual chess mastery."
    ],
    "results": [
      {
        "rank": "Winner",
        "names": [
          "Syed Mohammad Rayyan"
        ]
      }
    ],
    "posterUrl": "/media/events/bullet-championship/2024/poster/Bullet Chamionship Poster 2024.png"
  },
  {
    "slug": "freestyle-2026",
    "eventSlug": "freestyle",
    "year": 2026,
    "title": "Freestyle Chess 2026",
    "start_date": "2026-03-27",
    "end_date": "2026-03-27",
    "location": "Main Hall",
    "status": "completed",
    "edition_intro": "",
    "heroIntro": "No memorised lines. Just chess. The 2026 Freestyle Chess tournament tested pure calculation and raw intuition.",
    "overview": "In a format where opening preparation means nothing, the 2026 Freestyle Chess tournament forced players to rely entirely on their understanding of chess principles and tactical vision from move one. Mohd Hasan demonstrated exceptional adaptability and creativity to claim the title.",
    "highlights": [
      "A true test of raw chess ability without the safety net of opening theory.",
      "Mohd Hasan claimed victory with brilliant improvisational play.",
      "Creative and chaotic positions from the very first move."
    ],
    "results": [
      {
        "rank": "Winner",
        "names": [
          "Mohd Hasan"
        ]
      },
      {
        "rank": "Runner Up",
        "names": [
          "Zahid"
        ]
      },
      {
        "rank": "Third Place",
        "names": [
          "Arif Jameel"
        ]
      },
      {
        "rank": "Fourth Place",
        "names": [
          "Affan Hussain"
        ]
      }
    ],
    "posterUrl": "/media/events/freestyle/2026/poster/FREESTYLE.png",
    "galleryUrls": [
      "/media/events/freestyle/2026/photos/1st.jpeg",
      "/media/events/freestyle/2026/photos/2nd.jpeg",
      "/media/events/freestyle/2026/photos/Trophies and poster.png"
    ]
  },
  {
    "slug": "inter-department-2024",
    "eventSlug": "inter-department",
    "year": 2024,
    "title": "Inter Department Chess League 2024",
    "start_date": "2024-01-01",
    "end_date": "2024-01-01",
    "location": "Main Hall",
    "status": "completed",
    "edition_intro": "",
    "heroIntro": "The 2024 edition of Inter Department Chess League.",
    "overview": "An incredible display of skill at the 2024 Inter Department Chess League.",
    "highlights": [
      "Exciting matches.",
      "Great sportsmanship."
    ],
    "results": [],
    "posterUrl": "/media/events/inter-department/2024/poster/Poster.png"
  },
  {
    "slug": "senior-and-junior-pool-2025",
    "eventSlug": "senior-and-junior-pool",
    "year": 2025,
    "title": "Senior and junior pool 2025",
    "start_date": "2025-10-10",
    "end_date": "2025-10-10",
    "location": "Main Hall",
    "status": "completed",
    "edition_intro": "",
    "heroIntro": "Bridging generations of talent. The 2025 Senior & Junior Pool event was a relentless proving ground where experience clashed with raw, unbridled ambition.",
    "overview": "Designed to pit the seasoned veterans against the rising stars of the club, this tournament tested the depth of Piper Chess Club's talent pool. For the seniors, it was a battle to defend their legacy; for the juniors, it was an opportunity to shatter expectations and claim their place among the elite. Affan Hussain's masterful performance demonstrated exceptional calculation, securing a definitive victory in a fiercely competitive field.",
    "highlights": [
      "High-stakes encounters bridging distinct generations of competitive play.",
      "Affan Hussain navigated a complex field to secure the top standing.",
      "A testament to the club's evolving meta and deep talent reservoir."
    ],
    "results": [
      { "rank": "Winner", "names": ["Affan Hussain"] },
      { "rank": "Runner Up", "names": ["Arif Jameel"] },
      { "rank": "Third Place", "names": ["Abbas Zaheer"] },
      { "rank": "Fourth Place", "names": ["Mayank Tiwari"] }
    ],
    "posterUrl": "/media/events/senior-and-junior-pool/2025/poster/sr jr pool.jpg",
    "galleryUrls": [
      "/media/events/senior-and-junior-pool/2025/photos/1st.jpg",
      "/media/events/senior-and-junior-pool/2025/photos/2nd.jpg",
      "/media/events/senior-and-junior-pool/2025/photos/3rd.jpg",
      "/media/events/senior-and-junior-pool/2025/photos/4th.jpg"
    ]
  }
];

export const teams: Team[] = [
  {
    "id": "t1",
    "name": "Knights of CS",
    "code": "CS",
    "is_piper_team": true
  },
  {
    "id": "t2",
    "name": "Law Rooks",
    "code": "LAW",
    "is_piper_team": true
  },
  {
    "id": "t3",
    "name": "Med Bishops",
    "code": "MED",
    "is_piper_team": true
  },
  {
    "id": "t4",
    "name": "Arts Kings",
    "code": "ARTS",
    "is_piper_team": true
  }
];

export const mockGroups: GroupStage[] = [
  {
    "id": "g1",
    "editionSlug": "olympiad-2026",
    "name": "Group A",
    "standings": [
      {
        "teamId": "Knights of CS",
        "played": 3,
        "wins": 3,
        "draws": 0,
        "losses": 0,
        "points": 9,
        "position": 1
      },
      {
        "teamId": "Law Rooks",
        "played": 3,
        "wins": 1,
        "draws": 1,
        "losses": 1,
        "points": 4,
        "position": 2
      },
      {
        "teamId": "Med Bishops",
        "played": 3,
        "wins": 1,
        "draws": 0,
        "losses": 2,
        "points": 3,
        "position": 3
      },
      {
        "teamId": "Arts Kings",
        "played": 3,
        "wins": 0,
        "draws": 1,
        "losses": 2,
        "points": 1,
        "position": 4
      }
    ]
  }
];

export const mockBrackets: KnockoutBracket[] = [
  {
    "id": "b1",
    "editionSlug": "olympiad-2026",
    "name": "Championship Bracket",
    "round_order": 1,
    "rounds": [
      {
        "id": "r1",
        "name": "Semifinals",
        "order": 1,
        "matches": [
          {
            "id": "m1",
            "result_type": "normal",
            "score_home": 2.5,
            "score_away": 1.5,
            "home_team_id": "Knights of CS",
            "away_team_id": "Med Bishops"
          },
          {
            "id": "m2",
            "result_type": "tiebreak",
            "score_home": 2,
            "score_away": 2,
            "home_team_id": "Law Rooks",
            "away_team_id": "Arts Kings",
            "notes": "Law won on blitz tiebreaks"
          }
        ]
      },
      {
        "id": "r2",
        "name": "Final",
        "order": 2,
        "matches": [
          {
            "id": "m3",
            "result_type": "normal",
            "score_home": 3,
            "score_away": 1,
            "home_team_id": "Knights of CS",
            "away_team_id": "Law Rooks"
          }
        ]
      }
    ]
  }
];

export const legacyEntries: LegacyEntry[] = [
  {
    "id": "l1",
    "year": 2025,
    "title": "Olympiad 2025",
    "description": "The Knights of CS secure their first ever Olympiad victory in a thrilling finale.",
    "type": "memorable_event"
  },
  {
    "id": "l2",
    "year": 2024,
    "title": "Olympiad 2024",
    "description": "Inaugural Piper Chess Olympiad sets a new standard for competitive chess on campus.",
    "type": "milestone"
  }
];
