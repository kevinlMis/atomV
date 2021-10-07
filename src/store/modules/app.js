import Cookies from 'js-cookie'

const state = {
  sidebar: {
    openedL: null,
    openedR: null,
    title: '',
    isIndexP: false,
    isHeader: false,
    isMask: false,
    isMypage: false,
    tabs: 0
  },
  device: '',
  size: Cookies.get('size') || 'medium'
}

const mutations = {
  TOGGLE_SIDEBAR: (state, data) => {
    state.sidebar.openedL = !state.sidebar.openedL
    if (data === 'null') {
      state.sidebar.openedL = null
      return
    }
    if (state.sidebar.openedL) {
      Cookies.set('sidebarStatus', 1)
    } else {
      Cookies.set('sidebarStatus', 0)
    }
  },
  TOGGLE_OPENR: (state, data) => {
    state.sidebar.openedR = !state.sidebar.openedR
    if (data === 'null') {
      state.sidebar.openedL = null
      return
    }
    if (state.sidebar.openedR) {
      Cookies.set('sidebarStatus', 1)
    } else {
      Cookies.set('sidebarStatus', 0)
    }
  },
  CLOSE_SIDEBAR: (state, withoutAnimation) => {
    Cookies.set('sidebarStatus', 0)
    state.sidebar.openedL = false
    state.sidebar.withoutAnimation = withoutAnimation
  },
  TOGGLE_DEVICE: (state, device) => {
    state.device = device
  },
  SET_SIZE: (state, size) => {
    state.size = size
    Cookies.set('size', size)
  },
  SET_TITLE: (state, title) => {
    state.sidebar.title = title
  },
  SET_HEAD: (state, show) => {
    state.sidebar.isHeader = show
  },
  SET_INDEX: (state, indexP) => {
    state.sidebar.isIndexP = indexP
  },
  SET_MASK: (state, isMask) => {
    state.sidebar.isMask = isMask
  },
  SET_MYPAGE: (state, isMypage) => {
    state.sidebar.isMypage = isMypage
  },
  SET_TABS: (state, tabs) => {
    state.sidebar.tabs = tabs
  }
}

const actions = {
  setOpenL({ commit }, data) {
    commit('TOGGLE_SIDEBAR', data)
  },
  closeSideBar({ commit }, { withoutAnimation }) {
    commit('CLOSE_SIDEBAR', withoutAnimation)
  },
  setStatus({ commit }, device) {
    commit('TOGGLE_DEVICE', device)
  },
  setTitle({ commit }, title) {
    commit('SET_TITLE', title)
  },
  setHeader({ commit }, show) {
    commit('SET_HEAD', show)
  },
  setSize({ commit }, size) {
    commit('SET_SIZE', size)
  },
  setOpenR({ commit }, data) {
    commit('TOGGLE_OPENR', data)
  },
  setIndex({ commit }, indexP) {
    commit('SET_INDEX', indexP)
  },
  setMask({ commit }, isMask) {
    commit('SET_MASK', isMask)
  },
  setMyPage({ commit }, isMypage) {
    commit('SET_MYPAGE', isMypage)
  },
  setTabs({ commit }, tabs) {
    commit('SET_TABS', tabs)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
