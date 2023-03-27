<script setup lang="ts">
import { ref } from "vue";
import { banUserToChannel } from "../CRUD/channel";
const isClicked = ref(false);

defineProps({
  username: String,
});

const click = () => {
  isClicked.value = !isClicked.value;
};

// add channel id from store
const banUser = async (channelID: number, userID: string) => {
  await banUserToChannel(channelID, userID);
};
</script>

<template>
  {{ username }}
  <button @click="click" v-if="!isClicked" class="buttonMore">
    <img src="../assets/icon-plus.png" />
  </button>
  <div v-else>
    <!-- Add @click=banUser with good args -->
    <button class="banButton">Bannir</button>
  </div>
</template>

<style scoped>
.buttonMore {
  background-color: #ffe46b;
  border: none;
  color: #ffffff;
  font-size: 1rem;
  margin-left: 3rem;
  height: 1rem;
}

.banButton {
  background-color: #dc3131;
  border-radius: 10px;
  color: #ffffff;
  font-size: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 1rem;
  width: 5rem;
}
</style>
