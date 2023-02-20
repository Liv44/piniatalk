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
            .then(
                (response) => {
                    const token = response.data.token;
                    sessionStorage.setItem("token", token);
                },
                (error) => {
                    console.log(error);
                }
            );
    } catch (error) {
        console.log(error);
    }
};
