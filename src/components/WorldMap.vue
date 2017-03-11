<template>
  <md-card class="card">
    <md-card-area md-inset>
      <md-card-header class="card-header">
        <div class="md-title">{{ title }}</div>
        <div class="md-subhead">{{ subtitle }}</div>      
      </md-card-header>
      <md-card-content>
        <div id="map" class="map-container">
          [world map]
        </div>
      </md-card-content>
    </md-card-area>
  </md-card>
</template>

<script>
export default {
  name: 'worldMap',
  data () {
    return {
      title: '[map title]',
      subtitle: '[subtitle]'
    }
  }
}
</script>

<style scoped>

.map-container {
  margin: 0px;
  height: 100%;
  width: 100%;  
}
</style>
