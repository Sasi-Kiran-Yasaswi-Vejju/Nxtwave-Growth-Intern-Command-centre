import { Router, Request, Response } from 'express';
import { store } from '../data/store.js';

export const referralRouter = Router();

// GET /api/referral/leaderboard
referralRouter.get('/leaderboard', (_req: Request, res: Response) => {
  const leaderboard = store.getLeaderboard();
  res.json({
    success: true,
    data: leaderboard
  });
});

// GET /api/referral/:code
referralRouter.get('/:code', (req: Request, res: Response): void => {
  const code = String(req.params.code);
  const reg = store.getRegistrationByCode(code);

  if (!reg) {
    res.status(404).json({
      success: false,
      error: `Referral code "${code}" not found. You can still register directly!`
    });
    return;
  }

  // Calculate tier and rewards
  const count = reg.referralCount;
  let nextReward = 'Refer 1 friend to unlock AI Placement Resume Bullet Bank';
  let target = 1;

  if (count >= 1 && count < 3) {
    nextReward = 'Refer 3 friends to unlock GitHub Production Kit & API Cheat Sheet';
    target = 3;
  } else if (count >= 3 && count < 5) {
    nextReward = 'Refer 5 friends to unlock VIP 1-on-1 AI Resume Review + Front Row AMA';
    target = 5;
  } else if (count >= 5) {
    nextReward = 'All VIP Perks Unlocked! You are an Ambassador Elite.';
    target = count;
  }

  const leaderboard = store.getLeaderboard();
  const rank = leaderboard.findIndex(item => item.referralCode === reg.referralCode) + 1;

  res.json({
    success: true,
    data: {
      referralCode: reg.referralCode,
      name: reg.name,
      college: reg.college,
      referralCount: count,
      rank: rank > 0 ? rank : 'Unranked',
      nextReward,
      target,
      unlockedRewards: {
        bulletBank: count >= 1,
        githubKit: count >= 3,
        vipAma: count >= 5
      }
    }
  });
});

// POST /api/referral/share
referralRouter.post('/share', (_req: Request, res: Response) => {
  store.recordShareClick();
  res.json({ success: true, message: 'Share action tracked' });
});
