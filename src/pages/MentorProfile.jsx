import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const MentorProfile = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("Baskar Manager");

  // --------------------------------
  // CHATBOT STATE (ADDED)
  // --------------------------------
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const [chatMessages, setChatMessages] = useState([
    { id: 1, sender: 'ai', text: 'Hi! I can help you prepare for your session with Yogesh. Want some sample interview questions?' }
  ]);
  const chatEndRef = useRef(null);

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
        const newAiMsg = { id: Date.now() + 1, sender: 'ai', text: "I'm analyzing your request..." };
        setChatMessages(prev => [...prev, newAiMsg]);
    }, 1000);
  };

  const handleNavigate = (page) => {
    if (page === 'Dashboard') navigate('/dashboard/main');
    else navigate(`/${page.toLowerCase().replace(/\s+/g, '-')}`);
  };

  return (
    <div className="bg-[#A8C4EC] text-[#0F172A] font-['Space_Grotesk'] overflow-hidden antialiased relative h-screen w-full flex">
      <style dangerouslySetInnerHTML={{ __html: `
        ::-webkit-scrollbar { width: 8px; }
        ::-webkit-scrollbar-track { background: #A8C4EC; }
        ::-webkit-scrollbar-thumb { background: #06457F; border-radius: 4px; }
        ::-webkit-scrollbar-thumb:hover { background: #04325e; }
        
        .material-symbols-outlined { font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24; }
        .material-symbols-outlined.fill { font-variation-settings: 'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24; }
        .fill-1 { font-variation-settings: 'FILL' 1; }

        /* --- UNIVERSAL NO SCROLLBAR --- */
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }

        /* Chat Animation */
        @keyframes slideUpFade {
            from { transform: translateY(20px) scale(0.95); opacity: 0; }
            to { transform: translateY(0) scale(1); opacity: 1; }
        }
        .chat-animate { animation: slideUpFade 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
      `}} />

      {/* --- SIDEBAR (Standardized with Compact Profile) --- */}
      <aside className="w-72 flex-shrink-0 flex flex-col border-r border-slate-300 bg-white relative z-20 shadow-xl h-full">
        <div className="p-6 flex items-center gap-3 select-none shrink-0">
          {/* UPDATED LOGO: Square Gradient Rocket */}
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#0474C4] to-cyan-400 flex items-center justify-center shadow-lg shadow-blue-500/30">
            <span className="material-symbols-outlined text-white text-xl">rocket_launch</span>
          </div>
          <span className="text-2xl font-black tracking-tight text-[#0F172A]">
            Career <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0474C4] to-cyan-500">Orbit</span>
          </span>
        </div>

        {/* Navigation - Added no-scrollbar */}
        <nav className="flex-1 px-4 py-4 flex flex-col gap-2 overflow-y-auto no-scrollbar">
          <button onClick={() => handleNavigate('Dashboard')} className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-600 hover:bg-slate-50 transition-colors group text-left w-full">
            <span className="material-symbols-outlined group-hover:text-[#06457F] transition-colors">home</span>
            <span className="font-medium group-hover:text-[#06457F] transition-colors">Dashboard</span>
          </button>
          
          <button onClick={() => handleNavigate('Roadmap')} className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-600 hover:bg-slate-50 transition-colors group text-left w-full">
            <span className="material-symbols-outlined group-hover:text-[#06457F] transition-colors">map</span>
            <span className="font-medium group-hover:text-[#06457F] transition-colors">Career Roadmap</span>
          </button>

          {/* Mentorship (Active State) */}
          <button onClick={() => handleNavigate('Mentors')} className="flex items-center gap-3 px-4 py-3 rounded-lg bg-[#06457F] text-white shadow-md text-left w-full">
            <span className="material-symbols-outlined fill-1">groups</span>
            <span className="font-medium">Mentorship</span>
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

          {/* --- INTERNSHIP OPPORTUNITIES (After My Bookings) --- */}
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

        {/* --- COMPACT PROFILE SECTION (FIXED) --- */}
        <div className="p-3 border-t border-slate-300 shrink-0 mt-auto bg-white z-20">
          <div 
            onClick={() => navigate('/profile')} 
            className="flex items-center gap-3 px-2 py-1.5 rounded-lg cursor-pointer hover:bg-slate-50 transition-colors"
          >
            {/* Reduced size to size-9 */}
            <div className="size-9 rounded-full bg-cover bg-center border border-slate-300 shrink-0" style={{ backgroundImage: "url('https://ui-avatars.com/api/?name=B+&background=06457F&color=fff')" }}></div>
            <div className="flex flex-col min-w-0">
              <span className="text-sm font-semibold text-slate-900 truncate">{userName}</span>
              <span className="text-[11px] text-slate-600 truncate">Pro Member</span>
            </div>
          </div>
        </div>
      </aside>

      {/* --- MAIN CONTENT AREA --- */}
      <main className="flex-1 flex overflow-y-auto bg-[#06457F]">
        <div className="flex flex-1 flex-row min-h-full">
          
          {/* Left Content Column */}
          <div className="flex-1 px-8 py-8 md:px-12 lg:px-16 max-w-4xl mx-auto xl:mx-0">
            <div className="flex flex-col gap-6 border-b border-white/10 pb-8">
              <div>
                <h1 className="text-4xl font-black text-white tracking-tight mb-2">Yogesh Malhotra</h1>
                <p className="text-xl font-medium text-blue-200">Senior Software Engineer | Interview Panelist</p>
                
                <div className="mt-6 flex flex-col gap-3 text-gray-300">
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-blue-400">work_history</span>
                    <span className="text-sm">8+ years of experience in software development</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-blue-400">assignment_ind</span>
                    <span className="text-sm">Has conducted 300+ technical & HR mock interviews</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-blue-400">domain</span>
                    <span className="text-sm">Experience with startups and mid-scale product companies</span>
                  </div>
                </div>
              </div>

              <div className="mt-4">
                <h3 className="text-xs font-bold uppercase tracking-widest text-blue-300/80 mb-4">Expertise Areas</h3>
                <div className="flex flex-wrap gap-2">
                  {["Technical Interviews", "HR / Behavioral Rounds", "Freshers & Entry-Level", "Communication Improvement", "Confidence Building"].map((skill) => (
                    <span key={skill} className="rounded-lg bg-white/10 px-4 py-2 backdrop-blur-sm border border-white/10 text-sm text-blue-100">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-10 grid gap-12 lg:grid-cols-2">
              <div className="flex flex-col gap-4">
                <h3 className="text-2xl font-bold text-white">About Yogesh</h3>
                <p className="text-gray-300 leading-relaxed">
                  Specializes in helping candidates prepare for technical roles in startups and mid-sized companies. Focuses on bridging the gap between theoretical knowledge and practical application. Yogesh brings deep industry insight to help you navigate complex interview processes with ease.
                </p>
                <div className="mt-4 p-5 rounded-2xl bg-[#0474C4]/10 border border-[#0474C4]/30">
                  <h4 className="text-white font-bold mb-2 flex items-center gap-2">
                    <span className="material-symbols-outlined text-[#0474C4]">psychology</span>
                    Primary Domain
                  </h4>
                  <p className="text-gray-300 text-sm">Technology (Software / IT)</p>
                </div>
              </div>

              <div className="flex flex-col gap-4">
                <h3 className="text-2xl font-bold text-white">Interview Style</h3>
                <ul className="flex flex-col gap-4">
                  {[
                    "Structured interview flow mimicking real rounds",
                    "Real company-level questions and challenges",
                    "Practical problem-solving focus over theory",
                    "Honest, actionable feedback for improvement"
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span className="material-symbols-outlined text-green-400 fill">check_circle</span>
                      <span className="text-gray-300">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Feedback Section */}
            <div className="mt-16 mb-12">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-2xl font-bold text-white">Mentee Feedback</h3>
                <div className="flex items-center gap-2 bg-yellow-500/20 px-4 py-1.5 rounded-full border border-yellow-500/30">
                  <span className="material-symbols-outlined text-yellow-400 fill text-sm">star</span>
                  <span className="text-yellow-100 font-bold text-sm">4.7 / 5</span>
                </div>
              </div>
              <div className="grid gap-6 md:grid-cols-2">
                <div className="bg-white/5 border border-white/10 p-6 rounded-2xl">
                  <div className="flex gap-1 mb-3 text-yellow-500">
                    {[1, 2, 3, 4, 5].map((s) => <span key={s} className="material-symbols-outlined fill text-sm">star</span>)}
                  </div>
                  <p className="text-gray-300 italic text-sm leading-relaxed">"Clear feedback on my technical gaps and communication. Yogesh really pinpointed what was missing."</p>
                  <p className="text-xs text-blue-400 mt-4 font-bold uppercase tracking-wider">- Ananya S.</p>
                </div>
                <div className="bg-white/5 border border-white/10 p-6 rounded-2xl">
                  <div className="flex gap-1 mb-3 text-yellow-500">
                    {[1, 2, 3, 4].map((s) => <span key={s} className="material-symbols-outlined fill text-sm">star</span>)}
                    <span className="material-symbols-outlined text-sm">star_half</span>
                  </div>
                  <p className="text-gray-300 italic text-sm leading-relaxed">"Helped me understand how interviewers think. The mock session felt very real."</p>
                  <p className="text-xs text-blue-400 mt-4 font-bold uppercase tracking-wider">- Rahul M.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Sidebar - Booking Card */}
          <div className="hidden w-[380px] shrink-0 bg-[#A8C4EC] p-8 lg:flex flex-col shadow-[-10px_0_30px_rgba(0,0,0,0.2)] z-10 sticky top-0 h-screen">
            <div className="flex flex-col h-full">
              <div className="mb-8">
                <h2 className="text-3xl font-black text-[#06457F] mb-1">Session Info</h2>
                <p className="text-[#06457F]/70 font-medium">Review booking details</p>
              </div>

              <div className="flex flex-col gap-5 bg-white/40 p-6 rounded-3xl backdrop-blur-md border border-white/50 shadow-inner">
                {[
                  { label: "Interview Mode", val: "Mentor Mock Interview", icon: "person" },
                  { label: "Domain", val: "Technology", icon: "computer" },
                  { label: "Duration", val: "30 minutes", icon: "schedule" },
                  { label: "Format", val: "Video Call", icon: "videocam" },
                  { label: "Feedback Provided", val: "Yes (Report)", icon: "description" },
                ].map((info, idx) => (
                  <div key={idx} className="flex flex-col gap-1 border-b border-[#06457F]/10 pb-3 last:border-0 last:pb-0">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#06457F]/60">{info.label}</span>
                    <span className="text-[#06457F] font-bold flex items-center gap-2">
                      <span className="material-symbols-outlined text-lg">{info.icon}</span>
                      {info.val}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-auto pt-8">
               <button 
                    onClick={() => navigate('/mentorschedule')} 
                    className="w-full py-4 bg-[#0474C4] hover:bg-[#0361a3] text-white font-bold rounded-xl shadow-lg transition-all"
                >
                  Book Interview
                    </button>
                <p className="text-center text-[#06457F]/60 text-xs mt-5 font-medium">
                  No credit card required for trial sessions.
                </p>
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
                        <button onClick={() => setIsExpanded(!isExpanded)} className="text-white/70 hover:text-white p-2 rounded-lg hover:bg-white/10 transition-colors">
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

export default MentorProfile;