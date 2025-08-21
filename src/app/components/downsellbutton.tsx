
interface DownsellButtonProps {
 acceptDownsell: (value: boolean) => void;
 currentPrice: number

}

const DownsellButton: React.FC<DownsellButtonProps> = ({acceptDownsell, currentPrice}) => {
     const formattedPriceDiscount = ((currentPrice - 1000) / 100).toFixed(2);
     const priceNoDecimal = (currentPrice/100);
  return (
 <button
        onClick={() => {
          acceptDownsell(true);
        }}
        className={`inline-flex items-center justify-center w-full py-1 border
         border-gray-300 text-white-700 rounded-lg 
          hover:border-gray-400 transition-all duration-200 shadow-sm group
          bg-green-600 hover:bg-green-800 
            `}
      >
       Get $10 off | ${formattedPriceDiscount}  <s className="text-xs pt-0.5 px-1">${priceNoDecimal}</s>
      </button>
  );
};

export default DownsellButton;