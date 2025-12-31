import React, { useState, useEffect } from 'react';
import { Layout } from './Layout';
import { CaptchaChallenge } from '../types';

interface CaptchaScreenProps {
  challenge: CaptchaChallenge;
  attemptsLeft: number;
  onFail: () => void;
  isLastChance: boolean;
}

export const CaptchaScreen: React.FC<CaptchaScreenProps> = ({ challenge, attemptsLeft, onFail, isLastChance }) => {
  const [selected, setSelected] = useState<number[]>([]);
  const [verifying, setVerifying] = useState(false);
  const [images, setImages] = useState<string[]>([]);

  // Generate images using LoremFlickr for keyword matching
  useEffect(() => {
    const newImages = Array.from({ length: challenge.gridSize * challenge.gridSize }).map((_, i) => {
      // Deterministic pseudo-random choice for target vs distractor based on index and ID
      // This ensures we get a mix of correct and incorrect images
      const isTarget = (i + challenge.id) % 2 === 0 || (i * challenge.id) % 3 === 0;
      const keyword = isTarget ? challenge.imageKeyword : challenge.distractorKeyword;
      
      // Use lock to keep image consistent for this index/challenge combo
      return `https://loremflickr.com/200/200/${keyword}?lock=${challenge.id * 100 + i}`;
    });
    setImages(newImages);
    setSelected([]);
    setVerifying(false);
  }, [challenge]);

  const toggleSelection = (index: number) => {
    if (verifying) return;
    setSelected(prev => 
      prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
    );
  };

  const handleSubmit = () => {
    if (verifying) return;
    setVerifying(true);

    // Dramatic pause duration increases with tension
    const delay = isLastChance ? 3500 : 1500;

    setTimeout(() => {
      onFail(); // Always fail according to script
    }, delay);
  };

  const gridCols = challenge.gridSize === 3 ? 'grid-cols-3' : 'grid-cols-4';

  return (
    <Layout borderColor={isLastChance ? "border-red-600" : "border-blue-500"}>
      <div className="space-y-4">
        {/* Header Block */}
        <div className={`bg-blue-600 p-4 rounded-sm text-white flex flex-col shadow-lg ${isLastChance ? 'bg-red-600 animate-pulse' : ''}`}>
          <div className="text-xs uppercase font-bold opacity-80">Security Check</div>
          <div className="text-lg font-bold leading-tight mt-1">
            Select all squares with <br />
            <span className="text-2xl font-black">{challenge.prompt}</span>
          </div>
        </div>

        {/* Warning Banner */}
        {attemptsLeft < 5 && (
            <div className={`border p-2 text-center ${isLastChance ? 'bg-red-900/30 border-red-500/50' : 'bg-orange-900/20 border-orange-500/30'}`}>
                <p className={`${isLastChance ? 'text-red-500' : 'text-orange-400'} font-mono text-xs font-bold uppercase animate-pulse`}>
                    ⚠ Warning: {attemptsLeft} attempts remaining
                </p>
                {isLastChance && (
                    <p className="text-red-400 font-mono text-[10px] mt-1">
                        SYSTEM WIPE IMMINENT
                    </p>
                )}
            </div>
        )}

        {/* The Grid */}
        <div className={`grid ${gridCols} gap-1 bg-white p-1 select-none`}>
          {images.map((src, idx) => (
            <div 
              key={idx} 
              className="relative aspect-square cursor-pointer overflow-hidden group bg-slate-200"
              onClick={() => toggleSelection(idx)}
            >
              <img 
                src={src} 
                alt="captcha tile" 
                className={`w-full h-full object-cover transition-transform duration-200 ${selected.includes(idx) ? 'scale-90' : 'group-hover:scale-105'}`}
                loading="lazy"
              />
              {selected.includes(idx) && (
                <div className="absolute inset-0 border-4 border-blue-600 bg-blue-500/20 flex items-start justify-start p-1">
                  <div className="bg-blue-600 text-white rounded-full p-0.5">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Actions */}
        <div className="flex justify-between items-center pt-2">
            <div className="text-slate-500 text-xs">
                <svg className="w-5 h-5 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
                <svg className="w-5 h-5 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.536 15.536a5 5 0 000-7.072m-2.828 9.9a9 9 0 010-12.728" /></svg>
            </div>

            <button
                onClick={handleSubmit}
                disabled={verifying}
                className={`bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 px-6 rounded shadow-lg transition-colors
                    ${isLastChance ? 'bg-red-600 hover:bg-red-500' : ''}
                    ${verifying ? 'opacity-50 cursor-wait' : ''}
                `}
            >
                {verifying ? 'VERIFYING...' : 'VERIFY'}
            </button>
        </div>
      </div>
    </Layout>
  );
};