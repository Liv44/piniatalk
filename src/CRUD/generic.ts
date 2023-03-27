import axios from "axios";

const baseURL = "https://edu.tardigrade.land/msg/";


const extendSession = async (token: string) => {
    try {
        await axios.post(
            `${baseURL}/protected/extend_session`,
            {},
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            }
        ).then((response) => {
            sessionStorage.setItem("token", response.data.token);
        })
    } catch (err) {
        console.error(err);
    }
}

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
                    sessionStorage.setItem("username", username);

                    //here 10497.6 equals to 2 hours and 55 minutes.
                    setTimeout(async () => {
                        await extendSession(token);
                    }, 10497.6)
                },
                (error) => {
                    console.log(error);
                }
            );
    } catch (error) {
        console.log(error);
    }
};


export const logout = () => {
    sessionStorage.removeItem("token");
};
