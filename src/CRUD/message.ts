import axios from "axios";
import { ref, reactive } from "vue";
import { defineStore } from "pinia";
import { MessageType } from "../utils/types";

const baseURL = "https://edu.tardigrade.land/msg";

type MessageContent = {
    type: string;
    data: string;
};

export const addMessage = async (channel_id: string, content?: MessageContent) => {
    try {
        if (content?.type === "text") {
            const response = await axios.post(
                `${baseURL}/protected/channel/${channel_id}/message`,
                {
                    Text: content?.data,
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${sessionStorage.getItem(
                            "token"
                        )}`,
                    },
                }
            );
            return response.data;
        } else if (content?.type === "file") {
            const response = await axios.post(
                `${baseURL}/protected/channel/${channel_id}/message`,
                {
                    Image: content?.data,
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${sessionStorage.getItem(
                            "token"
                        )}`,
                    },
                }
            );
            return response.data;
        } else {
            console.log("Entrez soit du texte, soit une image.");
        }
    } catch (error) {
        console.log("Error" + error);
    }
};
export const updateMessage = async (message: MessageType) => {
    try {
        await axios.post(
            `${baseURL}/protected/channel/${message.channel_id}/message/moderate`,
            message,
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${sessionStorage.getItem(
                        "token"
                    )}`,
                },
            }
        );
    } catch (err) {
        console.error(err)
    }
}