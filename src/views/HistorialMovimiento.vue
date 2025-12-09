<template>
  <div class="historial-container">
    <h1>Historial de Movimientos</h1>

    <!-- Filtrar por cliente -->
    <div class="filtro-container">
      <label for="clienteSelect">Seleccionar cliente:</label>
      <select id="clienteSelect" v-model="clienteSeleccionado">
        <option disabled value="">Seleccione un cliente</option>
        <option
          v-for="cliente in clientesOrdenados"
          :key="cliente.id"
          :value="cliente.id"
        >
          {{ cliente.nombre }} ({{ cliente.email }})
        </option>
      </select>

      <button
        class="btn btn-info"
        @click="filtrarTransacciones"
        :disabled="!clienteSeleccionado"
      >
        Filtrar
      </button>

      <button
        class="btn btn-warning"
        @click="cargarTransacciones"
        v-if="clienteSeleccionado"
      >
        Ver todos
      </button>
    </div>

    <div v-if="transacciones.length === 0" class="no-movimientos">
      No se encontraron movimientos registrados
    </div>

    <div class="table-wrapper" v-else>
      <table class="table">
        <thead>
          <tr>
            <th>#</th>
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
          <tr v-for="(t, index) in transaccionesOrdenadas" :key="t.id">
            <td>{{ index + 1 }}</td>
            <td>{{ t.clienteNombre }}</td>
            <td>{{ t.clienteEmail }}</td>
            <td>{{ t.cryptoCode }}</td>
            <td>{{ t.action }}</td>
            <td>{{ t.cryptoAmount }}</td>
            <td>${{ Number(t.money).toFixed(2) }}</td>
            <td>{{ formatFecha(t.dateTime) }}</td>

            <td class="acciones">
              <button
                class="btn btn-info"
                @click="() => router.push(`/transaccion/detalle/${t.id}`)"
              >
                Detalle
              </button>

              <button
                class="btn btn-warning"
                @click="() => router.push(`/transaccion/editar/${t.id}`)"
              >
                Editar
              </button>

              <button
                class="btn btn-danger"
                @click="eliminarTransaccion(t.id)"
              >
                Eliminar
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

const router = useRouter();

const transacciones = ref([]);
const clientes = ref([]);
const clienteSeleccionado = ref("");

// Se cargan todass las transacciones
const cargarTransacciones = async () => {
  try {
    const res = await axios.get('/api/transaccion');
    transacciones.value = res.data;
  } catch (err) {
    console.error("Error cargando transacciones:", err);
  }
};

// Se cargan los clientes
const cargarClientes = async () => {
  try {
    const res = await axios.get('/api/cliente');
    clientes.value = res.data;
  } catch (err) {
    console.error("Error cargando clientes:", err);
  }
};

// Filtra por cliente
const filtrarTransacciones = async () => {
  try {
    const res = await axios.get(`/api/transaccion/cliente/${clienteSeleccionado.value}`);
    transacciones.value = res.data;
  } catch (err) {
    console.error("Error filtrando transacciones:", err);
  }
};

// Eliminar transacción
const eliminarTransaccion = async (id) => {
  if (!confirm("¿Seguro que desea eliminar esta transacción?")) return;

  try {
    await axios.delete(`/api/transaccion/${id}`);
    transacciones.value = transacciones.value.filter(t => t.id !== id);
  } catch (err) {
    console.error("Error eliminando transacción:", err);
  }
};

// Ordenar
const clientesOrdenados = computed(() =>
  [...clientes.value].sort((a, b) =>
    (a.nombre || "").localeCompare(b.nombre || "")
  )
);

const transaccionesOrdenadas = computed(() =>
  [...transacciones.value].sort((a, b) =>
    (a.clienteNombre || "").localeCompare(b.clienteNombre || "")
  )
);

const formatFecha = (fechaIso) =>
  new Date(fechaIso).toLocaleString("es-AR");

onMounted(() => {
  cargarClientes();
  cargarTransacciones();
});
</script>

<style scoped>
.historial-container {
  max-width: 950px;
  margin: 40px auto;
  padding: 20px;
  background: #fff;
  border-radius: 10px;
  font-family: Arial, sans-serif;
}

h1 {
  text-align: center;
  font-size: 2.5rem;
  margin-bottom: 20px;
}

.filtro-container {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: center;
  margin-bottom: 20px;
}

.filtro-container label {
  font-weight: 600;
  margin-right: 5px;
}

.filtro-container select {
  padding: 6px 10px;
  border-radius: 6px;
  border: 1px solid #ccc;
}

.filtro-container .btn {
  padding: 6px 12px;
  border-radius: 6px;
  border: none;
  cursor: pointer;
  font-weight: 600;
}

.table-wrapper {
  overflow-x: auto;
}

.table {
  width: 100%;
  border-collapse: collapse;
  text-align: center;
}

.table th, .table td {
  padding: 10px;
  border: 1px solid #ccc;
}

.table th {
  background: #853c43;
  color: #fff;
}

.table tbody tr:nth-child(even) {
  background: #f4f4f4;
}

.acciones button {
  margin: 2px;
  font-size: 0.9rem;
  padding: 5px 8px;
  border-radius: 6px;
  border: none;
  cursor: pointer;
}

.btn-info {
  background: #395A4F;
  color: #fff;
}

.btn-info:hover {
  background: #A3C9A8;
}

.btn-warning {
  background: #b62927;
  color: #fff;
}

.btn-warning:hover {
  background: #9c3433;
}

.btn-danger {
  background: #853c43;
  color: #fff;
}

.btn-danger:hover {
  background: #432330;
}

.no-movimientos {
  text-align: center;
  color: #555;
  font-size: 1.2rem;
}
</style>
