const express = require('express');
const bcrypt = require('bcrypt');
const db = require('../config/db');

const router = express.Router();

// Ruta para crear un perfil con contraseña encriptada
app.post('/registro', async (req, res) => {
    const { nombre, email, password } = req.body;

    if (!nombre || !email || !password) {
        return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }

    db.query('SELECT * FROM usuarios WHERE email = ?', [email], async (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Error en la base de datos' });
        }

        if (results.length > 0) {
            return res.status(400).json({ error: 'El correo ya está registrado' });
        }

        try {
            const hashedPassword = await bcrypt.hash(password, 10);
            db.query('INSERT INTO usuarios (nombre, email, password) VALUES (?, ?, ?)', 
            [nombre, email, hashedPassword], (err) => {
                if (err) {
                    return res.status(500).json({ error: 'Error al registrar usuario' });
                }
                res.json({ mensaje: 'Usuario registrado con éxito' });
            });
        } catch (error) {
            res.status(500).json({ error: 'Error al encriptar la contraseña' });
        }
    });
});

module.exports = router;
