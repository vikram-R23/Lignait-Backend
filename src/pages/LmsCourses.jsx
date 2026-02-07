import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const LmsCourses = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("Baskar Manager");

  // --------------------------------
  // CHATBOT STATE
  // --------------------------------
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const [chatMessages, setChatMessages] = useState([
    { id: 1, sender: 'ai', text: 'Hi Baskar! Looking to upskill? I can recommend courses based on your career roadmap.' }
  ]);
  const chatEndRef = useRef(null);

  // --- API / LLM Initialization Logic ---
  useEffect(() => {
    const fetchCoursesData = async () => {
      try {
        console.log("System Ready: LMS Courses module initialized.");
      } catch (err) {
        console.log("Connection pending...");
      }
    };
    fetchCoursesData();
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
        const newAiMsg = { id: Date.now() + 1, sender: 'ai', text: "That's a great topic! Here are the top-rated courses for that..." };
        setChatMessages(prev => [...prev, newAiMsg]);
    }, 1000);
  };

  // --- NAVIGATION HANDLER FIXED ---
  const handleCourseClick = () => {
    navigate('/course-detail');
  };

  const handleNavigate = (page) => {
    if (page === 'Dashboard') navigate('/dashboard/main');
    else navigate(`/${page.toLowerCase().replace(/\s+/g, '-')}`);
  };

  return (
    <div className="bg-[#06457F] text-white font-['Space_Grotesk'] h-screen w-full flex overflow-hidden antialiased relative">
      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');

        /* Custom Scrollbar */
        ::-webkit-scrollbar { width: 8px; height: 8px; }
        ::-webkit-scrollbar-track { background: rgba(0, 0, 0, 0.1); }
        ::-webkit-scrollbar-thumb { background: rgba(255, 255, 255, 0.2); border-radius: 4px; }
        ::-webkit-scrollbar-thumb:hover { background: rgba(255, 255, 255, 0.3); }

        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }

        .material-symbols-outlined { font-variation-settings: 'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24; }
        .fill-1 { font-variation-settings: 'FILL' 1; }

        /* Chat Animation */
        @keyframes slideUpFade {
            from { transform: translateY(20px) scale(0.95); opacity: 0; }
            to { transform: translateY(0) scale(1); opacity: 1; }
        }
        .chat-animate { animation: slideUpFade 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
      `}} />

      {/* --- SIDEBAR --- */}
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
            <span className="material-symbols-outlined fill-1">menu_book</span>
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
            <div className="size-9 rounded-full bg-cover bg-center border border-slate-300 shrink-0" style={{ backgroundImage: "url('https://ui-avatars.com/api/?name=B+&background=06457F&color=fff')" }}></div>
            <div className="flex flex-col min-w-0">
              <span className="text-sm font-semibold text-slate-900 truncate">{userName}</span>
              <span className="text-[11px] text-slate-600 truncate">Pro Member</span>
            </div>
          </div>
        </div>
      </aside>

      {/* --- MAIN CONTENT AREA --- */}
      <main className="flex-1 flex flex-col h-full overflow-hidden bg-[#06457F] relative">
        <div className="flex-1 overflow-y-auto p-8 lg:p-10 scroll-smooth">
          <div className="max-w-7xl mx-auto flex flex-col gap-8">
            
            {/* Header */}
            <div className="flex flex-col gap-1">
              <h1 className="text-3xl font-bold tracking-tight text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Recommended Courses</h1>
              <p className="text-[#D1D5DB] text-base">Curated learning resources based on your career roadmap.</p>
            </div>

            {/* AI Suggestion Banner */}
            <div className="bg-[#0A5596]/40 border border-red-500 rounded-lg p-4 flex items-start gap-4 shadow-lg backdrop-blur-sm hover:shadow-[0_0_20px_rgba(239,68,68,0.4)] transition-shadow duration-300">
              <div className="bg-[#0474C4]/20 p-2 rounded-full text-[#0474C4] shrink-0">
                <span className="material-symbols-outlined text-[20px] text-yellow-400">auto_awesome</span> 
              </div>
              <div>
                <h3 className="text-white font-semibold text-sm mb-1">AI Curated Suggestions</h3>
                <p className="text-[#D1D5DB] text-sm leading-relaxed">
                  These courses are suggested based on your current roadmap phase and recent mock interview feedback. Focusing on <strong>System Design</strong> and <strong>React Performance</strong> will help close your current skill gaps.
                </p>
              </div>
            </div>

            {/* Filters */}
            <div className="flex flex-wrap items-center gap-3 border-b border-white/10 pb-6">
              <button className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#0A5596] text-white text-sm font-medium hover:bg-[#0474C4] transition-all border border-transparent hover:border-white/20">
                <span>Skill / Topic</span>
                <span className="material-symbols-outlined text-[18px]">expand_more</span>
              </button>
              <button className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#0A5596] text-white text-sm font-medium hover:bg-[#0474C4] transition-all border border-transparent hover:border-white/20">
                <span>Difficulty</span>
                <span className="material-symbols-outlined text-[18px]">expand_more</span>
              </button>
              <button className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#0A5596] text-white text-sm font-medium hover:bg-[#0474C4] transition-all border border-transparent hover:border-white/20">
                <span>Duration</span>
                <span className="material-symbols-outlined text-[18px]">expand_more</span>
              </button>
              <div className="h-6 w-px bg-white/10 mx-2"></div>
              <button className="text-[#D1D5DB] hover:text-white text-sm font-medium transition-colors">Clear all</button>
            </div>

            {/* Courses Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              
              {/* Course 1: Advanced React */}
              <div className="bg-[#262B40] border border-white/10 rounded-xl overflow-hidden hover:border-blue-400 transition-all hover:shadow-[0_0_20px_rgba(59,130,246,0.5)] group flex flex-col h-full shadow-md">
                <div className="h-40 bg-cover bg-center relative" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80')" }}>
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-all"></div>
                  <div className="absolute bottom-3 left-3 bg-gray-900/90 backdrop-blur-md px-2 py-1 rounded text-xs font-semibold text-blue-300 flex items-center gap-1 shadow-sm border border-blue-500/30">
                    <span className="material-symbols-outlined text-[14px]">play_circle</span> 6h 20m
                  </div>
                </div>
                <div className="p-5 flex flex-col flex-1 gap-4">
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-xs font-bold text-blue-400 uppercase tracking-wider">Frontend Masters</span>
                      <span className="px-2 py-0.5 rounded bg-blue-900/30 text-[10px] text-blue-200 font-bold border border-blue-500/20">Advanced</span>
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2 leading-tight">Advanced React Patterns & Performance</h3>
                    <div className="flex flex-wrap gap-2 mt-3">
                      <span className="text-xs font-medium text-blue-300 bg-blue-900/30 border border-blue-500/20 px-2 py-1 rounded">React</span>
                      <span className="text-xs font-medium text-blue-300 bg-blue-900/30 border border-blue-500/20 px-2 py-1 rounded">Hooks</span>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <div className="flex justify-between text-xs text-gray-300 font-medium">
                      <span>Progress</span>
                      <span>45%</span>
                    </div>
                    <div className="h-1.5 w-full bg-gray-700 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-500 w-[45%]"></div>
                    </div>
                    <button 
                      onClick={handleCourseClick}
                      className="mt-2 w-full py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-sm font-semibold transition-colors flex items-center justify-center gap-2 shadow-sm"
                    >
                      Continue Learning
                    </button>
                  </div>
                </div>
              </div>

              {/* Course 2: System Design */}
              <div className="bg-[#262B40] border border-white/10 rounded-xl overflow-hidden hover:border-green-500 transition-all hover:shadow-[0_0_20px_rgba(34,197,94,0.5)] group flex flex-col h-full shadow-md">
                <div className="h-40 bg-cover bg-center relative" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80')" }}>
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-all"></div>
                  <div className="absolute top-3 right-3 bg-green-600 backdrop-blur-sm px-2 py-1 rounded text-xs font-bold text-white shadow-sm">Best Match</div>
                  <div className="absolute bottom-3 left-3 bg-gray-900/90 backdrop-blur-md px-2 py-1 rounded text-xs font-semibold text-green-300 flex items-center gap-1 shadow-sm border border-green-500/30">
                    <span className="material-symbols-outlined text-[14px]">schedule</span> 12h
                  </div>
                </div>
                <div className="p-5 flex flex-col flex-1 gap-4">
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-xs font-bold text-green-400 uppercase tracking-wider">Udemy</span>
                      <span className="px-2 py-0.5 rounded bg-green-900/30 text-[10px] text-green-200 font-bold border border-green-500/20">Intermediate</span>
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2 leading-tight">System Design Interview Guide</h3>
                    <div className="flex flex-wrap gap-2 mt-3">
                      <span className="text-xs font-medium text-green-300 bg-green-900/30 border border-green-500/20 px-2 py-1 rounded">Scalability</span>
                      <span className="text-xs font-medium text-green-300 bg-green-900/30 border border-green-500/20 px-2 py-1 rounded">Architecture</span>
                    </div>
                  </div>
                  <button 
                    onClick={handleCourseClick}
                    className="w-full py-2 bg-transparent hover:bg-green-600 text-green-400 hover:text-white border border-green-500/40 hover:border-transparent rounded-lg text-sm font-semibold transition-all flex items-center justify-center gap-2 shadow-sm"
                  >
                    Start Learning
                  </button>
                </div>
              </div>

              {/* Course 3: Negotiation */}
              <div className="bg-[#262B40] border border-white/10 rounded-xl overflow-hidden hover:border-purple-500 transition-all hover:shadow-[0_0_20px_rgba(168,85,247,0.5)] group flex flex-col h-full shadow-md">
                <div className="h-40 bg-cover bg-center relative" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1556761175-5973dc0f32e7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80')" }}>
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-all"></div>
                  <div className="absolute bottom-3 left-3 bg-gray-900/90 backdrop-blur-md px-2 py-1 rounded text-xs font-semibold text-purple-300 flex items-center gap-1 shadow-sm border border-purple-500/30">
                    <span className="material-symbols-outlined text-[14px]">schedule</span> 45m
                  </div>
                </div>
                <div className="p-5 flex flex-col flex-1 gap-4">
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-xs font-bold text-purple-400 uppercase tracking-wider">Career Orbit</span>
                      <span className="px-2 py-0.5 rounded bg-purple-900/30 text-[10px] text-purple-200 font-bold border border-purple-500/20">Soft Skills</span>
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2 leading-tight">Mastering Technical Negotiations</h3>
                    <div className="flex flex-wrap gap-2 mt-3">
                      <span className="text-xs font-medium text-purple-300 bg-purple-900/30 border border-purple-500/20 px-2 py-1 rounded">Career</span>
                      <span className="text-xs font-medium text-purple-300 bg-purple-900/30 border border-purple-500/20 px-2 py-1 rounded">Salary</span>
                    </div>
                  </div>
                  <button 
                    onClick={handleCourseClick}
                    className="w-full py-2 bg-transparent hover:bg-purple-600 text-purple-400 hover:text-white border border-purple-500/40 hover:border-transparent rounded-lg text-sm font-semibold transition-all flex items-center justify-center gap-2 shadow-sm"
                  >
                    Start Learning
                  </button>
                </div>
              </div>

              {/* Course 4: Data Structures */}
              <div className="bg-[#262B40] border border-white/10 rounded-xl overflow-hidden hover:border-orange-500 transition-all hover:shadow-[0_0_20px_rgba(249,115,22,0.5)] group flex flex-col h-full shadow-md">
                <div className="h-40 bg-cover bg-center relative" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1509228468518-180dd4864904?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80')" }}>
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-all"></div>
                  <div className="absolute bottom-3 left-3 bg-gray-900/90 backdrop-blur-md px-2 py-1 rounded text-xs font-semibold text-orange-300 flex items-center gap-1 shadow-sm border border-orange-500/30">
                    <span className="material-symbols-outlined text-[14px]">schedule</span> 8h
                  </div>
                </div>
                <div className="p-5 flex flex-col flex-1 gap-4">
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-xs font-bold text-orange-400 uppercase tracking-wider">Coursera</span>
                      <span className="px-2 py-0.5 rounded bg-orange-900/30 text-[10px] text-orange-200 font-bold border border-orange-500/20">Beginner</span>
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2 leading-tight">Data Structures for Interviews</h3>
                    <div className="flex flex-wrap gap-2 mt-3">
                      <span className="text-xs font-medium text-orange-300 bg-orange-900/30 border border-orange-500/20 px-2 py-1 rounded">CS Basics</span>
                      <span className="text-xs font-medium text-orange-300 bg-orange-900/30 border border-orange-500/20 px-2 py-1 rounded">Algorithms</span>
                    </div>
                  </div>
                  <button 
                    onClick={handleCourseClick}
                    className="w-full py-2 bg-transparent hover:bg-orange-600 text-orange-400 hover:text-white border border-orange-500/40 hover:border-transparent rounded-lg text-sm font-semibold transition-all flex items-center justify-center gap-2 shadow-sm"
                  >
                    Start Learning
                  </button>
                </div>
              </div>

              {/* Course 5: TypeScript */}
              <div className="bg-[#262B40] border border-white/10 rounded-xl overflow-hidden hover:border-cyan-500 transition-all hover:shadow-[0_0_20px_rgba(6,182,212,0.5)] group flex flex-col h-full shadow-md">
                <div className="h-40 bg-cover bg-center relative" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1516116216624-53e697fedbea?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80')" }}>
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-all"></div>
                  <div className="absolute bottom-3 left-3 bg-gray-900/90 backdrop-blur-md px-2 py-1 rounded text-xs font-semibold text-cyan-300 flex items-center gap-1 shadow-sm border border-cyan-500/30">
                    <span className="material-symbols-outlined text-[14px]">schedule</span> 3h 15m
                  </div>
                </div>
                <div className="p-5 flex flex-col flex-1 gap-4">
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider">Pluralsight</span>
                      <span className="px-2 py-0.5 rounded bg-cyan-900/30 text-[10px] text-cyan-200 font-bold border border-cyan-500/20">Intermediate</span>
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2 leading-tight">TypeScript Fundamentals</h3>
                    <div className="flex flex-wrap gap-2 mt-3">
                      <span className="text-xs font-medium text-cyan-300 bg-cyan-900/30 border border-cyan-500/20 px-2 py-1 rounded">Web</span>
                      <span className="text-xs font-medium text-cyan-300 bg-cyan-900/30 border border-cyan-500/20 px-2 py-1 rounded">Strict Types</span>
                    </div>
                  </div>
                  <button 
                    onClick={handleCourseClick}
                    className="w-full py-2 bg-transparent hover:bg-cyan-600 text-cyan-400 hover:text-white border border-cyan-500/40 hover:border-transparent rounded-lg text-sm font-semibold transition-all flex items-center justify-center gap-2 shadow-sm"
                  >
                    Start Learning
                  </button>
                </div>
              </div>

              {/* Course 6: Leadership */}
              <div className="bg-[#262B40] border border-white/10 rounded-xl overflow-hidden hover:border-pink-500 transition-all hover:shadow-[0_0_20px_rgba(236,72,153,0.5)] group flex flex-col h-full shadow-md">
                <div className="h-40 bg-cover bg-center relative" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80')" }}>
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-all"></div>
                  <div className="absolute bottom-3 left-3 bg-gray-900/90 backdrop-blur-md px-2 py-1 rounded text-xs font-semibold text-pink-300 flex items-center gap-1 shadow-sm border border-pink-500/30">
                    <span className="material-symbols-outlined text-[14px]">schedule</span> 2h
                  </div>
                </div>
                <div className="p-5 flex flex-col flex-1 gap-4">
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-xs font-bold text-pink-400 uppercase tracking-wider">Career Orbit</span>
                      <span className="px-2 py-0.5 rounded bg-pink-900/30 text-[10px] text-pink-200 font-bold border border-pink-500/20">Beginner</span>
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2 leading-tight">Leadership for Senior Engineers</h3>
                    <div className="flex flex-wrap gap-2 mt-3">
                      <span className="text-xs font-medium text-pink-300 bg-pink-900/30 border border-pink-500/20 px-2 py-1 rounded">Management</span>
                      <span className="text-xs font-medium text-pink-300 bg-pink-900/30 border border-pink-500/20 px-2 py-1 rounded">Mentoring</span>
                    </div>
                  </div>
                  <button 
                    onClick={handleCourseClick}
                    className="w-full py-2 bg-transparent hover:bg-pink-600 text-pink-400 hover:text-white border border-pink-500/40 hover:border-transparent rounded-lg text-sm font-semibold transition-all flex items-center justify-center gap-2 shadow-sm"
                  >
                    Start Learning
                  </button>
                </div>
              </div>

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

export default LmsCourses;