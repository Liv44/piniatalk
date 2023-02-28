import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

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
    ],
});

export default router;
