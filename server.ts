import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT ? parseInt(process.env.PORT) : 3000;

app.use(express.json());

// API route for AI Ustoz (Pedagogical Verb Methodology Assistant)
app.post('/api/chat', async (req, res) => {
  const { message, language = 'uz', history = [] } = req.body;
  if (!message || typeof message !== 'string') {
    return res.status(400).json({ error: 'Message is required' });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return res.json({
      reply: language === 'uz'
        ? "Assalomu alaykum! Men 'Fe'l Metodikasi' bo'yicha metodik maslahatchi — AI Ustozman. Tizimda GEMINI_API_KEY hozircha kiritilmagan, lekin siz platformamizdagi 7 ta to'liq modul, 10 xil interaktiv o'yin, testlar markazi va metodik xazina vositalaridan to'liq foydalanishingiz mumkin!"
        : language === 'ru'
        ? "Здравствуйте! Я методический наставник AI Устоз по методике преподавания узбекского глагола. В текущей среде GEMINI_API_KEY не задан, но все 7 учебных модулей, 10 интерактивных игр, тесты и методические конструкторы работают автономно!"
        : "Hello! I am AI Ustoz, your pedagogical mentor for Uzbek verb methodology. GEMINI_API_KEY is not configured in this environment, but all 7 comprehensive modules, 10 interactive games, test center, and teaching toolboxes are fully functional!"
    });
  }

  try {
    const ai = new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });

    const systemPrompt = `You are "AI Ustoz" (AI Mentor), an expert methodology professor in Uzbek linguistics and "Ona tili o'qitish metodikasi" (Methodology of teaching the native language in secondary schools and pedagogical universities).
Your mission is to guide university students, future teachers, and educators on the topic: "Fe'lni o'rgatish metodikasi" (Verb teaching methodology in Uzbek).
Guidelines:
1. Respond in the requested language: ${language === 'uz' ? "O'zbek tili (Lotin yozuvida)" : language === 'ru' ? "Русский язык" : "English"}.
2. When mentioning Uzbek grammatical terms and examples (e.g. fe'l zamonlari, nisbatlar: aniq, o'zlik, majhul, orttirma, birgalik; mayllar; sifatdosh, ravishdosh; bo'lishli/bo'lishsiz; Klaster, Venn diagrammasi, Sinkvein, Zanjir metodi, Aqliy hujum), keep the Uzbek terminology and provide concise explanations.
3. Be inspiring, pedagogically accurate, structured, and practical.
4. If asked for a lesson plan (Dars ishlanmasi) or exercise idea, provide clear 5-stage lesson structure (Tashkiliy qism, Takrorlash / Yangi mavzuga yo'naltirish, Yangi mavzu bayoni, Mustahkamlash mashqlari, Baholash va uyga vazifa) with estimated minutes and interactive pedagogical methods.
5. Provide actionable teaching tips, prevent common school learner mistakes, and explain why interactive methods work.`;

    const contents: any[] = [];
    if (Array.isArray(history)) {
      for (const turn of history.slice(-6)) {
        if (turn.role && turn.text) {
          contents.push({
            role: turn.role === 'assistant' ? 'model' : 'user',
            parts: [{ text: turn.text }]
          });
        }
      }
    }
    contents.push({
      role: 'user',
      parts: [{ text: message }]
    });

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: contents,
      config: {
        systemInstruction: systemPrompt,
        temperature: 0.7,
      }
    });

    const replyText = response.text || "Kechirasiz, javob shakllantirishda noaniqlik yuz berdi.";
    res.json({ reply: replyText });
  } catch (error: any) {
    console.error('Gemini API Error:', error);
    res.status(500).json({
      error: 'AI xizmatida xatolik yuz berdi.',
      details: error?.message || 'Unknown error'
    });
  }
});

// Vite middleware for dev or express.static for prod
const isProduction = process.env.NODE_ENV === 'production';

async function startServer() {
  if (!isProduction) {
    const { createServer } = await import('vite');
    const vite = await createServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  }

  app.listen(port, '0.0.0.0', () => {
    console.log(`Server listening on http://0.0.0.0:${port}`);
  });
}

startServer();
