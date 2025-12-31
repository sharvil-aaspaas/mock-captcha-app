import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
  borderColor?: string;
}

export const Layout: React.FC<LayoutProps> = ({ children, borderColor = "border-slate-700" }) => {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-slate-900 to-black z-0"></div>
      
      {/* Background decoration */}
      <div className="absolute top-10 left-10 text-xs font-mono text-slate-600 opacity-50 select-none">
        <div>SYS.ROOT.ACCESS</div>
        <div>VER: 4.9.2-ALPHA</div>
      </div>
      <div className="absolute bottom-10 right-10 text-xs font-mono text-slate-600 opacity-50 select-none text-right">
        <div>SECURE CONNECTION</div>
        <div>ENCRYPTION: AES-256</div>
      </div>

      <div className={`relative z-10 w-full max-w-md bg-black/80 backdrop-blur-sm border ${borderColor} shadow-2xl rounded-lg overflow-hidden flicker`}>
        {/* Header Bar */}
        <div className={`h-1 w-full ${borderColor.replace('border', 'bg')}`}></div>
        
        <div className="p-6 md:p-8">
          {children}
        </div>
      </div>
    </div>
  );
};