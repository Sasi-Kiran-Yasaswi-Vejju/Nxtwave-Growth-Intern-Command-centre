export interface Registration {
  id: string;
  name: string;
  email: string;
  whatsapp?: string;
  college: string;
  branch: string;
  graduationYear: number;
  source: string;
  referralCode: string;
  referredBy?: string;
  referralCount: number;
  createdAt: string;
  isSimulated?: boolean;
}

export interface ProjectIdeaRequest {
  branch: string;
  interest: string;
  skillLevel: 'Beginner' | 'Intermediate' | 'Advanced';
  techStack: string;
  problemArea?: string;
}

export interface ProjectIdeaResponse {
  projectTitle: string;
  problemStatement: string;
  shortDescription: string;
  aiApproach: string;
  techStack: string[];
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  resumeImpact: string;
  sixtyMinuteRoadmap: {
    minuteRange: string;
    task: string;
  }[];
  workshopFitExplanation: string;
}

export interface ChannelMetric {
  id: string;
  channelName: string;
  plannedRegistrations: number;
  actualRegistrations: number;
  percentageOfTotal: number;
  allocatedSpend: number;
  actualSpend: number;
  cac: number;
  status: 'on_track' | 'ahead' | 'needs_attention';
}

export interface DailyTrend {
  day: string;
  date: string;
  targetCumulative: number;
  actualCumulative: number;
  dailyRegistrations: number;
  referralContribution: number;
}

export interface FunnelStage {
  stage: string;
  count: number;
  conversionFromPrev: number;
  dropOffRate: number;
}

export interface Experiment {
  id: string;
  name: string;
  hypothesis: string;
  variantA: string;
  variantB: string;
  metric: string;
  variantAConversion: number;
  variantBConversion: number;
  sampleSize: number;
  status: 'Running' | 'Concluded';
  winner?: 'A' | 'B' | 'Inconclusive';
  decision: string;
}

export interface LeaderboardEntry {
  rank: number;
  name: string;
  college: string;
  referralCode: string;
  referralCount: number;
  tier: 'Ambassador Elite' | 'Campus Champion' | 'AI Pioneer';
  rewardUnlocked: string;
}

export interface AnalyticsOverview {
  targetRegistrations: number;
  totalRegistrations: number;
  progressPercentage: number;
  referralRegistrations: number;
  organicRegistrations: number;
  blendedConversionRate: number;
  totalBudget: number;
  currentSpend: number;
  blendedCac: number;
  viralKFactor: number;
  activeAmbassadors: number;
}
