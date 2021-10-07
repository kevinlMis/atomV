import Vue from "vue";
import Router from "vue-router";
Vue.use(Router);

/* Layout */
import Layout from "@/layout";

export const constantRoutes = [
  {
    path: "/",
    component: Layout,
    redirect: "/project",
    hidden: true
  },
  {
    path: "/index",
    name: "index",
    component: Layout,
    redirect: "/home",
    hidden: true,
    meta: { title: "content", icon: "index-icon" },
    children: [{
      path: "/home",
      name: "home",
      component: () => import("@/views/home/index"),
      meta: { title: "", icon: "home-icon" }
    }
    ]
  },
  {
    path: "/login",
    component: () => import("@/views/login/index"),
    hidden: true
  },
  {
    path: "/project",
    component: () => import("@/views/project/index"),
    hidden: true
  }
];

const createRouter = () =>
  new Router({
    mode: "hash",
    scrollBehavior: () => ({
      y: 0
    }),
    routes: constantRoutes
  });

const router = createRouter();
export function resetRouter() {
  const newRouter = createRouter();
  router.matcher = newRouter.matcher;
}

export default router;
