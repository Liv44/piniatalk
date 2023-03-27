<script setup lang="ts">
import { ref, reactive } from "vue";
import { useMessageStore } from "../CRUD/message";
import { storeToRefs } from "pinia";
import { useRoute } from "vue-router";

const route = useRoute();
const id = route.params.id;
const store = useMessageStore();
const { messageList } = storeToRefs(store);
const { addMessage } = store;

const message = ref("");
const timestamp = ref(new Date());
const author = ref("Luke");

const image = ref("");
const inputFile = ref(null);

const onChange = (event: Event) => {
    const input = event.target as HTMLInputElement;
    const file = input.files![0];
    image.value = URL.createObjectURL(file);
};

const add = async () => {
    const image = (inputFile.value as unknown as HTMLInputElement).value;
    if (message.value && !image) {
        addMessage(id.toString(), { type: "text", data: message.value });
        message.value = "";
    } else if (image && !message.value) {
        addMessage(id.toString(), { type: "file", data: image });
        (inputFile.value as unknown as HTMLInputElement).value = "";
    } else {
        alert("Entrez soit du texte, soit une image.");
        console.log("Entrez soit du texte, soit une image.");
        (inputFile.value as unknown as HTMLInputElement).value = "";
        message.value = "";
    }
};
</script>

<template>
    <div class="block_chat">
        <div class="message">
            <div
                class="message-list"
                v-for="(messages, index) of messageList"
                :key="index"
            >
                <div class="message-content">
                    <div class="message-header">
                        <div class="user-img">
                            <img src="../assets/luke3.JPG" />
                        </div>
                        <!-- <h4 class="username">{{ messages.author }}</h4> -->
                        <!-- <span class="timestamp">{{
              new Date(messages.timestamp * 1000)
            }}</span> -->
                    </div>
                    <p class="chat-message" v-if="messages.text">
                        {{ messages.text }}
                    </p>
                    <img
                        v-if="messages.image"
                        :src="messages.image"
                        style="height: auto; width: auto; max-height: 300px"
                    />
                    <!-- {{ messages.channel_id }} -->
                </div>
            </div>
        </div>
        <div class="chat-input">
            <label for="file-input">
                <i
                    class="bi bi-plus-circle"
                    style="font-size: 1.5rem; color: white; margin-right: 10px"
                >
                    <input
                        type="file"
                        ref="inputFile"
                        id="file-input"
                        accept="image/*"
                        style="display: none"
                        @change="onChange"
                    />
                </i>
            </label>
            <input
                class="input"
                type="text"
                v-model="message"
                required
                placeholder="Message...."
            />
            <button @click="add">Send</button>
        </div>
    </div>
</template>

<style>
.block_chat {
    position: fixed;
    background-color: #c9c9c9;
    top: 100px;
    margin: auto;
    height: 750px;
    overflow: auto;
    border-radius: 10px;
    padding: 10px;
}

/* User image */
.user-img {
    margin-right: 10px;
}

.user-img img {
    border-radius: 50%;
    height: 50px;
    width: 50px;
}

/* Message list*/
.message {
    overflow-y: scroll;
}

.message-list {
    display: flex;
    margin-bottom: 10px;
    padding: 10px;
}

/* Message Content */
.message-content {
    display: flex;
    flex-direction: column;
}

/* Message Header */
.message-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 5px;
}

.message-header .username {
    color: #353030;
    font-weight: bold;
    margin-right: 10px;
}

.message-header .timestamp {
    color: #8a8a8a;
}

/* Message Text */
.chat-message {
    color: black;
    margin: 0;
}

/* Chat Input */
.chat-input {
    position: fixed;
    bottom: 0;
    left: 300px;
    right: 0;
    width: auto;
    align-items: center;
    padding: 10px;
    background-color: #353030;
    border-radius: 10px;
}

.chat-input input[type="text"] {
    border: none;
    border-radius: 10px;
    padding: 10px;
    margin-right: 10px;
    width: 90%;
}

.chat-input button {
    background-color: #ffe46b;
    color: black;
    border: none;
    border-radius: 10px;
    padding: 8px;
}

.chat-input input[type="file"] {
    border: none;
    width: 16px;
    height: 16px;
}
</style>
