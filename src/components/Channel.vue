<script setup lang="ts">
import { onBeforeMount, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useChannelStore } from "../store/channelStore";
import PanelChannels from "./PanelChannels.vue";
import Header from "./Header.vue";
import Chat from "./Chat.vue";
import { useMessageStore } from "../store/messageStore";

const channelStore = useChannelStore();
const messageStore = useMessageStore();
console.log("channel store", messageStore.messages);

const route = useRoute();
const router = useRouter();
const channelId = ref();
const loaded = ref(false);

onBeforeMount(async () => {
    await channelStore.initialize().then(async () => {
        if (parseInt(route.params.id as string)) {
            channelStore.setSelectedChannel(
                parseInt(route.params.id as string)
            );
            console.log("channel id", route.params.id);
            await messageStore.initialize(route.params.id as string);
            loaded.value = true;
        } else {
            router.push({
                name: "channel",
                params: { id: channelStore.channels[0].id },
            });
        }
    });
});

watch(route, async () => {
    if (channelId) {
        channelStore.setSelectedChannel(parseInt(route.params.id as string));
        await messageStore.initialize(route.params.id as string);
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
        <div class="messages">
            <p v-for="message in messageStore.messages">
                {{ message.content }}
            </p>
            <Chat> </Chat>
        </div>
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
