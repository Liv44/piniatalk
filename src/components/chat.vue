<script setup lang="ts">
import { ref, reactive } from "vue";
import { addMessage } from "../CRUD/message";

const message = ref("");
const author = ref("Luke");
const timestamp = ref(Math.floor(new Date().getTime() / 1000));

const createMessage = async () => {
  // await addMessage(timestamp, message.value, author);
  console.log(timestamp.value);
  console.log(message.value);
  console.log(author.value);
};
</script>

<template>
  <div class="block_chat">
    <div class="message">
      {{ message }}
    </div>
    <input
      class="input"
      type="text"
      v-model="message"
      required
      placeholder="Message...."
    />
    <button @click="createMessage">Send</button>
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
