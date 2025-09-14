
import React, { createContext, useState, useContext, useCallback, useRef, ReactNode } from 'react';
import { FloatingText, FloatingTextData } from '../components/FloatingText';

interface FloatingTextContextType {
    addFloatingText: (text: string, color: string, targetId: 'player' | 'enemy') => void;
    clearAllFloatingTexts: () => void;
    playerRef: React.RefObject<HTMLDivElement>;
    enemyRef: React.RefObject<HTMLDivElement>;
}

const FloatingTextContext = createContext<FloatingTextContextType | undefined>(undefined);

export const useFloatingText = () => {
    const context = useContext(FloatingTextContext);
    if (!context) {
        throw new Error('useFloatingText must be used within a FloatingTextProvider');
    }
    return context;
};

interface FloatingTextProviderProps {
    children: ReactNode;
}

export const FloatingTextProvider: React.FC<FloatingTextProviderProps> = ({ children }) => {
    const [texts, setTexts] = useState<FloatingTextData[]>([]);
    const nextId = useRef(0);
    const playerRef = useRef<HTMLDivElement>(null);
    const enemyRef = useRef<HTMLDivElement>(null);

    const addFloatingText = useCallback((text: string, color: string, targetId: 'player' | 'enemy') => {
        setTexts(currentTexts => [
            ...currentTexts,
            { id: nextId.current++, text, color, targetId }
        ]);
    }, []);
    
    const clearAllFloatingTexts = useCallback(() => {
        setTexts([]);
    }, []);


    const getTargetRect = (targetId: 'player' | 'enemy') => {
        const ref = targetId === 'player' ? playerRef : enemyRef;
        return ref.current?.getBoundingClientRect() || null;
    }

    return (
        <FloatingTextContext.Provider value={{ addFloatingText, clearAllFloatingTexts, playerRef, enemyRef }}>
            {children}
            <div className="floating-text-container">
                {texts.map((text) => (
                    <FloatingText
                        key={text.id}
                        {...text}
                        targetRect={getTargetRect(text.targetId)}
                    />
                ))}
            </div>
        </FloatingTextContext.Provider>
    );
};