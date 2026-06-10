import React, { useState } from "react";
import principalImg from "../../assets/principal.avif";
import { Quote } from "lucide-react";

const PrincipalMessage: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <section className=" py-10 bg-gradient-to-br from-indigo-50 via-white to-amber-50">
      <div className="mx-auto w-full px-4">

        <div className=" p-4 transition">

          <div className="flex flex-col md:flex-row gap-5 items-start">

            {/* IMAGE */}
            <div className="flex justify-center md:justify-start">
              <img
                src={principalImg}
                alt="Principal"
                className="h-56 w-44 object-cover  border border-slate-200"
              />
            </div>

            {/* CONTENT */}
            <div className="flex-1">

              <span className="inline-block text-[10px] px-3 py-1 rounded-full bg-amber-100 text-amber-700 font-bold tracking-[0.2em] uppercase">
                Message From Principal
              </span>

              <h2 className="mt-3 text-xl font-black text-slate-900">
                Education builds the{" "}
                <span className="text-amber-700">future of society</span>
              </h2>

              <div className="mt-3 flex items-center gap-2">
                <Quote size={14} className="text-amber-600" />
                <span className="text-xs text-slate-500">Principal Note</span>
              </div>

              <div className="mt-3 text-sm leading-6 text-slate-600 space-y-3">
                <p>
                  Welcome to Sampati Devi Group of Colleges. Our mission is
                  to develop skilled, ethical and responsible professionals.
                </p>

                <p>
                  We focus on academic excellence combined with real-world
                  exposure for student success.
                </p>

                {isExpanded && (
                  <>
                    <p>
                      Our teaching methodology ensures practical learning,
                      discipline and continuous improvement.
                    </p>

                    <p>
                      We aim to empower students with confidence, leadership
                      and innovation skills.
                    </p>

                    <p>
                      Together we build a strong academic and professional
                      foundation.
                    </p>
                  </>
                )}
              </div>

              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="mt-4 px-4 py-2 text-xs font-semibold rounded-full border border-amber-200 text-amber-700 hover:bg-amber-600 hover:text-white transition"
              >
                {isExpanded ? "Read Less" : "Read More"}
              </button>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default PrincipalMessage;