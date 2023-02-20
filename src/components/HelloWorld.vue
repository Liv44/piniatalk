<script setup lang="ts">
import { ref } from "vue";
import { postLogin } from "../CRUD/generic";

import { RouterLink } from "vue-router";

const count = ref(0);
const test = () => {
  postLogin("login");
  alert("Oui");
};
</script>

<template>
  <div class="card">
    <button type="button" @click="test">Click me</button>
  </div>
  <RouterLink to="/test" tag="button">Go Home</RouterLink>
  <br />
  <RouterLink to="/chat" tag="button">Go to chat</RouterLink>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
