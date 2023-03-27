import axios from "axios";
import { ThemesTypes } from "../utils/types";

const baseURL = "https://edu.tardigrade.land/msg";

export const createChannel = async (
    name: string,
    img: string,
    theme: ThemesTypes
) => {
    const convertTheme = JSON.parse(JSON.stringify(theme.colors));
    try {
        const response = await axios.put(
                `${baseURL}/protected/channel`,
                {
                    name,
                    img,
                    theme: convertTheme,
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
                    },
                }
        );
        return response.data;
    }catch (e) {
        console.log(e);
    }
    
};

/* Delete a channel */
export const deleteChannel = async (channel_id: number) => {
    try {
        const response = await axios.delete(
            `${baseURL}/protected/channel/${channel_id}`,
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${sessionStorage.getItem("token")}`,
                },
            }
        );
        return response.data;
    }catch (e) {
        console.log(e);
    }
};

/* Add user to channel */
export const addUserToChannel = async (channel_id: number, user_id: string) => {
    
    try {
        const response = await axios.put(
            `${baseURL}/protected/channel/${channel_id}/user/${user_id}`,
            {
            user_id,
            channel_id,
            },
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${sessionStorage.getItem("token")}`,
                },
            }
        );
        return response.data;
    }catch (e) {
        console.log(e);
    }

};

/* Ban a user */
export const banUserToChannel = async (channel_id: number, user_id: string) => {
    try {
        const response = await axios.delete(
        `${baseURL}/protected/channel/${channel_id}/user/${user_id}`,
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${sessionStorage.getItem("token")}`,
                },
            }
        );
        return response.data;
    }catch (e) {
        console.log(e);
    }
};

/* Update name or image to a channel */
export const updateChannel = async (
    channel_id: number,
    name: string,
    img: string,
    theme:  {
        primary_color: string;
        primary_color_dark: string;
        accent_color: string;
        text_color: string;
        accent_text_color: string;
    }
) => {
    try {
        const response = await axios.post(
            `${baseURL}/protected/channel/${channel_id}/update_metadata`,
            {
                name,
                img,
                theme
            },
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${sessionStorage.getItem("token")}`,
                },
            }
        );
        return response.data;
    } catch (e) {
        console.log(e);
    }
};

/* Get channels */
export const getChannels = async () => {
    try {
        const response = await axios.get(`${baseURL}/protected/user/channels`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${sessionStorage.getItem("token")}`,
            },
        });
        return response.data;
    }catch (e) {
        console.log(e);
    }
    
};
