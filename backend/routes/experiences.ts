import express from 'express';
import {
  getAllExperiences,
  getExperienceById
} from '../controllers/experienceController';
import { validateExperienceId } from '../middleware/validation';
const router = express.Router();
// GET /api/experiences - Get all experiences
router.get('/', getAllExperiences);
// GET /api/experiences/:id - Get experience by ID
router.get('/:id', validateExperienceId, getExperienceById);

export default router;
