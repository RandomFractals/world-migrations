import Vue from 'vue'
import WorldMap from '@/components/WorldMap'

describe('WorldMap.vue', () => {
  it('should render correct contents', () => {
    const Constructor = Vue.extend(WorldMap)
    const vm = new Constructor().$mount()
    expect(vm.$el.querySelector('.worldMap h1').textContent)
      .to.equal('TODO: add d3 world map')
  })
})
