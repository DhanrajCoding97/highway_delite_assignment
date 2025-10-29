import express from 'express';
import {
  validatePromoCode,
  getActivePromoCodes
} from '../controllers/promoCodeController';
import { validatePromoCode as validatePromoInput } from '../middleware/validation';

const router = express.Router();

//POST /api/promo/validate - Validate promo code
router.post('/validate', validatePromoInput, validatePromoCode);
// GET /api/promo/active - Get all active promo codes
router.get('/active', getActivePromoCodes);

export default router;
