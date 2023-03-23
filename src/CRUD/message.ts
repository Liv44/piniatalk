import axios from "axios";

const baseURL = "https://edu.tardigrade.land/msg/";

export const postLogin = (endPoint: string) => {
    try {
        return axios
            .post(
                baseURL + endPoint,
                {
                    username: "e.dumont",
                    password: "5fd6cdd6cced416f",
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            )

    } catch (error) {
        console.log(error);
    }
};

/* Add message*/
// channel_id: number,
// `${baseURL}/protected/channel/${channel_id}/message`
export const addMessage = async (timestamp: number, author: string, content: object) => {
    const response = await axios.post(
        `${baseURL}/protected/message`,
        {
            timestamp,
            author,
            content
        },
        {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        }
    );
    return response.data;
};

/* Get messages*/
export const getMessages = async (channel_id: number, batch_offset: number) => {
    const response = await axios.get(`${baseURL}/protected/channel/${channel_id}/messages/${batch_offset}`, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    });
    return response.data;
};
