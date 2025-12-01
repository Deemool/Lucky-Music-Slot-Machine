import React, { useState, useRef, useImperativeHandle, forwardRef, useEffect } from 'react';
import { Prize, ReelHandle } from '../types';
import { ITEM_HEIGHT } from '../constants';

interface ReelProps {
  prizes: Prize[];
  initialIndex?: number;
  delay?: number;
}

const Reel = forwardRef<ReelHandle, ReelProps>(({ prizes, initialIndex = 0, delay = 0 }, ref) => {
  // We maintain a "strip" of items.
  // Instead of complex infinite scroll, we will simply append items to the list 
  // and translate Y downwards.
  
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [strip, setStrip] = useState<Prize[]>([]);
  const [offsetY, setOffsetY] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);
  const [transitionDuration, setTransitionDuration] = useState(0);

  // Initialize the strip with enough repeated items to look full
  useEffect(() => {
    // Initial render: minimal strip
    const initialStrip = [...prizes, ...prizes]; 
    setStrip(initialStrip);
    setOffsetY(-(initialIndex * ITEM_HEIGHT));
  }, [prizes, initialIndex]);

  useImperativeHandle(ref, () => ({
    spin: (targetIndex: number, duration: number) => {
      setIsSpinning(true);
      
      // Calculate how many full loops we want to do to create the illusion of spinning
      // Add randomness to the number of loops so reels don't stop exactly together
      const minLoops = 5;
      const loops = minLoops + Math.floor(Math.random() * 3); 
      
      // The logical index we want to land on (relative to the original prizes array)
      const targetPrizeIndex = targetIndex % prizes.length;
      
      // Current logical position
      const currentLogicalIndex = Math.abs(Math.round(offsetY / ITEM_HEIGHT)) % prizes.length;
      
      // Calculate total items to scroll
      // We need to add enough items to the strip to reach the new target
      const additionalItemsCount = (loops * prizes.length) + (targetPrizeIndex - currentLogicalIndex + prizes.length) % prizes.length;
      
      // Generate the new strip segment
      const newItems: Prize[] = [];
      for (let i = 0; i < Math.ceil(additionalItemsCount / prizes.length) + 2; i++) {
        newItems.push(...prizes);
      }
      
      // Update strip state by appending new items (functional update to ensure we have latest)
      setStrip(prev => [...prev, ...newItems]);
      
      // Start animation after a brief delay for rendering
      setTimeout(() => {
        setTransitionDuration(duration + delay);
        // Calculate final pixel offset
        // We are currently at `offsetY`. We want to move DOWN (negative Y) by `additionalItemsCount * ITEM_HEIGHT`
        const targetOffsetY = offsetY - (additionalItemsCount * ITEM_HEIGHT);
        
        setOffsetY(targetOffsetY);
        
        // Cleanup after spin
        setTimeout(() => {
          setIsSpinning(false);
          // Optional: You could prune the strip here to save memory if the app runs for a long time,
          // but for a simple session, it's fine.
        }, duration + delay);
      }, 50);
    }
  }));

  return (
    <div 
      className="relative overflow-hidden bg-white border-x-4 border-gray-800 shadow-inner"
      style={{ 
        height: `${ITEM_HEIGHT}px`,
        width: '100%'
      }}
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
            className={`flex flex-col items-center justify-center w-full border-b border-gray-200 box-border ${prize.color} ${prize.textColor}`}
            style={{ height: `${ITEM_HEIGHT}px`, flexShrink: 0 }}
          >
            <div className="transform scale-125 mb-2 drop-shadow-md">
              {prize.icon}
            </div>
            <span className="text-lg font-bold uppercase tracking-wider drop-shadow-sm text-center px-2">
              {prize.name}
            </span>
          </div>
        ))}
      </div>
      
      {/* Overlay Shadow for Depth */}
      <div className="absolute inset-0 pointer-events-none shadow-[inset_0_10px_20px_rgba(0,0,0,0.5),inset_0_-10px_20px_rgba(0,0,0,0.5)] z-10"></div>
      
      {/* Highlight Line */}
      <div className="absolute top-1/2 left-0 right-0 h-1 bg-red-500 opacity-30 -translate-y-1/2 z-20 pointer-events-none"></div>
    </div>
  );
});

Reel.displayName = 'Reel';

export default Reel;