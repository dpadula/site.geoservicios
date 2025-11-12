import express from 'express';
import siteRoutes from './routes/site.routes.js';

const app = express();

// Middlewares base
app.use(express.json());

// Rutas
app.use('/api/cortes', siteRoutes);

export default app;
