import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { sound } from '../../utils/sound';
import { Trophy, Clock, RotateCcw, Check, Sparkles } from 'lucide-react';

interface CardItem {
  id: string;
  pairId: number;
  content: string;
  isFlipped: boolean;
  isMatched: boolean;
}

const cardPairs = [
  { id: 1, a: "O'zlik nisbat", b: "yuvindi, kiyindi (-in, -n)" },
  { id: 2, a: "Majhul nisbat", b: "xat yozildi (-il, -in)" },
  { id: 3, a: "Orttirma nisbat", b: "yozdirdi, o'qitdi (-dir, -t)" },
  { id: 4, a: "Birgalik nisbat", b: "kulishdi, gaplashdi (-ish)" },
  { id: 5, a: "Klaster metodi", b: "Tushunchalarni grafik shoxlantirish" },
  { id: 6, a: "Venn diagrammasi", b: "Umumiy va farqli jihatlarni solishtirish" },
];

export const MemoryMatchGame: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const { addXp, recordGameScore, triggerConfetti } = useApp();
  const [cards, setCards] = useState<CardItem[]>([]);
  const [selectedCards, setSelectedCards] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [matchedPairs, setMatchedPairs] = useState(0);
  const [isVictory, setIsVictory] = useState(false);

  const initGame = () => {
    const list: CardItem[] = [];
    cardPairs.forEach((pair) => {
      list.push({
        id: `card-${pair.id}-a`,
        pairId: pair.id,
        content: pair.a,
        isFlipped: false,
        isMatched: false,
      });
      list.push({
        id: `card-${pair.id}-b`,
        pairId: pair.id,
        content: pair.b,
        isFlipped: false,
        isMatched: false,
      });
    });

    // Shuffle
    list.sort(() => Math.random() - 0.5);
    setCards(list);
    setSelectedCards([]);
    setMoves(0);
    setMatchedPairs(0);
    setIsVictory(false);
  };

  useEffect(() => {
    initGame();
  }, []);

  const handleCardClick = (index: number) => {
    if (cards[index].isFlipped || cards[index].isMatched || selectedCards.length >= 2) return;

    sound.playClick();
    const newCards = [...cards];
    newCards[index].isFlipped = true;
    setCards(newCards);

    const newSelected = [...selectedCards, index];
    setSelectedCards(newSelected);

    if (newSelected.length === 2) {
      setMoves((prev) => prev + 1);
      const [firstIdx, secondIdx] = newSelected;
      const firstCard = cards[firstIdx];
      const secondCard = cards[secondIdx];

      if (firstCard.pairId === secondCard.pairId) {
        sound.playCorrect();
        setTimeout(() => {
          newCards[firstIdx].isMatched = true;
          newCards[secondIdx].isMatched = true;
          setCards([...newCards]);
          setSelectedCards([]);
          const updatedMatches = matchedPairs + 1;
          setMatchedPairs(updatedMatches);

          if (updatedMatches === cardPairs.length) {
            setIsVictory(true);
            const score = Math.max(100, 200 - moves * 5);
            recordGameScore('xotira-kartalari', score);
            addXp(50);
            sound.playFanfare();
            triggerConfetti();
          }
        }, 400);
      } else {
        sound.playWrong();
        setTimeout(() => {
          newCards[firstIdx].isFlipped = false;
          newCards[secondIdx].isFlipped = false;
          setCards([...newCards]);
          setSelectedCards([]);
        }, 900);
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 bg-white dark:bg-slate-900 rounded-3xl shadow-xl border border-slate-200 dark:border-slate-800">
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800 mb-6">
        <div>
          <span className="text-xs uppercase font-extrabold tracking-wider text-rose-600 dark:text-rose-400">
            4-O'yin
          </span>
          <h2 className="text-2xl font-black text-slate-900 dark:text-white">
            Xotira Kartalari (Memory Match)
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Grammatik kategoriya yoki metod nomi bilan uning izohini juftlashtiring!
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-800 px-3 py-1.5 rounded-xl font-bold text-xs">
            <span>Harakatlar soni: {moves}</span>
          </div>
          <div className="flex items-center gap-1.5 bg-rose-50 dark:bg-rose-950/60 px-3 py-1.5 rounded-xl text-rose-700 dark:text-rose-300 font-bold text-xs">
            <Trophy className="w-4 h-4" />
            <span>Juftliklar: {matchedPairs}/{cardPairs.length}</span>
          </div>
        </div>
      </div>

      {!isVictory ? (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 py-2">
          {cards.map((card, idx) => {
            const isShown = card.isFlipped || card.isMatched;
            return (
              <button
                key={card.id}
                onClick={() => handleCardClick(idx)}
                disabled={isShown}
                className={`h-28 sm:h-32 p-3 rounded-2xl border-2 font-bold text-xs sm:text-sm text-center flex items-center justify-center transition-all transform duration-200 active:scale-95 ${
                  card.isMatched
                    ? 'bg-emerald-50 dark:bg-emerald-950/50 border-emerald-500 text-emerald-800 dark:text-emerald-200 shadow-xs'
                    : isShown
                    ? 'bg-indigo-50 dark:bg-indigo-950 border-indigo-400 text-indigo-900 dark:text-indigo-200 shadow-md rotate-y-180'
                    : 'bg-slate-100 dark:bg-slate-800 border-slate-300 dark:border-slate-700 hover:border-indigo-400 text-transparent cursor-pointer'
                }`}
              >
                {isShown ? (
                  <span className="leading-snug">{card.content}</span>
                ) : (
                  <Sparkles className="w-6 h-6 text-slate-400 dark:text-slate-600 animate-pulse" />
                )}
              </button>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-10 space-y-4">
          <div className="w-20 h-20 mx-auto rounded-3xl bg-emerald-100 dark:bg-emerald-950 flex items-center justify-center text-emerald-600">
            <Check className="w-12 h-12" />
          </div>
          <h3 className="text-2xl font-black text-slate-900 dark:text-white">
            Barcha juftliklar topildi!
          </h3>
          <p className="text-sm text-slate-600 dark:text-slate-400 max-w-md mx-auto">
            Siz metodik tushunchalar va grammatik kategoriyalarni mukammal xotirada saqlagansiz.
          </p>
          <div className="flex items-center justify-center gap-3 pt-4">
            <button
              onClick={initGame}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-sm shadow-lg shadow-rose-600/25"
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
