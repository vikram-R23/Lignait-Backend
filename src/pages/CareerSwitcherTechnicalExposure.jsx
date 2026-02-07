import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CareerSwitcherTechnicalExposure = () => {
  const navigate = useNavigate();
  const [selectedExposure, setSelectedExposure] = useState('new'); // Default
  const [loading, setLoading] = useState(false);

  const options = [
    { 
      id: 'new', 
      label: 'Completely new to tech', 
      desc: 'No prior experience in technical roles or tools.', 
      icon: 'auto_awesome' 
    },
    { 
      id: 'basic', 
      label: 'Basic understanding', 
      desc: 'Familiar with basics like HTML, Excel, or productivity tools.', 
      icon: 'table_chart' 
    },
    { 
      id: 'coding', 
      label: 'Some coding experience', 
      desc: 'Have written basic scripts or followed coding tutorials.', 
      icon: 'terminal' 
    },
    { 
      id: 'teams', 
      label: 'Worked with tech teams', 
      desc: 'Familiar with how developers and engineers work together.', 
      icon: 'groups' 
    }
  ];

  const handleContinue = async () => {
    setLoading(true);

    // --- MOCK API & LLM LOGIC ---
    try {
        console.log("API: Saving technical exposure level...");
        // 1. Simulate Network Latency
        await new Promise(resolve => setTimeout(resolve, 800)); 

        console.log(`LLM: Calibrating learning curve for '${selectedExposure}'...`);
        console.log("LLM: Adjusting initial module difficulty...");
        // 2. Simulate AI Processing time
        await new Promise(resolve => setTimeout(resolve, 1000)); 

        // Save to local storage
        localStorage.setItem('switcher_exposure', JSON.stringify({ exposure: selectedExposure }));
        
        // --- NAVIGATION UPDATE ---
        // Redirect to Time Commitment page
        navigate('/onboarding/switcher/time-commitment'); 
        
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
        
        .material-symbols-outlined { font-variation-settings: 'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24; }
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
      <div className="w-full max-w-[550px] bg-[#A8C4EC] rounded-2xl shadow-2xl flex flex-col relative z-10 mt-12 md:mt-0 max-h-[90vh] border border-white/20">
        
        {/* Header (Fixed) */}
        <div className="text-center pt-8 px-8 pb-4 shrink-0">
            <h1 className="text-[#06457F] text-2xl md:text-3xl font-bold tracking-tight mb-2">
                Rate your technical exposure
            </h1>
            <p className="text-[#06457F]/80 text-sm md:text-base leading-relaxed font-medium">
                How familiar are you with the world of technology?
            </p>
        </div>

        {/* Options List (Scrollable) */}
        <div className="flex-1 overflow-y-auto custom-scrollbar px-6 md:px-8 py-2">
            <div className="flex flex-col gap-3">
                {options.map((opt) => {
                    const isSelected = selectedExposure === opt.id;
                    return (
                        <label 
                            key={opt.id} 
                            onClick={() => setSelectedExposure(opt.id)}
                            className="relative cursor-pointer group"
                        >
                            <div className={`flex items-center gap-4 border-2 rounded-xl p-3 md:p-4 transition-all
                                ${isSelected 
                                    ? 'bg-[#f0f7ff] border-[#0473c3] shadow-md' 
                                    : 'bg-white border-transparent hover:shadow-md hover:border-[#0473c3]/30'
                                }`}>
                                
                                <div className="flex h-10 w-10 md:h-12 md:w-12 items-center justify-center rounded-lg bg-[#0473c3]/10 text-[#0473c3] shrink-0">
                                    <span className="material-symbols-outlined text-2xl md:text-3xl">{opt.icon}</span>
                                </div>
                                
                                <div className="flex flex-col grow">
                                    <p className="text-[#06457F] text-sm md:text-base font-bold">{opt.label}</p>
                                    <p className="text-slate-500 text-xs md:text-sm leading-snug">{opt.desc}</p>
                                </div>

                                {isSelected && (
                                    <div className="text-[#0473c3]">
                                        <span className="material-symbols-outlined font-bold">check_circle</span>
                                    </div>
                                )}
                            </div>
                        </label>
                    );
                })}
            </div>
        </div>

        {/* Footer Actions (Fixed) */}
        <div className="p-6 md:p-8 shrink-0 flex flex-col gap-4 bg-[#A8C4EC] rounded-b-2xl">
            <button 
                onClick={handleContinue}
                disabled={loading}
                className="w-full h-12 md:h-14 bg-[#0473c3] hover:bg-[#0362a6] text-white rounded-lg font-bold text-base md:text-lg transition-colors shadow-lg flex items-center justify-center gap-2 active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
            >
                {loading ? (
                    <>
                        <span className="material-symbols-outlined animate-spin text-[24px]">progress_activity</span>
                        <span>Processing...</span>
                    </>
                ) : (
                    <>
                        <span>Continue</span>
                        <span className="material-symbols-outlined">arrow_forward</span>
                    </>
                )}
            </button>
            
            <div className="text-center">
                <button 
                    onClick={() => navigate(-1)}
                    className="text-[#06457F] text-sm font-bold hover:underline inline-flex items-center gap-1 transition-colors"
                >
                    <span className="material-symbols-outlined text-sm">arrow_back</span>
                    Back
                </button>
            </div>
        </div>

      </div>
    </div>
  );
};

export default CareerSwitcherTechnicalExposure;