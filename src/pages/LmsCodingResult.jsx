import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LmsCodingResult = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("Baskar Manager");

  // --- API / LLM Initialization Logic ---
  useEffect(() => {
    const fetchResultData = async () => {
      try {
        console.log("System Ready: Coding Result module initialized.");
      } catch (err) {
        console.log("Connection pending...");
      }
    };
    fetchResultData();
  }, []);

  const handleNavigate = (page) => {
    if (page === 'Dashboard') navigate('/dashboard/main');
    else navigate(`/${page.toLowerCase().replace(/\s+/g, '-')}`);
  };

  return (
    <div className="flex h-screen w-full overflow-hidden bg-[#06457F] text-white font-['Inter'] antialiased">
      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap');

        /* Custom Scrollbar */
        ::-webkit-scrollbar { width: 8px; height: 8px; }
        ::-webkit-scrollbar-track { background: rgba(0, 0, 0, 0.1); }
        ::-webkit-scrollbar-thumb { background: rgba(255, 255, 255, 0.2); border-radius: 4px; }
        ::-webkit-scrollbar-thumb:hover { background: rgba(255, 255, 255, 0.3); }

        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }

        /* Smooth Scrolling */
        html, body, .smooth-scroll { scroll-behavior: smooth; }

        /* Force outlined icons */
        .material-symbols-outlined { font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24; }
        .material-symbols-outlined.fill { font-variation-settings: 'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24; }
      `}} />

      {/* --- SIDEBAR --- */}
      <aside className="w-72 flex-shrink-0 flex flex-col border-r border-slate-300 bg-white relative z-50 text-[#0F172A]">
        <div className="p-6 flex items-center gap-3">
          {/* FIXED LOGO: Square Gradient Rocket */}
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#0474C4] to-cyan-400 flex items-center justify-center shadow-lg shadow-blue-500/30">
              <span className="material-symbols-outlined text-white text-xl">rocket_launch</span>
          </div>
          <h1 className="text-xl font-bold tracking-tight text-slate-900" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Career Orbit</h1>
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
              <span className="text-[11px] text-slate-500 truncate">Pro Member</span>
            </div>
          </div>
        </div>
      </aside>

      {/* --- MAIN CONTENT AREA --- */}
      <div className="flex-1 h-full overflow-y-auto bg-[#06457F] smooth-scroll">
        <div className="flex flex-col items-center w-full min-h-full py-10 px-8">
          <div className="w-full max-w-4xl flex flex-col gap-6">
            
            {/* Page Heading */}
            <div className="flex flex-wrap justify-between items-end gap-3 px-1">
              <div>
                <p className="text-white/60 text-sm font-medium mb-1 tracking-wide uppercase">Practice Ground</p>
                <h2 className="text-white tracking-tight text-[32px] font-bold leading-tight">Submission Result</h2>
              </div>
              <div className="flex gap-3">
                <span className="bg-[#0A4F8F]/50 text-white/80 px-3 py-1 rounded-full text-xs font-medium border border-white/10 flex items-center gap-1">
                  <span className="material-symbols-outlined text-[16px]">schedule</span> 15 mins
                </span>
                <span className="bg-[#0A4F8F]/50 text-white/80 px-3 py-1 rounded-full text-xs font-medium border border-white/10 flex items-center gap-1">
                  <span className="material-symbols-outlined text-[16px]">bolt</span> 85% Memory
                </span>
              </div>
            </div>

            {/* Result Summary Card */}
            <div className="w-full bg-[#0A4F8F] rounded-xl border border-white/10 shadow-xl overflow-hidden">
              
              {/* Header / Status Banner */}
              <div className="p-6 bg-gradient-to-r from-emerald-500/10 to-transparent border-b border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/20 flex items-center justify-center flex-shrink-0">
                    <span className="material-symbols-outlined text-emerald-400 text-[28px]">check_circle</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <h3 className="text-white text-xl font-bold leading-tight">Correct Solution</h3>
                    <div className="flex flex-wrap items-center gap-2 text-sm text-slate-300">
                      <span className="font-medium text-white">Two Sum</span>
                      <span className="text-white/20">•</span>
                      <span className="text-emerald-300 bg-emerald-900/30 px-2 py-0.5 rounded text-xs font-medium border border-emerald-500/30">Easy</span>
                      <span className="text-white/20">•</span>
                      <span className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-[16px]">code</span> Python
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-lg border border-white/5">
                  <span className="text-white text-sm font-medium">Progress Updated</span>
                  <span className="material-symbols-outlined text-emerald-400 text-[18px]">update</span>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3">
                {/* Left Column: Output & Test Results */}
                <div className="col-span-2 p-6 border-r border-white/5">
                  <h4 className="text-white text-lg font-semibold mb-4 flex items-center gap-2">
                    <span className="material-symbols-outlined text-[20px] text-[#0474C4]">terminal</span>
                    Output & Test Results
                  </h4>
                  <div className="flex flex-col gap-4">
                    {/* Test Case 1 */}
                    <div className="bg-[#1e293b] rounded-lg border border-white/10 p-4 font-mono text-sm shadow-inner" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                      <div className="flex justify-between items-center mb-3 pb-2 border-b border-white/10">
                        <span className="text-slate-400">Test Case 1</span>
                        <span className="text-emerald-400 flex items-center gap-1 text-xs uppercase tracking-wider font-bold">
                          <span className="material-symbols-outlined text-[16px]">check</span> Passed
                        </span>
                      </div>
                      <div className="grid grid-cols-1 gap-y-4">
                        <div className="grid grid-cols-[100px_1fr] gap-2">
                          <span className="text-slate-500 select-none">Input:</span>
                          <span className="text-slate-300">nums = [2, 7, 11, 15], target = 9</span>
                        </div>
                        <div className="grid grid-cols-[100px_1fr] gap-2">
                          <span className="text-slate-500 select-none">Output:</span>
                          <span className="text-white">[0, 1]</span>
                        </div>
                        <div className="grid grid-cols-[100px_1fr] gap-2">
                          <span className="text-slate-500 select-none">Expected:</span>
                          <span className="text-slate-400">[0, 1]</span>
                        </div>
                      </div>
                    </div>
                    {/* Test Case 2 */}
                    <div className="bg-[#1e293b] rounded-lg border border-white/10 p-4 font-mono text-sm shadow-inner opacity-70 hover:opacity-100 transition-opacity" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                      <div className="flex justify-between items-center mb-3 pb-2 border-b border-white/10">
                        <span className="text-slate-400">Test Case 2</span>
                        <span className="text-emerald-400 flex items-center gap-1 text-xs uppercase tracking-wider font-bold">
                          <span className="material-symbols-outlined text-[16px]">check</span> Passed
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-slate-500 text-xs">Click to expand details</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Column: Feedback & Hints */}
                <div className="col-span-1 p-6 bg-[#0A4F8F]/30 flex flex-col h-full">
                  <div className="mb-6">
                    <h4 className="text-white text-lg font-semibold mb-4 flex items-center gap-2">
                      <span className="material-symbols-outlined text-[20px] text-yellow-400">lightbulb</span>
                      Feedback
                    </h4>
                    <div className="bg-white/5 rounded-lg p-4 border border-white/10 mb-4">
                      <p className="text-slate-200 text-sm leading-relaxed">
                        Your solution works correctly for the given test cases. Great job handling the array indices!
                      </p>
                    </div>
                    <p className="text-slate-400 text-sm mb-2">Suggestions:</p>
                    <ul className="flex flex-col gap-2">
                      <li className="flex items-start gap-2 text-sm text-slate-300">
                        <span className="material-symbols-outlined text-[16px] text-[#0474C4] mt-0.5">arrow_right_alt</span>
                        <span>Try solving similar problems to strengthen hash map logic.</span>
                      </li>
                      <li className="flex items-start gap-2 text-sm text-slate-300">
                        <span className="material-symbols-outlined text-[16px] text-[#0474C4] mt-0.5">arrow_right_alt</span>
                        <span>Review time complexity: Your solution is O(n).</span>
                      </li>
                    </ul>
                  </div>
                  <div className="mt-auto">
                    <div className="bg-gradient-to-br from-blue-900/40 to-indigo-900/40 rounded-lg p-4 border border-blue-500/20">
                      <div className="flex gap-3 mb-2">
                        <span className="text-xl">💡</span>
                        <p className="text-blue-100 text-xs font-medium leading-relaxed">
                          Practicing basic problems regularly improves interview confidence by 40%.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Actions Footer */}
              <div className="p-6 bg-black/20 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
                <button 
                  onClick={() => navigate('/dashboard')}
                  className="text-slate-400 hover:text-white text-sm font-medium transition-colors flex items-center gap-2 group"
                >
                  <span className="material-symbols-outlined text-[18px] group-hover:-translate-x-1 transition-transform">arrow_back</span>
                  Go to Dashboard
                </button>
                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <button 
                    onClick={() => navigate('/coding-platform')}
                    className="flex-1 sm:flex-none px-6 py-2.5 rounded-lg border border-white/20 text-white text-sm font-medium hover:bg-white/5 transition-colors focus:ring-2 focus:ring-white/20"
                  >
                    Try Again
                  </button>
                  <button 
                    onClick={() => navigate('/coding-practice')}
                    className="flex-1 sm:flex-none px-6 py-2.5 rounded-lg bg-[#0474C4] text-white text-sm font-semibold shadow-lg shadow-blue-900/20 hover:bg-blue-600 transition-colors flex items-center justify-center gap-2 focus:ring-2 focus:ring-primary/50"
                  >
                    Next Problem
                    <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Additional Context */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-2 opacity-60 hover:opacity-100 transition-opacity">
              <div className="p-4 rounded-lg border border-dashed border-white/20 flex items-center justify-between group cursor-pointer hover:border-white/40">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center">
                    <span className="material-symbols-outlined text-white/60">history</span>
                  </div>
                  <div>
                    <p className="text-white text-sm font-medium">View Submission History</p>
                    <p className="text-slate-400 text-xs">Compare with previous attempts</p>
                  </div>
                </div>
                <span className="material-symbols-outlined text-white/40 group-hover:text-white">chevron_right</span>
              </div>
              <div className="p-4 rounded-lg border border-dashed border-white/20 flex items-center justify-between group cursor-pointer hover:border-white/40">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center">
                    <span className="material-symbols-outlined text-white/60">forum</span>
                  </div>
                  <div>
                    <p className="text-white text-sm font-medium">Discuss Solution</p>
                    <p className="text-slate-400 text-xs">See how others solved it</p>
                  </div>
                </div>
                <span className="material-symbols-outlined text-white/40 group-hover:text-white">chevron_right</span>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default LmsCodingResult;