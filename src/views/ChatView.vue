<script setup lang="ts">
import Chat from "../components/chat.vue";
</script>
<template>
  <div class="chat">
    <Chat></Chat>
  </div>
</template>

<style>
.chat {
  display: flex;
  flex-direction: column;
  border: 5px solid red;
  width: 1000px;
  height: 1000px;
}
@media (min-width: 1024px) {
  .chat {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
