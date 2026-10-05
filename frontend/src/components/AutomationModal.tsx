import React from 'react';
import { X, Sparkles, MessageSquare, Clock, CheckCircle2, GitBranch, ArrowRight, Zap, Bell } from 'lucide-react';

interface AutomationModalProps {
  onClose: () => void;
}

export const AutomationModal: React.FC<AutomationModalProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-2xl glass-card rounded-3xl p-6 sm:p-8 border border-cyan-500/40 shadow-2xl bg-gradient-to-b from-[#131927] to-[#0B0F19] max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-white p-1 rounded-lg bg-slate-800/60 hover:bg-slate-700/80 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center space-x-2 text-xs font-mono font-bold text-cyan-400 uppercase tracking-widest mb-1">
          <Zap className="w-3.5 h-3.5" />
          <span>Workflow Automation Engine</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
          Event-Driven WhatsApp & Lead Pipeline
        </h2>
        <p className="mt-1 text-xs sm:text-sm text-slate-400">
          Engineered using n8n + Meta WhatsApp Cloud API webhooks to drive instant viral loops and 65%+ live attendance.
        </p>

        {/* 3 Steps Pipeline Visual */}
        <div className="mt-6 space-y-4">
          {/* Step 1 */}
          <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-start space-x-4">
            <div className="w-9 h-9 rounded-xl bg-cyan-600/20 border border-cyan-500/30 flex items-center justify-center shrink-0 text-cyan-400 font-bold text-xs">
              01
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white">T = 0 | Instant WhatsApp Confirmation + Viral Link</span>
                <span className="text-[10px] text-emerald-400 font-mono">Automated Webhook</span>
              </div>
              <p className="mt-1 text-xs text-slate-300">
                Immediately upon registration, students receive a personalized WhatsApp message containing their unique referral pass and 1-click share button for college groups.
              </p>
              <div className="mt-2 p-2.5 rounded-lg bg-slate-950/80 border border-slate-800 text-[11px] font-mono text-slate-300 italic">
                "Hi Yasaswi! 🚀 Seat confirmed for Sunday 7 PM. Want the AI Resume Template? Invite 1 friend with your link: nxtwave.io/?ref=YASASWI42"
              </div>
            </div>
          </div>

          {/* Step 2 */}
          <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-start space-x-4">
            <div className="w-9 h-9 rounded-xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center shrink-0 text-indigo-400 font-bold text-xs">
              02
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white">T - 24 Hours | Zero-Friction Setup Kit</span>
                <span className="text-[10px] text-indigo-300 font-mono">Cron Trigger</span>
              </div>
              <p className="mt-1 text-xs text-slate-300">
                Delivers Google Colab cloud GPU notebook and pre-configured environment credentials so no student spends workshop time installing Python packages.
              </p>
            </div>
          </div>

          {/* Step 3 */}
          <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-start space-x-4">
            <div className="w-9 h-9 rounded-xl bg-emerald-600/20 border border-emerald-500/30 flex items-center justify-center shrink-0 text-emerald-400 font-bold text-xs">
              03
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white">T - 15 Minutes | 1-Click Stream Magic Link</span>
                <span className="text-[10px] text-emerald-400 font-mono">High Priority Alert</span>
              </div>
              <p className="mt-1 text-xs text-slate-300">
                Pushes direct YouTube Private Stream / Zoom magic link. Prevents email spam drop-off and elevates live show-up rate from traditional 25% to 65%+.
              </p>
            </div>
          </div>
        </div>

        {/* n8n JSON mention */}
        <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between">
          <span className="text-xs text-slate-400">
            Exported spec available in <code className="text-cyan-300">automation/workflows/n8n_growth_workflow.json</code>
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-colors"
          >
            Got It
          </button>
        </div>
      </div>
    </div>
  );
};
