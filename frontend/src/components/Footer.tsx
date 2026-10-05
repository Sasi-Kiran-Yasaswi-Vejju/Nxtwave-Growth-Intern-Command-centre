import React from 'react';
import { HelpCircle, Cpu } from 'lucide-react';

export const Footer: React.FC = () => {
  const faqs = [
    {
      q: 'Is this workshop really free?',
      a: 'Yes, 100% free. NxtWave provides pre-configured cloud development environments and temporary API access tokens for all verified student participants.'
    },
    {
      q: 'Do I need heavy hardware or a GPU laptop?',
      a: 'No. Everything runs via browser-based cloud notebooks (Google Colab / FastAPI endpoints). You only need a basic browser and internet connection.'
    },
    {
      q: 'I am from ECE / Mech / Civil. Can I build this?',
      a: 'Absolutely. The AI Project Idea Generator specifically includes engineering branch-customized blueprints (e.g. Embedded AI, Smart Predictive Maintenance, and Computer Vision).'
    },
    {
      q: 'How does this project help in placement interviews?',
      a: 'Unlike generic Iris or Titanic projects, you walk away with a live cloud URL, a verified GitHub repository with structured commits, and exact answers to technical interview questions on RAG vs Fine-tuning and latency optimization.'
    },
    {
      q: 'How does the student referral system work?',
      a: 'When you register, you receive a unique referral code. When friends from your college register through your link, you unlock exclusive placement resources including the Verified AI Resume Bullet Bank and 1-on-1 resume reviews.'
    }
  ];

  return (
    <footer className="border-t border-slate-800 bg-[#080C14] text-slate-400 text-xs">
      {/* FAQ Section */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-10">
          <div className="inline-flex items-center space-x-2 bg-slate-900 border border-slate-800 px-3 py-1 rounded-full text-xs font-semibold text-slate-300 mb-2">
            <HelpCircle className="w-3.5 h-3.5 text-indigo-400" />
            <span>Frequently Asked Questions</span>
          </div>
          <h3 className="text-2xl font-bold text-white">Everything You Need to Know</h3>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="p-4 sm:p-5 rounded-2xl bg-slate-900/60 border border-slate-800/80">
              <h4 className="font-bold text-white text-sm mb-1.5 flex items-start space-x-2">
                <span className="text-indigo-400 font-mono">Q.</span>
                <span>{faq.q}</span>
              </h4>
              <p className="text-slate-400 text-xs leading-relaxed pl-5">
                {faq.a}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Footer Meta & Candidate Attribution */}
      <div className="border-t border-slate-800/80 py-8 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          <div className="flex items-center space-x-3">
            <div className="w-7 h-7 rounded-lg bg-indigo-600 flex items-center justify-center text-white">
              <Cpu className="w-4 h-4" />
            </div>
            <div>
              <span className="font-bold text-white">NxtWave Growth Challenge Submission</span>
              <p className="text-[11px] text-slate-500">
                Built for the Growth Intern – AI, Experiments & Community Assessment
              </p>
            </div>
          </div>

          <div className="text-[11px] text-slate-500 max-w-md">
            Simulation Notice: Campaign metrics, student referral counts, and leaderboard scores represent structured planning assumptions and growth simulation models.
          </div>

          <div className="flex items-center space-x-4 text-slate-400">
            <span className="text-xs font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-800/60 px-2.5 py-1 rounded-md">
              Idea → Build → Launch → Measure
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
