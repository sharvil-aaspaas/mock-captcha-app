import React, { useEffect, useState } from 'react';

export const DestructionScreen: React.FC = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 0.5; // Slow burn
      });
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 bg-red-950 z-50 flex flex-col items-center justify-center p-8 font-mono overflow-hidden">
        {/* Background Glitch Effects */}
        <div className="absolute inset-0 bg-[url('https://media.giphy.com/media/oEI9uBYSzLpBK/giphy.gif')] opacity-10 mix-blend-overlay pointer-events-none bg-cover"></div>
        
        <div className="z-10 w-full max-w-2xl text-center space-y-12">
            <div className="space-y-4">
                <h1 className="text-6xl md:text-8xl font-black text-red-500 tracking-tighter animate-pulse">
                    SYSTEM PURGE
                </h1>
                <p className="text-red-400 text-xl md:text-2xl tracking-[0.5em] uppercase">
                    Unauthorized Access Detected
                </p>
            </div>

            <div className="w-full bg-red-900/30 border-2 border-red-600 p-2 rounded">
                <div 
                    className="h-8 bg-red-600 shadow-[0_0_20px_rgba(220,38,38,0.8)] transition-all duration-75 ease-linear"
                    style={{ width: `${progress}%` }}
                ></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left text-red-400/80 text-sm">
                <div className="space-y-1">
                    <p>> DELETING SECTOR 7G...</p>
                    <p>> OVERWRITING BOOT RECORD...</p>
                    <p>> FLUSHING ENCRYPTION KEYS...</p>
                    <p>> SCRAMBLING BIOS...</p>
                </div>
                <div className="space-y-1 md:text-right">
                    <p>STATUS: CRITICAL FAILURE</p>
                    <p>ATTEMPTS EXHAUSTED: 5/5</p>
                    <p>TRACE INITIATED: 192.168.0.X</p>
                    <p>LOCKDOWN: ACTIVE</p>
                </div>
            </div>
        </div>

        {/* Big Alert Icon */}
        <div className="absolute opacity-10 pointer-events-none">
            <svg className="w-96 h-96 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
        </div>
    </div>
  );
};