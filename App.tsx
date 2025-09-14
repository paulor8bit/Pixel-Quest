
import React, { useState, useEffect, useCallback } from 'react';
import { Character, GameState, ActionLogEntry, Card, Hero, EnemyData, Relic } from './types';
import { CARD_CATALOG } from './data/cards';
import { HEROES } from './data/heroes';
import { ENEMIES } from './data/enemies';
import { RELIC_CATALOG } from './data/relics';
import { CharacterCard } from './components/CharacterCard';
import { ActionLog } from './components/ActionLog';
import { GameStatus } from './components/GameStatus';
import { PlayerHand } from './components/PlayerHand';
import { HeroSelectionScreen } from './components/HeroSelectionScreen';
import { DeckBuildingScreen } from './components/DeckBuildingScreen';
import { CardRewardScreen } from './components/CardRewardScreen';
import { RelicRewardScreen } from './components/RelicRewardScreen';
import { GameWonScreen } from './components/GameWonScreen';
import { PlayerRelics } from './components/PlayerRelics';
import { FloatingTextProvider, useFloatingText } from './context/FloatingTextContext';
import { Loader } from 'lucide-react';

const D20_SIDES = 20;
const INITIAL_HAND_SIZE = 5;
const BOSS_INTERVAL = 5; // Boss appears after 5 common enemies
const BOSSES_TO_WIN = 3;
const MAX_RELICS = 3;

const STAGE_HP_PROGRESSION = {
  0: [15, 20, 30, 50, 75],      // World 1 (Stages 0-4)
  1: [80, 100, 120, 130, 150], // World 2 (Stages 6-10)
  2: [150, 160, 170, 180, 190], // World 3 (Stages 12-16)
};

const BOSS_HP_RANGES = [
  { min: 100, max: 150 }, // Boss 1
  { min: 200, max: 220 }, // Boss 2
  { min: 300, max: 400 }, // Boss 3
];


const shuffleArray = <T,>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

const AppContent: React.FC = () => {
  const [player, setPlayer] = useState<Character | null>(null);
  const [enemy, setEnemy] = useState<Character | null>(null);
  const [gameState, setGameState] = useState<GameState>('HERO_SELECTION');
  const [actionLog, setActionLog] = useState<ActionLogEntry[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [winner, setWinner] = useState<'JOGADOR' | 'INIMIGO' | null>(null);
  const [isPassiveApplied, setIsPassiveApplied] = useState(false);
  
  // Deckbuilding states
  const [playerDeck, setPlayerDeck] = useState<Card[]>([]);
  const [drawPile, setDrawPile] = useState<Card[]>([]);
  const [playerHand, setPlayerHand] = useState<Card[]>([]);
  const [initialCardSelection, setInitialCardSelection] = useState<Card[]>([]);
  const [rewardCardSelection, setRewardCardSelection] = useState<Card[]>([]);
  const [relicRewardSelection, setRelicRewardSelection] = useState<Relic[]>([]);

  const [selectedHero, setSelectedHero] = useState<Hero | null>(null);
  const [initialRelic, setInitialRelic] = useState<Relic | null>(null);
  const [stage, setStage] = useState(0);
  const [enemyProgression, setEnemyProgression] = useState<EnemyData[]>([]);
  const [bossesDefeated, setBossesDefeated] = useState(0);

  const { addFloatingText, clearAllFloatingTexts, playerRef, enemyRef } = useFloatingText();

  useEffect(() => {
    const commonEnemies = ENEMIES.filter(e => !e.isBoss);
    const bosses = ENEMIES.filter(e => e.isBoss);

    const numTiers = BOSSES_TO_WIN;
    const enemiesPerTier = Math.floor(commonEnemies.length / numTiers);
    const enemyTiers = [];
    for (let i = 0; i < numTiers; i++) {
        const start = i * enemiesPerTier;
        const end = (i === numTiers - 1) ? commonEnemies.length : start + enemiesPerTier;
        enemyTiers.push(shuffleArray(commonEnemies.slice(start, end)));
    }

    const shuffledBosses = shuffleArray(bosses);
    
    const progression: EnemyData[] = [];
    
    for (let i = 0; i < numTiers; i++) {
        const enemiesForThisWorld = enemyTiers[i] || [];
        progression.push(...enemiesForThisWorld.slice(0, BOSS_INTERVAL));
        if (shuffledBosses[i]) {
            progression.push(shuffledBosses[i]);
        }
    }

    progression.push(...shuffleArray(commonEnemies));
    setEnemyProgression(progression);
  }, []);

  const addToLog = useCallback((turn: 'JOGADOR' | 'INIMIGO' | 'SISTEMA', message: string, isCrit: boolean = false) => {
    setActionLog(prevLog => [...prevLog, { id: prevLog.length, turn, message, isCrit }]);
  }, []);

  const applyRelicStatBonuses = useCallback((character: Character, relic: Relic): Character => {
      let updatedChar = { ...character };
      switch(relic.effect) {
          case 'PERMANENT_MAX_HP_BUFF':
              updatedChar.maxHp += relic.value;
              updatedChar.hp += relic.value; // Heal for the same amount
              addFloatingText(`+${relic.value} HP Max`, '#22c55e', 'player');
              addToLog('SISTEMA', `${relic.name}: HP Máximo aumentado em ${relic.value}!`);
              break;
          case 'PERMANENT_ATTACK_BUFF':
              updatedChar.attack += relic.value;
              addFloatingText(`+${relic.value} ATK`, '#f59e0b', 'player');
              addToLog('SISTEMA', `${relic.name}: Ataque aumentado em ${relic.value}!`);
              break;
          case 'PERMANENT_DEFENSE_BUFF':
              updatedChar.defense += relic.value;
              addFloatingText(`+${relic.value} DEF`, '#3b82f6', 'player');
              addToLog('SISTEMA', `${relic.name}: Defesa aumentada em ${relic.value}!`);
              break;
          case 'PERMANENT_ATK_DEF_BUFF':
              updatedChar.attack += relic.value;
              updatedChar.defense += relic.value;
              addFloatingText(`+${relic.value} ATK/DEF`, '#f59e0b', 'player');
              addToLog('SISTEMA', `${relic.name}: Ataque e Defesa aumentados em ${relic.value}!`);
              break;
      }
      return updatedChar;
  }, [addToLog, addFloatingText]);

  const drawCards = useCallback((drawPileSource: Card[], count: number): { hand: Card[], newDrawPile: Card[] } => {
    let currentDrawPile = [...drawPileSource];
    const drawnCards: Card[] = [];
    for (let i = 0; i < count; i++) {
        if (currentDrawPile.length === 0) {
            addToLog('SISTEMA', 'Não há mais cartas para comprar nesta batalha!');
            break; 
        }
        const card = currentDrawPile.pop();
        if (card) {
            drawnCards.push(card);
        }
    }
    return { hand: drawnCards, newDrawPile: currentDrawPile };
  }, [addToLog]);
  
  const initializeBattle = useCallback((hero: Hero, stageIndex: number, persistPlayerStats: boolean = false, deckOverride?: Card[]) => {
    const enemyData = enemyProgression[stageIndex];
    if (!hero || !enemyData) {
        setWinner('JOGADOR');
        setGameState('GAME_WON');
        return;
    }

    setGameState('INITIALIZING');
    clearAllFloatingTexts();
    setActionLog([]);
    setWinner(null);
    setIsProcessing(true);
    setIsPassiveApplied(false);
    setStage(stageIndex);

    if(!persistPlayerStats || !selectedHero){
        setSelectedHero(hero);
    }
    
    addToLog('SISTEMA', `Fase ${stageIndex + 1}: Um novo desafio aparece...`);

    let newPlayerState: Character;
    if (persistPlayerStats && player) {
        newPlayerState = { ...player, shield: 0, statusEffects: [] };
        addToLog('SISTEMA', `${player.name} avança, mantendo seus atributos!`);
    } else {
        newPlayerState = {
            name: hero.name, title: hero.species, hp: hero.baseHp, maxHp: hero.baseHp,
            attack: hero.baseAttack, defense: hero.baseDefense, shield: 0, emoji: hero.emoji,
            story: hero.personality, ability: hero.ability, statusEffects: [], relics: []
        };
        // Apply initial relic stats
        if(initialRelic) {
            newPlayerState.relics = [initialRelic];
            newPlayerState = applyRelicStatBonuses(newPlayerState, initialRelic);
        }
    }
    
    let startingShield = newPlayerState.shield;
    newPlayerState.relics?.forEach(r => {
        if (r.effect === 'STARTING_SHIELD') startingShield += r.value;
    });
    if (startingShield > 0) {
      addFloatingText(`+${startingShield} 🛡️`, '#06b6d4', 'player');
      addToLog('SISTEMA', `Relíquias concedem um escudo de ${startingShield} no início da batalha!`);
    }
    newPlayerState.shield = startingShield;
    
    const isBoss = enemyData.isBoss;
    
    let scaledHp: number;
    let scaledAttack: number;
    let scaledDefense: number;
    
    if (isBoss) {
        const hpRange = BOSS_HP_RANGES[bossesDefeated];
        if (hpRange) {
          scaledHp = Math.floor(Math.random() * (hpRange.max - hpRange.min + 1)) + hpRange.min;
        } else {
          const bossScalingFactor = 1 + (bossesDefeated * 0.4);
          scaledHp = Math.floor(enemyData.baseHp * bossScalingFactor);
        }
        
        const bossScalingFactor = 1 + (bossesDefeated * 0.4);
        scaledAttack = Math.floor(enemyData.baseAttack * bossScalingFactor);
        scaledDefense = Math.floor(enemyData.baseDefense * bossScalingFactor);
        if (bossesDefeated > 0) {
           addToLog('SISTEMA', `${enemyData.name} parece muito mais poderoso do que antes!`);
        }
    } else {
        const worldIndex = Math.floor(stageIndex / (BOSS_INTERVAL + 1));
        const fightInWorld = stageIndex % (BOSS_INTERVAL + 1);
        
        const worldHpProgression = STAGE_HP_PROGRESSION[worldIndex as keyof typeof STAGE_HP_PROGRESSION];

        if (worldHpProgression && worldHpProgression[fightInWorld] !== undefined) {
          scaledHp = worldHpProgression[fightInWorld];
        } else {
          const scalingFactor = 1 + (stageIndex * 0.08); 
          scaledHp = Math.floor(enemyData.baseHp * scalingFactor);
        }
        
        const scalingFactor = 1 + (stageIndex * 0.08);
        scaledAttack = Math.floor(enemyData.baseAttack * scalingFactor);
        scaledDefense = Math.floor(enemyData.baseDefense * scalingFactor);
    }

    const enemyCharacter: Character = {
      name: enemyData.name, title: enemyData.species, hp: scaledHp, maxHp: scaledHp,
      attack: scaledAttack, defense: scaledDefense, shield: 0,
      emoji: enemyData.emoji, story: enemyData.description, ability: enemyData.ability, statusEffects: [],
      isBoss: enemyData.isBoss,
    };
    
    setPlayer(newPlayerState);
    setEnemy(enemyCharacter);

    const currentDeck = deckOverride || playerDeck;
    if(deckOverride) setPlayerDeck(deckOverride);

    const battleDrawPile = shuffleArray(currentDeck);
    const { hand, newDrawPile } = drawCards(battleDrawPile, INITIAL_HAND_SIZE);
    
    setPlayerHand(hand);
    setDrawPile(newDrawPile);
    
    addToLog('SISTEMA', `${newPlayerState.name} enfrenta ${enemyCharacter.name}!`);
    setTimeout(() => {
        setGameState('PLAYER_TURN');
        setIsProcessing(false);
    }, 500);
  }, [addToLog, addFloatingText, drawCards, enemyProgression, player, playerDeck, selectedHero, bossesDefeated, initialRelic, applyRelicStatBonuses, clearAllFloatingTexts]);

  const handleSelectHero = useCallback((hero: Hero) => {
    setSelectedHero(hero);
    const newPlayer = {
        name: hero.name, title: hero.species, hp: hero.baseHp, maxHp: hero.baseHp,
        attack: hero.baseAttack, defense: hero.baseDefense, shield: 0, emoji: hero.emoji,
        story: hero.personality, ability: hero.ability, statusEffects: [], relics: []
    };
    setPlayer(newPlayer);
    setPlayerDeck([]);
    setBossesDefeated(0);
    const firstRelic = shuffleArray(RELIC_CATALOG)[0];
    setInitialRelic(firstRelic);
    const randomCards = shuffleArray([...CARD_CATALOG]).slice(0, 10);
    setInitialCardSelection(randomCards);
    setGameState('DECK_BUILDING');
  }, []);

  const handleConfirmInitialDeck = useCallback((initialDeck: Card[]) => {
      if (selectedHero) {
          initializeBattle(selectedHero, 0, false, initialDeck);
      }
  }, [selectedHero, initializeBattle]);

  const handleSelectRewardCard = useCallback((rewardCard: Card) => {
    if (selectedHero) {
        addToLog('SISTEMA', `Nova carta adicionada ao baralho: ${rewardCard.name}!`);
        const newDeck = [...playerDeck, rewardCard];
        initializeBattle(selectedHero, stage + 1, true, newDeck);
    }
  }, [selectedHero, playerDeck, stage, initializeBattle, addToLog]);

  const handleSelectRelic = useCallback((relic: Relic) => {
    if (selectedHero && player) {
        addToLog('SISTEMA', `Nova relíquia adquirida: ${relic.name}!`);
        const updatedPlayer = applyRelicStatBonuses(player, relic);
        setPlayer({ ...updatedPlayer, relics: [...(player.relics || []), relic] });
        initializeBattle(selectedHero, stage + 1, true, playerDeck);
    }
  }, [selectedHero, player, stage, playerDeck, initializeBattle, addToLog, applyRelicStatBonuses]);

  const handleRetry = useCallback(() => {
     if(selectedHero) {
        initializeBattle(selectedHero, stage);
    }
  }, [selectedHero, stage, initializeBattle]);

  const handleGoToHeroSelect = useCallback(() => {
    setPlayer(null);
    setEnemy(null);
    setInitialRelic(null);
    setIsPassiveApplied(false);
    setGameState('HERO_SELECTION');
  }, []);

  const handleEnemyTurn = useCallback(() => {
    if (!player || !enemy || gameState === 'GAME_OVER' || gameState === 'BATTLE_WON') return;
    
    clearAllFloatingTexts();
    setIsProcessing(true);
    addToLog('INIMIGO', `${enemy.name} prepara seu movimento...`);
    
    setTimeout(() => {
        const roll = Math.floor(Math.random() * D20_SIDES) + 1;
        const isCrit = roll === 20;
        const isMiss = roll === 1;

        addToLog('INIMIGO', `${enemy.name} rola um d20... e consegue ${roll}!`, isCrit);

        let finalPlayerHp = player.hp;

        if(isMiss) {
            addToLog('INIMIGO', `Uma falha crítica! O ataque erra espetacularmente.`);
            addFloatingText('Miss!', '#cbd5e1', 'enemy');
        } else {
            const attackPower = enemy.attack + (isCrit ? Math.floor(enemy.attack * 0.5) : 0) + roll;
            let remainingAttack = attackPower;
            let damageToShield = 0;
            let damageToHp = 0;

            if (player.shield > 0) {
              damageToShield = Math.min(player.shield, remainingAttack);
              remainingAttack -= damageToShield;
            }
            
            if (remainingAttack > player.defense) {
                let initialDamage = remainingAttack - player.defense;
                
                // Aplicar reduções de dano das relíquias
                let flatReduction = 0;
                player.relics?.forEach(r => { if (r.effect === 'FLAT_DAMAGE_REDUCTION') flatReduction += r.value; });
                
                let percentReduction = 0;
                player.relics?.forEach(r => { if (r.effect === 'PERCENT_DAMAGE_REDUCTION') percentReduction += r.value; });

                let finalDamage = Math.max(0, initialDamage - flatReduction);
                finalDamage = Math.floor(finalDamage * (1 - (percentReduction / 100)));
                
                if (isCrit) {
                    addToLog('INIMIGO', `Um acerto crítico! O ataque causa dano massivo!`, true);
                }
                
                damageToHp = Math.max(1, finalDamage);
            }

            if (damageToShield > 0) {
              addFloatingText(`Absorvido ${damageToShield}`, '#3b82f6', 'player');
              addToLog('INIMIGO', `O escudo de ${player.name} absorve ${damageToShield} de dano.`);
            }
            if (damageToHp > 0) {
              addFloatingText(`-${damageToHp}`, '#ef4444', 'player');
              addToLog('INIMIGO', `${enemy.name} ataca ${player.name}, causando ${damageToHp} de dano.`);
            }
            if (damageToShield === 0 && damageToHp === 0) {
              addFloatingText('Bloqueado!', '#94a3b8', 'player');
              addToLog('INIMIGO', `A defesa de ${player.name} é muito forte! O ataque é bloqueado.`);
            }

            finalPlayerHp = player.hp - damageToHp;
            const finalPlayerShield = player.shield - damageToShield;

            setPlayer(p => p ? { ...p, hp: finalPlayerHp, shield: finalPlayerShield } : null);
        }
        
        if (finalPlayerHp <= 0) {
            addToLog('SISTEMA', `${player.name} foi derrotado!`);
            setWinner('INIMIGO');
            setGameState('GAME_OVER');
        } else {
            setGameState('PLAYER_TURN');
        }
        setIsProcessing(false);

    }, 1500);

  }, [player, enemy, addToLog, gameState, addFloatingText, clearAllFloatingTexts]);

  const handlePlayCard = useCallback((card: Card) => {
    if (gameState !== 'PLAYER_TURN' || isProcessing || !player || !enemy) return;
    
    setIsProcessing(true);
    
    const roll = Math.floor(Math.random() * D20_SIDES) + 1;
    const isCrit = roll === 20;

    addToLog('JOGADOR', `${player.name} joga ${card.name} e rola um d20... ${roll}!`, isCrit);

    let damageToEnemy = 0, healingToPlayer = 0, shieldToPlayer = 0;
    let playerAttackBuff = 0, playerDefenseBuff = 0, enemyAttackDebuff = 0;
    let enemyDefenseDebuff = 0, selfDamage = 0;

    // Relic buffs
    const cardDamageBuff = player.relics?.filter(r => r.effect === 'CARD_ATTACK_DAMAGE_BUFF').reduce((sum, r) => sum + r.value, 0) || 0;
    const critBonusDamage = player.relics?.filter(r => r.effect === 'CRIT_BONUS_DAMAGE').reduce((sum, r) => sum + r.value, 0) || 0;

    if (card.id === 33) selfDamage += 5;
    if (card.id === 34) { selfDamage += 10; playerAttackBuff += card.value; }
    if (card.id === 50) { playerAttackBuff += 1; playerDefenseBuff += 1; }
    if (card.id === 76) { playerAttackBuff += 2; playerDefenseBuff += 2; }
    
    let baseDamage = 0;

    switch(card.effectType) {
        case 'DIRECT_DAMAGE': 
            baseDamage = card.value + cardDamageBuff;
            damageToEnemy += Math.max(1, baseDamage + player.attack - enemy.defense); 
            break;
        case 'HEAL': healingToPlayer += card.value; break;
        case 'BUFF_ATTACK': if(![34, 50, 76].includes(card.id)) playerAttackBuff += card.value; break;
        case 'BUFF_DEFENSE': if(![50, 76].includes(card.id)) playerDefenseBuff += card.value; break;
        case 'DEBUFF_ATTACK': {
            enemyAttackDebuff += card.value;
            const debuffAttackDamages: {[key: number]: number} = { 19: 5, 36: 8, 49: 6, 58: 4 };
            if (card.id in debuffAttackDamages) damageToEnemy += Math.max(1, debuffAttackDamages[card.id] + cardDamageBuff + player.attack - enemy.defense);
            break;
        }
        case 'DEBUFF_DEFENSE': {
            enemyDefenseDebuff += card.value;
            const debuffDefenseDamages: {[key: number]: number} = { 20: 5, 40: 12 };
            if (card.id in debuffDefenseDamages) damageToEnemy += Math.max(1, debuffDefenseDamages[card.id] + cardDamageBuff + player.attack - enemy.defense);
            break;
        }
        case 'LIFESTEAL': {
            baseDamage = card.value + cardDamageBuff;
            const stealDamage = Math.max(1, baseDamage + player.attack - enemy.defense);
            damageToEnemy += stealDamage;
            healingToPlayer += Math.floor(stealDamage * 0.5);
            break;
        }
        case 'SHIELD_SELF': shieldToPlayer += card.value; break;
    }
    
    if (isCrit && damageToEnemy > 0) {
        addToLog('JOGADOR', `Acerto Crítico! Dano extra!`, true);
        addFloatingText('CRÍTICO!', '#facc15', 'player');
        damageToEnemy = Math.floor(damageToEnemy * 1.5) + critBonusDamage;
    }

    const finalEnemyHp = Math.max(0, enemy.hp - damageToEnemy);
    const finalPlayerHp = Math.max(0, Math.min(player.maxHp, player.hp + healingToPlayer) - selfDamage);

    if (damageToEnemy > 0) {
      addFloatingText(`-${damageToEnemy}`, '#ef4444', 'enemy');
      addToLog('JOGADOR', `Causa ${damageToEnemy} de dano a ${enemy.name}.`);
    }
    if (healingToPlayer > 0) {
      addFloatingText(`+${healingToPlayer}`, '#22c55e', 'player');
      addToLog('JOGADOR', `${player.name} se cura em ${healingToPlayer} pontos de vida.`);
    }
    if (selfDamage > 0) {
      addFloatingText(`-${selfDamage}`, '#ef4444', 'player');
      addToLog('JOGADOR', `${player.name} perde ${selfDamage} de vida como parte do custo.`);
    }
    if (shieldToPlayer > 0) {
      addFloatingText(`+${shieldToPlayer} 🛡️`, '#06b6d4', 'player');
      addToLog('JOGADOR', `${player.name} ganha um escudo de ${shieldToPlayer} pontos!`);
    }
    if (playerAttackBuff > 0) {
      addFloatingText(`ATK +${playerAttackBuff}`, '#f59e0b', 'player');
      addToLog('JOGADOR', `O ataque de ${player.name} aumenta em ${playerAttackBuff}!`);
    }
    if (playerDefenseBuff > 0) {
      addFloatingText(`DEF +${playerDefenseBuff}`, '#3b82f6', 'player');
      addToLog('JOGADOR', `A defesa de ${player.name} aumenta em ${playerDefenseBuff}!`);
    }
    if (enemyAttackDebuff > 0) {
      addFloatingText(`ATK -${enemyAttackDebuff}`, '#a855f7', 'enemy');
      addToLog('JOGADOR', `O ataque de ${enemy.name} é reduzido em ${enemyAttackDebuff}.`);
    }
    if (enemyDefenseDebuff > 0) {
      addFloatingText(`DEF -${enemyDefenseDebuff}`, '#a855f7', 'enemy');
      addToLog('JOGADOR', `A defesa de ${enemy.name} é reduzida em ${enemyDefenseDebuff}.`);
    }

    setPlayer(p => p ? {
        ...p, hp: finalPlayerHp, attack: p.attack + playerAttackBuff,
        defense: p.defense + playerDefenseBuff, shield: p.shield + shieldToPlayer,
    } : null);
    setEnemy(e => e ? {
        ...e, hp: finalEnemyHp, attack: Math.max(1, e.attack - enemyAttackDebuff),
        defense: Math.max(0, e.defense - enemyDefenseDebuff)
    } : null);

    const { hand: newCards, newDrawPile } = drawCards(drawPile, 1);
    setDrawPile(newDrawPile);
    setPlayerHand(currentHand => [...currentHand.filter(c => c.id !== card.id), ...newCards]);

    setTimeout(() => {
        if (finalEnemyHp <= 0) {
            addToLog('SISTEMA', `${enemy.name} foi aniquilado!`);
            setWinner('JOGADOR');
            setIsPassiveApplied(false);

            // Post-battle relic heal
            let postBattleHeal = player.relics?.filter(r => r.effect === 'POST_BATTLE_HEAL').reduce((sum, r) => sum + r.value, 0) || 0;
            if (postBattleHeal > 0) {
                 setPlayer(p => {
                    if (!p) return null;
                    const newHp = Math.min(p.maxHp, p.hp + postBattleHeal);
                    const healedAmount = newHp - p.hp;
                    if(healedAmount > 0) {
                      addFloatingText(`+${healedAmount}`, '#22c55e', 'player');
                      addToLog('SISTEMA', `Suas relíquias curam você em ${healedAmount} de vida.`);
                    }
                    return { ...p, hp: newHp };
                });
            }
            
            const wasBoss = enemy.isBoss;
            if (wasBoss) {
                const newBossCount = bossesDefeated + 1;
                setBossesDefeated(newBossCount);
                if (newBossCount >= BOSSES_TO_WIN) {
                    setGameState('GAME_WON');
                    return;
                }
            }

            // Reward Logic
            if (wasBoss && (player.relics?.length || 0) < MAX_RELICS) {
                const availableRelics = RELIC_CATALOG.filter(r => !(player.relics || []).find(pr => pr.id === r.id));
                setRelicRewardSelection(shuffleArray(availableRelics).slice(0, 5));
                setGameState('RELIC_REWARD');
            } else {
                 setGameState('BATTLE_WON');
                 setTimeout(() => {
                   const randomCards = shuffleArray([...CARD_CATALOG]).slice(0, 5);
                   setRewardCardSelection(randomCards);
                   setGameState('CARD_REWARD');
                 }, 1500);
            }
        } else if (finalPlayerHp <= 0) {
            addToLog('SISTEMA', `${player.name} sucumbiu...`);
            setWinner('INIMIGO');
            setGameState('GAME_OVER');
            setIsPassiveApplied(false);
        } else {
            setIsPassiveApplied(false);
            setGameState('ENEMY_TURN');
        }
        setIsProcessing(false);
    }, 1000);
  }, [gameState, isProcessing, player, enemy, drawPile, addToLog, addFloatingText, drawCards, stage, bossesDefeated]);

  useEffect(() => {
    if (gameState === 'ENEMY_TURN') {
      handleEnemyTurn();
    }
  }, [gameState, handleEnemyTurn]);

  useEffect(() => {
    if (gameState === 'PLAYER_TURN' && !isPassiveApplied) {
      clearAllFloatingTexts();
    }

    if (gameState !== 'PLAYER_TURN' || isPassiveApplied || !player || !player.ability || isProcessing) {
        return;
    }

    const { ability } = player;
    const { effect, value = 0, name, attackValue = 0, defenseValue = 0, healValue = 0 } = ability;

    let message: string | null = null;
    let playerUpdate: Partial<Character> | null = null;
    let textEffect: {text: string, color: string} | null = null;


    switch (effect) {
        case 'PASSIVE_ATTACK_BUFF':
            playerUpdate = { attack: player.attack + value };
            message = `Sente seu poder crescendo! Ataque +${value}.`;
            textEffect = {text: `ATK +${value}`, color: '#f59e0b'};
            break;
        case 'PASSIVE_DEFENSE_BUFF':
            playerUpdate = { defense: player.defense + value };
            message = `Fortalece sua postura! Defesa +${value}.`;
            textEffect = {text: `DEF +${value}`, color: '#3b82f6'};
            break;
        case 'PASSIVE_HEALTH_REGEN': {
            const newHp = Math.min(player.maxHp, player.hp + value);
            const healedAmount = newHp - player.hp;
            if (healedAmount > 0) {
                playerUpdate = { hp: newHp };
                message = `Recupera ${healedAmount} de vida.`;
                textEffect = {text: `+${healedAmount}`, color: '#22c55e'};
            }
            break;
        }
        case 'PASSIVE_MIXED_BUFF':
            playerUpdate = {
                attack: player.attack + value,
                defense: player.defense + value
            };
            message = `Se aprimora! Ataque e Defesa +${value}.`;
            textEffect = {text: `ATK/DEF +${value}`, color: '#f59e0b'};
            break;
        case 'PASSIVE_ATK_DEF_BUFF':
            playerUpdate = {
                attack: player.attack + attackValue,
                defense: player.defense + defenseValue
            };
            message = `Seu foco aumenta! Ataque +${attackValue} e Defesa +${defenseValue}.`;
            textEffect = {text: `ATK +${attackValue} / DEF +${defenseValue}`, color: '#f59e0b'};
            break;
        case 'PASSIVE_ATK_HEAL_BUFF': {
            const newHp = Math.min(player.maxHp, player.hp + healValue);
            const healedAmount = newHp - player.hp;
             playerUpdate = {
                attack: player.attack + attackValue,
                hp: newHp
            };
            if(healedAmount > 0) {
                 message = `Sua coragem o inspira! Ataque +${attackValue} e recupera ${healedAmount} de vida.`;
                 addFloatingText(`+${healedAmount}`, '#22c55e', 'player');
            } else {
                 message = `Sua coragem o inspira! Ataque +${attackValue}.`;
            }
            addFloatingText(`ATK +${attackValue}`, '#f59e0b', 'player');
            break;
        }
    }

    if (message && playerUpdate) {
        setIsPassiveApplied(true);
        setTimeout(() => {
            if(textEffect && !ability.effect.includes('HEAL')) addFloatingText(textEffect.text, textEffect.color, 'player');
            addToLog('JOGADOR', `Habilidade Passiva (${name}): ${message}`);
            setPlayer(p => p ? { ...p, ...playerUpdate! } : null);
        }, 300);
    } else {
        setIsPassiveApplied(true);
    }

  }, [gameState, isPassiveApplied, player, addToLog, isProcessing, addFloatingText, clearAllFloatingTexts]);

  const getStageDisplay = useCallback(() => {
    if (!enemy) return `${stage + 1}`;

    const cycleLength = BOSS_INTERVAL + 1;
    const currentBossNumber = Math.floor(stage / cycleLength) + 1;

    if (enemy.isBoss) {
        return `Chefe ${currentBossNumber}`;
    } else {
        const fightInCycle = (stage % cycleLength) + 1;
        return `${currentBossNumber} - ${fightInCycle}/${BOSS_INTERVAL}`;
    }
  }, [stage, enemy]);

  if (gameState === 'HERO_SELECTION') {
    return <HeroSelectionScreen heroes={HEROES} onSelectHero={handleSelectHero} />;
  }
  
  if (gameState === 'DECK_BUILDING') {
      return <DeckBuildingScreen cards={initialCardSelection} onConfirmDeck={handleConfirmInitialDeck} initialRelic={initialRelic} />;
  }

  if (gameState === 'CARD_REWARD') {
      return <CardRewardScreen cards={rewardCardSelection} onSelectCard={handleSelectRewardCard} stage={stage + 1} />;
  }
  
  if (gameState === 'RELIC_REWARD') {
      return <RelicRewardScreen relics={relicRewardSelection} onSelectRelic={handleSelectRelic} stage={stage + 1} />;
  }

  if (gameState === 'GAME_WON' && player) {
    return <GameWonScreen hero={player} onPlayAgain={handleGoToHeroSelect} />;
  }

  if (gameState === 'INITIALIZING' || !player || !enemy) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h1 className="font-title text-4xl md:text-5xl text-yellow-400 mb-4 text-shadow-title">Gemini RPG</h1>
        <div className="flex items-center space-x-3 text-2xl text-gray-300 text-shadow">
          <Loader className="animate-spin" />
          <span>Iniciando Batalha...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-2">
      <div className="bg-purple-900/50 p-2 md:p-4 flex flex-col min-h-[calc(100vh-1rem)]">
        <div className="relative">
          <GameStatus 
              gameState={gameState} 
              winner={winner} 
              onRetry={handleRetry}
              onGoToHeroSelect={handleGoToHeroSelect}
          />
          <div className="absolute top-0 right-0 font-title text-lg md:text-xl text-yellow-400 text-shadow p-2">
            Fase: {getStageDisplay()}
          </div>
        </div>
        
        <div className="mt-2 grid grid-cols-1 md:grid-cols-[auto_1fr_auto] gap-4 items-start flex-grow">
          <div className="flex justify-center md:order-3">
            <CharacterCard ref={enemyRef} character={enemy} />
          </div>
          <div className="flex flex-col h-full justify-center md:order-2">
            <ActionLog log={actionLog} />
          </div>
          <div className="flex flex-col items-center justify-center md:order-1">
            <CharacterCard ref={playerRef} character={player} isPlayer={true} />
            <PlayerRelics relics={player.relics || []} />
          </div>
        </div>

        <div className="mt-2">
            <PlayerHand 
                hand={playerHand}
                onPlayCard={handlePlayCard}
                disabled={gameState !== 'PLAYER_TURN' || isProcessing || !isPassiveApplied}
            />
        </div>
      </div>
    </div>
  );
};

export const App: React.FC = () => (
  <FloatingTextProvider>
    <AppContent />
  </FloatingTextProvider>
);