import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { config } from './config';
import { errorHandler } from './middleware/errorHandler';
import { rateLimiter } from './middleware/rateLimiter';
import { logger } from './utils/logger';
import { setupRoutes } from './routes';
import { setupSocketHandlers } from './socket';

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: config.corsOrigin,
    methods: ['GET', 'POST']
  }
});

// Middleware
app.use(helmet());
app.use(cors({ origin: config.corsOrigin }));
app.use(express.json());
app.use(rateLimiter);

// Routes
setupRoutes(app);

// Socket.IO handlers
setupSocketHandlers(io);

// Error handling
app.use(errorHandler);

// Start server
httpServer.listen(config.port, () => {
  logger.info(`Server running on port ${config.port}`);
});