import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const LmsLearningRewards = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("Baskar Manager");

  // --------------------------------
  // CHATBOT STATE
  // --------------------------------
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const [chatMessages, setChatMessages] = useState([
    { id: 1, sender: 'ai', text: 'Hi Baskar! Congratulations on your progress! Want to know how to redeem your Credit Coins?' }
  ]);
  const chatEndRef = useRef(null);

  // --- API / LLM Initialization Logic ---
  useEffect(() => {
    const fetchRewardsData = async () => {
      try {
        console.log("System Ready: Rewards module initialized.");
      } catch (err) {
        console.log("Connection pending...");
      }
    };
    fetchRewardsData();
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
        const newAiMsg = { id: Date.now() + 1, sender: 'ai', text: "You can use coins to book exclusive mentor sessions!" };
        setChatMessages(prev => [...prev, newAiMsg]);
    }, 1000);
  };

  const handleNavigate = (page) => {
    if (page === 'Dashboard') navigate('/dashboard/main');
    else navigate(`/${page.toLowerCase().replace(/\s+/g, '-')}`);
  };

  return (
    <div className="flex h-screen w-full overflow-hidden bg-gray-50 text-gray-900 font-['Inter'] antialiased relative">
      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;900&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap');

        /* Custom Scrollbar */
        ::-webkit-scrollbar { width: 8px; }
        ::-webkit-scrollbar-track { background: #0f172a; }
        ::-webkit-scrollbar-thumb { background: #1e3a8a; border-radius: 4px; }
        ::-webkit-scrollbar-thumb:hover { background: #0284c7; }

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
              <span className="text-[11px] text-slate-500 truncate">Pro Member</span>
            </div>
          </div>
        </div>
      </aside>

      {/* --- MAIN CONTENT AREA --- */}
      <main className="flex-1 flex flex-col bg-gradient-to-br from-[#0f172a] via-[#1e3a8a] to-[#0284c7] overflow-hidden relative">
        {/* Noise Overlay */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZmlsdGVyIGlkPSJub2lzZUZpbHRlciI+PGZlVHVyYnVsZW5jZSB0eXBlPSJmcmFjdGFsTm9pc2UiIGJhc2VGcmVxdWVuY3k9IjAuNjUiIG51bSBPY3RhdmVzPSIzIiBzdGl0Y2hUaWxlcz0ic3RpdGNoIi8+PC9maWx0ZXI+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsdGVyPSJ1cmwoI25vaXNlRmlsdGVyKSIgb3BhY2l0eT0iMC4wNSIvPjwvc3ZnPg==')] opacity-30 pointer-events-none"></div>
        
        <div className="flex-1 overflow-y-auto px-8 py-8 md:px-12 lg:px-16 scroll-smooth z-10">
          <div className="mx-auto max-w-[1000px] flex flex-col gap-8 pb-20">
            
            {/* Header */}
            <div className="flex flex-col gap-2">
              <h1 className="text-white text-[32px] font-bold leading-tight tracking-tight drop-shadow-sm">Learning Rewards</h1>
              <p className="text-blue-100/80 text-base font-normal leading-relaxed max-w-2xl">Credits and certificates you’ve earned through learning. Your progress is paying off.</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Credit Coins Card */}
              <div className="relative overflow-hidden flex flex-col justify-between rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-700 border border-white/20 p-6 shadow-xl shadow-blue-900/40 group transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_40px_-5px_rgba(59,130,246,0.6)] hover:border-blue-400/50">
                <div className="absolute top-0 right-0 -mr-8 -mt-8 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
                <div className="flex items-start justify-between relative z-10">
                  <div className="flex flex-col gap-1">
                    <p className="text-blue-100 text-sm font-semibold uppercase tracking-wider">Total Credit Coins</p>
                    <p className="text-white text-5xl font-bold mt-2 drop-shadow-md">150</p>
                  </div>
                  <div className="bg-white/20 p-4 rounded-xl backdrop-blur-sm border border-white/10 shadow-inner">
                    <span className="text-3xl filter drop-shadow-md">🪙</span>
                  </div>
                </div>
                <p className="text-blue-100 text-sm mt-6 flex items-center gap-2 font-medium">
                  <div className="bg-green-400/20 text-green-300 p-1 rounded-full">
                    <span className="material-symbols-outlined text-sm font-bold">trending_up</span>
                  </div>
                  +20 earned this week
                </p>
              </div>

              {/* Certificates Card */}
              <div className="relative overflow-hidden flex flex-col justify-between rounded-2xl bg-gradient-to-br from-indigo-600 to-purple-700 border border-white/20 p-6 shadow-xl shadow-indigo-900/40 group transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_40px_-5px_rgba(99,102,241,0.6)] hover:border-indigo-400/50">
                <div className="absolute bottom-0 left-0 -ml-8 -mb-8 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
                <div className="flex items-start justify-between relative z-10">
                  <div className="flex flex-col gap-1">
                    <p className="text-indigo-100 text-sm font-semibold uppercase tracking-wider">Certificates Earned</p>
                    <p className="text-white text-5xl font-bold mt-2 drop-shadow-md">3</p>
                  </div>
                  <div className="bg-white/20 p-4 rounded-xl backdrop-blur-sm border border-white/10 shadow-inner">
                    <span className="text-3xl filter drop-shadow-md">🎖</span>
                  </div>
                </div>
                <p className="text-indigo-100 text-sm mt-6 flex items-center gap-2 font-medium">
                  <div className="bg-white/20 text-white p-1 rounded-full">
                    <span className="material-symbols-outlined text-sm">verified</span>
                  </div>
                  Latest: System Design
                </p>
              </div>
            </div>

            {/* Info Banner */}
            <div className="bg-gradient-to-r from-sky-500 to-cyan-600 rounded-xl p-6 border border-white/20 shadow-lg shadow-cyan-900/20 flex flex-col md:flex-row gap-5 items-start md:items-center relative overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(6,182,212,0.5)] hover:border-cyan-300/50 group">
              <div className="absolute right-0 top-0 w-64 h-full bg-gradient-to-l from-white/10 to-transparent pointer-events-none"></div>
              <div className="bg-white/25 p-3 rounded-full shrink-0 shadow-sm backdrop-blur-sm">
                <span className="material-symbols-outlined text-white text-[28px]">lightbulb</span>
              </div>
              <div className="flex-1 relative z-10">
                <h3 className="text-white text-lg font-bold mb-1">How you can use Credit Coins</h3>
                <p className="text-white/90 text-sm font-medium leading-relaxed">Book mentor mock interviews and unlock premium practice sessions to accelerate your career preparation.</p>
              </div>
            </div>

            {/* History Table */}
            <div className="flex flex-col gap-4">
              <h2 className="text-white text-xl font-bold flex items-center gap-2">
                <span className="material-symbols-outlined text-blue-300">history</span>
                History
              </h2>
              <div className="rounded-2xl border border-white/20 bg-white/10 backdrop-blur-lg overflow-hidden shadow-2xl">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-black/20 border-b border-white/10 text-white/70">
                        <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider">Course Name</th>
                        <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider">Reward Type</th>
                        <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider">Earned Date</th>
                        <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-right">Amount / Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/10 text-sm">
                      {/* Row 1 */}
                      <tr className="hover:bg-white/15 transition-all duration-200 group relative hover:shadow-[inset_0_0_30px_rgba(56,189,248,0.1)]">
                        <td className="px-6 py-5">
                          <div className="flex items-center gap-4">
                            <div className="h-10 w-10 rounded-lg bg-blue-500 shadow-lg shadow-blue-500/40 flex items-center justify-center text-white shrink-0">
                              <span className="material-symbols-outlined text-xl">code</span>
                            </div>
                            <span className="text-white font-semibold">Advanced Python Patterns</span>
                          </div>
                        </td>
                        <td className="px-6 py-5">
                          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-yellow-500/20 border border-yellow-400/30 text-yellow-200 text-xs font-semibold uppercase tracking-wide">
                            Credit Coins
                          </div>
                        </td>
                        <td className="px-6 py-5 text-blue-100/80 font-medium">Oct 24, 2023</td>
                        <td className="px-6 py-5 text-right">
                          <span className="text-white font-bold text-base tracking-wide drop-shadow-sm">+50 Coins</span>
                        </td>
                      </tr>
                      {/* Row 2 */}
                      <tr className="hover:bg-white/15 transition-all duration-200 group relative hover:shadow-[inset_0_0_30px_rgba(168,85,247,0.1)]">
                        <td className="px-6 py-5">
                          <div className="flex items-center gap-4">
                            <div className="h-10 w-10 rounded-lg bg-purple-500 shadow-lg shadow-purple-500/40 flex items-center justify-center text-white shrink-0">
                              <span className="material-symbols-outlined text-xl">architecture</span>
                            </div>
                            <span className="text-white font-semibold">System Design Certificate</span>
                          </div>
                        </td>
                        <td className="px-6 py-5">
                          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/30 border border-purple-400/30 text-purple-100 text-xs font-semibold uppercase tracking-wide">
                            Certificate
                          </div>
                        </td>
                        <td className="px-6 py-5 text-blue-100/80 font-medium">Oct 20, 2023</td>
                        <td className="px-6 py-5 text-right">
                          <button className="text-sky-300 hover:text-white hover:bg-sky-500 hover:shadow-[0_0_15px_rgba(14,165,233,0.6)] px-3 py-1.5 rounded-lg text-sm font-semibold flex items-center justify-end gap-2 w-full transition-all duration-300 ml-auto transform hover:-translate-y-0.5 border border-transparent hover:border-sky-400">
                            <span className="material-symbols-outlined text-lg">download</span>
                            Download PDF
                          </button>
                        </td>
                      </tr>
                      {/* Row 3 */}
                      <tr className="hover:bg-white/15 transition-all duration-200 group relative hover:shadow-[inset_0_0_30px_rgba(6,182,212,0.1)]">
                        <td className="px-6 py-5">
                          <div className="flex items-center gap-4">
                            <div className="h-10 w-10 rounded-lg bg-cyan-500 shadow-lg shadow-cyan-500/40 flex items-center justify-center text-white shrink-0">
                              <span className="material-symbols-outlined text-xl">data_object</span>
                            </div>
                            <span className="text-white font-semibold">React Basics</span>
                          </div>
                        </td>
                        <td className="px-6 py-5">
                          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-yellow-500/20 border border-yellow-400/30 text-yellow-200 text-xs font-semibold uppercase tracking-wide">
                            Credit Coins
                          </div>
                        </td>
                        <td className="px-6 py-5 text-blue-100/80 font-medium">Sep 15, 2023</td>
                        <td className="px-6 py-5 text-right">
                          <span className="text-white font-bold text-base tracking-wide drop-shadow-sm">+20 Coins</span>
                        </td>
                      </tr>
                      {/* Row 4 */}
                      <tr className="hover:bg-white/15 transition-all duration-200 group relative hover:shadow-[inset_0_0_30px_rgba(16,185,129,0.1)]">
                        <td className="px-6 py-5">
                          <div className="flex items-center gap-4">
                            <div className="h-10 w-10 rounded-lg bg-emerald-500 shadow-lg shadow-emerald-500/40 flex items-center justify-center text-white shrink-0">
                              <span className="material-symbols-outlined text-xl">school</span>
                            </div>
                            <span className="text-white font-semibold">UX Principles</span>
                          </div>
                        </td>
                        <td className="px-6 py-5">
                          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-yellow-500/20 border border-yellow-400/30 text-yellow-200 text-xs font-semibold uppercase tracking-wide">
                            Credit Coins
                          </div>
                        </td>
                        <td className="px-6 py-5 text-blue-100/80 font-medium">Aug 10, 2023</td>
                        <td className="px-6 py-5 text-right">
                          <span className="text-white font-bold text-base tracking-wide drop-shadow-sm">+30 Coins</span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="px-6 py-4 border-t border-white/10 flex justify-center bg-black/10">
                  <button className="text-blue-100 hover:text-cyan-200 text-sm font-semibold transition-all duration-300 flex items-center gap-1 hover:gap-2 hover:drop-shadow-[0_0_10px_rgba(103,232,249,0.8)] px-4 py-2 hover:bg-white/5 rounded-full">
                    View full history
                    <span className="material-symbols-outlined text-base">expand_more</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Footer Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mt-2 pt-6 border-t border-white/20">
              <button 
                onClick={() => navigate('/learning-progress')}
                className="flex-1 sm:flex-none px-8 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold shadow-lg shadow-blue-500/25 transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 hover:shadow-[0_0_30px_rgba(6,182,212,0.6)] flex items-center justify-center gap-2"
              >
                <span className="material-symbols-outlined">school</span>
                Continue Learning
              </button>
              <button 
                onClick={() => navigate('/dashboard')}
                className="flex-1 sm:flex-none px-8 py-3.5 rounded-xl bg-transparent border-2 border-white/20 hover:bg-white/10 hover:border-white/60 text-white font-semibold transition-all duration-300 flex items-center justify-center gap-2 hover:shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:-translate-y-1"
              >
                <span className="material-symbols-outlined">dashboard</span>
                Go to Dashboard
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

export default LmsLearningRewards;