import { useState, useEffect } from 'react';

export function useReferral() {
  const [referralCode, setReferralCode] = useState<string | null>(null);

  useEffect(() => {
    // Check URL parameters
    const params = new URLSearchParams(window.location.search);
    const ref = params.get('ref') || params.get('referral');

    if (ref) {
      const cleanRef = ref.trim().toUpperCase();
      setReferralCode(cleanRef);
      sessionStorage.setItem('nxtwave_ref_code', cleanRef);
    } else {
      const stored = sessionStorage.getItem('nxtwave_ref_code');
      if (stored) {
        setReferralCode(stored);
      }
    }
  }, []);

  const getShareUrl = (code: string) => {
    const origin = window.location.origin;
    return `${origin}/?ref=${code}`;
  };

  const getWhatsAppShareUrl = (code: string, customText?: string) => {
    const shareLink = getShareUrl(code);
    const text = customText ||
      `Hey! I just registered for NxtWave's free hands-on workshop: "Build Your First AI Project in 60 Minutes" 🚀\n\nYou actually build & deploy a live AI project for placement season instead of just watching theory. Plus you get free GitHub templates & resume review!\n\nClaim your seat here: ${shareLink}`;
    return `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`;
  };

  return {
    referralCode,
    getShareUrl,
    getWhatsAppShareUrl
  };
}
