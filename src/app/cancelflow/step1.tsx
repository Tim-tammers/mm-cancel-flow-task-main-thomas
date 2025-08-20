import React from "react";
import { Cancellation } from "@/lib/cancellation_model";
import { truncate } from "fs/promises";
interface StepOneProps {
  nextStep: () => void;
  setJobFound: (value: boolean) => void; 
}

const JobQuestion: React.FC<StepOneProps> = ({ nextStep,  setJobFound }) => {
  return (
    <div className="space-y-2.5">
      <h2 className="text-gray-800">Hey mate, Quick one before you go.</h2>
      <h2 className="text-gray-800">Have you found a job yet?</h2>
      <p className="text-gray-800 border-b border-gray-300">
        Whatever your answer, we just want to help you take the next step. With visa support, or by hearing how we can do better.
      </p>

      <button
        onClick={() => {
          setJobFound(true);
          nextStep();
        }}
        className="inline-flex items-center justify-center w-full px-4 py-3 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-green-50 hover:border-gray-400 transition-all duration-200 shadow-sm group"
      >
        Yes, I've found a job
      </button>

      <button
        onClick={() => {
          setJobFound(false);
          nextStep();
        }}
        className="inline-flex items-center justify-center w-full px-4 py-3 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-[#EBE1FE] hover:border-gray-400 transition-all duration-200 shadow-sm group"
      >
        Not yet - I'm still looking
      </button>
    </div>
  );
};

export default JobQuestion;