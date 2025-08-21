import React, { useState } from "react";
interface Step4Can {

}


const JobQuestion: React.FC<Step4Can> = ({ }) => {
return(
  <div className="space-y-[20px]">
   <h2 className=" items-start font-semibold">Sorry to see you go, mate.</h2>
   <h2 className=" items-start font-semibold text-xl">Thanks for being with us, and you're always welcome back.</h2>

    <p className="flex flex-col items-start font-semibold">
        <span>Your subscription is set to end on XX date.</span>
        <span>You'll still have full access until then. No further charges after that.</span>
      </p>
      <p>Change you mind? You can reactivate anytiime before your end date.</p>
            <hr className="border-gray-300 border" />
       <button
        onClick={() => {
        }}
        className="inline-flex items-center justify-center w-full py-1 bg-[#996EFF] border border-gray-300 text-white rounded-lg hover:border-gray-400 shadow-sm"
      >
        Back to Jobs
      </button>
</div>
);


}

export default JobQuestion;