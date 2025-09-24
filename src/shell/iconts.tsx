'use client';
import * as React from 'react';

type IconProps = React.SVGProps<SVGSVGElement> & { className?: string };

export const ChevronLeft: React.FC<IconProps> = ({ className, ...rest }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} {...rest}>
    <path d="M15 19L8 12L15 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const ChevronRight: React.FC<IconProps> = ({ className, ...rest }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} {...rest}>
    <path d="M9 5L16 12L9 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);