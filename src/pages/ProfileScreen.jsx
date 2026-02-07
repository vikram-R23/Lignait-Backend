import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ProfileScreen = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("Baskar Manager");

  const handleNavigate = (page) => {
    if (page === 'Dashboard') navigate('/dashboard/main');
    else navigate(`/${page.toLowerCase().replace(/\s+/g, '-')}`);
  };

  return (
    <div className="bg-[#06457F] h-screen w-full flex overflow-hidden font-['Space_Grotesk'] antialiased text-white selection:bg-[#0474C4] selection:text-white relative">
      
      {/* Styles Injection */}
      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');
        .material-symbols-outlined { font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24; }
        .fill-1 { font-variation-settings: 'FILL' 1; }
        
        /* Custom Scrollbar */
        ::-webkit-scrollbar { width: 8px; }
        ::-webkit-scrollbar-track { background: #06457F; }
        ::-webkit-scrollbar-thumb { background: #0A4F8F; border-radius: 4px; }
        ::-webkit-scrollbar-thumb:hover { background: #0474C4; }

        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}} />

      {/* --- SIDEBAR --- */}
      <aside className="w-72 flex-shrink-0 flex flex-col border-r border-slate-300 bg-white relative z-20 font-['Space_Grotesk']">
        <div className="p-6 flex items-center gap-3 select-none">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#0474C4] to-cyan-400 flex items-center justify-center shadow-lg shadow-blue-500/30">
            <span className="material-symbols-outlined text-white text-xl">rocket_launch</span>
          </div>
          <span className="text-2xl font-black tracking-tight text-[#0F172A]">
            Career <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0474C4] to-cyan-500">Orbit</span>
          </span>
        </div>

        {/* Added no-scrollbar here to hide the scrollbar */}
        <nav className="flex-1 px-4 py-4 flex flex-col gap-2 overflow-y-auto no-scrollbar">
          <button onClick={() => handleNavigate('Dashboard')} className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-600 hover:bg-slate-50 transition-colors group text-left w-full">
            <span className="material-symbols-outlined group-hover:text-[#06457F] transition-colors">home</span>
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

          <button onClick={() => handleNavigate('LMS Courses')} className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-600 hover:bg-slate-50 transition-colors group text-left w-full">
            <span className="material-symbols-outlined group-hover:text-[#06457F] transition-colors">menu_book</span>
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
              <span className="text-sm font-bold text-slate-900 truncate">{userName}</span>
              <span className="text-[11px] font-medium text-slate-500 truncate">Pro Member</span>
            </div>
          </div>
        </div>
      </aside>

      {/* --- MAIN CONTENT --- */}
      <main className="flex-1 flex flex-col relative overflow-hidden bg-[#06457F]">
        
        {/* Header Bar */}
        <header className="h-20 flex items-center justify-between px-8 py-4 shrink-0 bg-[#06457F]/95 backdrop-blur-sm z-30 border-b border-white/5">
             <div className="flex items-center gap-4">
                <h1 className="text-2xl font-bold text-white">My Profile</h1>
             </div>
             <div className="flex items-center gap-4">
              <button className="relative p-2 text-[#D1D5DB] hover:text-white transition-colors rounded-full hover:bg-white/5">
                <span className="material-symbols-outlined">notifications</span>
                <span className="absolute top-2.5 right-2.5 size-2 bg-[#0474C4] rounded-full border border-[#06457F]"></span>
              </button>
            </div>
        </header>

        <div className="flex-1 overflow-y-auto pb-32">
            <div className="max-w-6xl mx-auto px-8 py-10 space-y-8">
                
                {/* Profile Header Card */}
                <section className="bg-[#0C5494]/60 backdrop-blur-sm rounded-xl p-8 border border-white/10 shadow-xl">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                        <div className="flex flex-col md:flex-row items-center gap-6">
                            <div className="relative">
                                <div className="w-32 h-32 rounded-full border-4 border-[#0474C4] overflow-hidden bg-white/20 flex items-center justify-center">
                                     <span className="material-symbols-outlined text-6xl text-white/80">person</span>
                                </div>
                                <div className="absolute bottom-1 right-1 bg-green-500 w-6 h-6 rounded-full border-4 border-[#0C5494]"></div>
                            </div>
                            <div className="text-center md:text-left">
                                <div className="flex flex-col md:flex-row items-center gap-3">
                                    <h2 className="text-3xl font-bold">{userName}</h2>
                                    <span className="px-3 py-1 bg-[#0474C4]/30 text-white text-xs font-bold rounded-full border border-[#0474C4]/40 uppercase tracking-wider">Job Seeker</span>
                                </div>
                                <p className="text-gray-300 text-lg mt-1 font-medium">Frontend Engineer</p>
                                <p className="text-gray-400 text-sm mt-1 flex items-center justify-center md:justify-start gap-1">
                                    <span className="material-symbols-outlined text-sm">location_on</span> San Francisco, CA
                                </p>
                            </div>
                        </div>
                        
                        {/* --- NAVIGATION TO EDIT PROFILE --- */}
                        <button 
                            onClick={() => navigate('/edit-profile')} 
                            className="bg-teal-500 hover:bg-teal-600 text-white px-6 py-3 rounded-lg font-bold flex items-center gap-2 transition-all shadow-lg shadow-teal-500/20"
                        >
                            <span className="material-symbols-outlined text-sm">edit</span>
                            Edit Profile
                        </button>
                    </div>
                </section>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column: Details & Skills */}
                    <div className="lg:col-span-2 space-y-6">
                        
                        {/* Profile Details Form */}
                        <div className="bg-[#0C5494]/60 backdrop-blur-sm rounded-xl p-6 border border-white/10 shadow-lg">
                            <h3 className="text-xl font-bold mb-6 flex items-center gap-2 text-white">
                                <span className="material-symbols-outlined text-teal-400">person_outline</span>
                                Profile Details
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-gray-300">Full Name</label>
                                    <input className="w-full bg-[#032b4f] border border-white/10 rounded-lg p-3 text-white focus:ring-2 focus:ring-teal-400 focus:border-transparent outline-none transition-all" type="text" defaultValue={userName} />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-gray-300">Target Career Role</label>
                                    <input className="w-full bg-[#032b4f] border border-white/10 rounded-lg p-3 text-white focus:ring-2 focus:ring-teal-400 focus:border-transparent outline-none transition-all" type="text" defaultValue="Frontend Engineer" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-gray-300">Location</label>
                                    <input className="w-full bg-[#032b4f] border border-white/10 rounded-lg p-3 text-white focus:ring-2 focus:ring-teal-400 focus:border-transparent outline-none transition-all" type="text" defaultValue="San Francisco, CA" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-gray-300">Graduation Year</label>
                                    <input className="w-full bg-[#032b4f] border border-white/10 rounded-lg p-3 text-white focus:ring-2 focus:ring-teal-400 focus:border-transparent outline-none transition-all" type="text" defaultValue="2024" />
                                </div>
                                <div className="md:col-span-2 space-y-2">
                                    <label className="text-sm font-semibold text-gray-300">Current Phase (Read-only)</label>
                                    <div className="w-full bg-[#032b4f]/50 border border-white/5 rounded-lg p-3 text-gray-400 flex items-center gap-2 cursor-not-allowed">
                                        <span className="material-symbols-outlined text-sm">lock</span>
                                        Portfolio Optimization Phase
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Skills Section */}
                        <div className="bg-[#0C5494]/60 backdrop-blur-sm rounded-xl p-6 border border-white/10 shadow-lg">
                            <div className="flex justify-between items-center mb-4">
                                <div>
                                    <h3 className="text-xl font-bold flex items-center gap-2 text-white">
                                        <span className="material-symbols-outlined text-purple-400">psychology</span>
                                        Skills
                                    </h3>
                                    <p className="text-gray-400 text-xs mt-1">These skills shape your roadmap and recommendations.</p>
                                </div>
                            </div>
                            <div className="bg-purple-900/20 p-5 rounded-xl border border-purple-500/10">
                                <div className="flex flex-wrap gap-2">
                                    {['React', 'JavaScript', 'UI Design', 'Tailwind CSS', 'TypeScript'].map((skill) => (
                                        <span key={skill} className="bg-purple-600/20 text-purple-200 border border-purple-500/30 px-3 py-1.5 rounded-full text-sm font-medium flex items-center gap-2">
                                            {skill} <span className="material-symbols-outlined text-xs cursor-pointer hover:text-white">close</span>
                                        </span>
                                    ))}
                                    <button className="bg-white/5 border border-white/10 border-dashed px-3 py-1.5 rounded-full text-sm font-medium flex items-center gap-2 hover:bg-white/10 transition-colors text-white">
                                        <span className="material-symbols-outlined text-xs">add</span> Add Skill
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Activity Snapshot */}
                    <div className="space-y-6">
                        <h3 className="text-xl font-bold flex items-center gap-2 px-2 text-white">
                            <span className="material-symbols-outlined text-[#0474C4]">insights</span>
                            Activity Snapshot
                        </h3>
                        <div className="grid grid-cols-1 gap-4">
                            {/* Roadmap Progress */}
                            <div className="bg-[#0C5494]/60 backdrop-blur-sm rounded-xl overflow-hidden border border-white/10 shadow-lg hover:border-emerald-500/50 transition-colors">
                                <div className="bg-emerald-500/10 px-5 py-2 border-b border-emerald-500/10 flex items-center justify-between">
                                    <p className="text-emerald-400 text-[10px] font-bold uppercase tracking-widest">Roadmap</p>
                                    <span className="material-symbols-outlined text-emerald-500 text-lg">analytics</span>
                                </div>
                                <div className="p-5">
                                    <p className="text-2xl font-bold">Phase 2</p>
                                    <div className="mt-3 w-full bg-white/10 rounded-full h-2">
                                        <div className="bg-emerald-500 h-2 rounded-full" style={{ width: '45%' }}></div>
                                    </div>
                                    <p className="text-xs text-right mt-1 text-emerald-400">45% Completed</p>
                                </div>
                            </div>

                            {/* Coding Stats */}
                            <div className="bg-[#0C5494]/60 backdrop-blur-sm rounded-xl overflow-hidden border border-white/10 shadow-lg hover:border-amber-500/50 transition-colors">
                                <div className="bg-amber-500/10 px-5 py-2 border-b border-amber-500/10 flex items-center justify-between">
                                    <p className="text-amber-400 text-[10px] font-bold uppercase tracking-widest">Coding</p>
                                    <span className="material-symbols-outlined text-amber-500 text-lg">code_blocks</span>
                                </div>
                                <div className="p-5">
                                    <div className="flex items-baseline gap-2">
                                        <p className="text-2xl font-bold">12</p>
                                        <p className="text-gray-400 text-sm">Problems</p>
                                    </div>
                                    <p className="text-xs text-amber-400 mt-2 flex items-center gap-1">
                                        <span className="material-symbols-outlined text-xs">trending_up</span> +2 this week
                                    </p>
                                </div>
                            </div>

                            {/* Interviews */}
                            <div className="bg-[#0C5494]/60 backdrop-blur-sm rounded-xl overflow-hidden border border-white/10 shadow-lg hover:border-indigo-500/50 transition-colors">
                                <div className="bg-indigo-500/10 px-5 py-2 border-b border-indigo-500/10 flex items-center justify-between">
                                    <p className="text-indigo-400 text-[10px] font-bold uppercase tracking-widest">Interviews</p>
                                    <span className="material-symbols-outlined text-indigo-500 text-lg">record_voice_over</span>
                                </div>
                                <div className="p-5">
                                    <div className="flex items-baseline gap-2">
                                        <p className="text-2xl font-bold">3</p>
                                        <p className="text-gray-400 text-sm">Sessions</p>
                                    </div>
                                    <p className="text-xs text-indigo-400 mt-2">Next: System Design (Tues)</p>
                                </div>
                            </div>

                            {/* Coins */}
                            <div className="bg-[#0C5494]/60 backdrop-blur-sm rounded-xl overflow-hidden border border-white/10 shadow-lg hover:border-yellow-500/50 transition-colors">
                                <div className="bg-yellow-500/10 px-5 py-2 border-b border-yellow-500/10 flex items-center justify-between">
                                    <p className="text-yellow-500 text-[10px] font-bold uppercase tracking-widest">Credit Coins</p>
                                    <span className="material-symbols-outlined text-yellow-500 text-lg">monetization_on</span>
                                </div>
                                <div className="p-5">
                                    <div className="flex items-baseline gap-2">
                                        <p className="text-2xl font-bold text-yellow-500">150</p>
                                        <p className="text-gray-400 text-sm">Orbit Coins</p>
                                    </div>
                                    <p className="text-xs text-yellow-500 mt-2 hover:underline cursor-pointer">Visit Coin Shop</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        {/* Footer Actions */}
        <div className="absolute bottom-0 left-0 right-0 p-6 bg-[#06457F]/90 backdrop-blur-2xl border-t border-white/10 flex items-center justify-center gap-4 z-10">
            <button onClick={() => navigate('/dashboard/main')} className="text-gray-300 hover:text-white font-semibold transition-colors flex items-center gap-2 mr-auto">
                <span className="material-symbols-outlined">arrow_back</span>
                Back to Dashboard
            </button>
            <div className="flex gap-4">
                <button className="bg-white/5 hover:bg-white/10 text-white px-6 py-2.5 rounded-lg font-bold transition-all border border-white/10">
                    Cancel Changes
                </button>
                <button className="bg-[#0474C4] hover:bg-[#0360a3] text-white px-8 py-2.5 rounded-lg font-bold shadow-lg shadow-blue-500/20 transition-all">
                    Save Profile
                </button>
            </div>
        </div>

      </main>
    </div>
  );
};

export default ProfileScreen;