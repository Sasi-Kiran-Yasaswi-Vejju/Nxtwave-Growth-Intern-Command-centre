# NxtWave AI Workshop Growth Automation Architecture

## Executive Overview
In high-growth startups, manual follow-ups do not scale. To achieve 500 registrations and maximize workshop attendance with a ₹2,000 budget, we designed an event-driven automation pipeline connecting:
1. **Frontend Registration Webhook**
2. **n8n / Zapier Workflow Engine**
3. **WhatsApp Cloud API (Meta BSP) / Twilio**
4. **Google Sheets / Supabase Real-time Sync**
5. **Dynamic Calendar Invitation (.ics)**

```
Student Registers on Web App
             │
             ▼
POST /api/register (Webhook)
             │
             ▼
   n8n Event Trigger Node
     ├── 1. Generate & Store Referral Link
     ├── 2. Sync to Central Growth CRM / Google Sheet
     ├── 3. Send Instant WhatsApp Confirmation with 1-Click Viral Invite Link
     ├── 4. Schedule Reminder Flow:
     │        ├── T-24 Hours: Setup Prep & Colab Link
     │        ├── T-2 Hours: "Seats filling, check your link"
     │        └── T-15 Minutes: Direct Zoom/YouTube Stream Magic Link
     └── 5. Referral Milestone Listener:
              └── If Referrals == 3 -> Instantly trigger WhatsApp DM with VIP GitHub Repo Access
```

---

## 3-Touch WhatsApp & Email Engagement Sequence

### Touchpoint 1: Instant Confirmation (T = 0)
- **Channel**: WhatsApp & Transactional Email
- **Trigger**: Registration Successful
- **Copy**:
  > *"Hi {{firstName}}! 🚀 Your seat for NxtWave's 'Build Your First AI Project in 60 Minutes' is confirmed.*
  > *Date: Sunday, 7:00 PM IST.*
  > *Your referral code: `{{referralCode}}`.*
  > *Want the AI Placement Resume Template? Invite 1 friend with your unique link: {{referralUrl}}"*

### Touchpoint 2: The Prep Kit (T-24h)
- **Channel**: WhatsApp + Google Calendar Alert
- **Goal**: Increase psychological buy-in and zero-friction attendance.
- **Copy**:
  > *"Hey {{firstName}}, tomorrow at 7:00 PM IST you will build and deploy a working AI app.*
  > *No heavy local installations needed—we will run everything on cloud GPUs (Google Colab / FastAPI).*
  > *Save the workshop event to your calendar: [Add to Google Calendar Link]"*

### Touchpoint 3: The 15-Minute Countdown (T-15m)
- **Channel**: Priority WhatsApp Alert
- **Goal**: Convert registered students to live attendees (target: 65%+ live attendance rate).
- **Copy**:
  > *"🔴 LIVE IN 15 MINUTES! Rahul & the engineering team are joining.*
  > *Join the private stream here: {{streamMagicLink}}.*
  > *(Keep your laptop ready to code along!)*"*

---

## How to Import the n8n Workflow
1. Install or launch n8n (`npx n8n` or cloud instance).
2. Go to **Workflows** -> **Import from File**.
3. Select `workflows/n8n_growth_workflow.json`.
4. Configure your Webhook URL in `backend/.env` or connect directly to the Express `/api/register` webhook.
5. Provide your WhatsApp Cloud API / Twilio credentials in the n8n credential manager.
