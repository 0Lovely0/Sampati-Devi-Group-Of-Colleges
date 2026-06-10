import React from "react";

const Loader: React.FC<{ text?: string }> = ({ text }) => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="flex flex-col items-center gap-10">
        
        {/* Morphing Square Loader */}
        <div className="relative w-30 h-30">
          <div className="absolute inset-0 border-2 border-amber-600 animate-[spin_3s_linear_infinite]"></div>
          <div className="absolute inset-2 border-2 border-indigo-600 rotate-45 animate-[pulse_2s_ease-in-out_infinite]"></div>
        </div>

        {/* Minimalist text */}
        <p className="text-black font-mono tracking-[0.3em] uppercase text-xs">
          {text || "Loading..."}
        </p>
      </div>
    </div>
  );
};

export default Loader;