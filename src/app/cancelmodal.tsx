// components/CancelModal.tsx
import React from "react";
import Modal from "./modal"; // Reuse the modal we built earlier
import EmpState from '../assets/empire-state-compressed.jpg';
import Caret from "@/assets/caret";
import { useState, useEffect } from "react";
import Step1Props from "./cancelflow/step1"
import Step2Job from "./cancelflow/step2job"
import { Cancellation } from "@/lib/cancellation_model";

import Step3Job from "./cancelflow/step3job"
import { json } from "stream/consumers";


interface CancelModalProps {
    isOpen: boolean;
    onClose: () => void;
}
let userToken: string | null = null;
let subscriptionId: string | null = null;
//let cancellation: Cancellation | null = null;

async function getUserAuth(email: string) {
  const res = await fetch('/api/users', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email }),
  })

  const data = await res.json()
  console.log('Data', data)
  userToken = data.session?.session.access_token || null;
  return data.session
}

//get or update user
async function gupdateUserSubscription(body?: string) {
  const res = await fetch('/api/subscriptions', {
  method: 'POST',
  headers: {
    Authorization: `Bearer ${userToken}`,
    "Content-Type": "application/json",
  },
  body: body,
});


  if (!res.ok) throw new Error('Failed to fetch subscriptions')

  const data = await res.json()
  console.log('subscription:', data)
  subscriptionId = data.subscription.id
  return data.subscription
}

async function createCancellations(body?: string) {
    const res = await fetch('/api/cancellations', {
  method: 'POST',
  headers: {
    Authorization: `Bearer ${userToken}`,
    "Content-Type": "application/json",
  },
   body: body,
});


  if (!res.ok) throw new Error('Failed to fetch Cancellations')

  const data = await res.json()
  let cancellation = data.cancellation
 
  return cancellation
}

async function loginAndFetchSubscription(email: string) {
  // Wait for login to finish and token to be set
  const session = await getUserAuth(email);

  if (!userToken) {
    throw new Error('Login failed, no token available');
  }

  // Now call getUserSubscription safely
  const subscription = await gupdateUserSubscription(JSON.stringify({status: "pending_cancellation"}));

  const cancellation = await createCancellations();
  return cancellation;
}


export default function CancelModal({ isOpen, onClose }: CancelModalProps) {
    const [step, setStep] = useState(0);

    const nextStep = () => setStep(prev => Math.min(prev + 1, 3));
    const prevStep = () => setStep(prev => Math.max(prev - 1, 0));
    const setJobFound = (value: boolean) => {setCancellation(prev => prev ? { ...prev, found_job: value } : null);};
    const onAnswersSubmit = (value: Record<number, string>) => {setCancellation(prev => prev ? { ...prev, responses: value } : null);};
    const [cancellation, setCancellation] = useState<Cancellation | null>(null);

    useEffect(() => {
    if (isOpen) {
      (async () => {
        try {

          const cancellation = await loginAndFetchSubscription("user6@example.com"); //change email here to test a new user
          setCancellation(cancellation);
    
        } catch (err) {
          console.error("Error fetching state data:", err);
        }
      })();
    }
  }, [isOpen]);

  useEffect(() => {
  if (cancellation) {
    console.log("Cancellation updated:", cancellation);
  }
}, [cancellation]);

    return (
        <Modal isOpen={isOpen} onClose={onClose}>


            <div className="flex flex-col items-center justify-center w-full">

                {step > 0 &&
                        <button
                            onClick={() => {
                                prevStep()
                            }}
                            className="text-gray-800 flex absolute top-16 left-3 justify-center items-center sm:top-4 ">
                            <Caret className="w-4 h-4 rotate-90" />
                            Back</button>
                    }
                <div className="flex text-gray-800 p-4 border-b border-gray-300 w-full sm:text-center" >
                    <p className=" w-full ">Subscription Cancellation</p>
                </div>
                <div className="flex p-3 gap-4 sm:flex-row-reverse flex-col w-full">
                    <img src={EmpState.src} alt="Empire-State" className={`sm:w-80 object-cover rounded-lg sm:block shadow
                                                                            ${step > 0 && step <2
                                                                                ? "hidden"
                                                                                : ""
                                                                            }`}/>
                    {step === 0 && (
                          <>
                        {/* <img src={EmpState.src} alt="Empire-State" className="sm:w-80 object-cover rounded-lg sm:block shadow" /> */}
                        <Step1Props nextStep={nextStep} setJobFound= {setJobFound}/>
                        </>
                    )
                    }
                    {step === 1 && 
                    (
                          <>
                       {/* <img src={EmpState.src} alt="Empire-State" className="w-80 object-cover rounded-lg hidden sm:block shadow" />  */}
                     <Step2Job nextStep={nextStep}  
                                  foundJob={cancellation?.found_job ?? false} 
                                  hasDownsell={cancellation?.downsell_variant == 'B' ? true : false } 
                                  onAnswersSubmit={onAnswersSubmit}/>
                        </>
                    )
                        

                    }
                    {/* {step === 1 && cancellation?.found_job &&
                        <Step2Job nextStep={nextStep} />

                    } */}
                </div>

            </div>

        </Modal>
    );
}
