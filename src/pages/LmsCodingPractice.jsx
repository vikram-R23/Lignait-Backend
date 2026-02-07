import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const LmsCodingPractice = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("Baskar Manager");
  
  // Dummy state for filters (visual only for this demo)
  const [filterDifficulty, setFilterDifficulty] = useState('Difficulty');
  const [filterTopic, setFilterTopic] = useState('Topic');
  const [filterStatus, setFilterStatus] = useState('Status');

  // --------------------------------
  // CHATBOT STATE (ADDED)
  // --------------------------------
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const [chatMessages, setChatMessages] = useState([
    { id: 1, sender: 'ai', text: 'Hi Baskar! Stuck on a problem? I can give you a hint without revealing the solution.' }
  ]);
  const chatEndRef = useRef(null);

  // --- API / LLM Initialization Logic ---
  useEffect(() => {
    const fetchProblems = async () => {
      try {
        console.log("System Ready: Coding Practice module initialized.");
      } catch (err) {
        console.log("Connection pending...");
      }
    };
    fetchProblems();
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
        const newAiMsg = { id: Date.now() + 1, sender: 'ai', text: "Try breaking the problem down into smaller sub-problems first..." };
        setChatMessages(prev => [...prev, newAiMsg]);
    }, 1000);
  };

  // Problem Data to map over (Clean React Pattern)
  const problems = [
    {
      id: 1,
      title: "Reverse a String",
      topic: "Strings",
      difficulty: "Easy",
      status: "Not Attempted",
      action: "Solve",
      diffColor: "emerald"
    },
    {
      id: 2,
      title: "Two Sum",
      topic: "Arrays",
      difficulty: "Easy",
      status: "Solved",
      action: "Review",
      diffColor: "emerald"
    },
    {
      id: 3,
      title: "Longest Substring Without Repeating Characters",
      topic: "Strings",
      difficulty: "Medium",
      status: "Attempted",
      action: "Continue",
      diffColor: "yellow"
    },
    {
      id: 4,
      title: "Valid Parentheses",
      topic: "Stacks",
      difficulty: "Easy",
      status: "Not Attempted",
      action: "Solve",
      diffColor: "emerald"
    },
    {
      id: 5,
      title: "Merge Sorted Array",
      topic: "Arrays",
      difficulty: "Easy",
      status: "Not Attempted",
      action: "Solve",
      diffColor: "emerald"
    },
    {
      id: 6,
      title: "Binary Tree Inorder Traversal",
      topic: "Trees",
      difficulty: "Medium",
      status: "Not Attempted",
      action: "Solve",
      diffColor: "yellow"
    }
  ];

  return (
    <div className="flex h-screen w-full overflow-hidden bg-[#06457F] text-white font-['Inter'] antialiased relative">
      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;900&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap');

        /* Custom Scrollbar */
        ::-webkit-scrollbar { width: 8px; }
        ::-webkit-scrollbar-track { background: #053b6d; }
        ::-webkit-scrollbar-thumb { background: #095393; border-radius: 4px; }
        ::-webkit-scrollbar-thumb:hover { background: #0b62ad; }

        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }

        /* Smooth Scrolling */
        html, body, .smooth-scroll { scroll-behavior: smooth; }

        /* Force outlined icons */
        .material-symbols-outlined { font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24; }
        .material-symbols-outlined.fill { font-variation-settings: 'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24; }

        /* Chat Animation */
        @keyframes slideUpFade {
            from { transform: translateY(20px) scale(0.95); opacity: 0; }
            to { transform: translateY(0) scale(1); opacity: 1; }
        }
        .chat-animate { animation: slideUpFade 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
      `}} />

      {/* --- SIDEBAR --- */}
      <aside className="w-72 flex-shrink-0 flex flex-col border-r border-slate-300 bg-white relative z-50 text-[#0F172A]">
        <div className="p-6 flex items-center gap-3 select-none">
          {/* UPDATED LOGO: Square Gradient Rocket */}
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#0474C4] to-cyan-400 flex items-center justify-center shadow-lg shadow-blue-500/30">
              <span className="material-symbols-outlined text-white text-xl">rocket_launch</span>
          </div>
          <h1 className="text-xl font-bold tracking-tight text-slate-900" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Career Orbit</h1>
        </div>

        <nav className="flex-1 px-4 py-4 flex flex-col gap-2 overflow-y-auto no-scrollbar">
          <button onClick={() => navigate('/dashboard')} className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-600 hover:bg-slate-50 transition-colors group text-left w-full">
            <span className="material-symbols-outlined group-hover:text-[#06457F]">home</span>
            <span className="font-semibold" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Dashboard</span>
          </button>
          
          <button onClick={() => navigate('/dashboard/roadmap')} className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-600 hover:bg-slate-50 transition-colors group text-left w-full">
            <span className="material-symbols-outlined">map</span>
            <span className="font-semibold" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Career Roadmap</span>
          </button>

          <button onClick={() => navigate('/mentors')} className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-600 hover:bg-slate-50 transition-colors group text-left w-full">
            <span className="material-symbols-outlined">groups</span>
            <span className="font-semibold" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Mentorship</span>
          </button>
          
          <button onClick={() => navigate('/resume')} className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-600 hover:bg-slate-50 transition-colors group text-left w-full">
            <span className="material-symbols-outlined group-hover:text-[#06457F]">description</span>
            <span className="font-semibold" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Resume</span>
          </button>

          <button onClick={() => navigate('/mock-interview')} className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-600 hover:bg-slate-50 transition-colors group text-left w-full">
            <span className="material-symbols-outlined group-hover:text-[#06457F]">videocam</span>
            <span className="font-semibold" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Mock Interview</span>
          </button>

          <button onClick={() => navigate('/my-bookings')} className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-600 hover:bg-slate-50 transition-colors group text-left w-full">
            <span className="material-symbols-outlined">calendar_month</span>
            <span className="font-semibold" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>My Booking</span>
          </button>

          {/* Internship (Added) */}
          <button onClick={() => navigate('/internships-jobs')} className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-600 hover:bg-slate-50 transition-colors group text-left w-full">
            <span className="material-symbols-outlined group-hover:text-[#06457F]">work</span>
            <span className="font-semibold" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Internship</span>
          </button>

          {/* Active State for LMS Courses */}
          <button onClick={() => navigate('/lms-courses')} className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-600 hover:bg-slate-50 transition-colors group text-left w-full">
            <span className="material-symbols-outlined">menu_book</span>
            <span className="font-semibold" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>LMS Courses</span>
          </button>

          {/* Practice Ground */}
          <button onClick={() => navigate('/practice-ground')} className="flex items-center gap-3 px-4 py-3 rounded-lg bg-[#06457F] text-white shadow-md text-left w-full">
            <span className="material-symbols-outlined fill">code</span>
            <span className="font-semibold" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Practice Ground</span>
          </button>

          <button onClick={() => navigate('/settings')} className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-600 hover:bg-slate-50 transition-colors group text-left w-full">
            <span className="material-symbols-outlined">settings</span>
            <span className="font-semibold" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Settings</span>
          </button>
        </nav>

        {/* --- COMPACT PROFILE SECTION (FIXED AT BOTTOM) --- */}
        <div className="p-3 border-t border-slate-300 shrink-0 mt-auto bg-white z-20">
          <div onClick={() => navigate('/profile')} className="flex items-center gap-3 px-2 py-1.5 rounded-lg cursor-pointer hover:bg-slate-50 transition-colors">
            {/* Reduced size-9 */}
            <div className="size-9 rounded-full bg-cover bg-center border border-slate-300 shrink-0" style={{ backgroundImage: "url('https://ui-avatars.com/api/?name=B+&background=06457F&color=fff')" }}></div>
            <div className="flex flex-col min-w-0">
              <span className="text-sm font-bold text-slate-900 truncate" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{userName}</span>
              <span className="text-[11px] font-medium text-slate-500 truncate" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Pro Member</span>
            </div>
          </div>
        </div>
      </aside>

      {/* --- MAIN CONTENT AREA (UNCHANGED) --- */}
      <main className="flex-1 flex flex-col h-full bg-[#06457F] overflow-hidden relative">
        {/* Top Decorative Gradient */}
        <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-white/5 to-transparent pointer-events-none"></div>
        
        <div className="flex-1 overflow-y-auto smooth-scroll">
          <div className="max-w-[1200px] mx-auto w-full px-6 py-8 md:px-10 md:py-10 flex flex-col gap-8">
            
            {/* Header Section */}
            <div className="flex flex-col gap-2 relative z-10">
              <div className="inline-flex items-center gap-2 mb-2 w-fit">
                <span className="text-xs font-semibold tracking-wider text-[#0474C4] uppercase bg-[#0474C4]/20 px-2 py-1 rounded">Interview Prep</span>
                <div className="flex items-center gap-1.5 text-[#D1D5DB] text-sm">
                  <span className="material-symbols-outlined text-yellow-400 text-[16px]">auto_awesome</span>
                  <span>Suggested for your interview preparation</span>
                </div>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight">Coding Practice Problems</h1>
              <p className="text-[#D1D5DB] text-lg max-w-2xl">Practice interview-focused coding questions at your own pace.</p>
            </div>

            {/* Filters & Controls */}
            <div className="flex flex-wrap items-center gap-3 pb-2 relative z-10">
              {/* Difficulty Filter */}
              <div className="relative group">
                <select 
                  value={filterDifficulty}
                  onChange={(e) => setFilterDifficulty(e.target.value)}
                  className="appearance-none pl-4 pr-10 py-2 bg-[#095393] border border-white/10 hover:border-white/20 rounded-lg text-sm text-white focus:outline-none focus:ring-2 focus:ring-[#0474C4] focus:border-transparent cursor-pointer min-w-[140px]"
                >
                  <option>Difficulty</option>
                  <option>Easy</option>
                  <option>Medium</option>
                  <option>Hard</option>
                </select>
                <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-white/50 pointer-events-none text-[20px]">keyboard_arrow_down</span>
              </div>

              {/* Topic Filter */}
              <div className="relative group">
                <select 
                  value={filterTopic}
                  onChange={(e) => setFilterTopic(e.target.value)}
                  className="appearance-none pl-4 pr-10 py-2 bg-[#095393] border border-white/10 hover:border-white/20 rounded-lg text-sm text-white focus:outline-none focus:ring-2 focus:ring-[#0474C4] focus:border-transparent cursor-pointer min-w-[140px]"
                >
                  <option>Topic</option>
                  <option>Arrays</option>
                  <option>Strings</option>
                  <option>Loops</option>
                  <option>Basics</option>
                </select>
                <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-white/50 pointer-events-none text-[20px]">keyboard_arrow_down</span>
              </div>

              {/* Status Filter */}
              <div className="relative group">
                <select 
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="appearance-none pl-4 pr-10 py-2 bg-[#095393] border border-white/10 hover:border-white/20 rounded-lg text-sm text-white focus:outline-none focus:ring-2 focus:ring-[#0474C4] focus:border-transparent cursor-pointer min-w-[140px]"
                >
                  <option>Status</option>
                  <option>Not Attempted</option>
                  <option>Attempted</option>
                  <option>Solved</option>
                </select>
                <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-white/50 pointer-events-none text-[20px]">keyboard_arrow_down</span>
              </div>

              <div className="flex-1"></div>

              {/* Search */}
              <div className="relative hidden sm:block">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-white/40 text-[20px]">search</span>
                <input 
                  className="pl-10 pr-4 py-2 bg-[#095393] border border-white/10 rounded-lg text-sm text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[#0474C4] w-64" 
                  placeholder="Search problems..." 
                  type="text"
                />
              </div>
            </div>

            {/* Problem List Table */}
            <div className="relative z-10 w-full bg-[#095393]/50 border border-white/10 rounded-xl overflow-hidden backdrop-blur-sm shadow-xl">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-white/10 bg-white/5 text-xs uppercase tracking-wider text-[#D1D5DB] font-medium">
                    <th className="px-6 py-4 w-5/12">Problem Title</th>
                    <th className="px-6 py-4 hidden sm:table-cell">Topic</th>
                    <th className="px-6 py-4 hidden md:table-cell">Difficulty</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-sm">
                  {problems.map((problem) => (
                    <tr key={problem.id} className="group hover:bg-white/5 transition-colors duration-150">
                      <td className="px-6 py-4">
                        <div className="flex flex-col">
                          <span className="font-medium text-white text-base">{problem.title}</span>
                          <span className="text-white/40 text-xs mt-1 sm:hidden">{problem.topic} • {problem.difficulty}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-[#D1D5DB] hidden sm:table-cell">
                        <span className="bg-white/5 px-2.5 py-1 rounded text-xs text-white/80">{problem.topic}</span>
                      </td>
                      <td className="px-6 py-4 hidden md:table-cell">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-${problem.diffColor}-500/10 text-${problem.diffColor}-400 border border-${problem.diffColor}-500/20`}>
                          {problem.difficulty}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          {problem.status === "Solved" ? (
                            <>
                              <span className="material-symbols-outlined text-[#0474C4] text-[20px]">check_circle</span>
                              <span className="text-white font-medium">Solved</span>
                            </>
                          ) : problem.status === "Attempted" ? (
                            <>
                              <span className="material-symbols-outlined text-yellow-400/80 text-[18px]">change_history</span>
                              <span className="text-yellow-100">Attempted</span>
                            </>
                          ) : (
                            <div className="flex items-center gap-2 text-[#D1D5DB]">
                              <span className="material-symbols-outlined text-white/30 text-[18px]">circle</span>
                              <span className="text-white/60">Not Attempted</span>
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right">
                        {problem.action === "Solve" ? (
                          <button 
                            onClick={() => navigate('/coding-platform')}
                            className="px-4 py-2 bg-[#0474C4] hover:bg-[#0474C4]/90 text-white text-sm font-medium rounded-lg transition-all shadow-lg shadow-[#0474C4]/20"
                          >
                            Solve
                          </button>
                        ) : problem.action === "Continue" ? (
                          <button 
                            onClick={() => navigate('/coding-platform')}
                            className="px-4 py-2 bg-[#0474C4]/20 hover:bg-[#0474C4]/30 text-blue-200 border border-[#0474C4]/30 text-sm font-medium rounded-lg transition-all"
                          >
                            Continue
                          </button>
                        ) : (
                          <button className="px-4 py-2 bg-transparent border border-white/20 hover:bg-white/5 text-white text-sm font-medium rounded-lg transition-all">
                            Review
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between pt-2 pb-10">
              <p className="text-sm text-[#D1D5DB]">Showing <span className="text-white font-medium">1-6</span> of <span className="text-white font-medium">42</span> problems</p>
              <div className="flex items-center gap-2">
                <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-white/10 text-white/50 hover:bg-white/5 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors" disabled>
                  <span className="material-symbols-outlined text-[18px]">chevron_left</span>
                </button>
                <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-[#0474C4] text-white font-medium text-sm shadow-md">1</button>
                <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-white/10 text-white/70 hover:bg-white/5 hover:text-white transition-colors text-sm">2</button>
                <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-white/10 text-white/70 hover:bg-white/5 hover:text-white transition-colors text-sm">3</button>
                <span className="text-white/30 text-sm px-1">...</span>
                <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-white/10 text-white/70 hover:bg-white/5 hover:text-white transition-colors">
                  <span className="material-symbols-outlined text-[18px]">chevron_right</span>
                </button>
              </div>
            </div>

          </div>
        </div>
      </main>

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

export default LmsCodingPractice;