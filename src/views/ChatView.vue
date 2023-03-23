<script setup lang="ts">
// import { storeToRefs } from "pinia";
import { computed } from "vue";
import Chat from "../components/chat.vue";
import { useMessageStore } from "../store/store";

const store = useMessageStore();
// const { name } = storeToRefs(store)

// ✅ this one will be reactive
// 💡 but you could also just use `store.doubleCount` directly
const messageValue = computed(() => store.displayName);
// const userList = computed(() => store.userList);
</script>
<template>
  <div class="top_chat">
    <ul>
      <li style="float: left">
        <a class="channel_name">Salon n°1</a>
      </li>
      <li style="float: right"><a>Gérer les utilisateurs</a></li>
      <li style="float: right"><a>Paramètres du salon</a></li>
    </ul>
  </div>
  <div class="chat">
    <Chat></Chat>
    <p>{{ messageValue }}</p>
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

.chat {
  display: flex;
  flex-direction: column;
  background-color: #c9c9c9;
  border-radius: 10px;
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
