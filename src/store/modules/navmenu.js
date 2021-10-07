import { getProjectList as getUserProjectList, getPermissions, getMnenus } from "@/api/navmenu";
// import router, { resetRouter } from "@/router";

const state = {
  projectList: [],
  modules: [],
  permissions: [],
  activemodel: {}
};

const mutations = {
  setActiveModel: (state, model) => {
    state.activemodel = model;
  },
  SET_PROJECTS: (state, projects) => {
    state.projectList = projects;
    sessionStorage.setItem('projects', JSON.stringify(projects));
  },
  SET_MODULES: (state, modules) => {
    state.modules = modules;
  },
  SET_PERMISSIONS: (state, permissions) => {
    state.permissions = permissions;
    sessionStorage.setItem('permissions', JSON.stringify(permissions));
  }
};
const actions = {
  // get project list
  getProjectList({ commit }) {
    return new Promise((resolve, reject) => {
      getUserProjectList()
        .then(response => {
          commit("SET_PROJECTS", response.dataset.datas);
          resolve();
        })
        .catch(error => {
          reject(error);
        });
    });
  },

  getnNavMenu({ commit }, projectID) {
    return new Promise((resolve, reject) => {
      getMnenus({ projectID: projectID })
        .then(response => {
          const { data } = response
          const modules = data;
          commit("SET_MODULES", modules);
          resolve(modules);
        })
        .catch(error => {
          // console.log(error);
          reject(error);
        });
    });
  },

  getPermissionList({ commit }) {
    return new Promise((resolve, reject) => {
      getPermissions()
        .then(response => {
          // console.log("0", response.vars.data);
          // const { data } = response;
          commit("SET_PERMISSIONS", response.vars.data);
          // console.log("2" + response.items);
          resolve();
        })
        .catch(error => {
          // console.log(error);
          reject(error);
        });
    });
  }
};
export default {
  namespaced: true,
  state,
  mutations,
  actions
};
