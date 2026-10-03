import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { sound } from '../../utils/sound';
import { Trophy, CheckCircle, RotateCcw, ArrowRight, Layers, Sparkles } from 'lucide-react';

interface MorphemeChallenge {
  targetWord: string;
  meaning: string;
  expected: {
    root: string;
    voice?: string;
    negation?: string;
    tense: string;
    person: string;
  };
}

const challenges: MorphemeChallenge[] = [
  {
    targetWord: "yozdirmadingiz",
    meaning: "Siz (hurmat ma'nosida) boshqaga yozishni buyurmadingiz (orttirma nisbat, bo'lishsiz, o'tgan zamon, II shaxs ko'plik).",
    expected: {
      root: "yoz",
      voice: "-dir",
      negation: "-ma",
      tense: "-di",
      person: "-ngiz"
    }
  },
  {
    targetWord: "o'qitilmoqda",
    meaning: "Dars hozirgi paytda o'rgatilmoqda (orttirma + majhul nisbat, hozirgi zamon, III shaxs).",
    expected: {
      root: "o'qi",
      voice: "-t-il",
      negation: "yo'q",
      tense: "-moqda",
      person: "Ø"
    }
  },
  {
    targetWord: "yuvinishdi",
    meaning: "Ular birgalikda o'zlarini yuvib tozaladilar (o'zlik + birgalik nisbat, o'tgan zamon, III shaxs ko'plik).",
    expected: {
      root: "yuv",
      voice: "-in-ish",
      negation: "yo'q",
      tense: "-di",
      person: "Ø"
    }
  },
  {
    targetWord: "aytolmadi",
    meaning: "U o'z fikrini aytishga qodir bo'lmadi (imkoniyat fe'li, inkor, o'tgan zamon).",
    expected: {
      root: "ayt",
      voice: "-ol",
      negation: "-ma",
      tense: "-di",
      person: "Ø"
    }
  }
];

export const MorfemaKonstruktoriGame: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const { addXp, recordGameScore, triggerConfetti } = useApp();
  const [levelIdx, setLevelIdx] = useState(0);
  const [selectedRoot, setSelectedRoot] = useState<string | null>(null);
  const [selectedVoice, setSelectedVoice] = useState<string | null>(null);
  const [selectedNegation, setSelectedNegation] = useState<string | null>(null);
  const [selectedTense, setSelectedTense] = useState<string | null>(null);
  const [selectedPerson, setSelectedPerson] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [isCompleted, setIsCompleted] = useState(false);

  const currentChallenge = challenges[levelIdx];

  // Options pool
  const roots = ["yoz", "o'qi", "yuv", "ayt", "ko'r", "ishla"];
  const voices = ["ko'rsatkichsiz (aniq)", "-dir", "-t-il", "-in-ish", "-ol", "-il"];
  const negations = ["yo'q (bo'lishli)", "-ma"];
  const tenses = ["-di (o'tgan)", "-moqda (hozirgi)", "-yapti", "-ajak"];
  const persons = ["-ngiz (II shaxs)", "Ø (III shaxs)", "-m (I shaxs)", "-k (I ko'plik)"];

  // Constructed preview
  const assembledWord = [
    selectedRoot || '___',
    selectedVoice && selectedVoice !== "ko'rsatkichsiz (aniq)" ? selectedVoice : '',
    selectedNegation && selectedNegation !== "yo'q (bo'lishli)" ? selectedNegation : '',
    selectedTense ? selectedTense.split(' ')[0] : '',
    selectedPerson && selectedPerson !== "Ø (III shaxs)" ? selectedPerson.split(' ')[0] : '',
  ]
    .filter(Boolean)
    .join('')
    .replace(/[-+ ]/g, '');

  const handleCheck = () => {
    if (!selectedRoot || !selectedTense) {
      sound.playWrong();
      setFeedback("Iltimos, kamida o'zak va zamon qo'shimchasini tanlang!");
      return;
    }

    const cleanAssembled = assembledWord.toLowerCase();
    const cleanTarget = currentChallenge.targetWord.toLowerCase().replace(/['ʼ`]/g, "'");

    if (cleanAssembled.includes(currentChallenge.expected.root)) {
      sound.playCorrect();
      setScore((prev) => prev + 35);
      triggerConfetti();

      if (levelIdx + 1 < challenges.length) {
        setFeedback("To'g'ri! Morfemik zanjir qat'iy mantiq asosida ulandi.");
        setTimeout(() => {
          setLevelIdx((prev) => prev + 1);
          resetPicks();
          setFeedback(null);
        }, 1200);
      } else {
        setIsCompleted(true);
        recordGameScore('morfema-konstruktori', score + 35);
        addXp(60);
      }
    } else {
      sound.playWrong();
      setFeedback(`Ketma-ketlikda noaniqlik bor! Maqsadli so'z: "${currentChallenge.targetWord}"`);
    }
  };

  const resetPicks = () => {
    setSelectedRoot(null);
    setSelectedVoice(null);
    setSelectedNegation(null);
    setSelectedTense(null);
    setSelectedPerson(null);
  };

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 bg-white dark:bg-slate-900 rounded-3xl shadow-xl border border-slate-200 dark:border-slate-800">
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800 mb-6">
        <div>
          <span className="text-xs uppercase font-extrabold tracking-wider text-purple-600 dark:text-purple-400">
            3-O'yin
          </span>
          <h2 className="text-2xl font-black text-slate-900 dark:text-white">
            Morfema Konstruktori (Morpheme Builder)
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            O'zak, nisbat, inkor, zamon va shaxs qo'shimchalarini to'g'ri ketma-ketlikda yig'ing!
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 bg-purple-50 dark:bg-purple-950/60 px-3 py-1.5 rounded-xl text-purple-700 dark:text-purple-300 font-bold text-sm">
            <Trophy className="w-4 h-4" />
            <span>{score} ball</span>
          </div>
        </div>
      </div>

      {!isCompleted ? (
        <div className="space-y-6">
          {/* Target Task Card */}
          <div className="p-5 rounded-2xl bg-indigo-50/70 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-900/60">
            <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
              {levelIdx + 1}-topshiriq. Maqsadli fe'l shakli:
            </span>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mt-2">
              <h3 className="text-2xl font-black text-indigo-950 dark:text-indigo-100 font-mono tracking-wide">
                "{currentChallenge.targetWord}"
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 max-w-md">
                {currentChallenge.meaning}
              </p>
            </div>
          </div>

          {/* Real-time Assembled Preview */}
          <div className="p-4 rounded-2xl bg-slate-900 text-white text-center shadow-inner">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-widest block mb-1">
              Yig'ilgan fe'l shakli (Real-time Preview):
            </span>
            <span className="text-3xl font-black tracking-widest text-teal-400 font-mono">
              {assembledWord}
            </span>
          </div>

          {/* Builder Blocks Selection */}
          <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
            {/* 1. O'zak */}
            <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700">
              <span className="text-xs font-extrabold text-blue-600 dark:text-blue-400 block mb-2">
                1. O'zak (Root)
              </span>
              <div className="flex flex-col gap-1.5">
                {roots.map((r) => (
                  <button
                    key={r}
                    onClick={() => {
                      setSelectedRoot(r);
                      sound.playClick();
                    }}
                    className={`py-1 px-2 rounded-lg text-xs font-mono font-bold transition-all ${
                      selectedRoot === r
                        ? 'bg-blue-600 text-white shadow-sm'
                        : 'bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-200 hover:bg-blue-50'
                    }`}
                  >
                    {r}
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Nisbat */}
            <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700">
              <span className="text-xs font-extrabold text-purple-600 dark:text-purple-400 block mb-2">
                2. Nisbat (Voice)
              </span>
              <div className="flex flex-col gap-1.5">
                {voices.map((v) => (
                  <button
                    key={v}
                    onClick={() => {
                      setSelectedVoice(v);
                      sound.playClick();
                    }}
                    className={`py-1 px-2 rounded-lg text-xs font-mono font-bold transition-all truncate text-left ${
                      selectedVoice === v
                        ? 'bg-purple-600 text-white shadow-sm'
                        : 'bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-200 hover:bg-purple-50'
                    }`}
                  >
                    {v}
                  </button>
                ))}
              </div>
            </div>

            {/* 3. Bo'lishsizlik */}
            <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700">
              <span className="text-xs font-extrabold text-rose-600 dark:text-rose-400 block mb-2">
                3. Inkor (-ma)
              </span>
              <div className="flex flex-col gap-1.5">
                {negations.map((n) => (
                  <button
                    key={n}
                    onClick={() => {
                      setSelectedNegation(n);
                      sound.playClick();
                    }}
                    className={`py-1 px-2 rounded-lg text-xs font-mono font-bold transition-all truncate text-left ${
                      selectedNegation === n
                        ? 'bg-rose-600 text-white shadow-sm'
                        : 'bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-200 hover:bg-rose-50'
                    }`}
                  >
                    {n}
                  </button>
                ))}
              </div>
            </div>

            {/* 4. Zamon */}
            <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700">
              <span className="text-xs font-extrabold text-amber-600 dark:text-amber-400 block mb-2">
                4. Zamon (Tense)
              </span>
              <div className="flex flex-col gap-1.5">
                {tenses.map((t) => (
                  <button
                    key={t}
                    onClick={() => {
                      setSelectedTense(t);
                      sound.playClick();
                    }}
                    className={`py-1 px-2 rounded-lg text-xs font-mono font-bold transition-all truncate text-left ${
                      selectedTense === t
                        ? 'bg-amber-600 text-white shadow-sm'
                        : 'bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-200 hover:bg-amber-50'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            {/* 5. Shaxs-son */}
            <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700">
              <span className="text-xs font-extrabold text-emerald-600 dark:text-emerald-400 block mb-2">
                5. Shaxs (Person)
              </span>
              <div className="flex flex-col gap-1.5">
                {persons.map((p) => (
                  <button
                    key={p}
                    onClick={() => {
                      setSelectedPerson(p);
                      sound.playClick();
                    }}
                    className={`py-1 px-2 rounded-lg text-xs font-mono font-bold transition-all truncate text-left ${
                      selectedPerson === p
                        ? 'bg-emerald-600 text-white shadow-sm'
                        : 'bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-200 hover:bg-emerald-50'
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {feedback && (
            <div className="p-3 rounded-xl bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 text-xs font-bold text-center">
              {feedback}
            </div>
          )}

          <div className="flex items-center justify-between pt-4">
            <button
              onClick={resetPicks}
              className="px-4 py-2 rounded-xl text-xs font-bold text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              Tanlovlarni tozalash
            </button>
            <button
              onClick={handleCheck}
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-bold text-sm shadow-lg shadow-purple-600/25 transition-all"
            >
              <span>Tekshirish & Tasdiqlash</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      ) : (
        <div className="text-center py-10 space-y-4">
          <div className="w-20 h-20 mx-auto rounded-3xl bg-purple-100 dark:bg-purple-950 flex items-center justify-center text-purple-600">
            <Layers className="w-12 h-12" />
          </div>
          <h3 className="text-2xl font-black text-slate-900 dark:text-white">
            Morfemik zanjir muvaffaqiyatli qurildi!
          </h3>
          <p className="text-sm text-slate-600 dark:text-slate-400 max-w-md mx-auto">
            Fe'l yasovchi va shakl yasovchi qo'shimchalarning qat'iy o'rnini to'liq egalladingiz.
          </p>
          <div className="flex items-center justify-center gap-3 pt-4">
            <button
              onClick={() => {
                setLevelIdx(0);
                setIsCompleted(false);
                setScore(0);
                resetPicks();
              }}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-sm shadow-lg shadow-purple-600/25"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Qayta qurish</span>
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
