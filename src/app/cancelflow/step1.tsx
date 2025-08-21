import React from "react";
import { Cancellation } from "@/lib/cancellation_model";
import { truncate } from "fs/promises";
interface StepOneProps {
  nextStep: () => void;
  setJobFound: (value: boolean) => void; 
  nextStepNJ:  () => void;
}

const JobQuestion: React.FC<StepOneProps> = ({ nextStep,  setJobFound, nextStepNJ }) => {
  return (
    <div className="space-y-[20px]">
      <h2 className="flex flex-col items-start font-semibold">
        <span>Hey mate,</span>
        <span>Quick one before you go</span>
      </h2>
      <h2 className="italic font-semibold">Have you found a job yet?</h2>
      <p className="">
        Whatever your answer, we just want to help you take the next step. With visa support, or by hearing how we can do better.
      </p>
       <hr className="border-gray-300 border" />
      <button
        onClick={() => {
          setJobFound(true);
          nextStep();
        }}
        className="inline-flex items-center justify-center w-full py-1 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-green-50 hover:border-gray-400 shadow-sm"
      >
        Yes, I've found a job
      </button>

      <button
        onClick={() => {
          setJobFound(false);
          nextStepNJ();
        }}
        className="inline-flex items-center justify-center w-full py-1 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-[#EBE1FE] hover:border-gray-400 shadow-sm"
      >
        Not yet - I'm still looking
      </button>
    </div>
  );
};

export default JobQuestion;