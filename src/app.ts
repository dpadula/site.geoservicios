import express from 'express';
import polygonRoutes from './routes/polygon.routes.js';

const app = express();

// Middlewares base
app.use(express.json());

// Rutas
app.use('/api/cortes', polygonRoutes);

export default app;
