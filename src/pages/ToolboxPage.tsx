import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { translations } from '../i18n/translations';
import { sound } from '../utils/sound';
import {
  Wrench,
  FileText,
  Printer,
  CheckSquare,
  Sparkles,
  Download,
  BookOpen,
  Award,
  Layers,
  Send
} from 'lucide-react';

export const ToolboxPage: React.FC = () => {
  const { language, addXp, triggerConfetti } = useApp();
  const t = translations[language];

  const [activeTab, setActiveTab] = useState<'builder' | 'rubrics' | 'templates' | 'miniproject'>('builder');

  // Interactive Lesson Plan Builder state
  const [topic, setTopic] = useState("Fe'l zamonlari: O'tgan va Hozirgi zamon");
  const [grade, setGrade] = useState("6-sinf");
  const [goal, setGoal] = useState("O'quvchilarda -di va -yapti qo'shimchalari orqali zamon ma'nolarini nutqda erkin qo'llash ko'nikmasini shakllantirish.");
  const [method, setMethod] = useState("Klaster, Venn diagrammasi, Blits-so'rov");
  const [activities, setActivities] = useState("1. 'Kunning fe'li' bilan uyg'otish;\n2. Zamon chizig'ida qiyoslash;\n3. Kichik guruhlarda ijodiy gap tuzish;\n4. Sinkvein bilan xulosa.");

  // Mini-project evaluation state
  const [projectTopic, setProjectTopic] = useState("5-sinfda 'Fe'l nisbatlari' bo'yicha 15 daqiqalik mini-dars");
  const [targetAudience, setTargetAudience] = useState("5-sinf o'quvchilari (25 nafar)");
  const [chosenInteractiveTool, setChosenInteractiveTool] = useState("Pantomima va 'Metodni top' o'yini");
  const [step1Activity, setStep1Activity] = useState("Harakatni ko'rsatish orqali nisbat farqini sezdirish (3 daqiqa)");
  const [step2Activity, setStep2Activity] = useState("Doskada rangli kartochkalar bilan tushuntirish (7 daqiqa)");
  const [step3Activity, setStep3Activity] = useState("Tezkor viktorina va rag'batlantirish (5 daqiqa)");
  const [projectEvaluation, setProjectEvaluation] = useState<{ score: number; feedback: string } | null>(null);

  const handlePrint = () => {
    window.print();
  };

  const evaluateMiniProject = (e: React.FormEvent) => {
    e.preventDefault();
    sound.playClick();

    let score = 70;
    let comments: string[] = [];

    if (chosenInteractiveTool.toLowerCase().includes('o\'yin') || chosenInteractiveTool.toLowerCase().includes('klaster')) {
      score += 15;
      comments.push("Interfaol metod juda to'g'ri va yoshga mos tanlangan.");
    }
    if (step1Activity.length > 20 && step2Activity.length > 20) {
      score += 15;
      comments.push("Bosqichlar ketma-ketligi didaktik tamoyillarga muvofiq.");
    }

    setProjectEvaluation({
      score: Math.min(100, score),
      feedback: comments.join(' ') || "Mini-dars loyihasi talablarga to'liq javob beradi!",
    });

    addXp(60);
    sound.playFanfare();
    triggerConfetti();
  };

  return (
    <div className="space-y-8 py-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-purple-900 via-indigo-950 to-slate-900 text-white shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 text-xs font-bold">
            <Wrench className="w-4 h-4 text-purple-300" />
            <span>O'qituvchining amaliy xazinasi</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black">
            {t.toolbox.title}
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
            {t.toolbox.subtitle}
          </p>
        </div>
        <button
          onClick={handlePrint}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs sm:text-sm border border-white/20 transition-all shrink-0 cursor-pointer print:hidden"
        >
          <Printer className="w-4 h-4" />
          <span>Chop etish (Print)</span>
        </button>
      </div>

      {/* Toolbox Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-1 border-b border-slate-200 dark:border-slate-800 print:hidden">
        <button
          onClick={() => setActiveTab('builder')}
          className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
            activeTab === 'builder'
              ? 'bg-indigo-600 text-white shadow-md'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          {t.toolbox.builderTab}
        </button>
        <button
          onClick={() => setActiveTab('rubrics')}
          className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
            activeTab === 'rubrics'
              ? 'bg-indigo-600 text-white shadow-md'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          {t.toolbox.rubricTab}
        </button>
        <button
          onClick={() => setActiveTab('templates')}
          className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
            activeTab === 'templates'
              ? 'bg-indigo-600 text-white shadow-md'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          {t.toolbox.templatesTab}
        </button>
        <button
          onClick={() => setActiveTab('miniproject')}
          className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
            activeTab === 'miniproject'
              ? 'bg-indigo-600 text-white shadow-md'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          {t.toolbox.miniProjectTab}
        </button>
      </div>

      {/* TAB 1: INTERACTIVE LESSON PLAN BUILDER */}
      {activeTab === 'builder' && (
        <div className="space-y-6">
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <h3 className="font-black text-lg text-slate-900 dark:text-white">
              Dars ishlanmasi konstruktori (45 daqiqalik)
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-slate-500 block mb-1">
                  Mavzu:
                </label>
                <input
                  type="text"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-500 block mb-1">
                  Sinf:
                </label>
                <input
                  type="text"
                  value={grade}
                  onChange={(e) => setGrade(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-500 block mb-1">
                Darsning ta'limiy maqsadi:
              </label>
              <textarea
                rows={2}
                value={goal}
                onChange={(e) => setGoal(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-500 block mb-1">
                Qo'llaniladigan metod va vositalar:
              </label>
              <input
                type="text"
                value={method}
                onChange={(e) => setMethod(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-500 block mb-1">
                Dars bosqichlari va mashg'ulotlar ketma-ketligi:
              </label>
              <textarea
                rows={4}
                value={activities}
                onChange={(e) => setActivities(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm font-mono"
              />
            </div>
          </div>

          {/* Printable Preview Sheet */}
          <div className="p-8 rounded-3xl bg-slate-50 dark:bg-slate-850 border-2 border-slate-300 dark:border-slate-700 font-serif space-y-4">
            <div className="text-center pb-4 border-b border-slate-300 dark:border-slate-700">
              <span className="text-xs font-sans uppercase font-bold text-indigo-600 dark:text-indigo-400">
                Ona tili fani o'qituvchisining dars ishlanmasi
              </span>
              <h2 className="text-2xl font-black mt-1">{topic} ({grade})</h2>
            </div>
            <div className="space-y-2 text-sm">
              <p><span className="font-bold">Dars maqsadi:</span> {goal}</p>
              <p><span className="font-bold">Metodlar:</span> {method}</p>
              <div className="pt-2">
                <span className="font-bold block mb-1">Dars rejasi (Bosqichlar):</span>
                <pre className="whitespace-pre-wrap font-sans text-xs bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800">
                  {activities}
                </pre>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: CRITERIA RUBRICS */}
      {activeTab === 'rubrics' && (
        <div className="space-y-6">
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <h3 className="font-black text-lg text-slate-900 dark:text-white">
              Fe'l mavzusidagi yozma ishlar uchun mezonli baholash rubrikasi
            </h3>
            <p className="text-xs text-slate-500">
              O'quvchilarning insho, bayon va grammatik mashqlarini xolis baholash jadvali.
            </p>

            <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-700">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-100 dark:bg-slate-800 font-bold">
                  <tr>
                    <th className="p-3 border-b border-slate-200 dark:border-slate-700">Mezon</th>
                    <th className="p-3 border-b border-slate-200 dark:border-slate-700">A'lo (86-100%)</th>
                    <th className="p-3 border-b border-slate-200 dark:border-slate-700">Yaxshi (71-85%)</th>
                    <th className="p-3 border-b border-slate-200 dark:border-slate-700">Qoniqarli (55-70%)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  <tr>
                    <td className="p-3 font-bold">Grammatik savodxonlik</td>
                    <td className="p-3">Fe'l qo'shimchalari (-yapti, nisbatlar) xatosiz qo'llangan.</td>
                    <td className="p-3">1-2 ta mayda imloviy noaniqlik bor.</td>
                    <td className="p-3">3-4 ta zamon yoki nisbat xatosi mavjud.</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold">Lug'at boyligi va sinonimlar</td>
                    <td className="p-3">Harakat fe'llari takrorlanmagan, boy sinonimik qator tanlangan.</td>
                    <td className="p-3">Ayrim takrorlar bor, lekin ma'no tushunarli.</td>
                    <td className="p-3">Bir xil fe'llar ('keldi', 'aytdi') doimiy takrorlangan.</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold">Mantiqiy izchillik</td>
                    <td className="p-3">Harakatlar ketma-ketligi va sabab-oqibat mukammal bog'langan.</td>
                    <td className="p-3">Mantiq asosan saqlangan.</td>
                    <td className="p-3">Zamonlar orasida sakrashlar bor.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: READY TEMPLATES */}
      {activeTab === 'templates' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
            <FileText className="w-8 h-8 text-indigo-600" />
            <h4 className="font-extrabold text-base text-slate-900 dark:text-white">
              Dars konspekti andozasi (Word/PDF mos)
            </h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              O'zbekiston maktablari uchun 45 daqiqalik dars tahlili va konspekt blankasi.
            </p>
            <button
              onClick={handlePrint}
              className="px-4 py-2 rounded-xl bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-300 font-bold text-xs inline-flex items-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Chop etish / PDF saqlash</span>
            </button>
          </div>

          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
            <CheckSquare className="w-8 h-8 text-teal-600" />
            <h4 className="font-extrabold text-base text-slate-900 dark:text-white">
              Tashxis testi blankasi
            </h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              5-sinf o'quvchilari uchun fe'l bo'yicha 10 savolli kirish testi tarqatmasi.
            </p>
            <button
              onClick={handlePrint}
              className="px-4 py-2 rounded-xl bg-teal-50 dark:bg-teal-950 text-teal-600 dark:text-teal-300 font-bold text-xs inline-flex items-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Chop etish / PDF saqlash</span>
            </button>
          </div>
        </div>
      )}

      {/* TAB 4: MINI PROJECT DESIGNER */}
      {activeTab === 'miniproject' && (
        <form onSubmit={evaluateMiniProject} className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <div className="space-y-1">
            <h3 className="text-lg font-black text-slate-900 dark:text-white">
              15 daqiqalik mini-dars loyihasi
            </h3>
            <p className="text-xs text-slate-500">
              O'quv amaliyotiga tayyorgarlik sifatida qisqa dars parchasini rejalashtiring. Tizim uni avtomatik baholaydi!
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-slate-500 block mb-1">
                Loyiha mavzusi:
              </label>
              <input
                type="text"
                value={projectTopic}
                onChange={(e) => setProjectTopic(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-slate-500 block mb-1">
                Auditoriya:
              </label>
              <input
                type="text"
                value={targetAudience}
                onChange={(e) => setTargetAudience(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-500 block mb-1">
              Asosiy interaktiv o'yin / usul:
            </label>
            <input
              type="text"
              value={chosenInteractiveTool}
              onChange={(e) => setChosenInteractiveTool(e.target.value)}
              className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500 block">
              15 daqiqa taqsimoti:
            </label>
            <input
              type="text"
              value={step1Activity}
              onChange={(e) => setStep1Activity(e.target.value)}
              placeholder="1-qism (3 min)..."
              className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs"
            />
            <input
              type="text"
              value={step2Activity}
              onChange={(e) => setStep2Activity(e.target.value)}
              placeholder="2-qism (7 min)..."
              className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs"
            />
            <input
              type="text"
              value={step3Activity}
              onChange={(e) => setStep3Activity(e.target.value)}
              placeholder="3-qism (5 min)..."
              className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs"
            />
          </div>

          {projectEvaluation && (
            <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-800 text-xs space-y-1">
              <span className="font-extrabold text-emerald-800 dark:text-emerald-200">
                Pedagogik ekspertiza bahosi: {projectEvaluation.score} / 100 ball
              </span>
              <p className="text-emerald-950 dark:text-emerald-100 font-medium">
                {projectEvaluation.feedback}
              </p>
            </div>
          )}

          <div className="flex justify-end pt-2">
            <button
              type="submit"
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs sm:text-sm shadow-md"
            >
              <Send className="w-4 h-4" />
              <span>Loyihani baholashga topshirish (+60 XP)</span>
            </button>
          </div>
        </form>
      )}
    </div>
  );
};
