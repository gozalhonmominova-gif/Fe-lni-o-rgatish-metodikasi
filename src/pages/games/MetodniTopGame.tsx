import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { sound } from '../../utils/sound';
import { Trophy, CheckCircle, RotateCcw, AlertTriangle, ArrowRight, ShieldCheck } from 'lucide-react';

interface Scenario {
  id: number;
  grade: string;
  context: string;
  problem: string;
  options: {
    text: string;
    isOptimal: boolean;
    consequence: string;
    reputationChange: number;
  }[];
}

const scenarios: Scenario[] = [
  {
    id: 1,
    grade: "5-sinf",
    context: "Siz 'Fe'lning bo'lishli va bo'lishsiz shakllari' mavzusini boshladingiz.",
    problem: "O'quvchilar -ma qo'shimchasi qayerga qo'shilishini va fe'lning qat'iy ma'nosini inkorga aylantirishini chalkashtirib, passiv o'tiribdi.",
    options: [
      {
        text: "Pantomima va 'Aksini ayt' didaktik o'yini: Bir o'quvchi harakat qiladi, ikkinchisi esa -ma bilan 'qilma' shaklini quvnoq ohangda aytadi.",
        isOptimal: true,
        consequence: "O'quvchilar qiziqib ketdi! Sinfda quvnoq muhit hosil bo'ldi, harakat va uning inkori jismoniy his qilindi.",
        reputationChange: 15
      },
      {
        text: "Daftariga qoidani 5 marta ko'chirtirib, shovqin qilmaslikni qat'iy buyurish.",
        isOptimal: false,
        consequence: "Sinf jim bo'ldi, lekin o'quvchilarning ko'zida qo'rquv paydo bo'ldi. Mavzu mohiyati tushunilmadi.",
        reputationChange: -10
      },
      {
        text: "Faqat o'qituvchi 30 daqiqa doskada monolog tarzida tushuntirib berishi.",
        isOptimal: false,
        consequence: "O'quvchilar 10 daqiqadan so'ng chalg'iy boshladi va esnab qoldi.",
        reputationChange: -5
      }
    ]
  },
  {
    id: 2,
    grade: "6-sinf",
    context: "Mavzu: 'Fe'l nisbatlari: O'zlik va Majhul nisbatni farqlash'.",
    problem: "O'quvchilar '-in' qo'shimchasi qachon o'zlik (yuvindi), qachon majhul (yozildi) bo'lishini tushunmay qiynalmoqda.",
    options: [
      {
        text: "Venn diagrammasi va 'Bajaruvchi qidiruvi' usuli: Harakat kimning ustida bajarilayotganini ko'rgazmali solishtirish.",
        isOptimal: true,
        consequence: "O'quvchilar 'yuvindi'da harakat odamning o'ziga qaytishini, 'yozildi'da esa xat o'z-o'zidan yozilmasligini yaqqol ko'rdi!",
        reputationChange: 20
      },
      {
        text: "Ikkala nisbatni bir kunda o'tmasdan, darsni bekor qilish.",
        isOptimal: false,
        consequence: "Dars rejasi buzildi, o'quvchilar mavzuni o'zlashtirmasdan qoldi.",
        reputationChange: -15
      },
      {
        text: "Faqat 2 ta misol keltirib, qolganini uyda mustaqil tushunishga qoldirish.",
        isOptimal: false,
        consequence: "Ertasi kuni o'quvchilarning 80% uyga vazifani xato bajardi.",
        reputationChange: -10
      }
    ]
  },
  {
    id: 3,
    grade: "7-sinf",
    context: "Mavzu: 'Sifatdosh va Ravishdosh shakllari'. Darsning mustahkamlash bosqichi.",
    problem: "O'quvchilar sifatdoshning gapdagi aniqlovchi, ravishdoshning esa hol bo'lib kelishini eslab qolishda qiynalmoqda.",
    options: [
      {
        text: "'Sinkvein' va 'Matn muharriri' metodi: Matndan sifatdosh va ravishdoshlarni qidirib topib, rolli ijodiy mini-she'r tuzish.",
        isOptimal: true,
        consequence: "Talabalar o'z fikrlarini go'zal jumlalarga aylantirib, sintaktik farqlarni mukammal amalda sinadi!",
        reputationChange: 20
      },
      {
        text: "Darslikdagi 150-mashqni jim o'tirib ko'chirish.",
        isOptimal: false,
        consequence: "Mexanik ko'chirish bo'ldi, nutqiy kompetensiya o'smadi.",
        reputationChange: -5
      }
    ]
  }
];

export const MetodniTopGame: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const { addXp, recordGameScore, triggerConfetti } = useApp();
  const [scenarioIdx, setScenarioIdx] = useState(0);
  const [reputation, setReputation] = useState(70); // starts at 70%
  const [chosenOption, setChosenOption] = useState<number | null>(null);
  const [isCompleted, setIsCompleted] = useState(false);

  const current = scenarios[scenarioIdx];

  const handleSelectOption = (index: number) => {
    if (chosenOption !== null) return;
    setChosenOption(index);
    const opt = current.options[index];

    const newReputation = Math.max(0, Math.min(100, reputation + opt.reputationChange));
    setReputation(newReputation);

    if (opt.isOptimal) {
      sound.playCorrect();
      triggerConfetti();
    } else {
      sound.playWrong();
    }
  };

  const handleNext = () => {
    if (scenarioIdx + 1 < scenarios.length) {
      setScenarioIdx((prev) => prev + 1);
      setChosenOption(null);
      sound.playClick();
    } else {
      setIsCompleted(true);
      recordGameScore('metodni-top', reputation);
      addXp(Math.round(reputation * 0.7));
      sound.playFanfare();
    }
  };

  const handleRestart = () => {
    setScenarioIdx(0);
    setReputation(70);
    setChosenOption(null);
    setIsCompleted(false);
    sound.playClick();
  };

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 bg-white dark:bg-slate-900 rounded-3xl shadow-xl border border-slate-200 dark:border-slate-800">
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800 mb-6">
        <div>
          <span className="text-xs uppercase font-extrabold tracking-wider text-amber-600 dark:text-amber-400">
            5-O'yin
          </span>
          <h2 className="text-2xl font-black text-slate-900 dark:text-white">
            Metodni Top (Scenario Quest)
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Haqiqiy sinf pedagogik vaziyatlarida eng samarali interfaol metodni tanlab, o'qituvchilik nufuzingizni oshiring!
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-amber-50 dark:bg-amber-950/60 px-3 py-1.5 rounded-xl border border-amber-200 dark:border-amber-900 text-xs font-bold text-amber-800 dark:text-amber-300">
            <ShieldCheck className="w-4 h-4 text-amber-500" />
            <span>O'qituvchi obro'si: {reputation}%</span>
          </div>
        </div>
      </div>

      {!isCompleted ? (
        <div className="space-y-6">
          {/* Situation Box */}
          <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700">
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-extrabold bg-indigo-100 text-indigo-800 dark:bg-indigo-950 dark:text-indigo-300">
                {current.grade}
              </span>
              <span className="text-xs text-slate-400 font-semibold">
                Vaziyat #{scenarioIdx + 1} / {scenarios.length}
              </span>
            </div>
            <p className="text-sm font-semibold text-slate-800 dark:text-slate-200 mb-2">
              {current.context}
            </p>
            <div className="p-3.5 rounded-xl bg-amber-50/80 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900 text-xs font-medium text-amber-900 dark:text-amber-200 flex items-start gap-2">
              <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5 text-amber-600" />
              <span>Sinfdagi muammo: {current.problem}</span>
            </div>
          </div>

          {/* Decision Choices */}
          <div className="space-y-3">
            <span className="text-xs font-extrabold uppercase tracking-wider text-slate-400">
              Qanday metodik qaror qabul qilasiz?
            </span>
            {current.options.map((option, idx) => {
              const isSelected = chosenOption === idx;
              let style = 'bg-white dark:bg-slate-800/80 border-slate-200 dark:border-slate-700 hover:border-indigo-400';
              if (chosenOption !== null) {
                if (isSelected) {
                  style = option.isOptimal
                    ? 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-500 ring-2 ring-emerald-400'
                    : 'bg-rose-50 dark:bg-rose-950/60 border-rose-500 ring-2 ring-rose-400';
                } else if (option.isOptimal) {
                  style = 'bg-emerald-50/50 dark:bg-emerald-950/30 border-emerald-300 opacity-80';
                } else {
                  style = 'opacity-40';
                }
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(idx)}
                  disabled={chosenOption !== null}
                  className={`w-full p-4 rounded-2xl border-2 text-left transition-all ${style}`}
                >
                  <p className="text-sm font-semibold text-slate-900 dark:text-white leading-relaxed">
                    {option.text}
                  </p>
                  {isSelected && (
                    <div className="mt-3 pt-3 border-t border-slate-200 dark:border-slate-700 text-xs font-medium">
                      <span className={option.isOptimal ? 'text-emerald-700 dark:text-emerald-300' : 'text-rose-700 dark:text-rose-300'}>
                        Natija: {option.consequence}
                      </span>
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          {chosenOption !== null && (
            <div className="flex justify-end pt-2">
              <button
                onClick={handleNext}
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-lg shadow-indigo-600/25 transition-all"
              >
                <span>{scenarioIdx + 1 < scenarios.length ? "Keyingi vaziyat" : "Natijani ko'rish"}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="text-center py-10 space-y-4">
          <div className="w-20 h-20 mx-auto rounded-3xl bg-amber-100 dark:bg-amber-950 flex items-center justify-center text-amber-600">
            <Trophy className="w-12 h-12" />
          </div>
          <h3 className="text-2xl font-black text-slate-900 dark:text-white">
            Pedagogik ssenariy yakunlandi!
          </h3>
          <p className="text-sm text-slate-600 dark:text-slate-400 max-w-md mx-auto">
            Sizning pedagogik qarorlaringiz o'quvchilarning darsdagi faolligi va ona tili o'zlashtirishiga bevosita ta'sir ko'rsatdi.
          </p>
          <div className="inline-block p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-900">
            <p className="text-xs text-amber-700 dark:text-amber-300 font-medium">Yakuniy o'qituvchilik nufuzi:</p>
            <p className="text-4xl font-black text-amber-600 dark:text-amber-400 font-mono">
              {reputation}%
            </p>
          </div>
          <div className="flex items-center justify-center gap-3 pt-4">
            <button
              onClick={handleRestart}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-sm shadow-lg shadow-amber-600/25"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Qayta boshlash</span>
            </button>
            <button
              onClick={onBack}
              className="px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold text-sm"
            >
              Chiqish
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
