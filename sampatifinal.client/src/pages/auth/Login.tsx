import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Lock, User, Eye, EyeOff, School } from "lucide-react";
import api from "../../api/axios";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (location.state?.message) {
      setError(location.state.message);
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [location, navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError("");
      const response = await api.post("/api/Auth/login", { username, password });
      const data = response.data;

      if (data.success) {
        localStorage.setItem("token", data.token);
        if (data.user) localStorage.setItem("user", JSON.stringify(data.user));
        navigate("/dashboard");
      } else {
        setError(data.message || "Login failed");
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "Unable to connect to server");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-stone-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-3xl border border-stone-200 shadow-xl p-8 md:p-12">
          
          {/* LOGO & HEADER */}
          <div className="text-center mb-10">
            <div className="bg-indigo-950 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
              <School className="text-amber-500" size={32} />
            </div>
            <h1 className="text-2xl font-black text-slate-950">Admin Login</h1>
            <p className="text-stone-500 text-xs uppercase tracking-widest font-bold mt-2">Sampati Devi Nursing College</p>
          </div>

          {/* FORM */}
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-[10px] font-black uppercase text-stone-500 mb-2 tracking-widest">Username</label>
              <div className="relative">
                <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400" />
                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Enter username" className="w-full h-12 pl-12 pr-4 bg-stone-50 border border-stone-200 text-sm rounded-xl outline-none focus:ring-2 focus:ring-amber-500" required />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-black uppercase text-stone-500 mb-2 tracking-widest">Password</label>
              <div className="relative">
                <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400" />
                <input type={showPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter password" className="w-full h-12 pl-12 pr-12 bg-stone-50 border border-stone-200 text-sm rounded-xl outline-none focus:ring-2 focus:ring-amber-500" required />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-stone-400 hover:text-slate-950">
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {error && <div className="bg-red-50 text-red-600 p-4 rounded-xl text-xs font-bold">{error}</div>}

            <button type="submit" disabled={loading} className="w-full h-12 bg-indigo-950 text-white text-xs font-black uppercase tracking-widest rounded-xl hover:bg-amber-600 transition shadow-lg disabled:opacity-50">
              {loading ? "Authenticating..." : "Login to Portal"}
            </button>
          </form>

          {/* FOOTER */}
          <div className="mt-8 pt-8 border-t border-stone-100 text-center">
            <p className="text-[10px] text-stone-400 font-bold uppercase tracking-widest">© 2026 Sampati Devi Nursing College</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;