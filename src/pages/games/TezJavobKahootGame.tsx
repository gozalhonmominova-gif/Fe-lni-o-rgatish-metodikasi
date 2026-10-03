import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { sound } from '../../utils/sound';
import { Trophy, Clock, Zap, RotateCcw, Flame, CheckCircle, XCircle } from 'lucide-react';

interface BlitzQuestion {
  question: string;
  options: string[];
  correct: number;
}

const blitzQuestions: BlitzQuestion[] = [
  {
    question: "O'zbek tilida nechta fe'l nisbati mavjud?",
    options: ["3 ta", "4 ta", "5 ta", "6 ta"],
    correct: 2
  },
  {
    question: "'yozildi' fe'li qaysi nisbatda?",
    options: ["Aniq", "Majhul", "O'zlik", "Orttirma"],
    correct: 1
  },
  {
    question: "'kulib yubordi' fe'lidagi 'yubordi' qanday fe'l?",
    options: ["Mustaqil fe'l", "Ko'makchi fe'l", "To'liqsiz fe'l", "Sifatdosh"],
    correct: 1
  },
  {
    question: "Hozirgi zamon davom fe'li qo'shimchasi qaysi?",
    options: ["-di", "-yapti", "-gan", "-ajak"],
    correct: 1
  },
  {
    question: "Tushunchalarni shoxlantirib o'rganish metodi qaysi?",
    options: ["Klaster", "Sinkvein", "Venn", "Insert"],
    correct: 0
  },
  {
    question: "5 qatordan iborat didaktik qisqa she'r shakli nima?",
    options: ["Ruboiy", "Sinkvein", "G'azal", "Tuyoq"],
    correct: 1
  },
  {
    question: "Darsda o'qituvchi gapirish vaqti (TTT) necha foizdan oshmasligi kerak?",
    options: ["20%", "40%", "70%", "90%"],
    correct: 1
  },
  {
    question: "'keldilar' so'zida -lar nimani bildiradi?",
    options: ["Ko'plik / Hurmat", "Zamon", "Nisbat", "Mayl"],
    correct: 0
  },
  {
    question: "'o'qigan' so'zi qaysi so'z turkumi vazifasida keladi?",
    options: ["Ravish", "Sifatdosh (aniqlovchi)", "Ot", "Son"],
    correct: 1
  },
  {
    question: "O'quvchi xatosini bartaraf etishning birinchi bosqichi nima?",
    options: ["Jazolash", "Identifikatsiya (aniqlash)", "Baho qo'yish", "E'tiborsiz qoldirish"],
    correct: 1
  }
];

export const TezJavobKahootGame: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const { addXp, recordGameScore, triggerConfetti } = useApp();
  const [qIdx, setQIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [timeLeft, setTimeLeft] = useState(10);
  const [answered, setAnswered] = useState<number | null>(null);
  const [isGameOver, setIsGameOver] = useState(false);

  const currentQ = blitzQuestions[qIdx];

  useEffect(() => {
    if (isGameOver || answered !== null) return;
    if (timeLeft <= 0) {
      handleTimeout();
      return;
    }
    const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft, isGameOver, answered]);

  const handleTimeout = () => {
    sound.playWrong();
    setStreak(0);
    setAnswered(-1); // timeout
    setTimeout(nextQuestion, 1200);
  };

  const handleChoose = (idx: number) => {
    if (answered !== null) return;
    setAnswered(idx);

    const isCorrect = idx === currentQ.correct;
    if (isCorrect) {
      sound.playCorrect();
      const points = 50 + timeLeft * 5 + streak * 10;
      setScore((prev) => prev + points);
      setStreak((prev) => prev + 1);
    } else {
      sound.playWrong();
      setStreak(0);
    }

    setTimeout(nextQuestion, 1200);
  };

  const nextQuestion = () => {
    if (qIdx + 1 < blitzQuestions.length) {
      setQIdx((prev) => prev + 1);
      setTimeLeft(10);
      setAnswered(null);
    } else {
      setIsGameOver(true);
      recordGameScore('tez-javob', score);
      addXp(Math.round(score * 0.15));
      sound.playFanfare();
      triggerConfetti();
    }
  };

  const handleRestart = () => {
    setQIdx(0);
    setScore(0);
    setStreak(0);
    setTimeLeft(10);
    setAnswered(null);
    setIsGameOver(false);
    sound.playClick();
  };

  const colorClasses = [
    "bg-red-500 hover:bg-red-600 text-white",
    "bg-blue-500 hover:bg-blue-600 text-white",
    "bg-amber-500 hover:bg-amber-600 text-white",
    "bg-emerald-500 hover:bg-emerald-600 text-white",
  ];

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 bg-white dark:bg-slate-900 rounded-3xl shadow-xl border border-slate-200 dark:border-slate-800">
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800 mb-6">
        <div>
          <span className="text-xs uppercase font-extrabold tracking-wider text-purple-600 dark:text-purple-400">
            10-O'yin
          </span>
          <h2 className="text-2xl font-black text-slate-900 dark:text-white">
            Tez Javob (Kahoot Blitz)
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            10 ta tezkor savol! Qanchalik tez topsangiz, shunchalik ko'p ball va streak olasiz.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 bg-amber-50 dark:bg-amber-950/60 px-3 py-1.5 rounded-xl text-amber-700 dark:text-amber-300 font-bold text-xs">
            <Flame className="w-4 h-4 fill-amber-500" />
            <span>Streak: {streak}x</span>
          </div>
          <div className="flex items-center gap-1.5 bg-purple-50 dark:bg-purple-950/60 px-3 py-1.5 rounded-xl text-purple-700 dark:text-purple-300 font-bold text-sm">
            <Trophy className="w-4 h-4" />
            <span>{score} ball</span>
          </div>
        </div>
      </div>

      {!isGameOver ? (
        <div className="space-y-6">
          {/* Header timer & counter */}
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400">
              Savol #{qIdx + 1} / {blitzQuestions.length}
            </span>
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 font-mono font-bold text-sm">
              <Clock className="w-4 h-4 text-purple-600" />
              <span className={timeLeft <= 3 ? 'text-rose-600 animate-ping' : ''}>
                {timeLeft}s
              </span>
            </div>
          </div>

          {/* Question Box */}
          <div className="p-8 rounded-3xl bg-slate-900 text-white text-center shadow-xl">
            <h3 className="text-xl sm:text-2xl font-extrabold leading-snug">
              {currentQ.question}
            </h3>
          </div>

          {/* 4 Answer Panels (Kahoot style) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            {currentQ.options.map((opt, idx) => {
              const isSelected = answered === idx;
              const isCorrect = idx === currentQ.correct;

              let style = colorClasses[idx % colorClasses.length];
              if (answered !== null) {
                if (isCorrect) {
                  style = "bg-emerald-600 text-white ring-4 ring-emerald-300 animate-pulse";
                } else if (isSelected) {
                  style = "bg-rose-700 text-white opacity-90";
                } else {
                  style = "bg-slate-300 dark:bg-slate-800 text-slate-500 opacity-40";
                }
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleChoose(idx)}
                  disabled={answered !== null}
                  className={`p-6 rounded-2xl font-bold text-base sm:text-lg flex items-center justify-center text-center shadow-md transition-all active:scale-98 cursor-pointer ${style}`}
                >
                  <span>{opt}</span>
                </button>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="text-center py-10 space-y-4">
          <div className="w-20 h-20 mx-auto rounded-3xl bg-purple-100 dark:bg-purple-950 flex items-center justify-center text-purple-600">
            <Zap className="w-12 h-12" />
          </div>
          <h3 className="text-2xl font-black text-slate-900 dark:text-white">
            Tezkor viktorina yakunlandi!
          </h3>
          <p className="text-sm text-slate-600 dark:text-slate-400 max-w-md mx-auto">
            Tezkor reaksiyangiz va metodik bilimingiz yuqori darajada ekanini ko'rsatdingiz.
          </p>
          <div className="inline-block p-4 rounded-2xl bg-purple-50 dark:bg-purple-950/60 border border-purple-200 dark:border-purple-900">
            <p className="text-xs text-purple-700 dark:text-purple-300 font-medium">To'plangan natija:</p>
            <p className="text-4xl font-black text-purple-600 dark:text-purple-400 font-mono">
              {score} ball
            </p>
          </div>
          <div className="flex items-center justify-center gap-3 pt-4">
            <button
              onClick={handleRestart}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-sm shadow-lg shadow-purple-600/25"
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
