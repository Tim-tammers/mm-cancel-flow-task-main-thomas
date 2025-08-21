
import React, { useState } from "react";
import StepWrapper from "../components/stepwrapper"
import ButtonWrapper from "../components/buttonwrapper"
interface Step3Can {
  nextStep: () => void;
  foundJob: boolean | null;
  hasDownsell: boolean;
  acceptDownsell: (value: boolean) => void; 
  onReasonSubmit: (value: string) => void;
}


const JobQuestion: React.FC<Step3Can> = ({ nextStep, foundJob, hasDownsell, acceptDownsell, onReasonSubmit }) => {
const [selectedOption, setSelectedOption] = useState<string | null>(null);
const options = ["Too expensive", "Platform not helpful", "Not enough relevant jobs", "Decided not to move", "Other"];
const [errorMsg, setErrorMsg] = useState("");

const optionMap: Record<string, string> = {
  "Too expensive": "What would be the maximum you would be willing to pay?*",
  "Platform not helpful": "What can we change to make the platform more helpful?*",
  "Not enough relevant jobs": "In which way can we make the jobs more relevant?*",
  "Decided not to move": "What changed for you to decide to not move?*",
  "Other": "What would have helped you the most?*",
};

const [text, setText] = useState("");
const minChars = 25;
const [amount, setAmount] = useState("");

const maxPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Only allow numbers and at most one decimal
    const value = e.target.value;
     if (/^\d*\.?\d{0,2}$/.test(value) || value === "" || value === ".") {
    setAmount(value);
  }
  };


  const handleClick = (option: string) => {
    // if user clicks the same option again, unselect it
    if (selectedOption === option) {
      
      setSelectedOption(null);
      
    } else {
      setSelectedOption(option);
    }
    console.log(selectedOption);
  };
if(foundJob){
  return (
    <StepWrapper>
    <div className="space-y-2.5 pt-8 sm:pt-0">
        <h2 className="text-gray-800 text-2xl">What's one thing you wish we could have helped you with?</h2>
        <p className="text-gray-900 text-xs">We’re always looking to improve, your thoughts can help us make Migrate Mate more useful for others.*</p> 
          {errorMsg && <p className="text-red-600 text-sm mt-1">{errorMsg}</p>}

    <div className="relative w-full">
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              rows={4}
              minLength={minChars}
              className="w-full rounded-lg border border-gray-300 p-3 text-gray-800 
                        focus:outline-none focus:ring-2 focus:ring-blue-400 
                        shadow-sm resize-none"
            />
            <div className="absolute bottom-2 right-3 text-xs text-gray-500">
              Min {minChars} charaters({text.length} / {minChars})
            </div>
          </div>
          <ButtonWrapper>
      <button
          onClick={async () => {
          if(amount.length > 0 || text.length >= 25){
             onReasonSubmit(`${text}${amount}`);
             nextStep();
          }else{
            setErrorMsg("To help us understand your experience, please give some feedback*")
         
          }
        }}
        className={`inline-flex items-center justify-center w-full py-1 border
         border-gray-300 text-gray-700 rounded-lg 
          hover:border-gray-400 transition-all duration-200 shadow-sm group
          ${
            amount.length > 0 || text.length > 25
              ?  "bg-[#996EFF] border text-white"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }     `
          }
         
      >
       Continue
      </button>
      </ButtonWrapper>
    </div>
    </StepWrapper>
  );
} else {
  return (
    <StepWrapper>
 <div className="space-y-2.5 pt-8 sm:pt-0">
  
  <h2 className="text-gray-800 text-2xl">What's the main reason for cancelling?</h2>
  {errorMsg && <p className="text-red-600 text-sm mt-1">{errorMsg}</p>}

   <hr className="border-gray-300 border sm:block" />
  <p className="text-gray-900 text-xs">Please take a minute to let us know why:</p> 
  
    {!selectedOption ? (
     <>
      <div className="space-y-2">
        {options.map((option) => (
          <label
            key={option}
            className="flex items-center space-x-2 cursor-pointer text-gray-900"
          >
            <input
              type="radio"
              name="reason"
              value={option}
              checked={selectedOption === option}
              onChange={() => handleClick(option)}
              className="form-radio accent-[#8952fc]"
            />
            <span>{option}</span>
          </label>
        ))}
      </div>
      </>
):(
  <>
 <label className="flex items-center space-x-2 text-gray-900">
      <input
        type="radio"
        name="reason"
        value={selectedOption}
        checked
        readOnly
        className="form-radio accent-[#8952fc]"
      />
      <span>{selectedOption}</span>
    </label>
    <p className="text-gray-900">{optionMap[selectedOption]}</p>
    {selectedOption && (() => {
    switch (selectedOption) {
      case "Too expensive":
              return( 
             <div className="relative w-full">
              <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2 shadow-sm focus-within:ring-2 focus-within:ring-blue-400">
                <span className="text-gray-500">$</span>
                <input
                  type="text"
                  value={amount}
                  onChange={maxPriceChange}
                  className="ml-1 w-full outline-none text-gray-800"
                />
      </div>
    </div>
      );
      default:
        return( 
            <div className="relative w-full">
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              rows={4}
              minLength={minChars}
              className="w-full rounded-lg border border-gray-300 p-3 text-gray-800 
                        focus:outline-none focus:ring-2 focus:ring-blue-400 
                        shadow-sm resize-none"
            />
            <div className="absolute bottom-2 right-3 text-xs text-gray-500">
              Min {minChars} charaters({text.length} / {minChars})
            </div>
          </div>
      );
    }
  })()}

</>)}
{

  
}

<ButtonWrapper className="space-y-2">
      {hasDownsell &&
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
       Get $10 off | $12.50  <s className="text-xs">$25</s>
      </button>
}
  <button
       onClick={async () => {
          if(amount.length > 0 || text.length >= 25){
             onReasonSubmit(`${selectedOption} - ${text}${amount}`);
          nextStep();
          }else{
            setErrorMsg("To help us understand your experience, please select a reason for cancelling*")
         
          }
        }}
        className={`inline-flex items-center justify-center w-full py-1 border
         border-gray-300 text-gray-700 rounded-lg 
          hover:border-gray-400 transition-all duration-200 shadow-sm group
          ${
            amount.length > 0 || text.length >= 25
              ?  "bg-red-600 hover:bg-red-500 text-white"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }     `
          }
      >
       Continue
      </button>
      </ButtonWrapper>
    </div>
    </StepWrapper>
  );
}
};

export default JobQuestion;