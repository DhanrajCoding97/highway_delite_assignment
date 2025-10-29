//backend/models/PromoCode.ts
import mongoose, { Document, Schema } from 'mongoose';

export interface IPromoCode extends Document {
  code: string;
  discountType: 'percentage' | 'flat';
  discountValue: number;
  active: boolean;
  expiryDate?: Date;
  minPurchaseAmount?: number;
  maxDiscount?: number;
  usageLimit?: number;
  usedCount?: number;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}

const PromoCodeSchema = new Schema<IPromoCode>(
  {
    code: {
      type: String,
      required: [true, 'Promo code is required'],
      unique: true,
      uppercase: true,
      trim: true,
      index: true
    },
    discountType: {
      type: String,
      enum: ['percentage', 'flat'],
      required: [true, 'Discount type is required']
    },
    discountValue: {
      type: Number,
      required: [true, 'Discount value is required'],
      min: [0, 'Discount value cannot be negative']
    },
    active: {
      type: Boolean,
      default: true
    },
    expiryDate: {
      type: Date
    },
    minPurchaseAmount: {
      type: Number,
      default: 0,
      min: [0, 'Minimum purchase amount cannot be negative']
    },
    maxDiscount: {
      type: Number,
      min: [0, 'Maximum discount cannot be negative']
    },
    usageLimit: {
      type: Number,
      min: [1, 'Usage limit must be at least 1']
    },
    usedCount: {
      type: Number,
      default: 0,
      min: [0, 'Used count cannot be negative']
    },
    description: {
      type: String,
      trim: true
    }
  },
  { timestamps: true }
);

// Instance method to check if promo code is valid
PromoCodeSchema.methods.isValid = function (): {
  valid: boolean;
  message?: string;
} {
  if (!this.active) {
    return { valid: false, message: 'Promo code is inactive' };
  }

  if (this.expiryDate && this.expiryDate < new Date()) {
    return { valid: false, message: 'Promo code has expired' };
  }

  if (this.usageLimit && this.usedCount >= this.usageLimit) {
    return { valid: false, message: 'Promo code usage limit reached' };
  }

  return { valid: true };
};

// Instance method to calculate discount
PromoCodeSchema.methods.calculateDiscount = function (amount: number): number {
  if (this.minPurchaseAmount && amount < this.minPurschaseAmount) {
    return 0;
  }

  let discount = 0;

  if (this.discountType === 'percentage') {
    discount = Math.round((amount * this.discountValue) / 100);

    //Apply max discount cap if exists
    if (this.maxDiscount) {
      discount = Math.min(discount, this.maxDiscount);
    }
  } else {
    discount = this.discountValue;
  }
  // Ensure discount doesn't exceed the amount
  return Math.min(discount, amount);
};

export default mongoose.model<IPromoCode>('PromoCode', PromoCodeSchema);
