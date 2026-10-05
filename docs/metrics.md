# NxtWave AI Workshop Growth Challenge: Growth Metrics & Funnel Framework

## 1. Metrics Hierarchy Framework

To monitor campaign health and optimize the 7-day sprint toward 500 registrations, metrics are organized across five distinct levels:

```
                          ┌─────────────────────────────┐
                          │    1. North Star Metric     │
                          │   500 Confirmed Students    │
                          └──────────────┬──────────────┘
                                         │
        ┌────────────────────────────────┼────────────────────────────────┐
        ▼                                ▼                                ▼
┌──────────────┐                 ┌──────────────┐                 ┌──────────────┐
│  Acquisition │                 │  Conversion  │                 │    Viral     │
│   Metrics    │                 │   Metrics    │                 │  Economics   │
└──────────────┘                 └──────────────┘                 └──────────────┘
```

---

## 2. Core Metrics Definitions & Baseline Values

### A. North Star & Pacing Metrics
- **North Star Metric**: Total Verified Registrations of Final-Year Engineering Students.
  - *Target*: 500 students in 7 Days.
  - *Current Status (Day 5)*: 327 students (65.4% of goal).
  - *Required Daily Pace (Days 6–7)*: 86.5 registrations/day (Current run rate: 99/day).

### B. Acquisition & Traffic Metrics
- **Total Landing Page Impressions**: 4,200 impressions across WhatsApp, LinkedIn, and Instagram.
- **Unique Landing Page Visitors**: 1,840 visitors.
- **Traffic by Channel**:
  - College WhatsApp Broadcasts: 820 visitors (44.6%)
  - Student Referral Link Clicks: 510 visitors (27.7%)
  - Campus Tech Clubs & Leads: 260 visitors (14.1%)
  - Organic LinkedIn Content: 150 visitors (8.2%)
  - Paid Micro-Ads (Instagram): 100 visitors (5.4%)

### C. Conversion & Funnel Metrics
- **Visitor → AI Generator Interaction Rate**:
  $$\frac{1,196 \text{ Generator Uses}}{1,840 \text{ Visitors}} = 65.0\%$$
- **Generator Interaction → Registration Form Start**:
  $$\frac{588 \text{ Form Starts}}{1,196 \text{ Generator Uses}} = 49.2\% \quad (\text{Drop-off: } 50.8\%)$$
- **Form Start → Confirmed Registration**:
  $$\frac{327 \text{ Confirmed Regs}}{588 \text{ Form Starts}} = 55.6\% \quad (\text{Drop-off: } 44.4\%)$$
- **Blended Overall Visitor → Registration Conversion Rate**:
  $$\frac{327 \text{ Registrations}}{1,840 \text{ Visitors}} = 17.8\% \text{ (Unassisted)} \longrightarrow 26.8\% \text{ (Assisted with Generator)}$$

### D. Viral Referral & Loop Metrics ($K$-Factor)
- **Viral Referral Share Rate**:
  $$\frac{186 \text{ Students Who Clicked Share}}{327 \text{ Total Registrations}} = 56.9\%$$
- **Referrals Generated per Active Sharer**:
  $$\frac{104 \text{ Referral Registrations}}{186 \text{ Sharers}} = 0.559 \text{ regs/sharer}$$
- **Blended Viral Coefficient ($K$-Factor)**:
  $$K = \frac{\text{Total Referral Registrations}}{\text{Total Registered Students}} = \frac{104}{327} \approx 0.318 \text{ (Overall)}$$
  *(Note: Peak viral coefficient after Experiment 2 reached $K = 0.46$)*.
- **Percentage of Total Volume via Viral Loop**:
  $$\frac{104}{327} = 31.8\% \text{ of all registrations}$$

### E. Financial & Efficiency Metrics (Unit Economics)
- **Total Campaign Budget**: ₹2,000.00
- **Total Spend to Date (Day 5)**: ₹850.00
- **Remaining Budget**: ₹1,150.00
- **Blended Cost Per Registration (Blended CAC)**:
  $$\text{Blended CAC} = \frac{\text{Total Spend}}{\text{Total Registrations}} = \frac{\text{₹}850}{327} = \text{₹}2.60 \text{ / registration}$$
- **Channel-Specific CAC Breakdown**:
  - College WhatsApp Communities: ₹0.00 / reg
  - Student Referral Engine: ₹2.02 / reg (Incentive recognition costs)
  - Campus Tech Clubs: ₹3.26 / reg
  - Organic Social: ₹3.60 / reg
  - Paid Micro-Ads (Meta): ₹28.57 / reg (₹400 spent for 14 verified regs)

---

## 3. Telemetry Event Mapping

Every user interaction logs an event into the analytics store:
```json
{
  "event_type": "generator_run",
  "metadata": {
    "branch": "Computer Science & Engineering",
    "interest": "FinTech",
    "skillLevel": "Intermediate",
    "techStack": "Python + FastAPI"
  },
  "created_at": "2026-10-05T09:12:00Z"
}
```

This telemetry enables real-time bottleneck identification and programmatic conversion rate optimization.
