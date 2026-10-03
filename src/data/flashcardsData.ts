import { Flashcard } from '../types';

export const initialFlashcards: Flashcard[] = [
  {
    id: 'fc-1',
    term: { uz: "Orttirma nisbat (Causative)", en: "Causative Voice", ru: "Понудительный залог" },
    definition: {
      uz: "-dir, -tir, -t, -ir, -g'az qo'shimchalari orqali yasaladi; ish-harakat boshqa shaxsga bajartiriladi.",
      en: "Formed via -dir, -tir, -t; indicates action initiated by subject but performed by another.",
      ru: "Образуется аффиксами -dir, -tir, -t; обозначает побуждение другого лица к действию.",
    },
    category: "Grammatika",
    box: 1
  },
  {
    id: 'fc-2',
    term: { uz: "O'zlik nisbat (Reflexive)", en: "Reflexive Voice", ru: "Возвратный залог" },
    definition: {
      uz: "-in, -n, -il qo'shimchalari bilan yasaladi; harakat subyektning o'ziga yo'nalgan bo'ladi (yuvindi).",
      en: "Formed via -in, -n, -il; action acts directly back upon the subject itself.",
      ru: "Образуется через -in, -n; действие направлено на сам субъект (умылся).",
    },
    category: "Grammatika",
    box: 1
  },
  {
    id: 'fc-3',
    term: { uz: "Majhul nisbat (Passive)", en: "Passive Voice", ru: "Страдательный залог" },
    definition: {
      uz: "-il, -l, -in orqali yasaladi; haqiqiy bajaruvchi noma'lum yoki obyekt markazga chiqadi (xat yozildi).",
      en: "Formed via -il, -l, -in; the true agent is omitted or backgrounded.",
      ru: "Образуется через -il, -l; исполнитель действия неизвестен или скрыт (письмо написано).",
    },
    category: "Grammatika",
    box: 1
  },
  {
    id: 'fc-4',
    term: { uz: "Sifatdosh qo'shimchalari", en: "Participle Suffixes", ru: "Суффиксы причастий" },
    definition: {
      uz: "-gan / -kan / -qan (o'tgan), -yotgan (hozirgi), -ar / -mas, -ajak (kelasi).",
      en: "-gan (past), -yotgan (present), -ar/-ajak (future).",
      ru: "-gan (прошедшее), -yotgan (настоящее), -ar/-ajak (будущее).",
    },
    category: "Grammatika",
    box: 1
  },
  {
    id: 'fc-5',
    term: { uz: "Evristik suhbat metodi", en: "Heuristic Method", ru: "Эвристическая беседа" },
    definition: {
      uz: "O'qituvchining yo'naltiruvchi savollari orqali o'quvchining yangi grammatik qoidani mustaqil kashf etishi.",
      en: "Guiding students through targeted questions to deduce rules independently.",
      ru: "Наводящие вопросы учителя, ведущие ученика к самостоятельному открытию правила.",
    },
    category: "Metodika",
    box: 1
  },
  {
    id: 'fc-6',
    term: { uz: "INSERT metodi", en: "INSERT Reading Method", ru: "Метод ИНСЕРТ" },
    definition: {
      uz: "Matnni belgilar bilan o'qish (V - bilaman, + - yangi, - - boshqacha bilardim, ? - tushunarsiz).",
      en: "Interactive marking system for critical reading (V - known, + - new, - - contrary, ? - question).",
      ru: "Маркировка текста символами при критическом чтении (V, +, -, ?).",
    },
    category: "Metodika",
    box: 1
  },
  {
    id: 'fc-7',
    term: { uz: "TTT (Teacher Talking Time)", en: "Teacher Talking Time", ru: "Время речи учителя" },
    definition: {
      uz: "Darsda o'qituvchi nutqi 40% dan oshmasligi, qolgan vaqt o'quvchi amaliyotiga ajratilishi lozim.",
      en: "Teacher speech should occupy under 40% of class time; 60%+ belongs to student interaction.",
      ru: "Речь учителя не должна превышать 40% урока, уступая место активности школьников.",
    },
    category: "Pedagogika",
    box: 1
  },
  {
    id: 'fc-8',
    term: { uz: "DTS kompetensiyalari", en: "SES Competencies", ru: "Компетенции ГОС" },
    definition: {
      uz: "Lingvistik (til bilimi), kommunikativ (amaliy nutq) va pragmatik (ijtimoiy vaziyatga moslashuv).",
      en: "Linguistic (knowledge), communicative (functional use), and pragmatic (contextual adaptation).",
      ru: "Лингвистическая (знания), коммуникативная (речь) и прагматическая (уместность в контексте).",
    },
    category: "Pedagogika",
    box: 1
  }
];
