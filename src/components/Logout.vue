<script setup lang="ts">
import router from "../router";

const onClickLogout = () => {
    sessionStorage.clear();
    router.push("/");
};
</script>

<template>
    <button @click="onClickLogout">Déconnexion</button>
</template>
