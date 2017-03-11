<template>
  <div id="app">
    <toolBar></toolBar>
    <div class="content">
      <md-layout md-gutter>
        <!-- graph column -->
        <md-layout md-column md-gutter>
          <md-layout md-flex="20">todo: add action bar</md-layout>
          <md-layout>
            <worldMap></worldMap>
          </md-layout>
        </md-layout>
        <!-- list column -->
        <md-layout md-column md-gutter>
          <md-layout md-flex="50">list table</md-layout>
          <md-layout></md-layout>
          <md-layout></md-layout>
        </md-layout>
      </md-layout>      
    </div>
    <bottomBar></bottomBar>
  </div>
</template>

<script>
import ToolBar from './components/ToolBar.vue'
import WorldMap from './components/WorldMap.vue'
import BottomBar from './components/BottomBar.vue'

export default {
  name: 'app',
  components: {
    ToolBar,
    WorldMap,
    BottomBar
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

