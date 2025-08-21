
import React, { useState } from "react";
import StepWrapper from "../components/stepwrapper"
import ButtonWrapper from "../components/buttonwrapper"
interface Step2Can {
  nextStep: () => void;
  foundJob: boolean | null;
  hasDownsell: boolean;
  onAnswersSubmit?: (answers: Record<number, string>) => void; 
  acceptDownsell: (value: boolean) => void; 

}
interface Question {
  id: number;
  text: string;
  options: string[];
}


const JobQuestion: React.FC<Step2Can> = ({ nextStep, foundJob, hasDownsell, onAnswersSubmit, acceptDownsell }) => {
  const questions: Question[] = [
  ...(foundJob ? [{ id: 1, text: "Did you find this job with MigrateMate?*", options: ["Yes", "No"] }] : []),
  { id: 2, text: "How many roles did you apply for through MigrateMate?*",   options: ["0", "1-5", "6-20", "20+"],},
  { id: 3, text: "How many companies did you email directly?*", options: ["0", "1-5", "6-20", "20+"], },
  { id: 4, text: "How many different companies did interview with?*", options: ["0", "1-2", "3-5", "5+"],},
];




  const [answers, setAnswers] = useState<Record<number, string>>({});
  const handleAnswer = (questionId: number, option: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: option }));
  };
  const allAnswered = questions.every((q) => answers[q.id]);
     
      return (
        <StepWrapper>
    <div className="space-y-2.5 pt-8 sm:pt-0">
      {foundJob ?
      (<h2 className="text-gray-800 text-2xl">Congrats on the new role! 🎉</h2>):
      (<h2 className="text-gray-800 text-2xl">Help us understand how you were using Migrate Mate.</h2>)
      }

      
     <div className=" w-full space-y-4">
      {questions.map((q) => (
        <div key={q.id} className="space-y-3 ">
          <p className="text-sm text-gray-800">{q.text}</p>
          <div className="flex space-x-1">
            {q.options.map((option, idx) => (
              <button
                key={idx}
                onClick={() => handleAnswer(q.id, option)}
                className={`w-full border rounded-lg transition
                  ${
                    answers[q.id] === option
                      ? " bg-[#8952fc] text-white rounded-lg hover:bg-[#7b40fc] transition-color"
                      : " bg-gray-100 border-gray-300 text-gray-700 hover:bg-[#8952fc] hover:text-white"
                  }`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
    <ButtonWrapper className="space-y-2">
{hasDownsell && !foundJob &&


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
       Get 50% off | $12.50  <s className="text-xs">$25</s>
      </button>
}
      <button
        disabled={!allAnswered}
        onClick={() => {
            if (onAnswersSubmit) {
            onAnswersSubmit(answers);  // 🔥 only send up when continue is clicked
              }
            nextStep();
        }}
        className={`inline-flex items-center justify-center w-full py-1 border
         border-gray-300 text-gray-700 rounded-lg 
          hover:border-gray-400 transition-all duration-200 shadow-sm group
          ${
            allAnswered
              ? !foundJob
                ? "bg-red-600 hover:bg-red-500 text-white"
                : "bg-[#996EFF] border text-white"
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
  
};

export default JobQuestion;