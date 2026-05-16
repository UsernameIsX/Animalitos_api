// src/controllers/clientesController.js
const pool = require('../db/config');

// [READ] Obtener todos los clientes
const getClientes = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM cliente');
        res.status(200).json(result.rows);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los clientes' });
    }
};

// [CREATE] Registrar un nuevo cliente
const crearCliente = async (req, res) => {
    const { nombre, email, telefono } = req.body;
    try {
        const text = 'INSERT INTO cliente(nombre, email, telefono) VALUES($1, $2, $3) RETURNING *';
        const values = [nombre, email, telefono];
        
        const result = await pool.query(text, values);
        res.status(201).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: 'Error al registrar el cliente' });
    }
};

// [UPDATE] Actualizar datos de cliente
const actualizarCliente = async (req, res) => {
    const { id } = req.params;
    const { nombre, email, telefono } = req.body;
    try {
        const text = 'UPDATE cliente SET nombre = $1, email = $2, telefono = $3 WHERE id_cliente = $4 RETURNING *';
        const values = [nombre, email, telefono, id];
        
        const result = await pool.query(text, values);
        if (result.rowCount === 0) return res.status(404).json({ error: 'Cliente no encontrado' });
        
        res.status(200).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar el cliente' });
    }
};

// [DELETE] Eliminar cliente
const eliminarCliente = async (req, res) => {
    const { id } = req.params;
    try {
        const text = 'DELETE FROM cliente WHERE id_cliente = $1 RETURNING *';
        const values = [id];
        
        const result = await pool.query(text, values);
        if (result.rowCount === 0) return res.status(404).json({ error: 'Cliente no encontrado' });
        
        res.status(200).json({ message: 'Cliente eliminado del registro' });
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar el cliente' });
    }
};

module.exports = { getClientes, crearCliente, actualizarCliente, eliminarCliente };
