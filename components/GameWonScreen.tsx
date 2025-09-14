import React from 'react';
import { Character } from '../types';

interface GameWonScreenProps {
  hero: Character;
  onPlayAgain: () => void;
}

export const GameWonScreen: React.FC<GameWonScreenProps> = ({ hero, onPlayAgain }) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 text-center bg-gradient-to-br from-purple-800 via-indigo-700 to-teal-500 overflow-hidden relative">
      <style>{`
        @keyframes confetti-fall {
          0% { transform: translateY(-10vh) rotate(0deg); opacity: 1; }
          100% { transform: translateY(110vh) rotate(720deg); opacity: 0; }
        }
        .confetti {
          position: absolute;
          top: 0;
          width: 10px;
          height: 10px;
          animation-name: confetti-fall;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
        }
      `}</style>
      {/* Simple confetti effect */}
      {Array.from({ length: 50 }).map((_, i) => {
        const style = {
          left: `${Math.random() * 100}vw`,
          animationDelay: `${Math.random() * 5}s`,
          animationDuration: `${3 + Math.random() * 2}s`,
          backgroundColor: ['#ffc700', '#ff69b4', '#00ced1', '#adff2f'][i % 4]
        };
        return <div key={i} className="confetti" style={style}></div>;
      })}
      
      <div className="relative z-10 bg-black/50 p-8 pixel-border-outset border-yellow-400">
        <h1 className="font-title text-5xl md:text-7xl text-yellow-400 mb-4 text-shadow-title animate-bounce">
          VITÓRIA!
        </h1>
        <div className="text-6xl md:text-8xl my-4 drop-shadow-lg">{hero.emoji}</div>
        <p className="text-white text-xl md:text-2xl text-shadow mb-4">
          Parabéns, <span className="text-cyan-300 font-bold">{hero.name}</span>!
        </p>
        <p className="text-gray-200 text-lg md:text-xl text-shadow max-w-xl mx-auto mb-8">
          Você derrotou os 3 chefes abissais e salvou o reino de Pixel Quest da escuridão. Sua lenda será contada por gerações!
        </p>
        <button onClick={onPlayAgain} className="pixel-button text-xl">
          Jogar Novamente
        </button>
      </div>
    </div>
  );
};