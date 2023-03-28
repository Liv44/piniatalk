<script setup lang="ts">
import { onBeforeMount, ref, watch, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useChannelStore } from "../store/channelStore";
import { useMessageStore } from "../store/messageStore";
import PanelChannels from "../components/Layout/SideBar.vue";
import Header from "../components/Layout/Header.vue";
import Messages from "../components/Messages.vue";

const channelStore = useChannelStore();
const messageStore = useMessageStore();

const route = useRoute();
const router = useRouter();
const channelId = ref();
const loaded = ref(false);
const loadedMessage = ref(false);

const channelExist = () => {
  if (!channelStore.channelExist(parseInt(route.params.id as string))) {
    router.push({
      name: "not-found",
    });
  }
};



onBeforeMount(async () => {
    loadedMessage.value = false;
    await channelStore.initialize().then(async () => {
        if (parseInt(route.params.id as string)) {
            channelExist();
            channelStore.setSelectedChannel(
                parseInt(route.params.id as string)
            );
            
            await messageStore.initialize(route.params.id as string).then(()=> {
              loaded.value = true;
              loadedMessage.value = true;
            });
        } else {
            router.push({
                name: "channel",
                params: { id: channelStore.channels[0].id },
            });
        }
    });
});

watch(route, async () => {
    loadedMessage.value = false;
    if (channelId) {
        channelExist();
        channelStore.setSelectedChannel(parseInt(route.params.id as string));
        await messageStore.initialize(route.params.id as string).then(
            () => {
              loaded.value = true;
              loadedMessage.value = true;
            }
        );
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
        <Messages :loaded="loadedMessage"/>
        <PanelChannels />
    </div>
</template>

<style scoped>
.all-page {
    color: white;
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-template-rows: 15vh 75vh;
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
    grid-area: main;
}
</style>
