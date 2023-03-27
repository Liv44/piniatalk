<script setup lang="ts">
import { onBeforeMount, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useChannelStore } from "../store/channelStore";
import PanelChannels from "./PanelChannels.vue";
import Header from "./Header.vue";

const channelStore = useChannelStore();
const route = useRoute();
const router = useRouter();
const channelId = ref();
const loaded = ref(false);

onBeforeMount(async () => {
  await channelStore.initialize().then(() => {
    if (parseInt(route.params.id as string)) {
      channelStore.setSelectedChannel(parseInt(route.params.id as string));
      loaded.value = true;
    } else {
      router.push({
        name: "channel",
        params: { id: channelStore.channels[0].id },
      });
    }
  });
});

watch(route, () => {
  if (channelId) {
    channelStore.setSelectedChannel(parseInt(route.params.id as string));
    loaded.value = true;
  } else {
    router.push({
      name: "channel",
      params: { id: channelStore.channels[0].id },
    });
  }
});
</script>

<template>
  <div class="all-page" v-if="loaded">
    <Header />
    <div class="messages"></div>
    <PanelChannels />
  </div>
</template>

<style scoped>
.all-page {
  color: white;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 100%;
  grid-template-areas:
    "header header header sidebar"
    "main main main sidebar";
}

.header {
  grid-area: header;
}
.pannel {
  grid-area: sidebar;
}
.messages {
  height: 100%;
  width: auto;
  grid-area: main;
}
</style>
