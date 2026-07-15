import mongoose, { Schema, Document } from 'mongoose';

export interface IEventEdition extends Document {
  slug: string;
  eventSlug: string; // References Event.slug
  year: number;
  title: string;
  start_date: string;
  end_date: string;
  location: string;
  status: 'upcoming' | 'ongoing' | 'completed';
  hero_image?: string;
  edition_intro: string;
  format_notes?: string;
  heroIntro?: string;
  overview?: string;
  highlights?: string[];
  posterUrl?: string; // Cloudinary URL
  galleryUrls?: string[]; // Cloudinary URLs
  isDraft: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const EventEditionSchema: Schema = new Schema({
  slug: { type: String, required: true, unique: true },
  eventSlug: { type: String, required: true },
  year: { type: Number, required: true },
  title: { type: String, required: true },
  start_date: { type: String, required: true },
  end_date: { type: String, required: true },
  location: { type: String, required: true },
  status: { type: String, required: true, enum: ['upcoming', 'ongoing', 'completed'] },
  hero_image: { type: String },
  edition_intro: { type: String, required: true },
  format_notes: { type: String },
  heroIntro: { type: String },
  overview: { type: String },
  highlights: [{ type: String }],
  posterUrl: { type: String },
  galleryUrls: [{ type: String }],
  isDraft: { type: Boolean, default: true }, // Draft system support
}, { timestamps: true });

export const EventEdition = mongoose.models.EventEdition || mongoose.model<IEventEdition>('EventEdition', EventEditionSchema);
