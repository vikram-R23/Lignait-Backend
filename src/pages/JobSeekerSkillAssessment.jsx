import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const JobSeekerSkillAssessment = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  
  // State for the 4 categories with default values
  const [ratings, setRatings] = useState({
    technical: 'intermediate',
    problemSolving: 'confident',
    communication: 'intermediate',
    readiness: 'beginner'
  });

  const categories = [
    { id: 'technical', label: 'Technical Skills' },
    { id: 'problemSolving', label: 'Problem Solving' },
    { id: 'communication', label: 'Communication' },
    { id: 'readiness', label: 'Interview Readiness' }
  ];

  const options = [
    { value: 'beginner', label: 'Beginner' },
    { value: 'intermediate', label: 'Intermediate' },
    { value: 'confident', label: 'Confident' }
  ];

  const handleRatingChange = (category, value) => {
    setRatings(prev => ({ ...prev, [category]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // --- MOCK API & LLM LOGIC ---
    try {
        console.log("API: Submitting baseline assessment...");
        // 1. Simulate Network Latency
        await new Promise(resolve => setTimeout(resolve, 800)); 

        console.log(`LLM: Analyzing skill gaps: Tech (${ratings.technical}), Comm (${ratings.communication})...`);
        console.log("LLM: Constructing personalized curriculum...");
        console.log("LLM: Finalizing dashboard modules...");
        // 2. Simulate AI Processing time
        await new Promise(resolve => setTimeout(resolve, 1500)); 

        // Save to local storage
        localStorage.setItem('onboarding_skills', JSON.stringify(ratings));
        
        // Final Navigation to Dashboard
        navigate('/onboarding/preferences');
    } catch (error) {
        console.error("Submission failed", error);
    } finally {
        setLoading(false);
    }
  };

  return (
    <div className="bg-[#06457F] min-h-screen flex items-center justify-center p-4 md:p-8 font-['Inter'] antialiased relative">
      
      {/* Styles for Icons & Fonts */}
      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap');
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
      <div className="w-full max-w-2xl bg-[#A8C4EC] rounded-3xl p-5 md:p-8 shadow-xl border border-white/20 mt-20 md:mt-0 relative z-10 transition-all duration-300 hover:shadow-2xl hover:scale-[1.005] flex flex-col">
        
        <div className="text-center mb-6">
            <h1 className="text-[#06457F] text-xl md:text-2xl font-extrabold leading-tight mb-2">
                Assess your baseline
            </h1>
            <p className="text-[#06457F]/80 text-sm md:text-base font-medium max-w-md mx-auto">
                Rate your confidence in these areas to help us personalize your journey.
            </p>
        </div>

        {/* Removed overflow-y-auto and max-h to remove internal scrollbar */}
        <form onSubmit={handleSubmit} className="space-y-5 px-2 md:px-4 pb-4">
            
            {/* Dynamic Rendering of Categories */}
            {categories.map((cat) => (
                <div key={cat.id} className="flex flex-col gap-2">
                    <h3 className="text-[#06457F] text-base font-bold leading-tight tracking-tight pl-1">{cat.label}</h3>
                    <div className="grid grid-cols-3 gap-2">
                        {options.map((opt) => {
                            const isSelected = ratings[cat.id] === opt.value;
                            return (
                                <label key={opt.value} className="cursor-pointer group">
                                    <input 
                                        type="radio" 
                                        name={cat.id} 
                                        value={opt.value}
                                        checked={isSelected}
                                        onChange={() => handleRatingChange(cat.id, opt.value)}
                                        className="hidden" 
                                    />
                                    <div className={`h-10 flex items-center justify-center rounded-lg text-xs md:text-sm font-semibold shadow-sm transition-all duration-200 border
                                        ${isSelected 
                                            ? 'bg-[#0473c3] text-white border-[#0473c3] shadow-md' 
                                            : 'bg-white text-[#06457F] border-transparent group-hover:bg-[#f1f5f9] group-hover:border-[#0473c3]/50 group-hover:-translate-y-[1px]'
                                        }
                                    `}>
                                        {opt.label}
                                    </div>
                                </label>
                            );
                        })}
                    </div>
                </div>
            ))}

            <div className="pt-4 flex flex-col items-center gap-3">
                <button 
                    type="submit" 
                    disabled={loading}
                    className="w-full bg-[#0473c3] hover:bg-[#0362a7] hover:shadow-xl hover:-translate-y-0.5 text-white font-bold py-3 px-6 rounded-xl transition-all duration-200 shadow-lg text-base md:text-lg active:translate-y-0 flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed"
                >
                    {loading ? (
                        <>
                            <span className="material-symbols-outlined animate-spin text-[20px] mr-2">progress_activity</span>
                            <span>Finalizing Profile...</span>
                        </>
                    ) : (
                        "Continue"
                    )}
                </button>
                <button 
                    type="button" 
                    onClick={() => navigate(-1)} 
                    className="text-[#06457F] font-semibold text-xs md:text-sm hover:underline"
                >
                    Back
                </button>
            </div>
        </form>
      </div>
    </div>
  );
};

export default JobSeekerSkillAssessment;