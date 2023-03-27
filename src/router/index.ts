import { createRouter, createWebHistory } from "vue-router";
import PanelChannelsVue from "../components/PanelChannels.vue";
import HomeView from "../views/HomeView.vue";
import CreateChannelApp from "../views/CreateChannelApp.vue";
import ChannelVue from "../components/Channel.vue";
import ManageChannelApp from "../views/ManageChannelApp.vue";
import DeleteChannelApp from "../views/DeleteChannelApp.vue";
import TokenExpirationApp from "../views/TokenExpirationApp.vue";
import NotFound from "../views/NotFoundView.vue";

const isAuthenticated = async () => {
  const isAuthenticated = sessionStorage.getItem('token')
    if (!isAuthenticated && window.location.pathname !== 'home' ){
        window.location.href = 'home'
    }
}

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/home",
            name: "home",
            component: HomeView,
        },
        {
            path: "/piniatalk",
            name: "piniatalk",
            component: () => import("../views/AboutView.vue"),
            beforeEnter: isAuthenticated
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
            
        },
        {
            path: "/manage",
            name: "manage",
            component: ManageChannelApp,
        },
        {
            path: "/delete",
            name: "delete",
            component: DeleteChannelApp ,
        },
        {
            path: "/token",
            name: "token",
            component: TokenExpirationApp ,
        },
        {
            path: "/:pathMatch(.*)*",
            name: "not-found",
            component: NotFound,
        }
        
    ],
});

export default router;
