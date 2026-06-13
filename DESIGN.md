# Piper Chess Club Design System

## Typography
- **Primary Font**: 'Outfit', sans-serif - Used for headings. Clean, geometric, and modern.
- **Secondary Font**: 'Inter', sans-serif - Used for body text. Highly legible.
- **Display Font**: 'Playfair Display', serif - Used for special, elegant chess-themed callouts and quotes.

## Color System
- **Background**: Deep Obsidian `#0B0F19` with subtle radial gradients of `#1C2A43`.
- **Primary Accent**: Chessboard Ivory `#F4F4F5`.
- **Secondary Accent**: Grandmaster Gold `#D4AF37` (used sparingly for luxury and prestige).
- **Interactive Elements**: Cyber Blue `#3B82F6` and deep violet transitions.
- **Text**: `#E2E8F0` for primary paragraphs, `#94A3B8` for secondary text.

## Spacing & Grid System
- Based on an 8px multiplier for precision.
- 12-column grid system for large screens, transitioning to a flexible 4-column for mobile.
- Generous padding and whitespace to allow components to "breathe".

## UI Components & Cards
- **Glassmorphism**: Cards use a frosted glass effect `background: rgba(255, 255, 255, 0.05)`, `backdrop-filter: blur(16px)`, `border: 1px solid rgba(255, 255, 255, 0.1)`.
- **Borders**: 1px subtle gradients or translucent white borders to define edges.
- **Border Radius**: Substantial curves (`16px` to `24px`) for modern softness, mixed with sharp edges for a geometric chess feel where appropriate.

## Motion & Interaction System
- **Hover States**: Subtle lift on Y-axis (`-4px`), slight shadow glow, and slower `transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1)`.
- **Scroll Reveals**: Elements fade in and slide up (`30px`) on scroll intersections.
- **Section Transitions**: Smooth, seamless background shifts between sections, no harsh lines.

## Chess-Themed Visual Elements
- Abstract, low-opacity geometric grids resembling chessboards in the background.
- Subtle 3D renders or minimalist vectors of chess pieces used as hero graphics or watermarks.
- "Checkmate" cinematic typography entries.
