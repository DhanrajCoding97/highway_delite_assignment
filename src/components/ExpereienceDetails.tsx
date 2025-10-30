import React from 'react';
import { cn } from '../lib/utils';
const ExperienceDetails = () => {
  return (
    <div className="flex flex-col gap-8">
      <figure className="h-[381px]">
        <img
          src="https://images.unsplash.com/photo-1518005020951-eccb494ad742?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=755"
          alt="img"
          height={381}
          width={765}
          className="h-[381px] w-[765px] rounded-[12px]"
        />
      </figure>
      <div className="flex flex-col gap-4">
        <h1 className="text-primary-text text-2xl font-medium leading-8">
          Kayaking
        </h1>
        <p className="text-base font-normal text-[#6C6C6C] leading-6">
          Curated small-group experience. Certified guide. Safety first with
          gear included. Helmet and Life jackets along with an expert will
          accompany in kayaking.
        </p>
      </div>
      <div className="flex flex-col gap-6">
        <div>
          <h2 className="pb-3 text-lg font-medium leading-[22px] text-primary-text">
            Choose Date
          </h2>
          <div className="flex items-center gap-4">
            <span
              className={cn(
                'px-3 py-2 rounded border border-[#BDBDBD] text-[#838383] text-sm font-normal leading-[18px]',
                {}
              )}>
              Oct 22
            </span>
            <span className={cn('px-3 py-2 rounded bg-primary-bg', {})}>
              Oct 23
            </span>
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <h2 className="pb-3 text-lg font-medium leading-[22px] text-primary-text">
            Choose time
          </h2>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5">
              <span
                className={cn(
                  'px-3 py-2 rounded border border-[#BDBDBD] text-[#838383] text-sm font-normal leading-[18px]',
                  {}
                )}>
                Oct 22
              </span>
              <span className="text-[#FF4C0A] font-medium text-[10px] leading-3"></span>
            </div>
          </div>
          <p className="text-xs font-normal leading-4 text-[#838383]">
            All times are in IST (GMT +5:30)
          </p>
        </div>
        <div>
          <h2 className="pb-3 text-lg font-medium leading-[22px] text-primary-text">
            About
          </h2>
          <p className="px-3 py-2 text-xs font-normal text-[#838383] leading-4">
            Scenic routes, trained guides, and safety briefing. Minimum age 10.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ExperienceDetails;
