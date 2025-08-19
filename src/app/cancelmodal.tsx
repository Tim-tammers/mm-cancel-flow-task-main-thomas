// components/CancelModal.tsx
import React from "react";
import Modal from "./modal"; // Reuse the modal we built earlier
import EmpState from '../assets/empire-state-compressed.jpg';
import Caret from "@/assets/caret";
import { useState } from "react";

interface CancelModalProps {
    isOpen: boolean;
    onClose: () => void;
}



export default function CancelModal({ isOpen, onClose }: CancelModalProps) {
    const [step, setStep] = useState(0);

    const nextStep = () => setStep(prev => Math.min(prev + 1, 3));
    const prevStep = () => setStep(prev => Math.max(prev - 1, 0));
    const [gotJob, setGotJob] = useState<boolean | null>(null);
    return (
        <Modal isOpen={isOpen} onClose={onClose}>


            <div className="flex flex-col items-center justify-center w-full">
              
            <div className="flex text-gray-800 p-6 border-b border-gray-300 w-full text-center " >
              {step > 0 && 
              <button 
               onClick={() => {
                                    prevStep()
                                }}
                                className="text-gray-800 flex justify-center items-center ">
                                    <Caret className="w-4 h-4 rotate-90"/>
                                    Back</button>
              }
                <p className=" w-full text-center">Subscription Cancellation</p>
                </div>
             <div className="flex p-3 gap-4 sm:flex-row-reverse flex-col">
                        <img src={EmpState.src} alt="Empire-State" className="w-80 h-66 object-cover rounded-lg" />
                {step === 0 &&
                   
                        <div className=" space-y-2.5" >
                            <h2 className="text-gray-800">Hey mate, Quick one before you go.</h2>
                            <h2 className="text-gray-800">Have you found a job yet?</h2>
                            <p className="text-gray-800 border-b border-gray-300">Whatever your answer, we just want to help you take the next step. With visa support, or by hearing how we can do better.</p>
                            <button
                                onClick={() => {
                                    nextStep()
                                    setGotJob(true);
                                }}
                                className="text-gray-800 w-full border border-gray-300 rounded-md py-2 px-4 hover:bg-green-50 transition">
                                Yes, I've found a job
                            </button>
                            <button
                                onClick={() => {
                                    nextStep()
                                    setGotJob(false);
                                }}
                                className="text-gray-800 w-full border border-gray-300 rounded-md py-2 px-4 hover:bg-purple-50 transition mt-2">
                                Not yet - I'm still looking
                            </button>
                        </div>
                    
                }
                {step === 1 && gotJob &&
                <h2 className="text-gray-800"> step 1 and got job</h2>
                
                }
                  {step === 1 && !gotJob &&
                <h2 className="text-gray-800"> step 1 and not job</h2>
                
                }
</div>

            </div>

        </Modal>
    );
}
