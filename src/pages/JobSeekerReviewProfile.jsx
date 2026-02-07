import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const JobSeekerReviewProfile = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  
  // State to hold summarized data
  const [summary, setSummary] = useState({
    role: 'Not selected',
    experience: 'Not selected',
    challenges: [],
    preferences: { jobType: '', location: '', domains: [] }
  });

  // Load all data from Local Storage
  useEffect(() => {
    try {
      const roleData = JSON.parse(localStorage.getItem('onboarding_step2')) || {};
      const expData = JSON.parse(localStorage.getItem('onboarding_step3')) || {};
      const chalData = JSON.parse(localStorage.getItem('onboarding_challenges')) || {};
      const prefData = JSON.parse(localStorage.getItem('onboarding_preferences')) || {};

      setSummary({
        role: roleData.role || 'Frontend Developer',
        experience: expData.level || 'Beginner',
        challenges: chalData.challenges || ['None selected'],
        preferences: {
          jobType: prefData.jobType || 'Full-time',
          location: prefData.location || 'Remote',
          domains: prefData.domains || []
        }
      });
    } catch (error) {
      console.error("Error loading profile data", error);
    }
  }, []);

  const handleGenerateRoadmap = async () => {
    setLoading(true);

    // --- MOCK API & LLM LOGIC ---
    try {
        console.log("API: Finalizing user profile...");
        // 1. Simulate Network Latency
        await new Promise(resolve => setTimeout(resolve, 800)); 

        console.log("LLM: Synthesizing all data points...");
        console.log(`LLM: Creating 6-month roadmap for ${summary.role} (${summary.experience})...`);
        console.log("LLM: Generating personalized curriculum modules...");
        // 2. Simulate AI Processing time
        await new Promise(resolve => setTimeout(resolve, 1500)); 

        // Set the flag that unlocks the dashboard content
        localStorage.setItem('roadmap_status', 'true');
        
        // --- UPDATED NAVIGATION: Goes to Welcome Dashboard (Orbit Animation) ---
        navigate('/onboarding/welcome-dashboard');
        
    } catch (error) {
        console.error("Submission failed", error);
    } finally {
        setLoading(false);
    }
  };

  // Helper to format text lists
  const formatList = (items) => {
    if (!items || items.length === 0) return 'None';
    // Capitalize first letter of each item
    return items.map(i => i.charAt(0).toUpperCase() + i.slice(1)).join(', ');
  };

  return (
    <div className="bg-[#06457F] min-h-screen flex items-center justify-center p-6 font-['Inter'] antialiased relative overflow-hidden">
      
      {/* Styles for Icons & Fonts */}
      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700;900&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap');
        .material-symbols-outlined { font-variation-settings: 'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24; }
        .animate-spin { animation: spin 1s linear infinite; }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
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

      <div className="flex h-full grow flex-col items-center justify-center w-full max-w-[1200px] mt-16 md:mt-0 relative z-10">
        
        {/* Summary Card */}
        <div className="flex flex-col w-full max-w-[800px] bg-[#A8C4EC] rounded-xl shadow-2xl overflow-hidden border border-white/20">
            
            {/* Heading */}
            <div className="flex flex-col gap-2 p-8 pb-4 text-center">
                <h1 className="text-[#06457F] text-3xl md:text-4xl font-black leading-tight tracking-[-0.033em]">
                    Review your profile
                </h1>
                <p className="text-[#4B5563] text-lg font-normal leading-normal">
                    We’re ready to build your personalized career roadmap.
                </p>
            </div>

            {/* Data Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 md:p-8">
                
                {/* Target Role */}
                <div className="flex items-start gap-4 p-4 bg-white/40 rounded-lg border border-white/20 hover:bg-white/50 transition-colors">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-[#0473c3] text-white shadow-md">
                        <span className="material-symbols-outlined text-2xl">work</span>
                    </div>
                    <div className="flex flex-col">
                        <p className="text-[#06457F] text-xs font-bold uppercase tracking-wider opacity-80">Target Role</p>
                        <p className="text-[#06457F] text-lg font-bold">{summary.role}</p>
                    </div>
                </div>

                {/* Experience Level */}
                <div className="flex items-start gap-4 p-4 bg-white/40 rounded-lg border border-white/20 hover:bg-white/50 transition-colors">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-[#0473c3] text-white shadow-md">
                        <span className="material-symbols-outlined text-2xl">leaderboard</span>
                    </div>
                    <div className="flex flex-col">
                        <p className="text-[#06457F] text-xs font-bold uppercase tracking-wider opacity-80">Experience Level</p>
                        <p className="text-[#06457F] text-lg font-bold">{summary.experience}</p>
                    </div>
                </div>

                {/* Key Challenges */}
                <div className="flex items-start gap-4 p-4 bg-white/40 rounded-lg border border-white/20 hover:bg-white/50 transition-colors">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-[#0473c3] text-white shadow-md">
                        <span className="material-symbols-outlined text-2xl">psychology</span>
                    </div>
                    <div className="flex flex-col">
                        <p className="text-[#06457F] text-xs font-bold uppercase tracking-wider opacity-80">Key Challenges</p>
                        <p className="text-[#06457F] text-base font-bold leading-tight">
                            {formatList(summary.challenges)}
                        </p>
                    </div>
                </div>

                {/* Job Preferences */}
                <div className="flex items-start gap-4 p-4 bg-white/40 rounded-lg border border-white/20 hover:bg-white/50 transition-colors">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-[#0473c3] text-white shadow-md">
                        <span className="material-symbols-outlined text-2xl">location_on</span>
                    </div>
                    <div className="flex flex-col">
                        <p className="text-[#06457F] text-xs font-bold uppercase tracking-wider opacity-80">Preferences</p>
                        <p className="text-[#06457F] text-base font-bold leading-tight">
                            {summary.preferences.jobType}, {summary.preferences.location}
                        </p>
                        <p className="text-[#06457F] text-xs font-medium opacity-80 mt-1">
                             Targeting: {formatList(summary.preferences.domains)}
                        </p>
                    </div>
                </div>

            </div>

            {/* Action Area */}
            <div className="flex flex-col items-center gap-4 p-8 pt-2 pb-8">
                <div className="flex w-full justify-center">
                    <button 
                        onClick={handleGenerateRoadmap}
                        disabled={loading}
                        className="group relative flex w-full max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-14 px-8 bg-[#0473c3] text-white text-lg font-bold leading-normal tracking-[0.015em] transition-all duration-200 hover:bg-[#035fa1] hover:shadow-lg active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                        {loading ? (
                             <>
                                <span className="material-symbols-outlined animate-spin text-[24px] mr-2">settings_suggest</span>
                                <span>Constructing Roadmap...</span>
                             </>
                        ) : (
                            <>
                                <span className="truncate">Generate My Career Roadmap</span>
                                <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                            </>
                        )}
                    </button>
                </div>
                
                <div className="flex flex-col items-center gap-1">
                    <p className="text-[#06457F]/70 text-sm font-normal">Need to change something?</p>
                    <button 
                        onClick={() => navigate('/onboarding/role')}
                        className="text-[#06457F] text-sm font-bold leading-normal underline decoration-2 underline-offset-4 hover:text-[#0473c3] transition-colors cursor-pointer"
                    >
                        Edit Profile
                    </button>
                </div>
            </div>

        </div>

      </div>
    </div>
  );
};

export default JobSeekerReviewProfile;