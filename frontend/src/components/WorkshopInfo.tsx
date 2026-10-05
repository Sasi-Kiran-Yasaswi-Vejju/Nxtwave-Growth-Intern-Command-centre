import React from 'react';
import { Clock, Code2, Rocket, FileCheck, Layers, GitBranch, TerminalSquare, AlertTriangle } from 'lucide-react';

export const WorkshopInfo: React.FC = () => {
  const steps = [
    {
      time: 'Min 00 - 10',
      title: 'Architecting the Solution & API Setup',
      desc: 'Understand LLM prompt boundaries vs RAG vector storage. Get immediate access to pre-configured developer API keys and environment templates.',
      icon: TerminalSquare,
      badge: 'Step 1'
    },
    {
      time: 'Min 10 - 35',
      title: 'Hands-on Live Coding: Build the Engine',
      desc: 'Write Python backend code connecting FastAPI, LangChain, and structured vector search. Create an autonomous agent loop that answers domain queries with citations.',
      icon: Code2,
      badge: 'Step 2'
    },
    {
      time: 'Min 35 - 50',
      title: '1-Click Cloud Deployment & UI Link',
      desc: 'Ship your working AI tool to a live, public URL (Streamlit Cloud / Vercel). Turn local code into a live product recruiters can test on their phones.',
      icon: Rocket,
      badge: 'Step 3'
    },
    {
      time: 'Min 50 - 60',
      title: 'Placement Resume & Interview Defense Playbook',
      desc: 'How to write the project bullet points on your resume, how to answer "Why RAG instead of Fine-Tuning?", and what hiring managers look for in live coding rounds.',
      icon: FileCheck,
      badge: 'Step 4'
    }
  ];

  return (
    <div className="py-16 sm:py-20 border-b border-slate-800/60 bg-slate-950/30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center space-x-2 bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider mb-3">
            <Clock className="w-3.5 h-3.5" />
            <span>Structured 60-Minute Schedule</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            How You Build & Ship in Exactly 60 Minutes
          </h2>
          <p className="mt-3 text-slate-400 text-sm sm:text-base">
            No endless slides. No generic conceptual lecturing. Every student codes along live on cloud GPUs with zero setup hurdles.
          </p>
        </div>

        {/* 4-Step Workshop Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div
                key={index}
                className="glass-card rounded-2xl p-6 relative flex flex-col justify-between glass-card-hover border border-slate-800/80 hover:border-indigo-500/40"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-mono font-bold text-cyan-400 bg-cyan-950/50 border border-cyan-800/60 px-2.5 py-1 rounded-md">
                      {step.time}
                    </span>
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                      {step.badge}
                    </span>
                  </div>

                  <div className="w-10 h-10 rounded-xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center mb-4 text-indigo-400">
                    <Icon className="w-5 h-5" />
                  </div>

                  <h3 className="font-bold text-base text-white mb-2 leading-snug">
                    {step.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                    {step.desc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-800/60 flex items-center text-[11px] text-slate-500 font-medium">
                  <GitBranch className="w-3 h-3 mr-1 text-slate-400" />
                  <span>Verified Git Commit Milestone</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Student Placement Insight Box */}
        <div className="mt-14 glass-card rounded-2xl p-6 sm:p-8 border border-slate-800 bg-gradient-to-r from-slate-900/90 via-slate-900/40 to-slate-900/90">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div className="max-w-2xl">
              <div className="flex items-center space-x-2 text-amber-400 text-xs font-bold uppercase tracking-wider mb-2">
                <AlertTriangle className="w-4 h-4" />
                <span>The Final-Year Placement Reality Check</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white">
                Why generic projects hurt your campus placements
              </h3>
              <p className="mt-2 text-slate-300 text-xs sm:text-sm leading-relaxed">
                Most final-year students submit identical copy-pasted machine learning tutorials. When interviewers ask: <span className="text-indigo-300 italic">"How did you handle hallucinations?"</span> or <span className="text-indigo-300 italic">"What was your vector database latency?"</span>, candidates freeze. This workshop gives you the exact technical depth to speak with confidence.
              </p>
            </div>

            <div className="w-full lg:w-auto shrink-0 flex flex-col sm:flex-row lg:flex-col gap-3">
              <a
                href="#generator-section"
                className="px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold text-center border border-slate-700 transition-colors"
              >
                Explore Project Blueprints ↓
              </a>
              <a
                href="#register-section"
                className="px-5 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold text-center shadow-md shadow-indigo-600/30 transition-all"
              >
                Register For Free Seat →
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
