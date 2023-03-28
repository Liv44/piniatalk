<script setup lang="ts">
import { deleteChannel } from "../../../CRUD/channel";
import { useChannelStore } from "../../../store/channelStore";
import { useRouter } from "vue-router";

const channelStore = useChannelStore();
const router = useRouter();

const emit = defineEmits(["close-dialog", "close-all-dialogs"]);

const deleteOneChannel = async () => {
  await deleteChannel(channelStore.selectedChannel.id).then(() => {
    channelStore.deleteChannel(channelStore.selectedChannel.id);
    router.push({
      name: "channel",
      params: { id: channelStore.channels[0].id },
    });
    emit("close-all-dialogs");
  });
};
</script>

<template>
  <div class="deleteChannel">
    <h3>Voulez vous vraiment supprimer ce salon ?</h3>
    <h3>Cette action est définitive.</h3>
    <div class="buttons">
      <button class="cancel" @click="() => emit('close-dialog')">
        Annuler
      </button>
      <button class="delete" @click="deleteOneChannel">Supprimer</button>
    </div>
  </div>
</template>

<style scoped>
h3 {
  font-size: 1.5rem;
  font-weight: normal;
  color: #353030;
  text-align: center;
  margin-top: 0;
}
.deleteChannel {
  background-color: #ffe46b;
  border: 8px solid #7ae18b;
  border-radius: 10px;
  padding: 2rem;
  width: 30rem;
}

.buttons {
  display: flex;
  justify-content: center;
  gap: 2rem;
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

.delete {
  background-color: #dc3131;
}

.cancel {
  background-color: #51a256;
}
</style>
