import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const InternshipOpportunities = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("Baskar Manager");
  
  // --- STATE MANAGEMENT ---
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true); // Initial Page Load
  const [isAiProcessing, setIsAiProcessing] = useState(false); // Search State
  const [searchQuery, setSearchQuery] = useState("");

  const handleNavigate = (page) => {
    if (page === 'Dashboard') navigate('/dashboard/main');
    else navigate(`/${page.toLowerCase().replace(/\s+/g, '-')}`);
  };

  // --- MOCK DATA ---
  const MOCK_JOBS = [
    {
        id: 1,
        role: "Data Scientist Intern",
        company: "Google",
        location: "San Francisco, CA (Hybrid)",
        desc: "Join our analytics team to build predictive models and extract insights from large datasets. Looking for strong Python skills.",
        tags: ["Python", "SQL", "Machine Learning"],
        deadline: "Oct 15",
        logo: "https://lh3.googleusercontent.com/aida-public/AB6AXuBMQzge3PaziidCvbmv4Yla9RI1xGu5VLTe1HgpuluXvrFAigRreGd4-lNW14eP6Zos-x1SKB9XjsN7WloVUsbx244N1fT1yQP3hOrtyDO40fLHPAgsI1FH7sLP20_c4P-1xj9sNb1Q_2mrAcTJj6BPbMdjwayAKowWt7MU7KRMfOAQ-1Pa9YTMjBvWxko-cRbPXGjlJmorCqMrzmnyxcsr33a6uUZhe8YRjeehfGDeBEUwVurrvi-KOESgk1zEXDQWg3AS8k2_e-M",
        color: "indigo",
        
        // Dynamic Styling for Google (Indigo/Blue theme)
        theme: {
            border: "border-blue-500/20",
            hoverBorder: "hover:border-indigo-500/50",
            hoverShadow: "hover:shadow-[0_0_30px_5px_rgba(99,102,241,0.5)]",
            topGradient: "from-blue-400 to-indigo-400",
            companyText: "text-indigo-200",
            locationText: "text-blue-200/80",
            tagBg: "bg-indigo-500/20",
            tagBorder: "border-indigo-400/30",
            tagText: "text-indigo-200",
            buttonBg: "bg-indigo-600 hover:bg-indigo-500",
            buttonShadow: "shadow-blue-900/30",
            bookmarkText: "text-indigo-300"
        },
        aiMatch: 98 
    },
    {
        id: 2,
        role: "Product Design Intern",
        company: "Spotify",
        location: "New York, NY (Remote)",
        desc: "Work closely with product teams to design intuitive user experiences for millions of listeners worldwide.",
        tags: ["Figma", "UX Research", "Prototyping"],
        deadline: "Rolling",
        logo: "https://lh3.googleusercontent.com/aida-public/AB6AXuBiaENJsJEMvdPDgHH1sxmSykvz8Yara01gTnEcw8BkkzjYugj8uunvC7TMpsVvB6f4zCstcx55IQJmzzKFCYGi5ph5jHiPYcnvtrklsOdNTW3y03mF-VGSXmYtrd2BAa3gKS_eNavXafQYD08bTwS0agOMRaaxHjCbl1IXv1EpoWNdUyVfVS_dVgP11nDYTTzEfRwuBjt4q6NBf2pEzJ_oz1MD-LZlrYMdE-NCTvOWmLxAIrRwL5s0mc-Cp5wGMlrqUBUwTDqM2M8",
        color: "fuchsia",

        // Dynamic Styling for Spotify (Fuchsia/Pink theme)
        theme: {
            border: "border-fuchsia-500/20",
            hoverBorder: "hover:border-fuchsia-500/50",
            hoverShadow: "hover:shadow-[0_0_30px_5px_rgba(217,70,239,0.5)]",
            topGradient: "from-fuchsia-400 to-pink-400",
            companyText: "text-fuchsia-200",
            locationText: "text-pink-200/80",
            tagBg: "bg-pink-500/20",
            tagBorder: "border-pink-400/30",
            tagText: "text-pink-200",
            buttonBg: "bg-fuchsia-600 hover:bg-fuchsia-500",
            buttonShadow: "shadow-fuchsia-900/30",
            bookmarkText: "text-fuchsia-300"
        },
        aiMatch: 85
    },
    {
        id: 3,
        role: "Software Engineer II",
        company: "Microsoft",
        location: "Redmond, WA",
        desc: "Develop scalable cloud services on Azure. Strong background in C#, .NET, and distributed systems required.",
        tags: ["C#", "Azure", "System Design"],
        deadline: "Nov 01",
        logo: "https://lh3.googleusercontent.com/aida-public/AB6AXuBIrnRGAfaHp5-3Yz2I_V8S6FMqQq1OBTDlUcZ2XJfm6VE1gxnuyJ4o6_QwRiYfA66y2sNsLHb9dxBrB0fTbbOYa9sF-5QAqUJSwGTCq1zg1LSqKSDihD9GdLoKRMK2Ug_en3nFUtgXbVrm4xWTJvZvL37YS1uUyqJl4kclqeZIKTulVsIxzYlYsq3sEkfbtC2oYSkthL6bs94YNgJ0w4C_0WMvqQGbN-M_jb4_ZvPhM0VYRE7RBrmsOvq2jQ9TOv1qi1DQtd-AUUc",
        color: "cyan",

        // Dynamic Styling for Microsoft (Cyan/Sky theme)
        theme: {
            border: "border-cyan-500/20",
            hoverBorder: "hover:border-cyan-500/50",
            hoverShadow: "hover:shadow-[0_0_30px_5px_rgba(6,182,212,0.5)]",
            topGradient: "from-cyan-400 to-sky-400",
            companyText: "text-cyan-200",
            locationText: "text-sky-200/80",
            tagBg: "bg-sky-500/20",
            tagBorder: "border-sky-400/30",
            tagText: "text-sky-200",
            buttonBg: "bg-cyan-600 hover:bg-cyan-500",
            buttonShadow: "shadow-cyan-900/30",
            bookmarkText: "text-cyan-300"
        },
        aiMatch: 92
    },
    {
        id: 4,
        role: "Frontend Developer",
        company: "Airbnb",
        location: "San Francisco, CA",
        desc: "Create beautiful, responsive interfaces for our host and guest platforms using React and modern CSS.",
        tags: ["React", "TypeScript", "GraphQL"],
        deadline: "Oct 20",
        logo: "https://lh3.googleusercontent.com/aida-public/AB6AXuAI_cSOBIQEcEqGuxhgcHGanZMefTXB8VHhhEKGm7HOWjVd_dcKjo3_c9_OjWu2OD3cG4XndoIWaMF0z121FMMaofwoU4zchbcfi3dxaTepUTdNAUqPbF0d4MoSP4WaQ7Ohn1iOjAB2hbEXLvAkOk1SnHjIjm5KxkLDpLd7w1jza8ebAodnYwAR7t7t9Vdhx3nJ72gWSyxY5jnYxbmp2Vo48H4gUakGzZe_PjLqjmCHPsPm_OU43HXyX1n2wdhPBJn97Ainr8rSMyY",
        color: "rose",

        // Dynamic Styling for Airbnb (Rose/Red theme)
        theme: {
            border: "border-rose-500/20",
            hoverBorder: "hover:border-rose-500/50",
            hoverShadow: "hover:shadow-[0_0_30px_5px_rgba(244,63,94,0.5)]",
            topGradient: "from-rose-400 to-red-400",
            companyText: "text-rose-200",
            locationText: "text-red-200/80",
            tagBg: "bg-red-500/20",
            tagBorder: "border-red-400/30",
            tagText: "text-red-200",
            buttonBg: "bg-rose-600 hover:bg-rose-500",
            buttonShadow: "shadow-rose-900/30",
            bookmarkText: "text-rose-300"
        },
        aiMatch: 78
    },
    {
        id: 5,
        role: "AI Research Engineer",
        company: "Tesla",
        location: "Palo Alto, CA",
        desc: "Push the boundaries of autonomy with the Tesla Autopilot team. Expertise in Computer Vision and Deep Learning required.",
        tags: ["PyTorch", "C++", "Computer Vision"],
        deadline: "Dec 15",
        logo: "https://lh3.googleusercontent.com/aida-public/AB6AXuDaaGF73NllhvOhhi0ax1FCvI9Utj7Ie4kuegCJh09sAtTmiYdHBBWq8Tf0B-bPkizYIxjRAHJElynGJDZi58wJFl_4TCQCJE041pXBnOW3zazFhugHGycrlo6T_zcJA3Ejjv3pwrE1BUpv7Vmi9DmjRV5lazOirUkcCG2IG_9GyUhPSpIpaM7IGTX4ghZv7RjwCZb8bzPOgIbLw8ti-ZAho1C9x9B7wshPOuo4cVqNrAQiuz7irq6Bc7JamT7LlryiWwwPJ_K0cFA",
        color: "violet",

        // Dynamic Styling for Tesla (Violet/Purple theme)
        theme: {
            border: "border-violet-500/20",
            hoverBorder: "hover:border-violet-500/50",
            hoverShadow: "hover:shadow-[0_0_30px_5px_rgba(139,92,246,0.5)]",
            topGradient: "from-violet-400 to-purple-400",
            companyText: "text-violet-200",
            locationText: "text-purple-200/80",
            tagBg: "bg-purple-500/20",
            tagBorder: "border-purple-400/30",
            tagText: "text-purple-200",
            buttonBg: "bg-violet-600 hover:bg-violet-500",
            buttonShadow: "shadow-violet-900/30",
            bookmarkText: "text-violet-300"
        },
        aiMatch: 95
    },
    {
        id: 6,
        role: "Growth Marketing Lead",
        company: "RocketStart",
        location: "London, UK (Hybrid)",
        desc: "Lead our user acquisition strategies and drive growth through data-driven marketing campaigns.",
        tags: ["SEO/SEM", "Analytics", "Strategy"],
        deadline: "Oct 30",
        logo: null, 
        color: "teal",

        // Dynamic Styling for Startup (Teal/Emerald theme)
        theme: {
            border: "border-teal-500/20",
            hoverBorder: "hover:border-teal-500/50",
            hoverShadow: "hover:shadow-[0_0_30px_5px_rgba(20,184,166,0.5)]",
            topGradient: "from-teal-400 to-emerald-400",
            companyText: "text-teal-200",
            locationText: "text-emerald-200/80",
            tagBg: "bg-emerald-500/20",
            tagBorder: "border-emerald-400/30",
            tagText: "text-emerald-200",
            buttonBg: "bg-teal-600 hover:bg-teal-500",
            buttonShadow: "shadow-teal-900/30",
            bookmarkText: "text-teal-300"
        },
        aiMatch: 64
    }
  ];

  // --- 1. MOCK API: FETCH JOBS ---
  useEffect(() => {
    const fetchJobs = async () => {
        try {
            console.log("API: Fetching opportunity data...");
            await new Promise(resolve => setTimeout(resolve, 1200));
            setJobs(MOCK_JOBS);
            setLoading(false);
        } catch (error) {
            console.error("API Error:", error);
            setLoading(false);
        }
    };

    fetchJobs();
  }, []);

  // --- 2. MOCK LLM: SEMANTIC SEARCH ---
  const handleAiSearch = async (e) => {
    if (e.key === 'Enter' || e.type === 'click') {
        setIsAiProcessing(true);
        setJobs([]); 

        console.log(`LLM: Vectorizing query "${searchQuery}"...`);
        console.log("LLM: Performing cosine similarity search on job descriptions...");

        await new Promise(resolve => setTimeout(resolve, 1500));

        if (!searchQuery.trim()) {
            setJobs(MOCK_JOBS);
        } else {
            const filtered = MOCK_JOBS.filter(job => 
                job.role.toLowerCase().includes(searchQuery.toLowerCase()) || 
                job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
                job.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
            );
            setJobs(filtered);
        }
        setIsAiProcessing(false);
    }
  };

  return (
    <div className="bg-[#06457F] h-screen w-full flex overflow-hidden font-['Inter'] antialiased text-white selection:bg-[#0474C4] selection:text-white relative">
      
      {/* Styles Injection */}
      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap');
        .material-symbols-outlined { font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24; }
        .material-symbols-outlined.fill { font-variation-settings: 'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24; }
        .fill-1 { font-variation-settings: 'FILL' 1; }
        
        /* Custom Scrollbar */
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }

        ::-webkit-scrollbar { width: 8px; }
        ::-webkit-scrollbar-track { background: #06457F; }
        ::-webkit-scrollbar-thumb { background: rgba(255, 255, 255, 0.2); border-radius: 4px; }
        ::-webkit-scrollbar-thumb:hover { background: rgba(255, 255, 255, 0.3); }
        
        .animate-spin-slow { animation: spin 3s linear infinite; }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}} />

      {/* --- SIDEBAR --- */}
      <aside className="w-72 flex-shrink-0 flex flex-col border-r border-slate-300 bg-white relative z-20 shadow-xl font-['Space_Grotesk']">
        
        {/* LOGO SECTION - Exact Match from Dashboard Main with Text-LG icon */}
        <div className="p-6 flex items-center gap-3 select-none shrink-0">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#0474C4] to-cyan-400 flex items-center justify-center shadow-lg shadow-blue-500/30">
              {/* FIXED: Reduced to text-lg to match dashboard compactness */}
              <span className="material-symbols-outlined text-white text-lg">rocket_launch</span>
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
              <span className="text-sm font-bold text-slate-900 truncate">{userName}</span>
              <span className="text-[11px] font-medium text-slate-500 truncate">Pro Member</span>
            </div>
          </div>
        </div>
      </aside>

      {/* --- MAIN CONTENT AREA (UNTOUCHED LOGIC) --- */}
      <main className="flex-1 flex flex-col relative overflow-hidden bg-[#06457F]">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-fuchsia-600/30 via-[#06457F]/50 to-[#06457F] pointer-events-none"></div>
        <div className="absolute -top-[20%] -left-[10%] w-[800px] h-[800px] bg-blue-600/20 rounded-full blur-[120px] pointer-events-none mix-blend-overlay"></div>
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none mix-blend-color-dodge"></div>

        {/* Content Container */}
        <div className="flex-1 overflow-y-auto w-full relative z-10">
            <div className="max-w-[1400px] mx-auto p-6 md:p-8 lg:p-10 flex flex-col gap-8">
                
                {/* Header */}
                <header className="flex flex-col gap-2 relative z-10">
                    <h1 className="text-white text-3xl md:text-4xl font-black leading-tight tracking-tight drop-shadow-md">Internship / Job Opportunities</h1>
                    <p className="text-blue-100 text-base md:text-lg font-normal max-w-2xl opacity-90">Explore personalized opportunities tailored to your profile and kickstart your career journey.</p>
                </header>

                {/* Filters & Search */}
                <div className="flex flex-col gap-4 relative z-10">
                    <div className="flex flex-col lg:flex-row gap-4 items-stretch lg:items-center">
                        <div className="flex-1 relative group">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <span className="material-symbols-outlined text-white/70">search</span>
                            </div>
                            <input 
                                className="block w-full pl-10 pr-4 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl text-white placeholder-blue-100/60 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all shadow-lg shadow-blue-900/10" 
                                placeholder="AI Search: 'Roles for frontend dev with React skills'..." 
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                onKeyDown={handleAiSearch}
                            />
                        </div>
                        <div className="flex flex-wrap gap-2 md:gap-3 items-center">
                            <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 border border-blue-400/30 text-sm font-semibold text-white transition-all shadow-md shadow-blue-900/20">
                                <span>Industry</span>
                                <span className="material-symbols-outlined text-base">expand_more</span>
                            </button>
                            <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-500 hover:to-purple-400 border border-purple-400/30 text-sm font-semibold text-white transition-all shadow-md shadow-purple-900/20">
                                <span>Role Type</span>
                                <span className="material-symbols-outlined text-base">expand_more</span>
                            </button>
                            <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-fuchsia-600 to-fuchsia-500 hover:from-fuchsia-500 hover:to-fuchsia-400 border border-fuchsia-400/30 text-sm font-semibold text-white transition-all shadow-md shadow-fuchsia-900/20">
                                <span>Location</span>
                                <span className="material-symbols-outlined text-base">expand_more</span>
                            </button>
                            <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-600 to-cyan-500 hover:from-cyan-500 hover:to-cyan-400 border border-cyan-400/30 text-sm font-semibold text-white transition-all shadow-md shadow-cyan-900/20">
                                <span>Experience</span>
                                <span className="material-symbols-outlined text-base">expand_more</span>
                            </button>
                            <button onClick={() => { setSearchQuery(""); setJobs(MOCK_JOBS); }} className="ml-2 text-sm text-cyan-300 hover:text-white underline decoration-transparent hover:decoration-cyan-200 transition-all font-medium">
                                Clear Filters
                            </button>
                        </div>
                    </div>
                </div>

                {/* Loading / Empty / Data States */}
                {loading || isAiProcessing ? (
                    <div className="flex flex-col items-center justify-center py-20">
                        <div className="w-12 h-12 border-4 border-white/20 border-t-cyan-400 rounded-full animate-spin mb-4"></div>
                        <p className="text-white/70 animate-pulse">{isAiProcessing ? "AI is analyzing matching opportunities..." : "Fetching latest openings..."}</p>
                    </div>
                ) : jobs.length === 0 ? (
                    <div className="text-center py-20 text-white/60">
                        <span className="material-symbols-outlined text-4xl mb-2">search_off</span>
                        <p>No opportunities found matching your criteria.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 pb-10">
                        {jobs.map((job) => (
                            <div key={job.id} className={`group relative flex flex-col bg-[#262B40] border ${job.theme.border} rounded-2xl p-6 shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden ${job.theme.hoverShadow} ${job.theme.hoverBorder}`}>
                                <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${job.theme.topGradient}`}></div>
                                
                                {/* AI Score Badge */}
                                <div className="absolute top-4 right-4 flex items-center gap-1 bg-white/10 backdrop-blur-md px-2 py-1 rounded-full border border-white/10 z-20">
                                    <span className="material-symbols-outlined text-xs text-emerald-400">auto_awesome</span>
                                    <span className="text-xs font-bold text-white">{job.aiMatch}% Match</span>
                                </div>

                                <div className="flex justify-between items-start mb-5 relative z-10">
                                    <div className="h-14 w-14 rounded-xl bg-white flex items-center justify-center p-2.5 shadow-lg">
                                        {job.logo ? (
                                            <img alt={`${job.company} Logo`} className="w-full h-full object-contain" src={job.logo}/>
                                        ) : (
                                            <div className="text-slate-900 font-bold text-xs text-center leading-none">StartUp<br/>Inc.</div>
                                        )}
                                    </div>
                                    <button className={`${job.theme.bookmarkText} hover:text-white transition-colors p-2 rounded-full hover:bg-white/10 backdrop-blur-sm`}>
                                        <span className="material-symbols-outlined">bookmark_border</span>
                                    </button>
                                </div>
                                <div className="flex flex-col gap-1 mb-4 relative z-10">
                                    <h3 className="text-white text-xl font-bold leading-tight">{job.role}</h3>
                                    <p className={`${job.theme.companyText} text-sm font-semibold`}>{job.company}</p>
                                    <div className={`flex items-center gap-1.5 ${job.theme.locationText} text-sm mt-1`}>
                                        <span className="material-symbols-outlined text-base">location_on</span>
                                        <span>{job.location}</span>
                                    </div>
                                </div>
                                <p className="text-slate-300 text-sm mb-5 line-clamp-2 leading-relaxed relative z-10">
                                    {job.desc}
                                </p>
                                <div className="flex flex-wrap gap-2 mb-6 relative z-10">
                                    {job.tags.map((tag, i) => (
                                        <span key={i} className={`px-3 py-1.5 rounded-lg ${job.theme.tagBg} border ${job.theme.tagBorder} text-xs font-semibold ${job.theme.tagText}`}>
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                                <div className="mt-auto flex items-center justify-between border-t border-slate-700 pt-4 relative z-10">
                                    <span className="text-xs font-medium text-slate-400">Deadline: {job.deadline}</span>
                                    <button 
                                        onClick={(e) => { e.stopPropagation(); navigate('/internship/apply'); }}
                                        className={`${job.theme.buttonBg} text-white border border-transparent text-sm font-bold px-5 py-2.5 rounded-xl transition-all shadow-lg ${job.theme.buttonShadow}`}
                                    >
                                        View Details
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

            </div>
        </div>

      </main>
    </div>
  );
};

export default InternshipOpportunities;