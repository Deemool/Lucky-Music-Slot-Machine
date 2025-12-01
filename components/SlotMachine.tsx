import React, { useState, useRef, useCallback } from 'react';
import { PRIZES, REEL_SPIN_DURATION } from '../constants';
import Reel from './Reel';
import { ReelHandle, Prize } from '../types';
import { Trophy, RotateCw } from 'lucide-react';
import confetti from 'canvas-confetti';

const SlotMachine: React.FC = () => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [winner, setWinner] = useState<Prize | null>(null);
  
  // Use 3 reels for the classic slot machine look, even though they will all land on the same prize
  const reel1Ref = useRef<ReelHandle>(null);
  const reel2Ref = useRef<ReelHandle>(null);
  const reel3Ref = useRef<ReelHandle>(null);

  const handleSpin = useCallback(() => {
    if (isSpinning) return;

    setIsSpinning(true);
    setWinner(null);

    // 1. Determine Winner (Equal Probability)
    const randomIndex = Math.floor(Math.random() * PRIZES.length);
    const selectedPrize = PRIZES[randomIndex];

    // 2. Trigger Spins with slight delays for visual effect
    // We want all reels to land on the SAME index to show a "Jackpot" / "Win" state for the chosen prize.
    const baseDuration = 2500;

    if (reel1Ref.current) reel1Ref.current.spin(randomIndex, baseDuration);
    if (reel2Ref.current) reel2Ref.current.spin(randomIndex, baseDuration + 300);
    if (reel3Ref.current) reel3Ref.current.spin(randomIndex, baseDuration + 600);

    // 3. Handle Completion
    setTimeout(() => {
      setIsSpinning(false);
      setWinner(selectedPrize);
      triggerWinEffect();
    }, baseDuration + 600); // Wait for the last reel

  }, [isSpinning]);

  const triggerWinEffect = () => {
    const duration = 3000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#ef4444', '#22c55e', '#eab308']
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#ef4444', '#22c55e', '#eab308']
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };

    frame();
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      
      {/* Machine Case */}
      <div className="relative bg-red-800 p-8 rounded-[40px] shadow-2xl border-b-8 border-r-8 border-red-950 max-w-4xl w-full">
        
        {/* Machine Header */}
        <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-yellow-500 px-12 py-4 rounded-t-3xl border-4 border-yellow-700 shadow-lg z-0">
          <h1 className="text-4xl md:text-5xl font-black text-red-900 font-digital tracking-widest uppercase text-center whitespace-nowrap">
            LUCKY DRAW
          </h1>
        </div>

        {/* Decorative Lights Top */}
        <div className="flex justify-between mb-6 px-4 mt-6">
          {[...Array(8)].map((_, i) => (
            <div key={i} className={`w-4 h-4 rounded-full ${isSpinning ? 'animate-pulse bg-yellow-300 bulb-glow' : 'bg-yellow-600'}`}></div>
          ))}
        </div>

        {/* Screen Area */}
        <div className="bg-black p-6 rounded-2xl border-4 border-gray-700 shadow-[inset_0_0_20px_rgba(0,0,0,1)]">
          <div className="flex gap-2 md:gap-4 h-[200px] md:h-[240px] items-center justify-center bg-gray-900 rounded overflow-hidden relative">
            
            {/* Reel 1 */}
            <div className="w-1/3 h-full rounded border-2 border-gray-600 overflow-hidden">
               <Reel ref={reel1Ref} prizes={PRIZES} initialIndex={0} delay={0} />
            </div>
             {/* Reel 2 */}
            <div className="w-1/3 h-full rounded border-2 border-gray-600 overflow-hidden">
               <Reel ref={reel2Ref} prizes={PRIZES} initialIndex={1} delay={300} />
            </div>
             {/* Reel 3 */}
            <div className="w-1/3 h-full rounded border-2 border-gray-600 overflow-hidden">
               <Reel ref={reel3Ref} prizes={PRIZES} initialIndex={2} delay={600} />
            </div>

            {/* Reflection Glare */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white to-transparent opacity-5 pointer-events-none rounded"></div>
          </div>
        </div>

        {/* Controls Area */}
        <div className="mt-8 flex flex-col items-center">
          
          {/* Winner Display */}
          <div className="h-20 mb-6 w-full flex items-center justify-center">
             {winner && !isSpinning ? (
               <div className="animate-bounce bg-white px-8 py-3 rounded-full border-4 border-yellow-400 shadow-lg flex items-center gap-3">
                 <Trophy className="text-yellow-600" size={32} />
                 <span className="text-2xl font-bold text-gray-800">
                   WINNER: <span className={`${winner.id === 'NETEASE' ? 'text-red-600' : winner.id === 'SPOTIFY' ? 'text-green-600' : 'text-yellow-600'}`}>{winner.name}</span>
                 </span>
               </div>
             ) : (
               <div className="text-red-200 text-opacity-60 text-lg font-digital tracking-widest">
                 {isSpinning ? 'GOOD LUCK...' : 'PRESS SPIN TO START'}
               </div>
             )}
          </div>

          {/* Big Spin Button */}
          <button 
            onClick={handleSpin}
            disabled={isSpinning}
            className={`
              group relative inline-flex items-center justify-center px-16 py-6 overflow-hidden font-bold rounded-full
              transition-all duration-300 transform hover:scale-105 active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed
              ${isSpinning ? 'cursor-not-allowed' : 'cursor-pointer hover:shadow-[0_0_30px_rgba(255,255,0,0.6)]'}
            `}
          >
            {/* Button 3D Body */}
            <span className="absolute inset-0 w-full h-full -mt-1 rounded-full opacity-30 bg-gradient-to-b from-transparent via-transparent to-gray-700"></span>
            <span className="relative block w-full h-full bg-yellow-500 rounded-full shadow-[0_5px_0_rgb(161,98,7),0_10px_10px_rgba(0,0,0,0.3)] group-active:shadow-none group-active:translate-y-1">
               <div className="absolute inset-0 rounded-full bg-gradient-to-b from-yellow-300 to-yellow-600 opacity-80"></div>
               <div className="relative flex items-center justify-center h-full px-8 gap-4">
                 <RotateCw className={`text-yellow-900 ${isSpinning ? 'animate-spin' : ''}`} size={32} />
                 <span className="text-3xl text-yellow-900 font-black tracking-widest drop-shadow-sm">SPIN</span>
               </div>
            </span>
          </button>
        </div>

        {/* Decorative Lights Bottom */}
        <div className="flex justify-between mt-8 px-4">
          {[...Array(8)].map((_, i) => (
             <div key={i} className={`w-4 h-4 rounded-full ${isSpinning ? 'animate-pulse delay-75 bg-yellow-300 bulb-glow' : 'bg-yellow-600'}`}></div>
          ))}
        </div>
        
        {/* Metal Plate Footer */}
        <div className="mt-8 mx-auto w-3/4 h-6 rounded bg-gradient-to-r from-gray-700 via-gray-400 to-gray-700 shadow-md border border-gray-600"></div>

      </div>

      <div className="mt-8 text-gray-500 text-sm font-mono">
        Equal Probability Fair Play System
      </div>
    </div>
  );
};

export default SlotMachine;