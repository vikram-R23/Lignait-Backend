import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const HumanInterview = () => {
  const navigate = useNavigate();
  const [selectedDomain, setSelectedDomain] = useState('');
  const [placeholderText, setPlaceholderText] = useState('Technology, HR, Leadership...');
  const [userName, setUserName] = useState("Baskar Manager");

  // --------------------------------
  // CHATBOT STATE
  // --------------------------------
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const [chatMessages, setChatMessages] = useState([
    { id: 1, sender: 'ai', text: 'Hi Baskar! Preparing for a mentor mock interview? I can help you choose the right domain.' }
  ]);
  const chatEndRef = useRef(null);

  // --- API / LLM Initialization Logic ---
  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("System Ready: Module initialized."); 
      } catch (err) {
        console.log("Connection pending...");
      }
    };
    fetchData();
  }, []);

  // Auto-scroll Chat
  useEffect(() => {
    if (isChatOpen && chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [chatMessages, isChatOpen, isExpanded]);

  const handleChatSubmit = (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    const newUserMsg = { id: Date.now(), sender: 'user', text: chatInput };
    setChatMessages(prev => [...prev, newUserMsg]);
    setChatInput("");
    setTimeout(() => {
        const newAiMsg = { id: Date.now() + 1, sender: 'ai', text: "Excellent choice! Practicing with a mentor gives you invaluable feedback..." };
        setChatMessages(prev => [...prev, newAiMsg]);
    }, 1000);
  };

  const handleContinue = () => {
    if (selectedDomain) {
      console.log("Selected Domain for Human Mock:", selectedDomain);
      // navigate('/book-mentor-slot'); // Uncomment when next page is ready
    } else {
      alert("Please select a domain to continue.");
    }
  };

  const handleNavigate = (page) => {
    if (page === 'Dashboard') navigate('/dashboard/main');
    else navigate(`/${page.toLowerCase().replace(/\s+/g, '-')}`);
  };

  return (
    <div className="bg-[#06457F] text-white font-['Inter'] h-screen w-full flex overflow-hidden antialiased relative">
      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');

        /* Custom Scrollbar */
        .custom-scrollbar::-webkit-scrollbar { width: 8px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: #022c54; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #0474C4; border-radius: 4px; }
        
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }

        .material-symbols-outlined { font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24; }
        .material-symbols-outlined.fill { font-variation-settings: 'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24; }
        .fill-1 { font-variation-settings: 'FILL' 1; }

        /* Card Selection Effects */
        input[type="radio"]:checked + div {
            background-color: rgba(255, 255, 255, 0.12);
            border-color: currentColor;
            box-shadow: 0 0 15px currentColor;
        }
        input[type="radio"]:checked + div .check-icon {
            opacity: 1;
            transform: scale(1);
        }

        /* Hover Glow Effects */
        .card-tech:hover { box-shadow: 0 0 20px rgba(59, 130, 246, 0.6); border-color: rgba(59, 130, 246, 0.5); }
        .card-technical:hover { box-shadow: 0 0 20px rgba(16, 185, 129, 0.6); border-color: rgba(16, 185, 129, 0.5); }
        .card-hr:hover { box-shadow: 0 0 20px rgba(236, 72, 153, 0.6); border-color: rgba(236, 72, 153, 0.5); }
        .card-comm:hover { box-shadow: 0 0 20px rgba(245, 158, 11, 0.6); border-color: rgba(245, 158, 11, 0.5); }
        .card-freshers:hover { box-shadow: 0 0 20px rgba(139, 92, 246, 0.6); border-color: rgba(139, 92, 246, 0.5); }
        .card-leadership:hover { box-shadow: 0 0 20px rgba(239, 68, 68, 0.6); border-color: rgba(239, 68, 68, 0.5); }
        
        .search-container:hover input { box-shadow: 0 0 20px rgba(239, 68, 68, 0.5); border-color: rgba(239, 68, 68, 0.4); }
        
        .cursor-blink { animation: blink-animation 1s step-end infinite; }
        @keyframes blink-animation { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }

        /* Chat Animation */
        @keyframes slideUpFade {
            from { transform: translateY(20px) scale(0.95); opacity: 0; }
            to { transform: translateY(0) scale(1); opacity: 1; }
        }
        .chat-animate { animation: slideUpFade 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
      `}} />

      {/* --- SIDEBAR (Standardized) --- */}
      <aside className="w-72 flex-shrink-0 flex flex-col border-r border-slate-300 bg-white relative z-50 text-[#0F172A] shadow-xl h-full">
        <div className="p-6 flex items-center gap-3 select-none shrink-0">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#0474C4] to-cyan-400 flex items-center justify-center shadow-lg shadow-blue-500/30">
              <span className="material-symbols-outlined text-white text-xl">rocket_launch</span>
          </div>
          <span className="text-2xl font-black tracking-tight text-[#0F172A]">
              Career <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0474C4] to-cyan-500">Orbit</span>
          </span>
        </div>

        {/* Navigation - No Scrollbar */}
        <nav className="flex-1 px-4 py-4 flex flex-col gap-2 overflow-y-auto no-scrollbar">
          <button onClick={() => handleNavigate('Dashboard')} className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-600 hover:bg-slate-50 transition-colors group text-left w-full">
            <span className="material-symbols-outlined group-hover:text-[#06457F]">home</span>
            <span className="font-medium group-hover:text-[#06457F] transition-colors" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Dashboard</span>
          </button>
          
          <button onClick={() => handleNavigate('Roadmap')} className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-600 hover:bg-slate-50 transition-colors group text-left w-full">
            <span className="material-symbols-outlined group-hover:text-[#06457F] transition-colors">map</span>
            <span className="font-medium group-hover:text-[#06457F] transition-colors" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Career Roadmap</span>
          </button>

          <button onClick={() => handleNavigate('Mentors')} className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-600 hover:bg-slate-50 transition-colors group text-left w-full">
            <span className="material-symbols-outlined group-hover:text-[#06457F] transition-colors">groups</span>
            <span className="font-medium group-hover:text-[#06457F] transition-colors" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Mentorship</span>
          </button>
          
          <button onClick={() => handleNavigate('Resume')} className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-600 hover:bg-slate-50 transition-colors group text-left w-full">
            <span className="material-symbols-outlined group-hover:text-[#06457F] transition-colors">description</span>
            <span className="font-medium group-hover:text-[#06457F] transition-colors" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Resume</span>
          </button>

          {/* Active State for Mock Interview */}
          <button onClick={() => navigate('/mock-interview')} className="flex items-center gap-3 px-4 py-3 rounded-lg bg-[#06457F] text-white shadow-md text-left w-full">
            <span className="material-symbols-outlined fill-1">videocam</span>
            <span className="font-medium" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Mock Interview</span>
          </button>

          <button onClick={() => handleNavigate('My Bookings')} className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-600 hover:bg-slate-50 transition-colors group text-left w-full">
            <span className="material-symbols-outlined group-hover:text-[#06457F] transition-colors">calendar_month</span>
            <span className="font-medium group-hover:text-[#06457F] transition-colors" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>My Booking</span>
          </button>

          {/* Internship (Added) */}
          <button onClick={() => handleNavigate('Internships Jobs')} className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-600 hover:bg-slate-50 transition-colors group text-left w-full">
            <span className="material-symbols-outlined group-hover:text-[#06457F] transition-colors">work</span>
            <span className="font-medium group-hover:text-[#06457F] transition-colors" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Internship</span>
          </button>

          <button onClick={() => handleNavigate('LMS Courses')} className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-600 hover:bg-slate-50 transition-colors group text-left w-full">
            <span className="material-symbols-outlined group-hover:text-[#06457F] transition-colors">book</span>
            <span className="font-medium group-hover:text-[#06457F] transition-colors" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>LMS Courses</span>
          </button>

          <button onClick={() => handleNavigate('Practice Ground')} className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-600 hover:bg-slate-50 transition-colors group text-left w-full">
            <span className="material-symbols-outlined group-hover:text-[#06457F] transition-colors">code</span>
            <span className="font-medium group-hover:text-[#06457F] transition-colors" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Practice Ground</span>
          </button>

          <button onClick={() => handleNavigate('Settings')} className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-600 hover:bg-slate-50 transition-colors group text-left w-full">
            <span className="material-symbols-outlined group-hover:text-[#06457F] transition-colors">settings</span>
            <span className="font-medium group-hover:text-[#06457F] transition-colors" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Settings</span>
          </button>
        </nav>

        {/* --- COMPACT PROFILE SECTION (FIXED AT BOTTOM) --- */}
        <div className="p-3 border-t border-slate-300 shrink-0 mt-auto bg-white z-20">
          <div onClick={() => navigate('/profile')} className="flex items-center gap-3 px-2 py-1.5 rounded-lg cursor-pointer hover:bg-slate-50 transition-colors">
            {/* Reduced size-9 */}
            <div className="size-9 rounded-full bg-cover bg-center border border-slate-300 shrink-0" style={{ backgroundImage: "url('https://ui-avatars.com/api/?name=B+&background=06457F&color=fff')" }}></div>
            <div className="flex flex-col min-w-0">
              <span className="text-sm font-semibold text-slate-900 truncate" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{userName}</span>
              <span className="text-[11px] text-slate-600 truncate" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Pro Member</span>
            </div>
          </div>
        </div>
      </aside>

      {/* --- MAIN CONTENT AREA --- */}
      <main className="flex-grow flex flex-col items-center justify-start pt-12 pb-20 px-4 sm:px-6 lg:px-8 overflow-y-auto custom-scrollbar w-full bg-[linear-gradient(135deg,_#021B35_0%,_#06457F_50%,_#032E56_100%)] relative">
        {/* Background Glows */}
        <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
            <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[100px] mix-blend-screen"></div>
            <div className="absolute top-[20%] right-[-10%] w-[400px] h-[400px] bg-blue-500/20 rounded-full blur-[100px] mix-blend-screen"></div>
            <div className="absolute bottom-[-10%] left-[20%] w-[600px] h-[600px] bg-teal-500/10 rounded-full blur-[120px] mix-blend-screen"></div>
        </div>

        <div className="w-full max-w-5xl flex flex-col gap-8 z-10">
          
          {/* Header & Search */}
          <div className="text-center space-y-8 py-4">
            <div className="space-y-3">
              <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight drop-shadow-lg" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-200 via-white to-purple-200">Select Interview Domain</span>
              </h2>
              <p className="text-blue-100/80 text-lg max-w-2xl mx-auto font-normal">
                Choose the domain you want to practice with a mentor.
              </p>
            </div>
            <div className="flex items-center justify-center gap-3 w-full max-w-3xl mx-auto">
              <div className="w-full relative group search-container">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-10">
                  <span className="material-symbols-outlined text-blue-200/70 group-focus-within:text-white transition-colors duration-300" style={{fontSize: '24px'}}>search</span>
                </div>
                <input 
                  className="w-full bg-white/10 hover:bg-white/20 focus:bg-white/25 border border-white/20 rounded-xl py-4 pl-12 pr-4 text-white placeholder-blue-200/50 focus:outline-none focus:ring-0 transition-all duration-300 shadow-lg backdrop-blur-md" 
                  placeholder={`Search domains (e.g., ${placeholderText})`}
                  type="text"
                />
              </div>
              <button className="flex-shrink-0 w-12 h-12 md:w-auto md:h-auto md:px-5 md:py-3.5 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl flex items-center justify-center gap-2 text-white font-medium transition-all duration-300 hover:shadow-lg backdrop-blur-md active:scale-95 group/btn" title="Reshuffle Suggestions">
                <span className="material-symbols-outlined group-hover/btn:rotate-180 transition-transform duration-500" style={{fontSize: '24px'}}>refresh</span>
                <span className="hidden md:inline">Reshuffle</span>
              </button>
            </div>
          </div>

          {/* AI Suggestion Banner */}
          <div className="relative overflow-hidden rounded-2xl border border-red-500 bg-gradient-to-r from-indigo-900/40 via-[#06457F]/50 to-purple-900/40 p-5 sm:p-6 shadow-xl backdrop-blur-md transition-all duration-300 hover:border-red-500 hover:shadow-[0_0_35px_5px_rgba(239,68,68,0.6)] hover:ring-2 hover:ring-red-500/50 group">
            <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-indigo-500/20 blur-3xl transition-all group-hover:bg-indigo-500/30"></div>
            <div className="relative flex flex-col sm:flex-row gap-4 items-start sm:items-center">
              <div className="flex-shrink-0 flex items-center justify-center size-12 rounded-full bg-gradient-to-br from-white/10 to-white/5 ring-1 ring-white/20 shadow-[0_0_20px_rgba(255,255,255,0.15)]">
                <span className="material-symbols-outlined text-[28px] animate-pulse bg-gradient-to-tr from-yellow-300 via-pink-500 to-cyan-400 bg-clip-text text-transparent">auto_awesome</span>
              </div>
              <div className="flex-1 space-y-1.5">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-indigo-200 bg-indigo-500/20 border border-indigo-500/30 px-2 py-0.5 rounded-full shadow-sm">AI Suggestion</span>
                </div>
                <p className="text-white/95 text-base leading-relaxed">
                  Based on your profile and career goal, <span className="font-bold text-white underline decoration-indigo-400 decoration-2 underline-offset-2">Technology</span> interviews may help you most right now<span className="cursor-blink inline-block w-[2px] h-[1em] bg-indigo-300 ml-0.5 align-middle"></span>
                </p>
              </div>
              <div className="flex flex-shrink-0 items-center gap-1 sm:gap-2">
                <button aria-label="Reshuffle suggestion" className="group/reshuffle flex items-center justify-center p-2 rounded-full text-indigo-200/60 hover:text-white hover:bg-white/10 transition-colors" title="Reshuffle Suggestion">
                  <span className="material-symbols-outlined text-[20px] transition-transform duration-500 group-hover/reshuffle:rotate-180">refresh</span>
                </button>
                <button aria-label="Dismiss suggestion" className="flex items-center justify-center p-2 rounded-full text-indigo-200/60 hover:text-white hover:bg-white/10 transition-colors">
                  <span className="material-symbols-outlined text-[20px]">close</span>
                </button>
              </div>
            </div>
          </div>

          {/* Domain Cards Grid */}
          <form className="w-full">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              
              {/* Technology */}
              <label className="group relative cursor-pointer block h-full select-none text-blue-400">
                <input className="peer domain-radio card-tech sr-only" name="domain" type="radio" value="technology" onChange={(e) => setSelectedDomain(e.target.value)}/>
                <div className="h-full flex flex-col p-6 rounded-xl border border-white/10 bg-gradient-to-br from-white/10 to-white/5 hover:from-blue-500/10 hover:to-blue-600/5 transition-all duration-300 backdrop-blur-sm">
                  <div className="flex justify-between items-start mb-4">
                    <div className="w-14 h-14 rounded-xl bg-blue-500/20 flex items-center justify-center text-blue-400 group-hover:bg-blue-500 group-hover:text-white transition-all duration-300 shadow-inner group-hover:shadow-blue-500/50">
                      <span className="material-symbols-outlined" style={{fontSize: '32px'}}>code</span>
                    </div>
                    <div className="check-icon w-6 h-6 rounded-full bg-blue-500 text-white flex items-center justify-center opacity-0 scale-75 transition-all duration-200 shadow-lg shadow-blue-500/40">
                      <span className="material-symbols-outlined" style={{fontSize: '16px', fontWeight: 'bold'}}>check</span>
                    </div>
                  </div>
                  <div className="mt-auto">
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-300 transition-colors">Technology</h3>
                    <p className="text-blue-100/70 text-sm leading-relaxed font-light">Software development, IT, coding, and system architecture.</p>
                  </div>
                </div>
              </label>

              {/* Technical */}
              <label className="group relative cursor-pointer block h-full select-none text-emerald-400">
                <input className="peer domain-radio card-technical sr-only" name="domain" type="radio" value="technical" onChange={(e) => setSelectedDomain(e.target.value)}/>
                <div className="h-full flex flex-col p-6 rounded-xl border border-white/10 bg-gradient-to-br from-white/10 to-white/5 hover:from-emerald-500/10 hover:to-emerald-600/5 transition-all duration-300 backdrop-blur-sm">
                  <div className="flex justify-between items-start mb-4">
                    <div className="w-14 h-14 rounded-xl bg-emerald-500/20 flex items-center justify-center text-emerald-400 group-hover:bg-emerald-500 group-hover:text-white transition-all duration-300 shadow-inner group-hover:shadow-emerald-500/50">
                      <span className="material-symbols-outlined" style={{fontSize: '32px'}}>engineering</span>
                    </div>
                    <div className="check-icon w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center opacity-0 scale-75 transition-all duration-200 shadow-lg shadow-emerald-500/40">
                      <span className="material-symbols-outlined" style={{fontSize: '16px', fontWeight: 'bold'}}>check</span>
                    </div>
                  </div>
                  <div className="mt-auto">
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-emerald-300 transition-colors">Technical</h3>
                    <p className="text-emerald-100/70 text-sm leading-relaxed font-light">Core engineering - Mechanical, Civil, Electrical & core sciences.</p>
                  </div>
                </div>
              </label>

              {/* HR */}
              <label className="group relative cursor-pointer block h-full select-none text-pink-400">
                <input className="peer domain-radio card-hr sr-only" name="domain" type="radio" value="hr" onChange={(e) => setSelectedDomain(e.target.value)}/>
                <div className="h-full flex flex-col p-6 rounded-xl border border-white/10 bg-gradient-to-br from-white/10 to-white/5 hover:from-pink-500/10 hover:to-pink-600/5 transition-all duration-300 backdrop-blur-sm">
                  <div className="flex justify-between items-start mb-4">
                    <div className="w-14 h-14 rounded-xl bg-pink-500/20 flex items-center justify-center text-pink-400 group-hover:bg-pink-500 group-hover:text-white transition-all duration-300 shadow-inner group-hover:shadow-pink-500/50">
                      <span className="material-symbols-outlined" style={{fontSize: '32px'}}>groups</span>
                    </div>
                    <div className="check-icon w-6 h-6 rounded-full bg-pink-500 text-white flex items-center justify-center opacity-0 scale-75 transition-all duration-200 shadow-lg shadow-pink-500/40">
                      <span className="material-symbols-outlined" style={{fontSize: '16px', fontWeight: 'bold'}}>check</span>
                    </div>
                  </div>
                  <div className="mt-auto">
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-pink-300 transition-colors">HR / Behavioral</h3>
                    <p className="text-pink-100/70 text-sm leading-relaxed font-light">HR rounds, culture fit, situational questions & personality tests.</p>
                  </div>
                </div>
              </label>

              {/* Communication */}
              <label className="group relative cursor-pointer block h-full select-none text-amber-400">
                <input className="peer domain-radio card-comm sr-only" name="domain" type="radio" value="communication" onChange={(e) => setSelectedDomain(e.target.value)}/>
                <div className="h-full flex flex-col p-6 rounded-xl border border-white/10 bg-gradient-to-br from-white/10 to-white/5 hover:from-amber-500/10 hover:to-amber-600/5 transition-all duration-300 backdrop-blur-sm">
                  <div className="flex justify-between items-start mb-4">
                    <div className="w-14 h-14 rounded-xl bg-amber-500/20 flex items-center justify-center text-amber-400 group-hover:bg-amber-500 group-hover:text-white transition-all duration-300 shadow-inner group-hover:shadow-amber-500/50">
                      <span className="material-symbols-outlined" style={{fontSize: '32px'}}>chat_bubble</span>
                    </div>
                    <div className="check-icon w-6 h-6 rounded-full bg-amber-500 text-white flex items-center justify-center opacity-0 scale-75 transition-all duration-200 shadow-lg shadow-amber-500/40">
                      <span className="material-symbols-outlined" style={{fontSize: '16px', fontWeight: 'bold'}}>check</span>
                    </div>
                  </div>
                  <div className="mt-auto">
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-amber-300 transition-colors">Communication</h3>
                    <p className="text-amber-100/70 text-sm leading-relaxed font-light">Fluency, articulation, confidence & presentation skills.</p>
                  </div>
                </div>
              </label>

              {/* Freshers */}
              <label className="group relative cursor-pointer block h-full select-none text-violet-400">
                <input className="peer domain-radio card-fresher sr-only" name="domain" type="radio" value="freshers" onChange={(e) => setSelectedDomain(e.target.value)}/>
                <div className="h-full flex flex-col p-6 rounded-xl border border-white/10 bg-gradient-to-br from-white/10 to-white/5 hover:from-violet-500/10 hover:to-violet-600/5 transition-all duration-300 backdrop-blur-sm">
                  <div className="flex justify-between items-start mb-4">
                    <div className="w-14 h-14 rounded-xl bg-violet-500/20 flex items-center justify-center text-violet-400 group-hover:bg-violet-500 group-hover:text-white transition-all duration-300 shadow-inner group-hover:shadow-violet-500/50">
                      <span className="material-symbols-outlined" style={{fontSize: '32px'}}>school</span>
                    </div>
                    <div className="check-icon w-6 h-6 rounded-full bg-violet-500 text-white flex items-center justify-center opacity-0 scale-75 transition-all duration-200 shadow-lg shadow-violet-500/40">
                      <span className="material-symbols-outlined" style={{fontSize: '16px', fontWeight: 'bold'}}>check</span>
                    </div>
                  </div>
                  <div className="mt-auto">
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-violet-300 transition-colors">Freshers</h3>
                    <p className="text-violet-100/70 text-sm leading-relaxed font-light">Entry-level, campus placements & aptitude rounds.</p>
                  </div>
                </div>
              </label>

              {/* Leadership */}
              <label className="group relative cursor-pointer block h-full select-none text-red-400">
                <input className="peer domain-radio card-leader sr-only" name="domain" type="radio" value="leadership" onChange={(e) => setSelectedDomain(e.target.value)}/>
                <div className="h-full flex flex-col p-6 rounded-xl border border-white/10 bg-gradient-to-br from-white/10 to-white/5 hover:from-red-500/10 hover:to-red-600/5 transition-all duration-300 backdrop-blur-sm">
                  <div className="flex justify-between items-start mb-4">
                    <div className="w-14 h-14 rounded-xl bg-red-500/20 flex items-center justify-center text-red-400 group-hover:bg-red-500 group-hover:text-white transition-all duration-300 shadow-inner group-hover:shadow-red-500/50">
                      <span className="material-symbols-outlined" style={{fontSize: '32px'}}>flag</span>
                    </div>
                    <div className="check-icon w-6 h-6 rounded-full bg-red-500 text-white flex items-center justify-center opacity-0 scale-75 transition-all duration-200 shadow-lg shadow-red-500/40">
                      <span className="material-symbols-outlined" style={{fontSize: '16px', fontWeight: 'bold'}}>check</span>
                    </div>
                  </div>
                  <div className="mt-auto">
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-red-300 transition-colors">Leadership</h3>
                    <p className="text-red-100/70 text-sm leading-relaxed font-light">Managerial & team-leading roles, strategy & executive presence.</p>
                  </div>
                </div>
              </label>

            </div>
          </form>

          {/* Continue Button */}
          <div className="sticky bottom-6 z-40 flex justify-center mt-6">
            <div className="bg-[#06457F]/80 backdrop-blur-xl p-2 rounded-2xl border border-white/10 shadow-[0_0_40px_rgba(0,0,0,0.5)]">
              <button 
                onClick={handleContinue}
                className="peer group flex min-w-[240px] cursor-pointer items-center justify-center rounded-xl bg-gradient-to-r from-[#0474C4] to-[#0891f2] px-8 py-4 text-lg font-bold text-white shadow-lg transition-all hover:to-[#38bdf8] hover:shadow-[0_0_25px_rgba(4,116,196,0.6)] hover:scale-[1.02] active:scale-[0.98]"
              >
                Continue
                <span className="material-symbols-outlined ml-2 text-[22px] transition-transform group-hover:translate-x-1">arrow_forward</span>
              </button>
            </div>
          </div>

        </div>
      </main>

      {/* ======================================================= */}
      {/* EXPANDABLE CHATBOT CART */}
      {/* ======================================================= */}
      <div 
        className={
            isExpanded 
            ? "fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 transition-all duration-300"
            : "fixed bottom-6 right-6 z-50 flex flex-col items-end gap-4 transition-all duration-300"
        }
      >
        
        {/* Chat Interface Window */}
        {isChatOpen && (
            <div className={
                isExpanded
                ? "w-full max-w-5xl h-[85vh] bg-[#06457F] rounded-2xl border border-white/30 shadow-[0_0_50px_rgba(4,116,196,0.5)] flex flex-col overflow-hidden chat-animate"
                : "w-[380px] h-[550px] bg-[#06457F] rounded-2xl border border-white/20 ring-1 ring-cyan-500/40 shadow-2xl flex flex-col overflow-hidden chat-animate origin-bottom-right"
            }>
                {/* Header */}
                <div className="p-4 bg-[#0B3D91] flex items-center justify-between border-b border-white/10 shrink-0">
                    <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-white">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12.375m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.159 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
                            </svg>
                        </div>
                        <div>
                            <h3 className="text-white font-bold text-sm">Career Assistant</h3>
                            <p className="text-white/60 text-xs flex items-center gap-1">
                                <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse"></span> Online
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center gap-1">
                        <button onClick={() => setIsExpanded(!isExpanded)} className="text-white/70 hover:text-white p-2 rounded-lg hover:bg-white/10 transition-colors" title={isExpanded ? "Collapse" : "Expand"}>
                            <span className="material-symbols-outlined text-[20px]">{isExpanded ? 'close_fullscreen' : 'open_in_full'}</span>
                        </button>
                        <button onClick={() => { setIsChatOpen(false); setIsExpanded(false); }} className="text-white/70 hover:text-white p-2 rounded-lg hover:bg-white/10 transition-colors">
                            <span className="material-symbols-outlined text-[20px]">close</span>
                        </button>
                    </div>
                </div>

                {/* Messages Area */}
                <div className="flex-1 bg-[#06457F] overflow-y-auto p-4 space-y-4">
                    {chatMessages.map((msg) => (
                        <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                            <div className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm ${
                                msg.sender === 'user' 
                                ? 'bg-[#0474C4] text-white rounded-br-none' 
                                : 'bg-white/10 border border-white/10 text-white rounded-bl-none'
                            }`}>
                                {msg.text}
                            </div>
                        </div>
                    ))}
                    <div ref={chatEndRef} />
                </div>

                {/* Input Area */}
                <form onSubmit={handleChatSubmit} className="p-3 bg-[#0A4F8F] border-t border-white/10 flex gap-2 shrink-0">
                    <input 
                        type="text" 
                        value={chatInput}
                        onChange={(e) => setChatInput(e.target.value)}
                        placeholder="Ask me anything..." 
                        className="flex-1 bg-[#06457F] border border-white/20 rounded-lg px-3 py-2 text-sm text-white placeholder-white/40 focus:outline-none focus:border-[#0474C4]"
                    />
                    <button type="submit" className="p-2 bg-[#0474C4] hover:bg-[#0360a3] text-white rounded-lg flex items-center justify-center transition-colors">
                        <span className="material-symbols-outlined text-[20px]">send</span>
                    </button>
                </form>
            </div>
        )}

        {/* Toggle Button (FAB) */}
        {!isExpanded && (
            <button 
                onClick={() => setIsChatOpen(!isChatOpen)}
                className="h-16 w-16 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white shadow-xl shadow-cyan-500/30 flex items-center justify-center transition-all hover:scale-105 active:scale-95 group relative z-50 ring-4 ring-cyan-500/20 border border-white/20"
            >
                {isChatOpen ? (
                    <span className="material-symbols-outlined text-[32px]">keyboard_arrow_down</span>
                ) : (
                    <div className="relative">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12.375m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.159 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
                        </svg>
                        <span className="absolute -top-1 -right-1 flex h-3 w-3">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500 border-2 border-white"></span>
                        </span>
                    </div>
                )}
            </button>
        )}
      </div>

    </div>
  );
};

export default HumanInterview;