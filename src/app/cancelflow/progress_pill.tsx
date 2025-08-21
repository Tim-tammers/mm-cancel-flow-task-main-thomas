interface ProgressPillProps {
  currentStep: number; // 1, 2, or 3
}

export default function ProgressPill({ currentStep }: ProgressPillProps) {
  const steps = [1, 2, 3];

  return (
    <div className="flex items-center space-x-1">
      {steps.map((step) => {
        const isCompleted = step < currentStep;
        const isActive = step === currentStep;

        return (
          <div
            key={step}
            className={`w-5 h-1.5 rounded-full 
              ${isCompleted ? "bg-[#4ABF71]" : isActive ? "bg-gray-400" : "bg-gray-300"}
            `}
          />
        );
      })}
      {currentStep > 3 ? <p className="text-[10px]">Completed</p>: <p className="text-[10px]">Step {currentStep} of 3</p>} 
    </div>
  );
}