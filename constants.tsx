import React from 'react';
import { Prize, PrizeId } from './types';

export const ITEM_HEIGHT = 140;

export const PRIZES: Prize[] = [
  {
    id: PrizeId.NETEASE,
    name: '网易云音乐',
    color: '#E60026', // NetEase Brand Red
    textColor: 'text-white',
    icon: (
      <svg viewBox="0 0 1024 1024" fill="currentColor" width="64" height="64" className="text-white">
        {/* Optimized NetEase "Note" Path */}
        <path d="M753.4 402.6c-7.9-44.5-39.8-82.6-82.7-100.1-12.7-4.8-25.4-3.2-35 3.2-6.4 7.9-6.4 20.6 1.6 28.6 30.2 25.4 50.8 60.4 54 100.1 4.8 47.7-12.7 92.1-47.7 125.5-38.1 34.9-90.5 46.1-141.4 28.6-50.8-17.5-87.4-58.8-95.3-111.2-1.6-9.5-9.5-15.9-19.1-15.9h-1.6c-9.5 0-17.5 6.4-19.1 15.9 1.6 66.7 49.3 122.3 112.8 141.4 12.7 4.8 25.4 6.4 38.1 6.4 50.8 0 100.1-20.6 135-60.4 42.9-46.1 60.4-111.2 42.9-174.7zM512 262.3c-111.2 0-203.3 81-217.6 187.4-1.6 9.5 4.8 19.1 14.3 20.6 1.6 0 3.2 0 4.8 0 7.9 0 15.9-6.4 17.5-14.3 12.7-87.4 88.9-149.3 179.5-149.3 101.7 0 184.3 82.6 184.3 184.3s-82.6 184.3-184.3 184.3c-73.1 0-135-41.3-165.2-101.7-4.8-7.9-14.3-11.1-23.8-6.4-7.9 4.8-11.1 14.3-6.4 23.8 35 69.9 106.4 116 190.6 116 122.3 0 220.8-98.5 220.8-220.8S634.3 262.3 512 262.3z" />
      </svg>
    ),
  },
  {
    id: PrizeId.SPOTIFY,
    name: 'Spotify',
    color: '#1DB954', // Spotify Green
    textColor: 'text-black',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="64" height="64" className="text-black">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.65 14.65c-.19.28-.56.37-.84.18-2.31-1.41-5.21-1.73-8.63-.95-.32.07-.65-.13-.72-.45-.07-.32.13-.65.45-.72 3.73-.85 6.94-.48 9.57 1.13.28.18.37.56.18.84zm1.2-2.67c-.23.33-.67.43-1 .2-2.9-1.78-7.31-2.29-10.74-1.25-.4.12-.83-.11-.95-.51-.12-.4.11-.83.51-.95 3.92-1.19 8.83-.62 12.18 1.51.33.23.43.67.2 1zm.1-2.77c-3.47-2.06-9.19-2.25-12.5-1.24-.52.16-1.07-.13-1.23-.65-.16-.52.13-1.07.65-1.23 3.86-1.18 10.21-.96 14.23 1.43.48.28.64.9.36 1.38-.28.48-.9.64-1.38.36z" />
      </svg>
    ),
  },
  {
    id: PrizeId.SODA,
    name: '汽水音乐',
    color: '#111111', // Soda Black
    textColor: 'text-white',
    icon: (
      <svg viewBox="0 0 24 24" width="64" height="64">
        <defs>
          <linearGradient id="sodaGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: '#F4E643', stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: '#34D399', stopOpacity: 1 }} />
          </linearGradient>
        </defs>
        {/* Stylized note with spark/bolt feel */}
        <path 
          d="M19 3H10c-1.1 0-2 .9-2 2v10.5c-1.5-.7-3.3-.6-4.6.4-1.6 1.2-1.9 3.5-.7 5.1s3.5 1.9 5.1.7c1.3-1 2-2.6 1.9-4.2V9h7c1.1 0 2-.9 2-2s-.9-2-2-2z" 
          fill="url(#sodaGradient)"
          transform="translate(-1, 1)"
        />
        <path
          d="M16 6.5L13 9.5M16.5 6L14 10" 
          stroke="url(#sodaGradient)" 
          strokeWidth="2" 
          strokeLinecap="round"
          opacity="0.8"
        />
      </svg>
    ),
  }
];