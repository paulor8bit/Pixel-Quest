
import React from 'react';
import { Relic } from '../types';

interface PlayerRelicsProps {
  relics: Relic[];
}

export const PlayerRelics: React.FC<PlayerRelicsProps> = ({ relics }) => {
  if (!relics) {
    return null;
  }

  return (
    <div className="mt-2 p-2 w-full max-w-[280px] sm:max-w-xs bg-slate-900/80 pixel-border-inset">
      <h3 className="font-title text-yellow-400 text-shadow text-base mb-2 text-center">Relíquias</h3>
      <div className="flex justify-center gap-2">
        {relics.map(relic => (
          <div key={relic.id} className="relative group flex items-center justify-center w-12 h-12 bg-purple-900/50 border-2 border-black">
            <span className="text-2xl" title={relic.name}>{relic.kaomoji.split(' ')[0]}</span>
            <div className="absolute bottom-full mb-2 w-48 p-2 bg-slate-800 text-white text-xs rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10 pixel-border-outset border-purple-400">
              <p className="font-bold text-yellow-300">{relic.name}</p>
              <p>{relic.description}</p>
            </div>
          </div>
        ))}
         {Array.from({ length: 3 - relics.length }).map((_, index) => (
             <div key={`empty-${index}`} className="w-12 h-12 bg-black/30 border-2 border-dashed border-gray-600 flex items-center justify-center">
                <span className="text-gray-600 text-xl font-bold">?</span>
             </div>
         ))}
      </div>
    </div>
  );
};
