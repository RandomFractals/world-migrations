<template>
  <md-card class="card map-card">
    <md-card-area md-inset>
      <md-card-header class="card-header">
        <div class="card-title md-title">{{ title }}</div>
        <div class="card-subtitle md-subhead">{{ subtitle }}</div>      
      </md-card-header>
      <md-card-content>
        <div id="map-container" class="map-container">
        </div>
      </md-card-content>
    </md-card-area>
  </md-card>
</template>

<script>

const d3 = require('d3');
const topojson = require('topojson')

//const graticule = d3.geo.graticule();
const graticule = d3.geoGraticule();

// map zoom setup
const mapZoom = d3.zoom()
  // .extent([1, 9])
  .scaleExtent([1, 9])
  .on('zoom', move)

// map tooltip
const mapToolTip = d3.select('#map-container').append('div').attr('class', 'tooltip hidden');

// map container vars
var mapContainer, mapWidth, mapHeight;

// map svg vars
var mapSvg, mapProjection, topo, path, g;

export default {
  name: 'worldMap',
  data () {
    return {
      title: '[map title]',
      subtitle: '[subtitle]'
    }
  },
  created: function() {
    console.log('WorldMap:created()');
  },  
  mounted: function() {
    // init map container
    mapContainer = document.getElementById('map-container');
    mapWidth = mapContainer.offsetWidth;
    mapHeight = mapWidth/2;   
    console.log(`WorldMap:mounted(): mapWidth=${mapWidth} mapHeight=${mapHeight}`);

    // cue in projection :)
    // mapProjection = d3.geo.mercator()
    mapProjection = d3.geoMercator()
      .translate([(mapWidth/2), (mapHeight/2)])
      .scale(mapWidth/2/Math.PI);

    //path = d3.geo.path().projection(projection);
    path = d3.geoPath().projection(mapProjection);

    mapSvg = d3.select("#map-container").append("svg")
      .attr("width", mapWidth)
      .attr("height", mapHeight)
      //.call(mapZoom)
      .on("click", onMapClick)
      .append("g");

    g = mapSvg.append("g").on("click", onMapClick);
  }
}

/**
 * Map click coordinates translation event handler.
 */
function onMapClick() {
  var latLon = mapProjection.invert(d3.mouse(this));
  console.log('WorldMap:onMapClick():coordinates:', latLon);
}

function move() {
  console.log('move');
}

/**
 * Redraws world map svg.
 */
function redraw() {
  mapWidth = mapContainer.offsetWidth;
  mapHeight = mapWidth/2;
  d3.select('svg').remove();
  //createMap(mapWidth, mapHeight);
  //draw(topo);
}
</script>

<style scoped>

/* Map styles */
.map-container {
  border: 1px solid #999;
  margin: 0px;
  height: 100%;
  width: 100%;
  overflow: hidden;  
}

.graticule {
  fill: none;
  stroke: #bbb;
  stroke-width: .5px;
  stroke-opacity: .5;
}

.equator {
  stroke: #ccc;
  stroke-width: 1px;
}

</style>
