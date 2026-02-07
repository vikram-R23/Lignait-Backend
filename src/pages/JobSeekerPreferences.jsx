import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const JobSeekerPreferences = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // State Management
  const [jobType, setJobType] = useState('full-time');
  const [location, setLocation] = useState('remote');
  const [domains, setDomains] = useState(['startups', 'product']);

  const toggleDomain = (value) => {
    if (domains.includes(value)) {
      setDomains(domains.filter((d) => d !== value));
    } else {
      setDomains([...domains, value]);
    }
  };

  const handleContinue = async () => {
    setLoading(true);

    // --- MOCK API & LLM LOGIC ---
    try {
        console.log("API: Saving job preferences...");
        // 1. Simulate Network Latency
        await new Promise(resolve => setTimeout(resolve, 800)); 

        console.log(`LLM: Filtering job market data for ${location} ${jobType} roles...`);
        console.log(`LLM: Prioritizing companies in: ${domains.join(', ')}...`);
        // 2. Simulate AI Processing time
        await new Promise(resolve => setTimeout(resolve, 1000)); 

        // Save to local storage
        localStorage.setItem('onboarding_preferences', JSON.stringify({ jobType, location, domains }));
        
        // --- UPDATED NAVIGATION: Goes to Review Profile ---
        navigate('/onboarding/review');
        
    } catch (error) {
        console.error("Submission failed", error);
    } finally {
        setLoading(false);
    }
  };

  return (
    <div className="bg-[#06457F] min-h-screen flex items-center justify-center p-4 font-['Inter'] antialiased relative overflow-hidden">
      
      {/* Styles for Icons & Fonts */}
      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap');
        .material-symbols-outlined { font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24; }
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

      {/* --- MAIN CONTENT CONTAINER --- */}
      <div className="w-full max-w-[650px] relative z-10 mt-10 md:mt-0">
        
        {/* CARD */}
        <div className="bg-[#A8C4EC] rounded-xl shadow-2xl p-6 md:p-8 flex flex-col gap-6 border border-white/20">
            
            <div className="text-center">
                <h1 className="text-[#06457F] tracking-tight text-2xl md:text-3xl font-bold leading-tight pb-2">Define your job preferences</h1>
                <p className="text-[#374151] text-sm md:text-base font-normal leading-relaxed">
                    This helps us align your roadmap with the right opportunities.
                </p>
            </div>

            <div className="flex flex-col gap-6">
                
                {/* Job Type Section */}
                <div className="flex flex-col gap-3">
                    <h3 className="text-[#1F2937] text-base md:text-lg font-bold leading-tight tracking-tight">Preferred Job Type</h3>
                    <div className="grid grid-cols-2 gap-4">
                        {[
                            { value: 'full-time', label: 'Full-time' },
                            { value: 'internship', label: 'Internship' }
                        ].map((opt) => (
                            <label key={opt.value} className={`relative flex cursor-pointer items-center justify-center rounded-lg p-3 md:p-4 border-2 transition-all shadow-sm group
                                ${jobType === opt.value 
                                    ? 'bg-white border-[#0473c3]' 
                                    : 'bg-white border-transparent hover:border-[#0473c3]/40'
                                }`}>
                                <input 
                                    type="radio" 
                                    name="job_type" 
                                    value={opt.value}
                                    checked={jobType === opt.value}
                                    onChange={() => setJobType(opt.value)}
                                    className="sr-only"
                                />
                                <span className={`font-semibold text-sm md:text-base ${jobType === opt.value ? 'text-[#0473c3]' : 'text-[#4B5563]'}`}>{opt.label}</span>
                                {jobType === opt.value && (
                                    <span className="absolute top-2 right-2 material-symbols-outlined text-[#0473c3] text-sm">check_circle</span>
                                )}
                            </label>
                        ))}
                    </div>
                </div>

                {/* Location Section */}
                <div className="flex flex-col gap-3">
                    <h3 className="text-[#1F2937] text-base md:text-lg font-bold leading-tight tracking-tight">Work Location</h3>
                    <div className="grid grid-cols-3 gap-3 md:gap-4">
                        {[
                            { value: 'remote', label: 'Remote', icon: 'house' },
                            { value: 'onsite', label: 'Onsite', icon: 'apartment' },
                            { value: 'hybrid', label: 'Hybrid', icon: 'corporate_fare' }
                        ].map((opt) => (
                            <label key={opt.value} className={`relative flex flex-col items-center gap-2 cursor-pointer rounded-lg p-4 border-2 transition-all shadow-sm group
                                ${location === opt.value 
                                    ? 'bg-white border-[#0473c3]' 
                                    : 'bg-white border-transparent hover:border-[#0473c3]/40'
                                }`}>
                                <input 
                                    type="radio" 
                                    name="location" 
                                    value={opt.value}
                                    checked={location === opt.value}
                                    onChange={() => setLocation(opt.value)}
                                    className="sr-only"
                                />
                                <span className={`material-symbols-outlined text-2xl md:text-3xl ${location === opt.value ? 'text-[#0473c3]' : 'text-gray-400'}`}>{opt.icon}</span>
                                <span className={`text-xs md:text-sm font-semibold ${location === opt.value ? 'text-[#0473c3]' : 'text-[#4B5563]'}`}>{opt.label}</span>
                                {location === opt.value && (
                                    <span className="absolute top-1 right-1 md:top-2 md:right-2 material-symbols-outlined text-[#0473c3] text-[16px]">check_circle</span>
                                )}
                            </label>
                        ))}
                    </div>
                </div>

                {/* Domains Section */}
                <div className="flex flex-col gap-3">
                    <h3 className="text-[#1F2937] text-base md:text-lg font-bold leading-tight tracking-tight">Preferred Domains</h3>
                    <div className="flex flex-wrap gap-2 md:gap-3">
                        {[
                            { value: 'startups', label: 'Startups' },
                            { value: 'product', label: 'Product Companies' },
                            { value: 'service', label: 'Service Companies' },
                            { value: 'bigtech', label: 'Big Tech' }
                        ].map((opt) => {
                            const isSelected = domains.includes(opt.value);
                            return (
                                <label key={opt.value} className="cursor-pointer">
                                    <input 
                                        type="checkbox" 
                                        checked={isSelected}
                                        onChange={() => toggleDomain(opt.value)}
                                        className="sr-only"
                                    />
                                    <span className={`px-4 py-2 rounded-full border text-xs md:text-sm font-semibold transition-all inline-block shadow-sm
                                        ${isSelected 
                                            ? 'bg-[#0473c3]/10 border-[#0473c3] text-[#0473c3]' 
                                            : 'bg-white border-gray-200 text-gray-600'
                                        }`}>
                                        {opt.label}
                                    </span>
                                </label>
                            );
                        })}
                    </div>
                </div>

            </div>

            {/* Action Buttons */}
            <div className="flex flex-col gap-3 mt-2">
                <button 
                    onClick={handleContinue}
                    disabled={loading}
                    className="w-full bg-[#0473c3] hover:bg-[#0473c3]/90 text-white font-bold py-3.5 rounded-lg transition-colors shadow-lg shadow-[#0473c3]/30 flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed text-base"
                >
                    {loading ? (
                        <>
                            <span className="material-symbols-outlined animate-spin text-[20px] mr-2">progress_activity</span>
                            <span>Saving...</span>
                        </>
                    ) : (
                        "Continue"
                    )}
                </button>
                <button 
                    onClick={() => navigate(-1)}
                    className="w-full text-[#06457F] hover:underline text-sm font-semibold py-2 transition-colors"
                >
                    Back
                </button>
            </div>
        </div>

      </div>
    </div>
  );
};

export default JobSeekerPreferences;