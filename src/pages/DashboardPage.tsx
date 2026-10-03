import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { translations } from '../i18n/translations';
import { badgesData } from '../data/badgesData';
import { modulesData } from '../data/modulesData';
import {
  Trophy,
  Flame,
  Award,
  BarChart2,
  CheckCircle,
  AlertTriangle,
  RotateCcw,
  Sparkles,
  ArrowRight,
  User,
  Users
} from 'lucide-react';

interface DashboardProps {
  setCurrentTab: (tab: string) => void;
  openModule: (moduleId: number) => void;
}

export const DashboardPage: React.FC<DashboardProps> = ({ setCurrentTab, openModule }) => {
  const {
    language,
    progress,
    userLevel,
    levelProgressPercentage,
    nextLevelXp,
    setStudentName,
    resetProgress,
  } = useApp();
  const t = translations[language];

  const [nameInput, setNameInput] = useState(progress.studentName || '');
  const [showNameSaved, setShowNameSaved] = useState(false);
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  const handleSaveName = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nameInput.trim()) return;
    setStudentName(nameInput.trim());
    setShowNameSaved(true);
    setTimeout(() => setShowNameSaved(false), 2000);
  };

  // Mock local leaderboard
  const mockLeaderboard = [
    { rank: 1, name: "Zuhra Karimova", xp: 1840, level: "Professor", isUser: false },
    { rank: 2, name: progress.studentName || "Siz (Talaba)", xp: progress.xp, level: userLevel, isUser: true },
    { rank: 3, name: "Dilshod Bekov", xp: 1120, level: "Ustoz", isUser: false },
    { rank: 4, name: "Sevara Aliyeva", xp: 870, level: "Metodist", isUser: false },
    { rank: 5, name: "Jasur Rahimov", xp: 620, level: "Metodist", isUser: false },
  ].sort((a, b) => b.xp - a.xp).map((item, idx) => ({ ...item, rank: idx + 1 }));

  return (
    <div className="space-y-8 py-6 max-w-5xl mx-auto">
      {/* Top Profile Header */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-indigo-900 via-indigo-950 to-slate-900 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-3 text-center md:text-left">
          <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-indigo-500/20 text-indigo-300">
            {t.dashboard.title}
          </span>
          <div className="flex flex-col sm:flex-row sm:items-center gap-3">
            <h1 className="text-2xl sm:text-3xl font-black">
              {progress.studentName || t.user.guest}
            </h1>
            <span className="px-3 py-1 rounded-full text-xs font-black bg-amber-400 text-slate-950 font-mono">
              {userLevel}
            </span>
          </div>

          <form onSubmit={handleSaveName} className="flex items-center gap-2 max-w-sm">
            <input
              type="text"
              value={nameInput}
              onChange={(e) => setNameInput(e.target.value)}
              placeholder={t.user.namePlaceholder}
              className="px-3 py-1.5 rounded-xl bg-white/10 border border-white/20 text-xs text-white placeholder-slate-400 focus:outline-hidden focus:bg-white/20"
            />
            <button
              type="submit"
              className="px-3 py-1.5 rounded-xl bg-indigo-500 hover:bg-indigo-600 text-white font-bold text-xs"
            >
              {showNameSaved ? "Saqlandi!" : "Ismni saqlash"}
            </button>
          </form>
        </div>

        {/* Level Progress */}
        <div className="p-5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 w-full md:w-72 space-y-2">
          <div className="flex items-center justify-between text-xs font-bold">
            <span>{t.user.level}: {userLevel}</span>
            <span className="font-mono">{progress.xp} / {nextLevelXp} XP</span>
          </div>
          <div className="w-full h-2.5 bg-white/20 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-amber-400 to-teal-400 rounded-full transition-all duration-500"
              style={{ width: `${levelProgressPercentage}%` }}
            />
          </div>
          <p className="text-[11px] text-slate-300 text-right">
            Keyingi darajagacha {nextLevelXp - progress.xp} XP qoldi
          </p>
        </div>
      </div>

      {/* METRIC CARDS */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
          <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mb-2">
            <Trophy className="w-5 h-5" />
          </div>
          <span className="text-xs text-slate-500">{t.dashboard.totalXp}</span>
          <p className="text-2xl font-black font-mono text-slate-900 dark:text-white mt-0.5">
            {progress.xp}
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
          <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-950 text-amber-600 dark:text-amber-400 flex items-center justify-center mb-2">
            <Flame className="w-5 h-5 fill-amber-500" />
          </div>
          <span className="text-xs text-slate-500">{t.dashboard.activeStreak}</span>
          <p className="text-2xl font-black font-mono text-slate-900 dark:text-white mt-0.5">
            {progress.streak} kun
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
          <div className="w-10 h-10 rounded-xl bg-purple-50 dark:bg-purple-950 text-purple-600 dark:text-purple-400 flex items-center justify-center mb-2">
            <Award className="w-5 h-5" />
          </div>
          <span className="text-xs text-slate-500">{t.dashboard.unlockedBadges}</span>
          <p className="text-2xl font-black font-mono text-slate-900 dark:text-white mt-0.5">
            {progress.unlockedBadges.length} / {badgesData.length}
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-2">
            <CheckCircle className="w-5 h-5" />
          </div>
          <span className="text-xs text-slate-500">Tugallangan modullar</span>
          <p className="text-2xl font-black font-mono text-slate-900 dark:text-white mt-0.5">
            {progress.completedModules.length} / 7
          </p>
        </div>
      </div>

      {/* MODULE ACCURACY BREAKDOWN & WEAK TOPICS */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Module Accuracy Visual Bars */}
        <div className="lg:col-span-2 p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
          <h3 className="font-extrabold text-base text-slate-900 dark:text-white flex items-center gap-2">
            <BarChart2 className="w-5 h-5 text-indigo-600" />
            <span>{t.dashboard.moduleAccuracy}</span>
          </h3>

          <div className="space-y-3">
            {modulesData.map((m) => {
              const score = progress.moduleQuizScores[m.id] || 0;
              return (
                <div key={m.id} className="space-y-1">
                  <div className="flex items-center justify-between text-xs font-semibold">
                    <span className="text-slate-700 dark:text-slate-300">
                      {m.number}. {m.title[language]}
                    </span>
                    <span className="font-mono text-indigo-600 dark:text-indigo-400 font-bold">
                      {score}%
                    </span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        score >= 80
                          ? 'bg-emerald-500'
                          : score >= 50
                          ? 'bg-teal-500'
                          : score > 0
                          ? 'bg-amber-500'
                          : 'bg-slate-300 dark:bg-slate-700'
                      }`}
                      style={{ width: `${Math.max(4, score)}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Weak Topics & Recommendations */}
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col justify-between">
          <div className="space-y-3">
            <h3 className="font-extrabold text-base text-slate-900 dark:text-white flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-amber-500" />
              <span>{t.dashboard.weakTopicsTitle}</span>
            </h3>

            {progress.weakTopics.length > 0 ? (
              <div className="space-y-2">
                {progress.weakTopics.map((topicKey, idx) => {
                  const modId = parseInt(topicKey.replace('module_', '')) || 1;
                  const mod = modulesData.find((m) => m.id === modId);
                  return (
                    <div
                      key={idx}
                      className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900 text-xs"
                    >
                      <p className="font-bold text-amber-900 dark:text-amber-200">
                        {mod?.title[language] || topicKey}
                      </p>
                      <button
                        onClick={() => openModule(modId)}
                        className="mt-2 text-indigo-600 dark:text-indigo-400 font-bold hover:underline inline-flex items-center gap-1"
                      >
                        Qayta takrorlash →
                      </button>
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className="text-xs text-slate-500 leading-relaxed">
                {t.dashboard.weakTopicsEmpty}
              </p>
            )}
          </div>

          <div className="pt-4 border-t border-slate-100 dark:border-slate-800 mt-4">
            <button
              onClick={() => setCurrentTab('tests')}
              className="w-full py-2.5 rounded-xl bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-300 text-xs font-bold hover:bg-indigo-100"
            >
              Test topshirish markazi →
            </button>
          </div>
        </div>
      </div>

      {/* BADGES COLLECTION */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-indigo-600" />
            <h3 className="font-black text-lg text-slate-900 dark:text-white">
              {t.dashboard.unlockedBadges} ({progress.unlockedBadges.length} / {badgesData.length})
            </h3>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {badgesData.map((badge) => {
            const isUnlocked = progress.unlockedBadges.includes(badge.id);
            return (
              <div
                key={badge.id}
                className={`p-4 rounded-2xl border text-center flex flex-col items-center justify-center transition-all ${
                  isUnlocked
                    ? 'bg-amber-50/60 dark:bg-amber-950/20 border-amber-300 dark:border-amber-700/60 shadow-xs'
                    : 'bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-800 opacity-40'
                }`}
              >
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center text-lg mb-2 ${
                    isUnlocked
                      ? 'bg-amber-400 text-slate-950 shadow-md shadow-amber-400/20'
                      : 'bg-slate-300 dark:bg-slate-700 text-slate-500'
                  }`}
                >
                  <Award className="w-6 h-6" />
                </div>
                <h4 className="font-extrabold text-xs text-slate-900 dark:text-white line-clamp-1">
                  {badge.name[language]}
                </h4>
                <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
                  {badge.description[language]}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* LOCAL LEADERBOARD */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
        <div className="flex items-center gap-2 pb-3 border-b border-slate-100 dark:border-slate-800">
          <Users className="w-5 h-5 text-indigo-600" />
          <h3 className="font-black text-lg text-slate-900 dark:text-white">
            Talabalar Reytingi (Local Leaderboard)
          </h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="text-slate-400 uppercase font-bold text-[11px] border-b border-slate-100 dark:border-slate-800">
              <tr>
                <th className="py-2.5 px-3">O'rin</th>
                <th className="py-2.5 px-3">Talaba</th>
                <th className="py-2.5 px-3">Daraja</th>
                <th className="py-2.5 px-3 text-right">To'plangan XP</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {mockLeaderboard.map((item) => (
                <tr
                  key={item.rank}
                  className={`hover:bg-slate-50 dark:hover:bg-slate-850 ${
                    item.isUser ? 'bg-indigo-50/70 dark:bg-indigo-950/60 font-bold' : ''
                  }`}
                >
                  <td className="py-3 px-3 font-mono font-black">
                    {item.rank === 1 ? "🥇 1" : item.rank === 2 ? "🥈 2" : item.rank === 3 ? "🥉 3" : `#${item.rank}`}
                  </td>
                  <td className="py-3 px-3">
                    <span className={item.isUser ? 'text-indigo-600 dark:text-indigo-400 font-extrabold' : ''}>
                      {item.name} {item.isUser && "(Siz)"}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-slate-500 font-medium">
                    {item.level}
                  </td>
                  <td className="py-3 px-3 text-right font-mono font-bold text-indigo-600 dark:text-indigo-400">
                    {item.xp} XP
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* RESET PROGRESS OPTION */}
      <div className="pt-4 flex items-center justify-between text-xs border-t border-slate-200 dark:border-slate-800">
        <span className="text-slate-400">Tizim holati: Ma'lumotlar localStorage da saqlanadi.</span>
        {!showResetConfirm ? (
          <button
            onClick={() => setShowResetConfirm(true)}
            className="text-rose-500 hover:text-rose-700 font-bold"
          >
            {t.dashboard.resetProgress}
          </button>
        ) : (
          <div className="flex items-center gap-2">
            <span className="text-rose-600 font-bold">{t.dashboard.resetConfirm}</span>
            <button
              onClick={() => {
                resetProgress();
                setShowResetConfirm(false);
              }}
              className="px-2.5 py-1 bg-rose-600 text-white font-bold rounded-lg"
            >
              Ha, tozalash
            </button>
            <button
              onClick={() => setShowResetConfirm(false)}
              className="px-2.5 py-1 bg-slate-200 dark:bg-slate-700 font-bold rounded-lg"
            >
              Bekor qilish
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
