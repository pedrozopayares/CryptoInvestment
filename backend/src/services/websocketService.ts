import { WebSocketServer, WebSocket, type RawData } from 'ws';
import jwt from 'jsonwebtoken';
import { IncomingMessage } from 'http';

const JWT_SECRET = process.env.JWT_SECRET || 'supersecret';

interface AuthenticatedSocket extends WebSocket {
  user?: any;
}

export function initWebSocketService(server: any) {
  const wss = new WebSocketServer({ server });

  wss.on('connection', (ws: AuthenticatedSocket, req: IncomingMessage) => {
    // Extraer token de la query string
    const url = new URL(req.url || '', `http://${req.headers.host}`);
    const token = url.searchParams.get('token');

    if (!token) {
      ws.close(4001, 'Token requerido');
      return;
    }

    let payload: any;
    try {
      payload = jwt.verify(token, JWT_SECRET);
    } catch (err) {
      ws.close(4002, 'Token inválido');
      return;
    }

    ws.user = payload;
    ws.send('Conexión WebSocket autenticada');

    ws.on('message', (message: RawData) => {
      // Aquí puedes manejar mensajes del usuario autenticado
      ws.send(`Echo: ${message.toString()}`);
    });
  });

  return wss;
}
