require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
    // Leemos la URL desde el .env
    connectionString: process.env.DATABASE_URL, 
});

// Verificamos la conexión inicial
pool.connect((err, client, release) => {
    if (err) {
        console.error('Error al conectar a la base de datos', err.stack);
    } else {
        console.log('¡Conectado exitosamente a la base de datos Veterinaria Animalitos!');
        release();
    }
});

module.exports = pool;