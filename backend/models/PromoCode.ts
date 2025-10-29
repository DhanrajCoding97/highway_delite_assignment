import mongoose, { Document, Schema } from 'mongoose';

export interface IPromoCode extends Document {
  code: string;
  discountType: 'percentage' | 'flat';
  discountValue: number;
  active: boolean;
  expiryDate?: Date;
}

const PromoCodeSchema = new Schema<IPromoCode>({
  code: { type: String, required: true, unique: true, uppercase: true },
  discountType: { type: String, enum: ['percentage', 'flat'], required: true },
  discountValue: { type: Number, required: true },
  active: { type: Boolean, default: true },
  expiryDate: { type: Date }
});

export default mongoose.model<IPromoCode>('PromoCode', PromoCodeSchema);
