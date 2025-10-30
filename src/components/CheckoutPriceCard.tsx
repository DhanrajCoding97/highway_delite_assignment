import React from 'react';
import { Button } from './ui/button';

const ExperienceDetailsPriceCard = () => {
  return (
    <div className="p-6 w-full max-w-[387px] flex flex-col gap-6 rounded-3xl bg-[#EFEFEF]">
      <div className="flex flex-col">
        <div className="flex flex-col gap-[17.5px] border-b border-[#C9C9C9]">
          <div className="flex items-center justify-between">
            <span className="font-normal text-base leading-5 text-[#656565]">
              Experience
            </span>
            <span className="text-primary-text font-normal text-lg leading-[22px]">
              Kayaking
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="font-normal text-base leading-5 text-[#656565]">
              Date
            </span>
            <span className="text-primary-text text-xs font-normal leading-5">
              2025-10-22
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="font-normal text-base leading-5 text-[#656565]">
              Time
            </span>
            <span className="text-primary-text text-xs font-normal leading-5">
              9:00 AM
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="font-normal text-base leading-5 text-[#656565]">
              Qty
            </span>
            <span className="text-primary-text text-sm font-normal leading-5">
              1
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="font-normal text-base leading-5 text-[#656565]">
              SubTotal
            </span>
            <span className="text-primary-text font-normal text-sm leading-5">
              &#8377;999
            </span>
          </div>
          <div className="flex items-center justify-between pb-4">
            <span className="font-normal text-base leading-5 text-[#656565]">
              Taxes
            </span>
            <span className="text-primary-text font-normal text-sm leading-5">
              &#8377;59
            </span>
          </div>
        </div>
        <div className="flex items-center justify-between pt-4">
          <span className="text-primary-text text-xl font-medium leading-6">
            Total
          </span>
          <strong className="text-primary-text font-medium text-xl leading-6">
            &#8377;999
          </strong>
        </div>
        <Button className="mt-6 cursor-pointer" variant="default">
          Pay and Confirm
        </Button>
      </div>
    </div>
  );
};

export default ExperienceDetailsPriceCard;
