<script setup lang="ts">
import { ref, watchEffect } from "vue";
import { useRoute } from "vue-router";
import { getMessages } from "../CRUD/channel";

const route = useRoute();
const id = route.params.id;
const token = sessionStorage.getItem("token");
const message = ref([{ channel_id: "", content: { Text: "" }, author: "" }]);

/* new connection to websocket to get data */
const ws = new WebSocket(
    `wss://edu.tardigrade.land/msg/ws/channel/${id}/token/${token}`
);
/* try to connect  */
ws.onopen = () => {
    console.log("Connected to websocket");
};

/* receive message from websocket */
const update = () => {
    ws.onmessage = (event) => {
        /* convert response to object */
        const data = JSON.parse(event.data);
        const array = [];
        array.push(data);
        console.log(array);
        const messages = array.map((msg: any) => {
            return {
                channel_id: msg.channel_id,
                content: {
                    Text: msg.content.Text,
                },
                author: msg.author,
            };
        });
        message.value = messages;
    };
};

/* update the front when we receive a message from websocket */
watchEffect(() => {
    update();
});
</script>

<template>
    <!-- display message -->
    <div class="message">
        <div v-for="msg in message" :key="msg.channel_id">
            <p>{{ msg.content.Text }}</p>
        </div>
    </div>
</template>

<style scoped></style>
