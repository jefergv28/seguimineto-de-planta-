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
  async function cargarSeguimientos() {
    try {
      const response = await fetch(`${baseURL}/seguimiento`);
      if (!response.ok) throw new Error('Error al cargar los seguimientos');
      
      const seguimientos = await response.json();
      const tablaSeguimientos = document.getElementById('tabla-seguimiento').getElementsByTagName('tbody')[0];
      tablaSeguimientos.innerHTML = '';
  
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
  
        const columnaFrecuencia = document.createElement('td');
        columnaFrecuencia.textContent = seguimiento.frecuencia;
  
        row.appendChild(columnaId);
        row.appendChild(columnaPlanta);
        row.appendChild(columnaFecha);
        row.appendChild(columnaProducto);
        row.appendChild(columnaFrecuencia);
  
        tablaSeguimientos.appendChild(row);
      });
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
