//experience details view component
import { cn } from '../lib/utils';
import { IExperience, ISlot } from '../types';
import { Button } from './ui/button';
interface ExperienceDetailsProps {
  experience: IExperience;
  availableDates: string[];
  selectedDate: string;
  availableSlots: ISlot[];
  selectedTime: string;
  onDateSelect: (date: string) => void;
  onTimeSelect: (time: string) => void;
}
const ExperienceDetails = ({
  experience,
  availableDates,
  selectedDate,
  availableSlots,
  selectedTime,
  onDateSelect,
  onTimeSelect
}: ExperienceDetailsProps) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const month = date.toLocaleString('en-US', { month: 'short' });
    const day = date.getDate();
    return { month, day };
  };

  return (
    <div className="flex flex-col gap-8">
      <figure className="h-[381px]">
        <img
          src={experience.image}
          alt={experience.title}
          height={381}
          width={765}
          className="h-[381px] w-[765px] rounded-[12px]"
        />
      </figure>
      <div className="flex flex-col gap-4">
        <h1 className="text-primary-text text-2xl font-medium leading-8">
          {experience.title}
        </h1>
        <p className="text-base font-normal text-[#6C6C6C] leading-6">
          {experience.description}
        </p>
      </div>
      <div className="flex flex-col gap-6">
        <div>
          <h2 className="pb-3 text-lg font-medium leading-[22px] text-primary-text">
            Choose Date
          </h2>
          <div className="flex items-center gap-4">
            {availableDates.map((date) => {
              const { month, day } = formatDate(date);
              return (
                <button
                  key={date}
                  onClick={() => onDateSelect(date)}
                  className={cn(
                    'flex items-center px-4 py-2 gap-1 rounded border border-[#BDBDBD] text-[#838383] text-sm font-normal leading-[18px] min-w-[70px] transition-colors',
                    {
                      'text-primary-text bg-[#FFD643] border-[#FFD643]':
                        selectedDate === date
                    }
                  )}>
                  <span className="text-xs font-normal leading-[18px]">
                    {month}
                  </span>
                  <span className="text-xs font-normal leading-[18px]">
                    {day}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <h2 className="pb-3 text-lg font-medium leading-[22px] text-primary-text">
            Choose time
          </h2>
          <div className="flex items-center gap-4">
            {availableSlots.map((slot) => {
              const isSoldOut = slot.availableSpots === 0;
              const isSelected = selectedTime === slot.slotTime;

              return (
                <Button
                  key={slot.slotTime}
                  onClick={() => !isSoldOut && onTimeSelect(slot.slotTime)}
                  disabled={isSoldOut}
                  className={cn(
                    'flex items-center gap-1.5 px-3 py-2 border border-[#BDBDBD] bg-white text-[#838383] text-sm font-normal leading-[18px] rounded',
                    {
                      'text-primary-text bg-[#FFD643] border-0': isSelected,
                      'text-[#838383] bg-[#CCCCCC] border-0': isSoldOut
                    }
                  )}>
                  <span>{slot.slotTime}</span>
                  {isSoldOut ? (
                    <span className="text-[10px] text-[#6A6A6A] font-medium leading-3">
                      sold out
                    </span>
                  ) : (
                    <span className="text-[10px] text-[#FF4C0A] leading-3 font-medium">
                      {`${slot.availableSpots} left`}
                    </span>
                  )}
                </Button>
              );
            })}
          </div>
          <p className="text-xs font-normal leading-4 text-[#838383]">
            All times are in IST (GMT +5:30)
          </p>
        </div>

        <div>
          <h2 className="pb-3 text-lg font-medium leading-[22px] text-primary-text">
            About
          </h2>
          <p className="px-3 py-2 text-xs font-normal text-[#838383] bg-[#EEEEEE] rounded leading-4">
            Scenic routes, trained guides, and safety briefing. Minimum age 10.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ExperienceDetails;
