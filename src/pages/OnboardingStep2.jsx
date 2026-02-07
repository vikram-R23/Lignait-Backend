import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const OnboardingStep2 = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  
  // 1. STATE MANAGEMENT
  const [formData, setFormData] = useState({
    degree: '',
    college: '',
    city: '',
    state: '', 
    country: 'India' 
  });

  // 2. LOAD DATA (From the shared 'onboarding_data' object)
  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem('onboarding_data') || '{}');
    // Pre-fill if data exists (e.g. if user came back from Step 3)
    if (savedData.degree) {
      setFormData({
        degree: savedData.degree || '',
        college: savedData.college || '',
        city: savedData.city || '',
        state: savedData.state || '',
        country: savedData.country || 'India'
      });
    }
  }, []);

  // 3. INPUT HANDLER
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  // 4. SUBMIT HANDLER (Gather Data & Move Next)
  const handleNext = async (e) => {
    e.preventDefault(); 
    setLoading(true);

    // Get data from Step 1
    const currentData = JSON.parse(localStorage.getItem('onboarding_data') || '{}');

    // Merge Step 2 data into it
    const updatedData = {
      ...currentData,
      degree: formData.degree,
      college: formData.college,
      city: formData.city,
      state: formData.state,
      country: formData.country
    };

    // Save everything back to Local Storage
    localStorage.setItem('onboarding_data', JSON.stringify(updatedData));

    // Navigate to Step 3
    setTimeout(() => {
      navigate('/onboarding/step-3'); 
      setLoading(false);
    }, 500);
  };

  const handleBack = () => {
    navigate('/onboarding/step-1');
  };

  return (
    <div className="bg-[#06457F] text-[#0F172A] min-h-screen flex flex-col font-display antialiased selection:bg-[#2563EB] selection:text-white overflow-hidden relative">
      
      {/* LOGO */}
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

      {/* Background Elements */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-blue-400/10 blur-[100px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-cyan-400/10 blur-[120px] rounded-full" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex-1 flex items-center justify-center p-4 py-8">
        <div className="w-full max-w-[600px] flex flex-col gap-6">
          
          {/* CARD CONTAINER */}
          <div className="bg-white/95 backdrop-blur-sm border border-white/50 rounded-2xl shadow-2xl p-6">
            
            {/* PROGRESS BAR */}
            <div className="flex flex-col gap-2 mb-6">
              <div className="flex gap-6 justify-between items-end">
                <p className="text-[#1A365D] text-xs font-medium leading-none">Step 2 of 3</p>
                <p className="text-[#2C5282] text-[10px] font-medium leading-none">66%</p>
              </div>
              <div className="rounded-full bg-[#E2E8F0] h-1.5 w-full overflow-hidden">
                <div 
                  className="h-full rounded-full bg-[#2563EB] transition-all duration-500 ease-out shadow-[0_0_10px_rgba(37,99,235,0.5)]" 
                  style={{ width: '66%' }}
                ></div>
              </div>
            </div>

            {/* HEADER TEXT */}
            <div className="mb-6 text-center md:text-left">
              <h1 className="text-[#1A1A1A] text-2xl font-bold leading-tight tracking-[-0.02em] mb-1">
                Your education
              </h1>
              <p className="text-[#64748B] text-xs md:text-sm font-normal leading-normal">
                This helps us tailor your career path and recommendations.
              </p>
            </div>

            {/* FORM */}
            <form onSubmit={handleNext} className="flex flex-col gap-4">
              
              {/* DEGREE */}
              <div className="flex flex-col gap-1.5">
                <span className="text-[#1A1A1A] text-xs font-medium leading-normal">Degree / Course</span>
                <div className="flex w-full items-center relative group">
                  <input 
                    name="degree"
                    value={formData.degree}
                    onChange={handleChange}
                    className="w-full h-11 bg-white border border-[#CBD5E1] rounded-lg px-4 pl-10 text-[#0F172A] text-sm focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20 focus:border-[#2563EB] transition-all placeholder:text-[#4A5568]/50" 
                    placeholder="e.g. B.Tech Computer Science" 
                    type="text" 
                    required
                  />
                  <div className="absolute left-3 flex items-center justify-center pointer-events-none text-[#64748B]">
                    <span className="material-symbols-outlined text-[18px]">school</span>
                  </div>
                </div>
              </div>

              {/* COLLEGE */}
              <div className="flex flex-col gap-1.5">
                <span className="text-[#1A1A1A] text-xs font-medium leading-normal">College / Institute</span>
                <div className="flex w-full items-center relative group">
                  <input 
                    name="college"
                    value={formData.college}
                    onChange={handleChange}
                    className="w-full h-11 bg-white border border-[#CBD5E1] rounded-lg px-4 pl-10 text-[#0F172A] text-sm focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20 focus:border-[#2563EB] transition-all placeholder:text-[#4A5568]/50" 
                    placeholder="e.g. Stanford University" 
                    type="text" 
                    required
                  />
                  <div className="absolute left-3 flex items-center justify-center pointer-events-none text-[#64748B]">
                    <span className="material-symbols-outlined text-[18px]">account_balance</span>
                  </div>
                </div>
              </div>

              {/* CITY & STATE */}
              <div className="flex flex-col md:flex-row gap-3">
                <div className="flex flex-col flex-1 gap-1.5">
                  <span className="text-[#1A1A1A] text-xs font-medium leading-normal">City</span>
                  <div className="flex w-full items-center relative group">
                    <input 
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      className="w-full h-11 bg-white border border-[#CBD5E1] rounded-lg px-4 pl-10 text-[#0F172A] text-sm focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20 focus:border-[#2563EB] transition-all placeholder:text-[#4A5568]/50" 
                      placeholder="e.g. Mumbai" 
                      type="text" 
                      required
                    />
                    <div className="absolute left-3 flex items-center justify-center pointer-events-none text-[#64748B]">
                      <span className="material-symbols-outlined text-[18px]">location_city</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col flex-1 gap-1.5">
                  <span className="text-[#1A1A1A] text-xs font-medium leading-normal">State</span>
                  <div className="flex w-full items-center relative group">
                    <input 
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                      className="w-full h-11 bg-white border border-[#CBD5E1] rounded-lg px-4 pl-10 text-[#0F172A] text-sm focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20 focus:border-[#2563EB] transition-all placeholder:text-[#4A5568]/50" 
                      placeholder="e.g. Maharashtra" 
                      type="text" 
                      required
                    />
                    <div className="absolute left-3 flex items-center justify-center pointer-events-none text-[#64748B]">
                      <span className="material-symbols-outlined text-[18px]">map</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* COUNTRY */}
              <div className="flex flex-col gap-1.5">
                <span className="text-[#1A1A1A] text-xs font-medium leading-normal">Country</span>
                <div className="relative group h-11">
                  <select 
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    className="w-full h-full appearance-none bg-white border border-[#CBD5E1] rounded-lg px-4 pl-10 text-[#0F172A] text-sm focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20 focus:border-[#2563EB] transition-all cursor-pointer"
                  >
                    <option value="India">India</option>
                    <option value="USA">USA</option>
                    <option value="Canada">Canada</option>
                    <option value="UK">UK</option>
                    <option value="Germany">Germany</option>
                    <option value="Australia">Australia</option>
                  </select>
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center justify-center pointer-events-none text-[#64748B]">
                    <span className="material-symbols-outlined text-[18px]">public</span>
                  </div>
                  <div className="absolute right-3.5 top-1/2 -translate-y-1/2 flex items-center justify-center pointer-events-none text-[#64748B]">
                    <span className="material-symbols-outlined text-[20px]">expand_more</span>
                  </div>
                </div>
              </div>

              {/* BUTTONS */}
              <div className="flex items-center justify-between pt-2 mt-1">
                <button 
                  type="button" 
                  onClick={handleBack}
                  className="text-[#64748B] hover:text-[#0F172A] transition-colors text-xs font-medium flex items-center gap-2 px-2 py-2"
                >
                  <span className="material-symbols-outlined text-base">arrow_back</span>
                  Back
                </button>
                
                <button 
                  type="submit"
                  disabled={loading}
                  className="flex min-w-[130px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-11 px-6 bg-[#2563EB] hover:bg-[#1D4ED8] active:scale-[0.99] transition-all text-white text-sm font-bold leading-normal tracking-[0.015em] shadow-[0_4px_14px_rgba(37,99,235,0.3)] disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <span className="animate-spin material-symbols-outlined text-lg">progress_activity</span>
                  ) : (
                    <div className="flex items-center gap-2">
                      <span className="truncate">Continue</span>
                      <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                    </div>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnboardingStep2;