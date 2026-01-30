
import { FoodItem, WeeklyDiet } from './types';

export const DOCUMENT_CONTENT = `
ALIMENTAÇÃO NA PREVENÇÃO DE FORMAÇÃO DE CÁLCULOS RENAIS

Orientações aos pacientes:
- O cálculo renal é comum (8% mulheres, 15% homens).
- Risco de recorrência é de 50% em 5 anos.
- Prevenção é fundamental. Fatores de risco: ganho de peso, obesidade, excesso de sal, consumo reduzido de líquidos.

HIDRATAÇÃO:
- Ingerir no mínimo 2 a 3 litros de líquidos por dia.
- Preferir água, limonada (com adoçante), chás de ervas (camomila, erva-doce, cidreira, hortelã).
- Evitar refrigerantes, sucos em pó e artificiais.
- Monitorar urina: deve estar clara e límpida.

SAL (SÓDIO):
- Usar o mínimo possível. Evitar temperos prontos.
- Evitar: Azeitonas, bacalhau, salgadinhos, queijos amarelos, molhos prontos (ketchup, shoyu), caldos concentrados, embutidos (salsicha, presunto, etc), conservas, enlatados, carnes salgadas, biscoitos recheados/salgados.

FRUTAS E VEGETAIS:
- Consumir 3 a 4 frutas ao dia (laranja, tangerina, melão são ótimas por causa do ácido cítrico).
- Frutas vermelhas protegem contra infecções.
- Legumes cozidos ou crus e verduras são essenciais.

LATICÍNIOS:
- Não restringir cálcio sem orientação. 
- Consumir pelo menos 3 copos por dia (desnatados: iogurte, coalhada, queijo branco, ricota).

PROTEÍNAS:
- Uma porção de carne (peixe, frango sem pele ou ovo).
- Evitar churrascos (excesso de gordura e sal).

EVITAR (Ricos em Oxalato):
- Café, bebidas achocolatadas, chocolate, chá preto, mate ou verde, espinafre, nozes, mariscos e frutos do mar.
`;

export const FOOD_GUIDE: FoodItem[] = [
  { name: 'Água', category: 'Líquidos', recommendation: 'always' },
  { name: 'Limonada Natural', category: 'Líquidos', recommendation: 'always', reason: 'Ácido cítrico auxilia na prevenção' },
  { name: 'Laranja/Tangerina', category: 'Frutas', recommendation: 'always' },
  { name: 'Melão', category: 'Frutas', recommendation: 'always' },
  { name: 'Frutas Vermelhas', category: 'Frutas', recommendation: 'always', reason: 'Proteção contra infecções' },
  { name: 'Queijo Branco Magro', category: 'Laticínios', recommendation: 'always' },
  { name: 'Peixe/Frango sem pele', category: 'Proteínas', recommendation: 'always' },
  { name: 'Ricota', category: 'Laticínios', recommendation: 'always' },
  { name: 'Salsicha/Linguiça', category: 'Embutidos', recommendation: 'avoid', reason: 'Altíssimo teor de sódio' },
  { name: 'Presunto/Salame', category: 'Embutidos', recommendation: 'avoid', reason: 'Altíssimo teor de sódio' },
  { name: 'Refrigerantes', category: 'Líquidos', recommendation: 'avoid' },
  { name: 'Espinafre', category: 'Vegetais', recommendation: 'avoid', reason: 'Rico em oxalato' },
  { name: 'Chocolate', category: 'Doces', recommendation: 'avoid', reason: 'Rico em oxalato' },
  { name: 'Nozes/Amendoim', category: 'Snacks', recommendation: 'avoid', reason: 'Rico em oxalato' },
  { name: 'Frutos do Mar', category: 'Proteínas', recommendation: 'avoid', reason: 'Rico em oxalato' },
  { name: 'Chá Preto/Mate/Verde', category: 'Líquidos', recommendation: 'avoid', reason: 'Rico em oxalato' },
  { name: 'Bacalhau', category: 'Proteínas', recommendation: 'avoid', reason: 'Alto teor de sal' },
  { name: 'Shoyu/Ketchup', category: 'Temperos', recommendation: 'avoid', reason: 'Alto teor de sódio' },
  { name: 'Queijos Amarelos', category: 'Laticínios', recommendation: 'avoid', reason: 'Alto teor de sódio' },
  { name: 'Salgadinhos/Batata Chips', category: 'Snacks', recommendation: 'avoid', reason: 'Excesso de sal' },
  { name: 'Azeitonas', category: 'Conservas', recommendation: 'avoid', reason: 'Excesso de sal' },
  { name: 'Caldos Concentrados', category: 'Temperos', recommendation: 'avoid', reason: 'Excesso de sódio' },
  { name: 'Café', category: 'Líquidos', recommendation: 'avoid', reason: 'Rico em oxalato' },
];

const standardTips = {
  breakfast: 'O cálcio do laticínio ajuda a bloquear a absorção de oxalato no intestino.',
  lunch: 'A limonada natural fornece citrato, um potente inibidor de cálculos.',
  hydration: 'Sua urina deve estar clara e límpida. Beba água constantemente.'
};

export const WEEKLY_DIET_PLAN: WeeklyDiet = {
  'Segunda': [
    { time: '07:30', meal: 'Café da Manhã', items: ['1 copo de Leite desnatado', '2 fatias de Pão integral com Ricota', '1 Laranja'], tip: standardTips.breakfast },
    { time: '10:00', meal: 'Lanche', items: ['1 fatia de Melão', '500ml de Água'], tip: 'Melão é rico em água e citrato.' },
    { time: '12:30', meal: 'Almoço', items: ['Peixe grelhado (pouco sal)', 'Arroz integral', 'Legumes cozidos (cenoura e vagem)', 'Limonada natural'], tip: standardTips.lunch },
    { time: '16:00', meal: 'Lanche', items: ['Iogurte desnatado', '3 Morangos'], tip: 'Frutas vermelhas são recomendadas para proteção urinária.' },
    { time: '19:30', meal: 'Jantar', items: ['Sopa de legumes caseira (sem caldo pronto)', 'Frango desfiado', 'Suco de fruta natural'], tip: 'Evite caldos concentrados industriais.' },
    { time: '22:00', meal: 'Ceia', items: ['Chá de Erva-doce', '300ml de Água'], tip: standardTips.hydration }
  ],
  'Terça': [
    { time: '07:30', meal: 'Café da Manhã', items: ['Iogurte desnatado', 'Cereal de milho simples', '1 Tangerina'], tip: standardTips.breakfast },
    { time: '10:00', meal: 'Lanche', items: ['1 Maçã', '1 copo de Água de coco ou Água', 'Fatia de Queijo branco'], tip: 'Consumindo a 2ª porção de laticínios do dia.' },
    { time: '12:30', meal: 'Almoço', items: ['Frango grelhado sem pele', 'Feijão (pouco sal)', 'Couve-flor cozida', 'Limonada natural'], tip: standardTips.lunch },
    { time: '16:00', meal: 'Lanche', items: ['Ricota com gotas de mel ou puro', 'Suco de Melancia'], tip: 'Terceira porção de laticínio garantida.' },
    { time: '19:30', meal: 'Jantar', items: ['Omelete de 2 ovos com tomate e ervas (manjericão/orégano)', 'Salada de alface e pepino'], tip: 'Substitua o sal por ervas naturais.' },
    { time: '22:00', meal: 'Ceia', items: ['Chá de Camomila', '500ml de Água'], tip: standardTips.hydration }
  ],
  'Quarta': [
    { time: '07:30', meal: 'Café da Manhã', items: ['Leite desnatado', 'Pão integral com Queijo Minas frescal', 'Meio Mamão'], tip: standardTips.breakfast },
    { time: '10:00', meal: 'Lanche', items: ['1 fatia de Abacaxi', '500ml de Água'] },
    { time: '12:30', meal: 'Almoço', items: ['Peixe assado com ervas', 'Purê de batata caseiro (pouco sal)', 'Brócolis no vapor', 'Limonada natural'], tip: standardTips.lunch },
    { time: '16:00', meal: 'Lanche', items: ['Coalhada desnatada', '1 Pera'], tip: 'Laticínios desnatados ajudam no equilíbrio de cálcio.' },
    { time: '19:30', meal: 'Jantar', items: ['Sanduíche natural de frango e ricota (3ª porção laticínio)', 'Suco de Laranja'], tip: 'Suco de laranja também é fonte de citrato.' },
    { time: '22:00', meal: 'Ceia', items: ['Chá de Hortelã', '400ml de Água'], tip: standardTips.hydration }
  ],
  'Quinta': [
    { time: '07:30', meal: 'Café da Manhã', items: ['Iogurte desnatado', 'Morangos picados', 'Torrada integral'], tip: standardTips.breakfast },
    { time: '10:00', meal: 'Lanche', items: ['1 Tangerina', '500ml de Água', 'Fatia de queijo branco'], tip: 'Importante manter o consumo de 3 laticínios ao dia.' },
    { time: '12:30', meal: 'Almoço', items: ['Frango assado sem pele', 'Arroz com cenoura', 'Abobrinha refogada', 'Limonada'], tip: standardTips.lunch },
    { time: '16:00', meal: 'Lanche', items: ['Vitamina de leite desnatado e maçã'], tip: 'O cálcio líquido conta como porção de laticínio.' },
    { time: '19:30', meal: 'Jantar', items: ['Canja de galinha caseira', 'Salada de folhas verdes (menos espinafre)'], tip: 'Lembrando: evite espinafre devido ao oxalato.' },
    { time: '22:00', meal: 'Ceia', items: ['Chá de Cidreira', '300ml de Água'], tip: standardTips.hydration }
  ],
  'Sexta': [
    { time: '07:30', meal: 'Café da Manhã', items: ['Leite desnatado', 'Pão com Ricota', '1 fatia de Melão'], tip: standardTips.breakfast },
    { time: '10:00', meal: 'Lanche', items: ['Uvas verdes', '500ml de Água'] },
    { time: '12:30', meal: 'Almoço', items: ['Filé de peixe grelhado', 'Macarrão integral com azeite e alho', 'Limonada'], tip: standardTips.lunch },
    { time: '16:00', meal: 'Lanche', items: ['Iogurte natural desnatado', 'Amoras ou framboesas'], tip: 'Frutas vermelhas protegem o sistema urinário.' },
    { time: '19:30', meal: 'Jantar', items: ['Omelete com queijo branco (3ª porção laticínio)', 'Salada de tomate e pepino', 'Suco natural'], tip: 'Refeição rica em cálcio e baixa em sódio.' },
    { time: '22:00', meal: 'Ceia', items: ['Chá de Erva-doce', '500ml de Água'], tip: standardTips.hydration }
  ],
  'Sábado': [
    { time: '08:30', meal: 'Café da Manhã', items: ['Suco de Laranja natural', 'Tapioca com queijo branco', 'Mamão'], tip: standardTips.breakfast },
    { time: '11:00', meal: 'Lanche', items: ['Melancia (hidratante natural)', '500ml de Água'] },
    { time: '13:30', meal: 'Almoço', items: ['Frango grelhado', 'Arroz integral', 'Seleta de legumes cozidos', 'Limonada'], tip: standardTips.lunch },
    { time: '17:00', meal: 'Lanche', items: ['Iogurte batido com frutas vermelhas', 'Bolacha de arroz (pouco sal)'], tip: 'Segunda porção de laticínio.' },
    { time: '20:30', meal: 'Jantar', items: ['Creme de legumes com Ricota (3ª porção)', 'Pão integral'], tip: 'Jantares leves facilitam a filtração renal noturna.' },
    { time: '22:30', meal: 'Ceia', items: ['Água com hortelã', '300ml de Água'], tip: standardTips.hydration }
  ],
  'Domingo': [
    { time: '09:00', meal: 'Café da Manhã', items: ['Leite desnatado', 'Panqueca de aveia e banana', 'Queijo minas fresco'], tip: standardTips.breakfast },
    { time: '11:30', meal: 'Lanche', items: ['1 copo de Limonada', '500ml de Água'] },
    { time: '13:30', meal: 'Almoço', items: ['Frango assado sem pele', 'Arroz com brócolis', 'Purê de abóbora caseiro', 'Suco de Tangerina'], tip: 'Cítricos são fundamentais para inibir cálculos.' },
    { time: '17:00', meal: 'Lanche', items: ['Iogurte desnatado', 'Salada de frutas (Laranja, melão e morango)'], tip: 'Mix de frutas cítricas e laticínios.' },
    { time: '20:00', meal: 'Jantar', items: ['Sopa de mandioquinha com frango desfiado', 'Queijo branco picado (3ª porção)'], tip: 'Evite caldos de carne industrializados.' },
    { time: '22:00', meal: 'Ceia', items: ['Chá de Camomila', '500ml de Água'], tip: standardTips.hydration }
  ]
};
