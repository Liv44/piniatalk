import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/HomeView.vue";
import NotFound from "../views/NotFoundView.vue";
import Login from "../views/LoginView.vue";
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
            component: Login,
        },
        {
            path: "/channel/:id?",
            name: "channel",
            component: Home,
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
