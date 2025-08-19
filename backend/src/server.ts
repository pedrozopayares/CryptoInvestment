import { SERVER } from './config/config';
import http from 'http';
import express from 'express';
import './config/logging';
import { loggingHandler } from './middleware/loggingHandler';
import { corsHandler } from './middleware/corsHandler';
import { routeNotFound } from './middleware/routeNotFound';

export const application = express();
export let httpServer: ReturnType<typeof http.createServer>;

export const Main = () => {
    logging.info('--------------------------------');
    logging.info('Starting CryptoInvestment Backend');
    logging.info('--------------------------------');
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
    application.get('/main/healthcheck', (req, res, next) => {
        return res.status(200).json({ status: 'ok' });
    });

    logging.info('---------------------------------');
    logging.info('Define Controller Routing');
    logging.info('---------------------------------');
    application.use(routeNotFound);

    logging.info('---------------------------------');
    logging.info('Start Server');
    logging.info('---------------------------------');
    httpServer = http.createServer(application);
    httpServer.listen(SERVER.SERVER_PORT, () => {
        logging.info(`Server is running at http://${SERVER.SERVER_HOSTNAME}:${SERVER.SERVER_PORT}`);
        logging.info(`Environment: ${process.env.NODE_ENV}`);
    });
}

export const Shutdown = (callback: any) => {
    logging.info('---------------------------------');
    logging.info('Shutting down server...');
    logging.info('---------------------------------');
    httpServer && httpServer.close(() => {
        logging.info('Server shut down successfully.');
        callback();
    });
}

Main();
