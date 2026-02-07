import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const JobSeekerWelcomeDashboard = () => {
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState("Initializing AI core...");

  // Status messages for different progress stages
  const statusMessages = [
    { threshold: 10, text: "Analyzing your profile data..." },
    { threshold: 30, text: "Mapping skill gaps..." },
    { threshold: 50, text: "Curating learning modules..." },
    { threshold: 70, text: "Building project milestones..." },
    { threshold: 90, text: "Finalizing your roadmap..." },
    { threshold: 100, text: "Ready to launch!" }
  ];

  useEffect(() => {
    // Simulate progress
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        // Random increment for realistic feel
        return Math.min(prev + Math.floor(Math.random() * 3) + 1, 100);
      });
    }, 100); // Speed of loading

    return () => clearInterval(interval);
  }, []);

  // Update status text based on progress
  useEffect(() => {
    const currentStatus = statusMessages.find(msg => progress < msg.threshold)?.text || "Finalizing...";
    if (progress === 100) {
        setStatusText("Ready to launch!");
        // Navigate after a brief pause when 100%
        setTimeout(() => navigate('/dashboard/main'), 800); 
    } else {
        setStatusText(currentStatus);
    }
  }, [progress, navigate]);

  return (
    <div className="bg-[#06457F] text-white selection:bg-[#0d93f2]/30 h-screen w-full flex flex-col items-center justify-center overflow-hidden relative font-['Space_Grotesk']">
      
      {/* CSS Styles injection for animations */}
      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap');
        
        .radial-glow {
            background: radial-gradient(circle at center, rgba(13, 147, 242, 0.1) 0%, rgba(6, 69, 127, 1) 80%);
        }
        
        @keyframes orbit-cw {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
        }
        @keyframes orbit-ccw {
            from { transform: rotate(360deg); }
            to { transform: rotate(0deg); }
        }
        @keyframes pulse-glow {
            0%, 100% { transform: scale(1); opacity: 0.5; box-shadow: 0 0 30px rgba(13, 147, 242, 0.4); }
            50% { transform: scale(1.15); opacity: 0.9; box-shadow: 0 0 60px rgba(13, 147, 242, 0.9); }
        }
        
        .animate-orbit-1 { animation: orbit-cw 12s linear infinite; }
        .animate-orbit-2 { animation: orbit-ccw 18s linear infinite; }
        .animate-orbit-3 { animation: orbit-cw 25s linear infinite; }
        .animate-pulse-glow { animation: pulse-glow 3s ease-in-out infinite; }
        
        .trail-cyan { box-shadow: 0 0 15px #22d3ee, 0 0 30px #22d3ee; }
        .trail-purple { box-shadow: 0 0 15px #c084fc, 0 0 30px #c084fc; }
        .trail-primary { box-shadow: 0 0 15px #0d93f2, 0 0 30px #0d93f2; }
      `}} />

      {/* Radial Background Overlay */}
      <div className="absolute inset-0 radial-glow pointer-events-none"></div>

      {/* --- LOGO (Top Left) --- */}
      <div className="absolute top-6 left-6 md:top-8 md:left-12 z-50 select-none">
        <div className="flex items-center gap-3">
            <div className="w-9 h-9 md:w-10 md:h-10 rounded-xl bg-gradient-to-tr from-[#0473c3] to-cyan-400 flex items-center justify-center shadow-lg shadow-blue-500/30">
                <span className="material-symbols-outlined text-white text-lg md:text-xl">rocket_launch</span>
            </div>
            <span className="text-xl md:text-2xl font-black tracking-tight text-white">
                Career <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-400">Orbit</span>
            </span>
        </div>
      </div>

      <div className="flex flex-col items-center max-w-[960px] w-full px-4 relative z-10">
        
        {/* Orbit Animation Container - Significantly Reduced Scale */}
        <div className="relative w-[450px] h-[450px] flex items-center justify-center scale-[0.45] sm:scale-[0.6] md:scale-[0.75] transition-transform duration-500 origin-center">
            
            {/* Center Pulse */}
            <div className="absolute w-28 h-28 bg-cyan-400/20 rounded-full blur-3xl animate-pulse-glow"></div>
            
            {/* Center Icon */}
            <div className="relative z-10 w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-[0_0_50px_rgba(34,211,238,0.5)]">
                <span className="material-symbols-outlined text-[#06457F] text-4xl font-bold">person</span>
            </div>

            {/* Orbit Ring 1 */}
            <div className="absolute border border-cyan-400/40 rounded-full w-[180px] h-[180px] shadow-[0_0_10px_rgba(34,211,238,0.15),inset_0_0_10px_rgba(34,211,238,0.1)] animate-orbit-1">
                <div className="absolute w-2.5 h-2.5 bg-cyan-400 rounded-full top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 trail-cyan"></div>
            </div>

            {/* Orbit Ring 2 */}
            <div className="absolute border border-cyan-400/40 rounded-full w-[300px] h-[300px] shadow-[0_0_10px_rgba(34,211,238,0.15),inset_0_0_10px_rgba(34,211,238,0.1)] animate-orbit-2">
                <div className="absolute w-2.5 h-2.5 bg-purple-400 rounded-full top-full left-1/2 -translate-x-1/2 -translate-y-1/2 trail-purple"></div>
            </div>

            {/* Orbit Ring 3 */}
            <div className="absolute border border-cyan-400/40 rounded-full w-[420px] h-[420px] shadow-[0_0_10px_rgba(34,211,238,0.15),inset_0_0_10px_rgba(34,211,238,0.1)] animate-orbit-3">
                <div className="absolute w-2.5 h-2.5 bg-[#0d93f2] rounded-full top-1/2 left-0 -translate-x-1/2 -translate-y-1/2 trail-primary"></div>
                <div className="absolute w-2.5 h-2.5 bg-cyan-300 rounded-full top-1/2 right-0 translate-x-1/2 -translate-y-1/2 trail-cyan"></div>
            </div>
        </div>

        {/* Text Content - Pulled up with negative margin */}
        <div className="text-center max-w-2xl -mt-24 sm:-mt-20 md:-mt-10 mb-6">
            <h1 className="text-white tracking-tight text-2xl md:text-4xl font-bold leading-tight mb-2">
                Building your job-ready <span className="text-[#0d93f2]">career roadmap...</span>
            </h1>
            <p className="text-blue-100/70 text-sm font-normal leading-relaxed">
                Our AI is analyzing your profile to architect your personalized path to success.
            </p>
        </div>

        {/* Status Card */}
        <div className="w-full max-w-sm bg-[#262B40] rounded-2xl p-5 border border-white/10 shadow-2xl">
            <div className="flex flex-col gap-2">
                <div className="flex gap-4 justify-between items-end">
                    <div className="flex flex-col">
                        <span className="text-[#0d93f2] text-[10px] font-bold uppercase tracking-[0.2em] mb-1">Status</span>
                        <p className="text-white text-sm md:text-base font-semibold leading-normal">{statusText}</p>
                    </div>
                    <p className="text-white text-xl font-bold leading-none tracking-tighter">{progress}%</p>
                </div>
                
                {/* Progress Bar */}
                <div className="rounded-full bg-white/5 h-2 overflow-hidden">
                    <div 
                        className="h-full rounded-full bg-[#0d93f2] shadow-[0_0_15px_#0d93f2] transition-all duration-100 ease-linear" 
                        style={{ width: `${progress}%` }}
                    ></div>
                </div>
                
                <p className="text-blue-200/40 text-[10px] font-normal leading-normal italic text-center mt-1">
                    Heuristics analysis in progress...
                </p>
            </div>
        </div>

      </div>
    </div>
  );
};

export default JobSeekerWelcomeDashboard;