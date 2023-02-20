import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import CreateChannel from "../views/CreateChannel.vue";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/",
            name: "home",
            component: HomeView,
        },
        {
            path: "/test",
            name: "test",
            component: () => import("../views/AboutView.vue"),
        },
        {
            path: "/create",
            name: "create",
            component: CreateChannel,
        },
        
    ],
});

export default router;
