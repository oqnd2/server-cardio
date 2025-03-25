const express = require('express');
const bcrypt = require('bcrypt');
const db = require('../config/db');
const jwt = require('jsonwebtoken');

const router = express.Router();

// Ruta para crear un perfil con contraseña encriptada
router.post('/register', async (req, res) => {
    const { name, lastName, email, password } = req.body;

    if (!name || !lastName || !email || !password) {
        return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }

    db.query('SELECT * FROM users WHERE email = ?', [email], async (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Error en la base de datos' });
        }

        if (results.length > 0) {
            return res.status(400).json({ error: 'El correo ya está registrado' });
        }

        try {
            const hashedPassword = await bcrypt.hash(password, 10);
            db.query('INSERT INTO users (name, lastName, email, password) VALUES (?, ?, ?, ?)', 
            [name, lastName, email, hashedPassword], (err) => {
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

// Inicio de sesión
router.post('/login', (req, res) => {
    const { email, password } = req.body;

    db.query('SELECT * FROM users WHERE email = ?', [email], async (err, results) => {
        if (err) return res.status(500).json({ error: 'Error en la base de datos' });
        if (results.length === 0) return res.status(401).json({ error: 'Usuario no encontrado' });

        const user = results[0];
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) return res.status(401).json({ error: 'Contraseña incorrecta' });

        const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ mensaje: 'Inicio de sesión exitoso', token });
    });
});

module.exports = router;
