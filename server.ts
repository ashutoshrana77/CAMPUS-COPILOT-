import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';
import { INITIAL_DOCUMENTS } from './src/data/initialDocuments.ts';
import { AcademicDocument } from './src/types/index.ts';
import { searchDocuments, chunkDocument } from './src/utils/ragEngine.ts';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = parseInt(process.env.PORT || '3000', 10);

app.use(express.json({ limit: '25mb' }));
app.use(express.urlencoded({ extended: true, limit: '25mb' }));

// In-memory document store initialized with BIT records
let documentsDatabase: AcademicDocument[] = JSON.parse(JSON.stringify(INITIAL_DOCUMENTS));

// Pre-chunk all initial documents
documentsDatabase.forEach(doc => {
  doc.chunks = chunkDocument(doc);
});

// Initialize Gemini Client if key available
let geminiAI: GoogleGenAI | null = null;
if (process.env.GEMINI_API_KEY) {
  try {
    geminiAI = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  } catch (err) {
    console.warn('Gemini initialization error:', err);
  }
}

// ----------------------------------------------------
// API ROUTES
// ----------------------------------------------------

// 1. GET /api/documents - list all documents
app.get('/api/documents', (req, res) => {
  res.json({
    success: true,
    documents: documentsDatabase,
    total: documentsDatabase.length
  });
});

// 2. POST /api/ingest - ingest new academic document
app.post('/api/ingest', (req, res) => {
  try {
    const { title, course, semester, type, tags, content, fileName, fileSize, author, department } = req.body;

    if (!title || !course) {
      return res.status(400).json({ error: 'Title and Course are required fields.' });
    }

    const docId = `doc-${Date.now()}`;
    const sanitizedFileName = fileName || `${title.replace(/\s+/g, '_')}.pdf`;
    const docTags = Array.isArray(tags) 
      ? tags 
      : (typeof tags === 'string' ? tags.split(',').map((t: string) => t.trim()).filter(Boolean) : []);

    const newDoc: AcademicDocument = {
      id: docId,
      title,
      course,
      semester: semester || 'All',
      type: type || 'NOTES',
      file_path: `uploads/${sanitizedFileName}`,
      file_name: sanitizedFileName,
      file_size: fileSize || '250 KB',
      upload_date: new Date().toISOString().replace('T', ' ').substring(0, 19),
      tags: docTags,
      content: content || `Bharat Institute of Technology academic document: ${title} for course ${course}.`,
      author: author || 'BIT Faculty',
      department: department || 'Computer Science & Engineering'
    };

    // Generate chunks
    newDoc.chunks = chunkDocument(newDoc);

    // Save to database
    documentsDatabase.unshift(newDoc);

    res.json({
      success: true,
      document: newDoc,
      chunks_count: newDoc.chunks.length,
      message: `Document '${title}' ingested and indexed successfully.`
    });
  } catch (err: any) {
    res.status(500).json({ error: err.message || 'Ingestion failed' });
  }
});

// 3. POST /api/query - student chat RAG query
app.post('/api/query', async (req, res) => {
  try {
    const { question, filters } = req.body;
    if (!question || !question.trim()) {
      return res.status(400).json({ error: 'Question is required.' });
    }

    const courseFilter = filters?.course || 'All';
    const typeFilter = filters?.type || 'All';

    // 1. Perform semantic retrieval across BIT documents
    const retrievalResult = searchDocuments(question, documentsDatabase, courseFilter, typeFilter);

    // 2. If Gemini API is available and there are retrieved sources, use Gemini for synthesis
    if (geminiAI && retrievalResult.matchedChunks.length > 0) {
      try {
        const contextText = retrievalResult.matchedChunks
          .map((m, idx) => `[Source ${idx + 1}: ${m.chunk.metadata.title} (${m.chunk.metadata.course} - ${m.chunk.metadata.type})]\n${m.chunk.text}`)
          .join('\n\n');

        const systemPrompt = `You are the official academic AI "Campus Copilot" for Bharat Institute of Technology (BIT) students and faculty.
Motto of BIT: "सिद्धिर्भवति कर्मजा" (Success is born of hard work).
Your instructions:
- Provide concise, precise, friendly, and factual academic answers based STRICTLY on the provided documents.
- For deadlines or exam dates, state the date directly and clearly.
- If asked about an assignment, mention the deadline and core topics.
- Keep responses within 2 to 4 clear paragraphs or bullet points.
- Cite the relevant document titles.
- If the question cannot be answered from the documents, politely state so and advise contacting the BIT department office.`;

        const prompt = `Student Question: "${question}"

Relevant BIT Academic Documents Context:
${contextText}

Provide an accurate, helpful answer for the Bharat Institute of Technology student based on this context.`;

        const aiResponse = await geminiAI.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: prompt,
          config: {
            systemInstruction: systemPrompt,
            temperature: 0.2
          }
        });

        if (aiResponse.text) {
          retrievalResult.answer = aiResponse.text;
        }
      } catch (geminiError) {
        console.warn('Gemini generateContent fallback to rule-based RAG:', geminiError);
        // retrievalResult.answer already populated by rule-based RAG engine
      }
    }

    res.json(retrievalResult);
  } catch (err: any) {
    res.status(500).json({ error: err.message || 'Error processing query' });
  }
});

// 4. POST /api/admin/login
app.post('/api/admin/login', (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required.' });
  }

  // Demo admin credentials for Bharat Institute of Technology
  if (email.toLowerCase().includes('admin') || email.toLowerCase().includes('@bit.ac.in')) {
    return res.json({
      success: true,
      user: {
        id: 1,
        email: email,
        name: 'BIT Academic Administrator',
        role: 'ADMIN',
        department: 'Academic & Examination Cell'
      }
    });
  }

  return res.status(401).json({ error: 'Invalid credentials. Use admin@bit.ac.in or any admin email.' });
});

// 5. POST /api/documents/delete
app.post('/api/documents/delete', (req, res) => {
  const { id } = req.body;
  if (!id) return res.status(400).json({ error: 'Document ID required.' });
  documentsDatabase = documentsDatabase.filter(d => d.id !== id);
  res.json({ success: true, message: 'Document removed successfully.' });
});

// ----------------------------------------------------
// VITE DEV SERVER / STATIC ASSETS
// ----------------------------------------------------
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`✨ Bharat Institute of Technology Campus Copilot running at http://localhost:${PORT}`);
  });
}

startServer();
