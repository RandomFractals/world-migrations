<template>
  <div id="app">
    <toolBar></toolBar>
    <div class="content">
      <worldMap></worldMap>
    </div>
  </div>
</template>

<script>
import ToolBar from './components/ToolBar.vue'
import WorldMap from './components/WorldMap.vue'

export default {
  name: 'app',
  components: {
    ToolBar,
    WorldMap
  }
}
</script>

<style>
  html,
  body, 
  content,
  #app {
    height: 100%;
    overflow: hidden;
  }

  body, #app {
    margin: 0px;
  }

  .md-toolbar {
    min-height: 32px;
    border-bottom: 1px solid rgba(#000, .12);
  }

 .container {
    min-height: 100%;
    display: flex;
    flex-flow: column nowrap;
    flex: 1;
  }  

  .content {
    padding: 16px;
    flex: 1;
    overflow: auto;
    background-color: #fff;
  }
  
</style>

