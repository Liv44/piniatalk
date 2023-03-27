import { createRouter, createWebHistory } from "vue-router";
import PanelChannelsVue from "../components/PanelChannels.vue";
import HomeView from "../views/HomeView.vue";
import CreateChannelApp from "../views/CreateChannelApp.vue";
import ChannelVue from "../components/Channel.vue";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/",
            name: "home",
            component: HomeView,
        },
        {
            path: "/piniatalk",
            name: "piniatalk",
            component: () => import("../views/AboutView.vue"),
        },
        {
            path: "/create",
            name: "create",
            component: CreateChannelApp,
        },
        {

            path: "/channel-panel",
            name: "channel-panel",
            component: PanelChannelsVue,
        },
        {
            path: "/channel/:id?",
            name: "channel",
            component: ChannelVue,
        }
    ],
});

export default router;
