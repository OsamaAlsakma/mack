import { Server } from 'socket.io';
import { logger } from '../utils/logger';

export const setupSocketHandlers = (io: Server) => {
  io.on('connection', (socket) => {
    logger.info(`Client connected: ${socket.id}`);

    socket.on('join-project', (projectId: string) => {
      socket.join(`project-${projectId}`);
      logger.info(`Client ${socket.id} joined project ${projectId}`);
    });

    socket.on('leave-project', (projectId: string) => {
      socket.leave(`project-${projectId}`);
      logger.info(`Client ${socket.id} left project ${projectId}`);
    });

    socket.on('disconnect', () => {
      logger.info(`Client disconnected: ${socket.id}`);
    });
  });

  return io;
};