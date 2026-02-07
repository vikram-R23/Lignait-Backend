import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';

// ==========================================
// STATIC STYLES (Kept Exactly as provided)
// ==========================================
const LoginStyles = React.memo(() => (
  <style dangerouslySetInnerHTML={{ __html: `
    @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap');
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;900&display=swap');
    @import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap');

    .password-input::-ms-reveal,
    .password-input::-ms-clear { display: none !important; }

    .float-icon-enhanced {
        display: flex; align-items: center; justify-content: center;
        border-radius: 9999px; border-width: 2px;
        transition: transform 0.3s;
    }
    .float-icon-enhanced:hover { transform: scale(1.1); }

    @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
    @keyframes float { 0%, 100% { transform: translateY(-4px); } 50% { transform: translateY(4px); } }
    @keyframes wave { 0%, 100% { transform: rotate(0deg); } 25% { transform: rotate(-10deg); } 75% { transform: rotate(10deg); } }

    .animate-spin-slow { animation: spin 60s linear infinite; }
    .animate-spin-reverse-slow { animation: spin 80s linear reverse infinite; }
    .animate-float { animation: float 3s ease-in-out infinite; }
    .animate-wave { animation: wave 1.5s ease-in-out infinite; }
    
    .custom-scrollbar::-webkit-scrollbar { width: 6px; }
    .custom-scrollbar::-webkit-scrollbar-track { background: #06457F; }
    .custom-scrollbar::-webkit-scrollbar-thumb { background: #0474C4; border-radius: 10px; }
  `}} />
));

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState('idle'); 
  const [errorMessage, setErrorMessage] = useState('');

  const emailInputRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Focus email input on mount
  useEffect(() => {
    emailInputRef.current?.focus();
  }, []);

  // --- GOOGLE LOGIN LOGIC ---
  const handleGoogleLogin = () => {
    // ✅ FIX: Points to Backend Port 5000
    window.location.href = 'http://localhost:5000/api/auth/google';
  };

  // --- EMAIL/PASSWORD LOGIN LOGIC ---
  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (!email.trim() || !password.trim()) {
        setStatus('error');
        setErrorMessage('Email and Password are required.');
        return; 
    }

    setStatus('loading');

    try {
      // 1. Send data to Real Backend (Port 5000)
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }

      // 2. Login Successful: Save Token & User to Browser Storage
      setStatus('success');
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        role: data.role,
        isOnboarded: data.isOnboarded // Save onboarding status
      }));

      // 3. Redirect Logic
      setTimeout(() => {
        // ✅ LOGIC: If user has profile data, go to Dashboard. If not, go to Onboarding Step 1.
        if (data.isOnboarded) {
            navigate('/dashboard'); 
        } else {
            navigate('/onboarding/step-1'); 
        }
      }, 800);

    } catch (err) {
      console.error("Login Error:", err);
      setStatus('error');
      // Friendly error message if server is down
      setErrorMessage(err.message === "Failed to fetch" ? "Cannot connect to server. Is Backend running on Port 5000?" : err.message);
    }
  };

  return (
    <div className="font-display bg-[#06457F] text-white min-h-screen w-full flex flex-col lg:flex-row relative overflow-hidden selection:bg-[#0474C4] selection:text-white">
      
      <LoginStyles />

      {/* ================= LEFT PANEL (CONTENT) ================= */}
      <div className="w-full lg:w-1/2 flex flex-col relative z-20 bg-[#06457F] border-r border-[#043360] min-h-screen shrink-0">
        
        {/* LOGO */}
        <div className="absolute top-8 left-8 sm:left-12 z-50 select-none">
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#0474C4] to-cyan-400 flex items-center justify-center shadow-lg shadow-blue-500/30">
                    <span className="material-symbols-outlined text-white text-xl">rocket_launch</span>
                </div>
                <span className="text-2xl font-black tracking-tight text-white">
                    Career <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-400">Orbit</span>
                </span>
            </div>
        </div>

        {/* FORM CONTAINER */}
        <div className="flex-1 flex flex-col justify-center items-center w-full px-8 sm:px-12 pt-32 pb-10 relative z-40">
          <div className="w-full max-w-[400px] flex flex-col gap-5">
            
            {/* Header */}
            <div className="text-left w-full mb-1">
              <h1 className="text-white text-4xl font-bold leading-tight tracking-[-0.033em] flex items-center gap-2">
                Welcome<span className="animate-wave origin-[70%_70%] inline-block">👋</span>
              </h1>
              <p className="text-[#bae6fd] text-sm font-normal mt-1.5">Log in to continue your career journey</p>
            </div>

            {/* Social Button */}
            <button 
                type="button" 
                onClick={handleGoogleLogin} 
                className="flex w-full cursor-pointer items-center justify-center overflow-hidden rounded-xl h-11 px-5 bg-[#0474C4] text-white gap-3 text-sm font-bold hover:bg-[#0360a3] transition-all shadow-md active:scale-[0.99] border border-white/5"
            >
              <div className="bg-white p-1 rounded-full flex items-center justify-center">
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
              </div>
              <span className="truncate">Sign in with Google</span>
            </button>

            {/* Divider */}
            <div className="relative flex items-center">
              <div className="flex-grow border-t border-[#1e4e80]"></div>
              <span className="flex-shrink-0 mx-4 text-[#bae6fd] text-[10px] font-bold tracking-widest uppercase opacity-80">OR CONTINUE WITH EMAIL</span>
              <div className="flex-grow border-t border-[#1e4e80]"></div>
            </div>

            {/* Status Messages */}
            {status === 'success' && (
               <div className="bg-emerald-500/20 border border-emerald-500 text-emerald-200 p-2.5 rounded-lg text-xs text-center animate-bounce font-medium">
                 Login successful! Redirecting...
               </div>
            )}
            {status === 'error' && (
               <div className="bg-red-500/20 border border-red-500 text-red-200 p-2.5 rounded-lg text-xs text-center flex items-center justify-center gap-2 font-medium animate-pulse">
                 <span className="material-symbols-outlined text-sm">error</span> {errorMessage}
               </div>
            )}

            {/* Login Form */}
            <form onSubmit={handleLogin} className="flex flex-col gap-4">
              <div className="flex flex-col w-full group gap-1.5">
                <span className="text-white text-xs font-semibold pl-1">Email Address</span>
                <div className="relative">
                  <input 
                      ref={emailInputRef}
                      name="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="flex w-full rounded-xl text-slate-900 border border-slate-300 bg-white focus:border-[#0474C4] focus:ring-1 focus:ring-[#0474C4] h-11 placeholder:text-slate-400 px-4 text-sm transition-all outline-none" 
                      placeholder="name@example.com" 
                  />
                  <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 text-xl cursor-pointer hover:text-[#0474C4] transition-colors">mail</span>
                </div>
              </div>

              <div className="flex flex-col w-full group gap-1.5">
                <div className="flex justify-between items-center pl-1">
                  <span className="text-white text-xs font-semibold">Password</span>
                  <a className="text-[#bae6fd] hover:text-white text-xs font-medium transition-colors cursor-pointer" href="/forgot-password">Forgot Password?</a>
                </div>
                <div className="relative">
                  <input 
                      name="password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="flex w-full rounded-xl text-slate-900 border border-slate-300 bg-white focus:border-[#0474C4] focus:ring-1 focus:ring-[#0474C4] h-11 placeholder:text-slate-400 px-4 pr-12 text-sm transition-all outline-none password-input" 
                      placeholder="Enter your password" 
                  />
                  <button 
                      type="button" 
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-[#0474C4] transition-colors"
                  >
                      <span className="material-symbols-outlined text-xl">{showPassword ? 'visibility' : 'visibility_off'}</span>
                  </button>
                </div>
              </div>

              <button 
                  type="submit" 
                  disabled={status === 'loading'}
                  className="mt-2 flex w-full items-center justify-center rounded-xl h-11 px-5 bg-[#0474C4] text-white text-sm font-bold hover:bg-[#0360a3] transition-all shadow-[0_0_20px_rgba(4,116,196,0.3)] active:scale-[0.99] disabled:opacity-50"
              >
                  {status === 'loading' ? 'Signing In...' : 'Sign In'}
              </button>
            </form>

            <div className="text-center pt-2">
              <p className="text-[#bae6fd] text-xs">
                  New here? <Link to="/signup" className="text-white font-bold hover:underline decoration-2 underline-offset-4 ml-1">Create Account</Link>
              </p>
            </div>

            <div className="text-center mt-6">
               <p className="text-blue-300/50 text-[10px] font-medium tracking-wide">© 2026 Career Orbit. All rights reserved.</p>
            </div>

          </div>
        </div>
      </div>

      {/* ================= RIGHT PANEL (ANIMATION) ================= */}
      <div className="hidden lg:flex lg:w-1/2 bg-[#A8C4EC] relative items-center justify-center overflow-hidden h-screen sticky top-0 shrink-0">
        
        <div className="relative w-full h-full max-w-[800px] max-h-[800px] flex items-center justify-center z-10 scale-[0.75] -translate-y-12 transition-transform duration-500">
            {/* Orbit 1 */}
            <div className="absolute w-[40%] h-[40%] aspect-square rounded-full border-[2px] border-cyan-900/90 border-dashed animate-spin-slow shadow-[0_0_20px_rgba(6,182,212,0.15)]" style={{animationDuration: '60s'}}>
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2" style={{ animation: 'spin 60s linear infinite reverse' }}>
                    <div className="float-icon-enhanced w-12 h-12 border-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.4)] bg-[#0f172a]">
                        <span className="material-symbols-outlined text-cyan-300 text-[20px]">terminal</span>
                    </div>
                </div>
            </div>
            
            {/* Orbit 2 */}
            <div className="absolute w-[60%] h-[60%] aspect-square rounded-full border-[1.5px] border-purple-950/90 animate-spin-reverse-slow" style={{animationDuration: '80s'}}>
                 <div className="absolute top-1/2 right-0 translate-x-1/2 -translate-y-1/2" style={{ animation: 'spin 80s linear infinite' }}>
                    <div className="float-icon-enhanced w-12 h-12 border-emerald-400 shadow-[0_0_15px_rgba(52,211,153,0.4)] bg-[#0f172a]">
                        <span className="material-symbols-outlined text-emerald-400 text-[20px]">group</span>
                    </div>
                 </div>
            </div>

            {/* Orbit 3 */}
            <div className="absolute w-[75%] h-[75%] aspect-square rounded-full border-[2px] border-fuchsia-950/90 border-dashed animate-spin-slow shadow-[0_0_35px_rgba(217,70,239,0.15)]" style={{animationDuration: '100s'}}>
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2" style={{ animation: 'spin 100s linear infinite reverse' }}>
                    <div className="float-icon-enhanced w-11 h-11 border-purple-400 shadow-[0_0_15px_rgba(192,132,252,0.4)] bg-[#0f172a]">
                        <span className="material-symbols-outlined text-purple-400 text-[20px]">emoji_events</span>
                    </div>
                </div>
            </div>

            {/* Orbit 4 */}
            <div className="absolute w-[95%] h-[95%] aspect-square rounded-full border-[1.5px] border-indigo-950/90 animate-spin-reverse-slow" style={{animationDuration: '120s'}}>
                <div className="absolute top-1/2 left-0 -translate-x-1/2 -translate-y-1/2" style={{ animation: 'spin 120s linear infinite' }}>
                    <div className="float-icon-enhanced w-12 h-12 border-pink-400 shadow-[0_0_15px_rgba(244,114,182,0.4)] bg-[#0f172a]">
                        <span className="material-symbols-outlined text-pink-400 text-[22px]">article</span>
                    </div>
                </div>
            </div>

            {/* Center Node */}
            <div className="relative z-20 animate-float">
                <div className="absolute inset-[-40px] bg-white/30 blur-3xl rounded-full"></div>
                <div className="relative w-24 h-24 bg-[#06457F] rounded-full border-4 border-white/20 flex items-center justify-center shadow-[0_0_50px_rgba(6,69,127,0.3)]">
                    <span className="material-symbols-outlined text-white text-[40px] drop-shadow-md">smart_toy</span>
                </div>
            </div>
        </div>

        {/* Text Container */}
        <div className="absolute bottom-5 right-10 lg:right-16 z-50 text-right pointer-events-none max-w-[80%]">
            <h2 className="font-display font-semibold text-2xl lg:text-3xl xl:text-4xl leading-relaxed tracking-wide drop-shadow-sm">
                <span className="block text-[#06457F]">Build skills,</span>
                <span className="block text-[#00E676] font-bold drop-shadow-sm">Apply for opportunities,</span>
                <span className="block text-black">Kickstart your career.</span>
            </h2>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-white/30 via-transparent to-transparent pointer-events-none z-30"></div>
      </div>
    </div>
  );
};

export default Login;