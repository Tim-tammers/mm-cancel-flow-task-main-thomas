import React, { useState } from "react";
import StepWrapper from "../components/stepwrapper"
import ButtonWrapper from "../components/buttonwrapper"
interface Step4Job {
  nextStep: () => void;
  usingMM: boolean | null;
  setVisaInfo: (answers: Record<number, string>) => void; 
}




const JobQuestion: React.FC<Step4Job> = ({setVisaInfo, usingMM, nextStep }) => {
const options = ["Yes", "No"];
const [answers, setAnswers] = useState<Record<number, string>>({});
const [selectedOption, setSelectedOption] = useState<string | null>(null);
const [text, setText] = useState("");
const minChars = 1;
const handlVisaInput = (input: string) => {
    setText(input);
    handleAnswer(6, input);
    console.log(answers);
};
const handleClick = (option: string) => {
 
      setSelectedOption(option);
      handleAnswer(5, option); 
    
  };
const handleAnswer = (questionId: number, option: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: option }));
  };
return(
  <StepWrapper>
  <div className="space-y-2.5 pt-8 sm:pt-0">
   {usingMM ? (
  <>
    <h2 className="items-start font-semibold">
      We helped you land the job, now let’s help you secure your visa.
    </h2>
  </>
) : (
  <>
  <div>
    <h2 className="items-start font-semibold">
     You landed the job! 
    </h2>
    <h2 className="items-start font-semibold italic">
        That’s what we live for.
    </h2>
    </div>
    <p className="font-semibold">     <span>Even if it wasn’t through Migrate Mate, </span>
            <span>let us help get your visa sorted.</span></p>
    
  </>
)}
<p>Is your company providing an immigration lawyer to help with your visa?</p>
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
     {selectedOption && (() => {
    switch (selectedOption) {
      case "Yes":
              return( 
            <p>What visa will you be applying for?*</p>
      );
      default:
        return( 
           <p className="flex flex-col">
            <span>We can connect you with one of our trusted partners. </span>
           <span>Which visa would you like to apply for?*</span>
           </p>
      );
    }
    
  })()}
<input
  type="text"
  value={text}
  onChange={(e) => handlVisaInput(e.target.value)}
  minLength={minChars}
  className="w-full rounded-lg border border-black p-1 text-gray-800 
             focus:outline-none focus:ring-2 focus:ring-blue-400 
             shadow-sm"
/>
</>)}
<ButtonWrapper>
 <button
       onClick={async () => {
         if (setVisaInfo) {
            setVisaInfo(answers);  // 🔥 only send up when continue is clicked
              }
          nextStep();
        }}
        className={`inline-flex items-center justify-center w-full py-1 border
         border-gray-300 text-gray-700 rounded-lg 
          hover:border-gray-400 transition-all duration-200 shadow-sm group
          ${
            text.length >= minChars
              ?  "bg-[#996EFF] border text-white"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }     `
          }
      >
       Complete Cancellation
      </button>
      </ButtonWrapper>
</div>

</StepWrapper>
);


}

export default JobQuestion;