//experience price card
import { Button } from './ui/button';

interface ExperienceDetailsPriceCardProps {
  startingPrice: number;
  quantity: number;
  subtotal: number;
  taxes: number;
  total: number;
  maxQuantity: number;
  onQuantityChange: (delta: number) => void;
  onConfirm: () => void;
  isConfirmDisabled?: boolean;
}

const ExperienceDetailsPriceCard = ({
  startingPrice,
  quantity,
  subtotal,
  taxes,
  total,
  maxQuantity,
  onQuantityChange,
  onConfirm,
  isConfirmDisabled = false
}: ExperienceDetailsPriceCardProps) => {
  return (
    <div className="p-6 w-full flex flex-col gap-6 rounded-3xl bg-[#EFEFEF] shadow-sm">
      <div className="flex flex-col">
        <div className="flex flex-col gap-[17.5px] border-b border-[#C9C9C9]">
          {/* Starting price */}
          <div className="flex items-center justify-between">
            <span className="font-normal text-base leading-5 text-[#656565]">
              Starts at
            </span>
            <strong className="text-primary-text font-normal text-lg leading-[22px]">
              &#8377;{startingPrice}
            </strong>
          </div>
          {/* Quantity */}
          <div className="flex items-center justify-between">
            <span className="font-normal text-base leading-5 text-[#656565]">
              Quantity
            </span>
            <div className="flex items-center gap-[9px]">
              <button
                onClick={() => onQuantityChange(-1)}
                disabled={quantity <= 1}
                className="grid place-content-center h-4 w-4 border border-[#C9C9C9] cursor-pointer">
                <img src="/minusIcon.svg" alt="Minus icon" />
              </button>
              <span className="text-primary-text text-xs font-normal leading-3.5">
                {quantity}
              </span>
              <button
                onClick={() => onQuantityChange(1)}
                disabled={quantity >= maxQuantity}
                className="grid place-content-center h-4 w-4 border border-[#C9C9C9] cursor-pointer">
                <img src="/plusIcon.svg" alt="Plus icon" />
              </button>
            </div>
          </div>
          {/* Subtotal */}
          <div className="flex items-center justify-between">
            <span className="font-normal text-base leading-5 text-[#656565]">
              SubTotal
            </span>
            <strong className="text-primary-text font-normal text-sm leading-5">
              &#8377;{subtotal}
            </strong>
          </div>
          {/* Taxes */}
          <div className="flex items-center justify-between pb-4">
            <span className="font-normal text-base leading-5 text-[#656565]">
              Taxes
            </span>
            <strong className="text-primary-text font-normal text-sm leading-5">
              &#8377;{taxes}
            </strong>
          </div>
        </div>
        <div className="flex items-center justify-between pt-4">
          <span className="text-primary-text text-xl font-medium leading-6">
            Total
          </span>
          <strong className="text-primary-text font-medium text-xl leading-6">
            &#8377;{total}
          </strong>
        </div>
        <Button
          onClick={onConfirm}
          disabled={isConfirmDisabled}
          className="mt-6 text-base font-medium cursor-pointer w-full bg-[#FFD643] hover:bg-[#FFD643]/80 text-primary-text disabled:opacity-50 disabled:cursor-not-allowed"
          variant="default">
          Confirm
        </Button>
      </div>
    </div>
  );
};

export default ExperienceDetailsPriceCard;
