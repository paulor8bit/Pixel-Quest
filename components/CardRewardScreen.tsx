import React from 'react';
import { Card } from '../types';

const getCardColorClass = (effectType: Card['effectType']): string => {
    switch (effectType) {
        // Ataque (Vermelho)
        case 'DIRECT_DAMAGE':
        case 'LIFESTEAL':
        case 'BUFF_ATTACK':
        case 'DEBUFF_DEFENSE':
            return 'bg-red-600';

        // Defesa (Amarelo)
        case 'BUFF_DEFENSE':
        case 'SHIELD_SELF':
        case 'DEBUFF_ATTACK':
            return 'bg-yellow-500';

        // Cura (Azul)
        case 'HEAL':
            return 'bg-blue-600';
        
        default:
            return 'bg-purple-600';
    }
};

const RewardCard: React.FC<{ card: Card, onSelect: () => void }> = ({ card, onSelect }) => (
    <button
        onClick={onSelect}
        className={`pixel-card p-2 text-left cursor-pointer h-full flex flex-col ${getCardColorClass(card.effectType)}`}
    >
        <h3 className="font-title text-sm text-white leading-tight text-shadow-title">{card.name}</h3>
        <p className="text-xs text-gray-200 mt-1 flex-grow text-shadow h-16 overflow-y-auto">{card.description}</p>
        <div className="text-center text-lg my-1 font-mono text-cyan-200 text-shadow">
            {card.kaomoji}
        </div>
        <div className="text-right text-[10px] font-bold text-yellow-300 capitalize border-t-2 border-black/50 pt-1 mt-auto text-shadow">
            <span>{card.effectType.replace(/_/g, ' ').toLowerCase()}</span>
        </div>
    </button>
);


export const CardRewardScreen: React.FC<{ cards: Card[], onSelectCard: (card: Card) => void, stage: number }> = ({ cards, onSelectCard, stage }) => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-purple-900/50">
            <h1 className="font-title text-3xl md:text-5xl text-green-400 mb-2 text-shadow-title">Vitória!</h1>
            <p className="text-gray-300 text-lg mb-6 text-shadow">Escolha uma carta como recompensa para adicionar ao seu baralho.</p>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 w-full max-w-6xl">
                {cards.map(card => (
                    <RewardCard 
                        key={card.id} 
                        card={card}
                        onSelect={() => onSelectCard(card)}
                    />
                ))}
            </div>

            <p className="mt-8 font-title text-xl text-white text-shadow animate-pulse">Pronto para a Fase {stage}?</p>
        </div>
    );
};