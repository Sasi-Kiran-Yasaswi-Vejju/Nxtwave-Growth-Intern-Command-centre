import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { registrationRouter } from './routes/registration.js';
import { referralRouter } from './routes/referral.js';
import { aiRouter } from './routes/ai.js';
import { analyticsRouter } from './routes/analytics.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: '*', // Allow frontend development server
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// Request logging middleware
app.use((req: Request, _res: Response, next: NextFunction) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// Health check
app.get('/api/health', (_req: Request, res: Response) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    service: 'NxtWave AI Workshop Growth Engine API',
    version: '1.0.0'
  });
});

// API Routes
app.use('/api/register', registrationRouter);
app.use('/api/referral', referralRouter);
app.use('/api/ai', aiRouter);
app.use('/api/analytics', analyticsRouter);

// 404 Handler
app.use((_req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    error: 'API endpoint not found'
  });
});

// Global Error Handler
app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error('Unhandled server exception:', err);
  res.status(500).json({
    success: false,
    error: 'Internal server error occurred'
  });
});

app.listen(PORT, () => {
  console.log(`🚀 NxtWave Growth Engine API running on port ${PORT}`);
  console.log(`📡 Health Check: http://localhost:${PORT}/api/health`);
  console.log(`📊 Analytics Overview: http://localhost:${PORT}/api/analytics/overview`);
});
