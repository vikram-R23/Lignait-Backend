import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const OnboardJobSeekerExperienceLevel = () => {
  const navigate = useNavigate();
  const [selectedLevel, setSelectedLevel] = useState('1–2 years'); 
  const [loading, setLoading] = useState(false);

  // Experience Levels Data
  const levels = [
    { id: 'fresher', label: 'Fresher', icon: 'school', sub: '0 years of experience. Just starting your career journey.' },
    { id: 'junior', label: '1–2 years', icon: 'trending_up', sub: 'Early career professional looking to grow further.' },
    { id: 'mid', label: '3–5 years', icon: 'star', sub: 'Mid-level professional with solid industry expertise.' },
    { id: 'switcher', label: 'Career Switcher', icon: 'swap_horiz', sub: 'Changing your career path or industry focus.' },
  ];

  // Load saved state if exists
  useEffect(() => {
    const savedData = localStorage.getItem('onboarding_step3');
    if (savedData) {
      const { level } = JSON.parse(savedData);
      setSelectedLevel(level);
    }
  }, []);

  const handleContinue = async () => {
    if (!selectedLevel) return;

    setLoading(true);

    // --- MOCK API & LLM LOGIC ---
    try {
        console.log("API: Sending experience profile...");
        // 1. Simulate Network Latency
        await new Promise(resolve => setTimeout(resolve, 800)); 

        console.log(`LLM: Calibrating roadmap complexity for '${selectedLevel}'...`);
        console.log("LLM: Adjusting learning modules and timelines...");
        // 2. Simulate AI Processing time
        await new Promise(resolve => setTimeout(resolve, 1000)); 

        // Save to local storage
        localStorage.setItem('onboarding_step3', JSON.stringify({ level: selectedLevel }));
        localStorage.setItem('roadmap_status', 'true'); // Automatically unlock dashboard
        
        // --- NAVIGATION FIX: Redirects to Role Challenge Page ---
        navigate('/onboarding/role-challenge');
        
    } catch (error) {
        console.error("Submission failed", error);
    } finally {
        setLoading(false);
    }
  };

  return (
    <div className="bg-[#06457F] min-h-screen flex items-center justify-center p-4 md:p-8 font-['Inter'] antialiased relative overflow-hidden">
      
      {/* Styles for Icons & Fonts */}
      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap');
        
        /* Fill variation for the Check Icon */
        .material-symbols-outlined.fill-1 { font-variation-settings: 'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24; }
        .material-symbols-outlined { font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24; }
        
        .animate-spin { animation: spin 1s linear infinite; }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}} />

      {/* --- LOGO (Top Left) --- */}
      <div className="absolute top-6 left-6 md:top-8 md:left-12 z-50 select-none">
        <div className="flex items-center gap-3">
            <div className="w-9 h-9 md:w-10 md:h-10 rounded-xl bg-gradient-to-tr from-[#0474C4] to-cyan-400 flex items-center justify-center shadow-lg shadow-blue-500/30">
                <span className="material-symbols-outlined text-white text-lg md:text-xl">rocket_launch</span>
            </div>
            <span className="text-xl md:text-2xl font-black tracking-tight text-white">
                Career <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-400">Orbit</span>
            </span>
        </div>
      </div>

      {/* --- MAIN CARD --- */}
      <div className="w-full max-w-2xl bg-[#A8C4EC] rounded-3xl p-5 md:p-8 shadow-xl border border-white/20 mt-20 md:mt-0 relative z-10 transition-all duration-300 hover:shadow-2xl hover:scale-[1.005] flex flex-col overflow-hidden">
        
        {/* Header Spacer */}
        <header className="flex items-center justify-end px-4 py-1"></header>

        <main className="flex-1 px-4 md:px-6 pb-6 flex flex-col items-center w-full">
            
            <div className="text-center mb-6">
                <h1 className="text-[#0d121b] text-xl md:text-2xl font-extrabold tracking-tight mb-2">
                    Select your experience level
                </h1>
                <p className="text-[#06457F]/80 text-sm md:text-base">Help us tailor your job recommendations and career path.</p>
            </div>

            {/* Grid of Options */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full">
                {levels.map((item) => {
                    const isSelected = selectedLevel === item.label;
                    return (
                        <button
                            key={item.id}
                            onClick={() => setSelectedLevel(item.label)}
                            className={`group relative flex flex-col items-start text-left p-4 bg-white rounded-2xl border-2 transition-all duration-200 focus:outline-none min-h-[120px]
                            ${isSelected 
                                ? 'border-[#135bec] shadow-lg -translate-y-1' 
                                : 'border-transparent shadow-sm hover:border-[#135bec]/30 hover:shadow-md'
                            }`}
                        >
                            {/* Tick Symbol for Selection */}
                            {isSelected && (
                                <div className="absolute top-3 right-3 text-[#135bec]">
                                    <span className="material-symbols-outlined fill-1 text-[22px]">check_circle</span>
                                </div>
                            )}

                            <div className={`mb-3 p-1.5 rounded-lg transition-colors ${
                                isSelected 
                                ? 'bg-[#135bec] text-white' 
                                : 'bg-[#135bec]/10 text-[#135bec]'
                            }`}>
                                <span className="material-symbols-outlined text-[20px]">{item.icon}</span>
                            </div>
                            <div className="mt-auto">
                                <p className="text-[#0d121b] text-base font-bold leading-tight">{item.label}</p>
                                <p className="text-gray-600 text-xs font-normal leading-snug mt-1">{item.sub}</p>
                            </div>
                        </button>
                    );
                })}
            </div>

            {/* Continue Button */}
            <div className="mt-8 w-full flex justify-center">
                <button 
                    onClick={handleContinue}
                    disabled={loading || !selectedLevel}
                    className="flex min-w-[160px] max-w-xs cursor-pointer items-center justify-center overflow-hidden rounded-xl h-11 px-6 bg-[#135bec] text-white text-base font-bold leading-normal tracking-wide shadow-lg hover:bg-[#135bec]/90 transition-all active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                    {loading ? (
                        <>
                            <span className="material-symbols-outlined animate-spin text-[20px] mr-2">progress_activity</span>
                            <span>Processing...</span>
                        </>
                    ) : (
                        <span className="truncate flex items-center gap-2">
                            Continue <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                        </span>
                    )}
                </button>
            </div>

            {/* Privacy Note */}
            <div className="mt-5 flex items-center gap-2 text-[#06457F]/60 text-xs font-medium">
                <span className="material-symbols-outlined text-[14px]">lock</span>
                <span>Your information is kept private</span>
            </div>
        </main>
      </div>
    </div>
  );
};

export default OnboardJobSeekerExperienceLevel;