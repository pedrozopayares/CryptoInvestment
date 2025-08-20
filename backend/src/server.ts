import dotenv from 'dotenv';

// Load environment variables FIRST
dotenv.config();

import { SERVER } from './config/config';
import http from 'http';
import express from 'express';
import './config/logging';
import { connectDatabase, closeDatabase } from './db/connection';

import { loggingHandler } from './middleware/loggingHandler';
import { corsHandler } from './middleware/corsHandler';
import { routeNotFound } from './middleware/routeNotFound';
import authRouter from './routes/auth';
import adminRouter from './routes/admin';
import { initWebSocketService } from './services/websocketService';

export const application = express();
export let httpServer: ReturnType<typeof http.createServer>;

export const Main = async () => {
    logging.info('--------------------------------');
    logging.info('Starting CryptoInvestment Backend');
    logging.info('--------------------------------');
    
    // Database connection
    await connectDatabase();
    
    // Express middleware
    application.use(express.json());
    application.use(express.urlencoded({ extended: true }));

    logging.info('---------------------------------');
    logging.info('Logging & configuration');
    logging.info('---------------------------------');
    application.use(loggingHandler);
    application.use(corsHandler);


    logging.info('---------------------------------');
    logging.info('Define Controller Routing');
    logging.info('---------------------------------');


    // Auth routes
    application.use('/api/v1/auth', authRouter);

    // Admin routes (protegidas, requieren token válido)
    application.use('/api/v1/admin', adminRouter);

    // Health check endpoint
    application.get('/health', (req, res) => {
        res.status(200).json({ 
            status: 'OK',
            timestamp: new Date().toISOString(),
            uptime: process.uptime(),
            environment: process.env.NODE_ENV || 'development',
            database: 'connected' // TODO: add actual db health check
        });
    });

    logging.info('---------------------------------');
    logging.info('Define Routing Error Handler');
    logging.info('---------------------------------');
    application.use(routeNotFound);

    logging.info('---------------------------------');
    logging.info('Start Server');
    logging.info('---------------------------------');
    httpServer = http.createServer(application);

    // Inicializar WebSocketService (autenticado por JWT)
    initWebSocketService(httpServer);

    httpServer.listen(SERVER.SERVER_PORT, () => {
        logging.info(`🚀 Server running at http://${SERVER.SERVER_HOSTNAME}:${SERVER.SERVER_PORT}`);
        logging.info(`📊 Environment: ${process.env.NODE_ENV || 'development'}`);
        logging.info(`🔗 Health check: http://${SERVER.SERVER_HOSTNAME}:${SERVER.SERVER_PORT}/health`);
    });
}

export const Shutdown = async (callback: any) => {
    logging.info('---------------------------------');
    logging.info('Shutting down server...');
    logging.info('---------------------------------');
    
    // Close database connections
    await closeDatabase();
    
    // Close HTTP server
    if (httpServer) {
        httpServer.close(() => {
            logging.info('✅ Server shut down successfully.');
            callback();
        });
    } else {
        callback();
    }
}

// Graceful shutdown handlers
process.on('SIGTERM', () => {
    logging.info('SIGTERM received, shutting down gracefully');
    Shutdown(() => process.exit(0));
});

process.on('SIGINT', () => {
    logging.info('SIGINT received, shutting down gracefully');
    Shutdown(() => process.exit(0));
});

// Start the application
Main().catch((error) => {
    logging.error('❌ Failed to start server:', error);
    process.exit(1);
});
