<template>
  <div class="p-8 max-w-lg mx-auto">
    <h2 class="text-4xl font-semibold mb-6">Nueva Transacción</h2>

    <form @submit.prevent="submitTransaccion" class="space-y-4">
      <div>
        <label for="cliente" class="block mb-1 font-medium">Cliente</label>
        <select id="cliente" v-model="form.clienteId" required class="w-full border rounded p-2">
          <option value="" disabled>Seleccione un cliente</option>
          <option v-for="cliente in clientes" :key="cliente.id" :value="cliente.id">
            {{ cliente.name }} - {{ cliente.email }}
          </option>
        </select>
      </div>

      <div>
        <label for="crypto" class="block mb-1 font-medium">Criptomoneda</label>
        <select id="crypto" v-model="form.cryptoCode" required class="w-full border rounded p-2">
          <option value="" disabled>Seleccione una criptomoneda</option>
          <option v-for="cripto in criptomonedas" :key="cripto" :value="cripto">{{ cripto.toUpperCase() }}</option>
        </select>
      </div>

      <div>
        <label for="action" class="block mb-1 font-medium">Acción</label>
        <select id="action" v-model="form.action" required class="w-full border rounded p-2">
          <option value="" disabled>Seleccione acción</option>
          <option value="purchase">Compra</option>
          <option value="sale">Venta</option>
        </select>
      </div>

      <div>
        <label for="cantidad" class="block mb-1 font-medium">Cantidad</label>
        <input
          type="number"
          step="0.00001"
          id="cantidad"
          v-model.number="form.cryptoAmount"
          min="0.00001"
          required
          placeholder="Ingrese una cantidad"
          class="w-full border rounded p-2"
        />
      </div>

      <div>
        <label for="fecha" class="block mb-1 font-medium">Fecha y Hora</label>
        <input
          type="datetime-local"
          id="fecha"
          v-model="form.dateTime"
          required
          class="w-full border rounded p-2"
        />
      </div>

      <button
        type="submit"
        class="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        :disabled="loading"
      >
        {{ loading ? "Guardando..." : "Guardar Transacción" }}
      </button>

      <p v-if="error" class="text-red-600 mt-2">{{ error }}</p>
      <p v-if="success" class="text-green-600 mt-2">Transacción guardada con éxito!</p>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";

const clientes = ref([]);
const criptomonedas = ["btc", "eth", "ltc"];

const form = ref({
  clienteId: "",
  cryptoCode: "",
  action: "",
  cryptoAmount: null,
  dateTime: "",
});

const loading = ref(false);
const error = ref("");
const success = ref(false);

onMounted(async () => {
  try {
    const res = await axios.get("/api/cliente");
    clientes.value = res.data;
  } catch (err) {
    console.error(err);
    error.value = "No se pudo cargar la lista de clientes.";
  }
});

// Ajustar fecha y hora
function formatoFechaISO(dateTimeLocal) {
  if (!dateTimeLocal) return null;
  // dateTimeLocal en formato "YYYY-MM-DDTHH:mm"
  const fecha = new Date(dateTimeLocal);
  return fecha.toISOString();
}

async function submitTransaccion() {
  error.value = "";
  success.value = false;

  // Validación
  if (!form.value.clienteId || !form.value.cryptoCode || !form.value.action || !form.value.cryptoAmount || !form.value.dateTime) {
    error.value = "Complete todos los campos.";
    return;
  }

  if (form.value.cryptoAmount <= 0) {
    error.value = "La cantidad debe ser mayor a 0.";
    return;
  }

  loading.value = true;

  try {
    const dto = {
      clienteId: form.value.clienteId,
      cryptoCode: form.value.cryptoCode,
      action: form.value.action,
      cryptoAmount: form.value.cryptoAmount,
      dateTime: formatoFechaISO(form.value.dateTime),
    };

    await axios.post("/api/transaccion", dto);

    success.value = true;

    form.value.clienteId = "";
    form.value.cryptoCode = "";
    form.value.action = "";
    form.value.cryptoAmount = null;
    form.value.dateTime = "";

  } catch (e) {
    if (e.response && e.response.data) {
      error.value = e.response.data;
    } else {
      error.value = "Error al guardar la transacción.";
    }
  } finally {
    loading.value = false;
  }
}
</script>

<style scoped>
/* Contenedor principal */
.container {
  text-align: center;
  padding: 2rem;
  border-radius: 10px;
  max-width: 600px;
  margin: 0 auto;
  background: #fff; /* card blanco */
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

/* Título */
h2 {
  font-size: 2rem;
  margin-bottom: 1.5rem;
  color: #000;
  font-weight: 600;
}

/* Labels */
label {
  font-size: 1rem;
  display: block;
  margin-top: 10px;
  font-weight: 500;
  color: #333;
}

/* Inputs y select */
input,
select {
  font-size: 1rem;
  width: 100%;
  padding: 8px;
  margin-top: 4px;
  border-radius: 6px;
  border: 1px solid #ccc;
  transition: border-color 0.3s ease;
}

input:focus,
select:focus {
  outline: none;
  border-color: #853C43; /* color de foco consistente con botón */
}

/* Botón */
button {
  font-size: 1rem;
  width: 100%;
  padding: 10px;
  margin-top: 10px;
  border-radius: 8px;
  border: none;
  background: #853C43;
  color: white;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
}

button:hover {
  background: #f25c5e;
  transform: scale(1.02);
}

/* Mensajes */
p {
  margin-top: 8px;
  font-weight: 600;
}

p.text-red-600 {
  color: #e74c3c;
}

p.text-green-600 {
  color: #27ae60;
}
</style>
