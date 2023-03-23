import { defineStore } from 'pinia'

export const useMessageStore = defineStore("messages", {
    state: () => { 
    
        return {
            name: "luke",
            // for initially empty lists
            userList: [] as UserInfo[],
            // for data that is not yet loaded
            user: null as UserInfo | null,
        }
    },
    getters: {
        displayName: (state) => state.name,
        displayNameList : (state) => state.userList
    },
    actions: {
    },
});

interface UserInfo {
    name: string
    age: number
  }