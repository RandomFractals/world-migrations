<template>
  <md-bottom-bar id="footer" class="md-transparent">
    <span class="md-caption">data:</span>
    <a href="http://www.un.org/en/development/desa/population/migration/data/estimates2/estimates15.shtml"
      target="_blank">United Nations</a>
    |
    <span class="md-caption">code:</span>
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
#footer {
  position: absolute;
  bottom: 0px;
}

.md-caption {
  font-size: 0.8em;
  padding-left: 5px;
}

a {
  font-size: 0.8em;
  text-decoration: none
}
</style>