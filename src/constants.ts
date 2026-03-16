import { Animal } from './types';

export const ANIMALS: Animal[] = [
  { 
    id: 1, name: 'Avestruz', slug: 'avestruz', numbers: [1, 2, 3, 4], emoji: '🐦',
    imageUrl: 'https://images.unsplash.com/photo-1551085254-e96b210db58a?auto=format&fit=crop&q=80&w=800',
    puxadas: ['Vaca', 'Pavão', 'Peru', 'Touro'],
    history: 'O Avestruz é o primeiro bicho da tabela. No jogo do bicho, ele representa o início e a sorte renovada. É uma ave de grande porte que não voa, mas corre muito rápido.'
  },
  { 
    id: 2, name: 'Águia', slug: 'aguia', numbers: [5, 6, 7, 8], emoji: '🦅',
    puxadas: ['Coelho', 'Peru', 'Galo', 'Pavão'],
    history: 'A Águia simboliza a visão aguçada e a liberdade. No jogo, é associada a pessoas que buscam grandes objetivos e têm clareza em suas decisões.'
  },
  { 
    id: 3, name: 'Burro', slug: 'burro', numbers: [9, 10, 11, 12], emoji: '🫏',
    imageUrl: 'https://images.unsplash.com/photo-1534840639741-624819cb279c?auto=format&fit=crop&q=80&w=800',
    puxadas: ['Cavalo', 'Elefante', 'Touro', 'Vaca'],
    history: 'O Burro representa o trabalho duro e a persistência. Apesar da fama injusta, é um animal extremamente inteligente e resiliente.'
  },
  { 
    id: 4, name: 'Borboleta', slug: 'borboleta', numbers: [13, 14, 15, 16], emoji: '🦋',
    puxadas: ['Gato', 'Leão', 'Cachorro', 'Galo'],
    history: 'A Borboleta simboliza a transformação e a leveza. É um dos bichos mais populares pela sua beleza e ciclo de vida fascinante.'
  },
  { 
    id: 5, name: 'Cachorro', slug: 'cachorro', numbers: [17, 18, 19, 20], emoji: '🐕',
    puxadas: ['Galo', 'Camelo', 'Macaco', 'Porco'],
    history: 'O melhor amigo do homem não poderia faltar. Simboliza fidelidade e proteção. É um bicho muito querido pelos apostadores.'
  },
  { 
    id: 6, name: 'Cabra', slug: 'cabra', numbers: [21, 22, 23, 24], emoji: '🐐',
    puxadas: ['Touro', 'Carneiro', 'Urso', 'Cobra'],
    history: 'A Cabra representa a agilidade e a sobrevivência em terrenos difíceis. É um animal rústico e cheio de energia.'
  },
  { 
    id: 7, name: 'Carneiro', slug: 'carneiro', numbers: [25, 26, 27, 28], emoji: '🐏',
    puxadas: ['Cabra', 'Coelho', 'Jacaré', 'Cavalo'],
    history: 'O Carneiro simboliza a mansidão, mas também a força do rebanho. É um bicho tradicional nas tabelas do jogo.'
  },
  { 
    id: 8, name: 'Camelo', slug: 'camelo', numbers: [29, 30, 31, 32], emoji: '🐪',
    puxadas: ['Cachorro', 'Elefante', 'Urso', 'Macaco'],
    history: 'O Camelo representa a resistência e a capacidade de atravessar desertos. Simboliza a paciência e a economia.'
  },
  { 
    id: 9, name: 'Cobra', slug: 'cobra', numbers: [33, 34, 35, 36], emoji: '🐍',
    puxadas: ['Jacaré', 'Porco', 'Burro', 'Gato'],
    history: 'A Cobra é envolta em mistério e sabedoria. No jogo do bicho, é um dos animais mais temidos e respeitados.'
  },
  { 
    id: 10, name: 'Coelho', slug: 'coelho', numbers: [37, 38, 39, 40], emoji: '🐇',
    puxadas: ['Águia', 'Burro', 'Borboleta', 'Cachorro'],
    history: 'O Coelho simboliza a fertilidade e a rapidez. É conhecido por sua agilidade em escapar de situações complicadas.'
  },
  { 
    id: 11, name: 'Cavalo', slug: 'cavalo', numbers: [41, 42, 43, 44], emoji: '🐎',
    puxadas: ['Burro', 'Cabra', 'Touro', 'Carneiro'],
    history: 'O Cavalo representa a força, a velocidade e a nobreza. É um animal central em muitas culturas e muito forte no jogo.'
  },
  { 
    id: 12, name: 'Elefante', slug: 'elefante', numbers: [45, 46, 47, 48], emoji: '🐘',
    puxadas: ['Burro', 'Camelo', 'Tigre', 'Leão'],
    history: 'O Elefante simboliza a memória, a sabedoria e a força bruta controlada. É o maior animal terrestre da tabela.'
  },
  { 
    id: 13, name: 'Galo', slug: 'galo', numbers: [49, 50, 51, 52], emoji: '🐓',
    puxadas: ['Cachorro', 'Águia', 'Pavão', 'Peru'],
    history: 'O Galo é o senhor do amanhecer. Simboliza a vigilância e o orgulho. É um bicho que "puxa" muita sorte pela manhã.'
  },
  { 
    id: 14, name: 'Gato', slug: 'gato', numbers: [53, 54, 55, 56], emoji: '🐈',
    puxadas: ['Borboleta', 'Cobra', 'Leão', 'Tigre'],
    history: 'O Gato representa a independência e o mistério. Com suas sete vidas, é um símbolo de resiliência e intuição.'
  },
  { 
    id: 15, name: 'Jacaré', slug: 'jacare', numbers: [57, 58, 59, 60], emoji: '🐊',
    puxadas: ['Cobra', 'Porco', 'Borboleta', 'Macaco'],
    history: 'O Jacaré simboliza a paciência estratégica. Ele espera o momento certo para agir, representando foco e precisão.'
  },
  { 
    id: 16, name: 'Leão', slug: 'leao', numbers: [61, 62, 63, 64], emoji: '🦁',
    puxadas: ['Elefante', 'Gato', 'Tigre', 'Urso'],
    history: 'O Rei da Selva simboliza poder, autoridade e coragem. No jogo do bicho, o Leão é sinônimo de grandes vitórias.'
  },
  { 
    id: 17, name: 'Macaco', slug: 'macaco', numbers: [65, 66, 67, 68], emoji: '🐒',
    puxadas: ['Cachorro', 'Cabra', 'Peru', 'Jacaré'],
    history: 'O Macaco representa a inteligência, a brincadeira e a adaptabilidade. É um bicho muito dinâmico e imprevisível.'
  },
  { 
    id: 18, name: 'Porco', slug: 'porco', numbers: [69, 70, 71, 72], emoji: '🐖',
    puxadas: ['Cobra', 'Jacaré', 'Cachorro', 'Burro'],
    history: 'O Porco simboliza a abundância e a prosperidade. No jogo, é frequentemente associado a ganhos inesperados.'
  },
  { 
    id: 19, name: 'Pavão', slug: 'pavao', numbers: [73, 74, 75, 76], emoji: '🦚',
    puxadas: ['Avestruz', 'Águia', 'Galo', 'Peru'],
    history: 'O Pavão representa a vaidade positiva e a beleza. Suas cores vibrantes trazem alegria e sorte para quem o escolhe.'
  },
  { 
    id: 20, name: 'Peru', slug: 'peru', numbers: [77, 78, 79, 80], emoji: '🦃',
    puxadas: ['Avestruz', 'Águia', 'Galo', 'Pavão'],
    history: 'O Peru simboliza a celebração e a fartura. É um bicho clássico, muito presente nos palpites de datas festivas.'
  },
  { 
    id: 21, name: 'Touro', slug: 'touro', numbers: [81, 82, 83, 84], emoji: '🐂',
    puxadas: ['Vaca', 'Burro', 'Cabra', 'Cavalo'],
    history: 'O Touro representa a força bruta e a determinação. É um símbolo de vigor e resistência inabalável.'
  },
  { 
    id: 22, name: 'Tigre', slug: 'tigre', numbers: [85, 86, 87, 88], emoji: '🐅',
    puxadas: ['Leão', 'Gato', 'Elefante', 'Urso'],
    history: 'O Tigre simboliza a ferocidade e a beleza selvagem. É um animal solitário e poderoso, muito respeitado na tabela.'
  },
  { 
    id: 23, name: 'Urso', slug: 'urso', numbers: [89, 90, 91, 92], emoji: '🐻',
    puxadas: ['Leão', 'Tigre', 'Elefante', 'Camelo'],
    history: 'O Urso representa a força calma e a introspecção. Simboliza proteção e estabilidade.'
  },
  { 
    id: 24, name: 'Veado', slug: 'veado', numbers: [93, 94, 95, 96], emoji: '🦌',
    puxadas: ['Vaca', 'Carneiro', 'Cabra', 'Avestruz'],
    history: 'O Veado simboliza a gentileza e a sensibilidade. É um animal ágil e elegante, sempre alerta ao seu redor.'
  },
  { 
    id: 25, name: 'Vaca', slug: 'vaca', numbers: [97, 98, 99, 0], emoji: '🐄',
    puxadas: ['Touro', 'Avestruz', 'Carneiro', 'Veado'],
    history: 'A Vaca simboliza a maternidade e a nutrição. É o último bicho da tabela, fechando o ciclo com prosperidade.'
  },
];

export const MOCK_RESULTS = [
  {
    id: '1',
    time: '11:20',
    name: 'PTM-RJ',
    date: '16/03/2026',
    numbers: [
      { position: 1, value: '4582', animal: 'Touro' },
      { position: 2, value: '1293', animal: 'Veado' },
      { position: 3, value: '0941', animal: 'Cavalo' },
      { position: 4, value: '7765', animal: 'Macaco' },
      { position: 5, value: '3321', animal: 'Cabra' },
      { position: 6, value: '7902', animal: 'Avestruz' },
      { position: 7, value: '902', animal: 'Avestruz' },
    ]
  },
  {
    id: '2',
    time: '14:20',
    name: 'PT-RJ',
    date: '16/03/2026',
    numbers: [
      { position: 1, value: '8812', animal: 'Burro' },
      { position: 2, value: '4534', animal: 'Cobra' },
      { position: 3, value: '2219', animal: 'Cachorro' },
      { position: 4, value: '0098', animal: 'Vaca' },
      { position: 5, value: '6543', animal: 'Cavalo' },
      { position: 6, value: '2206', animal: 'Águia' },
      { position: 7, value: '206', animal: 'Águia' },
    ]
  }
];
