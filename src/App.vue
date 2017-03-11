<template>
  <div id="app">
    <toolBar></toolBar>
    <div class="content">
      <md-layout md-gutter>
        <!-- graph column -->
        <md-layout md-column md-gutter>
          <md-layout>
            <worldMap></worldMap>
          </md-layout>
        </md-layout>
        <!-- list column -->
        <md-layout md-column md-gutter>
          <md-layout md-flex="50">list table</md-layout>
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
#app {
  height: 100%;
  margin: 0px;
  overflow: hidden;
}

.md-toolbar {
  min-height: 32px;
  border-bottom: 1px solid rgba(#000, .12);
}

.content {
  padding: 8px;
  height: 100%;
  display: flex;
  flex-flow: column nowrap;
  flex: 1;
  overflow: auto;
  background-color: #fff;
}
  
.card {
  border-radius: 2px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
  transition: all 0.3s cubic-bezier(.25,.8,.25,1);
}

.card:hover {
  box-shadow: 0 8px 16px rgba(0,0,0,0.25), 0 4px 4px rgba(0,0,0,0.22);
}

.md-title {
  padding: 5px;
}

.md-subhead {
  font-size: 0.8em;
  color: dimgrey;
  padding-left: 5px;
}
  
</style>

