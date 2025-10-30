import React from 'react';
import { Button } from './ui/button';

const ExperienceDetailsPriceCard = () => {
  return (
    <div className="p-6 w-full max-w-[387px] flex flex-col gap-6 rounded-3xl bg-[#EFEFEF]">
      <div className="flex flex-col">
        <div className="flex flex-col gap-[17.5px] border-b border-[#C9C9C9]">
          <div className="flex items-center justify-between">
            <span className="font-normal text-base leading-5 text-[#656565]">
              Starts at
            </span>
            <strong className="text-primary-text font-normal text-lg leading-[22px]">
              &#8377;999
            </strong>
          </div>
          <div className="flex items-center justify-between">
            <span className="font-normal text-base leading-5 text-[#656565]">
              Quantity
            </span>
            <div className="flex items-center gap-[9px]">
              <button className="grid place-content-center h-4 w-4 border border-[#C9C9C9] cursor-pointer">
                <img src="/minusIcon.svg" alt="Minus icon" />
              </button>
              <span className="text-primary-text text-xs font-normal leading-3.5">
                1
              </span>
              <button className="grid place-content-center h-4 w-4 border border-[#C9C9C9] cursor-pointer">
                <img src="/plusIcon.svg" alt="Plus icon" />
              </button>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="font-normal text-base leading-5 text-[#656565]">
              SubTotal
            </span>
            <strong className="text-primary-text font-normal text-sm leading-5">
              &#8377;999
            </strong>
          </div>
          <div className="flex items-center justify-between pb-4">
            <span className="font-normal text-base leading-5 text-[#656565]">
              Taxes
            </span>
            <strong className="text-primary-text font-normal text-sm leading-5">
              &#8377;59
            </strong>
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
          Confirm
        </Button>
      </div>
    </div>
  );
};

export default ExperienceDetailsPriceCard;
