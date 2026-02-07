import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const CareerSwitcherReview = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  
  // State for summarized data
  const [summary, setSummary] = useState({
    background: 'Not selected',
    targetRole: 'Not selected',
    concerns: [],
    exposure: 'Not selected',
    time: { weekly: 'Not set', timeline: 'Not set' }
  });

  // Load Data on Mount
  useEffect(() => {
    try {
      const bgData = JSON.parse(localStorage.getItem('switcher_background')) || {};
      const roleData = JSON.parse(localStorage.getItem('switcher_role')) || {};
      const concernsData = JSON.parse(localStorage.getItem('switcher_concerns')) || {};
      const exposureData = JSON.parse(localStorage.getItem('switcher_exposure')) || {};
      const timeData = JSON.parse(localStorage.getItem('switcher_time_commitment')) || {};

      setSummary({
        background: bgData.background || 'Non-Tech',
        targetRole: roleData.role || 'Full Stack Developer',
        concerns: concernsData.concerns || [],
        exposure: exposureData.exposure || 'New to Tech',
        time: {
          weekly: timeData.weeklyHours || '10-15 hrs',
          timeline: timeData.targetTimeline || '6 months'
        }
      });
    } catch (error) {
      console.error("Error loading switcher data", error);
    }
  }, []);

  const handleBuildRoadmap = async () => {
    setLoading(true);

    // --- MOCK API & LLM LOGIC ---
    try {
        console.log("API: Finalizing switcher profile...");
        // 1. Simulate Network Latency
        await new Promise(resolve => setTimeout(resolve, 800)); 

        console.log("LLM: Synthesizing transferrable skills...");
        console.log(`LLM: Bridging gap from ${summary.background} to ${summary.targetRole}...`);
        console.log("LLM: Generating personalized curriculum modules...");
        // 2. Simulate AI Processing time
        await new Promise(resolve => setTimeout(resolve, 2000)); 

        // Set flag for dashboard
        localStorage.setItem('roadmap_status', 'true');
        
        // --- NAVIGATION UPDATE (FORWARD) ---
        // Navigate to the Career Switcher specific Welcome Dashboard
        navigate('/onboarding/switcher/welcome-dashboard'); 
        
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
      <div className="w-full max-w-[900px] bg-[#A8C4EC] rounded-2xl shadow-2xl flex flex-col relative z-10 mt-12 md:mt-0 max-h-[85vh] border border-white/20">
        
        {/* Header Section */}
        <div className="pt-8 px-8 pb-4 text-center shrink-0">
            <h1 className="text-[#06457F] text-3xl md:text-4xl font-black leading-tight tracking-tight mb-2">
                Ready for your new journey?
            </h1>
            <p className="text-slate-700 text-base md:text-lg font-medium">
                Review your path before we build your roadmap.
            </p>
        </div>

        {/* Scrollable Data Grid */}
        <div className="flex-1 overflow-y-auto custom-scrollbar px-6 md:px-10 py-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 md:gap-y-6 pb-6">
                
                {/* Data Point 1 */}
                <div className="flex items-start gap-4 border-t border-[#06457F]/10 py-4">
                    <div className="bg-[#06457F]/10 p-2 rounded-lg text-[#06457F] shrink-0">
                        <span className="material-symbols-outlined text-2xl">work</span>
                    </div>
                    <div className="flex flex-col">
                        <p className="text-slate-600 text-xs font-bold uppercase tracking-wider mb-1">Current Background</p>
                        <p className="text-[#06457F] text-base md:text-lg font-bold leading-tight">{summary.background}</p>
                    </div>
                </div>

                {/* Data Point 2 */}
                <div className="flex items-start gap-4 border-t border-[#06457F]/10 py-4">
                    <div className="bg-[#06457F]/10 p-2 rounded-lg text-[#06457F] shrink-0">
                        <span className="material-symbols-outlined text-2xl">target</span>
                    </div>
                    <div className="flex flex-col">
                        <p className="text-slate-600 text-xs font-bold uppercase tracking-wider mb-1">Target Career</p>
                        <p className="text-[#06457F] text-base md:text-lg font-bold leading-tight">{summary.targetRole}</p>
                    </div>
                </div>

                {/* Data Point 3 */}
                <div className="flex items-start gap-4 border-t border-[#06457F]/10 py-4">
                    <div className="bg-[#06457F]/10 p-2 rounded-lg text-[#06457F] shrink-0">
                        <span className="material-symbols-outlined text-2xl">psychology</span>
                    </div>
                    <div className="flex flex-col">
                        <p className="text-slate-600 text-xs font-bold uppercase tracking-wider mb-1">Top Concern</p>
                        <p className="text-[#06457F] text-base md:text-lg font-bold leading-tight">
                            {summary.concerns.length > 0 ? summary.concerns[0].replace('_', ' ') : 'None'}
                            {summary.concerns.length > 1 && <span className="text-sm font-normal opacity-70 ml-1">(+{summary.concerns.length - 1} more)</span>}
                        </p>
                    </div>
                </div>

                {/* Data Point 4 */}
                <div className="flex items-start gap-4 border-t border-[#06457F]/10 py-4">
                    <div className="bg-[#06457F]/10 p-2 rounded-lg text-[#06457F] shrink-0">
                        <span className="material-symbols-outlined text-2xl">schedule</span>
                    </div>
                    <div className="flex flex-col">
                        <p className="text-slate-600 text-xs font-bold uppercase tracking-wider mb-1">Commitment</p>
                        <p className="text-[#06457F] text-base md:text-lg font-bold leading-tight">
                            {summary.time.weekly} hrs/wk • {summary.time.timeline}
                        </p>
                    </div>
                </div>

            </div>

            {/* Motivational Box */}
            <div className="bg-white/40 rounded-xl p-4 md:p-6 text-center mb-6">
                <div className="flex flex-col gap-2 items-center">
                    <p className="text-[#06457F] text-base md:text-lg font-bold leading-tight flex items-center gap-2">
                        <span className="material-symbols-outlined text-[#0473c3]">auto_awesome</span>
                        Empowering Your Transition
                    </p>
                    <p className="text-slate-700 text-sm md:text-base font-medium leading-relaxed max-w-xl">
                        Many professionals successfully switch careers. Your roadmap is designed to leverage your existing strengths and bridge the gaps efficiently.
                    </p>
                </div>
            </div>
        </div>

        {/* Footer Actions */}
        <div className="px-8 pb-8 pt-2 flex flex-col items-center gap-3 shrink-0 bg-[#A8C4EC] rounded-b-2xl">
            <button 
                onClick={handleBuildRoadmap}
                disabled={loading}
                className="w-full max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 md:h-14 px-8 bg-[#0473c3] hover:bg-[#0362a8] transition-all transform hover:scale-[1.01] active:scale-95 text-white text-base md:text-lg font-bold leading-normal tracking-wide shadow-lg flex gap-3 disabled:opacity-70 disabled:cursor-not-allowed"
            >
                {loading ? (
                    <>
                        <span className="material-symbols-outlined animate-spin">settings_suggest</span>
                        <span>Constructing Roadmap...</span>
                    </>
                ) : (
                    <>
                        <span className="truncate">Build My Career Roadmap</span>
                        <span className="material-symbols-outlined">arrow_forward</span>
                    </>
                )}
            </button>
            
            {/* --- NAVIGATION UPDATE (BACKWARD) --- */}
            {/* Navigates back to the start of the switcher flow */}
            <button 
                onClick={() => navigate('/onboarding/switcher/background')}
                className="text-[#06457F]/70 text-sm font-semibold hover:text-[#06457F] transition-colors underline underline-offset-4 cursor-pointer"
            >
                Edit Profile Details
            </button>
        </div>

      </div>
    </div>
  );
};

export default CareerSwitcherReview;