//backend/controllers/promoCodeController.ts
import { Request, Response } from 'express';
import PromoCode from '../models/PromoCode';

export const validatePromoCode = async (req: Request, res: Response) => {
  try {
    const { code, subtotal } = req.body;

    //input validation
    if (!code || typeof code !== 'string') {
      return res.status(400).json({
        success: false,
        message: 'Promo code is required'
      });
    }

    if (!subtotal || subtotal <= 0) {
      return res.status(400).json({
        success: false,
        message: 'Invalid Subtotal amount'
      });
    }

    //find promo code
    const promo = await PromoCode.findOne({
      code: code.toUpperCase(),
      active: true
    });

    if (!promo) {
      return res.status(404).json({
        success: false,
        valid: false,
        message: 'Invalid promo code'
      });
    }

    //check if promo is active
    if (!promo.active) {
      return res.status(400).json({
        success: false,
        valid: false,
        message: 'This Promo code is no longer active'
      });
    }

    //check expiry date
    if (promo.expiryDate && promo.expiryDate < new Date()) {
      return res.status(400).json({
        success: false,
        message: 'This promo code has expired'
      });
    }

    // Check usage limit
    if (
      promo.usageLimit &&
      promo.usedCount !== undefined &&
      promo.usedCount >= promo.usageLimit
    ) {
      return res.status(400).json({
        success: false,
        valid: false,
        message: 'This promo code has reached its usage limit'
      });
    }

    //check minimum purchase amount
    if (promo.minPurchaseAmount && subtotal < promo.minPurchaseAmount) {
      return res.status(400).json({
        success: false,
        valid: false,
        message: `Minimum purchase amount of ${promo.minPurchaseAmount} is required to use this promo code`
      });
    }
    //calculate discount
    let discount = 0;

    if (promo.discountType === 'percentage') {
      discount = Math.round((subtotal * promo.discountValue) / 100);

      //Apply max discount cap if exists
      if (promo.maxDiscount && discount > promo.maxDiscount) {
        discount = promo.maxDiscount;
      }
    } else {
      discount = promo.discountValue;
    }

    // Ensure discount doesn't exceed subtotal
    discount = Math.min(discount, subtotal);

    //calculate final total
    const finalAmount = subtotal - discount;

    res.json({
      success: true,
      valid: true,
      code: promo.code,
      discountType: promo.discountType,
      discountValue: promo.discountValue,
      discount,
      finalAmount,
      message: `Promo code applied! You saved ₹${discount}`
    });
  } catch (error) {
    console.error('Error validating promo code:', error);
    res.status(500).json({
      success: false,
      valid: false,
      message: 'Error validating promo code',
      error: process.env.NODE_ENV === 'development' ? error : undefined
    });
  }
};

//get all active promo codes
export const getActivePromoCodes = async (req: Request, res: Response) => {
  try {
    const promoCodes = await PromoCode.find({
      active: true,
      $or: [{ expiryDate: { $gte: new Date() } }, { expiryDate: null }]
    }).select(
      'code description discountType discountValue minPurchaseAmount maxDiscount expiryDate'
    );

    res.json({
      success: true,
      promoCodes
    });
  } catch (error) {
    console.error('Error fetching active promo codes:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching active promo codes',
      error: process.env.NODE_ENV === 'development' ? error : undefined
    });
  }
};
