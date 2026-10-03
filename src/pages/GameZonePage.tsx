import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { translations } from '../i18n/translations';
import { FelDetektiviGame } from './games/FelDetektiviGame';
import { ZamonPoygasiGame } from './games/ZamonPoygasiGame';
import { MorfemaKonstruktoriGame } from './games/MorfemaKonstruktoriGame';
import { MemoryMatchGame } from './games/MemoryMatchGame';
import { MetodniTopGame } from './games/MetodniTopGame';
import { NisbatLabirintiGame } from './games/NisbatLabirintiGame';
import { XatolarLaboratoriyasiGame } from './games/XatolarLaboratoriyasiGame';
import { VerbWordleGame } from './games/VerbWordleGame';
import { DarsRejasiSimulatorGame } from './games/DarsRejasiSimulatorGame';
import { TezJavobKahootGame } from './games/TezJavobKahootGame';
import {
  Gamepad2,
  Trophy,
  Play,
  Sparkles,
  ArrowRight,
  Search,
  Clock,
  Layers,
  Brain,
  Compass,
  Key,
  Stethoscope,
  Grid,
  FileSpreadsheet,
  Zap
} from 'lucide-react';

interface GameZoneProps {
  initialActiveGame?: string | null;
  onClearActiveGame?: () => void;
}

export const GameZonePage: React.FC<GameZoneProps> = ({
  initialActiveGame,
  onClearActiveGame,
}) => {
  const { language, progress } = useApp();
  const t = translations[language];

  const [activeGameId, setActiveGameId] = useState<string | null>(initialActiveGame || null);

  const gamesCatalog = [
    {
      id: 'fel-detektivi',
      number: 1,
      title: "Fe'l Detektivi (Verb Detective)",
      description: "Matndagi barcha fe'llarni sinchkovlik bilan toping. Noto'g'ri so'zni bosish jon yo'qotadi!",
      icon: Search,
      color: "from-blue-600 to-indigo-600",
      xpReward: "50-100 XP",
      type: "Diqqat & Grammatika",
    },
    {
      id: 'zamon-poygasi',
      number: 2,
      title: "Zamon Poygasi (Tense Race)",
      description: "Tushayotgan fe'llarni 30 soniya ichida O'tgan, Hozirgi yoki Kelasi zamon yo'lagiga joylang.",
      icon: Clock,
      color: "from-teal-600 to-emerald-600",
      xpReward: "40-90 XP",
      type: "Tezkorlik & Reaksiya",
    },
    {
      id: 'morfema-konstruktori',
      number: 3,
      title: "Morfema Konstruktori (Morpheme Builder)",
      description: "O'zak, nisbat, inkor, zamon va shaxs qo'shimchalarini qat'iy morfologik tartibda yig'ing.",
      icon: Layers,
      color: "from-purple-600 to-indigo-600",
      xpReward: "60 XP",
      type: "Morfologiya",
    },
    {
      id: 'xotira-kartalari',
      number: 4,
      title: "Xotira Kartalari (Memory Match)",
      description: "Nisbatlar, mayllar va metodik usullarni ularning qisqa ta'riflari bilan juftlang.",
      icon: Brain,
      color: "from-rose-600 to-pink-600",
      xpReward: "50 XP",
      type: "Xotira & Mantiq",
    },
    {
      id: 'metodni-top',
      number: 5,
      title: "Metodni Top (Scenario Quest)",
      description: "Sinfdagi qiyin pedagogik vaziyatlarda to'g'ri metodik qaror qabul qilib, obro'ingizni oshiring!",
      icon: Compass,
      color: "from-amber-600 to-orange-600",
      xpReward: "60 XP",
      type: "Pedagogik vaziyatlar",
    },
    {
      id: 'nisbat-labirinti',
      number: 6,
      title: "Nisbat Labirinti (Voice Maze)",
      description: "Labirint darvozalarini to'g'ri fe'l nisbati kaliti bilan ochib, marraga yeting.",
      icon: Key,
      color: "from-teal-600 to-cyan-600",
      xpReward: "50 XP",
      type: "Labirint & Nisbatlar",
    },
    {
      id: 'xatolar-laboratoriyasi',
      number: 7,
      title: "Xatolar Laboratoriyasi (Error Lab)",
      description: "O'quvchi daftaridagi xatoni toping, tub sababini tashxis qiling va tuzatish rejasini bering.",
      icon: Stethoscope,
      color: "from-cyan-600 to-blue-700",
      xpReward: "60 XP",
      type: "Korreksiya & Tahlil",
    },
    {
      id: 'verb-wordle',
      number: 8,
      title: "Verb Wordle (Metodik topishmoq)",
      description: "Yashiringan metodik atama yoki fe'lni 6 urinishda rangli maslahatlar orqali toping.",
      icon: Grid,
      color: "from-indigo-600 to-purple-600",
      xpReward: "50 XP",
      type: "So'z o'yini",
    },
    {
      id: 'dars-rejasi-simulator',
      number: 9,
      title: "Dars Rejasi Simulyatori",
      description: "45 daqiqalik dars bosqichlarini pedagogik me'yorlar asosida to'g'ri taqsimlang va baho oling.",
      icon: FileSpreadsheet,
      color: "from-rose-600 to-red-600",
      xpReward: "50 XP",
      type: "Dars loyihalash",
    },
    {
      id: 'tez-javob',
      number: 10,
      title: "Tez Javob (Kahoot Blitz)",
      description: "10 ta savolga maksimal tezlikda javob bering, seriyali g'alabalar bilan rekord o'rnating!",
      icon: Zap,
      color: "from-purple-600 to-pink-600",
      xpReward: "100+ XP",
      type: "Ekspress viktorina",
    },
  ];

  const handleBackToGrid = () => {
    setActiveGameId(null);
    if (onClearActiveGame) onClearActiveGame();
  };

  if (activeGameId === 'fel-detektivi') return <FelDetektiviGame onBack={handleBackToGrid} />;
  if (activeGameId === 'zamon-poygasi') return <ZamonPoygasiGame onBack={handleBackToGrid} />;
  if (activeGameId === 'morfema-konstruktori') return <MorfemaKonstruktoriGame onBack={handleBackToGrid} />;
  if (activeGameId === 'xotira-kartalari') return <MemoryMatchGame onBack={handleBackToGrid} />;
  if (activeGameId === 'metodni-top') return <MetodniTopGame onBack={handleBackToGrid} />;
  if (activeGameId === 'nisbat-labirinti') return <NisbatLabirintiGame onBack={handleBackToGrid} />;
  if (activeGameId === 'xatolar-laboratoriyasi') return <XatolarLaboratoriyasiGame onBack={handleBackToGrid} />;
  if (activeGameId === 'verb-wordle') return <VerbWordleGame onBack={handleBackToGrid} />;
  if (activeGameId === 'dars-rejasi-simulator') return <DarsRejasiSimulatorGame onBack={handleBackToGrid} />;
  if (activeGameId === 'tez-javob') return <TezJavobKahootGame onBack={handleBackToGrid} />;

  return (
    <div className="space-y-8 py-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-teal-900 via-indigo-950 to-slate-900 text-white shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-500/20 text-teal-300 text-xs font-bold">
            <Gamepad2 className="w-4 h-4 text-teal-300" />
            <span>10 ta pedagogik o'yin</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black tracking-tight">
            {t.games.title}
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
            {t.games.subtitle}
          </p>
        </div>
        <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 text-center shrink-0">
          <p className="text-xs text-slate-300 font-medium">To'plangan umumiy XP:</p>
          <p className="text-2xl font-black text-amber-300 font-mono">
            {progress.xp} ball
          </p>
        </div>
      </div>

      {/* Grid of 10 Games */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {gamesCatalog.map((g) => {
          const Icon = g.icon;
          const highScore = progress.gameHighScores[g.id] || 0;
          const playCount = progress.gamePlayCounts[g.id] || 0;

          return (
            <div
              key={g.id}
              className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-indigo-500 shadow-sm hover:shadow-xl transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${g.color} text-white flex items-center justify-center shadow-md group-hover:scale-105 transition-transform`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                    {g.type}
                  </span>
                </div>

                <div className="text-[11px] font-extrabold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                  {g.number}-O'yin
                </div>
                <h3 className="font-extrabold text-lg text-slate-900 dark:text-white mt-0.5 mb-2">
                  {g.title}
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                  {g.description}
                </p>
              </div>

              <div>
                <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-500 mb-3 font-medium">
                  <span>Mukofot: {g.xpReward}</span>
                  {playCount > 0 ? (
                    <span className="text-amber-600 dark:text-amber-400 font-bold">
                      Rekord: {highScore} b. ({playCount} marta)
                    </span>
                  ) : (
                    <span className="text-slate-400">Hali o'ynalmagan</span>
                  )}
                </div>

                <button
                  onClick={() => setActiveGameId(g.id)}
                  className="w-full py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-indigo-600 hover:text-white text-slate-800 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-indigo-600 dark:hover:text-white text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>{t.games.start}</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
