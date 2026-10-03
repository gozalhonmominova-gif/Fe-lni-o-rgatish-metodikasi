import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { sound } from '../../utils/sound';
import { Trophy, RotateCcw, Sparkles, HelpCircle } from 'lucide-react';

const secretWords = [
  { word: "NISBAT", hint: "Fe'lning harakat va subyekt munosabatini bildiruvchi 5 xil kategoriyasi." },
  { word: "ZAMON", hint: "Harakatning nutq so'zlanib turgan paytga munosabati (o'tgan, hozirgi, kelasi)." },
  { word: "MAYLLAR", hint: "Buyruq, shart, aniq shakllarni birlashtiruvchi grammatik tushuncha." },
  { word: "KLASTER", hint: "Tushunchalarni markazdan shoxlantirib grafik o'rganish interfaol metodi." },
  { word: "SINKVEIN", hint: "5 qatordan iborat didaktik qisqa she'r yozish orqali xulosa chiqarish usuli." },
];

export const VerbWordleGame: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const { addXp, recordGameScore, triggerConfetti } = useApp();
  const [wordIdx, setWordIdx] = useState(0);
  const [currentGuess, setCurrentGuess] = useState('');
  const [guesses, setGuesses] = useState<string[]>([]);
  const [isGameOver, setIsGameOver] = useState(false);
  const [isVictory, setIsVictory] = useState(false);
  const [showHint, setShowHint] = useState(false);

  const activeTarget = secretWords[wordIdx];
  const targetWord = activeTarget.word;
  const wordLength = targetWord.length;
  const maxAttempts = 6;

  const handleKeyPress = (letter: string) => {
    if (isGameOver || isVictory) return;
    if (currentGuess.length < wordLength) {
      setCurrentGuess((prev) => prev + letter);
      sound.playClick();
    }
  };

  const handleDelete = () => {
    setCurrentGuess((prev) => prev.slice(0, -1));
    sound.playClick();
  };

  const handleSubmit = () => {
    if (currentGuess.length !== wordLength) {
      sound.playWrong();
      return;
    }

    const updated = [...guesses, currentGuess];
    setGuesses(updated);

    if (currentGuess === targetWord) {
      sound.playFanfare();
      setIsVictory(true);
      triggerConfetti();
      recordGameScore('verb-wordle', 100);
      addXp(50);
    } else if (updated.length >= maxAttempts) {
      sound.playWrong();
      setIsGameOver(true);
    } else {
      sound.playCorrect();
    }
    setCurrentGuess('');
  };

  const getLetterColor = (letter: string, index: number, word: string) => {
    if (targetWord[index] === letter) {
      return 'bg-emerald-500 text-white border-emerald-600';
    }
    if (targetWord.includes(letter)) {
      return 'bg-amber-500 text-white border-amber-600';
    }
    return 'bg-slate-400 dark:bg-slate-700 text-white border-slate-500';
  };

  const keyboardLetters = [
    ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
    ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
    ['Z', 'X', 'C', 'V', 'B', 'N', 'M', "'"]
  ];

  const handleRestart = () => {
    setWordIdx((prev) => (prev + 1) % secretWords.length);
    setCurrentGuess('');
    setGuesses([]);
    setIsGameOver(false);
    setIsVictory(false);
    setShowHint(false);
    sound.playClick();
  };

  return (
    <div className="max-w-xl mx-auto p-4 sm:p-6 bg-white dark:bg-slate-900 rounded-3xl shadow-xl border border-slate-200 dark:border-slate-800">
      <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800 mb-6">
        <div>
          <span className="text-xs uppercase font-extrabold tracking-wider text-indigo-600 dark:text-indigo-400">
            8-O'yin
          </span>
          <h2 className="text-2xl font-black text-slate-900 dark:text-white">
            Verb Wordle (Metodik topishmoq)
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            {wordLength} harfli metodik yoki grammatik atamani 6 ta urinishda toping!
          </p>
        </div>
        <button
          onClick={() => setShowHint(!showHint)}
          className="p-2 rounded-xl text-amber-600 hover:bg-amber-50 dark:hover:bg-amber-950/60"
          title="Yordam"
        >
          <HelpCircle className="w-5 h-5" />
        </button>
      </div>

      {showHint && (
        <div className="p-3 mb-4 rounded-xl bg-amber-50 dark:bg-amber-950/60 text-amber-800 dark:text-amber-200 text-xs font-semibold">
          💡 Maslahat: {activeTarget.hint}
        </div>
      )}

      {/* Grid */}
      <div className="space-y-2 mb-6">
        {Array.from({ length: maxAttempts }).map((_, rowIdx) => {
          const guess = guesses[rowIdx];
          const isCurrentRow = rowIdx === guesses.length;

          return (
            <div key={rowIdx} className="flex justify-center gap-1.5 sm:gap-2">
              {Array.from({ length: wordLength }).map((_, colIdx) => {
                let char = '';
                let cellClass = 'border-2 border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white';

                if (guess) {
                  char = guess[colIdx] || '';
                  cellClass = getLetterColor(char, colIdx, guess);
                } else if (isCurrentRow) {
                  char = currentGuess[colIdx] || '';
                  if (char) cellClass = 'border-2 border-indigo-500 bg-white dark:bg-slate-800 font-bold';
                }

                return (
                  <div
                    key={colIdx}
                    className={`w-11 h-12 sm:w-12 sm:h-14 rounded-xl flex items-center justify-center font-mono font-black text-lg sm:text-xl uppercase transition-all ${cellClass}`}
                  >
                    {char}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>

      {/* Game Over Message */}
      {(isVictory || isGameOver) && (
        <div className="text-center p-4 mb-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
          <p className="font-extrabold text-base mb-1">
            {isVictory ? "🎉 Tabriklaymiz, topdingiz!" : "Urinishlar tugadi!"}
          </p>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Yashiringan so'z: <span className="font-bold text-indigo-600 dark:text-indigo-400">{targetWord}</span> — {activeTarget.hint}
          </p>
          <div className="mt-3 flex justify-center gap-2">
            <button
              onClick={handleRestart}
              className="px-4 py-2 rounded-xl bg-indigo-600 text-white font-bold text-xs"
            >
              Keyingi so'z
            </button>
            <button
              onClick={onBack}
              className="px-4 py-2 rounded-xl bg-slate-200 dark:bg-slate-700 text-xs font-bold"
            >
              Chiqish
            </button>
          </div>
        </div>
      )}

      {/* Keyboard */}
      <div className="space-y-1.5 select-none">
        {keyboardLetters.map((row, rowIdx) => (
          <div key={rowIdx} className="flex justify-center gap-1">
            {row.map((letter) => (
              <button
                key={letter}
                onClick={() => handleKeyPress(letter)}
                disabled={isGameOver || isVictory}
                className="w-8 sm:w-10 h-11 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200 flex items-center justify-center shadow-xs cursor-pointer active:scale-95"
              >
                {letter}
              </button>
            ))}
          </div>
        ))}
        <div className="flex justify-center gap-2 pt-1">
          <button
            onClick={handleDelete}
            disabled={isGameOver || isVictory}
            className="px-4 h-11 rounded-lg bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300 font-bold text-xs"
          >
            O'chirish (⌫)
          </button>
          <button
            onClick={handleSubmit}
            disabled={isGameOver || isVictory || currentGuess.length !== wordLength}
            className="px-6 h-11 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md shadow-indigo-600/20 disabled:opacity-40"
          >
            Yuborish (Enter)
          </button>
        </div>
      </div>
    </div>
  );
};
