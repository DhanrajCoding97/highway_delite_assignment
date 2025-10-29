import { Request, Response } from 'express';
import PromoCode from '../models/PromoCode';

export const validatePromoCode = async (req: Request, res: Response) => {
  try {
    const { code, subtotal } = req.body;

    if (!code) {
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

    const promo = await PromoCode.findOne({
      code: code.toUpperCase(),
      active: true
    });

    if (!promo) {
      return res.status(404).json({
        success: false,
        message: 'Invalid promo code'
      });
    }

    if (promo.expiryDate && promo.expiryDate < new Date()) {
      return res.status(400).json({
        success: false,
        message: 'Promo code has expired'
      });
    }

    let discount = 0;
    if (promo.discountType === 'percentage') {
      discount = Math.round((subtotal * promo.discountValue) / 100);
    } else {
      discount = promo.discountValue;
    }

    //ensure discout doesn't exceed subtotal
    discount = Math.min(discount, subtotal);

    res.json({
      success: true,
      valid: true,
      code: promo.code,
      discountType: promo.discountType,
      discountValue: promo.discountValue,
      discount
    });
  } catch (error) {
    console.error('Error validating promo code:', error);
    res.status(500).json({
      success: false,
      message: 'Error validating promo code',
      error
    });
  }
};
