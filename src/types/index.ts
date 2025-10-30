export interface ISlot {
  date: Date;
  slotTime: string;
  availableSpots: number;
  totalSpots: number;
  price: number;
  _id?: string;
}

export interface IExperience {
  _id: string;
  title: string;
  description: string;
  location: string;
  duration: string;
  category: string;
  image: string;
  rating: number;
  reviewCount: number;
  highlights: string[];
  included: string[];
  about: string;
  slots: ISlot[];
  currency?: string;
  startingPrice?: number;
}

// Booking Types
export interface IBookingRequest {
  experienceId: string;
  slotDate: string;
  slotTime: string;
  customerName: string;
  customerEmail: string;
  customerPhone?: string;
  numberOfPeople: number;
  promoCode?: string;
}

export interface IBooking {
  bookingReference: string;
  experienceTitle: string;
  slotDate: string;
  slotTime: string;
  numberOfPeople: number;
  subtotal: number;
  taxes: number;
  discount: number;
  totalPrice: number;
  status: 'confirmed' | 'pending' | 'cancelled';
  customerName: string;
  customerEmail: string;
}

// Promo Code Types
export interface IPromoCode {
  code: string;
  discountType: 'percentage' | 'flat';
  discountValue: number;
  discount: number;
  valid: boolean;
  message?: string;
}

// Booking Context Types
export interface BookingContextType {
  selectedExperience: IExperience | null;
  selectedSlot: ISlot | null;
  selectedDate: string | null;
  quantity: number;
  pricing: {
    subtotal: number;
    taxes: number;
    discount: number;
    total: number;
  };
  promoCode: string | null;
  setSelectedExperience: (experience: IExperience) => void;
  setSelectedSlot: (slot: ISlot, date: string) => void;
  setQuantity: (quantity: number) => void;
  applyPromoCode: (code: string, discount: number) => void;
  clearBooking: () => void;
  calculatePricing: () => void;
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}
