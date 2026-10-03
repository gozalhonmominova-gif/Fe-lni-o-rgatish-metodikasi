import React from 'react';
import { useApp } from '../context/AppContext';
import { translations } from '../i18n/translations';
import {
  BookOpen,
  Gamepad2,
  CheckCircle,
  Award,
  Sparkles,
  ArrowRight,
  Flame,
  Volume2,
  CheckSquare,
  GraduationCap,
  Layers,
  Wrench
} from 'lucide-react';
import { sound } from '../utils/sound';

interface HomePageProps {
  setCurrentTab: (tab: string) => void;
  openModule: (moduleId: number) => void;
  openAiTutor: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  setCurrentTab,
  openModule,
  openAiTutor,
}) => {
  const { language, progress, userLevel } = useApp();
  const t = translations[language];

  const handleSpeakWordOfTheDay = () => {
    sound.speakText("O'qitmoq. O'qitmoq — orttirma nisbat shaklidagi harakat nomi.", language);
  };

  return (
    <div className="space-y-16 py-6 sm:py-10">
      {/* HERO SECTION */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-900 via-indigo-950 to-slate-950 text-white p-6 sm:p-12 lg:p-16 shadow-2xl border border-indigo-800/40">
        {/* Glow blur backgrounds */}
        <div className="absolute -top-32 -left-32 w-80 h-80 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-32 -right-32 w-80 h-80 bg-teal-500/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto text-center space-y-6">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-300 text-xs sm:text-sm font-semibold backdrop-blur-md">
            <Sparkles className="w-4 h-4 text-amber-300 animate-spin" />
            <span>{t.hero.badge}</span>
          </div>

          {/* Headline */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight sm:leading-tight">
            {t.hero.titleStart}{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-teal-300 to-indigo-300 underline decoration-indigo-500 decoration-wavy decoration-2">
              {t.hero.titleHighlight}
            </span>{' '}
            {t.hero.titleEnd}
          </h1>

          {/* Description */}
          <p className="text-sm sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            {t.hero.description}
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              onClick={() => setCurrentTab('roadmap')}
              className="flex items-center gap-2 px-7 py-3.5 rounded-2xl bg-gradient-to-r from-indigo-500 via-indigo-600 to-teal-500 hover:from-indigo-600 hover:to-teal-600 text-white font-extrabold text-sm sm:text-base shadow-xl shadow-indigo-500/30 hover:scale-102 transition-all cursor-pointer"
            >
              <span>{t.hero.startBtn}</span>
              <ArrowRight className="w-5 h-5" />
            </button>
            <button
              onClick={() => setCurrentTab('games')}
              className="flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-white/10 hover:bg-white/15 text-white font-bold text-sm sm:text-base backdrop-blur-md border border-white/20 transition-all cursor-pointer"
            >
              <Gamepad2 className="w-5 h-5 text-teal-300" />
              <span>{t.hero.gamesBtn}</span>
            </button>
            <button
              onClick={() => setCurrentTab('tests')}
              className="flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-white/10 hover:bg-white/15 text-white font-bold text-sm sm:text-base backdrop-blur-md border border-white/20 transition-all cursor-pointer"
            >
              <CheckSquare className="w-5 h-5 text-amber-300" />
              <span>{t.hero.testBtn}</span>
            </button>
          </div>

          {/* Animated Verb Cloud */}
          <div className="pt-6">
            <p className="text-xs uppercase font-extrabold tracking-widest text-slate-400 mb-3">
              Fe'l so'zlari buluti:
            </p>
            <div className="flex flex-wrap justify-center gap-2 sm:gap-2.5 max-w-2xl mx-auto">
              {t.hero.verbCloud.map((word, idx) => (
                <span
                  key={idx}
                  onClick={() => sound.speakText(word, language)}
                  className="px-3 py-1 rounded-xl bg-white/5 hover:bg-white/15 border border-white/10 text-xs sm:text-sm font-mono font-medium text-indigo-200 cursor-pointer transition-colors"
                  title="Tinglash uchun bosing"
                >
                  {word}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* STATS STRIP */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
            <BookOpen className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">7 ta</p>
            <p className="text-xs text-slate-500 font-medium">{t.hero.stats.modules}</p>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-teal-50 dark:bg-teal-950/60 text-teal-600 dark:text-teal-400 flex items-center justify-center shrink-0">
            <Gamepad2 className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">10 xil</p>
            <p className="text-xs text-slate-500 font-medium">{t.hero.stats.games}</p>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
            <CheckCircle className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">100+</p>
            <p className="text-xs text-slate-500 font-medium">{t.hero.stats.questions}</p>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 flex items-center justify-center shrink-0">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">15 ta</p>
            <p className="text-xs text-slate-500 font-medium">{t.hero.stats.badges}</p>
          </div>
        </div>
      </section>

      {/* VERB OF THE DAY & QUICK RESUME */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Verb of the day */}
        <div className="lg:col-span-2 p-6 sm:p-8 rounded-3xl bg-gradient-to-tr from-indigo-50/70 to-teal-50/70 dark:from-slate-900 dark:to-slate-850 border border-indigo-100 dark:border-indigo-900/60 shadow-sm">
          <div className="flex items-center justify-between pb-3 border-b border-indigo-200/50 dark:border-slate-800">
            <span className="flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
              <Sparkles className="w-4 h-4 text-amber-500" />
              {t.hero.verbOfTheDay.title}
            </span>
            <button
              onClick={handleSpeakWordOfTheDay}
              className="flex items-center gap-1 text-xs font-bold text-slate-600 dark:text-slate-300 hover:text-indigo-600"
            >
              <Volume2 className="w-4 h-4" />
              <span>Ovoz berish</span>
            </button>
          </div>

          <div className="mt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-3xl font-black text-slate-900 dark:text-white font-mono">
                {t.hero.verbOfTheDay.word}
              </h3>
              <p className="text-xs font-mono font-bold text-teal-700 dark:text-teal-400 mt-1">
                Morfema tahlili: {t.hero.verbOfTheDay.morpheme}
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Kategoriya: {t.hero.verbOfTheDay.type}
              </p>
            </div>
            <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-800 border border-indigo-100 dark:border-indigo-950 max-w-sm text-xs leading-relaxed text-slate-700 dark:text-slate-300 shadow-xs">
              <span className="font-bold text-indigo-600 dark:text-indigo-400 block mb-1">
                Pedagogik usul:
              </span>
              {t.hero.verbOfTheDay.methodTip}
            </div>
          </div>
        </div>

        {/* Current Student Profile Status */}
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-1">
              Sizning holatingiz
            </span>
            <div className="flex items-center justify-between mt-2">
              <span className="font-extrabold text-xl text-slate-900 dark:text-white">
                {progress.studentName ? progress.studentName : t.user.guest}
              </span>
              <span className="px-2.5 py-1 rounded-full text-xs font-black bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300">
                {userLevel}
              </span>
            </div>
            <div className="mt-4 space-y-2">
              <div className="flex items-center justify-between text-xs font-semibold">
                <span className="text-slate-500">Umumiy XP:</span>
                <span className="text-indigo-600 dark:text-indigo-400 font-mono font-bold">
                  {progress.xp} ball
                </span>
              </div>
              <div className="flex items-center justify-between text-xs font-semibold">
                <span className="text-slate-500">Faollik zanjiri:</span>
                <span className="flex items-center gap-1 text-amber-600 font-bold">
                  <Flame className="w-3.5 h-3.5 fill-amber-500" />
                  {progress.streak} kun
                </span>
              </div>
              <div className="flex items-center justify-between text-xs font-semibold">
                <span className="text-slate-500">O'zlashtirilgan modullar:</span>
                <span className="text-emerald-600 font-bold">
                  {progress.completedModules.length} / 7
                </span>
              </div>
            </div>
          </div>

          <button
            onClick={() => setCurrentTab('roadmap')}
            className="w-full mt-6 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-indigo-600 dark:text-indigo-400 text-xs font-extrabold transition-all"
          >
            O'qishni davom ettirish →
          </button>
        </div>
      </section>

      {/* QUICK FEATURE TILES */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
          Platformaning asosiy bo'limlari
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {/* Card 1 */}
          <div
            onClick={() => setCurrentTab('roadmap')}
            className="group p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-indigo-500 dark:hover:border-indigo-500 shadow-sm hover:shadow-xl transition-all cursor-pointer"
          >
            <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
              <BookOpen className="w-6 h-6" />
            </div>
            <h3 className="font-extrabold text-lg text-slate-900 dark:text-white mb-1">
              7 Modulli o'quv dasturi
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mb-4">
              Fe'l grammatikasidan dars loyihalash va o'quvchilar xatolarini bartaraf etishgacha bosqichma-bosqich qo'llanma.
            </p>
            <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 group-hover:translate-x-1 inline-flex items-center gap-1 transition-transform">
              Yo'l xaritasini ochish →
            </span>
          </div>

          {/* Card 2 */}
          <div
            onClick={() => setCurrentTab('games')}
            className="group p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-teal-500 dark:hover:border-teal-500 shadow-sm hover:shadow-xl transition-all cursor-pointer"
          >
            <div className="w-12 h-12 rounded-2xl bg-teal-50 dark:bg-teal-950/60 text-teal-600 dark:text-teal-400 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
              <Gamepad2 className="w-6 h-6" />
            </div>
            <h3 className="font-extrabold text-lg text-slate-900 dark:text-white mb-1">
              10 ta Pedagogik o'yin
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mb-4">
              Fe'l detektivi, Zamon poygasi, Morfema konstruktori, Nisbat labirinti kabi qiziqarli o'yinlarda mashq qiling.
            </p>
            <span className="text-xs font-bold text-teal-600 dark:text-teal-400 group-hover:translate-x-1 inline-flex items-center gap-1 transition-transform">
              O'yin maydoniga kirish →
            </span>
          </div>

          {/* Card 3 */}
          <div
            onClick={() => setCurrentTab('toolbox')}
            className="group p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-purple-500 dark:hover:border-purple-500 shadow-sm hover:shadow-xl transition-all cursor-pointer"
          >
            <div className="w-12 h-12 rounded-2xl bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
              <Wrench className="w-6 h-6" />
            </div>
            <h3 className="font-extrabold text-lg text-slate-900 dark:text-white mb-1">
              O'qituvchi konstruktori
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mb-4">
              45 daqiqalik dars ishlanmasi (konspekt) tuzing, mezonli baholash rubrikalarini yuklab oling.
            </p>
            <span className="text-xs font-bold text-purple-600 dark:text-purple-400 group-hover:translate-x-1 inline-flex items-center gap-1 transition-transform">
              Xazinani ko'rish →
            </span>
          </div>
        </div>
      </section>
    </div>
  );
};
