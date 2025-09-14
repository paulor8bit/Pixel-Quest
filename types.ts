
export interface Card {
  id: number;
  name: string;
  description: string;
  effectType: CardEffectType;
  value: number; // Damage, heal amount, stat boost, etc.
  target: CardTarget;
  diceRoll?: boolean; // Does the effect involve a dice roll?
  kaomoji: string;
}

export type CardEffectType = 
  | 'DIRECT_DAMAGE'
  | 'HEAL'
  | 'BUFF_ATTACK'
  | 'BUFF_DEFENSE'
  | 'DEBUFF_ATTACK'
  | 'DEBUFF_DEFENSE'
  | 'LIFESTEAL'
  | 'SHIELD_SELF'; // Adds temporary HP that is depleted first

export type CardTarget = 'ENEMY' | 'PLAYER';

export type RelicEffectType = 
  | 'CARD_ATTACK_DAMAGE_BUFF' // Aumenta dano de cartas de ataque
  | 'PERMANENT_DEFENSE_BUFF'  // Aumenta defesa permanentemente
  | 'PERMANENT_MAX_HP_BUFF'   // Aumenta HP máximo permanentemente
  | 'PERMANENT_ATTACK_BUFF'   // Aumenta ataque permanentemente
  | 'FLAT_DAMAGE_REDUCTION'   // Reduz dano sofrido (valor fixo)
  | 'POST_BATTLE_HEAL'        // Cura após batalha
  | 'PERCENT_DAMAGE_REDUCTION'// Reduz dano sofrido (percentual)
  | 'STARTING_SHIELD'         // Ganha escudo no início da batalha
  | 'CRIT_BONUS_DAMAGE'       // Dano extra em acertos críticos
  | 'PERMANENT_ATK_DEF_BUFF'; // Aumenta ataque e defesa permanentemente

export interface Relic {
    id: number;
    name: string;
    description: string;
    effect: RelicEffectType;
    value: number;
    kaomoji: string;
}

export type HeroAbilityEffect =
  | 'AOE_DAMAGE' // Generic Area of Effect damage
  | 'BUFF_ALLIES_ATTACK' // Currently buffs self
  | 'DEBUFF_ENEMY_ATTACK'
  | 'DEBUFF_ENEMY_DEFENSE'
  | 'DIRECT_DAMAGE'
  | 'DOT_DAMAGE' // Damage over time
  | 'EVADE_NEXT_ATTACK'
  | 'HEAL_ALLIES' // Currently heals self
  | 'HEAVY_DEBUFF_ATTACK'
  | 'HEAVY_DEBUFF_DEFENSE'
  | 'IGNORE_ARMOR'
  | 'LIFESTEAL'
  | 'MASSIVE_DAMAGE'
  | 'PREVENT_ENEMY_ABILITY'
  | 'REFLECT_DAMAGE'
  | 'SELF_BUFF_ATTACK'
  | 'SELF_BUFF_DEFENSE'
  | 'STUN_ENEMY'
  | 'SUMMON_MINION' // Placeholder for summoning
  // New passive effects that trigger each turn
  | 'PASSIVE_ATTACK_BUFF'
  | 'PASSIVE_DEFENSE_BUFF'
  | 'PASSIVE_HEALTH_REGEN'
  | 'PASSIVE_MIXED_BUFF'
  | 'PASSIVE_ATK_DEF_BUFF'
  | 'PASSIVE_ATK_HEAL_BUFF';


export interface HeroAbility {
  name: string;
  description: string;
  effect: HeroAbilityEffect;
  value?: number; 
  attackValue?: number;
  defenseValue?: number;
  healValue?: number;
  duration?: number;
}


export interface CharacterData {
  name: string;
  emoji: string;
  species: string;
  personality: string;
  ability: HeroAbility;
  baseHp: number;
  baseAttack: number;
  baseDefense: number;
}


export interface Hero extends CharacterData {
  id: number;
  initialDescription: string;
}

export interface EnemyData extends CharacterData {
  id: number;
  description: string;
  isBoss?: boolean;
}

export interface StatusEffect {
  type: 'STUN' | 'BURN' | 'EVADE' | 'REFLECT' | 'ABILITY_LOCK' | 'ATTACK_BUFF';
  duration: number; // in turns
  value?: number; // e.g. burn damage, reflect percentage
}


export interface Character {
  name: string;
  title: string;
  hp: number;
  maxHp: number;
  attack: number;
  defense: number;
  shield: number; // For SHIELD_SELF effect
  emoji: string;
  story: string;
  ability?: HeroAbility;
  isBoss?: boolean; // Added to character to easily identify boss
  statusEffects?: StatusEffect[];
  relics?: Relic[];
}

export type GameState = 'HERO_SELECTION' | 'DECK_BUILDING' | 'CARD_REWARD' | 'RELIC_REWARD' | 'INITIALIZING' | 'PLAYER_TURN' | 'ENEMY_TURN' | 'BATTLE_WON' | 'GAME_OVER' | 'GAME_WON';

export interface ActionLogEntry {
  id: number;
  turn: 'JOGADOR' | 'INIMIGO' | 'SISTEMA';
  message: string;
  isCrit?: boolean;
}
