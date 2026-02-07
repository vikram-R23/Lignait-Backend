import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Settings = () => {
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
        
        /* --- UNIVERSAL NO SCROLLBAR --- */
        .no-scrollbar::-webkit-scrollbar {
            display: none;
        }
        .no-scrollbar {
            -ms-overflow-style: none;  /* IE and Edge */
            scrollbar-width: none;  /* Firefox */
        }

        /* Custom Main Content Scrollbar (Visible but styled) */
        ::-webkit-scrollbar { width: 8px; }
        ::-webkit-scrollbar-track { background: #06457F; }
        ::-webkit-scrollbar-thumb { background: #0A4F8F; border-radius: 4px; }
        ::-webkit-scrollbar-thumb:hover { background: #0474C4; }

        /* Card Hover Effects */
        .card-base {
            background-color: rgba(255, 255, 255, 0.05);
            backdrop-filter: blur(12px);
            border: 1px solid rgba(255, 255, 255, 0.1);
            transition: all 0.3s ease;
        }
        .hover-amber:hover { border-color: rgba(251, 191, 36, 0.4); box-shadow: 0 0 25px rgba(251, 191, 36, 0.1); }
        .hover-teal:hover { border-color: rgba(45, 212, 191, 0.4); box-shadow: 0 0 25px rgba(45, 212, 191, 0.1); }
        .hover-purple:hover { border-color: rgba(168, 85, 247, 0.4); box-shadow: 0 0 25px rgba(168, 85, 247, 0.1); }
        .hover-emerald:hover { border-color: rgba(16, 185, 129, 0.4); box-shadow: 0 0 25px rgba(16, 185, 129, 0.1); }
        .hover-orange:hover { border-color: rgba(251, 146, 60, 0.4); box-shadow: 0 0 25px rgba(251, 146, 60, 0.1); }
      `}} />

      {/* --- LEFT SIDEBAR --- */}
      <aside className="w-72 flex-shrink-0 flex flex-col border-r border-slate-300 bg-white relative z-20 shadow-xl h-full">
        <div className="p-6 flex items-center gap-3 select-none shrink-0">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#0474C4] to-cyan-400 flex items-center justify-center shadow-lg shadow-blue-500/30">
            <span className="material-symbols-outlined text-white text-xl">rocket_launch</span>
          </div>
          <span className="text-2xl font-black tracking-tight text-[#0F172A]">
            Career <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0474C4] to-cyan-500">Orbit</span>
          </span>
        </div>

        {/* Navigation - No Scrollbar applied here */}
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

          {/* --- INTERNSHIP OPPORTUNITIES --- */}
          <button onClick={() => handleNavigate('Internships Jobs')} className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-600 hover:bg-slate-50 transition-colors group text-left w-full">
            <span className="material-symbols-outlined group-hover:text-[#06457F] transition-colors">work</span>
            <span className="font-medium group-hover:text-[#06457F] transition-colors">Internships & Jobs</span>
          </button>

          <button onClick={() => handleNavigate('LMS Courses')} className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-600 hover:bg-slate-50 transition-colors group text-left w-full">
            <span className="material-symbols-outlined group-hover:text-[#06457F] transition-colors">book</span>
            <span className="font-medium group-hover:text-[#06457F] transition-colors">LMS Courses</span>
          </button>
          <button onClick={() => handleNavigate('Practice Ground')} className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-600 hover:bg-slate-50 transition-colors group text-left w-full">
            <span className="material-symbols-outlined group-hover:text-[#06457F] transition-colors">code</span>
            <span className="font-medium group-hover:text-[#06457F] transition-colors">Practice Ground</span>
          </button>
          
          {/* Active Settings Tab */}
          <button className="flex items-center gap-3 px-4 py-3 rounded-lg bg-[#06457F] text-white shadow-md text-left w-full">
            <span className="material-symbols-outlined fill-1">settings</span>
            <span className="font-medium">Settings</span>
          </button>
        </nav>

        {/* --- PROFILE SECTION (COMPACT & FIXED) --- */}
        <div className="p-3 border-t border-slate-300 shrink-0 mt-auto bg-white z-20">
          <div 
            onClick={() => navigate('/profile')} 
            className="flex items-center gap-3 px-2 py-1.5 rounded-lg cursor-pointer hover:bg-slate-50 transition-colors"
          >
            {/* Reduced size from size-10 to size-9 */}
            <div className="size-9 rounded-full bg-cover bg-center border border-slate-300 shrink-0" style={{ backgroundImage: "url('https://ui-avatars.com/api/?name=B+&background=06457F&color=fff')" }}></div>
            <div className="flex flex-col min-w-0">
              <span className="text-sm font-semibold text-slate-900 truncate">{userName}</span>
              <span className="text-[11px] text-slate-600 truncate">Pro Member</span>
            </div>
          </div>
        </div>
      </aside>

      {/* --- MAIN CONTENT --- */}
      <main className="flex-1 flex flex-col relative overflow-hidden bg-[#06457F]">
        
        {/* Header Bar */}
        <header className="h-20 flex items-center justify-between px-8 py-4 shrink-0 bg-[#06457F]/95 backdrop-blur-sm z-30 border-b border-white/5">
             <div className="flex items-center gap-4">
                <h1 className="text-2xl font-bold text-white">Settings</h1>
             </div>
             <div className="flex items-center gap-4">
              <button className="relative p-2 text-[#D1D5DB] hover:text-white transition-colors rounded-full hover:bg-white/5">
                <span className="material-symbols-outlined">notifications</span>
                <span className="absolute top-2.5 right-2.5 size-2 bg-[#0474C4] rounded-full border border-[#06457F]"></span>
              </button>
            </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto pb-32 no-scrollbar">
            <div className="max-w-4xl mx-auto px-8 py-12">
                <div className="mb-10">
                    <h2 className="text-4xl font-black tracking-tight mb-2 text-white">Preferences</h2>
                    <p className="text-blue-100/70 text-lg">Manage your account preferences and app behavior.</p>
                </div>

                <div className="space-y-6">
                    {/* Notifications Section */}
                    <section className="card-base hover-amber rounded-xl p-6">
                        <div className="flex items-center gap-3 mb-6">
                            <span className="material-symbols-outlined text-amber-400 bg-amber-400/10 p-2 rounded-lg">notifications_active</span>
                            <h3 className="text-xl font-bold text-white">Notifications</h3>
                        </div>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between py-2 border-b border-white/5">
                                <div>
                                    <p className="font-medium text-white">Learning reminders</p>
                                    <p className="text-sm text-blue-100/50">Get notified about your study schedule</p>
                                </div>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input defaultChecked className="sr-only peer" type="checkbox"/>
                                    <div className="w-11 h-6 bg-white/20 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#00FFAB]"></div>
                                </label>
                            </div>
                            <div className="flex items-center justify-between py-2 border-b border-white/5">
                                <div>
                                    <p className="font-medium text-white">Mock interview reminders</p>
                                    <p className="text-sm text-blue-100/50">Alerts for your scheduled sessions</p>
                                </div>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input defaultChecked className="sr-only peer" type="checkbox"/>
                                    <div className="w-11 h-6 bg-white/20 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#00FFAB]"></div>
                                </label>
                            </div>
                            <div className="flex items-center justify-between py-2">
                                <div>
                                    <p className="font-medium text-white">Opportunity alerts</p>
                                    <p className="text-sm text-blue-100/50">New job and internship postings</p>
                                </div>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input defaultChecked className="sr-only peer" type="checkbox"/>
                                    <div className="w-11 h-6 bg-white/20 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#00FFAB]"></div>
                                </label>
                            </div>
                        </div>
                    </section>

                    {/* App Preferences Section */}
                    <section className="card-base hover-teal rounded-xl p-6">
                        <div className="flex items-center gap-3 mb-6">
                            <span className="material-symbols-outlined text-teal-400 bg-teal-400/10 p-2 rounded-lg">tune</span>
                            <h3 className="text-xl font-bold text-white">App Preferences</h3>
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-medium text-blue-100/70">Default landing page</label>
                            <div className="relative">
                                <select className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2.5 text-white focus:ring-2 focus:ring-teal-400 focus:border-transparent outline-none appearance-none cursor-pointer">
                                    <option className="bg-[#06457F]">Dashboard</option>
                                    <option className="bg-[#06457F]">Career Roadmap</option>
                                    <option className="bg-[#06457F]">LMS Courses</option>
                                </select>
                                <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-white/40 pointer-events-none">expand_more</span>
                            </div>
                        </div>
                    </section>

                    {/* Account Section */}
                    <section className="card-base hover-purple rounded-xl p-6">
                        <div className="flex items-center gap-3 mb-6">
                            <span className="material-symbols-outlined text-purple-400 bg-purple-400/10 p-2 rounded-lg">account_circle</span>
                            <h3 className="text-xl font-bold text-white">Account</h3>
                        </div>
                        <div className="flex items-center justify-between mb-8 p-4 bg-white/5 rounded-lg border border-white/5">
                            <div className="flex items-center gap-3">
                                <span className="material-symbols-outlined text-purple-400/60">login</span>
                                <div>
                                    <p className="text-sm text-blue-100/50">Login method</p>
                                    <p className="font-medium text-white">Google Authentication</p>
                                </div>
                            </div>
                            <button onClick={() => navigate('/login')} className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-sm transition-colors font-semibold text-white">
                                Logout
                            </button>
                        </div>
                        <div className="flex justify-end">
                            <button className="text-red-400 hover:text-red-300 text-sm font-medium flex items-center gap-1 transition-colors">
                                <span className="material-symbols-outlined text-[18px]">delete_forever</span>
                                Delete Account
                            </button>
                        </div>
                    </section>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Privacy Section */}
                        <section className="card-base hover-emerald rounded-xl p-6">
                            <div className="flex items-center gap-3 mb-4">
                                <span className="material-symbols-outlined text-emerald-400 bg-emerald-400/10 p-1.5 rounded-lg">shield</span>
                                <h3 className="text-lg font-bold text-white">Privacy & Data</h3>
                            </div>
                            <div className="space-y-3">
                                <a className="flex items-center justify-between text-blue-100/70 hover:text-white transition-colors py-2 border-b border-white/5 group cursor-pointer">
                                    <span className="text-sm">Privacy Policy</span>
                                    <span className="material-symbols-outlined text-[20px] group-hover:translate-x-1 transition-transform">chevron_right</span>
                                </a>
                                <a className="flex items-center justify-between text-blue-100/70 hover:text-white transition-colors py-2 group cursor-pointer">
                                    <span className="text-sm">Terms & Conditions</span>
                                    <span className="material-symbols-outlined text-[20px] group-hover:translate-x-1 transition-transform">chevron_right</span>
                                </a>
                            </div>
                        </section>

                        {/* Help Section */}
                        <section className="card-base hover-orange rounded-xl p-6">
                            <div className="flex items-center gap-3 mb-4">
                                <span className="material-symbols-outlined text-orange-400 bg-orange-400/10 p-1.5 rounded-lg">help</span>
                                <h3 className="text-lg font-bold text-white">Help & Support</h3>
                            </div>
                            <div className="space-y-2">
                                <a className="flex items-center justify-between text-blue-100/70 hover:text-white transition-colors py-1 group cursor-pointer">
                                    <div className="flex items-center gap-3">
                                        <span className="material-symbols-outlined text-[18px]">quiz</span>
                                        <span className="text-sm">FAQs</span>
                                    </div>
                                    <span className="material-symbols-outlined text-[18px] opacity-0 group-hover:opacity-100 transition-opacity">open_in_new</span>
                                </a>
                                <a className="flex items-center justify-between text-blue-100/70 hover:text-white transition-colors py-1 group cursor-pointer">
                                    <div className="flex items-center gap-3">
                                        <span className="material-symbols-outlined text-[18px]">support_agent</span>
                                        <span className="text-sm">Contact Support</span>
                                    </div>
                                    <span className="material-symbols-outlined text-[18px] opacity-0 group-hover:opacity-100 transition-opacity">open_in_new</span>
                                </a>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </div>

        {/* Footer Actions */}
        <div className="absolute bottom-0 left-0 right-0 p-6 bg-[#06457F]/90 backdrop-blur-2xl border-t border-white/10 flex items-center justify-center gap-4 z-10">
            <button className="px-10 py-3 bg-[#0474C4] hover:bg-[#0360a3] text-white font-bold rounded-lg transition-all shadow-lg shadow-black/20 transform active:scale-95">
                Save Settings
            </button>
            <button onClick={() => navigate('/dashboard/main')} className="px-10 py-3 bg-white/5 hover:bg-white/10 text-white font-semibold rounded-lg transition-all border border-white/10">
                Back to Dashboard
            </button>
        </div>

      </main>
    </div>
  );
};

export default Settings;