import { Badge } from '../types';

export const badgesData: Badge[] = [
  {
    id: 'first_step',
    name: {
      uz: "Birinchi qadam",
      en: "First Step",
      ru: "Первый шаг",
    },
    description: {
      uz: "Platformada birinchi modul darsini muvaffaqiyatli yakunladingiz",
      en: "Completed your first module lesson on the platform",
      ru: "Успешно завершили свой первый урок на платформе",
    },
    icon: "Footprints",
    category: "learning",
  },
  {
    id: 'verb_detective',
    name: {
      uz: "Fe'l Detektivi",
      en: "Verb Detective",
      ru: "Глагольный детектив",
    },
    description: {
      uz: "Matndagi barcha fe'llarni xatosiz aniqlab, 150+ ball to'pladingiz",
      en: "Found all verbs in text without errors, scoring 150+ points",
      ru: "Безошибочно нашли все глаголы в тексте и набрали 150+ очков",
    },
    icon: "Search",
    category: "game",
  },
  {
    id: 'tense_master',
    name: {
      uz: "Zamon ustasi",
      en: "Tense Master",
      ru: "Мастер времён",
    },
    description: {
      uz: "Zamon poygasida tushayotgan barcha fe'llarni o'z vaqtida to'g'ri saraladingiz",
      en: "Sorted all incoming verbs into correct tense lanes in record time",
      ru: "Безошибочно распределили все падающие глаголы по временам в гонке",
    },
    icon: "Clock",
    category: "game",
  },
  {
    id: 'morpheme_architect',
    name: {
      uz: "Morfema me'mori",
      en: "Morpheme Architect",
      ru: "Архитектор морфем",
    },
    description: {
      uz: "Fe'l qo'shimchalarini qat'iy tartibda yig'ib, 5 ta murakkab fe'l yasadilar",
      en: "Assembled 5 complex verb structures following morphemic rules",
      ru: "Собрали 5 сложных глагольных форм по строгой морфемной цепочке",
    },
    icon: "Layers",
    category: "game",
  },
  {
    id: 'quiz_whiz',
    name: {
      uz: "Xatosiz 10",
      en: "Flawless Ten",
      ru: "Безупречная десятка",
    },
    description: {
      uz: "Modul nazorat testida 100% mutlaq to'g'ri natijaga erishdingiz",
      en: "Scored 100% on a module checkpoint quiz",
      ru: "Набрали 100% правильных ответов в промежуточном тесте модуля",
    },
    icon: "CheckCircle",
    category: "test",
  },
  {
    id: 'pedagogue',
    name: {
      uz: "Bo'lg'usi pedagog",
      en: "Future Pedagogue",
      ru: "Будущий педагог",
    },
    description: {
      uz: "Dastlabki 3 ta modulni to'liq o'zlashtirib, testlarini topshirdingiz",
      en: "Successfully mastered the first 3 course modules and quizzes",
      ru: "Успешно освоили первые 3 модуля курса и сдали тесты",
    },
    icon: "GraduationCap",
    category: "learning",
  },
  {
    id: 'fast_thinker',
    name: {
      uz: "Tezkor metodist",
      en: "Speed Methodologist",
      ru: "Скоростной методист",
    },
    description: {
      uz: "Tezkor javob (Kahoot) o'yinida 800+ ball bilan chaqqonlik ko'rsatdingiz",
      en: "Scored 800+ points in rapid Kahoot-style quiz blitz",
      ru: "Набрали более 800 очков в скоростном блиц-опросе",
    },
    icon: "Zap",
    category: "game",
  },
  {
    id: 'streak_3',
    name: {
      uz: "Sabrli talaba",
      en: "Diligent Learner",
      ru: "Прилежный студент",
    },
    description: {
      uz: "Ketma-ket 3 kun davomida platformada bilimingizni boyitdingiz",
      en: "Maintained a 3-day continuous active study streak",
      ru: "Поддерживали непрерывную активность обучения 3 дня подряд",
    },
    icon: "Flame",
    category: "streak",
  },
  {
    id: 'streak_7',
    name: {
      uz: "Haftalik intizom",
      en: "Weekly Discipline",
      ru: "Недельная дисциплина",
    },
    description: {
      uz: "Bir hafta uzluksiz ta'lim olib, yuksak iroda namoyon etdingiz",
      en: "Achieved a full 7-day uninterrupted study streak",
      ru: "Достигли непрерывной 7-дневной серии ежедневного обучения",
    },
    icon: "Award",
    category: "streak",
  },
  {
    id: 'method_explorer',
    name: {
      uz: "Metodlar sarboni",
      en: "Methodology Master",
      ru: "Знаток методик",
    },
    description: {
      uz: "5-moduldagi barcha zamonaviy interfaol metodlarni o'rganib chiqdingiz",
      en: "Explored all interactive teaching methods in Module 5",
      ru: "Изучили все интерактивные методики преподавания в 5 модуле",
    },
    icon: "Compass",
    category: "learning",
  },
  {
    id: 'error_surgeon',
    name: {
      uz: "Xatolar jarrohi",
      en: "Error Surgeon",
      ru: "Хирург ошибок",
    },
    description: {
      uz: "O'quvchi daftari tahlilida barcha imloviy va grammatik xatolarni topib tuzatdingiz",
      en: "Diagnosed and rectified all student grammar errors in the lab",
      ru: "Нашли и исправили все ошибки в ученической тетради в лаборатории",
    },
    icon: "Stethoscope",
    category: "game",
  },
  {
    id: 'lesson_architect',
    name: {
      uz: "Dars me'mori",
      en: "Lesson Architect",
      ru: "Архитектор урока",
    },
    description: {
      uz: "Dars konstruktorida 45 daqiqalik namunaviy dars ishlanmasini loyihalashtirdingiz",
      en: "Engineered a balanced 45-minute lesson plan in the Builder",
      ru: "Спроектировали сбалансированный 45-минутный план урока в конструкторе",
    },
    icon: "FileSpreadsheet",
    category: "learning",
  },
  {
    id: 'voice_expert',
    name: {
      uz: "Nisbatlar ustasi",
      en: "Voice Expert",
      ru: "Эксперт по залогам",
    },
    description: {
      uz: "Nisbat labirintidagi barcha eshiklarni to'g'ri grammatik kalit bilan ochdingiz",
      en: "Unlocked all gates in the Voice Maze with correct grammatical answers",
      ru: "Открыли все врата в лабиринте залогов правильными ответами",
    },
    icon: "Key",
    category: "game",
  },
  {
    id: 'final_champion',
    name: {
      uz: "Attestatsiya g'olibi",
      en: "Certified Champion",
      ru: "Триумфатор аттестации",
    },
    description: {
      uz: "Yakuniy sertifikat imtihonini 80%+ a'lo baho bilan topshirdingiz",
      en: "Passed the Final Certification Exam with honors (80%+ score)",
      ru: "Сдали итоговый экзамен с отличием (более 80% баллов)",
    },
    icon: "Trophy",
    category: "test",
  },
  {
    id: 'methodology_professor',
    name: {
      uz: "Professorlik cho'qqisi",
      en: "Professor Peak",
      ru: "Вершина профессуры",
    },
    description: {
      uz: "1500 dan ortiq XP to'plab, eng oliy 'Professor' darajasiga yetdingiz",
      en: "Accumulated over 1500 XP and attained the ultimate Professor rank",
      ru: "Набрали свыше 1500 XP и достигли высшего звания 'Профессор'",
    },
    icon: "Crown",
    category: "streak",
  },
];
