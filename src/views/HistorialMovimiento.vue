  <template>
  <div class="container">
    <h1 class="mb-4 text-white">Historial de Movimientos</h1>

    <div v-if="transacciones.length === 0" class="text-gray-600">
      No se encontraron movimientos registrados
    </div>

    <div class="table-container">
      <table v-if="transacciones.length > 0" class="table table-striped border border-gray-300">
        <thead class="bg-gray-100">
          <tr>
            <th>Id</th>
            <th>Cliente</th>
            <th>Email</th>
            <th>Cripto</th>
            <th>Acción</th>
            <th>Cantidad</th>
            <th>Monto (ARS)</th>
            <th>Fecha</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(t, index) in transaccionesOrdenadas" :key="t.id" class="text-center">
            <td>{{ index +1 }}</td>
            <td>{{ t.clienteNombre }}</td>
            <td>{{ t.clienteEmail }}</td>
            <td>{{ t.cryptoCode }}</td>
            <td>{{ t.action }}</td>
            <td>{{ t.cryptoAmount }}</td>
            <td>${{ t.money.toFixed(2) }}</td>
            <td>{{ formatFecha(t.dateTime) }}</td>
            <td>
              <button class="btn btn-info btn-sm me-1" @click="detalleTransaccion(t.id)">Detalle</button>
              <button class="btn btn-warning btn-sm me-1" @click="editarTransaccion(t.id)">Editar</button>
              <button class="btn btn-danger btn-sm" @click="eliminarTransaccion(t.id)">Eliminar</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

  <script setup>
  import { ref, computed, onMounted } from 'vue';
  import axios from 'axios';

  const transacciones = ref([]);

  const cargarTransacciones = async () => {
    try {
      const response = await axios.get('/api/transaccion');
      transacciones.value = response.data;
    } catch (error) {
      console.error('Error al cargar transacciones:', error);
    }
  };

  // Ordenar los clientes alfabéticamente
  const transaccionesOrdenadas = computed(() => {
    return [...transacciones.value].sort((a, b) => a.clienteNombre.localeCompare(b.clienteNombre));
  });

  const eliminarTransaccion = async (id) => {
    if (!confirm('¿Estás segura/o que desea eliminar esta transacción?')) return;

    try {
      await axios.delete(`/api/transaccion/${id}`);
      transacciones.value = transacciones.value.filter(t => t.id !== id);
    } catch (error) {
      console.error('Error al eliminar la transacción:', error);
    }
  };

  const formatFecha = (fechaIso) => {
    const fecha = new Date(fechaIso);
    return fecha.toLocaleString('es-AR');
  };

  onMounted(cargarTransacciones);
  </script>

<style scoped>
/* Contenedor principal */
.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: #A3C9A8;
  padding: 20px;
}

/* Título */
h1 {
  font-size: 3rem;
  color: #000000;
  margin-bottom: 1.5rem;
  text-align: center;
}

/* Contenedor de la tabla */
.table-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}

/* Tabla */
.table {
  border-collapse: collapse;
  background-color: #f25c5e;
  color: rgb(0, 0, 0);
  border-radius: 10px; 
  overflow: hidden;
  width: 80%;
}

/* Encabezados */
.table th {
  background-color: #432330;
  font-size: 1.4rem;
  padding: 12px;
  text-align: center;
}

/* Filas */
.table td {
  padding: 12px;
  text-align: center;
}

/* Alternar colores en las filas */
.table tbody tr:nth-child(even) {
  background-color: #c45456;
}

/* Botones cuadrados */
button {
  font-size: 1rem;
  padding: 10px 15px;
  border: none;
  cursor: pointer;
  width: 100px;
  height: 40px;
  text-align: center;
  transition: background-color 0.3s ease, transform 0.2s ease;
}

/* Botón de información */
.btn-info {
  background-color: #395A4F;
  color: white;
}

.btn-info:hover {
  background-color: #A3C9A8;
  transform: scale(1.05);
}

/* Botón de advertencia */
.btn-warning {
  background-color: #b62927;
  color: white;
}

.btn-warning:hover {
  background-color: #9c3433;
  transform: scale(1.05);
}

/* Botón de eliminación */
.btn-danger {
  background-color: #853c43;
  color: white;
}

.btn-danger:hover {
  background-color: #432330;
  transform: scale(1.05);
}
</style>
