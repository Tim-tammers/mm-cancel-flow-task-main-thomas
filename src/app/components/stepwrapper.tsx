import React, { ReactNode } from "react";

interface StepWrapper {
  children: ReactNode;
}

const FlexWrapper: React.FC<StepWrapper> = ({ children }) => {
  return (
    <div className="flex flex-col h-full">
      {children}
    </div>
  );
};

export default FlexWrapper;