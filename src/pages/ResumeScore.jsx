import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const ResumeScore = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("Baskar Manager");

  // --------------------------------
  // CHATBOT STATE
  // --------------------------------
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const [chatMessages, setChatMessages] = useState([
    { id: 1, sender: 'ai', text: 'Hi Baskar! Your resume score is looking good. Need tips on how to improve it further?' }
  ]);
  const chatEndRef = useRef(null);

  // --- API / LLM Initialization Logic ---
  useEffect(() => {
    const fetchScoreData = async () => {
      try {
        console.log("System Ready: Resume Scoring module initialized.");
      } catch (err) {
        console.log("Connection pending...");
      }
    };
    fetchScoreData();
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
        const newAiMsg = { id: Date.now() + 1, sender: 'ai', text: "Adding a project section can increase your score by 15%..." };
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
        .custom-scrollbar::-webkit-scrollbar-track { background: rgba(0,0,0,0.1); }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.2); border-radius: 4px; }
        
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }

        .material-symbols-outlined { font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24; }
        .material-symbols-outlined.fill { font-variation-settings: 'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24; }
        .fill-1 { font-variation-settings: 'FILL' 1; }
        
        /* FIX: Changed aspect-ratio to min-height so background expands */
        .a4-paper {
            width: 100%;
            max-width: 210mm;
            min-height: 297mm; 
            background: white;
            box-shadow: 0 10px 30px rgba(0,0,0,0.3);
            margin: 0 auto;
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
            {/* Reduced size to size-9 */}
            <div className="size-9 rounded-full bg-cover bg-center border border-slate-300 shrink-0" style={{ backgroundImage: "url('https://ui-avatars.com/api/?name=B+&background=06457F&color=fff')" }}></div>
            <div className="flex flex-col min-w-0">
              <span className="text-sm font-semibold text-slate-900 truncate">{userName}</span>
              <span className="text-[11px] text-slate-600 truncate">Pro Member</span>
            </div>
          </div>
        </div>
      </aside>

      {/* --- MAIN CONTENT (Score Page) --- */}
      <main className="flex-1 flex overflow-hidden">
        
        {/* Center: Preview Canvas (Visual Context) */}
        <section className="flex-1 relative bg-[#06457F] flex flex-col min-w-0">
          <div className="h-16 flex items-center justify-between px-8 border-b border-white/10 shrink-0 bg-[#06457F]/95 backdrop-blur z-10">
            <div className="flex flex-col">
              <h2 className="text-white text-lg font-bold">Resume Preview</h2>
              <p className="text-[#D1D5DB] text-xs">Analysis based on this version</p>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto custom-scrollbar p-8 sm:p-12 flex justify-center bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] relative">
            <div className="a4-paper flex flex-col text-slate-800 p-12 sm:p-16 relative opacity-90 hover:opacity-100 transition-opacity mb-20">
              {/* Resume Header */}
              <div className="border-b-2 border-slate-800 pb-6 mb-8 flex justify-between items-start">
                <div>
                  <h1 className="text-4xl font-serif font-bold tracking-tight text-slate-900 mb-2">Alex Morgan</h1>
                  <p className="text-lg text-slate-600 font-medium">Senior Product Designer</p>
                </div>
                <div className="text-right text-sm text-slate-500 flex flex-col gap-1">
                  <span className="flex items-center justify-end gap-1">alex.j@example.com <span className="material-symbols-outlined text-[16px]">mail</span></span>
                  <span className="flex items-center justify-end gap-1">+1 (555) 123-4567 <span className="material-symbols-outlined text-[16px]">call</span></span>
                  <span className="flex items-center justify-end gap-1">San Francisco, CA <span className="material-symbols-outlined text-[16px]">location_on</span></span>
                </div>
              </div>

              {/* Resume Content (Full Content Restored) */}
              <div className="flex flex-col gap-8">
                
                {/* Summary */}
                <div className="flex gap-4">
                  <div className="w-32 shrink-0">
                    <h3 className="font-bold text-slate-900 uppercase tracking-wider text-sm">Summary</h3>
                  </div>
                  <div className="flex-1 text-sm leading-relaxed text-slate-700">
                    Creative and detail-oriented Product Designer with 5+ years of experience in building user-centric digital products. Proven track record of improving user engagement and streamlining workflows. Skilled in Figma, prototyping, and design systems.
                  </div>
                </div>

                {/* Experience */}
                <div className="flex gap-4">
                  <div className="w-32 shrink-0">
                    <h3 className="font-bold text-slate-900 uppercase tracking-wider text-sm">Experience</h3>
                  </div>
                  <div className="flex-1 flex flex-col gap-6">
                    <div>
                      <div className="flex justify-between items-baseline mb-1">
                        <h4 className="font-bold text-slate-800">Senior UX Designer</h4>
                        <span className="text-xs font-medium text-slate-500">2021 - Present</span>
                      </div>
                      <p className="text-sm font-medium text-slate-600 mb-2">TechFlow Solutions</p>
                      <ul className="list-disc list-outside ml-4 text-sm text-slate-700 space-y-1">
                        <li>Led the redesign of the core mobile application, resulting in a 25% increase in daily active users.</li>
                        <li>Established a comprehensive design system used by 15+ designers and 50+ developers.</li>
                        <li>Conducted user research and usability testing to validate design decisions.</li>
                      </ul>
                    </div>
                    <div>
                      <div className="flex justify-between items-baseline mb-1">
                        <h4 className="font-bold text-slate-800">UI Designer</h4>
                        <span className="text-xs font-medium text-slate-500">2018 - 2021</span>
                      </div>
                      <p className="text-sm font-medium text-slate-600 mb-2">Creative Pulse Agency</p>
                      <ul className="list-disc list-outside ml-4 text-sm text-slate-700 space-y-1">
                        <li>Collaborated with cross-functional teams to deliver high-fidelity mockups for client projects.</li>
                        <li>Created interactive prototypes for stakeholder presentations.</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Education */}
                <div className="flex gap-4">
                  <div className="w-32 shrink-0">
                    <h3 className="font-bold text-slate-900 uppercase tracking-wider text-sm">Education</h3>
                  </div>
                  <div className="flex-1 flex flex-col gap-4">
                    <div>
                      <div className="flex justify-between items-baseline mb-1">
                        <h4 className="font-bold text-slate-800">Bachelor of Arts, Design</h4>
                        <span className="text-xs font-medium text-slate-500">2014 - 2018</span>
                      </div>
                      <p className="text-sm font-medium text-slate-600">University of California, Berkeley</p>
                    </div>
                  </div>
                </div>

                {/* Skills */}
                <div className="flex gap-4">
                  <div className="w-32 shrink-0">
                    <h3 className="font-bold text-slate-900 uppercase tracking-wider text-sm">Skills</h3>
                  </div>
                  <div className="flex-1 flex flex-wrap gap-2">
                    {['Figma', 'Sketch', 'Adobe Creative Suite', 'Prototyping', 'HTML/CSS', 'Agile Methodology'].map((skill) => (
                      <span key={skill} className="bg-slate-100 text-slate-700 px-2 py-1 rounded text-xs font-medium border border-slate-200">{skill}</span>
                    ))}
                  </div>
                </div>

                {/* Projects */}
                <div className="flex gap-4">
                  <div className="w-32 shrink-0">
                    <h3 className="font-bold text-slate-900 uppercase tracking-wider text-sm">Projects</h3>
                  </div>
                  <div className="flex-1 flex flex-col gap-4">
                    <div>
                        <div className="flex justify-between items-baseline mb-1">
                            <h4 className="font-bold text-slate-800">Fintech Dashboard</h4>
                            <span className="text-[10px] text-[#0474C4] font-semibold uppercase">React, Node.js, AWS</span>
                        </div>
                        <p className="text-sm text-slate-700 leading-relaxed">Developed an end-to-end investment portal used by 50k users. Integrated real-time data visualization and secure OAuth2 authentication flow.</p>
                    </div>
                  </div>
                </div>

                {/* Certifications */}
                <div className="flex gap-4">
                  <div className="w-32 shrink-0">
                    <h3 className="font-bold text-slate-900 uppercase tracking-wider text-sm">Certifications</h3>
                  </div>
                  <div className="flex-1 flex flex-col gap-4">
                    <div>
                        <div className="flex justify-between items-baseline mb-1">
                            <h4 className="font-bold text-slate-800">AWS Certified Solutions Architect</h4>
                            <span className="text-xs font-medium text-slate-500">Mar 2023</span>
                        </div>
                        <p className="text-sm font-medium text-slate-600">Amazon Web Services (ID: AWS-123456789)</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Overlay Badge - MOVED OUTSIDE OF SCROLLABLE DIV, FIXED AT BOTTOM OF SECTION */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center justify-center z-30">
                <div 
                    onClick={() => navigate('/resume-editor')}
                    className="bg-[#0474C4] text-white px-6 py-3 rounded-full font-bold shadow-2xl hover:bg-[#035a96] hover:scale-105 transition-all cursor-pointer border border-white/20 flex items-center gap-2"
                >
                  <span className="material-symbols-outlined text-[20px]">edit_document</span>
                  Back to Editor
                </div>
          </div>
        </section>

        {/* --- RIGHT SIDEBAR (Scoring & Analysis) --- */}
        <aside className="w-[400px] bg-[#A8C4EC] shrink-0 flex flex-col border-l border-white/20 shadow-2xl relative z-20">
          <div className="p-8 flex flex-col h-full overflow-y-auto custom-scrollbar">
            <div className="mb-8">
              <h2 className="text-[#06457F] text-2xl font-bold tracking-tight mb-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Resume Score</h2>
              <p className="text-[#06457F]/70 text-sm">Based on industry standards</p>
            </div>

            {/* Score Card */}
            <div className="bg-white rounded-2xl p-6 mb-8 shadow-md border-none">
              <div className="flex items-center gap-6 mb-4">
                <div className="relative size-20 shrink-0">
                  <svg className="size-full -rotate-90" viewBox="0 0 36 36">
                    <path className="text-slate-200" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="4"></path>
                    <path className="text-[#0474C4]" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeDasharray="78, 100" strokeLinecap="round" strokeWidth="4"></path>
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-xl font-bold text-[#06457F]">78%</span>
                  </div>
                </div>
                <div className="flex flex-col">
                  <span className="text-[#06457F] font-bold text-lg">Good Start!</span>
                  <span className="text-[#06457F]/80 text-sm leading-snug">You are almost ready. Just a few more details needed.</span>
                </div>
              </div>
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                <div className="bg-[#0474C4] h-full rounded-full" style={{ width: '78%' }}></div>
              </div>
            </div>

            <div className="flex flex-col gap-4 mb-8">
              <h3 className="text-[#06457F] font-bold uppercase tracking-wider text-xs px-1">Section Checklist</h3>
              <div className="flex flex-col gap-2">
                {/* Updated Checklist to include Certifications and Projects */}
                {['Personal Information', 'Education', 'Skills', 'Certifications', 'Projects'].map((item, i) => (
                  <div key={i} className="flex items-center justify-between p-3 bg-white rounded-lg border-none shadow-sm">
                    <div className="flex items-center gap-3">
                      <div className="bg-[#0474C4]/10 rounded-full p-1">
                        <span className="material-symbols-outlined text-[#0474C4] text-[20px]">check_circle</span>
                      </div>
                      <span className="text-[#06457F] font-medium text-sm">{item}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Improvement Tip */}
            <div className="bg-white rounded-xl p-4 border border-[#06457F]/10 mb-8 shadow-sm">
              <div className="flex gap-3">
                <span className="material-symbols-outlined text-[#0474C4]">lightbulb</span>
                <div className="flex flex-col gap-1">
                  <h4 className="text-sm font-bold text-[#06457F]">Improvement Tip</h4>
                  <p className="text-sm text-[#06457F]/80 leading-relaxed">Quantify your impact in the "Projects" section with specific metrics (e.g., "Improved load time by 20%").</p>
                </div>
              </div>
            </div>

            <div className="mt-auto flex flex-col gap-3 pt-6 border-t border-[#06457F]/10">
              <button className="w-full bg-[#0474C4] hover:bg-blue-600 text-white font-semibold py-4 px-6 rounded-xl shadow-lg shadow-blue-500/20 flex items-center justify-center gap-2 transition-all transform hover:-translate-y-0.5">
                <span className="material-symbols-outlined">download</span>
                Download PDF
              </button>
              <button 
                onClick={() => navigate('/resume-editor')}
                className="w-full bg-white hover:bg-slate-50 text-[#06457F] font-semibold py-3 px-6 rounded-xl border-2 border-[#06457F]/20 flex items-center justify-center gap-2 transition-colors"
              >
                <span className="material-symbols-outlined">edit</span>
                Edit Resume
              </button>
            </div>
          </div>
        </aside>
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

export default ResumeScore;