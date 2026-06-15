import React from "react";

const Loader: React.FC<{ text?: string }> = ({ text }) => {
  return (
    <div className="h-full w-full flex flex-col items-center justify-center p-4">
      {/* Container */}
      <div className="flex flex-col items-center gap-8">
        
        {/* Loader Icon */}
        <div className="relative w-16 h-16">
          {/* Outer Ring */}
          <div className="absolute inset-0 border-[3px] border-stone-200 rounded-full" />
          {/* Spinner */}
          <div className="absolute inset-0 border-[3px] border-amber-500 rounded-full border-t-transparent animate-spin" />
        </div>

        {/* Text */}
        <p className="text-slate-950 text-[10px] font-black uppercase tracking-[0.3em]">
          {text || "Loading..."}
        </p>
      </div>
    </div>
  );
};

export default Loader;