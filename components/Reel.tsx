import React, { useState, useImperativeHandle, forwardRef, useEffect } from 'react';
import { Prize, ReelHandle } from '../types';
import { ITEM_HEIGHT } from '../constants';

interface ReelProps {
  prizes: Prize[];
  initialIndex?: number;
  delay?: number;
}

const Reel = forwardRef<ReelHandle, ReelProps>(({ prizes, initialIndex = 0, delay = 0 }, ref) => {
  const [strip, setStrip] = useState<Prize[]>([]);
  const [offsetY, setOffsetY] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);
  const [transitionDuration, setTransitionDuration] = useState(0);

  useEffect(() => {
    const initialStrip = [...prizes, ...prizes]; 
    setStrip(initialStrip);
    setOffsetY(-(initialIndex * ITEM_HEIGHT));
  }, [prizes, initialIndex]);

  useImperativeHandle(ref, () => ({
    spin: (targetIndex: number, duration: number) => {
      setIsSpinning(true);
      
      const minLoops = 5;
      const loops = minLoops + Math.floor(Math.random() * 3); 
      const targetPrizeIndex = targetIndex % prizes.length;
      const currentLogicalIndex = Math.abs(Math.round(offsetY / ITEM_HEIGHT)) % prizes.length;
      const additionalItemsCount = (loops * prizes.length) + (targetPrizeIndex - currentLogicalIndex + prizes.length) % prizes.length;
      
      const newItems: Prize[] = [];
      for (let i = 0; i < Math.ceil(additionalItemsCount / prizes.length) + 2; i++) {
        newItems.push(...prizes);
      }
      
      setStrip(prev => [...prev, ...newItems]);
      
      setTimeout(() => {
        setTransitionDuration(duration + delay);
        const targetOffsetY = offsetY - (additionalItemsCount * ITEM_HEIGHT);
        setOffsetY(targetOffsetY);
        
        setTimeout(() => {
          setIsSpinning(false);
        }, duration + delay);
      }, 50);
    }
  }));

  return (
    <div 
      className="relative overflow-hidden w-full h-full"
      style={{ height: `${ITEM_HEIGHT}px` }}
    >
      <div 
        className="flex flex-col items-center w-full will-change-transform"
        style={{
          transform: `translateY(${offsetY}px)`,
          transition: isSpinning ? `transform ${transitionDuration}ms cubic-bezier(0.25, 0.1, 0.25, 1)` : 'none',
        }}
      >
        {strip.map((prize, i) => (
          <div 
            key={i}
            className={`flex flex-col items-center justify-center w-full py-2`}
            style={{ height: `${ITEM_HEIGHT}px`, flexShrink: 0 }}
          >
            {/* App Icon Style Card */}
            <div 
              className="w-24 h-24 rounded-[22px] shadow-lg flex items-center justify-center mb-3 transform transition-transform duration-300"
              style={{ backgroundColor: prize.color }}
            >
              <div className="transform scale-90">
                {prize.icon}
              </div>
            </div>
            <span className="text-sm font-bold uppercase tracking-wider text-slate-500">
              {prize.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
});

Reel.displayName = 'Reel';

export default Reel;