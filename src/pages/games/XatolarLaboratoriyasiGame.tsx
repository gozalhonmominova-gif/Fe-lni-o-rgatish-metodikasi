import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { sound } from '../../utils/sound';
import { Trophy, CheckCircle, RotateCcw, Stethoscope, AlertCircle, ArrowRight } from 'lucide-react';

interface ErrorSnippet {
  id: number;
  studentName: string;
  grade: string;
  originalText: string;
  errorWord: string;
  correctWord: string;
  causeOptions: {
    text: string;
    isCorrect: boolean;
  }[];
  strategyOptions: {
    text: string;
    isCorrect: boolean;
  }[];
}

const errorLabItems: ErrorSnippet[] = [
  {
    id: 1,
    studentName: "Javohir",
    grade: "5-sinf",
    originalText: "Men kecha kechqurun do'stim bilan qiziqarli darslikni [o'qiyapman] .",
    errorWord: "o'qiyapman",
    correctWord: "o'qidim / o'qiyotgan edim",
    causeOptions: [
      { text: "O'tgan zamon payt holi (kecha) bilan hozirgi zamon fe'lini noto'g'ri moslashtirish", isCorrect: true },
      { text: "Faqat husnixat xatosi", isCorrect: false },
      { text: "Egalik qo'shimchasini bilmaslik", isCorrect: false }
    ],
    strategyOptions: [
      { text: "Zamonlar muvofiqligi jadvali tuzib, payt holi va fe'l zamonini o'zaro bog'lab mashq bajartirish", isCorrect: true },
      { text: "O'quvchini doskaga chiqarib izza qilish", isCorrect: false },
      { text: "Xatoni e'tiborsiz qoldirish", isCorrect: false }
    ]
  },
  {
    id: 2,
    studentName: "Madina",
    grade: "6-sinf",
    originalText: "Sinfdoshlarimiz yangi kitoblarni kutubxonadan [tarqatildi] .",
    errorWord: "tarqatildi",
    correctWord: "tarqatdilar (aniq nisbat)",
    causeOptions: [
      { text: "Bajaruvchi subyekt (sinfdoshlarimiz) mavjud bo'lgani holda, majhul nisbat qo'shimchasini (-il) xato qo'llash", isCorrect: true },
      { text: "Imlo qoidasini unutish", isCorrect: false },
      { text: "Lug'at yetishmasligi", isCorrect: false }
    ],
    strategyOptions: [
      { text: "Aniq va majhul nisbatli gaplarni 'Ega + Harakat' zanjiri orqali modellashtirib ko'rsatish", isCorrect: true },
      { text: "Besh marta lug'at yodlatish", isCorrect: false },
      { text: "Uyga vazifani 2 barobar ko'paytirish", isCorrect: false }
    ]
  },
  {
    id: 3,
    studentName: "Bekzod",
    grade: "5-sinf",
    originalText: "Hozir biz darsda yangi qoidalarni [yozvommiz] .",
    errorWord: "yozvommiz",
    correctWord: "yozyapmiz",
    causeOptions: [
      { text: "Og'zaki sheva talaffuzini adabiy yozma nutqqa ko'chirish interferensiyasi", isCorrect: true },
      { text: "Morfema yetishmasligi", isCorrect: false },
      { text: "Noto'g'ri tinish belgisi", isCorrect: false }
    ],
    strategyOptions: [
      { text: "Adabiy me'yor (-yapdi emas, -yapti / -yotir) jadvali orqali og'zaki va yozma nutq chegarasini amaliy tushuntirish", isCorrect: true },
      { text: "Faqat '2' baho qo'yish", isCorrect: false }
    ]
  }
];

export const XatolarLaboratoriyasiGame: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const { addXp, recordGameScore, triggerConfetti } = useApp();
  const [itemIdx, setItemIdx] = useState(0);
  const [selectedCause, setSelectedCause] = useState<number | null>(null);
  const [selectedStrategy, setSelectedStrategy] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [step, setStep] = useState<'diagnose' | 'strategy' | 'solved'>('diagnose');
  const [isCompleted, setIsCompleted] = useState(false);

  const current = errorLabItems[itemIdx];

  const handleSelectCause = (idx: number) => {
    setSelectedCause(idx);
    if (current.causeOptions[idx].isCorrect) {
      sound.playCorrect();
      setScore((prev) => prev + 15);
      setStep('strategy');
    } else {
      sound.playWrong();
    }
  };

  const handleSelectStrategy = (idx: number) => {
    setSelectedStrategy(idx);
    if (current.strategyOptions[idx].isCorrect) {
      sound.playCorrect();
      setScore((prev) => prev + 20);
      setStep('solved');
      triggerConfetti();
    } else {
      sound.playWrong();
    }
  };

  const handleNext = () => {
    if (itemIdx + 1 < errorLabItems.length) {
      setItemIdx((prev) => prev + 1);
      setSelectedCause(null);
      setSelectedStrategy(null);
      setStep('diagnose');
      sound.playClick();
    } else {
      setIsCompleted(true);
      recordGameScore('xatolar-laboratoriyasi', score);
      addXp(60);
      sound.playFanfare();
    }
  };

  const handleRestart = () => {
    setItemIdx(0);
    setSelectedCause(null);
    setSelectedStrategy(null);
    setStep('diagnose');
    setScore(0);
    setIsCompleted(false);
    sound.playClick();
  };

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 bg-white dark:bg-slate-900 rounded-3xl shadow-xl border border-slate-200 dark:border-slate-800">
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800 mb-6">
        <div>
          <span className="text-xs uppercase font-extrabold tracking-wider text-cyan-600 dark:text-cyan-400">
            7-O'yin
          </span>
          <h2 className="text-2xl font-black text-slate-900 dark:text-white">
            Xatolar Laboratoriyasi (Error Lab)
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            O'quvchi daftari tahlili: grammatik xatoni aniqlang, sababini tashxis qiling va pedagogik tuzatish strategiyasini belgilang!
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 bg-cyan-50 dark:bg-cyan-950/60 px-3 py-1.5 rounded-xl text-cyan-700 dark:text-cyan-300 font-bold text-sm">
            <Trophy className="w-4 h-4" />
            <span>{score} ball</span>
          </div>
        </div>
      </div>

      {!isCompleted ? (
        <div className="space-y-6">
          {/* Student Notebook Presentation */}
          <div className="p-6 rounded-2xl bg-amber-50/50 dark:bg-slate-800/80 border-2 border-amber-200 dark:border-slate-700 relative font-serif shadow-xs">
            <div className="flex items-center justify-between border-b border-amber-200/60 dark:border-slate-700 pb-2 mb-3">
              <span className="text-xs font-sans font-bold text-slate-500 dark:text-slate-400">
                O'quvchi: {current.studentName} ({current.grade})
              </span>
              <span className="text-xs font-sans font-extrabold text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950 px-2 py-0.5 rounded-md">
                Xato aniqlangan matn
              </span>
            </div>
            <p className="text-base sm:text-lg text-slate-900 dark:text-slate-100 leading-relaxed">
              {current.originalText}
            </p>
            <div className="mt-3 text-xs font-sans font-medium text-slate-500">
              Qizil bilan belgilangan so'z: <span className="text-rose-600 font-bold line-through">{current.errorWord}</span> → To'g'risi: <span className="text-emerald-600 font-bold">{current.correctWord}</span>
            </div>
          </div>

          {/* Step 1: Diagnose Root Cause */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-cyan-600 text-white font-bold text-xs flex items-center justify-center">
                1
              </span>
              <h4 className="font-extrabold text-sm text-slate-900 dark:text-white">
                Tashxis: Ushbu xatoning tub kelib chiqish sababi nima?
              </h4>
            </div>

            <div className="space-y-2">
              {current.causeOptions.map((opt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSelectCause(idx)}
                  disabled={step !== 'diagnose'}
                  className={`w-full p-3.5 rounded-xl border text-left text-xs sm:text-sm font-medium transition-all ${
                    selectedCause === idx
                      ? opt.isCorrect
                        ? 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-500 text-emerald-900 dark:text-emerald-100 font-bold'
                        : 'bg-rose-50 dark:bg-rose-950/60 border-rose-500 text-rose-900 dark:text-rose-100 font-bold'
                      : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-cyan-400'
                  }`}
                >
                  {opt.text}
                </button>
              ))}
            </div>
          </div>

          {/* Step 2: Pedagogical Strategy */}
          {step !== 'diagnose' && (
            <div className="space-y-3 animate-in fade-in duration-300">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-emerald-600 text-white font-bold text-xs flex items-center justify-center">
                  2
                </span>
                <h4 className="font-extrabold text-sm text-slate-900 dark:text-white">
                  Korreksiya: O'qituvchi sifatida qanday pedagogik strategiyani qo'llaysiz?
                </h4>
              </div>

              <div className="space-y-2">
                {current.strategyOptions.map((strat, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSelectStrategy(idx)}
                    disabled={step === 'solved'}
                    className={`w-full p-3.5 rounded-xl border text-left text-xs sm:text-sm font-medium transition-all ${
                      selectedStrategy === idx
                        ? strat.isCorrect
                          ? 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-500 text-emerald-900 dark:text-emerald-100 font-bold'
                          : 'bg-rose-50 dark:bg-rose-950/60 border-rose-500 text-rose-900 dark:text-rose-100 font-bold'
                        : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-emerald-400'
                    }`}
                  >
                    {strat.text}
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 'solved' && (
            <div className="flex justify-end pt-2">
              <button
                onClick={handleNext}
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-cyan-600 hover:bg-cyan-700 text-white font-bold text-sm shadow-lg shadow-cyan-600/25 transition-all"
              >
                <span>{itemIdx + 1 < errorLabItems.length ? "Keyingi o'quvchi ishi" : "Natijalarni ko'rish"}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="text-center py-10 space-y-4">
          <div className="w-20 h-20 mx-auto rounded-3xl bg-cyan-100 dark:bg-cyan-950 flex items-center justify-center text-cyan-600">
            <Stethoscope className="w-12 h-12" />
          </div>
          <h3 className="text-2xl font-black text-slate-900 dark:text-white">
            Tashxis va korreksiya muvaffaqiyatli yakunlandi!
          </h3>
          <p className="text-sm text-slate-600 dark:text-slate-400 max-w-md mx-auto">
            Siz nafaqat xatoni ko'rdingiz, balki o'quvchining nutqiy kamchiligini ijobiy yo'l bilan bartaraf etish metodikasini topdingiz.
          </p>
          <div className="flex items-center justify-center gap-3 pt-4">
            <button
              onClick={handleRestart}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-700 text-white font-bold text-sm shadow-lg shadow-cyan-600/25"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Qayta laboratoriya</span>
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
