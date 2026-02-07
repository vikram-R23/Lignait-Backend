import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const ResumePage = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("Baskar Manager");

  // --------------------------------
  // CHATBOT STATE
  // --------------------------------
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const [chatMessages, setChatMessages] = useState([
    { id: 1, sender: 'ai', text: 'Hi Baskar! Need help choosing the right resume template for your role?' }
  ]);
  const chatEndRef = useRef(null);

  // --- API / LLM Initialization Logic ---
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
  // ---------------------------------------

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
        const newAiMsg = { id: Date.now() + 1, sender: 'ai', text: "I can suggest templates based on your experience level..." };
        setChatMessages(prev => [...prev, newAiMsg]);
    }, 1000);
  };

  const handleNavigate = (page) => {
    if (page === 'Dashboard') navigate('/dashboard/main');
    else navigate(`/${page.toLowerCase().replace(/\s+/g, '-')}`);
  };

  return (
    <div className="bg-[#06457F] text-[#0F172A] font-['Space_Grotesk'] overflow-hidden antialiased relative h-screen w-full flex">
      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;900&display=swap');
        
        ::-webkit-scrollbar { width: 8px; }
        ::-webkit-scrollbar-track { background: #04386b; }
        ::-webkit-scrollbar-thumb { background: #0A5596; border-radius: 4px; }
        ::-webkit-scrollbar-thumb:hover { background: #0473c3; }
        
        /* --- UNIVERSAL NO SCROLLBAR --- */
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        
        .material-symbols-outlined { font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24; }
        .material-symbols-outlined.fill { font-variation-settings: 'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24; }
        .fill-1 { font-variation-settings: 'FILL' 1; }
        
        .font-display { font-family: 'Inter', sans-serif; }

        /* Chat Animation */
        @keyframes slideUpFade {
            from { transform: translateY(20px) scale(0.95); opacity: 0; }
            to { transform: translateY(0) scale(1); opacity: 1; }
        }
        .chat-animate { animation: slideUpFade 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
      `}} />

      {/* --- SIDEBAR (Updated with Compact Profile & Internship Button) --- */}
      <aside className="w-72 flex-shrink-0 flex flex-col border-r border-slate-300 bg-white relative z-20 shadow-xl h-full">
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
          
          {/* Active State Logic for Resume */}
          <button className="flex items-center gap-3 px-4 py-3 rounded-lg bg-[#06457F] text-white shadow-md text-left w-full">
            <span className="material-symbols-outlined fill-1">description</span>
            <span className="font-medium">Resume</span>
          </button>

          <button onClick={() => handleNavigate('Mock Interview')} className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-600 hover:bg-slate-50 transition-colors group text-left w-full">
            <span className="material-symbols-outlined group-hover:text-[#06457F] transition-colors">videocam</span>
            <span className="font-medium group-hover:text-[#06457F] transition-colors">Mock Interview</span>
          </button>
          
          <button onClick={() => handleNavigate('My Bookings')} className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-600 hover:bg-slate-50 transition-colors group text-left w-full">
            <span className="material-symbols-outlined group-hover:text-[#06457F] transition-colors">calendar_month</span>
            <span className="font-medium group-hover:text-[#06457F] transition-colors">My Booking</span>
          </button>

          {/* --- INTERNSHIP (Labeled Exactly as Requested) --- */}
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
          <div 
            onClick={() => navigate('/profile')} 
            className="flex items-center gap-3 px-2 py-1.5 rounded-lg cursor-pointer hover:bg-slate-50 transition-colors"
          >
            {/* Reduced size-9 */}
            <div className="size-9 rounded-full bg-cover bg-center border border-slate-300 shrink-0" style={{ backgroundImage: "url('https://ui-avatars.com/api/?name=B+&background=06457F&color=fff')" }}></div>
            <div className="flex flex-col min-w-0">
              <span className="text-sm font-semibold text-slate-900 truncate">{userName}</span>
              <span className="text-[11px] text-slate-600 truncate">Pro Member</span>
            </div>
          </div>
        </div>
      </aside>

      {/* --- MAIN CONTENT (Resume Selection) --- */}
      <main className="flex-1 overflow-y-auto bg-[#06457F] p-6 lg:p-10 font-display relative custom-scroll">
          {/* Mobile Header (Only visible on small screens) */}
          <header className="md:hidden flex items-center justify-between mb-6 pb-4 border-b border-white/10">
              <div className="flex items-center gap-3">
                  <h2 className="text-[#0473c3] text-lg font-bold">Career Orbit</h2>
              </div>
              <button className="text-white">
                  <span className="material-symbols-outlined">menu</span>
              </button>
          </header>

          <div className="max-w-[1200px] mx-auto flex flex-col gap-8">
              {/* Header & Search */}
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                  <div className="flex flex-col gap-3 max-w-2xl">
                      <h1 className="text-white text-3xl md:text-4xl font-black leading-tight tracking-tight">Select Your Resume Template</h1>
                      <p className="text-blue-100 text-lg font-normal leading-relaxed">Choose a professional layout designed to beat ATS systems and get you hired faster.</p>
                  </div>
                  <div className="flex items-center gap-2 bg-[#04386b] rounded-lg p-2 border border-white/10 w-full md:w-auto">
                      <span className="material-symbols-outlined text-blue-200 ml-1">search</span>
                      <input className="bg-transparent border-none text-sm text-white placeholder-blue-300 focus:ring-0 focus:outline-none w-full md:w-56" placeholder="Search templates..." type="text" />
                  </div>
              </div>

              {/* Filter Buttons */}
              <div className="flex flex-wrap gap-3 pb-2 border-b border-white/10">
                  <button className="flex h-9 items-center justify-center gap-x-2 rounded-full bg-[#0473c3] px-5 transition-transform active:scale-95 shadow-lg shadow-[#0473c3]/20">
                      <span className="text-white text-sm font-bold">All Templates</span>
                  </button>
                  <button className="flex h-9 items-center justify-center gap-x-2 rounded-full bg-[#0A5596] border border-white/5 px-5 hover:bg-white/10 transition-colors">
                      <span className="text-blue-100 text-sm font-medium">Fresher</span>
                  </button>
                  <button className="flex h-9 items-center justify-center gap-x-2 rounded-full bg-[#0A5596] border border-white/5 px-5 hover:bg-white/10 transition-colors">
                      <span className="text-blue-100 text-sm font-medium">Experienced</span>
                  </button>
                  <button className="flex h-9 items-center justify-center gap-x-2 rounded-full bg-[#0A5596] border border-white/5 px-5 hover:bg-white/10 transition-colors">
                      <span className="text-blue-100 text-sm font-medium">Creative</span>
                  </button>
                  <button className="flex h-9 items-center justify-center gap-x-2 rounded-full bg-[#0A5596] border border-white/5 px-5 hover:bg-white/10 transition-colors">
                      <span className="text-blue-100 text-sm font-medium">Executive</span>
                  </button>
                  <button className="flex h-9 items-center justify-center gap-x-2 rounded-full bg-[#0A5596] border border-white/5 px-5 hover:bg-white/10 transition-colors">
                      <span className="text-blue-100 text-sm font-medium">ATS Friendly</span>
                  </button>
              </div>

              {/* Templates Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 py-4">
                  
                  {/* Card 1 */}
                  <div className="group flex flex-col gap-3 rounded-xl bg-[#0A5596]/40 p-4 border border-white/5 hover:border-[#0473c3]/50 transition-all duration-300 hover:shadow-2xl hover:shadow-[#0473c3]/10">
                      <div className="relative aspect-[1/1.4] w-full overflow-hidden rounded-lg bg-white">
                          <div className="w-full h-full bg-cover bg-top transform transition-transform duration-500 group-hover:scale-105" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBW5JoRTUZUuIRBuYGgs_W_W69YeUp0GI38PGJatRNC7yy6i3Oj_eVWwcKOF94a-NCWgx2drgEkJd0tNcHXw78XVuuhQUF_MyKVzIJgkpZfCTxhn2jS-3fP-j6PircEiRcK6bhGmxE0oSHjbm5Xao35CWN-DH1Ac23bLNQAFpH87jiQ6F2Aa__np3K9j_IwlNTXKj-nh2d15CnncnnA5-GToLZZHgAgNP7NzTTKfPsrA9ruBxEgW0XIaHtHUIJNJ4S99p3aU64aQwA')" }}></div>
                          <div className="absolute inset-0 bg-[#06457F]/90 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center gap-4 transition-opacity duration-200 backdrop-blur-sm p-6">
                              <button onClick={() => navigate('/resume-editor')} className="w-full h-12 rounded-lg bg-[#0473c3] hover:bg-[#0473c3]/90 text-white font-bold text-sm tracking-wide shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 flex items-center justify-center gap-2">
                                  <span className="material-symbols-outlined text-[20px]">edit_document</span>
                                  Use This Template
                              </button>
                              <button className="w-full h-12 rounded-lg bg-white/10 hover:bg-white/20 text-white font-medium text-sm tracking-wide border border-white/20 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 delay-75 flex items-center justify-center gap-2">
                                  <span className="material-symbols-outlined text-[20px]">visibility</span>
                                  Preview
                              </button>
                          </div>
                      </div>
                      <div className="flex items-center justify-between pt-1">
                          <div className="flex flex-col">
                              <h3 className="text-white font-bold text-lg">The Modernist</h3>
                              <p className="text-blue-200 text-xs">Best for Tech & Design • 2 Columns</p>
                          </div>
                          <span className="px-2.5 py-1 rounded-md bg-[#04386b] border border-blue-500/30 text-blue-100 text-xs font-semibold">Creative</span>
                      </div>
                  </div>

                  {/* Card 2 */}
                  <div className="group flex flex-col gap-3 rounded-xl bg-[#0A5596]/40 p-4 border border-white/5 hover:border-[#0473c3]/50 transition-all duration-300 hover:shadow-2xl hover:shadow-[#0473c3]/10">
                      <div className="relative aspect-[1/1.4] w-full overflow-hidden rounded-lg bg-white">
                          <div className="w-full h-full bg-cover bg-top transform transition-transform duration-500 group-hover:scale-105" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuALBhYfWgRXHwwqlOomocgY3ZYhr7A1yNlRnksKihwmzNVcsk4n5Zbv5DbqRWPkh9l2-fpi3VI09GMG73OYe6oMCSi7nMrvH8Im7FxY3cA_juaYa-8qkya8HKaCMRnfGZ6OUlwywQSFoHzOK26BVHDVrFfj8lWkKhsruX9HlKkZYFUnyOYnur8mOgZwmfQxGwNyBtdrn-SwxcKqaJY-W2_WONjNfekdaOwNHx6t1Qjrrb5NJPeDbr7OGjQLiJI6jRQjs0Bj5tFasKc')" }}></div>
                          <div className="absolute inset-0 bg-[#06457F]/90 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center gap-4 transition-opacity duration-200 backdrop-blur-sm p-6">
                              <button onClick={() => navigate('/resume-editor')} className="w-full h-12 rounded-lg bg-[#0473c3] hover:bg-[#0473c3]/90 text-white font-bold text-sm tracking-wide shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 flex items-center justify-center gap-2">
                                  <span className="material-symbols-outlined text-[20px]">edit_document</span>
                                  Use This Template
                              </button>
                              <button className="w-full h-12 rounded-lg bg-white/10 hover:bg-white/20 text-white font-medium text-sm tracking-wide border border-white/20 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 delay-75 flex items-center justify-center gap-2">
                                  <span className="material-symbols-outlined text-[20px]">visibility</span>
                                  Preview
                              </button>
                          </div>
                      </div>
                      <div className="flex items-center justify-between pt-1">
                          <div className="flex flex-col">
                              <h3 className="text-white font-bold text-lg">Clean Professional</h3>
                              <p className="text-blue-200 text-xs">ATS Optimized • Minimalist</p>
                          </div>
                          <span className="px-2.5 py-1 rounded-md bg-[#04386b] border border-blue-500/30 text-blue-100 text-xs font-semibold">Experienced</span>
                      </div>
                  </div>

                  {/* Card 3 */}
                  <div className="group flex flex-col gap-3 rounded-xl bg-[#0A5596]/40 p-4 border border-white/5 hover:border-[#0473c3]/50 transition-all duration-300 hover:shadow-2xl hover:shadow-[#0473c3]/10">
                      <div className="relative aspect-[1/1.4] w-full overflow-hidden rounded-lg bg-white">
                          <div className="w-full h-full bg-cover bg-top transform transition-transform duration-500 group-hover:scale-105" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBAjGIYd_ZrtVsFSsVaEn6-_x0YryN4oRAPZjpiObapEodpCPZF2-VKG1gJVJKe_5uJv-2vLBx6HyRRoSWxCA6WrDxxD-7JcjkbX9GJZsfGqlK0YoNG8oADjU5e-CiBAayKYax4-zJ8kDSISk0VgmU-vvGaJagip5vxCvOCyv8O1yIxbkSy0F3vmu9D2865vvzRwHVdUcBHY7sn47isgmi2slwBNqL4Vftr6iGNn1gPumk1kQ7r0TWDYIRxQwBK2T48mjQzwmLFEcs')" }}></div>
                          <div className="absolute top-3 right-3 bg-yellow-500 text-yellow-950 text-[10px] font-bold px-2 py-1 rounded shadow-sm z-10 pointer-events-none">Premium</div>
                          <div className="absolute inset-0 bg-[#06457F]/90 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center gap-4 transition-opacity duration-200 backdrop-blur-sm p-6">
                              <button onClick={() => navigate('/resume-editor')} className="w-full h-12 rounded-lg bg-[#0473c3] hover:bg-[#0473c3]/90 text-white font-bold text-sm tracking-wide shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 flex items-center justify-center gap-2">
                                  <span className="material-symbols-outlined text-[20px]">edit_document</span>
                                  Use This Template
                              </button>
                              <button className="w-full h-12 rounded-lg bg-white/10 hover:bg-white/20 text-white font-medium text-sm tracking-wide border border-white/20 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 delay-75 flex items-center justify-center gap-2">
                                  <span className="material-symbols-outlined text-[20px]">visibility</span>
                                  Preview
                              </button>
                          </div>
                      </div>
                      <div className="flex items-center justify-between pt-1">
                          <div className="flex flex-col">
                              <h3 className="text-white font-bold text-lg">The Executive</h3>
                              <p className="text-blue-200 text-xs">For Senior Roles • High Impact</p>
                          </div>
                          <span className="px-2.5 py-1 rounded-md bg-[#04386b] border border-blue-500/30 text-blue-100 text-xs font-semibold">Executive</span>
                      </div>
                  </div>

                  {/* Card 4 */}
                  <div className="group flex flex-col gap-3 rounded-xl bg-[#0A5596]/40 p-4 border border-white/5 hover:border-[#0473c3]/50 transition-all duration-300 hover:shadow-2xl hover:shadow-[#0473c3]/10">
                      <div className="relative aspect-[1/1.4] w-full overflow-hidden rounded-lg bg-white">
                          <div className="w-full h-full bg-cover bg-top transform transition-transform duration-500 group-hover:scale-105" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuArOTOqZTDGQ4S8MLQSw9-0wQXB-VsXnUsysMeIXs1q_8wRzl9P7VC78U5uIEnZMLvTphH9y0YxSiVJwlYecBoQuwWAc-EdJEqff9qryEmxWUOOA18fugO4Mu1Yl4AfXlw_CGFK0pxIp0KpcRjiQ00j1FtH1_-2EqjxiKa3Ii5GsGQXDe4Gy1QCbJd3PNbSVdnfBz6Z-Gm49ZXMYc8eUsGCPzuXO9eM9sTVf98uiUb_waZjhH0aVe8OvmO5njiYon5Ig8N9zywILC0')" }}></div>
                          <div className="absolute inset-0 bg-[#06457F]/90 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center gap-4 transition-opacity duration-200 backdrop-blur-sm p-6">
                              <button onClick={() => navigate('/resume-editor')} className="w-full h-12 rounded-lg bg-[#0473c3] hover:bg-[#0473c3]/90 text-white font-bold text-sm tracking-wide shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 flex items-center justify-center gap-2">
                                  <span className="material-symbols-outlined text-[20px]">edit_document</span>
                                  Use This Template
                              </button>
                              <button className="w-full h-12 rounded-lg bg-white/10 hover:bg-white/20 text-white font-medium text-sm tracking-wide border border-white/20 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 delay-75 flex items-center justify-center gap-2">
                                  <span className="material-symbols-outlined text-[20px]">visibility</span>
                                  Preview
                              </button>
                          </div>
                      </div>
                      <div className="flex items-center justify-between pt-1">
                          <div className="flex flex-col">
                              <h3 className="text-white font-bold text-lg">Entry Level</h3>
                              <p className="text-blue-200 text-xs">Single Page • Quick Scan</p>
                          </div>
                          <span className="px-2.5 py-1 rounded-md bg-[#04386b] border border-blue-500/30 text-blue-100 text-xs font-semibold">Fresher</span>
                      </div>
                  </div>

                  {/* Card 5 */}
                  <div className="group flex flex-col gap-3 rounded-xl bg-[#0A5596]/40 p-4 border border-white/5 hover:border-[#0473c3]/50 transition-all duration-300 hover:shadow-2xl hover:shadow-[#0473c3]/10">
                      <div className="relative aspect-[1/1.4] w-full overflow-hidden rounded-lg bg-white">
                          <div className="w-full h-full bg-cover bg-top transform transition-transform duration-500 group-hover:scale-105" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAEvuo4YM81vwHQ3EY_-strH4BHHSRLkvufmgxtNswOmitNrAjXp0BNAVjZvQHO6APgfPJlS7SDaEq1TOzWl_FSEg2MuvTOiFtZPd9MEuWHVBkARm5FsUzi2dsThbibBL7O5JCHZGakykCmFigOsnie6jzCkdxD9CX8kcGn8mBsNFhw-OhJnuoZlHHQsFqM5_7a2JdXe4VTn_SVunadhu2SB_Z9oxalYqahoZtdE2KxdCfthzpCPiRlQXl1RMjBRl2iVTCZOpfmnW4')" }}></div>
                          <div className="absolute inset-0 bg-[#06457F]/90 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center gap-4 transition-opacity duration-200 backdrop-blur-sm p-6">
                              <button onClick={() => navigate('/resume-editor')} className="w-full h-12 rounded-lg bg-[#0473c3] hover:bg-[#0473c3]/90 text-white font-bold text-sm tracking-wide shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 flex items-center justify-center gap-2">
                                  <span className="material-symbols-outlined text-[20px]">edit_document</span>
                                  Use This Template
                              </button>
                              <button className="w-full h-12 rounded-lg bg-white/10 hover:bg-white/20 text-white font-medium text-sm tracking-wide border border-white/20 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 delay-75 flex items-center justify-center gap-2">
                                  <span className="material-symbols-outlined text-[20px]">visibility</span>
                                  Preview
                              </button>
                          </div>
                      </div>
                      <div className="flex items-center justify-between pt-1">
                          <div className="flex flex-col">
                              <h3 className="text-white font-bold text-lg">Split Column</h3>
                              <p className="text-blue-200 text-xs">For Visual Roles • Balanced</p>
                          </div>
                          <span className="px-2.5 py-1 rounded-md bg-[#04386b] border border-blue-500/30 text-blue-100 text-xs font-semibold">Creative</span>
                      </div>
                  </div>

                  {/* Card 6 */}
                  <div className="group flex flex-col gap-3 rounded-xl bg-[#0A5596]/40 p-4 border border-white/5 hover:border-[#0473c3]/50 transition-all duration-300 hover:shadow-2xl hover:shadow-[#0473c3]/10">
                      <div className="relative aspect-[1/1.4] w-full overflow-hidden rounded-lg bg-white">
                          <div className="w-full h-full bg-cover bg-top transform transition-transform duration-500 group-hover:scale-105" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuA6zERyxi4eO9u5CxQACnm3hZgecv9HHqqNHR7NP6Nb4jbcAZ9A2KQ_5No6ztC0kLVzliaOvcNd9YUOhWeI1u2f0Gk-mx5vVLPG_lUKJFW4syljcBdlJDOEOgvEnR9TS-xzeqDnN8M0s4LrnlNeYM-Oa4DaiODThLvzyl37j8xSb9mu64Q8siX3e9lZvS80ruPIRqiHOPJI0RKcKJrB7fQbOXzqg-6M_JUUhMk9xnxYa3BZxLF9LSmkDSxAb8SgaUDmgc6wfz7dOXE')" }}></div>
                          <div className="absolute inset-0 bg-[#06457F]/90 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center gap-4 transition-opacity duration-200 backdrop-blur-sm p-6">
                              <button onClick={() => navigate('/resume-editor')} className="w-full h-12 rounded-lg bg-[#0473c3] hover:bg-[#0473c3]/90 text-white font-bold text-sm tracking-wide shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 flex items-center justify-center gap-2">
                                  <span className="material-symbols-outlined text-[20px]">edit_document</span>
                                  Use This Template
                              </button>
                              <button className="w-full h-12 rounded-lg bg-white/10 hover:bg-white/20 text-white font-medium text-sm tracking-wide border border-white/20 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 delay-75 flex items-center justify-center gap-2">
                                  <span className="material-symbols-outlined text-[20px]">visibility</span>
                                  Preview
                              </button>
                          </div>
                      </div>
                      <div className="flex items-center justify-between pt-1">
                          <div className="flex flex-col">
                              <h3 className="text-white font-bold text-lg">Tech Specialist</h3>
                              <p className="text-blue-200 text-xs">Skills Focused • Concise</p>
                          </div>
                          <span className="px-2.5 py-1 rounded-md bg-[#04386b] border border-blue-500/30 text-blue-100 text-xs font-semibold">Experienced</span>
                      </div>
                  </div>

              </div>

              <div className="flex justify-center mt-4">
                  <button className="flex items-center gap-2 text-blue-200 hover:text-white font-medium transition-colors px-6 py-3 rounded-lg hover:bg-white/5">
                      <span>Show more templates</span>
                      <span className="material-symbols-outlined">arrow_downward</span>
                  </button>
              </div>

              <footer className="mt-8 border-t border-white/10 pt-8">
                  <div className="flex flex-col md:flex-row gap-6 items-center justify-between text-center md:text-left">
                      <p className="text-blue-300/60 text-sm font-normal">© 2026 Career Orbit. All rights reserved.</p>
                      <div className="flex flex-wrap items-center justify-center gap-6">
                          <a className="text-blue-200 hover:text-white text-sm font-medium transition-colors" href="#">Privacy</a>
                          <a className="text-blue-200 hover:text-white text-sm font-medium transition-colors" href="#">Terms</a>
                          <a className="text-blue-200 hover:text-white text-sm font-medium transition-colors" href="#">Help</a>
                      </div>
                  </div>
              </footer>
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

export default ResumePage;