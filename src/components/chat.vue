<script setup lang="ts">
import { defineStore } from "pinia";
</script>

<template>
  <div class="block_chat">
    <input class="input" type="text" placeholder="Message...." />
    <button>Send</button>
  </div>
</template>

<style>
.block_chat {
  width: 100%;
  height: auto;
}

.input {
  width: 80%;
  background-color: #070606;
  height: 100%;
  border: none;
  border-radius: 10px;
}
</style>
