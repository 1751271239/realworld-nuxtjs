import { request } from '@/plugins/request'

// 获取公共文章列表
export const getArticles = (params) => {
  return request({
    method: 'GET',
    url: '/api/articles',
    params
  })
}

//获取关注的文章列表
export const getYourFeedArticles = (params) => {
  return request({
    method: 'GET',
    url: '/api/articles/feed',
    params
  })
}

//实现点赞功能
export const addFavorite = (slug) => {
  return request({
    method: 'POST',
    url: `api/articles/${slug}/favorite`,
  })
}

//实现取消点赞功能
export const deleteFavorite = (slug) => {
  return request({
    method: 'DELETE',
    url: `api/articles/${slug}/favorite`,
  })
}

//查看文章详情
export const getArticle = (slug) => {
  return request({
    method: 'GET',
    url: `/api/articles/${slug}`
  })
}

// 新增文章
export const addArticle = (data) => {
  return request({
    method: 'POST',
    url: '/api/articles',
    data
  })
}

// 更新文章
export const updateArticle = (data) => {
  return request({
    method: 'PUT',
    url: `/api/articles/${data.article.slug}`,
    data
  })
}

// 删除文章
export const deleteArticle = (slug) => {
  return request({
    method: 'DELETE',
    url: `/api/articles/${slug}`
  })
}

// 获取文章评论
export const getComments = (slug) => {
  return request({
    method: 'GET',
    url: `/api/articles/${slug}/comments`
  })
}

// 添加文章评论
export const addComments = ({ comment, slug }) => {
  return request({
    method: 'POST',
    url: `/api/articles/${slug}/comments`,
    data: { comment: comment }
  })
}

// 删除文章评论
export const deleteComments = (params) => {
  return request({
    method: 'DELETE',
    url: `/api/articles/${params.slug}/comments/${params.id}`
  })
}

//关注用户
export const addFollow = (username) => {
  return request({
    method: 'POST',
    url: `/api/profiles/${username}/follow`
  })
}

//取消关注用户
export const deleteFollow = (username) => {
  return request({
    method: 'DELETE',
    url: `/api/profiles/${username}/follow`
  })
}