import { createRouter, createWebHistory } from "vue-router";
import ChannelVue from "../views/HomeView.vue";
import NotFound from "../views/NotFoundView.vue";
import LoginVue from "../views/LoginView.vue";

const isAuthenticated = async () => {
    const isAuthenticated = sessionStorage.getItem("token");
    if (!isAuthenticated && window.location.pathname !== "/login") {
        window.location.href = "/login";
    }
};

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/",
            redirect: "/channel",
        },
        {
            path: "/login",
            name: "login",
            component: LoginVue,
        },
        {
            path: "/channel/:id?",
            name: "channel",
            component: ChannelVue,
            beforeEnter: isAuthenticated,
        },
        {
            path: "/:pathMatch(.*)*",
            name: "not-found",
            component: NotFound,
        },
    ],
});

export default router;
