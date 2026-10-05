import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar.tsx';
import { Hero } from './components/Hero.tsx';
import { WorkshopInfo } from './components/WorkshopInfo.tsx';
import { ProjectGenerator } from './components/ProjectGenerator.tsx';
import { RegistrationForm } from './components/RegistrationForm.tsx';
import { ReferralModal } from './components/ReferralModal.tsx';
import { Leaderboard } from './components/Leaderboard.tsx';
import { GrowthDashboard } from './components/GrowthDashboard.tsx';
import { AutomationModal } from './components/AutomationModal.tsx';
import { Footer } from './components/Footer.tsx';
import { useReferral } from './hooks/useReferral.ts';
import { Registration } from './types/index.ts';
import { api } from './services/api.ts';

export function App() {
  const { referralCode } = useReferral();
  const [selectedBranch, setSelectedBranch] = useState<string>('Computer Science & Engineering');
  const [selectedProjectTitle, setSelectedProjectTitle] = useState<string>('');
  const [registrationCount, setRegistrationCount] = useState<number>(327);
  const [registeredUser, setRegisteredUser] = useState<Registration | null>(null);
  const [referralUrl, setReferralUrl] = useState<string>('');
  const [showDashboard, setShowDashboard] = useState<boolean>(false);
  const [showAutomation, setShowAutomation] = useState<boolean>(false);
  const [showReferralModal, setShowReferralModal] = useState<boolean>(false);

  useEffect(() => {
    // Fetch initial count from overview
    const fetchOverview = async () => {
      try {
        const ov = await api.getOverview();
        if (ov && ov.totalRegistrations) {
          setRegistrationCount(ov.totalRegistrations);
        }
      } catch (err) {
        console.warn('Using baseline registration count');
      }
    };
    fetchOverview();
  }, []);

  const handleSelectProject = (title: string, branch: string) => {
    setSelectedProjectTitle(title);
    setSelectedBranch(branch);
    const element = document.getElementById('register-section');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleRegistrationSuccess = (reg: Registration, url: string) => {
    setRegisteredUser(reg);
    setReferralUrl(url);
    setRegistrationCount((prev) => prev + 1);
    setShowReferralModal(true);
  };

  const scrollToGenerator = () => {
    const el = document.getElementById('generator-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToRegister = () => {
    const el = document.getElementById('register-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToLeaderboard = () => {
    const el = document.getElementById('leaderboard-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#0B0F19] text-slate-100 flex flex-col selection:bg-indigo-600 selection:text-white">
      {/* Top Sticky Navbar */}
      <Navbar
        onOpenDashboard={() => setShowDashboard(true)}
        onOpenAutomation={() => setShowAutomation(true)}
        registrationCount={registrationCount}
      />

      {/* Main Campaign Landing Flow */}
      <main className="flex-grow">
        {/* Hero Section */}
        <Hero
          onScrollToGenerator={scrollToGenerator}
          onScrollToRegister={scrollToRegister}
          registrationCount={registrationCount}
        />

        {/* 60-Minute Workshop Breakdown & Placement Reality */}
        <WorkshopInfo />

        {/* Interactive AI Project Generator */}
        <ProjectGenerator onSelectProject={handleSelectProject} />

        {/* Registration Form */}
        <RegistrationForm
          initialBranch={selectedBranch}
          initialProjectTitle={selectedProjectTitle}
          referralCodeFromUrl={referralCode}
          onSuccess={handleRegistrationSuccess}
        />

        {/* Campus Leaderboard */}
        <Leaderboard />
      </main>

      {/* Footer */}
      <Footer />

      {/* Post-Registration Referral Modal */}
      {showReferralModal && registeredUser && (
        <ReferralModal
          registration={registeredUser}
          referralUrl={referralUrl}
          onClose={() => setShowReferralModal(false)}
          onViewLeaderboard={scrollToLeaderboard}
        />
      )}

      {/* Growth Analytics Dashboard Modal */}
      {showDashboard && (
        <GrowthDashboard onClose={() => setShowDashboard(false)} />
      )}

      {/* Automation Architecture Modal */}
      {showAutomation && (
        <AutomationModal onClose={() => setShowAutomation(false)} />
      )}
    </div>
  );
}

export default App;
