import { Router, Request, Response } from 'express';
import { store } from '../data/store.js';

export const registrationRouter = Router();

function generateReferralCode(name: string): string {
  const cleanName = name.replace(/[^a-zA-Z]/g, '').toUpperCase().slice(0, 5) || 'NXT';
  const randomNum = Math.floor(10 + Math.random() * 90);
  let candidate = `${cleanName}${randomNum}`;

  // Ensure uniqueness
  while (store.getRegistrationByCode(candidate)) {
    candidate = `${cleanName}${Math.floor(10 + Math.random() * 90)}`;
  }
  return candidate;
}

// POST /api/register
registrationRouter.post('/', (req: Request, res: Response): void => {
  try {
    const { name, email, whatsapp, college, branch, graduationYear, source, referralCode, referredBy } = req.body;

    if (!name || !email || !college || !branch) {
      res.status(400).json({
        success: false,
        error: 'Missing required fields: name, email, college, and branch are mandatory.'
      });
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      res.status(400).json({
        success: false,
        error: 'Please provide a valid email address.'
      });
      return;
    }

    // Check duplicate email
    const existing = store.getRegistrationByEmail(email);
    if (existing) {
      res.status(200).json({
        success: true,
        isExisting: true,
        message: 'You are already registered for the workshop!',
        data: existing,
        referralUrl: `/?ref=${existing.referralCode}`
      });
      return;
    }

    const uniqueCode = generateReferralCode(name);
    const validGraduationYear = graduationYear ? Number(graduationYear) : 2027;
    const finalSource = source || (referredBy ? 'Student Referral Engine' : 'College WhatsApp Communities');

    const created = store.addRegistration({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      whatsapp: whatsapp ? whatsapp.trim() : undefined,
      college: college.trim(),
      branch: branch.trim(),
      graduationYear: validGraduationYear,
      source: finalSource,
      referralCode: uniqueCode,
      referredBy: referredBy ? referredBy.trim().toUpperCase() : undefined
    });

    res.status(201).json({
      success: true,
      isExisting: false,
      message: 'Successfully registered for "Build Your First AI Project in 60 Minutes"!',
      data: created,
      referralUrl: `/?ref=${created.referralCode}`
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error processing registration.'
    });
  }
});

// GET /api/register
registrationRouter.get('/', (req: Request, res: Response) => {
  const registrations = store.getRegistrations();
  res.json({
    success: true,
    total: registrations.length,
    data: registrations
  });
});

// GET /api/register/:id
registrationRouter.get('/:id', (req: Request, res: Response): void => {
  const id = String(req.params.id);
  const reg = store.getRegistrationById(id);
  if (!reg) {
    res.status(404).json({ success: false, error: 'Registration not found' });
    return;
  }
  res.json({ success: true, data: reg });
});
