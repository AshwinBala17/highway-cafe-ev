import express from 'express';
import http from 'http';
import { WebSocketServer } from 'ws';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

const server = http.createServer(app);
const wss = new WebSocketServer({ server });

// Basic REST Route for Cafe Menu
app.get('/api/menu', (req, res) => {
    res.json({ status: 'success', data: 'Cafe Menu Available' });
});

// WebSocket Server for EV Chargers (OCPP simulation)
wss.on('connection', (ws) => {
    console.log('New EV Charger Connected');
    
    ws.on('message', (message) => {
        console.log(`Received telemetry: ${message}`);
    });

    ws.send(JSON.stringify({ message: 'Welcome to the Central Node' }));
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
    console.log(`Backend server running on http://localhost:${PORT}`);
});