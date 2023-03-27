<script setup lang="ts">
import { ref } from "vue";
import ItemUser from "./ItemUser.vue";
import { addUserToChannel } from "../../../CRUD/channel";
import { useChannelStore } from "../../../store/channelStore";

const userToAdd = ref("");
const channelStore = useChannelStore();

const addUser = async () => {
  await addUserToChannel(channelStore.selectedChannel.id, userToAdd.value).then(
    () => {
      channelStore.addUserToChannel(
        channelStore.selectedChannel.id,
        userToAdd.value
      );
      userToAdd.value = "";
    }
  );
};
</script>

<template>
  <div class="manageChannel">
    <h2>Gérer les utilisateurs</h2>
    <hr />
    <div class="scrollableList">
      <ul class="listUser">
        <li v-for="data in channelStore.selectedChannel.users">
          <ItemUser :username="data" />
        </li>
      </ul>
    </div>
    <hr />
    <label for="addUser">Ajouter un utilisateur</label>
    <input
      class="inputAddUser"
      v-model="userToAdd"
      type="text"
      name="addUser"
    />
    <button class="buttonAdd" @click="addUser">+</button>
  </div>
</template>

<style scoped>
h2 {
  font-size: 1.5rem;
  color: #353030;
  text-align: center;
  margin-top: 0;
}
.manageChannel {
  background-color: #ffe46b;
  border: 8px solid #7ae18b;
  border-radius: 10px;
  padding: 2rem;
}

.listUser {
  color: #353030;
  font-size: 1.5rem;
  margin-top: 0;
  padding-left: 0;
}

.listUser li {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

label {
  color: #353030;
  font-size: 1rem;
  margin-right: 1rem;
}

.inputAddUser {
  background-color: #ffffff;
  color: black;
  height: 2rem;
  border-radius: 10px;
  border: #ffffff;
  margin-right: 2rem;
}

.buttonAdd {
  background-color: #ffc93e;
  color: #ffffff;
  font-size: 1rem;
}

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

/* Hide scrollbar for firefox */
.scrollableList {
  height: 10rem;
  overflow-y: scroll;
  scrollbar-width: none;
}

/* Hide scrollbar for Chrome, Safari and Opera */
.scrollableList::-webkit-scrollbar {
  display: none;
}
</style>
