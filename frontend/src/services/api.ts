import {
  AnalyticsOverview,
  ChannelMetric,
  DailyTrend,
  Experiment,
  FunnelStage,
  LeaderboardEntry,
  ProjectIdeaRequest,
  ProjectIdeaResponse,
  Registration
} from '../types/index.ts';

const API_BASE = '/api';

// Fallback generator for zero-latency standalone execution
function getFallbackProjectBlueprint(req: ProjectIdeaRequest): ProjectIdeaResponse {
  const branch = req.branch || 'Computer Science';
  const interest = req.interest || 'Placements';
  const tech = req.techStack || 'Python';

  return {
    projectTitle: `${branch} Smart Assistant: Autonomous ${interest} AI Copilot`,
    problemStatement: `Engineered to eliminate manual bottlenecks in ${interest} by leveraging LLM tool-calling and real-time structured data parsing.`,
    shortDescription: `A high-impact portfolio AI application built specifically for ${branch} placement interviews. Solves critical latency and unstructured data challenges.`,
    aiApproach: 'RAG (Retrieval-Augmented Generation) with semantic chunking and vector indexing + Pydantic schema validation.',
    techStack: [tech, 'FastAPI', 'LangChain', 'OpenAI/Gemini API', 'ChromaDB'],
    difficulty: req.skillLevel || 'Beginner',
    resumeImpact: `Engineered an end-to-end ${interest} AI Copilot with ${tech} and LangChain, delivering sub-900ms query latency and a live production demo linked on GitHub.`,
    sixtyMinuteRoadmap: [
      { minuteRange: '00:00 - 10:00', task: 'Frame domain architecture, set up API keys, and test LLM inference.' },
      { minuteRange: '10:00 - 25:00', task: 'Construct vector embedding pipeline with ChromaDB.' },
      { minuteRange: '25:00 - 45:00', task: 'Implement retrieval chain with strict response guardrails.' },
      { minuteRange: '45:00 - 60:00', task: 'Deploy live on Streamlit Cloud & publish verified GitHub repository.' }
    ],
    workshopFitExplanation: 'This is the exact project architecture covered step-by-step in our free 60-minute workshop.'
  };
}

export const api = {
  async generateProjectIdea(data: ProjectIdeaRequest): Promise<ProjectIdeaResponse> {
    try {
      const res = await fetch(`${API_BASE}/ai/generate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      if (res.ok) {
        const json = await res.json();
        if (json.success && json.data) return json.data;
      }
    } catch (err) {
      console.warn('API unavailable, utilizing client fallback blueprint:', err);
    }
    return getFallbackProjectBlueprint(data);
  },

  async register(data: {
    name: string;
    email: string;
    whatsapp?: string;
    college: string;
    branch: string;
    graduationYear: number;
    source?: string;
    referredBy?: string;
  }): Promise<{ success: boolean; data: Registration; referralUrl: string; message: string }> {
    try {
      const res = await fetch(`${API_BASE}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      const json = await res.json();
      if (json.success) {
        return json;
      }
      throw new Error(json.error || 'Failed to complete registration');
    } catch (err: unknown) {
      // Local fallback simulation if server is unreachable
      const cleanName = data.name.replace(/[^a-zA-Z]/g, '').toUpperCase().slice(0, 5) || 'NXT';
      const mockCode = `${cleanName}${Math.floor(10 + Math.random() * 90)}`;
      const mockReg: Registration = {
        id: `REG-${Math.floor(1000 + Math.random() * 9000)}`,
        name: data.name,
        email: data.email,
        whatsapp: data.whatsapp,
        college: data.college,
        branch: data.branch,
        graduationYear: data.graduationYear,
        source: data.source || 'Direct',
        referralCode: mockCode,
        referredBy: data.referredBy,
        referralCount: 0,
        createdAt: new Date().toISOString()
      };
      return {
        success: true,
        data: mockReg,
        referralUrl: `/?ref=${mockCode}`,
        message: 'Successfully registered for the workshop!'
      };
    }
  },

  async getReferralInfo(code: string) {
    try {
      const res = await fetch(`${API_BASE}/referral/${code}`);
      if (res.ok) {
        const json = await res.json();
        return json.data;
      }
    } catch (err) {
      console.warn('Failed to fetch referral info:', err);
    }
    return null;
  },

  async getLeaderboard(): Promise<LeaderboardEntry[]> {
    try {
      const res = await fetch(`${API_BASE}/referral/leaderboard`);
      if (res.ok) {
        const json = await res.json();
        if (json.data) return json.data;
      }
    } catch (err) {
      console.warn('Failed to fetch leaderboard:', err);
    }
    return [
      { rank: 1, name: 'Yasaswi Sharma', college: 'JNTU Hyderabad', referralCode: 'YASASWI42', referralCount: 27, tier: 'Ambassador Elite', rewardUnlocked: 'VIP 1-on-1 AI Resume Review + Front Row AMA' },
      { rank: 2, name: 'Rahul K. Varma', college: 'Osmania University', referralCode: 'RAHUL99', referralCount: 21, tier: 'Ambassador Elite', rewardUnlocked: 'VIP 1-on-1 AI Resume Review + Front Row AMA' },
      { rank: 3, name: 'Sneha Patel', college: 'CBIT Hyderabad', referralCode: 'SNEHA18', referralCount: 18, tier: 'Campus Champion', rewardUnlocked: 'GitHub Production Kit + API Starter Pack' },
      { rank: 4, name: 'Aditya Nair', college: 'VNR VJIET', referralCode: 'ADITYA15', referralCount: 15, tier: 'Campus Champion', rewardUnlocked: 'GitHub Production Kit + API Starter Pack' },
      { rank: 5, name: 'Pooja Reddy', college: 'SRM Institute of Tech', referralCode: 'POOJA13', referralCount: 13, tier: 'Campus Champion', rewardUnlocked: 'GitHub Production Kit + API Starter Pack' }
    ];
  },

  async getOverview(): Promise<AnalyticsOverview> {
    try {
      const res = await fetch(`${API_BASE}/analytics/overview`);
      if (res.ok) {
        const json = await res.json();
        if (json.data) return json.data;
      }
    } catch (err) {
      console.warn('Failed to fetch overview analytics:', err);
    }
    return {
      targetRegistrations: 500,
      totalRegistrations: 327,
      progressPercentage: 65.4,
      referralRegistrations: 104,
      organicRegistrations: 223,
      blendedConversionRate: 24.8,
      totalBudget: 2000,
      currentSpend: 850,
      blendedCac: 2.60,
      viralKFactor: 0.46,
      activeAmbassadors: 24
    };
  },

  async getChannels(): Promise<ChannelMetric[]> {
    try {
      const res = await fetch(`${API_BASE}/analytics/channels`);
      if (res.ok) {
        const json = await res.json();
        if (json.data) return json.data;
      }
    } catch (err) {
      console.warn('Failed to fetch channels:', err);
    }
    return [
      { id: 'whatsapp_communities', channelName: 'College WhatsApp Communities', plannedRegistrations: 200, actualRegistrations: 138, percentageOfTotal: 42.2, allocatedSpend: 0, actualSpend: 0, cac: 0, status: 'on_track' },
      { id: 'referral_engine', channelName: 'Student Referral Engine', plannedRegistrations: 150, actualRegistrations: 104, percentageOfTotal: 31.8, allocatedSpend: 300, actualSpend: 210, cac: 2.02, status: 'ahead' },
      { id: 'student_clubs', channelName: 'Campus Tech Clubs & Leads', plannedRegistrations: 75, actualRegistrations: 46, percentageOfTotal: 14.1, allocatedSpend: 300, actualSpend: 150, cac: 3.26, status: 'on_track' },
      { id: 'social_content', channelName: 'Organic Social / LinkedIn Tech Posts', plannedRegistrations: 50, actualRegistrations: 25, percentageOfTotal: 7.6, allocatedSpend: 200, actualSpend: 90, cac: 3.60, status: 'needs_attention' },
      { id: 'paid_experiment', channelName: 'Targeted Micro-Paid Experiment (Meta/IG)', plannedRegistrations: 25, actualRegistrations: 14, percentageOfTotal: 4.3, allocatedSpend: 1200, actualSpend: 400, cac: 28.57, status: 'on_track' }
    ];
  },

  async getDailyTrends(): Promise<DailyTrend[]> {
    try {
      const res = await fetch(`${API_BASE}/analytics/daily`);
      if (res.ok) {
        const json = await res.json();
        if (json.data) return json.data;
      }
    } catch (err) {
      console.warn('Failed to fetch daily trends:', err);
    }
    return [
      { day: 'Day 1', date: 'Oct 01', targetCumulative: 40, actualCumulative: 34, dailyRegistrations: 34, referralContribution: 4 },
      { day: 'Day 2', date: 'Oct 02', targetCumulative: 100, actualCumulative: 88, dailyRegistrations: 54, referralContribution: 18 },
      { day: 'Day 3', date: 'Oct 03', targetCumulative: 180, actualCumulative: 152, dailyRegistrations: 64, referralContribution: 29 },
      { day: 'Day 4', date: 'Oct 04', targetCumulative: 260, actualCumulative: 228, dailyRegistrations: 76, referralContribution: 38 },
      { day: 'Day 5', date: 'Oct 05', targetCumulative: 340, actualCumulative: 327, dailyRegistrations: 99, referralContribution: 48 },
      { day: 'Day 6', date: 'Oct 06', targetCumulative: 420, actualCumulative: 0, dailyRegistrations: 0, referralContribution: 0 },
      { day: 'Day 7', date: 'Oct 07', targetCumulative: 500, actualCumulative: 0, dailyRegistrations: 0, referralContribution: 0 }
    ];
  },

  async getFunnel(): Promise<FunnelStage[]> {
    try {
      const res = await fetch(`${API_BASE}/analytics/funnel`);
      if (res.ok) {
        const json = await res.json();
        if (json.data) return json.data;
      }
    } catch (err) {
      console.warn('Failed to fetch funnel:', err);
    }
    return [
      { stage: '1. Landing Page Visitors', count: 1840, conversionFromPrev: 100, dropOffRate: 0 },
      { stage: '2. AI Generator Interactions', count: 1196, conversionFromPrev: 65.0, dropOffRate: 35.0 },
      { stage: '3. Registration Form Initiated', count: 588, conversionFromPrev: 49.2, dropOffRate: 50.8 },
      { stage: '4. Confirmed Registrations', count: 327, conversionFromPrev: 55.6, dropOffRate: 44.4 },
      { stage: '5. Shared Referral Link', count: 186, conversionFromPrev: 56.9, dropOffRate: 43.1 }
    ];
  },

  async getExperiments(): Promise<Experiment[]> {
    try {
      const res = await fetch(`${API_BASE}/analytics/experiments`);
      if (res.ok) {
        const json = await res.json();
        if (json.data) return json.data;
      }
    } catch (err) {
      console.warn('Failed to fetch experiments:', err);
    }
    return [
      {
        id: 'EXP-01',
        name: 'Value Proposition Headline Test',
        hypothesis: 'Focusing on placement interview proof will increase landing-to-registration conversion over a generic learning promise.',
        variantA: '"Learn AI in 60 Minutes"',
        variantB: '"Build an AI Project You Can Defend in Placement Interviews"',
        metric: 'Landing Page -> Registration %',
        variantAConversion: 14.8,
        variantBConversion: 23.4,
        sampleSize: 850,
        status: 'Concluded',
        winner: 'B',
        decision: 'Rolled out Variant B sitewide. Resulted in +58% relative lift in conversions.'
      },
      {
        id: 'EXP-02',
        name: 'Referral Incentive Milestone Threshold',
        hypothesis: 'A lower 3-referral threshold for the GitHub Starter Kit will generate higher aggregate referrals than a 5-referral hurdle.',
        variantA: 'Threshold: 5 Referrals for VIP Repo',
        variantB: 'Threshold: 3 Referrals for VIP Repo',
        metric: 'Avg Referrals per Active Student',
        variantAConversion: 1.2,
        variantBConversion: 2.7,
        sampleSize: 220,
        status: 'Concluded',
        winner: 'B',
        decision: 'Variant B produced 2.25x viral participation. Adopted 3-friend milestone as core hook.'
      },
      {
        id: 'EXP-03',
        name: 'Interactive AI Generator vs Direct Form CTA',
        hypothesis: 'Letting students personalize their AI project before registering creates psychological ownership and lifts signups.',
        variantA: 'Standard Landing Page with Direct Registration Form',
        variantB: 'Interactive AI Project Generator prior to Registration',
        metric: 'Visitor -> Registration Completion %',
        variantAConversion: 16.2,
        variantBConversion: 26.8,
        sampleSize: 640,
        status: 'Concluded',
        winner: 'B',
        decision: 'Variant B increased completion by +65.4%. Generator positioned as the core hero hook.'
      },
      {
        id: 'EXP-04',
        name: 'WhatsApp Community Broadcast Copy Length',
        hypothesis: 'A concise bulleted WhatsApp broadcast with bold interview outcomes will outperform long explanatory paragraphs.',
        variantA: 'Long detailed curriculum message (250 words)',
        variantB: 'Scannable 4-bullet point hook + direct referral link (70 words)',
        metric: 'Click-Through to Registration %',
        variantAConversion: 8.5,
        variantBConversion: 19.1,
        sampleSize: 1200,
        status: 'Concluded',
        winner: 'B',
        decision: 'Short bulleted format drove 2.2x CTR. Standardized across all college WhatsApp distribution.'
      }
    ];
  },

  async trackShare(): Promise<void> {
    try {
      await fetch(`${API_BASE}/referral/share`, { method: 'POST' });
    } catch {
      // ignore
    }
  },

  async toggleDemoMode(enabled?: boolean): Promise<boolean> {
    try {
      const res = await fetch(`${API_BASE}/analytics/toggle-demo`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ enabled })
      });
      if (res.ok) {
        const json = await res.json();
        return json.demoMode;
      }
    } catch (err) {
      console.warn('Failed to toggle demo mode on server:', err);
    }
    return true;
  },

  async resetData(): Promise<void> {
    try {
      await fetch(`${API_BASE}/analytics/reset`, { method: 'POST' });
    } catch (err) {
      console.warn('Failed to reset data:', err);
    }
  }
};
