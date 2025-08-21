
import React, { useState } from "react";
import StepWrapper from "../components/stepwrapper"
import ButtonWrapper from "../components/buttonwrapper"
interface DownsellStep {
  nextStep: () => void;
  acceptDownsell: (value: boolean) => void; 
  currentPrice: number;
}


const JobQuestion: React.FC<DownsellStep> = ({ nextStep, acceptDownsell, currentPrice }) => {
   const formattedPrice = ((currentPrice - 1000) / 100).toFixed(2);
   const noDecimal = (currentPrice/100);
        return(
          <StepWrapper>
         <div className="space-y-2.5 pt-10 sm:pt-0">
        <div className="flex flex-col space-y-3">
         <h2 className="text-gray-800 text-2xl">We built this to help you land the job, this makes it a little easier.</h2>
         <p className="text-md font-large text-gray-900">We've been there and we're here to help you.</p>
        <div className="bg-[#EBE1FE] p-2 border rounded-lg border-[#8952fc] flex flex-col  items-start sm:items-center space-y-2">
          <h2 className="text-gray-900 font-semibold text-xl">Here's <span className="underline">$10 off</span> until you find a job.</h2>
            <h3 className="text-[#8952fc] text-base font-semibold">  ${formattedPrice} <s className="text-gray-400 text-xs">${noDecimal}/month</s></h3>
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
       Get $10 off
      </button>
            <p className="text-xs font-large text-gray-400">You wont be charged until your next billing date</p>
        </div>

        <ButtonWrapper>
        <button
        onClick={() => {
          nextStep();
        }}
        className={`inline-flex items-center justify-center w-full py-1 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 shadow-sm
            `}
      >
      No thanks
      </button>
        </ButtonWrapper>
        </div>

    </div>
    </StepWrapper>
  );
};

export default JobQuestion;