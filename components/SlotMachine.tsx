import React, { useState, useRef, useCallback } from 'react';
import { PRIZES } from '../constants';
import Reel from './Reel';
import { ReelHandle, Prize } from '../types';
import { Sparkles, Play, Music, Zap } from 'lucide-react';
import confetti from 'canvas-confetti';

const SlotMachine: React.FC = () => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [winner, setWinner] = useState<Prize | null>(null);
  
  const reel1Ref = useRef<ReelHandle>(null);
  const reel2Ref = useRef<ReelHandle>(null);
  const reel3Ref = useRef<ReelHandle>(null);

  const handleSpin = useCallback(() => {
    if (isSpinning) return;

    setIsSpinning(true);
    setWinner(null);

    // 1. Determine Winner (Equal Probability: 1/3 each)
    // Math.random() returns [0, 1), so multiplying by length and flooring gives uniform distribution
    const randomIndex = Math.floor(Math.random() * PRIZES.length);
    const selectedPrize = PRIZES[randomIndex];

    // 2. Trigger Spins
    const baseDuration = 2000;

    if (reel1Ref.current) reel1Ref.current.spin(randomIndex, baseDuration);
    if (reel2Ref.current) reel2Ref.current.spin(randomIndex, baseDuration + 200);
    if (reel3Ref.current) reel3Ref.current.spin(randomIndex, baseDuration + 400);

    // 3. Handle Completion
    setTimeout(() => {
      setIsSpinning(false);
      setWinner(selectedPrize);
      triggerWinEffect();
    }, baseDuration + 400); 

  }, [isSpinning]);

  const triggerWinEffect = () => {
    const count = 200;
    const defaults = {
      origin: { y: 0.7 }
    };

    function fire(particleRatio: number, opts: any) {
      confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio)
      });
    }

    fire(0.25, {
      spread: 26,
      startVelocity: 55,
      colors: ['#a78bfa', '#f472b6']
    });
    fire(0.2, {
      spread: 60,
      colors: ['#2dd4bf', '#fbbf24']
    });
    fire(0.35, {
      spread: 100,
      decay: 0.91,
      scalar: 0.8,
      colors: ['#ffffff']
    });
    fire(0.1, {
      spread: 120,
      startVelocity: 25,
      decay: 0.92,
      scalar: 1.2,
      colors: ['#a78bfa']
    });
  };

  return (
    <div className="relative w-full max-w-lg mx-auto p-4 md:p-0">
      
      {/* Main Glass Card */}
      <div className="relative bg-slate-900/60 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] shadow-2xl overflow-hidden">
        
        {/* Header Section */}
        <div className="pt-10 pb-6 text-center relative z-10">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Zap className="text-yellow-400 w-5 h-5 fill-yellow-400" />
            <span className="text-slate-400 text-xs font-bold tracking-[0.2em] uppercase">Today's Choice</span>
            <Zap className="text-yellow-400 w-5 h-5 fill-yellow-400" />
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white glow-text tracking-tight">
            听点什么?
          </h1>
        </div>

        {/* Reels Container */}
        <div className="px-6 pb-6 relative">
          {/* Decorative frame */}
          <div className="relative bg-slate-950 rounded-3xl p-3 shadow-[inset_0_2px_10px_rgba(0,0,0,0.5)] border border-slate-800">
            
            <div className="flex gap-2 h-[220px] rounded-2xl overflow-hidden relative bg-slate-900">
              {/* Payline Indicator */}
              <div className="absolute top-1/2 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-red-500/50 to-transparent z-20 -translate-y-1/2 pointer-events-none"></div>
              <div className="absolute top-1/2 left-2 -translate-y-1/2 z-20 pointer-events-none">
                 <div className="w-0 h-0 border-t-[6px] border-t-transparent border-l-[8px] border-l-red-500/80 border-b-[6px] border-b-transparent"></div>
              </div>
              <div className="absolute top-1/2 right-2 -translate-y-1/2 z-20 pointer-events-none">
                 <div className="w-0 h-0 border-t-[6px] border-t-transparent border-r-[8px] border-r-red-500/80 border-b-[6px] border-b-transparent"></div>
              </div>

              {/* Reels - Added flex centering to ensure the reel item (140px) is perfectly centered in the container (220px) */}
              <div className="flex-1 rounded-xl overflow-hidden bg-slate-800/50 flex items-center justify-center">
                <Reel ref={reel1Ref} prizes={PRIZES} initialIndex={0} delay={0} />
              </div>
              <div className="flex-1 rounded-xl overflow-hidden bg-slate-800/50 flex items-center justify-center">
                <Reel ref={reel2Ref} prizes={PRIZES} initialIndex={1} delay={100} />
              </div>
              <div className="flex-1 rounded-xl overflow-hidden bg-slate-800/50 flex items-center justify-center">
                <Reel ref={reel3Ref} prizes={PRIZES} initialIndex={2} delay={200} />
              </div>
              
              {/* Top/Bottom Fade Overlay */}
              <div className="absolute inset-0 reel-shadow-overlay z-10 pointer-events-none rounded-2xl"></div>
            </div>
          </div>
        </div>

        {/* Action Section */}
        <div className="px-8 pb-10 pt-4 flex flex-col items-center">
          
          {/* Status/Winner Text */}
          <div className="h-16 flex items-center justify-center w-full mb-6">
            {winner && !isSpinning ? (
              <div className="animate-[bounce_0.5s_infinite_alternate] flex flex-col items-center">
                 <span className="text-slate-400 text-sm font-medium mb-1">最佳选择</span>
                 <div className={`text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-200 flex items-center gap-2`}>
                   <Sparkles className="text-yellow-400 w-6 h-6" />
                   {winner.name}
                 </div>
              </div>
            ) : (
              <div className="flex items-center gap-2 text-slate-500/80">
                <Music className="w-4 h-4 animate-bounce" />
                <span className="text-sm tracking-widest font-mono">
                  {isSpinning ? '寻找灵感中...' : '点击按钮开启音乐之旅'}
                </span>
              </div>
            )}
          </div>

          {/* Spin Button */}
          <button 
            onClick={handleSpin}
            disabled={isSpinning}
            className={`
              w-full group relative h-16 rounded-2xl overflow-hidden transition-all duration-300 transform
              ${isSpinning ? 'scale-95 opacity-80 cursor-not-allowed' : 'hover:scale-[1.02] hover:shadow-[0_0_40px_rgba(139,92,246,0.3)] active:scale-95'}
            `}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-violet-600 via-fuchsia-500 to-violet-600 bg-[length:200%_auto] animate-[gradient_3s_linear_infinite] group-hover:bg-[length:150%_auto]"></div>
            <div className="absolute inset-[2px] bg-slate-900 rounded-[14px] flex items-center justify-center gap-3 transition-colors group-hover:bg-slate-900/90">
               <span className="relative font-bold text-xl tracking-widest text-white uppercase group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-violet-200 group-hover:to-pink-200 transition-all">
                 {isSpinning ? 'SPINNING...' : '开始抽取'}
               </span>
               {!isSpinning && <Play className="fill-white w-5 h-5" />}
            </div>
          </button>

          <div className="mt-6 flex items-center gap-2 opacity-30 hover:opacity-100 transition-opacity">
            <div className="w-1 h-1 bg-white rounded-full"></div>
            <p className="text-[10px] uppercase tracking-widest text-slate-300">
               Fair Random System
            </p>
            <div className="w-1 h-1 bg-white rounded-full"></div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default SlotMachine;