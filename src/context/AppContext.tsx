import React, { createContext, useContext, useState, useEffect } from 'react';
import { Language, UserLevel, UserProgress, Badge } from '../types';
import { badgesData } from '../data/badgesData';
import { sound } from '../utils/sound';
import confetti from 'canvas-confetti';

interface AppContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  progress: UserProgress;
  userLevel: UserLevel;
  nextLevelXp: number;
  prevLevelXp: number;
  levelProgressPercentage: number;
  addXp: (amount: number, reason?: string) => void;
  completeModule: (moduleId: number) => void;
  setQuizScore: (moduleId: number, score: number) => void;
  savePreTestScore: (score: number) => void;
  saveFinalExamScore: (score: number) => void;
  setStudentName: (name: string) => void;
  unlockBadge: (badgeId: string) => void;
  recordGameScore: (gameId: string, score: number) => void;
  saveReflectionNote: (moduleId: number, note: string) => void;
  updateLeitnerCard: (cardId: string, box: number) => void;
  resetProgress: () => void;
  soundEnabled: boolean;
  toggleSound: () => void;
  newlyUnlockedBadge: Badge | null;
  clearNewBadge: () => void;
  triggerConfetti: () => void;
}

const defaultProgress: UserProgress = {
  xp: 120, // initial welcome XP
  streak: 1,
  lastActiveDate: new Date().toISOString().split('T')[0],
  completedModules: [],
  moduleQuizScores: {},
  moduleQuizAttempts: {},
  preTestScore: null,
  finalExamScore: null,
  finalExamPassed: false,
  finalExamDate: null,
  studentName: '',
  unlockedBadges: [],
  gameHighScores: {},
  gamePlayCounts: {},
  weakTopics: [],
  reflectionNotes: {},
  leitnerCardsState: {},
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // 1. Language state
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('fel_app_language');
    if (saved === 'en' || saved === 'ru' || saved === 'uz') return saved;
    return 'uz';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('fel_app_language', lang);
    sound.playClick();
  };

  // 2. Theme state
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const saved = localStorage.getItem('fel_app_theme');
    if (saved === 'dark' || saved === 'light') return saved;
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light';
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('fel_app_theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
    sound.playClick();
  };

  // 3. Sound setting
  const [soundEnabled, setSoundEnabled] = useState<boolean>(() => sound.isSoundEnabled());

  const toggleSound = () => {
    const newVal = !soundEnabled;
    setSoundEnabled(newVal);
    sound.setSoundEnabled(newVal);
    if (newVal) sound.playClick();
  };

  // 4. User Progress State
  const [progress, setProgress] = useState<UserProgress>(() => {
    try {
      const saved = localStorage.getItem('fel_user_progress');
      if (saved) {
        const parsed = JSON.parse(saved);
        // check streak
        const today = new Date().toISOString().split('T')[0];
        const last = parsed.lastActiveDate;
        if (last && last !== today) {
          const lastDate = new Date(last);
          const currentDate = new Date(today);
          const diffDays = Math.round((currentDate.getTime() - lastDate.getTime()) / (1000 * 3600 * 24));
          if (diffDays === 1) {
            parsed.streak = (parsed.streak || 1) + 1;
          } else if (diffDays > 1) {
            parsed.streak = 1;
          }
          parsed.lastActiveDate = today;
        }
        return { ...defaultProgress, ...parsed };
      }
    } catch {
      // fallback
    }
    return defaultProgress;
  });

  const [newlyUnlockedBadge, setNewlyUnlockedBadge] = useState<Badge | null>(null);

  useEffect(() => {
    localStorage.setItem('fel_user_progress', JSON.stringify(progress));
  }, [progress]);

  // Trigger celebration confetti
  const triggerConfetti = () => {
    try {
      confetti({
        particleCount: 75,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#6366f1', '#06b6d4', '#10b981', '#f59e0b', '#ec4899'],
      });
    } catch {
      // Ignore
    }
  };

  // Level calculations
  const calculateLevel = (xp: number): UserLevel => {
    if (xp >= 1500) return 'Professor';
    if (xp >= 900) return 'Ustoz';
    if (xp >= 500) return 'Metodist';
    if (xp >= 200) return 'Amaliyotchi';
    return 'Talaba';
  };

  const userLevel = calculateLevel(progress.xp);

  let prevLevelXp = 0;
  let nextLevelXp = 200;
  if (userLevel === 'Amaliyotchi') {
    prevLevelXp = 200;
    nextLevelXp = 500;
  } else if (userLevel === 'Metodist') {
    prevLevelXp = 500;
    nextLevelXp = 900;
  } else if (userLevel === 'Ustoz') {
    prevLevelXp = 900;
    nextLevelXp = 1500;
  } else if (userLevel === 'Professor') {
    prevLevelXp = 1500;
    nextLevelXp = 2500;
  }

  const levelProgressPercentage = Math.min(
    100,
    Math.max(0, Math.round(((progress.xp - prevLevelXp) / (nextLevelXp - prevLevelXp)) * 100))
  );

  const unlockBadge = (badgeId: string) => {
    if (progress.unlockedBadges.includes(badgeId)) return;
    const badge = badgesData.find((b) => b.id === badgeId);
    if (!badge) return;

    setProgress((prev) => ({
      ...prev,
      unlockedBadges: [...prev.unlockedBadges, badgeId],
      xp: prev.xp + 50, // bonus XP for badge
    }));

    setNewlyUnlockedBadge(badge);
    sound.playFanfare();
    triggerConfetti();
  };

  const addXp = (amount: number) => {
    setProgress((prev) => {
      const newXp = prev.xp + amount;
      const oldLvl = calculateLevel(prev.xp);
      const newLvl = calculateLevel(newXp);

      if (newLvl !== oldLvl) {
        sound.playFanfare();
        triggerConfetti();
      }

      // Check level badge
      if (newXp >= 1500 && !prev.unlockedBadges.includes('methodology_professor')) {
        setTimeout(() => unlockBadge('methodology_professor'), 500);
      }

      return { ...prev, xp: newXp };
    });
  };

  const completeModule = (moduleId: number) => {
    setProgress((prev) => {
      if (prev.completedModules.includes(moduleId)) return prev;
      const updated = [...prev.completedModules, moduleId];

      // check badges
      if (updated.length === 1 && !prev.unlockedBadges.includes('first_step')) {
        setTimeout(() => unlockBadge('first_step'), 300);
      }
      if (updated.length >= 3 && !prev.unlockedBadges.includes('pedagogue')) {
        setTimeout(() => unlockBadge('pedagogue'), 300);
      }

      return {
        ...prev,
        completedModules: updated,
        xp: prev.xp + 80,
      };
    });
    sound.playCorrect();
    triggerConfetti();
  };

  const setQuizScore = (moduleId: number, score: number) => {
    setProgress((prev) => {
      const attempts = (prev.moduleQuizAttempts[moduleId] || 0) + 1;
      const isPerfect = score === 100;

      if (isPerfect && !prev.unlockedBadges.includes('quiz_whiz')) {
        setTimeout(() => unlockBadge('quiz_whiz'), 400);
      }

      // Track weak topics if score is below 60%
      let weak = [...prev.weakTopics];
      const topicKey = `module_${moduleId}`;
      if (score < 70 && !weak.includes(topicKey)) {
        weak.push(topicKey);
      } else if (score >= 80) {
        weak = weak.filter((t) => t !== topicKey);
      }

      return {
        ...prev,
        moduleQuizScores: {
          ...prev.moduleQuizScores,
          [moduleId]: Math.max(prev.moduleQuizScores[moduleId] || 0, score),
        },
        moduleQuizAttempts: {
          ...prev.moduleQuizAttempts,
          [moduleId]: attempts,
        },
        weakTopics: weak,
        xp: prev.xp + Math.round(score * 0.8),
      };
    });
  };

  const savePreTestScore = (score: number) => {
    setProgress((prev) => ({
      ...prev,
      preTestScore: score,
      xp: prev.xp + 50,
    }));
    sound.playCorrect();
  };

  const saveFinalExamScore = (score: number) => {
    const passed = score >= 70;
    const today = new Date().toISOString().split('T')[0];

    setProgress((prev) => {
      if (passed && score >= 80 && !prev.unlockedBadges.includes('final_champion')) {
        setTimeout(() => unlockBadge('final_champion'), 400);
      }
      return {
        ...prev,
        finalExamScore: Math.max(prev.finalExamScore || 0, score),
        finalExamPassed: prev.finalExamPassed || passed,
        finalExamDate: today,
        xp: prev.xp + (passed ? 200 : 50),
      };
    });

    if (passed) {
      sound.playFanfare();
      triggerConfetti();
    } else {
      sound.playWrong();
    }
  };

  const setStudentName = (name: string) => {
    setProgress((prev) => ({
      ...prev,
      studentName: name,
    }));
  };

  const recordGameScore = (gameId: string, score: number) => {
    setProgress((prev) => {
      const currentHigh = prev.gameHighScores[gameId] || 0;
      const playCount = (prev.gamePlayCounts[gameId] || 0) + 1;

      // check game badges
      if (gameId === 'fel-detektivi' && score >= 150 && !prev.unlockedBadges.includes('verb_detective')) {
        setTimeout(() => unlockBadge('verb_detective'), 300);
      }
      if (gameId === 'zamon-poygasi' && score >= 120 && !prev.unlockedBadges.includes('tense_master')) {
        setTimeout(() => unlockBadge('tense_master'), 300);
      }
      if (gameId === 'morfema-konstruktori' && score >= 100 && !prev.unlockedBadges.includes('morpheme_architect')) {
        setTimeout(() => unlockBadge('morpheme_architect'), 300);
      }
      if (gameId === 'tez-javob' && score >= 800 && !prev.unlockedBadges.includes('fast_thinker')) {
        setTimeout(() => unlockBadge('fast_thinker'), 300);
      }
      if (gameId === 'xatolar-laboratoriyasi' && score >= 100 && !prev.unlockedBadges.includes('error_surgeon')) {
        setTimeout(() => unlockBadge('error_surgeon'), 300);
      }
      if (gameId === 'nisbat-labirinti' && score >= 90 && !prev.unlockedBadges.includes('voice_expert')) {
        setTimeout(() => unlockBadge('voice_expert'), 300);
      }

      return {
        ...prev,
        gameHighScores: {
          ...prev.gameHighScores,
          [gameId]: Math.max(currentHigh, score),
        },
        gamePlayCounts: {
          ...prev.gamePlayCounts,
          [gameId]: playCount,
        },
        xp: prev.xp + Math.round(score * 0.25),
      };
    });
  };

  const saveReflectionNote = (moduleId: number, note: string) => {
    setProgress((prev) => ({
      ...prev,
      reflectionNotes: {
        ...prev.reflectionNotes,
        [moduleId]: note,
      },
      xp: prev.xp + 25, // XP reward for pedagogical reflection
    }));
    sound.playCorrect();
  };

  const updateLeitnerCard = (cardId: string, box: number) => {
    setProgress((prev) => ({
      ...prev,
      leitnerCardsState: {
        ...prev.leitnerCardsState,
        [cardId]: box,
      },
    }));
  };

  const resetProgress = () => {
    setProgress(defaultProgress);
    localStorage.removeItem('fel_user_progress');
    sound.playClick();
  };

  const clearNewBadge = () => {
    setNewlyUnlockedBadge(null);
  };

  return (
    <AppContext.Provider
      value={{
        language,
        setLanguage,
        theme,
        toggleTheme,
        progress,
        userLevel,
        nextLevelXp,
        prevLevelXp,
        levelProgressPercentage,
        addXp,
        completeModule,
        setQuizScore,
        savePreTestScore,
        saveFinalExamScore,
        setStudentName,
        unlockBadge,
        recordGameScore,
        saveReflectionNote,
        updateLeitnerCard,
        resetProgress,
        soundEnabled,
        toggleSound,
        newlyUnlockedBadge,
        clearNewBadge,
        triggerConfetti,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
