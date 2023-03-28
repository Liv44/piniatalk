export interface ThemesTypes {
    name: string;
    colors: {
        primary_color: string;
        primary_color_dark: string;
        accent_color: string;
        text_color: string;
        accent_text_color: string;
    };
}

export interface ChannelType {
    id: number,
    name: string,
    img: string,
    creator: string,
    theme: ThemesTypes,
    users: string[]
}

export interface MessageType {
    channel_id: number;
    author: string;
    content: {
        Text?: string;
        Image?: string;
    };
    timestamp: number;
}