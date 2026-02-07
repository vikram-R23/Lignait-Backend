import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const MentorModule = () => {
  const navigate = useNavigate();
  const [mentors, setMentors] = useState([]);
  const [userName, setUserName] = useState("Baskar Manager");

  // --------------------------------
  // CHATBOT STATE (ADDED)
  // --------------------------------
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const [chatMessages, setChatMessages] = useState([
    { id: 1, sender: 'ai', text: 'Hi Baskar! Looking for a mentor? I can recommend someone based on your goals.' }
  ]);
  const chatEndRef = useRef(null);

  const handleNavigate = (page) => {
    if (page === 'Dashboard') navigate('/dashboard/main');
    else navigate(`/${page.toLowerCase().replace(/\s+/g, '-')}`);
  };

  useEffect(() => {
    const data = [
      { id: 0, name: "Ananya Gupta", role: "Sr. Product Manager @ TechFlow", exp: "8 Yrs Exp", domain: "Technology", rating: "4.9", color: "purple", tags: ["Product Strategy", "Leadership"], available: true, img: "https://lh3.googleusercontent.com/aida-public/AB6AXuD3eP1UOs-rw6ryNDDFqDaS_iI8THcUI_ak7NihTirQld8Iq3_qSVg61Qo0zNxAwUR8aDAvkluo8jj1cJE_9x1DUUafuE-HbATcDd8IGM4hRgfCXmbJujeWWeDf2l41tSL7mN8SirPiP6SHnNA83BveGgAKVk7xSjSZqfsy8wQStXMFlSLYKVjJRlb9HbI78JxxCl1axelzyFT44-oYyeu0c2HkoRRfN9g7Bcxxqg7UcR7vHukT80C1qRwuhT0Dr7PcqSgXqHupE-k", btnColor: "bg-purple-600", hoverBtn: "hover:bg-purple-500", textColor: "text-purple-400", tagBg: "bg-purple-900/30", tagText: "text-purple-300", tagBorder: "border-purple-500/30" },
      { id: 1, name: "Sundar Rajan", role: "Staff Engineer @ Google", exp: "12 Yrs Exp", domain: "Technology", rating: "5.0", color: "blue", tags: ["System Design", "Backend"], available: false, img: "https://lh3.googleusercontent.com/aida-public/AB6AXuA3zqTVImfU49x31AcuC9BrpxJAOsETiG7T08-L5mg9_9Yo5wfuOWi4PoqF-c10e2djynKIeqwJphy4zMu-xREXj-4KXRErsSOuY45qHHRRxeieF5-JZt_9rDKJPK_ofXE7C5oeCbC8MXe1QZyCq4fCJ6PDRPy6oCcFaMpR6LCeapH6XhiSddmxOeD_AlAziSU9ggr9AohhWDYHynXmTnSfRnHEp48MItjIi7LqQhyd_zDuVEAbn_NEaewlXALuZWdvyvzmm8JxHB0", btnColor: "bg-blue-600", hoverBtn: "hover:bg-blue-500", textColor: "text-blue-400", tagBg: "bg-blue-900/30", tagText: "text-blue-300", tagBorder: "border-blue-500/30" },
      { id: 2, name: "Priya Sharma", role: "Engineering Manager @ Meta", exp: "10 Yrs Exp", domain: "Technology", rating: "4.8", color: "pink", tags: ["Frontend", "Career Growth"], available: true, img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAaNhfbR1dS3gqseJqn2q_v53SrLSsYQ-gCmqTe-n1tvfjXsnkTx45bwuwCahvsLPRvS5zqO3k7yr6ZrN_Gv2KdJW8PDuzGxRZktAQC8jRqn6tF7LFfewKClJm_fG7rcA1PVKTYklfZqrk5vh9lpg5IQSk2bcfYlvLY5xXNMqAAxYJEbHFjqXQoLC8wGsto305gRM2yZ5yBvcWQMqgoIDYecD0c2hBvZ6ohblhDw8s0q_Mm0WemFfsmSVPwO6qvJk1znFwNc6ksxEU", btnColor: "bg-pink-600", hoverBtn: "hover:bg-pink-500", textColor: "text-pink-400", tagBg: "bg-pink-900/30", tagText: "text-pink-300", tagBorder: "border-pink-500/30" },
      { id: 3, name: "Bhaskar Reddy", role: "Sr. Data Scientist @ Netflix", exp: "6 Yrs Exp", domain: "Technology", rating: "4.7", color: "cyan", tags: ["ML Ops", "Algorithms"], available: false, img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBTS3FRI26B23IWEQucMMR31NXR1rAkhhGSELXTtS5mKYiRMlMbirAgYiNgnl1WbIIcSW8xbyYP9QEcS4kQlcG3ryhLNckeRnSAmj4i_yHiKmbetmi2-6H0vRWbSaOG14JqI9Gnbd3HZzhNqoAn11Wrt1i0KV0_t7CJWMRTV7RgK0sLEhJ9I9HtCbQfWhUeCB18IqK31ykLHJdGTcZGPebYh_aspWjerbldaTy-kGX3QoJuZSu1WtlkfAXBL9lSxjoNFdp6j5pE_90", btnColor: "bg-cyan-700", hoverBtn: "hover:bg-cyan-600", textColor: "text-cyan-400", tagBg: "bg-cyan-900/30", tagText: "text-cyan-300", tagBorder: "border-cyan-500/30" },
      { id: 4, name: "Meera Patel", role: "VP of Design @ Airbnb", exp: "15 Yrs Exp", domain: "Design", rating: "5.0", color: "orange", tags: ["UX Research", "Design Systems"], available: true, img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBcy3yyhMhbUXrKRDOz69_DWhYheRo0fRzGIkyb3slWy95O4JlTbSB4tPj02X4ic4L7LPEJCXhyAqHYyMj78gDl5Xy3zCuISL-kYhUjxN3QjrWQSDujB0J7-cdttGfMBZmnXDVrvnILq_A3N9FyY8IyC-WvUG5QNowkn0ZT5O8yaTpStX1vVfLxfNpFeolGVVjARP9yiigV73qhXhtG5DNCJCydEspXdDxiQJk7CNnXyq0JyaiaB-IdAo1WlSltGs45uijguP6dj0I", btnColor: "bg-orange-600", hoverBtn: "hover:bg-orange-500", textColor: "text-orange-400", tagBg: "bg-orange-900/30", tagText: "text-orange-300", tagBorder: "border-orange-500/30" },
      { id: 5, name: "Yogesh Malhotra", role: "Sr. HR Manager @ Amazon", exp: "9 Yrs Exp", domain: "HR", rating: "4.6", color: "green", tags: ["Behavioral", "Negotiation"], available: false, img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCo7YLi3N5vBfP8Srob271Z4t5NA4yiPmQycjtGBAm2SfbAofcK9WCVknG8yHXb9_3Qr5k-CowBybTbybZ8tex5RWL5A6-YnTpM7kcIXcP9uZuL-3TyykrWQvBSMCUdzm06Gb8DTcUTYHHDFm-fa4env_cfwchR4yCyebUVVC5l9xOy8ycwRE42Nka0oiBu40lRLI9W5Oi42X4MCHLsZJcqd-EDwwSGRBH6M2Ei74Qo3wrkPM4tWw366_9IKb5Z6rHxeBs4lRVM_oE", btnColor: "bg-green-700", hoverBtn: "hover:bg-green-600", textColor: "text-green-400", tagBg: "bg-green-900/30", tagText: "text-green-300", tagBorder: "border-green-500/20" }
    ];
    setMentors(data);
  }, []);

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
        const newAiMsg = { id: Date.now() + 1, sender: 'ai', text: "I can connect you with mentors specializing in that area..." };
        setChatMessages(prev => [...prev, newAiMsg]);
    }, 1000);
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
        
        .shadow-glow-purple:hover { box-shadow: 0 0 20px rgba(168, 85, 247, 0.5); border-color: #c084fc; }
        .shadow-glow-blue:hover { box-shadow: 0 0 20px rgba(59, 130, 246, 0.5); border-color: #60a5fa; }
        .shadow-glow-pink:hover { box-shadow: 0 0 20px rgba(236, 72, 153, 0.5); border-color: #f472b6; }
        .shadow-glow-cyan:hover { box-shadow: 0 0 20px rgba(6, 182, 212, 0.5); border-color: #22d3ee; }
        .shadow-glow-orange:hover { box-shadow: 0 0 20px rgba(249, 115, 22, 0.5); border-color: #fb923c; }
        .shadow-glow-green:hover { box-shadow: 0 0 20px rgba(34, 197, 94, 0.5); border-color: #4ade80; }

        /* Chat Animation */
        @keyframes slideUpFade {
            from { transform: translateY(20px) scale(0.95); opacity: 0; }
            to { transform: translateY(0) scale(1); opacity: 1; }
        }
        .chat-animate { animation: slideUpFade 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
      `}} />

      {/* --- SIDEBAR (Updated with Compact Profile & No Scrollbar) --- */}
      <aside className="w-72 flex-shrink-0 flex flex-col border-r border-slate-300 bg-white relative z-20 shadow-xl h-full">
        <div className="p-6 flex items-center gap-3 select-none shrink-0">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#0474C4] to-cyan-400 flex items-center justify-center shadow-lg shadow-blue-500/30">
            <span className="material-symbols-outlined text-white text-xl">rocket_launch</span>
          </div>
          <span className="text-2xl font-black tracking-tight text-[#0F172A]">
            Career <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0474C4] to-cyan-500">Orbit</span>
          </span>
        </div>

        {/* Navigation - No Scrollbar Class Applied */}
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
          <button className="flex items-center gap-3 px-4 py-3 rounded-lg bg-[#06457F] text-white shadow-md text-left w-full">
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
            <div className="size-9 rounded-full bg-cover bg-center border border-slate-300 shrink-0" style={{ backgroundImage: "url('https://ui-avatars.com/api/?name=B+&background=06457F&color=fff')" }}></div>
            <div className="flex flex-col min-w-0">
              <span className="text-sm font-semibold text-slate-900 truncate">{userName}</span>
              <span className="text-[11px] text-slate-600 truncate">Pro Member</span>
            </div>
          </div>
        </div>
      </aside>

      {/* --- MAIN PANEL --- */}
      <main className="flex-1 flex flex-col h-full overflow-y-auto bg-[#06457F] relative">
        <div className="flex-1 max-w-7xl mx-auto w-full p-6 lg:p-10 flex flex-col gap-8">
          <header className="flex flex-col gap-2">
            <h1 className="text-3xl lg:text-4xl font-black text-white tracking-tight">Choose Your Domain</h1>
            <p className="text-[#D1D5DB] text-base lg:text-lg">Available mentors for <span className="text-[#0474C4] font-semibold">Technology</span> interviews.</p>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {mentors.map((m) => (
              <div key={m.id} className={`group flex flex-col bg-[#262B40] rounded-xl border border-white/10 overflow-hidden transition-all duration-300 transform hover:-translate-y-1 shadow-lg shadow-glow-${m.color}`}>
                <div className="relative h-48 w-full overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-[#262B40] to-transparent z-10 opacity-80"></div>
                  <img alt={m.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" src={m.img} />
                  {m.available && (
                    <div className="absolute top-3 right-3 z-20">
                      <span className="inline-flex items-center gap-1 bg-green-500/90 text-white border border-green-600/50 backdrop-blur-md px-2 py-1 rounded-md text-xs font-semibold">
                        <span className="w-2 h-2 rounded-full bg-green-300 animate-pulse"></span>
                        Available Today
                      </span>
                    </div>
                  )}
                </div>

                <div className="p-5 flex flex-col flex-1 gap-4">
                  <div>
                    <div className="flex justify-between items-start mb-1">
                      <h3 className="text-lg font-bold text-white">{m.name}</h3>
                      <div className="flex items-center gap-1 text-yellow-400">
                        <span className="material-symbols-outlined fill text-[16px]">star</span>
                        <span className="text-sm font-bold text-white">{m.rating}</span>
                      </div>
                    </div>
                    <p className={`${m.textColor} text-sm font-semibold`}>{m.role}</p>
                  </div>

                  <div className="flex flex-wrap gap-2 mt-auto">
                    {m.tags.map(tag => (
                      <span key={tag} className={`px-2 py-1 rounded ${m.tagBg} ${m.tagText} border ${m.tagBorder} text-xs font-medium`}>{tag}</span>
                    ))}
                  </div>

                  <div className="flex items-center gap-4 text-sm text-gray-300 pt-3 border-t border-white/10">
                    <div className="flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-[18px]">work_history</span>
                      <span>{m.exp}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-[18px]">domain</span>
                      <span>{m.domain}</span>
                    </div>
                  </div>

                  <button 
                    onClick={() => navigate('/mentor-profile')} 
                    className={`mt-2 w-full py-2.5 rounded-lg ${m.btnColor} ${m.hoverBtn} text-white text-sm font-semibold transition-colors flex items-center justify-center gap-2 shadow-md`}
                  >
                    <span>View Profile</span>
                    <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-col items-center gap-4 mt-6 mb-10">
            <button className="px-6 py-2 rounded-lg border border-white/10 text-white hover:bg-white/5 transition-colors text-sm font-medium">
              Show More Mentors
            </button>
            
            <button 
              onClick={() => navigate('/my-bookings')} 
              className="flex items-center gap-2 bg-[#0474C4] text-white px-8 py-3 rounded-lg font-bold shadow-xl hover:bg-[#0361a3] transition-colors"
            >
              <span className="material-symbols-outlined">calendar_month</span>
              <span>My Booking</span>
            </button>
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

export default MentorModule;