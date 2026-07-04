import * as fs from 'fs';
import * as path from 'path';

// Using relative path for tsx execution
import { events, editions, teams, mockGroups, mockBrackets, legacyEntries } from '../src/lib/cms/mockData';

const eventsDir = path.join(__dirname, '../events');
const publicEventsDir = path.join(__dirname, '../public/media/events');

if (!fs.existsSync(publicEventsDir)) {
  fs.mkdirSync(publicEventsDir, { recursive: true });
}

// Map folder names to slugs
const eventSlugMap: Record<string, string> = {
  'Bullet online championship': 'bullet-championship',
  'Candidates': 'candidates',
  'Freestyle': 'freestyle',
  'Inter Department chess league': 'inter-department',
  'Olympiad': 'olympiad',
  'Senior and junior pool': 'senior-and-junior-pool',
  "Women's Olympiad": 'womens'
};

function copyDirContents(src: string, dest: string, urlPrefix: string) {
  if (!fs.existsSync(src)) return [];
  if (!fs.existsSync(dest)) fs.mkdirSync(dest, { recursive: true });
  
  const files = fs.readdirSync(src);
  const urls: string[] = [];
  for (const file of files) {
    const srcPath = path.join(src, file);
    const destPath = path.join(dest, file);
    if (fs.statSync(srcPath).isFile()) {
      fs.copyFileSync(srcPath, destPath);
      urls.push(`${urlPrefix}/${file}`);
    }
  }
  return urls;
}

function parseLeaderboard(leaderboardPath: string) {
  if (!fs.existsSync(leaderboardPath)) return null;
  const content = fs.readFileSync(leaderboardPath, 'utf8');
  const lines = content.split('\n').map(l => l.trim()).filter(Boolean);
  
  const results: any[] = [];
  for (const line of lines) {
    if (line.toLowerCase().startsWith('date:')) continue;
    
    // Example: "Winner: Electronics (Md Affan Hussain, Md Aabid Hussain, Md Hamiz)"
    const match = line.match(/^([^:]+):\s*(.+?)(?:\s*\((.+)\))?$/);
    if (match) {
      const rank = match[1].trim();
      let department = match[2].trim();
      let namesStr = match[3];
      
      // If no parens, it might just be names
      if (!namesStr) {
        namesStr = department;
        department = '';
      }
      
      const names = namesStr.split(',').map(n => n.trim());
      const result: any = { rank, names };
      if (department && department !== namesStr) {
        result.department = department;
      }
      results.push(result);
    }
  }
  return results.length > 0 ? results : null;
}

function processEvents() {
  if (!fs.existsSync(eventsDir)) {
    console.log("No events directory found at", eventsDir);
    return;
  }

  const eventFolders = fs.readdirSync(eventsDir).filter(f => fs.statSync(path.join(eventsDir, f)).isDirectory());

  for (const folder of eventFolders) {
    const slug = eventSlugMap[folder];
    if (!slug) {
      console.warn(`Unknown event folder: ${folder}`);
      continue;
    }

    // Ensure event exists in CMS
    let event = events.find(e => e.slug === slug);
    if (!event) {
      console.log(`Creating missing event: ${folder}`);
      event = {
        slug,
        name: folder,
        short_tagline: 'An exciting chess event.',
        event_category: 'freestyle', // default
        visibility_rank: 10,
        primary_color: '#3498db',
        overview_richtext: `<p>Welcome to ${folder}.</p>`,
        format_summary: 'Standard',
        typical_time_control: '10+0',
        is_active: true
      };
      events.push(event);
    }

    const eventPath = path.join(eventsDir, folder);
    const subDirs = fs.readdirSync(eventPath).filter(f => fs.statSync(path.join(eventPath, f)).isDirectory());

    // Check if there are year folders, or if they are directly Poster/Photos
    let hasYears = subDirs.some(d => /^\d{4}$/.test(d));
    let yearsToProcess: { year: number, dirPath: string }[] = [];

    if (hasYears) {
      for (const sub of subDirs) {
        if (/^\d{4}$/.test(sub)) {
          yearsToProcess.push({ year: parseInt(sub), dirPath: path.join(eventPath, sub) });
        }
      }
    } else {
      // Default to latest year if no year folder (e.g. Candidates/Photos)
      const existingEditions = editions.filter(e => e.eventSlug === slug);
      let year = 2025;
      if (existingEditions.length > 0) {
        year = Math.max(...existingEditions.map(e => e.year));
      }
      yearsToProcess.push({ year, dirPath: eventPath });
    }

    for (const { year, dirPath } of yearsToProcess) {
      const editionSlug = `${slug}-${year}`;
      let edition = editions.find(e => e.slug === editionSlug);

      if (!edition) {
        console.log(`Creating missing edition: ${editionSlug}`);
        edition = {
          slug: editionSlug,
          eventSlug: slug,
          year,
          title: `${event.name} ${year}`,
          start_date: `${year}-01-01`,
          end_date: `${year}-01-01`,
          location: 'Main Hall',
          status: 'completed',
          edition_intro: '',
          heroIntro: `The ${year} edition of ${event.name}.`,
          overview: `An incredible display of skill at the ${year} ${event.name}.`,
          highlights: ["Exciting matches.", "Great sportsmanship."],
          results: []
        };
        editions.push(edition);
      }

      const editionPublicDir = path.join(publicEventsDir, slug, year.toString());
      const publicUrlPrefix = `/media/events/${slug}/${year}`;

      // Search for Poster, Photos, Leaderboard folders (case insensitive)
      const dirs = fs.readdirSync(dirPath).filter(d => fs.statSync(path.join(dirPath, d)).isDirectory());
      
      const posterDirName = dirs.find(d => d.toLowerCase().includes('poster'));
      if (posterDirName) {
        const urls = copyDirContents(path.join(dirPath, posterDirName), path.join(editionPublicDir, 'poster'), `${publicUrlPrefix}/poster`);
        if (urls.length > 0) edition.posterUrl = urls[0];
      }

      const photosDirName = dirs.find(d => d.toLowerCase().includes('photo') || d.toLowerCase().includes('reel'));
      if (photosDirName) {
        const urls = copyDirContents(path.join(dirPath, photosDirName), path.join(editionPublicDir, 'photos'), `${publicUrlPrefix}/photos`);
        if (urls.length > 0) {
          edition.galleryUrls = [...(edition.galleryUrls || []), ...urls];
        }
      }
      
      // Look for another photos dir just in case (e.g. Position-event-winner photos)
      for (const d of dirs) {
        if (d !== photosDirName && (d.toLowerCase().includes('photo') || d.toLowerCase().includes('gallery'))) {
            const urls = copyDirContents(path.join(dirPath, d), path.join(editionPublicDir, 'photos2'), `${publicUrlPrefix}/photos2`);
            if (urls.length > 0) {
                edition.galleryUrls = [...(edition.galleryUrls || []), ...urls];
            }
        }
      }

      // Check for Leaderboard.txt in ANY subfolder of dirPath that has leaderboard in name
      const lbDirName = dirs.find(d => d.toLowerCase().includes('leaderboard') || d.toLowerCase().includes('leadboard'));
      if (lbDirName) {
        const lbPath = path.join(dirPath, lbDirName);
        const lbFiles = fs.readdirSync(lbPath);
        const txtFile = lbFiles.find(f => f.toLowerCase().endsWith('.txt'));
        if (txtFile) {
          const results = parseLeaderboard(path.join(lbPath, txtFile));
          if (results && (!edition.results || edition.results.length === 0)) {
            edition.results = results;
          }
        }
      }
    }
  }

  // Write back to mockData.ts
  const mockDataPath = path.join(__dirname, '../src/lib/cms/mockData.ts');
  const out = `import { Event, EventEdition, Team, GroupStage, KnockoutBracket, WinnerRecord, LegacyEntry } from './types';

export const events: Event[] = ${JSON.stringify(events, null, 2)};

export const editions: EventEdition[] = ${JSON.stringify(editions, null, 2)};

export const teams: Team[] = ${JSON.stringify(teams, null, 2)};

export const mockGroups: GroupStage[] = ${JSON.stringify(mockGroups, null, 2)};

export const mockBrackets: KnockoutBracket[] = ${JSON.stringify(mockBrackets, null, 2)};

export const legacyEntries: LegacyEntry[] = ${JSON.stringify(legacyEntries, null, 2)};
`;

  fs.writeFileSync(mockDataPath, out, 'utf8');
  console.log("Successfully updated mockData.ts and copied media.");
}

processEvents();
