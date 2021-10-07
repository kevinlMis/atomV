const getters = {
  sidebar: state => state.app.sidebar,
  size: state => state.app.size,
  device: state => state.app.device,
  visitedViews: state => state.tagsView.visitedViews,
  cachedViews: state => state.tagsView.cachedViews,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  introduction: state => state.user.introduction,
  roles: state => state.user.roles,

  permission_routes: state => state.permission.routes,
  addRoutes: state => state.permission.addRoutes,

  jsession: state => state._monitor.jsession,
  vehicles: state => state._monitor.vehicles,
  onOff: state => state._monitor.onOff,

  trackVehicles: state => state._track.trackVehicles,
  loads: state => state._track.loads,
  isLoads: state => state._track.isLoads,

  videoVehicles: state => state._video.videoVehicles,
  isVideos: state => state._video.isVideos,
  videos: state => state._video.videos,

  dbVehicles: state => state._monitor_db.vehicles,
  dbOnOff: state => state._monitor_db.onOff,

  rtc: state => state._rtc.rtc,
  rtcVehicles: state => state._rtc.vehicles
}
export default getters
