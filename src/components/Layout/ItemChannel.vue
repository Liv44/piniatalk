<script lang="ts" setup>
import { useChannelStore } from '../../store/channelStore';
import { useRouter } from 'vue-router';

defineProps(['channel']);

const router = useRouter();
const channelStore = useChannelStore();

</script>

<template>
    <div class="item" 
        :class="channelStore.selectedChannel === channel ? 'selected':''"
        :onclick="()=>router.push({ name: 'channel', params: { id: channel.id }})"
    >
        <img :src="channel.img" v-if="channel.img" class="img-channel-xs"/>
        <p v-else class="img-channel-xs">{{ channel.name.substring(0,3).toUpperCase() }}</p>
        <p class="channel-name">{{ channel.name }}</p>
    </div>
</template>

<style scoped>

.item{
    display: flex;
    align-items: center;
    padding: 3px 15px;
    color: white;
    text-decoration: none;
    font-size: 1em;
    font-weight: 350;
    cursor: pointer;
}

.item>.img-channel-xs{
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin-right: 10px;
}

.img-channel-xs{
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius:50%;
    border: solid 0.2em white;
}
p.img-channel-xs{
    font-weight: 900;
}

.selected {
    background-color: #FFE46B;
    color: #353030;
    font-weight: 900;

}
</style>