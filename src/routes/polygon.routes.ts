import { Router } from 'express';
import { getPolygonGeoJSON } from '../controllers/polygon.controller';

const router = Router();

// GET /api/polygons
router.get('/', getPolygonGeoJSON);

export default router;
