import React, { useState } from "react";
import StepWrapper from "../components/stepwrapper"
import ButtonWrapper from "../components/buttonwrapper"
interface AcceptDownsell {

}


const JobQuestion: React.FC<AcceptDownsell> = ({ }) => {
return(
  <StepWrapper>
  <div className="space-y-[20px]">
   <h2 className=" items-start font-semibold">Great choice, mate!</h2>
   <h2 className=" items-start font-semibold text-xl">You're still on the path to your dream role. <span className="text-[#996EFF]">Let's make it happen together!</span></h2>


{/* need to add logic to handle the actual subscription data to display the proper days instead of xx */}
    <p className="flex flex-col items-start font-semibold">
        <span>You've got XX days left on your current plan.</span>
        <span>Starting from xx date, your monthly payment will be $12.50</span>
      </p>
      <p>You can cancel anytime before then.</p>
            <hr className="border-gray-300 border sm:block hidden" />
            <ButtonWrapper>
       <button
        onClick={() => {
        }}
        className="inline-flex items-center justify-center w-full py-1 bg-[#996EFF] border border-gray-300 text-white rounded-lg hover:border-gray-400 shadow-sm"
      >
        Land your dream role
      </button>
      </ButtonWrapper>
</div>
</StepWrapper>
);


}

export default JobQuestion;