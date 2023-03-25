import axios from "axios";
import { ThemesTypes } from "../utils/types";

const baseURL = "https://edu.tardigrade.land/msg";

export const createChannel = async (
    name: string,
    img: string,
    theme: ThemesTypes
) => {
    console.log(name, img, theme);
    const convertTheme = JSON.parse(JSON.stringify(theme.colors));
    console.log(convertTheme);
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
};

/* Delete a channel */
export const deleteChannel = async (channel_id: number) => {
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
};

/* Add user to channel */
export const addUserToChannel = async (channel_id: number, user_id: string) => {
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
};

/* Ban a user */
export const banUserToChannel = async (channel_id: number, user_id: string) => {
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
};

/* Update name or image to a channel */
export const updateChannel = async (
    channel_id: number,
    name: string,
    img: string
) => {
    const response = await axios.post(
        `${baseURL}/protected/channel/${channel_id}/update_metadata`,
        {
            name,
            img,
        },
        {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${sessionStorage.getItem("token")}`,
            },
        }
    );
    return response.data;
};

/* Get channels */
export const getChannels = async () => {
    const response = await axios.get(`${baseURL}/protected/user/channels`, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
    });
    return response.data;
};
