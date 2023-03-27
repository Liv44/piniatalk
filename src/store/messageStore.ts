import { defineStore } from "pinia";

import { getMessages } from "../CRUD/channel";
import { ThemesTypes } from "../utils/types";
export interface MessageType {
    channel_id: number;
    author: string;
    content: {
        Text?: string;
        Image?: string;
    };
    timestamp: number;
}
export const useMessageStore = defineStore("message", {
    state: () => ({
        messages: [] as MessageType[],
        test: "test",
    }),
    actions: {
        async initialize(channelId: string) {
            console.log("initialize");
            this.messages = [];
            const dbMessage = await getMessages(channelId, 0);
            console.log(dbMessage);
            this.messages = dbMessage;
        },
    },
});
