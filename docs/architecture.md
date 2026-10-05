# NxtWave AI Workshop Growth Engine: System Architecture & Technical Specifications

## 1. High-Level Architecture Overview

The system is built as a modular, lightweight, high-performance full-stack web application designed for rapid deployment, interactive user engagement, and granular growth instrumentation.

```
                           ┌─────────────────────────────────────────┐
                           │      Client Browser (React 19 + Vite)   │
                           │  • Tailwind CSS & Glassmorphism UI      │
                           │  • Interactive AI Idea Generator Form   │
                           │  • 30s Fast Registration Form           │
                           │  • Viral Milestone Meter & 1-Click WA   │
                           │  • Real-time Growth Command Center UI   │
                           └────────────────────┬────────────────────┘
                                                │
                                    REST API Calls (/api/*)
                                                │
                                                ▼
                           ┌─────────────────────────────────────────┐
                           │       Backend Server (Node / Express)   │
                           │  • CORS & Request Telemetry Logger      │
                           │  • Registration Controller              │
                           │  • Viral Referral Attribution Engine    │
                           │  • Dynamic AI Project Heuristics Engine │
                           │  • Analytics & Experimentation Aggregator│
                           └───────────────┬─────────┬───────────────┘
                                           │         │
                       ┌───────────────────┘         └───────────────────┐
                       ▼                                                 ▼
        ┌─────────────────────────────┐                   ┌─────────────────────────────┐
        │  In-Memory / SQLite Store   │                   │    PostgreSQL / Supabase    │
        │  • Fast Local Zero-Config   │                   │    • Production Schema      │
        │  • Auto-Increment Ref Count │                   │    • Triggers & Foreign Keys│
        │  • Simulation / Live Toggle │                   │    • Complete DDL & Seed    │
        └─────────────────────────────┘                   └─────────────────────────────┘
```

---

## 2. Component Structure & Data Flow

### A. Frontend Layer (`frontend/`)
- **Technology**: React 19, TypeScript, Vite, Tailwind CSS, Lucide React.
- **Key Modules**:
  - `ProjectGenerator.tsx`: Interactive state machine capturing branch, domain, skill, and tech stack. Communicates with `/api/ai/generate` and pre-populates registration state.
  - `RegistrationForm.tsx`: Lightweight form with real-time field validation, email format checks, and auto-referral code assignment.
  - `ReferralModal.tsx`: Post-submission celebration card with 1-click WhatsApp deep link (`https://api.whatsapp.com/send?text=...`) and progressive milestone meters.
  - `GrowthDashboard.tsx`: High-density executive command center presenting 6 core KPI cards, daily burn-up curves, channel attribution tables, funnel drop-off analysis, and A/B test logs.
  - `Leaderboard.tsx`: Real-time campus ambassador leaderboard showcasing top referrers by rank, college, and unlocked reward tiers.

### B. Backend Layer (`backend/`)
- **Technology**: Node.js, Express, TypeScript, tsx.
- **API Endpoints**:
  - `POST /api/register`: Validates inputs, creates unique alphanumeric referral codes (e.g. `RAHUL42`), records attribution, and increments referrer counts.
  - `GET /api/referral/:code`: Fetches individual referrer stats, milestone unlock statuses, and ranking.
  - `GET /api/referral/leaderboard`: Returns top campus champions sorted by referral count.
  - `POST /api/ai/generate`: Emits customized project blueprints, 60-min build roadmaps, and resume impact bullets.
  - `GET /api/analytics/overview`: Aggregates campaign target pacing, CAC, viral $K$-factor, and total registrations.
  - `GET /api/analytics/channels`: Supplies planned vs actual registrations, allocated budgets, and channel CAC.
  - `GET /api/analytics/funnel`: Generates 5-stage funnel telemetry and stage-by-stage drop-off percentages.
  - `GET /api/analytics/experiments`: Returns A/B experiment hypotheses, sample sizes, variants, and decisions.
  - `POST /api/analytics/toggle-demo`: Switches between real user database records and seed simulation data.

---

## 3. Database Architecture (`database/`)
- `schema.sql`: Contains the complete relational PostgreSQL / Supabase schema including:
  - `registrations`: Main user entity with unique constraints on email and referral codes.
  - `referrals`: Relational mapping of referrers to referred students.
  - `events`: Granular telemetry event stream for funnel drop-off analysis.
  - `campaign_channels`: Channel budgeting and actual spend tracking.
  - `experiments`: A/B growth experiment documentation and status.
  - `trg_increment_referral`: SQL trigger automatically updating referrer counts upon successful child registrations.
- `seed.sql`: Realistic seed population reflecting Day 5 campaign state (327 registrations, ₹850 spend, 4 experiments).

---

## 4. Automation Pipeline (`automation/`)
- `workflows/n8n_growth_workflow.json`: Complete exportable n8n workflow spec.
- Connects registration webhooks directly to:
  1. Instant WhatsApp confirmation template with unique referral link.
  2. Google Sheets / Supabase lead sync.
  3. Milestone listener triggering VIP rewards when referrals reach 3.
  4. Scheduled T-24h and T-15m reminder drip.
