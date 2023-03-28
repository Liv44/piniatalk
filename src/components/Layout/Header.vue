<script setup lang="ts">
import { ref, computed } from "vue";
import { useChannelStore } from "../../store/channelStore";
import CreateChannelDialog from "../Dialogs/channel/CreateUpdateChannelDialog.vue";
import { GDialog } from "gitart-vue-dialog";
import ManageUsersDialog from "../Dialogs/user/ManageUsersDialog.vue";
import { useRoute, useRouter } from "vue-router";

const username = ref(sessionStorage.getItem("username"));
const channelStore = useChannelStore();
const openParamsDialog = ref(false);
const openManageUsersDialog = ref(false);

const isAdmin = computed(() => {
  return channelStore.selectedChannel.creator.includes(username.value!);
});

</script>

<template>
  <div class="header" v-if="channelStore.selectedChannel">
    <div class="title">
      <img
        :src="channelStore.selectedChannel.img"
        v-if="channelStore.selectedChannel.img"
        class="img-channel"
      />
      <p v-else class="img-channel">
        {{ channelStore.selectedChannel.name.substring(0, 3).toUpperCase() }}
      </p>
      <h1>{{ channelStore.selectedChannel.name }}</h1>
    </div>
    <div  class="links">
      <button @click="() => (openManageUsersDialog = true)">
        {{isAdmin ? "Gérer les utilisateurs" : "Utilisateurs"}}
      </button>
      <button @click="() => (openParamsDialog = true)" v-if="isAdmin">
        Paramètres du salon
      </button>
    </div>
    <GDialog v-model="openParamsDialog">
      <CreateChannelDialog
        :isUpdating="true"
        @close-dialog="() => (openParamsDialog = false)"
      />
    </GDialog>
    <GDialog v-model="openManageUsersDialog">
      <ManageUsersDialog></ManageUsersDialog>
    </GDialog>
  </div>
</template>

<style scoped>
.header {
  height: 100px;
  grid-area: header;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #353030;
  padding: 0 1rem;
  border-bottom: 1px solid #36393f;
}

.title {
  display: flex;
  align-items: center;
  gap: 1em;
}

.img-channel {
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  border: solid 0.2em white;
}
p.img-channel {
  font-weight: 900;
}
h1 {
  font-size: 3rem;
  margin: 0;
}

.links {
  display: flex;
  flex-direction: column;
  gap: 0.5em;
  cursor: pointer;
}
</style>
