-- ========================================================
-- NxtWave AI Workshop Growth Engine - Database Seed
-- Realistic Baseline Simulation Data (Target: 500, Seed: 327)
-- ========================================================

-- Clear existing data
TRUNCATE TABLE campaign_channels CASCADE;
TRUNCATE TABLE experiments CASCADE;
TRUNCATE TABLE registrations CASCADE;

-- 1. Seed Campaign Channels (500 Goal Allocation & ₹2,000 Budget)
INSERT INTO campaign_channels (id, channel_name, planned_registrations, actual_registrations, allocated_spend, actual_spend, status)
VALUES
('whatsapp_communities', 'College WhatsApp Communities', 200, 138, 0.00, 0.00, 'on_track'),
('referral_engine', 'Student Referral Engine', 150, 104, 300.00, 210.00, 'ahead'),
('student_clubs', 'Campus Tech Clubs & Leads', 75, 46, 300.00, 150.00, 'on_track'),
('social_content', 'Organic Social / LinkedIn Tech Posts', 50, 25, 200.00, 90.00, 'needs_attention'),
('paid_experiment', 'Targeted Micro-Paid Experiment (Meta/IG)', 25, 14, 1200.00, 400.00, 'on_track');

-- 2. Seed Growth Experiments
INSERT INTO experiments (id, name, hypothesis, variant_a, variant_b, metric, variant_a_conversion, variant_b_conversion, sample_size, status, winner, decision)
VALUES
('EXP-01', 'Value Proposition Headline Test',
 'Focusing on placement interview proof will increase landing-to-registration conversion over a generic learning promise.',
 'Learn AI in 60 Minutes',
 'Build an AI Project You Can Defend in Placement Interviews',
 'Landing Page -> Registration %', 14.80, 23.40, 850, 'Concluded', 'B',
 'Rolled out Variant B sitewide. Resulted in +58% relative lift in conversions.'),

('EXP-02', 'Referral Incentive Milestone Threshold',
 'A lower 3-referral threshold for the GitHub Starter Kit will generate higher aggregate referrals than a 5-referral hurdle.',
 'Threshold: 5 Referrals for VIP Repo',
 'Threshold: 3 Referrals for VIP Repo',
 'Avg Referrals per Active Student', 1.20, 2.70, 220, 'Concluded', 'B',
 'Variant B produced 2.25x viral participation. Adopted 3-friend milestone as core hook.'),

('EXP-03', 'Interactive AI Generator vs Direct Form CTA',
 'Letting students personalize their AI project before registering creates psychological ownership and lifts signups.',
 'Standard Landing Page with Direct Registration Form',
 'Interactive AI Project Generator prior to Registration',
 'Visitor -> Registration Completion %', 16.20, 26.80, 640, 'Concluded', 'B',
 'Variant B increased completion by +65.4%. Generator positioned as the core hero hook.'),

('EXP-04', 'WhatsApp Community Broadcast Copy Length',
 'A concise bulleted WhatsApp broadcast with bold interview outcomes will outperform long explanatory paragraphs.',
 'Long detailed curriculum message (250 words)',
 'Scannable 4-bullet point hook + direct referral link (70 words)',
 'Click-Through to Registration %', 8.50, 19.10, 1200, 'Concluded', 'B',
 'Short bulleted format drove 2.2x CTR. Standardized across all college WhatsApp distribution.');

-- 3. Seed Top Registrations & Campus Referrers
INSERT INTO registrations (registration_code, name, email, whatsapp, college, branch, graduation_year, source, referral_code, referral_count, is_simulated)
VALUES
('REG-1001', 'Yasaswi Sharma', 'yasaswi.s@student.jntuh.ac.in', '+919848012345', 'JNTU Hyderabad', 'Computer Science and Engineering', 2027, 'Campus Tech Clubs & Leads', 'YASASWI42', 27, TRUE),
('REG-1002', 'Rahul K. Varma', 'rahul.varma@osmania.ac.in', '+919440156789', 'Osmania University', 'Electronics and Communication', 2027, 'College WhatsApp Communities', 'RAHUL99', 21, TRUE),
('REG-1003', 'Sneha Patel', 'sneha.patel@cbit.org.in', '+919989034567', 'CBIT Hyderabad', 'Information Technology', 2027, 'College WhatsApp Communities', 'SNEHA18', 18, TRUE),
('REG-1004', 'Aditya Nair', 'aditya.nair@vnrvjiet.in', '+919701245678', 'VNR VJIET', 'Computer Science and Engineering', 2027, 'Student Referral Engine', 'ADITYA15', 15, TRUE),
('REG-1005', 'Pooja Reddy', 'pooja.r@srmist.edu.in', '+919618089012', 'SRM Institute of Tech', 'Data Science & AI', 2027, 'Student Referral Engine', 'POOJA13', 13, TRUE),
('REG-1006', 'Karthik S.', 'karthik.s@vit.ac.in', '+919876543210', 'Vellore Institute of Technology', 'Computer Science and Engineering', 2027, 'Campus Tech Clubs & Leads', 'KARTHIK10', 10, TRUE),
('REG-1007', 'Divya Iyer', 'divya.iyer@psgtech.ac.in', '+919845098765', 'PSG College of Technology', 'Electronics and Communication', 2027, 'College WhatsApp Communities', 'DIVYA08', 8, TRUE),
('REG-1008', 'Manish Gupta', 'manish.gupta@bmsce.ac.in', '+919123456780', 'BMS College of Engineering', 'Information Science', 2027, 'Organic Social / LinkedIn Tech Posts', 'MANISH06', 6, TRUE);
