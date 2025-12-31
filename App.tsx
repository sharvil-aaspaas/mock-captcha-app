import React, { useState, useEffect } from 'react';
import { LoginScreen } from './components/LoginScreen';
import { CaptchaScreen } from './components/CaptchaScreen';
import { DestructionScreen } from './components/DestructionScreen';
import { AppState, CAPTCHA_SEQUENCE } from './types';

function App() {
  const [view, setView] = useState<AppState>(AppState.LOGIN);
  const [captchaIndex, setCaptchaIndex] = useState(0);
  const [attemptsLeft, setAttemptsLeft] = useState(5); 

  const handleLoginSuccess = () => {
    setView(AppState.CAPTCHA);
  };

  const handleCaptchaFail = () => {
    // Logic:
    // Start with 5 attempts.
    // 1. Fail -> 4 left
    // 2. Fail -> 3 left (Matches "Shot 5 -> Wrong. 3 attempts left")
    // 3. Fail -> 2 left
    // 4. Fail -> 1 left (Critical warning)
    // 5. Fail -> 0 left (Destruction)
    
    if (attemptsLeft > 1) {
      setAttemptsLeft(prev => prev - 1);
      setCaptchaIndex(prev => Math.min(prev + 1, CAPTCHA_SEQUENCE.length - 1));
    } else {
      setView(AppState.DESTRUCTION);
    }
  };

  return (
    <div className="antialiased text-slate-200">
      {view === AppState.LOGIN && (
        <LoginScreen onSuccess={handleLoginSuccess} />
      )}

      {view === AppState.CAPTCHA && (
        <CaptchaScreen 
          challenge={CAPTCHA_SEQUENCE[captchaIndex] || CAPTCHA_SEQUENCE[CAPTCHA_SEQUENCE.length - 1]}
          attemptsLeft={attemptsLeft}
          onFail={handleCaptchaFail}
          isLastChance={attemptsLeft <= 3}
        />
      )}

      {view === AppState.DESTRUCTION && (
        <DestructionScreen />
      )}
    </div>
  );
}

export default App;