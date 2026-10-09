import React, { useState } from 'react';
import { MODULAR_PROMPTS, SOURCE_CODE_FILES } from '../data/modularPromptsData';
import { ModularPrompt, SourceCodeFile } from '../types';
import { 
  Code2, 
  Copy, 
  Check, 
  Download, 
  Terminal, 
  Layers, 
  FileCode, 
  Sparkles, 
  Send, 
  CheckCircle2, 
  ExternalLink,
  BookOpen,
  Server,
  Database
} from 'lucide-react';
import { BitLogo } from './BitLogo';

export const CodeAndPromptsStudio: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'prompts' | 'source_code' | 'simulator' | 'guide'>('prompts');
  const [selectedPrompt, setSelectedPrompt] = useState<ModularPrompt>(MODULAR_PROMPTS[0]);
  const [selectedFile, setSelectedFile] = useState<SourceCodeFile>(SOURCE_CODE_FILES[0]);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Simulator State
  const [simQuestion, setSimQuestion] = useState('What is the deadline for the DSA assignment?');
  const [simCourse, setSimCourse] = useState('DSA');
  const [simLoading, setSimLoading] = useState(false);
  const [simResponse, setSimResponse] = useState<any>(null);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleDownloadFile = (file: SourceCodeFile) => {
    const blob = new Blob([file.code], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = file.name;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleRunSimulator = () => {
    setSimLoading(true);
    setTimeout(() => {
      setSimResponse({
        http_status: 200,
        url: 'POST http://localhost:8000/query',
        request_payload: {
          question: simQuestion,
          filters: { course: simCourse }
        },
        rag_processing: {
          embedding_model: 'sentence-transformers/all-MiniLM-L6-v2',
          vector_dimensions: 384,
          top_k_chunks_retrieved: 2,
          cosine_similarity_score: 0.892,
          matched_document: 'DSA Assignment 1 - Linear Data Structures & Complexity'
        },
        response_payload: {
          answer: '20 Oct is the deadline for DSA assignment submission.',
          sources: [
            {
              title: 'DSA Assignment 1 - Linear Data Structures & Complexity',
              file_path: 'uploads/DSA_Assignment1.pdf',
              course: 'DSA',
              type: 'ASSIGNMENT'
            }
          ],
          is_assignment_query: true,
          suggested_followup: 'Do you want any help finishing the assignment?'
        }
      });
      setSimLoading(false);
    }, 450);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      {/* Studio Banner */}
      <div className="bg-gradient-to-r from-[#071b4a] via-[#0a2558] to-[#103174] text-white p-6 rounded-2xl shadow-md border-b-4 border-amber-500 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="p-2 bg-white/10 rounded-2xl backdrop-blur-xs border border-white/20">
            <BitLogo size={52} />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="bg-amber-400 text-blue-950 font-black text-[10px] px-2 py-0.5 rounded uppercase">
                Architecture & Engineering Studio
              </span>
              <span className="text-blue-200 text-xs">Modular Prompts & Full Source Code</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              Campus Copilot Developer Toolkit
            </h2>
            <p className="text-xs text-blue-200 mt-0.5">
              5-Stage Modular Prompts, Complete Java + JSP + MySQL + Python Microservice Code, & HTTP Interop Simulator.
            </p>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-1.5 bg-blue-950/70 p-1.5 rounded-xl border border-blue-400/30">
          <button
            onClick={() => setActiveTab('prompts')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'prompts'
                ? 'bg-amber-500 text-blue-950 shadow-xs'
                : 'text-slate-200 hover:text-white'
            }`}
          >
            5 Modular Prompts
          </button>
          <button
            onClick={() => setActiveTab('source_code')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'source_code'
                ? 'bg-amber-500 text-blue-950 shadow-xs'
                : 'text-slate-200 hover:text-white'
            }`}
          >
            Full Source Code (14 Files)
          </button>
          <button
            onClick={() => setActiveTab('simulator')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'simulator'
                ? 'bg-amber-500 text-blue-950 shadow-xs'
                : 'text-slate-200 hover:text-white'
            }`}
          >
            HTTP API Simulator
          </button>
          <button
            onClick={() => setActiveTab('guide')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'guide'
                ? 'bg-amber-500 text-blue-950 shadow-xs'
                : 'text-slate-200 hover:text-white'
            }`}
          >
            Setup Guide
          </button>
        </div>
      </div>

      {/* ---------------------------------------------------- */}
      {/* TAB 1: MODULAR PROMPTS (Broken into 5 focused stages) */}
      {/* ---------------------------------------------------- */}
      {activeTab === 'prompts' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Prompt Selector List */}
          <div className="lg:col-span-4 space-y-3">
            <div className="text-xs font-bold text-slate-500 uppercase tracking-wider px-1">
              Select Modular Prompt Stage:
            </div>
            {MODULAR_PROMPTS.map((prompt) => (
              <div
                key={prompt.id}
                onClick={() => setSelectedPrompt(prompt)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                  selectedPrompt.id === prompt.id
                    ? 'bg-white border-amber-500 shadow-md ring-2 ring-amber-400/30'
                    : 'bg-white/80 border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[10px] font-black bg-blue-100 text-blue-900 px-2 py-0.5 rounded-full">
                    Stage {prompt.number} • {prompt.badge}
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono">
                    {prompt.targetStack}
                  </span>
                </div>
                <h4 className="font-bold text-slate-900 text-sm leading-snug">
                  {prompt.title}
                </h4>
                <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                  {prompt.summary}
                </p>
              </div>
            ))}
          </div>

          {/* Prompt Detail & Copy */}
          <div className="lg:col-span-8 bg-white rounded-2xl shadow-xs border border-slate-200 overflow-hidden flex flex-col">
            <div className="p-5 border-b border-slate-200 flex flex-wrap items-center justify-between gap-3 bg-slate-50">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="bg-amber-500 text-blue-950 text-[10px] font-black px-2 py-0.5 rounded uppercase">
                    Stage {selectedPrompt.number}
                  </span>
                  <span className="text-xs font-semibold text-slate-600">
                    Stack: {selectedPrompt.targetStack}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-slate-900">
                  {selectedPrompt.title}
                </h3>
              </div>

              <button
                onClick={() => copyToClipboard(selectedPrompt.promptText, selectedPrompt.id)}
                className="flex items-center gap-1.5 px-3.5 py-2 bg-gradient-to-r from-[#0a2558] to-[#1e3a8a] text-white rounded-xl text-xs font-bold hover:brightness-110 transition-all shadow-xs cursor-pointer"
              >
                {copiedId === selectedPrompt.id ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Copied Prompt!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy This Prompt</span>
                  </>
                )}
              </button>
            </div>

            {/* Key Tips */}
            <div className="p-4 bg-amber-50/70 border-b border-amber-200/60">
              <span className="text-xs font-bold text-amber-950 uppercase tracking-wider block mb-1.5">
                Key Design Requirements:
              </span>
              <ul className="text-xs text-amber-900 space-y-1 list-disc list-inside">
                {selectedPrompt.keyTips.map((tip, idx) => (
                  <li key={idx}>{tip}</li>
                ))}
              </ul>
            </div>

            {/* Prompt Text Display */}
            <div className="p-5 flex-1 overflow-y-auto">
              <pre className="text-xs font-mono text-slate-800 whitespace-pre-wrap leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-200 select-all">
                {selectedPrompt.promptText}
              </pre>
            </div>
          </div>
        </div>
      )}

      {/* ---------------------------------------------------- */}
      {/* TAB 2: FULL SOURCE CODE (14 Complete Files) */}
      {/* ---------------------------------------------------- */}
      {activeTab === 'source_code' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* File Explorer */}
          <div className="lg:col-span-4 bg-white rounded-2xl shadow-xs border border-slate-200 p-4 space-y-3">
            <div className="text-xs font-bold text-slate-500 uppercase tracking-wider px-1">
              Project File Hierarchy (14 Files):
            </div>
            <div className="space-y-1 max-h-[620px] overflow-y-auto pr-1">
              {SOURCE_CODE_FILES.map((file) => (
                <button
                  key={file.id}
                  onClick={() => setSelectedFile(file)}
                  className={`w-full text-left p-2.5 rounded-xl text-xs font-semibold transition-all flex items-center justify-between gap-2 ${
                    selectedFile.id === file.id
                      ? 'bg-blue-900 text-white shadow-xs'
                      : 'text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <div className="flex items-center gap-2 truncate">
                    <FileCode className={`w-3.5 h-3.5 shrink-0 ${selectedFile.id === file.id ? 'text-amber-400' : 'text-slate-400'}`} />
                    <span className="truncate">{file.name}</span>
                  </div>
                  <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${
                    selectedFile.id === file.id ? 'bg-blue-800 text-amber-300' : 'bg-slate-100 text-slate-500'
                  }`}>
                    {file.category}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Code Viewer */}
          <div className="lg:col-span-8 bg-slate-900 rounded-2xl shadow-xl overflow-hidden flex flex-col border border-slate-800 text-slate-200">
            {/* Header */}
            <div className="bg-slate-950 px-5 py-3 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3">
              <div>
                <div className="font-mono text-xs text-amber-400 font-bold">
                  {selectedFile.path}
                </div>
                <div className="text-[11px] text-slate-400 mt-0.5">
                  {selectedFile.description}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => copyToClipboard(selectedFile.code, selectedFile.id)}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-xs font-bold transition-colors cursor-pointer"
                >
                  {copiedId === selectedFile.id ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Code</span>
                    </>
                  )}
                </button>
                <button
                  onClick={() => handleDownloadFile(selectedFile)}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-500 hover:bg-amber-600 text-slate-950 rounded-lg text-xs font-black transition-colors cursor-pointer shadow-xs"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download</span>
                </button>
              </div>
            </div>

            {/* Code Body */}
            <div className="p-4 flex-1 overflow-y-auto max-h-[600px] font-mono text-xs leading-relaxed select-all">
              <pre className="text-emerald-400 whitespace-pre-wrap">
                {selectedFile.code}
              </pre>
            </div>
          </div>
        </div>
      )}

      {/* ---------------------------------------------------- */}
      {/* TAB 3: HTTP API SIMULATOR (Java -> Python FastAPI) */}
      {/* ---------------------------------------------------- */}
      {activeTab === 'simulator' && (
        <div className="bg-white rounded-2xl shadow-xs border border-slate-200 p-6 space-y-6">
          <div>
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Server className="w-4 h-4 text-blue-900" />
              <span>Inter-Service Communication Inspector (Java &lt;-&gt; Python Microservice)</span>
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Simulates how the Java <code className="bg-slate-100 px-1 py-0.5 rounded font-mono">ChatServlet</code> communicates with the Python <code className="bg-slate-100 px-1 py-0.5 rounded font-mono">FastAPI</code> service over HTTP.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Test Question from Student:
              </label>
              <input
                type="text"
                value={simQuestion}
                onChange={(e) => setSimQuestion(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-900 font-medium"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Course Filter:
              </label>
              <select
                value={simCourse}
                onChange={(e) => setSimCourse(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-900 font-medium"
              >
                <option value="DSA">DSA</option>
                <option value="DBMS">DBMS</option>
                <option value="OS">Operating Systems</option>
                <option value="General">General</option>
              </select>
            </div>
          </div>

          <button
            onClick={handleRunSimulator}
            disabled={simLoading}
            className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-[#0a2558] to-[#1e3a8a] text-white rounded-xl text-xs font-bold hover:brightness-110 transition-all cursor-pointer shadow-xs disabled:opacity-50"
          >
            <Send className="w-3.5 h-3.5 text-amber-400" />
            <span>{simLoading ? 'Simulating Vector Search...' : 'Trigger POST /query Request'}</span>
          </button>

          {simResponse && (
            <div className="bg-slate-900 rounded-2xl p-5 border border-slate-800 text-slate-200 font-mono text-xs space-y-4">
              <div className="flex items-center justify-between text-[11px] pb-2 border-b border-slate-800 text-emerald-400">
                <span>{simResponse.url}</span>
                <span className="bg-emerald-950 text-emerald-400 px-2 py-0.5 rounded border border-emerald-800">
                  HTTP {simResponse.http_status} OK
                </span>
              </div>

              <div>
                <span className="text-amber-400 block mb-1">// Python Vector Search Details:</span>
                <pre className="text-slate-300 text-[11px]">
                  {JSON.stringify(simResponse.rag_processing, null, 2)}
                </pre>
              </div>

              <div>
                <span className="text-amber-400 block mb-1">// Response JSON Returned to Java Servlet:</span>
                <pre className="text-emerald-300 text-[11px]">
                  {JSON.stringify(simResponse.response_payload, null, 2)}
                </pre>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ---------------------------------------------------- */}
      {/* TAB 4: STEP-BY-STEP SETUP GUIDE */}
      {/* ---------------------------------------------------- */}
      {activeTab === 'guide' && (
        <div className="bg-white rounded-2xl shadow-xs border border-slate-200 p-6 space-y-6">
          <div>
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Terminal className="w-4 h-4 text-blue-900" />
              <span>Step-by-Step Setup & Execution Instructions</span>
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              How to run MySQL, Python FastAPI RAG microservice, and Tomcat Java Web App locally.
            </p>
          </div>

          <div className="space-y-4 text-xs text-slate-700">
            {/* Step 1 */}
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
              <div className="font-bold text-blue-900 text-sm flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-blue-900 text-white flex items-center justify-center text-xs">1</span>
                <span>Setup MySQL Database</span>
              </div>
              <p>Install MySQL and run the generated <code className="font-mono bg-white px-1.5 py-0.5 rounded border">database/schema.sql</code> script:</p>
              <pre className="bg-slate-900 text-emerald-400 p-3 rounded-lg font-mono">
                mysql -u root -p &lt; database/schema.sql
              </pre>
            </div>

            {/* Step 2 */}
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
              <div className="font-bold text-blue-900 text-sm flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-blue-900 text-white flex items-center justify-center text-xs">2</span>
                <span>Start Python RAG Microservice</span>
              </div>
              <p>Create a Python virtual environment, install packages, and start FastAPI on port 8000:</p>
              <pre className="bg-slate-900 text-emerald-400 p-3 rounded-lg font-mono">
{`cd python_rag
python -m venv venv
source venv/bin/activate    # On Windows: venv\\Scripts\\activate
pip install -r requirements.txt
uvicorn main:app --host 0.0.0.0 --port 8000 --reload`}
              </pre>
            </div>

            {/* Step 3 */}
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
              <div className="font-bold text-blue-900 text-sm flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-blue-900 text-white flex items-center justify-center text-xs">3</span>
                <span>Build & Deploy Java Tomcat Web App</span>
              </div>
              <p>Compile using Maven and deploy the generated WAR to Apache Tomcat 10:</p>
              <pre className="bg-slate-900 text-emerald-400 p-3 rounded-lg font-mono">
{`mvn clean package
cp target/campuscopilot.war /path/to/tomcat/webapps/
# Open browser at:
# http://localhost:8080/campuscopilot/chat.jsp
# http://localhost:8080/campuscopilot/adminLogin.jsp`}
              </pre>
            </div>

            {/* Step 4: GitHub & Vercel Deployment */}
            <div className="p-5 bg-gradient-to-r from-blue-900 to-[#071b4a] text-white rounded-xl border border-amber-400/40 space-y-3">
              <div className="font-bold text-amber-400 text-sm flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-amber-400 text-blue-950 flex items-center justify-center text-xs font-black">4</span>
                  <span>Push to GitHub & Deploy Live to Vercel</span>
                </div>
                <span className="bg-amber-400 text-blue-950 text-[10px] font-black px-2 py-0.5 rounded uppercase">
                  Cloud Live
                </span>
              </div>
              <p className="text-slate-300 text-xs">
                To deploy this live on Vercel using your GitHub repository:
              </p>
              <div className="space-y-2 text-xs">
                <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 font-mono text-[11px] text-emerald-400">
                  <div className="text-slate-400 font-sans font-bold mb-1">// 1. Push code to your GitHub:</div>
                  <div>git remote add origin https://github.com/YOUR_USERNAME/bit-campus-copilot.git</div>
                  <div>git branch -M main</div>
                  <div>git push -u origin main</div>
                </div>
                <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 font-mono text-[11px] text-emerald-400">
                  <div className="text-slate-400 font-sans font-bold mb-1">// 2. In Vercel (vercel.com):</div>
                  <div>1. Click "Add New Project" -&gt; Import from GitHub repository.</div>
                  <div>2. Framework Preset: Vite (automatically detected from vercel.json).</div>
                  <div>3. Root Directory: ./ &nbsp;|&nbsp; Build: npm run build &nbsp;|&nbsp; Output: dist</div>
                  <div>4. Environment Variables: GEMINI_API_KEY (optional, fallback RAG works out-of-the-box!)</div>
                  <div>5. Click "Deploy" -&gt; Your BIT Campus Copilot is live in seconds!</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
