
import { Card } from '../types';

export const CARD_CATALOG: Card[] = [
    // --- Ataques (Tema: Fofo Sombrio) ---
    { id: 1, name: 'Arranhão do Gato-Sombra', description: 'Um arranhão rápido e escuro que causa 8 de dano.', effectType: 'DIRECT_DAMAGE', value: 8, target: 'ENEMY', kaomoji: '(=｀ω´=)' },
    { id: 2, name: 'Pancada da Pelúcia Assombrada', description: 'Um golpe surpreendentemente forte de um brinquedo que causa 15 de dano.', effectType: 'DIRECT_DAMAGE', value: 15, target: 'ENEMY', kaomoji: '(ง •̀_•́)ง' },
    { id: 3, name: 'Mordida do Cupcake Venenoso', description: 'Doce, mas mortal. Causa 12 de dano.', effectType: 'DIRECT_DAMAGE', value: 12, target: 'ENEMY', kaomoji: '(T ω T)' },
    { id: 4, name: 'Agulha da Boneca de Vodu', description: 'Uma picada precisa que ignora parte da defesa, causando 10 de dano.', effectType: 'DIRECT_DAMAGE', value: 10, target: 'ENEMY', kaomoji: '(→_→)' },
    { id: 5, name: 'Espinho do Cacto Triste', description: 'Dispara um espinho melancólico que causa 9 de dano.', effectType: 'DIRECT_DAMAGE', value: 9, target: 'ENEMY', kaomoji: '(╮°-°)╮🌵' },

    // --- Cura e Recuperação (Tema: Animais Fofos) ---
    { id: 6, name: 'Abraço de Urso-Fofo', description: 'Um abraço quentinho que restaura 15 de vida.', effectType: 'HEAL', value: 15, target: 'PLAYER', kaomoji: '(o´ω`o)ﾉ' },
    { id: 7, name: 'Soneca da Capivara', description: 'Um descanso tranquilo que recupera 10 de vida.', effectType: 'HEAL', value: 10, target: 'PLAYER', kaomoji: '(-ω-`)..zzZ' },
    { id: 8, name: 'Néctar da Borboleta Brilhante', description: 'Um gole de néctar mágico que recupera 25 de vida.', effectType: 'HEAL', value: 25, target: 'PLAYER', kaomoji: '(ﾉ◕ヮ◕)ﾉ*:･ﾟ✧' },
    { id: 9, name: 'Ronronar do Gatinho', description: 'Um som reconfortante que cura 8 de vida.', effectType: 'HEAL', value: 8, target: 'PLAYER', kaomoji: '(=^･ω･^=)' },
    { id: 10, name: 'Canção do Rouxinol Curativo', description: 'Uma melodia que restaura 20 de vida.', effectType: 'HEAL', value: 20, target: 'PLAYER', kaomoji: '♪(*´○｀) o♪' },

    // --- Buffs (Tema: Animais Fofos) ---
    { id: 11, name: 'Rugido do Hamster de Batalha', description: 'Aumenta seu ataque em 3 permanentemente.', effectType: 'BUFF_ATTACK', value: 3, target: 'PLAYER', kaomoji: '٩(ˊωˋ*)و' },
    { id: 12, name: 'Carapaça de Tatu-Bola', description: 'Aumenta sua defesa em 3 permanentemente.', effectType: 'BUFF_DEFENSE', value: 3, target: 'PLAYER', kaomoji: '[ •`_´• ]' },
    { id: 13, name: 'Grito de Guerra do Furão', description: 'Aumenta seu ataque em 5 permanentemente.', effectType: 'BUFF_ATTACK', value: 5, target: 'PLAYER', kaomoji: `(ง'̀-'́)ง` },
    { id: 14, name: 'Postura do Pangolim de Aço', description: 'Aumenta sua defesa em 5 permanentemente.', effectType: 'BUFF_DEFENSE', value: 5, target: 'PLAYER', kaomoji: '(⌐■_■)' },
    { id: 15, name: 'Bênção do Coala Sábio', description: 'Aumenta o ataque em 2.', effectType: 'BUFF_ATTACK', value: 2, target: 'PLAYER', kaomoji: '(๑•̀ㅂ•́)و✧' },
    { id: 16, name: 'Proteção da Lhama Guardiã', description: 'Aumenta a defesa em 2.', effectType: 'BUFF_DEFENSE', value: 2, target: 'PLAYER', kaomoji: '(｡•̀ᴗ-)✧' },
    { id: 17, name: 'Foco do Gato-Coruja', description: 'Aumenta o ataque em 4.', effectType: 'BUFF_ATTACK', value: 4, target: 'PLAYER', kaomoji: '(O.o)' },
    { id: 18, name: 'Pelugem Densa de Alpaca', description: 'Aumenta a defesa em 4.', effectType: 'BUFF_DEFENSE', value: 4, target: 'PLAYER', kaomoji: '(￣(エ)￣)ゞ' },

    // --- Debuffs (Tema: Fofo Sombrio) ---
    { id: 19, name: 'Olhar Triste do Gato-Fantasma', description: 'Causa 5 de dano e reduz o ataque do inimigo em 2 com pura melancolia.', effectType: 'DEBUFF_ATTACK', value: 2, target: 'ENEMY', kaomoji: '(｡•́︿•̀｡)' },
    { id: 20, name: 'Doçura Corrosiva', description: 'Causa 5 de dano e derrete a armadura, reduzindo a defesa em 2.', effectType: 'DEBUFF_DEFENSE', value: 2, target: 'ENEMY', kaomoji: '(╬ Ò﹏Ó)' },
    { id: 21, name: 'Choro do Bebê-Demônio', description: 'Um choro irritante que reduz o ataque do inimigo em 3.', effectType: 'DEBUFF_ATTACK', value: 3, target: 'ENEMY', kaomoji: '(╥﹏╥)' },
    { id: 22, name: 'Rasgar a Costura', description: 'Expõe o recheio de algodão, reduzindo a defesa inimiga em 3.', effectType: 'DEBUFF_DEFENSE', value: 3, target: 'ENEMY', kaomoji: '(╯°□°）╯︵ ┻━┻' },
    { id: 23, name: 'Poeira de Sonolência', description: 'Um pó mágico de um bicho-da-seda sombrio que reduz o ataque em 1.', effectType: 'DEBUFF_ATTACK', value: 1, target: 'ENEMY', kaomoji: '(..› - ‹..)' },
    { id: 24, name: 'Chiclete Grudento', description: 'Deixa a armadura pegajosa e ineficaz, reduzindo a defesa em 1.', effectType: 'DEBUFF_DEFENSE', value: 1, target: 'ENEMY', kaomoji: '(¬､¬)' },

    // --- Dreno de Vida (Tema: Fofo Sombrio) ---
    { id: 25, name: 'Beijo do Morcego de Pelúcia', description: 'Causa 10 de dano e cura 50% do dano com um beijo arrepiante.', effectType: 'LIFESTEAL', value: 10, target: 'ENEMY', kaomoji: '(づ￣ ³￣)づ' },
    { id: 26, name: 'Sifão de Pirulito', description: 'Causa 14 de dano e cura 50% do dano causado.', effectType: 'LIFESTEAL', value: 14, target: 'ENEMY', kaomoji: '(>ω<)' },
    { id: 27, name: 'Abraço do Polvo de Goma', description: 'Causa 8 de dano e cura 50% do dano.', effectType: 'LIFESTEAL', value: 8, target: 'ENEMY', kaomoji: '(づ°‿°.)づ' },
    { id: 28, name: 'Sugador de Marshmallow', description: 'Causa 12 de dano e rouba 50% como vida.', effectType: 'LIFESTEAL', value: 12, target: 'ENEMY', kaomoji: '(๑´ڡ`๑)' },

    // --- Escudos (Tema: Animais Fofos) ---
    { id: 29, name: 'Escudo de Ouriço', description: 'Cria um escudo de espinhos fofos que absorve 10 de dano.', effectType: 'SHIELD_SELF', value: 10, target: 'PLAYER', kaomoji: '<(ö)>' },
    { id: 30, name: 'Barreira de Vaga-lumes', description: 'Um enxame de vaga-lumes cria um escudo que absorve 20 de dano.', effectType: 'SHIELD_SELF', value: 20, target: 'PLAYER', kaomoji: '｡･:*ﾟ☆' },
    { id: 31, name: 'Casulo de Fofura', description: 'Envolve você em um casulo protetor que absorve 15 de dano.', effectType: 'SHIELD_SELF', value: 15, target: 'PLAYER', kaomoji: '(∪｡∪)｡｡｡' },
    { id: 32, name: 'Aura do Axolote Mágico', description: 'Ganha um escudo protetor de 12 pontos.', effectType: 'SHIELD_SELF', value: 12, target: 'PLAYER', kaomoji: '(„• ֊ •„)' },

    // --- Cartas Mistas e Especiais ---
    { id: 33, name: 'Investida do Unicórnio Sombrio', description: 'Causa 25 de dano, mas você perde 5 de vida.', effectType: 'DIRECT_DAMAGE', value: 25, target: 'ENEMY', kaomoji: '୧(`^´)୨' },
    { id: 34, name: 'Pacto com o Hamster-Demônio', description: 'Perca 10 de vida para ganhar +5 de ataque.', effectType: 'BUFF_ATTACK', value: 5, target: 'PLAYER', kaomoji: '(🔥🐹🔥)' },
    { id: 35, name: 'Baforada do Dragãozinho Zangado', description: 'Uma bola de fogo fofa, mas poderosa! Causa 18 de dano.', effectType: 'DIRECT_DAMAGE', value: 18, target: 'ENEMY', kaomoji: '( `^´ )' },
    { id: 36, name: 'Sopro do Yeti de Gelo', description: 'Causa 8 de dano e reduz o ataque inimigo em 1 com um frio congelante.', effectType: 'DEBUFF_ATTACK', value: 1, target: 'ENEMY', kaomoji: '(＞_＜)' },
    { id: 37, name: 'Muralha de Tatus', description: 'Aumenta sua defesa em 4.', effectType: 'BUFF_DEFENSE', value: 4, target: 'PLAYER', kaomoji: '(🛡️)' },
    { id: 38, name: 'Adrenalina de Coelhinho Veloz', description: 'Ganha +3 de ataque.', effectType: 'BUFF_ATTACK', value: 3, target: 'PLAYER', kaomoji: '୧(﹒︠ᴗ﹒︡)୨' },
    { id: 39, name: 'Regeneração da Salamandra', description: 'Cura 12 de vida.', effectType: 'HEAL', value: 12, target: 'PLAYER', kaomoji: '(^▽^)' },
    { id: 40, name: 'Lâmina de Obsidiana Lascada', description: 'Causa 12 de dano e reduz a defesa inimiga em 1.', effectType: 'DEBUFF_DEFENSE', value: 1, target: 'ENEMY', kaomoji: '(⌐_⌐)' },
    { id: 41, name: 'Ataque Duplo da Lontra', description: 'Ataca duas vezes com pedrinhas, causando 14 de dano total.', effectType: 'DIRECT_DAMAGE', value: 14, target: 'ENEMY', kaomoji: '( •̀ ω •́ )y' },
    { id: 42, name: 'Suco de Frutinhas Bravas', description: '+2 de ataque.', effectType: 'BUFF_ATTACK', value: 2, target: 'PLAYER', kaomoji: '(🍓o´ω`o)੭' },
    { id: 43, name: 'Elixir de Beija-Flor', description: 'Cura 18 de vida.', effectType: 'HEAL', value: 18, target: 'PLAYER', kaomoji: '(o^∀^o)' },
    { id: 44, name: 'Escudo de Conchas do Mar', description: 'Ganha 10 de escudo.', effectType: 'SHIELD_SELF', value: 10, target: 'PLAYER', kaomoji: '(🐚)' },
    { id: 45, name: 'Maldição do Bicho-Preguiça', description: 'Reduz o ataque do inimigo em 4, deixando-o lento.', effectType: 'DEBUFF_ATTACK', value: 4, target: 'ENEMY', kaomoji: '(︶︹︺)' },
    { id: 46, name: 'Cabeçada do Gnomo de Jardim', description: 'Causa 16 de dano.', effectType: 'DIRECT_DAMAGE', value: 16, target: 'ENEMY', kaomoji: '(งಠ_ಠ)ง' },
    { id: 47, name: 'Bênção da Tartaruga Sábia', description: '+3 de defesa.', effectType: 'BUFF_DEFENSE', value: 3, target: 'PLAYER', kaomoji: '(🐢)' },
    { id: 48, name: 'Drenar do Mosquito de Veludo', description: 'Causa 9 de dano e cura 50%.', effectType: 'LIFESTEAL', value: 9, target: 'ENEMY', kaomoji: '(*μ_μ)' },
    { id: 49, name: 'Tiro de Gosma Pegajosa', description: 'Causa 6 de dano e reduz o ataque do inimigo em 2.', effectType: 'DEBUFF_ATTACK', value: 2, target: 'ENEMY', kaomoji: '(·•︠‿•︡ )' },
    { id: 50, name: 'Inspiração do Panda Vermelho', description: '+1 de ataque e +1 de defesa.', effectType: 'BUFF_ATTACK', value: 1, target: 'PLAYER', kaomoji: '(•U•)' },

    // Preenchendo até 80 com variações
    { id: 51, name: 'Cutucada com Varinha', description: 'Causa 7 de dano.', effectType: 'DIRECT_DAMAGE', value: 7, target: 'ENEMY', kaomoji: '( ´-ω-)/' },
    { id: 52, name: 'Carinho Curativo', description: 'Restaura 9 de vida.', effectType: 'HEAL', value: 9, target: 'PLAYER', kaomoji: '(｡･ω･)ﾉﾞ' },
    { id: 53, name: 'Escudo de Bolhas', description: 'Ganha um escudo de 8 pontos.', effectType: 'SHIELD_SELF', value: 8, target: 'PLAYER', kaomoji: '(о´∀`о)' },
    { id: 54, name: 'Ataque do Enxame de Mariposas', description: 'Causa 20 de dano.', effectType: 'DIRECT_DAMAGE', value: 20, target: 'ENEMY', kaomoji: '~(>_<~)' },
    { id: 55, name: 'Abraço de Grupo dos Lêmures', description: 'Restaura 30 de vida.', effectType: 'HEAL', value: 30, target: 'PLAYER', kaomoji: '(づ｡◕‿‿◕｡)づ' },
    { id: 56, name: 'Rosnado Feroz (de um filhote)', description: 'Aumenta o ataque em 1.', effectType: 'BUFF_ATTACK', value: 1, target: 'PLAYER', kaomoji: '( •`ᆽ´• )' },
    { id: 57, name: 'Endurecer Casco', description: 'Aumenta a defesa em 1.', effectType: 'BUFF_DEFENSE', value: 1, target: 'PLAYER', kaomoji: '(◎_◎;)' },
    { id: 58, name: 'Seta de Amoreira Venenosa', description: 'Causa 4 de dano e reduz o ataque do inimigo em 1.', effectType: 'DEBUFF_ATTACK', value: 1, target: 'ENEMY', kaomoji: '(>_>)' },
    { id: 59, name: 'Absorver Cor', description: 'Causa 6 de dano e cura 50%.', effectType: 'LIFESTEAL', value: 6, target: 'ENEMY', kaomoji: '(◐.̃◐)' },
    { id: 60, name: 'Barreira de Doces', description: 'Cria um escudo que absorve 25 de dano.', effectType: 'SHIELD_SELF', value: 25, target: 'PLAYER', kaomoji: '(🍬)' },
    { id: 61, name: 'Corte do Anjo de Papel', description: 'Causa 13 de dano.', effectType: 'DIRECT_DAMAGE', value: 13, target: 'ENEMY', kaomoji: '(ﾉ>_<)ﾉ' },
    { id: 62, name: 'Oração do Ratinho de Igreja', description: 'Restaura 16 de vida.', effectType: 'HEAL', value: 16, target: 'PLAYER', kaomoji: '(🙏)' },
    { id: 63, name: 'Intimidar com Fofura', description: 'Reduz o ataque inimigo em 2.', effectType: 'DEBUFF_ATTACK', value: 2, target: 'ENEMY', kaomoji: '(⁄ ⁄•⁄ω⁄•⁄ ⁄)' },
    { id: 64, name: 'Mordidinha Vampírica', description: 'Causa 5 de dano e cura 50%.', effectType: 'LIFESTEAL', value: 5, target: 'ENEMY', kaomoji: '(・ω<)' },
    { id: 65, name: 'Escudo de Pão de Ló', description: 'Ganha 5 de escudo (não coma!).', effectType: 'SHIELD_SELF', value: 5, target: 'PLAYER', kaomoji: '(🍞)' },
    { id: 66, name: 'Ira do Ornitorrinco', description: 'Aumenta o ataque em 6.', effectType: 'BUFF_ATTACK', value: 6, target: 'PLAYER', kaomoji: '( •`_´• )' },
    { id: 67, 'name': 'Couraça de Besouro-Rinoceronte', 'description': 'Aumenta a defesa em 6.', 'effectType': 'BUFF_DEFENSE', 'value': 6, 'target': 'PLAYER', 'kaomoji': '(|~|)' },
    { id: 68, 'name': 'Chifrada do Narval Cósmico', 'description': 'Um ataque poderoso que causa 22 de dano.', 'effectType': 'DIRECT_DAMAGE', 'value': 22, 'target': 'ENEMY', 'kaomoji': '_(°o•)_' },
    { id: 69, 'name': 'Milagre da Fênix Bebê', 'description': 'Uma cura poderosa de 40 de vida.', 'effectType': 'HEAL', 'value': 40, 'target': 'PLAYER', 'kaomoji': '╰(✨)╯' },
    { id: 70, 'name': 'Praga de Gafanhotos de Goma', 'description': 'Reduz o ataque do inimigo em 5.', 'effectType': 'DEBUFF_ATTACK', 'value': 5, 'target': 'ENEMY', 'kaomoji': '(⊙_⊙)' },
    { id: 71, 'name': 'Chuva Ácida de Refrigerante', 'description': 'Reduz a defesa do inimigo em 5.', 'effectType': 'DEBUFF_DEFENSE', 'value': 5, 'target': 'ENEMY', 'kaomoji': '(ب_ب)' },
    { id: 72, 'name': 'Banquete de Sanguessugas de Doce', 'description': 'Causa 15 de dano e cura 50%.', 'effectType': 'LIFESTEAL', 'value': 15, 'target': 'ENEMY', 'kaomoji': '(>.<)' },
    { id: 73, 'name': 'Fortaleza de Almofadas', 'description': 'Ganha um escudo de 30 pontos.', 'effectType': 'SHIELD_SELF', 'value': 30, 'target': 'PLAYER', 'kaomoji': '(⊂(・▽・)⊃)' },
    { id: 74, 'name': 'Meteoro de Caramelo', 'description': 'Um golpe devastador de 30 de dano.', 'effectType': 'DIRECT_DAMAGE', 'value': 30, 'target': 'ENEMY', 'kaomoji': '(☄️)' },
    { id: 75, 'name': 'Ressurgimento da Toupeira', 'description': 'Cura 22 de vida.', 'effectType': 'HEAL', 'value': 22, 'target': 'PLAYER', 'kaomoji': '(o･ｪ･o)' },
    { id: 76, 'name': 'Aura de Poder do Feneco', 'description': '+2 de ataque e +2 de defesa.', 'effectType': 'BUFF_ATTACK', 'value': 2, 'target': 'PLAYER', 'kaomoji': '(🦊)' },
    { id: 77, 'name': 'Estocada do Rato de Esgrima', 'description': 'Causa 11 de dano.', 'effectType': 'DIRECT_DAMAGE', 'value': 11, 'target': 'ENEMY', 'kaomoji': '(🤺)' },
    { id: 78, 'name': 'Toque da Pata do Wombat', 'description': 'Cura 14 de vida.', 'effectType': 'HEAL', 'value': 14, 'target': 'PLAYER', 'kaomoji': '(🐾)' },
    { id: 79, 'name': 'Armadura de Cristal de Açúcar', 'description': 'Ganha 18 de escudo.', 'effectType': 'SHIELD_SELF', 'value': 18, 'target': 'PLAYER', 'kaomoji': '(💎)' },
    { id: 80, 'name': 'Feitiço de Drenagem de Tinta', 'description': 'Causa 13 de dano e cura 50%.', 'effectType': 'LIFESTEAL', 'value': 13, 'target': 'ENEMY', 'kaomoji': '(✒️)' }
];