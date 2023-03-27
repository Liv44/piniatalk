<script setup lang="ts">
import { computed, ref } from "vue";
import { banUserToChannel } from "../CRUD/channel";
import { useChannelStore } from "../store/channelStore";

const channelStore = useChannelStore();

const props = defineProps({
  username: String,
});

const isAdmin = computed(() => {
  return channelStore.selectedChannel.creator === props.username;
});

const banUser = async () => {
  await banUserToChannel(channelStore.selectedChannel.id, props.username!).then(
    () => {
      channelStore.banUserToChannel(
        channelStore.selectedChannel.id,
        props.username!
      );
    }
  );
};
</script>

<template>
  {{ username }}
  {{ isAdmin ? "(admin)" : "" }}
  <div v-if="!isAdmin">
    <button class="banButton" @click="banUser">Bannir</button>
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
