<script setup lang="ts">
import { computed, ref } from 'vue';
import { useChannelStore } from "../../store/channelStore";
import { GDialog } from 'gitart-vue-dialog';
import { logout } from '../../CRUD/generic';
import { useRouter } from 'vue-router';
import { ChannelType } from '../../utils/types';
import ItemPannel from './ItemChannel.vue';
import CreateChannelDialog from '../Dialogs/channel/CreateUpdateChannelDialog.vue';

const channelStore = useChannelStore();
const username = sessionStorage.getItem('username');
const ownChannels = computed(() => channelStore.channels.filter((channel: ChannelType) => {
    return channel.creator === sessionStorage.getItem('username');
}));
const otherChannels = computed(() => channelStore.channels.filter((channel: ChannelType) => {
    return channel.creator !== sessionStorage.getItem('username');
}));
const router = useRouter();

const toggleLogout=()=> {
    logout();
    router.push({name: 'login'})
}   

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
        <button @click="toggleLogout">Déconnexion</button>
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
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
    gap: 1em;
    width:250px;
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
    padding: 0 20px;
}

.channel-title {
    color:#8A8A8A;
    font-weight: 300;
    margin:10px;
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