import React from 'react';
import { Sparkles, ArrowRight, ShieldCheck, Clock, Award, Terminal, CheckCircle2 } from 'lucide-react';

interface HeroProps {
  onScrollToGenerator: () => void;
  onScrollToRegister: () => void;
  registrationCount: number;
}

export const Hero: React.FC<HeroProps> = ({
  onScrollToGenerator,
  onScrollToRegister,
  registrationCount
}) => {
  return (
    <div className="relative overflow-hidden pt-8 pb-16 lg:pt-14 lg:pb-24 border-b border-slate-800/60">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-gradient-to-tr from-indigo-600/15 via-cyan-500/15 to-transparent blur-3xl pointer-events-none rounded-full" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        {/* Campaign Positioning Pill */}
        <div className="inline-flex items-center space-x-2.5 bg-slate-900/90 border border-indigo-500/30 rounded-full px-4 py-1.5 mb-6 shadow-inner">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
          </span>
          <span className="text-xs font-semibold text-slate-300">
            For Final-Year Engineering Students (Batch 2025/2026)
          </span>
          <span className="text-xs bg-indigo-500/20 text-indigo-300 font-bold px-2 py-0.5 rounded-full border border-indigo-500/30">
            100% Free Live Workshop
          </span>
        </div>

        {/* Primary High-Converting Headline */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.15] max-w-4xl mx-auto">
          Stop Listing <span className="line-through text-slate-500">"Basic Python"</span> On Your Resume.
          <span className="block mt-2 bg-gradient-to-r from-indigo-400 via-cyan-300 to-indigo-300 bg-clip-text text-transparent">
            Build a Real AI Project in 60 Minutes.
          </span>
        </h1>

        {/* Realistic, Problem-Aware Subtitle */}
        <p className="mt-6 text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
          Tech recruiters review 200+ resumes with the exact same Iris dataset and To-Do lists.
          In this 60-minute hands-on build sprint, you will code and deploy a production-ready AI application with verified GitHub commits and interview talking points.
        </p>

        {/* High-Impact Proof Points / Badges */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-xs sm:text-sm text-slate-300 font-medium">
          <div className="flex items-center space-x-2 bg-slate-900/60 border border-slate-800 px-3 py-1.5 rounded-lg">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>1 Deployed Cloud URL</span>
          </div>
          <div className="flex items-center space-x-2 bg-slate-900/60 border border-slate-800 px-3 py-1.5 rounded-lg">
            <Terminal className="w-4 h-4 text-cyan-400" />
            <span>Clean GitHub Repository</span>
          </div>
          <div className="flex items-center space-x-2 bg-slate-900/60 border border-slate-800 px-3 py-1.5 rounded-lg">
            <Award className="w-4 h-4 text-indigo-400" />
            <span>Placement Interview Script</span>
          </div>
          <div className="flex items-center space-x-2 bg-slate-900/60 border border-slate-800 px-3 py-1.5 rounded-lg">
            <Clock className="w-4 h-4 text-amber-400" />
            <span>Zero Long Theory. 100% Code.</span>
          </div>
        </div>

        {/* Dual Primary CTAs */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={onScrollToRegister}
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl font-bold text-sm sm:text-base text-white bg-gradient-to-r from-indigo-600 via-indigo-500 to-cyan-500 hover:from-indigo-500 hover:to-cyan-400 shadow-xl shadow-indigo-600/30 transition-all transform hover:-translate-y-0.5 flex items-center justify-center space-x-2"
          >
            <span>Register Free Seat (Takes 30 Sec)</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={onScrollToGenerator}
            className="w-full sm:w-auto px-6 py-3.5 rounded-xl font-semibold text-sm sm:text-base text-slate-200 bg-slate-900/80 hover:bg-slate-800/80 border border-slate-700/80 hover:border-indigo-500/40 transition-all flex items-center justify-center space-x-2"
          >
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span>Generate My Resume AI Idea First</span>
          </button>
        </div>

        {/* Pacing & Social Proof Bar */}
        <div className="mt-8 pt-6 border-t border-slate-800/60 max-w-xl mx-auto flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center space-x-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping"></span>
            <span>Batch Registration Status:</span>
          </div>
          <div className="font-semibold text-slate-200">
            <span className="text-emerald-400 font-bold">{registrationCount}</span> of 500 final-year engineers registered
          </div>
        </div>
      </div>
    </div>
  );
};
