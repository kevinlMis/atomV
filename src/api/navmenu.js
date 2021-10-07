import request from '@/utils/request'
var baseUrl = `http://${window.location.host}`

export function getProjectList() {
  return request({
    url: '',
    method: 'get'
  })
}

export function getModules(query) {
  return request({
    url: '/',
    method: 'get',
    params: query
  })
}

export function getPermissions(query) {
  return request({
    url: '/',
    method: 'get',
    params: query
  })
}

export function getMnenus(data) {
  return request({
    url: `${baseUrl}/mock/menu.json`,
    responseType: 'json',
    method: 'get',
    params: { data }
  })
}
