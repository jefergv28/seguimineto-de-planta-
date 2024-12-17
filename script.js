
document.addEventListener('DOMContentLoaded', () => {
  const baseURL = 'http://localhost:3001';  // Usar una URL base consistente

  // Cargar plantas en el select
  async function cargarPlantas() {
    try {
      const response = await fetch(`${baseURL}/plantas`);
      if (!response.ok) throw new Error('Error al cargar las plantas');
      
      const plantas = await response.json();
      const selectPlanta = document.getElementById('planta-seguimiento');
      selectPlanta.innerHTML = '';  // Limpiar el select antes de agregar opciones

      plantas.forEach(planta => {
        const option = document.createElement('option');
        option.value = planta.id;
        option.textContent = planta.nombre;
        selectPlanta.appendChild(option);
      });
    } catch (error) {
      console.error('Error al cargar plantas:', error);
    }
  }

  // Cargar los seguimientos y mostrarlos en el DOM
 // Cargar los seguimientos y mostrarlos en el DOM
async function cargarSeguimientos() {
  try {
    const response = await fetch('http://localhost:3001/seguimiento');
    if (!response.ok) {
      throw new Error('Error al cargar los seguimientos');
    }

    const seguimientos = await response.json();
    const tablaSeguimientos = document.getElementById('tabla-seguimiento').getElementsByTagName('tbody')[0];

    // Limpiar la tabla antes de agregar nuevos datos
    tablaSeguimientos.innerHTML = '';

    if (Array.isArray(seguimientos) && seguimientos.length > 0) {
      seguimientos.forEach(seguimiento => {
        const row = document.createElement('tr');

        const columnaId = document.createElement('td');
        columnaId.textContent = seguimiento.id;

        const columnaPlanta = document.createElement('td');
        columnaPlanta.textContent = seguimiento.planta;

        const columnaFecha = document.createElement('td');
        columnaFecha.textContent = seguimiento.fecha;

        const columnaProducto = document.createElement('td');
        columnaProducto.textContent = seguimiento.producto;

        // Nueva columna de acciones
        const columnaAcciones = document.createElement('td');
        const botonEliminar = document.createElement('button');
        botonEliminar.textContent = 'Eliminar';
        botonEliminar.addEventListener('click', () => eliminarSeguimiento(seguimiento.id)); // Llamamos a la función eliminar
        columnaAcciones.appendChild(botonEliminar);

        // Agregar las celdas a la fila
        row.appendChild(columnaId);
        row.appendChild(columnaPlanta);
        row.appendChild(columnaFecha);
        row.appendChild(columnaProducto);
        row.appendChild(columnaAcciones); // Columna de acciones

        // Agregar la fila a la tabla
        tablaSeguimientos.appendChild(row);
      });
    } else {
      const row = document.createElement('tr');
      const mensaje = document.createElement('td');
      mensaje.colSpan = 5;
      mensaje.textContent = 'No hay seguimientos registrados.';
      row.appendChild(mensaje);
      tablaSeguimientos.appendChild(row);
    }
  } catch (error) {
    console.error('Error al cargar los seguimientos:', error);
  }
}

  
  // Ejecutar funciones al cargar la página
  cargarPlantas();
  cargarSeguimientos();

  // Enviar formulario de seguimiento
  document.getElementById('form-agregar-planta').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevenir el envío por defecto

    const nombrePlanta = document.getElementById('nombre-planta').value;
    const geneticaPlanta = document.getElementById('genetica-planta').value;
    const thcPlanta = document.getElementById('thc-planta').value;

    // Enviar la información al servidor para agregar la planta
  fetch('http://localhost:3001/plantas', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    nombre: nombrePlanta,
    genetica: geneticaPlanta,
    thc: thcPlanta,
  }),
})

    .then(response => response.json())
    .then(data => {
      if (data.success) {
        alert('Planta agregada con éxito');
        cargarPlantas();  // Recargar plantas en el select
      } else {
        alert('Error al agregar la planta');
      }
    })
    .catch(error => {
      console.error('Error:', error);
      alert('Hubo un error al agregar la planta');
    });
  });
});
//-------------------------/------------------------------------------------
// Función para eliminar el seguimiento
async function eliminarSeguimiento(id) {
  if (!id) {
    console.error('ID no válido');
    return; // Salir si el ID no es válido
  }

  try {
    const response = await fetch(`http://localhost:3001/seguimiento/${id}`, {
      method: 'DELETE', // Método DELETE
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (response.ok) {
      const data = await response.json();
      console.log(data.message); // Mensaje de éxito
      cargarSeguimientos(); // Recargar la lista después de eliminar
    } else {
      console.error('Error al eliminar el seguimiento');
    }
  } catch (error) {
    console.error('Error al realizar la solicitud:', error);
  }
}

