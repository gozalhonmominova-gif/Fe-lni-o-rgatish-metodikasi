import React from 'react';
import { useApp } from '../context/AppContext';
import { translations } from '../i18n/translations';
import { Heart, Sparkles, GraduationCap } from 'lucide-react';

export const Footer: React.FC<{ setCurrentTab: (tab: string) => void }> = ({ setCurrentTab }) => {
  const { language } = useApp();
  const t = translations[language];

  return (
    <footer className="w-full border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 py-10 px-4 sm:px-6 lg:px-8 mt-16 text-slate-600 dark:text-slate-400">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center text-white font-mono font-bold text-sm">
            Fe'
          </div>
          <div>
            <p className="font-bold text-slate-900 dark:text-white text-sm">
              {t.appTitle}
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-500">
              Oliy pedagogik ta'lim: Ona tili o'qitish metodikasi
            </p>
          </div>
        </div>

        {/* Quick Nav Links */}
        <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-medium">
          <button
            onClick={() => setCurrentTab('roadmap')}
            className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
          >
            {t.nav.roadmap}
          </button>
          <span>•</span>
          <button
            onClick={() => setCurrentTab('games')}
            className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
          >
            {t.nav.games}
          </button>
          <span>•</span>
          <button
            onClick={() => setCurrentTab('tests')}
            className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
          >
            {t.nav.tests}
          </button>
          <span>•</span>
          <button
            onClick={() => setCurrentTab('toolbox')}
            className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
          >
            {t.nav.toolbox}
          </button>
          <span>•</span>
          <button
            onClick={() => setCurrentTab('resources')}
            className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
          >
            {t.nav.resources}
          </button>
        </div>

        {/* Academic Note */}
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <GraduationCap className="w-4 h-4 text-indigo-500" />
          <span>Bo'lajak ona tili o'qituvchilari uchun</span>
        </div>
      </div>
      <div className="max-w-7xl mx-auto mt-6 pt-6 border-t border-slate-100 dark:border-slate-800/80 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-400 gap-2">
        <p>
          © {new Date().getFullYear()} Fe'l Metodikasi Interactive Platform. All rights reserved.
        </p>
        <p className="flex items-center gap-1">
          Made with <Heart className="w-3 h-3 text-rose-500 fill-rose-500" /> for pedagogical excellence & innovation
        </p>
      </div>
    </footer>
  );
};
