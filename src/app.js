require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const clientesRoutes = require('./routes/clientesRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// 1. Middlewares de Seguridad y Parseo
app.use(helmet()); // Protege cabeceras HTTP
app.use(cors());   // Permite peticiones cruzadas
app.use(express.json()); // Permite recibir JSON en el body

// 2. Rutas de la API
app.use('/api', clientesRoutes);

// 3. Levantar el servidor
app.listen(PORT, () => {
    console.log(`Servidor de la Veterinaria corriendo seguro en http://localhost:${PORT}`);
});