
import React, { useState } from 'react';
import { Card, Relic } from '../types';

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

const SelectableCard: React.FC<{ card: Card, isSelected: boolean, onSelect: () => void, isDisabled: boolean }> = ({ card, isSelected, onSelect, isDisabled }) => (
    <div
        onClick={!isDisabled || isSelected ? onSelect : undefined}
        className={`pixel-card p-2 text-left cursor-pointer transition-all duration-200 flex flex-col h-full ${!isSelected ? getCardColorClass(card.effectType) : ''} ${isSelected ? 'border-yellow-400 bg-purple-800/80 transform translate-y-[-4px]' : 'border-black'} ${isDisabled && !isSelected ? 'opacity-50 cursor-not-allowed' : 'hover:border-yellow-300'}`}
    >
        <h3 className="font-title text-sm text-white leading-tight text-shadow-title">{card.name}</h3>
        <p className="text-xs text-gray-200 mt-1 flex-grow text-shadow h-16 overflow-y-auto">{card.description}</p>
        <div className="text-center text-lg my-1 font-mono text-cyan-200 text-shadow">
            {card.kaomoji}
        </div>
         <div className="text-right text-[10px] font-bold text-yellow-300 capitalize border-t-2 border-black/50 pt-1 mt-auto text-shadow">
            <span>{card.effectType.replace(/_/g, ' ').toLowerCase()}</span>
        </div>
    </div>
);


export const DeckBuildingScreen: React.FC<{ cards: Card[], onConfirmDeck: (deck: Card[]) => void, initialRelic: Relic | null }> = ({ cards, onConfirmDeck, initialRelic }) => {
    const [selected, setSelected] = useState<number[]>([]);
    const canConfirm = selected.length === 5;

    const handleSelectCard = (cardId: number) => {
        setSelected(prev => {
            if (prev.includes(cardId)) {
                return prev.filter(id => id !== cardId);
            }
            if (prev.length < 5) {
                return [...prev, cardId];
            }
            return prev;
        });
    };
    
    const handleConfirm = () => {
        if (canConfirm) {
            const deck = cards.filter(c => selected.includes(c.id));
            onConfirmDeck(deck);
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-4">
            <h1 className="font-title text-3xl md:text-5xl text-yellow-400 mb-2 text-shadow-title">Construa seu Baralho</h1>
            <p className="text-gray-300 text-lg mb-2 text-shadow">Escolha 5 cartas para começar sua jornada.</p>

            {initialRelic && (
                <div className="mb-4 p-2 bg-purple-900/60 pixel-border-inset text-center max-w-md">
                    <p className="font-title text-yellow-300 text-shadow">Sua Primeira Relíquia:</p>
                    <p className="text-white font-bold">{initialRelic.name} {initialRelic.kaomoji}</p>
                    <p className="text-gray-300 text-sm italic">"{initialRelic.description}"</p>
                </div>
            )}
            
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 w-full max-w-6xl">
                {cards.map(card => (
                    <SelectableCard 
                        key={card.id} 
                        card={card}
                        isSelected={selected.includes(card.id)}
                        onSelect={() => handleSelectCard(card.id)}
                        isDisabled={selected.length >= 5}
                    />
                ))}
            </div>

            <div className="mt-8 text-center">
                 <p className="font-title text-xl text-white text-shadow mb-4">{selected.length} / 5 cartas selecionadas</p>
                <button onClick={handleConfirm} disabled={!canConfirm} className="pixel-button text-xl">
                    Confirmar Baralho
                </button>
            </div>
        </div>
    );
};
