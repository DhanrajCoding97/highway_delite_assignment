import express from 'express';
import {
  createBooking,
  getBookingByReference
} from '../controllers/bookingController';
import {
  ValidateBooking,
  validateBookingReference
} from '../middleware/validation';

const router = express.Router();

router.post('/', ValidateBooking, createBooking);
router.get('/:reference', validateBookingReference, getBookingByReference);

export default router;
