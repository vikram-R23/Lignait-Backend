import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const OnboardingStep1 = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // --- LOGIC: State Management ---
  const [selectedRole, setSelectedRole] = useState('student');
  const [gradYear, setGradYear] = useState('');
  const [userName, setUserName] = useState(''); 
  const [loading, setLoading] = useState(false);

  // --- LOGIC: 1. Catch Google Login Token ---
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const tokenFromUrl = queryParams.get('token');

    if (tokenFromUrl) {
      localStorage.setItem('token', tokenFromUrl);
      window.history.replaceState({}, document.title, "/onboarding/step-1");
    }
  }, [location]);

  // --- LOGIC: 2. Load Existing User Name ---
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser?.firstName) {
        setUserName(`${storedUser.firstName} ${storedUser.lastName || ''}`);
    } else if (storedUser?.name) {
        setUserName(storedUser.name);
    }
  }, []);

  // --- LOGIC: 3. Gather Data & Move Next ---
  const handleContinue = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!userName) {
      alert("Please enter your name");
      return;
    }
    if (!gradYear) {
      alert("Please select your graduation year");
      return;
    }

    setLoading(true);

    // ✅ SAVE DATA LOCALLY (GATHERING PHASE)
    // We create an object 'onboarding_data' to hold info from all 3 steps
    const currentData = JSON.parse(localStorage.getItem('onboarding_data') || '{}');
    
    const step1Data = {
      ...currentData, // Keep existing data if any
      name: userName,
      role: selectedRole,
      graduationYear: gradYear
    };

    localStorage.setItem('onboarding_data', JSON.stringify(step1Data));

    // ✅ NAVIGATE TO STEP 2
    // We simulate a small delay for smooth UX
    setTimeout(() => {
        navigate('/onboarding/step-2'); 
        setLoading(false);
    }, 500);
  };

  return (
    <div className="bg-[#06457F] text-[#0F172A] min-h-screen flex flex-col font-display antialiased selection:bg-[#2563EB] selection:text-white overflow-hidden relative">
      
      {/* LOGO - Fixed Top Left */}
      <div className="absolute top-6 left-8 z-50 select-none">
        <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#0474C4] to-cyan-400 flex items-center justify-center shadow-lg shadow-blue-500/30">
                <span className="material-symbols-outlined text-white text-lg">rocket_launch</span>
            </div>
            <span className="text-xl font-black tracking-tight text-white">
                Career <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-400">Orbit</span>
            </span>
        </div>
      </div>

      {/* Background Elements (Glows) */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-blue-400/10 blur-[100px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-cyan-400/10 blur-[120px] rounded-full" />
      </div>

      {/* Main Content Area */}
      <div className="relative z-10 flex-1 flex items-center justify-center p-4 py-12">
        
        {/* CARD CONTAINER */}
        <div className="w-full max-w-[520px] bg-white/95 backdrop-blur-sm border border-white/50 rounded-2xl shadow-2xl flex flex-col">
          
          {/* Progress Header */}
          <div className="px-6 pt-6 pb-1">
            <div className="flex justify-between items-center mb-2">
              <p className="text-[#0F172A] text-xs font-medium leading-none">Step 1 of 3</p>
              <p className="text-[#64748B] text-[10px] font-medium leading-none">33%</p>
            </div>
            <div className="h-1.5 w-full bg-slate-200 rounded-full overflow-hidden">
              <div className="h-full bg-[#2563EB] w-1/3 rounded-full shadow-[0_0_10px_rgba(37,99,235,0.5)]"></div>
            </div>
          </div>

          {/* Body Content */}
          <div className="p-6 flex flex-col gap-5">
            <div className="text-center space-y-1">
              <h1 className="text-2xl font-bold tracking-tight text-[#0F172A]">Let’s get started</h1>
              <p className="text-[#64748B] text-sm font-normal">Tell us a bit about yourself so AI can tailor your path.</p>
            </div>

            <div className="flex flex-col gap-4">
              {/* Full Name */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[#0F172A] text-xs font-medium">Full Name</label>
                <div className="group relative flex items-center">
                  <input 
                    className="w-full h-11 bg-white border border-[#CBD5E1] rounded-lg px-4 pl-10 text-[#0F172A] text-sm focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20 focus:border-[#2563EB] transition-all" 
                    type="text" 
                    placeholder="Enter your name"
                    value={userName} 
                    onChange={(e) => setUserName(e.target.value)} 
                  />
                  <span className="material-symbols-outlined absolute left-3 text-slate-400 text-[18px]">person</span>
                </div>
              </div>

              {/* Role Selection */}
              <div className="flex flex-col gap-2">
                <label className="text-[#0F172A] text-xs font-medium">Which best describes you?</label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  
                  {/* Student Card */}
                  <label className="relative cursor-pointer group">
                    <input 
                      className="peer sr-only" 
                      name="role" 
                      type="radio" 
                      checked={selectedRole === 'student'} 
                      onChange={() => setSelectedRole('student')}
                    />
                    <div className="h-24 flex flex-col items-center justify-center gap-2 rounded-xl border border-[#CBD5E1] bg-white transition-all duration-200 peer-checked:border-[#2563EB] peer-checked:bg-blue-50/50">
                      <div className="relative p-1.5 rounded-full bg-slate-100 text-[#64748B] peer-checked:text-[#2563EB] peer-checked:bg-blue-100 transition-all">
                        <span className="material-symbols-outlined text-[18px] block transition-transform duration-500 peer-checked:animate-bounce">school</span>
                      </div>
                      <span className="text-xs font-medium text-[#0F172A] peer-checked:text-[#2563EB]">Student</span>
                    </div>
                  </label>

                  {/* Job Seeker Card */}
                  <label className="relative cursor-pointer group">
                    <input 
                      className="peer sr-only" 
                      name="role" 
                      type="radio" 
                      checked={selectedRole === 'job_seeker'} 
                      onChange={() => setSelectedRole('job_seeker')}
                    />
                    <div className="h-24 flex flex-col items-center justify-center gap-2 rounded-xl border border-[#CBD5E1] bg-white transition-all duration-200 peer-checked:border-[#2563EB] peer-checked:bg-blue-50/50">
                      <div className="relative p-1.5 rounded-full bg-slate-100 text-[#64748B] peer-checked:text-[#2563EB] peer-checked:bg-blue-100 transition-all">
                        <span className="material-symbols-outlined text-[18px] block transition-transform duration-500 peer-checked:animate-bounce">work</span>
                      </div>
                      <span className="text-xs font-medium text-[#0F172A] peer-checked:text-[#2563EB]">Job Seeker</span>
                    </div>
                  </label>

                  {/* Career Switcher Card */}
                  <label className="relative cursor-pointer group">
                    <input 
                      className="peer sr-only" 
                      name="role" 
                      type="radio" 
                      checked={selectedRole === 'career_switcher'} 
                      onChange={() => setSelectedRole('career_switcher')}
                    />
                    <div className="h-24 flex flex-col items-center justify-center gap-2 rounded-xl border border-[#CBD5E1] bg-white transition-all duration-200 peer-checked:border-[#2563EB] peer-checked:bg-blue-50/50">
                      <div className="relative p-1.5 rounded-full bg-slate-100 text-[#64748B] peer-checked:text-[#2563EB] peer-checked:bg-blue-100 transition-all">
                        <span className="material-symbols-outlined text-[18px] block transition-transform duration-500 peer-checked:animate-bounce">swap_horiz</span>
                      </div>
                      <span className="text-xs font-medium text-[#0F172A] peer-checked:text-[#2563EB] text-center leading-tight">Career Switcher</span>
                    </div>
                  </label>
                </div>
              </div>

              {/* Graduation Year */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[#0F172A] text-xs font-medium">Graduation Year</label>
                <div className="relative">
                  <select 
                    value={gradYear}
                    onChange={(e) => setGradYear(e.target.value)}
                    className="w-full h-11 appearance-none bg-white border border-[#CBD5E1] rounded-lg px-4 pl-10 pr-10 text-[#0F172A] text-sm focus:outline-none focus:ring-1 focus:ring-[#2563EB] focus:border-[#2563EB] transition-all cursor-pointer"
                  >
                    <option value="" disabled>Select Year...</option>
                    <option value="2028">2028</option>
                    <option value="2027">2027</option>
                    <option value="2026">2026</option>
                    <option value="2025">2025</option>
                    <option value="2024">2024</option>
                    <option value="earlier">Earlier than 2024</option>
                  </select>
                  <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#64748B] text-[18px]">calendar_month</span>
                  <span className="material-symbols-outlined absolute right-3.5 top-1/2 -translate-y-1/2 text-[#64748B] text-[20px] pointer-events-none">expand_more</span>
                </div>
              </div>
            </div>

            {/* ACTION BUTTONS */}
            <div className="flex items-center justify-between pt-4 mt-2">
              <button 
                type="button" 
                onClick={() => navigate('/login')} 
                className="text-[#64748B] hover:text-[#0F172A] transition-colors text-sm font-medium flex items-center gap-2 px-2 py-2"
              >
                <span className="material-symbols-outlined text-lg">arrow_back</span>
                Back
              </button>
              
              <button 
                onClick={handleContinue}
                disabled={loading}
                className="flex min-w-[130px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-8 bg-[#2563EB] hover:bg-[#1D4ED8] active:scale-[0.99] transition-all text-white text-base font-bold leading-normal tracking-[0.015em] shadow-[0_4px_14px_rgba(37,99,235,0.3)] disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <span className="animate-spin material-symbols-outlined text-xl">progress_activity</span>
                ) : (
                  <div className="flex items-center gap-2">
                    <span className="truncate">Continue</span>
                    <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
                  </div>
                )}
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default OnboardingStep1;