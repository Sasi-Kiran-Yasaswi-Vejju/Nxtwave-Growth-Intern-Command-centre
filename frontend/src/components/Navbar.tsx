import React from 'react';
import { Sparkles, BarChart3, Users, Gift, Cpu, ArrowRight } from 'lucide-react';

interface NavbarProps {
  onOpenDashboard: () => void;
  onOpenAutomation: () => void;
  registrationCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenDashboard,
  onOpenAutomation,
  registrationCount
}) => {
  return (
    <nav className="sticky top-0 z-50 bg-[#0B0F19]/90 backdrop-blur-md border-b border-slate-800/80 px-4 lg:px-8 py-3.5 transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Brand Logo */}
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-cyan-400 flex items-center justify-center shadow-lg shadow-indigo-500/20">
            <Cpu className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-extrabold text-lg tracking-tight text-white">NxtWave</span>
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                AI Growth Engine
              </span>
            </div>
            <p className="text-[11px] text-slate-400 hidden sm:block">
              60-Min Workshop | Final-Year Placement Track
            </p>
          </div>
        </div>

        {/* Live Target Counter Badge */}
        <div className="hidden md:flex items-center space-x-2 bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-full text-xs">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span className="text-slate-400 font-medium">Live Registrations:</span>
          <span className="text-emerald-400 font-bold">{registrationCount} / 500</span>
          <span className="text-slate-500 text-[10px]">({Math.min(100, Math.round((registrationCount / 500) * 100))}%)</span>
        </div>

        {/* Navigation Actions */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          <button
            onClick={onOpenAutomation}
            className="hidden lg:flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-300 hover:text-white hover:bg-slate-800/80 transition-colors border border-transparent hover:border-slate-700"
            title="Inspect n8n & WhatsApp Automation Architecture"
          >
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>Automation Flow</span>
          </button>

          <button
            onClick={onOpenDashboard}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-indigo-300 bg-indigo-950/60 hover:bg-indigo-900/60 border border-indigo-500/30 transition-all shadow-sm"
          >
            <BarChart3 className="w-3.5 h-3.5 text-indigo-400" />
            <span>Growth Dashboard</span>
          </button>

          <a
            href="#register-section"
            className="flex items-center space-x-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold text-white bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 shadow-md shadow-indigo-600/25 transition-all"
          >
            <span>Claim Seat (Free)</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </nav>
  );
};
