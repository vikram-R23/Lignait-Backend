import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const LmsCodingPlatform = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("Baskar Manager");

  // --- API / LLM Initialization Logic ---
  useEffect(() => {
    const fetchProblemData = async () => {
      try {
        console.log("System Ready: Coding Platform initialized.");
      } catch (err) {
        console.log("Connection pending...");
      }
    };
    fetchProblemData();
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
        
        /* Syntax Highlighting */
        .syntax-keyword { color: #C586C0; }
        .syntax-function { color: #DCDCAA; }
        .syntax-string { color: #CE9178; }
        .syntax-comment { color: #6A9955; font-style: italic; }
        .syntax-number { color: #B5CEA8; }
        .syntax-class { color: #4EC9B0; }
      `}} />

      {/* --- SIDEBAR --- */}
      <aside className="w-72 flex-shrink-0 flex flex-col border-r border-slate-300 bg-white relative z-50 text-[#0F172A]">
        <div className="p-6 flex items-center gap-3 select-none">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#0474C4] to-cyan-400 flex items-center justify-center shadow-lg shadow-blue-500/30">
              <span className="material-symbols-outlined text-white text-xl">rocket_launch</span>
          </div>
          <h1 className="text-xl font-bold tracking-tight text-slate-900" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Career Orbit</h1>
        </div>

        <nav className="flex-1 px-4 py-4 flex flex-col gap-2 overflow-y-auto no-scrollbar">
          <button onClick={() => handleNavigate('Dashboard')} className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-600 hover:bg-slate-50 transition-colors group text-left w-full">
            <span className="material-symbols-outlined group-hover:text-[#06457F]">home</span>
            <span className="font-medium" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Dashboard</span>
          </button>
          
          <button onClick={() => handleNavigate('Roadmap')} className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-600 hover:bg-slate-50 transition-colors group text-left w-full">
            <span className="material-symbols-outlined">map</span>
            <span className="font-medium" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Career Roadmap</span>
          </button>

          <button onClick={() => handleNavigate('Mentors')} className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-600 hover:bg-slate-50 transition-colors group text-left w-full">
            <span className="material-symbols-outlined">groups</span>
            <span className="font-medium" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Mentorship</span>
          </button>
          
          <button onClick={() => handleNavigate('Resume')} className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-600 hover:bg-slate-50 transition-colors group text-left w-full">
            <span className="material-symbols-outlined group-hover:text-[#06457F]">description</span>
            <span className="font-medium" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Resume</span>
          </button>

          <button onClick={() => handleNavigate('Mock Interview')} className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-600 hover:bg-slate-50 transition-colors group text-left w-full">
            <span className="material-symbols-outlined group-hover:text-[#06457F]">videocam</span>
            <span className="font-medium" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Mock Interview</span>
          </button>

          <button onClick={() => handleNavigate('My Bookings')} className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-600 hover:bg-slate-50 transition-colors group text-left w-full">
            <span className="material-symbols-outlined">calendar_month</span>
            <span className="font-medium" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>My Booking</span>
          </button>

          {/* Internship (Added) */}
          <button onClick={() => handleNavigate('Internships Jobs')} className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-600 hover:bg-slate-50 transition-colors group text-left w-full">
            <span className="material-symbols-outlined group-hover:text-[#06457F]">work</span>
            <span className="font-medium" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Internship</span>
          </button>

          <button onClick={() => navigate('/lms-courses')} className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-600 hover:bg-slate-50 transition-colors group text-left w-full">
            <span className="material-symbols-outlined">menu_book</span>
            <span className="font-medium" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>LMS Courses</span>
          </button>

          {/* Active State for Practice Ground */}
          <button onClick={() => navigate('/practice-ground')} className="flex items-center gap-3 px-4 py-3 rounded-lg bg-[#06457F] text-white shadow-md text-left w-full">
            <span className="material-symbols-outlined fill">code</span>
            <span className="font-semibold" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Practice Ground</span>
          </button>

          <button onClick={() => handleNavigate('Settings')} className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-600 hover:bg-slate-50 transition-colors group text-left w-full">
            <span className="material-symbols-outlined">settings</span>
            <span className="font-medium" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Settings</span>
          </button>
        </nav>

        {/* --- COMPACT PROFILE SECTION (FIXED AT BOTTOM) --- */}
        <div className="p-3 border-t border-slate-300 shrink-0 mt-auto bg-white z-20">
          <div onClick={() => navigate('/profile')} className="flex items-center gap-3 px-2 py-1.5 rounded-lg cursor-pointer hover:bg-slate-50 transition-colors">
            {/* Reduced size-9 */}
            <div className="size-9 rounded-full bg-cover bg-center border border-slate-300 shrink-0" style={{ backgroundImage: "url('https://ui-avatars.com/api/?name=B+&background=06457F&color=fff')" }}></div>
            <div className="flex flex-col min-w-0">
              <span className="text-sm font-bold text-slate-900 truncate" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{userName}</span>
              {/* Text size updated to 11px and slate-500 */}
              <span className="text-[11px] font-medium text-slate-500 truncate" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Pro Member</span>
            </div>
          </div>
        </div>
      </aside>

      {/* --- MAIN CONTENT AREA --- */}
      <main className="flex-1 flex flex-col h-full overflow-hidden relative bg-[#06457F]">
        
        {/* Breadcrumb / Minimal Header */}
        <header className="h-16 px-6 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2 text-white/60 text-sm">
            <span onClick={() => navigate('/practice-ground')} className="cursor-pointer hover:text-white">Practice Ground</span>
            <span className="material-symbols-outlined text-[16px]">chevron_right</span>
            <span className="text-white font-medium">String Manipulation</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-white/80 bg-black/20 px-3 py-1.5 rounded-full text-xs font-medium backdrop-blur-sm">
              <span className="material-symbols-outlined text-[16px] text-amber-400">bolt</span>
              <span>Streak: 12 Days</span>
            </div>
          </div>
        </header>

        {/* Split Screen Layout */}
        <div className="flex-1 flex gap-4 px-6 pb-6 min-h-0">
          
          {/* LEFT PANEL: Problem Statement */}
          <div className="w-5/12 flex flex-col bg-[#0f1b23] rounded-xl border border-white/10 shadow-xl overflow-hidden">
            {/* Header */}
            <div className="p-6 pb-4 border-b border-white/5">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-2xl font-bold text-white leading-tight">Reverse a String </h2>
                <div className="flex items-center gap-2">
                  <div className="flex h-6 items-center justify-center px-3 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                    <p className="text-xs font-semibold">Easy</p>
                  </div>
                </div>
              </div>
              <div className="flex gap-4 text-xs text-[#D1D5DB]">
                <div className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-[16px]">thumb_up</span>
                  <span>98% Likes</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-[16px]">check_circle</span>
                  <span>Solved</span>
                </div>
              </div>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
              <div className="prose prose-invert max-w-none">
                <p className="text-[#D1D5DB] text-base leading-relaxed mb-6">
                  Write a function that reverses a string. The input string is given as an array of characters <code>s</code>.
                </p>
                <p className="text-[#D1D5DB] text-base leading-relaxed mb-6">
                  You must do this by modifying the input array <strong>in-place</strong> with O(1) extra memory.
                </p>
              </div>

              {/* Examples */}
              <div className="mt-8 space-y-6">
                <div className="bg-[#162432] rounded-lg p-4 border border-white/5">
                  <p className="text-blue-200 text-sm font-semibold mb-2">Example 1</p>
                  <div className="grid grid-cols-[80px_1fr] gap-y-2 text-sm font-mono">
                    <span className="text-[#D1D5DB]">Input:</span>
                    <span className="text-white">s = ["h","e","l","l","o"]</span>
                    <span className="text-[#D1D5DB]">Output:</span>
                    <span className="text-white">s = ["o","l","l","e","h"]</span>
                  </div>
                </div>
                <div className="bg-[#162432] rounded-lg p-4 border border-white/5">
                  <p className="text-blue-200 text-sm font-semibold mb-2">Example 2</p>
                  <div className="grid grid-cols-[80px_1fr] gap-y-2 text-sm font-mono">
                    <span className="text-[#D1D5DB]">Input:</span>
                    <span className="text-white">s = ["H","a","n","n","a","h"]</span>
                    <span className="text-[#D1D5DB]">Output:</span>
                    <span className="text-white">s = ["h","a","n","n","a","H"]</span>
                  </div>
                </div>
              </div>

              {/* Constraints */}
              <div className="mt-8">
                <p className="text-white text-sm font-semibold mb-3">Constraints:</p>
                <ul className="list-disc pl-5 space-y-2 text-sm text-[#D1D5DB] marker:text-gray-500">
                  <li>1 &lt;= s.length &lt;= 10^5</li>
                  <li>s[i] is a printable ascii character.</li>
                </ul>
              </div>
            </div>
          </div>

          {/* RIGHT PANEL: Code Editor */}
          <div className="w-7/12 flex flex-col bg-[#1e1e1e] rounded-xl shadow-xl border border-white/10 overflow-hidden">
            {/* Editor Toolbar */}
            <div className="h-12 flex items-center justify-between px-4 border-b border-white/10 bg-[#252526]">
              <div className="flex items-center gap-4">
                <div className="relative group">
                  <button className="flex items-center gap-2 text-sm text-white font-medium hover:text-[#0474C4] transition-colors">
                    <span className="material-symbols-outlined text-blue-400 text-[18px]">code</span>
                    Python 3
                    <span className="material-symbols-outlined text-[16px]">expand_more</span>
                  </button>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <button className="p-1.5 text-gray-400 hover:text-white rounded transition-colors" title="Settings">
                  <span className="material-symbols-outlined text-[18px]">settings</span>
                </button>
                <button className="p-1.5 text-gray-400 hover:text-white rounded transition-colors" title="Reset Code">
                  <span className="material-symbols-outlined text-[18px]">restart_alt</span>
                </button>
                <button className="p-1.5 text-gray-400 hover:text-white rounded transition-colors" title="Fullscreen">
                  <span className="material-symbols-outlined text-[18px]">fullscreen</span>
                </button>
              </div>
            </div>

            {/* Code Area */}
            <div className="flex-1 flex overflow-hidden font-mono text-sm" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
              {/* Line Numbers */}
              <div className="w-12 bg-[#1e1e1e] border-r border-white/5 flex flex-col items-end pr-3 py-4 text-gray-600 select-none leading-6">
                <div>1</div><div>2</div><div>3</div><div>4</div><div>5</div><div>6</div><div>7</div><div>8</div><div>9</div><div>10</div><div>11</div><div>12</div>
              </div>
              
              {/* Code Input (Static Mock) */}
              <div className="flex-1 bg-[#1e1e1e] p-4 text-gray-300 leading-6 overflow-auto outline-none" contentEditable="true">
                <div><span className="syntax-keyword">class</span> <span className="syntax-class">Solution</span>:</div>
                <div>&nbsp;&nbsp;&nbsp;&nbsp;<span className="syntax-keyword">def</span> <span className="syntax-function">reverseString</span>(self, s: List[str]) -&gt; <span className="syntax-keyword">None</span>:</div>
                <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="syntax-string">"""</span></div>
                <div><span className="syntax-string">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Do not return anything, modify s in-place instead.</span></div>
                <div><span className="syntax-string">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"""</span></div>
                <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;left, right = <span className="syntax-number">0</span>, <span className="syntax-function">len</span>(s) - <span className="syntax-number">1</span></div>
                <br />
                <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="syntax-keyword">while</span> left &lt; right:</div>
                <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="syntax-comment"># Swap characters</span></div>
                <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;s[left], s[right] = s[right], s[left]</div>
                <br />
                <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="syntax-comment"># Move pointers towards center</span></div>
                <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;left += <span className="syntax-number">1</span></div>
                <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;right -= <span className="syntax-number">1</span></div>
              </div>
            </div>

            {/* Action Footer & Output */}
            <div className="border-t border-white/10 bg-[#1e1e1e]">
              {/* AI Hint Banner */}
              <div className="px-4 py-2 bg-blue-900/20 border-b border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs text-blue-200">
                  <span className="material-symbols-outlined text-[16px] text-amber-400">lightbulb</span>
                  <span>Tip: Focus on pointer manipulation for in-place modifications.</span>
                </div>
                <button className="text-xs text-blue-400 hover:text-white transition-colors">Dismiss</button>
              </div>

              {/* Output Console Preview */}
              <div className="px-4 py-3 bg-[#181818]">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Console</span>
                  <span className="h-px flex-1 bg-white/10"></span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <div className="flex items-center gap-1.5 text-emerald-400">
                    <span className="material-symbols-outlined text-[18px]">check_circle</span>
                    <span>Test Case 1 Passed</span>
                  </div>
                  <span className="text-gray-600">|</span>
                  <span className="text-gray-400">Runtime: 24ms</span>
                </div>
              </div>

              {/* Buttons */}
              <div className="p-4 flex justify-end gap-3 bg-[#252526] border-t border-white/10">
                <button className="px-5 py-2 rounded-lg border border-white/10 bg-white/5 text-white hover:bg-white/10 text-sm font-medium transition-colors flex items-center gap-2">
                  <span className="material-symbols-outlined text-[18px]">play_arrow</span>
                  Run Code
                </button>
                <button 
                  onClick={() => navigate('/coding-result')}
                  className="px-6 py-2 rounded-lg bg-[#0474C4] hover:bg-[#035a99] text-white text-sm font-medium shadow-lg shadow-blue-900/20 transition-all flex items-center gap-2"
                >
                  <span className="material-symbols-outlined text-[18px]">cloud_upload</span>
                  Submit
                </button>
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
};

export default LmsCodingPlatform;