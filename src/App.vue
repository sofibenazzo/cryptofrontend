<script setup>
import { RouterView, RouterLink } from 'vue-router'
</script>

<template>
  <div class="layout-wrapper">
    <!-- Header personalizado -->
    <header class="navbar">
      <h1 class="titulo">¡BIENVENIDOS A CRYPTOCARTERA!</h1>
      <h2 class="subtitulo">Gestioná tus transacciones de forma rápida y segura</h2>
      <nav class="nav-links">
        <RouterLink to="/" class="nav-link"> Inicio</RouterLink>
      </nav>
    </header>

    <!-- Contenido  -->
    <main class="contenido">
      <RouterView />
    </main>
  </div>
</template>

<style scoped>
.layout-wrapper {
  min-height: 100vh;
  background: linear-gradient(to bottom right, #395A4F, #A3C9A8);
  color: rgb(0, 0, 0);
  display: flex;
  flex-direction: column;
}

/* Combinación de paletas de colores obtenida del sitio web paletasdecolore.com.ar */
/* Encabezado personalizado */
.navbar {
  background-color: #395A4F;
  padding: 2rem;
  text-align: center;
}

/* Título principal */
.titulo {
  background-color: #395A4F;
  font-size: 3rem;
  font-weight: bold;
}

/* Subtítulo */
.subtitulo {
  font-size: 2rem;
  color: #000000;
  margin-bottom: 1.5rem;
}

/* Estilo de links */
.nav-link {
  font-size: 2rem;
  font-weight: 600;
  color: rgb(255, 255, 255);
  text-decoration: none;
  padding: 0.6rem 1.2rem;
  border-radius: 30px;
  background-color: #432330;
  transition: background-color 0.3s ease, transform 0.2s ease;
}

.nav-link:hover {
  background-color: #853c43;
}

</style>
