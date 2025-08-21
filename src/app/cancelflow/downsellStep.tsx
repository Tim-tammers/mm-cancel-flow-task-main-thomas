
import React, { useState } from "react";
interface DownsellStep {
  nextStep: () => void;
  acceptDownsell: (value: boolean) => void; 

}


const JobQuestion: React.FC<DownsellStep> = ({ nextStep, acceptDownsell }) => {

        return(
         <div className="space-y-2.5 pt-10 sm:pt-0">
        <div className="flex flex-col space-y-3">
         <h2 className="text-gray-800 text-2xl">We built this to help you land the job, this makes it a little easier.</h2>
         <p className="text-md font-large text-gray-900">We've been there and we're here to help you.</p>
        <div className="bg-[#EBE1FE] p-2 border rounded-lg border-[#8952fc] flex flex-col  items-center space-y-2">
          <h3 className="text-gray-900 text-sm">Here's 50% off until you find a job.</h3>
            <h3 className="text-[#8952fc] text-sm">$12.50/month <s className="text-gray-400 text-xs">$25/month</s></h3>
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
        <button
        onClick={() => {
          nextStep();
        }}
        className={`inline-flex items-center justify-center w-full py-1 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 shadow-sm
            `}
      >
      No thanks
      </button>
        
        </div>

    </div>
    
  );
};

export default JobQuestion;