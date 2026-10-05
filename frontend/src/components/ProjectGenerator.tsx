import React, { useState } from 'react';
import { Sparkles, Terminal, Cpu, CheckCircle2, ArrowRight, BookOpen, Clock, FileText, Loader2 } from 'lucide-react';
import { api } from '../services/api.ts';
import { ProjectIdeaRequest, ProjectIdeaResponse } from '../types/index.ts';

interface ProjectGeneratorProps {
  onSelectProject: (title: string, branch: string) => void;
}

export const ProjectGenerator: React.FC<ProjectGeneratorProps> = ({ onSelectProject }) => {
  const [formData, setFormData] = useState<ProjectIdeaRequest>({
    branch: 'Computer Science & Engineering',
    interest: 'Placements',
    skillLevel: 'Beginner',
    techStack: 'Python',
    problemArea: ''
  });

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ProjectIdeaResponse | null>(null);

  const branches = [
    'Computer Science & Engineering',
    'Information Technology',
    'Electronics & Communication (ECE)',
    'Electrical & Electronics (EEE)',
    'Mechanical Engineering',
    'Civil Engineering',
    'Data Science & AI',
    'Other Engineering Branch'
  ];

  const domains = [
    'Placements',
    'Healthcare',
    'FinTech',
    'EdTech',
    'Developer Tools',
    'E-Commerce'
  ];

  const stacks = [
    'Python',
    'Python + FastAPI',
    'LangChain + Gemini',
    'React + Node.js',
    'OpenAI API + Vector DB'
  ];

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const blueprint = await api.generateProjectIdea(formData);
      setResult(blueprint);
    } catch (err) {
      console.error('Failed to generate idea:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id="generator-section" className="py-16 sm:py-24 border-b border-slate-800/60 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center space-x-2 bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Interactive Growth Asset</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            AI Project Idea Generator
          </h2>
          <p className="mt-3 text-slate-400 text-sm sm:text-base">
            Customize an interview-ready project blueprint aligned with your engineering branch, target domain, and coding comfort.
          </p>
        </div>

        {/* Generator Form & Output Side-by-Side Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Input Configuration Panel (5 cols) */}
          <div className="lg:col-span-5 glass-card rounded-2xl p-6 sm:p-7 border border-slate-800 shadow-xl">
            <h3 className="text-base font-bold text-white mb-4 flex items-center space-x-2">
              <Cpu className="w-4 h-4 text-indigo-400" />
              <span>Configure Your Profile</span>
            </h3>

            <form onSubmit={handleGenerate} className="space-y-4">
              {/* Branch */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Engineering Branch
                </label>
                <select
                  value={formData.branch}
                  onChange={(e) => setFormData({ ...formData, branch: e.target.value })}
                  className="w-full bg-slate-900/90 border border-slate-700/80 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-200 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                >
                  {branches.map((b) => (
                    <option key={b} value={b} className="bg-slate-900 text-slate-200">
                      {b}
                    </option>
                  ))}
                </select>
              </div>

              {/* Domain Interest */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Target Domain / Industry
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {domains.map((dom) => (
                    <button
                      type="button"
                      key={dom}
                      onClick={() => setFormData({ ...formData, interest: dom })}
                      className={`px-3 py-2 rounded-lg text-xs font-medium border text-left transition-all ${
                        formData.interest === dom
                          ? 'bg-indigo-600/30 border-indigo-500 text-white shadow-sm'
                          : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                      }`}
                    >
                      {dom}
                    </button>
                  ))}
                </div>
              </div>

              {/* Skill Level */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Coding Comfort Level
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(['Beginner', 'Intermediate', 'Advanced'] as const).map((lvl) => (
                    <button
                      type="button"
                      key={lvl}
                      onClick={() => setFormData({ ...formData, skillLevel: lvl })}
                      className={`px-3 py-2 rounded-lg text-xs font-medium border text-center transition-all ${
                        formData.skillLevel === lvl
                          ? 'bg-cyan-600/30 border-cyan-500 text-cyan-300 font-semibold'
                          : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                      }`}
                    >
                      {lvl}
                    </button>
                  ))}
                </div>
              </div>

              {/* Preferred Technology */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Preferred Tech Stack
                </label>
                <select
                  value={formData.techStack}
                  onChange={(e) => setFormData({ ...formData, techStack: e.target.value })}
                  className="w-full bg-slate-900/90 border border-slate-700/80 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-200 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                >
                  {stacks.map((s) => (
                    <option key={s} value={s} className="bg-slate-900 text-slate-200">
                      {s}
                    </option>
                  ))}
                </select>
              </div>

              {/* Optional Custom Problem */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Specific Problem Idea <span className="text-slate-500 font-normal">(Optional)</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. Resume parser, Automated lab report..."
                  value={formData.problemArea}
                  onChange={(e) => setFormData({ ...formData, problemArea: e.target.value })}
                  className="w-full bg-slate-900/90 border border-slate-700/80 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full mt-2 py-3 rounded-xl font-bold text-xs sm:text-sm text-white bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-500 hover:to-cyan-500 shadow-md shadow-indigo-600/25 transition-all flex items-center justify-center space-x-2"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Architecting Blueprint...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-cyan-300" />
                    <span>Generate Tailored Blueprint</span>
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Generated Result Output Box (7 cols) */}
          <div className="lg:col-span-7">
            {result ? (
              <div className="glass-card rounded-2xl p-6 sm:p-8 border border-indigo-500/40 shadow-2xl relative animate-fadeIn">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                  <span className="text-[11px] font-mono font-bold text-emerald-400 bg-emerald-950/60 border border-emerald-800/80 px-2.5 py-0.5 rounded-full">
                    {result.difficulty} Level Portfolio Project
                  </span>
                  <span className="text-xs text-slate-400">
                    Target Track: <strong className="text-slate-200">{formData.interest}</strong>
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight leading-snug">
                  {result.projectTitle}
                </h3>

                <p className="mt-3 text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {result.shortDescription}
                </p>

                {/* Architecture Approach */}
                <div className="mt-5 p-3.5 rounded-xl bg-slate-900/80 border border-slate-800">
                  <div className="flex items-center space-x-2 text-xs font-bold text-indigo-300 mb-1">
                    <Terminal className="w-3.5 h-3.5" />
                    <span>AI Engineering Architecture</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {result.aiApproach}
                  </p>
                </div>

                {/* Tech Stack Badges */}
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {result.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="text-[11px] font-semibold bg-slate-800 text-slate-300 border border-slate-700 px-2.5 py-1 rounded-md"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Resume Impact Bullet */}
                <div className="mt-5 p-3.5 rounded-xl bg-emerald-950/30 border border-emerald-800/40">
                  <div className="flex items-center space-x-2 text-xs font-bold text-emerald-400 mb-1">
                    <FileText className="w-3.5 h-3.5" />
                    <span>Resume Placement Bullet (Add Directly to CV)</span>
                  </div>
                  <p className="text-xs text-emerald-200/90 font-mono italic">
                    "{result.resumeImpact}"
                  </p>
                </div>

                {/* 60-Minute Execution Roadmap */}
                <div className="mt-5">
                  <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2.5 flex items-center space-x-1.5">
                    <Clock className="w-3.5 h-3.5 text-cyan-400" />
                    <span>How You'll Build This in the 60-Minute Workshop</span>
                  </h4>
                  <div className="space-y-2">
                    {result.sixtyMinuteRoadmap.map((item, idx) => (
                      <div
                        key={idx}
                        className="flex items-start space-x-3 text-xs bg-slate-900/50 p-2.5 rounded-lg border border-slate-800/80"
                      >
                        <span className="font-mono text-cyan-400 font-bold shrink-0 text-[11px]">
                          {item.minuteRange}
                        </span>
                        <span className="text-slate-300">{item.task}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* CTA Hook to Register */}
                <div className="mt-7 pt-5 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="text-xs text-slate-400 text-center sm:text-left">
                    Want step-by-step guidance to build and deploy this?
                  </div>
                  <button
                    onClick={() => onSelectProject(result.projectTitle, formData.branch)}
                    className="w-full sm:w-auto px-6 py-2.5 rounded-xl font-bold text-xs sm:text-sm text-white bg-indigo-600 hover:bg-indigo-500 shadow-md shadow-indigo-600/30 transition-all flex items-center justify-center space-x-2"
                  >
                    <span>Build This In Workshop (Free)</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ) : (
              <div className="h-full min-h-[420px] rounded-2xl border-2 border-dashed border-slate-800 flex flex-col items-center justify-center p-8 text-center bg-slate-950/20">
                <div className="w-14 h-14 rounded-2xl bg-indigo-950/50 border border-indigo-800/40 flex items-center justify-center mb-4 text-indigo-400">
                  <Sparkles className="w-7 h-7" />
                </div>
                <h3 className="text-base font-bold text-white mb-2">
                  No Generic Blueprints
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 max-w-md mb-5 leading-relaxed">
                  Select your engineering branch and target domain on the left. Click <strong className="text-indigo-400">Generate Tailored Blueprint</strong> to receive a placement-vetted project architecture with verified resume bullet points.
                </p>
                <button
                  onClick={handleGenerate}
                  className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 text-xs font-semibold transition-colors flex items-center space-x-2"
                >
                  <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Try Sample Generator Output</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
