import { GoogleGenAI } from '@google/genai';
import { INITIAL_DOCUMENTS } from '../src/data/initialDocuments';
import { chunkDocument, searchDocuments } from '../src/utils/ragEngine';

export default async function handler(req: any, res: any) {
  res.setHeader('Content-Type', 'application/json');

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed. Use POST.' });
  }

  try {
    const { question, filters } = req.body || {};
    if (!question || !question.trim()) {
      return res.status(400).json({ error: 'Question is required.' });
    }

    const courseFilter = filters?.course || 'All';
    const typeFilter = filters?.type || 'All';

    const docs = INITIAL_DOCUMENTS.map(doc => ({
      ...doc,
      chunks: chunkDocument(doc)
    }));

    const retrievalResult = searchDocuments(question, docs, courseFilter, typeFilter);

    if (process.env.GEMINI_API_KEY && retrievalResult.matchedChunks.length > 0) {
      try {
        const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
        const contextText = retrievalResult.matchedChunks
          .map((m, idx) => `[Source ${idx + 1}: ${m.chunk.metadata.title} (${m.chunk.metadata.course})]\n${m.chunk.text}`)
          .join('\n\n');

        const systemPrompt = `You are the official academic AI "Campus Copilot" for Bharat Institute of Technology (BIT) students and faculty.
Motto of BIT: "सिद्धिर्भवति कर्मजा" (Success is born of hard work).
Provide concise, precise, and friendly academic answers based STRICTLY on the provided documents.`;

        const prompt = `Question: "${question}"\n\nContext:\n${contextText}\n\nProvide an accurate answer:`;

        const response = await ai.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: prompt,
          config: {
            systemInstruction: systemPrompt,
            temperature: 0.2
          }
        });

        if (response.text) {
          retrievalResult.answer = response.text;
        }
      } catch (e) {
        console.warn('Gemini query fallback:', e);
      }
    }

    return res.status(200).json(retrievalResult);
  } catch (err: any) {
    return res.status(500).json({ error: err.message || 'Internal server error' });
  }
}
