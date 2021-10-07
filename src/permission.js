import router, { resetRouter } from './router'
import store from "./store";
import stack from "./stack";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import { getToken } from "@/utils/auth";

const whiteList = ["/home", "/my"];

router.beforeEach(async(to, from, next) => {
  NProgress.configure({ showSpinner: false })
  const hasToken = getToken()
  if (whiteList.indexOf(to.path) !== -1) {
    store.dispatch("app/setHeader", false);
  } else {
    store.dispatch("app/setHeader", true);
  }
  store.dispatch("app/setTitle", to.meta.title || 'atomV');

  NProgress.start()

  if (hasToken) {
    const routerArr = store.getters.permission_routes || []
    console.log('routerArr==', routerArr)
    // 记录栈入栈
    stack.push(to.path)
    if (routerArr.length === 0) {
      await store.dispatch("user/getInfo").then(res => {
        // store.dispatch('tpridmp_common_navmenu/getPermissionList'); // 角色列表
      }).catch(error => {
        store.dispatch("user/logout").then(() => {
          this.$message({
            type: "info",
            message: error || "Verification failed, please login again"
          });
          next({ path: "/" });
        });
      });

      const modules = await store.dispatch('navmenu/getnNavMenu', null);// 获取菜单列表

      resetRouter();
      await store.dispatch("permission/generateRoutesFromModules", modules);
    } else {
      next();
    }
    if (to.path === "/login") {
      stack.clear()
      next({ path: "/" });
      NProgress.done()
    } else {
      const hasGetUserInfo = store.getters.name;
      if (hasGetUserInfo) {
        next();
      } else {
        try {
          next();
        } catch (error) {
          await store.dispatch("user/resetToken");
          this.$message({
            type: "info",
            message: error || "Has Error"
          });
          next(`/login?redirect=${to.path}`);
          NProgress.done();
        }
      }
    }
  } else {
    if (to.path === '/login') {
      next()
    } else {
      next(`/login?redirect=${to.path}`)
    }
    NProgress.done()
  }
  setTimeout(() => {
    NProgress.done()
  }, 5000);
});

router.afterEach((res) => {
  NProgress.done()
});
