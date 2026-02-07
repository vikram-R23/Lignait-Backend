import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

// ====================================================================
// SESSION CACHE VARIABLE
// ====================================================================
let sessionRoadmapStatus = false; 

const DashboardMain = () => {
  const navigate = useNavigate();
  const location = useLocation(); 

  // --------------------------------
  // DASHBOARD STATE
  // --------------------------------
  const [isRoadmapReady, setIsRoadmapReady] = useState(sessionRoadmapStatus);
  const [showRoadmapModal, setShowRoadmapModal] = useState(false);
  
  // Store Real Roadmap Data
  const [roadmapData, setRoadmapData] = useState(null);

  // User Profile State (Fixes "Hi undefined")
  const [userProfile, setUserProfile] = useState({
    firstName: 'Guest',
    lastName: '',
    careerGoal: '',
    skills: []
  });

  const [currentPhase, setCurrentPhase] = useState(
    isRoadmapReady ? "Phase 1: Foundations" : "Career Roadmap"
  );
  const [phaseProgress, setPhaseProgress] = useState(
    isRoadmapReady ? 15 : 0
  );
  const [aiInsight, setAiInsight] = useState(
    isRoadmapReady 
      ? "Roadmap active! Focus on mastering the basics this week." 
      : "Welcome to Career Orbit! Let's generate your personalized roadmap to get started."
  );
  
  const [showToast, setShowToast] = useState(false);

  // --------------------------------
  // CHATBOT STATE
  // --------------------------------
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const [isTyping, setIsTyping] = useState(false); 
  const [chatMessages, setChatMessages] = useState([]); 
  const chatEndRef = useRef(null);

  // Auto-scroll Chat
  useEffect(() => {
    if (isChatOpen && chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [chatMessages, isChatOpen, isExpanded, isTyping]);

  // Check if Roadmap was passed from Onboarding
  useEffect(() => {
    if (location.state?.roadmap) {
        setRoadmapData(location.state.roadmap);
        setIsRoadmapReady(true);
        sessionRoadmapStatus = true;
        setCurrentPhase(location.state.roadmap.steps?.[0]?.phase || "Phase 1: Start");
        setAiInsight("Roadmap Ready! Check your new learning path.");
    }
  }, [location.state]);

  // ✅ FETCH USER PROFILE ON MOUNT (Fixes Personalization)
  useEffect(() => {
    const fetchUserProfile = async () => {
        const token = localStorage.getItem('token');
        const localUser = JSON.parse(localStorage.getItem('user'));

        // 1. Set basic info from local storage first (for speed)
        if (localUser) {
            setUserProfile(prev => ({ 
                ...prev, 
                firstName: localUser.firstName || "Guest", 
                lastName: localUser.lastName 
            }));
        }

        if (!token) return;

        // 2. Fetch full details (Goal, Skills) from Database
        try {
            const response = await fetch('http://localhost:5000/api/profile', {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            
            if (response.ok) {
                const data = await response.json();
                setUserProfile({
                    firstName: data.firstName || localUser?.firstName || 'Guest',
                    lastName: data.lastName || localUser?.lastName || '',
                    careerGoal: data.careerGoal || '',
                    skills: data.skills || []
                });
                
                // Initialize chat message with REAL name
                setChatMessages([
                    { id: 1, sender: 'ai', text: isRoadmapReady 
                        ? 'Welcome back! Your roadmap is active. How can I help?' 
                        : `Hi ${data.firstName || 'there'}! I am your AI Career Assistant. Tell me your career goal (e.g., "Full Stack Developer") to generate a roadmap.` 
                    }
                ]);
            }
        } catch (error) {
            console.error("Error fetching profile:", error);
            setChatMessages([
                { id: 1, sender: 'ai', text: `Hi there! I am your AI Career Assistant. Tell me your career goal to generate a roadmap.` }
            ]);
        }
    };

    fetchUserProfile();
  }, [isRoadmapReady]);


  // --- REAL LLM LOGIC (Connected to Backend) ---
  const mockLlmResponse = async (userText) => {
    const delay = Math.floor(Math.random() * 500) + 1000;
    await new Promise(resolve => setTimeout(resolve, delay));

    const lowerInput = userText.toLowerCase();

    // Check if this is a request to generate a roadmap
    const isGenerationRequest = lowerInput.includes('generate') || lowerInput.includes('roadmap') || (!isRoadmapReady && userText.length > 3);

    if (!isRoadmapReady && isGenerationRequest) {
      try {
          const token = localStorage.getItem('token');
          if (!token) return "Please log in to generate a roadmap.";

          // ✅ Use Profile Goal if available, otherwise use what user typed
          const effectiveGoal = userProfile.careerGoal ? userProfile.careerGoal : userText;

          // Call AI Endpoint
          const aiRes = await fetch('http://localhost:5000/api/ai/roadmap', {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                goal: effectiveGoal,
                currentRole: "Student", 
                skills: userProfile.skills
            })
          });

          const aiResult = await aiRes.json();

          if (!aiResult.success) throw new Error("AI Failed");

          // Update State with Real Data
          sessionRoadmapStatus = true; 
          setIsRoadmapReady(true);     
          setRoadmapData(aiResult.data);
          
          setCurrentPhase(aiResult.data.steps?.[0]?.phase || "Phase 1: Foundation");
          setPhaseProgress(0);
          setAiInsight(`Roadmap generated for ${effectiveGoal}!`);
          
          setTimeout(() => setShowRoadmapModal(true), 1500);

          return `I've successfully generated your ${effectiveGoal} roadmap! Opening it now...`;

      } catch (error) {
          console.error("AI Generation Error:", error);
          return "I encountered an error connecting to the server. Please ensure the backend is running on Port 5000.";
      }
    }

    // Standard Responses
    if (lowerInput.includes('resume')) return "Opening the AI Resume Builder...";
    if (lowerInput.includes('mentor')) return "Redirecting you to our mentorship network...";
    
    return "I'm here to help. Type your career goal (e.g., 'Full Stack Developer') to generate a roadmap.";
  };

  const handleChatSubmit = async (e, overrideText = null) => {
    if (e) e.preventDefault();
    const textToSend = overrideText || chatInput;
    if (!textToSend.trim()) return;

    const newUserMsg = { id: Date.now(), sender: 'user', text: textToSend };
    setChatMessages(prev => [...prev, newUserMsg]);
    setChatInput("");
    setIsTyping(true); 

    const lowerText = textToSend.toLowerCase();
    
    // Navigation Keywords
    if(overrideText === 'Resume Builder' || lowerText.includes('resume')) { setTimeout(() => { navigate('/resume'); setIsTyping(false); }, 1500); }
    else if(overrideText === 'Find a Mentor' || lowerText.includes('mentor')) { setTimeout(() => { navigate('/mentors'); setIsTyping(false); }, 1500); }
    else if(overrideText === 'Mock Interview' || lowerText.includes('interview')) { setTimeout(() => { navigate('/mock-interview'); setIsTyping(false); }, 1500); }
    else if(overrideText === 'LMS Courses' || lowerText.includes('course')) { setTimeout(() => { navigate('/lms-courses'); setIsTyping(false); }, 1500); }
    else if(overrideText === 'Practice Ground' || lowerText.includes('practice')) { setTimeout(() => { navigate('/practice-ground'); setIsTyping(false); }, 1500); }
    else if(overrideText === 'View Roadmap' && isRoadmapReady) { setShowRoadmapModal(true); setIsTyping(false); return; }

    try {
        const aiResponseText = await mockLlmResponse(textToSend);
        const newAiMsg = { id: Date.now() + 1, sender: 'ai', text: aiResponseText };
        setChatMessages(prev => [...prev, newAiMsg]);
    } catch (error) {
        console.error("Chat Error", error);
        setChatMessages(prev => [...prev, { id: Date.now() + 1, sender: 'ai', text: "Sorry, I couldn't connect to the AI server." }]);
    } finally {
        setIsTyping(false); 
    }
  };

  const handleRoadmapNavigation = () => {
    if (!isRoadmapReady) {
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000); 
    } else {
      setShowRoadmapModal(true);
    }
  };

  const handleGenerateClick = () => {
    setIsChatOpen(true);
    setIsExpanded(true); 
    // Automatically trigger if the user has a goal in their profile
    if (!isRoadmapReady && userProfile.careerGoal) {
        handleChatSubmit(null, "Generate my roadmap");
    }
  };

  const handleNavigate = (page) => {
    if (page === 'Dashboard') navigate('/dashboard/main'); 
    else navigate(`/${page.toLowerCase().replace(/\s+/g, '-')}`);
  };

  return (
    <div className="bg-[#06457F] h-screen w-full flex overflow-hidden font-['Space_Grotesk'] antialiased text-white selection:bg-[#0474C4] selection:text-white relative">
      
      {/* Toast Alert */}
      <div className={`fixed top-6 left-1/2 -translate-x-1/2 z-[200] transition-all duration-300 ${showToast ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'}`}>
        <div className="bg-red-500 text-white px-6 py-3 rounded-lg shadow-2xl flex items-center gap-3 border border-red-400">
            <span className="material-symbols-outlined text-[20px]">warning</span>
            <span className="text-sm font-bold">Please generate your roadmap first via the AI Assistant.</span>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');
        .material-symbols-outlined { font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24; }
        .fill-1 { font-variation-settings: 'FILL' 1; }
        
        /* --- UNIVERSAL NO SCROLLBAR --- */
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }

        ::-webkit-scrollbar { width: 8px; }
        ::-webkit-scrollbar-track { background: #06457F; }
        ::-webkit-scrollbar-thumb { background: #0A4F8F; border-radius: 4px; }
        ::-webkit-scrollbar-thumb:hover { background: #0474C4; }
        
        @keyframes slideUpFade { from { transform: translateY(20px) scale(0.95); opacity: 0; } to { transform: translateY(0) scale(1); opacity: 1; } }
        .chat-animate { animation: slideUpFade 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .message-bubble-ai { background-color: rgba(4, 116, 196, 0.25); box-shadow: 0 0 10px rgba(4, 116, 196, 0.4), inset 0 0 4px rgba(255, 255, 255, 0.2); border: 1.5px solid rgba(255, 255, 255, 0.4); color: white; }
        .message-bubble-user { background-color: rgba(255, 255, 255, 0.1); border: 1px solid rgba(255, 255, 255, 0.2); color: #E2E8F0; }
        @keyframes blink { 0% { opacity: 0.2; } 20% { opacity: 1; } 100% { opacity: 0.2; } }
        .typing-dot { animation: blink 1.4s infinite both; }
        .typing-dot:nth-child(2) { animation-delay: 0.2s; }
        .typing-dot:nth-child(3) { animation-delay: 0.4s; }
        
        .roadmap-modal-bg { background: radial-gradient(circle at 50% 50%, #06457F 0%, #042D52 45%, #020B1A 100%); }
        .path-glow { filter: drop-shadow(0 0 8px rgba(34, 211, 238, 0.6)) drop-shadow(0 0 15px rgba(168, 85, 247, 0.4)); }
        .node-pulse-active { box-shadow: 0 0 0 0 rgba(34, 211, 238, 0.7); animation: pulse-glow 3s infinite; }
        @keyframes pulse-glow { 0% { box-shadow: 0 0 0 0 rgba(34, 211, 238, 0.7); transform: scale(1); } 70% { box-shadow: 0 0 0 25px rgba(34, 211, 238, 0); transform: scale(1.05); } 100% { box-shadow: 0 0 0 0 rgba(34, 211, 238, 0); transform: scale(1); } }
        .glass-morphism { background: rgba(15, 23, 42, 0.9); backdrop-filter: blur(24px); border: 1px solid rgba(255, 255, 255, 0.1); }
        .floating-particle { position: absolute; background: white; border-radius: 50%; filter: blur(1px); pointer-events: none; opacity: 0.3; }
        
        /* Close Icon Hover */
        .close-icon-hover:hover { background: rgba(255, 255, 255, 0.1); box-shadow: 0 0 15px rgba(255, 255, 255, 0.1); }
        
        /* Your Custom CSS Variables for Roadmap */
        :root {
            --deep-blue: #020B1A;
            --primary-blue: #0474C4;
            --path-cyan: #22D3EE;
            --path-purple: #A855F7;
            --node-completed: #22C55E;
            --glass-card: rgba(15, 23, 42, 0.9);
        }
      `}} />

      {/* --- ROADMAP MODAL --- */}
      {showRoadmapModal && (
        <div className="fixed inset-0 z-[300] roadmap-modal-bg flex flex-col animate-in fade-in zoom-in duration-300 font-['Inter']">
            <header className="w-full px-8 py-6 flex items-center justify-between z-50">
                <div className="flex items-center gap-4">
                    <button 
                        onClick={() => setShowRoadmapModal(false)}
                        className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 transition-all group"
                    >
                        <span className="material-symbols-outlined text-white/70 group-hover:text-white transition-colors">arrow_back</span>
                        <span className="text-sm font-semibold text-white/70 group-hover:text-white">Back to Dashboard</span>
                    </button>
                </div>
                <div className="text-center">
                    <h1 className="text-2xl font-extrabold tracking-tight text-white">Your Career Roadmap</h1>
                    <p className="text-blue-100/60 text-sm mt-0.5">A step-by-step path from beginner to professional</p>
                </div>
                <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full border border-white/20 overflow-hidden shadow-lg bg-[#06457F]">
                         <span className="material-symbols-outlined text-white text-2xl flex items-center justify-center h-full">person</span>
                    </div>
                </div>
            </header>

            <main className="flex-1 relative w-full flex items-center justify-center overflow-hidden">
                <div className="floating-particle w-1.5 h-1.5 top-1/4 left-1/4"></div>
                <div className="floating-particle w-1 h-1 bottom-1/3 right-1/4"></div>
                <div className="floating-particle w-2 h-2 top-1/2 right-1/3"></div>
                <div className="floating-particle w-0.5 h-0.5 bottom-1/4 left-1/3"></div>
                
                <div className="relative w-[90%] h-[70%] max-w-6xl">
                    <svg className="absolute inset-0 w-full h-full path-glow pointer-events-none z-10" preserveAspectRatio="none" viewBox="0 0 1000 400">
                        <defs>
                            <linearGradient id="pathGradient" x1="0%" x2="100%" y1="0%" y2="0%">
                                <stop offset="0%" stopColor="#22D3EE"></stop>
                                <stop offset="100%" stopColor="#A855F7"></stop>
                            </linearGradient>
                        </defs>
                        <path className="opacity-80" d="M 100 300 C 200 300, 200 100, 300 100 C 400 100, 400 300, 500 300 C 600 300, 600 100, 700 100 C 800 100, 800 300, 900 300" fill="none" stroke="url(#pathGradient)" strokeLinecap="round" strokeWidth="6"></path>
                    </svg>

                    <div className="absolute left-[10%] top-[75%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center group cursor-pointer z-20">
                        <div className="w-16 h-16 rounded-full bg-green-500 flex items-center justify-center border-4 border-white/20 shadow-[0_0_20px_rgba(34,197,94,0.5)] transition-transform group-hover:scale-110">
                            <span className="material-symbols-outlined text-white text-3xl font-bold">check</span>
                        </div>
                        <div className="absolute top-20 text-center w-32">
                            <div className="text-[10px] font-bold text-green-400 uppercase tracking-widest">Phase 01</div>
                            <div className="text-sm font-bold text-white/90 whitespace-nowrap">{roadmapData?.steps?.[0]?.phase.split(':')[0] || 'Foundations'}</div>
                        </div>
                    </div>

                    <div className="absolute left-[30%] top-[25%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center group z-30">
                        <div className="w-20 h-20 rounded-full bg-[#0474C4] flex items-center justify-center border-4 border-cyan-400/50 node-pulse-active transition-transform cursor-pointer">
                            <span className="material-symbols-outlined text-white text-4xl">rocket_launch</span>
                        </div>
                        <div className="absolute top-24 text-center w-32">
                            <div className="text-[10px] font-black text-cyan-400 uppercase tracking-widest">Phase 02</div>
                            <div className="text-sm font-extrabold text-white whitespace-nowrap">{roadmapData?.steps?.[1]?.phase.split(':')[0] || 'Core Skills'}</div>
                        </div>
                        <div className="absolute top-36 left-0 w-80 glass-morphism rounded-2xl p-6 shadow-2xl animate-in fade-in zoom-in duration-300 pointer-events-auto">
                            <div className="flex justify-between items-start mb-4">
                                <div className="flex flex-col gap-1.5">
                                    <span className="w-fit bg-cyan-500/20 text-cyan-300 text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded border border-cyan-500/30">Current Phase</span>
                                    <h3 className="text-xl font-bold text-white">{roadmapData?.steps?.[1]?.phase || 'Phase 2'}</h3>
                                </div>
                                <button onClick={() => setShowRoadmapModal(false)} className="w-8 h-8 flex items-center justify-center rounded-full text-white/60 hover:text-white transition-all close-icon-hover">
                                    <span className="material-symbols-outlined text-[18px]">close</span>
                                </button>
                            </div>
                            <p className="text-sm text-gray-400 mb-5 leading-relaxed">
                                {roadmapData?.steps?.[1]?.actions?.[0] || 'Mastering core concepts.'}
                            </p>
                            <div className="space-y-2 mb-6">
                                <div className="flex justify-between items-end">
                                    <span className="text-[10px] text-white/50 font-bold uppercase tracking-widest">Completion</span>
                                    <span className="text-xs font-bold text-cyan-400">14/22 Topics</span>
                                </div>
                                <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
                                    <div className="bg-gradient-to-r from-cyan-400 to-blue-500 h-full w-[65%] rounded-full shadow-[0_0_10px_rgba(34,211,238,0.3)]"></div>
                                </div>
                            </div>
                            <button className="w-full bg-[#0474C4] hover:bg-[#0363A8] text-white py-3.5 rounded-xl text-xs font-black transition-all transform hover:-translate-y-0.5 shadow-lg shadow-blue-900/40">
                                RESUME LEARNING
                            </button>
                        </div>
                    </div>

                    <div className="absolute left-[50%] top-[75%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center opacity-60 group cursor-not-allowed z-20">
                        <div className="relative">
                            <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center border-4 border-white/20 backdrop-blur-md">
                                <span className="material-symbols-outlined text-white/50 text-3xl">psychology</span>
                            </div>
                            <div className="absolute -top-1 -right-1 w-6 h-6 bg-slate-900 rounded-full flex items-center justify-center border border-white/10">
                                <span className="material-symbols-outlined text-[14px] text-white/40">lock</span>
                            </div>
                        </div>
                        <div className="absolute top-20 text-center w-40">
                            <div className="text-[10px] font-bold text-white/30 uppercase tracking-widest">Phase 03</div>
                            <div className="text-sm font-bold text-white/40 whitespace-nowrap">{roadmapData?.steps?.[2]?.phase.split(':')[0] || 'Advanced'}</div>
                        </div>
                    </div>

                    <div className="absolute left-[70%] top-[25%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center opacity-40 group cursor-not-allowed z-20">
                        <div className="relative">
                            <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center border-4 border-white/10 backdrop-blur-md">
                                <span className="material-symbols-outlined text-white/50 text-3xl">science</span>
                            </div>
                            <div className="absolute -top-1 -right-1 w-6 h-6 bg-slate-900 rounded-full flex items-center justify-center border border-white/10">
                                <span className="material-symbols-outlined text-[14px] text-white/40">lock</span>
                            </div>
                        </div>
                        <div className="absolute top-20 text-center w-40">
                            <div className="text-[10px] font-bold text-white/30 uppercase tracking-widest">Phase 04</div>
                            <div className="text-sm font-bold text-white/40 whitespace-nowrap">🧪 Practice & Interview</div>
                        </div>
                    </div>

                    <div className="absolute left-[90%] top-[75%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center opacity-30 group cursor-not-allowed z-20">
                        <div className="relative">
                            <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center border-4 border-white/10 backdrop-blur-md">
                                <span className="material-symbols-outlined text-white/50 text-3xl">emoji_events</span>
                            </div>
                            <div className="absolute -top-1 -right-1 w-6 h-6 bg-slate-900 rounded-full flex items-center justify-center border border-white/10">
                                <span className="material-symbols-outlined text-[14px] text-white/40">lock</span>
                            </div>
                        </div>
                        <div className="absolute top-20 text-center w-32">
                            <div className="text-[10px] font-bold text-white/30 uppercase tracking-widest">Final</div>
                            <div className="text-sm font-bold text-white/40 whitespace-nowrap">🏆 Growth</div>
                        </div>
                    </div>
                </div>
            </main>

            <footer className="w-full px-12 pb-10 flex flex-col items-center z-50">
                <div className="w-full max-w-4xl glass-morphism rounded-2xl px-10 py-5 flex items-center justify-between shadow-2xl mb-6">
                    <div className="flex items-center gap-12">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center border border-green-500/20">
                                <span className="material-symbols-outlined text-green-500">verified</span>
                            </div>
                            <div>
                                <div className="text-xl font-black text-white leading-none">01/05</div>
                                <div className="text-[9px] uppercase font-bold text-white/40 tracking-widest mt-1">Phases Done</div>
                            </div>
                        </div>
                        <div className="h-8 w-px bg-white/10"></div>
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-lg bg-cyan-500/10 flex items-center justify-center border border-cyan-500/20">
                                <span className="material-symbols-outlined text-cyan-400">trending_up</span>
                            </div>
                            <div>
                                <div className="text-xl font-black text-white leading-none">28%</div>
                                <div className="text-[9px] uppercase font-bold text-white/40 tracking-widest mt-1">Overall Path</div>
                            </div>
                        </div>
                    </div>
                    <button className="bg-white/5 hover:bg-white/10 text-white border border-white/10 px-6 py-3 rounded-xl text-xs font-black transition-all flex items-center gap-2 group">
                        EXPLORE ALL PHASES
                        <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">arrow_forward</span>
                    </button>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/5">
                    <span className="material-symbols-outlined text-cyan-400 text-sm">auto_awesome</span>
                    <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-cyan-100/60">AI-personalized roadmap based on your profile</span>
                </div>
            </footer>
        </div>
      )}

      {/* LEFT SIDEBAR */}
      <aside className="w-72 flex-shrink-0 flex flex-col border-r border-slate-300 bg-white relative z-20 shadow-xl h-full">
        <div className="p-6 flex items-center gap-3 select-none shrink-0">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#0474C4] to-cyan-400 flex items-center justify-center shadow-lg shadow-blue-500/30">
            <span className="material-symbols-outlined text-white text-xl">rocket_launch</span>
          </div>
          <span className="text-2xl font-black tracking-tight text-[#0F172A]">
            Career <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0474C4] to-cyan-500">Orbit</span>
          </span>
        </div>

        <nav className="flex-1 px-4 py-4 flex flex-col gap-2 overflow-y-auto no-scrollbar">
          <button className="flex items-center gap-3 px-4 py-3 rounded-lg bg-[#06457F] text-white shadow-md text-left w-full">
            <span className="material-symbols-outlined fill-1">home</span>
            <span className="font-medium">Dashboard</span>
          </button>
          
          <button onClick={handleRoadmapNavigation} className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-600 hover:bg-slate-50 transition-colors group text-left w-full">
            <span className={`material-symbols-outlined group-hover:text-[#06457F] transition-colors ${!isRoadmapReady ? 'opacity-50' : ''}`}>map</span>
            <div className="flex justify-between items-center w-full">
                <span className={`font-medium group-hover:text-[#06457F] transition-colors ${!isRoadmapReady ? 'opacity-50' : ''}`}>Career Roadmap</span>
                {!isRoadmapReady && <span className="material-symbols-outlined text-[14px] text-slate-400">lock</span>}
            </div>
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

          {/* Internships & Jobs Navigation */}
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
            <div className="size-9 rounded-full bg-cover bg-center border border-slate-300 shrink-0" style={{ backgroundImage: `url('https://ui-avatars.com/api/?name=${userProfile.firstName}&background=06457F&color=fff')` }}></div>
            <div className="flex flex-col min-w-0">
              <span className="text-sm font-semibold text-slate-900 truncate">{userProfile.firstName} {userProfile.lastName}</span>
              <span className="text-[11px] text-slate-600 truncate">Pro Member</span>
            </div>
          </div>
        </div>
      </aside>

      {/* CENTER CONTENT */}
      <div className="flex flex-1 overflow-hidden">
        <main className="flex-1 flex flex-col overflow-y-auto relative z-10 bg-[#06457F]">
          <header className="h-20 flex items-center justify-between px-8 py-4 shrink-0 sticky top-0 bg-[#06457F]/95 backdrop-blur-sm z-30">
            <div className="w-full max-w-md">
              <label className="relative group block">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-[#D1D5DB] group-focus-within:text-[#0474C4] transition-colors">
                  <span className="material-symbols-outlined text-[20px]">search</span>
                </span>
                <input className="w-full bg-[#1E1E1E] border border-[#3A3A3A] rounded-lg py-2.5 pl-10 pr-4 text-sm text-white placeholder-[#D1D5DB] focus:outline-none focus:border-[#0474C4] focus:ring-1 focus:ring-[#0474C4] transition-all shadow-sm" placeholder="Search roadmap, mentors, or tools..." type="text"/>
              </label>
            </div>
            <div className="flex items-center gap-4">
              <button className="relative p-2 text-[#D1D5DB] hover:text-white transition-colors rounded-full hover:bg-white/5">
                <span className="material-symbols-outlined">notifications</span>
                <span className="absolute top-2.5 right-2.5 size-2 bg-[#0474C4] rounded-full border border-[#06457F]"></span>
              </button>
            </div>
          </header>

          <div className="px-8 pb-12 flex flex-col gap-8">
            <div className="mt-2">
              <h1 className="text-[32px] font-bold text-white mb-2 leading-tight tracking-tight">Good evening, {userProfile.firstName} 👋</h1>
              <p className="text-[#D1D5DB] text-lg font-normal">Here’s your current career progress</p>
            </div>

            {/* PHASE CARD */}
            <div className="bg-[#0A4F8F] rounded-xl p-6 md:p-8 shadow-xl border border-white/5 relative overflow-hidden group">
              <div className="absolute -right-20 -top-20 w-80 h-80 bg-[#0474C4]/20 rounded-full blur-[80px] pointer-events-none mix-blend-screen"></div>
              <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
                <div className="flex-1 space-y-6">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="px-3 py-1 rounded text-xs font-semibold bg-[#0474C4] text-white shadow-sm">
                        {isRoadmapReady ? 'In Progress' : 'Start Your Journey'}
                    </span>
                    <span className="text-sm text-[#D1D5DB] flex items-center gap-1">
                      <span className="material-symbols-outlined text-[16px]">schedule</span>
                      {isRoadmapReady ? 'Phase 1 Active' : 'Not Started'}
                    </span>
                  </div>
                  
                  <h2 className="text-3xl font-bold text-white tracking-tight">{currentPhase}</h2>
                  
                  <div className="w-full max-w-xl space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-[#D1D5DB] font-medium">Phase Progress</span>
                      <span className="text-white font-bold">{phaseProgress}%</span>
                    </div>
                    <div className="h-2.5 w-full bg-black/30 rounded-full overflow-hidden backdrop-blur-sm">
                      <div className="h-full bg-[#0474C4] rounded-full shadow-[0_0_10px_rgba(4,116,196,0.5)] transition-all duration-500" style={{ width: `${phaseProgress}%` }}></div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 pt-2 p-3 rounded-lg bg-black/10 border border-white/5 max-w-xl backdrop-blur-sm">
                    <div className="bg-[#1E1E1E] p-2 rounded-lg border border-[#3A3A3A] shrink-0 text-[#0474C4] flex items-center justify-center">
                      <span className="material-symbols-outlined text-[24px]">flag</span>
                    </div>
                    <div>
                      <p className="text-xs text-[#D1D5DB] uppercase tracking-wider font-semibold mb-0.5">Next Task</p>
                      <p className="text-white font-medium text-base">
                          {isRoadmapReady ? (roadmapData?.steps?.[0]?.actions?.[0] || 'Complete Module') : 'Generate your first roadmap'}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="shrink-0 flex items-end">
                  {!isRoadmapReady ? (
                      <button onClick={handleGenerateClick} className="w-full sm:w-auto bg-[#0474C4] hover:bg-[#0360a3] text-white font-bold text-base px-8 py-3.5 rounded-lg shadow-lg shadow-[#0474C4]/20 transition-all flex items-center justify-center gap-2 transform hover:-translate-y-0.5 active:translate-y-0">
                        <span>Generate Roadmap</span>
                        <span className="material-symbols-outlined text-[20px]">auto_awesome</span>
                      </button>
                  ) : (
                      <button onClick={() => setShowRoadmapModal(true)} className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-base px-8 py-3.5 rounded-lg shadow-lg shadow-emerald-600/20 transition-all flex items-center justify-center gap-2 transform hover:-translate-y-0.5 active:translate-y-0">
                        <span>Continue Learning</span>
                        <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
                      </button>
                  )}
                </div>
              </div>
            </div>

            {/* QUICK ACTIONS & RECENT ACTIVITY (Kept same) */}
            <section>
              <h3 className="text-xl font-bold text-white mb-5 flex items-center gap-2 tracking-tight">
                <span className="material-symbols-outlined text-amber-400">bolt</span> Quick Actions
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <button onClick={handleRoadmapNavigation} className="flex flex-col items-start gap-4 p-5 rounded-xl bg-blue-600/10 hover:bg-blue-600/20 border border-blue-500/20 hover:border-blue-500/50 transition-all group text-left h-full">
                  <div className="p-2.5 rounded-lg bg-blue-500/20 group-hover:bg-blue-500 group-hover:text-white text-blue-400 transition-colors duration-300 shadow-sm shadow-blue-500/10">
                      <span className="material-symbols-outlined text-[28px]">{isRoadmapReady ? 'map' : 'lock'}</span>
                  </div>
                  <div><span className="font-bold text-white block text-lg tracking-tight group-hover:text-blue-200 transition-colors">View RoadMap</span><span className="text-sm text-blue-200/70 mt-1 block">Track your journey</span></div>
                </button>
                <button onClick={() => navigate('/resume')} className="flex flex-col items-start gap-4 p-5 rounded-xl bg-violet-600/10 hover:bg-violet-600/20 border border-violet-500/20 hover:border-violet-500/50 transition-all group text-left h-full">
                  <div className="p-2.5 rounded-lg bg-violet-500/20 group-hover:bg-violet-500 group-hover:text-white text-violet-400 transition-colors duration-300 shadow-sm shadow-violet-500/10"><span className="material-symbols-outlined text-[28px]">edit_document</span></div>
                  <div><span className="font-bold text-white block text-lg tracking-tight group-hover:text-violet-200 transition-colors">Resume Builder</span><span className="text-sm text-violet-200/70 mt-1 block">Update your CV with AI</span></div>
                </button>
                <button onClick={() => navigate('/mentors')} className="flex flex-col items-start gap-4 p-5 rounded-xl bg-emerald-600/10 hover:bg-emerald-600/20 border border-emerald-500/20 hover:border-emerald-500/50 transition-all group text-left h-full">
                  <div className="p-2.5 rounded-lg bg-emerald-500/20 group-hover:bg-emerald-500 group-hover:text-white text-emerald-400 transition-colors duration-300 shadow-sm shadow-emerald-500/10"><span className="material-symbols-outlined text-[28px]">person_add</span></div>
                  <div><span className="font-bold text-white block text-lg tracking-tight group-hover:text-emerald-200 transition-colors">Book a Mentor</span><span className="text-sm text-emerald-200/70 mt-1 block">Get 1:1 guidance</span></div>
                </button>
                <button onClick={() => navigate('/mock-interview')} className="flex flex-col items-start gap-4 p-5 rounded-xl bg-orange-600/10 hover:bg-orange-600/20 border border-orange-500/20 hover:border-orange-500/50 transition-all group text-left h-full">
                  <div className="p-2.5 rounded-lg bg-orange-500/20 group-hover:bg-orange-500 group-hover:text-white text-orange-400 transition-colors duration-300 shadow-sm shadow-orange-500/10"><span className="material-symbols-outlined text-[28px]">video_camera_front</span></div>
                  <div><span className="font-bold text-white block text-lg tracking-tight group-hover:text-orange-200 transition-colors">Mock Interview</span><span className="text-sm text-orange-200/70 mt-1 block">Practice with AI</span></div>
                </button>
                <button onClick={() => navigate('/lms-courses')} className="flex flex-col items-start gap-4 p-5 rounded-xl bg-pink-600/10 hover:bg-pink-600/20 border border-pink-500/20 hover:border-pink-500/50 transition-all group text-left h-full">
                  <div className="p-2.5 rounded-lg bg-pink-500/20 group-hover:bg-pink-500 group-hover:text-white text-pink-400 transition-colors duration-300 shadow-sm shadow-pink-500/10"><span className="material-symbols-outlined text-[28px]">school</span></div>
                  <div><span className="font-bold text-white block text-lg tracking-tight group-hover:text-pink-200 transition-colors">Browse Courses</span><span className="text-sm text-pink-200/70 mt-1 block">Skill up today</span></div>
                </button>
                <button onClick={() => navigate('/practice-ground')} className="flex flex-col items-start gap-4 p-5 rounded-xl bg-indigo-600/10 hover:bg-indigo-600/20 border border-indigo-500/20 hover:border-indigo-500/50 transition-all group text-left h-full">
                  <div className="p-2.5 rounded-lg bg-indigo-500/20 group-hover:bg-indigo-500 group-hover:text-white text-indigo-400 transition-colors duration-300 shadow-sm shadow-indigo-500/10"><span className="material-symbols-outlined text-[28px]">code</span></div>
                  <div><span className="font-bold text-white block text-lg tracking-tight group-hover:text-indigo-200 transition-colors">Practice Ground</span><span className="text-sm text-indigo-200/70 mt-1 block">Solve Coding Problems</span></div>
                </button>
              </div>
            </section>

            <section>
              <h3 className="text-xl font-bold text-white mb-4 tracking-tight">Recent Activity</h3>
              <div className="bg-[#0A4F8F]/30 rounded-xl border border-white/5 divide-y divide-white/5 backdrop-blur-sm">
                <div className="flex items-center gap-4 p-4 hover:bg-white/5 transition-colors cursor-pointer group">
                  <div className="bg-cyan-500/20 text-cyan-400 p-2 rounded-full border border-cyan-500/30"><span className="material-symbols-outlined text-[20px]">check</span></div>
                  <div className="flex-1"><p className="text-sm font-semibold text-cyan-100 group-hover:text-cyan-300 transition-colors">Completed "Self-Assessment Quiz"</p><p className="text-xs text-cyan-200/60 mt-0.5">Today, 10:23 AM</p></div>
                  <button className="text-[#D1D5DB] hover:text-white opacity-0 group-hover:opacity-100 transition-opacity"><span className="material-symbols-outlined">chevron_right</span></button>
                </div>
                <div className="flex items-center gap-4 p-4 hover:bg-white/5 transition-colors cursor-pointer group">
                  <div className="bg-amber-500/20 text-amber-400 p-2 rounded-full border border-amber-500/30"><span className="material-symbols-outlined text-[20px]">visibility</span></div>
                  <div className="flex-1"><p className="text-sm font-semibold text-amber-100 group-hover:text-amber-300 transition-colors">Viewed "Backend Developer Roadmap"</p><p className="text-xs text-amber-200/60 mt-0.5">Yesterday</p></div>
                  <button className="text-[#D1D5DB] hover:text-white opacity-0 group-hover:opacity-100 transition-opacity"><span className="material-symbols-outlined">chevron_right</span></button>
                </div>
              </div>
            </section>
          </div>
        </main>

        <aside className="w-[360px] bg-[#A8C4EC] shrink-0 relative overflow-hidden hidden xl:flex flex-col border-l border-white/20">
          <div className="absolute inset-0 z-0 pointer-events-none">
            <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 360 900" xmlns="http://www.w3.org/2000/svg">
              <path d="M-20,100 C100,250 200,-50 380,150" fill="none" opacity="0.4" stroke="#0474C4" strokeWidth="1.5"></path>
              <path d="M-20,300 C80,500 280,300 380,500" fill="none" opacity="0.3" stroke="#06457F" strokeWidth="1"></path>
              <circle cx="280" cy="120" fill="#0474C4" opacity="0.8" r="4"></circle>
            </svg>
          </div>
          <div className="relative z-10 p-8 flex flex-col h-full gap-8">
            <div className="flex items-center gap-2 text-[#06457F] mt-4">
              <span className="material-symbols-outlined text-[20px]">auto_awesome</span>
              <span className="text-xs font-bold uppercase tracking-widest opacity-80">Career Pulse</span>
            </div>
            <div className="bg-white/60 backdrop-blur-md p-6 rounded-2xl border border-white/50 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 p-3 opacity-10"><span className="material-symbols-outlined text-[48px] text-[#06457F]">psychology</span></div>
              <h4 className="text-[#06457F] font-bold text-xl mb-3 tracking-tight">AI Insight</h4>
              <p className="text-[#06457F] text-[15px] leading-relaxed font-medium opacity-90">"{aiInsight}"</p>
            </div>
            {/* ... rest of sidebar ... */}
            <div className="flex-1">
              <h5 className="text-[#06457F] font-bold text-xs uppercase tracking-widest mb-6 opacity-70">Upcoming Milestones</h5>
              <div className="relative pl-6 space-y-8 border-l-2 border-[#06457F]/10 ml-2">
                <div className="relative">
                  <div className="absolute -left-[29px] top-1 size-4 bg-[#0474C4] rounded-full border-[3px] border-[#A8C4EC] shadow-sm"></div>
                  <p className="text-base font-bold text-[#06457F] tracking-tight">Mock Interview</p>
                  <div className="flex items-center gap-1 mt-1 text-sm text-[#06457F]/70 font-medium"><span className="material-symbols-outlined text-[16px]">calendar_month</span><span>Friday, 4:00 PM</span></div>
                  <span className="inline-block mt-2 px-2 py-0.5 bg-[#06457F]/10 text-[#06457F] text-xs font-bold rounded">High Priority</span>
                </div>
                <div className="relative opacity-60">
                  <div className="absolute -left-[29px] top-1 size-4 bg-[#06457F] rounded-full border-[3px] border-[#A8C4EC]"></div>
                  <p className="text-base font-bold text-[#06457F] tracking-tight">Phase 2 Unlock</p>
                  <div className="flex items-center gap-1 mt-1 text-sm text-[#06457F]/70 font-medium"><span className="material-symbols-outlined text-[16px]">event</span><span>Est. Nov 12</span></div>
                </div>
              </div>
            </div>
            <div className="mt-auto mb-4">
              <div className="p-5 rounded-xl bg-gradient-to-br from-[#0474C4] to-[#06457F] text-white shadow-xl flex items-start gap-3">
                <span className="material-symbols-outlined text-[20px] opacity-80 mt-0.5">format_quote</span>
                <p className="text-sm font-medium italic">"Success is not the key to happiness. Happiness is the key to success."</p>
              </div>
            </div>
          </div>
        </aside>
      </div>

      {/* EXPANDABLE CHATBOT CART */}
      <div 
        className={
            isExpanded 
            ? "fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 transition-all duration-300"
            : "fixed bottom-6 right-6 z-50 flex flex-col items-end gap-4 transition-all duration-300"
        }
      >
        {isChatOpen && (
            <div className={
                isExpanded
                ? "w-full max-w-5xl h-[80vh] max-h-[90vh] bg-[#06457F] rounded-2xl border border-white/30 shadow-[0_0_50px_rgba(4,116,196,0.5)] flex flex-col overflow-hidden chat-animate"
                : "w-[380px] h-[550px] max-h-[calc(100vh-8rem)] bg-[#06457F] rounded-2xl border border-white/20 ring-1 ring-cyan-500/40 shadow-2xl flex flex-col overflow-hidden chat-animate origin-bottom-right"
            }>
                {/* Chat Header */}
                <div className="p-4 bg-[#0B3D91] flex items-center justify-between border-b border-white/10 shrink-0">
                    <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg">
                            {/* RESTORED: Smart Toy Icon */}
                            <span className="material-symbols-outlined text-white">smart_toy</span>
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

                {/* Chat Messages */}
                <div className="flex-1 bg-[#06457F] overflow-y-auto p-4 space-y-4">
                    {chatMessages.map((msg) => (
                        <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                            <div className={`max-w-[85%] px-4 py-2.5 text-sm ${
                                msg.sender === 'user' 
                                ? 'message-bubble-user rounded-2xl rounded-br-none' 
                                : 'message-bubble-ai rounded-2xl rounded-bl-none'
                            }`}>
                                {msg.text}
                            </div>
                        </div>
                    ))}
                    
                    {isTyping && (
                        <div className="flex justify-start">
                            <div className="message-bubble-ai rounded-2xl rounded-bl-none px-4 py-3 flex items-center gap-1">
                                <span className="w-1.5 h-1.5 bg-white rounded-full typing-dot"></span>
                                <span className="w-1.5 h-1.5 bg-white rounded-full typing-dot"></span>
                                <span className="w-1.5 h-1.5 bg-white rounded-full typing-dot"></span>
                            </div>
                        </div>
                    )}
                    
                    {!isTyping && chatMessages[chatMessages.length - 1]?.sender === 'ai' && (
                        <div className="flex flex-wrap gap-2 pt-2">
                            <button onClick={(e) => handleChatSubmit(e, 'View Roadmap')} className="text-xs bg-white/10 hover:bg-white/20 border border-white/20 rounded-full px-3 py-1.5 text-white transition-colors">
                                {isRoadmapReady ? 'View Roadmap' : 'Generate Roadmap'}
                            </button>
                            <button onClick={(e) => handleChatSubmit(e, 'Resume Builder')} className="text-xs bg-white/10 hover:bg-white/20 border border-white/20 rounded-full px-3 py-1.5 text-white transition-colors">
                                Resume Builder
                            </button>
                            <button onClick={(e) => handleChatSubmit(e, 'Mock Interview')} className="text-xs bg-white/10 hover:bg-white/20 border border-white/20 rounded-full px-3 py-1.5 text-white transition-colors">
                                Mock Interview
                            </button>
                            <button onClick={(e) => handleChatSubmit(e, 'Find a Mentor')} className="text-xs bg-white/10 hover:bg-white/20 border border-white/20 rounded-full px-3 py-1.5 text-white transition-colors">
                                Find a Mentor
                            </button>
                            <button onClick={(e) => handleChatSubmit(e, 'LMS Courses')} className="text-xs bg-white/10 hover:bg-white/20 border border-white/20 rounded-full px-3 py-1.5 text-white transition-colors">
                                LMS Courses
                            </button>
                            <button onClick={(e) => handleChatSubmit(e, 'Practice Ground')} className="text-xs bg-white/10 hover:bg-white/20 border border-white/20 rounded-full px-3 py-1.5 text-white transition-colors">
                                Practice Ground
                            </button>
                        </div>
                    )}
                    
                    <div ref={chatEndRef} />
                </div>

                {/* Chat Input */}
                <form onSubmit={handleChatSubmit} className="p-3 bg-[#0A4F8F] border-t border-white/10 flex gap-2 shrink-0">
                    <input 
                        type="text" 
                        value={chatInput}
                        onChange={(e) => setChatInput(e.target.value)}
                        placeholder="Ask me anything..." 
                        disabled={isTyping}
                        className="flex-1 bg-[#06457F] border border-white/20 rounded-lg px-3 py-2 text-sm text-white placeholder-white/40 focus:outline-none focus:border-[#0474C4]"
                    />
                    <button type="submit" disabled={isTyping} className="p-2 bg-[#0474C4] hover:bg-[#0360a3] text-white rounded-lg flex items-center justify-center transition-colors disabled:opacity-50">
                        <span className="material-symbols-outlined text-[20px]">send</span>
                    </button>
                </form>
            </div>
        )}

        {/* FAB */}
        {!isExpanded && (
            <button 
                onClick={() => setIsChatOpen(!isChatOpen)}
                className="h-16 w-16 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white shadow-xl shadow-cyan-500/30 flex items-center justify-center transition-all hover:scale-105 active:scale-95 group relative z-50 ring-4 ring-cyan-500/20 border border-white/20"
            >
                {isChatOpen ? (
                    <span className="material-symbols-outlined text-[32px]">keyboard_arrow_down</span>
                ) : (
                    <span className="material-symbols-outlined text-[32px]">smart_toy</span>
                )}
            </button>
        )}
      </div>

    </div>
  );
};

export default DashboardMain;