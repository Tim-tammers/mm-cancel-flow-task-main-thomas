// components/CancelModal.tsx
import React from "react";
import Modal from "./modal"; // Reuse the modal we built earlier
import EmpState from '../assets/empire-state-compressed.jpg';
import Caret from "@/assets/caret";
import { useState, useEffect } from "react";
import Step1Props from "./cancelflow/step1"
import Step2Can from "./cancelflow/step2can"
import { Cancellation } from "@/lib/cancellation_model";
import Spinner from "./spinner";
import Step3Can from "./cancelflow/step3can"
import Step4Can from "./cancelflow/step4can"
import { json } from "stream/consumers";
import ProgressPill from "./cancelflow/progress_pill";
import AcceptedDownsell from "./cancelflow/acceptedDownsell"


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
    console.log(body);
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
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(true);
    const nextStep = () => setStep(prev => Math.min(prev + 1, 4));
    const prevStep = () => setStep(prev => Math.max(prev - 1, 1));
    const setJobFound = (value: boolean) => {setCancellation(prev => prev ? { ...prev, found_job: value } : null);};
    const acceptDownsell = (value: boolean) => {setCancellation(prev => prev ? { ...prev, accepted_downsell: value } : null); setStep(4)};
    const onAnswersSubmit = (value: Record<number, string>) => {setCancellation(prev => prev ? { ...prev, responses: value } : null);};
    const onReasonSubmit = (value: string) => {setCancellation(prev => prev ? { ...prev, reason: value } : null);};

    const [cancellation, setCancellation] = useState<Cancellation | null>(null);

    const handleSubmit = async () => {
        setLoading(true);
        try {
          await createCancellations(JSON.stringify(cancellation));
        } catch (err) {
        console.error("Error submitting cancellation:", err);
        } finally {
        setLoading(false);
        }
  };


    useEffect(() => {
    if (isOpen) {
      (async () => {
        try {
          setLoading(true);
          const cancellation = await loginAndFetchSubscription("user7@example.com"); //change email here to test a new user
          setCancellation(cancellation);
          setStep(1);
          setLoading(false);
    
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

        useEffect(() => {
        if (step === 4) {
        handleSubmit();
        }
        }, [step]);


    return (
        <Modal isOpen={isOpen} onClose={onClose}>
         {loading ? (
            <Spinner />
  ) : (
    <>
   
      {step > 1 && step < 4 && (
        <button
          onClick={() => prevStep()}
          className="text-gray-800 flex absolute top-16 left-3 justify-center items-center sm:top-4"
        >
          <Caret className="w-4 h-4 rotate-90" />
          Back
        </button>
      )}

            <div className="flex sm:items-center justify-center p-4 border-b border-gray-300 w-full sm:text-center space-x-4 flex-col sm:flex-row">
                <p className="font-semibold">Subscription Cancellation</p>
               { !cancellation?.accepted_downsell && <ProgressPill currentStep={step} /> }
        </div>


      <div className="flex p-3 gap-4 sm:flex-row-reverse flex-col w-full">
        <img
          src={EmpState.src}
          alt="Empire-State"
          className={`sm:w-75 object-cover rounded-lg sm:block shadow ransition-opacity duration-500 ${
            step > 1 && step < 4 ? "hidden" : ""
          }`}
        />

        {step === 1 && <Step1Props nextStep={nextStep} setJobFound={setJobFound} />}

        {step === 2 && (
          <Step2Can
            nextStep={nextStep}
            foundJob={cancellation?.found_job ?? false}
            hasDownsell={cancellation?.downsell_variant === "B"}
            onAnswersSubmit={onAnswersSubmit}
            acceptDownsell={acceptDownsell}
          />
        )}
        {step === 3 && (
        <Step3Can nextStep={nextStep}  
                  foundJob={cancellation?.found_job ?? false}
                  hasDownsell={cancellation?.downsell_variant === "B"}
                  acceptDownsell={acceptDownsell}
                  onReasonSubmit = {onReasonSubmit}
                  usingMM={cancellation?.responses?.["1"] === "Yes"}
                  />
        )}
        {step === 4 && cancellation?.accepted_downsell && 
      (
                    <AcceptedDownsell/>
             )
        
        }
             {step === 4 && !cancellation?.accepted_downsell &&(
                    <Step4Can/>
             )
    
        
        }
      </div>
    </>
  )}

        </Modal>
    );
}
