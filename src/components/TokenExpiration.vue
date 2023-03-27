<script setup lang="ts"></script>

<template>
  <div class="tokenExpiration">
    <h3>Votre session va expiré</h3>
    <h3>Voulez vous la prolongez ?</h3>
    <div class="buttonExtend">
      <!-- @click pour étendre la session -->
      <button class="extendSession">Prolonger</button>
    </div>
  </div>
</template>

<style scoped>
.tokenExpiration {
  background-color: #ffe46b;
  border: 8px solid #7ae18b;
  border-radius: 10px;
  padding: 2rem;
  width: 30rem;
}

h3 {
  font-size: 1.5rem;
  font-weight: normal;
  color: #353030;
  text-align: center;
  margin-top: 0;
}

.buttonExtend {
  display: flex;
  justify-content: center;
}

.extendSession {
  color: white;
  height: 3rem;
  border-radius: 10px;
  border: #ffffff;
  width: 10rem;
  font-size: 1rem;
  font-weight: bold;
  margin-top: 1rem;
  background-color: #51a256;
  /* align-items: center; */
}
</style>
