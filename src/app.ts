import express from 'express';
import siteRoutes from './routes/site.routes.js';

//Para hacer test de push (ver los diferentes remotes)
const app = express();

// Middlewares base
app.use(express.json());

// Rutas
app.use('/api/cortes', siteRoutes);

export default app;
