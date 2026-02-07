import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * Career Orbit - Dashboard Welcome Page (Student AI Loading State)
 * Adjusted: Equalized spacing between Ring, Text, and Progress Bar.
 */
const DashboardWelcome = () => {
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState("Initializing AI Engine...");

  // --- SIMULATE AI LOADING PROCESS ---
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        const increment = Math.floor(Math.random() * 10) + 1;
        const newProgress = Math.min(prev + increment, 100);
        
        if (newProgress > 10 && newProgress < 40) setStatusText("Analyzing academic profile...");
        if (newProgress >= 40 && newProgress < 70) setStatusText("Mapping skill gaps...");
        if (newProgress >= 70 && newProgress < 90) setStatusText("Curating learning path...");
        if (newProgress >= 90 && newProgress < 100) setStatusText("Finalizing roadmap...");
        if (newProgress === 100) setStatusText("Ready to launch!");

        return newProgress;
      });
    }, 600);

    if (progress === 100) {
      clearInterval(interval);
      setTimeout(() => {
        navigate('/dashboard/main');
      }, 1000); 
    }

    return () => clearInterval(interval);
  }, [progress, navigate]);

  return (
    <div className="bg-[#06457F] h-screen w-full flex flex-col items-center justify-center overflow-hidden font-['Space_Grotesk'] text-white relative">
      
      {/* --- CSS & FONTS INJECTION --- */}
      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Noto+Sans:wght@400;500&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap');
        
        .material-symbols-outlined { font-variation-settings: 'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24; }

        @keyframes orbit { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes orbit-reverse { from { transform: rotate(0deg); } to { transform: rotate(-360deg); } }
        @keyframes pulse-glow {
            0%, 100% { opacity: 0.7; transform: scale(1); box-shadow: 0 0 30px 5px rgba(43, 173, 238, 0.4); }
            50% { opacity: 1; transform: scale(1.05); box-shadow: 0 0 50px 15px rgba(43, 173, 238, 0.6); }
        }
        
        .orbit-container {
            position: relative;
            width: 400px; 
            height: 400px;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .orbit-ring {
            position: absolute;
            border: 1px solid rgba(255, 255, 255, 0.12);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: inset 0 0 8px rgba(43, 173, 238, 0.05), 0 0 8px rgba(43, 173, 238, 0.05);
        }
        .particle {
            position: absolute;
            border-radius: 50%;
            top: 0;
            left: 50%;
            transform: translate(-50%, -50%);
        }
        .animate-orbit-slow { animation: orbit 25s linear infinite; }
        .animate-orbit-med { animation: orbit-reverse 18s linear infinite; }
        .animate-orbit-fast { animation: orbit 12s linear infinite; }
        .animate-orbit-extra-slow { animation: orbit-reverse 35s linear infinite; }
        
        .glow-node {
            background: #2badee;
            animation: pulse-glow 4s ease-in-out infinite;
        }
        .animate-spin-slow { animation: orbit 3s linear infinite; }
      `}} />

      {/* --- BACKGROUND GLOW --- */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#2badee]/10 rounded-full blur-[100px] pointer-events-none"></div>

      {/* --- LOGO (Top Left) --- */}
      <div className="absolute top-6 left-6 z-50 select-none">
        <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#0473c3] to-cyan-400 flex items-center justify-center shadow-lg shadow-blue-500/30">
                <span className="material-symbols-outlined text-white text-lg">rocket_launch</span>
            </div>
            <span className="text-xl font-black tracking-tight text-white">
                Career <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-400">Orbit</span>
            </span>
        </div>
      </div>

      {/* --- CENTRAL CONTENT --- */}
      {/* 1. Used 'flex-col gap-10' to create equal vertical spacing.
          2. Scaled the whole container to fit viewport perfectly.
      */}
      <div className="relative z-10 flex flex-col items-center justify-center transform scale-[0.6] sm:scale-[0.75] md:scale-[0.85] lg:scale-[0.9] transition-transform duration-500 gap-8">
        
        {/* 1. ORBIT VISUALIZATION */}
        <div className="orbit-container">
            <div className="absolute w-12 h-12 rounded-full z-30 glow-node flex items-center justify-center">
                <span className="material-symbols-outlined text-white text-xl">auto_awesome</span>
            </div>
            <div className="orbit-ring w-[110px] h-[110px] animate-orbit-fast">
                <div className="particle w-2 h-2 bg-[#2badee] shadow-[0_0_10px_#2badee]"></div>
            </div>
            <div className="orbit-ring w-[190px] h-[190px] animate-orbit-med">
                <div className="particle w-2.5 h-2.5 bg-[#a855f7] shadow-[0_0_12px_#a855f7]"></div>
                <div className="absolute bottom-0 left-50 transform translate-y-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-[#2badee] shadow-[0_0_8px_#2badee]"></div>
            </div>
            <div className="orbit-ring w-[270px] h-[270px] animate-orbit-slow">
                <div className="particle w-1.5 h-1.5 bg-white shadow-[0_0_10px_white]"></div>
                <div className="absolute top-1/2 left-0 transform -translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 bg-cyan-400 shadow-[0_0_12px_#22d3ee]"></div>
            </div>
            <div className="orbit-ring w-[350px] h-[350px] opacity-60 animate-orbit-extra-slow">
                <div className="particle w-1.5 h-1.5 bg-[#2badee]/80"></div>
            </div>
        </div>

        {/* 2. TEXT CONTENT */}
        <div className="flex flex-col items-center text-center max-w-[700px]">
            <h1 className="text-white tracking-tight text-[28px] md:text-[36px] font-bold leading-tight pb-3 drop-shadow-md">
                We’re building a transition-ready roadmap just for you…
            </h1>
            <p className="text-[#D1D5DB] text-base font-normal leading-relaxed max-w-xl">
                Our AI is analyzing your transferable skills and mapping them to your new career path.
            </p>
        </div>

        {/* 3. PROGRESS CARD */}
        <div className="w-full max-w-sm bg-[#262B40] backdrop-blur-md border border-white/10 p-5 rounded-xl shadow-2xl">
            <div className="flex flex-col gap-2">
                <div className="flex gap-6 justify-between items-end">
                    <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-[#2badee] text-sm animate-spin-slow">sync</span>
                        <p className="text-white text-sm font-medium leading-normal">{statusText}</p>
                    </div>
                    <p className="text-[#2badee] text-lg font-bold leading-normal">{progress}%</p>
                </div>
                
                {/* Progress Bar Track */}
                <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
                    <div 
                        className="h-full rounded-full bg-[#2badee] shadow-[0_0_15px_rgba(43,173,238,0.6)] transition-all duration-300 ease-out" 
                        style={{ width: `${progress}%` }}
                    ></div>
                </div>

                {/* Footer of Card */}
                <div className="flex justify-between items-center mt-1">
                    <p className="text-[#92b7c9] text-[10px] font-medium uppercase tracking-wider">AI Processing Engine</p>
                    <div className="flex gap-1">
                        <span className="w-1 h-1 bg-[#2badee] rounded-full animate-pulse"></span>
                        <span className="w-1 h-1 bg-[#2badee] rounded-full animate-pulse [animation-delay:200ms]"></span>
                        <span className="w-1 h-1 bg-[#2badee] rounded-full animate-pulse [animation-delay:400ms]"></span>
                    </div>
                </div>
            </div>
        </div>

        {/* 4. FOOTER BADGE */}
        <div className="flex items-center gap-2 opacity-60">
            <span className="material-symbols-outlined text-[#92b7c9] text-xs">verified_user</span>
            <p className="text-[#92b7c9] text-xs font-normal leading-normal">Career Orbit AI Engine • Secure Analysis</p>
        </div>

      </div>

      {/* --- DECORATIVE BOTTOM GRADIENT --- */}
      <div className="absolute bottom-0 left-0 w-full h-1/4 bg-gradient-to-t from-black/20 to-transparent pointer-events-none"></div>
    </div>
  );
};

export default DashboardWelcome;