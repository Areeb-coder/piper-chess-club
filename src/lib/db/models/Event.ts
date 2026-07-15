import mongoose, { Schema, Document } from 'mongoose';

export interface IEvent extends Document {
  slug: string;
  name: string;
  short_tagline: string;
  event_category: 'flagship' | 'womens' | 'freestyle' | 'rivalry' | 'freshers' | 'department';
  visibility_rank: number;
  icon?: string;
  primary_color: string;
  secondary_color?: string;
  hero_image?: string;
  overview_richtext: string;
  format_summary: string;
  typical_time_control: string;
  is_active: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const EventSchema: Schema = new Schema({
  slug: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  short_tagline: { type: String, required: true },
  event_category: { type: String, required: true, enum: ['flagship', 'womens', 'freestyle', 'rivalry', 'freshers', 'department'] },
  visibility_rank: { type: Number, required: true, default: 0 },
  icon: { type: String },
  primary_color: { type: String, required: true },
  secondary_color: { type: String },
  hero_image: { type: String }, // Secure URL from Cloudinary
  overview_richtext: { type: String, required: true },
  format_summary: { type: String, required: true },
  typical_time_control: { type: String, required: true },
  is_active: { type: Boolean, required: true, default: true },
}, { timestamps: true });

export const Event = mongoose.models.Event || mongoose.model<IEvent>('Event', EventSchema);
