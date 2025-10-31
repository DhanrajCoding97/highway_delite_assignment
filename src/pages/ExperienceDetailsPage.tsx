import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { getExperienceById } from '../services/api';
import { IExperience, ISlot } from '../types';
import { useBooking } from '../context/BookingContext';
import Navbar from '../components/Navbar';
import ExperienceDetails from '../components/ExperienceDetails';
import ExperienceDetailsPriceCard from '../components/ExperienceDetailsPriceCard';

const ExperienceDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { setSelectedExperience, setSelectedSlot, quantity, setQuantity } =
    useBooking();

  const [experience, setExperience] = useState<IExperience | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [availableSlots, setAvailableSlots] = useState<ISlot[]>([]);
  const [availableDates, setAvailableDates] = useState<string[]>([]);

  useEffect(() => {
    if (id) {
      fetchExperience();
    }
  }, [id]);

  useEffect(() => {
    if (experience && experience.slots.length > 0) {
      // Extract unique dates
      const dates = Array.from(
        new Set(
          experience.slots.map(
            (slot) => new Date(slot.date).toISOString().split('T')[0]
          )
        )
      ).sort();
      setAvailableDates(dates);

      // Auto-select first date
      if (dates.length > 0 && !selectedDate) {
        setSelectedDate(dates[0]);
      }
    }
  }, [experience]);
  useEffect(() => {
    if (experience && selectedDate) {
      // Filter slots for selected date - include sold out slots
      const slots = experience.slots.filter(
        (slot) =>
          new Date(slot.date).toISOString().split('T')[0] === selectedDate
      );
      setAvailableSlots(slots);
    }
  }, [selectedDate, experience]);
  // useEffect(() => {
  //   if (experience && selectedDate) {
  //     // Filter slots for selected date
  //     const slots = experience.slots.filter(
  //       (slot) =>
  //         new Date(slot.date).toISOString().split('T')[0] === selectedDate &&
  //         slot.availableSpots > 0
  //     );
  //     setAvailableSlots(slots);

  //     // Auto-select first available time
  //     if (slots.length > 0 && !selectedTime) {
  //       setSelectedTime(slots[0].slotTime);
  //     }
  //   }
  // }, [selectedDate, experience]);

  const fetchExperience = async () => {
    try {
      setLoading(true);
      const data = await getExperienceById(id!);
      setExperience(data);
      setSelectedExperience(data);
    } catch (error) {
      console.error('Error fetching experience', error);
      navigate('/');
    } finally {
      setLoading(false);
    }
  };

  const handleDateSelect = (date: string) => {
    if (date !== selectedDate) {
      setSelectedTime(''); // Only reset if date changed
    }
    setSelectedDate(date);
  };

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);

    // Adjust quantity if it exceeds available spots
    const selectedSlotData = availableSlots.find((s) => s.slotTime === time);
    if (selectedSlotData && quantity > selectedSlotData.availableSpots) {
      setQuantity(selectedSlotData.availableSpots); // or setQuantity(1) to reset to 1
    }
  };

  const handleQuantityChange = (delta: number) => {
    const newQuantity = quantity + delta;
    const selectedSlotData = availableSlots.find(
      (s) => s.slotTime === selectedTime
    );

    if (
      newQuantity >= 1 &&
      selectedSlotData &&
      newQuantity <= selectedSlotData.availableSpots
    ) {
      setQuantity(newQuantity);
    }
  };

  const handleConfirm = () => {
    const selectedSlotData = availableSlots.find(
      (s) => s.slotTime === selectedTime
    );

    if (!selectedSlotData) {
      alert('Please select a time slot');
      return;
    }

    if (quantity > selectedSlotData.availableSpots) {
      alert(`Only ${selectedSlotData.availableSpots} spots are available`);
      return;
    }

    setSelectedSlot(selectedSlotData, selectedDate);
    navigate('/checkout');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-[#F9F9F9]">
        <Navbar value="" onChange={() => {}} onSearch={() => {}} />
        <div className="flex items-center justify-center flex-1">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-400 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading experience...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!experience) {
    return null;
  }

  const selectedSlotData = availableSlots.find(
    (s) => s.slotTime === selectedTime
  );
  const subtotal = selectedSlotData ? selectedSlotData.price * quantity : 0;
  const taxes = Math.round(subtotal * 0.18);
  const total = subtotal + taxes;
  const startingPrice =
    selectedSlotData?.price || experience.slots[0]?.price || 0;
  const maxQuantity = selectedSlotData?.availableSpots || 1;

  return (
    <div className="min-h-screen bg-[#F9F9F9]">
      <Navbar value="" onChange={() => {}} onSearch={() => {}} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors">
          <ArrowLeft className="w-5 h-5" />
          <span className="font-medium">Details</span>
        </button>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Side - Experience Details */}
          <div className="lg:col-span-2">
            <ExperienceDetails
              experience={experience}
              availableDates={availableDates}
              selectedDate={selectedDate}
              availableSlots={availableSlots}
              selectedTime={selectedTime}
              onDateSelect={handleDateSelect}
              onTimeSelect={handleTimeSelect}
            />
          </div>

          {/* Right Side - Price Card */}
          <div className="lg:col-span-1">
            <ExperienceDetailsPriceCard
              startingPrice={startingPrice}
              quantity={quantity}
              subtotal={subtotal}
              taxes={taxes}
              total={total}
              maxQuantity={maxQuantity}
              onQuantityChange={handleQuantityChange}
              onConfirm={handleConfirm}
              isConfirmDisabled={!selectedTime}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default ExperienceDetailsPage;
