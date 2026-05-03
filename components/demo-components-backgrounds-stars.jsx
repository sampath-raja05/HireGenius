"use client";

import { StarsBackground } from '@/components/animate-ui/components/backgrounds/stars';
import { cn } from '@/lib/utils';

export const StarsBackgroundDemo = () => {
  return (
    <StarsBackground
      starColor="#FFF"
      className={cn(
        'absolute inset-0 flex items-center justify-center rounded-xl',
        'bg-[radial-gradient(ellipse_at_bottom,_#1f1f1f_0%,_#000_100%)]',
      )}
    />
  );
};
