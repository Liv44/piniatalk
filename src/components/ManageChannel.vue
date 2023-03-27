<script setup lang="ts">
import { ref } from "vue";
import UserListComponent from "./UserListComponent.vue";
import { addUserToChannel } from "../CRUD/channel";

const userToAdd = ref("");

const users = [
  {
    id: 1,
    name: "l.teilliais",
  },
  {
    id: 2,
    name: "l.jones",
  },
  {
    id: 3,
    name: "e.dumont",
  },
  {
    id: 4,
    name: "o.moreau",
  },
  {
    id: 5,
    name: "t.bourmaud",
  },
  {
    id: 6,
    name: "a.clavier",
  },
];

// add channel id from store
const addUser = async (channelID: number) => {
  await addUserToChannel(channelID, userToAdd.value);
};
</script>

<template>
  <div class="manageChannel">
    <h2>Gérer les utilisateurs</h2>
    <hr />
    <div class="scrollableList">
      <ul class="listUser">
        <li v-for="data in users">
          <UserListComponent :username="data.name" />
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
    <!-- Add @click=addUser avec les bons args  -->
    <button class="buttonAdd">+</button>
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
  width: 15rem;
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
