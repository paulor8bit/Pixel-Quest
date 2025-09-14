
import React, { forwardRef } from 'react';
import { Character } from '../types';
import { Shield, Sword, Heart, ShieldCheck, Sparkles } from 'lucide-react';

interface CharacterCardProps {
  character: Character;
  isPlayer?: boolean;
}

const HealthBar: React.FC<{ hp: number; maxHp: number }> = ({ hp, maxHp }) => {
  const percentage = Math.max(0, (hp / maxHp) * 100);
  let barColor = 'bg-green-500';
  if (percentage < 50) barColor = 'bg-yellow-400';
  if (percentage < 25) barColor = 'bg-red-600';

  return (
    <div className="w-full bg-black h-5 border-2 border-black p-0.5">
      <div
        className={`h-full transition-all duration-300 ease-in-out ${barColor}`}
        style={{ width: `${percentage}%` }}
      ></div>
    </div>
  );
};

export const CharacterCard = forwardRef<HTMLDivElement, CharacterCardProps>(({ character }, ref) => {
  return (
    <div ref={ref} className="w-full max-w-[280px] sm:max-w-xs bg-slate-700 p-1.5 sm:p-2 pixel-border-outset">
      <div className="relative">
        <div className="w-full h-36 sm:h-40 flex items-center justify-center bg-slate-900 pixel-border-inset overflow-hidden">
            <span className="text-7xl sm:text-8xl drop-shadow-lg" role="img" aria-label={character.name}>
                {character.emoji}
            </span>
        </div>
        <div className="absolute bottom-0 left-0 right-0 bg-black/50 p-1">
          <h2 className="font-title text-lg sm:text-xl text-white text-shadow-title">{character.name}</h2>
          <p className="text-yellow-300 text-shadow text-sm sm:text-base">{character.title}</p>
        </div>
      </div>
      
      <div className="mt-2 space-y-1.5 text-base">
        <div className="flex justify-between items-center text-white">
            <div className="flex items-center space-x-2 text-shadow">
                <Heart size={20} className="text-red-500"/>
                <span className="font-bold text-sm sm:text-base">{character.hp} / {character.maxHp}</span>
            </div>
            {character.shield > 0 && (
                 <div className="flex items-center space-x-2 text-cyan-300 text-shadow">
                    <ShieldCheck size={20} />
                    <span className="font-bold text-sm sm:text-base">{character.shield}</span>
                </div>
            )}
        </div>
        <HealthBar hp={character.hp} maxHp={character.maxHp} />
        
        <div className="flex justify-around items-center bg-black/30 p-1 border-2 border-black">
          <div className="flex items-center space-x-2 text-red-400 text-shadow">
            <Sword size={20} />
            <span className="font-bold text-lg sm:text-xl">{character.attack}</span>
          </div>
          <div className="flex items-center space-x-2 text-blue-400 text-shadow">
            <Shield size={20} />
            <span className="font-bold text-lg sm:text-xl">{character.defense}</span>
          </div>
        </div>

        {character.ability && (
            <div className="text-left p-1.5 bg-purple-900/50 pixel-border-inset">
                <div className="flex items-center gap-2">
                    <Sparkles className="text-yellow-300 flex-shrink-0" size={16}/>
                    <h4 className="font-title text-yellow-300 text-shadow text-xs sm:text-sm">{character.ability.name}</h4>
                </div>
                <p className="text-gray-200 text-xs mt-1">{character.ability.description}</p>
            </div>
        )}
        
        <p className="text-gray-300 text-xs sm:text-sm italic h-12 sm:h-14 overflow-y-auto p-1 bg-black/20 border-2 border-black/50">
          {character.story}
        </p>
      </div>
    </div>
  );
});