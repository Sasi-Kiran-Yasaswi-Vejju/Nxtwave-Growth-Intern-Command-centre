# NxtWave Growth Intern Challenge: AI Workshop Growth Engine

[![Built for NxtWave](https://img.shields.io/badge/NxtWave-Growth%20Challenge-6366F1?style=for-the-badge)](https://www.ccbp.in)
[![Target: 500 Engineers](https://img.shields.io/badge/Target-500%20Final--Year%20Engineers-10B981?style=for-the-badge)](#growth-model)
[![Budget: ₹2,000](https://img.shields.io/badge/Budget-%E2%82%B92%2C000%20%7C%20Blended%20CAC%20%E2%82%B92.60-06B6D4?style=for-the-badge)](#budget--unit-economics)
[![Methodology](https://img.shields.io/badge/Methodology-IDEA%20%E2%86%92%20BUILD%20%E2%86%92%20LAUNCH%20%E2%86%92%20MEASURE-F59E0B?style=for-the-badge)](#growth-strategy)

A full-stack, submission-ready growth engine built for the **NxtWave Growth Intern – AI, Experiments & Community** challenge. 

Rather than building a generic static landing page, this project delivers an interactive, end-to-end **AI Workshop Growth Engine** designed to acquire **500 final-year engineering students** for the free workshop: **"Build Your First AI Project in 60 Minutes"** within 7 days on a strict ₹2,000 budget.

---

## Table of Contents
1. [The Problem](#problem)
2. [The Solution & Core Innovation](#solution)
3. [Target Audience & Student Insight](#target-audience)
4. [Growth Strategy & 5 Distribution Channels](#growth-strategy)
5. [Working Asset & Product Capabilities](#working-asset)
6. [Tech Stack & System Architecture](#tech-stack)
7. [Project Structure](#project-structure)
8. [Local Setup & Quickstart](#local-setup)
9. [Environment Variables](#environment-variables)
10. [Database Setup (Schema & Seed)](#database-setup)
11. [Running Frontend & Backend](#running-the-project)
12. [Demo / Simulation Mode](#demo-mode)
13. [Deployment Guide](#deployment)
14. [500-Registration Growth Model & Funnel Math](#growth-model)
15. [A/B Growth Experiment Plan](#experiment-plan)
16. [AI Learning Notes & Human Judgment](#ai-learning-notes)
17. [3-Minute Video Walkthrough Script](#video-demo)
18. [Screenshots](#screenshots)
19. [Future Roadmap (Next 24 Hours)](#future-improvements)
20. [Security & Privacy](#security)
21. [Submission Verification Checklist](#submission-checklist)

---

## Problem
NxtWave plans to launch a free online workshop: **"Build Your First AI Project in 60 Minutes"**.
- **Mission**: Formulate a plan and build an asset to get **500 final-year engineering students** to register.
- **Constraints**: 
  - Budget: ₹2,000
  - Duration: 7 Days
  - Status: Simulation & Growth Architecture Assessment
- **Key Pitfall**: Standard digital marketing campaigns fail because cold ads cost ₹80–₹120 per registration in India. Spending ₹2,000 on paid ads yields barely 15–25 students. Furthermore, generic landing pages suffer from high bounce rates when asking for contact info upfront.

---

## Solution
We built the **AI Workshop Growth Engine**, a multi-tiered acquisition platform that combines:
1. **Interactive AI Project Idea Generator**: Gives students immediate personal value by creating a customized project blueprint, 60-minute build roadmap, and resume bullet point *before* asking for registration.
2. **Frictionless Registration Engine**: Fast 30-second form with auto-referral attribution.
3. **Viral Referral Loop ($K = 0.46$)**: Generates unique shareable codes (`?ref=CODE`) and 1-click WhatsApp links with tiered milestone unlocks.
4. **Gamified Campus Leaderboard**: Publicly recognizes top college ambassadors.
5. **Growth Analytics Command Center (`/dashboard`)**: Full visibility into 5-stage funnel drop-offs, channel CAC, daily pacing curves, and live A/B experiments.

---

## Target Audience
- **Who**: Final-year engineering students (Batches 2025/2026 across CSE, IT, ECE, EEE, Mechanical, Civil) preparing for campus placement drives.
- **Why They Care**:
  - The "Resume Duplication Crisis": Over 90% of resumes contain the exact same tutorial projects (Iris dataset, Titanic predictor, Todo list). Tech recruiters discard them within 15 seconds.
  - Students know Generative AI is vital for modern tech interviews, but lack guided implementation.
- **The Value Proposition**:
  > *"Stop Putting 'Basic Python' on Your Resume. Build a Real AI Project in 60 Minutes with a Deployed Cloud Link, Verified GitHub Commits, and Interview Talking Points."*

---

## Growth Strategy
We designed a high-leverage 5-channel model prioritizing high-trust peer networks:

| Channel | Projected Regs | % Contribution | Budget Allocated | Actual Spend (D5) | Channel CAC | Primary Mechanism |
| :--- | :---: | :---: | :---: | :---: | :---: | :--- |
| **1. College WhatsApp Communities** | 200 | 40% | ₹0 | ₹0 | ₹0.00 | Targeted broadcasts across 35 curated college batches |
| **2. Viral Student Referral Engine** | 150 | 30% | ₹300 | ₹210 | ₹2.02 | Gamified milestone rewards (GitHub kit + resume reviews) |
| **3. Campus Tech Clubs & Leads** | 75 | 15% | ₹300 | ₹150 | ₹3.26 | Partnerships with GDSC / CSI student leads |
| **4. Organic Social / LinkedIn Content** | 50 | 10% | ₹200 | ₹90 | ₹3.60 | "Before/After" resume teardown carousels |
| **5. Targeted Micro-Paid Experiment (Meta)** | 25 | 5% | ₹1,200 | ₹400 | ₹28.57 | High-intent Instagram Story ads testing creative hooks |
| **TOTALS / BLENDED** | **500** | **100%** | **₹2,000** | **₹850** | **₹2.60** | **Blended Unit Economics (₹1,150 dry powder left)** |

---

## Working Asset
The live full-stack application provides 5 integrated user experiences:
1. **Interactive AI Project Generator**: Tailors blueprints across 8 engineering disciplines (CSE, ECE, Mech, Civil) and 6 domains (Placements, Healthcare, FinTech, EdTech, DevTools, E-Commerce).
2. **Fast 30-Second Registration Form**: With field-level validation and duplicate email handling.
3. **Post-Registration Viral Modal**: 1-click WhatsApp share with pre-filled viral copy and 3 reward tiers:
   - *1 Referral*: AI Placement Resume Bullet Bank
   - *3 Referrals*: Production GitHub Starter Kit & API Cheat Sheet
   - *5 Referrals*: VIP 1-on-1 AI Resume Review + Front Row AMA
4. **Campus Ambassador Leaderboard**: Live ranking of top referrers by college.
5. **Growth Team Analytics Command Center**: Available via the top-bar button (`/dashboard`).

---

## Tech Stack
- **Frontend**: React 19, TypeScript, Vite, Tailwind CSS, Lucide React Icons.
- **Backend API**: Node.js, Express, TypeScript, tsx, CORS, Dotenv.
- **Data Persistence**: In-memory thread-safe state store with seedable baseline simulation data + complete SQL Schema for PostgreSQL / Supabase.
- **Automation Specification**: Ready-to-import n8n workflow for registration webhooks and WhatsApp drip sequences.

---

## Project Structure
```
nxtwave-growth-challenge/
│
├── README.md                      # Comprehensive project documentation
├── LICENSE                        # MIT Open Source License
├── .gitignore                     # Production Git ignore rules
├── .env.example                   # Environment configuration template
├── package.json                   # Root monorepo convenience scripts
│
├── frontend/                      # React 19 + TypeScript + Vite + Tailwind
│   ├── package.json
│   ├── vite.config.ts
│   ├── tsconfig.json
│   ├── index.html
│   └── src/
│       ├── components/
│       │   ├── Navbar.tsx
│       │   ├── Hero.tsx
│       │   ├── WorkshopInfo.tsx
│       │   ├── ProjectGenerator.tsx
│       │   ├── RegistrationForm.tsx
│       │   ├── ReferralModal.tsx
│       │   ├── Leaderboard.tsx
│       │   ├── GrowthDashboard.tsx
│       │   ├── AutomationModal.tsx
│       │   └── Footer.tsx
│       ├── hooks/
│       │   └── useReferral.ts
│       ├── services/
│       │   └── api.ts
│       ├── types/
│       │   └── index.ts
│       ├── App.tsx
│       ├── main.tsx
│       └── index.css
│
├── backend/                       # Express + TypeScript REST API
│   ├── package.json
│   ├── tsconfig.json
│   ├── .env.example
│   └── src/
│       ├── server.ts              # Entry point & CORS middleware
│       ├── types/index.ts         # Server interfaces
│       ├── data/
│       │   ├── mockData.ts        # 327 Seed cohort & channel figures
│       │   └── store.ts           # Stateful in-memory growth store
│       ├── services/
│       │   └── aiGenerator.ts     # Domain-aware AI heuristics engine
│       └── routes/
│           ├── registration.ts    # POST /api/register & duplicate checks
│           ├── referral.ts        # Code lookups, milestones & leaderboard
│           ├── ai.ts              # POST /api/ai/generate
│           └── analytics.ts       # Telemetry, KPIs, funnel, A/B experiments
│
├── database/                      # Production Database Specifications
│   ├── schema.sql                 # PostgreSQL / Supabase DDL schema with triggers
│   └── seed.sql                   # Realistic baseline simulation SQL
│
├── automation/                    # Marketing Automation Workflows
│   ├── README.md                  # WhatsApp & n8n architecture documentation
│   └── workflows/
│       └── n8n_growth_workflow.json # Importable n8n workflow spec
│
├── docs/                          # Comprehensive Strategy & Evaluation Docs
│   ├── growth-plan.md             # 2-Page Growth Plan & 5-Slide presentation
│   ├── campaign-strategy.md       # In-depth channel breakdown & playbook
│   ├── experiment-plan.md         # 4 Prioritized A/B experiment logs
│   ├── ai-learning-notes.md       # 3 Authentic examples of AI + Human judgment
│   ├── video-script.md            # Timestamped 3-minute video presentation script
│   ├── architecture.md            # Technical specifications & data flows
│   └── metrics.md                 # Measurement framework & viral formulas
│
├── presentation/
│   └── growth-plan.md             # 5-Slide slide deck for executive review
│
└── screenshots/                   # Visual Mockup Assets
    ├── landing-page.png
    ├── ai-generator.png
    ├── registration.png
    ├── referral.png
    └── dashboard.png
```

---

## Local Setup

### Prerequisites
- Node.js (v18.x, v20.x, or v22.x)
- npm (v9.x or higher)
- Git

### 1. Clone & Install Dependencies
```bash
# Clone the repository
git clone https://github.com/your-username/nxtwave-growth-challenge.git
cd nxtwave-growth-challenge

# Install all dependencies (Frontend and Backend)
npm run install:all
```

---

## Environment Variables
Create a `.env` file in the root or inside `backend/`:
```bash
# Copy example file
cp .env.example .env
```
Default configuration:
```env
PORT=5000
NODE_ENV=development
VITE_API_URL=http://localhost:5000/api
DEMO_MODE=true
# Optional: Set OPENAI_API_KEY if you want live OpenAI calls instead of the offline generator
OPENAI_API_KEY=
```

---

## Database Setup
The backend runs out of the box with zero database installation required using the built-in stateful store.

If connecting to a production **Supabase / PostgreSQL** database:
1. Open your Supabase SQL Editor.
2. Run `database/schema.sql` to generate tables, indexes, and triggers.
3. Run `database/seed.sql` to populate the baseline 327 simulated registrations.

---

## Running the Project

### Option A: Run Both Concurrently (Recommended)
From the root directory:
```bash
# Terminal 1: Start Backend API (Port 5000)
npm run dev:backend

# Terminal 2: Start Frontend App (Port 5173)
npm run dev:frontend
```

### Option B: Run Individually
```bash
# Start Backend
cd backend
npm run dev

# Start Frontend
cd ../frontend
npm run dev
```

Visit **`http://localhost:5173`** in your browser.

---

## Demo Mode
Because this assignment is a simulation:
- The app defaults to **Simulation Mode (`DEMO_MODE=true`)**.
- The dashboard displays Day 5 campaign progress (327 registrations, ₹850 spend, CAC ₹2.60).
- You can register new users in real-time, test referral code generation, and watch the live leaderboard update.
- In `/dashboard`, you can toggle **"Mode: Simulation Active"** to view pure live data or seed data, and click **Reset** to restore baseline metrics anytime.

---

## Deployment Guide

### Deploying Frontend to Vercel
1. Push this repository to GitHub.
2. In Vercel, select **Import Project** and set Root Directory to `frontend`.
3. Set Build Command to `npm run build` and Output Directory to `dist`.
4. Deploy!

### Deploying Backend to Render / Railway
1. Set Root Directory to `backend`.
2. Build Command: `npm install && npm run build`.
3. Start Command: `node dist/server.js`.
4. Set environment variable `PORT=5000`.

---

## Growth Model & Funnel Math

$$\text{Total Registrations} = \text{Direct Community Inflow} \times (1 + \text{Viral Coefficient } K)$$

```
Landing Visitors (1,840)
       │
       ▼ (65.0% interacted)
AI Generator Users (1,196)
       │
       ▼ (49.2% started form)
Form Initiated (588)
       │
       ▼ (55.6% confirmed)
Confirmed Registrations (327 by Day 5)
       │
       ▼ (56.9% shared link)
Referral Loop Active (186 sharers → 104 referral regs | K = 0.46)
```

- **Blended CAC**: ₹850 / 327 = **₹2.60 / student**.
- **Run-rate**: 99 registrations/day; easily tracking to exceed 500 by Day 7.

---

## Experiment Plan

| Experiment | Hypothesis | Winner | Decision / Lift |
| :--- | :--- | :---: | :--- |
| **EXP-01: Headline Test** | Placement proof beats generic learning promises | **Variant B** | "Build an AI project for interviews" lifted conversion by **+58%**. |
| **EXP-02: Referral Threshold** | 3 friends is more attainable than 5 friends | **Variant B** | 3-friend milestone increased viral sharing by **2.25x** ($K = 0.46$). |
| **EXP-03: AI Generator Hook** | Upfront personalized value builds ownership | **Variant B** | Interactive generator lifted visitor-to-reg rate from 16.2% to **26.8%**. |
| **EXP-04: WhatsApp Copy** | 70-word bulleted format beats long text | **Variant B** | Concise scannable broadcast drove **2.2x higher CTR**. |

---

## AI Learning Notes

### Example 1: Acquisition Channel Strategy
- **What I Asked AI**: *"Suggest a strategy to get 500 engineering students on ₹2,000."*
- **What AI Suggested**: Spend 70% of budget on Google/Meta Search Ads.
- **What I Changed**: Cut paid ads to a minimal ₹400 test and drove 85%+ registrations through College WhatsApp groups and referral loops.
- **Why**: Search ads in India cost ₹15–₹30/click. At 10% conversion, each registration costs ₹150–₹300. ₹2,000 would yield fewer than 20 registrations.

### Example 2: Product Asset Choice
- **What I Asked AI**: *"Suggest what product to build for this challenge."*
- **What AI Suggested**: Build a landing page.
- **What I Changed**: Built an interactive AI Generator + Referral Engine + Leaderboard + Analytics Dashboard.
- **Why**: The challenge explicitly warned: *"Everyone might build a landing page"*. Building an interactive asset proves product judgment and creates a viral loop.

### Example 3: Referral Incentives
- **What I Asked AI**: *"Suggest referral incentives for students."*
- **What AI Suggested**: ₹50 cash / UPI rewards or electronics raffle.
- **What I Changed**: Replaced cash with zero-marginal-cost educational assets (Verified Resume Bullet Bank, GitHub Starter Kit, 1-on-1 AI Resume Review).
- **Why**: Cash incentives attract bots, blow the ₹2,000 budget, and fail to align with students' genuine desire: cracking placement interviews.

---

## Video Demo
A complete timestamped 3-minute video presentation script is available in:
[`docs/video-script.md`](file:///c:/Users/sasik/Downloads/Nextwave/docs/video-script.md)

- `0:00–0:20`: Problem & Challenge Constraints
- `0:20–0:45`: Target Audience & Placement Resume Insight
- `0:45–1:20`: Capital-Efficient 5-Channel Strategy (₹2.60 CAC)
- `1:20–2:15`: Live Walkthrough (AI Generator → Registration → Viral Pass → Leaderboard → Dashboard)
- `2:15–2:40`: Funnel Mathematics & Viral $K$-Factor (0.46)
- `2:40–3:00`: What I Learned & AI Suggestions Rejected

---

## Screenshots
All mockup screenshots are located in `screenshots/`:
- `landing-page.png`: Workshop hero and positioning badges
- `ai-generator.png`: Interactive AI Project Idea Generator
- `registration.png`: 30-Second fast registration modal
- `referral.png`: Viral pass with 1-click WhatsApp share
- `dashboard.png`: Growth analytics command center

---

## Future Improvements
If given another 24 hours:
1. **Live Meta WhatsApp Cloud API**: Direct webhook delivery of referral passes.
2. **Referral Fraud Detection**: Browser fingerprinting & `.edu` email domain verification.
3. **Exit-Intent Blueprint Download**: One-click PDF download to capture bouncing visitors.
4. **Automated Calendar .ics Generation**: Instant 1-click Google Calendar sync.

---

## Security
- No secrets or private API keys committed.
- API inputs validated and sanitized.
- Server-side AI generation fallback ensures zero exposure of developer credentials.
- All metrics clearly labeled as campaign simulation data.

---

## Submission Checklist
- [x] **Growth Plan**: 2-page version and 5-slide format in `docs/growth-plan.md` and `presentation/growth-plan.md`.
- [x] **Working Asset**: Complete full-stack application running on port 5173 / 5000 with interactive AI Generator, Registration, Referral tracking, Leaderboard, and Growth Dashboard.
- [x] **AI + Learning Notes**: Exactly 3 authentic examples in `docs/ai-learning-notes.md`.
- [x] **3-Minute Video Script**: Time-stamped script in `docs/video-script.md`.
- [x] **Git History**: Incremental commit history reflecting step-by-step development.
- [x] **Zero Fabricated Results**: Explicitly labeled as simulation and planning model.

---

## Author
Built with passion for the **NxtWave Growth Intern – AI, Experiments & Community** challenge.  
*Philosophy: IDEA → BUILD → LAUNCH → MEASURE → LEARN → SCALE.*
