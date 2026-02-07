import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CareerSwitcherTimeCommitment = () => {
  const navigate = useNavigate();
  const [weeklyHours, setWeeklyHours] = useState('8-12'); // Default
  const [targetTimeline, setTargetTimeline] = useState('6 months'); // Default
  const [loading, setLoading] = useState(false);

  const hourOptions = [
    { id: '5-7', label: '5–7 hrs', sub: 'Light / Balanced', icon: 'calendar_today' },
    { id: '8-12', label: '8–12 hrs', sub: 'Moderate / Steady', icon: 'timer' },
    { id: '15+', label: '15+ hrs', sub: 'Intensive / Fast', icon: 'rocket_launch' }
  ];

  const timelineOptions = [
    { id: '3 months', label: '3 months' },
    { id: '6 months', label: '6 months' },
    { id: '9-12 months', label: '9–12 months' }
  ];

  const handleContinue = async () => {
    setLoading(true);

    // --- MOCK API & LLM LOGIC ---
    try {
        console.log("API: Saving time commitment settings...");
        // 1. Simulate Network Latency
        await new Promise(resolve => setTimeout(resolve, 800)); 

        console.log(`LLM: Calculating roadmap duration based on ${weeklyHours}/week...`);
        console.log(`LLM: Optimizing schedule for ${targetTimeline} target...`);
        // 2. Simulate AI Processing time
        await new Promise(resolve => setTimeout(resolve, 1000)); 

        // Save to local storage
        localStorage.setItem('switcher_time_commitment', JSON.stringify({ weeklyHours, targetTimeline }));
        
        // --- NAVIGATION UPDATE ---
        // Redirect to Concerns page
        navigate('/onboarding/switcher/concerns'); 
        
    } catch (error) {
        console.error("Submission failed", error);
    } finally {
        setLoading(false);
    }
  };

  return (
    <div className="bg-[#06457F] h-screen w-full flex items-center justify-center p-4 font-['Inter'] antialiased relative overflow-hidden">
      
      {/* Internal Styles */}
      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap');
        
        .material-symbols-outlined { font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24; }
        .animate-spin { animation: spin 1s linear infinite; }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        
        /* Custom Scrollbar */
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(0,0,0,0.1); border-radius: 4px; }
      `}} />

      {/* --- LOGO (Top Left) --- */}
      <div className="absolute top-6 left-6 md:top-8 md:left-12 z-50 select-none">
        <div className="flex items-center gap-3">
            <div className="w-9 h-9 md:w-10 md:h-10 rounded-xl bg-gradient-to-tr from-[#0473c3] to-cyan-400 flex items-center justify-center shadow-lg shadow-blue-500/30">
                <span className="material-symbols-outlined text-white text-lg md:text-xl">rocket_launch</span>
            </div>
            <span className="text-xl md:text-2xl font-black tracking-tight text-white">
                Career <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-400">Orbit</span>
            </span>
        </div>
      </div>

      {/* --- MAIN CARD --- */}
      <div className="w-full max-w-[850px] bg-[#A8C4EC] rounded-2xl shadow-2xl flex flex-col relative z-10 mt-12 md:mt-0 max-h-[85vh] border border-white/20">
        
        {/* Header Section */}
        <div className="pt-6 px-8 pb-2 text-center shrink-0">
            <h1 className="text-[#06457F] text-2xl md:text-3xl font-bold leading-tight mb-2">Set your learning pace</h1>
            <p className="text-[#06457F]/80 text-sm md:text-base font-medium">How much time can you commit to your career switch?</p>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto custom-scrollbar px-6 md:px-10 py-4">
            <div className="space-y-6">
                
                {/* Section 1: Weekly Time Commitment */}
                <div className="flex flex-col gap-3">
                    <h3 className="text-[#06457F] text-sm md:text-base font-bold uppercase tracking-wider opacity-90">Weekly Hours</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        {hourOptions.map((opt) => {
                            const isSelected = weeklyHours === opt.id;
                            return (
                                <div 
                                    key={opt.id}
                                    onClick={() => setWeeklyHours(opt.id)}
                                    className={`relative flex flex-col gap-2 rounded-xl border-2 p-4 cursor-pointer transition-all duration-200 group min-h-[100px]
                                    ${isSelected 
                                        ? 'border-[#0473c3] bg-white shadow-md transform -translate-y-1' 
                                        : 'border-transparent bg-white hover:-translate-y-1 hover:border-[#0473c3]/30'
                                    }`}
                                >
                                    <div className="text-[#0473c3] flex justify-between items-start">
                                        <span className="material-symbols-outlined text-[24px]">{opt.icon}</span>
                                        {isSelected && <span className="material-symbols-outlined text-[#0473c3] text-[20px]">check_circle</span>}
                                    </div>
                                    <div className="flex flex-col">
                                        <h2 className="text-[#06457F] text-lg font-bold leading-tight">{opt.label}</h2>
                                        <p className="text-slate-500 text-xs font-medium">{opt.sub}</p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Section 2: Target Switch Timeline */}
                <div className="flex flex-col gap-3">
                    <h3 className="text-[#06457F] text-sm md:text-base font-bold uppercase tracking-wider opacity-90">Target Timeline</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        {timelineOptions.map((opt) => {
                            const isSelected = targetTimeline === opt.id;
                            return (
                                <div 
                                    key={opt.id}
                                    onClick={() => setTargetTimeline(opt.id)}
                                    className={`relative flex items-center gap-3 rounded-xl border-2 p-4 cursor-pointer transition-all duration-200 group
                                    ${isSelected 
                                        ? 'border-[#0473c3] bg-white shadow-md transform -translate-y-1' 
                                        : 'border-transparent bg-white hover:-translate-y-1 hover:border-[#0473c3]/30'
                                    }`}
                                >
                                    <div className="text-[#0473c3]">
                                        <span className="material-symbols-outlined text-[22px]">event_available</span>
                                    </div>
                                    <h2 className="text-[#06457F] text-base font-bold leading-tight flex-1">{opt.label}</h2>
                                    {isSelected && <span className="material-symbols-outlined text-[#0473c3] text-[20px]">check_circle</span>}
                                </div>
                            );
                        })}
                    </div>
                </div>

            </div>
        </div>

        {/* Footer Action */}
        <div className="px-8 pb-6 pt-4 flex flex-col items-center shrink-0 bg-[#A8C4EC] rounded-b-2xl">
            <div className="w-full max-w-[320px] flex flex-col gap-3">
                <button 
                    onClick={handleContinue}
                    disabled={loading}
                    className="w-full h-12 bg-[#0473c3] hover:bg-[#0473c3]/90 text-white font-bold rounded-lg text-base transition-all flex items-center justify-center shadow-lg active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
                >
                    {loading ? (
                        <>
                            <span className="material-symbols-outlined animate-spin text-[20px] mr-2">progress_activity</span>
                            <span>Calibrating...</span>
                        </>
                    ) : (
                        "Continue"
                    )}
                </button>
                
                <button 
                    onClick={() => navigate(-1)}
                    className="text-[#06457F] text-xs font-bold uppercase tracking-wider hover:underline transition-colors"
                >
                    Back
                </button>
            </div>
        </div>

      </div>
    </div>
  );
};

export default CareerSwitcherTimeCommitment;