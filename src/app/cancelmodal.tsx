// components/CancelModal.tsx
import React from "react";
import Modal from "./modal"; // Reuse the modal we built earlier
import EmpState from '../assets/empire-state-compressed.jpg';
import Caret from "@/assets/caret";
import { useState } from "react";
import Step1Props from "./cancelflow/step1"
import Step2Job from "./cancelflow/step2job"
import Step3Job from "./cancelflow/step3job"
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
                            <Caret className="w-4 h-4 rotate-90" />
                            Back</button>
                    }
                    <p className=" w-full text-center">Subscription Cancellation</p>
                </div>
                <div className="flex p-3 gap-4 sm:flex-row-reverse flex-col">
                    <img src={EmpState.src} alt="Empire-State" className="w-80 object-cover rounded-lg hidden sm:block" />
                    {step === 0 &&

                        <Step1Props nextStep={nextStep} setGotJob={setGotJob} />
                    }
                    {step === 1 && 
                        <Step2Job nextStep={nextStep} />

                    }
                    {step === 2 && gotJob &&
                        <Step2Job nextStep={nextStep} />

                    }
                </div>

            </div>

        </Modal>
    );
}
