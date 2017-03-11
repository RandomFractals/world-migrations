<template>
  <md-card class="card list-card">
    <md-card-area md-inset>
      <md-card-header class="card-header">
        <div class="md-title">{{ title }}</div>
        <div class="md-subhead">{{ subtitle }}</div>      
      </md-card-header>
      <md-card-content>
        <div id="data-list" class="list-container">
          [list data]
        </div>
      </md-card-content>
    </md-card-area>
  </md-card>
</template>

<script>
export default {
  name: 'listTable',
  data () {
    return {
      title: '[list title]',
      subtitle: '[subtitle]'
    }
  }
}
</script>

<style scoped>

.list-card {
  width: 240px;
}

.list-container {
  margin: 0px;
  height: 100%;
  width: 100%;
  overflow-y: scroll;  
}
</style>
