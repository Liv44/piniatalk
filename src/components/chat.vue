<script setup lang="ts"></script>
<template>
  <div class="top_chat">
    <div class="channel_name">Salon n°1</div>
    <button>Gérer les utilisateurs</button>
    <button>Paramètres du salon</button>
  </div>
  <div class="block_chat">
    <h3>Chat</h3>
    <input class="input" type="text" placeholder="Message...." />
    <button>Send</button>
  </div>
</template>

<style>
.channel_name {
  background-color: #ffe46b;
  width: 200px;
  padding: 10px;
  border-radius: 10px;
  color: black;
}

.block_chat {
  background-color: #c9c9c9;
  width: 100%;
  height: auto;
}

.input {
  width: 80%;
  background-color: #070606;
  height: 20px;
}
</style>
