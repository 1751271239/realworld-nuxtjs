/**
 * Nuxt.js 配置文件
 */
module.exports = {
  router: {
    linkActiveClass: 'active',
    // 自定义路由表规则
    extendRoutes(routes, resolve) {
      // 清除 Nuxt.js 基于 pages 目录默认生成的路由表规则
      routes.splice(0)
      routes.push(...[
        {
          path: '/',
          component: resolve(__dirname, 'pages/layout/'),
          children: [
            {
              path: '', // 默认子路由
              name: 'home',
              component: resolve(__dirname, 'pages/home/')
            },
            {
              path: '/login', // 登录
              name: 'login',
              component: resolve(__dirname, 'pages/login/')
            },
            {
              path: '/register', // 注册
              name: 'register',
              component: resolve(__dirname, 'pages/login/')
            },
            {
              path: '/profile/:username', // 个人主页
              name: 'profile',
              component: resolve(__dirname, 'pages/profile/')
            },
            {
              path: '/settings', // 设置
              name: 'settings',
              component: resolve(__dirname, 'pages/settings/')
            },
            {
              path: '/article/:slug', // 文章
              name: 'article',
              component: resolve(__dirname, 'pages/article/')
            },
            {
              path: '/editor', // 新增文章
              name: 'editor',
              component: resolve(__dirname, 'pages/editor/')
            },
            {
              path: '/editorarticle/:slug', // 编辑文章
              name: 'editorarticle',
              component: resolve(__dirname, 'pages/editor/')
            }
          ]
        }
      ])
    }
  },


  // 注册插件
  plugins: [
    '~/plugins/request.js',
    '~/plugins/dayjs.js'
  ]
}