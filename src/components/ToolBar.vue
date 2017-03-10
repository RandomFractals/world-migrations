<template>
<div class="md-toolbar-container">
  <md-toolbar id="toolbar" class="md-large">
    <h3 class="md-title" style="flex: 1">{{ title }}</h3>
  </md-toolbar>
  </div>
</template>

<script>
export default {
  name: 'toolBar',
  data () {
    return {
      title: 'World Migrations'
    }
  }
}
</script>

<style>
.md-title {
  font-weight: normal;
  margin: 0px;
  padding: 10px;
}
</style>