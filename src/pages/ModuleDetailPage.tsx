import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { translations } from '../i18n/translations';
import { ModuleData } from '../types';
import { sound } from '../utils/sound';
import {
  ArrowLeft,
  Clock,
  Volume2,
  CheckCircle,
  HelpCircle,
  Gamepad2,
  BookOpen,
  Sparkles,
  Save,
  Check,
  ChevronRight,
  Bookmark
} from 'lucide-react';

interface ModuleDetailProps {
  module: ModuleData;
  onBack: () => void;
  openGame: (gameId: string) => void;
  openNextModule?: (nextId: number) => void;
}

export const ModuleDetailPage: React.FC<ModuleDetailProps> = ({
  module,
  onBack,
  openGame,
  openNextModule,
}) => {
  const { language, progress, completeModule, setQuizScore, saveReflectionNote } = useApp();
  const t = translations[language];

  const [activeLessonIdx, setActiveLessonIdx] = useState(0);
  const [reflectionInput, setReflectionInput] = useState(
    progress.reflectionNotes[module.id] || ''
  );
  const [reflectionSaved, setReflectionSaved] = useState(false);

  // Mini quiz state
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [quizScorePct, setQuizScorePct] = useState<number | null>(null);

  const activeLesson = module.lessons[activeLessonIdx] || module.lessons[0];

  const handleSpeech = (text: string) => {
    sound.speakText(text, language);
  };

  const handleSaveReflection = () => {
    if (!reflectionInput.trim()) return;
    saveReflectionNote(module.id, reflectionInput);
    setReflectionSaved(true);
    setTimeout(() => setReflectionSaved(false), 2500);
  };

  const handleQuizSelect = (questionId: string, optionId: string) => {
    if (quizSubmitted) return;
    sound.playClick();
    setSelectedAnswers((prev) => ({ ...prev, [questionId]: optionId }));
  };

  const handleQuizSubmit = () => {
    if (quizSubmitted) return;
    let correct = 0;
    module.checkQuiz.forEach((q) => {
      if (selectedAnswers[q.id] === q.correctAnswer) {
        correct++;
      }
    });

    const pct = Math.round((correct / module.checkQuiz.length) * 100);
    setQuizScorePct(pct);
    setQuizSubmitted(true);
    setQuizScore(module.id, pct);

    if (pct >= 50) {
      completeModule(module.id);
    }
  };

  return (
    <div className="space-y-8 py-6 max-w-4xl mx-auto">
      {/* Top Breadcrumb & Navigation */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-indigo-600 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{t.moduleDetail.backRoadmap}</span>
        </button>

        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-slate-400">
            {activeLessonIdx + 1} / {module.lessons.length} dars
          </span>
          <div className="w-24 h-2 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-indigo-600 rounded-full transition-all"
              style={{
                width: `${((activeLessonIdx + 1) / module.lessons.length) * 100}%`,
              }}
            />
          </div>
        </div>
      </div>

      {/* Module Title Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-indigo-900 to-slate-900 text-white shadow-xl relative overflow-hidden">
        <div className="relative z-10 space-y-2">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-extrabold uppercase tracking-wider bg-indigo-500/30 text-indigo-200 border border-indigo-400/20">
              {module.number}-Modul
            </span>
            <span className="flex items-center gap-1 text-xs text-slate-300">
              <Clock className="w-3.5 h-3.5" />
              {activeLesson.readTimeMinutes} {t.moduleDetail.readTime}
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black">
            {module.title[language]}
          </h1>
          <p className="text-xs sm:text-sm text-slate-300">
            {module.subtitle[language]}
          </p>
        </div>
      </div>

      {/* Lesson Stage Tabs (if multiple) */}
      {module.lessons.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-1">
          {module.lessons.map((les, idx) => (
            <button
              key={les.id}
              onClick={() => {
                setActiveLessonIdx(idx);
                sound.playClick();
              }}
              className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                activeLessonIdx === idx
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
                  : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-50'
              }`}
            >
              {les.title[language]}
            </button>
          ))}
        </div>
      )}

      {/* "Read in 2 minutes" Quick Summary */}
      <div className="p-5 rounded-2xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200/80 dark:border-amber-900/60 flex items-start gap-3.5">
        <Sparkles className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-black uppercase tracking-wider text-amber-900 dark:text-amber-200">
              2 daqiqada o'qiladigan xulosa (Quick Summary):
            </h4>
            <button
              onClick={() => handleSpeech(activeLesson.content.summary[language])}
              className="p-1 text-amber-700 dark:text-amber-400 hover:text-amber-900"
              title={t.moduleDetail.listenVoice}
            >
              <Volume2 className="w-4 h-4" />
            </button>
          </div>
          <p className="text-xs sm:text-sm text-amber-950 dark:text-amber-100/90 leading-relaxed font-medium">
            {activeLesson.content.summary[language]}
          </p>
        </div>
      </div>

      {/* LESSON SECTIONS & VISUAL EXAMPLES */}
      <div className="space-y-6">
        {activeLesson.content.sections.map((sec, idx) => (
          <div
            key={idx}
            className="p-6 sm:p-7 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-black text-slate-900 dark:text-white">
                {sec.heading[language]}
              </h3>
              <button
                onClick={() => handleSpeech(sec.body[language])}
                className="text-slate-400 hover:text-indigo-600 transition-colors"
                title="Tinglash"
              >
                <Volume2 className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              {sec.body[language]}
            </p>

            {/* Visual Morpheme Breakdown Example */}
            {sec.example && (
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-3">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                  Ko'rgazmali misol va morfemik tahlil:
                </span>
                <p className="text-base sm:text-lg font-bold text-slate-900 dark:text-white font-mono">
                  "{sec.example.uz}"
                </p>
                <p className="text-xs text-slate-500 italic">
                  {language === 'ru'
                    ? sec.example.translation.ru
                    : sec.example.translation.en}
                </p>

                {sec.example.morphemes && (
                  <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-200/60 dark:border-slate-700">
                    {sec.example.morphemes.map((m, mIdx) => (
                      <div
                        key={mIdx}
                        className="px-2.5 py-1.5 rounded-xl bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-xs"
                      >
                        <span className={`font-mono font-black ${m.color}`}>
                          {m.part}
                        </span>
                        <span className="text-[11px] text-slate-500 dark:text-slate-300 block">
                          {m.role}
                        </span>
                      </div>
                    ))}
                  </div>
                )}

                {sec.example.note && (
                  <p className="text-xs text-indigo-700 dark:text-indigo-300 font-medium">
                    📌 {sec.example.note[language]}
                  </p>
                )}
              </div>
            )}

            {/* Comparison Table */}
            {sec.table && (
              <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-700">
                <table className="w-full text-left border-collapse text-xs">
                  <thead className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold">
                    <tr>
                      {sec.table.headers.map((h, hIdx) => (
                        <th key={hIdx} className="p-3 border-b border-slate-200 dark:border-slate-700">
                          {h[language]}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                    {sec.table.rows.map((r, rIdx) => (
                      <tr key={rIdx} className="hover:bg-slate-50 dark:hover:bg-slate-850">
                        {r.map((c, cIdx) => (
                          <td key={cIdx} className="p-3 text-slate-800 dark:text-slate-200">
                            {c[language]}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* Method Highlight Callout */}
            {sec.methodHighlight && (
              <div className="p-4 rounded-2xl bg-indigo-50/60 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-900 space-y-1 text-xs">
                <span className="font-extrabold text-indigo-700 dark:text-indigo-300">
                  🎯 Pedagogik metod: {sec.methodHighlight.methodName}
                </span>
                <p className="text-slate-600 dark:text-slate-400">
                  <span className="font-semibold">Maqsad:</span> {sec.methodHighlight.goal[language]}
                </p>
                <p className="text-slate-700 dark:text-slate-300 font-medium">
                  <span className="font-semibold">Darsdagi tavsiya:</span> {sec.methodHighlight.classroomTip[language]}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* KEY TAKEAWAYS BOX */}
      <div className="p-6 rounded-3xl bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/60 space-y-3">
        <h4 className="font-black text-sm uppercase tracking-wider text-emerald-900 dark:text-emerald-300 flex items-center gap-2">
          <Bookmark className="w-4 h-4 text-emerald-600" />
          <span>{t.moduleDetail.keyTakeaways}</span>
        </h4>
        <ul className="space-y-2">
          {activeLesson.content.takeaways.map((take, tIdx) => (
            <li
              key={tIdx}
              className="text-xs sm:text-sm text-emerald-950 dark:text-emerald-100 flex items-start gap-2"
            >
              <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>{take[language]}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* "CHECK YOURSELF" MINI QUIZ */}
      <div className="p-6 sm:p-7 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-indigo-600" />
            <h3 className="font-black text-base sm:text-lg text-slate-900 dark:text-white">
              {t.moduleDetail.checkSelf}
            </h3>
          </div>
          {quizSubmitted && (
            <span
              className={`px-3 py-1 rounded-full text-xs font-bold ${
                quizScorePct! >= 70
                  ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                  : 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
              }`}
            >
              Natija: {quizScorePct}%
            </span>
          )}
        </div>

        <div className="space-y-6">
          {module.checkQuiz.map((q, qIdx) => (
            <div key={q.id} className="space-y-3">
              <p className="text-sm font-bold text-slate-900 dark:text-white">
                {qIdx + 1}. {q.question[language]}
              </p>
              <div className="space-y-2">
                {q.options?.map((opt) => {
                  const isSelected = selectedAnswers[q.id] === opt.id;
                  let btnStyle = 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-indigo-400';
                  if (quizSubmitted) {
                    if (opt.id === q.correctAnswer) {
                      btnStyle = 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-500 font-bold';
                    } else if (isSelected) {
                      btnStyle = 'bg-rose-50 dark:bg-rose-950/60 border-rose-500 font-bold';
                    }
                  } else if (isSelected) {
                    btnStyle = 'bg-indigo-50 dark:bg-indigo-950/70 border-indigo-600 ring-2 ring-indigo-500/20';
                  }

                  return (
                    <button
                      key={opt.id}
                      onClick={() => handleQuizSelect(q.id, opt.id)}
                      disabled={quizSubmitted}
                      className={`w-full p-3 rounded-xl border text-left text-xs sm:text-sm font-medium transition-all ${btnStyle}`}
                    >
                      {opt.text[language]}
                    </button>
                  );
                })}
              </div>

              {quizSubmitted && (
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/80 text-xs text-slate-600 dark:text-slate-300">
                  <span className="font-bold text-indigo-600 dark:text-indigo-400">Izoh: </span>
                  {q.explanation[language]}
                </div>
              )}
            </div>
          ))}
        </div>

        {!quizSubmitted ? (
          <button
            onClick={handleQuizSubmit}
            disabled={Object.keys(selectedAnswers).length < module.checkQuiz.length}
            className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 text-white font-bold text-sm shadow-md shadow-indigo-600/20 transition-all cursor-pointer"
          >
            Javoblarni tekshirish
          </button>
        ) : (
          <div className="p-3 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-center text-xs font-bold text-indigo-700 dark:text-indigo-300">
            Natija saqlandi! Ball profilingizga qo'shildi.
          </div>
        )}
      </div>

      {/* RECOMMENDED GAME CTA */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-teal-500 to-indigo-600 text-white shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-teal-100">
            Amaliy mustahkamlash
          </span>
          <h3 className="text-xl font-black mt-0.5">
            {t.moduleDetail.playGame}
          </h3>
          <p className="text-xs text-teal-100 max-w-md mt-1">
            Ushbu modul bo'yicha maxsus interaktiv o'yinni o'ynab, bilimlaringizni sinab ko'ring va XP to'plang!
          </p>
        </div>
        <button
          onClick={() => openGame(module.recommendedGameId)}
          className="px-6 py-3 rounded-2xl bg-white text-indigo-900 font-extrabold text-sm shadow-lg hover:bg-teal-50 transition-all shrink-0 cursor-pointer"
        >
          O'yinga kirish →
        </button>
      </div>

      {/* REFLECTION JOURNAL NOTE */}
      <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-3">
        <h4 className="font-extrabold text-sm text-slate-900 dark:text-white">
          {t.moduleDetail.reflectionTitle}
        </h4>
        <textarea
          rows={3}
          value={reflectionInput}
          onChange={(e) => setReflectionInput(e.target.value)}
          placeholder={t.moduleDetail.reflectionPlaceholder}
          className="w-full p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-hidden focus:border-indigo-500"
        />
        <div className="flex items-center justify-between">
          <span className="text-[11px] text-slate-400">
            Qaydlar brauzeringizda xavfsiz saqlanadi (+25 XP)
          </span>
          <button
            onClick={handleSaveReflection}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-xs transition-all cursor-pointer"
          >
            {reflectionSaved ? <Check className="w-3.5 h-3.5" /> : <Save className="w-3.5 h-3.5" />}
            <span>{reflectionSaved ? t.moduleDetail.reflectionSaved : t.moduleDetail.reflectionSave}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
