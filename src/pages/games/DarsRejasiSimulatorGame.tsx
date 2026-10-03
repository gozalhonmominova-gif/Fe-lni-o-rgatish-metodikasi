import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { sound } from '../../utils/sound';
import { Trophy, Clock, CheckCircle, RotateCcw, ArrowUpDown, Sparkles } from 'lucide-react';

interface Stage {
  id: string;
  name: string;
  recommendedMinutes: number;
  assignedMinutes: number;
  method: string;
}

const defaultStages: Stage[] = [
  { id: 's1', name: "Tashkiliy qism va motivatsiya", recommendedMinutes: 4, assignedMinutes: 4, method: "Salomlashish, psixologik iqlim yaratish" },
  { id: 's2', name: "O'tilgan mavzuni takrorlash (Uyg'otish)", recommendedMinutes: 6, assignedMinutes: 6, method: "Blits-so'rov / Aqliy hujum" },
  { id: 's3', name: "Yangi mavzu bayoni (Tushunish)", recommendedMinutes: 15, assignedMinutes: 15, method: "Klaster / Induktiv kuzatish" },
  { id: 's4', name: "Mustahkamlash va amaliy mashqlar", recommendedMinutes: 15, assignedMinutes: 15, method: "Venn diagrammasi / Guruhli tahlil" },
  { id: 's5', name: "Darsni yakunlash, baholash va vazifa", recommendedMinutes: 5, assignedMinutes: 5, method: "Sinkvein / Rubrika asosida baholash" },
];

export const DarsRejasiSimulatorGame: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const { addXp, recordGameScore, triggerConfetti } = useApp();
  const [stages, setStages] = useState<Stage[]>(defaultStages);
  const [evaluation, setEvaluation] = useState<{ score: number; feedback: string } | null>(null);

  const totalMinutes = stages.reduce((acc, curr) => acc + curr.assignedMinutes, 0);

  const adjustMinutes = (id: string, delta: number) => {
    sound.playClick();
    setStages((prev) =>
      prev.map((s) => {
        if (s.id === id) {
          const updated = Math.max(1, Math.min(30, s.assignedMinutes + delta));
          return { ...s, assignedMinutes: updated };
        }
        return s;
      })
    );
  };

  const evaluatePlan = () => {
    let penalty = Math.abs(totalMinutes - 45) * 5;

    // Check specific stages
    const newTopic = stages.find((s) => s.id === 's3')?.assignedMinutes || 15;
    if (newTopic > 20) {
      penalty += 15; // too lecture heavy
    }
    const practice = stages.find((s) => s.id === 's4')?.assignedMinutes || 15;
    if (practice < 10) {
      penalty += 15; // not enough student practice
    }

    const finalScore = Math.max(20, 100 - penalty);

    let feedbackMsg = "";
    if (totalMinutes !== 45) {
      feedbackMsg = `Dars vaqti 45 daqiqaga teng bo'lishi kerak (hozir: ${totalMinutes} daqiqa). `;
    }
    if (newTopic > 20) {
      feedbackMsg += "Yangi mavzu bayoni haddan ziyod cho'zilib ketdi (o'quvchilar charchaydi). ";
    } else if (practice >= 12 && Math.abs(totalMinutes - 45) <= 1) {
      feedbackMsg = "Qoyilmaqom! Vaqt mezonlari xalqaro pedagogik standartlarga to'liq mos keladi: o'qituvchi va o'quvchi balansi a'lo darajada.";
    } else {
      feedbackMsg += "Mustahkamlash bosqichiga ko'proq vaqt ajratish maqsadga muvofiq.";
    }

    setEvaluation({ score: finalScore, feedback: feedbackMsg });

    if (finalScore >= 80) {
      sound.playFanfare();
      triggerConfetti();
      recordGameScore('dars-rejasi-simulator', finalScore);
      addXp(50);
    } else {
      sound.playCorrect();
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 bg-white dark:bg-slate-900 rounded-3xl shadow-xl border border-slate-200 dark:border-slate-800">
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800 mb-6">
        <div>
          <span className="text-xs uppercase font-extrabold tracking-wider text-rose-600 dark:text-rose-400">
            9-O'yin
          </span>
          <h2 className="text-2xl font-black text-slate-900 dark:text-white">
            Dars Rejasi Simulyatori
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            45 daqiqalik me'yorni to'g'ri taqsimlab, pedagogik jihatdan muvozanatli dars jadvalini loyihalashtiring!
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-mono font-bold text-sm border ${
              totalMinutes === 45
                ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border-emerald-300'
                : 'bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 border-rose-300'
            }`}
          >
            <Clock className="w-4 h-4" />
            <span>Jami: {totalMinutes} / 45 daqiqa</span>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {stages.map((stage) => (
          <div
            key={stage.id}
            className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
          >
            <div>
              <h4 className="font-extrabold text-sm text-slate-900 dark:text-white">
                {stage.name}
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Tavsiya etilgan metod: <span className="font-bold text-indigo-600 dark:text-indigo-400">{stage.method}</span>
              </p>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-xs text-slate-400 font-mono">
                Me'yor: ~{stage.recommendedMinutes} daqiqa
              </span>
              <div className="flex items-center gap-1.5 bg-white dark:bg-slate-700 px-2 py-1 rounded-xl border border-slate-200 dark:border-slate-600">
                <button
                  onClick={() => adjustMinutes(stage.id, -1)}
                  className="w-7 h-7 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-600 text-slate-800 dark:text-slate-100 font-bold"
                >
                  -
                </button>
                <span className="w-8 text-center font-bold text-sm font-mono">
                  {stage.assignedMinutes}m
                </span>
                <button
                  onClick={() => adjustMinutes(stage.id, 1)}
                  className="w-7 h-7 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-600 text-slate-800 dark:text-slate-100 font-bold"
                >
                  +
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {evaluation && (
        <div
          className={`mt-6 p-4 rounded-2xl border text-sm ${
            evaluation.score >= 80
              ? 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-300 text-emerald-900 dark:text-emerald-100'
              : 'bg-amber-50 dark:bg-amber-950/60 border-amber-300 text-amber-900 dark:text-amber-100'
          }`}
        >
          <div className="flex items-center justify-between font-bold mb-1">
            <span>Pedagogik baho: {evaluation.score} ball</span>
          </div>
          <p className="text-xs leading-relaxed">{evaluation.feedback}</p>
        </div>
      )}

      <div className="mt-6 flex items-center justify-between">
        <button
          onClick={() => {
            setStages(defaultStages);
            setEvaluation(null);
          }}
          className="text-xs font-bold text-slate-500 hover:underline"
        >
          Standart holatga qaytarish
        </button>
        <button
          onClick={evaluatePlan}
          className="px-6 py-3 rounded-xl bg-gradient-to-r from-rose-600 to-indigo-600 hover:from-rose-700 text-white font-bold text-sm shadow-lg shadow-indigo-600/20"
        >
          Rejani baholash & Tasdiqlash
        </button>
      </div>
    </div>
  );
};
