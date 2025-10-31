import mongoose, { Document, Schema } from 'mongoose';

export interface IBooking extends Document {
  experienceId: mongoose.Types.ObjectId;
  experienceTitle: string;
  slotDate: Date;
  slotTime: string;
  customerName: string;
  customerEmail: string;
  numberOfPeople: number;
  subtotal: number;
  taxes: number;
  totalPrice: number;
  promoCode?: string;
  discount: number;
  status: 'confirmed' | 'pending' | 'cancelled';
  bookingReference: string;
  createdAt: Date;
}

const BookingSchema = new Schema<IBooking>(
  {
    experienceId: {
      type: Schema.Types.ObjectId,
      ref: 'Experience',
      required: true
    },
    experienceTitle: { type: String, required: true },
    slotDate: { type: Date, required: true },
    slotTime: { type: String, required: true },
    customerName: { type: String, required: true },
    customerEmail: { type: String, required: true },
    numberOfPeople: { type: Number, required: true },
    subtotal: { type: Number, required: true },
    taxes: { type: Number, required: true },
    totalPrice: { type: Number, required: true },
    promoCode: { type: String },
    discount: { type: Number, default: 0 },
    status: {
      type: String,
      enum: ['confirmed', 'pending', 'cancelled'],
      default: 'confirmed'
    },
    bookingReference: { type: String, required: true, unique: true }
  },
  { timestamps: true }
);

export default mongoose.model<IBooking>('Booking', BookingSchema);
