import Vue from 'vue'
import Router from 'vue-router'
import WorldMap from '@/components/WorldMap'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Map',
      component: WorldMap
    }
  ]
})
