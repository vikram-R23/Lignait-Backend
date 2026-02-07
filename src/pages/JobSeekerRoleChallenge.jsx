import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const JobSeekerRoleChallenge = () => {
  const navigate = useNavigate();
  const [selectedChallenges, setSelectedChallenges] = useState([]);
  const [loading, setLoading] = useState(false);

  // Challenges Data
  const challenges = [
    { id: 'resume', label: 'Resume not shortlisted' },
    { id: 'tech', label: 'Weak technical skills' },
    { id: 'confidence', label: 'Lack of interview confidence' },
    { id: 'comm', label: 'Poor communication' },
    { id: 'projects', label: 'No real-world projects' },
    { id: 'prep', label: 'Unsure what to prepare' },
  ];

  // Load saved state if exists
  useEffect(() => {
    const savedData = localStorage.getItem('onboarding_challenges');
    if (savedData) {
      const { challenges } = JSON.parse(savedData);
      setSelectedChallenges(challenges || []);
    }
  }, []);

  const toggleChallenge = (id) => {
    setSelectedChallenges(prev => 
      prev.includes(id) 
        ? prev.filter(c => c !== id) 
        : [...prev, id]
    );
  };

  const handleContinue = async () => {
    if (selectedChallenges.length === 0) return;

    setLoading(true);

    // --- MOCK API & LLM LOGIC ---
    try {
        console.log("API: Sending challenges data...");
        // 1. Simulate Network Latency
        await new Promise(resolve => setTimeout(resolve, 800)); 

        console.log(`LLM: Analyzing pain points: ${selectedChallenges.join(', ')}...`);
        console.log("LLM: Generating personalized solutions...");
        // 2. Simulate AI Processing time
        await new Promise(resolve => setTimeout(resolve, 1000)); 

        // Save to local storage
        localStorage.setItem('onboarding_challenges', JSON.stringify({ challenges: selectedChallenges }));
        
        // Navigate to next step (Dashboard or Final Setup)
        navigate('/onboarding/skill-assessment');
    } catch (error) {
        console.error("Submission failed", error);
    } finally {
        setLoading(false);
    }
  };

  return (
    <div className="bg-[#06457F] min-h-screen flex items-center justify-center p-6 font-['Inter'] antialiased relative overflow-hidden">
      
      {/* Styles for Icons & Fonts */}
      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap');
        
        .material-symbols-outlined { font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24; }
        .filled-icon { font-variation-settings: 'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24; }
        
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
      <div className="bg-[#A8C4EC] w-full max-w-[960px] rounded-xl shadow-2xl flex flex-col overflow-hidden relative z-10 mt-16 md:mt-0">
        
        {/* Header Section */}
        <div className="pt-12 px-8 text-center">
            <h1 className="text-[#0d121b] tracking-tight text-[28px] md:text-[32px] font-bold leading-tight pb-2">
                What challenges are you currently facing?
            </h1>
            <p className="text-[#1e293b] text-base font-normal leading-normal">
                This helps us personalize your roadmap.
            </p>
        </div>

        {/* Grid of Challenges */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-8 lg:p-12">
            {challenges.map((item) => {
                const isSelected = selectedChallenges.includes(item.id);
                return (
                    <div 
                        key={item.id}
                        onClick={() => toggleChallenge(item.id)}
                        className={`bg-white p-6 rounded-lg flex flex-col justify-between h-40 cursor-pointer border-2 transition-all duration-200
                        ${isSelected 
                            ? 'border-[#135bec] shadow-lg -translate-y-0.5' 
                            : 'border-transparent hover:shadow-md'
                        }`}
                    >
                        <div className="flex justify-between items-start">
                            <p className="text-[#0d121b] text-lg font-semibold leading-snug">{item.label}</p>
                            <span className={`material-symbols-outlined ${isSelected ? 'text-[#135bec] filled-icon' : 'text-gray-300'}`}>
                                {isSelected ? 'check_box' : 'check_box_outline_blank'}
                            </span>
                        </div>
                        <p className={`text-sm font-medium ${isSelected ? 'text-[#135bec]' : 'text-gray-500'}`}>
                            {isSelected ? 'Currently selected' : 'Select if applicable'}
                        </p>
                    </div>
                );
            })}
        </div>

        {/* Footer / Action Area */}
        <div className="pb-12 px-8 flex justify-center">
            <button 
                onClick={handleContinue}
                disabled={loading || selectedChallenges.length === 0}
                className="flex min-w-[200px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-14 px-10 bg-[#135bec] text-white text-lg font-bold leading-normal tracking-wide shadow-lg hover:bg-blue-700 transition-colors disabled:opacity-70 disabled:cursor-not-allowed active:scale-95"
            >
                {loading ? (
                    <>
                        <span className="material-symbols-outlined animate-spin text-[24px] mr-2">progress_activity</span>
                        <span>Processing...</span>
                    </>
                ) : (
                    <span>Continue</span>
                )}
            </button>
        </div>

      </div>
    </div>
  );
};

export default JobSeekerRoleChallenge;