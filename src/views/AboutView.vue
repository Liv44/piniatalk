<script setup lang="ts">
import { watchEffect } from "vue";
import Logout from "../components/Logout.vue";
import router from "../router";

const token = sessionStorage.getItem("token");
</script>

<template>
    <div class="about">
        <h1>{{ !token ? "Not loggin" : "Successful login" }}</h1>
        <Logout />
    </div>
</template>

<style>
.about {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: white;
}
</style>
