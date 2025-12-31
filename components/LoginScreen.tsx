import React, { useState, useEffect } from 'react';
import { Layout } from './Layout';

interface LoginScreenProps {
  onSuccess: () => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({ onSuccess }) => {
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState<'IDLE' | 'CHECKING' | 'SUCCESS' | 'ERROR'>('IDLE');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!password) return;

    setStatus('CHECKING');
    
    // Simulate decryption delay
    setTimeout(() => {
        setStatus('SUCCESS');
        setTimeout(onSuccess, 1000);
    }, 1500);
  };

  return (
    <Layout borderColor="border-slate-600">
      <div className="space-y-6">
        <div className="text-center space-y-2">
          <div className="mx-auto w-12 h-12 bg-slate-800 rounded-full flex items-center justify-center border border-slate-600">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h2 className="text-xl font-bold tracking-widest text-slate-100 uppercase font-mono">System Locked</h2>
          <p className="text-xs text-slate-400 font-mono">Enter decryption key to access payload.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="password" className="sr-only">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded p-3 text-center text-slate-100 focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 font-mono tracking-widest transition-all"
              placeholder="••••••••••••••"
              autoFocus
              autoComplete="off"
            />
          </div>

          <button
            type="submit"
            disabled={status === 'CHECKING' || status === 'SUCCESS'}
            className={`w-full py-3 px-4 rounded font-mono text-sm font-bold uppercase tracking-wider transition-all duration-200 
              ${status === 'SUCCESS' ? 'bg-green-600 text-white' : 'bg-slate-100 text-black hover:bg-white'}`}
          >
            {status === 'IDLE' && 'Decrypt'}
            {status === 'CHECKING' && 'Verifying Hash...'}
            {status === 'SUCCESS' && 'Access Granted'}
          </button>
        </form>
        
        {status === 'CHECKING' && (
           <div className="text-xs font-mono text-green-500 text-center animate-pulse">
             > DECRYPTING SECTORS 1-4...
           </div>
        )}
      </div>
    </Layout>
  );
};