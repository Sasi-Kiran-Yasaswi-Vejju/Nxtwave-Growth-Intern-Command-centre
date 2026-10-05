import { Router, Request, Response } from 'express';
import { store } from '../data/store.js';

export const analyticsRouter = Router();

// GET /api/analytics/overview
analyticsRouter.get('/overview', (_req: Request, res: Response) => {
  res.json({
    success: true,
    data: store.getOverview(),
    demoMode: store.getDemoMode()
  });
});

// GET /api/analytics/channels
analyticsRouter.get('/channels', (_req: Request, res: Response) => {
  res.json({
    success: true,
    data: store.getChannels()
  });
});

// GET /api/analytics/daily
analyticsRouter.get('/daily', (_req: Request, res: Response) => {
  res.json({
    success: true,
    data: store.getDailyTrends()
  });
});

// GET /api/analytics/funnel
analyticsRouter.get('/funnel', (_req: Request, res: Response) => {
  res.json({
    success: true,
    data: store.getFunnel()
  });
});

// GET /api/analytics/experiments
analyticsRouter.get('/experiments', (_req: Request, res: Response) => {
  res.json({
    success: true,
    data: store.getExperiments()
  });
});

// POST /api/analytics/toggle-demo
analyticsRouter.post('/toggle-demo', (req: Request, res: Response) => {
  const { enabled } = req.body;
  const newState = typeof enabled === 'boolean' ? enabled : !store.getDemoMode();
  store.setDemoMode(newState);
  res.json({
    success: true,
    demoMode: store.getDemoMode(),
    message: `Simulation mode is now ${store.getDemoMode() ? 'ENABLED' : 'DISABLED'}.`
  });
});

// POST /api/analytics/reset
analyticsRouter.post('/reset', (_req: Request, res: Response) => {
  store.resetToDefault();
  res.json({
    success: true,
    message: 'Analytics and registration store reset to baseline simulation state.'
  });
});
