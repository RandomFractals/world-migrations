// The following line loads the standalone build of Vue instead of the runtime-only build,
// so you don't have to do: import Vue from 'vue/dist/vue'
// This is done with the browser options. For the config, see package.json
import Vue from 'vue'
import App from './App.vue'
import router from './router'

import VueMaterial from 'vue-material'
// import 'vue-material/dist/vue-material.css'

Vue.use(VueMaterial) // for all

Vue.material.registerTheme('default', {
  primary: 'blue',
  accent: 'red',
  warn: 'red',
  background: 'white'
})

new Vue({ // eslint-disable-line no-new
  el: '#app',
  router,
  render: (h) => h(App)
})
