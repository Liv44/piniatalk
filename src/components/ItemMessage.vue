<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import {updateMessage} from '../CRUD/message';
import { useChannelStore } from '../store/channelStore';
import { useMessageStore } from '../store/messageStore';
import { MessageType } from '../utils/types';
const props = defineProps<{
    message: MessageType;
}>();

const channelStore = useChannelStore();
const messageStore = useMessageStore();

const authorNameArray = props.message.author.split('.');
const authorName = (authorNameArray[0]+authorNameArray[1][0]).toUpperCase();

const usernameConnected = sessionStorage.getItem('username');

const messageDate = computed(()=> {
    const date = new Date(props.message.timestamp);
    const today = new Date();
    let tempDate = "";
    if(date.getDay() === today.getDay()){
        tempDate += "Aujourd'hui";
    }else if(date.getDay() === today.getDay()-1){
        tempDate += "Hier";
    }else{
        tempDate += date.toLocaleDateString('fr-FR');
    }
    tempDate += " - " + date.getHours() + "h" + String(date.getMinutes()).padStart(2, '0');
    return tempDate;
})

const hover = ref(false);
const updating = ref(false);

const updatedMessage = ref(props.message.content.Image ? props.message.content.Image : props.message.content.Text);

const escapeEditMessage = () => {
    updating.value=false;
    updatedMessage.value = props.message.content.Image ? props.message.content.Image : props.message.content.Text;
}

const handleUpdateMessage = async () => {

    const newMessage = {
        ...props.message,
    }
    if(props.message.content.Image){
        newMessage.content.Image = updatedMessage.value;
    }else{
        newMessage.content.Text = updatedMessage.value;
    }
    await updateMessage(newMessage).then(() => {
        messageStore.updateMessage(props.message);
        updating.value = false;
    })
}

</script>

<template>
    <div :class="'message ' + (message.author === usernameConnected ? 'ownMessage':'')" v-if="message"  @mouseenter="()=>hover = true" @mouseleave="()=>hover = false">
        <p class="author-icon">{{ authorName }}</p>
        <div class="message-block">
            <p class="head-message">
                <span class="author-name">{{ message.author }}</span> | {{ messageDate }}
            </p>
            <div v-if="message.content.Text && !updating">
                <p> {{ message.content.Text }}</p>
            </div>
            <div v-else-if="message.content.Image && !updating">
                <img :src="message.content.Image" />
            </div>
            <div v-if="updating" class="editing-message">
                <input type="text" v-model="updatedMessage" @keyup.enter="handleUpdateMessage" @keyup.esc="escapeEditMessage"/>
                <div>
                    <button @click="handleUpdateMessage">Éditer</button>
                    <button @click="escapeEditMessage">X</button>
                </div>
            </div>
        </div>
        <button class="button-edit-message" v-if="hover && usernameConnected===channelStore.selectedChannel.creator && !updating" @click="()=>updating=true">éditer</button>
        <div v-else class="no-button"></div>
    </div>
</template>
<style scoped>
.head-message{
    display: flex;
    flex-direction: row;
    font-weight: 100;
    font-size: smaller;
    font-style: italic;
}

.editing-message{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
    margin:0;
    padding: 0.5rem;
}
.editing-message>input{
    width: 80%;
}
.button-edit-message{
    width:50px;
    background-color: transparent;
    border: none;
    color: white;
    font-size: small;
    font-weight: 100;
    font-style: italic;
    margin: 0;
    padding: 0;
    text-align: right;
}
.no-button{
    width:50px;
    background-color: transparent;
    border: none;
    color: white;
    font-size: small;
    font-weight: 100;
    font-style: italic;
    margin: 0;
    padding: 0;
    text-align: right;
}
.button-edit-message:hover{
    color: #ffe46b;
    cursor: pointer;
    text-decoration: underline;
}
.head-message>span{
    font-weight: 300;
}

.message-block{
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    margin:0;
    /* padding: 0.5rem; */
}
.message-block img{
    width: 40%;
}
.message-block p{
    margin:0;
    padding:0;
}

.author-icon{
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 10px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: solid 0.2em white;
  font-size:small;
  color:white;
  /* font-weight: 900; */
}
.message {
    margin-right: 1em;
    color:white;
    padding:0.2 rem;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
}

.ownMessage .author-icon{
    background-color: #ffe46b;
    color: #242424;
}
</style>