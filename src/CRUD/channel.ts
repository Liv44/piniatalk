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
