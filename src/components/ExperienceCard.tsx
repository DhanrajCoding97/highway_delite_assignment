import { Button } from './ui/button';
import { useNavigate } from 'react-router-dom';
import { IExperience } from '../types';

interface ExperienceCardProps {
  experience: IExperience;
}

const ExperienceCard = ({ experience }: ExperienceCardProps) => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col bg-[#F9F9F9] shadow-sm rounded-2xl overflow-hidden h-full transition-transform hover:-translate-y-1 hover:shadow-md duration-200">
      {/* Image */}
      <figure className="relative h-[170px]">
        <img
          src={experience.image}
          alt={experience.title}
          className="w-full h-full object-cover"
        />
      </figure>

      {/* Card Content */}
      <div className="flex flex-col grow px-4 py-3 bg-[#F0F0F0]">
        {/* Title + Location */}
        <div className="flex items-start justify-between gap-2 pb-2">
          <h3 className="font-medium text-base text-primary-text">
            {experience.title}
          </h3>
          <span className="px-2 py-1 bg-[#D6D6D6] text-[11px] font-medium text-primary-text rounded whitespace-nowrap">
            {experience.location}
          </span>
        </div>

        {/* Description (truncate to 2 lines) */}
        <p className="text-xs font-normal text-[#6C6C6C] grow ">
          {experience.description}
        </p>

        {/* Price + Button */}
        <div className="mt-5 flex items-center justify-between">
          <div>
            <span className="text-primary-text font-normal text-xs">From </span>
            <span className="text-xl font-medium leading-6">
              ₹{experience.startingPrice || experience.slots[0]?.price}
            </span>
          </div>

          <Button
            variant="default"
            className="px-2 py-1.5 rounded"
            onClick={() => navigate(`/experience/${experience._id}`)}>
            View Details
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ExperienceCard;
