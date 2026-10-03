import React from 'react';
import { useApp } from '../context/AppContext';
import { translations } from '../i18n/translations';
import { modulesData } from '../data/modulesData';
import {
  CheckCircle,
  Lock,
  ArrowRight,
  Sparkles,
  Clock,
  BookOpen,
  Award,
  ChevronRight
} from 'lucide-react';

interface LearningPathProps {
  openModule: (moduleId: number) => void;
  setCurrentTab: (tab: string) => void;
}

export const LearningPathPage: React.FC<LearningPathProps> = ({ openModule, setCurrentTab }) => {
  const { language, progress } = useApp();
  const t = translations[language];

  const totalModules = modulesData.length;
  const completedCount = progress.completedModules.length;
  const overallPercentage = Math.round((completedCount / totalModules) * 100);

  return (
    <div className="space-y-10 py-6 sm:py-8 max-w-5xl mx-auto">
      {/* Header & Overall progress */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-indigo-900 via-indigo-950 to-slate-900 text-white shadow-xl border border-indigo-800/40 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center md:text-left">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-bold">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Bosqichma-bosqich yo'l xaritasi</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black tracking-tight">
            {t.roadmap.title}
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
            {t.roadmap.subtitle}
          </p>
        </div>

        {/* Circular Progress Ring */}
        <div className="flex items-center gap-4 bg-white/10 backdrop-blur-md px-6 py-4 rounded-2xl border border-white/15">
          <div className="relative w-16 h-16 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
              <path
                className="text-white/20"
                strokeWidth="3.5"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <path
                className="text-teal-400 transition-all duration-700"
                strokeDasharray={`${overallPercentage}, 100`}
                strokeWidth="3.5"
                strokeLinecap="round"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
            </svg>
            <span className="absolute text-xs font-black font-mono text-white">
              {overallPercentage}%
            </span>
          </div>
          <div>
            <p className="text-xs text-slate-300 font-semibold">{t.roadmap.progress}</p>
            <p className="text-lg font-bold text-white font-mono">
              {completedCount} / {totalModules} modul
            </p>
          </div>
        </div>
      </div>

      {/* ROADMAP TIMELINE TILES */}
      <div className="relative space-y-6">
        {/* Connecting line */}
        <div className="absolute left-6 sm:left-8 top-10 bottom-10 w-1 bg-gradient-to-b from-indigo-500 via-teal-500 to-slate-300 dark:to-slate-800 -z-0 rounded-full hidden sm:block" />

        {modulesData.map((module, idx) => {
          const isCompleted = progress.completedModules.includes(module.id);
          // Module 1 is always unlocked. Next modules unlock if previous is completed.
          const isUnlocked = idx === 0 || progress.completedModules.includes(modulesData[idx - 1].id);
          const quizScore = progress.moduleQuizScores[module.id];

          return (
            <div
              key={module.id}
              className={`relative z-10 flex flex-col sm:flex-row items-start gap-4 p-5 sm:p-6 rounded-3xl border transition-all ${
                isUnlocked
                  ? 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 shadow-md hover:shadow-xl hover:border-indigo-400 dark:hover:border-indigo-600'
                  : 'bg-slate-100/70 dark:bg-slate-900/40 border-slate-200/50 dark:border-slate-800/40 opacity-70'
              }`}
            >
              {/* Node Badge */}
              <div
                className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center font-black text-lg shrink-0 shadow-md transition-transform ${
                  isCompleted
                    ? 'bg-emerald-500 text-white'
                    : isUnlocked
                    ? 'bg-gradient-to-tr from-indigo-600 to-teal-500 text-white'
                    : 'bg-slate-300 dark:bg-slate-800 text-slate-500'
                }`}
              >
                {isCompleted ? (
                  <CheckCircle className="w-7 h-7" />
                ) : isUnlocked ? (
                  <span>{module.number}</span>
                ) : (
                  <Lock className="w-6 h-6" />
                )}
              </div>

              {/* Module Content */}
              <div className="flex-1 space-y-2">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                      {module.number}-Modul
                    </span>
                    <span className="flex items-center gap-1 text-[11px] text-slate-400">
                      <Clock className="w-3 h-3" />
                      {module.estimatedMinutes} daqiqa
                    </span>
                  </div>

                  {/* Status badges */}
                  {isCompleted ? (
                    <span className="px-2.5 py-1 rounded-full text-xs font-extrabold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 flex items-center gap-1">
                      <CheckCircle className="w-3.5 h-3.5" />
                      <span>{t.roadmap.completed}</span>
                      {quizScore !== undefined && <span>({quizScore}%)</span>}
                    </span>
                  ) : !isUnlocked ? (
                    <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-slate-200 text-slate-600 dark:bg-slate-800 dark:text-slate-400 flex items-center gap-1">
                      <Lock className="w-3 h-3" />
                      <span>{t.roadmap.locked}</span>
                    </span>
                  ) : null}
                </div>

                <h3 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white">
                  {module.title[language]}
                </h3>

                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  {module.subtitle[language]}
                </p>

                {/* Bottom interactive action */}
                <div className="pt-2 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-3 text-xs text-slate-500 font-medium">
                    <span>{module.lessons.length} ta dars bosqichi</span>
                    <span>•</span>
                    <span>Nazorat quiz savollari</span>
                  </div>

                  <button
                    onClick={() => isUnlocked && openModule(module.id)}
                    disabled={!isUnlocked}
                    className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                      isUnlocked
                        ? 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-md shadow-indigo-600/20 cursor-pointer active:scale-98'
                        : 'bg-slate-200 dark:bg-slate-800 text-slate-400 cursor-not-allowed'
                    }`}
                  >
                    <span>
                      {isCompleted
                        ? "Qayta ko'rish"
                        : isUnlocked
                        ? t.roadmap.startModule
                        : t.roadmap.locked}
                    </span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
