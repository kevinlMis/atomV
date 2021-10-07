import { login, logout, getInfo, refreshToken } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import router, { resetRouter } from '@/router'
const state = {
  token: getToken(),
  name: '',
  avatar: '',
  introduction: '',
  roles: []
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_INTRODUCTION: (state, introduction) => {
    state.introduction = introduction
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  }
}

const actions = {
  login({ commit }, userInfo) {
    const { username, password } = userInfo;
    return new Promise((resolve, reject) => {
      login({ userid: username.trim(), pwd: password, method: "loginJWT" })
        .then(response => {
          const { data } = response
          if (Boolean(response.success) === true) {
            sessionStorage.setItem('tokens', data.token)
            commit("SET_TOKEN", data.token);
            setToken(data.token);
          }
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo()
        .then(response => {
          const { data } = response
          const { name } = data;
          if (!name) {
            reject("Verification failed, please Login again.");
          }
          // commit("SET_ROLES", roles);
          sessionStorage.setItem('name', name);
          sessionStorage.setItem('userinfo', JSON.stringify(data));
          commit("SET_NAME", name);
          // commit("SET_AVATAR", avatar);
          // commit("SET_INTRODUCTION", introduction);
          resolve(data);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  // user logout
  logout({ commit, state, dispatch }) {
    return new Promise((resolve, reject) => {
      commit('SET_TOKEN', '')
      commit('SET_ROLES', [])
      removeToken()
      resetRouter()
      sessionStorage.removeItem('PERMISSIONS_ROLE')
      sessionStorage.removeItem('USER_NAME')
      location.reload()
      resolve()
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      commit('SET_ROLES', [])
      removeToken()
      resolve()
    })
  },

  // user refreshToken
  refreshToken({ commit, state }) {
    return new Promise((resolve, reject) => {
      refreshToken().then(response => {
        commit('SET_TOKEN', response.access_token)
        setToken(response.access_token)
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // dynamically modify permissions
  changeRoles({ commit, dispatch }, role) {
    return new Promise(async resolve => {
      const token = role + '-token'
      commit('SET_TOKEN', token)
      setToken(token)
      const { roles } = await dispatch('getInfo')
      resetRouter()

      // generate accessible routes map based on roles
      const accessRoutes = await dispatch('permission/generateRoutes', roles, { root: true })

      // dynamically add accessible routes
      router.addRoutes(accessRoutes)

      // reset visited views and cached views
      dispatch('tagsView/delAllViews', null, { root: true })

      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
