import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { translations } from '../i18n/translations';
import { preTestQuestions, finalExamQuestions } from '../data/questionsData';
import { modulesData } from '../data/modulesData';
import { Question } from '../types';
import { sound } from '../utils/sound';
import {
  CheckSquare,
  Clock,
  HelpCircle,
  Trophy,
  AlertCircle,
  CheckCircle,
  RotateCcw,
  Award,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  BookOpen
} from 'lucide-react';

interface TestCenterProps {
  setCurrentTab: (tab: string) => void;
  openModule: (moduleId: number) => void;
}

export const TestCenterPage: React.FC<TestCenterProps> = ({ setCurrentTab, openModule }) => {
  const {
    language,
    progress,
    savePreTestScore,
    saveFinalExamScore,
    setQuizScore,
    addXp,
    triggerConfetti,
  } = useApp();
  const t = translations[language];

  // Active test mode
  const [activeMode, setActiveMode] = useState<'idle' | 'pre-test' | 'final-exam' | 'module-quiz'>('idle');
  const [activeModuleId, setActiveModuleId] = useState<number>(1);
  const [currentQuestions, setCurrentQuestions] = useState<Question[]>([]);
  const [currentQIdx, setCurrentQIdx] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<string, string>>({});
  const [hintsUsed, setHintsUsed] = useState<Record<string, boolean>>({});
  const [timeLeft, setTimeLeft] = useState(1800); // 30 mins for final
  const [showExplanation, setShowExplanation] = useState(false);
  const [testResult, setTestResult] = useState<{
    total: number;
    correct: number;
    scorePct: number;
    grade: string;
    passed: boolean;
    mistakeIds: string[];
  } | null>(null);
  const [reviewMode, setReviewMode] = useState(false);

  // Timer for Final Exam
  useEffect(() => {
    if (activeMode !== 'final-exam' || testResult !== null) return;
    if (timeLeft <= 0) {
      handleSubmitTest();
      return;
    }
    const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft, activeMode, testResult]);

  const startPreTest = () => {
    setActiveMode('pre-test');
    setCurrentQuestions(preTestQuestions);
    setCurrentQIdx(0);
    setUserAnswers({});
    setHintsUsed({});
    setShowExplanation(false);
    setTestResult(null);
    setReviewMode(false);
    sound.playClick();
  };

  const startFinalExam = () => {
    setActiveMode('final-exam');
    // Shuffle & take 30
    const shuffled = [...finalExamQuestions].sort(() => Math.random() - 0.5).slice(0, 30);
    setCurrentQuestions(shuffled);
    setCurrentQIdx(0);
    setUserAnswers({});
    setHintsUsed({});
    setTimeLeft(1800);
    setShowExplanation(false);
    setTestResult(null);
    setReviewMode(false);
    sound.playClick();
  };

  const startModuleQuiz = (modId: number) => {
    setActiveMode('module-quiz');
    setActiveModuleId(modId);
    const targetModule = modulesData.find((m) => m.id === modId);
    if (!targetModule) return;
    setCurrentQuestions(targetModule.checkQuiz);
    setCurrentQIdx(0);
    setUserAnswers({});
    setHintsUsed({});
    setShowExplanation(false);
    setTestResult(null);
    setReviewMode(false);
    sound.playClick();
  };

  const handleSelectOption = (qId: string, optId: string) => {
    if (showExplanation && !reviewMode) return;
    sound.playClick();
    setUserAnswers((prev) => ({ ...prev, [qId]: optId }));
    setShowExplanation(true);
  };

  const handleUseHint = (qId: string) => {
    if (hintsUsed[qId]) return;
    setHintsUsed((prev) => ({ ...prev, [qId]: true }));
    addXp(-5); // costs 5 XP
    sound.playClick();
  };

  const handleNextQuestion = () => {
    setShowExplanation(false);
    if (currentQIdx + 1 < currentQuestions.length) {
      setCurrentQIdx((prev) => prev + 1);
    } else {
      handleSubmitTest();
    }
  };

  const handlePrevQuestion = () => {
    setShowExplanation(false);
    if (currentQIdx > 0) {
      setCurrentQIdx((prev) => prev - 1);
    }
  };

  const handleSubmitTest = () => {
    let correct = 0;
    const mistakes: string[] = [];

    currentQuestions.forEach((q) => {
      const ans = userAnswers[q.id];
      if (ans === q.correctAnswer) {
        correct++;
      } else {
        mistakes.push(q.id);
      }
    });

    const total = currentQuestions.length;
    const scorePct = Math.round((correct / total) * 100);
    const passed = scorePct >= 70;

    let grade = "2 (Qoniqarsiz)";
    if (scorePct >= 86) grade = "5 (A'lo)";
    else if (scorePct >= 71) grade = "4 (Yaxshi)";
    else if (scorePct >= 55) grade = "3 (Qoniqarli)";

    setTestResult({
      total,
      correct,
      scorePct,
      grade,
      passed,
      mistakeIds: mistakes,
    });

    if (activeMode === 'pre-test') {
      savePreTestScore(scorePct);
    } else if (activeMode === 'final-exam') {
      saveFinalExamScore(scorePct);
    } else if (activeMode === 'module-quiz') {
      setQuizScore(activeModuleId, scorePct);
    }

    if (passed) {
      sound.playFanfare();
      triggerConfetti();
    } else {
      sound.playWrong();
    }
  };

  const currentQ = currentQuestions[currentQIdx];

  return (
    <div className="space-y-8 py-6 max-w-4xl mx-auto">
      {/* Test Center Home */}
      {activeMode === 'idle' && (
        <div className="space-y-8">
          {/* Header */}
          <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-indigo-900 to-slate-900 text-white shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-bold">
                <CheckSquare className="w-4 h-4 text-amber-300" />
                <span>Baholash va attestatsiya markazi</span>
              </div>
              <h1 className="text-2xl sm:text-4xl font-black">
                {t.tests.title}
              </h1>
              <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
                {t.tests.subtitle}
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 text-center shrink-0">
              <p className="text-xs text-slate-300 font-medium">Yakuniy imtihon:</p>
              <p className="text-xl font-black font-mono mt-0.5 text-teal-300">
                {progress.finalExamPassed
                  ? `O'tilgan (${progress.finalExamScore}%)`
                  : "Topshirilmagan"}
              </p>
            </div>
          </div>

          {/* 2 Primary Test Cards: Pre-test & Final Exam */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Pre-Test Card */}
            <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-teal-600 dark:text-teal-400">
                  Kirish tashxisi
                </span>
                <h3 className="text-xl font-black text-slate-900 dark:text-white">
                  {t.tests.preTestTitle}
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  {t.tests.preTestDesc}
                </p>
                {progress.preTestScore !== null && (
                  <div className="pt-2 text-xs font-bold text-teal-600 dark:text-teal-400">
                    Oxirgi natija: {progress.preTestScore}%
                  </div>
                )}
              </div>

              <button
                onClick={startPreTest}
                className="w-full py-3 px-4 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-sm shadow-md shadow-teal-600/20 transition-all cursor-pointer"
              >
                {progress.preTestScore !== null ? "Qayta topshirish" : t.tests.startTest}
              </button>
            </div>

            {/* Final Certification Exam Card */}
            <div className="p-6 rounded-3xl bg-gradient-to-tr from-indigo-900 to-indigo-950 text-white border border-indigo-800/60 shadow-xl flex flex-col justify-between space-y-4 relative overflow-hidden">
              <div className="space-y-2 relative z-10">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-amber-300">
                    Davlat standarti uslubida
                  </span>
                  <Award className="w-6 h-6 text-amber-400" />
                </div>
                <h3 className="text-xl font-black">
                  {t.tests.finalExamTitle}
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {t.tests.finalExamDesc}
                </p>
                {progress.finalExamPassed && (
                  <div className="pt-1 text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                    <CheckCircle className="w-4 h-4" />
                    <span>Malaka sertifikati ochilgan ({progress.finalExamScore}%)</span>
                  </div>
                )}
              </div>

              <button
                onClick={startFinalExam}
                className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-slate-950 font-black text-sm shadow-lg shadow-amber-500/20 transition-all cursor-pointer relative z-10"
              >
                {t.tests.startFinal}
              </button>
            </div>
          </div>

          {/* Module Checkpoints List */}
          <div className="space-y-4">
            <h3 className="text-lg font-black text-slate-900 dark:text-white">
              {t.tests.moduleQuizzesTitle}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {modulesData.map((m) => {
                const score = progress.moduleQuizScores[m.id];
                const isPassed = score !== undefined && score >= 50;

                return (
                  <div
                    key={m.id}
                    className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col justify-between"
                  >
                    <div>
                      <span className="text-[10px] font-extrabold uppercase text-indigo-600 dark:text-indigo-400">
                        {m.number}-Modul
                      </span>
                      <h4 className="font-extrabold text-sm text-slate-900 dark:text-white mt-0.5 line-clamp-1">
                        {m.title[language]}
                      </h4>
                      <p className="text-[11px] text-slate-500 mt-1">
                        {m.checkQuiz.length} ta savol
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                      {score !== undefined ? (
                        <span className={`text-xs font-bold ${isPassed ? 'text-emerald-600' : 'text-amber-600'}`}>
                          Natija: {score}%
                        </span>
                      ) : (
                        <span className="text-xs text-slate-400">Topshirilmagan</span>
                      )}
                      <button
                        onClick={() => startModuleQuiz(m.id)}
                        className="px-3 py-1.5 rounded-lg bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-300 text-xs font-bold hover:bg-indigo-100"
                      >
                        Topshirish
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* ACTIVE TEST INTERFACE */}
      {activeMode !== 'idle' && !testResult && currentQ && (
        <div className="space-y-6 bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl shadow-xl border border-slate-200 dark:border-slate-800">
          {/* Header bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                {activeMode === 'pre-test'
                  ? t.tests.preTestTitle
                  : activeMode === 'final-exam'
                  ? t.tests.finalExamTitle
                  : `${activeModuleId}-Modul nazorat testi`}
              </span>
              <p className="text-sm font-black text-slate-900 dark:text-white">
                {t.tests.question} {currentQIdx + 1} {t.tests.of} {currentQuestions.length}
              </p>
            </div>

            <div className="flex items-center gap-3">
              {activeMode === 'final-exam' && (
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400 font-mono font-bold text-xs">
                  <Clock className="w-4 h-4" />
                  <span>
                    {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
                  </span>
                </div>
              )}
              {currentQ.hint && (
                <button
                  onClick={() => handleUseHint(currentQ.id)}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 text-xs font-bold text-slate-600 dark:text-slate-300 cursor-pointer"
                  title="Maslahat olish"
                >
                  <HelpCircle className="w-3.5 h-3.5 text-amber-500" />
                  <span>{t.tests.hint}</span>
                </button>
              )}
              <button
                onClick={() => setActiveMode('idle')}
                className="text-xs font-bold text-slate-400 hover:text-slate-700"
              >
                Chiqish
              </button>
            </div>
          </div>

          {/* Hint notification if used */}
          {hintsUsed[currentQ.id] && currentQ.hint && (
            <div className="p-3.5 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900 text-xs font-medium text-amber-800 dark:text-amber-200">
              💡 <span className="font-bold">Maslahat:</span> {currentQ.hint[language]}
            </div>
          )}

          {/* Question Text */}
          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
            <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white leading-relaxed">
              {currentQ.question[language]}
            </h3>
          </div>

          {/* Options */}
          <div className="space-y-3">
            {currentQ.options?.map((opt) => {
              const isSelected = userAnswers[currentQ.id] === opt.id;
              let style = 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-indigo-400';

              if (showExplanation) {
                if (opt.id === currentQ.correctAnswer) {
                  style = 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-500 font-bold';
                } else if (isSelected) {
                  style = 'bg-rose-50 dark:bg-rose-950/60 border-rose-500 font-bold';
                }
              } else if (isSelected) {
                style = 'bg-indigo-50 dark:bg-indigo-950 border-indigo-600 font-bold';
              }

              return (
                <button
                  key={opt.id}
                  onClick={() => handleSelectOption(currentQ.id, opt.id)}
                  disabled={showExplanation}
                  className={`w-full p-4 rounded-2xl border text-left text-xs sm:text-sm font-medium transition-all ${style}`}
                >
                  {opt.text[language]}
                </button>
              );
            })}
          </div>

          {/* Instant Methodological Explanation */}
          {showExplanation && (
            <div className="p-4 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-900/60 text-xs text-indigo-950 dark:text-indigo-100 leading-relaxed animate-in fade-in duration-200">
              <span className="font-black text-indigo-700 dark:text-indigo-300 block mb-1">
                {t.tests.explanation}:
              </span>
              {currentQ.explanation[language]}
            </div>
          )}

          {/* Navigation buttons */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
            <button
              onClick={handlePrevQuestion}
              disabled={currentQIdx === 0}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-slate-500 disabled:opacity-30"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>{t.tests.prev}</span>
            </button>

            <button
              onClick={handleNextQuestion}
              disabled={!userAnswers[currentQ.id]}
              className="flex items-center gap-1.5 px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 text-white font-bold text-xs sm:text-sm shadow-md shadow-indigo-600/20"
            >
              <span>
                {currentQIdx + 1 === currentQuestions.length
                  ? t.tests.submit
                  : t.tests.next}
              </span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* TEST RESULT SCREEN */}
      {testResult && (
        <div className="bg-white dark:bg-slate-900 p-6 sm:p-10 rounded-3xl shadow-xl border border-slate-200 dark:border-slate-800 text-center space-y-6">
          <div
            className={`w-20 h-20 mx-auto rounded-3xl flex items-center justify-center ${
              testResult.passed
                ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-600'
                : 'bg-amber-100 dark:bg-amber-950 text-amber-600'
            }`}
          >
            {testResult.passed ? (
              <Trophy className="w-10 h-10" />
            ) : (
              <AlertCircle className="w-10 h-10" />
            )}
          </div>

          <div className="space-y-1">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
              {t.tests.resultTitle}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              {testResult.passed
                ? "Ajoyib natija! Siz qo'yilgan pedagogik mezonlarni to'liq bajardingiz."
                : "Natija pastroq bo'ldi. Tavsiya etilgan modullarni yana bir bor ko'rib chiqing."}
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-xl mx-auto">
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800">
              <span className="text-xs text-slate-400">{t.tests.correctAnswers}</span>
              <p className="text-xl font-bold font-mono text-slate-900 dark:text-white">
                {testResult.correct} / {testResult.total}
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800">
              <span className="text-xs text-slate-400">{t.tests.accuracy}</span>
              <p className="text-xl font-bold font-mono text-indigo-600 dark:text-indigo-400">
                {testResult.scorePct}%
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800">
              <span className="text-xs text-slate-400">{t.tests.grade}</span>
              <p className="text-xl font-bold text-teal-600 dark:text-teal-400">
                {testResult.grade.split(' ')[0]}
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800">
              <span className="text-xs text-slate-400">Holat</span>
              <p className={`text-base font-bold ${testResult.passed ? 'text-emerald-600' : 'text-rose-600'}`}>
                {testResult.passed ? "Muvaffaqiyatli" : "Qayta topshirish"}
              </p>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
            <button
              onClick={() => setActiveMode('idle')}
              className="px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-bold text-xs sm:text-sm"
            >
              Testlar markaziga qaytish
            </button>

            {testResult.passed && activeMode === 'final-exam' && (
              <button
                onClick={() => setCurrentTab('certificate')}
                className="flex items-center gap-1.5 px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-black text-xs sm:text-sm shadow-lg shadow-amber-500/25"
              >
                <Award className="w-4 h-4" />
                <span>{t.tests.viewCertificate}</span>
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
