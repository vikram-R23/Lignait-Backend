import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const MentorSchedule = () => {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState(24);
  const [selectedTime, setSelectedTime] = useState("11:30 AM");
  const [userName, setUserName] = useState("Baskar Manager");

  // --------------------------------
  // CHATBOT STATE
  // --------------------------------
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const [chatMessages, setChatMessages] = useState([
    { id: 1, sender: 'ai', text: 'Hi Baskar! Need help finding a suitable time slot for your mock interview?' }
  ]);
  const chatEndRef = useRef(null);

  const handleNavigate = (page) => {
    if (page === 'Dashboard') navigate('/dashboard/main');
    else navigate(`/${page.toLowerCase().replace(/\s+/g, '-')}`);
  };

  useEffect(() => {
    const fetchAvailability = async () => {
      try {
        console.log("System Ready: API initialized.");
      } catch (err) {
        console.log("Connection pending...");
      }
    };
    fetchAvailability();
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
        const newAiMsg = { id: Date.now() + 1, sender: 'ai', text: "I can check mentor availability for you..." };
        setChatMessages(prev => [...prev, newAiMsg]);
    }, 1000);
  };

  return (
    // UPDATED: Changed font-['Inter'] to font-['Space_Grotesk'] to match other pages
    <div className="bg-[#06457F] text-white font-['Space_Grotesk'] antialiased min-h-screen relative h-screen w-full flex overflow-hidden">
      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap');
        
        /* The requested scrollbar fix */
        .custom-scroll::-webkit-scrollbar { width: 10px; }
        .custom-scroll::-webkit-scrollbar-track { background: rgba(255, 255, 255, 0.05); }
        .custom-scroll::-webkit-scrollbar-thumb { background: #A8C4EC; border-radius: 10px; border: 2px solid #06457F; }
        .custom-scroll::-webkit-scrollbar-thumb:hover { background: #ffffff; }

        ::-webkit-scrollbar { width: 8px; }
        ::-webkit-scrollbar-track { background: #A8C4EC; }
        ::-webkit-scrollbar-thumb { background: #06457F; border-radius: 4px; }
        ::-webkit-scrollbar-thumb:hover { background: #04325e; }
        
        /* --- UNIVERSAL NO SCROLLBAR --- */
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
      <aside className="w-72 flex-shrink-0 flex flex-col border-r border-slate-300 bg-white relative z-20 h-full shadow-xl">
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
            <span className="material-symbols-outlined group-hover:text-[#06457F] transition-colors">home</span>
            <span className="font-medium group-hover:text-[#06457F] transition-colors">Dashboard</span>
          </button>
          
          <button onClick={() => handleNavigate('Roadmap')} className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-600 hover:bg-slate-50 transition-colors group text-left w-full">
            <span className="material-symbols-outlined group-hover:text-[#06457F] transition-colors">map</span>
            <span className="font-medium group-hover:text-[#06457F] transition-colors">Career Roadmap</span>
          </button>

          {/* Mentorship - Active */}
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

          {/* Internships & Jobs - Correct Position */}
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

        {/* --- COMPACT PROFILE SECTION (MATCHES PREVIOUS PAGES) --- */}
        <div className="p-3 border-t border-slate-300 shrink-0 mt-auto bg-white z-20">
          <div 
            onClick={() => navigate('/profile')} 
            className="flex items-center gap-3 px-2 py-1.5 rounded-lg cursor-pointer hover:bg-slate-50 transition-colors"
          >
            {/* Avatar size-9 to match other pages */}
            <div className="size-9 rounded-full bg-cover bg-center border border-slate-300 shrink-0" style={{ backgroundImage: "url('https://ui-avatars.com/api/?name=B+&background=06457F&color=fff')" }}></div>
            <div className="flex flex-col min-w-0">
              <span className="text-sm font-semibold text-slate-900 truncate">{userName}</span>
              <span className="text-[11px] text-slate-600 truncate">Pro Member</span>
            </div>
          </div>
        </div>
      </aside>

      {/* --- MAIN PANEL --- */}
      <main className="flex-1 flex flex-col h-full overflow-y-auto bg-[#06457F] relative custom-scroll">
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none"></div>
        
        <div className="p-8 relative z-10">
          <div className="max-w-6xl mx-auto w-full flex flex-col gap-8">
            
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2 text-blue-200/60 text-sm font-semibold mb-2">
                <span className="cursor-pointer hover:text-white" onClick={() => navigate('/mentors')}>Mentors</span>
                <span className="material-symbols-outlined text-[14px]">chevron_right</span>
                <span>Yogesh Malhotra</span>
                <span className="material-symbols-outlined text-[14px]">chevron_right</span>
                <span className="text-white">Book Session</span>
              </div>
              <h1 className="text-white text-4xl font-bold tracking-tight text-left">Book Your Session</h1>
              <p className="text-blue-100 text-lg text-left font-medium">Select a date and time to schedule your mock interview.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              <div className="lg:col-span-7 xl:col-span-8 flex flex-col gap-8">
                <div className="flex flex-col gap-4">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-bold text-white">Select Date</h2>
                    <div className="flex items-center gap-2 bg-[#0f4a8a] border border-blue-400/20 rounded-lg p-1">
                      <button className="size-8 flex items-center justify-center text-white hover:bg-white/10 rounded-md transition-colors">
                        <span className="material-symbols-outlined text-[20px]">chevron_left</span>
                      </button>
                      <span className="text-sm font-bold text-white px-2">October 2023</span>
                      <button className="size-8 flex items-center justify-center text-white hover:bg-white/10 rounded-md transition-colors">
                        <span className="material-symbols-outlined text-[20px]">chevron_right</span>
                      </button>
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-br from-[#1e4e8c] to-[#0c2e55] border border-blue-400/30 rounded-2xl p-6 shadow-xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 -mr-16 -mt-16 size-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>
                    <div className="grid grid-cols-7 mb-4 relative z-10 text-center">
                      {['Sun','Mon','Tue','Wed','Thu','Fri','Sat'].map(day => (
                        <div key={day} className="text-cyan-300 text-xs font-bold uppercase tracking-widest">{day}</div>
                      ))}
                    </div>
                    <div className="grid grid-cols-7 gap-y-2 gap-x-1 relative z-10">
                      {[...Array(3)].map((_, i) => <div key={`empty-${i}`} className="h-10"></div>)}
                      {[...Array(31)].map((_, i) => {
                        const day = i + 1;
                        const isActive = selectedDate === day;
                        const isDisabled = day < 4;
                        return (
                          <button 
                            key={day}
                            disabled={isDisabled}
                            onClick={() => setSelectedDate(day)}
                            className={`h-12 w-full flex items-center justify-center text-sm transition-all rounded-full font-bold ${
                              isDisabled ? 'text-slate-500 cursor-not-allowed opacity-30' : 
                              isActive ? 'bg-sky-500 text-white shadow-[0_0_20px_rgba(14,165,233,0.6)] border border-sky-400' : 
                              'text-white hover:bg-cyan-500/20'
                            }`}
                          >
                            {day}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-4">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-bold text-white">Available Time Slots</h2>
                    <span className="text-sm font-medium text-blue-200">Times are in IST (Chennai)</span>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                    {["09:00 AM", "09:30 AM", "10:00 AM", "11:30 AM", "01:00 PM", "02:30 PM", "04:00 PM", "05:30 PM"].map(time => (
                      <button 
                        key={time}
                        onClick={() => setSelectedTime(time)}
                        className={`group flex flex-col items-center justify-center p-4 rounded-xl border transition-all duration-300 ${
                          selectedTime === time 
                          ? 'border-[#0473c3] bg-[#0473c3] shadow-lg shadow-blue-900/50 scale-[1.02]' 
                          : 'border-[#2b6ba3] bg-[#085294]/30 hover:border-sky-400 hover:bg-sky-900/50'
                        }`}
                      >
                        <span className={`text-sm font-bold`}>{time}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="lg:col-span-5 xl:col-span-4">
                <div className="sticky top-8 bg-[#A8C4EC] rounded-3xl p-8 shadow-2xl flex flex-col gap-6 text-left border border-white/20">
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <div className="size-16 rounded-full bg-cover bg-center border-2 border-white shadow-md" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuD4cws0d7GKTwaUXCdNINAGSz-M58nuwv6xLyuXZ12wUV_NeTxjQ0DGx_JICSCZX6vA3ePBZyWMLt6MaFthLjg_L5HUdYp6LuJEYlSkMoi6tjUnE2SX-dJ4qsx0cqf1WFkxfpnlkizdqO6gs-xAOMZosq5UvYitndtw1SDyH_yY3agCtZKmbbtQBtXv-dO-CQcglSPCEh1Irn7rvAI1AF3f16IC4bGB2t5Q9RNntSGMB2CiL0HVVsN6jl9luUP9LWCQVleuL5zlj0g')" }}></div>
                      <div className="absolute bottom-0 right-0 size-4 bg-green-500 rounded-full border-2 border-white"></div>
                    </div>
                    <div>
                      <h3 className="text-slate-900 font-bold text-xl leading-tight">Yogesh Malhotra</h3>
                      <p className="text-slate-700 font-semibold text-sm">Senior Tech Lead</p>
                    </div>
                  </div>
                  <hr className="border-slate-400/30"/>
                  <div className="flex flex-col gap-5">
                    <SummaryItem icon="videocam" label="Mode" value="Mentor Mock Interview" />
                    <SummaryItem icon="category" label="Domain" value="Technology" />
                    <SummaryItem icon="schedule" label="Duration" value="30 Minutes" />
                    <div className="flex items-start gap-3">
                      <div className="size-10 rounded-xl bg-white/60 flex items-center justify-center shrink-0 shadow-sm">
                        <span className="material-symbols-outlined text-[#06457F] text-[24px]">calendar_month</span>
                      </div>
                      <div>
                        <p className="text-slate-600 text-xs uppercase font-bold tracking-widest">Selected Time</p>
                        <p className="text-[#06457F] font-bold text-xl">Oct {selectedDate}, {selectedTime}</p>
                      </div>
                    </div>
                  </div>
                  <div className="mt-2 bg-white/50 rounded-2xl p-5 flex justify-between items-center border border-white/40 shadow-inner">
                    <span className="text-slate-800 font-bold">Total Price</span>
                    <span className="text-[#06457F] font-bold text-2xl">$120.00</span>
                  </div>
                  <button onClick={() => navigate('/booking-confirmation')} className="w-full py-4 bg-[#06457F] hover:bg-[#04325e] text-white font-bold text-lg rounded-2xl shadow-xl transition-all hover:translate-y-[-2px] active:translate-y-[0px]">
                    Confirm Booking
                  </button>
                  <p className="text-center text-slate-600 text-xs font-semibold">
                    By confirming, you agree to our <span className="underline cursor-pointer hover:text-slate-900">cancellation policy</span>.
                  </p>
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

// Helper Component for Summary Card
const SummaryItem = ({ icon, label, value }) => (
  <div className="flex items-start gap-3 text-left">
    <div className="size-10 rounded-xl bg-white/60 flex items-center justify-center shrink-0 shadow-sm">
      <span className="material-symbols-outlined text-[#06457F] text-[24px]">{icon}</span>
    </div>
    <div className="flex flex-col">
      <p className="text-slate-600 text-xs uppercase font-bold tracking-widest">{label}</p>
      <p className="text-slate-900 font-bold text-md">{value}</p>
    </div>
  </div>
);

export default MentorSchedule;