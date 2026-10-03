import { ModuleData } from '../types';

export const modulesData: ModuleData[] = [
  {
    id: 1,
    number: 1,
    slug: 'fel-haqida-umumiy-tushuncha',
    title: {
      uz: "Fe'l haqida umumiy tushuncha",
      en: "General Concept of the Verb",
      ru: "Общее понятие о глаголе",
    },
    subtitle: {
      uz: "Leksik-grammatik ma'nosi, so'roqlari, gapdagi vazifasi va nutq o'stirishdagi o'rni",
      en: "Lexical-grammatical meaning, questions, syntactic function, and role in speech development",
      ru: "Лексико-грамматическое значение, вопросы, синтаксическая роль и значение в развитии речи",
    },
    icon: "BookOpen",
    color: "from-blue-600 to-indigo-600",
    bgColor: "bg-blue-50 dark:bg-blue-950/40 border-blue-200 dark:border-blue-900/60",
    estimatedMinutes: 12,
    recommendedGameId: 'fel-detektivi',
    lessons: [
      {
        id: 'm1-l1',
        title: {
          uz: "1.1. Fe'lning leksik-grammatik tabiati va belgilari",
          en: "1.1. Lexical-grammatical Nature and Characteristics of the Verb",
          ru: "1.1. Лексико-грамматическая природа и признаки глагола",
        },
        readTimeMinutes: 4,
        content: {
          summary: {
            uz: "Fe'l — shaxs yoki narsaning harakat va holatini bildiruvchi mustaqil so'z turkumi. U 'nima qildi?', 'nima qilyapti?', 'nima qiladi?' kabi so'roqlarga javob bo'lib, o'zbek tilida eng boy grammatik shakllar tizimiga ega.",
            en: "The verb is an independent part of speech expressing the action or state of a person or object. Answering questions like 'what did they do?', 'what are they doing?', it possesses the richest morphological system in Uzbek.",
            ru: "Глагол — самостоятельная часть речи, обозначающая действие или состояние предмета. Отвечает на вопросы 'что сделал?', 'что делает?', 'что будет делать?' и обладает самой развитой грамматической системой в узбекском языке.",
          },
          sections: [
            {
              heading: {
                uz: "Fe'lning semantik doirasi: Harakat va Holat",
                en: "Semantic Scope: Action vs. State",
                ru: "Семантический диапазон: Действие и Состояние",
              },
              body: {
                uz: "Maktab o'quvchilari ko'pincha fe'lni faqat jismoniy harakat (yugurdi, yozdi) deb tushunishadi. Metodik jihatdan o'qituvchi fe'lning aqliy faoliyat (o'yladi, tushundi), nutq faoliyati (gapirdi, so'radi), hissiy-ruhiy holat (quvondi, xafa bo'ldi, g'azablandi) va tabiiy holat (qoraydi, soviydi) ma'nolarini ham ifodalashini ko'rgazmali tushuntirishi lozim.",
                en: "School pupils often perceive verbs only as physical actions (ran, wrote). Methodologically, the teacher must demonstrate that verbs also express mental processes (thought, comprehended), speech acts (spoke, asked), emotional states (rejoiced, grieved), and natural states (darkened, cooled).",
                ru: "Школьники часто воспринимают глагол только как физическое действие (бежал, писал). Методически учитель должен показать, что глагол выражает умственную деятельность (думал, понял), речевую (говорил), эмоциональное состояние (радовался, грустил) и природные состояния (темнело, остывает).",
              },
              example: {
                uz: "Bolalar darsda quvonishdi va chuqur o'ylashdi.",
                translation: {
                  en: "The children rejoiced and thought deeply in the lesson.",
                  ru: "Дети радовались на уроке и глубоко задумались.",
                },
                morphemes: [
                  { part: "quvon", role: "Holat fe'li o'zagi (state root)", color: "text-blue-600 dark:text-blue-400 font-bold" },
                  { part: "-ish", role: "Birgalik nisbati", color: "text-emerald-600 dark:text-emerald-400" },
                  { part: "-di", role: "Yaqin o'tgan zamon", color: "text-amber-600 dark:text-amber-400" },
                ],
                note: {
                  uz: "Bu yerda 'quvonmoq' ruhiy holat, 'o'ylamoq' esa aqliy faoliyat fe'li sanaladi.",
                  en: "'Quvonmoq' is an emotional state, while 'o'ylamoq' is a cognitive action.",
                  ru: "Здесь 'quvonmoq' выражает эмоциональное состояние, а 'o'ylamoq' — мыслительный процесс.",
                }
              }
            },
            {
              heading: {
                uz: "Fe'lning gapdagi sintaktik vazifasi",
                en: "Syntactic Function in Sentences",
                ru: "Синтаксическая роль глагола в предложении",
              },
              body: {
                uz: "Tuslangan fe'l gapda deyarli har doim KESIM (predikat) vazifasida keladi va gapning grammatik markazini tashkil etadi. O'zbek tili qurilishida kesim qat'iy ravishda gap oxirida joylashadi. Biroq noaniq shakllar (harakat nomi, sifatdosh, ravishdosh) boshqa gap bo'laklari (ega, to'ldiruvchi, aniqlovchi, hol) vazifasida ham kela oladi.",
                en: "Finite verbs almost always act as the PREDICATE and form the grammatical core of the sentence. In Uzbek SOV typology, the predicate sits at the very end. However, non-finite forms (verbal nouns, participles, gerunds) can serve as subjects, objects, attributes, or adverbials.",
                ru: "Спрягаемый глагол практически всегда выступает в роли СКАЗУЕМОГО и формирует грамматический центр предложения. В узбекском языке сказуемое строго завершает предложение. Однако неспрягаемые формы (имя действия, причастие, деепричастие) могут быть подлежащим, дополнением, определением или обстоятельством.",
              },
              table: {
                headers: [
                  { uz: "Fe'l shakli", en: "Verb Form", ru: "Форма глагола" },
                  { uz: "Misol", en: "Example", ru: "Пример" },
                  { uz: "Gapdagi vazifasi", en: "Syntactic Role", ru: "Роль в предложении" },
                ],
                rows: [
                  [
                    { uz: "Tuslangan fe'l (yozdi)", en: "Finite verb (wrote)", ru: "Спрягаемый глагол (yozdi)" },
                    { uz: "Alisher darsni puxta yozdi.", en: "Alisher wrote the lesson well.", ru: "Алишер аккуратно записал урок." },
                    { uz: "Kesim (Predicate)", en: "Predicate", ru: "Сказуемое" }
                  ],
                  [
                    { uz: "Harakat nomi (-ish, -moq)", en: "Verbal noun (-ish, -moq)", ru: "Имя действия (-ish, -moq)" },
                    { uz: "Kitob o'qish insonni yuksaltiradi.", en: "Reading books elevates a person.", ru: "Чтение книг возвышает человека." },
                    { uz: "Ega (Subject)", en: "Subject", ru: "Подлежащее" }
                  ],
                  [
                    { uz: "Sifatdosh (-gan, -yotgan)", en: "Participle (-gan, -yotgan)", ru: "Причастие (-gan, -yotgan)" },
                    { uz: "Yaxshi o'qigan talaba yutadi.", en: "A well-read student wins.", ru: "Хорошо учившийся студент победит." },
                    { uz: "Aniqlovchi (Attribute)", en: "Attribute", ru: "Определение" }
                  ],
                  [
                    { uz: "Ravishdosh (-b, -gach)", en: "Gerund (-b, -gach)", ru: "Деепричастие (-b, -gach)" },
                    { uz: "Qo'ng'iroq chalinib, dars boshlandi.", en: "The bell having rung, class began.", ru: "Прозвенел звонок, и начался урок." },
                    { uz: "Hol (Adverbial)", en: "Adverbial modifier", ru: "Обстоятельство" }
                  ],
                ]
              }
            }
          ],
          takeaways: [
            {
              uz: "Fe'l faqat jismoniy harakat emas, balki aqliy, nutqiy, ruhiy va tabiiy holatlarni ham ifodalaydi.",
              en: "Verbs represent not only physical motion, but cognitive, verbal, emotional, and environmental states.",
              ru: "Глагол выражает не только физические движения, но и мыслительные, речевые, эмоциональные и природные состояния.",
            },
            {
              uz: "O'zbek tilida kesim odatda gap oxirida keladi va fikrni mantiqiy yakunlaydi.",
              en: "In Uzbek syntax, the predicate strictly resides at the end, concluding the logical proposition.",
              ru: "В узбекском предложении сказуемое традиционно завершает фразу и логически оформляет мысль.",
            },
            {
              uz: "Boshlang'ich sinflarda 'harakat bildiruvchi so'zlar' atamasidan bosqichma-bosqich ilmiy 'fe'l' atamasiga o'tiladi.",
              en: "In primary classes, teachers transition systematically from 'words denoting action' to the scientific term 'verb'.",
              ru: "В начальной школе осуществляется постепенный переход от понятия 'слова, обозначающие действие' к термину 'глагол'.",
            }
          ]
        }
      },
      {
        id: 'm1-l2',
        title: {
          uz: "1.2. Fe'lning nutq o'stirishdagi didaktik o'rni",
          en: "1.2. Didactic Role of Verbs in Speech Development",
          ru: "1.2. Дидактическая роль глагола в развитии речи",
        },
        readTimeMinutes: 3,
        content: {
          summary: {
            uz: "Fe'l nutqning harakatlantiruvchi dvigatelidir. Boy fe'l lug'atiga ega bo'lgan o'quvchi o'z fikrini lo'nda, dinamik va ta'sirchan ifodalay oladi.",
            en: "The verb is the dynamic engine of speech. A student with an enriched verb vocabulary expresses thoughts concisely, dynamically, and persuasively.",
            ru: "Глагол — двигатель речи. Ученик с богатым глагольным словарным запасом выражает мысли динамично, точно и убедительно.",
          },
          sections: [
            {
              heading: {
                uz: "Sinonim va antonim fe'llar ustida ishlash metodikasi",
                en: "Methodology of Working with Verb Synonyms and Antonyms",
                ru: "Методика работы с глагольными синонимами и антонимами",
              },
              body: {
                uz: "O'quvchilar nutqida takrorlanish (tavtologiya) juda ko'p uchraydi (masalan: 'U keldi, keyin aytdi, keyin bordi'). O'qituvchi 'Aqliy hujum' va 'Klaster' metodlari orqali harakat fe'llarining sinonimik qatorlarini (masalan, 'yugurmoq': yelmoq, chopmoq, uchmoq, ildamlamoq) o'rgatishi va nutqiy boylikni kengaytirishi zarur.",
                en: "Tautology often plagues student essays ('he came, then said, then went'). Teachers apply brainstorming and clustering to develop synonym chains (e.g., 'to run': dash, sprint, dart, rush) to foster linguistic richness.",
                ru: "В речи учащихся часта тавтология ('он пришел, потом сказал, потом пошел'). Учитель с помощью методов 'Мозговой штурм' и 'Кластер' развивает синонимические ряды глаголов, обогащая речь учеников.",
              },
              methodHighlight: {
                methodName: "Klaster (G'uncha) metodi",
                goal: {
                  uz: "Biror tushunchaga tegishli fe'llar zanjirini grafik shaklda tasvirlash",
                  en: "Graphically map associative action verbs connected to a central concept",
                  ru: "Графически визуализировать цепочку глаголов вокруг центрального понятия",
                },
                classroomTip: {
                  uz: "Doska markaziga 'Bahor' so'zini yozing. O'quvchilardan bahor faslida tabiatda nimalar sodir bo'lishini faqat fe'llar orqali (uyg'onmoqda, chechak otmoqda, erimoqda, gullamoqda) to'ldirishni so'rang.",
                  en: "Write 'Spring' in the center of the board. Ask pupils to brainstorm verbs representing natural occurrences (awakens, blossoms, melts, blooms).",
                  ru: "Напишите в центре доски 'Весна'. Попросите учеников назвать только глаголы природных изменений (пробуждается, цветёт, тает).",
                }
              }
            }
          ],
          takeaways: [
            {
              uz: "Fe'l sinonimiyasini o'rganish o'quvchini bir xil so'zlarni qayta-qayta ishlatishdan xalos etadi.",
              en: "Studying verb synonyms saves students from monotonous word repetitions.",
              ru: "Изучение синонимов глагола избавляет школьников от речевого однообразия.",
            },
            {
              uz: "Ko'rgazmali va interfaol usullar (masalan, harakatni pantomima orqali topish) fe'l tushunchasini mustahkamlaydi.",
              en: "Visual and role-play activities (e.g., charades) cement understanding of verb semantics.",
              ru: "Игровые и наглядные приемы (пантомима, угадай действие) прочно закрепляют понятие о глаголе.",
            }
          ]
        }
      }
    ],
    checkQuiz: [
      {
        id: 'm1-q1',
        moduleId: 1,
        type: 'single',
        question: {
          uz: "Qaysi qatorda faqat insonning ruhiy-hissiy holatini ifodalovchi fe'llar berilgan?",
          en: "Which row contains only verbs denoting human emotional and psychological states?",
          ru: "В каком ряду даны только глаголы, выражающие эмоционально-психологическое состояние человека?",
        },
        options: [
          { id: 'a', text: { uz: "yugurmoq, sakramoq, suzmoq", en: "to run, to jump, to swim", ru: "бежать, прыгать, плавать" } },
          { id: 'b', text: { uz: "quvonmoq, xafa bo'lmoq, g'ururlanmoq", en: "to rejoice, to grieve, to feel proud", ru: "радоваться, огорчаться, гордиться" } },
          { id: 'c', text: { uz: "gapirmoq, so'ramoq, pichirlamoq", en: "to speak, to inquire, to whisper", ru: "говорить, спрашивать, шептать" } },
          { id: 'd', text: { uz: "qoraymoq, sovumoq, qizimoq", en: "to darken, to cool, to heat up", ru: "темнеть, остывать, нагреваться" } },
        ],
        correctAnswer: 'b',
        explanation: {
          uz: "'Quvonmoq', 'xafa bo'lmoq', 'g'ururlanmoq' insonning ichki ruhiy kechinma va holatini ifodalaydi. A qatorda jismoniy, C qatorda nutqiy, D qatorda tabiiy holat fe'llari keltirilgan.",
          en: "'Quvonmoq', 'xafa bo'lmoq', and 'g'ururlanmoq' reflect inner emotional experiences.",
          ru: "'Quvonmoq', 'xafa bo'lmoq', 'g'ururlanmoq' отражают внутренние эмоциональные переживания.",
        },
        difficulty: 'easy'
      },
      {
        id: 'm1-q2',
        moduleId: 1,
        type: 'single',
        question: {
          uz: "O'zbek tili sintaksisida tuslangan fe'l qaysi gap bo'lagi vazifasida kelishi odatiy qonuniyat sanaladi?",
          en: "In Uzbek syntax, which sentence element is traditionally filled by a finite verb?",
          ru: "Какой частью предложения традиционно выступает спрягаемый глагол в узбекском синтаксисе?",
        },
        options: [
          { id: 'a', text: { uz: "Ega (Subject)", en: "Subject", ru: "Подлежащее" } },
          { id: 'b', text: { uz: "Kesim (Predicate)", en: "Predicate", ru: "Сказуемое" } },
          { id: 'c', text: { uz: "Aniqlovchi (Attribute)", en: "Attribute", ru: "Определение" } },
          { id: 'd', text: { uz: "To'ldiruvchi (Object)", en: "Object", ru: "Дополнение" } },
        ],
        correctAnswer: 'b',
        explanation: {
          uz: "Tuslangan fe'llar gapda odatda kesim bo'lib keladi va gapning grammatik-mantiqiy yakunini ta'minlaydi.",
          en: "Finite verbs function primarily as the predicate in Uzbek syntax.",
          ru: "Спрягаемые глаголы в узбекском языке выступают в роли сказуемого.",
        },
        difficulty: 'easy'
      }
    ]
  },
  {
    id: 2,
    number: 2,
    slug: 'felning-grammatik-kategoriyalari',
    title: {
      uz: "Fe'lning grammatik kategoriyalari",
      en: "Grammatical Categories of the Verb",
      ru: "Грамматические категории глагола",
    },
    subtitle: {
      uz: "Bo'lishli/bo'lishsizlik, 5 ta nisbat, 3 ta mayl, 3 ta zamon va shaxs-son tizimi",
      en: "Affirmation/negation, 5 voices, 3 moods, 3 tenses, and person-number paradigms",
      ru: "Утверждение/отрицание, 5 залогов, 3 наклонения, 3 времени и система лица-числа",
    },
    icon: "Layers",
    color: "from-indigo-600 to-purple-600",
    bgColor: "bg-indigo-50 dark:bg-indigo-950/40 border-indigo-200 dark:border-indigo-900/60",
    estimatedMinutes: 16,
    recommendedGameId: 'morfema-konstruktori',
    lessons: [
      {
        id: 'm2-l1',
        title: {
          uz: "2.1. Nisbat kategoriyasi (5 ta nisbat) va ularni o'rgatish",
          en: "2.1. The Category of Voice (5 Voices) and Didactic Methods",
          ru: "2.1. Категория залога (5 залогов) и методика их преподавания",
        },
        readTimeMinutes: 5,
        content: {
          summary: {
            uz: "Nisbat kategoriyasi ish-harakatning bajaruvchisi (subyekt) va obyekt o'rtasidagi munosabatni bildiradi. O'zbek tilida 5 ta nisbat mavjud: Aniq, O'zlik, Majhul, Orttirma, Birgalik.",
            en: "Voice indicates the relationship between the grammatical subject, the agent of action, and the patient. Uzbek features 5 voices: Active, Reflexive, Passive, Causative, and Reciprocal/Cooperative.",
            ru: "Категория залога обозначает отношение действия к субъекту и объекту. В узбекском языке 5 залогов: Действительный (aniq), Возвратный (o'zlik), Страдательный (majhul), Понудительный (orttirma), Совместно-взаимный (birgalik).",
          },
          sections: [
            {
              heading: {
                uz: "Nisbatlar jadvali va morfemik ko'rsatkichlar",
                en: "Voice Table and Morphemic Indicators",
                ru: "Таблица залогов и морфемные показатели",
              },
              body: {
                uz: "O'qituvchi o'quvchilarga nisbat qo'shimchalarining qat'iy o'rnini ko'rsatishi lozim. Nisbat qo'shimchalari har doim fe'l o'zagiga birinchi bo'lib qo'shiladi va yangi fe'l yasaydi.",
                en: "Teachers must emphasize the strict morphemic order: voice suffixes attach directly to the verb root, preceding tense, mood, and person affixes.",
                ru: "Учитель должен подчеркнуть строгий порядок аффиксов: залоговые показатели присоединяются непосредственно к корню, предшествуя времени и лицу.",
              },
              table: {
                headers: [
                  { uz: "Nisbat nomi", en: "Voice Name", ru: "Название залога" },
                  { uz: "Qo'shimchalari", en: "Suffixes", ru: "Суффиксы" },
                  { uz: "Misol", en: "Example", ru: "Пример" },
                  { uz: "Metodik ma'nosi", en: "Methodological Meaning", ru: "Значение" }
                ],
                rows: [
                  [
                    { uz: "Aniq nisbat", en: "Active", ru: "Действительный" },
                    { uz: "Maxsus ko'rsatkich yo'q", en: "Zero affix (Ø)", ru: "Нулевой аффикс" },
                    { uz: "yozdi, o'qidi", en: "wrote, read", ru: "писал, читал" },
                    { uz: "Harakatni subyektning o'zi bevosita bajaradi.", en: "Subject directly executes action.", ru: "Субъект сам совершает действие." }
                  ],
                  [
                    { uz: "O'zlik nisbat", en: "Reflexive", ru: "Возвратный" },
                    { uz: "-in, -n, -il, -l", en: "-in, -n, -il, -l", ru: "-in, -n, -il, -l" },
                    { uz: "yuvindi, kiyindi", en: "washed self, dressed up", ru: "умылся, оделся" },
                    { uz: "Harakat subyektning o'ziga qaytadi.", en: "Action reflects back onto subject.", ru: "Действие замыкается на субъекте." }
                  ],
                  [
                    { uz: "Majhul nisbat", en: "Passive", ru: "Страдательный" },
                    { uz: "-il, -l, -in, -n", en: "-il, -l, -in, -n", ru: "-il, -l, -in, -n" },
                    { uz: "xat yozildi, dars o'tildi", en: "letter was written", ru: "письмо написано" },
                    { uz: "Bajaruvchi noma'lum yoki obyekt markazda.", en: "Agent unknown or demoted.", ru: "Деятель неизвестен или на 2 плане." }
                  ],
                  [
                    { uz: "Orttirma nisbat", en: "Causative", ru: "Понудительный" },
                    { uz: "-dir, -tir, -t, -ir, -g'az", en: "-dir, -tir, -t, -ir", ru: "-dir, -tir, -t, -ir" },
                    { uz: "yozdirdi, kuldirdi", en: "made write, caused laughter", ru: "заставил написать, рассмешил" },
                    { uz: "Harakat boshqa shaxsga bajartiriladi.", en: "Action caused through another.", ru: "Действие побуждается через другого." }
                  ],
                  [
                    { uz: "Birgalik nisbat", en: "Reciprocal/Cooperative", ru: "Совместно-взаимный" },
                    { uz: "-ish, -sh", en: "-ish, -sh", ru: "-ish, -sh" },
                    { uz: "yozishdi, ko'rishdi", en: "wrote together, saw each other", ru: "писали вместе, увиделись" },
                    { uz: "Harakat bir necha shaxs tomonidan birgalikda.", en: "Action performed collectively.", ru: "Действие выполняется сообща." }
                  ]
                ]
              },
              example: {
                uz: "Ustoz talabalarga yangi maqola yoz-dir-di.",
                translation: {
                  en: "The master caused the students to write a new article.",
                  ru: "Наставник велел студентам написать новую статью.",
                },
                morphemes: [
                  { part: "yoz", role: "Fe'l o'zagi (Stem)", color: "text-blue-600 dark:text-blue-400 font-bold" },
                  { part: "-dir", role: "Orttirma nisbat qo'shimchasi (Causative)", color: "text-purple-600 dark:text-purple-400 font-semibold" },
                  { part: "-di", role: "O'tgan zamon kesimlik ko'rsatkichi", color: "text-amber-600 dark:text-amber-400" }
                ],
                note: {
                  uz: "Bu yerda ustoz emas, talabalar yozadi; ustoz ish-harakatni bajartiruvchi hisoblanadi.",
                  en: "The causative suffix '-dir' indicates the action is executed by the students under instruction.",
                  ru: "Суффикс '-dir' указывает, что действие совершают студенты по побуждению учителя.",
                }
              }
            }
          ],
          takeaways: [
            {
              uz: "O'zlik va majhul nisbat shakldosh (-in, -il) bo'lishi mumkin. Farqlash yo'li: harakat kimga yo'nalgan?",
              en: "Reflexive and passive share similar suffixes (-in, -il). Distinguish by determining whether action is on oneself.",
              ru: "Возвратный и страдательный залоги могут омонимироваться. Критерий: замыкается ли действие на себе?",
            },
            {
              uz: "Orttirma nisbat nutqda buyruq, talab va sabab munosabatlarini ifodalashda katta ahamiyatga ega.",
              en: "Causative voice plays a crucial communicative role in expressing commands, delegation, and causation.",
              ru: "Понудительный залог незаменим в речи для выражения поручений, побуждений и причинно-следственных связей.",
            }
          ]
        }
      },
      {
        id: 'm2-l2',
        title: {
          uz: "2.2. Fe'l zamonlari va mayl kategoriyasi",
          en: "2.2. Verb Tenses and Mood Categories",
          ru: "2.2. Времена глагола и категория наклонения",
        },
        readTimeMinutes: 5,
        content: {
          summary: {
            uz: "O'zbek tilida 3 ta zamon mavjud: O'tgan, Hozirgi, Kelasi zamon. Mayllar esa 3 turga bo'linadi: Aniq (ijro), Buyruq-istak, Shart mayli.",
            en: "Uzbek comprises 3 broad tenses: Past, Present, Future, each with rich aspectual nuances. Moods are threefold: Indicative, Imperative-Optative, and Conditional.",
            ru: "В узбекском языке 3 времени: Прошедшее, Настоящее, Будущее, каждое с тонкими видовыми оттенками. Наклонений три: Изъявительное, Повелительно-желательное, Условное.",
          },
          sections: [
            {
              heading: {
                uz: "Morfemik zanjir: Fe'l tuzilishi formulasi",
                en: "Morphemic Chain: Verb Structure Formula",
                ru: "Морфемная цепочка: Формула строения глагола",
              },
              body: {
                uz: "Metodikada o'quvchilarga rangli kartochkalar yordamida fe'lning qat'iy qo'shimchalar ketma-ketligini o'rgatish eng samarali usul hisoblanadi: O'ZAK + NISBAT + BO'LISHLI/SIZLIK + ZAMON/MAYL + SHAXS-SON.",
                en: "In instructional design, teaching the strict linear suffix hierarchy via color-coded blocks proves most effective: ROOT + VOICE + NEGATION + TENSE/MOOD + PERSON/NUMBER.",
                ru: "В методике преподавания наиболее эффективен приём цветных морфемных блоков по строгой формуле: КОРЕНЬ + ЗАЛОГ + ОТРИЦАНИЕ + ВРЕМЯ/НАКЛОНЕНИЕ + ЛИЦО-ЧИСЛО.",
              },
              example: {
                uz: "o'qi - t - ma - di - ngiz",
                translation: {
                  en: "You (plural/respectful) did not cause to read.",
                  ru: "Вы не заставили читать (не обучили).",
                },
                morphemes: [
                  { part: "o'qi", role: "O'zak (Stem)", color: "text-blue-600 dark:text-blue-400 font-bold" },
                  { part: "-t", role: "Orttirma nisbat", color: "text-purple-600 dark:text-purple-400 font-bold" },
                  { part: "-ma", role: "Bo'lishsizlik shakli", color: "text-rose-600 dark:text-rose-400 font-bold" },
                  { part: "-di", role: "O'tgan zamon", color: "text-amber-600 dark:text-amber-400 font-bold" },
                  { part: "-ngiz", role: "II shaxs ko'plik", color: "text-emerald-600 dark:text-emerald-400 font-bold" }
                ],
                note: {
                  uz: "Ushbu 5 qismli formula har qanday murakkab fe'l shaklini o'quvchiga oson tushuntirish imkonini beradi.",
                  en: "This 5-part template clarifies even the most complex agglutinative verb combinations.",
                  ru: "Эта 5-компонентная формула позволяет учащимся легко разбирать сложнейшие агглютинативные формы.",
                }
              }
            }
          ],
          takeaways: [
            {
              uz: "O'zbek tilida qo'shimchalar tartibi qat'iy: o'zakdan so'ng darhol nisbat, undan so'ng inkor (-ma) keladi.",
              en: "Agglutinative suffix ordering is strictly codified: Root → Voice → Negation (-ma) → Tense/Mood → Person.",
              ru: "Порядок суффиксов строгий: сразу после корня идет залог, затем отрицание (-ma), далее время и лицо.",
            },
            {
              uz: "Shart mayli (-sa) mustaqil kesim emas, balki ergash gapni bosh gapga bog'lovchi ko'rsatkich sifatida ko'proq xizmat qiladi.",
              en: "The conditional mood (-sa) predominantly acts as a subordinating link joining conditional clauses.",
              ru: "Условное наклонение (-sa) чаще всего связывает придаточное условие с главным предложением.",
            }
          ]
        }
      }
    ],
    checkQuiz: [
      {
        id: 'm2-q1',
        moduleId: 2,
        type: 'single',
        question: {
          uz: "'Kitoblar tezda tarqatildi' gapidagi 'tarqatildi' fe'li qaysi nisbatda qo'llangan?",
          en: "What voice is the verb 'tarqatildi' in the sentence 'Kitoblar tezda tarqatildi'?",
          ru: "В каком залоге употреблен глагол 'tarqatildi' в предложении 'Kitoblar tezda tarqatildi'?",
        },
        options: [
          { id: 'a', text: { uz: "O'zlik nisbat", en: "Reflexive voice", ru: "Возвратный залог" } },
          { id: 'b', text: { uz: "Majhul nisbat", en: "Passive voice", ru: "Страдательный залог" } },
          { id: 'c', text: { uz: "Orttirma nisbat", en: "Causative voice", ru: "Понудительный залог" } },
          { id: 'd', text: { uz: "Birgalik nisbat", en: "Reciprocal voice", ru: "Совместный залог" } },
        ],
        correctAnswer: 'b',
        explanation: {
          uz: "Tarqat-il-di: -il qo'shimchasi orqali harakatning haqiqiy bajaruvchisi noma'lum bo'lib, kitoblar obyekt sifatida kesimga ega bo'lmoqda. Demak, bu majhul nisbatdir.",
          en: "'tarqat-il-di' has the passive affix '-il', with the real agent omitted.",
          ru: "'tarqat-il-di' содержит страдательный суффикс '-il', истинный исполнитель не указан.",
        },
        difficulty: 'medium'
      },
      {
        id: 'm2-q2',
        moduleId: 2,
        type: 'single',
        question: {
          uz: "Fe'l qo'shimchalarining qat'iy ketma-ketlik tartibi qaysi javobda to'g'ri ko'rsatilgan?",
          en: "Which sequence correctly reflects the grammatical morpheme hierarchy of Uzbek verbs?",
          ru: "В каком ответе верно указан строгий порядок присоединения глагольных аффиксов?",
        },
        options: [
          { id: 'a', text: { uz: "O'zak + Zamon + Nisbat + Shaxs-son", en: "Stem + Tense + Voice + Person", ru: "Корень + Время + Залог + Лицо" } },
          { id: 'b', text: { uz: "O'zak + Nisbat + Bo'lishsizlik + Zamon + Shaxs-son", en: "Stem + Voice + Negation + Tense + Person", ru: "Корень + Залог + Отрицание + Время + Лицо" } },
          { id: 'c', text: { uz: "O'zak + Shaxs-son + Zamon + Nisbat", en: "Stem + Person + Tense + Voice", ru: "Корень + Лицо + Время + Залог" } },
          { id: 'd', text: { uz: "O'zak + Bo'lishsizlik + Shaxs-son + Zamon", en: "Stem + Negation + Person + Tense", ru: "Корень + Отрицание + Лицо + Время" } },
        ],
        correctAnswer: 'b',
        explanation: {
          uz: "O'zbek tilida qoida qat'iy: O'zak + Nisbat + Bo'lishsizlik (-ma) + Zamon/Mayl + Shaxs-son (masalan: yoz-dir-ma-di-m).",
          en: "The standard sequence is Root + Voice + Negation + Tense/Mood + Person/Number.",
          ru: "Стандартный порядок: Корень + Залог + Отрицание + Время/Наклонение + Лицо/Число.",
        },
        difficulty: 'medium'
      }
    ]
  },
  {
    id: 3,
    number: 3,
    slug: 'felning-tuzilishi-va-shakllari',
    title: {
      uz: "Fe'lning tuzilishi va shakllari",
      en: "Verb Structure and Functional Forms",
      ru: "Строение и формы глагола",
    },
    subtitle: {
      uz: "Sodda, qo'shma, juft, takroriy fe'llar; harakat nomi, sifatdosh, ravishdosh, ko'makchi fe'llar",
      en: "Simple, compound, paired, duplicated verbs; verbal nouns, participles, gerunds, and auxiliaries",
      ru: "Простые, составные, парные, повторные глаголы; имя действия, причастие, деепричастие, вспомогательные глаголы",
    },
    icon: "Boxes",
    color: "from-purple-600 to-pink-600",
    bgColor: "bg-purple-50 dark:bg-purple-950/40 border-purple-200 dark:border-purple-900/60",
    estimatedMinutes: 14,
    recommendedGameId: 'xotira-kartalari',
    lessons: [
      {
        id: 'm3-l1',
        title: {
          uz: "3.1. Tuzilishiga ko'ra turlari: Sodda va Murakkab fe'llar",
          en: "3.1. Structural Classification: Simple vs. Compound Verbs",
          ru: "3.1. Виды по составу: Простые и Сложные глаголы",
        },
        readTimeMinutes: 4,
        content: {
          summary: {
            uz: "Fe'llar tuzilishiga ko'ra 4 turga bo'linadi: sodda (bir o'zakdan iborat: keldi, o'qidi), qo'shma (ikki yoki undan ortiq so'zdan: sotib oldi, dam oldi), juft (aytdi-qo'ydi, yozdi-chizdi), takroriy (yura-yura, kula-kula).",
            en: "Structurally, verbs divide into: simple (single stem: keldi), compound (multi-word: sotib oldi, dam oldi), paired (aytdi-qo'ydi), and reduplicated (yura-yura).",
            ru: "По структуре глаголы делятся на: простые (один корень: keldi), составные (два и более слов: sotib oldi), парные (yozdi-chizdi) и повторные (yura-yura).",
          },
          sections: [
            {
              heading: {
                uz: "Ko'makchi fe'lli so'z qo'shilmalari va ularning ma'nolari",
                en: "Auxiliary Verb Combinations and Aspectual Nuances",
                ru: "Сочетания со вспомогательными глаголами и их значения",
              },
              body: {
                uz: "Yetakchi fe'l ravishdosh shaklida (-b, -ib yoki -a, -y) kelib, unga ko'makchi fe'l (boshlamoq, qo'ymoq, yubormoq, tashlamoq, ko'rmoq, qolmoq) qo'shilganda harakatning davomiyligi, to'satdan sodir bo'lishi, tugallanganligi kabi nozik ma'nolar yuzaga keladi. Masalan: 'yozib yubordi' (to'satdan, tez), 'yozib qo'ydi' (oldindan, xotirjam).",
                en: "When a lexical main verb in gerund form (-b, -ib, -a, -y) joins an auxiliary verb (boshlamoq, qo'ymoq, yubormoq, tashlamoq), subtle aspectual meanings emerge: suddenness, completion, anticipation, or continuity.",
                ru: "Когда основной глагол в форме деепричастия соединяется со вспомогательным глаголом (boshlamoq, qo'ymoq, yubormoq), рождаются тончайшие оттенки: внезапность, завершенность, длительность.",
              },
              table: {
                headers: [
                  { uz: "Ko'makchi fe'l", en: "Auxiliary", ru: "Вспомогательный" },
                  { uz: "Misol", en: "Example", ru: "Пример" },
                  { uz: "O'quvchiga tushuntirish ma'nosi", en: "Nuance Explanation", ru: "Оттенок значения" }
                ],
                rows: [
                  [
                    { uz: "yubormoq", en: "yubormoq", ru: "yubormoq" },
                    { uz: "kulib yubordi", en: "burst out laughing", ru: "рассмеялся" },
                    { uz: "Harakatning kutilmaganda, shiddat bilan boshlanishi", en: "Sudden, abrupt inception of action", ru: "Внезапное, импульсивное начало" }
                  ],
                  [
                    { uz: "qo'ymoq", en: "qo'ymoq", ru: "qo'ymoq" },
                    { uz: "aytib qo'ydi", en: "notified in advance", ru: "предупредил заранее" },
                    { uz: "Harakatning oldindan yoki qat'iy bajarilishi", en: "Preemptive or definitive completion", ru: "Заблаговременность действия" }
                  ],
                  [
                    { uz: "yotmoq / turmoq", en: "yotmoq / turmoq", ru: "yotmoq / turmoq" },
                    { uz: "o'qib yotibdi", en: "is engrossed in reading", ru: "лежит и читает / увлеченно читает" },
                    { uz: "Harakatning uzoq davom etayotganligi", en: "Continuous prolonged progression", ru: "Длительное протекание действия" }
                  ]
                ]
              }
            }
          ],
          takeaways: [
            {
              uz: "Qo'shma fe'llar ajratib yoziladi (dam oldi), juft fe'llar esa chiziqcha bilan yoziladi (yozdi-chizdi).",
              en: "Compound verbs are written separately (dam oldi), whereas paired verbs require hyphens (yozdi-chizdi).",
              ru: "Составные глаголы пишутся раздельно (dam oldi), а парные — через дефис (yozdi-chizdi).",
            },
            {
              uz: "Ko'makchi fe'llar mustaqil leksik ma'nosini yo'qotib, grammatik ma'no (usul, tus) ifodalaydi.",
              en: "Auxiliary verbs lose their literal lexical meaning, functioning purely as aspectual modifiers.",
              ru: "Вспомогательные глаголы утрачивают свое прямое значение, выражая видовые оттенки протекания действия.",
            }
          ]
        }
      },
      {
        id: 'm3-l2',
        title: {
          uz: "3.2. Fe'lning xoslangan shakllari: Harakat nomi, Sifatdosh, Ravishdosh",
          en: "3.2. Non-Finite Forms: Verbal Nouns, Participles, Gerunds",
          ru: "3.2. Неспрягаемые формы: Имя действия, Причастие, Деепричастие",
        },
        readTimeMinutes: 5,
        content: {
          summary: {
            uz: "Fe'lning bu shakllari boshqa so'z turkumlari (ot, sifat, ravish) xususiyatini o'ziga oladi. Harakat nomi (-sh, -ish, -moq, -v) otlashadi; sifatdosh (-gan, -yotgan, -ar) sifatlashadi; ravishdosh (-b, -ib, -a, -y, -gach) ravishlashadi.",
            en: "These functional forms blend verbal semantics with nouns, adjectives, or adverbs. Verbal nouns act like nouns; participles modify like adjectives; gerunds describe manner like adverbs.",
            ru: "Эти формы сочетают глагольные свойства с признаками существительных, прилагательных или наречий. Имя действия субстантивируется, причастие адъективируется, деепричастие адвербиализируется.",
          },
          sections: [
            {
              heading: {
                uz: "Venn diagrammasi orqali o'rgatish usuli",
                en: "Venn Diagram Comparative Pedagogy",
                ru: "Методика сопоставления через диаграмму Венна",
              },
              body: {
                uz: "Sifatdoshni sifat bilan, harakat nomini ot bilan taqqoslashda Venn diagrammasi eng maqbul vositadir. Masalan, 'sifatdosh' va 'sifat' diagrammasida umumiy qism: narsaning belgisini bildiradi, qanday? qaysi? so'rog'iga javob bo'ladi. Farqi: sifatdosh zamon va fe'l xususiyatiga (yozgan - o'tgan zamon harakat belgisi) ega!",
                en: "Venn diagrams clearly elucidate distinctions between adjectives and participles. Shared: both answer 'what kind of?'. Difference: participles carry tense and verbal voice (e.g., 'yozgan' conveys past action as an attribute).",
                ru: "Диаграмма Венна идеальна для сравнения причастия с прилагательным. Общее: признак предмета, вопрос 'какой?'. Различие: причастие сохраняет глагольные свойства времени и залога.",
              }
            }
          ],
          takeaways: [
            {
              uz: "Harakat nomi kelishik va egalik qo'shimchalari bilan turlanadi (o'qish-im-ni).",
              en: "Verbal nouns decline for case and possessive agreement just like nouns.",
              ru: "Имя действия склоняется по падежам и принимает притяжательные аффиксы (o'qish-im-ni).",
            },
            {
              uz: "Ravishdosh hech qachon turlanmaydi va tuslanmaydi, u harakatning bajarilish tarzini bildiradi.",
              en: "Gerunds are invariable—they never conjugate or decline, functioning as adverbial modifiers.",
              ru: "Деепричастие никогда не склоняется и не спрягается, обозначая образ совершения действия.",
            }
          ]
        }
      }
    ],
    checkQuiz: [
      {
        id: 'm3-q1',
        moduleId: 3,
        type: 'single',
        question: {
          uz: "Qaysi qatorda juft fe'l keltirilgan?",
          en: "In which option is a paired verb (juft fe'l) presented?",
          ru: "В каком ряду представлен парный глагол (juft fe'l)?",
        },
        options: [
          { id: 'a', text: { uz: "yozib bo'ldi", en: "yozib bo'ldi", ru: "yozib bo'ldi" } },
          { id: 'b', text: { uz: "aytdi-qo'ydi", en: "aytdi-qo'ydi", ru: "aytdi-qo'ydi" } },
          { id: 'c', text: { uz: "kula-kula", en: "kula-kula", ru: "kula-kula" } },
          { id: 'd', text: { uz: "olib keldi", en: "olib keldi", ru: "olib keldi" } },
        ],
        correctAnswer: 'b',
        explanation: {
          uz: "'Aytdi-qo'ydi' juft fe'l bo'lib, chiziqcha bilan yoziladi. A va D qo'shma fe'l, C esa takroriy ravishdoshdir.",
          en: "'aytdi-qo'ydi' is a paired verb written with a hyphen.",
          ru: "'aytdi-qo'ydi' — парный глагол, пишется через дефис.",
        },
        difficulty: 'easy'
      },
      {
        id: 'm3-q2',
        moduleId: 3,
        type: 'single',
        question: {
          uz: "Fe'lning xoslangan shakllaridan qaysi biri gapda doimo sifatlovchi-aniqlovchi vazifasida keladi va zamon ma'nosiga ega?",
          en: "Which non-finite verb form consistently acts as an attributive modifier with inherent tense?",
          ru: "Какая неспрягаемая форма глагола выражает признак во времени и выступает в роли определения?",
        },
        options: [
          { id: 'a', text: { uz: "Harakat nomi", en: "Verbal noun", ru: "Имя действия" } },
          { id: 'b', text: { uz: "Ravishdosh", en: "Gerund", ru: "Деепричастие" } },
          { id: 'c', text: { uz: "Sifatdosh", en: "Participle", ru: "Причастие" } },
          { id: 'd', text: { uz: "Ko'makchi fe'l", en: "Auxiliary verb", ru: "Вспомогательный глагол" } },
        ],
        correctAnswer: 'c',
        explanation: {
          uz: "Sifatdosh (-gan, -yotgan, -ajak) narsaning harakatga asoslangan belgisini zamon bilan bog'lab ifodalaydi va sifat kabi aniqlovchi bo'ladi.",
          en: "Participles denote action-based attributes with temporal reference.",
          ru: "Причастие выражает признак предмета во времени и выступает определением.",
        },
        difficulty: 'medium'
      }
    ]
  },
  {
    id: 4,
    number: 4,
    slug: 'felni-orgatishning-maqsad-va-tamoyillari',
    title: {
      uz: "Fe'lni o'rgatishning maqsad va tamoyillari",
      en: "Goals and Didactic Principles of Teaching Verbs",
      ru: "Цели и дидактические принципы преподавания глагола",
    },
    subtitle: {
      uz: "Didaktik, lingvistik va kommunikativ maqsadlar, metodik tamoyillar va DTS kompetensiyalari",
      en: "Didactic, linguistic, communicative goals, methodical principles, and State Educational Standards (SES)",
      ru: "Дидактические, лингвистические, коммуникативные цели, методические принципы и компетенции ГОС",
    },
    icon: "Target",
    color: "from-emerald-600 to-teal-600",
    bgColor: "bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-900/60",
    estimatedMinutes: 13,
    recommendedGameId: 'metodni-top',
    lessons: [
      {
        id: 'm4-l1',
        title: {
          uz: "4.1. Uch birlik maqsad va zamonaviy kompetensiyaviy yondashuv",
          en: "4.1. Triad of Pedagogical Goals and Competency-Based Approach",
          ru: "4.1. Триединая цель урока и компетентностный подход",
        },
        readTimeMinutes: 4,
        content: {
          summary: {
            uz: "Ona tili darslarida fe'l o'rganish faqat qoida yodlash emas. Darsning ta'limiy (lingvistik bilim), tarbiyaviy (axloqiy fazilatlar) va rivojlantiruvchi (nutqiy kompetensiya) maqsadlari uzviy uyg'unlashishi shart.",
            en: "Teaching verbs transcends rote memorization of rules. The lesson must integrate linguistic instruction, character education, and speech competence development into a unified whole.",
            ru: "Изучение глагола выходит далеко за рамки заучивания правил. Образовательная, воспитательная и развивающая цели должны гармонично формировать коммуникативную компетенцию.",
          },
          sections: [
            {
              heading: {
                uz: "Davlat ta'lim standartlari (DTS) bo'yicha shakllantiriladigan kompetensiyalar",
                en: "Competencies Mandated by State Educational Standards",
                ru: "Формируемые компетенции по Госстандарту (DTS)",
              },
              body: {
                uz: "Zamonaviy metodika talabiga ko'ra, o'quvchi fe'l qoidasini bilish bilan cheklanmay, uni hayotiy muloqotda erkin qo'llashi kerak: 1) Lingvistik kompetensiya (grammatik qoidani to'g'ri tushunish); 2) Kommunikativ kompetensiya (og'zaki va yozma nutqda fe'llardan o'rinli foydalanish); 3) Pragmatik kompetensiya (ijtimoiy vaziyatga mos ohang va fe'l shaklini tanlay olish).",
                en: "Modern pedagogy mandates actionable competencies: 1) Linguistic competence (accurate comprehension of grammatical paradigms); 2) Communicative competence (fluent deployment in speech and writing); 3) Pragmatic competence (selecting appropriate forms per social context).",
                ru: "Современная методика требует прикладных навыков: 1) Лингвистическая компетенция (понимание правил); 2) Коммуникативная (свободное владение в речи); 3) Прагматическая (выбор уместной глагольной формы под контекст общения).",
              }
            }
          ],
          takeaways: [
            {
              uz: "Grammatika nutq rivojiga xizmat qilishi kerak; qoidani yodlatish o'z-o'zidan maqsad bo'lolmaydi.",
              en: "Grammar must serve speech development; rote memorization is never an end in itself.",
              ru: "Грамматика должна служить развитию речи; механическое заучивание правил недопустимо.",
            },
            {
              uz: "Har bir dars maqsadida o'quvchi dars so'ngida nimani 'bila oladi' emas, nimani 'qila oladi' degan natija belgilanishi shart.",
              en: "Lesson objectives must specify what the student will be able to DO, not merely passively 'know'.",
              ru: "В целях урока формулируется не то, что ученик 'узнает', а то, что он 'научится делать'.",
            }
          ]
        }
      },
      {
        id: 'm4-l2',
        title: {
          uz: "4.2. Didaktik tamoyillarning fe'l mavzusidagi in'ikosi",
          en: "4.2. Didactic Principles Applied to Verb Methodology",
          ru: "4.2. Реализация дидактических принципов при обучении глаголу",
        },
        readTimeMinutes: 4,
        content: {
          summary: {
            uz: "Fe'lni o'rgatishda 6 ta asosiy didaktik tamoyilga tayaniladi: onglilik, izchillik va tizimlilik, ko'rgazmalilik, amaliy yo'naltirilganlik, o'quvchilar yoshiga moslik, nutq o'stirish bilan uzviy bog'liqlik.",
            en: "Verb methodology rests upon 6 foundational didactic principles: consciousness, systematic sequence, visual demonstration, practical orientation, age appropriateness, and speech integration.",
            ru: "Методика опирается на 6 ключевых дидактических принципов: сознательность, системность и последовательность, наглядность, практическая направленность, учет возраста и связь с развитием речи.",
          },
          sections: [
            {
              heading: {
                uz: "Ko'rgazmalilik va Tizimlilik tamoyili",
                en: "Principles of Visual Demonstration and Systematization",
                ru: "Принципы наглядности и системности",
              },
              body: {
                uz: "Fe'l abstrakt grammatik kategoriya bo'lganligi sababli, boshlang'ich va o'rta sinflarda ko'rgazmali vositalar (jadvallar, harakatli rasmlar, animatsiyalar, morfemik konstruktorlar) hal qiluvchi ahamiyatga ega. Tizimlilik tamoyili esa fe'lni 'so'roqlaridan' boshlab, 'zamon', 'nisbat', 'mayl' va nihoyat 'murakkab qo'shma fe'llar'gacha mantiqiy zinapoya asosida o'rgatishni taqozo etadi.",
                en: "Because verbs encompass abstract grammatical dimensions, visual artifacts (color charts, animations, morpheme blocks) are indispensable in grades 5-7. Systematization demands progression from basic questions to tenses, voices, moods, and complex auxiliary phrases.",
                ru: "Так как глагол абстрактен, в 5-7 классах наглядность (таблицы, алгоритмы, интерактивные схемы) имеет решающее значение. Системность требует постепенного перехода от вопросов к временам, залогам и сложным формам.",
              }
            }
          ],
          takeaways: [
            {
              uz: "Oddiydan murakkabga qarab borish (izchillik) o'quvchida grammatik qo'rquvni bartaraf etadi.",
              en: "Moving systematically from simple to complex dispels student anxiety towards grammar.",
              ru: "Движение от простого к сложному снимает у школьников психологический барьер перед грамматикой.",
            },
            {
              uz: "Ko'rgazmalilik faqat rasm ko'rsatish emas, balki til hodisasini sxematik modellashtirishdir.",
              en: "Visualization means conceptual modeling of linguistic phenomena, not merely decorative pictures.",
              ru: "Наглядность — это не просто картинки, а схемо-моделирование языковых явлений.",
            }
          ]
        }
      }
    ],
    checkQuiz: [
      {
        id: 'm4-q1',
        moduleId: 4,
        type: 'single',
        question: {
          uz: "Fe'l mavzusini o'qitishda 'nutq o'stirish bilan uzviy bog'liqlik' tamoyili amalda qanday namoyon bo'ladi?",
          en: "How is the principle of 'integration with speech development' demonstrated in practice during verb lessons?",
          ru: "Как на практике проявляется принцип 'органической связи с развитием речи' при изучении глагола?",
        },
        options: [
          { id: 'a', text: { uz: "Faqat fe'l qoidasini yoddan aytib berish orqali", en: "Solely by reciting grammar rules by heart", ru: "Исключительно заучиванием формулировок правил" } },
          { id: 'b', text: { uz: "O'rganilgan fe'l shakllarini matn tuzish, dialog va insholarda o'rinli qo'llash orqali", en: "By applying verb forms in essay writing, dialogues, and creative storytelling", ru: "Применением изученных форм глагола в сочинениях, диалогах и устных рассказах" } },
          { id: 'c', text: { uz: "Daftarga ko'p marta bir xil fe'lni ko'chirib yozish orqali", en: "By mechanically copying identical verbs into notebooks", ru: "Многократным механическим переписыванием глаголов" } },
          { id: 'd', text: { uz: "Faqat lug'atdan fe'llarni qidirish orqali", en: "Solely by searching words in dictionaries", ru: "Только поиском глаголов в словаре" } },
        ],
        correctAnswer: 'b',
        explanation: {
          uz: "Nutq o'stirish tamoyili nazariy qoidalarni jonli matn, og'zaki hikoya va amaliy muloqotga olib chiqishni anglatadi.",
          en: "Speech development grounds theoretical grammar in actual communication and textual composition.",
          ru: "Принцип развития речи требует вывода теории в практическую текстовую деятельность.",
        },
        difficulty: 'easy'
      }
    ]
  },
  {
    id: 5,
    number: 5,
    slug: 'felni-orgatish-metod-va-usullari',
    title: {
      uz: "Fe'lni o'rgatish metod va usullari",
      en: "Interactive Teaching Methods and Techniques",
      ru: "Методы и приемы обучения глаголу",
    },
    subtitle: {
      uz: "Klaster, Venn diagrammasi, Insert, Sinkvein, Blits-so'rov, Case-study, AKT va didaktik o'yinlar",
      en: "Cluster, Venn diagram, INSERT, Cinquain, Blitz Q&A, Case study, EdTech tools and pedagogical games",
      ru: "Кластер, Диаграмма Венна, Инсерт, Синквейн, Блиц-опрос, Кейс-стади, ИКТ и дидактические игры",
    },
    icon: "Sparkles",
    color: "from-amber-600 to-orange-600",
    bgColor: "bg-amber-50 dark:bg-amber-950/40 border-amber-200 dark:border-amber-900/60",
    estimatedMinutes: 18,
    recommendedGameId: 'scenario-quest',
    lessons: [
      {
        id: 'm5-l1',
        title: {
          uz: "5.1. An'anaviy va Zamonaviy interfaol metodlar qiyosi",
          en: "5.1. Traditional vs. Modern Interactive Methodologies",
          ru: "5.1. Традиционные и современные интерактивные методы в сравнении",
        },
        readTimeMinutes: 5,
        content: {
          summary: {
            uz: "An'anaviy tushuntirish-ko'rsatish metodi vaqtni tejasa-da, o'quvchini passiv tinglovchiga aylantiradi. Interfaol metodlar (Klaster, Sinkvein, B/B/B) esa o'quvchini tadqiqotchi va faol ijodkorga aylantiradi.",
            en: "While traditional expository methods conserve class time, they render students passive. Interactive methods (Cluster, Cinquain, KWL) transform learners into inquisitive investigators.",
            ru: "Традиционный объяснительно-иллюстративный метод экономит время, но пассивизирует ученика. Интерактивные методы (Кластер, Синквейн, ЗХУ) делают школьника исследователем.",
          },
          sections: [
            {
              heading: {
                uz: "Metodlar katalogi va darsda qo'llash namunalari",
                en: "Method Catalog and Practical Classroom Applications",
                ru: "Каталог методов и примеры фрагментов уроков",
              },
              body: {
                uz: "O'qituvchi har bir metodning maqsadini aniq belgilashi zarur. Masalan: yangi mavzuni tushuntirishda — 'Induktiv kuzatish' va 'Klaster'; mustahkamlashda — 'Venn diagrammasi' va 'Sinkvein'; bilimni tezkor baholashda — 'Blits-so'rov' va 'Aqliy hujum'.",
                en: "Teachers must align methods with lesson stages: Inductive exploration and Clustering for new concepts; Venn diagrams and Cinquains for consolidation; Blitz polls for assessment.",
                ru: "Метод должен соответствовать этапу урока: индуктивный поиск и кластер — при объяснении; диаграмма Венна и синквейн — при закреплении; блиц-опрос — при контроле.",
              },
              table: {
                headers: [
                  { uz: "Metod nomi", en: "Method Name", ru: "Метод" },
                  { uz: "Darsdagi bosqichi", en: "Optimal Stage", ru: "Этап урока" },
                  { uz: "Fe'l mavzusidagi amaliy misol", en: "Verb Lesson Example", ru: "Пример на теме глагола" }
                ],
                rows: [
                  [
                    { uz: "Klaster (Tarmoqlash)", en: "Cluster", ru: "Кластер" },
                    { uz: "Yangi mavzuni ochish", en: "Evocation / Introduction", ru: "Вызов / Изучение" },
                    { uz: "Doskada 'Zamonlar' tushunchasidan 3 ta shoxcha (o'tgan, hozirgi, kelasi) va ularga xos qo'shimchalar yoziladi.", en: "Branching tenses with corresponding suffixes.", ru: "Схема 3 времён со стрелками к суффиксам." }
                  ],
                  [
                    { uz: "Sinkvein (5 qatorli she'r)", en: "Cinquain", ru: "Синквейн" },
                    { uz: "Darsni yakunlash / Xulosa", en: "Reflection / Summary", ru: "Рефлексия / Итог" },
                    { uz: "1. Fe'l. 2. Harakatli, jo'shqin. 3. O'rgatadi, yozadi, yuksaltiradi. 4. Fe'l — gapning harakatlantiruvchi yuragidir. 5. Harakat.", en: "5-line didactic summary poem on verbs.", ru: "Дидактическое 5-стишие о глаголе." }
                  ],
                  [
                    { uz: "Venn diagrammasi", en: "Venn Diagram", ru: "Диаграмма Венна" },
                    { uz: "Mustahkamlash / Taqqoslash", en: "Comparison / Consolidation", ru: "Сравнение / Закрепление" },
                    { uz: "O'zlik va Majhul nisbatni taqqoslash (-in qo'shimchasining 2 xil vazifasi).", en: "Contrasting Reflexive vs Passive voice functions of '-in'.", ru: "Сравнение возвратного и страдательного залогов." }
                  ]
                ]
              }
            }
          ],
          takeaways: [
            {
              uz: "Bir darsda 3 tadan ortiq metodni aralashtirib yuborish o'quvchini charchatadi va dars mazmunini yo'qotadi.",
              en: "Overloading a single 45-minute lesson with more than 3 methods exhausts students and dilutes content.",
              ru: "Перегрузка урока более чем 3 интерактивными методами рассеивает внимание и утомляет класс.",
            },
            {
              uz: "Har bir interaktiv metod aniq grammatik maqsadga yo'naltirilgan bo'lishi kerak.",
              en: "Every interactive exercise must have explicit grammatical purpose, not mere amusement.",
              ru: "Каждый интерактивный прием должен иметь четкую грамматическую дидактическую цель.",
            }
          ]
        }
      }
    ],
    checkQuiz: [
      {
        id: 'm5-q1',
        moduleId: 5,
        type: 'single',
        question: {
          uz: "O'quvchilarda o'zlik va majhul nisbatlarning o'xshash va farqli tomonlarini qiyosiy tahlil qilish uchun eng mos grafik metod qaysi?",
          en: "Which graphic organizer is best suited to analytically contrast similarities and differences between reflexive and passive voices?",
          ru: "Какой графический органайзер лучше всего подходит для сравнительного анализа сходств и различий возвратного и страдательного залогов?",
        },
        options: [
          { id: 'a', text: { uz: "Sinkvein", en: "Cinquain", ru: "Синквейн" } },
          { id: 'b', text: { uz: "Venn diagrammasi", en: "Venn diagram", ru: "Диаграмма Венна" } },
          { id: 'c', text: { uz: "Klaster", en: "Cluster", ru: "Кластер" } },
          { id: 'd', text: { uz: "Qora quti", en: "Black box", ru: "Черный ящик" } },
        ],
        correctAnswer: 'b',
        explanation: {
          uz: "Venn diagrammasi ikki yoki undan ortiq hodisalarning umumiy va o'ziga xos farqli belgilarini kesishuvchi doiralar orqali ko'rgazmali solishtirish vositasidir.",
          en: "A Venn diagram specifically excels at juxtaposing overlapping and contrasting traits.",
          ru: "Диаграмма Венна предназначена для наглядного сопоставления сходств и различий.",
        },
        difficulty: 'easy'
      }
    ]
  },
  {
    id: 6,
    number: 6,
    slug: 'dars-loyihalash-va-tahlil',
    title: {
      uz: "Dars loyihalash va tahlil",
      en: "Lesson Planning and Pedagogical Analysis",
      ru: "Проектирование и анализ урока",
    },
    subtitle: {
      uz: "45 daqiqalik dars bosqichlari, 5–7-sinflar uchun namunaviy dars ishlanmasi va tahlil mezonlari",
      en: "Structure of a 45-minute lesson, sample lesson plans for grades 5–7, and evaluation criteria",
      ru: "Структура 45-минутного урока, типовой план урока для 5–7 классов и критерии анализа",
    },
    icon: "CalendarCheck",
    color: "from-rose-600 to-red-600",
    bgColor: "bg-rose-50 dark:bg-rose-950/40 border-rose-200 dark:border-rose-900/60",
    estimatedMinutes: 15,
    recommendedGameId: 'dars-rejasi-simulator',
    lessons: [
      {
        id: 'm6-l1',
        title: {
          uz: "6.1. Zamonaviy ona tili darsining 5 ta oltin bosqichi",
          en: "6.1. The 5 Golden Stages of a Modern Native Language Lesson",
          ru: "6.1. Пять золотых этапов современного урока родного языка",
        },
        readTimeMinutes: 5,
        content: {
          summary: {
            uz: "Samarali 45 daqiqalik dars quyidagi qat'iy vaqt mezonlariga tayanadi: 1) Tashkiliy va motivatsiya (3-5 daqiqa); 2) O'tilgan mavzuni takrorlash / Yangi mavzuni uyg'otish (5-7 daqiqa); 3) Yangi mavzu bayoni va tadqiqot (15 daqiqa); 4) Mustahkamlash va amaliy mashqlar (12 daqiqa); 5) Baholash, xulosa va uyga vazifa (5 daqiqa).",
            en: "An effective 45-minute lesson follows balanced timing: 1) Organization & hook (3-5 min); 2) Evocation of prior knowledge (5-7 min); 3) Active learning of new topic (15 min); 4) Guided practice (12 min); 5) Assessment & homework (5 min).",
            ru: "Эффективный 45-минутный урок опирается на строгий хронометраж: 1) Оргмомент и мотивация (3-5 мин); 2) Актуализация знаний (5-7 мин); 3) Объяснение нового материала (15 мин); 4) Закрепление и тренинг (12 мин); 5) Итог, оценивание и ДЗ (5 мин).",
          },
          sections: [
            {
              heading: {
                uz: "6-sinf uchun 'Fe'l zamonlari' mavzusida namunaviy dars loyihasi",
                en: "Sample 6th Grade Lesson Outline: 'Verb Tenses'",
                ru: "Типовой конспект урока для 6 класса: 'Времена глагола'",
              },
              body: {
                uz: "Mavzu: O'tgan zamon fe'llari va ularning yasalishi. Maqsad: O'quvchilarda -di va -gan qo'shimchalarining farqini amaliy tushuntirish. Jihozlar: Vaqt chizig'i (Timeline) slaydlari, tarqatma morfemalar, krossvord.",
                en: "Topic: Past Tense Verbs. Objective: Differentiating '-di' (immediate past) from '-gan' (narrative/experiential past). Media: Interactive timeline, handouts.",
                ru: "Тема: Прошедшее время глагола. Цель: Различение суффиксов -di и -gan на практике. Оборудование: Лента времени, карточки.",
              }
            }
          ],
          takeaways: [
            {
              uz: "O'qituvchining gapirish vaqti (TTT - Teacher Talking Time) darsning 40% idan oshmasligi, qolgan 60% o'quvchilar faoliyatiga ajratilishi lozim.",
              en: "Teacher Talking Time (TTT) must not exceed 40%; 60% belongs to active student performance.",
              ru: "Время речи учителя не должно превышать 40%; не менее 60% времени урока должны активно работать ученики.",
            },
            {
              uz: "Uyga vazifa shunchaki 'mashqni ko'chirib kelish' emas, balki ijodiy mini-tadqiqot bo'lishi maqsadga muvofiq.",
              en: "Homework should inspire creative mini-projects rather than mechanical transcription.",
              ru: "Домашнее задание должно носить творческий характер, а не сводиться к механическому переписыванию упражнений.",
            }
          ]
        }
      }
    ],
    checkQuiz: [
      {
        id: 'm6-q1',
        moduleId: 6,
        type: 'single',
        question: {
          uz: "45 daqiqalik namunaviy ona tili darsida yangi mavzu bayoni va o'quvchilar tadqiqoti uchun odatda necha daqiqa ajratilishi me'yor sanaladi?",
          en: "What is the recommended standard time allocation for new topic presentation and exploration in a 45-minute lesson?",
          ru: "Сколько минут рекомендуется отводить на объяснение нового материала и первичное исследование в 45-минутном уроке?",
        },
        options: [
          { id: 'a', text: { uz: "30-35 daqiqa", en: "30-35 minutes", ru: "30-35 минут" } },
          { id: 'b', text: { uz: "12-15 daqiqa", en: "12-15 minutes", ru: "12-15 минут" } },
          { id: 'c', text: { uz: "3-5 daqiqa", en: "3-5 minutes", ru: "3-5 минут" } },
          { id: 'd', text: { uz: "Butun dars davomida", en: "The entire lesson", ru: "Весь урок целиком" } },
        ],
        correctAnswer: 'b',
        explanation: {
          uz: "Pedagogik me'yorga ko'ra, yangi mavzu bayoni 12-15 daqiqadan oshmasligi kerak. Aks holda o'quvchilar diqqati susayadi va mustahkamlashga vaqt yetmaydi.",
          en: "Didactics recommend 12-15 minutes to prevent cognitive fatigue and ensure ample practice time.",
          ru: "По педагогическим нормам объяснение нового занимает 12-15 минут, сохраняя внимание класса.",
        },
        difficulty: 'medium'
      }
    ]
  },
  {
    id: 7,
    number: 7,
    slug: 'oquvchilar-xatolari-va-ularni-bartaraf-etish',
    title: {
      uz: "O'quvchilar xatolari va ularni bartaraf etish",
      en: "Learner Errors and Remediation Strategies",
      ru: "Типичные ошибки учащихся и их предупреждение",
    },
    subtitle: {
      uz: "Imloviy va grammatik xatolar tahlili, diagnostika, korreksiya strategiyalari va baholash rubrikalari",
      en: "Spelling and grammatical error analysis, diagnosis, remediation strategies, and assessment rubrics",
      ru: "Анализ орфографических и грамматических ошибок, диагностика, коррекция и критериальные рубрики",
    },
    icon: "AlertTriangle",
    color: "from-cyan-600 to-blue-700",
    bgColor: "bg-cyan-50 dark:bg-cyan-950/40 border-cyan-200 dark:border-cyan-900/60",
    estimatedMinutes: 14,
    recommendedGameId: 'xatolar-laboratoriyasi',
    lessons: [
      {
        id: 'm7-l1',
        title: {
          uz: "7.1. O'quvchilar tomonidan fe'l mavzusida yo'l qo'yiladigan odatiy xatolar",
          en: "7.1. Common Pupil Misconceptions and Suffix Errors",
          ru: "7.1. Типичные грамматические и орфографические ошибки школьников",
        },
        readTimeMinutes: 5,
        content: {
          summary: {
            uz: "Maktab o'quvchilarida eng ko'p uchraydigan fe'l xatolari: 1) Hozirgi zamon -yapti qo'shimchasini shevaga xos 'votti' yoki '-yapdi' shaklida xato yozish; 2) O'zlik va majhul nisbat ma'nolarini chalkashtirish; 3) -di va -gan zamon farqini his qilmaslik.",
            en: "Frequent pupil errors include dialect interference in present tense spelling (-yapdi / -votti instead of -yapti), conflating reflexive with passive voice, and misusing -di vs -gan.",
            ru: "Частые ошибки: диалектное написание -yapti (как -votti, -yapdi), путаница возвратного и страдательного залогов, смешение оттенков -di и -gan.",
          },
          sections: [
            {
              heading: {
                uz: "Xatolarni bartaraf etishning 4 bosqichli algoritmi",
                en: "4-Stage Error Remediation Algorithm",
                ru: "4-этапный алгоритм коррекции ошибок",
              },
              body: {
                uz: "O'qituvchi xatoni shunchaki qizil qalam bilan to'g'rilab ketmasdan, quyidagi bosqichlarni qo'llashi zarur: 1) IDENTIFIKATSIYA (xatoni o'quvchiga ko'rsatish); 2) DIAGNOSTIKA (sababini aniqlash: imlo qoidasini bilmaslikmi yoki sheva ta'sirimi?); 3) KORREKSIYA (qiyosiy tushuntirish va to'g'ri modelni ko'rsatish); 4) PROFILAKTIKA (shunga o'xshash misollar bilan mustahkamlash).",
                en: "Instead of mere red-pen grading, follow the 4-step pedagogical cycle: 1) Identify the error; 2) Diagnose root cause (dialect interference vs rule unawareness); 3) Remediate with contrastive examples; 4) Prevent through targeted reinforcement drills.",
                ru: "Вместо простого исправления красной ручкой учитель применяет 4 шага: 1) Выявление; 2) Диагностика причины (диалект или незнание правила); 3) Коррекция на сопоставлении; 4) Профилактика в тренажерах.",
              },
              table: {
                headers: [
                  { uz: "Xato yozilishi", en: "Incorrect Spelling", ru: "Ошибочное написание" },
                  { uz: "Adabiy me'yor", en: "Literary Standard", ru: "Литературная норма" },
                  { uz: "Metodik izoh va profilaktika", en: "Methodological Diagnosis", ru: "Причина и коррекция" }
                ],
                rows: [
                  [
                    { uz: "yozvotti, kepdi", en: "yozvotti, kepdi", ru: "yozvotti, kepdi" },
                    { uz: "yozyapti, kelibdi", en: "yozyapti, kelibdi", ru: "yozyapti, kelibdi" },
                    { uz: "Sheva ta'siri (og'zaki nutq interferensiyasi). Morfema tahlili darsi o'tkazish kerak.", en: "Dialect interference. Requires morpheme boundary exercises.", ru: "Влияние диалекта. Необходим морфемный разбор." }
                  ],
                  [
                    { uz: "darsni yozildi", en: "darsni yozildi", ru: "darsni yozildi" },
                    { uz: "dars yozildi", en: "dars yozildi", ru: "dars yozildi" },
                    { uz: "Majhul nisbatda to'ldiruvchi (tushum kelishigi) bosh kelishikdagi egaga aylanadi.", en: "In passive voice, the direct object transforms into the grammatical subject.", ru: "В страдательном залоге винительный падеж переходит в именительный." }
                  ]
                ]
              }
            }
          ],
          takeaways: [
            {
              uz: "Xatolar — bu jazolanishi kerak bo'lgan ayb emas, balki ta'lim ehtiyojlarini ko'rsatuvchi muhim diagnostik ko'rsatkichdir.",
              en: "Learner errors are not offences to punish, but valuable diagnostic indicators revealing instructional needs.",
              ru: "Ошибки учеников — это не повод для наказания, а ценный диагностический маркер зон роста.",
            },
            {
              uz: "O'quvchini o'z xatosini o'zi topib tuzatishga (o'z-o'zini tahrir qilish) o'rgatish eng yuksak metodik mahoratdir.",
              en: "Training pupils to detect and self-correct their own mistakes is the pinnacle of pedagogical mastery.",
              ru: "Научить ученика находить и самостоятельно исправлять свои ошибки — вершина мастерства учителя.",
            }
          ]
        }
      }
    ],
    checkQuiz: [
      {
        id: 'm7-q1',
        moduleId: 7,
        type: 'single',
        question: {
          uz: "O'quvchi insho yozishda 'darsni yozildi' deb yozgan bo'lsa, qanday grammatik xatoga yo'l qo'ygan hisoblanadi?",
          en: "If a pupil writes 'darsni yozildi', what specific grammatical violation did they commit?",
          ru: "Если ученик написал в сочинении 'darsni yozildi', какую именно грамматическую ошибку он допустил?",
        },
        options: [
          { id: 'a', text: { uz: "Majhul nisbatdagi gapda subyektni tushum kelishigida qo'llash xatosi (to'g'risi: dars yozildi)", en: "Retaining direct object accusative case in a passive construction (correct: dars yozildi)", ru: "Употребление винительного падежа при страдательном залоге (верно: dars yozildi)" } },
          { id: 'b', text: { uz: "Faqat imlo xatosi", en: "Purely a typographical spelling mistake", ru: "Обычная орфографическая описка" } },
          { id: 'c', text: { uz: "Kelasi zamon qo'shimchasini xato tanlash", en: "Incorrect choice of future tense", ru: "Ошибочный выбор будущего времени" } },
          { id: 'd', text: { uz: "Fe'l o'zagini noto'g'ri yozish", en: "Misspelling of the verb root", ru: "Неправильное написание корня" } },
        ],
        correctAnswer: 'a',
        explanation: {
          uz: "Majhul nisbatli fe'l qatnashgan gapda harakat obyektiga qaratiladi va u tushum kelishigida emas, bosh kelishikdagi ega bo'lib keladi: 'Dars yozildi'.",
          en: "In passive voice, the target entity functions as the grammatical subject in nominative case.",
          ru: "При сказуемом в страдательном залоге объект становится подлежащим в именительном падеже.",
        },
        difficulty: 'medium'
      }
    ]
  }
];
