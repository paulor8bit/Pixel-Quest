
import React, { useMemo } from 'react';

export interface FloatingTextData {
  id: number;
  text: string;
  color: string;
  targetId: 'player' | 'enemy';
}

interface FloatingTextProps extends FloatingTextData {
  targetRect: DOMRect | null; 
}

export const FloatingText: React.FC<FloatingTextProps> = ({ id, text, color, targetRect }) => {
  
  const style = useMemo(() => {
    if (!targetRect) return { display: 'none' };

    return {
      top: `${targetRect.top}px`, // Start at the top of the card
      left: `${targetRect.left + targetRect.width / 2}px`, // Center horizontally
      color: color,
    };
  }, [targetRect, color]);

  return (
    <div className="floating-text" style={style}>
      {text}
    </div>
  );
};