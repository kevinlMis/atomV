import request from '@/utils/request'
var baseUrl = `http://${window.location.host}`

export function project(data) {
  return request({
    url: `${baseUrl}/mock/project.json`,
    responseType: 'json',
    method: 'get',
    data
  })
}

