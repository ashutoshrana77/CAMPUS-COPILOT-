export type DocumentType = 'NOTES' | 'ASSIGNMENT' | 'NOTICE' | 'SYLLABUS' | 'EVENT';

export interface DocumentChunk {
  id: string;
  documentId: string;
  text: string;
  chunkIndex: number;
  tokens?: number;
  metadata: {
    title: string;
    course: string;
    semester: string;
    type: DocumentType;
    tags: string[];
  };
}

export interface AcademicDocument {
  id: string;
  title: string;
  course: string; // e.g. "DSA", "DBMS", "OS", "General"
  semester: string; // e.g. "Sem 3", "Sem 4", "Sem 5"
  type: DocumentType;
  file_path: string;
  file_name: string;
  file_size?: string;
  upload_date: string;
  tags: string[];
  content: string; // text content for chunking & retrieval
  chunks?: DocumentChunk[];
  author?: string;
  department?: string; // e.g. "Computer Science & Engineering"
}

export interface ChatMessage {
  id: string;
  sender: 'student' | 'copilot';
  text: string;
  timestamp: string;
  sources?: {
    id: string;
    title: string;
    course: string;
    file_path: string;
    type: DocumentType;
    snippet?: string;
  }[];
  followUpAction?: {
    prompt: string;
    topic: string;
    actionLabel: string;
    course?: string;
  };
  isAssignmentQuery?: boolean;
}

export interface User {
  id: number;
  email: string;
  role: 'ADMIN' | 'STUDENT';
  name?: string;
  department?: string;
}

export interface ModularPrompt {
  id: string;
  number: number;
  title: string;
  badge: string;
  summary: string;
  targetStack: string;
  promptText: string;
  filesGenerated: string[];
  keyTips: string[];
}

export interface SourceCodeFile {
  id: string;
  name: string;
  category: 'database' | 'python_rag' | 'java_backend' | 'jsp_frontend' | 'config';
  language: 'sql' | 'python' | 'java' | 'html' | 'xml' | 'json';
  path: string;
  description: string;
  code: string;
}
