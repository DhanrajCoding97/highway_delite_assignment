import React, { createContext, useContext, useState, useEffect } from 'react';
import { IExperience, ISlot, BookingContextType } from '../types';

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export const BookingProvider: React.FC<{ children: React.ReactNode }> = ({
  children
}) => {
  const [selectedExperience, setSelectedExperience] =
    useState<IExperience | null>(null);
  const [selectedSlot, setSelectedSlotState] = useState<ISlot | null>(null);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [quantity, setQuantity] = useState<number>(1);
  const [promoCode, setPromoCode] = useState<string | null>(null);
  const [pricing, setPricing] = useState({
    subtotal: 0,
    taxes: 0,
    discount: 0,
    total: 0
  });

  // Calculate pricing whenever quantity, slot, or discount changes
  const calculatePricing = () => {
    if (!selectedSlot) {
      setPricing({ subtotal: 0, taxes: 0, discount: 0, total: 0 });
      return;
    }

    const subtotal = selectedSlot.price * quantity;
    const taxes = Math.round(subtotal * 0.18); // 18% GST
    const total = subtotal + taxes - pricing.discount;

    setPricing({
      subtotal,
      taxes,
      discount: pricing.discount,
      total
    });
  };

  useEffect(() => {
    calculatePricing();
  }, [quantity, selectedSlot, pricing.discount]);

  const setSelectedSlot = (slot: ISlot, date: string) => {
    setSelectedSlotState(slot);
    setSelectedDate(date);
  };

  const applyPromoCode = (code: string, discount: number) => {
    setPromoCode(code);
    setPricing((prev) => ({
      ...prev,
      discount,
      total: prev.subtotal + prev.taxes - discount
    }));
  };

  const clearBooking = () => {
    setSelectedExperience(null);
    setSelectedSlotState(null);
    setSelectedDate(null);
    setQuantity(1);
    setPromoCode(null);
    setPricing({ subtotal: 0, taxes: 0, discount: 0, total: 0 });
  };

  return (
    <BookingContext.Provider
      value={{
        selectedExperience,
        selectedSlot,
        selectedDate,
        quantity,
        pricing,
        promoCode,
        setSelectedExperience,
        setSelectedSlot,
        setQuantity,
        applyPromoCode,
        clearBooking,
        calculatePricing
      }}>
      {children}
    </BookingContext.Provider>
  );
};

export const useBooking = () => {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error('useBooking must be used within BookingProvider');
  }
  return context;
};
