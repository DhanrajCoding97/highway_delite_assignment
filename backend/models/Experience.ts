import mongoose, { Document, Schema } from 'mongoose';

export interface ISlot {
  date: Date;
  startTime: string;
  endTime: string;
  availableSpots: number;
  totalSpots: number;
  price: number;
}

export interface IExperience extends Document {
  title: string;
  description: string;
  location: string;
  duration: string;
  category: string;
  image: string;
  rating: number;
  reviewCount: number;
  highlights: string[];
  included: string[];
  about: string;
  slots: ISlot[];
  createdAt: Date;
  updatedAt: Date;
  currency: string;
}

const SlotSchema = new Schema<ISlot>({
  date: { type: Date, required: true },
  startTime: { type: String, required: true },
  endTime: { type: String, required: true },
  availableSpots: { type: Number, required: true },
  totalSpots: { type: Number, required: true },
  price: { type: Number, required: true }
});

const ExperienceSchema = new Schema<IExperience>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    location: { type: String, required: true },
    duration: { type: String, required: true },
    category: { type: String, required: true },
    image: { type: String, required: true },
    rating: { type: Number, default: 0 },
    reviewCount: { type: Number, default: 0 },
    highlights: [{ type: String }],
    included: [{ type: String }],
    about: { type: String },
    slots: [SlotSchema],
    currency: { type: String, default: 'INR' }
  },
  { timestamps: true }
);

export default mongoose.model<IExperience>('Experience', ExperienceSchema);
