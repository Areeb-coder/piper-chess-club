# Piper Chess Club Website – FRONTEND.md

This file tells the frontend what to actually build for **Project Antigravity** – the cinematic Piper Chess Club website – in a way that matches 2025–2026 frontend and motion best practices.[web:38][web:50][web:58]

The tone: slightly cocky, but precise. No generic SaaS layouts. No template sludge.

---

## 1. Tech & architecture (frontend side)

We are optimising for three things:

1. **Cinematic experience** – scrollytelling, macro animations, depth, premium feel.[web:41][web:56][web:62]
2. **Serious performance** – SSR/SSG, Core Web Vitals, low JS overhead.[web:38][web:52]
3. **Component-driven scalability** – everything as reusable components matched to a design system.[web:50][web:51]

### 1.1 Recommended stack

You don’t have to hard-code this in one go, but the build should assume:

- **Framework**: Next.js (latest app router) or a similar meta-framework with server-first rendering.[web:58]
- **Language**: TypeScript by default for predictable, safe components.[web:50][web:58]
- **Styling**: 
  - Design-system-driven CSS (tokens from IDEA + website-building skill),
  - plus either CSS Modules or Tailwind with a custom theme.
- **Animations**:
  - For scroll and entrance: CSS Scroll-Driven Animations + small helper libs (GSAP/Framer Motion/ScrollTrigger) where needed.[web:56][web:62]
  - For route transitions: View Transitions API (`@view-transition { navigation: auto; }`) with graceful fallbacks.[web:53][web:59]
- **Images/Media**:
  - Next/Image or equivalent optimisation pipeline
  - WebP/AVIF, lazy loading, responsive sizes.[web:52]
- **State management**:
  - Minimal; event data, results and content are mostly fetched from backend APIs/CMS and cached per route; no giant global store.

Keep it simple. The frontend’s job is to render the story, not simulate a trading platform.

---

## 2. Page map & responsibilities

This section tells the frontend what pages exist and what each page is supposed to DO – not just what to display.

### 2.1 Core pages

Each bullet is a single route, but some can be nested.

1. **`/` – Home (Scrollytelling Arena)**
   - Cinematic entry into the Piper universe.
   - Scroll = narrative progression (hook → context → events → legacy → join).[web:56][web:62]

2. **`/events` – Events Hub**
   - Filterable overview of the whole event ecosystem.
   - Each event tile acts like a “portal” into its dedicated page.

3. **`/events/olympiad` – Chess Olympiad**
   - Flagship event page with structure, groups, knockouts, winners, hall-of-fame strip.

4. **`/events/womens-olympiad` – Women’s Chess Olympiad**
   - Equivalent-level page, same depth and respect; tuned visuals and copy.

5. **`/events/freestyle` – Freestyle Chess (Chess960)**
   - Gritty, creative page that communicates unpredictability and Chess960 format.

6. **`/events/freshers` – Freshers Championship**

7. **`/events/candidates` – Candidates Tournament**

8. **`/events/junior-vs-senior` – Junior vs Senior Pool**

9. **`/events/inter-department` – Inter-Department Championship**

10. **`/hall-of-fame` – Hall of Fame & Records**

11. **`/legacy` – Piper Legacy / Archives**

12. **`/team` – Team & Culture**

13. **`/community` – Join / Community / Contact**

You can map these to a directory-based routing structure. Subroutes for event editions can be added later (e.g. `/events/olympiad/2026`).

---

## 3. Component system

This is the heart of the frontend: the building blocks.

Everything should be built as **clean, typed, reusable components**. Avoid one-off layout hacks. Below is the component inventory and what each is meant to do.

### 3.1 Layout components

1. **`<PageShell>`**
   - Wraps each page with header, footer, theme handling, and meta.
   - Handles page-level transitions using the View Transitions API where possible.[web:53][web:59]

2. **`<Header>` / `<Navbar>`**
   - Logo, main nav links, theme toggle, “Join” primary CTA.
   - Sticky on scroll; shrinks slightly for cinematic feel.

3. **`<MobileNav>`**
   - Full-screen glassmorphism drawer, nav links + “featured event” callout.

4. **`<Section>`**
   - Generic wrapper for sections,
   - Accepts props like `variant` (dark / lighter / highlight) and `padding` presets.

5. **`<SectionHeader>`**
   - Title, kicker, subtitle; consistent typography.

### 3.2 Hero & cinematic components

1. **`<HeroScene>`**
   - Renders the hero background: spotlighted board, soft volumetric light, maybe 2D+parallax instead of full WebGL for performance.[web:52][web:56]
   - Takes props: `headline`, `subheadline`, `primaryCta`, `secondaryCta`, `theme` (e.g., `"default" | "olympiad" | "womens" | "freestyle"`).

2. **`<AmbientPiecesLayer>`**
   - Floating silhouettes or outlines of chess pieces subtly moving at low speed.
   - Uses CSS transforms + reduced-motion check.

3. **`<HeroCTAGroup>`**
   - Cluster of 2–3 buttons; ensures consistent layout and responsive stacking.

### 3.3 Glass panels & cards

1. **`<GlassCard>`**
   - Base card used almost everywhere.
   - Props: `accent`, `interactive`, `onClick`, `children`.
   - Implements glassmorphism with blur, semi-transparent background, and soft border.[web:36][web:40]

2. **`<StatCard>`**
   - Displays a key number and short label.
   - Optional animated counter.

3. **`<EventTile>`**
   - Event overview card.
   - Shows event name, tagline, type (flagship, rivalry, freestyle, etc), and a small visual hint.
   - Click navigates to the event page.

4. **`<StoryCard>`**
   - Used in gallery/legacy sections; image + short narrative snippet.

### 3.4 Scrollytelling & motion helpers

1. **`<ScrollScene>`**
   - Generic wrapper that triggers animations when the section comes into view.
   - Props to control direction (`fade`, `slide-up`, `scale-in`) and delay.

2. **`<PinnedPanel>`**
   - Keeps content anchored while other content scrolls behind/next to it; used for “explainer” sections.

3. **`<ScrollStepNarrative>`**
   - For sections where scroll steps through phases (e.g. how the Olympiad works).
   - Accepts steps with title, description, and associated visual.

### 3.5 Event- and tournament-specific components

1. **`<EventHero>`**
   - Event-specific hero built using `<HeroScene>` + metadata.

2. **`<EventMetaBar>`**
   - At-a-glance info: format, time control, structure (groups + knockouts), typical number of teams/players.

3. **`<BracketDiagram>`**
   - Simplified bracket visual for knockouts.

4. **`<GroupStageGrid>`**
   - Renders groups, each with teams and basic standings.

5. **`<FormatExplainer>`**
   - Step-by-step explanation of the event format, using `<ScrollStepNarrative>`.

6. **`<EventGalleryStrip>`**
   - Horizontal strip of photos/videos tied to this event.

7. **`<EventCtaPanel>`**
   - “Register / View fixtures / See latest edition” CTAs.

### 3.6 People & community components

1. **`<TeamGrid>`**
   - Layout for the club team.

2. **`<TeamMemberCard>`**
   - Avatar, name, role, small line like “prefers chaos on the board”.
   - Hover reveals social icons.

3. **`<TestimonialCard>`**
   - Used for quotes from members or participants.

4. **`<CommunityLinkPill>`**
   - Stylised pill buttons linking to WhatsApp, Discord, Instagram, etc.

### 3.7 Gallery & media

1. **`<GalleryGrid>`**
   - Masonry-ish or grid layout for images, grouped by event.

2. **`<MediaLightbox>`**
   - Shows full-screen media on click with keyboard controls.

3. **`<GalleryFilterBar>`**
   - Filters by event, year, tag.

### 3.8 Navigation helper components

1. **`<Breadcrumbs>`**
   - Used on event and legacy pages.

2. **`<TabNav>`**
   - For switching between “Overview”, “Results”, “Gallery” on event pages.

### 3.9 Feedback & system states

1. **`<SkeletonBlock>`** / **`<SkeletonCard>`**
   - Loading placeholders matching the layout.

2. **`<EmptyState>`**
   - For empty galleries/events, with friendly copy.

3. **`<ErrorBanner>`**
   - For fetch or system errors.

---

## 4. Homepage – detailed section spec

The homepage is the star of the show. Build it as a **scroll-driven narrative** – not a flat list of sections.[web:56][web:62]

### 4.1 Section 1 – Hero “Arena Entrance”

**Goal**: Punch the visitor in the face (politely) with a cinematic chess atmosphere.

- Uses `<HeroScene>` with dark board, spotlight, slight camera-move/parallax.
- Overlay: tagline, subheading, two CTAs (`Join the Club`, `Explore Events`).
- Under the fold hint: a small scroll indicator (“Scroll to enter the arena”).

**Interaction**:
- On load, quick 0.6–0.8s logo sting + hero text fade; no long loading animation.[web:57]
- Respect `prefers-reduced-motion`: minimal fade only.[web:59]

**Sample hero headlines** (frontend doesn’t enforce exact wording, but you can use these as defaults):
- “Think. Calculate. Dominate.”
- “More Than A Club. This Is The Grid.”
- “Where Preparation Ends And Nerves Start.”
- “We Don’t Play Games. We Play Positions.”
- “Your New Favourite Time Control: 10 + Chaos.”

### 4.2 Section 2 – “Who We Are”

**Goal**: Set context fast.

- Layout: two-column on desktop, stacked on mobile.
- Left: short copy about Piper’s culture.
- Right: 2–3 quick stats or bullets.

Use simple ScrollScene fade-in from bottom.

### 4.3 Section 3 – “Why Piper Wins” (Stats)

**Goal**: Brag, but with taste.

- 3–5 `<StatCard>` components inside a responsive grid.
- Animated counters from 0 → value when scrolled into view.

Potential stats:
- Events hosted.
- Total boards played.
- Distinct champions.

### 4.4 Section 4 – Event Universe Map

**Goal**: Show that the club isn’t one event – it’s an ecosystem.

- A bento-style layout of `<EventTile>` components.
- Tiles for: Olympiad, Women’s Olympiad, Freestyle, Freshers, Candidates, Junior vs Senior, Inter-Department.
- Each tile shows small icon, name, micro-tagline, and a subtle event-type color.

On hover: raise + glow in event color.

### 4.5 Section 5 – Olympiad Spotlight

**Goal**: Sell Olympiad as the “World Cup of Piper”.

- Pinned text panel explaining stakes + scrollytelling of the structure (groups → knockouts → champions).
- Bracket preview list using `<BracketDiagram>`.

### 4.6 Section 6 – Women’s Chess Olympiad

**Goal**: Make women’s participation central, not side content.

- Similar visual weight to Olympiad block.
- Tone: confident and matter-of-fact, no overdone empowerment clichés.
- Include stories/testimonials in carousel using `<TestimonialCard>`.

### 4.7 Section 7 – Freestyle Zone

**Goal**: Communicate chaos and creativity.

- Slightly more dynamic motion – cards that jitter/tilt very slightly.
- “No memorised lines. Just chess.” tagline in big type.
- Visual snippet of Chess960 setup (abstract, no need to reproduce full rules on home).

### 4.8 Section 8 – Gallery & Memories

**Goal**: Humanise the club.

- Short intro line, then `<GalleryGrid>` preview of 6–8 images across different events.
- “View the full story gallery” CTA.

### 4.9 Section 9 – Legacy & Hall of Fame

**Goal**: Show that Piper is not a one-year hobby.

- Vertical or horizontal timeline with key milestones rendered via simple cards.
- `View Hall of Fame` primary CTA.

### 4.10 Section 10 – Join / Call to Action

**Goal**: Give clear next steps.

- Clean section with one big CTA and 2–3 tiles:
  - Join events
  - Casual meets
  - Online server

---

## 5. Event pages – frontend responsibilities

Each event page follows a shared skeleton but can tweak visuals.

### 5.1 Shared event layout

All `/events/*` pages should reuse a **common layout component**:

- `<EventHero>` – big title, tagline, key metadata.
- `<EventMetaBar>` – format, structure, time control.
- `<FormatExplainer>` – how the tournament works.
- `<TabNav>` – `Overview | Results | Gallery`.
- `<EventGalleryStrip>`.
- `<EventCtaPanel>`.

### 5.2 Event-specific flavour

Each event has a different skin:

- **Olympiad** – classic, prestigious; accent in gold; more formal typography.
- **Women’s Olympiad** – confident, slightly warmer palette; equal visual weight; same page depth as Olympiad.
- **Freestyle** – darker, more contrasty, ember highlights; animation a bit more wild.
- **Freshers** – friendlier, slightly softer edges, more copy explaining “first tournament”.
- **Candidates** – elite, more serious; emphasise small field.
- **Junior vs Senior / Inter-Department** – rivalry, highlight departmental/team identity.

---

## 6. Motion & animation guidelines

Modern motion trends are about **purposeful craft, not noisy effects**.[web:54][web:60]

- Use **scroll-controlled animations** to tie narrative progression to user input.[web:56][web:62]
- Keep section entrances under 400–600ms.
- Use easing like `cubic-bezier(0.16, 1, 0.3, 1)` for snappy but smooth transitions.
- Use **View Transitions API** for page switches where possible, fallback to fade.[web:53][web:59]
- Respect `prefers-reduced-motion` – no movement, only opacity and instant transitions.

Don’t animate everything. Pick a few signature moments:

- Hero text + logo entrance.
- Event tiles sliding in as a group.
- Brackets gently animating from groups → quarters → semis → final.
- Stats counters.

---

## 7. Responsive behaviour

The site should feel deliberately designed on mobile.

- **Breakpoints**: design for 375px, 768px, 1024px, 1280px+.
- On mobile, prioritise:
  - hero copy,
  - key CTAs,
  - event tiles,
  - announcements.
- Use stacked layouts instead of cramped two-column grids.
- Navigation becomes bottom or top drawer with a clear primary CTA.

---

## 8. Accessibility & semantics (frontend duties)

Good cinematic sites can still be accessible.[web:61]

- Semantic HTML elements for structure: `<header>`, `<main>`, `<section>`, `<article>`, `<nav>`, `<footer>`.
- One `<h1>` per page; descending heading levels.
- Keyboard focus visible and logical.
- Alt text for all content images; `alt=""` for decoratives.
- Buttons for actions, links for navigation.
- Don’t rely solely on colour to convey state.
- Ensure contrast for text on glass panels (especially in dark mode).

---

## 9. What “done” means for the frontend

The frontend is **done** when:

1. All core pages render with design tokens and shared components – no stray inline styles.
2. Homepage scrollytelling works smoothly on desktop and mobile.
3. Event pages use the shared event layout and feel distinct but related.
4. Motion is smooth on mid-range devices and respects reduced-motion preferences.
5. Lighthouse/Web Vitals are solid (LCP < 2.5s on decent connections).
6. Keyboard and screen-reader navigation works end to end.

If it looks like a generic SaaS landing page, it’s not done.
If it feels like a cinematic, living club HQ that just happens to run in a browser – then we’re closer.