<script setup lang="ts">
import { ref } from "vue";
import { useChannelStore } from "../store/channelStore";
import { addMessage } from "../CRUD/message";

const channelStore = useChannelStore();

const message = ref("");



const add = async () => {
  if(message.value){
    const image = new Image();
    image.src = message.value;
  
    image.addEventListener('load', async () => {
      await addMessage(channelStore.selectedChannel.id.toString(), { type: "file", data: message.value }).then(() => {
        message.value = "";
      })
    });
    image.addEventListener('error', async () => {
      await addMessage(channelStore.selectedChannel.id.toString(), { type: "text", data: message.value }).then(() => {
        message.value = "";
      })
    });
  }

};
</script>

<template>
  <div class="chat-input">
      <input
        class="input"
        type="text"
        v-model="message"
        autofocus
        required
        placeholder="Message ou URL de l'image...."
        @keyup.enter="add"
      />
      <button @click="add" type="submit">Send</button>
  </div>
</template>

<style scoped>
/* Chat Input */
.chat-input {
  display: flex;
  flex-direction: row;
  width: auto;
  align-items: center;
  padding: 10px;
  background-color: #353030;
  border-radius: 10px;
}

.chat-input input[type="text"] {
  border: none;
  border-radius: 10px;
  padding: 10px;
  margin-right: 10px;
  width: 90%;
}

.chat-input button {
  background-color: #ffe46b;
  color: black;
  border: none;
  border-radius: 10px;
  padding: 8px;
}

.chat-input input[type="file"] {
  border: none;
  width: 16px;
  height: 16px;
}
</style>
