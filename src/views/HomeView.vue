<template>
  <div class="inicio-wrapper">
    <div class="overlay">
      <div class="form-card container text-white text-center">

        <!-- Botones -->
        <div class="botones-container">
          <RouterLink to="/alta-cliente" class="text-decoration-none boton-link">
          <button class="boton-personalizado btn-rojo-oscuro">👥 Alta Cliente</button>
          </RouterLink>
          <RouterLink to="/nueva-transaccion" class="text-decoration-none boton-link">
            <button class="boton-personalizado btn-rojo-oscuro">➕ Nueva Transacción </button>
          </RouterLink>
          <RouterLink to="/historial-movimiento" class="text-decoration-none boton-link">
            <button class="boton-personalizado btn-rojo-coral">📊 Ver Historial</button>
          </RouterLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    irALogin() {
      this.$router.push('/login');
    }
  }
};
</script>

<style scoped>
.inicio-wrapper {
  background: url("@/assets/Crypto.jpg") center center / cover no-repeat;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.overlay {
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.75);
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Botones */
.botones-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1.5rem;
  width: 300px;
}

.boton-link {
  width: 100%;
  text-align: center;
}

.boton-personalizado {
  width: 100%;
  padding: 1rem 0;
  font-size: 1.3rem;
  font-weight: 600;
  border-radius: 30px;
  border: none;
}

/* Colores personalizados */
.btn-rojo-oscuro {
  background-color: #9c3433;
  color: white;
}

.btn-rojo-oscuro:hover {
  background-color: #e46866;
}

.btn-rojo-coral {
  background-color: #9c3433;
  color: white;
}

.btn-rojo-coral:hover {
  background-color: #e46866; 
}
</style>
