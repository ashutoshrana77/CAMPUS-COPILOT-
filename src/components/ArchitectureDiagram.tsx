import React from 'react';
import { BitLogo } from './BitLogo';
import { 
  Bot, 
  Shield, 
  Server, 
  Database, 
  Layers, 
  Sparkles, 
  ArrowRight, 
  ArrowDown, 
  FileCode, 
  CheckCircle,
  ExternalLink
} from 'lucide-react';

export const ArchitectureDiagram: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#071b4a] via-[#0a2558] to-[#103174] text-white p-6 rounded-2xl shadow-md border-b-4 border-amber-500 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="p-2 bg-white/10 rounded-2xl backdrop-blur-xs border border-white/20">
            <BitLogo size={52} />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="bg-amber-400 text-blue-950 font-black text-[10px] px-2 py-0.5 rounded uppercase">
                System Design & Microservice Flow
              </span>
              <span className="text-blue-200 text-xs">Bharat Institute of Technology</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              Campus Copilot Architecture & Data Pipeline
            </h2>
            <p className="text-xs text-blue-200 mt-0.5">
              Decoupled Java Servlet & JSP Web Architecture + High-Performance Python RAG Vector Microservice.
            </p>
          </div>
        </div>

        <div className="bg-blue-950/70 border border-blue-400/30 rounded-xl p-3 text-center sm:text-right">
          <span className="text-xs text-blue-200 block font-semibold">Inter-Service Protocol</span>
          <span className="text-amber-400 font-mono font-bold text-sm">HTTP / REST JSON</span>
        </div>
      </div>

      {/* Visual Pipeline Map */}
      <div className="bg-white rounded-2xl shadow-xs border border-slate-200 p-6 space-y-8">
        <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">
          End-to-End Request & Data Lifecycle
        </div>

        {/* 1. Student Chat Flow */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <span className="bg-blue-900 text-white text-xs font-bold px-2.5 py-0.5 rounded-full">
              Flow 1
            </span>
            <h3 className="font-bold text-slate-900 text-sm">
              Student Query & Grounded Answer Retrieval
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs">
            {/* Step 1 */}
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2 relative">
              <div className="font-bold text-blue-950 flex items-center gap-2">
                <Bot className="w-4 h-4 text-blue-900" />
                <span>1. Student Chat (chat.jsp)</span>
              </div>
              <p className="text-slate-600 leading-relaxed text-[11px]">
                Student asks: <br />
                <em className="text-slate-800">"What is the deadline for DSA assignment?"</em>
              </p>
              <div className="text-[10px] bg-slate-200 text-slate-700 px-2 py-0.5 rounded font-mono inline-block">
                AJAX fetch()
              </div>
            </div>

            {/* Step 2 */}
            <div className="p-4 bg-blue-50/70 rounded-xl border border-blue-200 space-y-2 relative">
              <div className="font-bold text-blue-950 flex items-center gap-2">
                <FileCode className="w-4 h-4 text-blue-900" />
                <span>2. Java ChatServlet</span>
              </div>
              <p className="text-slate-600 leading-relaxed text-[11px]">
                Reads question and course filter. Asynchronously delegates over HTTP to Python service.
              </p>
              <div className="text-[10px] bg-blue-200 text-blue-900 px-2 py-0.5 rounded font-mono inline-block">
                POST :8000/query
              </div>
            </div>

            {/* Step 3 */}
            <div className="p-4 bg-amber-50/70 rounded-xl border border-amber-200 space-y-2 relative">
              <div className="font-bold text-amber-950 flex items-center gap-2">
                <Layers className="w-4 h-4 text-amber-700" />
                <span>3. Python RAG Engine</span>
              </div>
              <p className="text-slate-600 leading-relaxed text-[11px]">
                Encodes query via <code className="bg-amber-100 px-1 py-0.2 rounded font-mono">all-MiniLM-L6-v2</code>. Searches ChromaDB for top-k nearest neighbor vector chunks.
              </p>
              <div className="text-[10px] bg-amber-200 text-amber-950 px-2 py-0.5 rounded font-mono inline-block">
                Cosine Similarity
              </div>
            </div>

            {/* Step 4 */}
            <div className="p-4 bg-emerald-50/70 rounded-xl border border-emerald-200 space-y-2 relative">
              <div className="font-bold text-emerald-950 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-emerald-700" />
                <span>4. Synthesized Answer</span>
              </div>
              <p className="text-slate-600 leading-relaxed text-[11px]">
                Synthesizes response citing verified BIT sources. Triggers follow-up study material prompt if assignment query!
              </p>
              <div className="text-[10px] bg-emerald-200 text-emerald-950 px-2 py-0.5 rounded font-mono inline-block">
                Document Grounded
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <hr className="border-slate-200" />

        {/* 2. Admin Document Ingestion Flow */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <span className="bg-amber-500 text-blue-950 text-xs font-bold px-2.5 py-0.5 rounded-full">
              Flow 2
            </span>
            <h3 className="font-bold text-slate-900 text-sm">
              Admin Document Upload & Vector Ingestion Pipeline
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs">
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
              <div className="font-bold text-blue-950 flex items-center gap-2">
                <Shield className="w-4 h-4 text-blue-900" />
                <span>1. Admin Portal (adminDashboard.jsp)</span>
              </div>
              <p className="text-slate-600 leading-relaxed text-[11px]">
                Faculty/Admin uploads PDF/DOCX with Title, Course, Semester, Type, and Tags.
              </p>
            </div>

            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
              <div className="font-bold text-blue-950 flex items-center gap-2">
                <Database className="w-4 h-4 text-blue-900" />
                <span>2. MySQL & Disk Persistence</span>
              </div>
              <p className="text-slate-600 leading-relaxed text-[11px]">
                File saved to <code className="bg-slate-200 px-1 py-0.2 rounded font-mono">uploads/</code>. Metadata recorded in MySQL <code className="bg-slate-200 px-1 py-0.2 rounded font-mono">documents</code> table.
              </p>
            </div>

            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
              <div className="font-bold text-blue-950 flex items-center gap-2">
                <Server className="w-4 h-4 text-blue-900" />
                <span>3. Ingestion Trigger</span>
              </div>
              <p className="text-slate-600 leading-relaxed text-[11px]">
                Java UploadServlet calls <code className="bg-slate-200 px-1 py-0.2 rounded font-mono">POST /ingest</code> with document text payload.
              </p>
            </div>

            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
              <div className="font-bold text-blue-950 flex items-center gap-2">
                <Layers className="w-4 h-4 text-blue-900" />
                <span>4. Vector Chunking & ChromaDB</span>
              </div>
              <p className="text-slate-600 leading-relaxed text-[11px]">
                Text parsed, split into 400-char chunks with overlap, embedded, and indexed in ChromaDB collection.
              </p>
            </div>
          </div>
        </div>

        {/* Technical Architecture Comparison Table */}
        <div className="pt-4 border-t border-slate-200">
          <div className="font-bold text-slate-800 text-xs mb-3">
            Component Technical Specifications:
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-100 text-slate-700 font-bold">
                <tr>
                  <th className="p-2.5">Component</th>
                  <th className="p-2.5">Technology Stack</th>
                  <th className="p-2.5">Role</th>
                  <th className="p-2.5">Port / Protocol</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-600">
                <tr>
                  <td className="p-2.5 font-bold text-slate-900">Student & Admin Views</td>
                  <td className="p-2.5">JSP + HTML5 + CSS + Fetch API</td>
                  <td className="p-2.5">User Interface & BIT Branding</td>
                  <td className="p-2.5 font-mono">Browser (:8080 or :3000)</td>
                </tr>
                <tr>
                  <td className="p-2.5 font-bold text-slate-900">Backend Application</td>
                  <td className="p-2.5">Java Servlets (Jakarta API) + Apache Tomcat</td>
                  <td className="p-2.5">Authentication, DB access, File saving</td>
                  <td className="p-2.5 font-mono">:8080 (Tomcat)</td>
                </tr>
                <tr>
                  <td className="p-2.5 font-bold text-slate-900">Relational Storage</td>
                  <td className="p-2.5">MySQL 8.0+ / MariaDB</td>
                  <td className="p-2.5">User accounts and document metadata</td>
                  <td className="p-2.5 font-mono">:3306 (MySQL)</td>
                </tr>
                <tr>
                  <td className="p-2.5 font-bold text-slate-900">RAG AI Microservice</td>
                  <td className="p-2.5">Python FastAPI + ChromaDB + sentence-transformers</td>
                  <td className="p-2.5">Semantic chunking, vector indexing & Q&A</td>
                  <td className="p-2.5 font-mono">:8000 (HTTP REST)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
