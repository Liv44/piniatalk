<script setup lang="ts"></script>

<template>
  <div class="manageChannel">
    <h2>Gérer les utilisateurs</h2>
    <hr />
    <div class="scrollableList">
      <ul class="listUser">
        <li>
          User 1
          <!-- <button class="buttonMore">
            <img src="../assets/iconMore.png" />
          </button> -->
        </li>
        <li>User 2</li>
        <li>User 3</li>
        <li>User 4</li>
        <li>User 5</li>
      </ul>
    </div>
    <hr />
    <label for="addUser">Ajouter un utilisateur</label>
    <input class="inputAddUser" type="text" name="addUser" />
    <button class="buttonAdd">+</button>
  </div>
</template>

<style scoped>
h2 {
  font-size: 1.5rem;
  color: #353030;
  text-align: center;
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
