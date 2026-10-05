import React, { useState } from 'react';
import { CheckCircle2, Copy, Check, Share2, Award, Gift, Star, ExternalLink, X, Users, Trophy } from 'lucide-react';
import { Registration } from '../types/index.ts';
import { api } from '../services/api.ts';

interface ReferralModalProps {
  registration: Registration;
  referralUrl: string;
  onClose: () => void;
  onViewLeaderboard: () => void;
}

export const ReferralModal: React.FC<ReferralModalProps> = ({
  registration,
  referralUrl,
  onClose,
  onViewLeaderboard
}) => {
  const [copied, setCopied] = useState(false);
  const fullShareUrl = window.location.origin + referralUrl;

  const handleCopy = () => {
    navigator.clipboard.writeText(fullShareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleWhatsAppShare = () => {
    api.trackShare();
    const text = `Hey! I just registered for NxtWave's free hands-on workshop: "Build Your First AI Project in 60 Minutes" 🚀\n\nYou actually build & deploy a live AI project for placement season instead of just watching theory. Plus you get free GitHub templates & resume review!\n\nClaim your seat here: ${fullShareUrl}`;
    const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-xl glass-card rounded-3xl p-6 sm:p-8 border border-indigo-500/40 shadow-2xl bg-gradient-to-b from-[#131927] to-[#0B0F19] max-h-[92vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-white p-1 rounded-lg bg-slate-800/60 hover:bg-slate-700/80 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Confirmation Header */}
        <div className="text-center">
          <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center mx-auto mb-4 text-emerald-400">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-widest">
            Registration Confirmed
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
            You're In, {registration.name}!
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-slate-300">
            Your seat for <strong className="text-white">"Build Your First AI Project in 60 Minutes"</strong> is locked.
          </p>
        </div>

        {/* Unique Referral Pass Box */}
        <div className="mt-6 p-5 rounded-2xl bg-slate-900/90 border border-indigo-500/30">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-slate-400">Your Exclusive Referral Pass</span>
            <span className="text-xs font-bold font-mono text-cyan-400 bg-cyan-950/60 border border-cyan-800/60 px-2 py-0.5 rounded">
              Code: {registration.referralCode}
            </span>
          </div>

          <div className="flex items-center space-x-2 mt-2">
            <input
              type="text"
              readOnly
              value={fullShareUrl}
              className="w-full bg-slate-950 border border-slate-700/80 rounded-xl px-3.5 py-2.5 text-xs text-slate-200 font-mono truncate focus:outline-none"
            />
            <button
              onClick={handleCopy}
              className="shrink-0 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold flex items-center space-x-1.5 transition-colors border border-slate-700"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span className="text-emerald-400">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>

          {/* WhatsApp 1-Click Share Button */}
          <button
            onClick={handleWhatsAppShare}
            className="w-full mt-3 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs sm:text-sm font-bold shadow-lg shadow-emerald-600/25 transition-all flex items-center justify-center space-x-2"
          >
            <Share2 className="w-4 h-4" />
            <span>Share to College WhatsApp Group (1-Click)</span>
          </button>
        </div>

        {/* Viral Milestone Rewards Meter */}
        <div className="mt-6">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-xs font-bold text-white flex items-center space-x-1.5">
              <Gift className="w-3.5 h-3.5 text-amber-400" />
              <span>Campus Ambassador Referral Rewards</span>
            </h4>
            <span className="text-[11px] text-slate-400">
              Your Referrals: <strong className="text-cyan-400">{registration.referralCount}</strong>
            </span>
          </div>

          <div className="space-y-2.5">
            {/* Reward 1 */}
            <div className={`p-3 rounded-xl border flex items-center justify-between text-xs ${
              registration.referralCount >= 1
                ? 'bg-emerald-950/30 border-emerald-500/40 text-emerald-200'
                : 'bg-slate-900/60 border-slate-800 text-slate-400'
            }`}>
              <div className="flex items-center space-x-2.5">
                <span className={`w-6 h-6 rounded-lg flex items-center justify-center text-xs font-bold ${
                  registration.referralCount >= 1 ? 'bg-emerald-500 text-black' : 'bg-slate-800 text-slate-400'
                }`}>
                  1
                </span>
                <div>
                  <div className="font-semibold text-white">AI Placement Resume Bullet Bank</div>
                  <div className="text-[11px] text-slate-400">10 verified bullet points for software engineering roles</div>
                </div>
              </div>
              <span className="text-[11px] font-bold">
                {registration.referralCount >= 1 ? '✓ Unlocked' : 'Invite 1'}
              </span>
            </div>

            {/* Reward 2 */}
            <div className={`p-3 rounded-xl border flex items-center justify-between text-xs ${
              registration.referralCount >= 3
                ? 'bg-emerald-950/30 border-emerald-500/40 text-emerald-200'
                : 'bg-slate-900/60 border-slate-800 text-slate-400'
            }`}>
              <div className="flex items-center space-x-2.5">
                <span className={`w-6 h-6 rounded-lg flex items-center justify-center text-xs font-bold ${
                  registration.referralCount >= 3 ? 'bg-emerald-500 text-black' : 'bg-slate-800 text-slate-400'
                }`}>
                  3
                </span>
                <div>
                  <div className="font-semibold text-white">Production GitHub Starter Kit</div>
                  <div className="text-[11px] text-slate-400">FastAPI + LangChain + Docker container setup</div>
                </div>
              </div>
              <span className="text-[11px] font-bold">
                {registration.referralCount >= 3 ? '✓ Unlocked' : 'Invite 3'}
              </span>
            </div>

            {/* Reward 3 */}
            <div className={`p-3 rounded-xl border flex items-center justify-between text-xs ${
              registration.referralCount >= 5
                ? 'bg-emerald-950/30 border-emerald-500/40 text-emerald-200'
                : 'bg-slate-900/60 border-slate-800 text-slate-400'
            }`}>
              <div className="flex items-center space-x-2.5">
                <span className={`w-6 h-6 rounded-lg flex items-center justify-center text-xs font-bold ${
                  registration.referralCount >= 5 ? 'bg-emerald-500 text-black' : 'bg-slate-800 text-slate-400'
                }`}>
                  5
                </span>
                <div>
                  <div className="font-semibold text-white">VIP 1-on-1 AI Resume Review + AMA</div>
                  <div className="text-[11px] text-slate-400">Direct feedback from senior NxtWave engineers</div>
                </div>
              </div>
              <span className="text-[11px] font-bold">
                {registration.referralCount >= 5 ? '✓ Unlocked' : 'Invite 5'}
              </span>
            </div>
          </div>
        </div>

        {/* Leaderboard Callout */}
        <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between">
          <button
            onClick={() => {
              onClose();
              onViewLeaderboard();
            }}
            className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 flex items-center space-x-1.5 transition-colors"
          >
            <Trophy className="w-3.5 h-3.5" />
            <span>Check Campus Leaderboard Ranking →</span>
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
