import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const LmsPracticeGround = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("Baskar Manager");
  const [selectedLanguage, setSelectedLanguage] = useState('python');
  const [selectedDifficulty, setSelectedDifficulty] = useState('easy');

  // --------------------------------
  // CHATBOT STATE
  // --------------------------------
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const [chatMessages, setChatMessages] = useState([
    { id: 1, sender: 'ai', text: 'Hi Baskar! Ready to code? I can suggest a problem based on your selected language.' }
  ]);
  const chatEndRef = useRef(null);

  // --- API / LLM Initialization Logic ---
  useEffect(() => {
    const fetchPracticeData = async () => {
      try {
        console.log("System Ready: Practice Ground module initialized.");
      } catch (err) {
        console.log("Connection pending...");
      }
    };
    fetchPracticeData();
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
        const newAiMsg = { id: Date.now() + 1, sender: 'ai', text: "Try starting with 'Array Manipulation' - it's a great warm-up!" };
        setChatMessages(prev => [...prev, newAiMsg]);
    }, 1000);
  };

  const handleNavigate = (page) => {
    if (page === 'Dashboard') navigate('/dashboard/main');
    else navigate(`/${page.toLowerCase().replace(/\s+/g, '-')}`);
  };

  return (
    <div className="flex h-screen w-full overflow-hidden bg-[#06457F] text-white font-['Inter'] antialiased relative">
      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');
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

          <button onClick={() => navigate('/lms-courses')} className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-600 hover:bg-slate-50 transition-colors group text-left w-full">
            <span className="material-symbols-outlined group-hover:text-[#06457F] transition-colors">menu_book</span>
            <span className="font-medium group-hover:text-[#06457F] transition-colors">LMS Courses</span>
          </button>

          {/* Active State for Practice Ground */}
          <button onClick={() => navigate('/practice-ground')} className="flex items-center gap-3 px-4 py-3 rounded-lg bg-[#06457F] text-white shadow-md text-left w-full">
            <span className="material-symbols-outlined fill">code</span>
            <span className="font-medium">Practice Ground</span>
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
              {/* FIXED: Text size updated to 11px and slate-500 to match main dashboard */}
              <span className="text-[11px] text-slate-500 truncate">Pro Member</span>
            </div>
          </div>
        </div>
      </aside>

      {/* --- MAIN CONTENT AREA --- */}
      <main className="flex-1 h-full overflow-y-auto relative z-10 smooth-scroll bg-[#06457F] bg-gradient-to-br from-[#06457F] via-[#094b85] to-[#04284d]">
        
        {/* Background Decorative Blobs */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#0474C4] opacity-10 blur-[100px] rounded-full pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-indigo-500 opacity-10 blur-[80px] rounded-full pointer-events-none"></div>

        <div className="max-w-4xl mx-auto px-8 py-12 flex flex-col h-full min-h-[800px] relative z-10">
          
          {/* Header */}
          <header className="mb-10 text-center">
            <h1 className="text-white text-4xl font-black tracking-tight mb-3">Choose Your Practice Setup</h1>
            <p className="text-[#D1D5DB] text-lg font-light">Select a programming language and difficulty to start practicing.</p>
          </header>

          {/* Step 1: Language Selection */}
          <section className="mb-10">
            <div className="flex items-center gap-2 mb-4">
              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-[#0474C4]/20 text-[#0474C4] text-xs font-bold border border-[#0474C4]/30">1</span>
              <h3 className="text-white text-lg font-semibold tracking-wide">Select Language</h3>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {[
                { id: 'python', label: 'Python', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
                { id: 'java', label: 'Java', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg' },
                { id: 'c', label: 'C', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg' },
                { id: 'cpp', label: 'C++', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg' },
                { id: 'javascript', label: 'JavaScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' }
              ].map((lang) => (
                <div 
                  key={lang.id}
                  onClick={() => setSelectedLanguage(lang.id)}
                  className={`cursor-pointer group relative h-full flex flex-col items-center justify-center p-6 rounded-xl border transition-all duration-200
                    ${selectedLanguage === lang.id 
                      ? 'bg-[#0474C4]/10 border-[#0474C4] shadow-[0_0_15px_rgba(4,116,196,0.3)]' 
                      : 'bg-white/5 border-white/5 hover:bg-white/10'}`}
                >
                  <img src={lang.icon} alt={lang.label} className="w-12 h-12 mb-3 object-contain" />
                  <span className="text-white font-medium">{lang.label}</span>
                  {selectedLanguage === lang.id && (
                    <div className="absolute top-3 right-3">
                      <span className="material-symbols-outlined text-[#0474C4] text-sm font-bold">check_circle</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* Step 2: Difficulty Selection */}
          <section className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-[#0474C4]/20 text-[#0474C4] text-xs font-bold border border-[#0474C4]/30">2</span>
              <h3 className="text-white text-lg font-semibold tracking-wide">Select Difficulty</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { id: 'easy', label: 'Easy', color: 'emerald', text: 'Basics, syntax, and simple logic building.' },
                { id: 'medium', label: 'Medium', color: 'yellow', text: 'Data structures and typical interview questions.' },
                { id: 'hard', label: 'Hard', color: 'rose', text: 'Complex algorithms and system design challenges.' }
              ].map((level) => {
                // Tailwind dynamic colors workaround
                const activeColor = level.id === 'easy' ? 'emerald-500' : level.id === 'medium' ? 'yellow-500' : 'rose-500';
                const activeBg = level.id === 'easy' ? 'bg-emerald-500/10' : level.id === 'medium' ? 'bg-yellow-500/10' : 'bg-rose-500/10';
                const activeBorder = level.id === 'easy' ? 'border-emerald-500' : level.id === 'medium' ? 'border-yellow-500' : 'border-rose-500';
                const shadow = level.id === 'easy' ? 'shadow-[0_0_15px_rgba(16,185,129,0.2)]' : level.id === 'medium' ? 'shadow-[0_0_15px_rgba(234,179,8,0.2)]' : 'shadow-[0_0_15px_rgba(244,63,94,0.2)]';

                return (
                  <div 
                    key={level.id}
                    onClick={() => setSelectedDifficulty(level.id)}
                    className={`cursor-pointer group relative h-full p-5 rounded-xl border transition-all duration-200 flex flex-col gap-2
                      ${selectedDifficulty === level.id 
                        ? `${activeBg} ${activeBorder} ${shadow}` 
                        : 'bg-white/5 border-white/5 hover:bg-white/10'}`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className={`w-3 h-3 rounded-full bg-${level.color}-500 shadow-[0_0_8px_rgba(0,0,0,0.6)]`}></div>
                        <span className="text-white font-semibold text-lg">{level.label}</span>
                      </div>
                      {selectedDifficulty === level.id && (
                        <span className={`material-symbols-outlined text-${level.color}-500`}>check_circle</span>
                      )}
                    </div>
                    <p className="text-[#D1D5DB] text-sm font-light">{level.text}</p>
                  </div>
                );
              })}
            </div>
          </section>

          {/* AI Suggestion & CTA */}
          <div className="flex flex-col items-center gap-6 mt-6 pb-12">
            
            {/* AI Suggestion Pill */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-indigo-500/20 to-purple-500/20 border border-white/10 backdrop-blur-sm">
              <span className="text-lg">✨</span>
              <span className="text-indigo-200 text-sm font-medium">AI Suggestion: <span className="text-white font-normal">Start with Easy to build confidence.</span></span>
              <button className="ml-2 text-[#D1D5DB] hover:text-white transition-colors flex items-center">
                <span className="material-symbols-outlined text-[16px]">close</span>
              </button>
            </div>

            {/* Main CTA Button - NAVIGATION */}
            <button 
              onClick={() => navigate('/coding-practice')}
              className="w-full md:w-auto min-w-[240px] px-8 py-4 bg-[#0474C4] hover:bg-[#035a9a] text-white font-bold text-lg rounded-lg shadow-lg hover:shadow-[#0474C4]/40 hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center gap-2"
            >
              Start Practice
              <span className="material-symbols-outlined">arrow_forward</span>
            </button>
            <p className="text-[#D1D5DB] text-xs opacity-60">Ready to code? Click to begin your session.</p>
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

export default LmsPracticeGround;