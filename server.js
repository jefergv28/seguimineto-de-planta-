const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

// Configura CORS
app.use(cors());

// Middleware
app.use(bodyParser.json());

// Configurar base de datos MySQL
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'fertilizer_db',
});

db.connect((err) => {
  if (err) {
    console.error('Error conectando a la base de datos:', err);
  } else {
    console.log('Conexión exitosa a la base de datos');
  }
});
// Rutas para manejar los seguimientos (debes añadir esto en server.js)
app.get('/seguimiento', (req, res) => {
    const query = 'SELECT id, planta, fecha, producto, frecuencia FROM seguimiento';
    db.query(query, (err, results) => {
      if (err) {
        console.error('Error al obtener los seguimientos:', err.message);
        res.status(500).json({ error: err.message });
      } else {
        res.json(results); // Devuelve los resultados en formato JSON
      }
    });
  });
  app.post('/seguimiento', (req, res) => {
    const { planta, fecha, producto, frecuencia } = req.body;
  
    const query = 'INSERT INTO seguimiento (planta, fecha, producto, frecuencia) VALUES (?, ?, ?, ?)';
    db.query(query, [planta, fecha, producto, frecuencia], (err, result) => {
      if (err) {
        console.error('Error al agregar seguimiento:', err.message);
        res.status(500).send('Error al agregar seguimiento');
      } else {
        res.status(200).json({ success: true, id: result.insertId });
      }
    });
  });
  
  
// Rutas (ejemplo de la ruta de plantas)
app.get('/plantas', (req, res) => {
  const query = 'SELECT * FROM plantas';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error al obtener plantas:', err);
      res.status(500).send('Error al obtener plantas');
    } else {
      res.json(results); // Enviar los datos como JSON
    }
  });
});


app.post('/plantas', (req, res) => {
    console.log('POST /plantas alcanzado'); // Verificar que la ruta se está alcanzando
    const { nombre, genetica, thc } = req.body;
    const query = 'INSERT INTO plantas (nombre, genetica, thc) VALUES (?, ?, ?)';
    
    db.query(query, [nombre, genetica, thc], (err, result) => {
      if (err) {
        console.error('Error al agregar planta:', err);
        res.status(500).send('Error al agregar planta');
      } else {
        res.status(200).json({ success: true, id: result.insertId });
      }
    });
  });
  
  
  
// Iniciar el servidor
app.listen(3001, () => {
  console.log('Servidor corriendo en http://localhost:3001');
});


/////--------------------------/--------------------------/--------------------------/--------------------------/--------------------------/------------------------

