import React, { useState } from "react";
import principalImg from "../../assets/principal.jpg";
import { Quote } from "lucide-react";

const PrincipalMessage: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <section className="py-12 bg-stone-50">
      <div className="max-w-7xl mx-auto px-4">
        
        {/* Main Card */}
        <div className="bg-white border border-stone-200 rounded-2xl p-6 sm:p-8 shadow-sm">
          <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
            
            {/* IMAGE */}
            <div className="shrink-0">
              <img
                src={principalImg}
                alt="Principal"
                className="h-48 w-40 object-cover rounded-xl border border-stone-100 shadow-md"
              />
            </div>

            {/* CONTENT */}
            <div className="flex-1 text-center md:text-left">
              <span className="inline-block text-[15px] font-bold uppercase tracking-[0.2em] text-amber-700 bg-amber-50 px-3 py-1 rounded-full border border-amber-100">
                Message From Principal
              </span>

              <h2 className="mt-3 text-2xl font-black text-slate-900 leading-tight">
                Education builds the <span className="text-amber-600">future of society</span>
              </h2>

              <div className="mt-4 flex items-center justify-center md:justify-start gap-2 text-slate-400">
                <Quote size={14} className="text-amber-500" />
                <span className="text-[10px] uppercase tracking-widest font-bold">Principal Note</span>
              </div>

              <div className="mt-3 text-sm leading-7 text-slate-600 space-y-3">
                <p>Welcome to Sampati Devi Group of Colleges. Our mission is to develop skilled, ethical, and responsible professionals.</p>
                <p>We focus on academic excellence combined with real-world exposure for student success.</p>
                
                {isExpanded && (
                  <div className="pt-2 space-y-3 animate-in fade-in duration-500">
                    <p>Our teaching methodology ensures practical learning, discipline, and continuous improvement.</p>
                    <p>We aim to empower students with confidence, leadership, and innovation skills.</p>
                    <p>Together, we build a strong academic and professional foundation.</p>
                  </div>
                )}
              </div>

              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="mt-6 px-6 py-2 text-[10px] font-bold uppercase tracking-widest rounded-lg border border-stone-200 text-slate-700 hover:bg-stone-100 hover:border-stone-300 transition-all"
              >
                {isExpanded ? "Read Less" : "Read Full Message"}
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default PrincipalMessage;