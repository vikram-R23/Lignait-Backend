import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const OnboardJobSeekerRole = () => {
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState('Frontend Developer'); // Default selection
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Pre-defined roles matching your HTML structure
  const roles = [
    { id: 'frontend', label: 'Frontend Developer', icon: 'code', sub: 'Build user interfaces' },
    { id: 'backend', label: 'Backend Developer', icon: 'database', sub: 'Manage servers & APIs' },
    { id: 'fullstack', label: 'Full Stack Developer', icon: 'layers', sub: 'Complete web solutions' },
    { id: 'qa', label: 'QA / Testing', icon: 'fact_check', sub: 'Quality assurance' },
    { id: 'data', label: 'Data Analyst', icon: 'insights', sub: 'Data insights' },
    { id: 'uiux', label: 'UI/UX Designer', icon: 'palette', sub: 'Design experiences' },
  ];

  // Load saved state if exists (Persist on refresh)
  useEffect(() => {
    const savedData = localStorage.getItem('onboarding_step2');
    if (savedData) {
      const { role } = JSON.parse(savedData);
      const isPredefined = roles.some(r => r.label === role);
      if (isPredefined) {
        setSelectedRole(role);
      }
    }
  }, []);

  const handleCardClick = (roleLabel) => {
    setSelectedRole(roleLabel);
  };

  const handleContinue = async () => {
    if (!selectedRole) return;

    setLoading(true);

    // --- MOCK API & LLM LOGIC ---
    try {
        console.log("API: Sending role preference to backend...");
        // 1. Simulate Network Latency
        await new Promise(resolve => setTimeout(resolve, 800)); 

        console.log(`LLM: Analyzing career path requirements for '${selectedRole}'...`);
        console.log("LLM: Generating skill recommendations based on role...");
        // 2. Simulate AI Processing time
        await new Promise(resolve => setTimeout(resolve, 1000)); 

        // Save to local storage for the next step to use
        localStorage.setItem('onboarding_step2', JSON.stringify({ role: selectedRole }));
        
        // Navigate to next step
        navigate('/onboarding/jobseekexperience');
    } catch (error) {
        console.error("Submission failed", error);
    } finally {
        setLoading(false);
    }
  };

  // Filter roles based on search
  const filteredRoles = roles.filter(role => 
    role.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="bg-[#06457F] min-h-screen flex items-center justify-center p-4 md:p-8 font-['Inter'] antialiased relative overflow-hidden">
      
      {/* Internal Styles for specific HTML overrides */}
      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap');
        
        .card-transition { transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1); }
        .card-text { color: #262B40; }
        
        /* Fill variation for the Check Icon */
        .material-symbols-outlined.fill-1 { font-variation-settings: 'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24; }
        .material-symbols-outlined { font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24; }

        /* Loading Spinner Animation */
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .animate-spin { animation: spin 1s linear infinite; }
        
        /* Custom Scrollbar for the grid area */
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(0,0,0,0.1); border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(0,0,0,0.2); }
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
      <div className="w-full max-w-3xl bg-[#A8C4EC] rounded-3xl p-5 md:p-8 shadow-xl border border-white/20 mt-20 md:mt-0 relative z-10 transition-all duration-300 hover:shadow-2xl hover:scale-[1.005] flex flex-col overflow-hidden">
        
        <header className="text-center mb-6">
            <h1 className="text-xl md:text-2xl font-extrabold text-slate-900 mb-2">
                What role are you preparing for?
            </h1>
            <p className="text-slate-700 text-sm md:text-base">
                Choose your primary career focus.
            </p>
        </header>

        {/* SEARCH BAR & FILTER */}
        <div className="mb-6 relative max-w-md mx-auto w-full px-2">
            <div className="relative flex items-center group">
                <span className="material-symbols-outlined absolute left-3 text-slate-500 text-[20px] group-focus-within:text-[#0072CE] transition-colors">search</span>
                <input 
                    type="text" 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search for a role..." 
                    className="w-full bg-white border border-slate-300 text-black rounded-lg py-2 pl-10 pr-10 focus:ring-1 focus:ring-[#0072CE] focus:border-[#0072CE] outline-none placeholder-slate-400 shadow-sm transition-all h-10 text-sm"
                />
                <button className="absolute right-2 p-1 text-slate-500 hover:text-[#0072CE] transition-colors rounded-full hover:bg-slate-100">
                    <span className="material-symbols-outlined text-[20px]">filter_list</span>
                </button>
            </div>
        </div>

        {/* Roles Grid - Equal Size Logic Applied + Compact */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 mb-6 max-h-[400px] overflow-y-auto p-2 custom-scrollbar auto-rows-fr">
            {filteredRoles.length > 0 ? (
                filteredRoles.map((role) => {
                    const isSelected = selectedRole === role.label;
                    return (
                        <button 
                            key={role.id}
                            onClick={() => handleCardClick(role.label)}
                            className={`card-transition relative flex flex-col items-start p-4 rounded-2xl text-left outline-none focus:outline-none focus:ring-0 w-full h-full min-h-[120px]
                            ${isSelected 
                                ? 'bg-white border-2 border-[#0072CE] shadow-lg -translate-y-1 z-10' 
                                : 'bg-white border-2 border-transparent shadow-sm hover:border-[#0072CE]/30 hover:shadow-md'
                            }`}
                        >
                            {/* Tick Symbol for Selection */}
                            {isSelected && (
                                <div className="absolute top-2 right-2 text-[#0072CE]">
                                    <span className="material-symbols-outlined fill-1 text-[20px]">check_circle</span>
                                </div>
                            )}

                            <div className={`mb-3 p-1.5 rounded-lg transition-colors inline-block ${
                                isSelected ? 'bg-[#0072CE] text-white' : 'bg-[#0072CE]/10 text-[#0072CE]'
                            }`}>
                                <span className="material-symbols-outlined text-[20px] block">
                                    {role.icon}
                                </span>
                            </div>
                            
                            <div className="mt-auto w-full">
                                <h3 className="font-bold text-base leading-tight text-[#262B40]">{role.label}</h3>
                                <p className="text-slate-500 text-xs mt-1 leading-snug">{role.sub}</p>
                            </div>
                        </button>
                    );
                })
            ) : (
                <div className="col-span-full text-center py-8 text-slate-600">
                    <p>No roles found matching "{searchQuery}"</p>
                </div>
            )}
        </div>

        {/* Footer Actions */}
        <div className="flex flex-col items-center mt-auto">
            <button 
                onClick={handleContinue}
                disabled={loading || !selectedRole}
                className="w-full max-w-xs bg-[#0072CE] hover:bg-[#0072CE]/90 text-white font-bold py-3 px-8 rounded-xl flex items-center justify-center gap-2 transition-transform active:scale-95 shadow-lg shadow-[#0072CE]/20 disabled:opacity-70 disabled:cursor-not-allowed"
            >
                {loading ? (
                    <>
                        <span className="material-symbols-outlined animate-spin text-[20px]">progress_activity</span>
                        <span>Processing...</span>
                    </>
                ) : (
                    <>
                        Continue
                        <span className="material-symbols-outlined">arrow_forward</span>
                    </>
                )}
            </button>
            <p className="mt-4 text-[#06457F]/60 text-xs font-medium flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px]">lock</span>
                You can change this later in your profile settings.
            </p>
        </div>
      </div>

    </div>
  );
};

export default OnboardJobSeekerRole;