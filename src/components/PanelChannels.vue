<script setup lang="ts">
import { computed, ref } from 'vue';
import { useChannelStore } from "../store/channelStore";
import {ChannelType} from "../store/channelStore";
import ItemPannel from './ItemPannel.vue';
import CreateChannelDialog from './CreateUpdateChannelDialog.vue';
import { GDialog } from 'gitart-vue-dialog';

const channelStore = useChannelStore();
const username = sessionStorage.getItem('username');
const ownChannels = computed(() => channelStore.channels.filter((channel: ChannelType) => {
    return channel.creator === sessionStorage.getItem('username');
}));
const otherChannels = computed(() => channelStore.channels.filter((channel: ChannelType) => {
    return channel.creator !== sessionStorage.getItem('username');
}));

const openCreateDialog = ref(false);

</script>

<template>
    <div class="pannel">
        <h2>{{username?.toUpperCase()}}</h2>
        <div class="channel-lists">
            <h3 class="channel-title">Mes salons</h3>
            <div class="list">
                <ItemPannel :channel="channel" v-for="channel in ownChannels"/>
            </div>
            <button class="add-channel" @click="()=>openCreateDialog=true">+ Ajouter un salon</button>

            <h3 class="channel-title">Autres salons</h3>

            <div class="list">
                <ItemPannel :channel="channel" v-for="channel in otherChannels"/>
            </div>
        </div>
        <RouterLink to="/logout">Déconnexion</RouterLink>
        <GDialog v-model="openCreateDialog">
            <CreateChannelDialog :isUpdating="false" @close-dialog="()=>openCreateDialog=false"/>
        </GDialog>
    </div>
</template>

<style scoped>
@import 'https://cdn.jsdelivr.net/npm/gitart-vue-dialog@1.2.1/dist/style.css';
.list{
    display: flex;
    flex-direction: column;
    overflow: scroll;
    max-height:220px;
}
.pannel {
    width:250px;
    height:100%;
    padding: 1em;
    background-color: #353030;
    color: white;
}

.pannel>h2 {
    margin:0;
    font-size: 2em;
    font-weight: 700;
    text-align: center;
    color: #FFE46B;
    padding: 20px;
}

.channel-title {
    color:#8A8A8A;
    font-weight: 300;
}

.channel-lists {
    text-align: left;
    display: flex;
    flex-direction: column;
}

.add-channel {
    background-color: transparent;
    text-align: center;
    font-style: italic;
    color: #FFE46B;
    font-weight: 300;
    cursor: pointer;
    margin: 0;
    padding: 0;
    font-size: 1em;
}



</style>