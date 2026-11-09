import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { env } from './config/env.js';
import routes from './routes.js';
import { errorHandler } from './shared/middleware/errorHandler.js';
import { AppError } from './shared/utils/AppError.js';

const app = express();

// Middlewares
app.use(cors({ origin: env.CORS_ORIGIN, credentials: true }));
app.use(express.json());
if (env.NODE_ENV !== 'test') {
  app.use(morgan('dev'));
}

// API Routes
app.use('/api', routes);

// 404 Handler
app.all('*', (req, res, next) => {
  next(new AppError(`Route ${req.originalUrl} not found`, 404));
});

// Global Error Handler
app.use(errorHandler);

export default app;
