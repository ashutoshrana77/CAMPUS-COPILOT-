import React, { useState } from 'react';
import { AcademicDocument, DocumentType } from '../types';
import { BitLogo } from './BitLogo';
import { 
  Upload, 
  FileText, 
  CheckCircle, 
  Layers, 
  Trash2, 
  Eye, 
  Lock, 
  LogOut, 
  Plus, 
  Server, 
  Sparkles,
  AlertCircle
} from 'lucide-react';

interface AdminDashboardProps {
  documents: AcademicDocument[];
  isAdminLoggedIn: boolean;
  onAdminLogin: (email: string, pass: string) => Promise<boolean>;
  onAdminLogout: () => void;
  onUploadDocument: (docData: {
    title: string;
    course: string;
    semester: string;
    type: DocumentType;
    tags: string;
    content: string;
    fileName: string;
  }) => Promise<void>;
  onDeleteDocument: (id: string) => Promise<void>;
  onOpenDocumentPreview: (doc: AcademicDocument) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  documents,
  isAdminLoggedIn,
  onAdminLogin,
  onAdminLogout,
  onUploadDocument,
  onDeleteDocument,
  onOpenDocumentPreview
}) => {
  // Login State
  const [loginEmail, setLoginEmail] = useState('admin@bit.ac.in');
  const [loginPassword, setLoginPassword] = useState('admin123');
  const [loginError, setLoginError] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // Upload Form State
  const [title, setTitle] = useState('');
  const [course, setCourse] = useState('DSA');
  const [semester, setSemester] = useState('Sem 3');
  const [type, setType] = useState<DocumentType>('ASSIGNMENT');
  const [tags, setTags] = useState('');
  const [content, setContent] = useState('');
  const [fileName, setFileName] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState('');
  const [uploadError, setUploadError] = useState('');

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggingIn(true);
    setLoginError('');
    try {
      const success = await onAdminLogin(loginEmail, loginPassword);
      if (!success) {
        setLoginError('Invalid credentials. For BIT admin demo, use admin@bit.ac.in / admin123');
      }
    } catch {
      setLoginError('Login failed. Please check network.');
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleFileUploadSim = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
      if (!title) {
        setTitle(file.name.replace(/\.[^/.]+$/, '').replace(/_/g, ' '));
      }
      const reader = new FileReader();
      reader.onload = (event) => {
        const text = event.target?.result as string;
        if (text) {
          setContent(text);
        }
      };
      reader.readAsText(file);
    }
  };

  const handleUploadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      setUploadError('Document title is required.');
      return;
    }
    if (!content.trim()) {
      setUploadError('Please provide document content or upload a text/markdown file.');
      return;
    }

    setIsUploading(true);
    setUploadError('');
    setUploadSuccess('');

    try {
      await onUploadDocument({
        title,
        course,
        semester,
        type,
        tags,
        content,
        fileName: fileName || `${title.replace(/\s+/g, '_')}.pdf`
      });

      setUploadSuccess(`"${title}" successfully ingested and indexed into Vector DB!`);
      // Reset form
      setTitle('');
      setTags('');
      setContent('');
      setFileName('');
    } catch (err: any) {
      setUploadError(err.message || 'Failed to upload document');
    } finally {
      setIsUploading(false);
    }
  };

  // -----------------------------------------------------------
  // IF NOT LOGGED IN: SHOW ADMIN LOGIN FORM (adminLogin.jsp)
  // -----------------------------------------------------------
  if (!isAdminLoggedIn) {
    return (
      <div className="max-w-md mx-auto my-12 px-4">
        <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-[#071b4a] to-[#103174] text-white p-6 text-center border-b-4 border-amber-500">
            <div className="flex justify-center mb-3">
              <BitLogo size={68} />
            </div>
            <h2 className="text-xl font-bold tracking-tight">BHARAT INSTITUTE OF TECHNOLOGY</h2>
            <p className="text-xs text-amber-400 font-semibold uppercase tracking-wider mt-1">
              Admin & Operator Login Portal
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleLoginSubmit} className="p-6 space-y-4">
            {loginError && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-xs text-red-700 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{loginError}</span>
              </div>
            )}

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Official Email (BIT Domain)
              </label>
              <input
                type="email"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                placeholder="admin@bit.ac.in"
                required
                className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-900"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Password
              </label>
              <input
                type="password"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-900"
              />
            </div>

            <div className="p-2.5 bg-blue-50 border border-blue-200 rounded-xl text-[11px] text-blue-900 leading-snug">
              <strong>Demo Administrator Credentials:</strong><br />
              Email: <code className="bg-white px-1 py-0.5 rounded font-mono">admin@bit.ac.in</code> | Password: <code className="bg-white px-1 py-0.5 rounded font-mono">admin123</code>
            </div>

            <button
              type="submit"
              disabled={isLoggingIn}
              className="w-full py-3 bg-gradient-to-r from-[#0a2558] to-[#1e3a8a] text-white rounded-xl font-bold text-sm shadow-md hover:brightness-110 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Lock className="w-4 h-4 text-amber-400" />
              <span>{isLoggingIn ? 'Authenticating...' : 'Sign In as BIT Admin'}</span>
            </button>
          </form>
        </div>
      </div>
    );
  }

  // -----------------------------------------------------------
  // ADMIN DASHBOARD (adminDashboard.jsp)
  // -----------------------------------------------------------
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      {/* Top Banner */}
      <div className="bg-white rounded-2xl shadow-xs border border-slate-200 p-5 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-50 rounded-xl border border-blue-200">
            <BitLogo size={44} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-bold text-slate-900">
                Academic Document Management & Vector Ingestion
              </h2>
              <span className="bg-emerald-100 text-emerald-800 text-[10px] font-black px-2 py-0.5 rounded uppercase">
                Admin Active
              </span>
            </div>
            <p className="text-xs text-slate-500">
              Department of Computer Science & Engineering • Bharat Institute of Technology
            </p>
          </div>
        </div>

        <button
          onClick={onAdminLogout}
          className="flex items-center gap-1.5 px-3 py-2 bg-slate-100 hover:bg-red-50 text-slate-700 hover:text-red-700 rounded-xl text-xs font-bold transition-colors border border-slate-200 cursor-pointer"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Logout Operator</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Upload Form Card */}
        <div className="lg:col-span-5 bg-white rounded-2xl shadow-xs border border-slate-200 p-5 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-200">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Upload className="w-4 h-4 text-blue-900" />
              <span>Upload Document & Ingest to RAG</span>
            </h3>
            <span className="text-[11px] bg-amber-100 text-amber-900 font-bold px-2 py-0.5 rounded-full">
              FastAPI / ChromaDB
            </span>
          </div>

          {uploadSuccess && (
            <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-800 flex items-center gap-2">
              <CheckCircle className="w-4 h-4 shrink-0 text-emerald-600" />
              <span>{uploadSuccess}</span>
            </div>
          )}

          {uploadError && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-800 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
              <span>{uploadError}</span>
            </div>
          )}

          <form onSubmit={handleUploadSubmit} className="space-y-3.5 text-xs">
            <div>
              <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                Document Title *
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. DSA Assignment 2 - Trees & Graphs"
                required
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-900"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Course
                </label>
                <select
                  value={course}
                  onChange={(e) => setCourse(e.target.value)}
                  className="w-full px-2.5 py-2 bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-900 font-medium"
                >
                  <option value="DSA">DSA</option>
                  <option value="DBMS">DBMS</option>
                  <option value="OS">Operating Systems</option>
                  <option value="AI">AI & Machine Learning</option>
                  <option value="Networks">Computer Networks</option>
                  <option value="General">General / Circulars</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Semester
                </label>
                <select
                  value={semester}
                  onChange={(e) => setSemester(e.target.value)}
                  className="w-full px-2.5 py-2 bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-900 font-medium"
                >
                  <option value="Sem 3">Sem 3</option>
                  <option value="Sem 4">Sem 4</option>
                  <option value="Sem 5">Sem 5</option>
                  <option value="Sem 6">Sem 6</option>
                  <option value="Sem 7">Sem 7</option>
                  <option value="All">All Semesters</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Type
                </label>
                <select
                  value={type}
                  onChange={(e) => setType(e.target.value as DocumentType)}
                  className="w-full px-2.5 py-2 bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-900 font-medium"
                >
                  <option value="ASSIGNMENT">ASSIGNMENT</option>
                  <option value="NOTES">NOTES</option>
                  <option value="NOTICE">NOTICE</option>
                  <option value="SYLLABUS">SYLLABUS</option>
                  <option value="EVENT">EVENT</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Tags (comma-separated)
                </label>
                <input
                  type="text"
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                  placeholder="arrays, deadline, viva"
                  className="w-full px-2.5 py-2 bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-900"
                />
              </div>
            </div>

            <div>
              <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                Upload File (or paste text below)
              </label>
              <input
                type="file"
                onChange={handleFileUploadSim}
                accept=".txt,.pdf,.docx,.md"
                className="w-full text-xs text-slate-500 file:mr-2 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-bold file:bg-blue-50 file:text-blue-900 hover:file:bg-blue-100"
              />
              {fileName && (
                <span className="text-[11px] text-blue-900 font-mono mt-1 block">
                  Selected: {fileName}
                </span>
              )}
            </div>

            <div>
              <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                Document Content / Text Extract *
              </label>
              <textarea
                rows={5}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Paste the syllabus text, assignment problem statements, submission deadline, or lecture notes..."
                required
                className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-900 font-mono text-[11px]"
              />
            </div>

            <button
              type="submit"
              disabled={isUploading}
              className="w-full py-2.5 bg-gradient-to-r from-[#0a2558] to-[#1e3a8a] text-white rounded-xl font-bold text-xs shadow-md hover:brightness-110 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>{isUploading ? 'Chunking & Ingesting Vectors...' : 'Upload & Ingest into Vector Store'}</span>
            </button>
          </form>
        </div>

        {/* Ingested Documents List */}
        <div className="lg:col-span-7 bg-white rounded-2xl shadow-xs border border-slate-200 p-5 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-200">
            <div>
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <FileText className="w-4 h-4 text-blue-900" />
                <span>Indexed Documents Repository</span>
              </h3>
              <p className="text-[11px] text-slate-500 mt-0.5">
                Total documents available for student Q&A: <strong>{documents.length}</strong>
              </p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase tracking-wider font-bold">
                <tr>
                  <th className="py-2.5 px-3">Title & Course</th>
                  <th className="py-2.5 px-3">Type</th>
                  <th className="py-2.5 px-3">Chunks</th>
                  <th className="py-2.5 px-3">Date</th>
                  <th className="py-2.5 px-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {documents.map((doc) => (
                  <tr key={doc.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-2.5 px-3 max-w-[200px]">
                      <div className="font-bold text-slate-900 truncate" title={doc.title}>
                        {doc.title}
                      </div>
                      <div className="flex items-center gap-1.5 text-[10px] text-slate-500 mt-0.5">
                        <span className="font-semibold text-blue-900">{doc.course}</span>
                        <span>•</span>
                        <span>{doc.semester}</span>
                      </div>
                    </td>
                    <td className="py-2.5 px-3">
                      <span className={`text-[10px] font-black px-2 py-0.5 rounded uppercase ${
                        doc.type === 'ASSIGNMENT' ? 'bg-amber-100 text-amber-900' :
                        doc.type === 'NOTES' ? 'bg-blue-100 text-blue-900' :
                        doc.type === 'NOTICE' ? 'bg-rose-100 text-rose-900' :
                        doc.type === 'SYLLABUS' ? 'bg-emerald-100 text-emerald-900' :
                        'bg-purple-100 text-purple-900'
                      }`}>
                        {doc.type}
                      </span>
                    </td>
                    <td className="py-2.5 px-3">
                      <span className="font-mono text-[11px] bg-slate-100 px-1.5 py-0.5 rounded text-slate-700">
                        {doc.chunks?.length || 1}
                      </span>
                    </td>
                    <td className="py-2.5 px-3 text-slate-500 text-[11px]">
                      {doc.upload_date.split(' ')[0]}
                    </td>
                    <td className="py-2.5 px-3 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => onOpenDocumentPreview(doc)}
                          className="p-1.5 hover:bg-blue-50 text-blue-900 rounded-lg transition-colors cursor-pointer"
                          title="Preview document & chunks"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => onDeleteDocument(doc.id)}
                          className="p-1.5 hover:bg-red-50 text-red-600 rounded-lg transition-colors cursor-pointer"
                          title="Delete from knowledge base"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
