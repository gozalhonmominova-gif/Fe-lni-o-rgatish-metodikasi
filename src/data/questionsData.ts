import { Question } from '../types';

// Diagnostic Pre-test (10 questions)
export const preTestQuestions: Question[] = [
  {
    id: 'pt-1',
    type: 'single',
    question: {
      uz: "Fe'l so'z turkumining asosiy grammatik belgisi nima?",
      en: "What is the primary grammatical marker of the verb?",
      ru: "Что является основным грамматическим признаком глагола?",
    },
    options: [
      { id: 'a', text: { uz: "Narsa-buyum nomini bildirish", en: "Denoting an object or entity", ru: "Обозначение предмета" } },
      { id: 'b', text: { uz: "Shaxs yoki narsaning harakat va holatini bildirish", en: "Denoting action or state of an entity", ru: "Обозначение действия или состояния предмета" } },
      { id: 'c', text: { uz: "Narsaning belgisini ifodalash", en: "Expressing an attribute of an object", ru: "Выражение признака предмета" } },
      { id: 'd', text: { uz: "Harakatning miqdorini bildirish", en: "Indicating the quantity of action", ru: "Указание на количество действия" } },
    ],
    correctAnswer: 'b',
    explanation: {
      uz: "Fe'l shaxs yoki narsaning harakat va holatini bildirib, 'nima qildi?', 'nima qilyapti?', 'nima qiladi?' kabi so'roqlarga javob bo'ladi.",
      en: "Verbs denote actions and states of subjects, responding to 'what does/did/will it do?'.",
      ru: "Глагол обозначает действие или состояние предмета и отвечает на вопросы 'что делает/сделал?'.",
    },
    hint: {
      uz: "Fe'l har doim dinamika, faoliyat yoki holat bilan bog'liq bo'ladi.",
      en: "Verbs are always connected to dynamics, activities, or states.",
      ru: "Глагол всегда связан с динамикой, деятельностью или состоянием.",
    },
    difficulty: 'easy'
  },
  {
    id: 'pt-2',
    type: 'single',
    question: {
      uz: "O'zbek tilida nechta fe'l nisbati mavjud?",
      en: "How many verb voices are there in Uzbek?",
      ru: "Сколько залогов глагола существует в узбекском языке?",
    },
    options: [
      { id: 'a', text: { uz: "3 ta", en: "3", ru: "3" } },
      { id: 'b', text: { uz: "4 ta", en: "4", ru: "4" } },
      { id: 'c', text: { uz: "5 ta (Aniq, O'zlik, Majhul, Orttirma, Birgalik)", en: "5 (Active, Reflexive, Passive, Causative, Reciprocal)", ru: "5 (Действительный, Возвратный, Страдательный, Понудительный, Совместный)" } },
      { id: 'd', text: { uz: "6 ta", en: "6", ru: "6" } },
    ],
    correctAnswer: 'c',
    explanation: {
      uz: "O'zbek adabiy tilida 5 ta nisbat mavjud: aniq nisbat (ko'rsatkichsiz), o'zlik (-in, -il), majhul (-il, -in), orttirma (-dir, -tir, -t, -ir) va birgalik (-ish, -sh).",
      en: "Uzbek features 5 distinct voices: active, reflexive, passive, causative, and reciprocal.",
      ru: "В узбекском языке 5 залогов: действительный, возвратный, страдательный, понудительный, совместный.",
    },
    hint: {
      uz: "Bular orasida harakatni boshqaga bajartirish (orttirma) hamda birgalashib bajarish ham alohida nisbat sanaladi.",
      en: "Causative and cooperative actions are classified as distinct voices.",
      ru: "Понуждение и совместное действие выделяются в отдельные залоги.",
    },
    difficulty: 'easy'
  },
  {
    id: 'pt-3',
    type: 'single',
    question: {
      uz: "'Xat kecha kechqurun yozildi' gapida fe'l qaysi nisbatda qo'llangan?",
      en: "What voice is used in 'Xat kecha kechqurun yozildi'?",
      ru: "В каком залоге стоит глагол в предложении 'Xat kecha kechqurun yozildi'?",
    },
    options: [
      { id: 'a', text: { uz: "O'zlik nisbat", en: "Reflexive", ru: "Возвратный" } },
      { id: 'b', text: { uz: "Majhul nisbat", en: "Passive", ru: "Страдательный" } },
      { id: 'c', text: { uz: "Orttirma nisbat", en: "Causative", ru: "Понудительный" } },
      { id: 'd', text: { uz: "Aniq nisbat", en: "Active", ru: "Действительный" } },
    ],
    correctAnswer: 'b',
    explanation: {
      uz: "Yoz-il-di: harakatning haqiqiy ijrochisi noma'lum bo'lib, xat ish-harakat obyektidir.",
      en: "'yoz-il-di' contains the passive suffix '-il', hiding the real author of the letter.",
      ru: "'yoz-il-di' содержит страдательный суффикс '-il', истинный автор письма опущен.",
    },
    hint: {
      uz: "Harakatning kim tomonidan yozilgani aytilmagan.",
      en: "The agent who actually wrote the letter is omitted.",
      ru: "Не сказано, кем именно было написано письмо.",
    },
    difficulty: 'easy'
  },
  {
    id: 'pt-4',
    type: 'single',
    question: {
      uz: "Fe'lning xoslangan shakllari qatorini aniqlang:",
      en: "Identify the set of non-finite verb forms:",
      ru: "Определите ряд неспрягаемых форм глагола:",
    },
    options: [
      { id: 'a', text: { uz: "Harakat nomi, Sifatdosh, Ravishdosh", en: "Verbal noun, Participle, Gerund", ru: "Имя действия, Причастие, Деепричастие" } },
      { id: 'b', text: { uz: "Aniq mayl, Buyruq mayli, Shart mayli", en: "Indicative, Imperative, Conditional", ru: "Изъявительное, Повелительное, Условное" } },
      { id: 'c', text: { uz: "O'tgan zamon, Hozirgi zamon, Kelasi zamon", en: "Past, Present, Future", ru: "Прошедшее, Настоящее, Будущее" } },
      { id: 'd', text: { uz: "Sodda, Qo'shma, Juft fe'llar", en: "Simple, Compound, Paired verbs", ru: "Простые, Составные, Парные" } },
    ],
    correctAnswer: 'a',
    explanation: {
      uz: "Fe'lning xoslangan (funksional) shakllari: harakat nomi (-sh, -ish, -moq), sifatdosh (-gan, -yotgan) va ravishdosh (-b, -ib, -gach) hisoblanadi.",
      en: "Non-finite verbal forms in Uzbek are verbal nouns, participles, and gerunds.",
      ru: "Особыми неспрягаемыми формами являются имя действия, причастие и деепричастие.",
    },
    hint: {
      uz: "Bu shakllar ot, sifat va ravish xususiyatlarini oladi.",
      en: "These forms adopt noun, adjective, and adverb properties.",
      ru: "Эти формы приобретают свойства существительного, прилагательного и наречия.",
    },
    difficulty: 'medium'
  },
  {
    id: 'pt-5',
    type: 'single',
    question: {
      uz: "Didaktikada 'onglilik tamoyili' fe'lni o'rgatishda nima beradi?",
      en: "What does the 'principle of consciousness' provide in verb methodology?",
      ru: "Что обеспечивает 'принцип сознательности' при изучении глагола?",
    },
    options: [
      { id: 'a', text: { uz: "Qoidalarni quruq yodlashni tezlashtiradi", en: "Accelerates rote memorization", ru: "Ускоряет механическую зубрежку" } },
      { id: 'b', text: { uz: "O'quvchining har bir grammatik shaklning ma'nosini chuqur tushunib, nutqda o'rinli qo'llashini ta'minlaydi", en: "Ensures students consciously comprehend each form's meaning and usage", ru: "Обеспечивает глубокое осознание значения форм и их уместное употребление" } },
      { id: 'c', text: { uz: "Darsdagi intizomni kuchaytiradi", en: "Enhances classroom discipline", ru: "Усиливает дисциплину" } },
      { id: 'd', text: { uz: "Faqat diktant yozishga xizmat qiladi", en: "Serves solely for dictation writing", ru: "Служит только для диктантов" } },
    ],
    correctAnswer: 'b',
    explanation: {
      uz: "Onglilik tamoyili o'quvchi fe'l qo'shimchasi qanday semantik yukni tashiydiganligini va gap mazmuniga qanday ta'sir qilishini ongli anglashini talab qiladi.",
      en: "The principle of consciousness requires understanding semantic nuances over blind rote learning.",
      ru: "Принцип сознательности требует понимания смысловой нагрузки аффиксов вместо механического заучивания.",
    },
    hint: {
      uz: "Grammatika ma'nosiz yodlanmasligi kerak.",
      en: "Grammar shouldn't be memorized blindly.",
      ru: "Грамматика не должна учиться механически.",
    },
    difficulty: 'medium'
  },
  {
    id: 'pt-6',
    type: 'single',
    question: {
      uz: "O'quvchilarda fe'l sinonimlarini topish va assotsiativ fikrlashni rivojlantirish uchun eng samarali interfaol metod qaysi?",
      en: "Which interactive method is most effective for exploring verb synonyms and associative thinking?",
      ru: "Какой интерактивный метод наиболее эффективен для подбора глагольных синонимов и ассоциаций?",
    },
    options: [
      { id: 'a', text: { uz: "Klaster (Tarmoqlash) metodi", en: "Cluster method", ru: "Метод Кластер" } },
      { id: 'b', text: { uz: "Faqat an'anaviy diktant", en: "Traditional dictation only", ru: "Только традиционный диктант" } },
      { id: 'c', text: { uz: "Badiiy asarni shunchaki o'qish", en: "Silent reading only", ru: "Простое чтение" } },
      { id: 'd', text: { uz: "Grammatik jadvalni daftarga ko'chirish", en: "Copying tables into notebooks", ru: "Переписывание таблицы" } },
    ],
    correctAnswer: 'a',
    explanation: {
      uz: "Klaster metodi o'quvchiga markaziy tushuncha (masalan, 'Harakat') atrofida barcha sinonimik va bog'liq fe'llarni grafik shoxlantirish orqali nutq boyligini kengaytirishga imkon beradi.",
      en: "Clustering allows learners to visually branch related action verbs around a central node.",
      ru: "Кластер позволяет разветвлять ассоциативные глаголы вокруг центрального понятия.",
    },
    hint: {
      uz: "Bu usul daraxt shoxlari yoki g'uncha shaklida tuziladi.",
      en: "This method resembles branches or clusters radiating from a center.",
      ru: "Этот метод ветвится от центра подобно ветвям дерева.",
    },
    difficulty: 'easy'
  },
  {
    id: 'pt-7',
    type: 'single',
    question: {
      uz: "45 daqiqalik darsda o'qituvchi va o'quvchi faolligi nisbati qanday bo'lishi zamonaviy metodikaga mos?",
      en: "What ratio of Teacher Talking Time to Student Activity aligns with modern methodology?",
      ru: "Какое соотношение речи учителя и активности учеников рекомендовано современной методикой?",
    },
    options: [
      { id: 'a', text: { uz: "O'qituvchi 80%, o'quvchi 20%", en: "Teacher 80%, Student 20%", ru: "Учитель 80%, Ученик 20%" } },
      { id: 'b', text: { uz: "O'qituvchi 30-40%, o'quvchi 60-70%", en: "Teacher 30-40%, Student 60-70%", ru: "Учитель 30-40%, Ученик 60-70%" } },
      { id: 'c', text: { uz: "O'qituvchi butun dars gapirishi kerak", en: "Teacher speaks throughout", ru: "Учитель говорит весь урок" } },
      { id: 'd', text: { uz: "O'quvchilar mustaqil dars o'tishi kerak", en: "Students work completely unguided", ru: "Ученики предоставлены сами себе" } },
    ],
    correctAnswer: 'b',
    explanation: {
      uz: "Zamonaviy shaxsga yo'naltirilgan ta'limda o'qituvchi fasilitator (yo'naltiruvchi) bo'lib, dars vaqtining asosiy qismi o'quvchilarning faol mashg'ulotlariga ajratiladi.",
      en: "In modern learner-centered education, teachers act as facilitators while students spend 60-70% of time in active learning.",
      ru: "В личностно-ориентированном обучении учитель выступает фасилитатором, а 60-70% времени активно действуют ученики.",
    },
    hint: {
      uz: "O'quvchi qanchalik ko'p mustaqil bajarsa, shunchalik yaxshi eslab qoladi.",
      en: "Learners retain knowledge best when actively participating.",
      ru: "Ученики лучше всего усваивают материал в активной практике.",
    },
    difficulty: 'easy'
  },
  {
    id: 'pt-8',
    type: 'single',
    question: {
      uz: "O'quvchi 'U darsga kelvotti' deb yozsa, bu qanday xato turiga kiradi?",
      en: "If a student writes 'U darsga kelvotti', what error category does it belong to?",
      ru: "Если ученик пишет 'U darsga kelvotti', к какому типу ошибок это относится?",
    },
    options: [
      { id: 'a', text: { uz: "Og'zaki nutq va sheva ta'siridagi orfografik xato (adabiy: kelyapti)", en: "Dialect interference spelling error (standard: kelyapti)", ru: "Орфографическая ошибка под влиянием диалекта (норма: kelyapti)" } },
      { id: 'b', text: { uz: "Lug'aviy ma'noni tushunmaslik", en: "Misunderstanding of vocabulary meaning", ru: "Непонимание лексического значения" } },
      { id: 'c', text: { uz: "Uslubiy noaniqlik", en: "Stylistic ambiguity", ru: "Стилистическая неточность" } },
      { id: 'd', text: { uz: "Punktuatsion xato", en: "Punctuation error", ru: "Пунктуационная ошибка" } },
    ],
    correctAnswer: 'a',
    explanation: {
      uz: "Toshkent va qator o'zbek shevalarida hozirgi zamon -yapti qo'shimchasi -votti deb talaffuz qilinadi. O'quvchi og'zaki talaffuzni yozuvga ko'chirib imlo xatosiga yo'l qo'ygan.",
      en: "In spoken dialects, -yapti is often pronounced as -votti; transcribing this causes a standard spelling error.",
      ru: "В разговорной речи суффикс -yapti произносится как -votti. Перенос произношения на письмо — диалектная ошибка.",
    },
    hint: {
      uz: "Og'zaki nutq va adabiy til me'yori o'rtasidagi farqni eslang.",
      en: "Consider the contrast between colloquial dialect speech and standard orthography.",
      ru: "Вспомните разницу между диалектным произношением и литературной нормой.",
    },
    difficulty: 'easy'
  },
  {
    id: 'pt-9',
    type: 'single',
    question: {
      uz: "'o'qitmoq' fe'lida '-t' qo'shimchasi qanday grammatik ma'no ifodalaydi?",
      en: "What grammatical function does the '-t' suffix perform in 'o'qitmoq'?",
      ru: "Какую грамматическую функцию выполняет суффикс '-t' в слове 'o'qitmoq'?",
    },
    options: [
      { id: 'a', text: { uz: "O'zlik nisbat (o'zi uchun bajarish)", en: "Reflexive voice (action on self)", ru: "Возвратный залог" } },
      { id: 'b', text: { uz: "Orttirma nisbat (harakatni boshqa shaxsga bajartirish)", en: "Causative voice (causing another to act)", ru: "Понудительный залог" } },
      { id: 'c', text: { uz: "O'tgan zamon", en: "Past tense", ru: "Прошедшее время" } },
      { id: 'd', text: { uz: "Inkor ma'nosi", en: "Negation", ru: "Отрицание" } },
    ],
    correctAnswer: 'b',
    explanation: {
      uz: "O'qi (o'zing o'qi) -> o'qit (boshqaga o'qit, o'rgat). Demak, -t orttirma nisbat qo'shimchasidir.",
      en: "'o'qi' (read yourself) -> 'o'qit' (make someone read/teach). Suffix '-t' is causative.",
      ru: "'o'qi' (читай сам) -> 'o'qit' (учи другого, вели читать). Суффикс '-t' — понудительный залог.",
    },
    hint: {
      uz: "Harakat subyekt tomonidan emas, boshqa kimdir vositasida amalga oshiriladi.",
      en: "The action is facilitated through another agent.",
      ru: "Действие совершается другим лицом по побуждению субъекта.",
    },
    difficulty: 'medium'
  },
  {
    id: 'pt-10',
    type: 'single',
    question: {
      uz: "O'qituvchi baholashda rubrikalardan (mezonli baholash) foydalanishining asosiy afzalligi nima?",
      en: "What is the primary benefit of using assessment rubrics in teaching?",
      ru: "В чем главное преимущество критериальных рубрик при оценивании учеников?",
    },
    options: [
      { id: 'a', text: { uz: "Baholashni ochiq, shaffof, xolis va o'quvchi uchun tushunarli qilish", en: "Making evaluation transparent, objective, and clear to learners", ru: "Обеспечение прозрачности, объективности и понятности критериев оценки для учеников" } },
      { id: 'b', text: { uz: "Daftar tekshirish vaqtini uzaytirish", en: "Prolonging grading time", ru: "Увеличение времени проверки" } },
      { id: 'c', text: { uz: "Faqat past baho qo'yishni asoslash", en: "Justifying lower grades", ru: "Оправдание низких оценок" } },
      { id: 'd', text: { uz: "Dars rejasini qisqartirish", en: "Shortening lesson plans", ru: "Сокращение плана урока" } },
    ],
    correctAnswer: 'a',
    explanation: {
      uz: "Rubrika o'quvchiga uning ishi qanday mezonlar (savodxonlik, mazmun, uslub) asosida baholanishini oldindan bilish va o'z kamchiliklarini ko'rish imkonini beradi.",
      en: "Rubrics provide explicit performance criteria, demystifying grades and supporting targeted self-improvement.",
      ru: "Рубрики делают критерии открытыми, позволяя ученику видеть ориентиры и свои зоны роста.",
    },
    hint: {
      uz: "Shaxsiy xohish o'rniga aniq mezonlar tizimi ishlaydi.",
      en: "Objective criteria replace subjective impressions.",
      ru: "Четкие критерии заменяют субъективное мнение.",
    },
    difficulty: 'medium'
  },
];

// Rich Final Exam Question Pool (30 questions)
export const finalExamQuestions: Question[] = [
  ...preTestQuestions,
  {
    id: 'fe-11',
    moduleId: 2,
    type: 'single',
    question: {
      uz: "'Ko'ylak tikildi' va 'Kiyimini kiydi' gaplaridagi fe'llarning nisbatlari qanday?",
      en: "What voices are represented by the verbs in 'Ko'ylak tikildi' and 'Kiyimini kiydi'?",
      ru: "Каковы залоги глаголов в предложениях 'Ko'ylak tikildi' и 'Kiyimini kiydi'?",
    },
    options: [
      { id: 'a', text: { uz: "Majhul nisbat va Aniq nisbat", en: "Passive and Active", ru: "Страдательный и Действительный" } },
      { id: 'b', text: { uz: "Ikkalasi ham Majhul nisbat", en: "Both are Passive", ru: "Оба страдательные" } },
      { id: 'c', text: { uz: "Orttirma va Birgalik nisbat", en: "Causative and Reciprocal", ru: "Понудительный и Совместный" } },
      { id: 'd', text: { uz: "O'zlik va Majhul nisbat", en: "Reflexive and Passive", ru: "Возвратный и Страдательный" } },
    ],
    correctAnswer: 'a',
    explanation: {
      uz: "'tikildi' - majhul nisbat (tikuvchi noma'lum), 'kiydi' - aniq nisbat (o'zi bevosita kiygan, -in qo'shimchasi yo'q, agar 'kiyindi' bo'lsa o'zlik bo'lardi).",
      en: "'tikildi' is passive, while 'kiydi' is basic active (had it been 'kiyindi', it would be reflexive).",
      ru: "'tikildi' — страдательный, а 'kiydi' — действительный (форма 'kiyindi' была бы возвратной).",
    },
    difficulty: 'medium'
  },
  {
    id: 'fe-12',
    moduleId: 3,
    type: 'single',
    question: {
      uz: "Sifatdosh qatnashgan gapni aniqlang:",
      en: "Identify the sentence featuring a participle:",
      ru: "Определите предложение с причастием:",
    },
    options: [
      { id: 'a', text: { uz: "Tirishqoq talaba har doim yutuqlarga erishadi.", en: "A diligent student always achieves success.", ru: "Прилежный студент всегда добивается успехов." } },
      { id: 'b', text: { uz: "Vatanini sevgan inson uning ravnaqi uchun kurashadi.", en: "A person who loved their homeland fights for its prosperity.", ru: "Человек, любящий свою Родину, борется за её процветание." } },
      { id: 'c', text: { uz: "U kitobni o'qib, xulosa chiqardi.", en: "Having read the book, he drew conclusions.", ru: "Прочитав книгу, он сделал выводы." } },
      { id: 'd', text: { uz: "Kitob o'qish inson aqlini charxlaydi.", en: "Reading books sharpens the human intellect.", ru: "Чтение книг точит человеческий разум." } },
    ],
    correctAnswer: 'b',
    explanation: {
      uz: "'sevgan inson' birikmasida 'sevgan' so'zi sifatdosh (-gan) bo'lib, inson so'zini aniqlab kelmoqda.",
      en: "'sevgan' carries the participle suffix '-gan', acting attributively on 'inson'.",
      ru: "Слово 'sevgan' содержит суффикс причастия '-gan' и определяет слово 'inson'.",
    },
    difficulty: 'medium'
  },
  {
    id: 'fe-13',
    moduleId: 5,
    type: 'case',
    question: {
      uz: "Pedagogik vaziyat: 6-sinf o'quvchilari o'tgan zamon -di (yaqin o'tgan) va -gan (uzoq/natijali o'tgan) zamonlarini chalkashtirmoqda. Metodist sifatida qaysi amaliy usulni tavsiya qilasiz?",
      en: "Pedagogical Case: 6th-grade students confuse immediate past (-di) with narrative past (-gan). What classroom strategy do you recommend?",
      ru: "Педагогическая ситуация: 6-классники путают близкое прошедшее (-di) и результативное (-gan). Какой прием вы порекомендуете?",
    },
    options: [
      { id: 'a', text: { uz: "Vaqt chizig'i (Timeline) usulida ko'rgazmali vaqt masofasini chizib, shaxsan ko'rilgan va natijasi saqlangan holatlarni solishtirish", en: "Constructing an interactive historical Timeline contrasting witnessed immediacy vs lasting outcome", ru: "Использование ленты времени (Timeline) с сопоставлением очевидного действия и сохраненного результата" } },
      { id: 'b', text: { uz: "Har bir o'quvchiga qoidani 10 martadan daftarga ko'chirtirish", en: "Making students copy grammar rules 10 times", ru: "Заставить переписать правило 10 раз" } },
      { id: 'c', text: { uz: "Bu mavzuni o'tmasdan keyingi mavzuga o'tish", en: "Skipping the topic altogether", ru: "Пропустить эту тему" } },
      { id: 'd', text: { uz: "Faqat lug'at yodlatish", en: "Solely memorizing dictionary lists", ru: "Только заучивание словаря" } },
    ],
    correctAnswer: 'a',
    explanation: {
      uz: "Vaqt chizig'i orqali o'quvchi voqeaning hozirgi paytga qanchalik yaqinligini va natijasi davom etayotganini ko'rgazmali tushunib oladi.",
      en: "Visual timelines concretize temporal distances and aspectual results effectively.",
      ru: "Лента времени визуализирует дистанцию во времени и связь действия с текущим моментом.",
    },
    difficulty: 'hard'
  },
  {
    id: 'fe-14',
    moduleId: 6,
    type: 'single',
    question: {
      uz: "Dars rejasida 'Evristik suhbat' metodi darsning qaysi qismida eng yuqori natija beradi?",
      en: "At which stage of a lesson plan does 'Heuristic Conversation' yield optimal outcomes?",
      ru: "На каком этапе урока метод 'Эвристической беседы' дает максимальный педагогический эффект?",
    },
    options: [
      { id: 'a', text: { uz: "Faqat darsning so'nggi 2 daqiqasida uyga vazifa berganda", en: "Solely in the final 2 minutes assigning homework", ru: "Только при выдаче домашнего задания" } },
      { id: 'b', text: { uz: "Yangi mavzuni o'quvchilar bilan birgalikda mantiqiy savol-javob orqali kashf etish jarayonida", en: "During new topic discovery via guided inquiry-based reasoning", ru: "При совместном с учениками открытии новой темы через систему наводящих вопросов" } },
      { id: 'c', text: { uz: "Davomatni aniqlashda", en: "During attendance checking", ru: "Во время переклички" } },
      { id: 'd', text: { uz: "Jismoniy daqiqada", en: "During warm-up stretches", ru: "Во время физкультминутки" } },
    ],
    correctAnswer: 'b',
    explanation: {
      uz: "Evristik suhbat — o'quvchiga tayyor qoidani aytmasdan, unga savollar berish orqali qoidani o'ziga kashf qildiruvchi qidiruv metodidir.",
      en: "Heuristic inquiry prompts learners to deduce linguistic rules independently through targeted questions.",
      ru: "Эвристическая беседа направляет учеников самостоятельно сформулировать правило через поисковые вопросы.",
    },
    difficulty: 'medium'
  },
  {
    id: 'fe-15',
    moduleId: 7,
    type: 'single',
    question: {
      uz: "Qaysi qatorda berilgan so'zda imloviy xato mavjud?",
      en: "Which option contains a verb with an orthographic error?",
      ru: "В каком ряду допущена орфографическая ошибка в глаголе?",
    },
    options: [
      { id: 'a', text: { uz: "o'qiyapti", en: "o'qiyapti", ru: "o'qiyapti" } },
      { id: 'b', text: { uz: "yozmoqda", en: "yozmoqda", ru: "yozmoqda" } },
      { id: 'c', text: { uz: "kelvotti", en: "kelvotti", ru: "kelvotti" } },
      { id: 'd', text: { uz: "so'radi", en: "so'radi", ru: "so'radi" } },
    ],
    correctAnswer: 'c',
    explanation: {
      uz: "'kelvotti' adabiy til me'yoriga to'g'ri kelmaydi, adabiy shakli: 'kelyapti'.",
      en: "'kelvotti' is a dialectal distortion; the standard literary spelling is 'kelyapti'.",
      ru: "'kelvotti' — диалектное написание, литературная норма: 'kelyapti'.",
    },
    difficulty: 'easy'
  },
  {
    id: 'fe-16',
    moduleId: 1,
    type: 'single',
    question: {
      uz: "Fe'lning qaysi shakli gapda ega yoki to'ldiruvchi bo'lib kela oladi?",
      en: "Which non-finite verb form can act as a subject or direct object?",
      ru: "Какая форма глагола способна выступать подлежащим или дополнением?",
    },
    options: [
      { id: 'a', text: { uz: "Harakat nomi (-moq, -ish)", en: "Verbal noun (-moq, -ish)", ru: "Имя действия (-moq, -ish)" } },
      { id: 'b', text: { uz: "Ravishdosh (-gach)", en: "Gerund (-gach)", ru: "Деепричастие (-gach)" } },
      { id: 'c', text: { uz: "Shart mayli (-sa)", en: "Conditional mood (-sa)", ru: "Условное наклонение (-sa)" } },
      { id: 'd', text: { uz: "Orttirma nisbat", en: "Causative voice", ru: "Понудительный залог" } },
    ],
    correctAnswer: 'a',
    explanation: {
      uz: "Harakat nomi ot kabi kelishik va egalik qo'shimchalarini olib, ega (O'qish — foydali) yoki to'ldiruvchi (O'qishni yoqtiraman) bo'ladi.",
      en: "Verbal nouns take case and possessive endings, filling noun roles like subject and object.",
      ru: "Имя действия склоняется и принимает притяжательные аффиксы, выступая подлежащим или дополнением.",
    },
    difficulty: 'medium'
  },
  {
    id: 'fe-17',
    moduleId: 2,
    type: 'single',
    question: {
      uz: "'yozdirmadingiz' fe'lida nechta qo'shimcha mavjud?",
      en: "How many distinct suffixes are attached to the root in 'yozdirmadingiz'?",
      ru: "Сколько суффиксов присоединено к корню в слове 'yozdirmadingiz'?",
    },
    options: [
      { id: 'a', text: { uz: "2 ta", en: "2", ru: "2" } },
      { id: 'b', text: { uz: "3 ta", en: "3", ru: "3" } },
      { id: 'c', text: { uz: "4 ta (-dir, -ma, -di, -ngiz)", en: "4 (-dir, -ma, -di, -ngiz)", ru: "4 (-dir, -ma, -di, -ngiz)" } },
      { id: 'd', text: { uz: "5 ta", en: "5", ru: "5" } },
    ],
    correctAnswer: 'c',
    explanation: {
      uz: "yoz (o'zak) + -dir (orttirma nisbat) + -ma (bo'lishsizlik) + -di (o'tgan zamon) + -ngiz (shaxs-son). Jami 4 ta qo'shimcha.",
      en: "yoz (root) + -dir (voice) + -ma (negation) + -di (tense) + -ngiz (person). Total 4 suffixes.",
      ru: "yoz (корень) + -dir (залог) + -ma (отрицание) + -di (время) + -ngiz (лицо). Итого 4 аффикса.",
    },
    difficulty: 'hard'
  },
  {
    id: 'fe-18',
    moduleId: 4,
    type: 'single',
    question: {
      uz: "O'zbekiston Respublikasi DTS bo'yicha ona tili ta'limining bosh maqsadi nima?",
      en: "Under the State Educational Standard, what is the ultimate goal of native language education?",
      ru: "В чем главная цель обучения родному языку согласно Госстандарту (DTS)?",
    },
    options: [
      { id: 'a', text: { uz: "Faqat grammatika terminlarini yoddan aytish", en: "Reciting grammar terminology by heart", ru: "Заучивание грамматической терминологии" } },
      { id: 'b', text: { uz: "Erkin, ravon, to'g'ri va ijodiy fikrlaydigan, muloqotga kirisha oladigan nutqiy shaxsni shakllantirish", en: "Fostering an articulate, creative communicator capable of fluent self-expression", ru: "Формирование гармоничной языковой личности, свободно и грамотно выражающей мысли" } },
      { id: 'c', text: { uz: "Faqat chiroyli husnixatga o'rgatish", en: "Training neat handwriting only", ru: "Обучение чистописанию" } },
      { id: 'd', text: { uz: "Darslikdagi mashqlarni to'liq ko'chirib chiqish", en: "Transcribing textbook exercises", ru: "Переписывание упражнений" } },
    ],
    correctAnswer: 'b',
    explanation: {
      uz: "Zamonaviy DTS asosida o'quvchining nutqiy va kommunikativ kompetensiyasini shakllantirish bosh maqsad hisoblanadi.",
      en: "Developing communicative speech competence is the cornerstone of modern educational benchmarks.",
      ru: "Формирование коммуникативно грамотной личности — главная цель Госстандарта.",
    },
    difficulty: 'medium'
  },
  {
    id: 'fe-19',
    moduleId: 5,
    type: 'single',
    question: {
      uz: "Sinkvein (besh qatorli she'r) tuzishda 3-qatorda nimalar aks etishi kerak?",
      en: "In composing a didactic Cinquain, what should the 3rd line contain?",
      ru: "Что должно содержаться в 3-й строке дидактического синквейна?",
    },
    options: [
      { id: 'a', text: { uz: "1 ta ot", en: "1 noun", ru: "1 существительное" } },
      { id: 'b', text: { uz: "2 ta sifat", en: "2 adjectives", ru: "2 прилагательных" } },
      { id: 'c', text: { uz: "3 ta fe'l (harakatni ifodalovchi)", en: "3 action verbs", ru: "3 глагола действия" } },
      { id: 'd', text: { uz: "4 ta so'zdan iborat fikr", en: "4-word sentence", ru: "Предложение из 4 слов" } },
    ],
    correctAnswer: 'c',
    explanation: {
      uz: "Sinkvein qoidasi: 1-qator: 1 ta ot; 2-qator: 2 ta sifat; 3-qator: 3 ta fe'l; 4-qator: 4 ta so'zli jumla; 5-qator: 1 ta xulosa so'z.",
      en: "Line 1: 1 noun; Line 2: 2 adjectives; Line 3: 3 verbs; Line 4: 4-word phrase; Line 5: 1 synonym conclusion.",
      ru: "Структура синквейна: 1 строка — 1 существительное; 2 — 2 прилагательных; 3 — 3 глагола; 4 — фраза из 4 слов; 5 — 1 слово-вывод.",
    },
    difficulty: 'easy'
  },
  {
    id: 'fe-20',
    moduleId: 7,
    type: 'case',
    question: {
      uz: "O'quvchi 'U darsni boshladi' va 'Dars boshlandi' gaplarini bir xil ma'noda deb o'ylasa, unga qaysi grammatik hodisani tushuntirish zarur?",
      en: "If a pupil thinks 'U darsni boshladi' and 'Dars boshlandi' mean the exact same thing, what grammatical phenomenon needs clarification?",
      ru: "Если ученик считает предложения 'U darsni boshladi' и 'Dars boshlandi' тождественными, какое грамматическое явление нужно объяснить?",
    },
    options: [
      { id: 'a', text: { uz: "Aniq va O'zlik nisbat farqi (birinchisida subyekt o'zi boshlagan, ikkinchisida harakat o'z-o'zidan yoki kimdir tomonidan yuzaga kelgan)", en: "Contrast between Active and Reflexive/Passive voice semantic nuances", ru: "Разницу между действительным и возвратно-средним залогами" } },
      { id: 'b', text: { uz: "Kelasi zamon shakllarini", en: "Future tense paradigms", ru: "Будущее время" } },
      { id: 'c', text: { uz: "Faqat tinish belgilarini", en: "Punctuation only", ru: "Только знаки препинания" } },
      { id: 'd', text: { uz: "Urg'u qoidalarini", en: "Stress placement rules", ru: "Правила ударения" } },
    ],
    correctAnswer: 'a',
    explanation: {
      uz: "Boshladi — aniq nisbat (subyekt bor: u). Boshlandi — o'zlik-majhul nisbat (bajaruvchi ko'rsatilmagan).",
      en: "'boshladi' is active with an explicit agent, while 'boshlandi' hides the initiator.",
      ru: "'boshladi' — активное действие с субъектом, а 'boshlandi' выражает самопроизвольное начало.",
    },
    difficulty: 'medium'
  }
];
