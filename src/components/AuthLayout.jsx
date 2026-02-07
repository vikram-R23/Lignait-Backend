import React from 'react';

const AuthLayout = ({ children, title, subtitle }) => {
  return (
    <div className="font-display bg-background-left text-white min-h-screen flex overflow-hidden selection:bg-primary selection:text-white">
      {/* Left Section: Form Content */}
      <div className="w-full lg:w-1/2 flex flex-col relative z-10 bg-background-left border-r border-[#043360] h-full overflow-y-auto">
        <div className="px-8 pt-8 pb-4 sm:px-12 xl:px-24">
          <div className="flex items-center gap-2 text-white font-extrabold text-xl tracking-tight">
            <span>Career Orbit</span>
          </div>
        </div>
        
        <div className="flex-1 flex flex-col justify-center px-8 sm:px-12 xl:px-24 max-w-[720px] w-full mx-auto py-10">
          <div className="flex flex-col gap-3 mb-8">
            <h1 className="text-white text-5xl font-bold leading-tight tracking-[-0.033em]">{title}</h1>
            <p className="text-muted-text text-lg font-normal leading-normal">{subtitle}</p>
          </div>
          {children}
        </div>

        <div className="p-6 text-center">
          <p className="text-blue-300/50 text-xs font-medium">© 2026 Career Orbit. All rights reserved.</p>
        </div>
      </div>

      {/* Right Section: Orbital Animation */}
      <div className="hidden lg:flex lg:w-1/2 bg-background-right relative items-center justify-center overflow-hidden">
        <div className="relative w-[800px] h-[800px] flex items-center justify-center z-10">
          <div className="absolute w-[300px] h-[300px] rounded-full border-[2px] border-cyan-900/90 border-dashed animate-spin-slow shadow-[0_0_20px_rgba(6,182,212,0.15)]"></div>
          <div className="absolute w-[460px] h-[460px] rounded-full border-[1.5px] border-purple-950/90 animate-spin-reverse-slow" style={{ animationDuration: '90s' }}></div>
          <div className="absolute w-[620px] h-[620px] rounded-full border-[2px] border-fuchsia-950/90 border-dashed animate-spin-slow shadow-[0_0_35px_rgba(217,70,239,0.15)]" style={{ animationDuration: '120s' }}></div>
          
          <div className="relative z-20 animate-float">
            <div className="absolute inset-[-40px] bg-white/30 blur-3xl rounded-full"></div>
            <div className="relative w-24 h-24 bg-[#06457F] rounded-full border-4 border-white/20 flex items-center justify-center shadow-[0_0_50px_rgba(6,69,127,0.3)]">
              <span className="material-symbols-outlined text-white text-[40px]">smart_toy</span>
            </div>
          </div>
          {/* Floating Icons */}
          <div className="absolute top-[34%] left-[36%] z-20 animate-float-delayed">
            <div className="float-icon-enhanced w-12 h-12 border-cyan-400"><span className="material-symbols-outlined text-cyan-300">code</span></div>
          </div>
        </div>
        
        <div className="absolute bottom-12 right-16 z-40 text-right pointer-events-none">
          <h2 className="font-display font-semibold text-3xl lg:text-4xl leading-relaxed">
            <span className="block text-[#06457F]">Build skills.</span>
            <span className="block text-[#00E676] font-bold">Apply for opportunities.</span>
            <span className="block text-black">Kickstart your career.</span>
          </h2>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;