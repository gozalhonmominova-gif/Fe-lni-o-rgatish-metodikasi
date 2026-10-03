import React from 'react';
import { Badge } from '../types';
import { useApp } from '../context/AppContext';
import { translations } from '../i18n/translations';
import { Trophy, X, Sparkles, Award } from 'lucide-react';

interface BadgeModalProps {
  badge: Badge | null;
  onClose: () => void;
}

export const BadgeModal: React.FC<BadgeModalProps> = ({ badge, onClose }) => {
  const { language } = useApp();
  const t = translations[language];

  if (!badge) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="w-full max-w-sm bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-2xl border border-amber-300 dark:border-amber-500/40 text-center relative overflow-hidden">
        {/* Glow backdrop */}
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-48 h-48 bg-amber-400/20 rounded-full blur-2xl pointer-events-none" />

        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="mx-auto w-20 h-20 rounded-2xl bg-gradient-to-tr from-amber-400 via-amber-500 to-yellow-300 p-0.5 shadow-xl shadow-amber-500/30 flex items-center justify-center mb-4 animate-bounce">
          <div className="w-full h-full bg-slate-900 rounded-[14px] flex items-center justify-center text-amber-400">
            <Trophy className="w-10 h-10" />
          </div>
        </div>

        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-950/80 text-amber-800 dark:text-amber-300 text-xs font-bold mb-2">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Yangi nishon ochildi!</span>
        </div>

        <h3 className="text-xl font-extrabold text-slate-900 dark:text-white mb-2">
          {badge.name[language]}
        </h3>

        <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
          {badge.description[language]}
        </p>

        <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/80 text-xs font-semibold text-indigo-600 dark:text-indigo-400 mb-6 flex items-center justify-center gap-2">
          <Award className="w-4 h-4" />
          <span>+50 Bonus XP qo'shildi!</span>
        </div>

        <button
          onClick={onClose}
          className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-indigo-600 hover:from-amber-600 hover:to-indigo-700 text-white font-bold text-sm shadow-lg shadow-indigo-500/25 transition-all cursor-pointer"
        >
          Qoyilmaqom, davom etamiz!
        </button>
      </div>
    </div>
  );
};
