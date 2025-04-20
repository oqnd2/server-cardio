const express = require('express');
const http = require('http');
const { WebSocketServer } = require('ws');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const authRoutes = require('./routes/authRoutes');
const heartRoutes = require('./routes/heartRateRoutes');

const app = express();
const server = http.createServer(app);  // <-- importante: usamos http.createServer
const wss = new WebSocketServer({ server });

app.use(express.json());
app.use('/auth', authRoutes);
app.use('/bpm', heartRoutes);

// Ruta simple
app.get('/', (req, res) => {
    res.send('¡Servidor Express funcionando!');
});

// 🔐 Map para guardar conexiones por ID de usuario
const userConnections = new Map();

// 🧠 WebSocket autenticado
wss.on('connection', (ws, req) => {
    const params = new URLSearchParams(req.url.replace('/?', ''));
    const token = params.get('token');

    if (!token) {
        ws.close();
        return;
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.id;

        userConnections.set(userId, ws);
        console.log(`Cliente conectado: usuario ${userId}`);

        ws.on('close', () => {
            userConnections.delete(userId);
            console.log(`Cliente desconectado: usuario ${userId}`);
        });
    } catch (err) {
        console.error('Token inválido');
        ws.close();
    }
});

// ✅ Exportar para usar en otras partes del backend
app.locals.userConnections = userConnections;

// Iniciar servidor
const port = process.env.PORT || 3000;
server.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
