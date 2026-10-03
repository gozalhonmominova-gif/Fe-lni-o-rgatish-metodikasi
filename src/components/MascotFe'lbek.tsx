import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { translations } from '../i18n/translations';
import { sound } from '../utils/sound';
import { Sparkles, MessageCircle, X, Volume2 } from 'lucide-react';

interface MascotProps {
  customMessage?: string;
  mood?: 'happy' | 'thinking' | 'celebrate' | 'support';
}

export const MascotFelbek: React.FC<MascotProps> = ({ customMessage, mood = 'happy' }) => {
  const { language } = useApp();
  const t = translations[language];
  const [isOpen, setIsOpen] = useState(false);
  const [bubbleIndex, setBubbleIndex] = useState(0);

  const tips = [
    {
      uz: "Eslab qoling: O'zlik nisbatda ish-harakat subyektning o'ziga qaytadi: 'yuvindi', 'tarandi'.",
      en: "Remember: In Reflexive voice, the action reflects back onto the subject: 'yuvindi' (washed self).",
      ru: "Запомните: В возвратном залоге действие замыкается на самом субъекте: 'yuvindi' (умылся).",
    },
    {
      uz: "O'quvchilarga -yapti va -moqda qo'shimchalarini tushuntirganda, ikkalasi ham hozirgi zamon ekanini, -moqda ko'proq kitobiy uslubga xosligini ta'kidlang!",
      en: "When teaching -yapti vs -moqda, highlight that both are continuous present, but -moqda is literary/formal!",
      ru: "Объясняя -yapti и -moqda, подчеркните, что оба выражают настоящее время, но -moqda более книжный стиль!",
    },
    {
      uz: "Darsda o'qituvchi gapirish vaqtini (TTT) kamaytirib, o'quvchilarga ko'proq mustaqil tadqiqot bering!",
      en: "Reduce Teacher Talking Time (TTT) and let students discover grammar rules independently!",
      ru: "Сокращайте время речи учителя (TTT), давая учащимся возможность самим открывать правила!",
    },
    {
      uz: "Majhul nisbatli gaplarda vositasiz to'ldiruvchi grammatik egaga aylanadi: 'Dars o'tildi' (dars - ega).",
      en: "In passive voice constructions, the direct patient becomes the grammatical subject!",
      ru: "В страдательном залоге прямой объект становится грамматическим подлежащим!",
    }
  ];

  const currentTip = customMessage || tips[bubbleIndex % tips.length][language];

  const handleSpeak = () => {
    sound.speakText(currentTip, language);
  };

  const handleNextTip = () => {
    sound.playClick();
    setBubbleIndex((prev) => prev + 1);
  };

  return (
    <div className="fixed bottom-6 left-6 z-30 flex items-end gap-3 select-none">
      {/* Speech Bubble */}
      {isOpen && (
        <div className="w-72 sm:w-80 p-4 rounded-2xl bg-white dark:bg-slate-800 shadow-xl border border-indigo-100 dark:border-indigo-900/60 relative animate-in fade-in slide-in-from-bottom-2 duration-200">
          <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-100 dark:border-slate-700">
            <div className="flex items-center gap-1.5 text-xs font-bold text-indigo-600 dark:text-indigo-400">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>Fe'lbek (Metodik maslahatchi)</span>
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={handleSpeak}
                className="p-1 text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-300 transition-colors"
                title="Tinglash (TTS)"
              >
                <Volume2 className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
          <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
            {currentTip}
          </p>
          <div className="mt-3 flex items-center justify-between text-[11px]">
            <span className="text-slate-400">{t.mascot.quickTip}</span>
            <button
              onClick={handleNextTip}
              className="text-indigo-600 dark:text-indigo-400 font-bold hover:underline cursor-pointer"
            >
              Keyingi maslahat →
            </button>
          </div>
          {/* Arrow */}
          <div className="absolute -bottom-2 left-6 w-4 h-4 bg-white dark:bg-slate-800 border-r border-b border-indigo-100 dark:border-indigo-900/60 rotate-45 transform" />
        </div>
      )}

      {/* Mascot Avatar Button */}
      <button
        onClick={() => {
          setIsOpen(!isOpen);
          sound.playClick();
        }}
        className="group relative flex items-center justify-center focus:outline-hidden"
        title="Fe'lbek bilan suhbat"
        aria-label="Fe'lbek Mascot"
      >
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-amber-400 via-amber-500 to-indigo-600 p-0.5 shadow-lg shadow-indigo-500/25 group-hover:scale-108 transition-all duration-200">
          <div className="w-full h-full bg-slate-900 rounded-[14px] flex items-center justify-center overflow-hidden relative">
            {/* Animated Owl / Mascot Face SVG */}
            <svg
              className="w-10 h-10 transform group-hover:rotate-6 transition-transform"
              viewBox="0 0 100 100"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Ears / Cap */}
              <path d="M25 35 L40 18 L50 25 L60 18 L75 35" stroke="#f59e0b" strokeWidth="4" strokeLinecap="round" />
              <circle cx="50" cy="55" r="32" fill="#4f46e5" />
              <circle cx="50" cy="58" r="24" fill="#6366f1" />
              {/* Eyes */}
              <circle cx="40" cy="50" r="8" fill="#ffffff" />
              <circle cx="60" cy="50" r="8" fill="#ffffff" />
              <circle cx={mood === 'thinking' ? "42" : "41"} cy="50" r="4" fill="#0f172a" />
              <circle cx={mood === 'thinking' ? "62" : "59"} cy="50" r="4" fill="#0f172a" />
              <circle cx="43" cy="48" r="1.5" fill="#ffffff" />
              <circle cx="61" cy="48" r="1.5" fill="#ffffff" />
              {/* Beak / Smile */}
              <polygon points="50,56 45,63 55,63" fill="#f59e0b" />
              {/* Glasses for Teacher look */}
              <circle cx="40" cy="50" r="10" stroke="#f59e0b" strokeWidth="2.5" fill="none" />
              <circle cx="60" cy="50" r="10" stroke="#f59e0b" strokeWidth="2.5" fill="none" />
              <line x1="50" y1="50" x2="50" y2="50" stroke="#f59e0b" strokeWidth="2.5" />
            </svg>
          </div>
        </div>

        {/* Pulse badge if closed */}
        {!isOpen && (
          <span className="absolute -top-1 -right-1 flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-4 w-4 bg-teal-500 text-[9px] font-bold text-white items-center justify-center">
              ?
            </span>
          </span>
        )}
      </button>
    </div>
  );
};
