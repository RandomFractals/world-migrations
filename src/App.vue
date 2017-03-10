<template>
  <div id="app">
    <md-toolbar>
      <h1 class="md-title">world migrations</h1>
    </md-toolbar>
    <worldMap></worldMap>
  </div>
</template>

<script>
import WorldMap from './components/WorldMap.vue'

export default {
  name: 'app',
  components: {
    WorldMap
  }
}
</script>
