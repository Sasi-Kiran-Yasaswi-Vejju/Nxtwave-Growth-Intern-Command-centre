import React, { useState } from 'react';
import { UserCheck, Sparkles, Send, ShieldCheck, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { api } from '../services/api.ts';
import { Registration } from '../types/index.ts';

interface RegistrationFormProps {
  initialBranch?: string;
  initialProjectTitle?: string;
  referralCodeFromUrl?: string | null;
  onSuccess: (reg: Registration, referralUrl: string) => void;
}

export const RegistrationForm: React.FC<RegistrationFormProps> = ({
  initialBranch,
  initialProjectTitle,
  referralCodeFromUrl,
  onSuccess
}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    whatsapp: '',
    college: '',
    branch: initialBranch || 'Computer Science & Engineering',
    graduationYear: 2027,
    referredBy: referralCodeFromUrl || ''
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Sync if branch changes from outside generator selection
  React.useEffect(() => {
    if (initialBranch) {
      setFormData((prev) => ({ ...prev, branch: initialBranch }));
    }
  }, [initialBranch]);

  React.useEffect(() => {
    if (referralCodeFromUrl) {
      setFormData((prev) => ({ ...prev, referredBy: referralCodeFromUrl }));
    }
  }, [referralCodeFromUrl]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!formData.name.trim() || !formData.email.trim() || !formData.college.trim()) {
      setError('Please fill in your name, email, and college name.');
      return;
    }

    setLoading(true);
    try {
      const res = await api.register({
        name: formData.name,
        email: formData.email,
        whatsapp: formData.whatsapp,
        college: formData.college,
        branch: formData.branch,
        graduationYear: formData.graduationYear,
        source: formData.referredBy ? 'Student Referral Engine' : 'College WhatsApp Communities',
        referredBy: formData.referredBy || undefined
      });

      if (res.success && res.data) {
        onSuccess(res.data, res.referralUrl);
      } else {
        setError(res.message || 'Registration failed. Please try again.');
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Error submitting registration.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id="register-section" className="py-16 sm:py-24 border-b border-slate-800/60 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center space-x-2 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider mb-3">
            <UserCheck className="w-3.5 h-3.5" />
            <span>Reserved Seat Registration</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Claim Your Free Workshop Seat
          </h2>
          <p className="mt-2 text-slate-400 text-xs sm:text-sm">
            Only 500 seats available across all campus batches to ensure live mentor support in breakout rooms.
          </p>

          {initialProjectTitle && (
            <div className="mt-4 p-3 bg-indigo-950/40 border border-indigo-500/30 rounded-xl text-xs text-indigo-200">
              Selected Track: <strong className="text-white">{initialProjectTitle}</strong>
            </div>
          )}
        </div>

        {/* Card Form */}
        <div className="glass-card rounded-2xl p-6 sm:p-10 border border-slate-800 shadow-2xl relative">
          {error && (
            <div className="mb-6 p-4 rounded-xl bg-rose-950/40 border border-rose-500/40 text-rose-300 text-xs flex items-center space-x-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {/* Full Name */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Full Name <span className="text-indigo-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Rahul Sharma"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-slate-900/90 border border-slate-700/80 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                />
              </div>

              {/* Email Address */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Email Address <span className="text-indigo-400">*</span>
                </label>
                <input
                  type="email"
                  required
                  placeholder="e.g. rahul@college.ac.in"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-slate-900/90 border border-slate-700/80 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {/* WhatsApp Number */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  WhatsApp Number <span className="text-slate-500 font-normal">(For Zoom link & reminders)</span>
                </label>
                <input
                  type="tel"
                  placeholder="+91 98765 43210"
                  value={formData.whatsapp}
                  onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                  className="w-full bg-slate-900/90 border border-slate-700/80 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                />
              </div>

              {/* College / University */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  College / University <span className="text-indigo-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. JNTU Hyderabad / Osmania / SRM"
                  value={formData.college}
                  onChange={(e) => setFormData({ ...formData, college: e.target.value })}
                  className="w-full bg-slate-900/90 border border-slate-700/80 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              {/* Branch */}
              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Engineering Branch <span className="text-indigo-400">*</span>
                </label>
                <select
                  value={formData.branch}
                  onChange={(e) => setFormData({ ...formData, branch: e.target.value })}
                  className="w-full bg-slate-900/90 border border-slate-700/80 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-slate-200 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                >
                  <option value="Computer Science & Engineering">Computer Science & Engineering</option>
                  <option value="Information Technology">Information Technology</option>
                  <option value="Electronics & Communication (ECE)">Electronics & Communication (ECE)</option>
                  <option value="Electrical & Electronics (EEE)">Electrical & Electronics (EEE)</option>
                  <option value="Mechanical Engineering">Mechanical Engineering</option>
                  <option value="Civil Engineering">Civil Engineering</option>
                  <option value="Data Science & AI">Data Science & AI</option>
                  <option value="Other Engineering Branch">Other Engineering Branch</option>
                </select>
              </div>

              {/* Graduation Year */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Passing Out Year
                </label>
                <select
                  value={formData.graduationYear}
                  onChange={(e) => setFormData({ ...formData, graduationYear: Number(e.target.value) })}
                  className="w-full bg-slate-900/90 border border-slate-700/80 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-slate-200 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                >
                  <option value={2027}>2027 (Passing Out / Final Year)</option>
                  <option value={2028}>2028 (Pre-Final Year)</option>
                  <option value={2026}>2026 (Recent Grad)</option>
                </select>
              </div>
            </div>

            {/* Referral Attribution */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center justify-between">
                <span>Friend's Referral Code</span>
                {formData.referredBy && (
                  <span className="text-[11px] font-normal text-emerald-400">
                    ✓ Referral code applied!
                  </span>
                )}
              </label>
              <input
                type="text"
                placeholder="e.g. YASASWI42 (Leave empty if none)"
                value={formData.referredBy}
                onChange={(e) => setFormData({ ...formData, referredBy: e.target.value.toUpperCase() })}
                className="w-full bg-slate-900/90 border border-slate-700/80 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-slate-200 uppercase tracking-wider placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 font-mono"
              />
            </div>

            {/* Submit Button */}
            <div className="pt-3">
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 rounded-xl font-bold text-sm sm:text-base text-white bg-gradient-to-r from-indigo-600 via-indigo-500 to-cyan-500 hover:from-indigo-500 hover:to-cyan-400 shadow-xl shadow-indigo-600/30 transition-all flex items-center justify-center space-x-2"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Reserving Seat & Generating Viral Pass...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Confirm Free Workshop Seat</span>
                  </>
                )}
              </button>
            </div>

            {/* Privacy & Assurance Footer */}
            <div className="flex items-center justify-center space-x-2 text-[11px] text-slate-400 pt-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Zero spam guarantee. Used only for workshop Zoom credentials and GitHub materials.</span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
