# Piper Chess Club Website – BACKEND.md

This file defines how the **backend and content system** for Project Antigravity should work.

Goal: give the frontend a clean, predictable API and give future club admins a painless way to update **events, results, galleries, legacy, and team info** without redesigning the site – using 2026-era headless CMS and backend best practices.[web:64][web:68][web:77]

Tone: confident, practical, zero fluff.

---

## 1. High‑level backend architecture

### 1.1 Overall approach

Use a **headless CMS + serverless/edge functions** architecture:

- **Headless CMS** for structured content (events, editions, results, galleries, team, hall of fame, legacy).[web:64][web:71][web:77]
- **API layer** (serverless/edge functions) to:
  - expose clean, frontend‑friendly endpoints
  - aggregate CMS data (e.g. events + editions + results)
  - enforce access rules and caching
- **Static/SSR frontend** consumes these APIs; most content is statically generated and revalidated on demand.[web:38][web:69][web:78]

This keeps the backend lightweight, scalable, and easy for future teams to maintain.

### 1.2 Suggested tech stack (backend side)

You can swap specific tools, but the pattern should be:

- **Headless CMS**: any major API‑first headless CMS (e.g. Strapi, Contentful, Hygraph, Sanity, Directus, Payload – pick one that’s accessible for the team).
  - Must support: custom content types, relations, media, webhooks, roles/permissions, REST or GraphQL.[web:64][web:71][web:74]
- **Runtime**: serverless / edge functions via platform like Vercel/Netlify/AWS Lambda for custom API logic.[web:69][web:72][web:78]
- **Database**: mostly managed by CMS; if needed for extra logic, a managed Postgres or similar.
- **Cache/CDN**:
  - CDN for static assets (images, scripts, CSS),
  - Edge caching for API responses with webhook‑based invalidation from CMS.[web:64][web:68]

The backend is not a monolith – it’s a content platform.

---

## 2. Content modeling principles

We follow modern content modeling best practices:

- Model **what the content is**, not where it appears (no `HomePageSectionThreeTitle`).[web:64][web:70][web:73]
- Use small, reusable content types with relationships.
- Keep nesting depth ≤ 3 levels.
- Use references instead of duplication (e.g. Hall of Fame entry references event + winner + edition).[web:64][web:70]
- Document every type with clear definitions and validation rules.[web:70][web:73]

Everything below assumes a CMS that supports content types, fields, references, enums, and rich text.

---

## 3. Core content types

### 3.1 `ClubSettings`

Singleton – global configuration.

Fields:
- `site_title` (string)
- `tagline` (string)
- `primary_cta_label` (string)
- `primary_cta_url` (string)
- `social_links` (object list: `platform`, `url`)
- `featured_events` (relation list → `Event`)
- `homepage_hero_headline` (string)
- `homepage_hero_subheadline` (string)

Purpose:
- Controls global branding and hero defaults without editing code.

---

### 3.2 `Event`

Represents an event *type* (Olympiad, Women’s Olympiad, Freestyle, etc.), not a specific year.

Fields:
- `slug` (string, unique) – e.g. `olympiad`, `womens-olympiad`, `freestyle`.
- `name` (string) – display name.
- `short_tagline` (string) – used on tiles.
- `event_category` (enum) – `flagship | womens | freestyle | rivalry | freshers | department`.
- `visibility_rank` (int) – for sorting on the events hub.
- `icon` (media) – small symbolic icon.
- `primary_color` (string) – hex or token.
- `secondary_color` (string, optional).
- `hero_image` (media, optional) – used on event page.
- `overview_richtext` (rich text) – generic description of the event.
- `format_summary` (string) – one line (e.g. “16 teams, 3 boards, 10+2”).
- `typical_time_control` (string) – e.g. “10+2”, “15+10”.
- `is_active` (boolean) – for whether this event type is still run.

Relations:
- `editions` (relation list → `EventEdition`)

Purpose:
- Defines reusable, timeless information about each event type.

---

### 3.3 `EventEdition`

Represents a specific running of an event (e.g. Olympiad 2026).

Fields:
- `slug` (string, unique) – e.g. `olympiad-2026`.
- `year` (int) – used for display and URL.
- `title` (string) – e.g. “Piper Chess Olympiad 2026”.
- `start_date` (date)
- `end_date` (date)
- `location` (string)
- `status` (enum) – `upcoming | ongoing | completed`.
- `hero_image` (media, optional) – edition-specific.
- `edition_intro` (rich text) – brief story of this year.
- `format_notes` (rich text, optional) – changes from default format.

Relations:
- `event` (relation → `Event`)
- `groups` (relation list → `GroupStage`)
- `knockout_brackets` (relation list → `KnockoutBracket`)
- `winners` (relation list → `WinnerRecord`)
- `gallery_collections` (relation list → `GalleryCollection`)

Purpose:
- Allows the same event type to have multiple years/editions without copy‑pasting content.

---

### 3.4 `GroupStage`

Used for group‑based events like Olympiad, Inter‑Department, Freestyle, Triad‑style leagues.[web:76]

Fields:
- `name` (string) – “Group A”, “Group 1”.
- `description` (string, optional).
- `rounds` (int, optional) – number of rounds.

Relations:
- `edition` (relation → `EventEdition`)
- `teams` (relation list → `Team`)
- `standings` (relation list → `GroupStanding`)

### 3.5 `GroupStanding`

Fields:
- `team` (relation → `Team`)
- `played` (int)
- `wins` (int)
- `draws` (int)
- `losses` (int)
- `points` (float/int)
- `tiebreak_score` (float, optional) – SB or equivalent.
- `position` (int) – final ranking.

Purpose:
- Clean, structured standings for group stages.

---

### 3.6 `KnockoutBracket`

Represents knockout part of a tournament.

Fields:
- `name` (string) – “Main Knockout”, “Quarterfinals”, etc.
- `round_order` (int) – to control display order.

Relations:
- `edition` (relation → `EventEdition`)
- `rounds` (relation list → `KnockoutRound`)

### 3.7 `KnockoutRound`

Fields:
- `name` (string) – “Quarterfinals”, “Semifinals”, “Final”.
- `order` (int)

Relations:
- `bracket` (relation → `KnockoutBracket`)
- `matches` (relation list → `Match`)

### 3.8 `Match`

This type keeps match‑level data generic, so it works for team and individual formats.

Fields:
- `board_label` (string, optional) – “Board 1 / Top Board”.
- `result_type` (enum) – `normal | sudden_death | tiebreak`.
- `score_home` (float)
- `score_away` (float)
- `notes` (rich text, optional) – e.g. “won in tiebreak blitz”.

Relations:
- `round` (relation → `KnockoutRound`)
- `home_team` (relation → `Team`, optional)
- `away_team` (relation → `Team`, optional)

Use `score_home` / `score_away` flexibly (1–0, 0.5–0.5, or board score summaries).

---

### 3.9 `Team`

Because many events are team-based (Inter‑Department, Triad‑style events), we model teams as their own type.

Fields:
- `name` (string)
- `code` (string, optional) – short tag (e.g. `FET`, `CS`).
- `department` (string, optional)
- `is_piper_team` (boolean) – for potential future use if there are external teams.
- `description` (rich text, optional)

Relations:
- `members` (relation list → `Player`, optional)

### 3.10 `Player`

We keep this simple initially (no ratings database).

Fields:
- `display_name` (string)
- `bio_short` (string, optional)
- `bio_long` (rich text, optional)
- `photo` (media, optional)

Relations:
- `teams` (relation list → `Team`)

Note: You can keep this mostly for future expansion; the initial UI doesn’t have to surface all details.

---

### 3.11 `WinnerRecord`

Represents a win or record associated with an event edition.

Fields:
- `title` (string) – e.g. “Champion Team”, “Best Board 1”, “Freestyle Winner”.
- `category` (enum) – `overall | category | board | special`.
- `description` (rich text, optional) – short story.

Relations:
- `edition` (relation → `EventEdition`)
- `team` (relation → `Team`, optional)
- `player` (relation → `Player`, optional)

Used by Hall of Fame and event pages.

---

### 3.12 `HallOfFameEntry`

Higher-level record across years.

Fields:
- `slug` (string)
- `title` (string) – e.g. “3‑time Olympiad Champions”.
- `highlight_text` (rich text)
- `stat_summary` (string, optional) – e.g. “3 titles, 2 finals, zero mercy”.

Relations:
- `event` (relation → `Event`)
- `team` (relation → `Team`, optional)
- `player` (relation → `Player`, optional)
- `related_winner_records` (relation list → `WinnerRecord`)

---

### 3.13 `GalleryCollection`

Represents a collection of photos/videos.

Fields:
- `slug` (string)
- `title` (string)
- `description` (rich text, optional)
- `year` (int, optional)

Relations:
- `event` (relation → `Event`, optional)
- `edition` (relation → `EventEdition`, optional)
- `items` (relation list → `GalleryItem`)

### 3.14 `GalleryItem`

Fields:
- `media` (media) – image or video.
- `caption` (string, optional)
- `taken_at` (date, optional)
- `tags` (string list, optional) – e.g. `"trophy"`, `"blitz"`, `"womens"`.

Purpose:
- Provides structured gallery data per event/edition.

---

### 3.15 `LegacyEntry`

For the **Piper Legacy** page.

Fields:
- `year` (int)
- `title` (string)
- `description` (rich text)
- `type` (enum) – `milestone | office_bearers | memorable_event`.

Relations:
- `event` (relation → `Event`, optional)
- `edition` (relation → `EventEdition`, optional)

---

### 3.16 `TeamRole` / `OfficeBearer`

Represents the leadership and organisers.

Fields:
- `name` (string)
- `role_title` (string)
- `year_start` (int)
- `year_end` (int, optional)
- `bio` (rich text, optional)
- `photo` (media, optional)
- `social_links` (object list: `platform`, `url`)

Relations:
- `player` (relation → `Player`, optional)

Used in both current Team page and Legacy.

---

### 3.17 `Testimonial`

Fields:
- `quote` (rich text or string)
- `role` (string) – e.g. “Olympiad participant”
- `display_name` (string) – can be only first name / anonymised if desired.
- `event` (relation → `Event`, optional)

Used in Women’s Olympiad, community sections, etc.

---

### 3.18 `Announcement`

Fields:
- `title` (string)
- `slug` (string)
- `body` (rich text)
- `publish_date` (datetime)
- `is_pinned` (boolean)
- `related_event` (relation → `Event`, optional)

Purpose:
- Back the announcement rail and community page.

---

## 4. API design

The backend will expose **read‑optimised APIs** for the frontend. With a headless CMS, you can:
- Use the CMS GraphQL/REST API directly, or
- Put a thin proxy layer with serverless functions to reshape responses.[web:64][web:69]

### 4.1 Key API endpoints (conceptual)

Use REST/GraphQL naming as appropriate. Example REST‑style paths:

- `GET /api/home`
  - Returns:
    - Hero content
    - Featured events
    - Highlight stats
    - Latest announcements
- `GET /api/events`
  - Returns all events with minimal fields for the hub.
- `GET /api/events/:slug`
  - Returns event overview + latest edition summary.
- `GET /api/events/:slug/editions/:year`
  - Returns full edition data: format, groups, brackets, winners, gallery, testimonials.
- `GET /api/hall-of-fame`
  - Returns `HallOfFameEntry` list, pre‑populated with related event and winners.
- `GET /api/legacy`
  - Returns `LegacyEntry` list grouped by year.
- `GET /api/team`
  - Returns current team roles + optional mapping to players.
- `GET /api/gallery`
  - Filterable by event, year, tag.

### 4.2 Caching strategy

- Responses from CMS should be cached at edge for short windows (e.g. 5–15 mins) with **webhook invalidation** when content is updated.[web:64][web:68]
- Use `stale-while-revalidate` pattern so the site feels instant while new content is fetched.

---

## 5. Admin UX expectations

We’re not designing the CMS UI, but we **must** make it friendly for club admins.

- Clear content type names.
- Helpful descriptions on fields (“Shown on events hub card”, “Used as tagline on hero”).[web:70][web:73]
- Minimal required fields; don’t make editors fill 20 boxes just to post an announcement.
- Validation rules for key fields (slugs unique, year within a sane range, required relationships like `Event` for `EventEdition`).[web:70]

For example, creating a new Olympiad edition should feel like:
1. Create `EventEdition` → select `event = Olympiad`, set year, dates.
2. Add `GroupStage` records and link teams.
3. Add `KnockoutBracket` + rounds + matches.
4. Attach `WinnerRecord`s and gallery.
5. Publish.

That’s it.

---

## 6. Backend responsibilities for Women’s Chess Olympiad

To keep the Women’s Olympiad structurally serious (not a decorative tab):

- `Event` record with `event_category = womens`.
- `EventEdition`s same as Olympiad – groups, knockouts, winners, gallery.
- Optional `Testimonial` entries tagged with this event.
- Ability to filter gallery & hall of fame by this event.

The backend doesn’t treat it as “special content”; it’s a **first‑class event** with its own editions and records.

---

## 7. Security & governance

Backend security should follow 2026 patterns:[web:72][web:75]

- **CMS roles & permissions** – only authorised club admins can create/edit content.
- **API keys & tokens** kept server‑side; no secrets in frontend code.
- **Rate limiting** on public endpoints.
- **Zero‑trust mindset** – never assume a request is friendly by default.[web:75]
- SSL everywhere (handled by platform).

---

## 8. Performance & scalability

To keep the site feeling instant even as archives grow:[web:64][web:68][web:75]

- Use SSG/ISR (incremental static regeneration) for:
  - homepage
  - events hub
  - event pages (per edition)
  - hall of fame
  - legacy
- Use on‑demand revalidation/webhooks when content changes.
- Serve images through an optimising image CDN.
- Keep API payloads lean: only ship the fields the frontend actually needs.

---

## 9. Analytics & observability

The backend should expose enough metadata for:

- Tracking page views and engagement (via frontend instrumentation).
- Monitoring API response times and cache hit rates.
- Logging errors for CMS/edge functions.

No creepy tracking; focus on:
- Which event pages people care about
- Which editions they open
- Which CTAs they click

---

## 10. What “done” means for the backend

Backend is **done** when:

1. All content types are created with clear descriptions and validations.
2. Editors can:
   - create new events,
   - create new editions,
   - attach results, winners, and galleries,
   - update team & legacy,
   - post announcements – without asking a developer.
3. The frontend can hit documented endpoints and get clean, predictable JSON.
4. Content updates propagate to the live site within a reasonable window (seconds to a few minutes).
5. Adding a new yearly edition is routine, not a mini‑project.

If someone needs to open VS Code just to update winners, the backend isn’t done.
If the club can keep this site alive for 5+ years through the CMS alone while the frontend still feels sharp and cinematic – then we nailed it.