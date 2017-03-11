<template>
  <md-bottom-bar id="footer" class="md-transparent">
    <span class="md-caption">Data:</span>
    <a href="http://www.un.org/en/development/desa/population/migration/data/estimates2/estimates15.shtml"
      target="_blank">United Nations</a>
    |
    <span class="md-caption">Code:</span>
    <a href="https://github.com/RandomFractals/world-migrations"
      target="_blank">world-migrations</a>
    |    
    <span class="md-caption" style="flex: 1">{{ copyright }}</span>
  </md-bottom-bar>
</template>

<script>
export default {
  name: 'bottomBar',
  data () {
    return {
      copyright: '© Random Fractals, Inc | 2017'
    }
  }
}
</script>

<style>
.md-caption {
  font-size: 0.8em;
  padding: 5px;
}
</style>