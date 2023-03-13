import axios from "axios";

const baseURL = "https://edu.tardigrade.land/msg";

export const createChannel = async (name: string, img: string) => {
    const response = await axios.put(`${baseURL}/protected/channel`, {
        name,
        img,
    }, {
        headers: {
            "Content-Type": "application/json",
        },
    })
    return response.data;
}