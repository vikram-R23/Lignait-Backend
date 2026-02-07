import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CareerSwitcherConcerns = () => {
  const navigate = useNavigate();
  const [selectedConcerns, setSelectedConcerns] = useState(['tech_gap']); // Default pre-selected
  const [loading, setLoading] = useState(false);

  const concerns = [
    { id: 'interview_fear', label: 'Fear of interviews', sub: 'Conquering the stage', icon: 'record_voice_over' },
    { id: 'tech_gap', label: 'Lack of technical background', sub: 'Bridging the skill gap', icon: 'terminal' },
    { id: 'age_mismatch', label: 'Age / experience mismatch', sub: 'Valuing your journey', icon: 'history_edu' },
    { id: 'resume', label: 'Resume relevance', sub: 'Translating your impact', icon: 'description' },
    { id: 'job_gap', label: 'Job gap concerns', sub: 'Framing your break', icon: 'event_busy' },
    { id: 'start_point', label: 'Unsure where to start', sub: 'Finding the first step', icon: 'explore' },
  ];

  const toggleConcern = (id) => {
    if (selectedConcerns.includes(id)) {
      setSelectedConcerns(selectedConcerns.filter((c) => c !== id));
    } else {
      setSelectedConcerns([...selectedConcerns, id]);
    }
  };

  const handleContinue = async () => {
    setLoading(true);

    // --- MOCK API & LLM LOGIC ---
    try {
        console.log("API: Saving user concerns...");
        // 1. Simulate Network Latency
        await new Promise(resolve => setTimeout(resolve, 800)); 

        console.log(`LLM: Injecting confidence-building modules for: ${selectedConcerns.join(', ')}...`);
        console.log("LLM: Customizing 'Soft Skills' curriculum section...");
        // 2. Simulate AI Processing time
        await new Promise(resolve => setTimeout(resolve, 1000)); 

        // Save to local storage
        localStorage.setItem('switcher_concerns', JSON.stringify({ concerns: selectedConcerns }));
        
        // --- NAVIGATION UPDATE ---
        // As requested: Navigate directly to the Review page
        navigate('/onboarding/switcher/review'); 
        
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
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
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
        
        {/* Header (Fixed) */}
        <div className="flex flex-col gap-2 text-center md:text-left px-8 pt-6 pb-2 shrink-0">
            <h1 className="text-[#06457F] text-2xl md:text-3xl font-black leading-tight tracking-[-0.033em]">
                What’s on your mind?
            </h1>
            <p className="text-[#06457F]/80 text-sm md:text-base font-normal leading-normal max-w-2xl">
                It’s normal to have concerns. We’re here to help you overcome them.
            </p>
        </div>

        {/* Scrollable Grid Selection */}
        <div className="flex-1 overflow-y-auto custom-scrollbar px-6 md:px-10 py-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {concerns.map((concern) => {
                    const isSelected = selectedConcerns.includes(concern.id);
                    return (
                        <div 
                            key={concern.id}
                            onClick={() => toggleConcern(concern.id)}
                            className={`flex flex-col gap-2 p-4 bg-white rounded-xl cursor-pointer transition-all duration-200 group border-2 relative min-h-[100px]
                            ${isSelected 
                                ? 'border-[#0474C4] shadow-md transform -translate-y-1' 
                                : 'border-transparent hover:border-[#0474C4]/30 hover:-translate-y-1 hover:shadow-lg'
                            }`}
                        >
                            <div className="flex justify-between items-start">
                                <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-[#0473c3]/10 text-[#0473c3]">
                                    <span className="material-symbols-outlined text-2xl">{concern.icon}</span>
                                </div>
                                {isSelected && (
                                    <div className="block">
                                        <span className="material-symbols-outlined text-[#0473c3] text-[20px]">check_circle</span>
                                    </div>
                                )}
                            </div>
                            <div>
                                <p className="text-[#06457F] text-sm font-bold leading-tight">{concern.label}</p>
                                <p className="text-slate-500 text-xs mt-1 leading-snug">{concern.sub}</p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>

        {/* Footer Actions (Fixed) */}
        <div className="px-8 pb-6 pt-2 flex flex-col items-center gap-3 shrink-0 bg-[#A8C4EC] rounded-b-2xl">
            <p className="text-[#06457F] text-xs font-medium leading-normal text-center italic opacity-70">
                Don’t worry, your AI roadmap will specifically address these areas.
            </p>
            
            <div className="w-full max-w-[320px] flex flex-col gap-3">
                <button 
                    onClick={handleContinue}
                    disabled={loading}
                    className="flex w-full cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 bg-[#0473c3] text-white text-base font-bold leading-normal tracking-[0.015em] hover:bg-[#0362a8] transition-colors shadow-lg active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
                >
                    {loading ? (
                        <>
                            <span className="material-symbols-outlined animate-spin mr-2 text-[20px]">progress_activity</span>
                            <span>Processing...</span>
                        </>
                    ) : (
                        <span className="truncate">Continue</span>
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

export default CareerSwitcherConcerns;