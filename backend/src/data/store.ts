import { ChannelMetric, DailyTrend, Experiment, FunnelStage, LeaderboardEntry, Registration } from '../types/index.js';
import {
  INITIAL_CHANNELS,
  INITIAL_DAILY_TRENDS,
  INITIAL_EXPERIMENTS,
  INITIAL_FUNNEL,
  INITIAL_LEADERBOARD,
  INITIAL_REGISTRATIONS
} from './mockData.js';

class DataStore {
  private registrations: Registration[] = [...INITIAL_REGISTRATIONS];
  private channels: ChannelMetric[] = [...INITIAL_CHANNELS];
  private dailyTrends: DailyTrend[] = [...INITIAL_DAILY_TRENDS];
  private funnel: FunnelStage[] = [...INITIAL_FUNNEL];
  private experiments: Experiment[] = [...INITIAL_EXPERIMENTS];
  private demoMode: boolean = true;
  private totalSimulationCount: number = 327; // Baseline simulated registrations

  constructor() {
    this.refreshChannelMetrics();
  }

  public getDemoMode(): boolean {
    return this.demoMode;
  }

  public setDemoMode(enabled: boolean): void {
    this.demoMode = enabled;
  }

  public getRegistrations(): Registration[] {
    return this.registrations;
  }

  public getRegistrationById(id: string): Registration | undefined {
    return this.registrations.find(r => r.id === id);
  }

  public getRegistrationByCode(code: string): Registration | undefined {
    const cleanCode = code.trim().toUpperCase();
    return this.registrations.find(r => r.referralCode === cleanCode);
  }

  public getRegistrationByEmail(email: string): Registration | undefined {
    return this.registrations.find(r => r.email.toLowerCase() === email.toLowerCase());
  }

  public addRegistration(newReg: Omit<Registration, 'id' | 'createdAt' | 'referralCount'>): Registration {
    const id = `REG-${1000 + this.registrations.length + 1}`;
    const createdAt = new Date().toISOString();
    
    // Check if referred by someone
    let referredByClean = newReg.referredBy ? newReg.referredBy.trim().toUpperCase() : undefined;
    if (referredByClean) {
      const referrer = this.registrations.find(r => r.referralCode === referredByClean);
      if (referrer) {
        referrer.referralCount += 1;
        // Attribute to referral channel
        const refChannel = this.channels.find(c => c.id === 'referral_engine');
        if (refChannel) refChannel.actualRegistrations += 1;
      } else {
        referredByClean = undefined;
      }
    } else {
      // Attribute to source channel
      const matchedChannel = this.channels.find(c => c.channelName.toLowerCase().includes(newReg.source.toLowerCase())) ||
        this.channels.find(c => c.id === 'whatsapp_communities');
      if (matchedChannel) {
        matchedChannel.actualRegistrations += 1;
      }
    }

    const registration: Registration = {
      ...newReg,
      id,
      referredBy: referredByClean,
      referralCount: 0,
      createdAt,
      isSimulated: false
    };

    this.registrations.unshift(registration);
    this.totalSimulationCount += 1;
    this.refreshChannelMetrics();
    this.incrementFunnelRegistration();

    return registration;
  }

  private incrementFunnelRegistration() {
    const regStage = this.funnel.find(f => f.stage.includes('Confirmed Registrations'));
    if (regStage) regStage.count += 1;
    const formStage = this.funnel.find(f => f.stage.includes('Form Initiated'));
    if (formStage) formStage.count += 1;
  }

  public recordGeneratorInteraction() {
    const genStage = this.funnel.find(f => f.stage.includes('AI Generator'));
    if (genStage) genStage.count += 1;
  }

  public recordShareClick() {
    const shareStage = this.funnel.find(f => f.stage.includes('Shared Referral'));
    if (shareStage) shareStage.count += 1;
  }

  private refreshChannelMetrics() {
    const total = this.demoMode ? this.totalSimulationCount : this.registrations.length;
    this.channels.forEach(ch => {
      ch.percentageOfTotal = total > 0 ? parseFloat(((ch.actualRegistrations / total) * 100).toFixed(1)) : 0;
      ch.cac = ch.actualRegistrations > 0 ? parseFloat((ch.actualSpend / ch.actualRegistrations).toFixed(2)) : 0;
    });
  }

  public getLeaderboard(): LeaderboardEntry[] {
    // Merge baseline mock leaderboard with live referrers
    const liveLeaderboard: LeaderboardEntry[] = this.registrations
      .filter(r => r.referralCount > 0)
      .map(r => ({
        rank: 0,
        name: r.name,
        college: r.college,
        referralCode: r.referralCode,
        referralCount: r.referralCount,
        tier: r.referralCount >= 20 ? 'Ambassador Elite' : r.referralCount >= 10 ? 'Campus Champion' : 'AI Pioneer',
        rewardUnlocked: r.referralCount >= 5 ? 'VIP 1-on-1 AI Resume Review + Front Row AMA' :
          r.referralCount >= 3 ? 'GitHub Production Kit + API Starter Pack' : 'AI Placement Resume Bullet Bank'
      }));

    // Combine and deduplicate
    const combined = [...liveLeaderboard];
    INITIAL_LEADERBOARD.forEach(initial => {
      if (!combined.some(c => c.referralCode === initial.referralCode)) {
        combined.push({ ...initial });
      }
    });

    combined.sort((a, b) => b.referralCount - a.referralCount);
    return combined.slice(0, 10).map((entry, index) => ({
      ...entry,
      rank: index + 1
    }));
  }

  public getOverview() {
    const totalRegistrations = this.demoMode ? this.totalSimulationCount : this.registrations.length;
    const targetRegistrations = 500;
    const progressPercentage = parseFloat(((totalRegistrations / targetRegistrations) * 100).toFixed(1));
    const referralChannel = this.channels.find(c => c.id === 'referral_engine');
    const referralRegistrations = referralChannel ? referralChannel.actualRegistrations : 104;
    const organicRegistrations = totalRegistrations - referralRegistrations;
    const totalBudget = 2000;
    const currentSpend = this.channels.reduce((acc, curr) => acc + curr.actualSpend, 0);
    const blendedCac = totalRegistrations > 0 ? parseFloat((currentSpend / totalRegistrations).toFixed(2)) : 0;
    const viralKFactor = totalRegistrations > 0 ? parseFloat((referralRegistrations / totalRegistrations).toFixed(2)) : 0;
    const activeAmbassadors = this.registrations.filter(r => r.referralCount > 0).length + 8; // Including seed ambassadors

    return {
      targetRegistrations,
      totalRegistrations,
      progressPercentage,
      referralRegistrations,
      organicRegistrations,
      blendedConversionRate: 24.8,
      totalBudget,
      currentSpend,
      blendedCac,
      viralKFactor,
      activeAmbassadors
    };
  }

  public getChannels(): ChannelMetric[] {
    this.refreshChannelMetrics();
    return this.channels;
  }

  public getDailyTrends(): DailyTrend[] {
    return this.dailyTrends;
  }

  public getFunnel(): FunnelStage[] {
    return this.funnel;
  }

  public getExperiments(): Experiment[] {
    return this.experiments;
  }

  public resetToDefault(): void {
    this.registrations = [...INITIAL_REGISTRATIONS];
    this.channels = JSON.parse(JSON.stringify(INITIAL_CHANNELS));
    this.dailyTrends = JSON.parse(JSON.stringify(INITIAL_DAILY_TRENDS));
    this.funnel = JSON.parse(JSON.stringify(INITIAL_FUNNEL));
    this.experiments = JSON.parse(JSON.stringify(INITIAL_EXPERIMENTS));
    this.totalSimulationCount = 327;
    this.refreshChannelMetrics();
  }
}

export const store = new DataStore();
