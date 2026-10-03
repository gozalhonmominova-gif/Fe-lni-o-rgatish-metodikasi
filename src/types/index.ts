export type Language = 'uz' | 'en' | 'ru';

export type UserLevel = 'Talaba' | 'Amaliyotchi' | 'Metodist' | 'Ustoz' | 'Professor';

export interface Badge {
  id: string;
  name: { uz: string; en: string; ru: string };
  description: { uz: string; en: string; ru: string };
  icon: string;
  category: 'learning' | 'game' | 'test' | 'streak';
  unlockedAt?: string;
}

export interface Question {
  id: string;
  moduleId?: number; // 1-7 or undefined for pre-test/final
  type: 'single' | 'multiple' | 'boolean' | 'fill' | 'case';
  question: { uz: string; en: string; ru: string };
  options?: { id: string; text: { uz: string; en: string; ru: string } }[];
  correctAnswer: string | string[]; // option id or string value
  explanation: { uz: string; en: string; ru: string };
  hint?: { uz: string; en: string; ru: string };
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface ModuleLesson {
  id: string;
  title: { uz: string; en: string; ru: string };
  readTimeMinutes: number;
  content: {
    summary: { uz: string; en: string; ru: string };
    sections: {
      heading: { uz: string; en: string; ru: string };
      body: { uz: string; en: string; ru: string };
      example?: {
        uz: string;
        translation: { en: string; ru: string };
        morphemes?: { part: string; role: string; color: string }[];
        note?: { uz: string; en: string; ru: string };
      };
      table?: {
        headers: { uz: string; en: string; ru: string }[];
        rows: { uz: string; en: string; ru: string }[][];
      };
      methodHighlight?: {
        methodName: string;
        goal: { uz: string; en: string; ru: string };
        classroomTip: { uz: string; en: string; ru: string };
      };
    }[];
    takeaways: { uz: string; en: string; ru: string }[];
  };
}

export interface ModuleData {
  id: number;
  number: number;
  slug: string;
  title: { uz: string; en: string; ru: string };
  subtitle: { uz: string; en: string; ru: string };
  icon: string;
  color: string;
  bgColor: string;
  estimatedMinutes: number;
  lessons: ModuleLesson[];
  checkQuiz: Question[];
  recommendedGameId: string;
}

export interface UserProgress {
  xp: number;
  streak: number;
  lastActiveDate: string;
  completedModules: number[];
  moduleQuizScores: Record<number, number>; // moduleId -> percentage
  moduleQuizAttempts: Record<number, number>; // moduleId -> attempt count
  preTestScore: number | null;
  finalExamScore: number | null;
  finalExamPassed: boolean;
  finalExamDate: string | null;
  studentName: string;
  unlockedBadges: string[]; // badge IDs
  gameHighScores: Record<string, number>;
  gamePlayCounts: Record<string, number>;
  weakTopics: string[]; // topic IDs or module numbers
  reflectionNotes: Record<number, string>; // moduleId -> note
  leitnerCardsState: Record<string, number>; // cardId -> box (1, 2, 3)
}

export interface GlossaryTerm {
  id: string;
  term: { uz: string; en: string; ru: string };
  definition: { uz: string; en: string; ru: string };
  example: { uz: string; en: string; ru: string };
  category: 'grammatika' | 'metodika' | 'pedagogika';
}

export interface Flashcard {
  id: string;
  term: { uz: string; en: string; ru: string };
  definition: { uz: string; en: string; ru: string };
  category: string;
  box: number; // 1, 2, 3
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  text: string;
  timestamp: string;
}
