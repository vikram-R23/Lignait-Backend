import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const InternshipSaveOpportunity = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("Baskar Manager");
  
  // --- STATE ---
  const [savedJobs, setSavedJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [aiStatus, setAiStatus] = useState("Idle"); // 'Fetching', 'Analyzing', 'Complete'

  // Mock User Profile for LLM Comparison
  const userSkills = ["React", "Node.js", "TypeScript", "Figma", "User Research"];
  const userPhase = "Phase 2";

  const handleNavigate = (page) => {
    if (page === 'Dashboard') navigate('/dashboard/main');
    else navigate(`/${page.toLowerCase().replace(/\s+/g, '-')}`);
  };

  // --- MOCK DB DATA (Raw data without AI insights) ---
  const RAW_DB_JOBS = [
    {
      id: 1,
      role: "Software Engineering Intern",
      type: "INTERNSHIP",
      company: "TechFlow Inc.",
      location: "Remote / San Francisco, CA",
      skills: ["React", "Node.js", "TypeScript"],
      savedDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
      icon: "code_blocks",
      typeColor: "bg-[#0474C4]/20 text-[#0474C4] border-[#0474C4]/20"
    },
    {
      id: 2,
      role: "Product Design Intern",
      type: "INTERNSHIP",
      company: "Creative Solutions",
      location: "New York, NY",
      skills: ["Figma", "Prototyping", "User Research"],
      savedDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
      icon: "design_services",
      typeColor: "bg-[#0474C4]/20 text-[#0474C4] border-[#0474C4]/20"
    },
    {
      id: 3,
      role: "Junior Data Analyst",
      type: "FULL-TIME JOB",
      company: "DataCore Systems",
      location: "Austin, TX",
      skills: ["SQL", "Python", "Tableau"], // User does NOT have these skills
      savedDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 1 week ago
      icon: "data_object",
      typeColor: "bg-purple-500/20 text-purple-300 border border-purple-500/20"
    }
  ];

  // --- 1. LLM LOGIC: ANALYZE FIT & EXPIRY ---
  const runAIAnalysis = async (jobs) => {
    setAiStatus("Analyzing");
    console.log("LLM: analyzing skill overlap and roadmap alignment...");
    
    // Simulate AI Processing Delay
    await new Promise(resolve => setTimeout(resolve, 800));

    return jobs.map(job => {
        // Semantic Match Logic (Mock)
        const overlappingSkills = job.skills.filter(skill => userSkills.includes(skill));
        const matchScore = overlappingSkills.length / job.skills.length;
        
        let matchData = {};

        if (matchScore >= 0.6) {
            matchData = {
                match: true,
                matchText: `Matches your current ${userPhase}`,
                matchColor: "text-green-300",
                matchIcon: "explore"
            };
        } else {
            matchData = {
                match: false,
                matchText: "Skill Gap: SQL, Python", // Mocked specific advice
                matchColor: "text-orange-300",
                matchIcon: "warning"
            };
        }

        // Calculate "Saved Time" string
        const daysAgo = Math.floor((new Date() - job.savedDate) / (1000 * 60 * 60 * 24));
        const savedTimeString = daysAgo > 0 ? `Saved ${daysAgo} days ago` : "Saved today";

        return { ...job, ...matchData, savedTime: savedTimeString };
    });
  };

  // --- 2. API CALL ---
  useEffect(() => {
    const fetchData = async () => {
        setAiStatus("Fetching");
        try {
            console.log("API: Fetching saved opportunities...");
            await new Promise(resolve => setTimeout(resolve, 1000)); // Network delay
            
            // Run AI analysis on fetched data
            const enrichedJobs = await runAIAnalysis(RAW_DB_JOBS);
            
            setSavedJobs(enrichedJobs);
            setLoading(false);
            setAiStatus("Complete");
        } catch (error) {
            console.error("Fetch error:", error);
            setLoading(false);
        }
    };

    fetchData();
  }, []);


  return (
    <div className="bg-[#06457F] h-screen w-full flex overflow-hidden font-['Inter'] antialiased text-white selection:bg-[#0474C4] selection:text-white relative">
      
      {/* Styles Injection */}
      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;900&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap');
        .material-symbols-outlined { font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24; }
        .filled { font-variation-settings: 'FILL' 1; }
        .fill-1 { font-variation-settings: 'FILL' 1; }
        
        /* Custom Scrollbar - Hidden for Sidebar */
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }

        /* Custom Scrollbar - Main Content */
        ::-webkit-scrollbar { width: 8px; }
        ::-webkit-scrollbar-track { background: #06457F; }
        ::-webkit-scrollbar-thumb { background: rgba(255, 255, 255, 0.08); border-radius: 4px; }
        ::-webkit-scrollbar-thumb:hover { background: #0474C4; }
      `}} />

      {/* --- SIDEBAR (Exact Match) --- */}
      <aside className="w-72 flex-shrink-0 flex flex-col border-r border-slate-300 bg-white relative z-20 shadow-xl font-['Space_Grotesk']">
        
        {/* LOGO SECTION - EXACT MATCH */}
        <div className="p-6 flex items-center gap-3 select-none shrink-0">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#0474C4] to-cyan-400 flex items-center justify-center shadow-lg shadow-blue-500/30">
              <span className="material-symbols-outlined text-white text-xl">rocket_launch</span>
          </div>
          <span className="text-2xl font-black tracking-tight text-[#0F172A]">
              Career <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0474C4] to-cyan-500">Orbit</span>
          </span>
        </div>

        <nav className="flex-1 px-4 py-4 flex flex-col gap-2 overflow-hidden no-scrollbar">
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
        <div className="p-3 border-t border-slate-300 mt-auto bg-white z-20">
          <div onClick={() => navigate('/profile')} className="flex items-center gap-3 px-2 py-1.5 cursor-pointer hover:bg-slate-50 rounded-lg transition-colors">
            {/* Reduced size-9 */}
            <div className="size-9 rounded-full bg-cover bg-center border border-slate-300 shrink-0" style={{ backgroundImage: "url('https://ui-avatars.com/api/?name=B+&background=06457F&color=fff')" }}></div>
            <div className="flex flex-col min-w-0">
              <span className="text-sm font-bold text-slate-900 truncate">{userName}</span>
              <span className="text-[11px] font-medium text-slate-500 truncate">Pro Member</span>
            </div>
          </div>
        </div>
      </aside>

      {/* --- MAIN CONTENT --- */}
      <main className="flex-1 overflow-y-auto bg-[#06457F] text-white relative">
        <div className="mx-auto max-w-5xl px-8 py-10">
            
            {/* Header */}
            <div className="mb-8 flex flex-col gap-2">
                <h1 className="text-3xl font-bold tracking-tight text-white">Saved Opportunities</h1>
                <p className="text-[#D1D5DB] text-base">Opportunities you’ve bookmarked to apply later.</p>
            </div>

            {/* Filters */}
            <div className="mb-6 flex flex-wrap items-center gap-3">
                <div className="flex items-center gap-2 rounded-lg bg-white/10 px-3 py-2 text-sm text-white backdrop-blur-sm border border-white/5 hover:bg-white/15 cursor-pointer transition-all">
                    <span className="material-symbols-outlined text-[20px]">filter_list</span>
                    <span className="font-medium">All Types</span>
                    <span className="material-symbols-outlined text-[16px] text-white/70">expand_more</span>
                </div>
                <div className="flex items-center gap-2 rounded-lg bg-white/10 px-3 py-2 text-sm text-white backdrop-blur-sm border border-white/5 hover:bg-white/15 cursor-pointer transition-all">
                    <span className="font-medium">Status: Active</span>
                    <span className="material-symbols-outlined text-[16px] text-white/70">expand_more</span>
                </div>
                <div className="flex items-center gap-2 rounded-lg bg-white/10 px-3 py-2 text-sm text-white backdrop-blur-sm border border-white/5 hover:bg-white/15 cursor-pointer transition-all">
                    <span className="material-symbols-outlined text-[18px]">location_on</span>
                    <span className="font-medium">Any Location</span>
                    <span className="material-symbols-outlined text-[16px] text-white/70">expand_more</span>
                </div>
                <div className="ml-auto">
                    <div className="relative">
                        <input className="bg-white/10 border-white/10 text-white placeholder-white/50 text-sm rounded-lg pl-9 pr-4 py-2 w-64 focus:ring-1 focus:ring-[#0474C4] focus:border-[#0474C4] outline-none backdrop-blur-sm" placeholder="Search saved roles..." type="text"/>
                        <span className="material-symbols-outlined absolute left-2.5 top-2 text-[18px] text-white/50">search</span>
                    </div>
                </div>
            </div>

            {/* List */}
            <div className="flex flex-col gap-4">
                {loading ? (
                    <div className="flex flex-col items-center justify-center py-20">
                        <div className="w-10 h-10 border-4 border-white/20 border-t-[#0474C4] rounded-full animate-spin mb-3"></div>
                        <p className="text-white/60 animate-pulse text-sm">Syncing with AI...</p>
                    </div>
                ) : (
                    savedJobs.map((job) => (
                        <div key={job.id} className="group relative flex flex-col sm:flex-row justify-between gap-6 rounded-xl bg-[rgba(255,255,255,0.08)] border border-white/10 p-5 hover:bg-white/10 transition-all duration-200 shadow-sm">
                            <div className="flex gap-4">
                                <div className="h-12 w-12 shrink-0 rounded-lg bg-white flex items-center justify-center">
                                    <span className="material-symbols-outlined text-gray-800 text-[28px]">{job.icon}</span>
                                </div>
                                <div className="flex flex-col gap-1.5">
                                    <div className="flex items-center gap-2 flex-wrap">
                                        <h3 className="font-semibold text-lg text-white">{job.role}</h3>
                                        <span className={`px-2 py-0.5 rounded text-[11px] font-medium border ${job.typeColor}`}>{job.type}</span>
                                    </div>
                                    <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 text-sm text-[#D1D5DB]">
                                        <span className="font-medium text-white/90">{job.company}</span>
                                        <span className="hidden sm:inline text-white/30">•</span>
                                        <span>{job.location}</span>
                                    </div>
                                    <div className="mt-2 flex flex-wrap gap-2">
                                        {job.skills.map((skill, index) => (
                                            <span key={index} className="px-2 py-1 rounded bg-white/5 border border-white/10 text-xs text-white/80">{skill}</span>
                                        ))}
                                    </div>
                                    <div className={`mt-2 flex items-center gap-2 text-xs ${job.matchColor}`}>
                                        <span className={`material-symbols-outlined text-[16px] ${job.match ? 'filled' : ''}`}>{job.matchIcon}</span>
                                        <span>{job.matchText}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-row sm:flex-col justify-between items-end gap-4 shrink-0 mt-4 sm:mt-0">
                                <div className="flex items-center gap-2 self-start sm:self-end">
                                    <span className="text-xs text-[#D1D5DB]">{job.savedTime}</span>
                                    <button className="text-[#D1D5DB] hover:text-white transition-colors" title="Remove from saved">
                                        <span className="material-symbols-outlined text-[20px] filled">bookmark</span>
                                    </button>
                                </div>
                                <div className="flex gap-3 w-full sm:w-auto">
                                    <button onClick={() => navigate('/internship/apply')} className="hidden sm:flex items-center justify-center px-4 py-2 text-sm font-medium text-white hover:text-[#0474C4] transition-colors">
                                        View Details
                                    </button>
                                    <button onClick={() => navigate('/internship/apply')} className="flex-1 sm:flex-none items-center justify-center rounded-lg bg-[#0474C4] px-5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-[#0474C4]/90 transition-all active:scale-[0.98]">
                                        Apply Now
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>

        </div>
      </main>
    </div>
  );
};

export default InternshipSaveOpportunity;