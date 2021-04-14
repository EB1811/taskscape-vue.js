import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import store from "../store";

function lazyLoad(view: any) {
    return () => import(`@/views/${view}.vue`);
}

const routes: Array<RouteRecordRaw> = [
    {
        path: "/",
        name: "Home",
        component: lazyLoad("Home"),
    },
    {
        path: "/dashboard",
        name: "Dashboard",
        component: lazyLoad("Dashboard"),
        meta: {
            requiresAuth: true,
        },
    },
    {
        path: "/create",
        name: "Create",
        component: lazyLoad("Create"),
        meta: {
            requiresAuth: true,
        },
    },
    {
        path: "/player",
        name: "Player",
        component: lazyLoad("Player"),
        meta: {
            requiresAuth: true,
        },
    },
    {
        path: "/quests",
        name: "Quests",
        component: lazyLoad("Quests"),
        meta: {
            requiresAuth: true,
        },
    },
    {
        path: "/tasks",
        name: "Tasks",
        component: lazyLoad("Tasks"),
        meta: {
            requiresAuth: true,
        },
    },
    {
        path: "/login",
        name: "Login",
        component: lazyLoad("LoginPage"),
        meta: {
            hideForAuth: true,
        },
    },
    {
        path: "/register",
        name: "Register",
        component: lazyLoad("RegisterPage"),
        meta: {
            hideForAuth: true,
        },
    },
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

const authUser = () => {
    return new Promise((resolve) => {
        if (store.state.user.loggedIn === null) {
            const unwatch = store.watch(
                () => store.state.user.loggedIn,
                (value) => {
                    unwatch();
                    resolve(value);
                }
            );
        } else {
            resolve(store.state.user.loggedIn);
        }
    });
};

router.beforeEach(async (to, from, next) => {
    const loggedIn = await authUser();
    if (to.matched.some((record) => record.meta.requiresAuth) && !loggedIn) {
        next({ path: "/login" });
    } else if (
        to.matched.some((record) => record.meta.hideForAuth) &&
        loggedIn
    ) {
        next({ path: "/dashboard" });
    } else {
        next();
    }
});

export default router;
