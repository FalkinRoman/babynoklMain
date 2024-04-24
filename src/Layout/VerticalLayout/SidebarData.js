//файл с данными сайдбара
const dataChars = [
  {
    id: 1,
    name: "25-я Апрельская, 12",
    series: [44, 55, 67],
    corpus: [
      { id: 1, name: "Березка", series: [23, 46, 23] },
      { id: 2, name: "Одуванчики", series: [84, 23, 34] },
      { id: 3, name: "Крольчата", series: [83, 82, 74] },
    ],
  },
  {
    id: 2,
    name: "10-я Мая, 3",
    series: [30, 40, 50],
    corpus: [
      { id: 1, name: "Пупсик", series: [15, 28, 39] },
      { id: 2, name: "Медвежонок", series: [64, 37, 51] },
      { id: 3, name: "Пингвиненок", series: [42, 65, 28] },
    ],
  },
  {
    id: 3,
    name: "Улица Ленина, 50",
    series: [20, 25, 30],
    corpus: [
      { id: 1, name: "Львенок", series: [38, 55, 67] },
      { id: 2, name: "Тигренок", series: [49, 32, 74] },
      { id: 3, name: "Панда", series: [73, 41, 26] },
    ],
  },
  {
    id: 4,
    name: "Проспект Победы, 88",
    series: [60, 70, 80],
    corpus: [
      { id: 1, name: "Котенок", series: [56, 72, 48] },
      { id: 2, name: "Щенок", series: [68, 54, 77] },
      { id: 3, name: "Зайчонок", series: [80, 65, 43] },
    ],
  },
  {
    id: 5,
    name: "Переулок Солнечный, 5",
    series: [15, 20, 25],
    corpus: [
      { id: 1, name: "Рыбка", series: [24, 17, 35] },
      { id: 2, name: "Креветка", series: [22, 38, 19] },
      { id: 3, name: "Морская звезда", series: [30, 26, 18] },
    ],
  },
  {
    id: 6,
    name: "Бульвар Октябрьский, 17",
    series: [33, 45, 55],
    corpus: [
      { id: 1, name: "Единорог", series: [47, 34, 59] },
      { id: 2, name: "Фея", series: [55, 42, 63] },
      { id: 3, name: "Дракончик", series: [38, 49, 51] },
    ],
  },
  {
    id: 7,
    name: "Улица Советская, 22",
    series: [70, 80, 90],
    corpus: [
      { id: 1, name: "Космонавт", series: [64, 73, 81] },
      { id: 2, name: "Ракета", series: [79, 82, 88] },
      { id: 3, name: "Планета", series: [85, 78, 94] },
    ],
  },
  {
    id: 8,
    name: "Проспект Гагарина, 3",
    series: [10, 15, 20],
    corpus: [
      { id: 1, name: "Луна", series: [18, 11, 21] },
      { id: 2, name: "Марс", series: [13, 16, 25] },
      { id: 3, name: "Венера", series: [23, 18, 15] },
    ],
  },
  {
    id: 9,
    name: "Площадь Ленина, 1",
    series: [75, 85, 95],
    corpus: [
      { id: 1, name: "Маляр", series: [76, 81, 91] },
      { id: 2, name: "Токарь", series: [84, 79, 93] },
      { id: 3, name: "Фрезеровщик", series: [89, 87, 94] },
    ],
  },
  {
    id: 10,
    name: "Улица Кирова, 7",
    series: [18, 22, 26],
    corpus: [
      { id: 1, name: "Портной", series: [19, 25, 18] },
      { id: 2, name: "Марс", series: [13, 16, 25] },
      { id: 3, name: "Венера", series: [23, 18, 15] },
    ],
  },
];
const SidebarData = [
  {
    label: "Аналитика",
    icon: "bx bx-bar-chart",
    url: "/analytics",
    isHasArrow: true,
    bgcolor: "bg-primary",
  },
  {
    label: "Мои камеры",
    icon: "bx bx-video",
    subItem: [
      ...dataChars.map((corpus) => ({
        id: corpus.id,
        sublabel: corpus.name,
        link: `/cameras/${corpus.name}`,
      })),
    ],
  },

  {
    label: "Метод материалы",
    icon: "bx bx-book-bookmark",
    url: "/teaching-materials",
    isHasArrow: true,
    bgcolor: "bg-primary",
  },

  {
    label: "Инструкции",
    icon: "bx bx-error-circle",
    url: "/instructions",
    isHasArrow: true,
    bgcolor: "bg-primary",
  },
];
export default SidebarData;
