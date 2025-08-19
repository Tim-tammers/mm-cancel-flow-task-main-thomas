
import React, { useState } from "react";
interface Step2Job {
  nextStep: () => void;
}
interface Question {
  id: number;
  text: string;
  options: string[];
}
const questions: Question[] = [
  { id: 1, text: "Did you find this job with MigrateMate?*",   options: ["Yes", "No"],},
  { id: 2, text: "How many roles did you apply for through MigrateMate?*",   options: ["0", "1-5", "6-20", "20+"],},
  { id: 3, text: "How many companies did you email directly?*", options: ["0", "1-5", "6-20", "20+"], },
  { id: 4, text: "How many different companies did interview with?*", options: ["0", "1-2", "3-5", "5+"],},
];


const JobQuestion: React.FC<Step2Job> = ({ nextStep }) => {
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const handleAnswer = (questionId: number, option: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: option }));
  };
const allAnswered = questions.every((q) => answers[q.id]);
  return (
    <div className="space-y-2.5">
      <h2 className="text-gray-800 text-2xl">Congrats on the new role! 🎉</h2>
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
                      ? "bg-blue-50 border-blue-400 text-blue-700"
                      : " bg-gray-100 border-gray-300 text-gray-700 hover:bg-gray-50"
                  }`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>

      <button
        disabled={!allAnswered}
        onClick={() => {
          nextStep();
        }}
        className={`inline-flex items-center 
        justify-center w-full px-4  border
         border-gray-300 text-gray-700 rounded-lg 
          hover:border-gray-400 transition-all duration-200 shadow-sm group
            ${
              allAnswered
                ? "bg-white hover:bg-green-50"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
      >
       Continue
      </button>
    </div>
  );
};

export default JobQuestion;