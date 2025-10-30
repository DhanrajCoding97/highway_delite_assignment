import axios from 'axios';
import {
  IExperience,
  IBooking,
  IBookingRequest,
  IPromoCode
} from '@/types/index.js';

const API_BASE_URL =
  (import.meta as any).env.VITE_API_BASE_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

//Experience apis
export const getAllExperiences = async (): Promise<IExperience[]> => {
  const response = await api.get('/experiences');
  return response.data.experiencesWithPrice;
};

export const getExperienceById = async (id: string): Promise<IExperience> => {
  const response = await api.get(`/experiences/${id}`);
  return response.data;
};

// Booking APIs
export const createBooking = async (
  bookingData: IBookingRequest
): Promise<IBooking> => {
  const response = await api.post('/bookings', bookingData);
  return response.data.booking;
};

export const getBookingByReference = async (
  reference: string
): Promise<IBooking> => {
  const response = await api.get(`/bookings/${reference}`);
  return response.data.booking;
};

// Promo Code APIs
export const validatePromoCode = async (
  code: string,
  subtotal: number
): Promise<IPromoCode> => {
  const response = await api.post('/promo/validate', { code, subtotal });
  return response.data;
};

export default api;
