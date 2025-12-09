<template>
  <div class="container">
    <h2>Editar Transacción</h2>

    <form @submit.prevent="submitTransaccion" class="form-edit">

      <div>
        <label>Cliente</label>
        <input type="text" :value="clienteNombre" disabled />
      </div>

      <div>
        <label>Criptomoneda</label>
        <select v-model="transaccion.cryptoCode" required>
          <option v-for="cripto in criptomonedas" :key="cripto" :value="cripto">
            {{ cripto.toUpperCase() }}
          </option>
        </select>
      </div>

      <div>
        <label>Acción</label>
        <select v-model="transaccion.action" required>
          <option value="purchase">Compra</option>
          <option value="sale">Venta</option>
        </select>
      </div>

      <div>
        <label>Cantidad</label>
        <input type="number" step="0.00001" v-model.number="transaccion.cryptoAmount" min="0.00001" required />
      </div>

      <div>
        <label>Fecha y Hora</label>
        <input type="datetime-local" v-model="fechaLocal" required />
      </div>

      <button type="submit" class="btn-guardar" :disabled="loading">
        {{ loading ? "Guardando..." : "Guardar Cambios" }}
      </button>

      <p v-if="error" class="error-msg">{{ error }}</p>
      <p v-if="success" class="success-msg">La transaccion fue actualizada con éxito</p>

    </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import axios from "axios";

const route = useRoute();
const router = useRouter();

const transaccion = ref({
  cryptoCode: "",
  action: "",
  cryptoAmount: 0,
  clienteId: null,
  dateTime: ""
});

const clienteNombre = ref("");

const criptomonedas = ["btc", "eth", "ltc"];
const fechaLocal = ref("");

const loading = ref(false);
const error = ref("");
const success = ref(false);

// Convertir ISO a datetime-local
const isoToLocal = iso => {
  const dt = new Date(iso);
  return dt.toISOString().slice(0, 16);
};

// Convertir local → ISO
const localToISO = local => new Date(local).toISOString();

const cargarTransaccion = async () => {
  try {
    const res = await axios.get(`/api/Transaccion/${route.params.id}`);

    transaccion.value = {
      cryptoCode: res.data.cryptoCode,
      action: res.data.action,
      cryptoAmount: res.data.cryptoAmount,
      clienteId: res.data.clienteId,
      dateTime: res.data.dateTime
    };

    clienteNombre.value = res.data.clienteNombre; 
    fechaLocal.value = isoToLocal(res.data.dateTime);

  } catch (e) {
    error.value = "No se pudo cargar la transacción.";
  }
};

const submitTransaccion = async () => {
  error.value = "";
  success.value = false;

  loading.value = true;

  try {
    const dto = {
      cryptoCode: transaccion.value.cryptoCode,
      action: transaccion.value.action,
      cryptoAmount: transaccion.value.cryptoAmount,
      clienteId: transaccion.value.clienteId, // OBLIGATORIO
      dateTime: localToISO(fechaLocal.value)
    };

    await axios.put(`/api/Transaccion/${route.params.id}`, dto);

    success.value = true;
    setTimeout(() => router.push("/historial-movimiento"), 1200);

  } catch (e) {
    error.value = "Error al actualizar la transacción.";
  }

  loading.value = false;
};

onMounted(cargarTransaccion);
</script>

<style scoped>
.container {
  max-width: 500px;
  margin: 40px auto;
  background: #fff;
  padding: 20px;
  border-radius: 10px;
}

h2 {
  text-align: center;
  font-size: 2rem;
  margin-bottom: 20px;
}

.form-edit div {
  margin-bottom: 15px;
}

label {
  display: block;
  font-weight: 600;
  margin-bottom: 5px;
}

input, select {
  width: 100%;
  padding: 6px 10px;
  border-radius: 6px;
  border: 1px solid #ccc;
}

.btn-guardar {
  width: 100%;
  padding: 10px;
  border: none;
  border-radius: 8px;
  background: #853c43;
  color: white;
  font-weight: 600;
  cursor: pointer;
}

.btn-guardar:hover {
  background: #f25c5e;
}

.error-msg {
  color: red;
  margin-top: 8px;
}

.success-msg {
  color: green;
  margin-top: 8px;
  font-weight: 600;
}
</style>
