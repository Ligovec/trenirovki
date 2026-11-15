// Схема мышц: фигура спереди и сзади, целевые мышцы — красным, вспомогательные — бледно-красным.
// Рисунок схематичный, для ориентира в зале, а не анатомический атлас.
(function () {
  const NAMES = {
    chest: 'Большая грудная', front_delt: 'Передняя дельта', side_delt: 'Средняя дельта', rear_delt: 'Задняя дельта',
    traps: 'Трапециевидная (верх)', midback: 'Ромбовидные и средняя трапеция', lats: 'Широчайшие спины',
    lowback: 'Разгибатели спины', biceps: 'Бицепс и плечевая', triceps: 'Трицепс', forearms: 'Мышцы предплечья',
    abs: 'Прямая мышца живота', obliques: 'Косые мышцы живота', quads: 'Квадрицепс', adductors: 'Приводящие бедра',
    glutes: 'Ягодичные', hamstrings: 'Задняя поверхность бедра', calves: 'Икроножная и камбаловидная'
  };
  const MIRROR = 'translate(100 0) scale(-1 1)';
  // контур тела (одинаковый спереди и сзади)
  const SIL = `<ellipse cx="50" cy="14" rx="8" ry="10"/><path d="M46 23h8l1 7H45z"/>
    <path d="M37 30Q50 27 63 30L68 36Q70 44 66 52L63 64Q62 78 64 92H36Q38 78 37 64L34 52Q30 44 32 36Z"/>
    <g id="SL"><path d="M32 34Q25 36 23 46L21 66Q24 70 28 68L33 52Z"/><path d="M21 66Q18 78 16.5 90L20 92Q25 82 28 68Z"/><ellipse cx="18" cy="96" rx="3" ry="5"/>
    <path d="M36 91Q33 120 37.5 145L36.5 168Q37 186 40 194H47Q47.5 180 46.5 168L48.5 145Q50.5 120 50 96Z"/></g>
    <use href="#SL" transform="${MIRROR}"/>`;
  // мышцы: [id, svg-фигура, зеркалить?]
  const FRONT = [
    ['traps', '<path d="M45.5 26Q40 29 36 32L45 31Z"/>', 1],
    ['side_delt', '<ellipse cx="30.5" cy="39" rx="3.4" ry="6.5" transform="rotate(12 30.5 39)"/>', 1],
    ['front_delt', '<ellipse cx="35" cy="37.5" rx="3.8" ry="6" transform="rotate(-8 35 37.5)"/>', 1],
    ['chest', '<path d="M49.3 32Q42 30.5 37.5 34Q35.5 42 38.5 47Q44 50 49.3 47.5Z"/>', 1],
    ['biceps', '<ellipse cx="27.3" cy="54" rx="3.5" ry="8" transform="rotate(12 27.3 54)"/>', 1],
    ['forearms', '<ellipse cx="22.3" cy="78" rx="3.1" ry="10" transform="rotate(14 22.3 78)"/>', 1],
    ['obliques', '<path d="M44 52L38.5 54Q36.5 66 38.5 78L44 86Z"/>', 1],
    ['abs', '<rect x="45" y="50" width="10" height="37" rx="3"/>', 0],
    ['adductors', '<path d="M46.5 100H49.5V122L46 131Q48 114 46.5 100Z"/>', 1],
    ['quads', '<path d="M37.8 98Q35.8 120 39.5 142H46.5Q49 122 47.5 99Z"/>', 1],
    ['calves', '<ellipse cx="41" cy="163" rx="2.8" ry="10"/>', 1]
  ];
  const BACK = [
    ['traps', '<path d="M50 24L44 27L36 32L44 34L50 38L56 34L64 32L56 27Z"/>', 0],
    ['midback', '<path d="M50 38L44 34L41.5 38.5L43.5 50L50 56L56.5 50L58.5 38.5L56 34Z"/>', 0],
    ['side_delt', '<ellipse cx="30" cy="40" rx="2.8" ry="6" transform="rotate(12 30 40)"/>', 1],
    ['rear_delt', '<ellipse cx="34" cy="37.5" rx="4.2" ry="5.2"/>', 1],
    ['lats', '<path d="M41 40Q36 46 37 58Q40 70 47 80L48.5 68L43 51Z"/>', 1],
    ['lowback', '<path d="M47 58H49.6V89H45Q44.2 73 47 58Z"/>', 1],
    ['triceps', '<ellipse cx="27.3" cy="53" rx="3.7" ry="8.5" transform="rotate(12 27.3 53)"/>', 1],
    ['forearms', '<ellipse cx="22.3" cy="78" rx="3.1" ry="10" transform="rotate(14 22.3 78)"/>', 1],
    ['glutes', '<ellipse cx="43.5" cy="100" rx="6.5" ry="8"/>', 1],
    ['hamstrings', '<path d="M38.5 109Q37.5 126 40.5 144H46Q48.8 126 48 109Z"/>', 1],
    ['calves', '<ellipse cx="42" cy="161" rx="4" ry="10"/>', 1]
  ];
  function view(list, act, uidp) {
    let h = `<g class="sil">${SIL.replace(/id="SL"/, `id="SL${uidp}"`).replace('href="#SL"', `href="#SL${uidp}"`)}</g>`;
    for (const [id, shape, mir] of list) {
      const c = act.p.includes(id) ? 'm p' : act.s.includes(id) ? 'm s' : 'm';
      h += `<g class="${c}">${shape}${mir ? `<g transform="${MIRROR}">${shape}</g>` : ''}</g>`;
    }
    return h;
  }
  let n = 0;
  // size: высота в пикселях; обе проекции рядом
  window.bodySVG = function (act, size) {
    const k = ++n;
    return `<svg class="body" viewBox="12 2 174 196" height="${size}" width="${Math.round(size * 174 / 196)}" role="img" aria-label="Схема мышц">
      <g>${view(FRONT, act, 'f' + k)}</g><g transform="translate(86 0)">${view(BACK, act, 'b' + k)}</g></svg>`;
  };
  window.MUSCLE_NAMES = NAMES;

  // Упражнение → [целевые, вспомогательные]
  const M = {};
  const set = (names, p, s = '') => names.split('|').forEach(n => { M[n.trim()] = {p: p.split(' ').filter(Boolean), s: s.split(' ').filter(Boolean)}; });
  set('Жим штанги лёжа|Жим гантелей лёжа|Жим в Смите лёжа|Жим в тренажёре сидя', 'chest', 'front_delt triceps');
  set('Жим штанги на наклонной|Жим гантелей на наклонной|Жим в Смите на наклонной|Жим в тренажёре на наклонной', 'chest front_delt', 'triceps');
  set('Жим штанги с обратным наклоном', 'chest', 'triceps front_delt');
  set('Сведение в кроссовере|Сведение в кроссовере снизу вверх|Сведение в тренажёре (бабочка)|Разводка гантелей лёжа|Разводка гантелей на наклонной', 'chest', 'front_delt');
  set('Отжимания на брусьях', 'chest triceps', 'front_delt');
  set('Отжимания от пола', 'chest', 'triceps front_delt abs');
  set('Пуловер с гантелью', 'chest lats', 'triceps');
  set('Подтягивания|Подтягивания с весом|Подтягивания в гравитроне', 'lats', 'biceps midback forearms');
  set('Подтягивания обратным хватом', 'lats biceps', 'midback forearms');
  set('Тяга вертикального блока|Тяга вертикального блока узким хватом|Тяга вертикального блока одной рукой', 'lats', 'biceps midback');
  set('Тяга горизонтального блока|Тяга гантели одной рукой|Тяга Т-грифа|Тяга в рычажном тренажёре|Тяга с упором в грудь', 'midback lats', 'rear_delt biceps');
  set('Тяга штанги в наклоне', 'midback lats', 'rear_delt biceps lowback');
  set('Пуловер на блоке (прямые руки)', 'lats', 'triceps');
  set('Становая тяга', 'lowback glutes hamstrings', 'traps quads forearms');
  set('Гиперэкстензия', 'lowback', 'glutes hamstrings');
  set('Шраги со штангой|Шраги с гантелями', 'traps', 'forearms');
  set('Присед со штангой|Присед в Смите|Гакк-присед|Маятниковый присед|Гоблет-присед', 'quads glutes', 'adductors lowback');
  set('Фронтальный присед', 'quads', 'glutes abs lowback');
  set('Жим ногами', 'quads', 'glutes adductors');
  set('Выпады со штангой|Выпады с гантелями|Выпады в Смите|Болгарские сплит-приседания|Зашагивания на тумбу', 'quads glutes', 'hamstrings adductors');
  set('Разгибание ног', 'quads');
  set('Румынская тяга|Румынская тяга с гантелями|Становая на прямых ногах|Гуд морнинг', 'hamstrings glutes', 'lowback');
  set('Сгибание ног лёжа|Сгибание ног сидя|Сгибание ноги стоя', 'hamstrings', 'calves');
  set('Ягодичный мост со штангой|Ягодичный мост в тренажёре', 'glutes', 'hamstrings');
  set('Отведение ноги в кроссовере|Разведение ног в тренажёре', 'glutes');
  set('Сведение ног в тренажёре', 'adductors');
  set('Обратная гиперэкстензия', 'glutes hamstrings', 'lowback');
  set('Подъём на носки стоя|Подъём на носки сидя|Подъём на носки в жиме ногами', 'calves');
  set('Жим штанги стоя|Жим штанги сидя|Жим гантелей сидя|Жим в тренажёре на плечи|Жим в Смите сидя|Жим Арнольда', 'front_delt side_delt', 'triceps traps');
  set('Махи гантелями в стороны|Махи в кроссовере в сторону|Махи в тренажёре в стороны', 'side_delt', 'traps');
  set('Подъём гантелей перед собой', 'front_delt', 'side_delt');
  set('Протяжка (тяга штанги к подбородку)', 'side_delt traps', 'front_delt biceps');
  set('Задняя дельта в тренажёре|Махи в наклоне на заднюю дельту|Задняя дельта в кроссовере', 'rear_delt', 'midback');
  set('Лицевая тяга', 'rear_delt midback', 'traps');
  set('Подъём штанги на бицепс|Подъём EZ-штанги на бицепс|Подъём гантелей на бицепс|Бицепс на наклонной скамье|Сгибания на скамье Скотта|Сгибания на блоке|Сгибания в кроссовере одной рукой|Концентрированные сгибания|Сгибания в тренажёре', 'biceps', 'forearms');
  set('Молоты|Молоты на канате', 'biceps forearms');
  set('Французский жим лёжа|Французский жим на канате|Французский жим гантелью из-за головы|Разгибание на блоке с канатом|Разгибание с прямой рукоятью|Разгибание одной рукой на блоке|Разгибание в тренажёре', 'triceps');
  set('Жим узким хватом', 'triceps chest', 'front_delt');
  set('Отжимания на брусьях на трицепс', 'triceps', 'chest front_delt');
  set('Отжимания от скамьи', 'triceps', 'front_delt chest');
  set('Сгибания запястий|Разгибания запястий', 'forearms');
  set('Фермерская прогулка', 'forearms traps', 'abs obliques');
  set('Вис на перекладине', 'forearms', 'lats');
  set('Скручивания|Скручивания на блоке|Обратные скручивания|Подъём ног в висе|Подъём ног в упоре|Пресс в тренажёре', 'abs', 'obliques');
  set('Планка', 'abs', 'obliques');
  set('Боковая планка|Русские скручивания', 'obliques', 'abs');
  set('Ролик для пресса', 'abs', 'lats obliques');
  set('Беговая дорожка', 'quads calves', 'hamstrings glutes');
  set('Велотренажёр', 'quads', 'calves glutes');
  set('Эллипс|Степпер', 'quads glutes', 'calves');
  set('Гребной тренажёр', 'lats quads', 'midback hamstrings biceps');
  set('Скакалка', 'calves', 'quads');
  // для своих упражнений — по группе мышц
  const BY_GROUP = {
    'Грудь': ['chest', 'front_delt triceps'], 'Спина': ['lats midback', 'biceps'], 'Ноги: квадрицепс': ['quads', 'glutes'],
    'Ноги: бицепс бедра и ягодицы': ['hamstrings glutes', ''], 'Икры': ['calves', ''], 'Плечи': ['side_delt front_delt', 'rear_delt'],
    'Бицепс': ['biceps', 'forearms'], 'Трицепс': ['triceps', ''], 'Предплечья': ['forearms', ''], 'Пресс и кор': ['abs', 'obliques'],
    'Кардио': ['quads', 'calves']
  };
  window.musclesFor = function (ex) {
    if (!ex) return {p: [], s: []};
    if (M[ex.name]) return M[ex.name];
    const g = BY_GROUP[ex.g];
    return g ? {p: g[0].split(' ').filter(Boolean), s: g[1].split(' ').filter(Boolean)} : {p: [], s: []};
  };
})();
