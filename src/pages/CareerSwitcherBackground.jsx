import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CareerSwitcherBackground = () => {
  const navigate = useNavigate();
  const [selectedId, setSelectedId] = useState('it-software'); 
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);

  const options = [
    { id: 'non-tech', label: 'Non-Tech', sub: 'Sales, Marketing, HR, Finance', icon: 'work' },
    { id: 'engineering', label: 'Engineering', sub: 'Mechanical, Civil, Electrical', icon: 'engineering' },
    { id: 'it-software', label: 'IT / Software', sub: 'Non-coding role', icon: 'terminal' },
    { id: 'design', label: 'Design / Creative', sub: 'UI/UX, Graphic, Multimedia', icon: 'palette' },
    { id: 'student', label: 'Student / Fresher', sub: 'Recent graduate or still studying', icon: 'school' },
    { id: 'other', label: 'Other', sub: 'Specify background', icon: 'more_horiz' },
  ];

  // Filter logic
  const filteredOptions = options.filter(opt => 
    opt.label.toLowerCase().includes(searchQuery.toLowerCase()) || 
    opt.sub.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleContinue = async () => {
    setLoading(true);

    // --- MOCK API & LLM LOGIC ---
    try {
        console.log("API: Sending switcher background data...");
        // 1. Simulate Network Latency
        await new Promise(resolve => setTimeout(resolve, 800)); 

        console.log(`LLM: Analyzing transferrable skills for '${selectedId}'...`);
        console.log("LLM: Identifying skill gaps for target tech roles...");
        // 2. Simulate AI Processing time
        await new Promise(resolve => setTimeout(resolve, 1000)); 

        // Save to local storage
        localStorage.setItem('switcher_background', JSON.stringify({ background: selectedId }));
        
        // --- NAVIGATION UPDATE ---
        // Redirect to the Role Selection page for Switchers
        navigate('/onboarding/switcher/role');
        
    } catch (error) {
        console.error("Submission failed", error);
    } finally {
        setLoading(false);
    }
  };

  return (
    <div className="bg-[#06457F] min-h-screen flex items-center justify-center font-['Manrope'] p-4 overflow-hidden relative">
      
      {/* Internal Styles */}
      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap');
        
        .material-symbols-outlined { font-variation-settings: 'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24; }
        .animate-spin { animation: spin 1s linear infinite; }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        
        /* Custom Scrollbar for grid if needed on very small screens */
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
      <div className="bg-[#A8C4EC] w-full max-w-3xl rounded-2xl shadow-2xl overflow-hidden flex flex-col relative z-10 mt-12 md:mt-0 max-h-[85vh]">
        
        {/* Header */}
        <div className="px-6 pt-8 pb-4 text-center shrink-0">
            <h1 className="text-[#06457F] text-2xl md:text-3xl font-extrabold tracking-tight mb-2">
                What is your current background?
            </h1>
            <p className="text-[#06457F]/80 text-sm md:text-base font-medium">
                Select the option that best describes your journey.
            </p>
        </div>

        {/* SEARCH BAR */}
        <div className="px-6 pb-2 shrink-0">
            <div className="relative max-w-md mx-auto w-full group">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 text-[20px] group-focus-within:text-[#0473c3] transition-colors">search</span>
                <input 
                    type="text" 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search backgrounds..." 
                    className="w-full bg-white border border-slate-300 text-[#06457F] rounded-lg py-2 pl-10 pr-4 focus:ring-1 focus:ring-[#0473c3] focus:border-[#0473c3] outline-none placeholder-slate-400 shadow-sm transition-all h-10 text-sm"
                />
            </div>
        </div>

        {/* Grid Selection */}
        <div className="px-6 py-4 overflow-y-auto custom-scrollbar">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {filteredOptions.length > 0 ? (
                    filteredOptions.map((option) => {
                        const isSelected = selectedId === option.id;
                        return (
                            <div 
                                key={option.id}
                                onClick={() => setSelectedId(option.id)}
                                className={`relative group flex flex-col items-start p-4 rounded-xl cursor-pointer bg-white transition-all duration-200 border-2 min-h-[130px]
                                ${isSelected 
                                    ? 'border-[#0473c3] shadow-lg -translate-y-1 ring-1 ring-[#0473c3]/10' 
                                    : 'border-transparent hover:border-[#0473c3]/30 hover:shadow-md'
                                }`}
                            >
                                {/* Tick Icon */}
                                {isSelected && (
                                    <div className="absolute top-3 right-3 text-[#0473c3]">
                                        <span className="material-symbols-outlined text-[22px] font-bold">check_circle</span>
                                    </div>
                                )}
                                
                                <div className={`mb-3 p-1.5 rounded-lg transition-colors inline-block ${
                                    isSelected ? 'bg-[#0473c3] text-white' : 'bg-[#0473c3]/10 text-[#0473c3]'
                                }`}>
                                    <span className="material-symbols-outlined text-[24px] block">{option.icon}</span>
                                </div>

                                <div className="mt-auto">
                                    <p className="text-[#06457F] text-base font-bold leading-tight mb-1">{option.label}</p>
                                    <p className="text-slate-500 text-xs leading-snug">{option.sub}</p>
                                </div>
                            </div>
                        );
                    })
                ) : (
                    <div className="col-span-full text-center py-8 text-[#06457F]/60">
                        No backgrounds found.
                    </div>
                )}
            </div>
        </div>

        {/* Footer / Continue */}
        <div className="px-6 pb-8 pt-4 shrink-0 flex flex-col items-center">
            <button 
                onClick={handleContinue}
                disabled={loading}
                className="w-full max-w-sm h-12 bg-[#0473c3] hover:bg-[#035fa1] text-white text-base font-bold rounded-lg transition-all duration-200 flex items-center justify-center gap-2 shadow-lg active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
            >
                {loading ? (
                    <>
                        <span className="material-symbols-outlined animate-spin text-[20px]">progress_activity</span>
                        <span>Processing Profile...</span>
                    </>
                ) : (
                    <>
                        <span>Continue</span>
                        <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
                    </>
                )}
            </button>
            <div className="mt-3 text-center">
                <p className="text-[#06457F]/60 text-[10px] font-bold uppercase tracking-widest">Step 1 of 4</p>
            </div>
        </div>

      </div>

      {/* Background Pattern */}
      <div className="fixed top-0 left-0 w-full h-full -z-10 opacity-20 pointer-events-none">
         <div className="w-full h-full bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:40px_40px]"></div>
      </div>

    </div>
  );
};

export default CareerSwitcherBackground;