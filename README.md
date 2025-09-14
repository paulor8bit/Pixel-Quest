# Gemini RPG: Pixel Quest

**Pixel Quest** é um RPG de construção de baralhos (deck-building) por turnos com um charmoso estilo de pixel art kawaii. Mergulhe em um mundo onde suas escolhas estratégicas, relíquias poderosas e um pouco de sorte nos dados determinam o resultado de cada batalha. Enfrente uma horda de inimigos únicos e chefes poderosos, todos criados para proporcionar uma aventura com rejogabilidade infinita.

## ✨ Funcionalidades

- **Construção Estratégica de Baralhos:** Comece com um baralho pequeno e curado e adicione novas cartas poderosas após cada vitória. Adapte seu baralho às forças do seu herói e ao seu estilo de jogo.
- **Combate Dinâmico por Turnos:** Participe de combates clássicos de RPG. No seu turno, jogue uma carta da sua mão. As ações são influenciadas por uma rolagem de um dado de 20 lados (d20), com acertos críticos e erros que adicionam um elemento de surpresa!
- **Heróis Únicos:** Escolha entre uma lista de heróis, cada um com uma habilidade passiva única que se fortalece a cada turno, moldando sua estratégia desde o início.
- **Relíquias Poderosas:** Derrote chefes para ganhar relíquias — itens especiais que concedem bônus passivos significativos, desde aumentar sua vida e ataque até fornecer um escudo no início da batalha.
- **Dificuldade Progressiva:** Viaje por múltiplos estágios, enfrentando inimigos cada vez mais desafiadores. A cada poucos estágios, você enfrentará um chefe poderoso que testará seu baralho e sua estratégia.
- **Estilo Charmoso de Pixel Art:** O jogo apresenta uma estética retrô e pixelizada com designs de personagens fofos e "kawaii", complementados por elementos de interface de RPG clássicos.

## 🎮 Como Jogar

1.  **Escolha seu Herói:** Comece sua aventura selecionando um herói. Cada um possui uma habilidade passiva única que é ativada no início do seu turno.
2.  **Construa seu Baralho Inicial:** Você receberá uma seleção de cartas. Escolha 5 para formar seu baralho inicial.
3.  **Batalha!**
    -   **Seu Turno:** Sua mão é comprada do seu baralho. Selecione uma carta para jogar. Um d20 é rolado — uma rolagem alta pode resultar em um acerto crítico para dano extra!
    -   **Turno do Inimigo:** O inimigo ataca. O sucesso e o dano também são determinados por uma rolagem de d20.
4.  **Reivindique sua Recompensa:** Após derrotar um inimigo, você será recompensado.
    -   **Batalhas Normais:** Escolha uma de várias cartas novas para adicionar ao seu baralho.
    -   **Batalhas de Chefe:** Escolha uma relíquia poderosa para lhe conceder um bônus permanente pelo resto da sua jornada.
5.  **Vença o Jogo:** Derrote os três formidáveis Chefes Abissais para salvar o reino e clamar a vitória!
6.  **Derrota:** Se seu HP chegar a zero, você pode tentar a batalha atual novamente ou voltar para a tela de seleção de heróis para começar uma nova aventura.

## 📂 Estrutura do Projeto

O projeto é construído com React, TypeScript e estilizado com Tailwind CSS, organizado na seguinte estrutura:

```
.
├── index.html              # Ponto de entrada HTML principal, inclui links de CDN e estilos
├── index.tsx               # Renderizador do componente raiz do React
├── App.tsx                 # Componente principal da aplicação, gerencia o estado e a lógica do jogo
├── types.ts                # Todas as definições de tipos TypeScript para o jogo
├── metadata.json           # Nome e descrição do projeto
│
├── components/             # Componentes React reutilizáveis
│   ├── ActionLog.tsx
│   ├── CardRewardScreen.tsx
│   ├── CharacterCard.tsx
│   ├── DeckBuildingScreen.tsx
│   ├── FloatingText.tsx
│   ├── GameStatus.tsx
│   ├── GameWonScreen.tsx
│   ├── HeroSelectionScreen.tsx
│   ├── PlayerHand.tsx
│   ├── PlayerRelics.tsx
│   └── RelicRewardScreen.tsx
│
├── context/                # Context do React para estado/funções globais
│   └── FloatingTextContext.tsx
│
└── data/                   # Dados estáticos do jogo
    ├── cards.ts
    ├── enemies.ts
    ├── heroes.ts
    └── relics.ts
```
