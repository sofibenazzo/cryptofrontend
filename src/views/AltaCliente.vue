<template>
  <div class="p-6 max-w-md mx-auto bg-white rounded-xl shadow-md space-y-4">
    <h2 class="text-2xl font-bold">Alta de Cliente</h2>

    <form @submit.prevent="crearCliente">
      <div>
        <label class="block text-sm font-medium">Nombre</label>
        <input v-model="cliente.name" type="text" class="mt-1 block w-full border rounded p-2" required />
      </div>

      <div>
        <label class="block text-sm font-medium">Email</label>
        <input v-model="cliente.email" type="email" class="mt-1 block w-full border rounded p-2" required />
      </div>

      <button type="submit" class="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
        Guardar
      </button>

      <p v-if="mensaje" class="mt-2 text-green-600 font-semibold">{{ mensaje }}</p>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'

const cliente = ref({
  name: '',
  email: ''
})

const mensaje = ref('')

const crearCliente = async () => {
  try {
    await axios.post('https://localhost:7298/api/cliente', cliente.value)
    mensaje.value = 'Cliente creado con éxito'
    cliente.value = { Name: '', Email: '' }
  } catch (error) {
    console.error('Error:', error)
    if (error.response) {
      console.log('Respuesta del backend:', error.response)
      mensaje.value = `Error: ${error.response.data}`
    } else if (error.request) {
      mensaje.value = 'Error: No hubo respuesta del servidor'
    } else {
      mensaje.value = `Error: ${error.message}`
    }
  }
}

</script>

<style scoped>
/* Estilos en general */
div.p-6 {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: #f4f4f4;
  font-family: Arial, sans-serif;
  padding: 2rem;
}

/* Contenedor del formulario */
div.p-6 > div {
  background: white;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgb(0 0 0 / 0);
  max-width: 320px;
  width: 100%;
  padding: 2rem 2.5rem;
  text-align: center;
}

/* Título */
h2 {
  font-size: 2.2rem;
  margin-bottom: 1.5rem;
  color: #000;
}

/* Labels */
label {
  font-size: 1.25rem;
  display: block;
  text-align: left;
  margin-bottom: 0.4rem;
  color: #000000;
  font-weight: 600;
}

/* Inputs */
input[type="text"],
input[type="email"] {
  width: 100%;
  padding: 8px 10px;
  border-radius: 6px;
  font-size: 1rem;
  margin-bottom: 1.2rem;
  transition: border-color 0.3s ease;
}

input[type="text"]:focus,
input[type="email"]:focus {
  outline: none;
}

/* Botón */
button {
  background-color: #853c43;
  color: rgb(255, 255, 255);
  font-size: 1.1rem;
  padding: 10px 0;
  width: 100%;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #f25c5e;
}

/* Mensaje */
p[mensaje] {
  margin-top: 1rem;
  color: #3a7d44;
  font-weight: 600;
  font-size: 1rem;
  text-align: center;
}
</style>
