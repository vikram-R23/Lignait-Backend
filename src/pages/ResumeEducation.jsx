import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const ResumeEducation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [userName, setUserName] = useState("Baskar Manager");

  // --------------------------------
  // CHATBOT STATE
  // --------------------------------
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const [chatMessages, setChatMessages] = useState([
    { id: 1, sender: 'ai', text: 'Hi Baskar! I can help you format your education details. Need advice on GPA or coursework?' }
  ]);
  const chatEndRef = useRef(null);

  // --- API / LLM Initialization Logic ---
  useEffect(() => {
    const fetchEducationData = async () => {
      try {
        console.log("System Ready: Resume Education module initialized.");
      } catch (err) {
        console.log("Connection pending...");
      }
    };
    fetchEducationData();
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
        const newAiMsg = { id: Date.now() + 1, sender: 'ai', text: "Including relevant coursework can boost your profile..." };
        setChatMessages(prev => [...prev, newAiMsg]);
    }, 1000);
  };

  // Helper to determine active state style
  const getSidebarItemClass = (path) => {
    const isActive = location.pathname === path;
    return isActive 
      ? "w-full flex items-center justify-between p-2.5 rounded-lg text-sm font-medium text-white bg-[#0474C4] shadow-md text-left transition-all"
      : "w-full flex items-center justify-between p-2.5 rounded-lg text-sm font-medium text-[#D1D5DB] hover:bg-white/5 hover:text-white group text-left transition-all";
  };

  const getIconClass = (path) => {
    const isActive = location.pathname === path;
    return isActive
      ? "material-symbols-outlined text-white text-[20px]"
      : "material-symbols-outlined text-[#D1D5DB] group-hover:text-white text-[20px]";
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
        ::-webkit-scrollbar { width: 8px; height: 8px; }
        ::-webkit-scrollbar-track { background: rgba(0, 0, 0, 0.1); }
        ::-webkit-scrollbar-thumb { background: rgba(255, 255, 255, 0.2); border-radius: 4px; }
        ::-webkit-scrollbar-thumb:hover { background: rgba(255, 255, 255, 0.3); }

        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }

        .material-symbols-outlined { font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24; }
        .material-symbols-outlined.fill { font-variation-settings: 'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24; }
        .fill-1 { font-variation-settings: 'FILL' 1; }
        
        .a4-paper {
            width: 100%;
            aspect-ratio: 210 / 297;
            background: white;
            color: black;
            font-size: 11px;
            box-shadow: 0 0 20px rgba(0,0,0,0.5);
            font-family: 'Inter', sans-serif;
        }

        /* Chat Animation */
        @keyframes slideUpFade {
            from { transform: translateY(20px) scale(0.95); opacity: 0; }
            to { transform: translateY(0) scale(1); opacity: 1; }
        }
        .chat-animate { animation: slideUpFade 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
      `}} />

      {/* --- MAIN SIDEBAR (Standardized) --- */}
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
          
          {/* Active State for Resume */}
          <button onClick={() => navigate('/resume')} className="flex items-center gap-3 px-4 py-3 rounded-lg bg-[#06457F] text-white shadow-md text-left w-full">
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

          {/* Internship (Labeled as Requested) */}
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

      {/* --- EDITOR AREA --- */}
      <div className="flex flex-1 flex-col min-w-0 overflow-hidden">
        
        {/* Top Header */}
        <header className="h-16 flex-shrink-0 bg-[#06457F] border-b border-white/10 flex items-center justify-between px-6 z-10">
          <div className="flex items-center gap-6">
            <h1 className="text-xl font-bold text-white tracking-tight" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Resume Editor</h1>
            <div className="hidden md:flex flex-col gap-1 w-48">
              <div className="flex justify-between items-end">
                <span className="text-xs font-medium text-[#D1D5DB]">Resume Strength</span>
                <span className="text-xs font-bold text-[#0474C4]">85%</span>
              </div>
              <div className="h-1.5 w-full bg-[#1E1E1E] rounded-full overflow-hidden border border-white/5">
                <div className="h-full bg-[#0474C4] rounded-full" style={{ width: '85%' }}></div>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs text-[#D1D5DB] hidden sm:inline-block">Last saved 2m ago</span>
            <button className="flex items-center justify-center size-9 rounded-lg hover:bg-white/10 text-white transition-colors" title="Preview Mode">
              <span className="material-symbols-outlined text-[20px]">visibility</span>
            </button>
            <button className="h-9 px-4 rounded-lg bg-[#0474C4] hover:bg-blue-600 text-white text-sm font-medium flex items-center gap-2 transition-colors shadow-lg shadow-[#0474C4]/20">
              <span className="material-symbols-outlined text-[18px]">download</span>
              Download PDF
            </button>
          </div>
        </header>

        <div className="flex flex-1 overflow-hidden">
          
          {/* Inner Sidebar: Sections with Navigation */}
          <div className="w-64 flex-shrink-0 bg-[#06457F] border-r border-white/10 flex flex-col">
            <div className="p-4">
              <h2 className="text-xs font-bold text-[#D1D5DB] uppercase tracking-wider mb-3 px-2">Sections</h2>
              <ul className="space-y-1">
                <li>
                  <button onClick={() => navigate('/resume-editor')} className={getSidebarItemClass('/resume-editor')}>
                    <div className="flex items-center gap-3">
                      <span className={getIconClass('/resume-editor')}>person</span>
                      Personal Info
                    </div>
                  </button>
                </li>
                <li>
                  <button onClick={() => navigate('/resume-experience')} className={getSidebarItemClass('/resume-experience')}>
                    <div className="flex items-center gap-3">
                      <span className={getIconClass('/resume-experience')}>work</span>
                      Experience
                    </div>
                  </button>
                </li>
                <li>
                  {/* Active Section: Education */}
                  <button className="w-full flex items-center justify-between p-2.5 rounded-lg text-sm font-medium text-white bg-[#0474C4] shadow-md text-left transition-all">
                    <div className="flex items-center gap-3">
                      <span className="material-symbols-outlined text-white text-[20px]">school</span>
                      Education
                    </div>
                    <span className="material-symbols-outlined text-[16px] opacity-70">drag_handle</span>
                  </button>
                </li>
                <li>
                  <button onClick={() => navigate('/resume-skills')} className={getSidebarItemClass('/resume-skills')}>
                    <div className="flex items-center gap-3">
                      <span className={getIconClass('/resume-skills')}>build</span>
                      Skills
                    </div>
                  </button>
                </li>
                <li>
                  <button onClick={() => navigate('/resume-projects')} className={getSidebarItemClass('/resume-projects')}>
                    <div className="flex items-center gap-3">
                      <span className={getIconClass('/resume-projects')}>folder</span>
                      Projects
                    </div>
                  </button>
                </li>
                <li>
                  <button onClick={() => navigate('/resume-certifications')} className={getSidebarItemClass('/resume-certifications')}>
                    <div className="flex items-center gap-3">
                      <span className={getIconClass('/resume-certifications')}>verified</span>
                      Certifications
                    </div>
                  </button>
                </li>
              </ul>
              <button className="mt-4 w-full py-2 border border-dashed border-white/20 rounded-lg text-xs font-medium text-[#D1D5DB] hover:text-white hover:border-white/40 transition-colors flex items-center justify-center gap-2">
                <span className="material-symbols-outlined text-[16px]">add</span>
                Add Custom Section
              </button>
            </div>
          </div>

          {/* Middle: Input Form */}
          <div className="flex-1 bg-[#06457F] overflow-y-auto relative scroll-smooth">
            <div className="max-w-2xl mx-auto p-6 pb-24">
              <div className="mb-8 p-4 bg-[#053b6e]/50 border border-[#0474C4]/30 rounded-xl flex items-start gap-3">
                <span className="material-symbols-outlined text-[#0474C4] shrink-0 mt-0.5">auto_awesome</span>
                <div>
                  <p className="text-sm text-white font-medium">Auto-Generated Content</p>
                  <p className="text-xs text-[#D1D5DB] mt-1 leading-relaxed">
                    Your education details have been imported from your profile. You can modify them here.
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Education</h2>
                <button className="text-sm text-[#0474C4] hover:text-blue-300 font-medium flex items-center gap-1">
                  <span className="material-symbols-outlined text-[18px]">add</span>
                  Add Education
                </button>
              </div>

              {/* Education Card */}
              <div className="bg-[#1E1E1E] rounded-xl border border-white/10 p-5 mb-6 group hover:border-[#0474C4]/50 transition-colors shadow-xl">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-white font-medium flex items-center gap-2">
                    <span className="bg-[#0474C4]/20 text-[#0474C4] size-6 rounded flex items-center justify-center text-xs font-bold">1</span>
                    Current Education
                  </h3>
                  <div className="flex gap-2">
                    <button className="text-[#D1D5DB] hover:text-white"><span className="material-symbols-outlined text-[18px]">delete</span></button>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2">
                    <label className="block text-xs font-medium text-[#D1D5DB] mb-1.5">Degree</label>
                    <input className="w-full bg-[#1E1E1E] border border-[#3A3A3A] rounded-lg px-3 py-2.5 text-sm text-white placeholder-text-placeholder focus:border-[#0474C4] focus:ring-1 focus:ring-[#0474C4] outline-none transition-all" type="text" defaultValue="Bachelor of Arts, Design"/>
                  </div>
                  <div className="col-span-2">
                    <label className="block text-xs font-medium text-[#D1D5DB] mb-1.5">Institution</label>
                    <input className="w-full bg-[#1E1E1E] border border-[#3A3A3A] rounded-lg px-3 py-2.5 text-sm text-white placeholder-text-placeholder focus:border-[#0474C4] focus:ring-1 focus:ring-[#0474C4] outline-none transition-all" type="text" defaultValue="University of California, Berkeley"/>
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <label className="block text-xs font-medium text-[#D1D5DB] mb-1.5">Start Date</label>
                    <input className="w-full bg-[#1E1E1E] border border-[#3A3A3A] rounded-lg px-3 py-2.5 text-sm text-white placeholder-text-placeholder focus:border-[#0474C4] focus:ring-1 focus:ring-[#0474C4] outline-none transition-all" type="text" defaultValue="2014"/>
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <label className="block text-xs font-medium text-[#D1D5DB] mb-1.5">End Date</label>
                    <input className="w-full bg-[#1E1E1E] border border-[#3A3A3A] rounded-lg px-3 py-2.5 text-sm text-white placeholder-text-placeholder focus:border-[#0474C4] focus:ring-1 focus:ring-[#0474C4] outline-none transition-all" type="text" defaultValue="2018"/>
                  </div>
                </div>
              </div>

              {/* NAVIGATION LOGIC */}
              <div className="pt-8 flex justify-end pb-12">
                <button 
                  onClick={() => navigate('/resume-skills')}
                  className="bg-[#0474C4] hover:bg-[#0361a3] text-white px-6 py-2 rounded-md font-semibold transition-colors flex items-center gap-2"
                >
                  Next: Skills
                  <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                </button>
              </div>
            </div>
          </div>

          {/* Right: Live Preview A4 Paper */}
          <div className="hidden xl:flex w-[480px] flex-shrink-0 bg-[#A8C4EC] border-l border-white/10 relative flex-col items-center shadow-inner">
            <div className="absolute top-4 right-4 flex flex-col gap-1 bg-white/90 backdrop-blur rounded-lg shadow-sm border border-slate-200 z-10 p-1">
              <button className="size-8 flex items-center justify-center text-slate-600 hover:bg-slate-100 rounded hover:text-[#0474C4]">
                <span className="material-symbols-outlined text-[20px]">add</span>
              </button>
              <button className="size-8 flex items-center justify-center text-slate-600 hover:bg-slate-100 rounded hover:text-[#0474C4]">
                <span className="material-symbols-outlined text-[20px]">remove</span>
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto w-full p-8 flex justify-center">
              <div className="a4-paper shadow-2xl relative">
                <div className="p-8 h-full flex flex-col">
                  <div className="border-b-2 border-slate-800 pb-4 mb-4">
                    <h1 className="text-2xl font-bold text-slate-900 uppercase tracking-widest">Alex Morgan</h1>
                    <p className="text-slate-600 mt-1 text-xs font-medium">Senior Product Designer</p>
                    <div className="flex gap-3 mt-2 text-[10px] text-slate-500">
                      <span>alex.m@example.com</span> • <span>(555) 123-4567</span> • <span>San Francisco, CA</span>
                    </div>
                  </div>
                  
                  <div className="flex-1 flex flex-col gap-4">
                    <div>
                      <h2 className="text-xs font-bold text-slate-800 uppercase border-b border-slate-200 pb-1 mb-2">Experience</h2>
                      <div className="mb-3">
                        <div className="flex justify-between items-baseline mb-1">
                          <h3 className="font-bold text-slate-900 text-xs">Senior Product Designer</h3>
                          <span className="text-[10px] text-slate-500">Jan 2021 - Present</span>
                        </div>
                        <p className="text-[10px] font-medium text-slate-700 mb-1">TechFlow Inc.</p>
                        <ul className="list-disc list-outside ml-3 text-[10px] text-slate-600 space-y-0.5 leading-normal">
                          <li>Led the design system overhaul, reducing development time by 30%.</li>
                          <li>Mentored junior designers and established weekly design critiques.</li>
                          <li>Collaborated with product managers to define roadmap features.</li>
                        </ul>
                      </div>
                      <div>
                        <div className="flex justify-between items-baseline mb-1">
                          <h3 className="font-bold text-slate-900 text-xs">UX Designer</h3>
                          <span className="text-[10px] text-slate-500">2018 - 2020</span>
                        </div>
                        <p className="text-[10px] font-medium text-slate-700 mb-1">Creative Pulse Agency</p>
                        <ul className="list-disc list-outside ml-3 text-[10px] text-slate-600 space-y-0.5 leading-normal">
                          <li>Designed responsive websites for 15+ clients in fintech.</li>
                          <li>Conducted user research sessions to validate prototypes.</li>
                        </ul>
                      </div>
                    </div>
                    
                    {/* Education Preview Highlighted */}
                    <div className="bg-blue-50/50 -mx-4 px-4 py-2 rounded">
                      <h2 className="text-xs font-bold text-slate-800 uppercase border-b border-slate-200 pb-1 mb-2">Education</h2>
                      <div>
                        <div className="flex justify-between items-baseline">
                          <h3 className="font-bold text-slate-900 text-xs">Bachelor of Arts, Design</h3>
                          <span className="text-[10px] text-slate-500">2014 - 2018</span>
                        </div>
                        <p className="text-[10px] text-slate-600">University of California, Berkeley</p>
                      </div>
                    </div>
                    
                    <div>
                      <h2 className="text-xs font-bold text-slate-800 uppercase border-b border-slate-200 pb-1 mb-2">Skills</h2>
                      <p className="text-[10px] text-slate-600 leading-normal">
                        Figma, Sketch, Adobe CC, HTML/CSS, Prototyping, User Research, Design Systems, Agile Methodology
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

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

export default ResumeEducation;