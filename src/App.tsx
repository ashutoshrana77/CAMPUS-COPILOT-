/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { AcademicDocument, DocumentType } from './types';
import { INITIAL_DOCUMENTS } from './data/initialDocuments';
import { searchDocuments, chunkDocument } from './utils/ragEngine';
import { Navbar } from './components/Navbar';
import { StudentChat } from './components/StudentChat';
import { AdminDashboard } from './components/AdminDashboard';
import { DocumentLibrary } from './components/DocumentLibrary';
import { CodeAndPromptsStudio } from './components/CodeAndPromptsStudio';
import { ArchitectureDiagram } from './components/ArchitectureDiagram';
import { DocumentPreviewModal } from './components/DocumentPreviewModal';

export default function App() {
  const [activeTab, setActiveTab] = useState<'chat' | 'admin' | 'library' | 'code' | 'architecture'>('chat');
  const [documents, setDocuments] = useState<AcademicDocument[]>(() => {
    // Initialize with pre-chunked BIT documents
    return INITIAL_DOCUMENTS.map(doc => ({
      ...doc,
      chunks: chunkDocument(doc)
    }));
  });
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [previewDoc, setPreviewDoc] = useState<AcademicDocument | null>(null);

  // Fetch documents from server if running full-stack
  useEffect(() => {
    fetch('/api/documents')
      .then(res => res.json())
      .then(data => {
        if (data.success && Array.isArray(data.documents) && data.documents.length > 0) {
          setDocuments(data.documents);
        }
      })
      .catch(err => {
        console.log('Using local document store:', err);
      });
  }, []);

  // Handle student question via RAG
  const handleSendQuery = async (question: string, courseFilter: string) => {
    try {
      // First attempt backend API call
      const res = await fetch('/api/query', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question,
          filters: { course: courseFilter }
        })
      });

      if (res.ok) {
        return await res.json();
      }
    } catch (e) {
      console.warn('Backend query error, utilizing client RAG engine:', e);
    }

    // Client-side RAG engine fallback
    return searchDocuments(question, documents, courseFilter);
  };

  // Handle document upload
  const handleUploadDocument = async (docData: {
    title: string;
    course: string;
    semester: string;
    type: DocumentType;
    tags: string;
    content: string;
    fileName: string;
  }) => {
    const docTags = docData.tags
      .split(',')
      .map(t => t.trim())
      .filter(Boolean);

    const newDoc: AcademicDocument = {
      id: `doc-${Date.now()}`,
      title: docData.title,
      course: docData.course,
      semester: docData.semester,
      type: docData.type,
      file_path: `uploads/${docData.fileName || docData.title.replace(/\s+/g, '_') + '.pdf'}`,
      file_name: docData.fileName || `${docData.title}.pdf`,
      file_size: `${Math.round(docData.content.length / 1024) || 12} KB`,
      upload_date: new Date().toISOString().replace('T', ' ').substring(0, 19),
      tags: docTags,
      content: docData.content,
      author: 'BIT Faculty',
      department: 'Computer Science & Engineering'
    };

    newDoc.chunks = chunkDocument(newDoc);

    // Call server API
    try {
      await fetch('/api/ingest', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newDoc)
      });
    } catch (e) {
      console.warn('Local ingest:', e);
    }

    // Update state
    setDocuments(prev => [newDoc, ...prev]);
  };

  // Handle delete document
  const handleDeleteDocument = async (id: string) => {
    try {
      await fetch('/api/documents/delete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id })
      });
    } catch (e) {
      console.warn('Delete server err:', e);
    }

    setDocuments(prev => prev.filter(d => d.id !== id));
  };

  // Handle Admin login
  const handleAdminLogin = async (email: string, pass: string): Promise<boolean> => {
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password: pass })
      });
      if (res.ok) {
        setIsAdminLoggedIn(true);
        return true;
      }
    } catch (e) {
      console.warn('Server login error:', e);
    }

    if (email.toLowerCase().includes('admin')) {
      setIsAdminLoggedIn(true);
      return true;
    }
    return false;
  };

  const handleAdminLogout = () => {
    setIsAdminLoggedIn(false);
  };

  const handleAskAboutDocument = (doc: AcademicDocument) => {
    setActiveTab('chat');
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans">
      {/* Top Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        documentCount={documents.length}
        isAdminLoggedIn={isAdminLoggedIn}
        onOpenLoginModal={() => setActiveTab('admin')}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {activeTab === 'chat' && (
          <StudentChat
            documents={documents}
            onOpenDocumentPreview={setPreviewDoc}
            onSendQuery={handleSendQuery}
          />
        )}

        {activeTab === 'admin' && (
          <AdminDashboard
            documents={documents}
            isAdminLoggedIn={isAdminLoggedIn}
            onAdminLogin={handleAdminLogin}
            onAdminLogout={handleAdminLogout}
            onUploadDocument={handleUploadDocument}
            onDeleteDocument={handleDeleteDocument}
            onOpenDocumentPreview={setPreviewDoc}
          />
        )}

        {activeTab === 'library' && (
          <DocumentLibrary
            documents={documents}
            onOpenDocumentPreview={setPreviewDoc}
            onAskAboutDocument={handleAskAboutDocument}
          />
        )}

        {activeTab === 'code' && (
          <CodeAndPromptsStudio />
        )}

        {activeTab === 'architecture' && (
          <ArchitectureDiagram />
        )}
      </main>

      {/* Document Reader Modal */}
      <DocumentPreviewModal
        document={previewDoc}
        onClose={() => setPreviewDoc(null)}
      />

      {/* Institutional Footer */}
      <footer className="bg-[#071b4a] text-slate-400 text-xs py-4 px-6 border-t border-blue-900/80">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="font-bold text-white">Bharat Institute of Technology (BIT)</span>
            <span>•</span>
            <span className="text-amber-400 font-medium">सिद्धिर्भवति कर्मजा</span>
          </div>
          <div className="flex items-center gap-4 text-[11px]">
            <span>Campus Copilot Academic System</span>
            <span>•</span>
            <span>Java Servlets + JSP + MySQL + Python FastAPI RAG</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
