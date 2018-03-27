import Vue from 'vue'
import Router from 'vue-router'
import SearchPage from '@/components/search-page/search-page'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'SearchPage',
      component: SearchPage
    }
  ]
})
