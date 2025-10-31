var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import axios from 'axios';
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';
const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});
//Experience apis
export const getAllExperiences = () => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield api.get('/experiences');
    return response.data.experiencesWithPrice;
});
export const getExperienceById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield api.get(`/experiences/${id}`);
    return response.data;
});
// Booking APIs
export const createBooking = (bookingData) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield api.post('/bookings', bookingData);
    return response.data.booking;
});
export const getBookingByReference = (reference) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield api.get(`/bookings/${reference}`);
    return response.data.booking;
});
// Promo Code APIs
export const validatePromoCode = (code, subtotal) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield api.post('/promo/validate', { code, subtotal });
    return response.data;
});
export default api;
