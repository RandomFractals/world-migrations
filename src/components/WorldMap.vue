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

/**
 * Stock D3 world map vue.js comp. setup loosely based on:
 * 
 * http://techslides.com/demos/d3/worldmap-template-d3v4.html
 **/

// import d3 and topojson libs
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
var mapSvg, mapProjection, geoPath, topology, g;

export default {
  name: 'worldMap',
  data () {
    return {
      title: '[map title]',
      subtitle: '[subtitle]'
    }
  },
  created: function() {
    console.log('WorldMap.created()');
  },  
  mounted: function() {
    // init map container
    mapContainer = document.getElementById('map-container');
    mapWidth = mapContainer.offsetWidth;
    mapHeight = mapWidth/2;   
    console.log(`WorldMap.mounted(): mapWidth=${mapWidth} mapHeight=${mapHeight}`);

    // create initial map view
    createMapSvg(mapWidth, mapHeight);

    // add window resize handler
    d3.select(window).on('resize', onWindowResize);

    // load world topojson
    d3.json("data/world-topo-min.json", function(error, world) {
      var countries = topojson.feature(world, world.objects.countries).features;
      topology = countries;
      console.log('WorldMap.loadTopology(): regions count:', countries.length);
      //draw(topology);
    });

  }
}


/**
 * Creates d3 maps svg for the specified map view width and height.
 * 
 * @param width Map view width.
 * @param height Map view height.
 */
function createMapSvg(width, height) {
  // cue in projection :)
  // mapProjection = d3.geo.mercator()
  mapProjection = d3.geoMercator()
    .translate([(width/2), (height/2)])
    .scale(width/2/Math.PI);

  //geoPath = d3.geo.path().projection(projection);
  geoPath = d3.geoPath().projection(mapProjection);

  // create map svg
  mapSvg = d3.select("#map-container").append("svg")
    .attr("width", width)
    .attr("height", height)
    //.call(mapZoom)
    .on("click", onMapClick)
    .append("g");

  // add map svg group for region clicks
  g = mapSvg.append("g").on("click", onMapClick);
}


/**
 * Map click coordinates translation event handler.
 */
function onMapClick() {
  var latLon = mapProjection.invert(d3.mouse(this));
  console.log('WorldMap.onMapClick():coordinates:', latLon);
}

function move() {
  console.log('move');
}


/**
 * Map view resize throttle timer and redraw.
 */
var mapViewThrottleTimer;
function onWindowResize() {
  console.log('WorldMap.onWindowResize()...');
  window.clearTimeout(mapViewThrottleTimer);
    mapViewThrottleTimer = window.setTimeout(function() {
      redraw();
    }, 200);
}


/**
 * Redraws world map svg on app window resize.
 */
function redraw() {
  // get new map view width and height
  mapWidth = mapContainer.offsetWidth;
  mapHeight = mapWidth/2;
  console.log(`WorldMap.redraw(): mapWidth=${mapWidth} mapHeight=${mapHeight}`);

  // create new map svg
  d3.select('svg').remove();
  createMapSvg(mapWidth, mapHeight);

  //draw(topology);
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

.country:hover{
  stroke: #fff;
  stroke-width: 1.5px;
}
</style>
