import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const LmsCourseDetail = () => {
  const navigate = useNavigate();

  // --------------------------------
  // CHATBOT STATE (ADDED)
  // --------------------------------
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const [chatMessages, setChatMessages] = useState([
    { id: 1, sender: 'ai', text: 'Hi Baskar! Questions about this Data Structures course? I can explain the curriculum.' }
  ]);
  const chatEndRef = useRef(null);

  // --- API / LLM Initialization Logic ---
  useEffect(() => {
    const fetchDetailData = async () => {
      try {
        console.log("System Ready: Course Detail module initialized.");
      } catch (err) {
        console.log("Connection pending...");
      }
    };
    fetchDetailData();
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
        const newAiMsg = { id: Date.now() + 1, sender: 'ai', text: "This course covers Big O notation extensively in Module 2..." };
        setChatMessages(prev => [...prev, newAiMsg]);
    }, 1000);
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
        @import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap');

        /* Custom Scrollbar */
        ::-webkit-scrollbar { width: 8px; height: 8px; }
        ::-webkit-scrollbar-track { background: rgba(0, 0, 0, 0.1); }
        ::-webkit-scrollbar-thumb { background: rgba(255, 255, 255, 0.2); border-radius: 4px; }
        ::-webkit-scrollbar-thumb:hover { background: rgba(255, 255, 255, 0.3); }

        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }

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
      <aside className="w-72 flex-shrink-0 flex flex-col border-r border-slate-300 bg-white relative z-50 text-[#0F172A] shadow-xl h-full">
        <div className="p-6 flex items-center gap-3 select-none shrink-0">
          {/* UPDATED LOGO: Square Gradient Rocket */}
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#0474C4] to-cyan-400 flex items-center justify-center shadow-lg shadow-blue-500/30">
              <span className="material-symbols-outlined text-white text-xl">rocket_launch</span>
          </div>
          <h1 className="text-xl font-bold tracking-tight text-slate-900" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Career Orbit</h1>
        </div>

        <nav className="flex-1 px-4 py-4 flex flex-col gap-2 overflow-y-auto no-scrollbar">
          <button onClick={() => handleNavigate('Dashboard')} className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-600 hover:bg-slate-50 transition-colors group text-left w-full">
            <span className="material-symbols-outlined group-hover:text-[#06457F]">home</span>
            <span className="font-semibold" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Dashboard</span>
          </button>
          
          <button onClick={() => handleNavigate('Roadmap')} className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-600 hover:bg-slate-50 transition-colors group text-left w-full">
            <span className="material-symbols-outlined">map</span>
            <span className="font-semibold" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Career Roadmap</span>
          </button>

          <button onClick={() => handleNavigate('Mentors')} className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-600 hover:bg-slate-50 transition-colors group text-left w-full">
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
          <button onClick={() => handleNavigate('Internships Jobs')} className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-600 hover:bg-slate-50 transition-colors group text-left w-full">
            <span className="material-symbols-outlined group-hover:text-[#06457F]">work</span>
            <span className="font-semibold" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Internship</span>
          </button>

          {/* Active State for LMS Courses */}
          <button onClick={() => navigate('/lms-courses')} className="flex items-center gap-3 px-4 py-3 rounded-lg bg-[#06457F] text-white shadow-md text-left w-full">
            <span className="material-symbols-outlined fill">menu_book</span>
            <span className="font-semibold" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>LMS Courses</span>
          </button>

          <button onClick={() => navigate('/practice-ground')} className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-600 hover:bg-slate-50 transition-colors group text-left w-full">
            <span className="material-symbols-outlined">code</span>
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
              <span className="text-sm font-semibold text-slate-900 truncate" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Baskar Manager</span>
              <span className="text-[11px] text-slate-600 truncate" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Pro Member</span>
            </div>
          </div>
        </div>
      </aside>

      {/* --- MAIN CONTENT AREA --- */}
      <main className="flex-1 overflow-y-auto bg-[#06457F] relative">
        <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-white/5 to-transparent pointer-events-none"></div>
        <div className="flex flex-col h-full max-w-7xl mx-auto px-6 py-8 relative z-10">
          
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 mb-6 text-sm">
            <button className="text-[#D1D5DB] hover:text-white transition-colors flex items-center gap-1">
              <span className="material-symbols-outlined text-[18px]">menu_book</span>
              Upskilling
            </button>
            <span className="text-[#D1D5DB]/50">/</span>
            <button onClick={() => navigate('/lms-courses')} className="text-[#D1D5DB] hover:text-white transition-colors">Courses</button>
            <span className="text-[#D1D5DB]/50">/</span>
            <span className="text-white font-medium">Course Detail</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Column: Course Info */}
            <div className="lg:col-span-8 flex flex-col gap-8">
              <div className="flex flex-col gap-6">
                
                {/* Hero Image Card */}
                <div className="relative w-full h-[280px] rounded-2xl overflow-hidden group shadow-lg shadow-black/20">
                  <div 
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105" 
                    style={{ backgroundImage: "url('https://images.unsplash.com/photo-1516116216624-53e697fedbea?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80')" }} 
                  ></div>
                  <div className="absolute inset-0 bg-gradient-to-t from-[#06457F] via-[#06457F]/60 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 p-8 w-full flex flex-col gap-3">
                    <div className="flex flex-wrap gap-2 mb-1">
                      <span className="px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-100 text-xs font-medium backdrop-blur-sm">DSA</span>
                      <span className="px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-100 text-xs font-medium backdrop-blur-sm">Problem Solving</span>
                      <span className="px-3 py-1 rounded-full bg-amber-500/20 border border-amber-400/30 text-amber-100 text-xs font-medium backdrop-blur-sm">Intermediate</span>
                    </div>
                    <h1 className="text-3xl md:text-4xl font-bold text-white leading-tight">Data Structures & Algorithms for Interviews</h1>
                    <div className="flex items-center gap-2 text-[#D1D5DB] text-sm">
                      <span>Provided by</span>
                      <span className="flex items-center gap-1.5 font-semibold text-white bg-white/10 px-2 py-0.5 rounded">
                        <span className="material-symbols-outlined text-[#0474C4] text-[16px]">school</span>
                        Internal LMS
                      </span>
                    </div>
                  </div>
                </div>

                {/* Roadmap Alignment Box */}
                <div className="bg-gradient-to-r from-violet-600/30 to-blue-600/30 border border-violet-400/50 rounded-xl p-5 flex flex-col md:flex-row gap-5 items-start md:items-center relative overflow-hidden shadow-lg shadow-black/10">
                  <div className="absolute right-0 top-0 w-64 h-full bg-gradient-to-l from-violet-500/10 to-transparent pointer-events-none"></div>
                  <div className="bg-violet-600 p-3 rounded-xl shrink-0 border border-violet-400/30 text-white shadow-inner">
                    <span className="material-symbols-outlined text-[28px]">alt_route</span>
                  </div>
                  <div className="flex-1 z-10">
                    <div className="flex items-center gap-3 mb-1.5">
                      <h3 className="text-white font-bold text-lg tracking-tight">Roadmap Alignment</h3>
                      <span className="text-xs font-bold bg-amber-500 text-white px-2 py-0.5 rounded shadow-sm flex items-center gap-1">
                        <span className="material-symbols-outlined text-[14px]">auto_awesome</span>
                        Recommended
                      </span>
                    </div>
                    <p className="text-violet-100 text-sm leading-relaxed">This course supports <strong className="text-white bg-violet-500/30 px-1 rounded">Phase 1 – Foundations</strong> in your career roadmap. Mastering these concepts is critical for upcoming technical interviews.</p>
                  </div>
                </div>

                {/* Course Details Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="flex flex-col gap-4">
                    <h3 className="text-xl font-bold text-white flex items-center gap-2">
                      <span className="material-symbols-outlined text-red-500">info</span>
                      Course Overview
                    </h3>
                    <p className="text-[#D1D5DB] leading-relaxed">
                      This comprehensive course is designed to bridge the gap between theoretical knowledge and practical application. You will dive deep into arrays, linked lists, trees, and graphs, learning how to optimize your code for time and space complexity. Perfect for candidates preparing for FAANG-level technical interviews.
                    </p>
                  </div>
                  <div className="flex flex-col gap-4">
                    <h3 className="text-xl font-bold text-white flex items-center gap-2">
                      <span className="material-symbols-outlined text-[#0474C4]">check_circle</span>
                      What You'll Learn
                    </h3>
                    <ul className="flex flex-col gap-3">
                      {['Master core data structures: Arrays, Lists, Trees, Graphs', 'Analyze time and space complexity (Big O Notation)', 'Solve top 50 most asked interview problems', 'Dynamic programming and greedy algorithms patterns'].map((item, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <span className="material-symbols-outlined text-green-500 shrink-0 mt-0.5 text-[20px]">check</span>
                          <span className="text-[#D1D5DB] text-sm">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <hr className="border-white/10"/>

                {/* Learning Goals (Locked) */}
                <div className="flex flex-col gap-4">
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <span className="material-symbols-outlined text-teal-400">flag</span>
                    Learning Goals
                  </h3>
                  <div className="bg-gradient-to-br from-teal-900/40 to-emerald-900/20 border border-teal-500/30 border-dashed rounded-xl p-6 flex flex-col items-center justify-center text-center gap-3 group hover:border-teal-400/50 transition-colors">
                    <div className="p-3 bg-teal-500/10 rounded-full mb-1">
                      <span className="material-symbols-outlined text-teal-400 text-[32px]">lock</span>
                    </div>
                    <p className="text-white font-bold text-lg">Goals are locked until you start</p>
                    <p className="text-teal-100/80 text-sm max-w-md">You’ll be able to set completion goals, track daily progress, and earn credits after starting this course.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Sticky Sidebar Card */}
            <div className="lg:col-span-4 relative">
              <div className="bg-[#A8C4EC] rounded-2xl p-6 sticky top-6 text-slate-800 shadow-xl shadow-black/20">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h2 className="text-slate-900 font-bold text-lg">Course Summary</h2>
                    <p className="text-slate-600 text-sm">Self-paced learning</p>
                  </div>
                  <div className="bg-white/50 p-2 rounded-lg backdrop-blur-sm">
                    <span className="material-symbols-outlined text-slate-700 text-[24px]">bookmark_border</span>
                  </div>
                </div>

                <div className="flex flex-col gap-4 mb-6">
                  {[
                    { icon: 'schedule', label: 'Duration', val: '~6 Hours' },
                    { icon: 'play_circle', label: 'Format', val: 'Video & Practice' },
                    { icon: 'bar_chart', label: 'Level', val: 'Intermediate' }
                  ].map((item, i) => (
                    <div key={i} className="flex items-center justify-between border-b border-slate-900/10 pb-3">
                      <div className="flex items-center gap-2 text-slate-700">
                        <span className="material-symbols-outlined text-[20px]">{item.icon}</span>
                        <span className="text-sm font-medium">{item.label}</span>
                      </div>
                      <span className="font-bold text-slate-900 text-sm">{item.val}</span>
                    </div>
                  ))}
                  
                  <div className="flex items-center justify-between pb-1">
                    <div className="flex items-center gap-2 text-slate-700">
                      <span className="material-symbols-outlined text-[20px]">workspace_premium</span>
                      <span className="text-sm font-medium">Certification</span>
                    </div>
                    <span className="font-bold text-green-700 bg-green-100 px-2 py-0.5 rounded text-xs flex items-center gap-1">
                      Included
                      <span className="material-symbols-outlined text-[14px]">check</span>
                    </span>
                  </div>
                </div>

                <div className="bg-white/60 backdrop-blur-md rounded-xl p-4 mb-6 border border-white/40">
                  <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Rewards on Completion</h4>
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-amber-600 text-[20px]">military_tech</span>
                      <span className="text-sm font-semibold text-slate-800">Verified Certificate</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-yellow-600 text-[20px]">monetization_on</span>
                      <span className="text-sm font-semibold text-slate-800">Earn <span className="text-green-700">+50 Credit Coins</span></span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-3">
                  {/* UPDATED NAVIGATION BUTTON */}
                  <button 
                    onClick={() => navigate('/set-goal')}
                    className="w-full bg-[#0474C4] hover:bg-blue-500 text-white font-bold py-3 px-4 rounded-lg shadow-lg shadow-blue-500/30 hover:shadow-blue-400/50 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 flex items-center justify-center gap-2 group"
                  >
                    <span>Set Learning Goal & Start</span>
                    <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform text-[20px]">arrow_forward</span>
                  </button>
                  <p className="text-xs text-center text-slate-600 font-medium">You’ll continue learning on our partner platform</p>
                  <button className="w-full bg-transparent hover:bg-white hover:text-[#0474C4] hover:border-[#0474C4]/30 hover:shadow-md text-slate-700 font-semibold py-2.5 px-4 rounded-lg border border-slate-900/10 transition-all duration-200">
                    Save for Later
                  </button>
                </div>
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

export default LmsCourseDetail;