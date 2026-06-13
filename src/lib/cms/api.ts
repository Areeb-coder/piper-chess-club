import { events, editions, legacyEntries, mockGroups, mockBrackets } from './mockData';
import { Event, EventEdition, LegacyEntry, GroupStage, KnockoutBracket } from './types';

export const getEvents = (): Event[] => {
  return events.sort((a, b) => a.visibility_rank - b.visibility_rank);
};

export const getEventBySlug = (slug: string): Event | undefined => {
  return events.find(e => e.slug === slug);
};

export const getEventEditions = (eventSlug: string): EventEdition[] => {
  return editions.filter(e => e.eventSlug === eventSlug).sort((a, b) => b.year - a.year);
};

export const getLatestEdition = (eventSlug: string): EventEdition | undefined => {
  return getEventEditions(eventSlug)[0];
};

export const getLegacyEntries = (): LegacyEntry[] => {
  return legacyEntries.sort((a, b) => b.year - a.year);
};

export const getGroupsForEdition = (editionSlug: string): GroupStage[] => {
  return mockGroups.filter(g => g.editionSlug === editionSlug);
};

export const getBracketsForEdition = (editionSlug: string): KnockoutBracket[] => {
  return mockBrackets.filter(b => b.editionSlug === editionSlug);
};
