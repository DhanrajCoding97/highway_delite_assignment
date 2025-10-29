import { Request, Response } from 'express';
import Booking from '../models/Bookings';
import Experience from '../models/Experience';
import PromoCode from '../models/PromoCode';

export const createBooking = async (req: Request, res: Response) => {
  try {
    const {
      experienceId,
      slotDate,
      slotTime,
      customerName,
      customerEmail,
      customerPhone,
      numberOfPeople,
      promoCode
    } = req.body;

    //validate required fields
    if (
      !experienceId ||
      !slotDate ||
      !slotTime ||
      !customerName ||
      !customerEmail ||
      !numberOfPeople
    ) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields'
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(customerEmail)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid email format'
      });
    }

    // Find experience
    const experience = await Experience.findById(experienceId);
    if (!experience) {
      return res.status(404).json({
        success: false,
        message: 'Experience not found'
      });
    }

    // Find the specific slot
    const slotIndex = experience.slots.findIndex((s) => {
      const sDate = new Date(s.date);
      const reqDate = new Date(slotDate);
      return (
        sDate.toISOString().split('T')[0] ===
          reqDate.toISOString().split('T')[0] && s.startTime === slotTime
      );
    });

    if (slotIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Slot not found'
      });
    }

    const slot = experience.slots[slotIndex];

    // Check availability
    if (slot.availableSpots < numberOfPeople) {
      return res.status(400).json({
        success: false,
        message: `Only ${slot.availableSpots} spots available`
      });
    }

    // Calculate subtotal
    const subtotal = slot.price * numberOfPeople;

    // Calculate taxes (18% GST)
    const taxes = Math.round(subtotal * 0.18);

    let discount = 0;

    // Apply promo code if provided
    if (promoCode) {
      const promo = await PromoCode.findOne({
        code: promoCode.toUpperCase(),
        active: true
      });

      if (promo && (!promo.expiryDate || promo.expiryDate > new Date())) {
        if (promo.discountType === 'percentage') {
          discount = Math.round((subtotal * promo.discountValue) / 100);
        } else {
          discount = promo.discountValue;
        }
      }
    }

    // Calculate final total
    const totalPrice = subtotal + taxes - discount;

    // Generate booking reference
    const bookingReference = `BK${Date.now()}${Math.floor(
      Math.random() * 1000
    )}`;

    // Create booking
    const booking = new Booking({
      experienceId,
      experienceTitle: experience.title,
      slotDate,
      slotTime,
      customerName,
      customerEmail,
      customerPhone,
      numberOfPeople,
      subtotal,
      taxes,
      totalPrice,
      promoCode: promoCode?.toUpperCase(),
      discount,
      bookingReference,
      status: 'confirmed'
    });

    await booking.save();

    // Update slot availability
    experience.slots[slotIndex].availableSpots -= numberOfPeople;
    await experience.save();

    res.status(201).json({
      success: true,
      booking: {
        bookingReference: booking.bookingReference,
        experienceTitle: booking.experienceTitle,
        slotDate: booking.slotDate,
        slotTime: booking.slotTime,
        numberOfPeople: booking.numberOfPeople,
        subtotal: booking.subtotal,
        taxes: booking.taxes,
        discount: booking.discount,
        totalPrice: booking.totalPrice,
        status: booking.status,
        customerName: booking.customerName,
        customerEmail: booking.customerEmail
      }
    });
  } catch (error) {
    console.error('Error creating booking:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating booking',
      error
    });
  }
};

export const getBookingByReference = async (req: Request, res: Response) => {
  try {
    const booking = await Booking.findOne({
      bookingReference: req.params.reference
    });

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }

    res.json({
      success: true,
      booking
    });
  } catch (error) {
    console.error('Error fetching booking', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching booking',
      error
    });
  }
};
