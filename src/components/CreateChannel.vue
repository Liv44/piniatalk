<script setup lang="ts"></script>

<template>
  <div class="createChannel">
    <h1>Créer un salon</h1>

    <label for="channelName">Nom du salon</label>
    <input
      type="text"
      name="channelName"
      class="inputChannel"
      required
      placeholder="Nom du salon"
    />

    <label for="theme">Thème du salon</label>
    <select class="inputChannel" name="theme">
      <option value="red">Red</option>
      <option value="yellow">Yellow</option>
      <option value="green">Green</option>
      <option value="black">Black</option>
    </select>

    <label for="channelPicture">Image du salon</label>
    <input
      type="text"
      name="channelPicture"
      class="inputChannel"
      required
      placeholder="Image du salon"
    />
    <div class="button">
      <button class="buttonCreate">Créer</button>
    </div>
  </div>
</template>

<style scoped>
h1 {
  color: #ffffff;
}
.createChannel {
  background-color: #ffe46b;
  border-radius: 10px;
  border: 8px solid #7ae18b;
  padding: 2rem;
  display: flex;
  flex-direction: column;
}

label {
  color: black;
  font-size: 1rem;
  padding-bottom: 0.5rem;
  display: inline-flex;
}

.inputChannel {
  margin-bottom: 1rem;
  background-color: #ffffff;
  color: black;
  height: 3rem;
  border-radius: 10px;
  border: #ffffff;
  padding-left: 0.5rem;
}

.buttonCreate {
  background-color: #51a256;
  color: white;
  height: 3rem;
  border-radius: 10px;
  border: #ffffff;
  width: 10rem;
  font-size: 1rem;
  font-weight: bold;
  margin-top: 1rem;
}

.button {
  display: flex;
  justify-content: center;
}
</style>
