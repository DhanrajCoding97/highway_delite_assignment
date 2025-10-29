import { body, param, query, validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';

//handle validation errors
export const handleValidationErrors = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array().map((error) => ({
        field: error.type === 'field' ? error.path : 'unknown',
        message: error.msg
      }))
    });
  }
  next();
};

//Booking validation rules
export const ValidateBooking = [
  body('experienceId').isMongoId().withMessage('Invalid experience ID'),
  body('slotDate').isISO8601().withMessage('Invalid date format'),
  body('slotTime').notEmpty().withMessage('Slot time is required').trim(),
  body('customerName')
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Customer name must be between 2 and 100 characters')
    .matches(/^[a-zA-Z\s]+$/)
    .withMessage('Name can only contain letters and spaces'),
  body('customerEmail')
    .isEmail()
    .normalizeEmail()
    .withMessage('Invalid email address'),
  body('customerPhone')
    .optional()
    .trim()
    .matches(/^[0-9]{10}$/)
    .withMessage('Phone number must be 10 digits'),
  body('numberOfPeople')
    .isInt({ min: 1, max: 20 })
    .withMessage('Number of people must be between 1 and 20'),
  body('promoCode')
    .optional()
    .trim()
    .toUpperCase()
    .isLength({ min: 3, max: 20 })
    .withMessage('Promo code must be between 3 and 20 characters'),

  handleValidationErrors
];

//Promo code validation rules
export const validatePromoCode = [
  body('code')
    .notEmpty()
    .withMessage('Promo code is required')
    .trim()
    .toUpperCase(),

  body('subtotal')
    .isFloat({ min: 0.01 })
    .withMessage('Subtotal must be greater than 0'),

  handleValidationErrors
];

//Experience Id Validation
export const validateExperienceId = [
  param('id').isMongoId().withMessage('Invalid experience ID'),

  handleValidationErrors
];

//Booking refrence Validation
export const validateBookingReference = [
  param('reference')
    .notEmpty()
    .withMessage('Booking reference is required')
    .matches(/^BK\d+$/)
    .withMessage('Invalid booking reference format'),

  handleValidationErrors
];
