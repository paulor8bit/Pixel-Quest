
import React from 'react';
import { GameState } from '../types';

interface GameStatusProps {
  gameState: GameState;
  winner: 'JOGADOR' | 'INIMIGO' | null;
  onNextBattle?: () => void; // Made optional as it's no longer always needed
  onRetry: () => void;
  onGoToHeroSelect: () => void;
}

export const GameStatus: React.FC<GameStatusProps> = ({ gameState, winner, onNextBattle, onRetry, onGoToHeroSelect }) => {
  const getMessage = () => {
    switch (gameState) {
      case 'HERO_SELECTION':
         return 'Escolha seu Herói!';
      case 'DECK_BUILDING':
          return 'Construa seu Baralho!';
      case 'INITIALIZING':
        return 'Iniciando Batalha...';
      case 'PLAYER_TURN':
        return 'Seu Turno!';
      case 'ENEMY_TURN':
        return 'Turno do Inimigo';
      case 'BATTLE_WON':
        return 'Vitoria!';
      case 'CARD_REWARD':
        return 'Escolha sua Recompensa!';
      case 'RELIC_REWARD':
        return 'Escolha sua Relíquia!';
      case 'GAME_OVER':
        return 'Derrota!';
      default:
        return '';
    }
  };

  const message = getMessage();

  if (gameState === 'BATTLE_WON') {
    return (
      <div className="text-center p-2">
        <h2 className="font-title text-2xl md:text-4xl text-shadow-title mb-2 text-green-400">{message}</h2>
        <p className="text-gray-200 animate-pulse text-shadow">Aguardando sua recompensa...</p>
      </div>
    );
  }
  
    if (gameState === 'CARD_REWARD' || gameState === 'RELIC_REWARD') {
    return (
      <div className="text-center p-2">
        <h2 className="font-title text-2xl md:text-4xl text-shadow-title text-yellow-400 animate-pulse">{message}</h2>
      </div>
    );
  }

  if (gameState === 'GAME_OVER') {
    return (
      <div className="text-center p-2">
        <h2 className="font-title text-2xl md:text-4xl text-shadow-title mb-2 text-red-500">{message}</h2>
        <div className="flex justify-center gap-4">
            <button onClick={onRetry} className="pixel-button">
              Tentar Novamente
            </button>
            <button onClick={onGoToHeroSelect} className="pixel-button">
              Mudar Herói
            </button>
        </div>
      </div>
    );
  }

  return (
    <div className="text-center p-2">
      <h2 className="font-title text-xl md:text-3xl text-gray-200 animate-pulse text-shadow-title">{message}</h2>
    </div>
  );
};
