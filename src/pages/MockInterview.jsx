import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const MockInterview = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("Baskar Manager");

  // --------------------------------
  // CHATBOT STATE
  // --------------------------------
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const [chatMessages, setChatMessages] = useState([
    { id: 1, sender: 'ai', text: 'Hi Baskar! Ready to practice? I can simulate a quick interview question for you.' }
  ]);
  const chatEndRef = useRef(null);

  // --- API / LLM Initialization Logic ---
  useEffect(() => {
    const fetchMockData = async () => {
      try {
        console.log("System Ready: Mock Interview module initialized.");
      } catch (err) {
        console.log("Connection pending...");
      }
    };
    fetchMockData();
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
        const newAiMsg = { id: Date.now() + 1, sender: 'ai', text: "Great answer! Let's try a behavioral question next..." };
        setChatMessages(prev => [...prev, newAiMsg]);
    }, 1000);
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
        .custom-scrollbar::-webkit-scrollbar { width: 8px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: #022c54; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #0474C4; border-radius: 4px; }
        
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }

        .material-symbols-outlined { font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24; }
        .material-symbols-outlined.fill { font-variation-settings: 'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24; }
        .fill-1 { font-variation-settings: 'FILL' 1; }

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

          {/* Active State for Mock Interview */}
          <button onClick={() => navigate('/mock-interview')} className="flex items-center gap-3 px-4 py-3 rounded-lg bg-[#06457F] text-white shadow-md text-left w-full">
            <span className="material-symbols-outlined fill-1">videocam</span>
            <span className="font-medium">Mock Interview</span>
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
              <span className="text-sm font-semibold text-slate-900 truncate">{userName}</span>
              <span className="text-[11px] text-slate-600 truncate">Pro Member</span>
            </div>
          </div>
        </div>
      </aside>

      {/* --- MAIN CONTENT AREA --- */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-12 md:px-12 overflow-y-auto custom-scrollbar w-full bg-[linear-gradient(135deg,_#021B35_0%,_#06457F_50%,_#032E56_100%)] relative">
        {/* Background Glows */}
        <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
            <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[100px] mix-blend-screen"></div>
            <div className="absolute top-[20%] right-[-10%] w-[400px] h-[400px] bg-blue-500/20 rounded-full blur-[100px] mix-blend-screen"></div>
            <div className="absolute bottom-[-10%] left-[20%] w-[600px] h-[600px] bg-teal-500/10 rounded-full blur-[120px] mix-blend-screen"></div>
        </div>

        <div className="w-full max-w-6xl flex flex-col gap-10 z-10">
          
          <div className="text-center space-y-4">
            <h1 className="text-white text-4xl md:text-5xl font-black tracking-tight leading-tight" style={{ fontFamily: "'Inter', sans-serif" }}>
              Choose Your Mock Interview Mode
            </h1>
            <p className="text-[#D1D5DB] text-lg md:text-xl font-medium max-w-2xl mx-auto">
              Practice your interview the way that works best for you.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full">
            
            {/* AI Mock Interview Card */}
            <div 
              onClick={() => navigate('/ai-interview')}
              className="group relative flex flex-col h-full bg-[#095290] hover:bg-[#0c5da0] border border-white/5 hover:border-[#0474C4] rounded-2xl p-8 md:p-10 transition-all duration-300 shadow-xl cursor-pointer hover:shadow-2xl hover:shadow-[#0474C4]/20 hover:-translate-y-2"
            >
              <div className="absolute top-0 right-0 p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="material-symbols-outlined text-[#0474C4] text-3xl">arrow_forward</span>
              </div>
              <div className="mb-8 inline-flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-fuchsia-500 to-purple-600 text-white ring-1 ring-inset ring-white/10 shadow-lg shadow-purple-500/20">
                <span className="material-symbols-outlined text-[40px]">auto_awesome</span>
              </div>
              <div className="mb-8">
                <h3 className="text-3xl font-bold text-white mb-3 transition-colors">AI Mock Interview</h3>
                <p className="text-[#D1D5DB] text-base leading-relaxed">
                  Practice instantly with AI-based interview questions designed to test your readiness on demand.
                </p>
              </div>
              <div className="flex-grow space-y-4 mb-10">
                <div className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-yellow-400 shrink-0 mt-0.5">bolt</span>
                  <span className="text-[#D1D5DB] text-sm font-medium">Instant interview, anytime</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-cyan-400 shrink-0 mt-0.5">view_list</span>
                  <span className="text-[#D1D5DB] text-sm font-medium">Structured role-specific questions</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-emerald-400 shrink-0 mt-0.5">analytics</span>
                  <span className="text-[#D1D5DB] text-sm font-medium">Automated scoring (Communication & Technical)</span>
                </div>
              </div>
              <button className="w-full bg-[#A8C4EC] hover:bg-[#92b5e3] text-[#06457F] font-bold py-4 px-6 rounded-lg transition-colors flex items-center justify-center gap-2 text-lg group-hover:shadow-lg group-hover:shadow-[#A8C4EC]/30">
                Start AI Interview
              </button>
            </div>

            {/* Mentor Mock Interview Card - UPDATED NAVIGATION */}
            <div 
              onClick={() => navigate('/human-interview')}
              className="group relative flex flex-col h-full bg-[#095290] hover:bg-[#0c5da0] border border-white/5 hover:border-[#0474C4] rounded-2xl p-8 md:p-10 transition-all duration-300 shadow-xl cursor-pointer hover:shadow-2xl hover:shadow-[#0474C4]/20 hover:-translate-y-2"
            >
              <div className="absolute top-0 right-0 p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="material-symbols-outlined text-[#0474C4] text-3xl">arrow_forward</span>
              </div>
              <div className="mb-8 inline-flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-400 to-orange-600 text-white ring-1 ring-inset ring-white/10 shadow-lg shadow-orange-500/20">
                <span className="material-symbols-outlined text-[40px]">school</span>
              </div>
              <div className="mb-8">
                <h3 className="text-3xl font-bold text-white mb-3 transition-colors">Mentor Mock Interview</h3>
                <p className="text-[#D1D5DB] text-base leading-relaxed">
                  Get real interview experience with an industry mentor for in-depth feedback and networking.
                </p>
              </div>
              <div className="flex-grow space-y-4 mb-10">
                <div className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-rose-400 shrink-0 mt-0.5">video_camera_front</span>
                  <span className="text-[#D1D5DB] text-sm font-medium">Live video mentor interview</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-purple-400 shrink-0 mt-0.5">rate_review</span>
                  <span className="text-[#D1D5DB] text-sm font-medium">Personalized feedback & insights</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-pink-400 shrink-0 mt-0.5">psychology_alt</span>
                  <span className="text-[#D1D5DB] text-sm font-medium">Human evaluation & expert tips</span>
                </div>
              </div>
              <button className="w-full bg-[#A8C4EC] hover:bg-[#92b5e3] text-[#06457F] font-bold py-4 px-6 rounded-lg transition-colors flex items-center justify-center gap-2 text-lg group-hover:shadow-lg group-hover:shadow-[#A8C4EC]/30">
                Book Mentor Interview
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

export default MockInterview;