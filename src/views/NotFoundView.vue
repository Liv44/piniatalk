<script setup lang="ts">
import { useRouter } from "vue-router";

const router = useRouter();
</script>

<template>
  <div class="notFound">
    <img src="../assets/404.png" alt="404" />
    <h3>Pas si VITE ! Vous n'avez pas le droit de VUE sur cette page...</h3>
    <div class="notFoundButton">
      <button @click="() => router.push({ name: 'channel' })">
        Retourner à la page d'accueil
      </button>
    </div>
  </div>
</template>

<style scoped>
h3 {
  display: flex;
  justify-content: center;
  color:white;
}

img {
  display: flex;
  justify-content: center;
  margin-left: 10rem;
}

.notFound {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.notFoundButton {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

button {
  display: flex;
  justify-content: center;
  margin-top: 20px;
  background-color: #f5f5f5;
  border: 1px solid #f5f5f5;
  border-radius: 5px;
  padding: 10px;
  font-size: 1.2rem;
  font-weight: 500;
  color: #000;
  cursor: pointer;
  transition: all 0.3s ease;
}
</style>
