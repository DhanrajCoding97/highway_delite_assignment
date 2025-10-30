import { Button } from './ui/button';

const ExperienceCard = () => {
  return (
    <div className="bg-blue-500 w-full max-w-[280px] flex flex-col gap-3 rounded-tl-2xl rounded-tr-2xl">
      <figure className="h-[170px] w-[280px]">
        <img src="/" alt="kayaking img" />
      </figure>
      <div className="bg-[#F0F0F0]">
        <div className="px-4 pt-3.5 ">
          <div className="flex items-center justify-between ">
            <h2 className="font-medium text-base text-primary-text ">
              Kayaking
            </h2>
            <span className="px-2 py-1 bg-[#D6D6D6] text-xs font-normal text-secondary-text rounded">
              Udupi
            </span>
          </div>
          <p className="pt-3 text-xs font-normal text-secondary-text">
            Curated small-group experience. Certified guide. Safety first with
            gear included.{' '}
          </p>
        </div>
        <div className="pt-5 pb-3 px-4 flex items-center justify-between">
          <span className="text-primary-text font-normal text-xs">
            From{' '}
            <strong className="font-medium text-xl leading-24]">
              &#8377;999
            </strong>
          </span>
          <Button variant="default">View Details</Button>
        </div>
      </div>
    </div>
    // <div className="grid grid-cols-4 gap-6">
    // </div>
  );
};

export default ExperienceCard;
