import express from 'express';
import polygonRoutes from './routes/polygon.routes';

const app = express();

// Middlewares base
app.use(express.json());

// Rutas
app.use('/api/polygons', polygonRoutes);

export default app;
