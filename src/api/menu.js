import request from '@/utils/request'
var baseUrl = `http://${window.location.host}`

export function getFiles(data) {
  return request({
    url: `${baseUrl}/mock/tree.json`,
    responseType: 'json',
    method: 'get',
    params: { data }
  })
}

