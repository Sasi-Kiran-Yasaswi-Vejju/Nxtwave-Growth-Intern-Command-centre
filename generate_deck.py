import os
import pptx
from pptx.util import Inches, Pt
from pptx.dml.color import RGBColor
from pptx.enum.text import PP_ALIGN
from pptx.enum.shapes import MSO_SHAPE

os.makedirs('presentation', exist_ok=True)

prs = pptx.Presentation()
prs.slide_width = Inches(13.333)
prs.slide_height = Inches(7.5)
blank_layout = prs.slide_layouts[6]

DARK_BG = RGBColor(11, 15, 25)
CARD_BG = RGBColor(19, 25, 39)
CARD_BORDER = RGBColor(31, 41, 61)
TEXT_WHITE = RGBColor(255, 255, 255)
TEXT_MUTED = RGBColor(148, 163, 184)
INDIGO = RGBColor(99, 102, 241)
CYAN = RGBColor(6, 182, 212)
EMERALD = RGBColor(16, 185, 129)
AMBER = RGBColor(245, 158, 11)

def set_slide_background(slide):
    bg_shape = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, 0, 0, Inches(13.333), Inches(7.5))
    bg_shape.fill.solid()
    bg_shape.fill.fore_color.rgb = DARK_BG
    bg_shape.line.fill.background()
    return bg_shape

def add_header(slide, tag, title, subtitle):
    # Tag Pill
    tag_box = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.8), Inches(0.45), Inches(3.2), Inches(0.35))
    tag_box.fill.solid()
    tag_box.fill.fore_color.rgb = RGBColor(30, 41, 59)
    tag_box.line.color.rgb = INDIGO
    tag_tf = tag_box.text_frame
    tag_tf.text = tag.upper()
    tag_p = tag_tf.paragraphs[0]
    tag_p.font.size = Pt(10)
    tag_p.font.bold = True
    tag_p.font.color.rgb = CYAN
    tag_p.alignment = PP_ALIGN.CENTER
    
    # Title
    t_box = slide.shapes.add_textbox(Inches(0.8), Inches(0.85), Inches(11.7), Inches(0.65))
    t_tf = t_box.text_frame
    t_tf.word_wrap = True
    t_p = t_tf.paragraphs[0]
    t_p.text = title
    t_p.font.size = Pt(21)
    t_p.font.bold = True
    t_p.font.color.rgb = TEXT_WHITE
    
    # Subtitle
    s_box = slide.shapes.add_textbox(Inches(0.8), Inches(1.48), Inches(11.7), Inches(0.4))
    s_tf = s_box.text_frame
    s_tf.word_wrap = True
    s_p = s_tf.paragraphs[0]
    s_p.text = subtitle
    s_p.font.size = Pt(12)
    s_p.font.color.rgb = TEXT_MUTED

# ==========================================
# SLIDE 1: STUDENT INSIGHT & VALUE PIVOT
# ==========================================
s1 = prs.slides.add_slide(blank_layout)
set_slide_background(s1)
add_header(s1, 'Slide 1 | Student Insight & Value Proposition', 
           'Beyond Generic Tutorials: Solving the Placement Resume Crisis',
           'Target: 500 Final-Year Engineers (Batch 2025/2026) | 7-Day Sprint | Budget: ₹2,000')

cards_s1 = [
    ('1. Who We Target (The ICP)', 
     '• Final-year engineering students across CSE, IT, ECE, EEE, Mechanical & Civil.\n• Currently preparing for on-campus & off-campus placement drives.\n• Know syntax & Python basics, but lack credible, differentiated GenAI projects.\n• High friction: Confused by complex local setups, GPU drivers & paid API keys.',
     CYAN),
    ('2. The Core Problem (The Reality)',
     '• The Resume Duplication Crisis: 90%+ of engineering resumes feature identical tutorial projects (Iris flower classification, Titanic predictor, Todo app).\n• Tech recruiters spend <15 seconds per resume; generic projects are instantly skipped.\n• Students are fatigued by theoretical webinars with zero portfolio output.',
     AMBER),
    ('3. The Value Pivot (The Winning Hook)',
     '• REJECTED GENERIC HOOK: "Learn AI in 60 Minutes" (Low intent, sounds like another boring college lecture).\n• WINNING VALUE PROPOSITION:\n  "Stop Putting \'Basic Python\' on Your Resume. Build a Real AI Project in 60 Minutes with a Deployed Cloud Link, GitHub Commits & Interview Talking Points."',
     EMERALD)
]

for idx, (title, content, border_col) in enumerate(cards_s1):
    left = Inches(0.8 + idx * 3.95)
    card = s1.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, left, Inches(2.05), Inches(3.8), Inches(4.8))
    card.fill.solid()
    card.fill.fore_color.rgb = CARD_BG
    card.line.color.rgb = border_col
    card.line.width = Pt(1.5)
    
    tf = card.text_frame
    tf.word_wrap = True
    p0 = tf.paragraphs[0]
    p0.text = title
    p0.font.size = Pt(13)
    p0.font.bold = True
    p0.font.color.rgb = border_col
    
    p1 = tf.add_paragraph()
    p1.text = content
    p1.font.size = Pt(10.5)
    p1.font.color.rgb = TEXT_WHITE

# ==========================================
# SLIDE 2: 5-CHANNEL DISTRIBUTION ENGINE
# ==========================================
s2 = prs.slides.add_slide(blank_layout)
set_slide_background(s2)
add_header(s2, 'Slide 2 | Acquisition Strategy & Budget Allocation', 
           'Capital-Efficient 5-Channel Distribution Engine',
           'Total Budget: ₹2,000 | Strategy: Organic Campus Leverage + Viral Referral Multiplier')

rows, cols = 6, 7
left, top, width, height = Inches(0.8), Inches(2.05), Inches(11.7), Inches(3.2)
table_shape = s2.shapes.add_table(rows, cols, left, top, width, height)
table = table_shape.table

table.columns[0].width = Inches(3.0)
table.columns[1].width = Inches(1.3)
table.columns[2].width = Inches(1.2)
table.columns[3].width = Inches(1.5)
table.columns[4].width = Inches(1.4)
table.columns[5].width = Inches(1.4)
table.columns[6].width = Inches(1.9)

headers = ['Channel Name', 'Plan Regs', '% Share', 'Budget Alloc', 'Actual Spend', 'Channel CAC', 'Primary Mechanism']
for c_idx, h in enumerate(headers):
    cell = table.cell(0, c_idx)
    cell.fill.solid()
    cell.fill.fore_color.rgb = RGBColor(30, 41, 59)
    p = cell.text_frame.paragraphs[0]
    p.text = h
    p.font.size = Pt(10)
    p.font.bold = True
    p.font.color.rgb = CYAN

data_s2 = [
    ['1. College WhatsApp Communities', '200', '40.0%', '₹0', '₹0', '₹0.00', '35 curated college batch broadcasts'],
    ['2. Student Referral Engine', '150', '30.0%', '₹300', '₹210', '₹2.02', 'Milestone rewards (K = 0.46)'],
    ['3. Campus Tech Clubs & Leads', '75', '15.0%', '₹300', '₹150', '₹3.26', 'GDSC & CSI leads partnership'],
    ['4. Organic LinkedIn Content', '50', '10.0%', '₹200', '₹90', '₹3.60', 'Before/After resume teardowns'],
    ['5. Targeted Micro-Paid (Meta)', '25', '5.0%', '₹1,200', '₹400', '₹28.57', 'Controlled Instagram story ads']
]

for r_idx, row in enumerate(data_s2):
    for c_idx, val in enumerate(row):
        cell = table.cell(r_idx + 1, c_idx)
        cell.fill.solid()
        cell.fill.fore_color.rgb = CARD_BG
        p = cell.text_frame.paragraphs[0]
        p.text = val
        p.font.size = Pt(10)
        p.font.color.rgb = TEXT_WHITE if c_idx != 5 else EMERALD

callout = s2.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.8), Inches(5.45), Inches(11.7), Inches(1.4))
callout.fill.solid()
callout.fill.fore_color.rgb = CARD_BG
callout.line.color.rgb = EMERALD
c_tf = callout.text_frame
c_tf.word_wrap = True
cp0 = c_tf.paragraphs[0]
cp0.text = 'WHY WE REJECTED HEAVY PAID ADS:'
cp0.font.size = Pt(12)
cp0.font.bold = True
cp0.font.color.rgb = EMERALD

cp1 = c_tf.add_paragraph()
cp1.text = '• Cold digital ads for student workshops cost ₹80–₹120 per registration. Spending ₹2,000 on ads would yield barely 16 to 25 registrations (failing the target by 95%).\n• Blended Unit Economics: Total Day 5 Spend = ₹850 | Registrations = 327 | Blended CAC = ₹2.60 per student (₹1,150 dry powder preserved for Day 6–7 urgency push).'
cp1.font.size = Pt(10)
cp1.font.color.rgb = TEXT_WHITE

# ==========================================
# SLIDE 3: 500 REGISTRATION FUNNEL MATHEMATICS
# ==========================================
s3 = prs.slides.add_slide(blank_layout)
set_slide_background(s3)
add_header(s3, 'Slide 3 | Funnel Model & Mathematical Trajectory', 
           'The Mathematical Path to 500 Qualified Registrations',
           'High-Intent Conversion Model: 1,840 Visitors → 327 (Day 5) → 500 Projected Goal')

funnel_stages = [
    ('1. Landing Visitors', '1,840', '100% Top-of-Funnel', 'Traffic across WhatsApp, clubs & ads', INDIGO),
    ('2. AI Generator Uses', '1,196', '65.0% Engagement', 'Customized project blueprint generated', CYAN),
    ('3. Form Starts', '588', '49.2% Step-Conv', 'Drop-off reduced via 1-click pre-fill', AMBER),
    ('4. Confirmed Regs', '327 (D5)', '55.6% Form-Conv', '24.8% Blended Visitor-to-Reg Rate', EMERALD),
    ('5. Shared Referral Pass', '186', '56.9% Viral Share', 'Generated 104 direct referral regs (K = 0.46)', INDIGO)
]

for idx, (title, count, pct, desc, col) in enumerate(funnel_stages):
    top_pos = Inches(2.05 + idx * 0.98)
    box = s3.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.8), top_pos, Inches(6.8), Inches(0.85))
    box.fill.solid()
    box.fill.fore_color.rgb = CARD_BG
    box.line.color.rgb = col
    
    tf = box.text_frame
    tf.word_wrap = True
    p0 = tf.paragraphs[0]
    p0.text = f"{title}   |   {count}   ({pct})"
    p0.font.size = Pt(12)
    p0.font.bold = True
    p0.font.color.rgb = col
    
    p1 = tf.add_paragraph()
    p1.text = desc
    p1.font.size = Pt(9.5)
    p1.font.color.rgb = TEXT_MUTED

v_box = s3.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(7.9), Inches(2.05), Inches(4.6), Inches(4.75))
v_box.fill.solid()
v_box.fill.fore_color.rgb = CARD_BG
v_box.line.color.rgb = CYAN
v_tf = v_box.text_frame
v_tf.word_wrap = True

vp0 = v_tf.paragraphs[0]
vp0.text = 'THE VIRAL K-FACTOR FORMULA'
vp0.font.size = Pt(13)
vp0.font.bold = True
vp0.font.color.rgb = CYAN

vp1 = v_tf.add_paragraph()
vp1.text = '\nTotal Registrations = Direct Inflow × (1 + K)\n\n• Out of 327 registered students, 186 shared their unique referral link.\n• Produced 104 verified peer registrations.\n• Viral Coefficient K = 104 / 327 = 0.318 (Peak run-rate post-Exp 2: K = 0.46).\n• 31.8% of all registrations came via peer referrals at ₹2.02 CAC.\n\nPACING & RUNWAY TRAJECTORY:\n• Current Run-rate: 99 registrations/day.\n• Required run-rate for Days 6–7: 87/day.\n• The viral referral tail naturally propels the count past the 500 milestone.'
vp1.font.size = Pt(10)
vp1.font.color.rgb = TEXT_WHITE

# ==========================================
# SLIDE 4: THE WORKING GROWTH ASSET
# ==========================================
s4 = prs.slides.add_slide(blank_layout)
set_slide_background(s4)
add_header(s4, 'Slide 4 | Working Growth Asset Architecture', 
           '"AI Workshop Growth Engine" — Full-Stack Product Suite',
           '"Everyone might build a landing page. We built an interactive conversion engine."')

assets = [
    ('1. Interactive AI Project Idea Generator',
     '• Input: Branch (CSE/ECE/Mech/Civil), Domain (FinTech, Healthcare), Tech Stack.\n• Output: Concrete architecture, 60-min build roadmap & ATS resume bullet point.\n• Hook: Proves value upfront and pre-fills registration details with 1 click.',
     CYAN),
    ('2. Frictionless Registration & Auto-Attribution',
     '• 30-Second lightweight form with instant field validation & duplicate check.\n• Auto-captures referral codes directly from query parameters (?ref=CODE).\n• Stores student data securely with zero unnecessary personal information.',
     EMERALD),
    ('3. Viral Referral Engine & Milestone Meter',
     '• Generates unique referral passes (e.g. YASASWI42) + 1-Click WhatsApp deep link.\n• 3 Educational Tiers: 1 friend = Resume Bank, 3 friends = GitHub Starter Kit, 5 friends = 1-on-1 AI Resume Review with NxtWave Tech Leads.',
     AMBER),
    ('4. Growth Command Center & Campus Leaderboard',
     '• Real-time 5-stage funnel drop-off telemetry & 7-day pacing curves.\n• Live A/B experiment decision logs, channel CAC table & CSV data export.\n• Public campus leaderboard showcasing top student referrers by college.',
     INDIGO)
]

for idx, (title, content, col) in enumerate(assets):
    row = idx // 2
    col_idx = idx % 2
    left = Inches(0.8 + col_idx * 5.95)
    top_pos = Inches(2.05 + row * 2.45)
    
    card = s4.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, left, top_pos, Inches(5.75), Inches(2.3))
    card.fill.solid()
    card.fill.fore_color.rgb = CARD_BG
    card.line.color.rgb = col
    
    tf = card.text_frame
    tf.word_wrap = True
    p0 = tf.paragraphs[0]
    p0.text = title
    p0.font.size = Pt(13)
    p0.font.bold = True
    p0.font.color.rgb = col
    
    p1 = tf.add_paragraph()
    p1.text = content
    p1.font.size = Pt(10)
    p1.font.color.rgb = TEXT_WHITE

# ==========================================
# SLIDE 5: EXPERIMENTS & AI JUDGMENT
# ==========================================
s5 = prs.slides.add_slide(blank_layout)
set_slide_background(s5)
add_header(s5, 'Slide 5 | Learnings, Iteration & Deliberate AI Rejections', 
           'Controlled A/B Experiments & Human Growth Judgment',
           'Operating on NxtWave Philosophy: IDEA → BUILD → LAUNCH → MEASURE → LEARN → SCALE')

# Left Side: A/B Experiments
exp_box = s5.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.8), Inches(2.05), Inches(5.75), Inches(4.75))
exp_box.fill.solid()
exp_box.fill.fore_color.rgb = CARD_BG
exp_box.line.color.rgb = INDIGO
e_tf = exp_box.text_frame
e_tf.word_wrap = True

ep0 = e_tf.paragraphs[0]
ep0.text = '3 PRIORITIZED GROWTH EXPERIMENTS'
ep0.font.size = Pt(13)
ep0.font.bold = True
ep0.font.color.rgb = INDIGO

ep1 = e_tf.add_paragraph()
ep1.text = '\nEXP-01: Headline Value Proposition Test\n• Variant A: "Learn AI in 60 Minutes" (14.8%)\n• Variant B: "Build an AI Project You Can Defend in Placement Interviews" (23.4%)\n• Decision: Winner B (+58% relative lift). Rolled out sitewide.\n\nEXP-02: Referral Milestone Hurdle Test\n• Variant A: Unlock GitHub Kit at 5 Referrals\n• Variant B: Unlock GitHub Kit at 3 Referrals\n• Decision: Winner B. Lower threshold produced 2.25x higher sharing participation (K = 0.46).\n\nEXP-03: Upfront AI Generator Hook vs Direct Form\n• Variant A: Direct registration form (16.2%)\n• Variant B: Interactive AI Generator + Pre-fill (26.8%)\n• Decision: Winner B (+65.4% lift). Value-first builds trust.'
ep1.font.size = Pt(9.5)
ep1.font.color.rgb = TEXT_WHITE

# Right Side: AI Suggestions Rejected
rej_box = s5.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(6.75), Inches(2.05), Inches(5.75), Inches(4.75))
rej_box.fill.solid()
rej_box.fill.fore_color.rgb = CARD_BG
rej_box.line.color.rgb = AMBER
r_tf = rej_box.text_frame
r_tf.word_wrap = True

rp0 = r_tf.paragraphs[0]
rp0.text = 'WHAT AI SUGGESTED THAT WE DELIBERATELY REJECTED'
rp0.font.size = Pt(13)
rp0.font.bold = True
rp0.font.color.rgb = AMBER

rp1 = r_tf.add_paragraph()
rp1.text = '\n1. REJECTED: Spending 70%+ of budget on Google/Meta Search Ads\n• Why: Cold PPC in India costs ₹15–₹30/click. At 10% conversion, CAC would exceed ₹100, burning our entire ₹2,000 budget for <20 registrations. We prioritized zero-CAC college WhatsApp groups instead.\n\n2. REJECTED: Giving ₹50 cash / UPI bounties for referrals\n• Why: Cash incentives attract fake bot emails and violate the ₹2,000 budget. Final-year students want placement advantages. Replaced with high-value, zero-marginal-cost educational assets (GitHub kits, resume reviews).\n\nIF WE HAD ANOTHER 24 HOURS:\n• Live Meta WhatsApp Cloud API webhooks for instant delivery.\n• Browser fingerprinting to prevent referral self-gaming.\n• Exit-intent modal offering 1-click project blueprint PDF download.'
rp1.font.size = Pt(9.5)
rp1.font.color.rgb = TEXT_WHITE

# Save presentation
prs.save('presentation/NxtWave_Growth_Challenge_5_Slide_Deck.pptx')
prs.save('NxtWave_Growth_Challenge_5_Slide_Deck.pptx')
print('PowerPoint Presentation created successfully!')
