import axios from "axios";
import { ref, reactive } from "vue";
import { defineStore } from "pinia"

const baseURL = "https://edu.tardigrade.land/msg";

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

type MessageContent = {
    type : string;
    data : string;
}

interface Message {
    content?: MessageContent
  }

export const useMessageStore = defineStore("messageList", {
    state : () => ({
        messageList: [] as Message[],
        id: 0,
        error: null
    }),
    actions: {

        /* POST messages*/
        async addMessage(channel_id: number, content?: MessageContent){

            try {
                if ( content?.type === 'text') {
                const response = await axios.post(`${baseURL}/protected/channel/${channel_id}/message`,
                    {
                        "Text": content?.data,
                    },
                    {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
                        },
                    }
                );
                    console.log(response.data);
                    return response.data;

                } else if( content?.type === 'file')  {
                    const response = await axios.post(`${baseURL}/protected/channel/${channel_id}/message`,
                    {
                        "Image": content?.data,
                    },
                    {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
                        },
                    }
                );
                    console.log(response.data);
                    return response.data;
                }  else {
                    console.log('Entrez soit du texte, soit une image.');
                }     
            } catch(error) {
                console.log("Error" + error)
            }
        },

        /* Get all message of channel */
        async getMessages(channel_id: string, numberMessage: number ){
            try {
                return axios.get(baseURL +`/protected/channel/${channel_id}/messages/${numberMessage}`,
                    {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${sessionStorage.getItem(
                                "token"
                            )}`,
                        },
                    }
                ).then((response) => {
                    return response.data;
                });
            } catch (error) {
                console.log(error);
            }
        }
    }  
})

