
import React, { useState } from "react";
interface Step3Job {
  nextStep: () => void;
}
interface Question {
  id: number;
  text: string;
  options: string[];
}


const JobQuestion: React.FC<Step3Job> = ({ nextStep }) => {

  return (
    <div className="space-y-2.5">
      <h2 className="text-gray-800 text-2xl">Congrats on the new role! 🎉</h2>
     

      <button
        onClick={() => {
          nextStep();
        }}
        className={`inline-flex items-center 
        justify-center w-full px-4  border
         border-gray-300 text-gray-700 rounded-lg 
          hover:border-gray-400 transition-all duration-200 shadow-sm group
           `}
      >
       Continue
      </button>
    </div>
  );
};

export default JobQuestion;