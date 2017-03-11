<template>
  <div class="toolbar-container md-toolbar-container">
    <md-toolbar id="toolbar" class="toolbar md-large">
      <h3 class="app-title md-title" style="flex: 1">{{ title }}</h3>
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

/* Toolbar styles */
.toolbar {
  min-height: 32px;
  border-bottom: 1px solid rgba(#000, .12);
}

.app-title {
  font-weight: normal;
  margin: 0px;
  padding: 10px;
  color: white;
}

</style>