<script setup lang="ts">
import Chat from "./AddMessage.vue";
import { useMessageStore } from '../store/messageStore';
import ItemMessage from './ItemMessage.vue';
import { ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useChannelStore } from "../store/channelStore";

defineProps<{
    loaded: boolean;
}>();
const messageStore = useMessageStore();
const channelStore = useChannelStore();

const route = useRoute();
const token = sessionStorage.getItem("token");

const setOldMessages = ()=> {
    messageStore.loadOldMessages(channelStore.selectedChannel.id.toString());
}

/* new connection to websocket to get data */
let ws = new WebSocket(
    `wss://edu.tardigrade.land/msg/ws/channel/${channelStore.selectedChannel.id}/token/${token}`
);

const launchWebSocket = ()=> {
    ws.close();
    ws = new WebSocket(
        `wss://edu.tardigrade.land/msg/ws/channel/${channelStore.selectedChannel.id}/token/${token}`
    );
    ws.onopen = () => {
        console.log("Connected to websocket");
    };
    ws.onmessage = (event) => {
        /* convert response to object */
        const data = JSON.parse(event.data);
        messageStore.addNewMessage(data);
    };
}

launchWebSocket();

watch(route, ()=> {
   launchWebSocket();
})

</script>

<template>
    <div class="messages">
        <div v-if="messageStore.messages && messageStore.messages.length > 0" class="chat">
            <ItemMessage
            v-for="message in messageStore.messages"
            :key="message.timestamp"
            :message="message"
            />
            <button class="old-messages" @click="setOldMessages" v-if="messageStore.messages.length%40===0">Voir d'anciens messages</button>
            <p v-else class="starting-message">Début de la conversation</p>
        </div>
        <div class="gif-calm" v-else-if="loaded">
            <img src="https://media.tenor.com/AO_8lGJkvI0AAAAd/calme-jamel.gif" alt="gif c'est trop calme">
            <p>Fais le premier pas... envoie un message !</p>
        </div>
        <Chat></Chat>
    </div>
</template>
<style scoped>

.starting-message{
    text-align: center;
    font-style: italic;
    color: #a0a0a0;
}
.chat{
    display: flex;
    flex-direction: column-reverse;
    overflow: scroll;
    gap: 1em;
    max-height:500px;
}
.messages {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    width: 100%;
    gap:1rem;
    margin:0;
    padding: 0.5rem;
}

.gif-calm{
    margin:0 auto;
}

.old-messages{

}

</style>