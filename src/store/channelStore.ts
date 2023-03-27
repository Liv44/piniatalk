import { defineStore } from "pinia";

import { getChannels } from "../CRUD/channel";
import { ThemesTypes } from "../utils/types";
export interface ChannelType {
    id: number,
    name: string,
    img: string,
    creator: string,
    theme: ThemesTypes,
    users: string[]
}
export const useChannelStore = defineStore('channel', {
    state: () => ({
        channels: [] as ChannelType[],
        selectedChannel: {} as ChannelType,
    }),
    actions: {
        async initialize() {
            this.channels = [];
            const dbChannels = await getChannels();
            this.channels = dbChannels;
        },
        setSelectedChannel(channelId: number) {
            const channelFound = this.channels.find((channel) => { return channel.id === channelId });

            this.selectedChannel = channelFound!;
        },
        addChannel(channel: ChannelType) {
            this.channels.push(channel);
        },
        updateChannel(upChannel: ChannelType) {
            let updatedChannelId = this.channels.findIndex((channel) => { return channel.id === upChannel.id })
            this.channels[updatedChannelId] = upChannel;
            this.selectedChannel = upChannel;

        }, 
        deleteChannel(channelId: number) {
            this.channels = this.channels.filter((channel) => { return channel.id !== channelId });
        },
        addUserToChannel (channelId: number, userId: string) {
            let channelFound = this.channels.find((channel) => { return channel.id === channelId });
            channelFound!.users.push(userId);
            this.updateChannel(channelFound!);
        },
        banUserToChannel (channelId: number, userId: string) {
            let channelFound = this.channels.find((channel) => { return channel.id === channelId });
            channelFound!.users = channelFound!.users.filter((user) => { return user !== userId });
            this.updateChannel(channelFound!);
        }
    }
})