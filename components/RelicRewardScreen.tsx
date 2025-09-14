
import React from 'react';
import { Relic } from '../types';

const RelicRewardCard: React.FC<{ relic: Relic, onSelect: () => void }> = ({ relic, onSelect }) => (
    <button
        onClick={onSelect}
        className="pixel-card p-2 text-left cursor-pointer h-full flex flex-col bg-indigo-700"
    >
        <h3 className="font-title text-sm text-white leading-tight text-shadow-title">{relic.name}</h3>
        <p className="text-xs text-gray-200 mt-1 flex-grow text-shadow h-16 overflow-y-auto">{relic.description}</p>
        <div className="text-center text-lg my-1 font-mono text-cyan-200 text-shadow">
            {relic.kaomoji}
        </div>
        <div className="text-right text-[10px] font-bold text-yellow-300 capitalize border-t-2 border-black/50 pt-1 mt-auto text-shadow">
            <span>Relíquia</span>
        </div>
    </button>
);


export const RelicRewardScreen: React.FC<{ relics: Relic[], onSelectRelic: (relic: Relic) => void, stage: number }> = ({ relics, onSelectRelic, stage }) => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-purple-900/50">
            <h1 className="font-title text-3xl md:text-5xl text-green-400 mb-2 text-shadow-title">Recompensa do Chefe!</h1>
            <p className="text-gray-300 text-lg mb-6 text-shadow">Escolha uma Relíquia poderosa para te ajudar.</p>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 w-full max-w-6xl">
                {relics.map(relic => (
                    <RelicRewardCard 
                        key={relic.id} 
                        relic={relic}
                        onSelect={() => onSelectRelic(relic)}
                    />
                ))}
            </div>

            <p className="mt-8 font-title text-xl text-white text-shadow animate-pulse">Pronto para a Fase {stage}?</p>
        </div>
    );
};
