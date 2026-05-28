import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// Direct imports to bypass React Context errors
import Lock from "lucide-react/dist/esm/icons/lock";
import Mail from "lucide-react/dist/esm/icons/mail";
import Eye from "lucide-react/dist/esm/icons/eye";
import EyeOff from "lucide-react/dist/esm/icons/eye-off";
import School from "lucide-react/dist/esm/icons/school";

const Login: React.FC = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-slate-50">
      {/* Branding Section - Curved Wave Design */}
      <div className="w-full md:w-2/4 bg-black flex flex-col items-center justify-center p-8 text-white relative overflow-hidden md:rounded-r-[1rem]">
        {/* Wave Shape Effect */}
        <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-indigo-600 rounded-full blur-3xl"></div>
        <div className="absolute top-10 left-10 w-32 h-32 bg-indigo-800 rounded-full blur-2xl"></div>

        <div className="z-10 text-center space-y-6">
          <div className="bg-white/10 backdrop-blur-md p-4 rounded-3xl inline-block shadow-xl border border-white/20">
            <img
              src="/logo1.ico"
              alt="College Logo"
              className="w-16 h-16 object-contain"
            />
          </div>
          <div>
            <h1 className="text-4xl font-black tracking-tight">SAMPATI DEVI</h1>
            <p className="text-indigo-200 font-medium mt-2">ADMIN PORTAL</p>
          </div>
        </div>
      </div>

      {/* Login Form Section */}
      <div className="w-full md:w-3/5 flex items-center justify-center p-6 md:p-12">
        <div className="w-full max-w-md bg-white p-8 md:p-10 rounded-3xl shadow-2xl shadow-indigo-100 border border-slate-100">
          <div className="mb-10 text-center md:text-left">
            <h2 className="text-3xl font-extrabold text-slate-900 mb-2">
              Welcome Back 👋
            </h2>
            <p className="text-slate-500">
              Sign in to manage your college dashboard.
            </p>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              navigate("/dashboard");
            }}
            className="space-y-6"
          >
            <div>
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1 mb-2 block">
                Email ID
              </label>
              <div className="relative group">
                <Mail
                  className="absolute left-4 top-4 text-slate-400 group-focus-within:text-indigo-600 transition"
                  size={20}
                />
                <input
                  type="email"
                  placeholder="admin@college.edu.in"
                  className="w-full pl-12 p-4 bg-slate-50 border-2 border-transparent focus:border-indigo-600 rounded-2xl outline-none transition-all duration-300"
                  required
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1 mb-2 block">
                Password
              </label>
              <div className="relative group">
                <Lock
                  className="absolute left-4 top-4 text-slate-400 group-focus-within:text-indigo-600 transition"
                  size={20}
                />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="w-full pl-12 pr-12 p-4 bg-slate-50 border-2 border-transparent focus:border-indigo-600 rounded-2xl outline-none transition-all duration-300"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-4 text-slate-400 hover:text-indigo-600 transition"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-black text-white rounded-2xl font-bold text-lg hover:bg-indigo-700 active:scale-95 transition-all duration-300 shadow-lg shadow-indigo-500/30"
            >
              Secure Login
            </button>

            {/* IT Support Info Box */}
            <div className="mt-6 p-4 bg-slate-50 rounded-2xl border border-slate-100 text-center">
              <p className="text-sm text-slate-500">
                Forgot username or password? <br />
                <span className="text-indigo-600 font-semibold cursor-pointer hover:underline">
                  Contact your IT department.
                </span>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
