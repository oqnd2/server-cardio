const express = require("express");
const router = express.Router();
const db = require("../config/db");
const authenticateToken = require("../middlewares/authMidleware");

// 📌 Ruta para registrar una nueva medición de ritmo cardíaco
router.post("/add", authenticateToken, (req, res) => {
    const { bpm } = req.body;
    const userId = req.user.id;  // Ahora obtenemos el ID desde el token

    if (!bpm) {
        return res.status(400).json({ error: "BPM es requerido" });
    }

    const query = "INSERT INTO heart_rate (user_id, bpm) VALUES (?, ?)";
    db.query(query, [userId, bpm], (err, result) => {
        if (err) {
            console.error("Error al insertar BPM:", err);
            return res.status(500).json({ error: "Error al guardar los datos" });
        }
        res.json({ message: "Registro exitoso", id: result.insertId });
    });
});

// 📌 Ruta para obtener los registros de BPM de un usuario
router.get("/", authenticateToken, (req, res) => {
    const userId = req.user.id;

    const query = "SELECT bpm, recorded_at FROM heart_rate WHERE user_id = ? ORDER BY recorded_at DESC";
    db.query(query, [userId], (err, results) => {
        if (err) {
            console.error("Error al obtener BPM:", err);
            return res.status(500).json({ error: "Error al obtener los datos" });
        }
        res.json(results);
    });
});

module.exports = router;
