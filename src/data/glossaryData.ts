import { GlossaryTerm } from '../types';

export const glossaryData: GlossaryTerm[] = [
  {
    id: 'g-1',
    term: { uz: "Fe'l", en: "Verb", ru: "Глагол" },
    definition: {
      uz: "Shaxs yoki narsaning harakat va holatini bildiruvchi mustaqil so'z turkumi.",
      en: "An independent part of speech denoting an action or state of a person or entity.",
      ru: "Самостоятельная часть речи, обозначающая действие или состояние предмета.",
    },
    example: { uz: "yozmoq, o'qimoq, kulmoq", en: "to write, to read, to laugh", ru: "писать, читать, смеяться" },
    category: 'grammatika'
  },
  {
    id: 'g-2',
    term: { uz: "Nisbat (Voice)", en: "Grammatical Voice", ru: "Категория залога" },
    definition: {
      uz: "Harakatning bajaruvchisi va obyekt o'rtasidagi munosabatni ifodalovchi grammatik kategoriya.",
      en: "A grammatical category expressing the semantic relation between subject, agent, and object.",
      ru: "Грамматическая категория, выражающая отношение действия к субъекту и объекту.",
    },
    example: { uz: "aniq, o'zlik, majhul, orttirma, birgalik", en: "active, reflexive, passive, causative, reciprocal", ru: "действительный, возвратный, страдательный, понудительный, совместный" },
    category: 'grammatika'
  },
  {
    id: 'g-3',
    term: { uz: "Sifatdosh", en: "Participle", ru: "Причастие" },
    definition: {
      uz: "Fe'lning zamon bilan bog'liq harakat belgisini ifodalovchi va sifatga xoslanuvchi shakli.",
      en: "A non-finite verbal adjective denoting an action-based attribute with temporal coloring.",
      ru: "Неспрягаемая форма глагола, обозначающая признак предмета по действию во времени.",
    },
    example: { uz: "o'qigan (bola), kelayotgan (bahor)", en: "well-read (child), approaching (spring)", ru: "читавший (ребенок), наступающая (весна)" },
    category: 'grammatika'
  },
  {
    id: 'g-4',
    term: { uz: "Ravishdosh", en: "Gerund / Adverbial Participle", ru: "Деепричастие" },
    definition: {
      uz: "Yetakchi harakatning bajarilish tarzi yoki paytini bildiruvchi xoslangan fe'l shakli.",
      en: "A non-finite verb form specifying the manner, time, or circumstance of the main action.",
      ru: "Неспрягаемая форма глагола, обозначающая добавочное действие, образ или время основного действия.",
    },
    example: { uz: "yugurib (keldi), kula-kula (ketdi)", en: "came running, went away laughing", ru: "прибежал бегом, ушел смеясь" },
    category: 'grammatika'
  },
  {
    id: 'g-5',
    term: { uz: "Harakat nomi", en: "Verbal Noun / Infinitive", ru: "Имя действия" },
    definition: {
      uz: "Harakatning o'zini narsa kabi nomlovchi va otlashuvchi fe'l shakli.",
      en: "A verbal noun naming the action substantively, taking noun declensions.",
      ru: "Форма глагола, субстантивирующая действие и принимающая падежные аффиксы.",
    },
    example: { uz: "o'qish, yozmoq, suzuv", en: "reading, writing, swimming", ru: "чтение, писать, плавание" },
    category: 'grammatika'
  },
  {
    id: 'g-6',
    term: { uz: "Klaster metodi", en: "Cluster Method", ru: "Метод Кластер" },
    definition: {
      uz: "Mavzu bo'yicha tushunchalar va ularning aloqalarini grafik tarmoq shaklida tasvirlash usuli.",
      en: "A graphic brainstorming organizer mapping concepts and associations around a core idea.",
      ru: "Графический прием мозгового штурма, объединяющий идеи вокруг ключевого концепта.",
    },
    example: { uz: "Doska o'rtasiga 'Fe'l' yozilib, atrofiga zamon, nisbat, mayl shoxchalari tortiladi.", en: "Branching tenses, voices, and moods around 'Verb'.", ru: "Разветвление категорий вокруг понятия 'Глагол'." },
    category: 'metodika'
  },
  {
    id: 'g-7',
    term: { uz: "Venn diagrammasi", en: "Venn Diagram", ru: "Диаграмма Венна" },
    definition: {
      uz: "Ikki yoki undan ortiq obyektlarning umumiy va farqli xususiyatlarini solishtirish vositasi.",
      en: "An analytical graphic organizer comparing overlapping and distinct attributes of concepts.",
      ru: "Инструмент визуального сравнения общих и различных признаков двух явлений.",
    },
    example: { uz: "Sifat va Sifatdoshni taqqoslash diagrammasi.", en: "Juxtaposing adjectives vs. participles.", ru: "Сравнение прилагательного и причастия." },
    category: 'metodika'
  },
  {
    id: 'g-8',
    term: { uz: "Sinkvein", en: "Didactic Cinquain", ru: "Дидактический синквейн" },
    definition: {
      uz: "O'rganilgan mavzuni 5 qatorda poetik va ixcham shaklda umumlashtiruvchi refleksiv metod.",
      en: "A structured 5-line unrhymed reflection poem synthesizing educational concepts.",
      ru: "Пятистрочная стихотворная форма для синтеза и рефлексии изученного материала.",
    },
    example: { uz: "1. Fe'l. 2. Jo'shqin, faol. 3. Harakatlantiradi, o'rgatadi, yuksaltiradi...", en: "5-line didactic verb poem.", ru: "5-строчное дидактическое резюме." },
    category: 'metodika'
  },
  {
    id: 'g-9',
    term: { uz: "Kompetensiyaviy yondashuv", en: "Competency-Based Approach", ru: "Компетентностный подход" },
    definition: {
      uz: "O'quvchida nazariy bilimlarni hayotiy va kasbiy vaziyatlarda qo'llash ko'nikmasini shakllantirish.",
      en: "An educational model focusing on learner proficiency and real-world functional application.",
      ru: "Образовательный подход, нацеленный на формирование способности применять знания на практике.",
    },
    example: { uz: "Grammatika qoidasini yodlatish emas, to'g'ri va ta'sirchan nutq tuza olishga erishish.", en: "Empowering fluent oral and written discourse over bare rule recitation.", ru: "Формирование речевой грамотности вместо заучивания формулировок." },
    category: 'pedagogika'
  },
  {
    id: 'g-10',
    term: { uz: "Baholash rubrikasi", en: "Assessment Rubric", ru: "Критериальная рубрика" },
    definition: {
      uz: "O'quvchi faoliyati natijalarini xolis baholash uchun ishlab chiqilgan mezonlar jadvali.",
      en: "A structured scoring guide delineating distinct performance levels for assignments.",
      ru: "Матрица критериев для объективной и прозрачной оценки учебных достижений школьников.",
    },
    example: { uz: "Insho mezonlari: imlo (4 ball), grammatik boylik (3 ball), ijodiy fikr (3 ball).", en: "Scoring matrix: orthography, stylistic range, creativity.", ru: "Шкала оценивания: грамотность, словарный запас, оригинальность." },
    category: 'pedagogika'
  }
];
