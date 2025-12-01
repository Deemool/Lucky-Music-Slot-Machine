import React from 'react';
import { Prize, PrizeId } from './types';
import { CloudLightning, Radio, Music } from 'lucide-react';

export const PRIZES: Prize[] = [
  {
    id: PrizeId.NETEASE,
    name: '网易云音乐',
    color: 'bg-red-600',
    textColor: 'text-white',
    icon: <CloudLightning size={48} />,
  },
  {
    id: PrizeId.SPOTIFY,
    name: 'Spotify',
    color: 'bg-green-500',
    textColor: 'text-black',
    icon: <Radio size={48} />,
  },
  {
    id: PrizeId.SODA,
    name: '汽水音乐',
    color: 'bg-yellow-400',
    textColor: 'text-black',
    icon: <Music size={48} />,
  },
];

export const ITEM_HEIGHT = 160; // Height of one prize item in pixels
export const REEL_SPIN_DURATION = 3000; // ms