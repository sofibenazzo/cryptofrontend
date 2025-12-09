<template>
  <div class="container">
    <h2>Detalle de Transacción</h2>

    <div v-if="transaccion" class="detalle-card">
      <p><strong>Cliente:</strong> {{ transaccion.clientName }} ({{ transaccion.clientEmail }})</p>
      <p><strong>Criptomoneda:</strong> {{ transaccion.cryptoCode }}</p>

      <p>
        <strong>Acción:</strong>
        {{ transaccion.action === 'buy' ? 'Compra' : 'Venta' }}
      </p>

      <p><strong>Cantidad:</strong> {{ transaccion.cryptoAmount }}</p>
      <p><strong>Monto ARS:</strong> ${{ Number(transaccion.money).toFixed(2) }}</p>
      <p><strong>Fecha:</strong> {{ formatFecha(transaccion.dateTime) }}</p>
    </div>

    <button class="btn-volver" @click="$router.back()">Volver</button>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import axios from "axios";

const route = useRoute();
const transaccion = ref(null);

const cargarTransaccion = async () => {
  try {
    const res = await axios.get(`/api/transaccion/${route.params.id}`);
    transaccion.value = res.data;
  } catch (err) {
    console.error("Error cargando transacción:", err);
  }
};

const formatFecha = (fechaIso) => {
  if (!fechaIso) return "";
  return new Date(fechaIso).toLocaleString("es-AR");
};

onMounted(() => {
  cargarTransaccion();
});
</script>


<style scoped>
.container {
  max-width: 500px;
  margin: 40px auto;
  background: #fff;
  padding: 20px;
  border-radius: 10px;
  text-align: center;
}

h2 {
  font-size: 2rem;
  margin-bottom: 20px;
}

.detalle-card p {
  font-size: 1.1rem;
  margin: 8px 0;
}

.btn-volver {
  margin-top: 20px;
  background: #853c43;
  color: #fff;
  padding: 8px 20px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
}

.btn-volver:hover {
  background: #f25c5e;
}
</style>
