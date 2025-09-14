
import { Relic } from '../types';

export const RELIC_CATALOG: Relic[] = [
  { id: 1, name: 'Lágrima do Dragão', description: 'Aumenta permanentemente o dano de todas as cartas de ataque em +2.', effect: 'CARD_ATTACK_DAMAGE_BUFF', value: 2, kaomoji: '🐉 (；｀ロ´)っ💧' },
  { id: 2, name: 'Espinhos de Aço Vivo', description: 'Aumenta a defesa base em +2 permanentemente.', effect: 'PERMANENT_DEFENSE_BUFF', value: 2, kaomoji: '🦔🛡️ (ง •̀_•́)ง' },
  { id: 3, name: 'Medalha da Luta Longa', description: 'Aumenta o HP máximo do herói em +10.', effect: 'PERMANENT_MAX_HP_BUFF', value: 10, kaomoji: '💪❤️ (๑•̀ㅂ•́)و✧' },
  { id: 4, name: 'Manopla do Trovão', description: 'Aumenta o ataque base em +1 permanentemente.', effect: 'PERMANENT_ATTACK_BUFF', value: 1, kaomoji: '⚡👊 (｀・ω・´)ゞ' },
  { id: 5, name: 'Manto Protetor de Luz', description: 'Diminui o dano recebido em -1 (mínimo de 1).', effect: 'FLAT_DAMAGE_REDUCTION', value: 1, kaomoji: '✨🛡️ (つ≧▽≦)つ' },
  { id: 6, name: 'Pata da Resistência', description: 'Aumenta permanentemente a defesa em +3.', effect: 'PERMANENT_DEFENSE_BUFF', value: 3, kaomoji: '🐾🔰 (｡•̀ᴗ-)✧' },
  { id: 7, name: 'Semente Vital', description: 'Recupera 1 de vida ao final de cada batalha.', effect: 'POST_BATTLE_HEAL', value: 1, kaomoji: '🌱❤️ (｡♥‿♥｡)' },
  { id: 8, name: 'Fogo Interior', description: 'Todas as cartas de ataque ganham +1 de dano permanente.', effect: 'CARD_ATTACK_DAMAGE_BUFF', value: 1, kaomoji: '🔥💥 (ง\'̀-\'́)ง' },
  { id: 9, name: 'Casco de Rocha', description: 'Reduz em 20% todo dano físico recebido permanentemente.', effect: 'PERCENT_DAMAGE_REDUCTION', value: 20, kaomoji: '🐢🪨 (⌐■_■)' },
  { id: 10, name: 'Olho do Guardião', description: 'Sempre começa com +5 de escudo temporário.', effect: 'STARTING_SHIELD', value: 5, kaomoji: '👁️🛡️ (＠＾◡＾)' },
  { id: 11, name: 'Coração do Titã', description: 'Aumenta o HP máximo em +15 permanentemente.', effect: 'PERMANENT_MAX_HP_BUFF', value: 15, kaomoji: '💗🏔️ (* >ω<)' },
  { id: 12, name: 'Canino de Ferro', description: 'Quando causar um acerto crítico, causa +2 de dano extra.', effect: 'CRIT_BONUS_DAMAGE', value: 2, kaomoji: '🐺⚔️ (≧◡≦)' },
  { id: 13, name: 'Chifre Rachado', description: 'Aumenta o dano de suas cartas de ataque em +2 permanentemente.', effect: 'CARD_ATTACK_DAMAGE_BUFF', value: 2, kaomoji: '🦄✨ (ﾉ◕ヮ◕)ﾉ*:･ﾟ✧' },
  { id: 14, name: 'Pulseira do Equilíbrio', description: 'Aumenta ataque e defesa em +1.', effect: 'PERMANENT_ATK_DEF_BUFF', value: 1, kaomoji: '⚖️🎴 (✿◠‿◠)' },
  { id: 15, name: 'Aura de Cura', description: 'Recupera +3 de HP após cada vitória.', effect: 'POST_BATTLE_HEAL', value: 3, kaomoji: '🌟💖 (∩˃o˂∩)♡' },
];
