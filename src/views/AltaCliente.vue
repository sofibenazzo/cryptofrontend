<template>
  <div class="dashboard-container">
    <header class="dashboard-header">
    </header>

    <div class="form-card">
      <h2>Alta de Cliente</h2>

      <form @submit.prevent="crearCliente">
        <div class="form-group">
          <label>Nombre</label>
          <input v-model="cliente.name" type="text" required />
        </div>

        <div class="form-group">
          <label>Email</label>
          <input v-model="cliente.email" type="email" required />
        </div>

        <button type="submit">Guardar</button>

        <p v-if="mensaje" class="mensaje">{{ mensaje }}</p>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'

const cliente = ref({ name: '', email: '' })
const mensaje = ref('')

const crearCliente = async () => {
  try {
    await axios.post('https://localhost:7298/api/cliente', cliente.value)
    mensaje.value = 'El cliente fue creado con éxito'
    cliente.value = { name: '', email: '' }
  } catch (error) {
    console.error('Error:', error)
    if (error.response) {
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
.dashboard-container {
  min-height: 100vh;
  background: #f4f6f8;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  font-family: Arial, sans-serif;
}

.dashboard-header h1 {
  font-size: 2rem;
  margin-bottom: 2rem;
  color: #333;
}

.form-card {
  background: #fff;
  padding: 2rem 2.5rem;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  width: 100%;
  max-width: 400px;
  text-align: center;
}

h2 {
  font-size: 1.8rem;
  margin-bottom: 1.5rem;
  color: #333;
}

.form-group {
  margin-bottom: 1.2rem;
  text-align: left;
}

label {
  font-weight: 600;
  margin-bottom: 0.3rem;
  display: block;
}

input[type="text"],
input[type="email"] {
  width: 100%;
  padding: 10px;
  border-radius: 6px;
  border: 1px solid #ccc;
  font-size: 1rem;
}

input[type="text"]:focus,
input[type="email"]:focus {
  border-color: #3b82f6;
  outline: none;
}

button {
  background-color: #3b82f6;
  color: #fff;
  font-size: 1.1rem;
  padding: 10px 0;
  width: 100%;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #2563eb;
}

.mensaje {
  margin-top: 1rem;
  font-weight: 600;
  color: #16a34a;
}
</style>
