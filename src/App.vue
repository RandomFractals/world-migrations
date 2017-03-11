<template>
  <div id="app">
    <toolBar></toolBar>
    <div class="app-content">
      <worldMap></worldMap>
      <listTable></listTable>
    </div>
    <bottomBar></bottomBar>
  </div>
</template>

<script>
import ToolBar from './components/ToolBar.vue'
import WorldMap from './components/WorldMap.vue'
import ListTable from './components/ListTable.vue'
import BottomBar from './components/BottomBar.vue'

export default {
  name: 'app',
  components: {
    ToolBar,
    WorldMap,
    ListTable,
    BottomBar
  }
}
</script>

<style>

/* App page/content styles */
html, body, #app {
  height: 100%;
  margin: 0px;
  overflow: hidden;
}

.app-content {
  height: 100%;
  width: 100%;
  overflow: hidden;
  background-color: #fff;
  display: -ms-flex;
  display: -webkit-flex;
  display: flex;
}

.map-card {
  float: left;
  width: 80%;
}

.list-card {
  float: right;
  width: 20%;
}
  
/* Material UI app Card(s) styles */
.card {
  margin: 3px;
  border-radius: 1px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
  transition: all 0.3s cubic-bezier(.25,.8,.25,1);
}

.card:hover {
  box-shadow: 0 8px 16px rgba(0,0,0,0.25), 0 4px 4px rgba(0,0,0,0.22);
}

.card-title {
  padding: 5px;
}

.card-subtitle {
  font-size: 0.8em;
  color: dimgrey;
  padding-left: 5px;
}
  
/* div magic styles */
.show {
	display: block;
}

.hide {
	display: none;
}


</style>

