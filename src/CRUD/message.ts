import axios from "axios";

const baseURL = "https://edu.tardigrade.land/msg";

/* Get list of 40 messages */
export const getMessages = async(channel_id: number, batch_offset: number) => {
    const response = await axios.get(`${baseURL}/protected/channel/${channel_id}/messages/${batch_offset}`, 
    {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    })
    return response.data;
}

/* Create a message */
export const createMessage = async(channel_id: number, text: string, img: string) => {
    const response = await axios.post(`${baseURL}/protected/channel/${channel_id}/message`, 
        {
            text,
            img,
        },
        {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        }
    )
    return response.data;   
}

/* Update message */
export const updateMessage = async(channel_id: number, timestamp: number, author : string, content: {text: string, img: string}) => {
    const response = await axios.post(`${baseURL}/protected/channel/${channel_id}/message/moderate`, {
        channel_id,
        timestamp,
        author,
        content,
    }, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    })
    return response.data;
}


/* WebSocket URL */
export const getWebSocketURL = async(channel_id : number, token : string) => {
    const response = await axios.get(`${baseURL}/ws/channel/${channel_id}/token/${token}`)
    return response.data;
}