import React, { useState } from 'react';
import { AcademicDocument } from '../types';
import { X, FileText, Download, Calendar, Tag, User, Building2, Layers } from 'lucide-react';
import { BitLogo } from './BitLogo';

interface DocumentPreviewModalProps {
  document: AcademicDocument | null;
  onClose: () => void;
}

export const DocumentPreviewModal: React.FC<DocumentPreviewModalProps> = ({ document, onClose }) => {
  const [activeTab, setActiveTab] = useState<'content' | 'chunks'>('content');

  if (!document) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
      <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] flex flex-col overflow-hidden border border-slate-200 animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#071b4a] to-[#103174] text-white p-4 sm:p-5 flex items-start justify-between border-b-2 border-amber-500">
          <div className="flex items-start gap-3">
            <BitLogo size={42} />
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="bg-amber-400 text-blue-950 text-[10px] font-extrabold px-2 py-0.5 rounded uppercase">
                  {document.type}
                </span>
                <span className="bg-blue-900 text-blue-200 text-[10px] font-bold px-2 py-0.5 rounded border border-blue-700">
                  {document.course} • {document.semester}
                </span>
              </div>
              <h3 className="text-lg font-bold text-white leading-tight">
                {document.title}
              </h3>
              <p className="text-xs text-blue-200/80 mt-0.5">
                {document.department || 'Bharat Institute of Technology'} • Author: {document.author || 'BIT Faculty'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Sub-header navigation & meta */}
        <div className="bg-slate-50 px-5 py-2.5 border-b border-slate-200 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-600">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-slate-400" />
              {document.upload_date}
            </span>
            <span className="flex items-center gap-1">
              <Layers className="w-3.5 h-3.5 text-slate-400" />
              {document.chunks?.length || 1} Vector Chunks
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('content')}
              className={`px-2.5 py-1 rounded font-semibold text-xs transition-colors ${
                activeTab === 'content'
                  ? 'bg-blue-900 text-white'
                  : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
              }`}
            >
              Document Text
            </button>
            <button
              onClick={() => setActiveTab('chunks')}
              className={`px-2.5 py-1 rounded font-semibold text-xs transition-colors ${
                activeTab === 'chunks'
                  ? 'bg-blue-900 text-white'
                  : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
              }`}
            >
              RAG Vector Chunks ({document.chunks?.length || 1})
            </button>
          </div>
        </div>

        {/* Content body */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {activeTab === 'content' ? (
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 font-mono text-xs text-slate-800 whitespace-pre-wrap leading-relaxed">
              {document.content}
            </div>
          ) : (
            <div className="space-y-3">
              <p className="text-xs text-slate-500 font-medium">
                These text chunks are embedded as 384-dimensional vectors in ChromaDB/FAISS for semantic retrieval when students ask questions.
              </p>
              {document.chunks && document.chunks.length > 0 ? (
                document.chunks.map((chunk, idx) => (
                  <div key={chunk.id || idx} className="p-3 bg-amber-50/50 rounded-lg border border-amber-200 text-xs">
                    <div className="flex items-center justify-between mb-1 text-[11px] font-bold text-amber-900">
                      <span>Chunk #{idx + 1} ({chunk.tokens || chunk.text.split(' ').length} words)</span>
                      <span className="font-mono text-[10px] bg-amber-200 text-amber-950 px-1.5 py-0.5 rounded">
                        Vector ID: {chunk.id}
                      </span>
                    </div>
                    <p className="text-slate-800 leading-relaxed font-sans">{chunk.text}</p>
                  </div>
                ))
              ) : (
                <div className="p-3 bg-slate-100 rounded-lg text-xs text-slate-600">
                  {document.content}
                </div>
              )}
            </div>
          )}

          {/* Tags */}
          {document.tags && document.tags.length > 0 && (
            <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-slate-200">
              <span className="text-xs text-slate-500 flex items-center gap-1 mr-1">
                <Tag className="w-3 h-3" /> Tags:
              </span>
              {document.tags.map((tag, i) => (
                <span
                  key={i}
                  className="bg-slate-100 text-slate-700 text-[11px] px-2 py-0.5 rounded-full border border-slate-200"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-slate-100 px-5 py-3 border-t border-slate-200 flex items-center justify-between">
          <span className="text-xs text-slate-500 font-mono">
            {document.file_path}
          </span>
          <button
            onClick={() => {
              const blob = new Blob([document.content], { type: 'text/plain' });
              const url = URL.createObjectURL(blob);
              const a = window.document.createElement('a');
              a.href = url;
              a.download = document.file_name || `${document.title}.txt`;
              a.click();
              URL.revokeObjectURL(url);
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-900 text-white rounded-lg text-xs font-bold hover:bg-blue-800 transition-colors shadow-xs"
          >
            <Download className="w-3.5 h-3.5" />
            Download Document
          </button>
        </div>
      </div>
    </div>
  );
};
