import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    role: 'student', 
    password: '',
    confirmPassword: '',
    termsAccepted: false
  });
  
  const [status, setStatus] = useState('idle'); 
  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ 
      ...formData, 
      [name]: type === 'checkbox' ? checked : value 
    });
  };

  // ==========================================
  // ✅ FIXED: GOOGLE SIGNUP LOGIC
  // ==========================================
  const handleGoogleSignup = () => {
    // Redirects browser to Backend Port 5000
    // Backend handles the logic: if user doesn't exist, create them. Then redirect to Onboarding.
    window.location.href = 'http://localhost:5000/api/auth/google';
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    // --- Validation Checks ---
    if (!formData.termsAccepted) {
        setStatus('error');
        setErrorMessage("You must agree to the Terms.");
        return;
    }
    if (formData.password !== formData.confirmPassword) {
      setStatus('error');
      setErrorMessage("Passwords do not match");
      return;
    }
    if (formData.password.length < 6) {
      setStatus('error');
      setErrorMessage("Password must be at least 6 characters");
      return;
    }

    setStatus('loading');

    try {
      // ✅ FIX: Use Port 5000 explicitly
      const response = await fetch('http://localhost:5000/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          password: formData.password,
          role: formData.role
        }),
      });

      // --- Safety Check: Ensure response is JSON ---
      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        throw new Error("Server Error: Backend is not sending JSON. Is it running on Port 5000?");
      }

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Registration failed");
      }

      // ✅ SUCCESS: Redirect to Login
      setStatus('success');
      setTimeout(() => {
        navigate('/login');
      }, 2000);

    } catch (err) {
      console.error("Signup Error:", err);
      setStatus('error');
      setErrorMessage(err.message || "Signup failed"); 
    }
  };

  return (
    <div className="font-display bg-[#06457F] text-white h-screen w-screen overflow-hidden flex selection:bg-[#0474C4] selection:text-white">
      
      {/* ================= LEFT PANEL (Form) ================= */}
      <div className="w-full lg:w-1/2 flex flex-col relative z-10 bg-[#06457F] border-r border-[#043360] h-full overflow-hidden">
        
        {/* LOGO AREA - Compact */}
        <div className="flex-shrink-0 pt-4 pl-8 sm:pl-12 select-none absolute top-0 left-0 z-50">
            <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#0474C4] to-cyan-400 flex items-center justify-center shadow-lg shadow-blue-500/30">
                    <span className="material-symbols-outlined text-white text-base">rocket_launch</span>
                </div>
                <span className="text-lg font-black tracking-tight text-white">
                    Career <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-400">Orbit</span>
                </span>
            </div>
        </div>

        {/* FORM CONTAINER - Flex Grow to Center Vertically */}
        <div className="flex-1 flex flex-col justify-center items-center w-full px-8 sm:px-12 py-2">
          <div className="w-full max-w-[400px] flex flex-col gap-2"> 
            
            <div className="text-left w-full mb-1">
              <h1 className="text-white text-xl font-black leading-tight tracking-[-0.033em]">Create Account</h1>
              <p className="text-blue-100/80 text-[11px] font-normal mt-0.5">Start your internship journey today.</p>
            </div>

            {/* ✅ FIXED: GOOGLE BUTTON NOW WORKS */}
            <button 
                type="button"
                onClick={handleGoogleSignup}
                className="flex w-full cursor-pointer items-center justify-center overflow-hidden rounded-lg h-9 px-4 bg-[#0474C4] text-white gap-3 text-xs font-bold hover:brightness-110 transition-all shadow-md border border-white/5"
            >
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"></path>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"></path>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"></path>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"></path>
              </svg>
              <span className="truncate">Sign up with Google</span>
            </button>

            <div className="relative flex items-center py-0.5">
              <div className="flex-grow border-t border-blue-400/30"></div>
              <span className="flex-shrink-0 mx-2 text-[9px] font-medium text-blue-200/60 uppercase tracking-wider">Or email</span>
              <div className="flex-grow border-t border-blue-400/30"></div>
            </div>

            {status === 'success' && (
              <div className="bg-emerald-500/20 border border-emerald-500 text-emerald-200 p-1.5 rounded-lg text-[10px] text-center animate-bounce">
                Account created! Redirecting to Login...
              </div>
            )}

            <form onSubmit={handleSignup} className="flex flex-col gap-2">
              
              {/* REGISTER AS */}
              <label className="flex flex-col w-full group gap-0.5">
                <p className="text-blue-100 text-[10px] font-medium pl-1">Register As</p>
                <div className="relative">
                  <select 
                      name="role"
                      value={formData.role}
                      onChange={handleChange}
                      className="flex w-full appearance-none rounded-lg text-slate-900 border border-slate-300 bg-white h-8 px-3 text-xs outline-none focus:ring-1 focus:ring-[#0474C4] cursor-pointer"
                  >
                      <option value="student">Student</option>
                      <option value="professional">Professional</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-500">
                    <svg className="fill-current h-3 w-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                  </div>
                </div>
              </label>

              {/* NAME FIELDS */}
              <div className="grid grid-cols-2 gap-2">
                  <label className="flex flex-col w-full group gap-0.5">
                    <p className="text-blue-100 text-[10px] font-medium pl-1">First Name</p>
                    <input 
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                        className="flex w-full rounded-lg text-slate-900 border border-slate-300 bg-white h-8 placeholder:text-slate-400 px-3 text-xs outline-none focus:ring-1 focus:ring-[#0474C4]" 
                        placeholder="First Name" 
                    />
                  </label>
                  <label className="flex flex-col w-full group gap-0.5">
                    <p className="text-blue-100 text-[10px] font-medium pl-1">Last Name</p>
                    <input 
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                        className="flex w-full rounded-lg text-slate-900 border border-slate-300 bg-white h-8 placeholder:text-slate-400 px-3 text-xs outline-none focus:ring-1 focus:ring-[#0474C4]" 
                        placeholder="Last Name" 
                    />
                  </label>
              </div>

              {/* EMAIL */}
              <label className="flex flex-col w-full group gap-0.5">
                <p className="text-blue-100 text-[10px] font-medium pl-1">Email Address</p>
                <input 
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="flex w-full rounded-lg text-slate-900 border border-slate-300 bg-white h-8 placeholder:text-slate-400 px-3 text-xs outline-none focus:ring-1 focus:ring-[#0474C4]" 
                  placeholder="Enter your email" 
                />
              </label>

              {/* PASSWORD */}
              <div className="relative w-full group">
                <label className="flex flex-col gap-0.5">
                  <p className="text-blue-100 text-[10px] font-medium pl-1">Password</p>
                  <input 
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className="password-input flex w-full rounded-lg text-slate-900 border border-slate-300 bg-white h-8 placeholder:text-slate-400 px-3 pr-10 text-xs outline-none focus:ring-1 focus:ring-[#0474C4]" 
                    placeholder="Create a password" 
                    type={showPassword ? "text" : "password"} 
                  />
                </label>
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-[24px] text-slate-400 hover:text-[#0474C4] z-20 transition-colors">
                  <span className="material-symbols-outlined text-sm">{showPassword ? 'visibility' : 'visibility_off'}</span>
                </button>
              </div>

              {/* CONFIRM PASSWORD */}
              <div className="relative w-full group">
                <label className="flex flex-col gap-0.5">
                  <p className="text-blue-100 text-[10px] font-medium pl-1">Confirm Password</p>
                  <input 
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                    className="password-input flex w-full rounded-lg text-slate-900 border border-slate-300 bg-white h-8 placeholder:text-slate-400 px-3 pr-10 text-xs outline-none focus:ring-1 focus:ring-[#0474C4]" 
                    placeholder="Confirm password" 
                    type={showConfirmPassword ? "text" : "password"} 
                  />
                </label>
                <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-3 top-[24px] text-slate-400 hover:text-[#0474C4] z-20 transition-colors">
                  <span className="material-symbols-outlined text-sm">{showConfirmPassword ? 'visibility' : 'visibility_off'}</span>
                </button>
              </div>

              {/* TERMS */}
              <div className="flex items-start gap-2 mt-1">
                  <input 
                    id="terms"
                    name="termsAccepted"
                    type="checkbox"
                    checked={formData.termsAccepted}
                    onChange={handleChange}
                    className="mt-0.5 w-3 h-3 rounded border-gray-500 text-[#0474C4] focus:ring-[#0474C4] bg-[#1F2937] cursor-pointer"
                  />
                  <label htmlFor="terms" className="text-[10px] text-blue-100 cursor-pointer select-none leading-tight">
                      I agree to the <span className="text-[#0474C4] hover:underline font-semibold">Terms</span> and <span className="text-[#0474C4] hover:underline font-semibold">Privacy Policy</span>.
                  </label>
              </div>

              {status === 'error' && (
                <p className="text-red-400 text-[10px] font-semibold animate-pulse flex items-center gap-1">
                  <span className="material-symbols-outlined text-xs">error</span>
                  {errorMessage}
                </p>
              )}

              <div className="flex flex-col gap-2 mt-1">
                <button 
                  type="submit" 
                  disabled={status === 'loading'}
                  className="flex w-full items-center justify-center rounded-lg h-9 px-4 bg-[#0474C4] text-white text-xs font-bold hover:brightness-110 transition-all shadow-[0_0_15px_rgba(4,116,196,0.3)] cursor-pointer active:scale-[0.98] disabled:opacity-50"
                >
                  {status === 'loading' ? 'Creating...' : 'Register'}
                </button>
                
                <div className="flex flex-col items-center">
                  <p className="text-[12px] text-blue-100">
                    Already have an account? 
                    <Link className="font-semibold text-white hover:underline underline-offset-4 ml-1 cursor-pointer" to="/login">Log In</Link>
                  </p>
                </div>
              </div>
            </form>
            
            <div className="text-center mt-2">
               <p className="text-blue-300/50 text-[9px] font-medium tracking-wide">© 2026 Career Orbit.</p>
            </div>

          </div>
        </div>
      </div>

      {/* ================= RIGHT PANEL (ROCKET ANIMATION) ================= */}
      <div className="hidden lg:flex lg:w-1/2 flex-col items-center justify-center bg-[#A8C4EC] relative overflow-hidden h-full">
        
        {/* Background Glow */}
        <div className="absolute inset-0 z-0 pointer-events-none">
            <div className="absolute w-[600px] h-[600px] bg-white rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.3] blur-[100px]"></div>
        </div>

        {/* Animation Container */}
        <div className="relative w-full max-w-[650px] aspect-square flex items-center justify-center z-10 perspective-[1000px] scale-[0.8] xl:scale-[0.9] mb-20">
            
            {/* MOVING DOTS */}
            <div className="absolute inset-0 animate-spin-slow pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-3 h-3 bg-[#0056D2] rounded-full shadow-[0_0_10px_#0056D2] animate-float"></div>
                <div className="absolute bottom-1/3 right-1/4 w-4 h-4 bg-[#0474C4] rounded-full shadow-[0_0_15px_#0474C4] animate-float" style={{animationDelay: '1s'}}></div>
                <div className="absolute top-1/3 right-10 w-3 h-3 bg-[#6D28D9] rounded-full shadow-[0_0_10px_#6D28D9] animate-float" style={{animationDelay: '2s'}}></div>
                <div className="absolute bottom-20 left-1/3 w-2 h-2 bg-[#DC2626] rounded-full shadow-[0_0_8px_#DC2626] animate-float" style={{animationDelay: '1.5s'}}></div>
                <div className="absolute top-10 left-1/2 w-2.5 h-2.5 bg-[#D97706] rounded-full shadow-[0_0_8px_#D97706] animate-float" style={{animationDelay: '0.5s'}}></div>
            </div>

            {/* ROCKET SHIP */}
            <div className="relative z-20 flex flex-col items-center justify-center animate-rocket-float">
                <div className="relative w-24 h-48 bg-black rounded-t-[50%] rounded-b-3xl border border-slate-700 shadow-[0_0_30px_rgba(0,0,0,0.3)] flex flex-col items-center">
                    <div className="absolute top-4 right-3 w-3 h-16 bg-blue-50 opacity-20 rounded-full transform -rotate-6 filter blur-[2px] z-10"></div>
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-50 via-transparent to-transparent opacity-10 rounded-t-[50%] rounded-b-3xl pointer-events-none"></div>
                    
                    {/* Rocket Window */}
                    <div className="mt-8 w-12 h-12 rounded-full bg-slate-800 border-4 border-slate-300 flex items-center justify-center relative overflow-hidden shadow-md z-20">
                        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-transparent to-[#0474C4] opacity-40"></div>
                        <span className="material-symbols-outlined text-white text-xl opacity-90">rocket</span>
                    </div>
                    
                    {/* Rocket Fins */}
                    <div className="absolute -bottom-2 -left-4 w-6 h-16 bg-black border border-slate-700 rounded-tl-full rounded-bl-lg transform skew-y-12 -z-10 shadow-md"></div>
                    <div className="absolute -bottom-2 -right-4 w-6 h-16 bg-black border border-slate-700 rounded-tr-full rounded-br-lg transform -skew-y-12 -z-10 shadow-md"></div>
                    <div className="mt-auto mb-6 w-1 h-12 bg-slate-700 rounded-full z-20"></div>
                    <div className="absolute bottom-0 w-16 h-4 bg-slate-800 rounded-t-lg z-20"></div>
                </div>
                
                {/* Rocket Exhaust */}
                <div className="absolute top-[95%] w-10 h-32 rocket-exhaust rounded-full opacity-60"></div>
                <div className="absolute top-[95%] w-6 h-20 bg-[#0474C4] opacity-30 blur-md rounded-full"></div>
                <div className="absolute top-[100%] left-1/2 w-1 h-1 bg-white rounded-full animate-[trail_1s_ease-out_infinite]"></div>
                <div className="absolute top-[105%] left-[45%] w-1 h-1 bg-[#0474C4] rounded-full animate-[trail_1.2s_ease-out_infinite] delay-100"></div>
                <div className="absolute top-[102%] left-[55%] w-1.5 h-1.5 bg-[#0056D2] rounded-full animate-[trail_0.8s_ease-out_infinite] delay-200"></div>
            </div>

            {/* Floating Glass Icons */}
            <div className="absolute top-[20%] right-[15%] p-3 bg-white/60 backdrop-blur-md rounded-xl border border-white/40 shadow-xl animate-float-slow">
                <span className="material-symbols-outlined text-[#0056D2] text-2xl font-bold">code</span>
            </div>
            <div className="absolute bottom-[25%] left-[10%] p-3 bg-white/60 backdrop-blur-md rounded-xl border border-white/40 shadow-xl animate-float-fast">
                <span className="material-symbols-outlined text-[#6D28D9] text-2xl font-bold">work_outline</span>
            </div>
            <div className="absolute top-[60%] left-[80%] p-2 bg-white/60 backdrop-blur-md rounded-lg border border-white/40 shadow-xl animate-float" style={{animationDelay: '-2s'}}>
                <span className="material-symbols-outlined text-[#DC2626] text-xl font-bold">school</span>
            </div>
        </div>

        {/* Text Overlay */}
        <div className="absolute bottom-10 right-10 text-right font-bold text-3xl xl:text-5xl leading-snug z-50 pointer-events-none">
            <p className="text-[#0056D2] block mb-2">Build skills,</p>
            <p className="text-green-700 block mb-2">Apply for opportunities,</p>
            <p className="text-slate-800 block">Kickstart your career.</p>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .password-input::-ms-reveal, .password-input::-ms-clear { display: none !important; }
        .password-input::-webkit-contacts-auto-fill-button,
        .password-input::-webkit-credentials-auto-fill-button { visibility: hidden; position: absolute; right: 0; }
        
        .rocket-exhaust {
            background: linear-gradient(to bottom, rgba(4, 116, 196, 0.4), transparent);
            filter: blur(8px);
        }

        @keyframes float {
            0%, 100% { transform: translateY(-10px); }
            50% { transform: translateY(10px); }
        }
        @keyframes trail {
            0% { transform: translateY(0) scale(1); opacity: 1; }
            100% { transform: translateY(20px) scale(0); opacity: 0; }
        }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }

        .animate-float { animation: float 6s ease-in-out infinite; }
        .animate-float-slow { animation: float 8s ease-in-out infinite; }
        .animate-float-fast { animation: float 4s ease-in-out infinite; }
        .animate-rocket-float { animation: float 6s ease-in-out infinite; }
        .animate-spin-slow { animation: spin 20s linear infinite; }
        .float-icon-enhanced { display: flex; align-items: center; justify-content: center; border-radius: 9999px; border-width: 2px; }
      `}} />
    </div>
  );
};

export default Signup;