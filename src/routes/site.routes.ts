import { Router } from 'express';
import { getCortes } from '../controllers/site.cortes.controller.js';

const router = Router();

// GET /api/polygons
router.get('/', getCortes);

export default router;
