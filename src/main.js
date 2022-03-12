import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en' // lang i18n

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'
import * as directives from '@/directives'
import '@/icons' // icon
import '@/permission' // permission control

// 注册自定义指令
// 遍历所有的导出的指令对象 完成自定义全局注册

// 注册自定义指令
// 遍历所有的导出的指令对象 完成自定义全局注册

/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online ! ! !
 */
// if (process.env.NODE_ENV === 'production') {
//   const { mockXHR } = require('../mock')
//   mockXHR()
// }

// set ElementUI lang to EN
import 'default-passive-events'
import Component from '@/components'
import * as filters from '@/filters' // 引入工具类
import CheckPermission from '@/mixin/checkPermission'

// 注册全局的过滤器
Object.keys(filters).forEach(key => {
  // 注册过滤器
  Vue.filter(key, filters[key])
})
Vue.use(Component) // 注册自己的插件
Vue.mixin(CheckPermission)
Vue.use(ElementUI, { locale })
Object.keys(directives).forEach(key => {
  // 注册自定义指令
  Vue.directive(key, directives[key])
})
// 如果想要中文版 element-ui，按如下方式声明
// Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
