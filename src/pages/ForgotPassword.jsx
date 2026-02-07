import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // 'idle', 'loading', 'success', 'error'
  const [errorMessage, setErrorMessage] = useState('');
  
  const navigate = useNavigate();

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const handleReset = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (!email) {
      setStatus('error');
      setErrorMessage('Please enter your email address.');
      return;
    }

    if (!validateEmail(email)) {
      setStatus('error');
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    setStatus('loading');

    try {
      // ==========================================
      // ✅ REAL BACKEND LOGIC
      // ==========================================
      const response = await fetch('http://localhost:5000/api/auth/forgot-password', { 
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email }),
        });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Something went wrong');
      }

      // Success: Show success message then redirect
      setStatus('success');
      
      setTimeout(() => {
        // Navigate back to login so they can wait for the email
        navigate('/login');
      }, 2000);

    } catch (error) {
      console.error("Forgot Password Error:", error);
      setStatus('error');
      setErrorMessage(error.message || "Failed to send reset email.");
    }
  };

  return (
    <div className="font-display bg-[#06457F] h-screen w-screen overflow-hidden flex flex-col lg:flex-row">
      
      {/* LEFT PANEL: Form Section */}
      <div className="w-full lg:w-1/2 h-full flex flex-col bg-[#06457F] relative z-10 p-6 lg:p-12 animate-fade-in border-r border-[#043360]">
        
        {/* BRAND LOGO */}
        <div className="w-full flex items-center gap-3 mb-8 select-none">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#0474C4] to-cyan-400 flex items-center justify-center shadow-lg shadow-blue-500/30">
            <span className="material-symbols-outlined text-white text-xl">rocket_launch</span>
          </div>
          <span className="text-2xl font-black tracking-tight text-white">
            Career <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-400">Orbit</span>
          </span>
        </div>

        <div className="flex-1 flex flex-col justify-center max-w-md mx-auto w-full">
          <div className="flex flex-col gap-6">
            <div className="space-y-3">
              <h1 className="text-white tracking-tight text-3xl lg:text-4xl font-bold leading-tight">
                Forgot Password?
              </h1>
              <p className="text-blue-100/80 text-sm lg:text-base font-normal leading-relaxed">
                Don’t worry — we’ll help you get back into your account. Enter the email associated with your account.
              </p>
            </div>

            <form onSubmit={handleReset} className="flex flex-col gap-6 mt-4">
              <div className="space-y-2">
                <label className="text-xs font-semibold text-blue-100/80 ml-1">Email Address</label>
                <div className="relative group">
                  {/* UPDATED INPUT: White background, dark text */}
                  <input 
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (status === 'error') setStatus('idle');
                    }}
                    className={`w-full h-12 lg:h-14 bg-white text-slate-900 border border-slate-300 rounded-2xl px-5 pl-12 text-sm focus:border-[#0474C4] focus:ring-1 focus:ring-[#0474C4] outline-none transition-all placeholder-slate-400 shadow-sm ${status === 'error' ? 'border-red-500 ring-1 ring-red-500' : ''}`}
                    placeholder="name@example.com" 
                    type="email"
                    disabled={status === 'loading' || status === 'success'}
                  />
                  <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                    <span className="material-symbols-outlined text-slate-400 text-[20px] group-focus-within:text-[#0474C4] transition-colors">mail</span>
                  </div>
                </div>
                
                {status === 'error' && (
                  <p className="text-red-300 text-xs ml-1 animate-slide-up flex items-center gap-1 font-medium">
                    <span className="material-symbols-outlined text-[14px]">error</span>
                    {errorMessage}
                  </p>
                )}

                {status === 'success' && (
                  <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-4 mt-2 animate-slide-up">
                    <div className="flex items-center gap-3">
                      <div className="bg-emerald-500 rounded-full p-1">
                        <span className="material-symbols-outlined text-white text-[16px]">check</span>
                      </div>
                      <div className="flex flex-col">
                        <p className="text-emerald-400 text-sm font-bold">Success!</p>
                        <p className="text-emerald-400/80 text-xs">Email sent. Check your inbox.</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {status !== 'success' && (
                <button 
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full h-12 lg:h-14 rounded-full bg-[#0474C4] hover:bg-[#0582db] text-white font-bold text-sm lg:text-base transition-all duration-200 flex items-center justify-center gap-2 shadow-lg shadow-blue-900/40 active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed group border border-white/10"
                >
                  {status === 'loading' ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  ) : (
                    <>
                      <span>Send Reset Link</span>
                      <span className="material-symbols-outlined text-[20px] transition-transform group-hover:translate-x-1">arrow_forward</span>
                    </>
                  )}
                </button>
              )}
            </form>

            <div className="flex flex-col items-center gap-6 mt-4">
              <Link to="/login" className="inline-flex items-center gap-2 text-blue-200 hover:text-white transition-colors text-sm font-semibold group">
                <span className="material-symbols-outlined text-[18px] transition-transform group-hover:-translate-x-1">arrow_back</span>
                Back to Login
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT PANEL: Corrected Visuals */}
      <div className="hidden lg:flex w-1/2 h-full bg-[#A8C4EC] relative flex-col items-center justify-center overflow-hidden">
        
        {/* Layer 1: Background Orbits */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20 z-0">
          <div className="absolute w-[400px] h-[400px] border border-blue-500 rounded-full animate-[spin_40s_linear_infinite]"></div>
          <div className="absolute w-[600px] h-[600px] border border-blue-400 rounded-full animate-[spin_60s_linear_infinite_reverse]"></div>
        </div>

        {/* Layer 2: Main Visual Area */}
        <div className="relative w-full h-full flex items-center justify-center z-10 scale-100 lg:scale-110">
          
          {/* CENTER LOGO */}
          <div className="relative z-20 animate-float-slow origin-center">
            <div className="w-32 h-32 lg:w-36 lg:h-36 bg-gradient-to-br from-[#0056D2] via-[#0474C4] to-[#00C2FF] rounded-[2.5rem] shadow-2xl flex items-center justify-center border border-white/40 transform rotate-12">
               <span className="material-symbols-outlined text-white text-6xl lg:text-7xl -rotate-12 drop-shadow-lg">hub</span>
            </div>
            <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-20 h-3 bg-black/10 blur-xl rounded-full"></div>
          </div>
          
          {/* 4 SURROUNDING LOGOS */}
          
          {/* Top Left */}
          <div className="absolute top-[15%] left-[20%] animate-float-1">
            <div className="w-16 h-16 bg-white/80 backdrop-blur-md rounded-2xl shadow-xl flex items-center justify-center border border-white/60 transition-all hover:bg-white">
              <span className="material-symbols-outlined text-indigo-600 text-3xl font-light">school</span>
            </div>
          </div>

          {/* Top Right */}
          <div className="absolute top-[15%] right-[20%] animate-float-2">
            <div className="w-16 h-16 bg-white/80 backdrop-blur-md rounded-2xl shadow-xl flex items-center justify-center border border-white/60 transition-all hover:bg-white">
              <span className="material-symbols-outlined text-emerald-600 text-3xl font-light">trending_up</span>
            </div>
          </div>

          {/* Bottom Left */}
          <div className="absolute bottom-[40%] left-[22%] animate-float-3">
            <div className="w-16 h-16 bg-white/80 backdrop-blur-md rounded-2xl shadow-xl flex items-center justify-center border border-white/60 transition-all hover:bg-white">
              <span className="material-symbols-outlined text-orange-500 text-3xl font-light">business_center</span>
            </div>
          </div>

          {/* Center Right */}
          <div className="absolute top-[48%] right-[15%] animate-float-4">
            <div className="w-16 h-16 bg-white/80 backdrop-blur-md rounded-2xl shadow-xl flex items-center justify-center border border-white/60 transition-all hover:bg-white">
              <span className="material-symbols-outlined text-blue-500 text-3xl font-light">terminal</span>
            </div>
          </div>

        </div>
        
        {/* Layer 3: Static Branding Text - MOVED DOWN to bottom-5 to avoid overlap */}
        <div className="absolute bottom-5 right-10 lg:right-16 z-30 flex flex-col items-end select-none text-right pointer-events-none">
          <h3 className="text-[#06457F] font-black text-5xl tracking-tighter mb-1 opacity-90 drop-shadow-sm">Secure.</h3>
          <h3 className="text-emerald-600 font-black text-5xl tracking-tighter mb-1 opacity-90 drop-shadow-sm">Simple.</h3>
          <h3 className="text-slate-700 font-black text-5xl tracking-tighter opacity-80">Back on track.</h3>
        </div>
      </div>

      {/* REFINED CSS ANIMATIONS */}
      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;900&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap');

        @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slide-up { from { opacity: 0; transform: translateY(15px); } to { opacity: 1; transform: translateY(0); } }
        
        @keyframes float-slow { 
          0%, 100% { transform: translateY(0) rotate(12deg); } 
          50% { transform: translateY(-15px) rotate(15deg); } 
        }

        @keyframes f1 { 0%, 100% { transform: translate(0,0); } 50% { transform: translate(-5px, -10px); } }
        @keyframes f2 { 0%, 100% { transform: translate(0,0); } 50% { transform: translate(8px, -5px); } }
        @keyframes f3 { 0%, 100% { transform: translate(0,0); } 50% { transform: translate(-10px, 8px); } }
        @keyframes f4 { 0%, 100% { transform: translate(0,0); } 50% { transform: translate(10px, 5px); } }
        
        .animate-fade-in { animation: fade-in 0.8s ease-out forwards; }
        .animate-slide-up { animation: slide-up 0.5s ease-out forwards; }
        .animate-float-slow { animation: float-slow 5s ease-in-out infinite; }
        .animate-float-1 { animation: f1 6s ease-in-out infinite; }
        .animate-float-2 { animation: f2 7s ease-in-out infinite; }
        .animate-float-3 { animation: f3 6.5s ease-in-out infinite; }
        .animate-float-4 { animation: f4 5.5s ease-in-out infinite; }
      `}} />
    </div>
  );
};

export default ForgotPassword;