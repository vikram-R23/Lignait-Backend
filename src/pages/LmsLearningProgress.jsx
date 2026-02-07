import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const LmsLearningProgress = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("Baskar Manager");

  // --------------------------------
  // CHATBOT STATE
  // --------------------------------
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const [chatMessages, setChatMessages] = useState([
    { id: 1, sender: 'ai', text: 'Hi Baskar! Great progress on your courses. Need a motivation boost or help with the next module?' }
  ]);
  const chatEndRef = useRef(null);

  // --- API / LLM Initialization Logic ---
  useEffect(() => {
    const fetchProgressData = async () => {
      try {
        console.log("System Ready: Learning Progress module initialized.");
      } catch (err) {
        console.log("Connection pending...");
      }
    };
    fetchProgressData();
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
        const newAiMsg = { id: Date.now() + 1, sender: 'ai', text: "Keep up the momentum! You're doing great." };
        setChatMessages(prev => [...prev, newAiMsg]);
    }, 1000);
  };

  const handleNavigate = (page) => {
    if (page === 'Dashboard') navigate('/dashboard/main');
    else navigate(`/${page.toLowerCase().replace(/\s+/g, '-')}`);
  };

  return (
    <div className="flex h-screen w-full overflow-hidden bg-gradient-to-br from-[#06457F] via-[#094b85] to-[#04284d] text-white font-['Inter'] antialiased relative">
      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;900&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap');

        /* Custom Scrollbar */
        ::-webkit-scrollbar { width: 8px; }
        ::-webkit-scrollbar-track { background: #06457F; }
        ::-webkit-scrollbar-thumb { background: #095290; border-radius: 4px; }
        ::-webkit-scrollbar-thumb:hover { background: #0474C4; }

        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }

        /* Smooth Scrolling */
        html, body, .smooth-scroll { scroll-behavior: smooth; }

        /* Force outlined icons */
        .material-symbols-outlined { font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24; }
        .material-symbols-outlined.fill { font-variation-settings: 'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24; }
        
        .font-variation-fill { font-variation-settings: 'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24; }

        /* Chat Animation */
        @keyframes slideUpFade {
            from { transform: translateY(20px) scale(0.95); opacity: 0; }
            to { transform: translateY(0) scale(1); opacity: 1; }
        }
        .chat-animate { animation: slideUpFade 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
      `}} />

      {/* --- SIDEBAR --- */}
      <aside className="w-72 flex-shrink-0 flex flex-col border-r border-slate-300 bg-white relative z-50 text-[#0F172A] font-['Space_Grotesk']">
        <div className="p-6 flex items-center gap-3 select-none shrink-0">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#0474C4] to-cyan-400 flex items-center justify-center shadow-lg shadow-blue-500/30">
              <span className="material-symbols-outlined text-white text-xl">rocket_launch</span>
          </div>
          <span className="text-2xl font-black tracking-tight text-[#0F172A]">
              Career <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0474C4] to-cyan-500">Orbit</span>
          </span>
        </div>

        <nav className="flex-1 px-4 py-4 flex flex-col gap-2 overflow-y-auto no-scrollbar">
          <button onClick={() => handleNavigate('Dashboard')} className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-600 hover:bg-slate-50 transition-colors group text-left w-full">
            <span className="material-symbols-outlined group-hover:text-[#06457F]">home</span>
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

          {/* Internship (Added) */}
          <button onClick={() => handleNavigate('Internships Jobs')} className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-600 hover:bg-slate-50 transition-colors group text-left w-full">
            <span className="material-symbols-outlined group-hover:text-[#06457F] transition-colors">work</span>
            <span className="font-medium group-hover:text-[#06457F] transition-colors">Internship</span>
          </button>

          {/* Active State for LMS Courses */}
          <button onClick={() => navigate('/lms-courses')} className="flex items-center gap-3 px-4 py-3 rounded-lg bg-[#06457F] text-white shadow-md text-left w-full">
            <span className="material-symbols-outlined fill">menu_book</span>
            <span className="font-medium">LMS Courses</span>
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
              {/* UPDATED: Changed to text-slate-500 for a lighter/softer color */}
              <span className="text-[11px] text-slate-500 truncate">Pro Member</span>
            </div>
          </div>
        </div>
      </aside>

      {/* --- MAIN CONTENT AREA --- */}
      <main className="flex-1 h-full overflow-y-auto relative z-10 smooth-scroll">
        <div className="max-w-6xl mx-auto px-6 py-8 md:px-12 md:py-10">
          
          {/* Header */}
          <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
            <div className="space-y-2">
              <h1 className="text-3xl md:text-4xl font-black tracking-tight text-white drop-shadow-sm">My Learning Progress</h1>
              <p className="text-blue-100 text-base font-normal">Track your courses, goals, and achievements.</p>
            </div>
            <button 
              onClick={() => navigate('/dashboard')}
              className="flex items-center justify-center gap-2 bg-white text-[#0474C4] hover:bg-blue-50 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 text-sm font-bold py-2.5 px-6 rounded-lg shadow-lg shadow-black/10"
            >
              <span>Go to Dashboard</span>
              <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
            </button>
          </header>

          {/* Stats Section */}
          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
            {/* Started */}
            <div className="bg-gradient-to-br from-blue-600 to-blue-800 p-5 rounded-xl border border-white/10 shadow-lg relative overflow-hidden group transition-all duration-300 hover:shadow-2xl hover:scale-[1.02] hover:border-blue-400/50 hover:from-blue-500 hover:to-blue-700">
              <div className="absolute right-0 top-0 w-32 h-32 bg-white/5 rounded-full blur-3xl -mr-10 -mt-10 group-hover:bg-white/10 transition-colors duration-500"></div>
              <div className="flex items-center gap-3 mb-2 relative z-10">
                <div className="p-2 bg-white/20 rounded-lg text-white group-hover:bg-white/30 transition-colors">
                  <span className="material-symbols-outlined text-[24px]">play_circle</span>
                </div>
                <p className="text-blue-100 text-sm font-medium">Courses Started</p>
              </div>
              <p className="text-white text-3xl font-bold pl-1 relative z-10">2</p>
            </div>

            {/* Completed */}
            <div className="bg-gradient-to-br from-emerald-600 to-emerald-800 p-5 rounded-xl border border-white/10 shadow-lg relative overflow-hidden group transition-all duration-300 hover:shadow-2xl hover:scale-[1.02] hover:border-emerald-400/50 hover:from-emerald-500 hover:to-emerald-700">
              <div className="absolute right-0 top-0 w-32 h-32 bg-white/5 rounded-full blur-3xl -mr-10 -mt-10 group-hover:bg-white/10 transition-colors duration-500"></div>
              <div className="flex items-center gap-3 mb-2 relative z-10">
                <div className="p-2 bg-white/20 rounded-lg text-white group-hover:bg-white/30 transition-colors">
                  <span className="material-symbols-outlined text-[24px]">check_circle</span>
                </div>
                <p className="text-emerald-100 text-sm font-medium">Completed</p>
              </div>
              <p className="text-white text-3xl font-bold pl-1 relative z-10">1</p>
            </div>

            {/* Certificates */}
            <div className="bg-gradient-to-br from-orange-500 to-orange-700 p-5 rounded-xl border border-white/10 shadow-lg relative overflow-hidden group transition-all duration-300 hover:shadow-2xl hover:scale-[1.02] hover:border-orange-400/50 hover:from-orange-400 hover:to-orange-600">
              <div className="absolute right-0 top-0 w-32 h-32 bg-white/5 rounded-full blur-3xl -mr-10 -mt-10 group-hover:bg-white/10 transition-colors duration-500"></div>
              <div className="flex items-center gap-3 mb-2 relative z-10">
                <div className="p-2 bg-white/20 rounded-lg text-white group-hover:bg-white/30 transition-colors">
                  <span className="material-symbols-outlined text-[24px]">workspace_premium</span>
                </div>
                <p className="text-orange-100 text-sm font-medium">Certificates</p>
              </div>
              <p className="text-white text-3xl font-bold pl-1 relative z-10">1</p>
            </div>

            {/* Coins */}
            <div className="bg-gradient-to-br from-yellow-500 to-yellow-700 p-5 rounded-xl border border-white/10 shadow-lg relative overflow-hidden group transition-all duration-300 hover:shadow-2xl hover:scale-[1.02] hover:border-yellow-400/50 hover:from-yellow-400 hover:to-yellow-600">
              <div className="absolute -right-4 -top-4 w-24 h-24 bg-white/20 rounded-full blur-xl animate-pulse group-hover:bg-white/30 transition-colors"></div>
              <div className="flex items-center gap-3 mb-2 relative z-10">
                <div className="p-2 bg-white/20 rounded-lg text-white group-hover:bg-white/30 transition-colors">
                  <span className="material-symbols-outlined text-[24px]">monetization_on</span>
                </div>
                <p className="text-yellow-100 text-sm font-medium">Credit Coins</p>
              </div>
              <p className="text-white text-3xl font-bold pl-1 relative z-10">50 <span className="text-xl align-middle opacity-90">🪙</span></p>
            </div>
          </section>

          {/* --- SECTION 1: IN PROGRESS (Python Course) --- */}
          <section className="mb-10">
            <div className="flex items-center justify-between mb-5 px-1">
              <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2 drop-shadow-sm">
                <span className="material-symbols-outlined text-blue-300">hourglass_top</span>
                In Progress
              </h2>
            </div>
            
            <div className="flex flex-col gap-5">
              
              {/* Python Course Card */}
              <div className="bg-gradient-to-br from-[#0c5999] to-[#063b6e] rounded-xl border border-white/10 p-5 md:p-6 shadow-md transition-all duration-300 hover:shadow-2xl hover:scale-[1.01] hover:border-blue-300/60 hover:brightness-105 group">
                <div className="flex flex-col lg:flex-row gap-6">
                  {/* Image: Professional Python/Code */}
                  <div 
                    className="w-full lg:w-48 h-32 shrink-0 rounded-lg bg-cover bg-center relative overflow-hidden shadow-inner" 
                    style={{ backgroundImage: "url('https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80')" }}
                  >
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-all duration-300"></div>
                  </div>
                  <div className="flex-1 flex flex-col justify-between gap-4">
                    <div>
                      <div className="flex flex-wrap justify-between items-start gap-4 mb-2">
                        <div>
                          <h3 className="text-lg font-bold text-white leading-tight mb-1 group-hover:text-blue-200 transition-colors">Advanced Python for Data Science</h3>
                          <p className="text-blue-200/80 text-sm">Provider: <span className="text-white font-medium">Coursera</span> • Goal: <span className="text-white font-medium">Earn Certificate</span></p>
                        </div>
                        <div className="bg-blue-900/40 px-3 py-1 rounded-full border border-blue-400/30 text-xs font-medium text-blue-100 shadow-sm backdrop-blur-sm group-hover:border-blue-300/50 group-hover:bg-blue-800/50 transition-colors">
                          Target: Dec 15, 2023
                        </div>
                      </div>
                      <div className="w-full bg-black/30 rounded-full h-3 mb-2 mt-2 border border-white/5">
                        <div className="bg-gradient-to-r from-blue-400 to-cyan-400 h-full rounded-full shadow-[0_0_10px_rgba(34,211,238,0.5)] group-hover:shadow-[0_0_15px_rgba(34,211,238,0.8)] transition-all" style={{ width: '65%' }}></div>
                      </div>
                      <p className="text-xs text-blue-200 text-right font-medium">65% Complete</p>
                    </div>
                    <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-white/10">
                      <div className="flex items-center gap-2 mr-auto">
                        <span className="text-sm text-blue-200/80">Status:</span>
                        <div className="relative">
                          <button className="flex items-center gap-1 text-sm font-medium text-white bg-white/10 hover:bg-white/20 hover:scale-105 border border-white/5 px-3 py-1.5 rounded transition-all shadow-sm">
                            In Progress
                            <span className="material-symbols-outlined text-[16px]">expand_more</span>
                          </button>
                        </div>
                      </div>
                      <button className="text-blue-200 hover:text-white hover:bg-white/5 hover:translate-x-1 text-sm font-medium px-4 py-2 rounded transition-all">
                        View Details
                      </button>
                      <button 
                        onClick={() => navigate('/lms-courses')}
                        className="bg-[#0474C4] hover:bg-[#0361a3] hover:shadow-[#0474C4]/60 hover:-translate-y-0.5 text-white text-sm font-bold px-4 py-2 rounded shadow-lg shadow-[#0474C4]/20 transition-all flex items-center gap-2"
                      >
                        <span>View Course</span>
                        <span className="material-symbols-outlined text-[16px]">open_in_new</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* --- SECTION 2: NOT STARTED (UX Design) --- */}
          <section className="mb-10">
            <div className="flex items-center justify-between mb-5 px-1">
              <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2 drop-shadow-sm">
                <span className="material-symbols-outlined text-slate-400">schedule</span>
                Not Started
              </h2>
            </div>

            <div className="flex flex-col gap-5">
              
              {/* UX Design Course Card */}
              <div className="bg-gradient-to-br from-[#2a4563] to-[#1a2e45] rounded-xl border border-white/10 p-5 md:p-6 shadow-md transition-all duration-300 hover:shadow-2xl hover:scale-[1.01] hover:border-slate-300/40 hover:brightness-105 group">
                <div className="flex flex-col lg:flex-row gap-6">
                  {/* UX Image */}
                  <div 
                    className="w-full lg:w-48 h-32 shrink-0 rounded-lg bg-cover bg-center relative overflow-hidden shadow-inner" 
                    style={{ backgroundImage: "url('https://images.unsplash.com/photo-1541462608143-67571c6738dd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80')" }}
                  >
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-all duration-300"></div>
                  </div>
                  <div className="flex-1 flex flex-col justify-between gap-4">
                    <div>
                      <div className="flex flex-wrap justify-between items-start gap-4 mb-2">
                        <div>
                          <h3 className="text-lg font-bold text-white leading-tight mb-1 group-hover:text-blue-100 transition-colors">UX Design Fundamentals</h3>
                          <p className="text-slate-300 text-sm">Provider: <span className="text-white font-medium">Udemy</span> • Goal: <span className="text-white font-medium">Skill Building</span></p>
                        </div>
                        <div className="bg-slate-700/50 px-3 py-1 rounded-full border border-slate-500/30 text-xs font-medium text-slate-200 backdrop-blur-sm group-hover:bg-slate-600/50 group-hover:border-slate-400/40 transition-colors">
                          Target: Jan 10, 2024
                        </div>
                      </div>
                      <div className="w-full bg-black/30 rounded-full h-3 mb-2 mt-2 border border-white/5">
                        <div className="bg-[#0474C4] h-full rounded-full opacity-0" style={{ width: '0%' }}></div>
                      </div>
                      <p className="text-xs text-slate-400 text-right font-medium">Not Started</p>
                    </div>
                    <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-white/5">
                      <div className="flex items-center gap-2 mr-auto">
                        <span className="text-sm text-slate-300">Status:</span>
                        <button className="flex items-center gap-1 text-sm font-medium text-slate-200 bg-white/5 hover:bg-white/15 hover:scale-105 px-3 py-1.5 rounded transition-all border border-white/5">
                          Not Started
                          <span className="material-symbols-outlined text-[16px]">expand_more</span>
                        </button>
                      </div>
                      <button className="text-slate-300 hover:text-white hover:bg-white/5 hover:translate-x-1 text-sm font-medium px-4 py-2 rounded transition-all">
                        Mark as Started
                      </button>
                      <button 
                        onClick={() => navigate('/lms-courses')}
                        className="bg-white/10 hover:bg-white/20 border border-white/10 text-white text-sm font-bold px-4 py-2 rounded shadow-sm transition-all flex items-center gap-2 hover:shadow-lg hover:-translate-y-0.5"
                      >
                        <span>View Course</span>
                        <span className="material-symbols-outlined text-[16px]">open_in_new</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* --- SECTION 3: COMPLETED (SQL Course) --- */}
          <section className="mb-12">
            <div className="flex items-center justify-between mb-5 px-1">
              <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2 drop-shadow-sm">
                <span className="material-symbols-outlined text-emerald-400">check_circle</span>
                Completed
              </h2>
            </div>
            
            <div className="bg-gradient-to-br from-[#065f46] to-[#042f2e] rounded-xl border border-emerald-500/30 p-5 md:p-6 shadow-md relative overflow-hidden group transition-all duration-300 hover:shadow-emerald-900/60 hover:scale-[1.01] hover:border-emerald-400/60 hover:brightness-105">
              <div className="absolute top-0 right-0 w-96 h-full bg-gradient-to-l from-emerald-500/10 to-transparent pointer-events-none transition-opacity duration-300 group-hover:opacity-100 opacity-50"></div>
              <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-emerald-500/20 rounded-full blur-3xl group-hover:bg-emerald-400/30 transition-colors duration-500"></div>
              
              <div className="flex flex-col lg:flex-row gap-6 relative z-10">
                {/* SQL Image */}
                <div 
                  className="w-full lg:w-48 h-32 shrink-0 rounded-lg bg-cover bg-center relative overflow-hidden shadow-lg border border-emerald-500/20" 
                  style={{ backgroundImage: "url('https://images.unsplash.com/photo-1551033406-611cf9a28f67?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80')" }}
                >
                  <div className="absolute inset-0 bg-emerald-900/60 flex items-center justify-center backdrop-blur-[1px] group-hover:backdrop-blur-none group-hover:bg-emerald-900/40 transition-all duration-300">
                    <span className="material-symbols-outlined text-white text-4xl drop-shadow-lg group-hover:scale-110 transition-transform">verified</span>
                  </div>
                </div>
                
                <div className="flex-1 flex flex-col justify-between gap-4">
                  <div>
                    <div className="flex flex-wrap justify-between items-start gap-4 mb-2">
                      <div>
                        <h3 className="text-lg font-bold text-white leading-tight mb-1 flex items-center gap-2 group-hover:text-emerald-50 transition-colors">
                          Intro to SQL
                          <span className="bg-emerald-500/30 text-emerald-100 text-[10px] uppercase tracking-wider px-2 py-0.5 rounded font-bold border border-emerald-400/30 shadow-sm group-hover:bg-emerald-400/40 transition-colors">Completed</span>
                        </h3>
                        <p className="text-emerald-100/70 text-sm">Provider: <span className="text-white font-medium">Codecademy</span> • Completed: <span className="text-white font-medium">Oct 20, 2023</span></p>
                      </div>
                      <div className="flex items-center gap-2 bg-gradient-to-r from-amber-500/20 to-yellow-500/20 border border-amber-400/30 px-3 py-1.5 rounded-lg shadow-sm group-hover:shadow-amber-500/20 group-hover:border-amber-400/50 transition-all">
                        <span className="text-lg animate-bounce">🎉</span>
                        <div className="flex flex-col">
                          <span className="text--[10px] text-amber-200 uppercase leading-none font-bold">Earned</span>
                          <span className="text-xs font-bold text-amber-100">+50 Credit Coins</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-emerald-300 mt-2 font-medium">
                      <span className="material-symbols-outlined text-[18px]">military_tech</span>
                      <span>Certificate added to your profile</span>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-emerald-500/20">
                    <div className="mr-auto"></div>
                    <button className="text-emerald-100 hover:text-white hover:bg-emerald-500/10 hover:-translate-y-0.5 text-sm font-medium px-4 py-2 rounded transition-all flex items-center gap-2">
                      <span className="material-symbols-outlined text-[18px]">download</span>
                      Download Certificate
                    </button>
                    <button 
                      onClick={() => navigate('/rewards')}
                      className="bg-emerald-600/20 hover:bg-emerald-600/50 hover:border-emerald-400/50 border border-emerald-400/30 text-white text-sm font-bold px-4 py-2 rounded transition-all shadow-sm flex items-center gap-2 hover:shadow-emerald-500/30 hover:shadow-lg hover:-translate-y-0.5"
                    >
                      <span>View Certificate</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>

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

export default LmsLearningProgress;