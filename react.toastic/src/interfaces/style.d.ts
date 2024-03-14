import { CSSProperties } from 'react';

export type StyleT = {
  toast?: CSSProperties;
  close?: {
    background: CSSProperties.background;
  };
  progress?: CSSProperties;
};
