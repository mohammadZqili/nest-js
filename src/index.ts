import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(helmet());
app.use(cors());
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check endpoints
app.get('/healthz', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    service: 'admin-api',
    version: '1.0.0',
    uptime: process.uptime()
  });
});

app.get('/ready', (req, res) => {
  res.json({
    status: 'ready',
    timestamp: new Date().toISOString(),
  });
});

// Main routes
app.get('/', (req, res) => {
  res.json({
    message: 'Admin API Service',
    version: '1.0.0',
    environment: process.env.NODE_ENV || 'development',
    timestamp: new Date().toISOString(),
  });
});

app.get('/admin', (req, res) => {
  res.json({
    message: 'Admin Dashboard API',
    endpoints: {
      health: '/healthz',
      ready: '/ready',
      stats: '/admin/stats',
      users: '/admin/users'
    }
  });
});

app.get('/admin/stats', (req, res) => {
  res.json({
    stats: {
      uptime: process.uptime(),
      memory: process.memoryUsage(),
      platform: process.platform,
      nodeVersion: process.version,
      timestamp: new Date().toISOString()
    }
  });
});

app.get('/admin/users', (req, res) => {
  res.json({
    users: [
      { id: 1, name: 'Admin User', role: 'admin', active: true },
      { id: 2, name: 'Demo User', role: 'user', active: true }
    ],
    total: 2
  });
});

// Error handling middleware
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({
    error: 'Internal Server Error',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong!',
    timestamp: new Date().toISOString()
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    error: 'Not Found',
    path: req.originalUrl,
    timestamp: new Date().toISOString()
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Admin API server running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
}); 