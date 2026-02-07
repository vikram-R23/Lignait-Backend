import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const CareerRoadmap = () => {
  const navigate = useNavigate();

  // --------------------------------
  // STATE & DATA PREPARATION (PRESERVED)
  // --------------------------------
  const [phases, setPhases] = useState([
    { id: "01", title: "Foundations of Computer Science", status: "Completed", path: "/dashboard/roadmap/phase-1" },
    { id: "02", title: "Frontend Engineering Deep Dive", status: "In Progress", path: "/dashboard/roadmap/phase-2" },
    { id: "03", title: "Backend Integration & APIs", status: "Locked", path: "/dashboard/roadmap/phase-3" },
    { id: "04", title: "System Design & Scalability", status: "Locked", path: "/dashboard/roadmap/phase-4" },
  ]);

  const [activePhase, setActivePhase] = useState("Phase 02");
  const [overallProgress, setOverallProgress] = useState(12);
  const [targetRole, setTargetRole] = useState("Software Engineer");

  // --------------------------------
  // CHATBOT STATE (ADDED)
  // --------------------------------
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const [chatMessages, setChatMessages] = useState([
    { id: 1, sender: 'ai', text: 'Hi Baskar! I can help you understand your roadmap phases. Any questions about Frontend Engineering?' }
  ]);
  const chatEndRef = useRef(null);

  const fetchCareerRoadmap = async () => {
    try {
      console.log("Fetching roadmap overview...");
    } catch (error) {
      console.error("Error fetching roadmap:", error);
    }
  };

  useEffect(() => {
    fetchCareerRoadmap();
  }, []);

  // Auto-scroll Chat
  useEffect(() => {
    if (isChatOpen && chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [chatMessages, isChatOpen, isExpanded]);

  // --------------------------------
  // NAVIGATION LOGIC
  // --------------------------------
  const handleContinuePhase = () => {
    navigate('/dashboard/roadmap/phase-2');
  };

  const handleNavigate = (page) => {
    if (page === 'Dashboard') {
      navigate('/dashboard/main'); 
    } else if (page === 'Career Roadmap') {
      return; 
    } else {
      navigate(`/${page.toLowerCase().replace(/\s+/g, '-')}`);
    }
  };

  const handleViewDetails = () => {
    navigate('/dashboard/roadmap/phase-2');
  };

  const handleChatSubmit = (e) => {
    if (e) e.preventDefault();
    if (!chatInput.trim()) return;
    const newUserMsg = { id: Date.now(), sender: 'user', text: chatInput };
    setChatMessages(prev => [...prev, newUserMsg]);
    setChatInput("");
    setTimeout(() => {
        const newAiMsg = { id: Date.now() + 1, sender: 'ai', text: "I'm analyzing your roadmap progress..." };
        setChatMessages(prev => [...prev, newAiMsg]);
    }, 1000);
  };

  return (
    <div className="bg-[#A8C4EC] text-slate-800 font-display antialiased overflow-hidden selection:bg-[#06457F] selection:text-white font-['Space_Grotesk'] relative">
      <style dangerouslySetInnerHTML={{ __html: `
        .timeline-line {
          position: absolute;
          left: 28px;
          top: 40px;
          bottom: 0;
          width: 4px;
          background: linear-gradient(to bottom, #06457F 0%, #06457F 70%, rgba(6, 69, 127, 0.2) 100%);
          z-index: 0;
          box-shadow: 0 0 8px rgba(255, 255, 255, 0.5);
        }
        ::-webkit-scrollbar { width: 8px; }
        ::-webkit-scrollbar-track { background: #F1F5F9; }
        ::-webkit-scrollbar-thumb { background: #94A3B8; border-radius: 4px; }
        ::-webkit-scrollbar-thumb:hover { background: #64748B; }
        .material-symbols-outlined { font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24; }
        .fill-1 { font-variation-settings: 'FILL' 1; }
        
        /* Chat Animation */
        @keyframes slideUpFade {
            from { transform: translateY(20px) scale(0.95); opacity: 0; }
            to { transform: translateY(0) scale(1); opacity: 1; }
        }
        .chat-animate { animation: slideUpFade 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
      `}} />

      <div className="flex h-screen w-full">
        
        {/* --- SIDEBAR (Updated to Match DashboardMain) --- */}
        <aside className="w-72 flex-shrink-0 flex flex-col border-r border-slate-300 bg-white relative z-20">
          <div className="p-6 flex items-center gap-3 select-none">
            {/* UPDATED LOGO: Square Gradient Rocket */}
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#0474C4] to-cyan-400 flex items-center justify-center shadow-lg shadow-blue-500/30">
                <span className="material-symbols-outlined text-white text-xl">rocket_launch</span>
            </div>
            <span className="text-2xl font-black tracking-tight text-[#0F172A]">
                Career <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0474C4] to-cyan-500">Orbit</span>
            </span>
          </div>

          <nav className="flex-1 px-4 py-4 flex flex-col gap-2 overflow-y-auto">
            <button onClick={() => handleNavigate('Dashboard')} className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-600 hover:bg-slate-50 transition-colors group text-left w-full">
              <span className="material-symbols-outlined group-hover:text-[#06457F]">home</span>
              <span className="font-medium">Dashboard</span>
            </button>
            
            <button className="flex items-center gap-3 px-4 py-3 rounded-lg bg-[#06457F] text-white shadow-md text-left w-full">
              <span className="material-symbols-outlined fill-1">map</span>
              <span className="font-medium">Career Roadmap</span>
            </button>

            <button onClick={() => handleNavigate('Mentors')} className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-600 hover:bg-slate-50 transition-colors group text-left w-full">
              <span className="material-symbols-outlined group-hover:text-[#06457F]">groups</span>
              <span className="font-medium">Mentorship</span>
            </button>
            
            <button onClick={() => handleNavigate('Resume')} className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-600 hover:bg-slate-50 transition-colors group text-left w-full">
              <span className="material-symbols-outlined group-hover:text-[#06457F]">description</span>
              <span className="font-medium">Resume</span>
            </button>

            <button onClick={() => handleNavigate('Mock Interview')} className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-600 hover:bg-slate-50 transition-colors group text-left w-full">
              <span className="material-symbols-outlined group-hover:text-[#06457F]">videocam</span>
              <span className="font-medium">Mock Interview</span>
            </button>

            {/* NEW SECTION: My Booking */}
            <button onClick={() => handleNavigate('My Bookings')} className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-600 hover:bg-slate-50 transition-colors group text-left w-full">
              <span className="material-symbols-outlined group-hover:text-[#06457F]">calendar_month</span>
              <span className="font-medium">My Booking</span>
            </button>

            <button onClick={() => handleNavigate('LMS Courses')} className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-600 hover:bg-slate-50 transition-colors group text-left w-full">
              <span className="material-symbols-outlined group-hover:text-[#06457F]">book</span>
              <span className="font-medium">LMS Courses</span>
            </button>

            <button onClick={() => handleNavigate('Practice Ground')} className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-600 hover:bg-slate-50 transition-colors group text-left w-full">
              <span className="material-symbols-outlined group-hover:text-[#06457F]">code</span>
              <span className="font-medium">Practice Ground</span>
            </button>

            <button onClick={() => handleNavigate('Settings')} className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-600 hover:bg-slate-50 transition-colors group text-left w-full">
              <span className="material-symbols-outlined group-hover:text-[#06457F]">settings</span>
              <span className="font-medium">Settings</span>
            </button>
          </nav>

          <div className="p-4 border-t border-slate-300">
            <div className="flex items-center gap-3 px-2 py-2">
              <div className="size-10 rounded-full bg-cover bg-center border border-slate-300" style={{ backgroundImage: "url('https://ui-avatars.com/api/?name=B+&background=06457F&color=fff')" }}></div>
              <div className="flex flex-col overflow-hidden">
                <span className="text-sm font-semibold text-slate-900 truncate">Baskar Manager</span>
                <span className="text-xs text-slate-600 truncate">Pro Member</span>
              </div>
            </div>
          </div>
        </aside>

        {/* MAIN CONTENT AREA */}
        <main className="flex-1 flex flex-col h-full overflow-hidden relative bg-[#A8C4EC]">
          <header className="w-full border-b border-[#06457F]/10 bg-[#A8C4EC]/90 backdrop-blur-md z-10 sticky top-0">
            <div className="max-w-6xl mx-auto px-8 py-8">
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                <div className="flex flex-col gap-2 max-w-2xl">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="bg-[#06457F]/10 text-[#06457F] text-xs font-bold px-2 py-0.5 rounded uppercase tracking-wider border border-[#06457F]/20">Generated by AI</span>
                  </div>
                  <h2 className="text-4xl font-bold text-[#06457F] tracking-tight">Your Career Roadmap</h2>
                  <p className="text-slate-700 text-lg">A personalized path to becoming a {targetRole}.</p>
                  <div className="flex items-center gap-2 mt-2 text-sm text-[#06457F]/80 font-medium">
                    <span className="material-symbols-outlined text-[18px]">auto_awesome</span>
                    <span>Your roadmap adapts as you complete tasks and improve skills.</span>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="bg-white/80 border border-white/40 rounded-xl p-4 min-w-[160px] shadow-sm">
                    <p className="text-slate-500 text-xs font-medium uppercase mb-1">Target Role</p>
                    <p className="text-slate-900 font-bold text-lg leading-tight">{targetRole}</p>
                  </div>
                  <div className="bg-white/80 border border-white/40 rounded-xl p-4 min-w-[200px] shadow-sm">
                    <div className="flex justify-between items-end mb-2">
                      <p className="text-slate-500 text-xs font-medium uppercase">Overall Progress</p>
                      <p className="text-[#06457F] font-bold text-lg leading-none">{overallProgress}%</p>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-1.5">
                      <div className="bg-[#06457F] h-1.5 rounded-full" style={{ width: `${overallProgress}%` }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </header>

          <div className="flex-1 overflow-y-auto px-8 py-8 relative">
            <div className="max-w-4xl mx-auto pb-20">
              <div className="relative pl-4">
                <div className="timeline-line"></div>
                <div className="flex flex-col gap-10">
                  
                  {/* Phase 01 - Completed */}
                  <div className="relative pl-14 group">
                    <div className="absolute left-[16px] top-6 -translate-x-1/2 z-10 bg-[#A8C4EC] p-1">
                      <div className="size-6 rounded-full bg-[#06457F] flex items-center justify-center border border-white">
                        <span className="material-symbols-outlined text-white text-[16px]">check</span>
                      </div>
                    </div>
                    <div className="bg-white border border-slate-300 rounded-xl p-6 shadow-sm hover:shadow-md transition-all">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <div className="flex items-center gap-3 mb-1">
                            <span className="text-sm font-bold text-[#06457F] uppercase tracking-wider">Phase 01</span>
                            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#06457F]/10 text-[#06457F] uppercase border border-[#06457F]/20">Completed</span>
                          </div>
                          <h3 className="text-xl font-bold text-slate-400 line-through decoration-slate-400">Foundations of Computer Science</h3>
                        </div>
                        <button className="text-slate-400 hover:text-slate-600 transition-colors">
                          <span className="material-symbols-outlined">expand_more</span>
                        </button>
                      </div>
                      <p className="text-slate-600 mb-4 text-sm line-through decoration-slate-400">Master the basics of algorithms, data structures, and computational thinking.</p>
                      <div className="flex flex-wrap gap-2">
                        <span className="inline-flex items-center gap-1 px-2 py-1 rounded border border-slate-200 bg-slate-50 text-xs text-slate-400 line-through">
                          <span className="material-symbols-outlined text-[14px]">code</span> Intro to Algorithms
                        </span>
                        <span className="inline-flex items-center gap-1 px-2 py-1 rounded border border-slate-200 bg-slate-50 text-xs text-slate-400 line-through">
                          <span className="material-symbols-outlined text-[14px]">data_object</span> Data Structures
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Phase 02 - In Progress */}
                  <div className="relative pl-14">
                    <div className="absolute left-[16px] top-6 -translate-x-1/2 z-10 bg-[#A8C4EC] p-1">
                      <div className="size-6 rounded-full bg-[#06457F] flex items-center justify-center shadow-[0_0_15px_rgba(6,69,127,0.4)] animate-pulse">
                        <div className="size-2 bg-white rounded-full"></div>
                      </div>
                    </div>
                    <div className="bg-white border border-[#06457F] shadow-[0_0_20px_-5px_rgba(6,69,127,0.4)] rounded-xl p-8 relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-64 h-64 bg-[#06457F]/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
                      <div className="flex flex-col md:flex-row justify-between items-start gap-6 relative z-10">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <span className="text-sm font-bold text-[#06457F] uppercase tracking-wider">Phase 02</span>
                            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#06457F] text-white uppercase shadow-lg shadow-[#06457F]/20">In Progress</span>
                          </div>
                          <h3 className="text-2xl font-bold text-slate-900 mb-2">Frontend Engineering Deep Dive</h3>
                          <p className="text-slate-600 mb-6">Focus on modern React patterns, state management, and building scalable UI components.</p>
                          <div className="flex flex-col gap-3 mb-6">
                            <div className="flex items-center gap-3 text-sm text-slate-700">
                              <span className="material-symbols-outlined text-[#06457F] text-[20px] fill-1">check_circle</span>
                              <span>Understand React Lifecycle & Hooks</span>
                            </div>
                            <div className="flex items-center gap-3 text-sm text-slate-900 font-medium bg-blue-50 p-2 rounded-lg border border-blue-100 -ml-2">
                              <span className="material-symbols-outlined text-[#06457F] animate-spin text-[20px]" style={{ animationDuration: '3s' }}>progress_activity</span>
                              <span>Build a Task Management App (Project)</span>
                            </div>
                            <div className="flex items-center gap-3 text-sm text-slate-600">
                              <span className="material-symbols-outlined text-slate-400 text-[20px]">radio_button_unchecked</span>
                              <span>Master Redux & Context API</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col gap-3 w-full md:w-auto min-w-[180px]">
                          <button onClick={handleContinuePhase} className="w-full bg-[#0474C4] hover:bg-[#035e9e] text-white font-bold py-3 px-6 rounded-lg shadow-md shadow-blue-500/20 transition-all transform hover:scale-[1.02] flex items-center justify-center gap-2">
                            <span>Continue Phase</span>
                            <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
                          </button>
                          <button onClick={handleViewDetails} className="w-full bg-white border border-[#0474C4] text-[#0474C4] hover:bg-[#0474C4] hover:text-white py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2 group">
                            <span>View Details</span>
                            <span className="material-symbols-outlined text-[20px] group-hover:text-white text-[#0474C4]">visibility</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Phase 03 & 04 (PRESERVED) */}
                  <div className="relative pl-14 opacity-60 hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute left-[16px] top-6 -translate-x-1/2 z-10 bg-[#A8C4EC] p-1">
                      <div className="size-6 rounded-full bg-white flex items-center justify-center border border-slate-300">
                        <span className="material-symbols-outlined text-slate-400 text-[14px]">lock</span>
                      </div>
                    </div>
                    <div className="bg-white/60 border border-slate-300 border-dashed rounded-xl p-6">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <div className="flex items-center gap-3 mb-1">
                            <span className="text-sm font-bold text-slate-500 uppercase tracking-wider">Phase 03</span>
                            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-200 text-slate-500 uppercase border border-slate-300">Locked</span>
                          </div>
                          <h3 className="text-xl font-bold text-slate-500">Backend Integration & APIs</h3>
                        </div>
                      </div>
                      <p className="text-slate-600 text-sm mb-4">Learn to connect your frontend to a backend, handle authentication, and design RESTful APIs.</p>
                      <button className="text-sm font-medium text-slate-600 hover:text-[#06457F] transition-colors flex items-center gap-1">
                        View Preview <span className="material-symbols-outlined text-[16px]">arrow_right_alt</span>
                      </button>
                    </div>
                  </div>

                  <div className="relative pl-14 opacity-50 hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute left-[16px] top-6 -translate-x-1/2 z-10 bg-[#A8C4EC] p-1">
                      <div className="size-6 rounded-full bg-white flex items-center justify-center border border-slate-300">
                        <span className="material-symbols-outlined text-slate-400 text-[14px]">lock</span>
                      </div>
                    </div>
                    <div className="bg-white/60 border border-slate-300 border-dashed rounded-xl p-6">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <div className="flex items-center gap-3 mb-1">
                            <span className="text-sm font-bold text-slate-500 uppercase tracking-wider">Phase 04</span>
                            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-200 text-slate-500 uppercase border border-slate-300">Locked</span>
                          </div>
                          <h3 className="text-xl font-bold text-slate-500">System Design & Scalability</h3>
                        </div>
                      </div>
                      <p className="text-slate-600 text-sm mb-4">Prepare for high-level architectural decisions and large-scale application design.</p>
                    </div>
                  </div>

                </div>
              </div>
              <div className="mt-12 text-center">
                <button className="text-sm text-slate-600 hover:text-[#06457F] flex items-center justify-center gap-2 mx-auto px-4 py-2 rounded-lg hover:bg-white/30 transition-colors">
                  <span className="material-symbols-outlined">expand_more</span>
                  Show Full Roadmap
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* ======================================================= */}
      {/* EXPANDABLE CHATBOT CART (EXACT MATCH) */}
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
                {/* Header - Separate Color for 'Cart' feel */}
                <div className="p-4 bg-[#0B3D91] flex items-center justify-between border-b border-white/10 shrink-0">
                    <div className="flex items-center gap-3">
                        {/* Professional Chatbot Icon in Header */}
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
                        {/* EXPAND/COLLAPSE BUTTON */}
                        <button onClick={() => setIsExpanded(!isExpanded)} className="text-white/70 hover:text-white p-2 rounded-lg hover:bg-white/10 transition-colors" title={isExpanded ? "Collapse" : "Expand"}>
                            <span className="material-symbols-outlined text-[20px]">{isExpanded ? 'close_fullscreen' : 'open_in_full'}</span>
                        </button>
                        {/* CLOSE BUTTON */}
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

        {/* Toggle Button (FAB) - Hide when Expanded to avoid clutter */}
        {!isExpanded && (
            <button 
                onClick={() => setIsChatOpen(!isChatOpen)}
                className="h-16 w-16 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white shadow-xl shadow-cyan-500/30 flex items-center justify-center transition-all hover:scale-105 active:scale-95 group relative z-50 ring-4 ring-cyan-500/20 border border-white/20"
            >
                {isChatOpen ? (
                    <span className="material-symbols-outlined text-[32px]">keyboard_arrow_down</span>
                ) : (
                    <div className="relative">
                        {/* CUSTOM SVG ICON - Professional Robot Face */}
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

export default CareerRoadmap;