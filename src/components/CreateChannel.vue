<script setup lang="ts">
import { ref } from "vue";
import { createChannel } from "../CRUD/channel";
import { themes } from "../utils/themes";

defineProps({
  isUpdated: Boolean,
});

const channelName = ref("");
const channeImage = ref("");
const channelColors = ref(themes);

const channel = ref({
  name: "updateChannel",
  image: "singe.png",
  themes: [
    {
      name: "Default",
      colors: {
        primary_color: "#E91E63",
        primary_color_dark: "#C2185B",
        accent_color: "#00BCD4",
        text_color: "#212121",
        accent_text_color: "#FFFFFF",
      },
    },
    {
      name: "Jeff",
      colors: {
        primary_color: "#E91E63",
        primary_color_dark: "#C2185B",
        accent_color: "#00BCD4",
        text_color: "#212121",
        accent_text_color: "#FFFFFF",
      },
    },
  ],
});

const create = async () => {
  await createChannel(channelName.value, channeImage.value);
};
</script>

<template>
  <div class="createChannel">
    <h1>{{ isUpdated ? "Modifier le salon" : "Créer un salon" }}</h1>

    <label for="channelName">Nom du salon</label>
    <input
      type="text"
      name="channelName"
      class="inputChannel"
      required
      :placeholder="isUpdated ? channel.name : 'Nom du salon'"
      v-model="channelName"
    />

    <label for="theme">Thème du salon</label>
    <select class="inputChannel" name="theme">
      <option
        v-for="(data, index) of channel.themes.map((theme) => theme.name)"
        :value="data"
      >
        {{ data }}
      </option>
    </select>

    <label for="channelPicture">Image du salon</label>
    <input
      type="text"
      name="channelPicture"
      class="inputChannel"
      required
      placeholder="Image du salon"
      v-model="channeImage"
    />
    <div class="buttons">
      <button class="delete" v-if="isUpdated">Supprimer</button>
      <button class="create" @click="create">Créer</button>
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

button {
  color: white;
  height: 3rem;
  border-radius: 10px;
  border: #ffffff;
  width: 10rem;
  font-size: 1rem;
  font-weight: bold;
  margin-top: 1rem;
}
.create {
  background-color: rgb(81, 162, 86);
}
.delete {
  background-color: rgb(220, 49, 49);
}

.buttons {
  display: flex;
  justify-content: center;
  gap: 1rem;
}
</style>
