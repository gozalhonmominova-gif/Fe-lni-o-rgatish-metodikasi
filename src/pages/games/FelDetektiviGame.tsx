import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { sound } from '../../utils/sound';
import { Heart, Trophy, Clock, RotateCcw, Sparkles, CheckCircle2, AlertCircle } from 'lucide-react';

interface TextRound {
  title: string;
  story: string; // words separated by space
  verbs: string[]; // lowercase cleaned verbs
}

const rounds: TextRound[] = [
  {
    title: "1-bosqich: Maktab bog'idagi ertalab",
    story: "Quyosh ufqdan sekin ko'tarildi va butun bog'ni yoritdi . Bolalar maktab hovlisiga quvonch bilan keldilar . Ular dars boshlanishidan oldin kitob o'qishdi va darslarni qizg'in muhokama qilishdi .",
    verbs: ["ko'tarildi", "yoritdi", "keldilar", "o'qishdi", "qilishdi"]
  },
  {
    title: "2-bosqich: Ona tili darsida",
    story: "Ustoz sinfga jilmayib kirdi va doskaga yangi mavzuni yozdi . Talabalar o'rindiqlariga o'tirishdi va diqqat bilan tinglashdi . Har bir savolga faol javob berdilar hamda mashqlarni tezda yechdilar .",
    verbs: ["kirdi", "yozdi", "o'tirishdi", "tinglashdi", "berdilar", "yechdilar"]
  },
  {
    title: "3-bosqich: Ijodiy izlanish",
    story: "Zukko o'quvchi lug'atdan murakkab fe'llarni izladi va ularning ma'nolarini chuqur tahlil qildi . Do'stlari unga havas bilan qarashdi hamda yangi qoidalarni birgalikda o'rganishdi .",
    verbs: ["izladi", "qildi", "qarashdi", "o'rganishdi"]
  }
];

export const FelDetektiviGame: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const { addXp, recordGameScore, triggerConfetti } = useApp();
  const [roundIdx, setRoundIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [timeLeft, setTimeLeft] = useState(45);
  const [clickedWords, setClickedWords] = useState<Record<number, boolean>>({});
  const [foundVerbs, setFoundVerbs] = useState<string[]>([]);
  const [isGameOver, setIsGameOver] = useState(false);
  const [isVictory, setIsVictory] = useState(false);

  const currentRound = rounds[roundIdx];
  const words = currentRound.story.split(' ');

  // Timer countdown
  useEffect(() => {
    if (isGameOver || isVictory) return;
    if (timeLeft <= 0) {
      handleGameOver(false);
      return;
    }
    const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft, isGameOver, isVictory]);

  const cleanWord = (w: string) => {
    return w.replace(/[.,!?;:]/g, '').toLowerCase();
  };

  const handleWordClick = (word: string, index: number) => {
    if (isGameOver || isVictory || clickedWords[index]) return;

    const cleaned = cleanWord(word);
    const isVerb = currentRound.verbs.includes(cleaned);

    setClickedWords((prev) => ({ ...prev, [index]: true }));

    if (isVerb) {
      sound.playCorrect();
      const updatedFound = [...foundVerbs, cleaned];
      setFoundVerbs(updatedFound);
      const points = 25;
      setScore((prev) => prev + points);

      // Check if all verbs in round are found
      const remaining = currentRound.verbs.filter((v) => !updatedFound.includes(v));
      if (remaining.length === 0) {
        if (roundIdx + 1 < rounds.length) {
          triggerConfetti();
          sound.playFanfare();
          setTimeout(() => {
            setRoundIdx((prev) => prev + 1);
            setClickedWords({});
            setFoundVerbs([]);
            setTimeLeft(45);
          }, 800);
        } else {
          handleGameOver(true);
        }
      }
    } else {
      sound.playWrong();
      const newLives = lives - 1;
      setLives(newLives);
      if (newLives <= 0) {
        handleGameOver(false);
      }
    }
  };

  const handleGameOver = (won: boolean) => {
    if (won) {
      setIsVictory(true);
      const totalPoints = score + timeLeft * 2;
      setScore(totalPoints);
      recordGameScore('fel-detektivi', totalPoints);
      addXp(60);
      sound.playFanfare();
      triggerConfetti();
    } else {
      setIsGameOver(true);
      recordGameScore('fel-detektivi', score);
      sound.playWrong();
    }
  };

  const handleRestart = () => {
    setRoundIdx(0);
    setScore(0);
    setLives(3);
    setTimeLeft(45);
    setClickedWords({});
    setFoundVerbs([]);
    setIsGameOver(false);
    setIsVictory(false);
    sound.playClick();
  };

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 bg-white dark:bg-slate-900 rounded-3xl shadow-xl border border-slate-200 dark:border-slate-800">
      {/* Header bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800 mb-6">
        <div>
          <span className="text-xs uppercase font-extrabold tracking-wider text-indigo-600 dark:text-indigo-400">
            1-O'yin
          </span>
          <h2 className="text-2xl font-black text-slate-900 dark:text-white">
            Fe'l Detektivi (Verb Detective)
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Matndagi barcha harakat va holat fe'llarini toping! Noto'g'ri so'z jon yo'qotadi.
          </p>
        </div>
        <div className="flex items-center gap-4">
          {/* Lives */}
          <div className="flex items-center gap-1 bg-rose-50 dark:bg-rose-950/60 px-3 py-1.5 rounded-xl border border-rose-200 dark:border-rose-900">
            {[1, 2, 3].map((heart) => (
              <Heart
                key={heart}
                className={`w-4 h-4 ${
                  heart <= lives
                    ? 'text-rose-500 fill-rose-500 animate-pulse'
                    : 'text-slate-300 dark:text-slate-700'
                }`}
              />
            ))}
          </div>
          {/* Timer */}
          <div className="flex items-center gap-1.5 bg-amber-50 dark:bg-amber-950/60 px-3 py-1.5 rounded-xl text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-900 font-mono font-bold text-sm">
            <Clock className="w-4 h-4" />
            <span>{timeLeft}s</span>
          </div>
          {/* Score */}
          <div className="flex items-center gap-1.5 bg-indigo-50 dark:bg-indigo-950/60 px-3 py-1.5 rounded-xl text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-900 font-bold text-sm">
            <Trophy className="w-4 h-4" />
            <span>{score} ball</span>
          </div>
        </div>
      </div>

      {/* Main Game Surface */}
      {!isGameOver && !isVictory ? (
        <div>
          <div className="mb-4 flex items-center justify-between text-xs font-semibold text-slate-500">
            <span className="font-bold text-indigo-600 dark:text-indigo-400">{currentRound.title}</span>
            <span>
              Topildi: {foundVerbs.length} / {currentRound.verbs.length} ta fe'l
            </span>
          </div>

          <div className="p-6 sm:p-8 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 leading-loose text-base sm:text-lg flex flex-wrap gap-2.5 items-center justify-center">
            {words.map((word, idx) => {
              if (word === '.') return <span key={idx} className="font-bold text-slate-400">.</span>;
              const isClicked = clickedWords[idx];
              const cleaned = cleanWord(word);
              const isVerb = currentRound.verbs.includes(cleaned);

              let style = 'bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 hover:border-indigo-400 hover:shadow-md';
              if (isClicked) {
                if (isVerb) {
                  style = 'bg-emerald-500 text-white font-bold border-emerald-600 scale-105 shadow-sm';
                } else {
                  style = 'bg-rose-500 text-white font-bold border-rose-600 opacity-60 line-through';
                }
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleWordClick(word, idx)}
                  disabled={isClicked}
                  className={`px-3 py-1.5 rounded-xl border text-sm sm:text-base font-medium transition-all transform active:scale-95 cursor-pointer ${style}`}
                >
                  {word}
                </button>
              );
            })}
          </div>

          <div className="mt-4 flex items-center justify-between text-xs text-slate-400">
            <span className="flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              Maslahat: "Nima qildi?", "Nima qilyapti?" so'rog'iga javob bo'lgan so'zlarni bosing.
            </span>
            <button
              onClick={onBack}
              className="text-slate-500 hover:text-slate-900 dark:hover:text-white"
            >
              Chiqish
            </button>
          </div>
        </div>
      ) : (
        /* End Screen */
        <div className="text-center py-10 space-y-4">
          {isVictory ? (
            <div className="w-20 h-20 mx-auto rounded-3xl bg-emerald-100 dark:bg-emerald-950 flex items-center justify-center text-emerald-600">
              <CheckCircle2 className="w-12 h-12" />
            </div>
          ) : (
            <div className="w-20 h-20 mx-auto rounded-3xl bg-rose-100 dark:bg-rose-950 flex items-center justify-center text-rose-600">
              <AlertCircle className="w-12 h-12" />
            </div>
          )}

          <h3 className="text-2xl font-black text-slate-900 dark:text-white">
            {isVictory ? "Ajoyib fe'l detektivi!" : "O'yin yakunlandi!"}
          </h3>
          <p className="text-sm text-slate-600 dark:text-slate-400 max-w-md mx-auto">
            {isVictory
              ? "Barcha matnlardagi fe'llarni sinchkovlik bilan aniqlab chiqdingiz va pedagogik qobiliyatingizni isbotladingiz!"
              : "Jonlaringiz tugadi yoki vaqt yetmadi. Harakat bildirish belgilariga yana bir bor e'tibor qarating!"}
          </p>

          <div className="inline-block p-4 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-900">
            <p className="text-xs text-indigo-700 dark:text-indigo-300 font-medium">To'plangan natija:</p>
            <p className="text-3xl font-black text-indigo-600 dark:text-indigo-400 font-mono">
              {score} ball
            </p>
          </div>

          <div className="flex items-center justify-center gap-3 pt-4">
            <button
              onClick={handleRestart}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-lg shadow-indigo-600/25 transition-all"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Qayta o'ynash</span>
            </button>
            <button
              onClick={onBack}
              className="px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold text-sm transition-all"
            >
              O'yinlar ro'yxatiga qaytish
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
