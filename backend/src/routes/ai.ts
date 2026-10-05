import { Router, Request, Response } from 'express';
import { generateProjectBlueprint } from '../services/aiGenerator.js';
import { store } from '../data/store.js';

export const aiRouter = Router();

// POST /api/ai/generate
aiRouter.post('/generate', async (req: Request, res: Response): Promise<void> => {
  try {
    const { branch, interest, skillLevel, techStack, problemArea } = req.body;

    if (!branch || !interest) {
      res.status(400).json({
        success: false,
        error: 'Please provide at least your engineering branch and area of interest.'
      });
      return;
    }

    // Record engagement event in growth funnel
    store.recordGeneratorInteraction();

    const blueprint = await generateProjectBlueprint({
      branch,
      interest,
      skillLevel: skillLevel || 'Beginner',
      techStack: techStack || 'Python',
      problemArea
    });

    res.json({
      success: true,
      data: blueprint
    });
  } catch (error) {
    console.error('AI generation error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to generate AI project blueprint.'
    });
  }
});
