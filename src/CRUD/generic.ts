import axios from "axios";

const baseURL = "https://edu.tardigrade.land/msg/";

export const postLogin = (
    endPoint: string,
    username: string,
    password: string
) => {
    try {
        return axios
            .post(
                baseURL + endPoint,
                {
                    username: username,
                    password: password,
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
