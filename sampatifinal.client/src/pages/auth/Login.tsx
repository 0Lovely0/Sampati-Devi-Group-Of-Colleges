// import React, { useState ,useEffect } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import axios from "axios";
// import { Lock, User, Eye, EyeOff, School } from "lucide-react";

// const Login: React.FC = () => {
//   const navigate = useNavigate();
//   const location = useLocation();

//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//   if (location.state?.message) {
//     setError(location.state.message);

//     navigate(location.pathname, {
//       replace: true,
//       state: {},
//     });
//   }
// }, [location, navigate]);

//   const handleLogin = async (e: React.FormEvent) => {
//     e.preventDefault();

//     try {
//       setLoading(true);
//       setError("");

//       const response = await axios.post(
//         "https://localhost:7197/api/Auth/login",
//         {
//           username,
//           password,
//         },
//         {
//           headers: {
//             "Content-Type": "application/json",
//           },
//         }
//       );

//       const data = response.data;

//       if (data.success) {
//         localStorage.setItem("token", data.token);
//         localStorage.setItem("user", data.user);
//         // localStorage.setItem("isAuthenticated", "true");

//         navigate("/dashboard");
//       } else {
//         setError(data.message || "Login failed");
//       }
//     } catch (err: any) {
//       console.error("Login Error:", err);

//       if (err.response?.status === 401) {
//         setError("Invalid username or password");
//       } else if (err.response?.status === 415) {
//         setError(
//           "API rejected request format (415 Unsupported Media Type)"
//         );
//       } else {
//         setError(
//           err.response?.data?.message ||
//             "Unable to connect to server"
//         );
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-indigo-950 relative overflow-hidden flex items-center justify-center px-4">
//       {/* Background */}
//       <div className="absolute inset-0">
//         <div className="absolute top-0 left-0 h-72 w-72 bg-blue-600/20 blur-3xl" />
//         <div className="absolute bottom-0 right-0 h-72 w-72 bg-indigo-600/20 blur-3xl" />

//         <div
//           className="absolute inset-0 opacity-[0.04]"
//           style={{
//             backgroundImage: `
//               linear-gradient(to right, white 1px, transparent 1px),
//               linear-gradient(to bottom, white 1px, transparent 1px)
//             `,
//             backgroundSize: "32px 32px",
//           }}
//         />
//       </div>

//       {/* Login Card */}
//       <div className="relative z-10 w-full max-w-sm">
//         <div className="border border-white/10 bg-white/5 backdrop-blur-2xl shadow-2xl">
//           <div className="p-6">
//             {/* Logo */}
//             <div className="text-center mb-6">
//               <img
//                 src="/logo1.ico"
//                 alt="Logo"
//                 className="h-12 w-12 mx-auto mb-3"
//               />

//               <h1 className="text-lg font-bold text-white">
//                 Sampati Devi
//               </h1>

//               <p className="text-xs text-slate-400">
//                 Administration Portal
//               </p>
//             </div>

//             {/* Header */}
//             <div className="text-center mb-6">
//               <div className="inline-flex h-10 w-10 items-center justify-center border border-indigo-500/20 bg-indigo-600/20 mb-3">
//                 <School size={18} className="text-indigo-400" />
//               </div>

//               <h2 className="text-xl font-bold text-white">
//                 Admin Login
//               </h2>

//               <p className="text-xs text-slate-400 mt-1">
//                 Sign in to continue
//               </p>
//             </div>

//             {/* Form */}
//             <form onSubmit={handleLogin} className="space-y-4">
//               {/* Username */}
//               <div>
//                 <label className="block text-xs font-medium text-slate-300 mb-2">
//                   Username
//                 </label>

//                 <div className="relative">
//                   <User
//                     size={16}
//                     className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
//                   />

//                   <input
//                     type="text"
//                     value={username}
//                     onChange={(e) => {
//                       setUsername(e.target.value);
//                       setError("");
//                     }}
//                     placeholder="Enter username"
//                     className="w-full h-10 pl-10 pr-3 bg-white/5 border border-white/10 text-sm text-white placeholder:text-slate-500 outline-none focus:border-indigo-500 transition"
//                     required
//                   />
//                 </div>
//               </div>

//               {/* Password */}
//               <div>
//                 <label className="block text-xs font-medium text-slate-300 mb-2">
//                   Password
//                 </label>

//                 <div className="relative">
//                   <Lock
//                     size={16}
//                     className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
//                   />

//                   <input
//                     type={showPassword ? "text" : "password"}
//                     value={password}
//                     onChange={(e) => {
//                       setPassword(e.target.value);
//                       setError("");
//                     }}
//                     placeholder="Enter password"
//                     className="w-full h-10 pl-10 pr-10 bg-white/5 border border-white/10 text-sm text-white placeholder:text-slate-500 outline-none focus:border-indigo-500 transition"
//                     required
//                   />

//                   <button
//                     type="button"
//                     onClick={() => setShowPassword(!showPassword)}
//                     className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white transition"
//                   >
//                     {showPassword ? (
//                       <EyeOff size={16} />
//                     ) : (
//                       <Eye size={16} />
//                     )}
//                   </button>
//                 </div>
//               </div>

//               {/* Error */}
//               {error && (
//                 <div className="border border-red-500/20 bg-red-500/10 p-2 text-xs text-red-300">
//                   {error}
//                 </div>
//               )}

//               {/* Login Button */}
//               <button
//                 type="submit"
//                 disabled={loading}
//                 className="w-full h-10 bg-indigo-600 hover:bg-indigo-700 text-sm font-semibold text-white transition-all duration-300 disabled:opacity-50"
//               >
//                 {loading ? "Logging In..." : "Login"}
//               </button>

//               {/* Support */}
//               <div className="border border-white/10 bg-white/5 p-3 text-center">
//                 <p className="text-xs text-slate-400">
//                   Forgot your password?
//                 </p>

//                 <p className="text-xs font-medium text-indigo-400 mt-1">
//                   Contact Administrator
//                 </p>
//               </div>
//             </form>

//             {/* Footer */}
//             <div className="mt-5 pt-4 border-t border-white/10 text-center">
//               <p className="text-[11px] text-slate-500">
//                 © 2026 Sampati Devi Nursing College
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;

// import React, { useState, useEffect } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import { Lock, User, Eye, EyeOff, School } from "lucide-react";
// import api from "../../api/axios";

// const Login: React.FC = () => {
//   const navigate = useNavigate();
//   const location = useLocation();

//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     if (location.state?.message) {
//       setError(location.state.message);

//       navigate(location.pathname, {
//         replace: true,
//         state: {},
//       });
//     }
//   }, [location, navigate]);

//   const handleLogin = async (e: React.FormEvent) => {
//     e.preventDefault();

//     try {
//       setLoading(true);
//       setError("");

//       const response = await api.post("/api/Auth/login", {
//         username,
//         password,
//       });

//       const data = response.data;

//       if (data.success) {
//         localStorage.setItem("token", data.token);

//         if (data.user) {
//           localStorage.setItem(
//             "user",
//             JSON.stringify(data.user)
//           );
//         }

//         navigate("/dashboard");
//       } else {
//         setError(data.message || "Login failed");
//       }
//     } catch (err: any) {
//       console.error("Login Error:", err);

//       if (err.response?.status === 401) {
//         setError("Invalid username or password");
//       } else if (err.response?.status === 403) {
//         setError("Access denied");
//       } else if (err.response?.status === 404) {
//         setError("Login API not found");
//       } else if (err.response?.status === 500) {
//         setError("Server error");
//       } else {
//         setError(
//           err.response?.data?.message ||
//             "Unable to connect to server"
//         );
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-indigo-950 relative overflow-hidden flex items-center justify-center px-4">
//       {/* Background */}
//       <div className="absolute inset-0">
//         <div className="absolute top-0 left-0 h-72 w-2 bg-blue-600/20 blur-3xl" />
//         <div className="absolute bottom-0 right-0 h-72 w-72 bg-indigo-600/20 blur-3xl" />

//         <div
//           className="absolute inset-0 opacity-[0.04]"
//           style={{
//             backgroundImage: `
//               linear-gradient(to right, white 1px, transparent 1px),
//               linear-gradient(to bottom, white 1px, transparent 1px)
//             `,
//             backgroundSize: "32px 32px",
//           }}
//         />
//       </div>

//       {/* Login Card */}
//       <div className="relative z-10 w-full max-w-sm">
//         <div className="border border-white/10 bg-white/5 backdrop-blur-2xl shadow-2xl rounded-lg">
//           <div className="p-6">
//             {/* Logo */}
//             <div className="text-center mb-6">
//               <img
//                 src="/logo1.ico"
//                 alt="Logo"
//                 className="h-12 w-12 mx-auto mb-3"
//               />

//               <h1 className="text-lg font-bold text-white">
//                 Sampati Devi
//               </h1>

//               <p className="text-xs text-slate-400">
//                 Administration Portal
//               </p>
//             </div>

//             {/* Header */}
//             <div className="text-center mb-6">
//               <div className="inline-flex h-10 w-10 items-center justify-center border border-indigo-500/20 bg-indigo-600/20 mb-3 rounded-md">
//                 <School size={18} className="text-indigo-400" />
//               </div>

//               <h2 className="text-xl font-bold text-white">
//                 Admin Login
//               </h2>

//               <p className="text-xs text-slate-400 mt-1">
//                 Sign in to continue
//               </p>
//             </div>

//             {/* Form */}
//             <form onSubmit={handleLogin} className="space-y-4">
//               {/* Username */}
//               <div>
//                 <label className="block text-xs font-medium text-slate-300 mb-2">
//                   Username
//                 </label>

//                 <div className="relative">
//                   <User
//                     size={16}
//                     className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
//                   />

//                   <input
//                     type="text"
//                     value={username}
//                     onChange={(e) => {
//                       setUsername(e.target.value);
//                       setError("");
//                     }}
//                     placeholder="Enter username"
//                     className="w-full h-10 pl-10 pr-3 bg-white/5 border border-white/10 text-sm text-white placeholder:text-slate-500 outline-none focus:border-indigo-500 transition rounded-md"
//                     required
//                   />
//                 </div>
//               </div>

//               {/* Password */}
//               <div>
//                 <label className="block text-xs font-medium text-slate-300 mb-2">
//                   Password
//                 </label>

//                 <div className="relative">
//                   <Lock
//                     size={16}
//                     className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
//                   />

//                   <input
//                     type={showPassword ? "text" : "password"}
//                     value={password}
//                     onChange={(e) => {
//                       setPassword(e.target.value);
//                       setError("");
//                     }}
//                     placeholder="Enter password"
//                     className="w-full h-10 pl-10 pr-10 bg-white/5 border border-white/10 text-sm text-white placeholder:text-slate-500 outline-none focus:border-indigo-500 transition rounded-md"
//                     required
//                   />

//                   <button
//                     type="button"
//                     onClick={() => setShowPassword(!showPassword)}
//                     className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white transition"
//                   >
//                     {showPassword ? (
//                       <EyeOff size={16} />
//                     ) : (
//                       <Eye size={16} />
//                     )}
//                   </button>
//                 </div>
//               </div>

//               {/* Error */}
//               {error && (
//                 <div className="border border-red-500/20 bg-red-500/10 p-3 text-xs text-red-300 rounded-md">
//                   {error}
//                 </div>
//               )}

//               {/* Login Button */}
//               <button
//                 type="submit"
//                 disabled={loading}
//                 className="w-full h-10 bg-indigo-600 hover:bg-indigo-700 text-sm font-semibold text-white transition-all duration-300 disabled:opacity-50 rounded-md"
//               >
//                 {loading ? "Logging In..." : "Login"}
//               </button>

//               {/* Support */}
//               <div className="border border-white/10 bg-white/5 p-3 text-center rounded-md">
//                 <p className="text-xs text-slate-400">
//                   Forgot your password?
//                 </p>

//                 <p className="text-xs font-medium text-indigo-400 mt-1">
//                   Contact Administrator
//                 </p>
//               </div>
//             </form>

//             {/* Footer */}
//             <div className="mt-5 pt-4 border-t border-white/10 text-center">
//               <p className="text-[11px] text-slate-500">
//                 © 2026 Sampati Devi Nursing College
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;


// import React, { useState, useEffect } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import { Lock, User, Eye, EyeOff, School } from "lucide-react";
// import api from "../../api/axios";

// const Login: React.FC = () => {
//   const navigate = useNavigate();
//   const location = useLocation();

//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     if (location.state?.message) {
//       setError(location.state.message);

//       navigate(location.pathname, {
//         replace: true,
//         state: {},
//       });
//     }
//   }, [location, navigate]);

//   const handleLogin = async (e: React.FormEvent) => {
//     e.preventDefault();

//     try {
//       setLoading(true);
//       setError("");

//       const response = await api.post("/api/Auth/login", {
//         username,
//         password,
//       });

//       const data = response.data;

//       if (data.success) {
//         localStorage.setItem("token", data.token);

//         if (data.user) {
//           localStorage.setItem("user", JSON.stringify(data.user));
//         }

//         navigate("/dashboard");
//       } else {
//         setError(data.message || "Login failed");
//       }
//     } catch (err: any) {
//       console.error("Login Error:", err);

//       setError(
//         err.response?.data?.message ||
//           "Unable to connect to server"
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-white flex items-center justify-center">

//       {/* Card */}
//       <div className="w-full max-w-lg ">

//         <div className="bg-white border border-blue-500 border-0 sm:border rounded-2xl">

//           <div className=" p-6 ">

//             {/* Logo */}
//             <div className="text-center mb-6">
//               <img
//                 src="/logo1.ico"
//                 alt="Logo"
//                 className="h-12 w-12 mx-auto mb-3"
//               />

//               <h1 className="text-lg font-bold text-slate-800">
//                 Sampati Devi
//               </h1>

//               <p className="text-xs text-slate-500">
//                 Administration Portal
//               </p>
//             </div>

//             {/* Header */}
//             <div className="text-center mb-6">
//               <div className="inline-flex h-10 w-10 items-center justify-center border border-indigo-200 bg-indigo-50 mb-3 rounded-md">
//                 <School size={18} className="text-indigo-600" />
//               </div>

//               <h2 className="text-xl font-bold text-slate-800">
//                 Admin Login
//               </h2>

//               <p className="text-xs text-slate-500 mt-1">
//                 Sign in to continue
//               </p>
//             </div>

//             {/* Form */}
//             <form onSubmit={handleLogin} className="space-y-4">

//               {/* Username */}
//               <div>
//                 <label className="block text-xs font-medium text-slate-600 mb-2">
//                   Username
//                 </label>

//                 <div className="relative">
//                   <User
//                     size={16}
//                     className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
//                   />

//                   <input
//                     type="text"
//                     value={username}
//                     onChange={(e) => {
//                       setUsername(e.target.value);
//                       setError("");
//                     }}
//                     placeholder="Enter username"
//                     className="w-full h-10 pl-10 pr-3 bg-white border border-slate-200 text-sm text-slate-800 placeholder:text-slate-400 outline-none focus:border-indigo-500 rounded-md"
//                     required
//                   />
//                 </div>
//               </div>

//               {/* Password */}
//               <div>
//                 <label className="block text-xs font-medium text-slate-600 mb-2">
//                   Password
//                 </label>

//                 <div className="relative">
//                   <Lock
//                     size={16}
//                     className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
//                   />

//                   <input
//                     type={showPassword ? "text" : "password"}
//                     value={password}
//                     onChange={(e) => {
//                       setPassword(e.target.value);
//                       setError("");
//                     }}
//                     placeholder="Enter password"
//                     className="w-full h-10 pl-10 pr-10 bg-white border border-slate-200 text-sm text-slate-800 placeholder:text-slate-400 outline-none focus:border-indigo-500 rounded-md"
//                     required
//                   />

//                   <button
//                     type="button"
//                     onClick={() => setShowPassword(!showPassword)}
//                     className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
//                   >
//                     {showPassword ? (
//                       <EyeOff size={16} />
//                     ) : (
//                       <Eye size={16} />
//                     )}
//                   </button>
//                 </div>
//               </div>

//               {/* Error */}
//               {error && (
//                 <div className="border border-red-200 bg-red-50 p-3 text-xs text-red-600 rounded-md">
//                   {error}
//                 </div>
//               )}

//               {/* Login Button */}
//               <button
//                 type="submit"
//                 disabled={loading}
//                 className="w-full h-10 bg-indigo-600 hover:bg-indigo-700 text-sm font-semibold text-white transition rounded-md disabled:opacity-50"
//               >
//                 {loading ? "Logging In..." : "Login"}
//               </button>

//               {/* Support */}
//               <div className="border border-slate-200 bg-slate-50 p-3 text-center rounded-md">
//                 <p className="text-xs text-slate-500">
//                   Forgot your password?
//                 </p>

//                 <p className="text-xs font-medium text-indigo-600 mt-1">
//                   Contact Administrator
//                 </p>
//               </div>
//             </form>

//             {/* Footer */}
//             <div className="mt-5 pt-4 border-t border-slate-200 text-center">
//               <p className="text-[11px] text-slate-400">
//                 © 2026 Sampati Devi Nursing College
//               </p>
//             </div>

//           </div>
//         </div>

//       </div>
//     </div>
//   );
// };

// export default Login;


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