import React from 'react';

export enum PrizeId {
  NETEASE = 'NETEASE',
  SPOTIFY = 'SPOTIFY',
  SODA = 'SODA',
}

export interface Prize {
  id: PrizeId;
  name: string;
  color: string;
  icon: React.ReactNode;
  textColor: string;
}

export interface ReelHandle {
  spin: (targetIndex: number, duration: number) => void;
}