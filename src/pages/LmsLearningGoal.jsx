import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const LmsLearningGoal = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("Baskar Manager");

  // --------------------------------
  // CHATBOT STATE
  // --------------------------------
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const [chatMessages, setChatMessages] = useState([
    { id: 1, sender: 'ai', text: 'Hi Baskar! Setting a learning goal helps you stay on track. Need help estimating a realistic completion date?' }
  ]);
  const chatEndRef = useRef(null);

  // --- API / LLM Initialization Logic ---
  useEffect(() => {
    const fetchGoalData = async () => {
      try {
        console.log("System Ready: Learning Goal module initialized.");
      } catch (err) {
        console.log("Connection pending...");
      }
    };
    fetchGoalData();
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
        const newAiMsg = { id: Date.now() + 1, sender: 'ai', text: "I've noted that preference. Good luck with your goal!" };
        setChatMessages(prev => [...prev, newAiMsg]);
    }, 1000);
  };

  const handleNavigate = (page) => {
    if (page === 'Dashboard') navigate('/dashboard/main');
    else navigate(`/${page.toLowerCase().replace(/\s+/g, '-')}`);
  };

  return (
    // UPDATED: Changed font-['Inter'] to font-['Space_Grotesk'] to match previous pages
    <div className="bg-[#06457F] text-white font-['Space_Grotesk'] h-screen w-full flex overflow-hidden antialiased relative">
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
        .fill-1 { font-variation-settings: 'FILL' 1; }

        /* Custom Radio Selection Styling */
        .radio-selected:checked + div {
            border-color: #4ade80;
            background-color: #000000;
            box-shadow: 0 0 15px rgba(74, 222, 128, 0.4);
        }

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
      <main className="flex-1 flex flex-col items-center justify-center p-8 relative overflow-y-auto">
        
        {/* Background Glow Effects */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden z-0">
          <div className="absolute -top-[20%] -right-[10%] w-[600px] h-[600px] rounded-full bg-[#0474C4] opacity-10 blur-[100px]"></div>
          <div className="absolute top-[40%] -left-[10%] w-[400px] h-[400px] rounded-full bg-blue-400 opacity-5 blur-[80px]"></div>
        </div>

        <div className="w-full max-w-[800px] flex flex-col z-10">
          
          <div className="mb-8 text-center sm:text-left">
            <h1 className="text-white text-3xl font-bold tracking-tight mb-2">Set Your Learning Goal</h1>
            <p className="text-[#D1D5DB] text-base font-normal">Define what you want to achieve before starting this course.</p>
          </div>

          <div className="bg-white/10 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden shadow-2xl transition-all duration-300 hover:shadow-[0_0_40px_rgba(4,116,196,0.3)] hover:border-[#0474C4]/40 group/maincard">
            
            {/* Header Card Section */}
            <div className="p-6 border-b border-white/10 bg-white/5 flex flex-col sm:flex-row gap-5 items-start sm:items-center">
              <div 
                className="w-24 h-16 rounded-lg bg-center bg-cover flex-shrink-0 bg-gray-800" 
                style={{ backgroundImage: "url('https://images.unsplash.com/photo-1555949963-aa79dcee981c?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80')" }} 
              ></div>
              <div className="flex-1">
                <h2 className="text-white text-lg font-bold leading-tight mb-1">Advanced Data Structures & Algorithms</h2>
                <div className="flex flex-wrap items-center gap-3 text-sm text-[#D1D5DB]">
                  <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[16px]">school</span> Coursera</span>
                  <span className="w-1 h-1 rounded-full bg-gray-500"></span>
                  <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[16px]">schedule</span> 4 Weeks</span>
                  <span className="w-1 h-1 rounded-full bg-gray-500"></span>
                  <span className="flex items-center gap-1 text-green-400"><span className="material-symbols-outlined text-[16px]">verified</span> Certification Available</span>
                </div>
              </div>
            </div>

            <div className="p-6 sm:p-8 flex flex-col gap-8">
              
              {/* Objective Selection */}
              <div className="flex flex-col gap-4">
                <label className="text-white text-sm font-semibold uppercase tracking-wider">Select Your Objective</label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  
                  {/* Option 1 */}
                  <label className="relative cursor-pointer group">
                    <input defaultChecked className="peer sr-only radio-selected" name="goal_type" type="radio"/>
                    <div className="h-full p-4 rounded-lg bg-black border border-gray-800 hover:border-green-400 hover:shadow-[0_0_20px_rgba(74,222,128,0.6)] transition-all duration-300 flex flex-col gap-2">
                      <div className="w-8 h-8 rounded-full bg-cyan-900/40 flex items-center justify-center text-cyan-400 mb-1">
                        <span className="material-symbols-outlined text-[20px]">check_circle</span>
                      </div>
                      <span className="text-cyan-200 font-bold text-sm">Complete the Course</span>
                      <span className="text-xs text-gray-400 leading-snug">Finish all video lectures and quizzes.</span>
                    </div>
                    <div className="absolute top-3 right-3 opacity-0 peer-checked:opacity-100 text-cyan-400 transition-opacity">
                      <span className="material-symbols-outlined fill text-[20px]">check_circle</span>
                    </div>
                  </label>

                  {/* Option 2 */}
                  <label className="relative cursor-pointer group">
                    <input className="peer sr-only radio-selected" name="goal_type" type="radio"/>
                    <div className="h-full p-4 rounded-lg bg-black border border-gray-800 hover:border-green-400 hover:shadow-[0_0_20px_rgba(74,222,128,0.6)] transition-all duration-300 flex flex-col gap-2">
                      <div className="w-8 h-8 rounded-full bg-purple-900/40 flex items-center justify-center text-purple-400 mb-1">
                        <span className="material-symbols-outlined text-[20px]">workspace_premium</span>
                      </div>
                      <span className="text-purple-200 font-bold text-sm">Earn Certificate</span>
                      <span className="text-xs text-gray-400 leading-snug">Complete assignments & get certified.</span>
                    </div>
                    <div className="absolute top-3 right-3 opacity-0 peer-checked:opacity-100 text-purple-400 transition-opacity">
                      <span className="material-symbols-outlined fill text-[20px]">check_circle</span>
                    </div>
                  </label>

                  {/* Option 3 */}
                  <label className="relative cursor-pointer group">
                    <input className="peer sr-only radio-selected" name="goal_type" type="radio"/>
                    <div className="h-full p-4 rounded-lg bg-black border border-gray-800 hover:border-green-400 hover:shadow-[0_0_20px_rgba(74,222,128,0.6)] transition-all duration-300 flex flex-col gap-2">
                      <div className="w-8 h-8 rounded-full bg-orange-900/40 flex items-center justify-center text-orange-400 mb-1">
                        <span className="material-symbols-outlined text-[20px]">filter_list</span>
                      </div>
                      <span className="text-orange-200 font-bold text-sm">Selected Modules</span>
                      <span className="text-xs text-gray-400 leading-snug">Only complete specific topics of interest.</span>
                    </div>
                    <div className="absolute top-3 right-3 opacity-0 peer-checked:opacity-100 text-orange-400 transition-opacity">
                      <span className="material-symbols-outlined fill text-[20px]">check_circle</span>
                    </div>
                  </label>
                </div>
              </div>

              {/* Date & Settings */}
              <div className="flex flex-col sm:flex-row gap-6">
                <div className="flex-1 flex flex-col gap-2">
                  <label className="text-white text-sm font-semibold uppercase tracking-wider">Target Completion Date</label>
                  <div className="relative">
                    <input 
                      className="w-full bg-[#1E1E1E] border border-[#3A3A3A] rounded-lg px-4 py-3 text-white placeholder-[#D1D5DB] focus:ring-1 focus:ring-[#0474C4] focus:border-[#0474C4] outline-none transition-all" 
                      style={{ colorScheme: 'dark' }}
                      placeholder="Select date" 
                      type="date"
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-[#D1D5DB]">
                      <span className="material-symbols-outlined">calendar_today</span>
                    </div>
                  </div>
                  <p className="text-xs text-[#D1D5DB] pl-1">Choose a realistic completion date.</p>
                </div>
                
                <div className="flex-1 flex flex-col gap-2 sm:mt-0 mt-2 justify-center">
                  <label className="text-white text-sm font-semibold uppercase tracking-wider mb-1 opacity-0 sm:block hidden">Settings</label>
                  <label className="flex items-start gap-3 cursor-pointer group p-3 rounded-lg hover:bg-white/5 transition-colors border border-transparent hover:border-white/5">
                    <div className="relative flex items-center">
                      <input className="peer h-5 w-5 cursor-pointer appearance-none rounded-md border border-[#3A3A3A] bg-[#1E1E1E] checked:border-[#0474C4] checked:bg-[#0474C4] transition-all" type="checkbox"/>
                      <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-0 peer-checked:opacity-100 text-white">
                        <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                          <path clipRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" fillRule="evenodd"></path>
                        </svg>
                      </span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-white text-sm font-medium">Remind me weekly</span>
                      <span className="text-xs text-[#D1D5DB]">Get non-intrusive weekly progress nudges.</span>
                    </div>
                  </label>
                </div>
              </div>

              {/* Reward Banner */}
              <div className="rounded-lg border border-yellow-500/20 bg-gradient-to-r from-yellow-500/10 to-transparent p-4 flex items-center gap-4 transition-all duration-300 hover:border-yellow-400 hover:shadow-[0_0_25px_rgba(234,179,8,0.4)] cursor-default">
                <div className="p-2 bg-yellow-500/20 rounded-full text-yellow-400">
                  <span className="material-symbols-outlined">card_giftcard</span>
                </div>
                <div className="flex flex-col">
                  <p className="text-yellow-100 text-sm font-bold">On Completion</p>
                  <p className="text-yellow-100/70 text-sm">Earn <span className="text-white font-bold">+50 Credit Coins</span> and get a <span className="text-white font-bold">Certificate</span> added to your profile.</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col gap-3">
                {/* UPDATED NAVIGATION */}
                <button 
                  onClick={() => navigate('/learning-progress')} 
                  className="w-full bg-[#0474C4] hover:bg-blue-500 text-white font-bold py-4 rounded-lg shadow-lg shadow-blue-900/20 transition-all duration-300 transform hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(4,116,196,0.6)] active:scale-[0.98] flex items-center justify-center gap-2 group"
                >
                  <span>Set Learning Goal & Start</span>
                  <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform text-[20px]">arrow_forward</span>
                </button>
                <p className="text-center text-xs text-[#D1D5DB]">You’ll be redirected to the learning platform to begin your course.</p>
                <button className="w-full bg-transparent hover:bg-white hover:text-[#0474C4] hover:border-[#0474C4]/30 hover:shadow-md text-slate-700 font-semibold py-2.5 px-4 rounded-lg border border-slate-900/10 transition-all duration-200">
                  Save for Later
                </button>
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

export default LmsLearningGoal;