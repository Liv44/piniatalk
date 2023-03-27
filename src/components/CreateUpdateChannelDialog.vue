<script setup lang="ts">
import { onUpdated, ref, watch } from "vue";
import { createChannel, updateChannel } from "../CRUD/channel";
import { themes } from "../utils/themes";
import { useChannelStore } from "../store/channelStore";
import { ChannelType } from "../store/channelStore";
import { GDialog } from "gitart-vue-dialog";
import DeleteChannel from "./DeleteChannel.vue";

const props = defineProps({
  isUpdating: Boolean,
});

const channelStore = useChannelStore();
const channelName = ref(
  props.isUpdating ? channelStore.selectedChannel.name : ""
);
const channelImage = ref(
  props.isUpdating ? channelStore.selectedChannel.img : ""
);
const channelColors = ref(
  props.isUpdating ? channelStore.selectedChannel.theme : themes[0]
);
const openDeleteDialog = ref(false);

watch(channelStore, () => {
  if (props.isUpdating) {
    channelName.value = channelStore.selectedChannel.name;
    channelImage.value = channelStore.selectedChannel.img;
    channelColors.value = channelStore.selectedChannel.theme;
  }
});

const emit = defineEmits(["close-dialog"]);

const create = async () => {
  await createChannel(
    channelName.value!,
    channelImage.value,
    channelColors.value
  ).then((res) => {
    channelStore.addChannel({
      creator: sessionStorage.getItem("username")!,
      name: channelName.value,
      img: channelImage.value,
      theme: channelColors.value,
      id: res,
      users: [sessionStorage.getItem("username")!],
    });

    channelName.value = "";
    channelImage.value = "";
    channelColors.value = themes[0];
  });
  emit("close-dialog");
};

const update = async () => {
  await updateChannel(
    channelStore.selectedChannel.id,
    channelName.value,
    channelImage.value
  );
  channelStore.updateChannel({
    creator: channelStore.selectedChannel.creator,
    name: channelName.value,
    img: channelImage.value,
    theme: channelColors.value,
    id: channelStore.selectedChannel.id,
    users: channelStore.selectedChannel.users,
  });

  emit("close-dialog");
};
</script>

<template>
  <div class="createChannel">
    <h1>{{ isUpdating ? "Modifier le salon" : "Créer un salon" }}</h1>
    <label for="channelName">Nom du salon</label>
    <input
      type="text"
      name="channelName"
      class="inputChannel"
      required
      :placeholder="isUpdating ? '' : 'Nom du salon'"
      v-model="channelName"
    />
    <label for="theme">Thème du salon</label>
    <select class="inputChannel" name="theme" :v-model="channelColors">
      <option v-for="(data, index) of themes" :value="data" :key="index">
        {{ data.name }}
      </option>
    </select>

    <label for="channelPicture">Image du salon</label>
    <input
      type="text"
      name="channelPicture"
      class="inputChannel"
      required
      :placeholder="isUpdating ? '' : 'Image du salon'"
      v-model="channelImage"
    />
    <div class="buttons">
      <button
        class="delete"
        v-if="isUpdating"
        @click="() => (openDeleteDialog = true)"
      >
        Supprimer
      </button>
      <button class="create" v-if="isUpdating" @click="update">Modifier</button>
      <button class="create" v-else @click="create">Créer</button>
    </div>
    <GDialog v-model="openDeleteDialog">
      <DeleteChannel
        @close-dialog="() => (openDeleteDialog = false)"
        @close-all-dialogs="
          () => {
            openDeleteDialog = false;
            emit('close-dialog');
          }
        "
      >
      </DeleteChannel>
    </GDialog>
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
