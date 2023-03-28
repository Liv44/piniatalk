<script setup lang="ts">
import { computed, ref } from "vue";
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
  <div v-if="!isUserAdmin && isUserConnectedAdmin">
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
