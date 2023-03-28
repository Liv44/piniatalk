import { defineStore } from "pinia";

import { getMessages } from "../CRUD/channel";
import { MessageType } from "../utils/types";

export const useMessageStore = defineStore("message", {
    state: () => ({
        messages: [] as MessageType[],
    }),
    actions: {
        async initialize(channelId: string) {
            this.messages = [];
            const dbMessage = await getMessages(channelId, 0);
            this.messages = dbMessage;
            this.messages = this.messages.sort((m1: MessageType, m2: MessageType) => m2.timestamp - m1.timestamp)
        },
        addNewMessage(message: MessageType) {
            this.messages.push(message);
            this.messages = this.messages.sort((m1: MessageType, m2: MessageType) => m2.timestamp - m1.timestamp)
        },
        async loadOldMessages(channelId: string) {
            const newMessages = await getMessages(channelId, this.messages.length);
            this.messages.push(...newMessages);
            this.messages = this.messages.sort((m1: MessageType, m2: MessageType) => m2.timestamp - m1.timestamp)
        },
        updateMessage(message: MessageType) {
            const index = this.messages.findIndex((m) => m.timestamp === message.timestamp);
            this.messages[index] = message;
        }
    },
});
