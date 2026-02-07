import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const PhaseDetail = () => {
  const navigate = useNavigate();

  // --- STATE & LOGIC PREPARATION (PRESERVED) ---
  const [currentPhase, setCurrentPhase] = useState("Phase 2 — Foundations");
  const [phaseProgress, setPhaseProgress] = useState(35);

  // --------------------------------
  // CHATBOT STATE (ADDED)
  // --------------------------------
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const [chatMessages, setChatMessages] = useState([
    { id: 1, sender: 'ai', text: 'Hi! I can help you with tasks in Phase 2. Need resources for CSS Grid or Flexbox?' }
  ]);
  const chatEndRef = useRef(null);

  const handleContinuePhase = () => {
    navigate('/dashboard/roadmap/phase-2'); 
  };

  const handleTaskClick = (taskId) => {
    navigate(`/task/${taskId}`);
  };

  // Helper for Sidebar Navigation
  const handleNavigate = (page) => {
    if (page === 'Dashboard') {
        navigate('/dashboard/main');
    } else if (page === 'Career Roadmap') {
        navigate('/dashboard/roadmap');
    } else {
        navigate(`/${page.toLowerCase().replace(/\s+/g, '-')}`);
    }
  };

  // Auto-scroll Chat
  useEffect(() => {
    if (isChatOpen && chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [chatMessages, isChatOpen, isExpanded]);

  const handleChatSubmit = (e) => {
    if (e) e.preventDefault();
    if (!chatInput.trim()) return;
    const newUserMsg = { id: Date.now(), sender: 'user', text: chatInput };
    setChatMessages(prev => [...prev, newUserMsg]);
    setChatInput("");
    setTimeout(() => {
        const newAiMsg = { id: Date.now() + 1, sender: 'ai', text: "I'm analyzing your request..." };
        setChatMessages(prev => [...prev, newAiMsg]);
    }, 1000);
  };

  return (
    <div className="bg-[#A8C4EC] text-[#0F172A] font-['Space_Grotesk'] overflow-hidden antialiased relative">
      <style dangerouslySetInnerHTML={{ __html: `
        ::-webkit-scrollbar { width: 8px; }
        ::-webkit-scrollbar-track { background: #A8C4EC; }
        ::-webkit-scrollbar-thumb { background: #06457F; border-radius: 4px; }
        ::-webkit-scrollbar-thumb:hover { background: #04325e; }
        .material-symbols-outlined { font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24; }
        .material-symbols-outlined.fill { font-variation-settings: 'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24; }
        
        /* FIXED CHECKBOX STYLE */
        input[type="checkbox"] {
          appearance: none;
          background-color: transparent;
          margin: 0;
          font: inherit;
          width: 1.5rem;
          height: 1.5rem;
          border: 2px solid #1F2937;
          border-radius: 4px;
          display: grid;
          place-content: center;
          cursor: pointer;
          transition: all 0.1s ease-in-out;
        }

        input[type="checkbox"]::before {
          content: "";
          width: 0.8em;
          height: 0.8em;
          clip-path: polygon(14% 44%, 0 65%, 50% 100%, 100% 16%, 80% 0%, 43% 62%);
          transform: scale(0);
          transform-origin: bottom left;
          transition: 120ms transform ease-in-out;
          background-color: white; /* Tick color */
        }

        input[type="checkbox"]:checked {
          background-color: #1F2937; /* Background color when checked */
          border-color: #1F2937;
        }

        input[type="checkbox"]:checked::before {
          transform: scale(1);
        }

        /* Chat Animation */
        @keyframes slideUpFade {
            from { transform: translateY(20px) scale(0.95); opacity: 0; }
            to { transform: translateY(0) scale(1); opacity: 1; }
        }
        .chat-animate { animation: slideUpFade 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
      `}} />

      <div className="relative flex h-screen w-full flex-row overflow-hidden">
        
        {/* --- SIDEBAR (Exact Match to Mentor & Dashboard) --- */}
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
              <span className="font-medium group-hover:text-[#06457F]">Dashboard</span>
            </button>
            
            <button onClick={() => handleNavigate('Career Roadmap')} className="flex items-center gap-3 px-4 py-3 rounded-lg bg-[#06457F] text-white shadow-md text-left w-full">
              <span className="material-symbols-outlined fill">map</span>
              <span className="font-medium">Career Roadmap</span>
            </button>

            <button onClick={() => handleNavigate('Mentors')} className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-600 hover:bg-slate-50 transition-colors group text-left w-full">
              <span className="material-symbols-outlined group-hover:text-[#06457F]">groups</span>
              <span className="font-medium group-hover:text-[#06457F]">Mentorship</span>
            </button>
            
            <button onClick={() => handleNavigate('Resume')} className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-600 hover:bg-slate-50 transition-colors group text-left w-full">
              <span className="material-symbols-outlined group-hover:text-[#06457F]">description</span>
              <span className="font-medium group-hover:text-[#06457F]">Resume</span>
            </button>

            <button onClick={() => handleNavigate('Mock Interview')} className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-600 hover:bg-slate-50 transition-colors group text-left w-full">
              <span className="material-symbols-outlined group-hover:text-[#06457F]">videocam</span>
              <span className="font-medium group-hover:text-[#06457F]">Mock Interview</span>
            </button>

            {/* MY BOOKING (ADDED) */}
            <button onClick={() => handleNavigate('My Bookings')} className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-600 hover:bg-slate-50 transition-colors group text-left w-full">
              <span className="material-symbols-outlined group-hover:text-[#06457F]">calendar_month</span>
              <span className="font-medium group-hover:text-[#06457F]">My Booking</span>
            </button>

            <button onClick={() => handleNavigate('LMS Courses')} className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-600 hover:bg-slate-50 transition-colors group text-left w-full">
              <span className="material-symbols-outlined group-hover:text-[#06457F]">book</span>
              <span className="font-medium group-hover:text-[#06457F]">LMS Courses</span>
            </button>

            <button onClick={() => handleNavigate('Practice Ground')} className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-600 hover:bg-slate-50 transition-colors group text-left w-full">
              <span className="material-symbols-outlined group-hover:text-[#06457F]">code</span>
              <span className="font-medium group-hover:text-[#06457F]">Practice Ground</span>
            </button>

            <button onClick={() => handleNavigate('Settings')} className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-600 hover:bg-slate-50 transition-colors group text-left w-full">
              <span className="material-symbols-outlined group-hover:text-[#06457F]">settings</span>
              <span className="font-medium group-hover:text-[#06457F]">Settings</span>
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
        <main className="flex-1 relative flex flex-col h-full overflow-hidden bg-[#A8C4EC]">
          <div className="flex-1 overflow-y-auto">
            <div className="max-w-[1200px] mx-auto px-6 py-8 md:px-10 md:py-10">
              
              {/* Breadcrumb */}
              <div className="flex items-center gap-2 mb-6 text-sm">
                <Link className="text-[#334155]/70 hover:text-[#06457F] transition-colors flex items-center gap-1 font-medium" to="/dashboard/roadmap">
                  <span className="material-symbols-outlined text-[18px]">arrow_back</span>
                  Roadmap Overview
                </Link>
                <span className="text-[#64748B]">/</span>
                <span className="text-[#0F172A] font-semibold">{currentPhase}</span>
              </div>

              {/* Header Section */}
              <div className="flex flex-col gap-6 mb-10">
                <div className="flex flex-wrap justify-between items-end gap-4">
                  <div className="flex flex-col gap-3 max-w-2xl">
                    <h1 className="text-[#0F172A] text-4xl md:text-5xl font-bold tracking-tight">{currentPhase}</h1>
                    <p className="text-[#334155] text-lg font-normal leading-relaxed">Master the basics of frontend architecture, semantic HTML, and CSS layouts before moving to complex frameworks.</p>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <span className="text-[#06457F] font-bold text-3xl">{phaseProgress}%</span>
                    <span className="text-[#64748B] text-sm uppercase tracking-wider font-semibold">Completed</span>
                  </div>
                </div>
                <div className="w-full h-2 bg-white/40 rounded-full overflow-hidden border border-white/20">
                  <div className="h-full bg-[#06457F] shadow-sm" style={{ width: `${phaseProgress}%` }}></div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 relative">
                <div className="lg:col-span-8 flex flex-col gap-10">
                  {/* AI Insight */}
                  <div className="flex items-start gap-4 p-5 rounded-xl bg-white border border-blue-200 shadow-sm">
                    <span className="material-symbols-outlined text-[#06457F] mt-0.5">auto_awesome</span>
                    <div>
                      <p className="text-[#334155] text-sm leading-relaxed">
                        <span className="text-[#06457F] font-bold">AI Insight:</span> This phase is recommended based on your recent assessment score in JavaScript Fundamentals.
                      </p>
                    </div>
                  </div>

                  {/* Task List */}
                  <section>
                    <div className="flex items-center justify-between mb-5">
                      <h2 className="text-2xl font-bold text-[#0F172A] flex items-center gap-2">
                        <span className="material-symbols-outlined text-[#06457F]">check_circle</span>
                        Tasks
                      </h2>
                      <span className="text-sm text-[#64748B] font-medium">3 of 8 completed</span>
                    </div>

                    <div className="flex flex-col gap-3">
                      {/* Completed Task */}
                      <div className="group relative flex items-start gap-4 p-5 rounded-xl bg-white border border-transparent shadow-sm hover:border-[#06457F]/30 transition-all">
                        <div className="relative flex items-center justify-center shrink-0 mt-1">
                          <input type="checkbox" defaultChecked />
                        </div>
                        <div className="flex flex-col gap-1 flex-1">
                          <h3 className="text-[#64748B] font-medium line-through decoration-[#64748B]/50 decoration-2">Setup Development Environment</h3>
                          <p className="text-[#64748B] text-sm">Install Node.js, VS Code, and configure Git.</p>
                        </div>
                        <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-full bg-[#06457F]/10 text-xs text-[#06457F] font-bold border border-[#06457F]/20">Completed</div>
                      </div>

                      {/* In Progress Task */}
                      <div onClick={() => handleTaskClick(3)} className="group relative flex items-start gap-4 p-5 rounded-xl bg-white border border-[#06457F] shadow-md transition-all cursor-pointer">
                        <div className="absolute top-0 left-0 w-1.5 h-full bg-[#06457F] rounded-l-xl"></div>
                        <div className="relative flex items-center justify-center shrink-0 mt-1 pl-1">
                          <input type="checkbox" onClick={(e) => e.stopPropagation()} />
                        </div>
                        <div className="flex flex-col gap-1 flex-1 pl-1">
                          <h3 className="text-[#0F172A] font-bold text-lg">Learn CSS Grid & Flexbox</h3>
                          <p className="text-[#334155] text-sm">Complete the Flexbox Froggy game and build a responsive grid layout.</p>
                          <div className="flex items-center gap-4 mt-2">
                            <div className="flex items-center gap-1.5 text-xs text-[#06457F] font-semibold">
                              <span className="material-symbols-outlined text-[16px]">schedule</span>
                              <span>~ 2.5 hours</span>
                            </div>
                          </div>
                        </div>
                        <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-xs text-[#06457F] font-bold border border-blue-200">In Progress</div>
                      </div>

                      {/* Not Started Task */}
                      <div onClick={() => handleTaskClick(4)} className="group relative flex items-start gap-4 p-5 rounded-xl bg-white border border-transparent shadow-sm hover:border-[#64748B]/30 transition-all cursor-pointer">
                        <div className="relative flex items-center justify-center shrink-0 mt-1">
                          <input type="checkbox" onClick={(e) => e.stopPropagation()} />
                        </div>
                        <div className="flex flex-col gap-1 flex-1">
                          <h3 className="text-[#0F172A] font-medium">Build a Landing Page</h3>
                          <p className="text-[#64748B] text-sm">Apply your knowledge to recreate a simple product landing page.</p>
                        </div>
                        <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-full bg-gray-100 text-xs text-[#64748B] font-medium border border-gray-200">Not Started</div>
                      </div>
                    </div>
                  </section>
                </div>

                {/* Sidebar Cards */}
                <div className="lg:col-span-4 relative">
                  <div className="sticky top-0 flex flex-col gap-6">
                    <div className="p-6 rounded-2xl bg-white shadow-md border border-white/50 flex flex-col gap-6">
                      <h3 className="text-[#0F172A] font-bold text-lg">Phase Summary</h3>
                      <div className="flex flex-col gap-4">
                        <div className="flex justify-between items-center py-2 border-b border-gray-100">
                          <span className="text-[#64748B] text-sm">Total Tasks</span>
                          <span className="text-[#0F172A] font-mono font-medium">8</span>
                        </div>
                        <div className="flex justify-between items-center py-2 border-b border-gray-100">
                          <span className="text-[#64748B] text-sm">Completed</span>
                          <span className="text-[#0F172A] font-mono font-medium">3</span>
                        </div>
                        <div className="flex justify-between items-center py-2 border-b border-gray-100">
                          <span className="text-[#64748B] text-sm">Est. Time Left</span>
                          <span className="text-[#0F172A] font-mono font-medium">~ 8.5 hrs</span>
                        </div>
                      </div>
                      <div className="mt-2">
                        <button onClick={handleContinuePhase} className="w-full py-3 px-4 rounded-lg bg-[#0474C4] text-white font-bold text-sm flex items-center justify-center gap-2 hover:opacity-90 transition-opacity active:scale-[0.98]">
                          Continue Phase
                        </button>
                        <button className="w-full mt-3 py-3 px-4 rounded-lg bg-gray-200 text-[#64748B] font-bold text-sm cursor-not-allowed flex items-center justify-center gap-2 opacity-70" disabled>
                          Next Phase <span className="material-symbols-outlined text-[18px]">lock</span>
                        </button>
                        <p className="text-xs text-[#64748B] text-center mt-3">Complete all tasks to unlock Phase 2.</p>
                      </div>
                    </div>

                    <div className="p-6 rounded-2xl bg-gradient-to-br from-[#06457F] to-[#002B52] border border-[#06457F]/20 flex flex-col gap-3 shadow-lg">
                      <div className="size-10 rounded-full bg-white/20 flex items-center justify-center mb-1">
                        <span className="material-symbols-outlined text-white">emoji_events</span>
                      </div>
                      <h4 className="text-white font-bold">Keep going!</h4>
                      <p className="text-blue-100 text-sm">Consistency is key to building a strong foundation.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* ======================================================= */}
      {/* EXPANDABLE CHATBOT CART (Logic & Design) */}
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

export default PhaseDetail;