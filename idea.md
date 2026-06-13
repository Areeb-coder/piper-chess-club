# Piper Chess Club Website – IDEA.md

## 1. What this project actually is

Piper Chess Club’s website is not a notice board, it’s a digital chess arena.

The goal of this project (codename **Antigravity**) is to design and build a cinematic, premium, slightly-cocky-but-still-welcoming web experience for Piper Chess Club that feels closer to a luxury esports organization or a world championship broadcast than a typical college club page.[web:39][web:47]

When someone loads the site, they should feel three things instantly:

1. **“These people are serious about chess.”**
2. **“This looks way too polished to be a random college society.”**
3. **“I want to be inside this community.”**

Everything – the visuals, motion, content structure, and tech choices – will be aligned to that.


## 2. Core concept – “Chess as a cinematic experience”

We are designing the site as if it’s the **digital headquarters of a high-level chess squad**, not a file dump.[web:47] That means:

- **Experience over pages** – the site tells a story as you scroll and click, with smooth transitions and scrollytelling instead of static sections.[web:42][web:47]
- **Premium dark aesthetic** – inspired by the Freestyle poster: dark background, spotlight on the board, warm amber highlights, glass panels floating in space.
- **Cinematic motion** – scroll-driven animations, view transitions, depth and parallax, but all tuned for performance and accessibility.
- **Modular content system** – everything (events, winners, galleries, legacy, team) is data-driven so future teams can update content without touching layout.[web:46]

The site should feel like a continuous chess environment where sections are just different “rooms” in the same arena.


## 3. Research summary – modern graphics & web principles we’re using

This project deliberately leans into the **2025–2026 wave of web and UI trends**, but filters them through quality and accessibility.

### 3.1 Visual design trends we’re embracing

- **Glassmorphism 2.0** – frosted glass panels with subtle blur, soft shadows, and high contrast content on top.[web:36][web:40] We’ll use this for cards, stat panels, event tiles and nav overlays, not entire backgrounds.
- **Refined neumorphism** – very subtle 3D emboss for key interactive elements (like quick filters or toggles) while dodging the low-contrast trap of old-school neumorphism.[web:34][web:36][web:43]
- **Cinematic UI** – full-bleed hero, scroll-tied motion, layered depth, and “scene changes” between key sections, using CSS scroll-driven animations and the View Transitions API where supported.[web:39][web:37]
- **Typography-led design** – bold, custom-looking display type for headlines, clean sans serif for body copy, with typography doing a lot of the visual heavy lifting instead of random illustration spam.[web:37]
- **Expressive minimalism** – mostly dark, neutral palette with a few strong accent colors (amber/gold for victories, cool teal or red for highlights) instead of rainbow gradients.[web:46]

### 3.2 Interaction & storytelling principles

- **Scrollytelling** – as you scroll, the site reveals the Piper story in stages: who we are → why we’re strong → our event ecosystem → Olympiad → women’s chess → freestyle experimentation → legacy.[web:42][web:47]
- **Motion-as-UI** – animations that explain, not distract: pieces sliding into place to show event formats, numbers counting up for stats, hover states that physically “lift” cards.[web:37][web:38]
- **Macro animations** – not just tiny microinteractions; section-level transitions like hero → events → hall of fame that feel like camera moves.[web:41]
- **Adaptive themes** – strong dark mode primary, plus support for dynamic theming (for example, slightly warmer palette for women’s events, more fiery accents for Freestyle) driven by the same design system.[web:41][web:46]

### 3.3 Web dev & architecture principles

- **SSR/SSG first** – fast initial loads with server-side rendering or static generation so the cinematic feel doesn’t come at the cost of performance.[web:38]
- **Component-driven architecture** – events, team, stats, and galleries are all composed from reusable web components/React components, matching the trend toward modular, composable UI.[web:38][web:46]
- **Scroll-driven CSS animations & View Transitions API** – instead of heavy JS listeners, use the 2025+ browser-native scroll animation APIs and `view-transition` for page changes.[web:39]
- **Responsive and mobile-first** – content priority shifts logically as the viewport shrinks; we design the mobile experience intentionally rather than treating it as a squished desktop version.[web:38][web:41]
- **Performance discipline** – Core Web Vitals, lazy loading, optimised media, and motion tuned for 60fps so the site feels smooth even on average phones.[web:38][web:41]
- **Accessibility baked in** – high contrast, keyboard navigation, semantic structure, reduced-motion fallbacks and screen-reader-friendly storytelling.

### 3.4 Features worth adding from research

From the research, we’re going beyond a standard club site and adding:

- **Scrollytelling hero journey** – the homepage scroll is a guided narrative, not just stacked sections.[web:42][web:47]
- **Adaptive event skins** – each major event (Olympiad, Women’s Olympiad, Freestyle, Inter-Department) gets its own subtle visual skin while staying inside the same design system.
- **Dynamic stats & data humanisation** – animated counters, visual brackets, and “human” summaries of results instead of dumping tables.[web:37]
- **Modular content blocks** – the same building blocks can be rearranged to create new pages in the future (new formats, new series) without redesign.[web:46]
- **Context-aware microcopy** – CTAs and labels tuned to what the user is currently seeing (e.g., “See the 2026 winners” instead of “Read more”).
- **Optional ambient sound & advanced motion** for a future phase: a subtle soundscape and slightly richer animations that can be toggled on for “full arena mode”.


## 4. High-level structure of the project (Antigravity)

Think of Antigravity as three layers:

1. **Experience layer (front-of-house)** – what visitors see: the cinematic website for Piper Chess Club.
2. **System layer (back-of-house)** – content models, admin UX, and data structures that power events, results, and galleries.
3. **Brand & storytelling layer** – the voice, narrative, visuals, and interactions that give everything attitude.

This IDEA.md file is about tying those three layers together so the frontend and backend prompts later don’t fight each other.

### 4.1 Core pages / experiences

We design these as **experiences**, not static pages:

- **Homepage** – cinematic entry, scrollytelling introduction to the club, events, community, and legacy.
- **Events Hub** – overview of the entire Piper event ecosystem with filters by format, strength level, and audience.
- **Chess Olympiad (flagship)** – the “World Cup” of Piper; deep, dedicated page with structure, teams, results, and hall-of-fame moments.
- **Women’s Chess Olympiad** – equal-level, serious page that highlights women’s competition and club support in a confident, non-token way.
- **Freestyle Chess** – gritty, experimental page focusing on Chess960 and creativity over prep, grounded in the real event format (groups, knockouts, tiebreaks).[web:33][web:35][web:36]
- **Freshers Championship** – welcoming page that sells the first-tournament experience.
- **Candidates Tournament** – elite qualifier narrative: only a few get here.
- **Junior vs Senior / Inter-Department / Leagues** – rivalry and department-pride events represented through team-centric structures and board matchups.
- **Hall of Fame** – champions, long-term records, crazy runs.
- **Piper Legacy** – history of the club, past office bearers, timelines, archives.
- **Team** – current team members in a premium card layout with hover socials.
- **Community / Join** – how to enter the community, join events, casual sessions, and online servers.

All of these pull from the same admin-controlled content system.


## 5. Experience philosophy – how we design the flow

### 5.1 Chess as an experience, not a PDF

We treat every major concept (events, legacy, community) as an **interactive section**:

- Events aren’t just posters – they have dynamic stats, fixtures, and storylines.
- Legacy isn’t just text – it’s a timeline with visual eras.
- Gallery isn’t a dump of photos – it’s structured by event and told as “episodes”.

### 5.2 Scrollytelling structure

On the homepage, the scroll journey should roughly be:

1. **Arena Entrance (Hero)** – cinematic board in spotlight, bold tagline, CTAs.
2. **Identity** – who Piper is, in 2–3 sharp lines, no corporate essay.
3. **Why Piper Wins** – stats counters + short brag lines.
4. **Our Event Universe** – visual map of all events.
5. **The Olympiad** – the “World Cup” spotlight.
6. **Women’s Chess Olympiad** – strong, confident section, not a small badge.
7. **Freestyle Zone** – creativity, Chess960, unpredictability.
8. **Community & Memories** – gallery preview, testimonials, quick stories.
9. **Legacy & Hall of Fame** – link to deeper archival page.
10. **Join the Grid** – final CTA to join/participate.

Each of these sections has its own micro-theme (lighting, colors, animation style) but they live inside the same system.


## 6. Visual direction for Antigravity

### 6.1 Palette

Borrowing from the Freestyle poster vibe and modern cinematic trends, we’ll define a **Piper Arena palette**:

- **Base** – near-black charcoal for background.
- **Surfaces** – deep neutrals for panels, slightly lifted from the background.
- **Glass** – translucent panels with subtle blur and thin light borders (glassmorphism).[web:36][web:40]
- **Highlight 1 (Victory)** – warm amber/gold for main accents.
- **Highlight 2 (Freestyle)** – ember red/orange for aggressive, creative sections.
- **Highlight 3 (Women’s)** – slightly warmer, confident accent (could be a deep wine or magenta used sparingly).
- **Text** – off-white/ivory for main copy; muted greys for secondary.

We keep color restraint: mostly neutral, with color only where it helps the story.

### 6.2 Typography

Modern research points towards **typography-led interfaces** for strong visual identity.[web:37] We’ll:

- Use a characterful display serif or sharp grotesk for headings.
- Use a clean sans-serif for body and UI.
- Keep size system consistent using clamp tokens (already defined by the website-building skill).

Headlines carry the cocky attitude, body copy stays very readable.

### 6.3 Motion & interaction

We’ll lean on **scroll-driven animations, view transitions, and microinteractions**:

- View Transitions API for page changes where supported, giving us camera-like cuts.[web:39]
- Scroll animations to fade and slide in sections at the right moment, no jittery parallax.[web:42]
- Hover and tap states that lift cards/glass panels with shadows and slight scale.
- Animated counters and brackets built with lightweight motion libraries or CSS.

Motion is a guide, not a toy.


## 7. Features we’re planning (experience layer)

Here’s the feature set Antigravity will aim for on the **front-of-house side**:

1. **Cinematic hero** with animated chessboard, spotlight, and headline.
2. **Live-ish stats** – counters for members, events hosted, titles, boards played.
3. **Interactive event map** – visual grid of events (Olympiad, Women’s Olympiad, Freestyle, Freshers, etc.) with hover states.
4. **Tournament visualisations** – group stages and knockouts represented with visual brackets, not just bullet points.
5. **Scrollytelling sections** for Olympiad and Freestyle – timeline of a typical event run, formats, and highlights.
6. **Women’s chess hub** – dedicated block and page with structure, visual identity, and stories.
7. **Story gallery** – filterable gallery by event, with “story” mode and lightbox.
8. **Hall of Fame board** – champions, repeated winners, crazy records.
9. **Legacy timeline** – major years, officers, event milestones.
10. **Team grid** – member cards with short intros and social handles.
11. **Community integration** – easy entry points to WhatsApp/Discord/Instagram.
12. **Announcements rail** – upcoming events and key updates.


## 8. Features we’re planning (system layer)

The backend and content system (which you’ll design in `backend.md`) needs to support:

- **Events** as first-class objects with types, seasons/editions, formats, and references.
- **Results and standings** for each event edition, including structured info for group stages, knockouts and boards.
- **Players/teams** abstractions for future use – even if you don’t expose all details.
- **Gallery collections per event**, tagged by year and moment type.
- **Hall of Fame entries** that link events, players/teams, and achievements.
- **Legacy entries** – for timeline and office bearers.
- **Configurable homepage** – hero texts, featured events, featured stories.

Modern web trends emphasise composable architecture and modular content blocks; we’ll align to that so the site lasts beyond one batch.[web:46]


## 9. How we use this IDEA.md

This file is the **North Star** for the Antigravity project. It tells any AI or human engineer three crucial things:

1. **What we’re building** – a cinematic, modular, performance-focused chess club website.
2. **Why it should exist** – to represent Piper Chess Club like a serious, modern competitive community.
3. **How it should feel** – visually, emotionally, and technically.

The follow-up files will zoom in:

- `frontend.md` – exact pages, components, layouts, animations, and implementation details for the UI.
- `backend.md` – content models, APIs, data structures, and infrastructure decisions.

When another model gets the final “master prompt”, it will read this IDEA.md plus those two files, understand the project properly, and then generate code that stays loyal to the vision instead of producing random template sludge.

Welcome to Antigravity. Now we make the board float.