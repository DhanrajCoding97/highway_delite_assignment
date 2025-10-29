import express from 'express';
import { validatePromoCode } from '../controllers/promoCodeController';

const router = express.Router();

router.post('/validate', validatePromoCode);

export default router;
