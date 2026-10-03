import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { sound } from '../../utils/sound';
import { Trophy, Key, RotateCcw, Check, Sparkles, DoorClosed, DoorOpen, Compass } from 'lucide-react';

interface Gate {
  id: number;
  question: string;
  context: string;
  choices: {
    voice: string;
    isCorrect: boolean;
    explanation: string;
  }[];
}

const mazeGates: Gate[] = [
  {
    id: 1,
    question: "1-darvoza: 'Bog'dagi gullar ertalab sug'orildi' fe'li qaysi kalit bilan ochiladi?",
    context: "Harakatning haqiqiy ijrochisi ko'rsatilmagan, diqqat markazida gullar turibdi.",
    choices: [
      { voice: "Majhul nisbat (-il)", isCorrect: true, explanation: "To'g'ri! Sug'or-il-di fe'lida majhul nisbat qo'llangan." },
      { voice: "O'zlik nisbat (-in)", isCorrect: false, explanation: "Gullar o'zini o'zi sug'ora olmaydi." },
      { voice: "Orttirma nisbat (-dir)", isCorrect: false, explanation: "Boshqaga bajartirish ma'nosi yo'q." },
    ]
  },
  {
    id: 2,
    question: "2-darvoza: 'Bolakay o'yinga tayyorlanib kiyindi' fe'li qaysi nisbat?",
    context: "Kiyimni kiyish harakati bolaning o'ziga yo'nalgan.",
    choices: [
      { voice: "Aniq nisbat", isCorrect: false, explanation: "Aniq nisbat 'kiydi' bo'lardi, bu yerda -in bor." },
      { voice: "O'zlik nisbat (-in)", isCorrect: true, explanation: "Ofarin! Kiydirdi emas, kiyindi — harakat subyektning o'ziga qaytgan." },
      { voice: "Birgalik nisbat (-ish)", isCorrect: false, explanation: "Birgalik qo'shimchasi yo'q." },
    ]
  },
  {
    id: 3,
    question: "3-darvoza: 'Ustoz talabalarga yangi darslikni o'qitdi' fe'li qaysi kalit?",
    context: "Ustoz o'zi o'qimadi, balki talabalarga bajartirdi.",
    choices: [
      { voice: "Orttirma nisbat (-t)", isCorrect: true, explanation: "Ajoyib! O'qi + t -> harakat boshqa shaxsga buyurildi yoki bajartirildi." },
      { voice: "Majhul nisbat", isCorrect: false, explanation: "Bajaruvchi aniq ko'rsatilgan." },
      { voice: "O'zlik nisbat", isCorrect: false, explanation: "O'ziga qaytish ma'nosi yo'q." },
    ]
  },
  {
    id: 4,
    question: "4-darvoza: 'Do'stlar bayramda quchoqlashib ko'rishdilar' fe'li qaysi nisbat?",
    context: "Harakat ikki yoki undan ortiq shaxs tomonidan hamkorlikda bajarildi.",
    choices: [
      { voice: "Birgalik nisbat (-ish)", isCorrect: true, explanation: "Mukammal! Birgalik nisbati bir necha subyektning mushtarak faoliyatini bildiradi." },
      { voice: "Orttirma nisbat", isCorrect: false, explanation: "Birgalikda bajarilmoqda." },
      { voice: "Aniq nisbat", isCorrect: false, explanation: "-ish qo'shimchasi mavjud." },
    ]
  }
];

export const NisbatLabirintiGame: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const { addXp, recordGameScore, triggerConfetti } = useApp();
  const [gateIndex, setGateIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState<{ isCorrect: boolean; text: string } | null>(null);
  const [isCompleted, setIsCompleted] = useState(false);

  const currentGate = mazeGates[gateIndex];

  const handleChooseKey = (choice: { voice: string; isCorrect: boolean; explanation: string }) => {
    if (feedback !== null) return;

    if (choice.isCorrect) {
      sound.playCorrect();
      setScore((prev) => prev + 25);
      setFeedback({ isCorrect: true, text: choice.explanation });
      triggerConfetti();

      setTimeout(() => {
        if (gateIndex + 1 < mazeGates.length) {
          setGateIndex((prev) => prev + 1);
          setFeedback(null);
        } else {
          setIsCompleted(true);
          recordGameScore('nisbat-labirinti', score + 25);
          addXp(50);
          sound.playFanfare();
        }
      }, 1200);
    } else {
      sound.playWrong();
      setFeedback({ isCorrect: false, text: choice.explanation });
      setTimeout(() => setFeedback(null), 2000);
    }
  };

  const handleRestart = () => {
    setGateIndex(0);
    setScore(0);
    setFeedback(null);
    setIsCompleted(false);
    sound.playClick();
  };

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 bg-white dark:bg-slate-900 rounded-3xl shadow-xl border border-slate-200 dark:border-slate-800">
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800 mb-6">
        <div>
          <span className="text-xs uppercase font-extrabold tracking-wider text-teal-600 dark:text-teal-400">
            6-O'yin
          </span>
          <h2 className="text-2xl font-black text-slate-900 dark:text-white">
            Nisbat Labirinti (Voice Maze)
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Grammatik darvozalarni to'g'ri nisbat kalitini tanlash orqali birma-bir ochib, labirintdan chiqing!
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 bg-teal-50 dark:bg-teal-950/60 px-3 py-1.5 rounded-xl text-teal-700 dark:text-teal-300 font-bold text-sm">
            <Trophy className="w-4 h-4" />
            <span>{score} ball</span>
          </div>
        </div>
      </div>

      {!isCompleted ? (
        <div className="space-y-6">
          {/* Maze Progress tracker */}
          <div className="flex items-center justify-between gap-2 px-2">
            {mazeGates.map((gate, idx) => (
              <div key={gate.id} className="flex-1 flex items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs transition-all ${
                    idx < gateIndex
                      ? 'bg-emerald-500 text-white'
                      : idx === gateIndex
                      ? 'bg-teal-600 text-white ring-4 ring-teal-100 dark:ring-teal-950'
                      : 'bg-slate-200 dark:bg-slate-800 text-slate-500'
                  }`}
                >
                  {idx < gateIndex ? <Check className="w-4 h-4" /> : idx + 1}
                </div>
                {idx < mazeGates.length - 1 && (
                  <div
                    className={`flex-1 h-1 mx-1.5 rounded-full ${
                      idx < gateIndex ? 'bg-emerald-500' : 'bg-slate-200 dark:bg-slate-800'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>

          {/* Current Gate Card */}
          <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-tr from-slate-900 via-slate-850 to-indigo-950 text-white shadow-xl text-center relative overflow-hidden">
            <div className="w-16 h-16 mx-auto mb-3 rounded-2xl bg-teal-500/20 text-teal-400 flex items-center justify-center border border-teal-500/30">
              {feedback?.isCorrect ? <DoorOpen className="w-8 h-8 text-emerald-400" /> : <DoorClosed className="w-8 h-8" />}
            </div>
            <h3 className="text-xl sm:text-2xl font-black mb-2 font-mono">
              {currentGate.question}
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-lg mx-auto">
              Kontekst: {currentGate.context}
            </p>
          </div>

          {/* Feedback pill */}
          {feedback && (
            <div
              className={`p-3.5 rounded-xl text-xs font-bold text-center animate-in fade-in duration-200 ${
                feedback.isCorrect
                  ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-200 border border-emerald-300'
                  : 'bg-rose-100 dark:bg-rose-950 text-rose-800 dark:text-rose-200 border border-rose-300'
              }`}
            >
              {feedback.text}
            </div>
          )}

          {/* Choice Keys */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {currentGate.choices.map((choice, idx) => (
              <button
                key={idx}
                onClick={() => handleChooseKey(choice)}
                className="group p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 hover:bg-teal-50 dark:hover:bg-teal-950/40 border-2 border-slate-200 dark:border-slate-700 hover:border-teal-400 text-left transition-all active:scale-98 cursor-pointer"
              >
                <div className="flex items-center gap-2 mb-1.5 text-teal-600 dark:text-teal-400 font-bold text-xs">
                  <Key className="w-4 h-4 group-hover:rotate-45 transition-transform" />
                  <span>Kalit #{idx + 1}</span>
                </div>
                <p className="font-extrabold text-sm text-slate-900 dark:text-white">
                  {choice.voice}
                </p>
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="text-center py-10 space-y-4">
          <div className="w-20 h-20 mx-auto rounded-3xl bg-teal-100 dark:bg-teal-950 flex items-center justify-center text-teal-600">
            <Compass className="w-12 h-12" />
          </div>
          <h3 className="text-2xl font-black text-slate-900 dark:text-white">
            Labirint muvaffaqiyatli zabt etildi!
          </h3>
          <p className="text-sm text-slate-600 dark:text-slate-400 max-w-md mx-auto">
            Siz barcha 5 ta nisbat darvozasini to'g'ri grammatik kalit bilan ochib chiqdingiz.
          </p>
          <div className="flex items-center justify-center gap-3 pt-4">
            <button
              onClick={handleRestart}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-sm shadow-lg shadow-teal-600/25"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Qayta o'ynash</span>
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
