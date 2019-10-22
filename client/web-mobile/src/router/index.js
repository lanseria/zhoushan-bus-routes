import Vue from 'vue'
import Router from 'vue-router'
import SearchPage from '@/components/search-page/search-page'
import routeLineDetail from '@/components/route-line-detail/route-line-detail'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/search'
    },
    {
      path: '/search',
      name: 'SearchPage',
      component: SearchPage,
      children: [
        {
          path: ':id',
          component: routeLineDetail
        }
      ]
    }
  ]
})
