import React from 'react';
import { Card } from '../types';
import { Sword, Heart, Shield, Star, ShieldPlus, TrendingDown } from 'lucide-react';

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

interface CardDisplayProps {
    card: Card;
    onPlayCard: (card: Card) => void;
    disabled: boolean;
}

const getCardIcon = (effectType: Card['effectType']) => {
    const props = { className: "w-5 h-5 sm:w-6 sm:h-6", "aria-hidden": true };
    switch (effectType) {
        case 'DIRECT_DAMAGE':
            return <Sword {...props} color="#f47272" />;
        case 'HEAL':
            return <Heart {...props} color="#6eec83" />;
        case 'SHIELD_SELF':
            return <ShieldPlus {...props} color="#5ee9d8" />;
        case 'BUFF_ATTACK':
        case 'BUFF_DEFENSE':
            return <Star {...props} color="#f7e169" />;
        case 'DEBUFF_ATTACK':
        case 'DEBUFF_DEFENSE':
             return <TrendingDown {...props} color="#d877f9" />;
        case 'LIFESTEAL':
            return <Sword {...props} color="#f874c4" />;
        default:
            return <Shield {...props} color="#9ca3af" />;
    }
}

const CardDisplay: React.FC<CardDisplayProps> = ({ card, onPlayCard, disabled }) => {
    return (
        <button
            onClick={() => onPlayCard(card)}
            disabled={disabled}
            className={`pixel-card w-28 sm:w-32 md:w-36 lg:w-40 p-1.5 sm:p-2 flex flex-col flex-shrink-0 ${getCardColorClass(card.effectType)}`}
        >
            {/* Header */}
            <div className="flex justify-between items-start">
                <h3 className="font-title text-sm md:text-base text-left text-white leading-tight text-shadow-title">{card.name}</h3>
                <div className="flex-shrink-0 ml-1">{getCardIcon(card.effectType)}</div>
            </div>
            
            {/* Description */}
            <p className="text-xs md:text-sm text-gray-200 text-left mt-2 flex-grow text-shadow">{card.description}</p>
            
            {/* Kaomoji */}
            <div className="text-center text-xl sm:text-2xl my-1 font-mono text-cyan-200 text-shadow">
                {card.kaomoji}
            </div>

            {/* Footer */}
            <div className="text-right text-[10px] sm:text-xs font-bold text-yellow-300 capitalize border-t-2 border-black/50 pt-1 mt-auto text-shadow">
                <span>{card.effectType.replace(/_/g, ' ').toLowerCase()}</span>
            </div>
        </button>
    );
}


interface PlayerHandProps {
    hand: Card[];
    onPlayCard: (card: Card) => void;
    disabled: boolean;
}

export const PlayerHand: React.FC<PlayerHandProps> = ({ hand, onPlayCard, disabled }) => {
    return (
        <div className="w-full flex justify-center items-end gap-1 sm:gap-2 pb-1 h-auto min-h-[260px] md:min-h-[300px]">
           {hand.map(card => (
               <CardDisplay key={card.id} card={card} onPlayCard={onPlayCard} disabled={disabled} />
           ))}
        </div>
    );
};