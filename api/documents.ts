import { INITIAL_DOCUMENTS } from '../src/data/initialDocuments';
import { chunkDocument } from '../src/utils/ragEngine';

export default function handler(req: any, res: any) {
  res.setHeader('Content-Type', 'application/json');
  const docs = INITIAL_DOCUMENTS.map(doc => ({
    ...doc,
    chunks: chunkDocument(doc)
  }));
  res.status(200).json({
    success: true,
    documents: docs,
    total: docs.length
  });
}
