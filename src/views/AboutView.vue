<script setup lang="ts">
import { watchEffect } from "vue";
import router from "../router";

const token = sessionStorage.getItem("token");

const onClickClear = () => {
    sessionStorage.clear();
    router.push("/");
};
</script>

<template>
    <div class="about">
        <h1>{{ !token ? "Not loggin" : "Successful login" }}</h1>
        <button @click="onClickClear">Logout</button>
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
