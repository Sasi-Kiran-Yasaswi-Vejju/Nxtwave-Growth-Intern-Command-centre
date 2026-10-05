-- ========================================================
-- NxtWave AI Workshop Growth Engine - Database Schema
-- Target: PostgreSQL / Supabase
-- Campaign: "Build Your First AI Project in 60 Minutes"
-- ========================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Table: Registrations
-- Stores workshop student sign-ups, attribution sources, and referral codes
CREATE TABLE IF NOT EXISTS registrations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    registration_code VARCHAR(20) UNIQUE NOT NULL,
    name VARCHAR(150) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    whatsapp VARCHAR(20),
    college VARCHAR(255) NOT NULL,
    branch VARCHAR(100) NOT NULL,
    graduation_year INTEGER NOT NULL DEFAULT 2027,
    source VARCHAR(100) NOT NULL DEFAULT 'Organic',
    referral_code VARCHAR(50) UNIQUE NOT NULL,
    referred_by VARCHAR(50) REFERENCES registrations(referral_code) ON DELETE SET NULL,
    referral_count INTEGER NOT NULL DEFAULT 0,
    is_simulated BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for lightning fast lookups
CREATE INDEX IF NOT EXISTS idx_registrations_email ON registrations(email);
CREATE INDEX IF NOT EXISTS idx_registrations_referral_code ON registrations(referral_code);
CREATE INDEX IF NOT EXISTS idx_registrations_referred_by ON registrations(referred_by);
CREATE INDEX IF NOT EXISTS idx_registrations_source ON registrations(source);

-- 2. Table: Referrals
-- Tracks 1-to-1 referral attribution events
CREATE TABLE IF NOT EXISTS referrals (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    referrer_id UUID NOT NULL REFERENCES registrations(id) ON DELETE CASCADE,
    referred_user_id UUID NOT NULL REFERENCES registrations(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT unique_referral_pair UNIQUE (referrer_id, referred_user_id)
);

CREATE INDEX IF NOT EXISTS idx_referrals_referrer_id ON referrals(referrer_id);

-- 3. Table: Funnel Events
-- Granular event telemetry for drop-off analysis (IDEA -> BUILD -> LAUNCH -> MEASURE)
CREATE TABLE IF NOT EXISTS events (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    event_type VARCHAR(100) NOT NULL, -- 'page_view', 'generator_run', 'form_start', 'registration_success', 'share_click'
    user_id UUID REFERENCES registrations(id) ON DELETE SET NULL,
    metadata JSONB DEFAULT '{}'::jsonb,
    ip_hash VARCHAR(64),
    user_agent TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_events_event_type ON events(event_type);
CREATE INDEX IF NOT EXISTS idx_events_created_at ON events(created_at);

-- 4. Table: Campaign Channels
-- Tracks planned vs actual registrations, budget allocation, and unit economics (CAC)
CREATE TABLE IF NOT EXISTS campaign_channels (
    id VARCHAR(50) PRIMARY KEY,
    channel_name VARCHAR(150) NOT NULL,
    planned_registrations INTEGER NOT NULL,
    actual_registrations INTEGER NOT NULL DEFAULT 0,
    allocated_spend NUMERIC(10, 2) NOT NULL DEFAULT 0.00,
    actual_spend NUMERIC(10, 2) NOT NULL DEFAULT 0.00,
    status VARCHAR(50) NOT NULL DEFAULT 'active',
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 5. Table: Growth Experiments
-- Structured A/B test definitions, hypotheses, and decision outcomes
CREATE TABLE IF NOT EXISTS experiments (
    id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    hypothesis TEXT NOT NULL,
    variant_a TEXT NOT NULL,
    variant_b TEXT NOT NULL,
    metric VARCHAR(100) NOT NULL,
    variant_a_conversion NUMERIC(5, 2) DEFAULT 0.00,
    variant_b_conversion NUMERIC(5, 2) DEFAULT 0.00,
    sample_size INTEGER DEFAULT 0,
    status VARCHAR(50) DEFAULT 'Running',
    winner VARCHAR(20),
    decision TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Trigger to increment referrer count automatically on registration
CREATE OR REPLACE FUNCTION increment_referrer_count()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.referred_by IS NOT NULL THEN
        UPDATE registrations
        SET referral_count = referral_count + 1,
            updated_at = CURRENT_TIMESTAMP
        WHERE referral_code = NEW.referred_by;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE TRIGGER trg_increment_referral
AFTER INSERT ON registrations
FOR EACH ROW
EXECUTE FUNCTION increment_referrer_count();
