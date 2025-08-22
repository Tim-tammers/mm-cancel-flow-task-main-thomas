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
import ProgressPill from "./cancelflow/progress_pill";
import AcceptedDownsell from "./cancelflow/acceptedDownsell"
import DownsellStep from "./cancelflow/downsellStep"
import Step4Job from "./cancelflow/step4job"


const testemail: string = "user@example.com";

interface CancelModalProps {
  isOpen: boolean;
  onClose: () => void;
}
let userToken: string | null = null;
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
  let cancellation = data
  console.log("cancellation", cancellation);
  return cancellation
}

async function loginAndFetchSubscription() {
  // Wait for login to finish and token to be set
  const session = await getUserAuth(testemail);

  if (!userToken) {
    throw new Error('Login failed, no token available');
  }

  // Now call getUserSubscription safely
  const subscription = await gupdateUserSubscription();

  const downsellVariant = (await createCancellations()).cancellation.downsell_variant;
  console.log("ds_var", downsellVariant);
  const cancellation: Cancellation = {
    subscription_id: subscription.id,
    downsell_variant: downsellVariant,
    reason: "",
    accepted_downsell: false,
    found_job: false,
    responses: {},
    created_at: new Date().toISOString(),
    current_price: subscription.monthly_price,
  };

  return cancellation;
}


export default function CancelModal({ isOpen, onClose }: CancelModalProps) {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(true);
  
  const nextStep = () => { setStep(prev => Math.min(prev + 1, 4));};
  //const prevStep = () => {setStep(prev => Math.max(prev - 1, 0))};

    const nextStepNJ = () => {
  // If no downsell, jump from step 0 -> step 2
  if (step === 0 && !hasDownsell) {
    setStep(2);
  } else {
    setStep(prev => Math.min(prev + 1, 4));
  }
};
const prevStep = () => {
  // If on step 2 and there was no downsell, go back to step 0
  if (step === 2 && !hasDownsell && !cancellation?.found_job) {
    setStep(0);
  } else {
    setStep(prev => Math.max(prev - 1, 0))
  }
};

  const setJobFound = (value: boolean) => { setCancellation(prev => prev ? { ...prev, found_job: value } : null); };
  const acceptDownsell = (value: boolean) => { setCancellation(prev => prev ? { ...prev, accepted_downsell: value } : null); setStep(4) };
  const onAnswersSubmit = (value: Record<number, string>) => { setCancellation(prev => prev ? { ...prev, responses: value } : null); };
  const onReasonSubmit = (value: string) => { setCancellation(prev => prev ? { ...prev, reason: value } : null); };

  const setVisaInfo = (value: Record<number, string>) => {
  setCancellation(prev =>
    prev
      ? { 
          ...prev, 
          responses: { 
            ...(prev.responses || {}), // keep old responses
            ...value                   // add/override with new ones
          }
        }
      : null
  );
};
  const [cancellation, setCancellation] = useState<Cancellation | null>(null);
  const hasDownsell = cancellation?.downsell_variant === "B";
  const handleSubmit = async () => {
    setLoading(true);
    try {
      await createCancellations(JSON.stringify(cancellation));
      if(!cancellation?.accepted_downsell)  await gupdateUserSubscription(JSON.stringify({ status: "pending_cancellation" }));
      else await gupdateUserSubscription(JSON.stringify({ monthly_price: cancellation.current_price - 1000,  status: "active"  }));
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
          const cancellation = await loginAndFetchSubscription(); //change email here to test a new user
          setCancellation(cancellation);
          setStep(0);
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

          {step > 0 && step < 4 && (
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
            {!cancellation?.accepted_downsell && step >0 && <ProgressPill currentStep={step} />}
          </div>


          <div className="flex p-3 gap-4 sm:flex-row-reverse flex-col w-full h-auto sm:h-auto">
            <img
              src={EmpState.src}
              alt="Empire-State"
              className={`sm:w-75 sm:h-auto object-cover h-35 rounded-lg sm:block shadow ransition-opacity duration-500 ${step > 0 && (step < 4 || cancellation?.responses?.["5"] === "No" )? "hidden" : ""
                }`}
            />

            {step === 0 && <Step1Props nextStepNJ={nextStepNJ} nextStep={nextStep} setJobFound={setJobFound} />}

            {step === 1 && (cancellation?.found_job ? (
               <Step2Can
                nextStep={nextStep}
                foundJob={cancellation?.found_job ?? false}
                hasDownsell={hasDownsell}
                onAnswersSubmit={onAnswersSubmit}
                acceptDownsell={acceptDownsell}
                currentPrice={cancellation?.current_price ?? 0}
              />):
              <DownsellStep nextStep={nextStep}
                acceptDownsell={acceptDownsell}
                currentPrice={cancellation?.current_price ?? 0}/>
            )
            }
             {step === 2 && (cancellation?.found_job ? (
                <Step3Can nextStep={nextStep}
                foundJob={cancellation?.found_job ?? false}
                hasDownsell={hasDownsell}
                acceptDownsell={acceptDownsell}
                onReasonSubmit={onReasonSubmit}
                currentPrice={cancellation?.current_price ?? 0}
              />):
               <Step2Can
                nextStep={nextStep}
                foundJob={cancellation?.found_job ?? false}
                hasDownsell={hasDownsell}
                onAnswersSubmit={onAnswersSubmit}
                acceptDownsell={acceptDownsell}
                currentPrice={cancellation?.current_price|| 0}
              />
            )
            }
            {step === 4 && cancellation?.accepted_downsell &&
              (
                <AcceptedDownsell
                currentPrice={cancellation?.current_price ?? 0}
                 />
              )

            }
            {step === 3 && (cancellation?.found_job ? (
               <Step4Job 
                setVisaInfo = {setVisaInfo}
                usingMM={cancellation?.responses?.["1"] === "Yes"}
                nextStep = {nextStep}
               />):
               <Step3Can nextStep={nextStep}
                foundJob={cancellation?.found_job ?? false}
                hasDownsell={hasDownsell}
                acceptDownsell={acceptDownsell}
                onReasonSubmit={onReasonSubmit}
                  currentPrice={cancellation?.current_price ?? 0}
              />
            )
            }
            
            {step === 4 && !cancellation?.accepted_downsell && (
              <Step4Can 
               foundJob={cancellation?.found_job ?? false}
               visaHelp = {cancellation?.responses?.["5"] === "No" }/>
            )
            }
          </div>
        </>
      )}

    </Modal>
  );
}
