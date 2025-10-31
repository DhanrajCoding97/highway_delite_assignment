import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { useBooking } from '../context/BookingContext';
import { createBooking, validatePromoCode } from '../services/api';
import Navbar from '../components/Navbar';
import { Input } from '../components/ui/input';
// Zod validation schema
const checkoutSchema = z.object({
  customerName: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name is too long')
    .regex(/^[a-zA-Z\s]+$/, 'Name can only contain letters and spaces'),
  customerEmail: z.string().email('Please enter a valid email address'),
  promoCode: z.string().optional(),
  agreeToTerms: z
    .boolean()
    .refine((val) => val === true, 'You must agree to terms and policy')
});

type CheckoutFormData = z.infer<typeof checkoutSchema>;

const CheckoutPage = () => {
  const navigate = useNavigate();
  const {
    selectedExperience,
    selectedSlot,
    selectedDate,
    quantity,
    pricing,
    promoCode,
    applyPromoCode,
    calculatePricing
  } = useBooking();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [promoLoading, setPromoLoading] = useState(false);
  const [promoError, setPromoError] = useState('');
  const [promoSuccess, setPromoSuccess] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch
  } = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      customerName: '',
      customerEmail: '',
      promoCode: '',
      agreeToTerms: false
    }
  });

  const promoCodeValue = watch('promoCode');

  // Redirect if no booking data
  if (!selectedExperience || !selectedSlot || !selectedDate) {
    navigate('/');
    return null;
  }

  const handleApplyPromo = async () => {
    if (!promoCodeValue || !promoCodeValue.trim()) {
      setPromoError('Please enter a promo code');
      return;
    }

    try {
      setPromoLoading(true);
      setPromoError('');
      setPromoSuccess('');

      const result = await validatePromoCode(promoCodeValue, pricing.subtotal);

      if (result.valid) {
        applyPromoCode(result.code, result.discount);
        setPromoSuccess(
          result.message || `Promo code applied! You saved ₹${result.discount}`
        );
      } else {
        setPromoError(result.message || 'Invalid promo code');
      }
    } catch (error: any) {
      setPromoError(
        error.response?.data?.message || 'Failed to validate promo code'
      );
    } finally {
      setPromoLoading(false);
    }
  };

  const onSubmit = async (data: CheckoutFormData) => {
    try {
      setIsSubmitting(true);

      const bookingData = {
        experienceId: selectedExperience._id,
        slotDate: selectedDate,
        slotTime: selectedSlot.slotTime,
        customerName: data.customerName,
        customerEmail: data.customerEmail,
        numberOfPeople: quantity,
        promoCode: promoCode || undefined
      };

      const booking = await createBooking(bookingData);
      navigate(`/confirmation/${booking.bookingReference}`);
    } catch (error: any) {
      alert(
        error.response?.data?.message || 'Booking failed. Please try again.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar value="" onChange={() => {}} onSearch={() => {}} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6">
          <ArrowLeft className="w-5 h-5" />
          <span>Checkout</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Side - Form */}
          <div className="lg:col-span-2">
            <div className="pt-5 px-6 bg-[#EFEFEF] rounded-[12px] p-6 shadow-lg border border-[##EFEFEF]">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Name and Email Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="mb-2 block text-sm text-[#5B5B5B] leading-[18px] font-normal">
                      Full name
                    </label>
                    <Input
                      type="text"
                      placeholder="John Doe"
                      {...register('customerName')}
                    />
                    {errors.customerName && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.customerName.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="mb-2 block text-sm text-[#5B5B5B] leading-[18px] font-normal">
                      Email
                    </label>
                    <Input
                      type="email"
                      placeholder="test@test.com"
                      {...register('customerEmail')}
                    />
                    {errors.customerEmail && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.customerEmail.message}
                      </p>
                    )}
                  </div>
                </div>
                {/* Promo Code */}
                <div>
                  <label className="block text-sm text-gray-600 mb-2">
                    Promo code
                  </label>
                  <div className="flex gap-3">
                    <Input
                      type="text"
                      placeholder="Enter promo code"
                      {...register('promoCode')}
                      className=""
                    />
                    <button
                      type="button"
                      onClick={handleApplyPromo}
                      disabled={promoLoading}
                      className="h-[42px] grid place-content-center bg-black text-white px-4 py-3 rounded-md hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                      {promoLoading ? 'Applying...' : 'Apply'}
                    </button>
                  </div>
                  {promoError && (
                    <p className="text-red-500 text-xs mt-1">{promoError}</p>
                  )}
                  {promoSuccess && (
                    <p className="text-green-600 text-xs mt-1">
                      {promoSuccess}
                    </p>
                  )}
                </div>

                {/* Terms Checkbox */}
                <div className="flex items-start gap-2">
                  <Input
                    type="checkbox"
                    {...register('agreeToTerms')}
                    className="mt-1 w-4 h-4 accent-black"
                  />
                  <label className="text-sm text-gray-600">
                    I agree to the terms and safety policy
                  </label>
                </div>
                {errors.agreeToTerms && (
                  <p className="text-red-500 text-xs -mt-4">
                    {errors.agreeToTerms.message}
                  </p>
                )}
              </form>
            </div>
          </div>

          {/* Right Side - Summary */}
          <div className="lg:col-span-1">
            <div className="p-6 bg-[#EFEFEF]rounded-lg rounded-[12px] shadow-md">
              <div className="mb-4 flex flex-col gap-2.5">
                <div className="flex justify-between text-sm">
                  <span className="text-[#656565] font-normal text-base leading-5">
                    Experience
                  </span>
                  <span className="text-base text-primary-text leading-5">
                    {selectedExperience.title}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-[#656565] font-normal text-base leading-5">
                    Date
                  </span>
                  <span className="text-sm text-primary-text font-normal leading-5">
                    {selectedDate.slice(0, 10)}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-[#656565] font-normal text-base leading-5">
                    Time
                  </span>
                  <span className="text-sm text-primary-text font-normal leading-5">
                    {selectedSlot.slotTime}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-[#656565] font-normal text-base leading-5">
                    Qty
                  </span>
                  <span className="text-sm text-primary-text font-normal leading-5">
                    {quantity}
                  </span>
                </div>
              </div>
              <div className=" flex flex-col gap-2.5">
                <div className="flex justify-between text-sm">
                  <span className="text-[#656565] font-normal text-base leading-5">
                    Subtotal
                  </span>
                  <span className="text-base text-primary-text font-normal leading-5">
                    ₹{pricing.subtotal}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-[#656565] font-normal text-base leading-5">
                    Taxes
                  </span>
                  <span className="text-sm text-primary-text font-normal leading-5">
                    ₹{pricing.taxes}
                  </span>
                </div>
                {pricing.discount > 0 && (
                  <div className="flex justify-between text-sm text-green-600">
                    <span>Discount</span>
                    <span>-₹{pricing.discount}</span>
                  </div>
                )}
              </div>

              <div className="border-t border-[#D9D9D9] mt-4 pt-4">
                <div className="flex justify-between items-center">
                  <span className="font-medium text-xl text-primary-text leading-6">
                    Total
                  </span>
                  <span className="font-medium text-xl text-primary-text leading-6">
                    ₹{pricing.total}
                  </span>
                </div>
              </div>

              <button
                onClick={handleSubmit(onSubmit)}
                disabled={isSubmitting}
                className="w-full mt-6 bg-yellow-400 hover:bg-yellow-500 text-black font-medium py-3 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2">
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Processing...
                  </>
                ) : (
                  'Pay and Confirm'
                )}
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CheckoutPage;
