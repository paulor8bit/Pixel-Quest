import React, { useRef, useEffect } from 'react';
import { ActionLogEntry } from '../types';
import { User, Bot, Swords } from 'lucide-react';

interface ActionLogProps {
  log: ActionLogEntry[];
}

const getIcon = (turn: ActionLogEntry['turn']) => {
  switch (turn) {
    case 'JOGADOR':
      return <User className="text-cyan-300" size={18} />;
    case 'INIMIGO':
      return <Bot className="text-red-400" size={18} />;
    case 'SISTEMA':
      return <Swords className="text-yellow-400" size={18} />;
  }
};

export const ActionLog: React.FC<ActionLogProps> = ({ log }) => {
  const logEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    logEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [log]);

  return (
    <div className="w-full h-full min-h-48 md:h-auto flex-grow bg-slate-900/80 pixel-border-inset p-2 space-y-1 overflow-y-auto">
      {log.map((entry) => (
        <div 
          key={entry.id}
          className={`flex items-start space-x-2 text-base animate-fade-in ${entry.isCrit ? 'text-yellow-300 font-bold' : 'text-gray-200'}`}
        >
          <div className="flex-shrink-0 pt-0.5">{getIcon(entry.turn)}</div>
          <p className="text-shadow">{entry.message}</p>
        </div>
      ))}
      <div ref={logEndRef} />
    </div>
  );
};