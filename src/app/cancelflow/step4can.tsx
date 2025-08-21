import React, { useState } from "react";
import profPic from '../../assets/mihailo-profile.jpeg';
interface Step4Can {
  foundJob: boolean | null;
  visaHelp: boolean;
}


const JobQuestion: React.FC<Step4Can> = ({foundJob, visaHelp}) => {


if(!foundJob) {
return(
      <div className="flex flex-col h-full">
  <div className="space-y-[20px]">
   <h2 className=" items-start font-semibold">Sorry to see you go, mate.</h2>
   <h2 className=" items-start font-semibold text-xl">Thanks for being with us, and you're always welcome back.</h2>

    <p className="flex flex-col items-start font-semibold">
        <span>Your subscription is set to end on XX date.</span>
        <span>You'll still have full access until then. No further charges after that.</span>
      </p>
      <p>Change you mind? You can reactivate anytiime before your end date.</p>
            <hr className="border-gray-300 border hidden sm:block" />
      
        <div className="pt-4 px-4 shadow-[0_-5px_10px_rgba(0,0,0,0.1)] sm:shadow-none -mx-4 mt-4 sm:m-0 sm:px-0 sm:pt-0">
   <button
        onClick={() => {
        }}
        className=" px-4 inline-flex items-center justify-center w-full py-2 bg-[#996EFF] border border-gray-300 text-white rounded-lg hover:border-gray-400 shadow-sm"
      >
        Back to Jobs
      </button>
  </div>

</div>
</div>
);
}else{
 return (
 
    <div className="flex flex-col h-full">
  <div className="space-y-[20px] flex-1 overflow-y-auto">
    {!visaHelp ? (
      <>
        <h2 className="items-start font-semibold text-base sm:text-2xl">
          All done, your cancellation's been processed
        </h2>
        <p>
          We’re stoked to hear you’ve landed a job and sorted your visa. Big
          congrats from the team. 🙌
        </p>
        <hr className="border-gray-300 border hidden sm:block" />
      </>
    ) : (
      <>
        <h2 className="items-start font-semibold text-base sm:text-2xl">
          Your cancellation’s all sorted, mate, no more charges.
        </h2>

        <div className="bg-gray-200 rounded-md p-3 flex space-x-2">
          <img
            src={profPic.src}
            alt="profile"
            className="w-10 h-10 object-cover rounded-full shadow transition-opacity duration-500"
          />
          <div className="flex flex-col space-y-2">
            <div>
              <p className="font-semibold">Mihailo Bozic</p>
              <p>&lt;mihailo@migratemate.co&gt;</p>
            </div>
            <p className="font-bold">
              I’ll be reaching out soon to help with the visa side of things.
            </p>
            <p>
              We’ve got your back, whether it’s questions, paperwork, or just
              figuring out your options.
            </p>
            <p className="font-semibold">
              Keep an eye on your inbox, I’ll be in touch shortly.
            </p>
          </div>
        </div>
      </>
    )}
  </div>

  {/* Buttons at the bottom */}
  <div className="pt-4 px-4 shadow-[0_-5px_10px_rgba(0,0,0,0.1)] sm:shadow-none -mx-4 mt-4 sm:m-0 sm:px-0">
    <button
      onClick={() => {
        // add finish logic here
      }}
      className=" px-4 inline-flex items-center justify-center w-full py-2 bg-[#996EFF] border border-gray-300 text-white rounded-lg hover:border-gray-400 shadow-sm"
    >
      Finish
    </button>
  </div>
</div>
  );

}

}

export default JobQuestion;