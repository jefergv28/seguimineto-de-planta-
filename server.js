const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(express.json());  // Para manejar datos JSON en el cuerpo de las solicitudes


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
    const query = 'SELECT id, planta, fecha, producto FROM seguimiento';
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
  
    const query = 'INSERT INTO seguimiento (planta, fecha, producto) VALUES (?, ?, ?, ?)';
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
app.delete('/seguimiento/:id', (req, res) => {
  const { id } = req.params;

  // Verifica si el seguimiento con el id dado existe en la base de datos
  db.query('SELECT * FROM seguimiento WHERE id = ?', [id], (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Error del servidor' });
    }
    if (results.length === 0) {
      return res.status(404).json({ message: 'Seguimiento no encontrado' });
    }

    // Si el seguimiento existe, lo eliminamos
    db.query('DELETE FROM seguimiento WHERE id = ?', [id], (err, result) => {
      if (err) {
        return res.status(500).json({ message: 'Error al eliminar el seguimiento' });
      }
      res.json({ message: `Seguimiento con ID ${id} eliminado correctamente` });
    });
  });
});

