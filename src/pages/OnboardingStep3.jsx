import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const OnboardingStep3 = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState('');
  
  // State for pop-up visibility and tracking
  const [showExperienceModal, setShowExperienceModal] = useState(false);
  const [pendingSkill, setPendingSkill] = useState('');

  // 'experience' tracks the temporary selection in the modal
  const [experience, setExperience] = useState('intermediate');
  
  // 'skills' now stores objects: { name: 'Java', level: 'beginner' }
  const [skills, setSkills] = useState([
    { name: 'Communication', level: 'intermediate' }
  ]);
  
  const [skillInput, setSkillInput] = useState('');

  const availableSkills = [
    'Java', 'Python', 'Communication', 'UI/UX', 'Project Management', 
    'React', 'Node.js', 'SQL', 'Data Analysis', 'Leadership',
    'Marketing', 'Sales', 'Public Speaking', 'C++', 'Machine Learning',
    'None / Just Starting' 
  ];

  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem('onboarding_data') || '{}');
    if (savedData.skills && savedData.skills.length > 0) {
       const formattedSkills = typeof savedData.skills[0] === 'string' 
            ? savedData.skills.map(s => ({ name: s, level: 'intermediate' }))
            : savedData.skills;
       setSkills(formattedSkills);
    }
  }, []);

  const handleFinish = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // 1. GATHER ALL DATA
      const token = localStorage.getItem('token');
      if (!token) throw new Error("Not authenticated. Please login.");

      const collectedData = JSON.parse(localStorage.getItem('onboarding_data') || '{}');
      
      const finalProfileData = {
        ...collectedData,
        skills: skills 
      };

      // 2. SAVE PROFILE TO BACKEND
      setLoadingMessage("Saving your profile...");
      
      const profileResponse = await fetch('http://localhost:5000/api/profile', {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(finalProfileData)
      });

      if (!profileResponse.ok) {
        const errData = await profileResponse.json();
        throw new Error(errData.message || "Failed to save profile");
      }

      // --- CHANGE: REMOVED AI ROADMAP GENERATION FROM HERE ---
      // We only save the data and move to the Welcome Page.
      // The AI Roadmap generation will happen on the Dashboard later.

      // 3. CLEANUP & NAVIGATE
      localStorage.removeItem('onboarding_data'); 
      
      setLoadingMessage("Profile Saved!");
      
      setTimeout(() => {
          // ✅ Navigate to the Welcome Page
          navigate('/dashboard/welcome'); 
      }, 500);

    } catch (error) {
      console.error(error);
      alert(error.message || "Something went wrong.");
      setLoading(false);
    }
  };

  const isSkillSelected = (name) => skills.some(s => s.name === name);

  const toggleSkill = (skillName) => {
    if (isSkillSelected(skillName)) {
      setSkills(prev => prev.filter(s => s.name !== skillName));
      return;
    }
    if (skillName === 'None / Just Starting') {
       setSkills([{ name: 'None / Just Starting', level: 'beginner' }]);
       setSkillInput('');
       return;
    }
    if (isSkillSelected('None / Just Starting')) {
       setSkills([]); 
    }
    setPendingSkill(skillName);
    setExperience('intermediate'); 
    setShowExperienceModal(true);
    setSkillInput(''); 
  };

  const handleLevelSelect = () => {
    setSkills(prev => [...prev, { name: pendingSkill, level: experience }]);
    setShowExperienceModal(false);
    setPendingSkill('');
  };

  const filteredSkills = availableSkills.filter(skill => 
    skill.toLowerCase().includes(skillInput.toLowerCase())
  );

  return (
    <div className="bg-[#06457F] text-[#0F172A] h-screen w-full flex flex-col font-display antialiased selection:bg-[#2563EB] selection:text-white overflow-hidden relative justify-center items-center p-4">
      
      <style dangerouslySetInnerHTML={{ __html: `
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: rgba(0,0,0,0.05); }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(0,0,0,0.15); border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(0,0,0,0.25); }
      `}} />

      {/* LOGO */}
      <div className="absolute top-6 left-8 z-50 select-none">
        <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#0474C4] to-cyan-400 flex items-center justify-center shadow-lg shadow-blue-500/30">
                <span className="material-symbols-outlined text-white text-lg">rocket_launch</span>
            </div>
            <span className="text-xl font-black tracking-tight text-white">
                Career <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-400">Orbit</span>
            </span>
        </div>
      </div>

      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-blue-400/10 blur-[100px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-cyan-400/10 blur-[120px] rounded-full" />
      </div>

      <div className="relative z-10 w-full max-w-[720px] max-h-[85vh] bg-white/95 backdrop-blur-sm border border-white/50 rounded-2xl shadow-2xl flex flex-col overflow-hidden">
          
          <div className="px-8 pt-8 pb-2 shrink-0">
            <div className="flex justify-between items-center mb-2">
              <p className="text-[#1A365D] text-xs font-medium leading-none">Step 3 of 3</p>
              <div className="flex items-center gap-2">
                <span className="text-[10px] text-[#2563EB] bg-blue-50 px-2 py-0.5 rounded font-bold">ALMOST DONE</span>
                <p className="text-[#2C5282] text-[10px] font-medium leading-none">100%</p>
              </div>
            </div>
            <div className="h-1.5 w-full bg-slate-200 rounded-full overflow-hidden">
              <div className="h-full bg-[#2563EB] w-full rounded-full shadow-[0_0_10px_rgba(37,99,235,0.5)] transition-all duration-1000"></div>
            </div>
          </div>

          <div className="p-8 flex flex-col gap-8 flex-1 overflow-y-auto custom-scrollbar">
            <div className="space-y-1.5">
              <h1 className="text-[#1A1A1A] text-3xl font-bold tracking-tight">Your skills & experience</h1>
              <p className="text-[#64748B] text-base font-normal">Add your technical skills. If you are new, select <strong>"None / Just Starting"</strong>.</p>
            </div>

            <div className="flex flex-col gap-6">
              
              <div className="flex flex-col gap-2.5">
                <label className="text-[#1A1A1A] text-sm font-medium">Select Skills</label>
                <div className="relative group">
                  <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#94A3B8] text-[20px] group-focus-within:text-[#2563EB] transition-colors">search</span>
                  <input 
                    type="text"
                    value={skillInput}
                    onChange={(e) => setSkillInput(e.target.value)}
                    className="w-full h-12 pl-10 pr-4 rounded-lg border border-[#CBD5E1] bg-white focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/20 outline-none text-sm transition-all"
                    placeholder="Search or add skills..."
                  />
                </div>
                
                <div className="flex flex-wrap gap-2 mt-1 min-h-[40px]">
                  {filteredSkills.length > 0 ? (
                    filteredSkills.map((skillName) => (
                        <button 
                          key={skillName}
                          type="button"
                          onClick={() => toggleSkill(skillName)}
                          className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg border text-xs font-bold transition-all duration-200 active:scale-95 ${
                            isSkillSelected(skillName)
                            ? 'bg-[#2563EB]/10 border-[#2563EB] text-[#2563EB]' 
                            : 'bg-white border-[#E2E8F0] text-[#64748B] hover:bg-[#F1F5F9]'
                          }`}
                        >
                          {skillName}
                          <span className="material-symbols-outlined text-[14px]">
                            {isSkillSelected(skillName) ? 'close' : 'add'}
                          </span>
                        </button>
                    ))
                  ) : (
                    <p className="text-xs text-gray-400 w-full pl-1">No matching skills found.</p>
                  )}
                </div>
              </div>

              {skills.length > 0 && (
                <div className="flex flex-col gap-3 p-4 bg-slate-50 rounded-xl border border-slate-200">
                    <div className="flex items-center justify-between">
                         <label className="text-[#1A1A1A] text-sm font-bold">Skill Inventory</label>
                         <span className="text-[10px] text-slate-500 font-medium">{skills.length} skills added</span>
                    </div>
                    
                    <div className="flex flex-col gap-2 max-h-[180px] overflow-y-auto pr-1 custom-scrollbar">
                        {skills.map((item, index) => (
                            <div key={index} className="flex items-center justify-between bg-white p-3 rounded-lg border border-slate-200 shadow-sm group">
                                <div className="flex flex-col">
                                    <span className="text-sm font-bold text-slate-800">{item.name}</span>
                                    <span className="text-[10px] uppercase text-slate-500 font-semibold tracking-wider">{item.level}</span>
                                </div>
                                <button 
                                    onClick={() => toggleSkill(item.name)}
                                    className="text-slate-400 hover:text-red-500 hover:bg-red-50 p-1.5 rounded-full transition-all opacity-70 group-hover:opacity-100"
                                >
                                    <span className="material-symbols-outlined text-[18px]">delete</span>
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
              )}
            </div>
          </div>

          <div className="p-8 pt-4 border-t border-slate-100 bg-white shrink-0">
              <div className="flex flex-col-reverse sm:flex-row items-center justify-between gap-4 sm:gap-0">
                <button 
                  type="button" 
                  onClick={() => navigate('/onboarding/step-2')}
                  className="text-[#64748B] hover:text-[#0F172A] transition-colors text-sm font-medium flex items-center gap-2 px-3 py-2"
                >
                  <span className="material-symbols-outlined text-lg">arrow_back</span>
                  Back
                </button>
                
                <div className="w-full sm:w-auto">
                  <button 
                    onClick={handleFinish}
                    disabled={loading || skills.length === 0}
                    className="group w-full sm:w-auto min-w-[260px] h-12 bg-[#2563EB] hover:bg-[#1D4ED8] text-white rounded-lg font-bold shadow-lg shadow-[#2563EB]/30 transition-all flex items-center justify-center gap-2 active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <div className="flex items-center gap-2">
                        <span className="animate-spin material-symbols-outlined text-lg">progress_activity</span>
                        <span className="text-sm">{loadingMessage}</span>
                      </div>
                    ) : (
                      <>
                        <span className="text-sm">Submit & Generate Roadmap</span>
                        <span className="material-symbols-outlined text-[20px] group-hover:animate-bounce">auto_awesome</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
          </div>
      </div>

      {showExperienceModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#0F172A]/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="w-full max-w-lg max-h-[90vh] overflow-y-auto custom-scrollbar bg-white rounded-2xl shadow-2xl p-8 border border-white/50 animate-in zoom-in-95 slide-in-from-bottom-5 duration-300 relative">
            <button 
                onClick={() => { setShowExperienceModal(false); setPendingSkill(''); }}
                className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-1 rounded-full hover:bg-slate-100 transition-colors"
            >
                <span className="material-symbols-outlined">close</span>
            </button>
            <div className="text-center mb-8">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 text-[#2563EB]">
                    <span className="material-symbols-outlined text-2xl">bar_chart</span>
                </div>
                <h2 className="text-2xl font-bold text-[#1A1A1A]">Select Level for <span className="text-[#2563EB]">{pendingSkill}</span></h2>
                <p className="text-[#64748B] text-sm mt-1">Which level best describes your expertise in this skill?</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                {[
                  { id: 'beginner', label: 'Beginner', time: '0-2 years', icon: 'school' },
                  { id: 'intermediate', label: 'Intermediate', time: '3-5 years', icon: 'trending_up' },
                  { id: 'advanced', label: 'Advanced', time: '5+ years', icon: 'rocket_launch' },
                ].map((lvl) => (
                  <button
                    key={lvl.id}
                    type="button"
                    onClick={() => setExperience(lvl.id)}
                    className={`group relative flex flex-col items-center justify-center py-5 px-3 rounded-xl border-2 transition-all duration-200 active:scale-[0.98] ${
                      experience === lvl.id 
                      ? 'border-[#2563EB] bg-[#EFF6FF] text-[#2563EB] shadow-sm' 
                      : 'border-[#E2E8F0] bg-[#F8FAFC] text-[#94A3B8] hover:border-[#CBD5E1] hover:bg-white'
                    }`}
                  >
                    <span className={`material-symbols-outlined text-2xl mb-1.5 transition-transform duration-300 group-hover:scale-110 ${experience === lvl.id ? 'animate-pulse' : ''}`}>
                      {lvl.icon}
                    </span>
                    <span className="text-sm font-bold">{lvl.label}</span>
                    <span className="text-[10px] uppercase opacity-70 mt-0.5">{lvl.time}</span>
                    {experience === lvl.id && (
                        <div className="absolute top-2 right-2 w-5 h-5 bg-[#2563EB] rounded-full flex items-center justify-center animate-in zoom-in fade-in duration-200">
                          <span className="material-symbols-outlined text-white text-[12px] font-bold">check</span>
                        </div>
                    )}
                  </button>
                ))}
            </div>
            <button 
                onClick={handleLevelSelect}
                className="group w-full h-12 bg-[#2563EB] hover:bg-[#1D4ED8] text-white rounded-lg font-bold shadow-lg shadow-[#2563EB]/30 transition-all flex items-center justify-center gap-2 active:scale-[0.98]"
            >
                <span className="text-sm">Confirm & Add Skill</span>
                <span className="material-symbols-outlined text-[20px]">check_circle</span>
            </button>
          </div>
        </div>
      )}

    </div>
  );
};

export default OnboardingStep3;