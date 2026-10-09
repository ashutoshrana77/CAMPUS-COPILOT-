import React, { useState } from 'react';
import { AcademicDocument, DocumentType } from '../types';
import { 
  Search, 
  Filter, 
  FileText, 
  Calendar, 
  User, 
  Download, 
  Eye, 
  MessageSquare, 
  Tag, 
  Sparkles,
  BellRing
} from 'lucide-react';
import { BitLogo } from './BitLogo';

interface DocumentLibraryProps {
  documents: AcademicDocument[];
  onOpenDocumentPreview: (doc: AcademicDocument) => void;
  onAskAboutDocument: (doc: AcademicDocument) => void;
}

export const DocumentLibrary: React.FC<DocumentLibraryProps> = ({
  documents,
  onOpenDocumentPreview,
  onAskAboutDocument
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<string>('All');
  const [selectedCourse, setSelectedCourse] = useState<string>('All');

  const filteredDocs = documents.filter((doc) => {
    const matchesSearch =
      doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesType = selectedType === 'All' || doc.type === selectedType;
    const matchesCourse = selectedCourse === 'All' || doc.course === selectedCourse;

    return matchesSearch && matchesType && matchesCourse;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      {/* College Notice Header */}
      <div className="bg-gradient-to-r from-[#071b4a] via-[#0a2558] to-[#1e3a8a] text-white p-6 rounded-2xl shadow-md border-b-4 border-amber-500 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="p-2 bg-white/10 rounded-2xl backdrop-blur-xs border border-white/20">
            <BitLogo size={56} />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="bg-amber-400 text-blue-950 font-black text-[10px] px-2 py-0.5 rounded uppercase">
                BIT Digital Library
              </span>
              <span className="text-blue-200 text-xs">Official Course Material & Notices</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              Academic Documents & Notice Board
            </h2>
            <p className="text-xs text-blue-200 mt-0.5">
              Verified lecture notes, assignment problem sets, exam blueprints, and institutional circulars.
            </p>
          </div>
        </div>

        <div className="bg-blue-950/60 border border-blue-400/30 rounded-xl p-3 text-center sm:text-right">
          <div className="text-2xl font-black text-amber-400">{documents.length}</div>
          <div className="text-[11px] text-blue-200 font-semibold uppercase tracking-wider">
            Verified Documents
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl shadow-xs border border-slate-200 flex flex-wrap items-center justify-between gap-3">
        {/* Search */}
        <div className="flex-1 min-w-[240px] relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search notes, assignments, topics, keywords (e.g. Normalization, Deadline, Banker's)..."
            className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-900"
          />
        </div>

        {/* Filters */}
        <div className="flex items-center gap-2">
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="text-xs font-semibold bg-slate-50 border border-slate-300 text-slate-800 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-900"
          >
            <option value="All">All Types</option>
            <option value="NOTES">Notes</option>
            <option value="ASSIGNMENT">Assignments</option>
            <option value="NOTICE">Notices</option>
            <option value="SYLLABUS">Syllabus</option>
            <option value="EVENT">Events</option>
          </select>

          <select
            value={selectedCourse}
            onChange={(e) => setSelectedCourse(e.target.value)}
            className="text-xs font-semibold bg-slate-50 border border-slate-300 text-slate-800 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-900"
          >
            <option value="All">All Courses</option>
            <option value="DSA">DSA</option>
            <option value="DBMS">DBMS</option>
            <option value="OS">Operating Systems</option>
            <option value="General">General / Circulars</option>
          </select>
        </div>
      </div>

      {/* Documents Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredDocs.map((doc) => {
          const isAssignment = doc.type === 'ASSIGNMENT';
          const isNotice = doc.type === 'NOTICE';

          return (
            <div
              key={doc.id}
              className={`bg-white rounded-2xl shadow-xs border transition-all duration-200 hover:shadow-md flex flex-col justify-between overflow-hidden group ${
                isNotice ? 'border-rose-200 ring-1 ring-rose-100' : 'border-slate-200'
              }`}
            >
              <div className="p-5 space-y-3">
                {/* Badges */}
                <div className="flex items-center justify-between gap-2">
                  <span
                    className={`text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider ${
                      isAssignment
                        ? 'bg-amber-100 text-amber-950 border border-amber-300'
                        : isNotice
                        ? 'bg-rose-100 text-rose-950 border border-rose-300 flex items-center gap-1'
                        : doc.type === 'NOTES'
                        ? 'bg-blue-100 text-blue-950 border border-blue-300'
                        : 'bg-emerald-100 text-emerald-950 border border-emerald-300'
                    }`}
                  >
                    {isNotice && <BellRing className="w-2.5 h-2.5" />}
                    {doc.type}
                  </span>
                  <span className="text-[11px] font-bold text-slate-500">
                    {doc.course} • {doc.semester}
                  </span>
                </div>

                {/* Title */}
                <h3 className="font-bold text-slate-900 text-sm leading-snug group-hover:text-blue-900 transition-colors">
                  {doc.title}
                </h3>

                {/* Snippet */}
                <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                  {doc.content}
                </p>

                {/* Tags */}
                {doc.tags && doc.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1 pt-1">
                    {doc.tags.slice(0, 3).map((tag, i) => (
                      <span
                        key={i}
                        className="bg-slate-100 text-slate-600 text-[10px] font-medium px-2 py-0.5 rounded-full"
                      >
                        #{tag}
                      </span>
                    ))}
                    {doc.tags.length > 3 && (
                      <span className="text-[10px] text-slate-400 self-center">
                        +{doc.tags.length - 3} more
                      </span>
                    )}
                  </div>
                )}
              </div>

              {/* Card Footer */}
              <div className="bg-slate-50 px-5 py-3 border-t border-slate-100 flex items-center justify-between gap-2">
                <span className="text-[11px] text-slate-400 truncate max-w-[140px]">
                  {doc.upload_date.split(' ')[0]}
                </span>
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => onAskAboutDocument(doc)}
                    className="flex items-center gap-1 px-2.5 py-1 bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300 rounded-lg text-xs font-bold transition-colors cursor-pointer"
                    title="Ask Copilot about this document"
                  >
                    <MessageSquare className="w-3 h-3 text-amber-700" />
                    <span>Ask Copilot</span>
                  </button>
                  <button
                    onClick={() => onOpenDocumentPreview(doc)}
                    className="flex items-center gap-1 px-2.5 py-1 bg-blue-900 hover:bg-blue-800 text-white rounded-lg text-xs font-bold transition-colors cursor-pointer"
                  >
                    <Eye className="w-3 h-3" />
                    <span>Read</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
