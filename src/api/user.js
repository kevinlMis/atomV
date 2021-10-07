import request from '@/utils/request'
var baseUrl = `http://${window.location.host}`

export function login(data) {
  return request({
    url: `${baseUrl}/mock/login.json`,
    responseType: 'json',
    method: 'get',
    data
  })
}

export function getInfo() {
  return request({
    url: `${baseUrl}/mock/getinfo.json`,
    responseType: 'json',
    method: 'get'
  });
}

export function logout() {
  return request({
    url: "/",
    method: "post"
  });
}

export function refreshToken() {
  return request({
    url: "/",
    method: 'post'
  })
}
