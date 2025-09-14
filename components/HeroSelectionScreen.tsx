import React from 'react';
import { Hero } from '../types';

interface HeroSelectionCardProps {
  hero: Hero;
  onSelect: () => void;
}

const HeroSelectionCard: React.FC<HeroSelectionCardProps> = ({ hero, onSelect }) => (
  <div className="flex flex-col h-full bg-slate-700 p-2 sm:p-3 pixel-border-outset text-center">
    <div className="w-full h-32 sm:h-40 flex items-center justify-center bg-slate-900 pixel-border-inset overflow-hidden">
      <span className="text-6xl sm:text-7xl drop-shadow-lg" role="img" aria-label={hero.name}>
        {hero.emoji}
      </span>
    </div>
    <h2 className="font-title text-lg sm:text-xl text-white text-shadow-title mt-2">{hero.name}</h2>
    <p className="text-yellow-300 text-shadow text-sm sm:text-base">{hero.species}</p>
    <p className="text-gray-300 text-xs sm:text-sm italic mt-2 flex-grow">{hero.initialDescription}</p>
    <div className="mt-2 p-1.5 bg-purple-900/40 border-2 border-black/50 text-left">
        <h4 className="font-title text-yellow-400 text-xs sm:text-sm">{hero.ability.name}</h4>
        <p className="text-[11px] sm:text-xs text-gray-200">{hero.ability.description}</p>
    </div>
    <button onClick={onSelect} className="pixel-button mt-2 w-full text-sm">
      Escolher
    </button>
  </div>
);


interface HeroSelectionScreenProps {
  heroes: Hero[];
  onSelectHero: (hero: Hero) => void;
}

export const HeroSelectionScreen: React.FC<HeroSelectionScreenProps> = ({ heroes, onSelectHero }) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-2 sm:p-4">
      <h1 className="font-title text-3xl md:text-5xl text-yellow-400 mb-2 text-shadow-title">Escolha seu Herói</h1>
      <p className="text-gray-300 text-base sm:text-lg mb-4 sm:mb-6 text-shadow">Sua jornada começa agora!</p>
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2 sm:gap-4">
        {heroes.map(hero => (
          <HeroSelectionCard key={hero.id} hero={hero} onSelect={() => onSelectHero(hero)} />
        ))}
      </div>
    </div>
  );
};