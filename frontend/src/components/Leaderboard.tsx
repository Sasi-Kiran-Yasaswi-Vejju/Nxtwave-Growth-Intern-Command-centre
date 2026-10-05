import React, { useEffect, useState } from 'react';
import { Trophy, Medal, Award, Flame, Users, Sparkles, Building2 } from 'lucide-react';
import { LeaderboardEntry } from '../types/index.ts';
import { api } from '../services/api.ts';

export const Leaderboard: React.FC = () => {
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBoard = async () => {
      try {
        const data = await api.getLeaderboard();
        setEntries(data);
      } catch (err) {
        console.error('Failed to load leaderboard:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchBoard();
  }, []);

  return (
    <div id="leaderboard-section" className="py-16 sm:py-24 border-b border-slate-800/60 relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center space-x-2 bg-amber-500/10 text-amber-400 border border-amber-500/20 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider mb-3">
            <Trophy className="w-3.5 h-3.5" />
            <span>Viral Referral Loop</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Campus Ambassador Leaderboard
          </h2>
          <p className="mt-2 text-slate-400 text-xs sm:text-sm">
            Top engineering students driving peer registrations across campus WhatsApp communities and coding clubs.
          </p>

          <div className="mt-3 inline-block px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-[11px] text-slate-400">
            ⚡ <span className="text-slate-300 font-semibold">Simulated Growth Mechanism:</span> Demonstrates viral $K$-factor and peer incentives in real-time.
          </div>
        </div>

        {/* Table / Cards */}
        <div className="glass-card rounded-2xl border border-slate-800 overflow-hidden shadow-2xl">
          <div className="p-4 sm:p-6 bg-slate-900/60 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center space-x-2 text-xs font-bold text-white uppercase tracking-wider">
              <Flame className="w-4 h-4 text-amber-400" />
              <span>Top Campus Referrers</span>
            </div>
            <span className="text-xs text-slate-400">
              Active Referrers: <strong className="text-emerald-400 font-mono">24 Students</strong>
            </span>
          </div>

          <div className="divide-y divide-slate-800/80">
            {entries.slice(0, 8).map((entry) => {
              const isTopThree = entry.rank <= 3;
              const rankColor =
                entry.rank === 1
                  ? 'text-amber-400 bg-amber-950/40 border-amber-500/40'
                  : entry.rank === 2
                  ? 'text-slate-200 bg-slate-800/80 border-slate-600'
                  : entry.rank === 3
                  ? 'text-amber-600 bg-amber-950/20 border-amber-700/30'
                  : 'text-slate-400 bg-slate-900/40 border-slate-800';

              return (
                <div
                  key={entry.referralCode}
                  className={`p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-colors hover:bg-slate-900/40 ${
                    entry.rank === 1 ? 'bg-amber-950/10' : ''
                  }`}
                >
                  {/* Left: Rank & Student Details */}
                  <div className="flex items-center space-x-4">
                    <div
                      className={`w-9 h-9 rounded-xl border flex items-center justify-center font-bold text-sm shrink-0 font-mono ${rankColor}`}
                    >
                      {entry.rank}
                    </div>

                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="font-bold text-white text-sm sm:text-base">
                          {entry.name}
                        </span>
                        {entry.rank === 1 && (
                          <span className="text-[10px] bg-amber-500/20 text-amber-300 font-bold px-2 py-0.5 rounded-full border border-amber-500/30">
                            Campus Lead #1
                          </span>
                        )}
                      </div>
                      <div className="text-xs text-slate-400 flex items-center space-x-1.5 mt-0.5">
                        <Building2 className="w-3 h-3 text-slate-500" />
                        <span>{entry.college}</span>
                        <span className="text-slate-600">•</span>
                        <span className="font-mono text-slate-400 text-[11px]">{entry.referralCode}</span>
                      </div>
                    </div>
                  </div>

                  {/* Right: Referral Count & Reward Tier */}
                  <div className="flex items-center justify-between sm:justify-end space-x-4 pl-13 sm:pl-0">
                    <div className="text-left sm:text-right">
                      <span className="text-[11px] font-semibold text-slate-400 block">
                        Reward Unlocked
                      </span>
                      <span className="text-xs font-semibold text-indigo-300">
                        {entry.rewardUnlocked}
                      </span>
                    </div>

                    <div className="px-3.5 py-1.5 rounded-xl bg-slate-900 border border-slate-700/80 text-center shrink-0">
                      <span className="text-base font-extrabold font-mono text-cyan-400">
                        {entry.referralCount}
                      </span>
                      <span className="text-[10px] text-slate-400 block font-medium">referrals</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
