import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { translations } from '../i18n/translations';
import { ChatMessage } from '../types';
import { sound } from '../utils/sound';
import {
  Sparkles,
  Send,
  X,
  Bot,
  User,
  Lightbulb,
  Copy,
  Check,
  RotateCcw
} from 'lucide-react';

interface AiUstozModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AiUstozModal: React.FC<AiUstozModalProps> = ({ isOpen, onClose }) => {
  const { language } = useApp();
  const t = translations[language];

  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    return [
      {
        id: 'msg-welcome',
        role: 'assistant',
        text: t.aiTutor.welcome,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ];
  });

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  if (!isOpen) return null;

  const handleSend = async (textToSend?: string) => {
    const text = textToSend || input;
    if (!text.trim() || loading) return;

    sound.playClick();
    const userMsg: ChatMessage = {
      id: `u-${Date.now()}`,
      role: 'user',
      text: text.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const historyPayload = messages.map((m) => ({
        role: m.role,
        text: m.text,
      }));

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text.trim(),
          language,
          history: historyPayload,
        }),
      });

      if (!res.ok) {
        throw new Error('Server error');
      }

      const data = await res.json();
      const botReply = data.reply || "Kechirasiz, javob olishda muammo yuz berdi.";

      setMessages((prev) => [
        ...prev,
        {
          id: `bot-${Date.now()}`,
          role: 'assistant',
          text: botReply,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
      sound.playCorrect();
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: `bot-err-${Date.now()}`,
          role: 'assistant',
          text: language === 'uz'
            ? "Internet yoki server bilan aloqa uzildi. Iltimos, qayta urinib ko'ring yoki platformaning dars va testlaridan foydalaning."
            : language === 'ru'
            ? "Не удалось связаться с сервером. Пожалуйста, попробуйте еще раз."
            : "Could not reach the server. Please try again or explore our built-in modules.",
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
      sound.playWrong();
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    sound.playClick();
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleClearHistory = () => {
    sound.playClick();
    setMessages([
      {
        id: `msg-welcome-${Date.now()}`,
        role: 'assistant',
        text: t.aiTutor.welcome,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ]);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="w-full max-w-2xl h-[90vh] max-h-[720px] bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-indigo-100 dark:border-indigo-900/60 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="px-5 py-4 border-b border-slate-100 dark:border-slate-800 bg-gradient-to-r from-indigo-50/70 via-white to-teal-50/70 dark:from-slate-900 dark:via-slate-900 dark:to-slate-850 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-indigo-600 to-teal-500 p-0.5 flex items-center justify-center shadow-md shadow-indigo-500/20 text-white">
              <Bot className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-extrabold text-slate-900 dark:text-white text-base">
                  {t.aiTutor.title}
                </h3>
                <span className="flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-teal-100 text-teal-800 dark:bg-teal-950 dark:text-teal-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-500 animate-pulse" />
                  Gemini Flash
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Ona tili o'qitish metodikasi bo'yicha interaktiv maslahatchi
              </p>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={handleClearHistory}
              className="p-2 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              title="Tarixni tozalash"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Message Thread */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
          {messages.map((msg) => {
            const isUser = msg.role === 'user';
            return (
              <div
                key={msg.id}
                className={`flex gap-3 ${isUser ? 'justify-end' : 'justify-start'}`}
              >
                {!isUser && (
                  <div className="w-8 h-8 rounded-xl bg-indigo-100 dark:bg-indigo-950 flex items-center justify-center text-indigo-600 dark:text-indigo-400 shrink-0 mt-0.5">
                    <Sparkles className="w-4 h-4" />
                  </div>
                )}
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed relative group ${
                    isUser
                      ? 'bg-indigo-600 text-white rounded-br-xs shadow-md shadow-indigo-600/15'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-100 rounded-bl-xs border border-slate-200/60 dark:border-slate-700/60'
                  }`}
                >
                  <div className="whitespace-pre-wrap font-sans text-xs sm:text-sm">
                    {msg.text}
                  </div>
                  <div
                    className={`mt-1.5 flex items-center justify-between text-[10px] ${
                      isUser ? 'text-indigo-200' : 'text-slate-400'
                    }`}
                  >
                    <span>{msg.timestamp}</span>
                    {!isUser && (
                      <button
                        onClick={() => handleCopy(msg.id, msg.text)}
                        className="opacity-0 group-hover:opacity-100 transition-opacity p-0.5 hover:text-indigo-600 dark:hover:text-indigo-300 ml-2"
                        title="Nusxalash"
                      >
                        {copiedId === msg.id ? (
                          <Check className="w-3 h-3 text-teal-500" />
                        ) : (
                          <Copy className="w-3 h-3" />
                        )}
                      </button>
                    )}
                  </div>
                </div>
                {isUser && (
                  <div className="w-8 h-8 rounded-xl bg-indigo-600 text-white flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                    <User className="w-4 h-4" />
                  </div>
                )}
              </div>
            );
          })}
          {loading && (
            <div className="flex gap-3 justify-start items-center">
              <div className="w-8 h-8 rounded-xl bg-indigo-100 dark:bg-indigo-950 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                <Bot className="w-4 h-4 animate-spin" />
              </div>
              <div className="p-3 rounded-2xl bg-slate-100 dark:bg-slate-800 text-xs text-slate-500 dark:text-slate-400 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-indigo-500 animate-ping" />
                <span>{t.aiTutor.generating}</span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Prompts Chips */}
        {messages.length <= 2 && (
          <div className="px-4 py-2 border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/40">
            <div className="flex items-center gap-1.5 text-[11px] font-bold text-slate-500 dark:text-slate-400 mb-1.5">
              <Lightbulb className="w-3 h-3 text-amber-500" />
              <span>Tezkor pedagogik savollar:</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {t.aiTutor.quickPrompts.map((prompt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSend(prompt)}
                  className="px-2.5 py-1 rounded-lg bg-white dark:bg-slate-800 hover:bg-indigo-50 dark:hover:bg-indigo-950 text-slate-700 dark:text-slate-300 text-xs font-medium border border-slate-200 dark:border-slate-700 hover:border-indigo-300 transition-colors text-left"
                >
                  "{prompt}"
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Input Bar */}
        <div className="p-3 sm:p-4 border-t border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={t.aiTutor.placeholder}
              disabled={loading}
              className="flex-1 px-4 py-3 rounded-2xl bg-slate-100 dark:bg-slate-800 border border-transparent focus:border-indigo-500 focus:bg-white dark:focus:bg-slate-800 text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-hidden transition-all"
            />
            <button
              type="submit"
              disabled={!input.trim() || loading}
              className="p-3 rounded-2xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 text-white shadow-md shadow-indigo-600/25 transition-all cursor-pointer"
            >
              <Send className="w-5 h-5" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
