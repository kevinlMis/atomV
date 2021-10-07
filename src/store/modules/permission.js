import { constantRoutes } from "@/router";
import router from "@/router";
import Layout from '@/layout'
import ContentFrame from '@/components/ContentFrame'
import urlRedirectMixin from '@/mixin/urlRedirectMixin.js'
const _import = require('@/utils/import_' + process.env.NODE_ENV)
const urlRedirectMixins = {
  methods: urlRedirectMixin.methods
}

/**
 * 解析动态路由
 * @param modules Array
 */
export function translateToAsyncRoutes(modules, pName) {
  const res = [];

  modules.forEach(module => {
    const tmp = {}
    if (module) {
      for (const i in module) {
        tmp[String(i).toLocaleLowerCase()] = module[i]
      }
    }
    const path = tmp.href;

    tmp.meta = { title: tmp.module_name, icon: tmp.node_icon };
    tmp.name = tmp.module_name;
    tmp.hidden = String(tmp.display) === '0'
    if (tmp.showtype === 'iframe' && (path.startsWith('http://') || path.startsWith('https://'))) {
      tmp.meta.link = path
      tmp.path = pName ? pName + '/' + path.replace(/[\/\.\:\=\?]/g, '') : path;
      tmp.component = ContentFrame
    } else if (tmp.showtype === 'inner') {
      tmp.path = pName ? pName + path.substr(path.lastIndexOf('/')) : path;
      if (pName) {
        tmp.component = _import(path);
      } else {
        tmp.component = Layout
      }
    }
    if (module.props) {
      tmp.props = function(route) {
        return urlRedirectMixins.methods.pathPayloadToProps(route)
      }
    }

    if (tmp.children && Object.prototype.toString.call(tmp.children) === "[object Array]" && tmp.children.length > 0) {
      tmp.children = translateToAsyncRoutes(tmp.children, path);
    }
    res.push(tmp);
  });
  return res;
}

const state = {
  routes: [],
  addRoutes: []
};

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes;
    state.routes = routes;
  },
  RESET_ROUTES: (state) => {
    state.addRoutes = [];
    state.routes = constantRoutes;
  }
};

const actions = {
  loadRoutes({ commit }, routes) {
    return new Promise(resolve => {
      commit("SET_ROUTES", routes);
      resolve(routes);
    });
  },

  resetRoutes({ commit }) {
    return new Promise(resolve => {
      commit("RESET_ROUTES");
      resolve();
    });
  },

  generateRoutesFromModules({ commit }, modules) {
    return new Promise(resolve => {
      const accessedRoutes = translateToAsyncRoutes(modules);
      constantRoutes.map(item => {
        if (!item.hidden) {
          accessedRoutes.push(item)
        }
      })
      commit('SET_ROUTES', accessedRoutes);
      sessionStorage.setItem('modulesRouter', JSON.stringify(accessedRoutes));
      router.addRoutes(accessedRoutes);
      resolve(accessedRoutes);
    });
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
