import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { sound } from '../../utils/sound';
import { Clock, Trophy, Flame, RotateCcw, ArrowRight } from 'lucide-react';

interface VerbItem {
  word: string;
  tense: 'otgan' | 'hozirgi' | 'kelasi';
  hint: string;
}

const verbList: VerbItem[] = [
  { word: "yozdi", tense: "otgan", hint: "-di yaqin o'tgan zamon" },
  { word: "o'qiyapti", tense: "hozirgi", hint: "-yapti hozirgi zamon davom fe'li" },
  { word: "boradi", tense: "kelasi", hint: "-a/-y kelasi zamon gumon shakli" },
  { word: "kelgan", tense: "otgan", hint: "-gan o'tgan zamon sifatdosh/kesimlik" },
  { word: "ishlamoqda", tense: "hozirgi", hint: "-moqda rasmiy hozirgi zamon" },
  { word: "aytmoqchi", tense: "kelasi", hint: "-moqchi maqsad kelasi zamon" },
  { word: "kulib yubordi", tense: "otgan", hint: "yubordi o'tgan zamon to'satdan" },
  { word: "gapiryapti", tense: "hozirgi", hint: "-yapti nutq so'zlanayotgan paytda" },
  { word: "uchrashajak", tense: "kelasi", hint: "-ajak tantanali kelasi zamon" },
  { word: "angladi", tense: "otgan", hint: "-di o'tgan zamon" },
  { word: "kutmoqda", tense: "hozirgi", hint: "-moqda davomli hozirgi zamon" },
  { word: "yodlaydi", tense: "kelasi", hint: "-aydi kelasi zamon" },
];

export const ZamonPoygasiGame: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const { addXp, recordGameScore, triggerConfetti } = useApp();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [combo, setCombo] = useState(0);
  const [maxCombo, setMaxCombo] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [isGameOver, setIsGameOver] = useState(false);
  const [lastFeedback, setLastFeedback] = useState<{ isCorrect: boolean; text: string } | null>(null);

  useEffect(() => {
    if (isGameOver) return;
    if (timeLeft <= 0) {
      endGame();
      return;
    }
    const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft, isGameOver]);

  const currentVerb = verbList[currentIndex % verbList.length];

  const handleLaneSelect = (selectedTense: 'otgan' | 'hozirgi' | 'kelasi') => {
    if (isGameOver) return;

    if (selectedTense === currentVerb.tense) {
      sound.playCorrect();
      const newCombo = combo + 1;
      setCombo(newCombo);
      if (newCombo > maxCombo) setMaxCombo(newCombo);
      const points = 10 + newCombo * 2;
      setScore((prev) => prev + points);
      setLastFeedback({ isCorrect: true, text: `To'g'ri! ${currentVerb.hint}` });
    } else {
      sound.playWrong();
      setCombo(0);
      setLastFeedback({
        isCorrect: false,
        text: `Xato! ${currentVerb.word} — ${
          currentVerb.tense === 'otgan'
            ? "O'tgan zamon"
            : currentVerb.tense === 'hozirgi'
            ? "Hozirgi zamon"
            : "Kelasi zamon"
        } fe'li edi.`
      });
    }

    if (currentIndex + 1 >= verbList.length * 2) {
      endGame();
    } else {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const endGame = () => {
    setIsGameOver(true);
    recordGameScore('zamon-poygasi', score);
    addXp(Math.round(score * 0.4));
    sound.playFanfare();
    triggerConfetti();
  };

  const restartGame = () => {
    setCurrentIndex(0);
    setScore(0);
    setCombo(0);
    setTimeLeft(30);
    setIsGameOver(false);
    setLastFeedback(null);
    sound.playClick();
  };

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 bg-white dark:bg-slate-900 rounded-3xl shadow-xl border border-slate-200 dark:border-slate-800">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800 mb-6">
        <div>
          <span className="text-xs uppercase font-extrabold tracking-wider text-teal-600 dark:text-teal-400">
            2-O'yin
          </span>
          <h2 className="text-2xl font-black text-slate-900 dark:text-white">
            Zamon Poygasi (Tense Race)
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Berilgan fe'lni tegishli zamon yo'lagiga (O'tgan, Hozirgi, Kelasi) tezkorlik bilan joylashtiring!
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5 bg-amber-50 dark:bg-amber-950/60 px-3 py-1.5 rounded-xl text-amber-700 dark:text-amber-400 font-mono font-bold text-sm">
            <Clock className="w-4 h-4" />
            <span>{timeLeft}s</span>
          </div>
          <div className="flex items-center gap-1.5 bg-orange-50 dark:bg-orange-950/60 px-3 py-1.5 rounded-xl text-orange-700 dark:text-orange-400 font-bold text-sm">
            <Flame className="w-4 h-4 fill-orange-500" />
            <span>{combo}x Combo</span>
          </div>
          <div className="flex items-center gap-1.5 bg-teal-50 dark:bg-teal-950/60 px-3 py-1.5 rounded-xl text-teal-700 dark:text-teal-300 font-bold text-sm">
            <Trophy className="w-4 h-4" />
            <span>{score} ball</span>
          </div>
        </div>
      </div>

      {!isGameOver ? (
        <div className="space-y-8 py-4">
          {/* Active Word Card */}
          <div className="text-center">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-widest">
              Harakatdagi so'z:
            </span>
            <div className="mt-2 inline-block px-8 py-5 rounded-3xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-teal-500 text-white shadow-xl shadow-indigo-500/25 animate-in zoom-in-95 duration-200">
              <span className="text-3xl sm:text-4xl font-black tracking-wide font-mono">
                {currentVerb.word}
              </span>
            </div>
          </div>

          {/* Feedback pill */}
          {lastFeedback && (
            <div
              className={`text-center text-xs font-bold px-4 py-2 rounded-xl max-w-md mx-auto transition-all ${
                lastFeedback.isCorrect
                  ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300'
                  : 'bg-rose-50 text-rose-700 dark:bg-rose-950 dark:text-rose-300'
              }`}
            >
              {lastFeedback.text}
            </div>
          )}

          {/* 3 Tense Lanes / Choice Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            {/* Lane 1: O'tgan zamon */}
            <button
              onClick={() => handleLaneSelect('otgan')}
              className="group p-5 rounded-2xl bg-blue-50 dark:bg-blue-950/40 hover:bg-blue-100 dark:hover:bg-blue-900/60 border-2 border-blue-200 dark:border-blue-900 transition-all text-center cursor-pointer active:scale-98"
            >
              <div className="w-10 h-10 mx-auto mb-2 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold text-lg shadow-sm">
                ⏮
              </div>
              <h4 className="font-extrabold text-blue-900 dark:text-blue-200 text-lg">
                O'tgan zamon
              </h4>
              <p className="text-xs text-blue-600/80 dark:text-blue-400 mt-1 font-mono">
                -di, -gan, -b(-ib)
              </p>
              <span className="mt-3 inline-flex items-center gap-1 text-[11px] font-bold text-blue-700 dark:text-blue-300 group-hover:translate-x-1 transition-transform">
                Tanlash <ArrowRight className="w-3 h-3" />
              </span>
            </button>

            {/* Lane 2: Hozirgi zamon */}
            <button
              onClick={() => handleLaneSelect('hozirgi')}
              className="group p-5 rounded-2xl bg-teal-50 dark:bg-teal-950/40 hover:bg-teal-100 dark:hover:bg-teal-900/60 border-2 border-teal-200 dark:border-teal-900 transition-all text-center cursor-pointer active:scale-98"
            >
              <div className="w-10 h-10 mx-auto mb-2 rounded-xl bg-teal-600 text-white flex items-center justify-center font-bold text-lg shadow-sm">
                ▶
              </div>
              <h4 className="font-extrabold text-teal-900 dark:text-teal-200 text-lg">
                Hozirgi zamon
              </h4>
              <p className="text-xs text-teal-600/80 dark:text-teal-400 mt-1 font-mono">
                -yapti, -moqda, -yotir
              </p>
              <span className="mt-3 inline-flex items-center gap-1 text-[11px] font-bold text-teal-700 dark:text-teal-300 group-hover:translate-x-1 transition-transform">
                Tanlash <ArrowRight className="w-3 h-3" />
              </span>
            </button>

            {/* Lane 3: Kelasi zamon */}
            <button
              onClick={() => handleLaneSelect('kelasi')}
              className="group p-5 rounded-2xl bg-purple-50 dark:bg-purple-950/40 hover:bg-purple-100 dark:hover:bg-purple-900/60 border-2 border-purple-200 dark:border-purple-900 transition-all text-center cursor-pointer active:scale-98"
            >
              <div className="w-10 h-10 mx-auto mb-2 rounded-xl bg-purple-600 text-white flex items-center justify-center font-bold text-lg shadow-sm">
                ⏭
              </div>
              <h4 className="font-extrabold text-purple-900 dark:text-purple-200 text-lg">
                Kelasi zamon
              </h4>
              <p className="text-xs text-purple-600/80 dark:text-purple-400 mt-1 font-mono">
                -ajak, -moqchi, -a/-y
              </p>
              <span className="mt-3 inline-flex items-center gap-1 text-[11px] font-bold text-purple-700 dark:text-purple-300 group-hover:translate-x-1 transition-transform">
                Tanlash <ArrowRight className="w-3 h-3" />
              </span>
            </button>
          </div>
        </div>
      ) : (
        <div className="text-center py-10 space-y-4">
          <div className="w-20 h-20 mx-auto rounded-3xl bg-amber-100 dark:bg-amber-950 flex items-center justify-center text-amber-600">
            <Trophy className="w-12 h-12" />
          </div>
          <h3 className="text-2xl font-black text-slate-900 dark:text-white">
            Vaqt tugadi!
          </h3>
          <p className="text-sm text-slate-600 dark:text-slate-400 max-w-md mx-auto">
            Zamon poygasidagi chaqqonligingiz uchun rahmat. Eng yuqori ketma-ketlik: {maxCombo}x combo!
          </p>

          <div className="inline-block p-4 rounded-2xl bg-teal-50 dark:bg-teal-950/60 border border-teal-200 dark:border-teal-900">
            <p className="text-xs text-teal-700 dark:text-teal-300 font-medium">Yakuniy natija:</p>
            <p className="text-4xl font-black text-teal-600 dark:text-teal-400 font-mono">
              {score} ball
            </p>
          </div>

          <div className="flex items-center justify-center gap-3 pt-4">
            <button
              onClick={restartGame}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-sm shadow-lg shadow-teal-600/25 transition-all"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Qayta poyga</span>
            </button>
            <button
              onClick={onBack}
              className="px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold text-sm transition-all"
            >
              Chiqish
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
