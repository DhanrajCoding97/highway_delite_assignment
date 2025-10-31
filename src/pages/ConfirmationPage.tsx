import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';
import { getBookingByReference } from '../services/api';
import { IBooking } from '../types';
import { useBooking } from '../context/BookingContext';
import Navbar from '../components/Navbar';

const ConfirmationPage = () => {
  const { bookingRef } = useParams<{ bookingRef: string }>();
  const navigate = useNavigate();
  const { clearBooking } = useBooking();

  const [booking, setBooking] = useState<IBooking | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (bookingRef) {
      fetchBooking();
    }
    // Clear booking context when confirmation page loads
    return () => {
      clearBooking();
    };
  }, [bookingRef]);

  const fetchBooking = async () => {
    try {
      setLoading(true);
      const data = await getBookingByReference(bookingRef!);
      setBooking(data);
    } catch (error) {
      console.error('Error fetching booking:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleBackToHome = () => {
    clearBooking();
    navigate('/');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar value="" onChange={() => {}} onSearch={() => {}} />
        <div className="flex items-center justify-center h-96">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-400"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar value="" onChange={() => {}} onSearch={() => {}} />

      <main className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white rounded-lg shadow-sm p-8 text-center">
          {/* Success Icon */}
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle className="w-12 h-12 text-green-600" />
            </div>
          </div>

          {/* Heading */}
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Booking Confirmed
          </h1>

          {/* Booking Reference */}
          <p className="text-gray-600 mb-8">
            Ref ID:{' '}
            <span className="font-mono font-semibold">{bookingRef}</span>
          </p>

          {/* Booking Details */}
          {booking && (
            <div className="bg-gray-50 rounded-lg p-6 mb-8 text-left">
              <h3 className="font-semibold text-lg mb-4">Booking Details</h3>

              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Experience</span>
                  <span className="font-medium">{booking.experienceTitle}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-600">Date</span>
                  <span className="font-medium">
                    {new Date(booking.slotDate).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-600">Time</span>
                  <span className="font-medium">{booking.slotTime}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-600">Number of People</span>
                  <span className="font-medium">{booking.numberOfPeople}</span>
                </div>

                <div className="border-t border-gray-300 pt-3 mt-3">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-600">Subtotal</span>
                    <span>₹{booking.subtotal}</span>
                  </div>

                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-600">Taxes</span>
                    <span>₹{booking.taxes}</span>
                  </div>

                  {booking.discount > 0 && (
                    <div className="flex justify-between text-sm text-green-600 mb-2">
                      <span>Discount</span>
                      <span>-₹{booking.discount}</span>
                    </div>
                  )}

                  <div className="flex justify-between font-semibold text-lg pt-2 border-t border-gray-300">
                    <span>Total Paid</span>
                    <span>₹{booking.totalPrice}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Customer Info */}
          {/* {booking && (
            <div className="bg-blue-50 rounded-lg p-4 mb-8 text-sm text-left">
              <p className="text-gray-700">
                A confirmation email has been sent to{' '}
                <span className="font-semibold">{booking.customerEmail}</span>
              </p>
            </div>
          )} */}

          {/* Back to Home Button */}
          <button
            onClick={handleBackToHome}
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium px-8 py-3 rounded-md transition-colors">
            Back to Home
          </button>
        </div>
      </main>
    </div>
  );
};

export default ConfirmationPage;
