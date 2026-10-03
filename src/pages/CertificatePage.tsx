import React, { useRef } from 'react';
import { useApp } from '../context/AppContext';
import { translations } from '../i18n/translations';
import { Award, Printer, CheckCircle2, Lock, ArrowLeft, ShieldCheck } from 'lucide-react';

export const CertificatePage: React.FC<{ setCurrentTab: (tab: string) => void }> = ({ setCurrentTab }) => {
  const { language, progress } = useApp();
  const t = translations[language];

  const certRef = useRef<HTMLDivElement>(null);
  const isEligible = progress.finalExamPassed;

  const handlePrint = () => {
    window.print();
  };

  const studentName = progress.studentName || t.user.guest;
  const issueDate = progress.finalExamDate || new Date().toISOString().split('T')[0];
  const certId = `FM-${(progress.finalExamScore || 85) * 17}-${issueDate.replace(/-/g, '').slice(2)}`;

  return (
    <div className="space-y-8 py-6 max-w-4xl mx-auto">
      {/* Top Banner */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
            {t.certificate.title}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            {t.certificate.subtitle}
          </p>
        </div>

        {isEligible && (
          <button
            onClick={handlePrint}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs sm:text-sm shadow-md shadow-indigo-600/25 transition-all print:hidden cursor-pointer"
          >
            <Printer className="w-4 h-4" />
            <span>{t.certificate.downloadPdf}</span>
          </button>
        )}
      </div>

      {!isEligible ? (
        /* Not eligible warning state */
        <div className="p-8 sm:p-12 rounded-3xl bg-white dark:bg-slate-900 border-2 border-dashed border-slate-300 dark:border-slate-800 text-center space-y-4">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-amber-100 dark:bg-amber-950 flex items-center justify-center text-amber-600">
            <Lock className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white">
            Sertifikat hali faollashtirilmagan
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto">
            {t.certificate.notEligibleYet}
          </p>
          <div className="pt-2">
            <button
              onClick={() => setCurrentTab('tests')}
              className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs sm:text-sm shadow-md"
            >
              Yakuniy imtihonni topshirish →
            </button>
          </div>
        </div>
      ) : (
        /* Printable High-Fidelity Official Certificate */
        <div
          ref={certRef}
          className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-amber-50/40 via-white to-indigo-50/40 dark:from-slate-900 dark:via-slate-850 dark:to-slate-900 border-8 border-double border-amber-300 dark:border-amber-600/50 shadow-2xl relative text-center space-y-6 print:border-4 print:shadow-none"
        >
          {/* Watermark / Seal Icon */}
          <div className="mx-auto w-24 h-24 rounded-full bg-gradient-to-tr from-amber-400 via-amber-500 to-yellow-300 p-1 flex items-center justify-center shadow-xl shadow-amber-500/20">
            <div className="w-full h-full bg-slate-900 rounded-full flex items-center justify-center text-amber-400">
              <Award className="w-12 h-12" />
            </div>
          </div>

          <div className="space-y-1">
            <span className="text-xs uppercase font-black tracking-widest text-indigo-700 dark:text-indigo-400">
              O'zbekiston Respublikasi Pedagogik Ta'lim Platformasi
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-wide uppercase font-serif">
              MALAKA SERTIFIKATI
            </h2>
            <p className="text-xs font-mono text-slate-400">
              Certificate of Pedagogical Excellence
            </p>
          </div>

          <div className="max-w-xl mx-auto space-y-3 pt-2">
            <p className="text-xs sm:text-sm text-slate-500 italic">
              {t.certificate.certifiedTo}
            </p>
            <h3 className="text-2xl sm:text-4xl font-black text-indigo-950 dark:text-white font-serif border-b-2 border-indigo-200 dark:border-indigo-800 pb-2">
              {studentName}
            </h3>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed pt-2">
              "{t.certificate.courseName}" kursi doirasida fe'l kategoriyalarini o'rgatish metodikasi, innovatsion pedagogik texnologiyalar va amaliy dars loyihalash ko'nikmalarini to'liq egallaganligi hamda yakuniy attestatsiyadan muvaffaqiyatli o'tganligi tasdiqlanadi.
            </p>
          </div>

          {/* Certificate metadata footer */}
          <div className="pt-8 border-t border-slate-200 dark:border-slate-800 grid grid-cols-1 sm:grid-cols-3 gap-4 items-center text-xs">
            <div className="text-center sm:text-left">
              <span className="text-slate-400 block">{t.certificate.scoreLabel}:</span>
              <span className="text-lg font-black font-mono text-emerald-600 dark:text-emerald-400">
                {progress.finalExamScore}% (A'lo)
              </span>
            </div>

            {/* Verification Stamp badge */}
            <div className="flex flex-col items-center justify-center">
              <div className="w-16 h-16 rounded-full border-2 border-dashed border-teal-500 flex items-center justify-center text-teal-600 dark:text-teal-400 rotate-[-12deg]">
                <ShieldCheck className="w-8 h-8" />
              </div>
              <span className="text-[10px] text-teal-600 dark:text-teal-400 font-bold mt-1">
                RASMIY TASDIQ
              </span>
            </div>

            <div className="text-center sm:text-right">
              <span className="text-slate-400 block">{t.certificate.dateLabel}:</span>
              <span className="font-bold text-slate-800 dark:text-slate-200 font-mono">
                {issueDate}
              </span>
              <span className="text-[10px] text-slate-400 block mt-0.5 font-mono">
                ID: {certId}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
