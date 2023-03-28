<script setup lang="ts">
import { computed } from "vue";
import { banUserToChannel } from "../../../CRUD/channel";
import { useChannelStore } from "../../../store/channelStore";

const channelStore = useChannelStore();

const props = defineProps({
  username: String,
});

const isUserAdmin = computed(() => {
  return channelStore.selectedChannel.creator === props.username;
});

const isUserConnectedAdmin = computed(()=> {
  return channelStore.selectedChannel.creator.includes(sessionStorage.getItem("username")!);
})

const isJulienLeBoss = computed(() => {
  return props.username === "tiesselune" || props.username === "j.sosthene";
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
  {{ isUserAdmin ? "(admin)" : "" }}
  {{ isJulienLeBoss ? "(le super boss ⚡️)" : "" }}
  <div v-if="!isUserAdmin && isUserConnectedAdmin && !isJulienLeBoss">
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
