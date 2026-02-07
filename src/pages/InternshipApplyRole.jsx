import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const InternshipApplyRole = () => {
  const navigate = useNavigate();
  
  // --- STATE MANAGEMENT ---
  const [userProfile, setUserProfile] = useState({
    name: "Baskar Manager",
    role: "Student",
    currentPhase: "Phase 1: Foundations",
    skills: ["Python", "Data Structures", "Problem Solving", "Git"] // Mock User Skills
  });

  const [jobData, setJobData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [aiAnalysis, setAiAnalysis] = useState({
    insight: "",
    matchScore: 0,
    isAnalyzing: true
  });

  const handleNavigate = (page) => {
    if (page === 'Dashboard') navigate('/dashboard/main');
    else navigate(`/${page.toLowerCase().replace(/\s+/g, '-')}`);
  };

  // --- MOCK DATA (Simulating DB) ---
  const MOCK_JOB_DB = {
    id: "job_123",
    title: "Software Engineering Intern",
    company: "ABC Technologies",
    logo: "https://lh3.googleusercontent.com/aida-public/AB6AXuCqEBjeiUjykWBznTrGC43GHVgXCBMWDbsro0_r4rQaqtfQVjXi647m1Hodbq3VJvBlmpme18chN0m4uR0IfGcHSZPMhyfU7DtqFbFuRjyNfcH6z0lyINkdZXtd0I3vF0NN9xPyymePrTHYdVBN2b10GMroutLZanDBLna-XIVHzqNYLE0XZs7FMwZAWaHzii32Cad4nZSFz9BECvgtW45qAiTrZFsof-tJvB7PeybCNsI6ROqK3kc3XVfiU4-NFb1J-9sScQHowFE",
    type: "Internship",
    duration: "6 Months",
    location: "Remote",
    level: "Entry Level",
    posted: "2 days ago",
    deadline: "Oct 15, 2023",
    stipend: "$25 - $35 / hr",
    openings: 2,
    description: "We are looking for a passionate Software Engineering Intern to join our core platform team. In this role, you will work closely with senior engineers to build scalable APIs and improve the performance of our backend systems. This is a unique opportunity to gain hands-on experience in a high-growth environment while contributing to real-world projects that impact millions of users.",
    responsibilities: [
        "Assist in designing and developing RESTful APIs and microservices.",
        "Collaborate with cross-functional teams including Product Managers and Designers.",
        "Write clean, maintainable, and efficient code following industry best practices.",
        "Participate in code reviews and contribute to technical documentation."
    ],
    requiredSkills: ["Java", "Python", "Data Structures", "Problem Solving", "Git", "REST APIs"]
  };

  // --- 1. MOCK LLM LOGIC (Simulating OpenAI/Gemini) ---
  const simulateLLMAnalysis = async (job, user) => {
    // Logic: Find intersection of User Skills and Job Skills
    const userSkillsLower = user.skills.map(s => s.toLowerCase());
    const jobSkillsLower = job.requiredSkills.map(s => s.toLowerCase());
    
    const matchingSkills = job.requiredSkills.filter(skill => 
        userSkillsLower.includes(skill.toLowerCase())
    );

    const matchPercentage = Math.round((matchingSkills.length / job.requiredSkills.length) * 100) + 40; // Base boost for visual appeal

    // Simulate "Streaming" or "Processing" delay
    await new Promise(resolve => setTimeout(resolve, 800));

    let insightText = "";
    if (matchPercentage > 80) {
        insightText = `This role is a **High Match** for your profile! Your proficiency in **${matchingSkills.join(', ')}** aligns perfectly with the requirements. It builds directly upon your current **${user.currentPhase}** work.`;
    } else {
        insightText = `This is a great growth opportunity. While you have strong foundations in **${matchingSkills.join(', ')}**, you will gain valuable exposure to new tech stacks like ${job.requiredSkills.find(s => !userSkillsLower.includes(s.toLowerCase())) || 'Advanced Systems'}.`;
    }

    setAiAnalysis({
        insight: insightText,
        matchScore: matchPercentage,
        isAnalyzing: false
    });
  };

  // --- 2. FETCH DATA & RUN AI ---
  useEffect(() => {
    const initPage = async () => {
        try {
            console.log("API: Fetching job details...");
            // Simulate Network Latency
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            setJobData(MOCK_JOB_DB);
            setLoading(false);

            // Trigger AI Analysis after data load
            console.log("LLM: Analyzing profile fit...");
            await simulateLLMAnalysis(MOCK_JOB_DB, userProfile);

        } catch (error) {
            console.error("Error loading page data", error);
            setLoading(false);
        }
    };

    initPage();
  }, []);

  const handleApply = () => {
    alert("Application Started! Redirecting to company portal...");
  };

  return (
    <div className="bg-[#06457F] h-screen w-full flex overflow-hidden font-['Space_Grotesk'] antialiased text-white selection:bg-[#0474C4] selection:text-white relative">
      
      {/* Styles Injection */}
      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');
        .material-symbols-outlined { font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24; }
        .fill-1 { font-variation-settings: 'FILL' 1; }
        
        /* Custom Scrollbar */
        ::-webkit-scrollbar { width: 8px; }
        ::-webkit-scrollbar-track { background: #06457F; }
        ::-webkit-scrollbar-thumb { background: #0A4F8F; border-radius: 4px; }
        ::-webkit-scrollbar-thumb:hover { background: #0474C4; }

        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}} />

      {/* --- SIDEBAR --- */}
      {/* Applied font-['Space_Grotesk'] explicitly to match Dashboard Main */}
      <aside className="w-72 flex-shrink-0 flex flex-col border-r border-slate-300 bg-white relative z-20 font-['Space_Grotesk']">
        
        {/* LOGO SECTION - Exact Match from Dashboard Main */}
        <div className="p-6 flex items-center gap-3 select-none">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#0474C4] to-cyan-400 flex items-center justify-center shadow-lg shadow-blue-500/30">
            {/* Small rocket icon inside */}
            <span className="material-symbols-outlined text-white text-xl">rocket_launch</span>
          </div>
          <span className="text-2xl font-black tracking-tight text-[#0F172A]">
            Career <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0474C4] to-cyan-500">Orbit</span>
          </span>
        </div>

        <nav className="flex-1 px-4 py-4 flex flex-col gap-2 overflow-y-auto no-scrollbar">
          <button onClick={() => handleNavigate('Dashboard')} className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-600 hover:bg-slate-50 transition-colors group text-left w-full">
            <span className="material-symbols-outlined group-hover:text-[#06457F] transition-colors">home</span>
            <span className="font-medium group-hover:text-[#06457F] transition-colors">Dashboard</span>
          </button>
          
          <button onClick={() => handleNavigate('Roadmap')} className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-600 hover:bg-slate-50 transition-colors group text-left w-full">
            <span className="material-symbols-outlined group-hover:text-[#06457F] transition-colors">map</span>
            <span className="font-medium group-hover:text-[#06457F] transition-colors">Career Roadmap</span>
          </button>

          <button onClick={() => handleNavigate('Mentors')} className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-600 hover:bg-slate-50 transition-colors group text-left w-full">
            <span className="material-symbols-outlined group-hover:text-[#06457F] transition-colors">groups</span>
            <span className="font-medium group-hover:text-[#06457F] transition-colors">Mentorship</span>
          </button>
          
          <button onClick={() => handleNavigate('Resume')} className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-600 hover:bg-slate-50 transition-colors group text-left w-full">
            <span className="material-symbols-outlined group-hover:text-[#06457F] transition-colors">description</span>
            <span className="font-medium group-hover:text-[#06457F] transition-colors">Resume</span>
          </button>

          <button onClick={() => handleNavigate('Mock Interview')} className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-600 hover:bg-slate-50 transition-colors group text-left w-full">
            <span className="material-symbols-outlined group-hover:text-[#06457F] transition-colors">videocam</span>
            <span className="font-medium group-hover:text-[#06457F] transition-colors">Mock Interview</span>
          </button>

          <button onClick={() => handleNavigate('My Bookings')} className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-600 hover:bg-slate-50 transition-colors group text-left w-full">
            <span className="material-symbols-outlined group-hover:text-[#06457F] transition-colors">calendar_month</span>
            <span className="font-medium group-hover:text-[#06457F] transition-colors">My Booking</span>
          </button>

          {/* Internship (Active State) */}
          <button onClick={() => navigate('/internships-jobs')} className="flex items-center gap-3 px-4 py-3 rounded-lg bg-[#06457F] text-white shadow-md text-left w-full">
            <span className="material-symbols-outlined fill-1">work</span>
            <span className="font-medium">Internship</span>
          </button>

          <button onClick={() => handleNavigate('LMS Courses')} className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-600 hover:bg-slate-50 transition-colors group text-left w-full">
            <span className="material-symbols-outlined group-hover:text-[#06457F] transition-colors">book</span>
            <span className="font-medium group-hover:text-[#06457F] transition-colors">LMS Courses</span>
          </button>

          <button onClick={() => handleNavigate('Practice Ground')} className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-600 hover:bg-slate-50 transition-colors group text-left w-full">
            <span className="material-symbols-outlined group-hover:text-[#06457F] transition-colors">code</span>
            <span className="font-medium group-hover:text-[#06457F] transition-colors">Practice Ground</span>
          </button>

          <button onClick={() => handleNavigate('Settings')} className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-600 hover:bg-slate-50 transition-colors group text-left w-full">
            <span className="material-symbols-outlined group-hover:text-[#06457F] transition-colors">settings</span>
            <span className="font-medium group-hover:text-[#06457F] transition-colors">Settings</span>
          </button>
        </nav>

        {/* --- COMPACT PROFILE SECTION (FIXED AT BOTTOM) --- */}
        <div className="p-3 border-t border-slate-300 shrink-0 mt-auto bg-white z-20">
          <div onClick={() => navigate('/profile')} className="flex items-center gap-3 px-2 py-1.5 rounded-lg cursor-pointer hover:bg-slate-50 transition-colors">
            {/* Reduced size-9 */}
            <div className="size-9 rounded-full bg-cover bg-center border border-slate-300 shrink-0" style={{ backgroundImage: "url('https://ui-avatars.com/api/?name=B+&background=06457F&color=fff')" }}></div>
            <div className="flex flex-col min-w-0">
              <span className="text-sm font-bold text-slate-900 truncate">{userProfile.name}</span>
              <span className="text-[11px] font-medium text-slate-500 truncate">Pro Member</span>
            </div>
          </div>
        </div>
      </aside>

      {/* --- MAIN CONTENT AREA --- */}
      <main className="flex-1 flex flex-col h-full overflow-hidden relative">
        <div className="flex-1 overflow-y-auto p-8">
            {loading ? (
                <div className="h-full flex flex-col items-center justify-center">
                    <div className="w-12 h-12 border-4 border-white/20 border-t-[#0474C4] rounded-full animate-spin mb-4"></div>
                    <p className="text-white/70">Fetching job details...</p>
                </div>
            ) : (
                <div className="max-w-7xl mx-auto h-full">
                    <button onClick={() => navigate('/internships-jobs')} className="inline-flex items-center text-[#D1D5DB] hover:text-white mb-6 transition-colors text-sm font-medium">
                        <span className="material-symbols-outlined text-[20px] mr-1">arrow_back</span>
                        Back to Opportunities
                    </button>
                    
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                        <div className="lg:col-span-8 flex flex-col gap-6">
                            
                            {/* Job Header */}
                            <div className="bg-[#0A5596]/90 backdrop-blur-sm rounded-xl p-6 border border-white/10 shadow-lg">
                                <div className="flex justify-between items-start gap-4">
                                    <div>
                                        <h1 className="text-3xl font-bold text-white mb-2">{jobData.title}</h1>
                                        <h2 className="text-xl text-[#FDE047] font-bold mb-4 flex items-center gap-2">
                                            <span className="material-symbols-outlined text-[24px]">apartment</span>
                                            {jobData.company}
                                        </h2>
                                        <div className="flex flex-wrap gap-3">
                                            {[jobData.location, jobData.type, jobData.duration, jobData.level].map((tag, i) => (
                                                <span key={i} className="inline-flex items-center px-3 py-1 rounded-full bg-white/10 text-white text-sm font-medium border border-white/10">
                                                    <span className="material-symbols-outlined text-[16px] mr-1.5">
                                                        {i === 0 ? 'location_on' : i === 1 ? 'work' : i === 2 ? 'schedule' : 'school'}
                                                    </span>
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="hidden sm:block size-16 bg-white rounded-lg p-2 shrink-0">
                                        <div className="w-full h-full bg-contain bg-center bg-no-repeat" style={{ backgroundImage: `url('${jobData.logo}')` }}></div>
                                    </div>
                                </div>
                            </div>

                            {/* AI Insight Box */}
                            <div className="bg-gradient-to-r from-indigo-900/60 to-purple-900/60 rounded-xl p-5 border border-indigo-400/30 relative overflow-hidden group">
                                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                    <span className="material-symbols-outlined text-[100px] text-white">auto_awesome</span>
                                </div>
                                <div className="relative z-10 flex gap-4 items-start">
                                    <div className="bg-indigo-500/20 p-2 rounded-lg text-indigo-200">
                                        <span className="material-symbols-outlined">smart_toy</span>
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex justify-between items-center mb-1">
                                            <h3 className="text-white font-semibold text-lg">AI Analysis</h3>
                                            {aiAnalysis.isAnalyzing ? (
                                                <span className="text-xs text-indigo-300 animate-pulse">Analyzing profile fit...</span>
                                            ) : (
                                                <span className="text-xs font-bold bg-white/20 px-2 py-0.5 rounded text-white">{aiAnalysis.matchScore}% Match</span>
                                            )}
                                        </div>
                                        <p className="text-indigo-100 text-sm leading-relaxed opacity-90">
                                            {aiAnalysis.isAnalyzing 
                                                ? "Our AI is currently comparing your skills and roadmap progress against the requirements for this role..." 
                                                : <span dangerouslySetInnerHTML={{__html: aiAnalysis.insight.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')}} />
                                            }
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Role Details */}
                            <div className="bg-[#0A5596]/80 rounded-xl p-6 border border-white/5">
                                <h3 className="text-xl font-bold text-white mb-4">About the Role</h3>
                                <p className="text-[#D1D5DB] leading-relaxed mb-6">
                                    {jobData.description}
                                </p>
                                <h4 className="text-lg font-semibold text-white mb-3">Key Responsibilities</h4>
                                <ul className="space-y-3 mb-8">
                                    {jobData.responsibilities.map((resp, i) => (
                                        <li key={i} className="flex items-start gap-3 text-[#D1D5DB]">
                                            <span className="material-symbols-outlined text-[#22C55E] mt-0.5 text-[20px]">check_circle</span>
                                            <span>{resp}</span>
                                        </li>
                                    ))}
                                </ul>
                                <h4 className="text-lg font-semibold text-white mb-3">Required Skills</h4>
                                <div className="flex flex-wrap gap-2">
                                    {jobData.requiredSkills.map((skill, i) => (
                                        <span key={i} className="px-3 py-1.5 rounded bg-[#1E293B] text-gray-300 text-sm border border-gray-700">{skill}</span>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Right Column: Quick Summary */}
                        <div className="lg:col-span-4">
                            <div className="sticky top-6 flex flex-col gap-4">
                                <div className="bg-[#A8C4EC] rounded-xl p-6 shadow-xl text-gray-900 border border-blue-300">
                                    <div className="flex justify-between items-center mb-6 border-b border-blue-900/10 pb-4">
                                        <h3 className="text-lg font-bold text-blue-900">Quick Summary</h3>
                                        <span className="material-symbols-outlined text-blue-900">info</span>
                                    </div>
                                    <div className="space-y-5 mb-8">
                                        <div className="flex items-center gap-3">
                                            <div className="p-2 bg-white/50 rounded-lg text-blue-800">
                                                <span className="material-symbols-outlined">calendar_month</span>
                                            </div>
                                            <div>
                                                <p className="text-xs font-semibold text-blue-800 uppercase tracking-wide">Application Deadline</p>
                                                <p className="text-base font-bold text-gray-900">{jobData.deadline}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <div className="p-2 bg-white/50 rounded-lg text-blue-800">
                                                <span className="material-symbols-outlined">payments</span>
                                            </div>
                                            <div>
                                                <p className="text-xs font-semibold text-blue-800 uppercase tracking-wide">Stipend</p>
                                                <p className="text-base font-bold text-gray-900">{jobData.stipend}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <div className="p-2 bg-white/50 rounded-lg text-blue-800">
                                                <span className="material-symbols-outlined">person_add</span>
                                            </div>
                                            <div>
                                                <p className="text-xs font-semibold text-blue-800 uppercase tracking-wide">Openings</p>
                                                <p className="text-base font-bold text-gray-900">{jobData.openings} Positions</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-3">
                                        <button onClick={handleApply} className="w-full bg-[#0474C4] hover:bg-blue-600 text-white font-bold py-3 px-4 rounded-lg shadow-sm transition-all flex items-center justify-center gap-2 group">
                                            <span>Apply Now</span>
                                            <span className="material-symbols-outlined text-[18px] group-hover:translate-x-0.5 transition-transform">open_in_new</span>
                                        </button>
                                        
                                        {/* --- NAVIGATION TO SAVED OPPORTUNITIES --- */}
                                        <button 
                                            onClick={() => navigate('/internship/saved')} 
                                            className="w-full bg-white hover:bg-gray-50 text-blue-900 font-semibold py-3 px-4 rounded-lg border border-blue-200 transition-colors flex items-center justify-center gap-2"
                                        >
                                            <span className="material-symbols-outlined text-[20px]">bookmark_border</span>
                                            <span>Save for Later</span>
                                        </button>
                                    </div>
                                    <div className="mt-4 text-center">
                                        <p className="text-xs text-blue-800/70">
                                            You will be redirected to the company's career page to complete your application.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
      </main>
    </div>
  );
};

export default InternshipApplyRole;