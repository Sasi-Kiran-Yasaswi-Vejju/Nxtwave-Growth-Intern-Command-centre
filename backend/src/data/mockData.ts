import { ChannelMetric, DailyTrend, Experiment, FunnelStage, LeaderboardEntry, Registration } from '../types/index.js';

export const INITIAL_CHANNELS: ChannelMetric[] = [
  {
    id: 'whatsapp_communities',
    channelName: 'College WhatsApp Communities',
    plannedRegistrations: 200,
    actualRegistrations: 138,
    percentageOfTotal: 42.2,
    allocatedSpend: 0,
    actualSpend: 0,
    cac: 0,
    status: 'on_track'
  },
  {
    id: 'referral_engine',
    channelName: 'Student Referral Engine',
    plannedRegistrations: 150,
    actualRegistrations: 104,
    percentageOfTotal: 31.8,
    allocatedSpend: 300,
    actualSpend: 210,
    cac: 2.02,
    status: 'ahead'
  },
  {
    id: 'student_clubs',
    channelName: 'Campus Tech Clubs & Leads',
    plannedRegistrations: 75,
    actualRegistrations: 46,
    percentageOfTotal: 14.1,
    allocatedSpend: 300,
    actualSpend: 150,
    cac: 3.26,
    status: 'on_track'
  },
  {
    id: 'social_content',
    channelName: 'Organic Social / LinkedIn Tech Posts',
    plannedRegistrations: 50,
    actualRegistrations: 25,
    percentageOfTotal: 7.6,
    allocatedSpend: 200,
    actualSpend: 90,
    cac: 3.60,
    status: 'needs_attention'
  },
  {
    id: 'paid_experiment',
    channelName: 'Targeted Micro-Paid Experiment (Meta/IG)',
    plannedRegistrations: 25,
    actualRegistrations: 14,
    percentageOfTotal: 4.3,
    allocatedSpend: 1200,
    actualSpend: 400,
    cac: 28.57,
    status: 'on_track'
  }
];

export const INITIAL_DAILY_TRENDS: DailyTrend[] = [
  { day: 'Day 1', date: 'Oct 01', targetCumulative: 40, actualCumulative: 34, dailyRegistrations: 34, referralContribution: 4 },
  { day: 'Day 2', date: 'Oct 02', targetCumulative: 100, actualCumulative: 88, dailyRegistrations: 54, referralContribution: 18 },
  { day: 'Day 3', date: 'Oct 03', targetCumulative: 180, actualCumulative: 152, dailyRegistrations: 64, referralContribution: 29 },
  { day: 'Day 4', date: 'Oct 04', targetCumulative: 260, actualCumulative: 228, dailyRegistrations: 76, referralContribution: 38 },
  { day: 'Day 5', date: 'Oct 05', targetCumulative: 340, actualCumulative: 327, dailyRegistrations: 99, referralContribution: 48 },
  { day: 'Day 6', date: 'Oct 06', targetCumulative: 420, actualCumulative: 0, dailyRegistrations: 0, referralContribution: 0 },
  { day: 'Day 7', date: 'Oct 07', targetCumulative: 500, actualCumulative: 0, dailyRegistrations: 0, referralContribution: 0 }
];

export const INITIAL_FUNNEL: FunnelStage[] = [
  { stage: '1. Landing Page Visitors', count: 1840, conversionFromPrev: 100, dropOffRate: 0 },
  { stage: '2. AI Generator Interactions', count: 1196, conversionFromPrev: 65.0, dropOffRate: 35.0 },
  { stage: '3. Registration Form Initiated', count: 588, conversionFromPrev: 49.2, dropOffRate: 50.8 },
  { stage: '4. Confirmed Registrations', count: 327, conversionFromPrev: 55.6, dropOffRate: 44.4 },
  { stage: '5. Shared Referral Link', count: 186, conversionFromPrev: 56.9, dropOffRate: 43.1 }
];

export const INITIAL_EXPERIMENTS: Experiment[] = [
  {
    id: 'EXP-01',
    name: 'Value Proposition Headline Test',
    hypothesis: 'Focusing on placement interview proof will increase landing-to-registration conversion over a generic learning promise.',
    variantA: '"Learn AI in 60 Minutes"',
    variantB: '"Build an AI Project You Can Defend in Placement Interviews"',
    metric: 'Landing Page → Registration %',
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
    metric: 'Visitor → Registration Completion %',
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

export const INITIAL_LEADERBOARD: LeaderboardEntry[] = [
  {
    rank: 1,
    name: 'Yasaswi Sharma',
    college: 'JNTU Hyderabad',
    referralCode: 'YASASWI42',
    referralCount: 27,
    tier: 'Ambassador Elite',
    rewardUnlocked: 'VIP 1-on-1 AI Resume Review + Front Row AMA'
  },
  {
    rank: 2,
    name: 'Rahul K. Varma',
    college: 'Osmania University',
    referralCode: 'RAHUL99',
    referralCount: 21,
    tier: 'Ambassador Elite',
    rewardUnlocked: 'VIP 1-on-1 AI Resume Review + Front Row AMA'
  },
  {
    rank: 3,
    name: 'Sneha Patel',
    college: 'CBIT Hyderabad',
    referralCode: 'SNEHA18',
    referralCount: 18,
    tier: 'Campus Champion',
    rewardUnlocked: 'GitHub Production Kit + API Starter Pack'
  },
  {
    rank: 4,
    name: 'Aditya Nair',
    college: 'VNR VJIET',
    referralCode: 'ADITYA15',
    referralCount: 15,
    tier: 'Campus Champion',
    rewardUnlocked: 'GitHub Production Kit + API Starter Pack'
  },
  {
    rank: 5,
    name: 'Pooja Reddy',
    college: 'SRM Institute of Tech',
    referralCode: 'POOJA13',
    referralCount: 13,
    tier: 'Campus Champion',
    rewardUnlocked: 'GitHub Production Kit + API Starter Pack'
  },
  {
    rank: 6,
    name: 'Karthik S.',
    college: 'Vellore Institute of Technology',
    referralCode: 'KARTHIK10',
    referralCount: 10,
    tier: 'AI Pioneer',
    rewardUnlocked: 'AI Placement Resume Bullet Bank'
  },
  {
    rank: 7,
    name: 'Divya Iyer',
    college: 'PSG College of Technology',
    referralCode: 'DIVYA08',
    referralCount: 8,
    tier: 'AI Pioneer',
    rewardUnlocked: 'AI Placement Resume Bullet Bank'
  },
  {
    rank: 8,
    name: 'Manish Gupta',
    college: 'BMS College of Engineering',
    referralCode: 'MANISH06',
    referralCount: 6,
    tier: 'AI Pioneer',
    rewardUnlocked: 'AI Placement Resume Bullet Bank'
  }
];

export const INITIAL_REGISTRATIONS: Registration[] = [
  {
    id: 'REG-1001',
    name: 'Yasaswi Sharma',
    email: 'yasaswi.s@student.jntuh.ac.in',
    whatsapp: '+91 98480 12345',
    college: 'JNTU Hyderabad',
    branch: 'Computer Science and Engineering',
    graduationYear: 2027,
    source: 'Campus Tech Clubs',
    referralCode: 'YASASWI42',
    referralCount: 27,
    createdAt: '2026-10-01T09:15:00Z',
    isSimulated: true
  },
  {
    id: 'REG-1002',
    name: 'Rahul K. Varma',
    email: 'rahul.varma@osmania.ac.in',
    whatsapp: '+91 94401 56789',
    college: 'Osmania University',
    branch: 'Electronics and Communication',
    graduationYear: 2027,
    source: 'College WhatsApp Communities',
    referralCode: 'RAHUL99',
    referralCount: 21,
    createdAt: '2026-10-01T10:30:00Z',
    isSimulated: true
  },
  {
    id: 'REG-1003',
    name: 'Sneha Patel',
    email: 'sneha.patel@cbit.org.in',
    whatsapp: '+91 99890 34567',
    college: 'CBIT Hyderabad',
    branch: 'Information Technology',
    graduationYear: 2027,
    source: 'College WhatsApp Communities',
    referralCode: 'SNEHA18',
    referralCount: 18,
    createdAt: '2026-10-02T11:00:00Z',
    isSimulated: true
  },
  {
    id: 'REG-1004',
    name: 'Aditya Nair',
    email: 'aditya.nair@vnrvjiet.in',
    whatsapp: '+91 97012 45678',
    college: 'VNR VJIET',
    branch: 'Computer Science and Engineering',
    graduationYear: 2027,
    source: 'Student Referral Engine',
    referralCode: 'ADITYA15',
    referredBy: 'YASASWI42',
    referralCount: 15,
    createdAt: '2026-10-02T14:20:00Z',
    isSimulated: true
  },
  {
    id: 'REG-1005',
    name: 'Pooja Reddy',
    email: 'pooja.r@srmist.edu.in',
    whatsapp: '+91 96180 89012',
    college: 'SRM Institute of Tech',
    branch: 'Data Science & AI',
    graduationYear: 2027,
    source: 'Student Referral Engine',
    referralCode: 'POOJA13',
    referredBy: 'RAHUL99',
    referralCount: 13,
    createdAt: '2026-10-03T09:45:00Z',
    isSimulated: true
  }
];
