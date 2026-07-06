import express, { Express, Request, Response } from 'express';
import { rocketsRouter } from './routes/rockets.js';
import { error, info } from './utils/logger.js';

const app: Express = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Health check endpoint
app.get('/health', (req: Request, res: Response) => {
  info('index:health', 'Health check requested', {
    method: req.method,
    path: req.path
  });

  res.status(200).json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// Root endpoint
app.get('/', (req: Request, res: Response) => {
  info('index:root', 'Root endpoint requested', {
    method: req.method,
    path: req.path
  });

  res.status(200).json({
    message: 'Welcome to Astro Bookings API',
    version: '0.1.0',
    endpoints: {
      health: '/health',
      rockets: '/rockets'
    }
  });
});

// Register routes
app.use('/rockets', rocketsRouter);

// 404 handler
app.use((req: Request, res: Response) => {
  info('index:404', 'Route not found', {
    method: req.method,
    path: req.path
  });

  res.status(404).json({
    error: 'Not Found',
    message: `Route ${req.method} ${req.path} does not exist`
  });
});

// Error handler
app.use((err: Error, req: Request, res: Response) => {
  error('index:error-handler', 'Unhandled request error', {
    method: req.method,
    path: req.path,
    message: err.message,
    stack: err.stack
  });

  res.status(500).json({
    error: 'Internal Server Error',
    message: err.message
  });
});

// Start server
const server = app.listen(PORT, () => {
  info('index:startup', 'Server started', {
    port: PORT,
    environment: process.env.NODE_ENV || 'development',
    url: `http://localhost:${PORT}`
  });
});

server.on('error', (err: Error) => {
  error('index:startup', 'Server failed', {
    message: err.message,
    stack: err.stack
  });
});

// Graceful shutdown
process.on('SIGTERM', () => {
  info('index:shutdown', 'SIGTERM received, closing server');
  server.close(() => {
    info('index:shutdown', 'HTTP server closed');
    process.exit(0);
  });
});

process.on('SIGINT', () => {
  info('index:shutdown', 'SIGINT received, closing server');
  server.close(() => {
    info('index:shutdown', 'HTTP server closed');
    process.exit(0);
  });
});

process.on('unhandledRejection', (reason: unknown) => {
  error('index:process', 'Unhandled promise rejection', {
    reason: reason instanceof Error ? reason.message : String(reason),
    stack: reason instanceof Error ? reason.stack : undefined
  });
});

process.on('uncaughtException', (err: Error) => {
  error('index:process', 'Uncaught exception', {
    message: err.message,
    stack: err.stack
  });
});

export default app;
