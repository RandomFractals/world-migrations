import Vue from 'vue'
import WorldMap from '../../src/components/WorldMap.vue'

describe('WorldMap.vue', () => {
  it('should render correct contents', () => {
    const vm = new Vue({
      el: document.createElement('div'),
      render: (h) => h(WorldMap)
    })
    expect(vm.$el.querySelector('h1').textContent).toBe('TODO: add d3 world map')
  })
})

// also see example testing a component with mocks at
// https://github.com/vuejs/vueify-example/blob/master/test/unit/a.spec.js#L22-L43
