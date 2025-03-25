require('dotenv').config();
const express = require('express');
const mysql = require('mysql2');
const bcrypt = require('bcrypt');
const app = express();
const port = process.env.PORT || 3000;

// Middleware para parsear JSON
app.use(express.json());

// Configuración de la base de datos con variables de entorno
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

// Conectar a la base de datos
db.connect(err => {
    if (err) {
        console.error('Error conectando a la base de datos:', err);
        return;
    }
    console.log('Conectado a la base de datos');
});

// Ruta de prueba
app.get('/', (req, res) => {
    res.send('¡Servidor Express funcionando!');
});

// Ruta para crear un perfil con contraseña encriptada
app.post('/register', async (req, res) => {
    const { name, lastName, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    db.query('INSERT INTO users (name, lastName, email, password) VALUES (?, ?, ?, ?)', 
    [name, lastName, email, hashedPassword], (err) => {
        if (err) {
            res.status(500).json({ error: 'Error al registrar usuario' });
            return;
        }
        res.json({ mensaje: 'Usuario registrado con éxito' });
    });
});

// Iniciar servidor
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
