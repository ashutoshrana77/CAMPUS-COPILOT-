import React from 'react';
import { BitLogo } from './BitLogo';
import { Bot, Shield, BookOpen, Code2, Cpu, Sparkles } from 'lucide-react';

interface NavbarProps {
  activeTab: 'chat' | 'admin' | 'library' | 'code' | 'architecture';
  setActiveTab: (tab: 'chat' | 'admin' | 'library' | 'code' | 'architecture') => void;
  documentCount: number;
  isAdminLoggedIn: boolean;
  onOpenLoginModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  documentCount,
  isAdminLoggedIn,
  onOpenLoginModal
}) => {
  return (
    <header className="sticky top-0 z-40 bg-gradient-to-r from-[#071b4a] via-[#0a2558] to-[#103174] text-white shadow-lg border-b-4 border-amber-500">
      {/* Top micro-bar with motto & college credentials */}
      <div className="bg-[#051336] px-4 py-1 text-xs text-slate-300 border-b border-blue-900/60 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-amber-400">सिद्धिर्भवति कर्मजा</span>
          <span className="text-slate-500">•</span>
          <span className="hidden sm:inline">Approved by AICTE • Affiliated to AKTU • Meerut, Uttar Pradesh</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1 text-[11px] bg-blue-900/80 text-amber-300 px-2 py-0.5 rounded border border-amber-500/30">
            <Sparkles className="w-3 h-3" />
            AI RAG Engine Active
          </span>
          <span className="hidden md:inline text-slate-400">Indexed Docs: <strong className="text-white">{documentCount}</strong></span>
        </div>
      </div>

      {/* Main navigation header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2.5 flex flex-wrap items-center justify-between gap-3">
        {/* BIT Branding with Official Logo */}
        <div 
          className="flex items-center gap-3 cursor-pointer select-none"
          onClick={() => setActiveTab('chat')}
        >
          <BitLogo size={52} />
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-white text-base sm:text-lg tracking-tight leading-snug drop-shadow-sm">
                BHARAT INSTITUTE OF TECHNOLOGY
              </span>
              <span className="bg-amber-500 text-blue-950 text-[10px] font-black px-1.5 py-0.2 rounded uppercase tracking-wider">
                BIT
              </span>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <span className="font-bold text-amber-400 tracking-wide uppercase">
                Campus Copilot
              </span>
              <span className="text-blue-300/80">•</span>
              <span className="text-blue-200 text-[11px]">Academic AI & Document RAG Assistant</span>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto py-1">
          <button
            onClick={() => setActiveTab('chat')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'chat'
                ? 'bg-amber-500 text-blue-950 shadow-md ring-2 ring-amber-300'
                : 'text-slate-200 hover:bg-blue-900/60 hover:text-white'
            }`}
          >
            <Bot className="w-3.5 h-3.5" />
            <span>Student Copilot</span>
          </button>

          <button
            onClick={() => setActiveTab('admin')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'admin'
                ? 'bg-amber-500 text-blue-950 shadow-md ring-2 ring-amber-300'
                : 'text-slate-200 hover:bg-blue-900/60 hover:text-white'
            }`}
          >
            <Shield className="w-3.5 h-3.5" />
            <span>Admin Portal</span>
            {isAdminLoggedIn && (
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('library')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'library'
                ? 'bg-amber-500 text-blue-950 shadow-md ring-2 ring-amber-300'
                : 'text-slate-200 hover:bg-blue-900/60 hover:text-white'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Document Hub</span>
          </button>

          <button
            onClick={() => setActiveTab('code')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'code'
                ? 'bg-amber-500 text-blue-950 shadow-md ring-2 ring-amber-300'
                : 'text-amber-300 hover:bg-blue-900/60 hover:text-white ring-1 ring-amber-400/40'
            }`}
          >
            <Code2 className="w-3.5 h-3.5" />
            <span>Modular Prompts & Code</span>
          </button>

          <button
            onClick={() => setActiveTab('architecture')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'architecture'
                ? 'bg-amber-500 text-blue-950 shadow-md ring-2 ring-amber-300'
                : 'text-slate-200 hover:bg-blue-900/60 hover:text-white'
            }`}
          >
            <Cpu className="w-3.5 h-3.5" />
            <span>Architecture Flow</span>
          </button>
        </div>
      </div>
    </header>
  );
};
