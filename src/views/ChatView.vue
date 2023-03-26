<script setup lang="ts">
import Chat from "../components/Chat.vue";
</script>

<template>
  <!-- <div class="top_chat">
    <ul>
      <li style="float: left">
        <a class="channel_name">Salon n°1</a>
      </li>
      <li style="float: right"><a>Gérer les utilisateurs</a></li>
      <li style="float: right"><a>Paramètres du salon</a></li>
    </ul>
  </div> -->
  <div class="chat">
    <Chat></Chat>
  </div>
</template>

<style scoped>
ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
}

li {
  display: inline;
}

li a {
  display: block;
  color: white;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
}

.channel_name {
  background-color: #ffe46b;
  width: 200px;
  padding: 10px;
  border-radius: 10px;
  color: black;
}

body {
  overflow: hidden;
}

@media (min-width: 1024px) {
  .chat {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
