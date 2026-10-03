import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { translations } from '../i18n/translations';
import { glossaryData } from '../data/glossaryData';
import { initialFlashcards } from '../data/flashcardsData';
import { sound } from '../utils/sound';
import {
  BookMarked,
  Search,
  Volume2,
  Layers,
  RotateCw,
  Check,
  X,
  Sparkles,
  BookOpen,
  GraduationCap
} from 'lucide-react';

export const ResourcesPage: React.FC = () => {
  const { language, progress, updateLeitnerCard, addXp } = useApp();
  const t = translations[language];

  const [activeTab, setActiveTab] = useState<'glossary' | 'flashcards' | 'references'>('glossary');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Flashcards state
  const [cardIndex, setCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  // Filtered glossary
  const filteredGlossary = glossaryData.filter((item) => {
    const q = searchQuery.toLowerCase();
    const term = item.term[language].toLowerCase();
    const def = item.definition[language].toLowerCase();
    const matchesSearch = term.includes(q) || def.includes(q);
    const matchesCat = selectedCategory === 'all' || item.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  const currentFlashcard = initialFlashcards[cardIndex % initialFlashcards.length];
  const currentBox = progress.leitnerCardsState[currentFlashcard.id] || currentFlashcard.box;

  const handleCardConfidence = (known: boolean) => {
    sound.playClick();
    const newBox = known ? Math.min(3, currentBox + 1) : 1;
    updateLeitnerCard(currentFlashcard.id, newBox);
    setIsFlipped(false);
    setCardIndex((prev) => prev + 1);

    if (known) {
      addXp(10);
    }
  };

  return (
    <div className="space-y-8 py-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-blue-900 via-indigo-950 to-slate-900 text-white shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-bold">
            <BookMarked className="w-4 h-4 text-blue-300" />
            <span>Lug'at, terminlar va metodik manbalar</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black">
            {t.nav.resources}
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
            O'zbek tili grammatikasi va ta'lim metodikasi bo'yicha uch tilli akademik lug'at va Laytner kartochkalari.
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-slate-200 dark:border-slate-800 pb-1">
        <button
          onClick={() => setActiveTab('glossary')}
          className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
            activeTab === 'glossary'
              ? 'bg-indigo-600 text-white shadow-md'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          Metodik Lug'at (Glossary)
        </button>
        <button
          onClick={() => setActiveTab('flashcards')}
          className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
            activeTab === 'flashcards'
              ? 'bg-indigo-600 text-white shadow-md'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          Laytner kartochkalari (Spaced Repetition)
        </button>
        <button
          onClick={() => setActiveTab('references')}
          className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
            activeTab === 'references'
              ? 'bg-indigo-600 text-white shadow-md'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          Adabiyotlar & Foydali maslahatlar
        </button>
      </div>

      {/* TAB 1: GLOSSARY */}
      {activeTab === 'glossary' && (
        <div className="space-y-6">
          {/* Search & Category Filter */}
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <div className="relative flex-1 w-full">
              <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Termin yoki ta'rif bo'yicha qidiruv (o'zbek, rus, ingliz)..."
                className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs sm:text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-hidden focus:border-indigo-500"
              />
            </div>

            <div className="flex items-center gap-1.5 w-full sm:w-auto overflow-x-auto">
              {['all', 'grammatika', 'metodika', 'pedagogika'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-2 rounded-xl text-xs font-bold capitalize transition-all ${
                    selectedCategory === cat
                      ? 'bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800'
                      : 'bg-white dark:bg-slate-900 text-slate-500 hover:bg-slate-50 border border-slate-200 dark:border-slate-800'
                  }`}
                >
                  {cat === 'all' ? "Barchasi" : cat}
                </button>
              ))}
            </div>
          </div>

          {/* Terms Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {filteredGlossary.map((item) => (
              <div
                key={item.id}
                className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-2"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-base font-black text-slate-900 dark:text-white">
                      {item.term[language]}
                    </span>
                    <button
                      onClick={() => sound.speakText(item.term[language], language)}
                      className="text-slate-400 hover:text-indigo-600 p-0.5"
                      title="Ovoz berish"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500">
                    {item.category}
                  </span>
                </div>

                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  {item.definition[language]}
                </p>

                <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 text-[11px] text-indigo-700 dark:text-indigo-300 font-medium">
                  Misol: {item.example[language]}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: LEITNER FLASHCARDS */}
      {activeTab === 'flashcards' && (
        <div className="max-w-md mx-auto space-y-6">
          <div className="flex items-center justify-between text-xs font-bold text-slate-500">
            <span>Kartochka #{cardIndex + 1} / {initialFlashcards.length}</span>
            <div className="flex items-center gap-1.5">
              <span className="text-slate-400">Laytner qutisi:</span>
              <span className="px-2 py-0.5 rounded-md bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 font-mono">
                {currentBox}-Quti
              </span>
            </div>
          </div>

          {/* Flashcard Card */}
          <div
            onClick={() => {
              setIsFlipped(!isFlipped);
              sound.playClick();
            }}
            className="h-64 p-8 rounded-3xl bg-gradient-to-tr from-white to-indigo-50/50 dark:from-slate-900 dark:to-slate-850 border-2 border-indigo-200 dark:border-indigo-900 shadow-xl flex flex-col items-center justify-center text-center cursor-pointer transition-transform hover:scale-102"
          >
            <span className="text-[11px] font-bold uppercase tracking-widest text-indigo-500 mb-2">
              {isFlipped ? "Ta'rif (Orqa tomon)" : "Termin (Old tomon - bosib aylantiring)"}
            </span>
            <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-2">
              {isFlipped
                ? currentFlashcard.definition[language]
                : currentFlashcard.term[language]}
            </h3>
            <span className="text-xs text-slate-400 flex items-center gap-1 mt-3">
              <RotateCw className="w-3.5 h-3.5" />
              Aylantirish uchun bosing
            </span>
          </div>

          {/* Confidence Action Buttons */}
          <div className="flex items-center justify-center gap-3">
            <button
              onClick={() => handleCardConfidence(false)}
              className="flex-1 py-3 rounded-2xl bg-rose-50 hover:bg-rose-100 dark:bg-rose-950/60 dark:hover:bg-rose-900/60 text-rose-700 dark:text-rose-300 font-bold text-xs flex items-center justify-center gap-1.5 border border-rose-200 dark:border-rose-900"
            >
              <X className="w-4 h-4" />
              <span>Eslay olmadim (1-quti)</span>
            </button>
            <button
              onClick={() => handleCardConfidence(true)}
              className="flex-1 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md shadow-emerald-600/20"
            >
              <Check className="w-4 h-4" />
              <span>Yaxshi bilaman (+10 XP)</span>
            </button>
          </div>
        </div>
      )}

      {/* TAB 3: REFERENCES & METHODOLOGY TIPS */}
      {activeTab === 'references' && (
        <div className="space-y-6">
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
            <h3 className="font-black text-lg text-slate-900 dark:text-white flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-indigo-600" />
              <span>Tavsiya etiladigan asosiy adabiyotlar</span>
            </h3>
            <ul className="space-y-3 text-xs sm:text-sm text-slate-700 dark:text-slate-300 divide-y divide-slate-100 dark:divide-slate-800">
              <li className="pt-2">
                <span className="font-bold block">1. Mahmudov N., Sobirov A.</span>
                "Ona tili o'qitish metodikasi" — Oliy pedagogik ta'lim muassasalari uchun darslik. Toshkent.
              </li>
              <li className="pt-2">
                <span className="font-bold block">2. G'ulomov A., Ne'matov H.</span>
                "Ona tili ta'limi mazmuni" — O'qituvchilar uchun metodik qo'llanma.
              </li>
              <li className="pt-2">
                <span className="font-bold block">3. Hojiyev A.</span>
                "O'zbek tili fe'llarining izohli lug'ati" — Fan nashriyoti.
              </li>
              <li className="pt-2">
                <span className="font-bold block">4. O'zbekiston Respublikasi Xalq ta'limi vazirligi</span>
                Umumiy o'rta ta'lim maktablarining 5–9-sinflari uchun "Ona tili" darsliklari va o'quv dasturlari (DTS).
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};
