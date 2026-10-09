import React, { useState, useRef, useEffect } from 'react';
import { AcademicDocument, ChatMessage } from '../types';
import { BitLogo } from './BitLogo';
import { 
  Send, 
  Sparkles, 
  FileText, 
  ArrowRight, 
  RotateCcw, 
  CheckCircle2, 
  Clock, 
  BookOpen, 
  GraduationCap, 
  HelpCircle,
  ExternalLink,
  ChevronRight,
  Filter
} from 'lucide-react';

interface StudentChatProps {
  documents: AcademicDocument[];
  onOpenDocumentPreview: (doc: AcademicDocument) => void;
  onSendQuery: (question: string, courseFilter: string) => Promise<{
    answer: string;
    sources: any[];
    isAssignmentQuery: boolean;
    followUpAction?: any;
  }>;
}

const DEFAULT_QUESTIONS = [
  { text: 'What is the deadline for the DSA assignment?', course: 'DSA', category: 'Assignment' },
  { text: 'Show me DBMS unit 3 notes.', course: 'DBMS', category: 'Notes' },
  { text: 'Any new notices from the CSE department?', course: 'General', category: 'Notice' },
  { text: 'What are the important topics for the upcoming OS exam?', course: 'OS', category: 'Exam' },
  { text: 'When are the mid-term examinations scheduled?', course: 'General', category: 'Datesheet' },
];

export const StudentChat: React.FC<StudentChatProps> = ({
  documents,
  onOpenDocumentPreview,
  onSendQuery
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome-msg',
      sender: 'copilot',
      text: 'Namaste! Welcome to **Campus Copilot**, the official Academic AI Assistant for **Bharat Institute of Technology (BIT)**.\n\nI answer your questions with verified academic accuracy based exclusively on syllabus, lecture notes, lab manuals, and notices uploaded by BIT faculty.\n\nHow can I help your studies today?',
      timestamp: 'Just now'
    }
  ]);
  const [inputQuestion, setInputQuestion] = useState('');
  const [selectedCourse, setSelectedCourse] = useState('All');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSend = async (customText?: string) => {
    const textToSend = customText || inputQuestion.trim();
    if (!textToSend || isLoading) return;

    if (!customText) {
      setInputQuestion('');
    }

    const userMsgId = `user-${Date.now()}`;
    const userMessage: ChatMessage = {
      id: userMsgId,
      sender: 'student',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const response = await onSendQuery(textToSend, selectedCourse);

      const copilotMessage: ChatMessage = {
        id: `copilot-${Date.now()}`,
        sender: 'copilot',
        text: response.answer,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        sources: response.sources,
        isAssignmentQuery: response.isAssignmentQuery,
        followUpAction: response.followUpAction
      };

      setMessages(prev => [...prev, copilotMessage]);
    } catch (err) {
      setMessages(prev => [
        ...prev,
        {
          id: `error-${Date.now()}`,
          sender: 'copilot',
          text: 'I could not retrieve an answer at this moment. Please check your network or try again.',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFollowUpClick = (actionPrompt: string) => {
    handleSend(actionPrompt);
  };

  const handleSourceClick = (sourceTitle: string) => {
    const matchedDoc = documents.find(d => d.title.toLowerCase() === sourceTitle.toLowerCase())
      || documents.find(d => d.title.toLowerCase().includes(sourceTitle.toLowerCase()));
    if (matchedDoc) {
      onOpenDocumentPreview(matchedDoc);
    }
  };

  const clearChat = () => {
    setMessages([
      {
        id: 'welcome-msg',
        sender: 'copilot',
        text: 'Chat history cleared. How can I assist you with your BIT coursework today?',
        timestamp: 'Just now'
      }
    ]);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-120px)] max-w-5xl mx-auto px-2 sm:px-4 py-3">
      {/* Top Filter and Controls Bar */}
      <div className="bg-white p-3 rounded-xl shadow-xs border border-slate-200 mb-3 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700">
            <Filter className="w-3.5 h-3.5 text-blue-900" />
            <span>Course Filter:</span>
          </div>
          <select
            value={selectedCourse}
            onChange={(e) => setSelectedCourse(e.target.value)}
            className="text-xs font-semibold bg-slate-50 border border-slate-300 text-slate-800 rounded-lg px-2.5 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-900"
          >
            <option value="All">All BIT Courses</option>
            <option value="DSA">DSA (Data Structures & Algorithms)</option>
            <option value="DBMS">DBMS (Database Management Systems)</option>
            <option value="OS">Operating Systems</option>
            <option value="General">General / Notices & Circulars</option>
          </select>
        </div>

        <div className="flex items-center gap-3 text-xs">
          <span className="hidden sm:inline-flex items-center gap-1 text-slate-500">
            <GraduationCap className="w-3.5 h-3.5 text-amber-600" />
            Bharat Institute of Technology
          </span>
          <button
            onClick={clearChat}
            className="flex items-center gap-1 text-slate-500 hover:text-red-600 px-2 py-1 rounded transition-colors text-xs font-medium"
            title="Clear Chat History"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Chat</span>
          </button>
        </div>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 bg-white rounded-2xl shadow-xs border border-slate-200 overflow-y-auto p-4 sm:p-6 space-y-5">
        {messages.map((msg) => {
          const isStudent = msg.sender === 'student';

          return (
            <div
              key={msg.id}
              className={`flex gap-3 max-w-3xl ${isStudent ? 'ml-auto flex-row-reverse' : 'mr-auto'}`}
            >
              {/* Avatar */}
              <div className="shrink-0 mt-0.5">
                {isStudent ? (
                  <div className="w-8 h-8 rounded-full bg-blue-900 text-white flex items-center justify-center font-bold text-xs shadow-xs">
                    YOU
                  </div>
                ) : (
                  <div className="w-8 h-8 rounded-full overflow-hidden shadow-xs ring-1 ring-amber-400">
                    <BitLogo size={32} />
                  </div>
                )}
              </div>

              {/* Message Bubble */}
              <div className="flex flex-col gap-1.5 max-w-[85%]">
                <div className="flex items-center gap-2 text-[11px] text-slate-400">
                  <span className="font-semibold text-slate-600">
                    {isStudent ? 'Student' : 'BIT Campus Copilot'}
                  </span>
                  <span>•</span>
                  <span>{msg.timestamp}</span>
                </div>

                <div
                  className={`p-4 rounded-2xl text-sm leading-relaxed ${
                    isStudent
                      ? 'bg-[#0a2558] text-white rounded-tr-xs shadow-xs'
                      : 'bg-slate-50 text-slate-800 border border-slate-200/90 rounded-tl-xs shadow-2xs'
                  }`}
                >
                  <div className="whitespace-pre-wrap">{msg.text}</div>

                  {/* Sources / Citations Card */}
                  {msg.sources && msg.sources.length > 0 && (
                    <div className="mt-3.5 pt-3 border-t border-slate-200/80">
                      <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700 mb-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Official Grounded Sources:</span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {msg.sources.map((src, i) => (
                          <button
                            key={i}
                            onClick={() => handleSourceClick(src.title)}
                            className="inline-flex items-center gap-1.5 bg-blue-50 hover:bg-blue-100 text-blue-950 border border-blue-200 px-2.5 py-1 rounded-lg text-xs font-semibold transition-colors group cursor-pointer"
                          >
                            <FileText className="w-3 h-3 text-blue-800 group-hover:scale-110 transition-transform" />
                            <span className="truncate max-w-[220px]">{src.title}</span>
                            <span className="bg-amber-400 text-blue-950 text-[10px] font-black px-1 rounded uppercase">
                              {src.course || 'BIT'}
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Proactive Assignment Follow-Up Card */}
                  {msg.followUpAction && (
                    <div className="mt-3.5 p-3 bg-amber-50 rounded-xl border border-amber-300 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
                      <div className="flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-amber-600 shrink-0" />
                        <span className="text-xs font-bold text-amber-950">
                          Do you want any help finishing the assignment?
                        </span>
                      </div>
                      <button
                        onClick={() => handleFollowUpClick(msg.followUpAction!.prompt)}
                        className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 bg-amber-500 hover:bg-amber-600 text-blue-950 rounded-lg text-xs font-extrabold transition-all shadow-xs shrink-0 cursor-pointer"
                      >
                        <span>{msg.followUpAction.actionLabel}</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}

        {/* Loading Indicator */}
        {isLoading && (
          <div className="flex gap-3 max-w-xl">
            <div className="w-8 h-8 rounded-full overflow-hidden shadow-xs ring-1 ring-amber-400 shrink-0">
              <BitLogo size={32} />
            </div>
            <div className="bg-slate-50 p-3.5 rounded-2xl rounded-tl-xs border border-slate-200 text-xs text-slate-500 flex items-center gap-2.5">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-blue-900 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                <div className="w-2 h-2 bg-amber-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                <div className="w-2 h-2 bg-blue-900 rounded-full animate-bounce"></div>
              </div>
              <span className="font-medium">Searching BIT course documents & synthesizing answer...</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Quick Questions */}
      <div className="py-2 overflow-x-auto flex items-center gap-2 no-scrollbar">
        <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider shrink-0 flex items-center gap-1">
          <Sparkles className="w-3 h-3 text-amber-500" />
          Suggested:
        </span>
        {DEFAULT_QUESTIONS.map((q, idx) => (
          <button
            key={idx}
            onClick={() => {
              setSelectedCourse(q.course);
              handleSend(q.text);
            }}
            className="shrink-0 bg-white hover:bg-amber-50 text-slate-700 hover:text-blue-950 border border-slate-200 hover:border-amber-300 text-xs font-medium px-3 py-1 rounded-full transition-all shadow-2xs"
          >
            {q.text}
          </button>
        ))}
      </div>

      {/* Input Box */}
      <div className="bg-white p-2 sm:p-2.5 rounded-2xl shadow-md border border-slate-200 flex items-center gap-2">
        <input
          type="text"
          value={inputQuestion}
          onChange={(e) => setInputQuestion(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              handleSend();
            }
          }}
          placeholder="Ask Copilot: 'What is the deadline for DSA assignment?' or 'Show me DBMS unit 3 notes'..."
          className="flex-1 px-3 py-2 text-sm text-slate-800 placeholder-slate-400 bg-transparent focus:outline-none"
        />
        <button
          onClick={() => handleSend()}
          disabled={!inputQuestion.trim() || isLoading}
          className="flex items-center gap-1.5 px-4 py-2.5 bg-gradient-to-r from-[#0a2558] to-[#1e3a8a] text-white rounded-xl font-bold text-xs shadow-sm hover:brightness-110 disabled:opacity-50 disabled:cursor-not-allowed transition-all cursor-pointer"
        >
          <span>Ask</span>
          <Send className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
