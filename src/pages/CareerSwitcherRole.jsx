import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CareerSwitcherRole = () => {
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState('Frontend Developer'); 
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);

  const roles = [
    { id: 'frontend', label: 'Frontend Developer', icon: 'code', sub: 'Web Interfaces' },
    { id: 'backend', label: 'Backend Developer', icon: 'terminal', sub: 'Server Logic' },
    { id: 'fullstack', label: 'Full Stack Dev', icon: 'layers', sub: 'End-to-End' },
    { id: 'qa', label: 'QA Engineer', icon: 'bug_report', sub: 'Testing & Automation' },
    { id: 'data', label: 'Data Analyst', icon: 'analytics', sub: 'Insights & Reporting' },
    { id: 'uiux', label: 'UI/UX Designer', icon: 'palette', sub: 'User Experience' },
    { id: 'product', label: 'Product Manager', icon: 'insights', sub: 'Strategy & Roadmap' },
    { id: 'devops', label: 'DevOps Engineer', icon: 'cloud_sync', sub: 'CI/CD & Cloud' },
    { id: 'other', label: 'Other', icon: 'more_horiz', sub: 'Role Not Listed' },
  ];

  // Filter roles based on search
  const filteredRoles = roles.filter(role => 
    role.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleContinue = async () => {
    if (!selectedRole) return;
    setLoading(true);

    // --- MOCK API & LLM LOGIC ---
    try {
        console.log("API: Saving target role preference...");
        // 1. Simulate Network Latency
        await new Promise(resolve => setTimeout(resolve, 800)); 

        console.log(`LLM: Mapping transfer skills to ${selectedRole}...`);
        console.log("LLM: Generating gap analysis...");
        // 2. Simulate AI Processing time
        await new Promise(resolve => setTimeout(resolve, 1000)); 

        // Save to local storage
        localStorage.setItem('switcher_role', JSON.stringify({ role: selectedRole }));
        
        // Navigate to Dashboard
        navigate('/onboarding/switcher/exposure');
        
    } catch (error) {
        console.error("Submission failed", error);
    } finally {
        setLoading(false);
    }
  };

  return (
    <div className="bg-[#06457F] min-h-screen flex items-center justify-center p-4 font-['Inter'] antialiased relative overflow-hidden">
      
      {/* Internal Styles */}
      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap');
        
        .material-symbols-outlined { font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24; }
        .material-symbols-outlined.fill-1 { font-variation-settings: 'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24; }
        .animate-spin { animation: spin 1s linear infinite; }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        
        /* Custom Scrollbar */
        .custom-scrollbar::-webkit-scrollbar { width: 5px; }
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
      <div className="w-full max-w-3xl bg-[#A8C4EC] rounded-2xl shadow-2xl overflow-hidden flex flex-col relative z-10 mt-12 md:mt-0 max-h-[85vh] border border-white/20">
        
        {/* Header Section */}
        <div className="pt-8 px-8 pb-4 text-center shrink-0">
            <h1 className="text-[#06457F] text-2xl md:text-3xl font-extrabold tracking-tight mb-2">
                Target Role
            </h1>
            <p className="text-[#06457F]/80 text-sm font-medium mb-6">
                Choose the tech career you want to transition into.
            </p>

            {/* Compact Search Bar */}
            <div className="relative max-w-sm mx-auto w-full group">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 text-[20px] group-focus-within:text-[#0474C4] transition-colors">search</span>
                <input 
                    type="text" 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-white text-[#06457F] placeholder-slate-400 border border-transparent rounded-lg py-2.5 pl-10 pr-4 focus:ring-2 focus:ring-[#0474C4] focus:bg-white outline-none transition-all shadow-sm text-sm" 
                    placeholder="Filter roles..." 
                />
            </div>
        </div>

        {/* Scrollable Grid Content */}
        <div className="px-6 md:px-8 py-2 overflow-y-auto custom-scrollbar flex-1">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pb-4">
                {filteredRoles.length > 0 ? (
                    filteredRoles.map((role) => {
                        const isSelected = selectedRole === role.label;
                        return (
                            <div 
                                key={role.id}
                                onClick={() => setSelectedRole(role.label)}
                                className={`relative flex flex-col items-center justify-center p-4 rounded-xl cursor-pointer transition-all duration-200 border-2 min-h-[110px] text-center group
                                ${isSelected 
                                    ? 'bg-white border-[#0474C4] shadow-lg transform -translate-y-1 z-10' 
                                    : 'bg-white border-transparent hover:border-[#0474C4]/40 hover:shadow-md'
                                }`}
                            >
                                {isSelected && (
                                    <div className="absolute top-2 right-2 text-[#0474C4]">
                                        <span className="material-symbols-outlined fill-1 text-[20px]">check_circle</span>
                                    </div>
                                )}
                                
                                <div className={`mb-2 p-1.5 rounded-lg transition-colors ${isSelected ? 'bg-[#0474C4] text-white' : 'bg-[#0474C4]/10 text-[#0474C4]'}`}>
                                    <span className="material-symbols-outlined text-[24px] block">{role.icon}</span>
                                </div>
                                
                                <h3 className={`font-bold text-sm leading-tight ${isSelected ? 'text-[#06457F]' : 'text-slate-700'}`}>
                                    {role.label}
                                </h3>
                                <p className="text-[10px] text-slate-500 mt-1 font-medium">{role.sub}</p>
                            </div>
                        );
                    })
                ) : (
                    <div className="col-span-full py-8 text-center text-[#06457F]/60 text-sm">
                        <span className="material-symbols-outlined text-4xl mb-2">search_off</span>
                        <p>No roles found matching "{searchQuery}"</p>
                    </div>
                )}
            </div>
        </div>

        {/* Footer Action */}
        <div className="px-8 pb-8 pt-4 flex flex-col items-center shrink-0 bg-[#A8C4EC]">
            <div className="w-full max-w-[320px] flex flex-col gap-3">
                <button 
                    onClick={handleContinue}
                    disabled={loading || !selectedRole}
                    className="w-full h-12 bg-[#0474C4] hover:bg-[#0474C4]/90 text-white font-bold rounded-lg text-base transition-all flex items-center justify-center shadow-lg active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
                >
                    {loading ? (
                        <>
                            <span className="material-symbols-outlined animate-spin mr-2 text-[20px]">progress_activity</span>
                            <span>Analyzing Path...</span>
                        </>
                    ) : (
                        <span className="flex items-center gap-2">
                            Continue <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
                        </span>
                    )}
                </button>
                
                <button 
                    onClick={() => navigate(-1)}
                    className="text-[#06457F] text-xs font-bold uppercase tracking-wider hover:underline transition-colors"
                >
                    Go Back
                </button>
            </div>
        </div>

      </div>
    </div>
  );
};

export default CareerSwitcherRole;