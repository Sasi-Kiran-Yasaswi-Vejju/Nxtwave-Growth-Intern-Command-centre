import React, { useEffect, useState } from 'react';
import {
  BarChart3,
  TrendingUp,
  Users,
  Target,
  DollarSign,
  Share2,
  Filter,
  Download,
  RotateCcw,
  Sparkles,
  Layers,
  CheckCircle,
  HelpCircle,
  ChevronRight,
  Flame,
  ArrowUpRight
} from 'lucide-react';
import {
  AnalyticsOverview,
  ChannelMetric,
  DailyTrend,
  Experiment,
  FunnelStage
} from '../types/index.ts';
import { api } from '../services/api.ts';

interface GrowthDashboardProps {
  onClose: () => void;
}

export const GrowthDashboard: React.FC<GrowthDashboardProps> = ({ onClose }) => {
  const [overview, setOverview] = useState<AnalyticsOverview | null>(null);
  const [channels, setChannels] = useState<ChannelMetric[]>([]);
  const [dailyTrends, setDailyTrends] = useState<DailyTrend[]>([]);
  const [funnel, setFunnel] = useState<FunnelStage[]>([]);
  const [experiments, setExperiments] = useState<Experiment[]>([]);
  const [activeTab, setActiveTab] = useState<'overview' | 'channels' | 'funnel' | 'experiments'>('overview');
  const [demoMode, setDemoMode] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(true);

  const loadData = async () => {
    setLoading(true);
    try {
      const [ov, ch, dt, fn, exp] = await Promise.all([
        api.getOverview(),
        api.getChannels(),
        api.getDailyTrends(),
        api.getFunnel(),
        api.getExperiments()
      ]);
      setOverview(ov);
      setChannels(ch);
      setDailyTrends(dt);
      setFunnel(fn);
      setExperiments(exp);
    } catch (err) {
      console.error('Failed to load growth analytics data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleToggleDemo = async () => {
    const nextState = await api.toggleDemoMode(!demoMode);
    setDemoMode(nextState);
    await loadData();
  };

  const handleReset = async () => {
    if (window.confirm('Reset growth telemetry to baseline 7-day campaign simulation state?')) {
      await api.resetData();
      await loadData();
    }
  };

  const handleExportCSV = () => {
    const headers = ['Channel', 'Planned Registrations', 'Actual Registrations', 'Allocated Spend (INR)', 'Actual Spend (INR)', 'CAC (INR)'];
    const rows = channels.map(c => [
      `"${c.channelName}"`,
      c.plannedRegistrations,
      c.actualRegistrations,
      c.allocatedSpend,
      c.actualSpend,
      c.cac
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `nxtwave_growth_campaign_export.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (loading || !overview) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md">
        <div className="glass-card p-8 rounded-2xl text-center">
          <div className="w-8 h-8 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p className="text-sm text-slate-300 font-mono">Aggregating Growth Telemetry...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#0B0F19]/95 backdrop-blur-xl animate-fadeIn">
      {/* Header bar */}
      <div className="sticky top-0 z-20 bg-[#0B0F19]/90 border-b border-slate-800 px-4 sm:px-8 py-3.5 backdrop-blur-md">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-xl bg-indigo-600/30 border border-indigo-500/40 flex items-center justify-center text-indigo-400">
              <BarChart3 className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h1 className="text-base sm:text-lg font-extrabold text-white">
                  Growth Analytics Command Center
                </h1>
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  Sprint Day 5 of 7
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Campaign: "Build Your First AI Project in 60 Mins" | Goal: 500 Registrations | Budget: ₹2,000
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2 sm:space-x-3">
            {/* Simulation mode indicator */}
            <button
              onClick={handleToggleDemo}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                demoMode
                  ? 'bg-amber-950/40 border-amber-500/40 text-amber-300'
                  : 'bg-slate-900 border-slate-700 text-slate-400'
              }`}
              title="Toggle between Live Database Records and Seed Simulation Data"
            >
              Mode: {demoMode ? 'Simulation Active' : 'Live Data Only'}
            </button>

            {/* Export CSV */}
            <button
              onClick={handleExportCSV}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 transition-colors flex items-center space-x-1.5"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Export CSV</span>
            </button>

            {/* Reset */}
            <button
              onClick={handleReset}
              className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-400 hover:text-white transition-colors"
              title="Reset Simulation State"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>

            {/* Close button */}
            <button
              onClick={onClose}
              className="px-4 py-1.5 rounded-lg text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white shadow-md transition-all"
            >
              Exit Dashboard
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="max-w-7xl mx-auto flex items-center space-x-4 mt-3 border-t border-slate-800/60 pt-2 text-xs font-semibold">
          {[
            { id: 'overview', label: 'Campaign Overview' },
            { id: 'channels', label: 'Channel Attribution (5 Sources)' },
            { id: 'funnel', label: 'Conversion Funnel & Drop-off' },
            { id: 'experiments', label: 'A/B Experiments (4 Tests)' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={`pb-2 border-b-2 transition-all ${
                activeTab === tab.id
                  ? 'border-indigo-500 text-white'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Dashboard Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8 space-y-8">
        {/* Top KPI Cards (Always visible) */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {/* Card 1: Registrations */}
          <div className="glass-card rounded-2xl p-4 border border-slate-800">
            <span className="text-[11px] font-semibold text-slate-400 block mb-1">Total Registrations</span>
            <div className="flex items-baseline space-x-2">
              <span className="text-2xl font-extrabold text-white font-mono">{overview.totalRegistrations}</span>
              <span className="text-xs text-slate-400 font-mono">/ 500</span>
            </div>
            <div className="mt-2 w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-gradient-to-r from-indigo-500 to-cyan-400 h-full rounded-full"
                style={{ width: `${Math.min(100, overview.progressPercentage)}%` }}
              />
            </div>
            <span className="text-[10px] text-cyan-400 font-semibold mt-1 block">
              {overview.progressPercentage}% of Target
            </span>
          </div>

          {/* Card 2: Viral Referral Loop */}
          <div className="glass-card rounded-2xl p-4 border border-slate-800">
            <span className="text-[11px] font-semibold text-slate-400 block mb-1">Referral Share</span>
            <div className="flex items-baseline space-x-1.5">
              <span className="text-2xl font-extrabold text-cyan-400 font-mono">{overview.referralRegistrations}</span>
              <span className="text-xs text-slate-400">regs</span>
            </div>
            <span className="text-[11px] text-slate-400 block mt-2">
              $K$-Factor: <strong className="text-white font-mono">{overview.viralKFactor}</strong>
            </span>
            <span className="text-[10px] text-emerald-400 font-semibold block">
              {( (overview.referralRegistrations / overview.totalRegistrations) * 100 ).toFixed(1)}% via Viral Loop
            </span>
          </div>

          {/* Card 3: Spend & CAC */}
          <div className="glass-card rounded-2xl p-4 border border-slate-800">
            <span className="text-[11px] font-semibold text-slate-400 block mb-1">Budget Burned</span>
            <div className="flex items-baseline space-x-1">
              <span className="text-2xl font-extrabold text-white font-mono">₹{overview.currentSpend}</span>
              <span className="text-xs text-slate-400">/ ₹2,000</span>
            </div>
            <span className="text-[11px] text-slate-400 block mt-2">
              Blended CAC: <strong className="text-emerald-400 font-mono">₹{overview.blendedCac}</strong>
            </span>
            <span className="text-[10px] text-slate-500 font-semibold block">
              Remaining: ₹{overview.totalBudget - overview.currentSpend}
            </span>
          </div>

          {/* Card 4: Funnel Conversion */}
          <div className="glass-card rounded-2xl p-4 border border-slate-800">
            <span className="text-[11px] font-semibold text-slate-400 block mb-1">Visitor Conversion</span>
            <div className="flex items-baseline space-x-1">
              <span className="text-2xl font-extrabold text-indigo-400 font-mono">{overview.blendedConversionRate}%</span>
            </div>
            <span className="text-[11px] text-slate-400 block mt-2">
              Traffic: <strong className="text-white font-mono">1,840</strong> visitors
            </span>
            <span className="text-[10px] text-indigo-300 font-semibold block">
              Industry Avg: ~8-12%
            </span>
          </div>

          {/* Card 5: Campus Ambassadors */}
          <div className="glass-card rounded-2xl p-4 border border-slate-800">
            <span className="text-[11px] font-semibold text-slate-400 block mb-1">Campus Advocates</span>
            <div className="flex items-baseline space-x-1">
              <span className="text-2xl font-extrabold text-amber-400 font-mono">{overview.activeAmbassadors}</span>
              <span className="text-xs text-slate-400">leads</span>
            </div>
            <span className="text-[11px] text-slate-400 block mt-2">
              Avg: <strong className="text-white font-mono">4.3 regs/advocate</strong>
            </span>
            <span className="text-[10px] text-amber-300 font-semibold block">
              Spanning 14 Colleges
            </span>
          </div>

          {/* Card 6: Runway & Pace */}
          <div className="glass-card rounded-2xl p-4 border border-slate-800">
            <span className="text-[11px] font-semibold text-slate-400 block mb-1">Days Remaining</span>
            <div className="flex items-baseline space-x-1">
              <span className="text-2xl font-extrabold text-emerald-400 font-mono">2</span>
              <span className="text-xs text-slate-400">days left</span>
            </div>
            <span className="text-[11px] text-slate-400 block mt-2">
              Req Pace: <strong className="text-white font-mono">87/day</strong>
            </span>
            <span className="text-[10px] text-emerald-400 font-semibold block">
              Current Run-rate: 99/day
            </span>
          </div>
        </div>

        {/* TAB 1: OVERVIEW & PACING */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Daily Cumulative Burn-up Chart */}
            <div className="glass-card rounded-2xl p-6 border border-slate-800">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-2">
                <div>
                  <h3 className="text-base font-bold text-white flex items-center space-x-2">
                    <TrendingUp className="w-4 h-4 text-cyan-400" />
                    <span>7-Day Registration Pacing Curve (Actual vs Planned)</span>
                  </h3>
                  <p className="text-xs text-slate-400">
                    Day-by-day trajectory toward the 500 final-year engineering students milestone.
                  </p>
                </div>

                <div className="flex items-center space-x-4 text-xs">
                  <div className="flex items-center space-x-1.5">
                    <span className="w-3 h-3 rounded bg-indigo-500"></span>
                    <span className="text-slate-300">Actual Cumulative</span>
                  </div>
                  <div className="flex items-center space-x-1.5">
                    <span className="w-3 h-1 border-t-2 border-dashed border-slate-500"></span>
                    <span className="text-slate-400">Target Pace</span>
                  </div>
                </div>
              </div>

              {/* Bar/Progress representation */}
              <div className="grid grid-cols-7 gap-2 sm:gap-4 pt-4 border-t border-slate-800/80">
                {dailyTrends.map((d, i) => {
                  const targetPct = (d.targetCumulative / 500) * 100;
                  const actualPct = (d.actualCumulative / 500) * 100;
                  const isFuture = d.actualCumulative === 0;

                  return (
                    <div key={i} className="flex flex-col items-center">
                      <div className="w-full h-44 bg-slate-900/80 rounded-xl relative flex flex-col justify-end p-1.5 border border-slate-800/80">
                        {/* Target line */}
                        <div
                          className="absolute w-full border-b border-dashed border-slate-500 left-0 z-10"
                          style={{ bottom: `${targetPct}%` }}
                          title={`Target: ${d.targetCumulative}`}
                        />

                        {/* Actual bar */}
                        {!isFuture && (
                          <div
                            className="w-full bg-gradient-to-t from-indigo-600 to-cyan-400 rounded-lg transition-all"
                            style={{ height: `${actualPct}%` }}
                          />
                        )}

                        {isFuture && (
                          <div className="h-full flex items-center justify-center">
                            <span className="text-[10px] text-slate-600 font-mono rotate-[-45deg]">Projected</span>
                          </div>
                        )}
                      </div>

                      <div className="mt-2 text-center">
                        <span className="text-xs font-bold text-slate-200 block">{d.day}</span>
                        <span className="text-[10px] text-slate-400 block">{d.date}</span>
                        <span className="text-[11px] font-mono font-bold text-cyan-400 block mt-0.5">
                          {isFuture ? `Goal: ${d.targetCumulative}` : `${d.actualCumulative}`}
                        </span>
                        {!isFuture && (
                          <span className="text-[9px] text-emerald-400 block font-mono">
                            +{d.dailyRegistrations}
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Quick Strategy Attribution Summary */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Strategic Insights */}
              <div className="glass-card rounded-2xl p-6 border border-slate-800">
                <h3 className="text-base font-bold text-white mb-3 flex items-center space-x-2">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <span>Key Growth Observations & Strategy Pivots</span>
                </h3>
                <div className="space-y-3 text-xs text-slate-300">
                  <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                    <strong className="text-white block mb-0.5">1. WhatsApp Community Distribution Outperforms Paid</strong>
                    College tech group broadcasts achieved 42.2% of all registrations with ₹0 ad spend, proving that trusted peer channels beat cold social ads.
                  </div>
                  <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                    <strong className="text-white block mb-0.5">2. Referral Incentive Milestone ($K = 0.46)</strong>
                    Lowering the VIP GitHub Starter Kit reward from 5 friends to 3 friends increased student sharing by 2.25x.
                  </div>
                  <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                    <strong className="text-white block mb-0.5">3. Interactive Generator as Hook</strong>
                    Generating a personalized project blueprint lifted visitor-to-registration conversion from 16.2% to 26.8%.
                  </div>
                </div>
              </div>

              {/* Budget Allocation Progress */}
              <div className="glass-card rounded-2xl p-6 border border-slate-800">
                <h3 className="text-base font-bold text-white mb-3 flex items-center space-x-2">
                  <DollarSign className="w-4 h-4 text-emerald-400" />
                  <span>₹2,000 Budget Burn & Efficiency</span>
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-400">Total Campaign Budget:</span>
                    <span className="font-mono font-bold text-white">₹2,000.00</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-400">Current Spend Deployed:</span>
                    <span className="font-mono font-bold text-cyan-400">₹{overview.currentSpend}.00</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-400">Remaining Working Capital:</span>
                    <span className="font-mono font-bold text-emerald-400">₹{overview.totalBudget - overview.currentSpend}.00</span>
                  </div>
                  <div className="flex items-center justify-between text-xs pt-2 border-t border-slate-800">
                    <span className="text-slate-400">Blended CAC (Cost Per Registration):</span>
                    <span className="font-mono font-bold text-emerald-400">₹{overview.blendedCac} / student</span>
                  </div>
                  <div className="p-3 rounded-xl bg-emerald-950/20 border border-emerald-800/40 text-[11px] text-emerald-300">
                    💡 <strong>High Capital Efficiency:</strong> By treating Paid Ads as a controlled micro-experiment rather than primary acquisition, we preserved ₹1,150 for Day 6 & 7 retargeting urgency pushes.
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: CHANNELS */}
        {activeTab === 'channels' && (
          <div className="space-y-6">
            <div className="glass-card rounded-2xl border border-slate-800 overflow-hidden">
              <div className="p-6 border-b border-slate-800 flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-white">Channel Attribution & Unit Economics</h3>
                  <p className="text-xs text-slate-400">
                    Comparison of planned vs actual performance across the 5 core distribution channels.
                  </p>
                </div>
                <span className="text-xs font-mono font-bold text-slate-400">
                  Target: 500 Registrations | ₹2,000 Budget
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-900/80 text-slate-400 border-b border-slate-800 font-semibold uppercase tracking-wider">
                    <tr>
                      <th className="p-4">Channel Name</th>
                      <th className="p-4 text-center">Planned Regs</th>
                      <th className="p-4 text-center">Actual Regs</th>
                      <th className="p-4 text-center">% of Total</th>
                      <th className="p-4 text-center">Allocated Budget</th>
                      <th className="p-4 text-center">Actual Spend</th>
                      <th className="p-4 text-center">CAC (Cost/Reg)</th>
                      <th className="p-4 text-center">Pace Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/80">
                    {channels.map((ch) => (
                      <tr key={ch.id} className="hover:bg-slate-900/40 transition-colors">
                        <td className="p-4 font-bold text-white flex items-center space-x-2">
                          <span>{ch.channelName}</span>
                        </td>
                        <td className="p-4 text-center font-mono text-slate-300">{ch.plannedRegistrations}</td>
                        <td className="p-4 text-center font-mono font-bold text-cyan-400">{ch.actualRegistrations}</td>
                        <td className="p-4 text-center font-mono text-slate-300">{ch.percentageOfTotal}%</td>
                        <td className="p-4 text-center font-mono text-slate-300">₹{ch.allocatedSpend}</td>
                        <td className="p-4 text-center font-mono text-slate-300">₹{ch.actualSpend}</td>
                        <td className="p-4 text-center font-mono font-bold text-emerald-400">₹{ch.cac}</td>
                        <td className="p-4 text-center">
                          <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                            ch.status === 'ahead'
                              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                              : ch.status === 'on_track'
                              ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30'
                              : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                          }`}>
                            {ch.status.replace('_', ' ')}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: FUNNEL */}
        {activeTab === 'funnel' && (
          <div className="space-y-6">
            <div className="glass-card rounded-2xl p-6 border border-slate-800">
              <h3 className="text-base font-bold text-white mb-2">5-Stage Growth Funnel & Drop-off Analysis</h3>
              <p className="text-xs text-slate-400 mb-6">
                Analyzing conversion drop-offs between student discovery, project blueprint generation, registration, and viral sharing.
              </p>

              <div className="space-y-4">
                {funnel.map((stage, idx) => {
                  const maxCount = funnel[0].count;
                  const widthPct = (stage.count / maxCount) * 100;

                  return (
                    <div key={idx} className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs mb-2 gap-1">
                        <span className="font-bold text-white">{stage.stage}</span>
                        <div className="flex items-center space-x-3 text-slate-400 font-mono">
                          <span>{stage.count} students</span>
                          <span className="text-emerald-400 font-bold">{stage.conversionFromPrev}% step-conv</span>
                          {stage.dropOffRate > 0 && (
                            <span className="text-rose-400 font-bold">(-{stage.dropOffRate}% drop)</span>
                          )}
                        </div>
                      </div>

                      <div className="w-full bg-slate-950 h-3 rounded-full overflow-hidden p-0.5 border border-slate-800">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-indigo-500 via-cyan-400 to-emerald-400 transition-all"
                          style={{ width: `${Math.max(4, widthPct)}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Drop-off optimization note */}
              <div className="mt-6 p-4 rounded-xl bg-indigo-950/20 border border-indigo-800/40 text-xs text-slate-300">
                <strong className="text-indigo-300 block mb-1">Growth Action Taken on Drop-off:</strong>
                Noticed a 50.8% drop-off between AI Generator interactions and registration start on Day 2. We added a 1-click button at the bottom of the generated project card that automatically pre-fills the registration branch and title, recovering +18.4% incremental signups.
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: EXPERIMENTS */}
        {activeTab === 'experiments' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-white">Controlled A/B Growth Experiments</h3>
                <p className="text-xs text-slate-400">
                  Prioritized, data-driven experiments executed during the 7-day sprint following the <code>IDEA → BUILD → LAUNCH → MEASURE → LEARN → SCALE</code> methodology.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {experiments.map((exp) => (
                <div key={exp.id} className="glass-card rounded-2xl p-6 border border-slate-800 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-mono text-xs font-bold text-indigo-400 bg-indigo-950/60 border border-indigo-800/60 px-2.5 py-0.5 rounded">
                        {exp.id}
                      </span>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 bg-emerald-950/50 border border-emerald-800/60 px-2 py-0.5 rounded-full">
                        {exp.status} • Winner: Variant {exp.winner}
                      </span>
                    </div>

                    <h4 className="font-bold text-base text-white mb-2">{exp.name}</h4>
                    <p className="text-xs text-slate-400 mb-4">{exp.hypothesis}</p>

                    {/* Variant comparison */}
                    <div className="space-y-2 text-xs mb-4">
                      <div className={`p-2.5 rounded-lg border flex items-center justify-between ${
                        exp.winner === 'A'
                          ? 'bg-emerald-950/30 border-emerald-500/40 text-emerald-300'
                          : 'bg-slate-900/60 border-slate-800 text-slate-300'
                      }`}>
                        <span className="font-medium">Variant A: {exp.variantA}</span>
                        <span className="font-mono font-bold">{exp.variantAConversion}%</span>
                      </div>

                      <div className={`p-2.5 rounded-lg border flex items-center justify-between ${
                        exp.winner === 'B'
                          ? 'bg-emerald-950/30 border-emerald-500/40 text-emerald-300'
                          : 'bg-slate-900/60 border-slate-800 text-slate-300'
                      }`}>
                        <span className="font-medium">Variant B: {exp.variantB}</span>
                        <span className="font-mono font-bold text-emerald-400">{exp.variantBConversion}%</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-800 text-[11px] text-slate-300">
                    <strong className="text-indigo-300">Action / Decision: </strong>
                    {exp.decision}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
