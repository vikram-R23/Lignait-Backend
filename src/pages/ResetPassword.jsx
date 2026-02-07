import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState('');

  const navigate = useNavigate();
  
  // ✅ FIX 1: Handle different parameter names (token OR resetToken)
  const params = useParams();
  const token = params.token || params.resetToken; 

  const handleUpdate = async (e) => { 
    e.preventDefault();
    setError('');

    // ✅ FIX 2: Check the unified token variable
    if (!token) {
      setError('Invalid or missing reset token. Please request a new link.');
      return;
    }

    if (newPassword.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setStatus('loading');

    try {
      // ✅ FIX 3: Fetch URL now uses the 'token' variable safely
      const response = await fetch(`http://localhost:5000/api/auth/resetpassword/${token}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password: newPassword }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to reset password');
      }
      
      setStatus('success');
      setTimeout(() => navigate('/login'), 2500);

    } catch (err) {
      setStatus('error');
      setError(err.message || "An error occurred"); 
    }
  };

  return (
    <div className="font-display bg-[#06457F] h-screen w-screen flex items-center justify-center p-4 overflow-hidden relative">
      
      {/* LOGO */}
      <div className="absolute top-8 left-8 sm:left-12 z-50 select-none">
        <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#0474C4] to-cyan-400 flex items-center justify-center shadow-lg shadow-blue-500/30">
                <span className="material-symbols-outlined text-white text-xl">rocket_launch</span>
            </div>
            <span className="text-2xl font-black tracking-tight text-white">
                Career <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-400">Orbit</span>
            </span>
        </div>
      </div>

      <div className="absolute top-[-10%] left-[-10%] w-64 h-64 bg-blue-400/10 blur-[100px] rounded-full" />
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-cyan-400/10 blur-[120px] rounded-full" />

      <div className="w-full max-w-md bg-[#A8C4EC] rounded-[2.5rem] shadow-2xl overflow-hidden relative z-10">
        <div className="p-8 lg:p-10 flex flex-col gap-8">
          
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold text-[#06457F] tracking-tight">Reset Password</h1>
            <p className="text-[#06457F]/70 text-sm">
              Enter your new password to regain access to your account.
            </p>
          </div>

          <form onSubmit={handleUpdate} className="flex flex-col gap-5">
            
            <div className="space-y-2">
              <label className="text-xs font-semibold text-[#06457F] ml-1">New Password</label>
              <div className="relative">
                <input 
                  type={showNewPassword ? "text" : "password"}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="hide-browser-toggle w-full h-12 bg-white border border-white/10 rounded-xl px-5 pr-12 text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all placeholder-gray-400 text-[#06457F]"
                  placeholder="At least 6 characters"
                  required
                  disabled={status === 'loading' || status === 'success'}
                />
                <button 
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="absolute inset-y-0 right-4 flex items-center text-gray-400 hover:text-[#06457F] transition-colors"
                >
                  <span className="material-symbols-outlined text-[22px] select-none">
                    {showNewPassword ? 'visibility' : 'visibility_off'}
                  </span>
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold text-[#06457F] ml-1">Confirm Password</label>
              <div className="relative">
                <input 
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="hide-browser-toggle w-full h-12 bg-white border border-white/10 rounded-xl px-5 pr-12 text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all placeholder-gray-400 text-[#06457F]"
                  placeholder="Confirm your new password"
                  required
                  disabled={status === 'loading' || status === 'success'}
                />
                <button 
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute inset-y-0 right-4 flex items-center text-gray-400 hover:text-[#06457F] transition-colors"
                >
                  <span className="material-symbols-outlined text-[22px] select-none">
                    {showConfirmPassword ? 'visibility' : 'visibility_off'}
                  </span>
                </button>
              </div>
            </div>

            {error && (
              <p className="text-red-600 text-xs ml-1 flex items-center gap-1 animate-pulse">
                <span className="material-symbols-outlined text-sm">error</span>
                {error}
              </p>
            )}

            {status === 'success' && (
              <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-3 text-emerald-700 text-xs flex items-center gap-2">
                <span className="material-symbols-outlined text-sm">check_circle</span>
                Password updated! Redirecting to login...
              </div>
            )}

            <button 
              type="submit"
              disabled={status === 'loading' || status === 'success'}
              className="w-full h-12 rounded-xl bg-[#06457F] hover:bg-[#053a6b] text-white font-bold text-sm transition-all flex items-center justify-center gap-2 shadow-lg active:scale-[0.98] disabled:opacity-70 mt-2"
            >
              {status === 'loading' ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : 'Update Password'}
            </button>
          </form>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .hide-browser-toggle::-ms-reveal,
        .hide-browser-toggle::-ms-clear {
          display: none;
        }
        .hide-browser-toggle::-webkit-contacts-auto-fill-button,
        .hide-browser-toggle::-webkit-credentials-auto-fill-button {
          visibility: hidden;
          display: none !important;
          pointer-events: none;
        }
      `}} />
    </div>
  );
};

export default ResetPassword;