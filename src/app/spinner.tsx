import { useState, useEffect } from "react";

export default function Spinner() {
 

  useEffect(() => {
    // Simulate fetching data
    setTimeout(() => {
    }, 2000);
  }, []);

  
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-12 h-12 border-4 border-[#8952fc] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  

 
}