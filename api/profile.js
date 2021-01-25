import { request } from '@/plugins/request'

//用户注册
export const getProfile = (username) => {
  return request({
    method: 'GET',
    url: `/api/profiles/${username}`,
  })
}