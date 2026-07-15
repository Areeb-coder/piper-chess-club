import mongoose, { Schema, Document, Model } from 'mongoose';

export interface ILegacyEntry extends Document {
  year: number;
  title: string;
  description: string;
  type: 'milestone' | 'office_bearers' | 'memorable_event';
  createdAt: Date;
  updatedAt: Date;
}

const legacyEntrySchema = new Schema<ILegacyEntry>({
  year: { type: Number, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  type: { type: String, enum: ['milestone', 'office_bearers', 'memorable_event'], required: true },
}, { timestamps: true });

export const LegacyEntry: Model<ILegacyEntry> = mongoose.models.LegacyEntry || mongoose.model<ILegacyEntry>('LegacyEntry', legacyEntrySchema);
