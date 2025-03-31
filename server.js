require('dotenv').config();
const express = require('express');
const authRoutes = require('./routes/authRoutes');
const heartRoutes = require('./routes/heartRateRoutes');

const app = express();
const port = process.env.PORT || 3000;

// Middleware para parsear JSON
app.use(express.json());

// Rutas
app.use('/auth', authRoutes);
app.use('/bpm', heartRoutes);

// Ruta de prueba
app.get('/', (req, res) => {
    res.send('¡Servidor Express funcionando!');
});

// Iniciar servidor
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
