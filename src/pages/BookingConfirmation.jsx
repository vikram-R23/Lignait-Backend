import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const BookingConfirmation = () => {
  const navigate = useNavigate();

  // --------------------------------
  // CHATBOT STATE (ADDED)
  // --------------------------------
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const [chatMessages, setChatMessages] = useState([
    { id: 1, sender: 'ai', text: 'Congratulations on your booking! Need help preparing for the interview?' }
  ]);
  const chatEndRef = useRef(null);

  useEffect(() => {
    const fetchAvailability = async () => {
      try {
        // Dummy logic for LLM/API initialization
        console.log("System Ready: API initialized.");
      } catch (err) {
        console.log("Connection pending...");
      }
    };
    fetchAvailability();
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
        const newAiMsg = { id: Date.now() + 1, sender: 'ai', text: "I've noted that. I'll remind you before the session starts!" };
        setChatMessages(prev => [...prev, newAiMsg]);
    }, 1000);
  };

  return (
    <div className="bg-[#06457F] min-h-screen w-full flex overflow-hidden text-white antialiased font-sans relative">
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes pop {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.2) rotate(10deg); }
        }
        @keyframes draw {
          to { stroke-dashoffset: 0; }
        }
        @keyframes pulseIcon {
          0%, 100% { transform: scale(1); box-shadow: 0 0 20px rgba(34, 197, 94, 0.4); }
          50% { transform: scale(1.05); box-shadow: 0 0 35px rgba(34, 197, 94, 0.7); }
        }
        .animate-emoji-pop { animation: pop 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275) infinite; }
        .animate-draw-check { 
          stroke-dasharray: 100; 
          stroke-dashoffset: 100; 
          animation: draw 0.6s ease-out forwards; 
        }
        .animate-pulse-success { animation: pulseIcon 2s ease-in-out infinite; }
        
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }

        /* Chat Animation */
        @keyframes slideUpFade {
            from { transform: translateY(20px) scale(0.95); opacity: 0; }
            to { transform: translateY(0) scale(1); opacity: 1; }
        }
        .chat-animate { animation: slideUpFade 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
      `}} />

      {/* Decorative Background Elements */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(4,116,196,0.15),transparent)] pointer-events-none"></div>
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none"></div>

      <main className="flex-1 overflow-y-auto no-scrollbar flex items-center justify-center p-8 z-10">
        <div className="max-w-2xl w-full flex flex-col items-center text-center">
          
          {/* Success Animated Icon */}
          <div className="mb-8 relative">
            <div className="absolute inset-0 bg-green-500/20 blur-2xl rounded-full scale-150"></div>
            <div className="relative size-24 bg-green-500 rounded-full flex items-center justify-center animate-pulse-success">
              <svg className="size-14 text-white" fill="none" stroke="currentColor" strokeWidth="4" viewBox="0 0 24 24">
                <path className="animate-draw-check" d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round"></path>
              </svg>
            </div>
          </div>

          {/* Header */}
          <div className="mb-10 space-y-4">
            <h2 className="text-white text-5xl font-bold tracking-tight flex items-center justify-center gap-3">
              Booking Confirmed! 
              <span className="inline-block animate-emoji-pop origin-center">🎉</span>
            </h2>
            <p className="text-[#D1D5DB] text-xl max-w-lg mx-auto leading-relaxed">
              Your mock interview with Yogesh Malhotra has been successfully scheduled.
            </p>
          </div>

          {/* Booking Card */}
          <div className="w-full bg-[#A8C4EC] rounded-2xl p-10 mb-10 text-left shadow-[0_20px_50px_rgba(0,0,0,0.3)] relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <span className="material-symbols-outlined text-[140px]">verified</span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-12 relative z-10">
              <div>
                <p className="text-slate-600 text-xs font-bold uppercase tracking-widest mb-2">Mentor</p>
                <div className="flex items-center gap-4">
                  <div className="size-12 rounded-full bg-cover bg-center border-2 border-white shadow-md" style={{backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuD4cws0d7GKTwaUXCdNINAGSz-M58nuwv6xLyuXZ12wUV_NeTxjQ0DGx_JICSCZX6vA3ePBZyWMLt6MaFthLjg_L5HUdYp6LuJEYlSkMoi6tjUnE2SX-dJ4qsx0cqf1WFkxfpnlkizdqO6gs-xAOMZosq5UvYitndtw1SDyH_yY3agCtZKmbbtQBtXv-dO-CQcglSPCEh1Irn7rvAI1AF3f16IC4bGB2t5Q9RNntSGMB2CiL0HVVsN6jl9luUP9LWCQVleuL5zlj0g')"}}></div>
                  <p className="text-slate-900 font-bold text-xl">Yogesh Malhotra</p>
                </div>
              </div>

              <div>
                <p className="text-slate-600 text-xs font-bold uppercase tracking-widest mb-2">Date</p>
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-slate-700 text-[24px]">calendar_today</span>
                  <p className="text-slate-900 font-bold text-xl">Tuesday, October 24</p>
                </div>
              </div>

              <div>
                <p className="text-slate-600 text-xs font-bold uppercase tracking-widest mb-2">Time</p>
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-slate-700 text-[24px]">schedule</span>
                  <p className="text-slate-900 font-bold text-xl">11:30 AM IST</p>
                </div>
              </div>

              <div>
                <p className="text-slate-600 text-xs font-bold uppercase tracking-widest mb-2">Mode</p>
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-slate-700 text-[24px]">videocam</span>
                  <p className="text-slate-900 font-bold text-xl">Mentor Mock Interview</p>
                </div>
              </div>
            </div>
          </div>

          {/* Email Info */}
          <p className="text-[#D1D5DB] text-base mb-12 flex items-center justify-center gap-3">
            <span className="material-symbols-outlined text-[20px] text-[#0474C4]">mail</span>
            A calendar invitation and meeting link have been sent to your registered email.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-6 w-full max-w-lg">
            <button className="flex-1 w-full py-5 bg-white/10 border border-white/20 text-white font-semibold rounded-xl transition-all duration-300 flex items-center justify-center gap-3 hover:bg-white/20 active:scale-95">
              <span className="material-symbols-outlined">event</span>
              Add to Calendar
            </button>
            <button 
              onClick={() => navigate('/dashboard')}
              className="flex-[1.5] w-full py-5 bg-[#0474C4] hover:bg-[#0585E0] text-white font-bold text-lg rounded-xl shadow-[0_8px_20px_rgba(4,116,196,0.3)] transition-all duration-300 active:scale-95"
            >
              Go to Dashboard
            </button>
          </div>
        </div>
      </main>

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
                        {/* Professional Chatbot Icon in Header */}
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
                        {/* EXPAND/COLLAPSE BUTTON */}
                        <button onClick={() => setIsExpanded(!isExpanded)} className="text-white/70 hover:text-white p-2 rounded-lg hover:bg-white/10 transition-colors" title={isExpanded ? "Collapse" : "Expand"}>
                            <span className="material-symbols-outlined text-[20px]">{isExpanded ? 'close_fullscreen' : 'open_in_full'}</span>
                        </button>
                        {/* CLOSE BUTTON */}
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

        {/* Toggle Button (FAB) - Hide when Expanded to avoid clutter */}
        {!isExpanded && (
            <button 
                onClick={() => setIsChatOpen(!isChatOpen)}
                className="h-16 w-16 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white shadow-xl shadow-cyan-500/30 flex items-center justify-center transition-all hover:scale-105 active:scale-95 group relative z-50 ring-4 ring-cyan-500/20 border border-white/20"
            >
                {isChatOpen ? (
                    <span className="material-symbols-outlined text-[32px]">keyboard_arrow_down</span>
                ) : (
                    <div className="relative">
                        {/* CUSTOM SVG ICON - Professional Robot Face */}
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

export default BookingConfirmation;