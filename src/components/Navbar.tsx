import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { translations } from '../i18n/translations';
import {
  BookOpen,
  Map,
  Gamepad2,
  CheckSquare,
  BarChart2,
  Award,
  Sparkles,
  Sun,
  Moon,
  Volume2,
  VolumeX,
  Menu,
  X,
  Flame,
  Wrench,
  BookMarked
} from 'lucide-react';

interface NavbarProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  openAiTutor: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentTab, setCurrentTab, openAiTutor }) => {
  const {
    language,
    setLanguage,
    theme,
    toggleTheme,
    soundEnabled,
    toggleSound,
    progress,
    userLevel
  } = useApp();

  const t = translations[language];
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: t.nav.home, icon: BookOpen },
    { id: 'roadmap', label: t.nav.roadmap, icon: Map },
    { id: 'games', label: t.nav.games, icon: Gamepad2 },
    { id: 'tests', label: t.nav.tests, icon: CheckSquare },
    { id: 'dashboard', label: t.nav.dashboard, icon: BarChart2 },
    { id: 'certificate', label: t.nav.certificate, icon: Award },
    { id: 'toolbox', label: t.nav.toolbox, icon: Wrench },
    { id: 'resources', label: t.nav.resources, icon: BookMarked },
  ];

  const handleNavClick = (tabId: string) => {
    setCurrentTab(tabId);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-white/90 dark:bg-slate-900/90 border-b border-slate-200 dark:border-slate-800 transition-colors shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo */}
          <div
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-teal-400 flex items-center justify-center text-white shadow-md shadow-indigo-500/20 group-hover:scale-105 transition-transform">
              <span className="font-extrabold text-xl font-mono">Fe'</span>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-lg text-slate-900 dark:text-white tracking-tight">
                  {t.appTitle}
                </span>
                <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded-sm bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300">
                  Pedagogika
                </span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 hidden sm:block truncate max-w-xs">
                Ona tili o'qitish metodikasi
              </p>
            </div>
          </div>

          {/* Desktop Nav Items */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-indigo-50 text-indigo-700 dark:bg-indigo-950/70 dark:text-indigo-300 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-indigo-600 dark:text-indigo-400' : ''}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Right Action Bar */}
          <div className="flex items-center gap-2">
            {/* AI Ustoz Trigger */}
            <button
              onClick={openAiTutor}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-indigo-600 to-teal-500 text-white text-xs sm:text-sm font-semibold shadow-md shadow-indigo-500/20 hover:opacity-95 hover:scale-102 transition-all cursor-pointer"
              title="AI Ustoz bilan suhbat"
            >
              <Sparkles className="w-4 h-4 animate-pulse text-amber-300" />
              <span>{t.nav.aiTutor}</span>
            </button>

            {/* Streak & XP Badge */}
            <div className="hidden sm:flex items-center gap-2 bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-xl text-xs font-semibold">
              <span className="flex items-center gap-1 text-amber-600 dark:text-amber-400" title="Streak">
                <Flame className="w-3.5 h-3.5 fill-amber-500" />
                {progress.streak} {t.user.streakDays}
              </span>
              <span className="w-px h-3.5 bg-slate-300 dark:bg-slate-700" />
              <span className="text-indigo-600 dark:text-indigo-400">
                {progress.xp} XP
              </span>
              <span className="px-1.5 py-0.5 rounded-md bg-indigo-50 dark:bg-indigo-900/60 text-indigo-700 dark:text-indigo-300 text-[10px] font-bold">
                {userLevel}
              </span>
            </div>

            {/* Sound Toggle */}
            <button
              onClick={toggleSound}
              className="p-2 rounded-lg text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              title={soundEnabled ? t.games.soundOn : t.games.soundOff}
              aria-label="Sound Toggle"
            >
              {soundEnabled ? <Volume2 className="w-4 h-4 text-teal-600 dark:text-teal-400" /> : <VolumeX className="w-4 h-4 text-slate-400" />}
            </button>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              title="Toggle Theme"
              aria-label="Theme Toggle"
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-amber-400" />
              ) : (
                <Moon className="w-4 h-4 text-slate-600" />
              )}
            </button>

            {/* Language Switcher */}
            <div className="flex items-center bg-slate-100 dark:bg-slate-800 p-0.5 rounded-lg border border-slate-200 dark:border-slate-700">
              <button
                onClick={() => setLanguage('uz')}
                className={`px-2 py-1 text-xs font-bold rounded-md transition-colors ${
                  language === 'uz'
                    ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-white shadow-xs'
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-900'
                }`}
                title="O'zbekcha"
              >
                🇺🇿 UZ
              </button>
              <button
                onClick={() => setLanguage('en')}
                className={`px-2 py-1 text-xs font-bold rounded-md transition-colors ${
                  language === 'en'
                    ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-white shadow-xs'
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-900'
                }`}
                title="English"
              >
                🇬🇧 EN
              </button>
              <button
                onClick={() => setLanguage('ru')}
                className={`px-2 py-1 text-xs font-bold rounded-md transition-colors ${
                  language === 'ru'
                    ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-white shadow-xs'
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-900'
                }`}
                title="Русский"
              >
                🇷🇺 RU
              </button>
            </div>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
              aria-label="Toggle navigation"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 px-4 pt-3 pb-6 space-y-2">
          <div className="flex items-center justify-between py-2 border-b border-slate-100 dark:border-slate-800 mb-2">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
              {progress.studentName ? progress.studentName : t.user.guest} ({userLevel})
            </span>
            <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400">
              {progress.xp} XP • {progress.streak} {t.user.streakDays}
            </span>
          </div>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-base font-medium transition-all ${
                  isActive
                    ? 'bg-indigo-50 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300'
                    : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'text-indigo-600' : 'text-slate-400'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
};
