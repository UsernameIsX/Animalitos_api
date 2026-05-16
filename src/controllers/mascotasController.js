// src/controllers/mascotasController.js
const pool = require('../db/config');

// [READ] Obtener todas las mascotas
const getMascotas = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM pacientes');
        res.status(200).json(result.rows);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener las mascotas' });
    }
};

// [CREATE] Registrar una nueva mascota (Protegido contra SQL Injection)
const crearMascota = async (req, res) => {
    const { nombre, especie, edad } = req.body;
    try {
        // SEGURIDAD: Uso de placeholders ($1, $2, $3)
        const text = 'INSERT INTO pacientes(nombre, especie, edad) VALUES($1, $2, $3) RETURNING *';
        const values = [nombre, especie, edad];
        
        const result = await pool.query(text, values);
        res.status(201).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: 'Error al registrar la mascota' });
    }
};

// [UPDATE] Actualizar datos (Protegido contra SQL Injection)
const actualizarMascota = async (req, res) => {
    const { id } = req.params;
    const { nombre, especie, edad } = req.body;
    try {
        const text = 'UPDATE pacientes SET nombre = $1, especie = $2, edad = $3 WHERE id = $4 RETURNING *';
        const values = [nombre, especie, edad, id];
        
        const result = await pool.query(text, values);
        if (result.rowCount === 0) return res.status(404).json({ error: 'Mascota no encontrada' });
        
        res.status(200).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar' });
    }
};

// [DELETE] Dar de alta / Eliminar
const eliminarMascota = async (req, res) => {
    const { id } = req.params;
    try {
        const text = 'DELETE FROM pacientes WHERE id = $1 RETURNING *';
        const values = [id];
        
        const result = await pool.query(text, values);
        if (result.rowCount === 0) return res.status(404).json({ error: 'Mascota no encontrada' });
        
        res.status(200).json({ message: 'Mascota eliminada del registro' });
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar' });
    }
};

module.exports = { getMascotas, crearMascota, actualizarMascota, eliminarMascota };